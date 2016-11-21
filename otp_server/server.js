'use strict';

process.title = 'otp_server';

const https = require('https');
const fs = require('fs');
const log = require('systemd-journald');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const validator = require('express-validator');

const options = {
  key: fs.readFileSync('certs/server-key.pem'),
  cert: fs.readFileSync('certs/server-cert.pem'),
};

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator({
	customValidators: {
		notIn: function(param, array) {
			return array.includes(param);
		},
		inRange: function(param, min, max) {
			return ((min <= param) && (param <= max));
		},
		gte: function(param, num) {
			return param >= num;
		}
	}
}));

app.use(function (req, res, next) {
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log('Client IP:', ip);
	res.locals.retSkel = {"meta": {}, "data": {}};
	res.locals.db_folder = './databases/';
	next();
});

app.use(function(req, res, next) {
	if (!('authorization' in req.headers)) {
		let ret = res.locals.retSkel;
		ret.meta.success = false;
		ret.meta.err = "Please use basic http authentication"
		res.json(ret);
		return;
	}
	res.locals.httpBasicAuth = Buffer.from(
		req.headers.authorization
			.split(' ')[1], 'base64')
		.toString().split(':');
	next();
});

app.use('/api/v1', require('./routes'));

// Start the server
app.set('port', process.env.PORT || 8443);
https.createServer(options, app).listen(app.get('port'));

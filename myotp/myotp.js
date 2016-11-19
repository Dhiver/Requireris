'use strict';

const crypto = require('crypto');
const assert = require('assert');
const base32 = require('thirty-two');

/*
 * return the hmac digest of msg with the given secret using specified hash
 * @param {String} hash - the hash type to use
 * @param {Array} secret - the secret used to hmac
 * @param {String} msg - the message to hmac
 * @return {Array} the hmac digest
 */
function hmac(hash, secret, msg) {
	return crypto.createHmac(hash.toLowerCase(), secret).update(msg).digest();
}

/*
 * This function compare two buffers without leaking timing information
 * @param {Buffer} a - first buffer
 * @param {Buffer} b - second buffer
 * @param {String} hashName - the hash type to use
 * @param {Integer} key - pseudo random length in bytes (default: 32)
 * @return {Bool} return true if buffer contents are the same
 */
function timingSafeEqualHMAC(a, b, hashName, keyLength) {
	const key = crypto.randomBytes(keyLength || 32);
	const ah = hmac(hashName, key, a);
	const bh = hmac(hashName, key, b);
	return crypto.timingSafeEqual(ah, bh);
}

/*
 * return an allocated buffer from the given buffer from offset of given length
 * @param {Array} buf - origin buffer
 * @param {Integer} offset - start copying from
 * @param {Integer} length - length to copy
 * @return {Array} the allocated sub buffer
 */
function getBufferSubset(buf, offset, length) {
	return new Buffer(buf).slice(offset, offset + length);
}

/*
 * return the dynamic truncation integer
 * @param {Array} hs - the hmac digest buffer
 * @return {Integer} raw hotp value
 */
function dynamicTruncation(hs) {
	// Get offset value from the hs last byte low-order nibble
	const offset = hs[hs.length - 1] & 0xf;
	// Only get 4-byte from hs at offset
	const dbc1 = getBufferSubset(hs, offset, 4);
	let dbc2 = new Buffer(dbc1);
	// Masking the most significant bit of dbc2
	dbc2[0] &= 0x7f;
	return dbc2.readUIntBE(0, dbc2.length);
}

let hotp = {};

/*
 * Generate a HMAC-Based One-Time Password
 *
 * @return {String} the HOTP token
 *
 * Arguments:
 *
 * args
 * 	secret - This should be unique and secret for every user
 * 	as this is the seed that is used to calculate the HMAC.
 *
 * 	counter - This is the counter value.
 * 	Default is 0.
 *
 * 	tokenLength - How many digits to print out (min 6, max 8)
 * 	Default is 6.
 *
 * 	hashName - the name of the hash function to use.
 * 	('sha1', 'sha256', 'sha521')
 * 	Default is 'sha1'.
 *
 * 	fromBase32 - Decode the given secret from base32.
 * 	Default is false.
 *
 */
hotp.gen = function(secret, opt) {
	secret = secret || '';
	opt = opt || {};
	const counter = opt.counter || 0;
	const tokenLength = opt.tokenLength || 6;
	const hashName = opt.hashName || 'sha1';
	const fromBase32 = opt.fromBase32 || false;

	assert(['sha1', 'sha256', 'sha512'].includes(hashName), "wrong hash name");
	opt.tokenLength = opt.tokenLength < 6 ? 6 : opt.tokenLength;
	opt.tokenLength = opt.tokenLength > 8 ? 8 : opt.tokenLength;

	// Decode base32 secret if specified
	if (fromBase32) {
		const epurSecret = secret.replace(/\W+/g, '')
		secret = base32.decode(epurSecret);
	}
	assert(secret.length >= 16, "shared secret must be at least 16 bytes");

	const counterBuffer = Buffer.alloc(8);
	counterBuffer.writeUIntBE(opt.counter, 0, 8);
	const hs = hmac(hashName, secret, counterBuffer);
	const sbits = dynamicTruncation(hs).toString();
	return sbits.substr(sbits.length - tokenLength);
};

/*
 * Check a HMAC-Based One-Time Password
 *
 * @return {Object} null if failure, { delta: # } on success
 * delta is the counter step difference between the client and the server
 *
 * Arguments:
 *
 * args
 * 	secret - This should be unique and secret for every user
 * 	as this is the seed that is used to calculate the HMAC.
 *
 * 	token - HOTP token to validate.
 *
 * 	lookAheadWindow - The allowable margin for the counter.
 * 	The server will compute the next n token and will compare them
 * 	with the given token.
 * 	Default is 15.
 *
 * 	counter - Counter value. This should be stored by the
 * 	application, must be user specific, and be incremented for
 * 	each request.
 * 	Default is 0.
 */
hotp.verify = function(secret, token, lookAheadWindow, opt) {
	secret = secret || '';
	token = token || '';
	lookAheadWindow = lookAheadWindow || 10;
	opt = opt || {};

	const origCounter = opt.counter;
	let i = origCounter - lookAheadWindow;
	if (i < 0)
		i = 0;
	while (i <= origCounter + lookAheadWindow) {
		opt.counter = i;
		if (timingSafeEqualHMAC(this.gen(secret, opt), token, 'sha256'))
			return {"delta": i - origCounter}
		++i;
	}
	return null;
};

let totp = {};

/*
 * Generate a Time-Based One-Time Password
 *
 * @return {String} TOTP token
 *
 * Arguments:
 *
 * args
 * 	secret - This should be unique and secret for every user
 * 	as this is the seed that is used to calculate the HMAC.
 *
 * 	timeStep - Time interval (in seconds) before regenerate
 * 	a different token
 *
 * 	timeOffset - Time offset (in seconds) to begin with.
 *
 * 	tokenLength - How many digits to print out (min 6, max 8)
 * 	Default is 6.
 *
 * 	hashName - the name of the hash function to use.
 * 	('sha1', 'sha256', 'sha521')
 * 	Default is 'sha256'.
 */
totp.gen = function(secret, opt) {
	secret = secret || '';
	opt = opt || {};
	opt.timeStep = opt.timeStep || 30;
	opt.timeOffset = opt.timeOffset || 0;
	opt.hashName = opt.hashName || 'sha256';

	let localSecondsFromEpoch = Date.now() / 1000;
	if (opt.secondsFromEpoch)
		localSecondsFromEpoch = opt.secondsFromEpoch;
	// Compute actual counter value
	opt.counter = Math.floor((localSecondsFromEpoch - opt.timeOffset) / opt.timeStep);
	return hotp.gen(secret, opt);
};

/*
 * Check a Time-Based One-Time Password
 *
 * @return {Object} null if failure, { delta: # } on success
 * delta is the counter step difference between the client and the server
 *
 * Arguments:
 *
 * args
 * 	secret - This should be unique and secret for every user
 * 	as this is the seed that is used to calculate the HMAC.
 *
 * 	token - TOTP token to validate.
 *
 * 	lookAheadWindow - The allowable margin for the counter.
 * 	The server will compute the next n token and will compare them
 * 	with the given token.
 * 	Default is 15.
 *
 * 	timeOffset - The time offset
 * 	Default is 0.
 *
 * 	timeStep - The time step of the counter.
 * 	Default is 30.
 */
totp.verify = function(secret, token, lookAheadWindow, opt) {
	secret = secret || '';
	token = token || '';
	opt = opt || {};
	opt.timeStep = opt.timeStep || 30;
	opt.timeOffset = opt.timeOffset || 0;
	opt.hashName = opt.hashName || 'sha256';
	lookAheadWindow = lookAheadWindow || 10;

	let localSecondsFromEpoch = Date.now() / 1000;
	if (opt.secondsFromEpoch)
		localSecondsFromEpoch = opt.secondsFromEpoch;
	opt.counter = Math.floor((localSecondsFromEpoch - opt.timeOffset) / opt.timeStep);
	return hotp.verify(secret, token, lookAheadWindow, opt);
}

module.exports.hotp = hotp;
module.exports.totp = totp;

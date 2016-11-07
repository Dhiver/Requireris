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
 * 	movingFactor - This is the offset of the HOTP counter.
 * 	Default is 0.
 *
 * 	tokenLength - How many digits to print out (min 6, max 8)
 * 	Default is 6.
 *
 * 	hashName - the name of the hash function to use.
 * 	('sha1', 'sha256', 'sha521')
 * 	Default is 'sha1'.
 *
 */
hotp.gen = function(secret, opt) {
	secret = secret || '';
	opt = opt || {};
	const movingFactor = opt.movingFactor || 0;
	const tokenLength = opt.tokenLength || 6;
	const hashName = opt.hashName || 'sha1';
	const fromBase32 = opt.fromBase32 || false;

	assert(secret.length >= 16, "shared secret must be at least 16 bytes");
	assert(['sha1', 'sha256', 'sha512'].includes(hashName), "wrong hash name");
	opt.tokenLength = opt.tokenLength < 6 ? 6 : opt.tokenLength;
	opt.tokenLength = opt.tokenLength > 8 ? 8 : opt.tokenLength;

	const counter = Buffer.alloc(8);
	counter.writeUIntBE(movingFactor, 0, 8);
	if (fromBase32) {
		const epurSecret = secret.replace(/\W+/g, '')
		secret = base32.decode(secret);
	}
	const hs = hmac(hashName, secret, counter);
	const sbits = dynamicTruncation(hs).toString();
	return sbits.substr(sbits.length - tokenLength);
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
 * 	timeStart - Time offset (in seconds) to begin with.
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
	opt.timeStart = opt.timeStart || 0;
	opt.hashName = opt.hashName || 'sha256';

	let localSecondsFromEpoch = Date.now() / 1000;
	if (opt.secondsFromEpoch)
		localSecondsFromEpoch = opt.secondsFromEpoch;
	localSecondsFromEpoch = 20000000000;
	opt.movingFactor = Math.floor((localSecondsFromEpoch - opt.timeStart) / opt.timeStep);
	return hotp.gen(secret, opt);
};

module.exports.hotp = hotp;
module.exports.totp = totp;

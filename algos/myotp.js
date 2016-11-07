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

/*
 * return HOTP token
 * @param {String} secret - the hotp secret
 * @param {Integer} movingFactor - the hotp moving factor
 * @param {Integer} len - the hotp token length
 * @param {String} hash - the hash type
 */
function hotp(secret, movingFactor, len, hash) {
	assert(secret.length >= 16, "shared secret must be at least 16 bytes");
	assert(['sha1', 'sha256', 'sha512'].includes(hash), "wrong hash name");
	len = len < 6 ? 6 : len;
	len = len > 8 ? 8 : len;
	const counter = Buffer.alloc(8);
	counter.writeUIntBE(movingFactor, 0, 8);
	epurSecret = secret.replace(/\W+/g, '').toUpperCase()
	const decodedSecret = base32.decode(epurSecret);
	const hs = hmac(hash, decodedSecret, counter);
	const sbits = dynamicTruncation(hs).toString();
	return sbits.substr(sbits.length - len);
}

/*
 * return TOTP token
 * @param {String} secret - the totp secret
 * @param {Integer} timeStep - the totp time step
 * @param {Integer} timeStart - the totp time start
 * @param {Integer} len - the totp token length
 * @param {String} hash - the hash type
 */
function totp(secret, timeStep, timeStart, len, hash) {
	const secondsFromEpoch = Date.now() / 1000;
	const counter = Math.floor((secondsFromEpoch - timeStart) / timeStep);
	return hotp(secret, counter, len, hash);
}

//console.log(hotp('t6i2dqvcvyafgqnroqulgnshhe7qxxdz', 0, 6, 'sha1'));
console.log(totp('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA', 30, 0, 8, 'sha512'));

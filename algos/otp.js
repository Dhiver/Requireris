const crypto = require('crypto');
const assert = require('assert');
const base32 = require('thirty-two');

function hmac(hash, secret, msg) {
	return crypto.createHmac(hash.toLowerCase(), secret).update(msg).digest();
}

function getBufferSubset(buf, offset, length) {
	return new Buffer(buf).slice(offset, offset + length);
}

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

function hotp(secret, movingFactor, len, hash) {
	assert(secret.length >= 16, "shared secret must be at least 16 bytes");
	assert(['sha1', 'sha256', 'sha512'].includes(hash), "wrong hash name");
	len = len < 6 ? 6 : len;
	len = len > 8 ? 8 : len;
	const counter = Buffer.alloc(8);
	counter.writeUIntBE(movingFactor, 0, 8);
	const decodedSecret = base32.decode(secret);
	const hs = hmac(hash, decodedSecret, counter);
	const sbits = dynamicTruncation(hs).toString();
	return sbits.substr(sbits.length - len);
}

function totp(secret, timeStep, timeStart, len, hash) {
	const secondsFromEpoch = Math.floor((new Date).getTime() / 1000);
	const counter = Math.floor((secondsFromEpoch - timeStart) / timeStep);
	return hotp(secret, counter, len, hash);
}

console.log(hotp('t6i2dqvcvyafgqnroqulgnshhe7qxxdz', 0, 6, 'sha1'));
// console.log(totp('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ', 30, 0, 8, 'sha1'));

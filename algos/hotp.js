const crypto = require('crypto');
const base32 = require('base32');

function hmac(hash, secret, msg) {
	return crypto.createHmac(hash, secret).update(msg).digest()
}

function getBufferSubset(buf, offset, length) {
	return new Buffer(buf).slice(offset, offset + length)
}

function dynamicTruncation(hs) {
	// Get offset value from the hs last byte low-order nibble
	const offset = hs[hs.length - 1] & 0xf
	// Only get 4-byte from hs at offset
	const dbc1 = getBufferSubset(hs, offset, 4)
	dbc2 = new Buffer(dbc1)
	// Masking the most significant bit of dbc2
	dbc2[0] &= 0x7f
	return dbc2.readUIntBE(0, dbc2.length)
}

function hotp(secret, counter, len, hash) {
	const decodedSecret = base32.decode(secret)
	const hs = hmac(hash, decodedSecret, counter)
	const sbits = dynamicTruncation(hs).toString()
	return sbits.substr(sbits.length - len)
}

const date = (new Date).getTime().toString()

console.log(hotp('JBSWY3DPEHPK3PXP', date, 6, 'sha1'))

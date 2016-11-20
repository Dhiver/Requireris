/// <reference path="./jssha.d.ts"/>
import { Buffer } from 'buffer';
import { Base32 } from './base32';
import * as jsSHA from 'jssha';
export var OTP = (function () {
    function OTP(secret, length, hash) {
        this.secret = secret;
        this.length = length;
        this.hash = hash;
        this.avaibleHash = ['SHA-1', 'SHA-256', 'SHA-512'];
        this.length = this.length < 6 ? 6 : this.length;
        this.length = this.length > 8 ? 8 : this.length;
    }
    OTP.prototype.hmac = function (hash, secret, msg) {
        var shaObj = new jsSHA(hash, "HEX");
        shaObj.setHMACKey(secret.toString("hex"), "HEX");
        shaObj.update(msg);
        return new Buffer(shaObj.getHMAC("HEX"), "hex");
    };
    OTP.prototype.getBufferSubset = function (buf, offset, length) {
        return new Buffer(buf).slice(offset, offset + length);
    };
    OTP.prototype.dynamicTruncation = function (hs) {
        // Get offset value from the hs last byte low-order nibble
        var offset = hs[hs.length - 1] & 0xf;
        // Only get 4-byte from hs at offset
        var dbc1 = this.getBufferSubset(hs, offset, 4);
        var dbc2 = new Buffer(dbc1);
        // Masking the most significant bit of dbc2
        dbc2[0] &= 0x7f;
        return dbc2.readUIntBE(0, dbc2.length);
    };
    OTP.prototype.hotp = function (movingFactor) {
        assert(this.secret.length >= 16, "shared secret must be at least 16 bytes");
        assert(this.avaibleHash.indexOf(this.hash) != -1, "wrong hash name");
        var counter = Buffer.alloc(8);
        counter.writeUIntBE(movingFactor, 0, 8);
        var decodedSecret = (new Base32()).decode(this.secret.replace(/\W+/g, ''));
        var hs = this.hmac(this.hash, decodedSecret, counter.toString('hex'));
        var sbits = this.dynamicTruncation(hs).toString();
        return sbits.substr(sbits.length - this.length);
    };
    OTP.prototype.totp = function (timeStep, timeStart) {
        var secondsFromEpoch = Math.floor((new Date).getTime() / 1000);
        var movingFactor = Math.floor((secondsFromEpoch - ((timeStart || 0))) / (timeStep || 30));
        return this.hotp(movingFactor);
    };
    OTP.prototype.genCommonURI = function (issuer, account) {
        this.issuer = issuer;
        this.account = account;
        this.commonURI = '/' + encodeURI(this.issuer) + ':' + encodeURI(this.account)
            + '?secret=' + encodeURIComponent(this.secret.replace(/\W+/g, '').toUpperCase())
            + '&issuer=' + encodeURIComponent(this.issuer)
            + '&algorithm=' + this.hash.replace('-', '')
            + '&digits=' + (this.length);
    };
    OTP.prototype.genHOTPKeyURI = function (counter) {
        return "otpauth://hotp" + this.commonURI + '&counter=' + (counter || 0);
    };
    OTP.prototype.genTOTPKeyURI = function (period) {
        return "otpauth://totp" + this.commonURI + '&period=' + (period || 30);
    };
    return OTP;
}());
//# sourceMappingURL=otp.js.map
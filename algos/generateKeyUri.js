// https://github.com/google/google-authenticator/wiki/Key-Uri-Format

const assert  = require('assert');

class OTPKeyUri {
	constructor(issuer, accountName, secret, digits, algo) {
		this.issuer = issuer;
		this.accountName = accountName;
		this.secret = secret;
		this.digits = digits;
		this.algo = algo;
		this.ret = ""
	}

	init() {
		this.ret += '/' + encodeURI(this.issuer || '') + ':' + encodeURI(this.accountName || '')
		+ '?secret=' + this.secret.replace(/\W+/g, '').toUpperCase()
		+ '&issuer=' + encodeURIComponent(this.issuer || '')
		+ '&algorithm=' + (this.algo || 'sha1').toUpperCase()
		+ '&digits=' + (this.digits || 6);
	}

	genHOTP(counter) {
		return "otpauth://hotp" + this.ret + '&counter=' + (counter || 0);
	}

	genTOTP(period) {
		return "otpauth://totp" + this.ret + '&period=' + (period || 30);
	}
}

const otp = new OTPKeyUri('ACME Co', 'john.doe@email.com', 'HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ=', 6, 'sha1');
otp.init();
console.log(otp.genTOTP(0));

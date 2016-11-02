const assert  = require('assert');

class OTPKeyUri {
	constructor(issuer, accountName, secret, digits, algo, movingFactor) {
		this.issuer = issuer;
		this.accountName = accountName;
		this.secret = secret;
		this.digits = digits;
		this.algo = algo;
		this.movingFactor = movingFactor;
		this.ret = ""
	}

	init() {
		this.ret += '/' + encodeURI(this.issuer || '') + ':' + encodeURI(this.accountName || '')
		+ '?secret=' + this.secret.replace(/[\s\.\_\-]+/g, '').toUpperCase()
		+ '&issuer=' + encodeURIComponent(this.issuer || '')
		+ '&algorithm=' + (this.algo || 'sha1').toUpperCase()
		+ '&digits=' + (this.digits || 6);
	}

	genHOTP(counter) {
		this.ret += '&counter=' + (counter || 0)
		this.ret = "otpauth://hotp" + this.ret;
		return this.ret;
	}

	genTOTP(period) {
		this.ret += '&period=' + (period || 30)
		this.ret = "otpauth://totp" + this.ret;
		return this.ret;
	}
}

const otp = new OTPKeyUri('ACME Co', 'john.doe@email.com', 'HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ', 6, 'sha1');
otp.init();
console.log(otp.genTOTP(0));

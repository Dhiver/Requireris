import { Observable } from 'rxjs/Rx';
import { OTP } from './otp';
export var OTPAccount = (function () {
    function OTPAccount(account, secret, otpType, movingFactor, length, hash, timeStart) {
        this.account = account;
        this.secret = secret;
        this.otpType = otpType;
        this.movingFactor = movingFactor;
        this.length = length;
        this.hash = hash;
        this.showQrCode = false;
        this.timeStart = timeStart || 0;
        this.otp = new OTP(secret, length, hash);
        this.otp.genCommonURI("DHIWERY Inc.", this.account);
        this.counter = this.movingFactor;
        switch (this.otpType) {
            case "HOTP":
                break;
            case "TOTP":
                this.initTOTP();
                break;
        }
        this.genOTP();
    }
    OTPAccount.prototype.getTimeLeftPercent = function () {
        if (this.otpType == "HOTP") {
            return 100;
        }
        return Math.round(this.counter / this.movingFactor * 100);
    };
    OTPAccount.prototype.genOTP = function () {
        try {
            switch (this.otpType) {
                case "HOTP":
                    this.OTPKeyURI = this.otp.genHOTPKeyURI(this.counter);
                    this.OTPtoken = this.otp.hotp(this.counter);
                    break;
                case "TOTP":
                    this.OTPKeyURI = this.otp.genTOTPKeyURI(this.movingFactor);
                    this.OTPtoken = this.otp.totp(this.movingFactor, this.timeStart);
                    break;
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    OTPAccount.prototype.updateCounter = function () {
        if (this.otpType == "HOTP") {
            this.counter++;
            this.genOTP();
        }
    };
    OTPAccount.prototype.initTOTP = function () {
        var _this = this;
        this.timeSubscribe = Observable.interval(1000).map(function (x) {
            _this.counter -= 1;
        }).subscribe(function (x) {
            if (_this.counter <= 0) {
                _this.counter = _this.movingFactor;
                _this.genOTP();
            }
        });
    };
    OTPAccount.prototype.toggleQrCode = function () {
        this.showQrCode = !this.showQrCode;
    };
    OTPAccount.prototype.getData = function () {
        return {
            account: this.account,
            secret: this.secret,
            movingFactor: this.movingFactor,
            length: this.length,
            otpType: this.otpType,
            hashType: this.hash
        };
    };
    return OTPAccount;
}());
//# sourceMappingURL=otp-account.js.map
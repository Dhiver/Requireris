"use strict";
var Rx_1 = require('rxjs/Rx');
var OTP = (function () {
    function OTP(account, secretKey, validity, lengh) {
        var _this = this;
        this.account = account;
        this.secretKey = secretKey;
        this.validity = validity;
        this.lengh = lengh;
        this.timeLeft = validity;
        this.genOTP();
        this.timeSubscribe = Rx_1.Observable.interval(1000).map(function (x) {
            _this.timeLeft -= 1;
        }).subscribe(function (x) {
            if (_this.timeLeft <= 0) {
                _this.timeLeft = _this.validity;
                _this.genOTP();
            }
        });
    }
    OTP.prototype.genOTP = function () {
        this.otp = Math.floor(100000 + Math.random() * 900000);
    };
    OTP.prototype.getTimeLeftPercent = function () {
        return this.timeLeft / this.validity * 100;
    };
    return OTP;
}());
exports.OTP = OTP;
//# sourceMappingURL=otp.js.map
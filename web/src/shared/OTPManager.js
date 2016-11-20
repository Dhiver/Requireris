import { Headers, RequestOptions } from '@angular/http';
import { OTPAccount } from "../shared/otp-account";
import { Crypto } from '../shared/crypto';
export var OTPManager = (function () {
    function OTPManager(http) {
        this.http = http;
        this.otps = [];
        this.serverAddress = "";
        this.isLogin = false;
        this.loadAccountsToLocalStorage();
        // this.addAccount(new OTPAccount("tot@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", "TOTP", 30, 8, "SHA-512"));
        // this.addAccount(new OTPAccount("yuugtyg@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", "HOTP", 0, 6, "SHA-1"));
        // this.addAccount(new OTPAccount("bastien.dhiver@gmail.com", "3jbuac6shuopync3s2o5lofsppqjxgv5", "TOTP", 30, 6, "SHA-1"));
    }
    OTPManager.prototype.addAccount = function (account) {
        this.otps.push(account);
        if (this.isLogin) {
            this.addAccountToServer(account.getData());
        }
        this.saveAccountsToLocalStorage();
    };
    OTPManager.prototype.removeAccount = function (key) {
        delete this.otps[key];
        this.otps.splice(key, 1);
    };
    OTPManager.prototype.getAccoutsFromServer = function () {
        var _this = this;
        this.http.get(this.serverAddress + '/secret/list').map(function (res) { return res.json(); })
            .subscribe(function (data) {
            var secrets = data;
            for (var _i = 0, secrets_1 = secrets; _i < secrets_1.length; _i++) {
                var secret = secrets_1[_i];
                _this.otps.push(new OTPAccount(secret.account, secret.secret, secret.otpType, secret.movingFactor, secret.length, secret.hashType));
            }
        }, function (err) { return console.error(err); });
    };
    OTPManager.prototype.addAccountToServer = function (secret) {
        var body = JSON.stringify(secret);
        var headers = new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        });
        var options = new RequestOptions({ headers: headers });
        this.http.post(this.serverAddress + '/secret/add', body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.error(err); });
    };
    OTPManager.prototype.onLogin = function () {
        this.isLogin = true;
        this.getAccoutsFromServer();
        for (var _i = 0, _a = this.otps; _i < _a.length; _i++) {
            var otp = _a[_i];
            this.addAccountToServer(otp.getData());
        }
    };
    OTPManager.prototype.saveAccountsToLocalStorage = function () {
        var accounts = [];
        for (var _i = 0, _a = this.otps; _i < _a.length; _i++) {
            var account = _a[_i];
            accounts.push(account.getData());
        }
        localStorage.setItem("accounts", Crypto.encrypt(JSON.stringify(accounts)));
    };
    OTPManager.prototype.loadAccountsToLocalStorage = function () {
        var data = Crypto.decrypt(localStorage.getItem('accounts'));
        if (!data || data == "") {
            return;
        }
        var accounts = JSON.parse(data);
        for (var _i = 0, accounts_1 = accounts; _i < accounts_1.length; _i++) {
            var account = accounts_1[_i];
            this.otps.push(new OTPAccount(account.account, account.secret, account.otpType, account.movingFactor, account.length, account.hashType));
        }
    };
    return OTPManager;
}());
//# sourceMappingURL=OTPManager.js.map
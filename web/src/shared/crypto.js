/// <reference path="./crypto-js.d.ts"/>
import * as CryptoJS from 'crypto-js';
var passphrase = "password";
export var Crypto = (function () {
    function Crypto() {
    }
    Crypto.setPassphare = function (value) {
        passphrase = value;
    };
    Crypto.Hash = function (value) {
        return CryptoJS.SHA512(value).toString();
    };
    Crypto.encrypt = function (value) {
        if (!value || value == "") {
            return "";
        }
        return CryptoJS.AES.encrypt(value, passphrase).toString();
    };
    Crypto.decrypt = function (value) {
        if (!value || value == "") {
            return "";
        }
        return CryptoJS.AES.decrypt(value, passphrase).toString(CryptoJS.enc.Utf8);
    };
    Crypto.Crypto = CryptoJS;
    return Crypto;
}());
;
//# sourceMappingURL=crypto.js.map
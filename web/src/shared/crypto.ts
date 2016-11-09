/// <reference path="../../typings/globals/crypto-js/index.d.ts"/>

import * as CryptoJS from 'crypto-js';

let passphrase: string = "password";

export class Crypto {
    static Crypto = CryptoJS;

    static setPassphare(value: string): void {
        passphrase = value;
    }

    static Hash(value: string): string {
        return CryptoJS.SHA512(value).toString();
    }

    static encrypt(value: string): string {
        if (!value || value == "") {
            return "";
        }
        return CryptoJS.AES.encrypt(value, passphrase).toString();
    }

    static decrypt(value: string): string {
        if (!value || value == "") {
            return "";
        }
        return CryptoJS.AES.decrypt(value, passphrase).toString(CryptoJS.enc.Utf8);
    }
};

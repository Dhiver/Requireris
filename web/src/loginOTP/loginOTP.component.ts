import { Component, Output, EventEmitter } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';


import { OTPAccount } from "../shared/otp-account";

import { LoginOTP } from "../shared/loginOTP";

@Component({
    selector: 'login-otp',
    templateUrl: 'loginOTP.component.html',
    styleUrls: ['loginOTP.component.scss']
})
export class LoginOTPComponent extends LoginOTP {

    @Output() onNewAccount = new EventEmitter();
    @Output() closeMenu = new EventEmitter();

    constructor() {
        super();
    }

    addAccount(value: any, valid: boolean): void {
        if (!valid) {
            return;
        }
        this.onNewAccount.emit(
            new OTPAccount(
                value.account,
                value.secretKey,
                value.otpType,
                value.counter,
                value.length,
                value.hash,
                value.timeStart)
            );
        }
    }

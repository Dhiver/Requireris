import { Component, Output, EventEmitter } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { OTPAccount } from "../shared/otp-account";

@Component({
    selector: 'login-otp',
    templateUrl: 'loginOTP.component.html',
    styleUrls: ['loginOTP.component.css']
})
export class LoginOTPComponent {
    loginOTPForm = new FormGroup({
        account: new FormControl('', Validators.required),
        secretKey: new FormControl('', Validators.required),
        validity: new FormControl(30, Validators.required),
        length: new FormControl(6, Validators.required),
        hash: new FormControl('', Validators.required)
    });

    @Output() onNewAccount = new EventEmitter();
    @Output() closeMenu = new EventEmitter();

    constructor() {

    }

    addAccount(value: any, valid: boolean): void {
        if (!valid) {
            return;
        }
        console.log(value);
        this.onNewAccount.emit(new OTPAccount(value.account, value.secretKey, value.validity, value.length, value.hash));
    }
}

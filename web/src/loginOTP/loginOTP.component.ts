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
        otpType: new FormControl("TOTP", Validators.required),
        counter: new FormControl(30, Validators.required),
        timeStart: new FormControl(0),
        length: new FormControl(6, Validators.required),
        hash: new FormControl("SHA-256", Validators.required)
    });

    @Output() onNewAccount = new EventEmitter();
    @Output() closeMenu = new EventEmitter();

    otpType: string = "TOTP";
    counterValue: number = 30;
    googleMode: boolean = false;

    constructor() {

    }

    addAccount(value: any, valid: boolean): void {
        console.log(value);
        console.log(valid);
        if (!valid) {
            return;
        }
        console.log(value);
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

    changeOTPtype(e): void {
        switch (e.value) {
            case "HOTP":
                this.otpType = "HOTP";
                this.counterValue = 0;
                break;
            case "TOTP":
                this.otpType = "TOTP";
                this.counterValue = 30;
                break;
        }
    }

    googleModeChange(e): void {
        if (!e.checked) {
            return
        }
        this.loginOTPForm.controls["otpType"].reset({value: "TOTP", disabled: true});
        this.loginOTPForm.controls["counter"].reset({value: 30, disabled: true});
        this.loginOTPForm.controls["timeStart"].reset({value: 0, disabled: true});
        this.loginOTPForm.controls["length"].reset({value: 6, disabled: true});
        this.loginOTPForm.controls["hash"].reset({value: "SHA-1", disabled: true});
    }
}

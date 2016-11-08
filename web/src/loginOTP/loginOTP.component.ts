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
    googleMode: boolean = false;

    constructor() {

    }

    addAccount(value: any, valid: boolean): void {
        if (!valid) {
            return;
        }
        console.log("valid", value);
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
                    this.loginOTPForm.controls["otpType"].setValue("HOTP");
                    this.loginOTPForm.controls["counter"].setValue(0);
                    break;
                case "TOTP":
                    this.otpType = "TOTP";
                    this.loginOTPForm.controls["otpType"].setValue("TOTP");
                    this.loginOTPForm.controls["counter"].setValue(30);
                    break;
            }
        }

        googleModeChange(e): void {
            if (!e.checked) {
                return
            }
            this.loginOTPForm.controls["otpType"].setValue("TOTP");
            this.loginOTPForm.controls["counter"].setValue(30);
            this.loginOTPForm.controls["timeStart"].setValue(0);
            this.loginOTPForm.controls["length"].setValue(6);
            this.loginOTPForm.controls["hash"].setValue("SHA-1");
        }

        isGoogleMode() {
            return (
                this.loginOTPForm.controls["otpType"].value == "TOTP" &&
                this.loginOTPForm.controls["counter"].value == 30 &&
                this.loginOTPForm.controls["timeStart"].value == 0 &&
                this.loginOTPForm.controls["length"].value == 6 &&
                this.loginOTPForm.controls["hash"].value == "SHA-1"
            );
        }
    }

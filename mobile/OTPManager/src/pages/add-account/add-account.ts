import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {BarcodeScanner} from 'ionic-native';

import { OTPAccount } from '../../shared/otp-account';
import { LoginOTP } from '../../shared/loginOTP';

import { Shared } from '../shared.service';

@Component({
    selector: 'page-add-account',
    templateUrl: 'add-account.html'
})
export class AddAccountPage extends LoginOTP {

    constructor(public navCtrl: NavController, private shared: Shared) {
        super();
    }

    ionViewDidLoad() {

    }

    validityChange(event: any): void {
        this.loginOTPForm.controls["timeStart"].setValue(event.value.lower);
        this.loginOTPForm.controls["counter"].setValue(event.value.upper);
    }

    addAccount(value: any, valid: boolean): void {
        if (!valid) {
            return;
        }
        this.pushAccount(new OTPAccount(
            value.account,
            value.secretKey,
            value.otpType,
            value.counter,
            value.length,
            value.hash,
            value.timeStart));
        }

        scanQrCode() {
            BarcodeScanner.scan().then((result) => {
                if (result.cancelled) {
                    return;
                }
                this.parseURI(decodeURIComponent(result.text));
            });
        }

        parseURI(url: string): void {
            let reg = new RegExp(/otpauth:\/\/(.*)\/(.*):(.*)\?(.*)/);
            let match = reg.exec(url);

            if (!match) {
                console.log("Bad OTPKeyURI");
                return;
            }
            let parameters = JSON.parse('{"' + match[match.length - 1].replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

            let counter = (match[1] == "totp" ? parameters["period"] : parameters["counter"]) | 30;
            let digits = parseInt(parameters["digits"]) | 6;
            let algorithm = parameters["algorithm"] ? parameters["algorithm"].replace("SHA", "SHA-") : "SHA-1";
            let account = new OTPAccount(
                match[3],
                parameters["secret"],
                match[1].toUpperCase(),
                counter,
                digits,
                algorithm
            );

            account.otp.genCommonURI(match[2], match[3]);
            this.pushAccount(account);
        }

        pushAccount(account: OTPAccount): void {
            this.shared.newAccount.emit(account);
            this.navCtrl.parent.select(1);
        }
    }

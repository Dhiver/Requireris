import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OTPAccount } from '../../shared/otp-account';
import { LoginOTP } from '../../shared/loginOTP';

import { HomePage } from '../home/home';

@Component({
    selector: 'page-add-account',
    templateUrl: 'add-account.html'
})
export class AddAccountPage extends LoginOTP {

    constructor(public navCtrl: NavController) {
        super();
    }

    ionViewDidLoad() {
        
    }

    validityChange(event: any): void {
        this.loginOTPForm.controls["timeStart"].setValue(event.value.lower);
        this.loginOTPForm.controls["counter"].setValue(event.value.upper);
        console.log(this.loginOTPForm);
    }

    addAccount(value: any, valid: boolean): void {
        if (!valid) {
            return;
        }
        this.navCtrl.parent.select(1);
        this.navCtrl.push(HomePage, {
            account: new OTPAccount(
                value.account,
                value.secretKey,
                value.otpType,
                value.counter,
                value.length,
                value.hash,
                value.timeStart)
            });
        }
    }

import { Component } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITableSelectionChange } from '../ng2-material';

class OTP {
    timeLeft: number;
    otp: number;
    timeSubscribe: any;

    constructor(public account: string, public secretKey: string, public validity: number, public lengh: number) {
        this.timeLeft = validity;
        this.genOTP();
        this.timeSubscribe = Observable.interval(1000).map((x) => {
            this.timeLeft -= 1;
        }).subscribe((x) => {
            if (this.timeLeft <= 0) {
                this.timeLeft = this.validity;
                this.genOTP();
            }
        });
    }

    genOTP(): void {
        this.otp = Math.floor(100000 + Math.random() * 900000);
    }

    getTimeLeftPercent(): number {
        return this.timeLeft / this.validity * 100;
    }
}

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    selection: string[] = [];
    opts: Array<OTP> = [];

    loginForm = new FormGroup({
        account: new FormControl('', Validators.required),
        secretKey: new FormControl('', Validators.required),
        validity: new FormControl(30, Validators.required),
        length: new FormControl(6, Validators.required)
    });

    constructor() {
        this.opts.push(new OTP("tot@gmail.com", "sdfsuifsfuisfjqiofj", 30, 6));
        this.opts.push(new OTP("bonjour@gmail.com", "56897NN8H?J?jj", 90, 6));
        this.opts.push(new OTP("jesuismoimeme@gmail.com", "uiuui5656746UGYU", 10, 6));
    }

    addAccount(value: any, valid: boolean): void {
        if (!valid) {
            return;
        }
        this.opts.push(new OTP(value.account, value.secretKey, value.validity, value.length));
    }

    change(data: ITableSelectionChange) {
        let names = [];
        this.opts.forEach((opt: OTP) => {
            if (data.values.indexOf(opt.account) !== -1) {
                names.push(opt.account);
            }
        });
        this.selection = names;
    }
}

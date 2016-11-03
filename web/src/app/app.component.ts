import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITableSelectionChange } from '../ng2-material';

import { OTPAccount } from "../shared/otp-account";

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    selection: string[] = [];
    opts: Array<OTPAccount> = [];

    loginForm = new FormGroup({
        account: new FormControl('', Validators.required),
        secretKey: new FormControl('', Validators.required),
        validity: new FormControl(30, Validators.required),
        length: new FormControl(6, Validators.required)
    });

    constructor() {
        this.opts.push(new OTPAccount("tot@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", 30, 8));
        // this.opts.push(new OTP("tot@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", 10, 6));
        // this.opts.push(new OTP("dgdgwsegs@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", 5, 6));
    }

    addAccount(value: any, valid: boolean): void {
        if (!valid) {
            return;
        }
        this.opts.push(new OTPAccount(value.account, value.secretKey, value.validity, value.length));
    }

    change(data: ITableSelectionChange) {
        let names = [];
        this.opts.forEach((opt: OTPAccount) => {
            if (data.values.indexOf(opt.account) !== -1) {
                names.push(opt.account);
            }
        });
        this.selection = names;
    }
}

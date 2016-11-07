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
    otps: Array<OTPAccount> = [];


    constructor() {
        this.addAccount(new OTPAccount("tot@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", "TOTP", 30, 8, "SHA-512"));
        this.addAccount(new OTPAccount("qsfsf@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", "HOTP", 10, 8, "SHA-512"));
        this.addAccount(new OTPAccount("ijqsif@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", "TOTP", 4, 6, "SHA-512"));
        this.addAccount(new OTPAccount("ggqgq@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", "HOTP", 0, 8, "SHA-512"));
        this.addAccount(new OTPAccount("fqq<f@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", "TOTP", 12, 7, "SHA-512"));
        this.addAccount(new OTPAccount("yuugtyg@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", "HOTP", 33, 8, "SHA-512"));
        this.addAccount(new OTPAccount("yuugtyg@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", "HOTP", 0, 6, "SHA-1"));
    }

    addAccount(account: OTPAccount): void {
        this.otps.push(account);
    }

    removeAccount(key: number): void {
        delete this.otps[key];
        this.otps.splice(key, 1);
    }

    change(data: ITableSelectionChange) {
        let names = [];
        this.otps.forEach((opt: OTPAccount) => {
            if (data.values.indexOf(opt.account) !== -1) {
                names.push(opt.account);
            }
        });
        this.selection = names;
    }
}

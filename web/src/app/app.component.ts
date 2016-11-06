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
        this.otps.push(new OTPAccount("tot@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", 30, 8, "SHA-512"));
        this.otps.push(new OTPAccount("qsfsf@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", 10, 8, "SHA-512"));
        this.otps.push(new OTPAccount("ijqsif@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", 4, 6, "SHA-512"));
        this.otps.push(new OTPAccount("ggqgq@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", 3, 8, "SHA-512"));
        this.otps.push(new OTPAccount("fqq<f@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", 12, 7, "SHA-512"));
        this.otps.push(new OTPAccount("yuugtyg@gmail.com", "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQGEZDGNA=", 33, 8, "SHA-512"));
    }

    addAccount(account: OTPAccount): void {
        this.otps.push(account);
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

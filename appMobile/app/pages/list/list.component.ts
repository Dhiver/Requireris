import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { OTP } from "../../shared/otp";

import {Observable} from 'rxjs/Rx';

@Component({
    selector: "list",
    templateUrl: "pages/list/list.html",
    styleUrls: ["common.css", "pages/list/list-common.css", "pages/list/list.css"]
})
export class ListComponent {
    otps: Array<OTP> = [];

    constructor(private router: Router) {
        this.otps.push(new OTP("tot@gmail.com", "sdfsuifsfuisfjqiofj", 30, 6));
        this.otps.push(new OTP("bonjour@gmail.com", "56897NN8H?J?jj", 90, 6));
        this.otps.push(new OTP("jesuismoimeme@gmail.com", "uiuui5656746UGYU", 10, 6));
        this.otps.push(new OTP("sdhuifhsui< fhu@gmail.com", "uiuui5656746UGYU", 2, 6));
        this.otps.push(new OTP("gtyfguhji@gmail.com", "uiuui5656746UGYU", 1, 6));
        this.otps.push(new OTP("(-èio vvubin,o)@gmail.com", "uiuui5656746UGYU", 4, 6));
        this.otps.push(new OTP("dsnfsfnfuisnf@gmail.com", "uiuui5656746UGYU", 3, 6));

        setInterval(() => {
            let tmp = [];
            for (let i = 0; i < this.otps.length; ++i) {
                tmp.push(this.otps[i]);
            }
            this.otps = tmp;
        }, 1000);
    }

    onLongpress(): void {

    }

    onTap(): void {

    }
}

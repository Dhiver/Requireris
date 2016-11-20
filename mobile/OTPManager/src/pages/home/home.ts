import { Component } from '@angular/core';

import { Http } from '@angular/http';

import { OTPManager } from '../../shared/OTPManager';

import { Shared } from '../shared.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends OTPManager {

    constructor(protected http: Http, private shared: Shared) {
        super(http);
        this.shared.newAccount.subscribe(
            account => {
                this.addAccount(account)
            }
        );
    }

    ondrag(item, key: number): void {
        if (item.getSlidingPercent() > 1) {
            this.removeAccount(key);
        }
    }
}

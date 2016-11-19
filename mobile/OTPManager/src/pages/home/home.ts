import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import { Http } from '@angular/http';

import { OTPManager } from '../../shared/OTPManager';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends OTPManager {

    constructor(protected http: Http, private navController: NavController, private navParams: NavParams) {
        super(http);
        let account = navParams.get('account');
        console.log(account);
        // TODO use shared service
        if (account) {
            this.addAccount(account);
        }
    }

    ondrag(item, key: number): void {
        if (item.getSlidingPercent() > 1) {
            this.removeAccount(key);
        }
    }
}

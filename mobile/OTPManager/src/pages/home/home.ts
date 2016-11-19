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
      console.log(navParams.get('account'));
  }

}

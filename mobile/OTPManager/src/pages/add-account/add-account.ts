import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the AddAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-account',
  templateUrl: 'add-account.html'
})
export class AddAccountPage {

    validity = {lower: 0, upper: 30};
    otpType = "HOTP";
    hashType = "SHA-1";
    length = 6;
    google = false;


  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AddAccountPage Page');
  }

}

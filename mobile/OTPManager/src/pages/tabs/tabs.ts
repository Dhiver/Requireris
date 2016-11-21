import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AddAccountPage } from '../add-account/add-account';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root: any = LoginPage;
    tab2Root: any = HomePage;
    tab3Root: any = AddAccountPage;

    constructor(public navCtrl: NavController) {}

    ionViewDidLoad() {
        
    }
}

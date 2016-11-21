import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { NavController } from 'ionic-angular';

import { Shared } from '../shared.service';

import 'rxjs/Rx';

interface User {
    username: string,
    password: string
}


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    loginForm = new FormGroup({
        serverAddress: new FormControl(''),
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(public navCtrl: NavController, private http: Http, private shared: Shared) {}

    ionViewDidLoad() {
    }

    sign_in() {
        this.connect(this.loginForm.value, this.loginForm.valid, "sign_in");
    }

    sign_up() {
        this.connect(this.loginForm.value, this.loginForm.valid, "sign_up");
    }

    connect(value: any, valid: boolean, type: string): void {
        if (!valid) {
            return;
        }
        let user: User = {username: value.username, password: value.password};

        let body = JSON.stringify(user);
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({ headers: headers });
        this.http.post(value.serverAddress + '/auth/' + type, body, options)
        .map((res:Response) => res.json())
        .subscribe(
            data => {
                console.log(data);
                this.onLoginSuccess(value.serverAddress);
            },
            err => console.error(err)
        );
    }

    onLoginSuccess(serverAddress: string): void {
        this.shared.serverAddress.emit(serverAddress);
        this.navCtrl.parent.select(1);
    }
}

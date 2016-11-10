import { Component, ViewChild, Output, EventEmitter } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';

interface User {
    username: string,
    password: string
}

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent {
    isLogin: boolean = false;
    serverAddress: string = "";

    @ViewChild('login') loginDialog;
    @Output() onLogin = new EventEmitter();
    @Output() onServerAddress = new EventEmitter();

    loginForm = new FormGroup({
        typeConnect: new FormControl('sign_in', Validators.required),
        serverAddress: new FormControl(''),
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private http: Http) {

    }

    connect(value: any, valid: boolean): void {
        if (!valid) {
            return;
        }
        this.serverAddress = value.serverAddress;
        let user: User = {username: value.username, password: value.password};

        let body = JSON.stringify(user);
        let headers = new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        });
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.serverAddress + '/auth/' + value.typeConnect, body, options)
        .map((res:Response) => res.json())
        .subscribe(
            data => {
                console.log(data);
                value.serverAddress = "";
                value.username = "";
                value.password = "";
                this.onLoginSuccess();
            },
            err => console.error(err)
        );
    }

    onLoginSuccess() {
        this.onLogin.emit();
        this.loginDialog.close();
        this.isLogin = true;
    }

    logout() {
        this.isLogin = false;
    }
}

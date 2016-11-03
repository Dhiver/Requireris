import { Component, ViewChild } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';

interface User {
    username: string,
    password: string
}

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {

    @ViewChild('login') loginDialog

    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private http: Http) {

    }

    connect(value: any, valid: boolean): void {
        if (!valid) {
            return;
        }

        let user: User = {username: value.username, password: value.password};

        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('/auth/sign_up', body, options)
        .map((res:Response) => res.json())
        .subscribe(
            data => { console.log(data)},
            err => console.error(err)
        );

        this.loginDialog.close()
        console.log("Je suis la");
    }

    // onSignIn(googleUser: any) {
    //     let profile = googleUser.getBasicProfile();
    //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //     console.log('Name: ' + profile.getName());
    //     console.log('Image URL: ' + profile.getImageUrl());
    //     console.log('Email: ' + profile.getEmail());
    // }
}

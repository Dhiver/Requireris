import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "login",
    templateUrl: "pages/login/login.html",
    styleUrls: ["common.css", "pages/login/login-common.css", "pages/login/login.css"],
})
export class LoginComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit() {

    }

    login() {
        alert("Try Login");
    }

    skipLogin() {
        this.router.navigate(["/list"]);
    }
}

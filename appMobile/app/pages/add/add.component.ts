import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "add",
    templateUrl: "pages/add/add.html",
    styleUrls: ["common.css", "pages/add/add-common.css", "pages/add/add.css"],
})
export class AddComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit() {

    }
}

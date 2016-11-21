import { Component, ViewChild, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITableSelectionChange } from '../ng2-material';

import { Http } from '@angular/http';

import { OTPManager } from '../shared/OTPManager';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    host: {
        "(window: blur)": "onLeaveWindow($event)",
    }
})
export class AppComponent extends OTPManager implements OnInit  {
    isLocked: boolean = true;

    @ViewChild('pinDialog') pinDialog;

    constructor(protected http: Http) {
        super(http);
    }

    ngOnInit() {
        if (this.isLocked) {
            this.pinDialog.show();
        }
    }

    private changeLock(value: boolean): void {
        this.isLocked = value;
        if (value) {
            this.pinDialog.show();
        } else {
            this.pinDialog.close();
        }
    }

    unlock(value: boolean): void {
        this.changeLock(!value);
    }

    onLeaveWindow(event: any): void {
        this.changeLock(true);
    }

}

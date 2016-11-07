import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';

import {MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import {MdButtonModule } from '@angular2-material/button';
import {MdInputModule } from '@angular2-material/input';
import {MdButtonToggleModule } from '@angular2-material/button-toggle';

import { Ng2MaterialModule } from '../ng2-material';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,

        Ng2MaterialModule,

        MdIconModule,
        MdButtonModule,
        MdInputModule,
        MdButtonToggleModule
    ],
    providers: [
        MdIconRegistry
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule { }

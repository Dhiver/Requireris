import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';

import {MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import {MdButtonModule } from '@angular2-material/button';
import {MdInputModule } from '@angular2-material/input';
import {MdCardModule } from '@angular2-material/card';
import {MdToolbarModule } from '@angular2-material/toolbar';
import {MdSidenavModule } from '@angular2-material/sidenav';
import {MdProgressCircleModule } from '@angular2-material/progress-circle';
import {MdListModule } from '@angular2-material/list';
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
        MdToolbarModule,
        MdButtonModule,
        MdInputModule,
        MdCardModule,
        MdProgressCircleModule,
        MdSidenavModule,
        MdListModule
    ],
    providers: [
        MdIconRegistry
    ],
    bootstrap: [LoginComponent]
})
export class LoginModule { }

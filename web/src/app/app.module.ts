import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { LoginModule } from '../login';
import { LoginOTPModule } from '../loginOTP';

import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdButtonModule } from '@angular2-material/button';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdCardModule } from '@angular2-material/card';

import { Ng2MaterialModule } from '../ng2-material';

import { MaterialModule }       from '../material';

import { ClipboardModule }  from 'angular2-clipboard';

import { QRCodeModule } from 'angular2-qrcode';

import { JoinPipe } from './join.pipe';

@NgModule({
    declarations: [
        AppComponent,
        JoinPipe
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
        MdCardModule,
        MdSidenavModule,
        MaterialModule,

        ClipboardModule,
        QRCodeModule,

        LoginModule,
        LoginOTPModule,
    ],
    providers: [
        MdIconRegistry
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

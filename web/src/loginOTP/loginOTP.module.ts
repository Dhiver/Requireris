import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginOTPComponent } from './loginOTP.component';

import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdButtonModule } from '@angular2-material/button';
import { MdRadioModule } from '@angular2-material/radio';
import { MdCheckboxModule } from '@angular2-material/checkbox';

@NgModule({
    declarations: [
        LoginOTPComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,

        MdIconModule,
        MdToolbarModule,
        MdInputModule,
        MdButtonModule,
        MdRadioModule,
        MdCheckboxModule
    ],
    providers: [
        MdIconRegistry,
        MdUniqueSelectionDispatcher
    ],
    exports: [
        LoginOTPComponent
    ]
})
export class LoginOTPModule { }

import { NgModule }           from '@angular/core';

import {
    MaterialCardComponent,
    MaterialCardMainComponent,
    MaterialCardActionsComponent
}                               from './card';

import {
    MaterialProgressBarCircleComponent
}                               from './progress-bar';

const MATEIRAL_DIRECTIVES = [
    MaterialCardComponent,
    MaterialCardMainComponent,
    MaterialCardActionsComponent,

    MaterialProgressBarCircleComponent
];

@NgModule({
    imports: [],
    declarations: MATEIRAL_DIRECTIVES,
    exports: MATEIRAL_DIRECTIVES,
    providers: []
})
export class MaterialModule { }

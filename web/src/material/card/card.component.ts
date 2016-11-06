import { Component } from '@angular/core';

@Component({
    selector: 'material-card',
    template: '<ng-content></ng-content>',
    styleUrls: ['card.component.css']
})
export class MaterialCardComponent {

}

@Component({
    selector: 'material-card-main',
    template: '<ng-content></ng-content>',
    styleUrls: ['card-main.component.css']
})
export class MaterialCardMainComponent {

}

@Component({
    selector: 'material-card-actions',
    template: '<ng-content></ng-content>',
    styleUrls: ['card-actions.component.css']
})
export class MaterialCardActionsComponent {

}

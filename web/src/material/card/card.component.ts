import { Component } from '@angular/core';

@Component({
    selector: 'material-card',
    template: '<ng-content></ng-content>',
    styleUrls: ['card.component.scss']
})
export class MaterialCardComponent {

}

@Component({
    selector: 'material-card-main',
    template: '<ng-content></ng-content>',
    styleUrls: ['card-main.component.scss']
})
export class MaterialCardMainComponent {

}

@Component({
    selector: 'material-card-actions',
    template: '<ng-content></ng-content>',
    styleUrls: ['card-actions.component.scss']
})
export class MaterialCardActionsComponent {

}

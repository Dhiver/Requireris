import { Component, Input } from '@angular/core';

@Component({
    selector: 'material-proress-bar-circle',
    templateUrl: 'progress-bar-circle.component.html',
    styleUrls: ['progress-bar-circle.component.css', 'circle.css']
})
export class MaterialProgressBarCircleComponent {
    @Input() percentage: number;
}

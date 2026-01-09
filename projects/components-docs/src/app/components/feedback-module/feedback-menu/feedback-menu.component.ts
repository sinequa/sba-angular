import { Component } from '@angular/core';

@Component({
    selector: 'doc-feedback-menu',
    templateUrl: './feedback-menu.component.html',
    standalone: false
})
export class DocFeedbackMenuComponent {

  code = `<sq-feedback-menu
    [style]="'primary'">
</sq-feedback-menu>`;

  constructor() { }

}

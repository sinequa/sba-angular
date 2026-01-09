import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-refine',
    templateUrl: './refine.component.html',
    standalone: false
})
export class DocRefineComponent extends BaseComponent {

  code = `<sq-refine [results]="results"></sq-refine>`;

}

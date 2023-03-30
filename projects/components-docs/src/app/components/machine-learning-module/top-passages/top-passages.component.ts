import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-top-passages',
  templateUrl: './top-passages.component.html'
})
export class DocTopPassagesComponent extends BaseComponent {

  code = `<sq-top-passages
    [results]="results">
</sq-top-passages>`;

}

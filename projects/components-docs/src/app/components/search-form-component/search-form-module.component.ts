import { Component } from '@angular/core';
import { DocSearchFormComponent } from './search-form/search-form.component';

@Component({
    selector: 'doc-search-form-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocSearchFormModuleComponent {

  title = 'Search Form Component';

  components = [
    DocSearchFormComponent
  ];

  constructor() { }

}

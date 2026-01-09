import { Component } from '@angular/core';
import { DocAutocompleteListComponent } from './autocomplete-list/autocomplete-list.component';

@Component({
    selector: 'doc-autocomplete-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocAutocompleteModuleComponent {

  title = 'Autocomplete Module';

  components = [
    DocAutocompleteListComponent
  ];

  constructor() { }

}

import { Component } from '@angular/core';
import { AutocompleteListComponent } from './autocomplete-list/autocomplete-list.component';

@Component({
  selector: 'app-autocomplete-module',
  templateUrl: '../module-template.html'
})
export class AutocompleteModuleComponent {

  title = 'Autocomplete Module';

  components = [
    AutocompleteListComponent
  ];

  constructor() { }

}

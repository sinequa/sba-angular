import { Component } from '@angular/core';
import { AutocompleteListComponent } from './autocomplete-list/autocomplete-list.component';
import { FieldSearchItemsComponent } from './field-search-items/field-search-items.component';

@Component({
  selector: 'app-autocomplete-module',
  templateUrl: '../module-template.html'
})
export class AutocompleteModuleComponent {

  title = 'Autocomplete Module';

  components = [
    AutocompleteListComponent,
    FieldSearchItemsComponent
  ];

  constructor() { }

}

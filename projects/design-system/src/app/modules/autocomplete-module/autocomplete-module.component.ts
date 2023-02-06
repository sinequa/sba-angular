import { Component } from '@angular/core';
import { AutocompleteListComponent } from './autocomplete-list/autocomplete-list.component';
import { FieldSearchItemsComponent } from './field-search-items/field-search-items.component';

@Component({
  selector: 'app-autocomplete-module',
  templateUrl: './autocomplete-module.component.html'
})
export class AutocompleteModuleComponent {

  components = [
    AutocompleteListComponent,
    FieldSearchItemsComponent
  ];

  constructor() { }

}

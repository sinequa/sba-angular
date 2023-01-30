import { Component } from '@angular/core';

@Component({
  selector: 'app-autocomplete-list',
  templateUrl: './autocomplete-list.component.html'
})
export class AutocompleteListComponent {

  code = `Error 500 for the suggest query call

  
<input
    sqAdvancedFormAutocomplete
    [off]="false"
    [suggestQuery]="suggestQuery"
    [dropdown]="dropdown"
    [id]="'authors'"
    type="text"
    class="form-control"
    autocomplete="off"
    spellcheck="off">
<sq-autocomplete-list #dropdown>
    <ng-template #itemTpl let-item>
          {{item.display}}
    </ng-template>
</sq-autocomplete-list>`;

  constructor() { }

}

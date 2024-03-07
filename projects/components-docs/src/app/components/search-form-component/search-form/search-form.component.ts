import { Component, ViewChild } from '@angular/core';
import { AutocompleteItem } from '@sinequa/components/autocomplete';
import { SearchFormComponent } from '@sinequa/components/search-form';
import { LoginService } from '@sinequa/core/login';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-search-form',
  templateUrl: './search-form.component.html',
  styles: [`
.list-group-flush > .list-group-item:last-child {
  border-end-start-radius: 20px;
  border-end-end-radius: 20px;
}
  `]
})
export class DocSearchFormComponent extends BaseComponent {

  code = `<div class="d-flex position-relative mb-5">
    <sq-search-form [query]="query">
        <ng-template>
            <div class="list-group list-group-flush">
                <a role="button" *ngFor="let suggestion of filteredSuggestions"
                    class="list-group-item list-group-item-action">
                    {{suggestion.display}} <small class="ms-1 text-secondary">{{suggestion.category}}</small>
                </a>
            </div>
        </ng-template>
    </sq-search-form>
</div>`;

  code2 = `suggestions: AutocompleteItem[] = [
    { display: 'These', category: 'suggestion' },
    { display: 'are', category: 'suggestion' },
    { display: 'some', category: 'suggestion' },
    { display: 'test', category: 'suggestion' },
    { display: 'suggestions', category: 'suggestion' },
    { display: 'for', category: 'related term' },
    { display: 'the', category: 'related term' },
    { display: 'search form', category: 'related term' },
    { display: 'component', category: 'related term' },
];

get filteredSuggestions(): AutocompleteItem[] {
    return this.suggestions
        .filter(suggestion => suggestion.display.toLowerCase()
            .indexOf((this.globalService.query.text || '').toLowerCase()) !== -1);
}`;

  suggestions: AutocompleteItem[] = [
    { display: 'These', category: 'suggestion' },
    { display: 'are', category: 'suggestion' },
    { display: 'some', category: 'suggestion' },
    { display: 'test', category: 'suggestion' },
    { display: 'suggestions', category: 'suggestion' },
    { display: 'for', category: 'related term' },
    { display: 'the', category: 'related term' },
    { display: 'search form', category: 'related term' },
    { display: 'component', category: 'related term' },
  ];

  @ViewChild("searchForm") searchForm: SearchFormComponent;

  get filteredSuggestions(): AutocompleteItem[] {
    return this.suggestions
      .filter(suggestion => suggestion.display.toLowerCase()
        .indexOf((this.globalService.query.text || this.searchForm.searchInput.nativeElement.value || '').toLowerCase()) !== -1);
  }

  constructor(private loginService: LoginService) {
    super();
    this.loginService.complete = true;
  }

}

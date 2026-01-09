import { Component } from '@angular/core';
import { ManageSavedQueriesModel } from '@sinequa/components/saved-queries';
import { Query } from '@sinequa/core/app-utils';
import { MODAL_MODEL } from '@sinequa/core/modal';

const manageSavedQueriesModel: ManageSavedQueriesModel = {
  savedQueries: [
    { name: 'name1', query: new Query("_unknown") },
    { name: 'name2', query: new Query("_unknown") }
  ]
};

@Component({
    selector: 'doc-manage-saved-queries',
    templateUrl: './manage-saved-queries.component.html',
    providers: [
        { provide: MODAL_MODEL, useValue: manageSavedQueriesModel }
    ],
    standalone: false
})
export class DocManageSavedQueriesComponent {

  code1 = `<sq-manage-saved-queries></sq-manage-saved-queries>`;

  code2 = `const manageSavedQueriesModel: ManageSavedQueriesModel = {
    savedQueries: [
        { name: 'name1', query: new Query("_unknown") },
        { name: 'name2', query: new Query("_unknown") }
    ]
};

providers: [
    { provide: MODAL_MODEL, useValue: manageSavedQueriesModel }
]`;

  constructor() { }

}

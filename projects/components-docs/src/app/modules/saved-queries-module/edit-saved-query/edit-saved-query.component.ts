import { Component } from '@angular/core';
import { SavedQuery } from '@sinequa/components/saved-queries';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { Query } from "@sinequa/core/app-utils";

const savedQuery: SavedQuery = {
  name: 'name',
  query: new Query("_unknown")
};

@Component({
  selector: 'doc-edit-saved-query',
  templateUrl: './edit-saved-query.component.html',
  providers: [
    { provide: MODAL_MODEL, useValue: savedQuery }
  ]
})
export class DocEditSavedQueryComponent {

  code = `<sq-edit-saved-query></sq-edit-saved-query>`;

  code2 = `const savedQuery: SavedQuery = {
    name: 'name',
    query: new Query("_unknown")
};

providers: [
    { provide: MODAL_MODEL, useValue: savedQuery }
]`;

  constructor() { }

}

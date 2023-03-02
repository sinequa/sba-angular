import { Component } from '@angular/core';
import { DocAddLabelComponent } from './add-label/add-label.component';
import { DocDeleteLabelComponent } from './delete-label/delete-label.component';
import { DocEditLabelComponent } from './edit-label/edit-label.component';
import { DocLabelsAutocompleteComponent } from './labels-autocomplete/labels-autocomplete.component';
import { DocLabelsMenuComponent } from './labels-menu/labels-menu.component';
import { DocRenameLabelComponent } from './rename-label/rename-label.component';

@Component({
  selector: 'doc-labels-module',
  templateUrl: '../../module-template.html'
})
export class DocLabelsModuleComponent {

  title = 'Labels Module';

  components = [
    DocAddLabelComponent,
    DocDeleteLabelComponent,
    DocEditLabelComponent,
    DocLabelsAutocompleteComponent,
    DocLabelsMenuComponent,
    DocRenameLabelComponent
  ];

  constructor() { }

}

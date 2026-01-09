import { Component } from '@angular/core';
import { DocAddLabelComponent } from './add-label/add-label.component';
import { DocDeleteLabelComponent } from './delete-label/delete-label.component';
import { DocEditLabelComponent } from './edit-label/edit-label.component';
import { DocLabelsAutocompleteComponent } from './labels-autocomplete/labels-autocomplete.component';
import { DocLabelsMenuComponent } from './labels-menu/labels-menu.component';
import { DocLabelsComponent } from './labels/labels.component';
import { DocRenameLabelComponent } from './rename-label/rename-label.component';
import { DocResultLabelsComponent } from './result-labels/result-labels.component';

@Component({
    selector: 'doc-labels-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocLabelsModuleComponent {

  title = 'Labels Module';

  components = [
    DocLabelsComponent,
    DocAddLabelComponent,
    DocDeleteLabelComponent,
    DocEditLabelComponent,
    DocLabelsAutocompleteComponent,
    DocLabelsMenuComponent,
    DocRenameLabelComponent,
    DocResultLabelsComponent
  ];

  constructor() { }

}

import { Component } from '@angular/core';
import { AddLabelComponent } from './add-label/add-label.component';
import { DeleteLabelComponent } from './delete-label/delete-label.component';
import { EditLabelComponent } from './edit-label/edit-label.component';
import { LabelsAutocompleteComponent } from './labels-autocomplete/labels-autocomplete.component';
import { LabelsMenuComponent } from './labels-menu/labels-menu.component';
import { RenameLabelComponent } from './rename-label/rename-label.component';

@Component({
  selector: 'app-labels-module',
  templateUrl: '../../module-template.html'
})
export class LabelsModuleComponent {

  title = 'Labels Module';

  components = [
    AddLabelComponent,
    DeleteLabelComponent,
    EditLabelComponent,
    LabelsAutocompleteComponent,
    LabelsMenuComponent,
    RenameLabelComponent
  ];

  constructor() { }

}

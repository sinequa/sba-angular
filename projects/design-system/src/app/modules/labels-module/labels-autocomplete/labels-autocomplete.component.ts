import { Component } from '@angular/core';

@Component({
  selector: 'app-labels-autocomplete',
  templateUrl: './labels-autocomplete.component.html'
})
export class LabelsAutocompleteComponent {

  labels: string[] = ['label1', 'label2', 'label3', 'label4'];
  code = `<sq-labels-autocomplete
    [initLabels]="labels"
    [public]="true"
    [allowNewLabels]="true"
    [allowManagePublicLabels]="true">
</sq-labels-autocomplete>`;

  constructor() { }

}

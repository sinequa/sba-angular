import { Component } from '@angular/core';

@Component({
    selector: 'doc-labels-autocomplete',
    templateUrl: './labels-autocomplete.component.html',
    standalone: false
})
export class DocLabelsAutocompleteComponent {

  labels: string[] = ['label1', 'label2', 'label3', 'label4'];
  code = `<sq-labels-autocomplete
    [initLabels]="labels"
    [public]="true"
    [allowNewLabels]="true"
    [allowManagePublicLabels]="true">
</sq-labels-autocomplete>`;

}

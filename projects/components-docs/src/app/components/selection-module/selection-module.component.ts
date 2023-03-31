import { Component } from '@angular/core';
import { DocResultSelectorComponent } from './result-selector/result-selector.component';
import { DocResultsSelectorComponent } from './results-selector/results-selector.component';
import { DocSelectionArrangerComponent } from './selection-arranger/selection-arranger.component';

@Component({
  selector: 'doc-selection-module',
  templateUrl: '../../module-template.html'
})
export class DocSelectionModuleComponent {

  title = 'Selection Module';

  components = [
    DocResultSelectorComponent,
    DocResultsSelectorComponent,
    DocSelectionArrangerComponent
  ];

  constructor() { }

}

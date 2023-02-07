import { Component } from '@angular/core';
import { ResultSelectorComponent } from './result-selector/result-selector.component';
import { ResultsSelectorComponent } from './results-selector/results-selector.component';
import { SelectionArrangerComponent } from './selection-arranger/selection-arranger.component';

@Component({
  selector: 'app-selection-module',
  templateUrl: '../module-template.html'
})
export class SelectionModuleComponent {

  title = 'Selection Module';

  components = [
    ResultSelectorComponent,
    ResultsSelectorComponent,
    SelectionArrangerComponent
  ];

  constructor() { }

}

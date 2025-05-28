import { Component } from '@angular/core';
import { DocResultsGridViewComponent } from './results-grid-view/results-grid-view.component';
import { DocResultsViewSelectorComponent } from './results-view-selector/results-view-selector.component';

@Component({
  selector: 'doc-results-view-module',
  templateUrl: '../../module-template.html'
})
export class DocResultsViewModuleComponent {

  title = 'Results View Module';

  components = [
    DocResultsGridViewComponent,
    DocResultsViewSelectorComponent
  ];

  constructor() { }

}

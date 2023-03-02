import { Component } from '@angular/core';
import { ResultsGridViewComponent } from './results-grid-view/results-grid-view.component';
import { ResultsViewSelectorComponent } from './results-view-selector/results-view-selector.component';

@Component({
  selector: 'app-results-view-module',
  templateUrl: '../../module-template.html'
})
export class ResultsViewModuleComponent {

  title = 'Results View Module';

  components = [
    ResultsGridViewComponent,
    ResultsViewSelectorComponent
  ];

  constructor() { }

}

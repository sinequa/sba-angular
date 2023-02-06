import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { ResultsGridViewComponent } from './results-grid-view/results-grid-view.component';
import { ResultsViewSelectorComponent } from './results-view-selector/results-view-selector.component';

@Component({
  selector: 'app-results-view-module',
  templateUrl: './results-view-module.component.html'
})
export class ResultsViewModuleComponent {

  components = [
    ResultsGridViewComponent,
    ResultsViewSelectorComponent
  ];

  constructor(public globalService: GlobalService) { }

}

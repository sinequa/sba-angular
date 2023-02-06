import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { ResultSelectorComponent } from './result-selector/result-selector.component';
import { ResultsSelectorComponent } from './results-selector/results-selector.component';
import { SelectionArrangerComponent } from './selection-arranger/selection-arranger.component';

@Component({
  selector: 'app-selection-module',
  templateUrl: './selection-module.component.html'
})
export class SelectionModuleComponent {

  components = [
    ResultSelectorComponent,
    ResultsSelectorComponent,
    SelectionArrangerComponent
  ];

  constructor(public globalService: GlobalService) { }

}

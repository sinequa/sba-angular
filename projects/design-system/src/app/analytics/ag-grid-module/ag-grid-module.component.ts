import { Component } from '@angular/core';
import { AgGridViewComponent } from './ag-grid-view/ag-grid-view.component';

@Component({
  selector: 'app-ag-grid-module',
  templateUrl: '../../module-template.html'
})
export class AgGridModuleComponent {

  title = 'AG Grid Module';

  components = [
    AgGridViewComponent
  ];

  constructor() { }

}

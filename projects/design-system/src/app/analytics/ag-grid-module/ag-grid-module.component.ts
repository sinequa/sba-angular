import { Component } from '@angular/core';
import { DocAgGridViewComponent } from './ag-grid-view/ag-grid-view.component';

@Component({
  selector: 'doc-ag-grid-module',
  templateUrl: '../../module-template.html'
})
export class DocAgGridModuleComponent {

  title = 'AG Grid Module';
  description = ``;

  components = [
    DocAgGridViewComponent
  ];

  constructor() { }

}

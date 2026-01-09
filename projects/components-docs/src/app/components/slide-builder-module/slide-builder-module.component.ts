import { Component } from '@angular/core';
import { DocSlideBuilderComponent } from './slide-builder/slide-builder.component';
import { DocSlideListComponent } from './slide-list/slide-list.component';

@Component({
    selector: 'doc-slide-builder-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocSlideBuilderModuleComponent {

  title = 'Slide Builder Module';

  components = [
    DocSlideBuilderComponent,
    DocSlideListComponent
  ];

  constructor() { }

}

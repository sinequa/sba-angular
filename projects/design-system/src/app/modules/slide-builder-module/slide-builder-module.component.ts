import { Component } from '@angular/core';
import { SlideBuilderComponent } from './slide-builder/slide-builder.component';
import { SlideListComponent } from './slide-list/slide-list.component';

@Component({
  selector: 'app-slide-builder-module',
  templateUrl: '../../module-template.html'
})
export class SlideBuilderModuleComponent {

  title = 'Slide Builder Module';

  components = [
    SlideBuilderComponent,
    SlideListComponent
  ];

  constructor() { }

}

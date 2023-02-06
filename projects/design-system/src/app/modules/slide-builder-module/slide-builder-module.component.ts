import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { SlideBuilderComponent } from './slide-builder/slide-builder.component';
import { SlideListComponent } from './slide-list/slide-list.component';

@Component({
  selector: 'app-slide-builder-module',
  templateUrl: './slide-builder-module.component.html'
})
export class SlideBuilderModuleComponent {

  components = [
    SlideBuilderComponent,
    SlideListComponent
  ];

  constructor(public globalService: GlobalService) { }

}

import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-slide-builder-module',
  templateUrl: './slide-builder-module.component.html'
})
export class SlideBuilderModuleComponent {

  constructor(public globalService: GlobalService) { }

}

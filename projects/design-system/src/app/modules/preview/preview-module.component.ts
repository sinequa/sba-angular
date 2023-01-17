import { Component } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-preview-module',
  templateUrl: './preview-module.component.html'
})
export class PreviewModuleComponent {

  constructor(public globalService: GlobalService) { }

}

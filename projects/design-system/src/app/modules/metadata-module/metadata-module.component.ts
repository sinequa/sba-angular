import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-metadata-module',
  templateUrl: './metadata-module.component.html'
})
export class MetadataModuleComponent {

  constructor(public globalService: GlobalService) { }

}

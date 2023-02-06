import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { MetadataComponent } from './metadata/metadata.component';

@Component({
  selector: 'app-metadata-module',
  templateUrl: './metadata-module.component.html'
})
export class MetadataModuleComponent {

  components = [
    MetadataComponent
  ];

  constructor(public globalService: GlobalService) { }

}

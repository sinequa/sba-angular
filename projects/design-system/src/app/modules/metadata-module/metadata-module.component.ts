import { Component } from '@angular/core';
import { MetadataComponent } from './metadata/metadata.component';

@Component({
  selector: 'app-metadata-module',
  templateUrl: '../module-template.html'
})
export class MetadataModuleComponent {

  title = 'Metadata Module';

  components = [
    MetadataComponent
  ];

  constructor() { }

}

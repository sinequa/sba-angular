import { Component } from '@angular/core';
import { DocMetadataComponent } from './metadata/metadata.component';

@Component({
  selector: 'doc-metadata-module',
  templateUrl: '../../module-template.html'
})
export class DocMetadataModuleComponent {

  title = 'Metadata Module';
  description = ``;

  components = [
    DocMetadataComponent
  ];

  constructor() { }

}

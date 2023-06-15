import { Component } from '@angular/core';
import { DocMetadataComponent } from './metadata/metadata.component';
import { DocMetadataItemComponent } from './metadata-item/metadata-item.component';

@Component({
  selector: 'doc-metadata-module',
  templateUrl: '../../module-template.html'
})
export class DocMetadataModuleComponent {

  title = 'Metadata Module';

  components = [
    DocMetadataComponent,
    DocMetadataItemComponent
  ];

  constructor() { }

}

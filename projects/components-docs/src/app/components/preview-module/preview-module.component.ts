import { Component } from '@angular/core';
import { DocPreviewComponent } from './preview/preview.component';
import { DocPreviewSearchFormComponent } from './preview-search-form/preview-search-form.component';

@Component({
  selector: 'doc-preview-module',
  templateUrl: '../../module-template.html'
})
export class DocPreviewModuleComponent {

  title = 'Preview Module';

  components = [
    DocPreviewComponent,
    DocPreviewSearchFormComponent
  ];

  constructor() { }

}

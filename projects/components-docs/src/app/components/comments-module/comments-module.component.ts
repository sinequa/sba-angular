import { Component } from '@angular/core';
import { DocCommentsComponent } from './comments/comments.component';

@Component({
    selector: 'doc-comments-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocCommentsModuleComponent {

  title = 'Comments Module';

  components = [
    DocCommentsComponent
  ];

  constructor() { }

}

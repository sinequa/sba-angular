import { Component } from '@angular/core';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-comments-module',
  templateUrl: '../../module-template.html'
})
export class CommentsModuleComponent {

  title = 'Comments Module';

  components = [
    CommentsComponent
  ];

  constructor() { }

}

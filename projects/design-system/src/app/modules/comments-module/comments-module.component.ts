import { Component } from '@angular/core';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-comments-module',
  templateUrl: './comments-module.component.html'
})
export class CommentsModuleComponent {

  components = [
    CommentsComponent
  ];

  constructor() { }

}

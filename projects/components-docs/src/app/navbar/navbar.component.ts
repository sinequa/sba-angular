import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'doc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class DocNavbarComponent {

  isMock: boolean = environment.mock;

  constructor() { }

}

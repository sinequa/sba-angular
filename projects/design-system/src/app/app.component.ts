import { Component } from '@angular/core';
import {RESULTS} from "../mocks/results";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  results: any = RESULTS;

  constructor() {
  }
}

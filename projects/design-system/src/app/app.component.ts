import { Component } from '@angular/core';
import { ComponentWithLogin } from '@sinequa/core/login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends ComponentWithLogin {

  constructor() {
    super();
  }
}

import { AfterViewInit, Component } from '@angular/core';
import { LoginService } from '@sinequa/core/login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  constructor(private loginService: LoginService) {
  }

  ngAfterViewInit(): void {
    this.loginService.login();
  }
}

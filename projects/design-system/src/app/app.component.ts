import { AfterViewInit, Component } from '@angular/core';
import { LoginService } from '@sinequa/core/login';
import { GlobalService } from './global.service';


@Component({
  selector: 'doc-root',
  templateUrl: './app.component.html'
})
export class DocAppComponent implements AfterViewInit {

  constructor(private loginService: LoginService,
    public globalService: GlobalService) {
  }

  ngAfterViewInit(): void {
    this.loginService.login();
  }
}

import { Component, OnInit } from '@angular/core';
import { LoginService } from '@sinequa/core/login';
import { BaseComponent } from './shared/base.component';


@Component({
  selector: 'doc-root',
  templateUrl: './app.component.html'
})
export class DocAppComponent extends BaseComponent implements OnInit {

  constructor(private loginService: LoginService) {
    super();
  }

  ngOnInit(): void {
    this.loginService.login();
  }
}

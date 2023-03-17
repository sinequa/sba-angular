import { Component, OnInit } from '@angular/core';
import { LoginService } from '@sinequa/core/login';
import { GlobalService } from './global.service';


@Component({
  selector: 'doc-root',
  templateUrl: './app.component.html'
})
export class DocAppComponent implements OnInit {

  constructor(private loginService: LoginService,
    public globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.loginService.login();
  }
}

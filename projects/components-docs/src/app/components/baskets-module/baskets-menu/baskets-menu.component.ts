import { Component } from '@angular/core';
import { BasketsService } from '@sinequa/components/baskets';
import { LoginService } from '@sinequa/core/login';
import { environment } from 'src/environments/environment';
import { baskets } from 'src/mocks/data/user-settings';

@Component({
  selector: 'doc-baskets-menu',
  templateUrl: './baskets-menu.component.html'
})
export class DocBasketsMenuComponent {

  code = `<ul class="navbar-nav">
    <sq-baskets-menu></sq-baskets-menu>
</ul>`;

  constructor(private basketsService: BasketsService,
    private loginService: LoginService) {
    if (environment.mock) {
      this.basketsService.updateBaskets(baskets);
      this.loginService.complete = true;
    }
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { LoginService } from '@sinequa/core/login';
import { BasketsService } from '../../baskets.service';

@Component({
  selector: 'sq-baskets-menu',
  templateUrl: './baskets-menu.component.html'
})
export class BsBasketsMenuComponent implements OnInit {

  @Input() icon: string = "fas fa-shopping-basket";
  @Input() autoAdjust: boolean = true;
  @Input() autoAdjustBreakpoint: string = 'xl';
  @Input() collapseBreakpoint: string = 'sm';
  @Input() size: string;

  menu: Action | undefined;

  // Basket actions
  createAction: Action;
  manageAction: Action;

  constructor(
    public loginService: LoginService,
    public basketsService: BasketsService) {

    this.createAction = new Action({
      text: "msg#baskets.createBasket",
      title: "msg#baskets.createBasket",
      action: _ => { this.basketsService.createBasketModal(); }
    });

    this.manageAction = new Action({
      text: "msg#baskets.manageBaskets",
      title: "msg#baskets.manageBaskets",
      action: _ => { this.basketsService.manageBasketsModal(); }
    });
  }

  ngOnInit() {
    this.updateMenu();
    this.basketsService.changes.subscribe({
      next: () => { this.updateMenu(); }
    });
    this.loginService.events.subscribe(event => {
      if(event.type === "session-changed"){
        this.updateMenu();
      }
    });
  }

  updateMenu() {

    if (!this.loginService.complete) {
        this.menu = undefined;
        return;
    }

    let basketsActions: Action[] = [];

    if (this.basketsService.hasBasket) {
        let scrollGroup = new Action({
            scrollGroup: true,
            children: []
        });
        basketsActions.push(scrollGroup);
        for (let i = 0, ic = this.basketsService.baskets.length; i < ic; i++) {
            let basket = this.basketsService.baskets[i];
            scrollGroup.children.push(new Action({
                text: basket.name,
                title: basket.name,
                data: basket,
                action: _ => { this.basketsService.searchBasket(basket); }
            }));
        }
    }

    basketsActions.push(this.createAction);

    if (this.basketsService.hasBasket) {
      basketsActions.push(this.manageAction);
    }

    this.menu = new Action({
      icon: this.icon,
      text: "msg#baskets.baskets",
      title: "msg#baskets.baskets",
      children: basketsActions
    });
  }
}

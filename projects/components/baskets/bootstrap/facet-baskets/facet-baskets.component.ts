import { Component, Input } from '@angular/core';
import { BasketsService, Basket, BasketEventType } from '../../baskets.service';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';

@Component({
  selector: 'sq-facet-baskets',
  templateUrl: './facet-baskets.component.html',
  styles: [`
.basket-item .basket-delete{
    opacity: 0;
}

.basket-item:hover .basket-delete{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
})
export class BsFacetBasketsComponent extends AbstractFacet {
  @Input() searchRoute: string = "/search";
  @Input() maxBaskets: number = 5;
  @Input() enableDelete: boolean = true;

  page: number = 0;

  createBasket: Action;
  manageBasket: Action;
  previousPage: Action;
  nextPage: Action;

  constructor(
    public basketsService: BasketsService) {
    super();

    this.createBasket = new Action({
      icon: "fas fa-plus",
      title: "msg#baskets.createBasket",
      action: () => {
        this.basketsService.createBasketModal();
      }
    });

    this.manageBasket = new Action({
      icon: "fas fa-cog",
      title: "msg#baskets.manageBaskets",
      action: () => {
        this.basketsService.manageBasketsModal();
      }
    });

    this.previousPage = new Action({
      icon: "fas fa-chevron-left",
      title: "msg#facet.previous",
      action: () => {
        this.page--;
      },
      updater: (action: Action) => {
        action.disabled = this.page <= 0;
        action.hidden = this.maxPage === 0;
      }
    });

    this.nextPage = new Action({
      icon: "fas fa-chevron-right",
      title: "msg#facet.next",
      action: () => {
        this.page++;
      },
      updater: (action: Action) => {
        action.disabled = this.page >= this.maxPage;
        action.hidden = this.maxPage === 0;
      }
    });
  }

  get maxPage(): number {
    return Math.max(0, Math.ceil(this.basketsService.baskets.length / this.maxBaskets) - 1);
  }

  get startIndex(): number {
    return this.page * this.maxBaskets;
  }

  get endIndex(): number {
    return (this.page+1) * this.maxBaskets;
  }

  openBasket(basket: Basket){
    this.basketsService.notifyOpenBasket(basket)
    return true;
  }

  get actions(): Action[] {
    this.previousPage.update();
    this.nextPage.update();
    return [this.createBasket, this.previousPage, this.nextPage, this.manageBasket];
  }

  deleteBasket(basket: Basket, event: Event){
    event.stopPropagation();
    this.basketsService.deleteBasket(basket);
    this.page = Math.min(this.page, this.maxPage);
    return false;
  }

  getQueryParams(basket: Basket) {
    const query = this.basketsService.makeQuery(basket);
    const queryParams = query.toJsonForQueryString();
    return {query: queryParams};
  }

  getRouterState(basket: Basket) {
    return {
      audit: {
        type: BasketEventType.Open,
        detail: {
          basket: basket.name
        }
      }
    }
  }
}

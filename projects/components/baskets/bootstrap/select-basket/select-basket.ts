import {Component, OnInit, Inject} from "@angular/core";
import {MODAL_MODEL, ModalRef, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Basket, BasketsService, SelectBasketModel} from "../../baskets.service";

@Component({
    selector: "sq-select-basket",
    templateUrl: "./select-basket.html"
})
export class BsSelectBasket implements OnInit {
    baskets: Basket[];
    buttons: ModalButton[];

    constructor(
        @Inject(MODAL_MODEL) public model: SelectBasketModel,
        private basketsService: BasketsService,
        private modalRef: ModalRef) {
        this.baskets = this.basketsService.baskets;

        if (!this.baskets) {
            this.baskets = [];
        }

        this.buttons = [
            new ModalButton({
                result: ModalResult.Cancel
            })
        ];
    }

    ngOnInit(): void {
        if (!!this.model.basketFilter) {
            this.baskets = this.baskets.filter(this.model.basketFilter);
        }
    }

    activate(model) {
        this.model = model;
    }

    select(basket: Basket) {
        if (basket) {
            this.model.basket = basket;
            this.modalRef.close(ModalResult.OK);
        }
    }

    newBasket(){
        const model : Basket = {name : ""};
        this.basketsService.createBasketModal(model)
            .then((result) => {
                if(result){ // The basket was created
                    this.select(model);
                }
            });
    }
}

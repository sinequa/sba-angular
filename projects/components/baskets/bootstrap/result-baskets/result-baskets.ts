import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Record } from "@sinequa/core/web-services";
import { ModalService, ModalResult } from "@sinequa/core/modal";
import { BasketsService, Basket } from "../../baskets.service";
import { Action } from "@sinequa/components/action";

/**
 * Component representing the add-to-baskets button in one item of the result list view.
 *
 */
@Component({
    selector: 'sq-result-baskets',
    templateUrl: './result-baskets.html'
})
export class BsResultBaskets implements OnChanges, OnDestroy {
    @Input() record: Record;
    @Input() rightAligned: boolean;

    public basketsAction: Action;
    private addToBasketAction: Action;
    private removeFromBasketAction: Action;
    private removeFromAllBasketsAction: Action;

    private baskets: string[];
    private initialized: boolean;
    private basketsSubscription: Subscription;

    constructor(
        private modalService: ModalService,
        private basketsService: BasketsService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.baskets = [];
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.initialized) {
            this.initialized = true;
            this.addToBasketAction = this.buildAddToBasketAction();
            this.removeFromBasketAction = this.buildRemoveFromBasketAction();
            this.removeFromAllBasketsAction = this.buildRemovalFromAllBasketsAction();
            this.basketsSubscription = this.basketsService.changes.subscribe(event => {
                this.updateRecordBaskets();
                this.refreshVisualization();
            });
        }
        this.updateRecordBaskets();
        this.refreshVisualization();
    }

    ngOnDestroy(): void {
        if (this.basketsSubscription) {
            this.basketsSubscription.unsubscribe();
        }
    }

    public get isInBaskets(): boolean {
        return this.baskets.length > 0;
    }

    private refreshVisualization(): void {
        this.basketsAction = this.buildBasketsAction();
        this.changeDetectorRef.markForCheck();
    }

    private updateRecordBaskets(): void {
        const currentBaskets: Basket[] = this.basketsService.baskets;
        this.baskets = [];
        for (const basket of currentBaskets) {
            if (!!basket.ids && basket.ids.includes(this.record.id)) {
                this.baskets.push(basket.name);
            }
        }
    }

    private buildAddToBasketAction(): Action {
        return new Action({
            text: 'msg#baskets.addToBasket',
            action: (item, $event) => {
                this.basketsService.addToBasketModal(this.record.id, this.baskets);
            }
        });
    }

    private buildRemoveFromBasketAction(): Action {
        return new Action({
            text: 'msg#baskets.removeFromBasket',
            action: (item, $event) => {
                this.basketsService.removeFromBasketModal(this.record.id, this.baskets);
            }
        });
    }

    private buildRemovalFromAllBasketsAction(): Action {
        return new Action({
            text: 'msg#baskets.removeFromAllBaskets',
            action: () => {
                this.modalService
                    .yesNo(
                        'msg#baskets.removeFromAllBasketsConfirmation',
                        {values: {baskets: this.baskets.join(', ')}})
                    .then(result => {
                        if (result === ModalResult.Yes) {
                            this.basketsService.removeFromAllBaskets(this.record.id);
                        }
                    });
            }
        });
    }

    private buildBasketsAction(): Action {
        return new Action({
            icon: 'fas fa-shopping-basket',
            title: 'msg#baskets.baskets',
            children: this.isInBaskets
                ? this.baskets.length === 1
                    ? [this.addToBasketAction, this.removeFromBasketAction]
                    : [this.addToBasketAction, this.removeFromBasketAction, this.removeFromAllBasketsAction]
                : [this.addToBasketAction]
        });
    }
}

import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import { Utils } from "@sinequa/core/base";
import {Action} from "../../action";
import { ActionSize } from "../../typings";

@Component({
    selector: "sq-action-menu",
    templateUrl: "./action-menu.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BsActionMenu implements OnInit{
    /**
     * the children `Action` elements of the menu
     */
    @Input() items: Action[];
    @Input() size: ActionSize;
    @Input() autoAdjust: boolean;
    @Input() autoAdjustBreakpoint: ActionSize;
    @Input() collapseBreakpoint: ActionSize;
    /**
     * whether the menu elements are right-aligned
     */
    @Input() right: boolean;

    ngOnInit() {
        this.items = Utils.asArray(this.items);
    }

    identify(index:number, item: Action) {
        return item.name || item.text || item.title || index;
    }
}

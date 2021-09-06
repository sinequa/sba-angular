import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Action} from "../../action";

@Component({
    selector: "sq-action-menu",
    templateUrl: "./action-menu.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsActionMenu implements OnInit{
    @Input() items: Action[];
    @Input() size: string;
    @Input() autoAdjust: boolean;
    @Input() autoAdjustBreakpoint: string;
    @Input() collapseBreakpoint: string;
    @Input() right: boolean;

    ngOnInit() {
        if (!Utils.isArray(this.items)) {
            this.items = [<Action>this.items];
        }
    }

    identify(index:number, item: Action) {
        return item.name || item.text || item.title || index;
    }
}
import {Component, HostBinding, Input} from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { Action } from "../../action";
import { ActionButtonsOptions, ActionItemOptions } from "../../typings";

@Component({
    selector: "[sq-action-buttons]",
    templateUrl: "./action-buttons.html",
    styles: [`
    :host-context(.dark)
        button.btn-light {
            filter: invert(0.76);
        }
    `]
})
export class BsActionButtons {
    @HostBinding('class') klass = "sq-action-buttons";

    private _options: ActionButtonsOptions;

    @Input("sq-action-buttons")
    set options (opts: ActionButtonsOptions) {
        this._options = opts;
    }
    get options(): ActionButtonsOptions {
        return this._options;
    }

    get sizeClass(): string {
        return this._options.size ? `btn-${this._options.size}` : "";
    }

    get styleClass(): string {
        return this._options.style ? `btn-${this._options.style}` : "btn-light";
    }

    get itemsVisible(): Action[] {
        // hidden items are not displayed
        return Utils.asArray(this._options.items).filter(item => !item.hidden);
    }

    getActionItemOptions(item: Action): ActionItemOptions {
        return ({...this._options, item, inMenu: false});
    }

    itemClick(item: Action, event: UIEvent) {
        if (!item.disabled && item.action) {
            item.action(item, event);
        }
        if (item.href === "#" || (!!item.href && item.disabled)) {
            event.preventDefault();
        }
    }
}

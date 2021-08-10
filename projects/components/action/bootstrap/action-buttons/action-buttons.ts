import {Component, Input} from "@angular/core";
import {ActionItemOptions} from "..";
import {Action} from "../../action";

export interface ActionButtonsOptions {
    items: Action[] | Action;
    size?: string;
    style?: string;
    autoAdjust?: boolean;
    autoAdjustBreakpoint?: string;
    rightAligned?: boolean;
}

@Component({
    selector: "[sq-action-buttons]",
    templateUrl: "./action-buttons.html"
})
export class BsActionButtons {
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
        return (Array.isArray(this._options.items)) ? this._options.items.filter(item => !item.hidden) : this._options.items.hidden ? [] : [this._options.items];
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
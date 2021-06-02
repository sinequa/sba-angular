import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
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
    templateUrl: "./action-buttons.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsActionButtons {
    itemsVisible: Action[];
    private _options: ActionButtonsOptions;
    
    @Input("sq-action-buttons")
    set options (opts: ActionButtonsOptions) {
        this._options = opts;
        // hidden items are not displayed
        this.itemsVisible = (Array.isArray(opts.items)) ? opts.items.filter(item => !item.hidden) : opts.items.hidden ? [] : [opts.items];
    }
    get options(): ActionButtonsOptions {
        return this._options;
    }

    get sizeClass(): string {
        return this.options.size ? `btn-${this.options.size}` : "";
    }

    get styleClass(): string {
        return this.options.style ? `btn-${this.options.style}` : "btn-light";
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
import {Component, Input} from "@angular/core";
import {Action} from "../../action";

export interface ActionButtonsOptions {
    items: Action[] | Action;
    size?: string;
    style?: string;
    autoAdjust: boolean;
    autoAdjustBreakpoint?: string;
    rightAligned: boolean;
}

@Component({
    selector: "[sq-action-buttons]",
    templateUrl: "./action-buttons.html"
})
export class BsActionButtons {
    @Input("sq-action-buttons") options: ActionButtonsOptions;
            
    get sizeClass(): string {
        return this.options.size ? `btn-${this.options.size}` : "";
    }
    
    get styleClass(): string {
        return this.options.style ? `btn-${this.options.style}` : "btn-light";
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
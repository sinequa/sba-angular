import {Component, HostBinding, Input} from "@angular/core";
import {Action} from "../../action";

@Component({
    selector: "[sq-action-item-content], sq-action-item-content",
    templateUrl: "./action-item-content.html",
    styles: [`
.sq-action-item-content-container span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.sq-action-item-content-container > div:not(:last-child) {
    margin-right: 0.25rem;
}
    `]
})
export class BsActionItemContent {
    @HostBinding('class') klass = 'sq-action-item-content';

    @Input() item: Action;
    @Input() text: string;
    @Input("in-dropdown-menu") inDropdownMenu: boolean;

    componentClick(event: UIEvent) {
        if (this.item.action && !this.item.disabled) {
            this.item.action(this.item, event);
        }
        event.stopPropagation();
        return false;
    }
}
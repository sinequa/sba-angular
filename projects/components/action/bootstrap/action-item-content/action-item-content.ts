import {Component, Input} from "@angular/core";
import {Action} from "../../action";

@Component({
    selector: "sq-action-item-content",
    templateUrl: "./action-item-content.html",
    styles: [`
.sq-action-item-content-container > div:not(:last-child) {
    margin-right: 0.25rem;
}
    `]
})
export class BsActionItemContent {
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
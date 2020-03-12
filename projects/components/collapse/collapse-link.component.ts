import {Component, Input, Output, EventEmitter} from "@angular/core";

export interface CollapseStateChange {
    group: string;
    collapsed: boolean;
}

@Component({
    selector: "sq-collapse-link",
    templateUrl: "./collapse-link.component.html"
})
export class CollapseLink {
    @Input() title: string = "";
    @Input() icon: string = "";
    @Input() text: string = "";
    @Input() group: string;
    @Output() stateChange = new EventEmitter<CollapseStateChange>();
    collapsed: boolean = true;

    constructor() {
    }

    click() {
        this.collapsed = !this.collapsed;
        this.stateChange.emit({group: this.group, collapsed: this.collapsed});
        return false; // Prevent following href
    }
}
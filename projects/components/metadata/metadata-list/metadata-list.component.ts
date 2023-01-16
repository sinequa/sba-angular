import { Component, Input } from "@angular/core";
import { Record } from "@sinequa/core/web-services";

@Component({
    selector: "sq-metadata-list",
    templateUrl: "./metadata-list.component.html"
})
export class MetadataListComponent {
    @Input() record: Record;
    @Input() items: string[];

    @Input() showTitles = true;
    @Input() showIcons = true;

    constructor() {
    }
}
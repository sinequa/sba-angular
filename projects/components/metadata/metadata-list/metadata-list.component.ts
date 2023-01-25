import { Component, Input } from "@angular/core";
import { Query } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";

@Component({
    selector: "sq-metadata-list",
    templateUrl: "./metadata-list.component.html",
    styles: [`.metadata-inline {
    sq-metadata-2 {
        display: inline-flex;
    }
}

.metadata-tabular {
    .metadata {
        display: block;
    }
}`]
})
export class MetadataListComponent {
    @Input() record: Record;
    @Input() items: string[];
    @Input() query?: Query;
    @Input() customClass?: string;
    @Input() style: 'inline' | 'tabular' = 'inline';

    @Input() showTitles = true;
    @Input() showIcons = true;
    @Input() showCounts = true;
    @Input() showEntityTooltip: false;
    @Input() clickable = true;

    constructor() {
    }
}
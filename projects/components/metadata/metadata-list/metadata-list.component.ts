import { Component, Input } from "@angular/core";
import { Query } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import { MetadataConfig } from "../metadata.service";

@Component({
    selector: "sq-metadata-list",
    templateUrl: "./metadata-list.component.html",
    styleUrls: ['./metadata-list.component.scss']
})
export class MetadataListComponent {
    @Input() record: Record;
    @Input("config") configItems: MetadataConfig[];
    @Input() query?: Query;
    @Input() customClass?: string;
    @Input() style: 'inline' | 'tabular' | 'flex' = 'inline';

    @Input() showTitles = true;
    @Input() showIcons = true;
    @Input() showCounts = true;
    @Input() showEntityTooltip: false;

    constructor() {
    }
}
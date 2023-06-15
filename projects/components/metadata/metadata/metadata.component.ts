import { Component, Input } from "@angular/core";
import { Query } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import { MetadataConfig } from "../metadata.interface";

@Component({
    selector: "sq-metadata",
    templateUrl: "./metadata.component.html",
    styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent {
    @Input() record: Record;
    @Input() query?: Query;
    @Input() layout: 'inline' | 'table' = 'inline';

    /**
     * The metadata config with the list of metadata to display
     * It can also be strings to be put in between
     */
    @Input() config: (MetadataConfig | string)[];
    /**
     * Class for the tooltip buttons
     */
    @Input() actionsButtonsStyle = 'btn btn-secondary';
    /**
     * Size for the tooltip buttons
     */
    @Input() actionsButtonsSize = 'sm';

    isString(config) {
        return typeof config === 'string';
    }
}
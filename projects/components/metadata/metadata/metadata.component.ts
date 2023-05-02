import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Query } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import { MetadataConfig } from "../metadata.service";

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
     * Whether the metadata title should be displayed
     */
    @Input() showTitles;
    /**
     * Whether the format icon should be displayed for the docformat metadata
     */
    @Input() showFormatIcons;
    /**
     * Whether the metadata applied in the filters should be highlighted
     */
    @Input() showFiltersHighlights;
    /**
     * Whether multiple rows item should be collapsed
     */
    @Input() collapseRows = true;
    /**
     * Number of lines to display in the entity tooltip
     */
    @Input() tooltipLinesNumber = 8;
    /**
     * Class for the tooltip buttons
     */
    @Input() actionsButtonsStyle = 'btn btn-primary';
    /**
     * Size for the tooltip buttons
     */
    @Input() actionsButtonsSize = 'sm';

    @Output() filter = new EventEmitter();
    @Output() exclude = new EventEmitter();

    isString(config) {
        return typeof config === 'string';
    }
}
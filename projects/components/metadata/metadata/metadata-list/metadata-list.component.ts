import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Query } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import { MetadataConfig } from "../../metadata.service";

@Component({
    selector: "sq-metadata-list",
    templateUrl: "./metadata-list.component.html",
    styleUrls: ['./metadata-list.component.scss']
})
export class MetadataListComponent {
    @Input() record: Record;
    @Input() query?: Query;
    @Input() style: 'inline' | 'tabular' | 'flex' = 'inline';

    /**
     * Allows to override the default METADATA_CONFIG config value if you
     * want to have a metadata-list component with another behavior
     */
    @Input() config?: MetadataConfig[];

    /**
     * Whether the metadata title should be displayed
     */
    @Input() showTitles = true;
    /**
     * Whether the format icon should be displayed for the docformat metadata
     */
    @Input() showFormatIcons = true;
    /**
     * Whether the metadata icon should be shown
     */
    @Input() showIcons = true;
    /**
     * Whether the metadata applied in the filters should be highlighted
     */
    @Input() showFiltersHighlights = true;
    /**
     * Whether multiple rows item should be collapsed
     */
    @Input() collapseRows: boolean = true;
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
}
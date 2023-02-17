import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { Query, ValueItem } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import { MetadataService } from "../metadata.service";

@Component({
    selector: "sq-metadata-list",
    templateUrl: "./metadata-list.component.html",
    styleUrls: ['./metadata-list.component.scss']
})
export class MetadataListComponent implements OnChanges {
    @Input() record: Record;
    @Input() query?: Query;
    @Input() customClass?: string;
    @Input() style: 'inline' | 'tabular' | 'flex' = 'inline';

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

    @Output() filter = new EventEmitter();
    @Output() exclude = new EventEmitter();

    constructor(private metadataService: MetadataService,
        private searchService: SearchService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        // Generate the metadata data
        if (!!changes.record && !this.record.$metadataValues) {
            this.metadataService.setMetadata(this.record, this.query);
        } else if (!!changes.query) {
            this.metadataService.setMetadata(this.record, this.query);
        }
    }

    filterItem(item: string, valueItem: ValueItem) {
        this.searchService.addFieldSelect(item, valueItem);
        this.searchService.search();
        this.filter.emit();
    }

    excludeItem(item: string, valueItem: ValueItem) {
        this.searchService.addFieldSelect(item, valueItem, {not: true});
        this.searchService.search();
        this.exclude.emit();
    }
}
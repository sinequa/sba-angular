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

    @Input() showTitles = true;
    @Input() showIcons = true;
    @Input() showCounts = true;

    @Output() filter = new EventEmitter();
    @Output() exclude = new EventEmitter();

    constructor(private metadataService: MetadataService,
        private searchService: SearchService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        // Generate the metadata data
        if (!!changes.record && !this.record.$metadataValues) {
            this.metadataService.setMetadata(this.record);
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
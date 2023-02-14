import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Query } from "@sinequa/core/app-utils";
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

    constructor(private metadataService: MetadataService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        // Generate the metadata data
        if (!!changes.record && !this.record.$metadataValues) {
            this.metadataService.setMetadata(this.record);
        }
    }
}
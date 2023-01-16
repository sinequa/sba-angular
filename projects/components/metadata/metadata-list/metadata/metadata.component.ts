import { Component, Input, OnChanges } from "@angular/core";
import { Record } from "@sinequa/core/web-services";

@Component({
    selector: "sq-metadata-2",
    templateUrl: "./metadata.component.html",
    styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnChanges {
    @Input() record: Record;
    @Input() item: string;
    @Input() customClass?: string;

    @Input() showIcon = true;
    @Input() showTitle = true;

    display = false;

    get value() {
        return this.record[this.item];
    }

    constructor() {
    }

    ngOnChanges() {
        this.display = !!this.item && !!this.record && !!this.record[this.item];
    }

}

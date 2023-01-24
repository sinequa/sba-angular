import { Component, Input, OnChanges } from "@angular/core";
import { Record } from "@sinequa/core/web-services";
import { IconService } from "../../icon.service";

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
    icon: string;

    get value() {
        return this.record[this.item];
    }

    constructor(private iconService: IconService) {
    }

    ngOnChanges() {
        this.display = !!this.item && !!this.record && !!this.record[this.item];
        if (!!this.item) {
            this.icon = this.item === 'docformat'
                ? this.iconService.getFormatIcon(this.record[this.item]) || ''
                : this.iconService.getIcon(this.item) || '';
        }
    }

}

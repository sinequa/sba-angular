import { Component, Input, OnChanges } from "@angular/core";
import { AppService, Query } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import { IconService } from "../../icon.service";
import { MetadataValue } from "../../metadata.service";

@Component({
    selector: "sq-metadata-2",
    templateUrl: "./metadata.component.html",
    styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnChanges {
    @Input() record: Record;
    @Input() query?: Query;
    @Input() config: MetadataValue;
    @Input() style: 'inline' | 'tabular' | 'flex' = 'inline';
    @Input() customClass?: string;

    @Input() showIcon = true;
    @Input() showFormatIcon = true;
    @Input() showTitle = true;
    @Input() showCounts = true;

    display = false;
    valueIcon: string;
    itemLabelMessageParams: any;

    get isClickable(): boolean {
        return !!this.config.filterable || !!this.config.excludable;
    }

    get label(): string {
        return this.appService.getLabel(this.config.item);
    }

    get placement(): string {
        return this.style === 'inline' ? 'top' : 'top-start';
    }

    constructor(private iconService: IconService,
        private appService: AppService) {
    }

    ngOnChanges() {
        this.display = !!this.config.item && !!this.record && !!this.record[this.config.item];
        if (!!this.config.item) {
            if (this.config.item === 'docformat') {
                this.valueIcon = this.iconService.getFormatIcon(this.record[this.config.item]) || '';
            }
            this.itemLabelMessageParams = { values: { label: this.appService.getLabel(this.config.item) } };
        }
    }

    select(index, subindex?) {
        console.log(index, subindex);
    }

}

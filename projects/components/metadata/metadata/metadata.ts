import {Component, Input, Output, EventEmitter, HostBinding} from "@angular/core";
import {AppService, ValueItem} from "@sinequa/core/app-utils";
import {Record} from "@sinequa/core/web-services";

export type Spacing = "compact" | "default" | "comfortable";

@Component({
    selector: "sq-metadata",
    templateUrl: "./metadata.html"
})
export class Metadata {
    @Input() record: Record;
    @Input() items: string[];
    @Input() showTitles: boolean = true;
    @Input() showIcons: boolean = false;
    @Input() clickable: boolean = true;
    @Input() spacing: Spacing = "default";
    @HostBinding("class.sq-metadata") true;
    @HostBinding("class.sq-tabular") @Input() tabular: boolean = true;
    @Output("select") _select = new EventEmitter<{item: string, valueItem: ValueItem}>();

    constructor(
        public appService: AppService) {
    }

    select(item: string, valueItem: ValueItem) {
        this._select.emit({item: item, valueItem: valueItem});
    }
}
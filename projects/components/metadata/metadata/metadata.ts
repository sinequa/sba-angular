import {Component, Input, Output, EventEmitter, HostBinding} from "@angular/core";
import {SearchService} from "@sinequa/components/search";
import {AppService, ValueItem} from "@sinequa/core/app-utils";
import {Record} from "@sinequa/core/web-services";

@Component({
    selector: "sq-metadata",
    templateUrl: "./metadata.html",
    styleUrls: ["./metadata.scss"]
})
export class Metadata {
    @Input() record: Record;
    @Input() items: string[];
    @Input() showTitles: boolean = true;
    @Input() showIcons: boolean = false;
    @Input() showCounts: boolean = true;
    @Input() clickable: boolean = true;
    @HostBinding("class.sq-tabular") @Input() tabular: boolean = true;
    @Input() collapseRows: boolean = true;
    @Input() searchOnClick: boolean = true;
    
    @Output("select") _select = new EventEmitter<{item: string, valueItem: ValueItem}>();

    constructor(
        public appService: AppService, 
        public searchService: SearchService) {
    }

    select(item: string, valueItem: ValueItem) {
        if(this.searchOnClick) {
            this.searchService.addFieldSelect(item, valueItem);
            this.searchService.search();
        }
        this._select.emit({item: item, valueItem: valueItem});
    }
}
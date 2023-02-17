import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { UIService } from "@sinequa/components/utils";
import { AppService, Query, ValueItem } from "@sinequa/core/app-utils";
import { DocumentAccessLists, Record } from "@sinequa/core/web-services";
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
    @Input() showFormatIcons = true;
    @Input() showTitle = true;
    @Input() showFiltersHighlights = true;
    @Input() collapseRows: boolean = true;

    @Output() filter = new EventEmitter();
    @Output() exclude = new EventEmitter();

    display = false;
    valueIcon: string;
    itemLabelMessageParams: any;

    @ViewChild('values') valuesEl: ElementRef<HTMLElement>;
    lineHeight: number;
    valuesMaxHeight: number;
    valuesHeight: number | undefined;

    get isClickable(): boolean {
        return !!this.config.filterable || !!this.config.excludable;
    }

    get label(): string {
        return this.appService.getLabel(this.config.item);
    }

    get isAccessLists(): boolean {
        return this.config.item === "accesslists";
    }

    get accessListsData(): DocumentAccessLists {
        return this.record.accesslists;
    }

    get placement(): string {
        return this.style === 'inline' ? 'top' : 'top-start';
    }

    get collapsed(): boolean {
        return this.valuesHeight === this.lineHeight;
    }

    get needsCollapse(): boolean {
        return this.valuesMaxHeight > this.lineHeight * 2;
    }

    constructor(private iconService: IconService,
        private appService: AppService,
        private el: ElementRef,
        private ui: UIService) {
        this.ui.addElementResizeListener(this.el.nativeElement, this.onResize);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.display = !!this.config.item && !!this.record && !!this.record[this.config.item];
        if (!!this.config.item) {
            if (this.config.item === 'docformat') {
                this.valueIcon = this.iconService.getFormatIcon(this.record[this.config.item]) || '';
            }
            this.itemLabelMessageParams = { values: { label: this.appService.getLabel(this.config.item) } };
        }
        console.log('changes!!', changes);
        if (changes.collapseRows !== undefined) {
            this.lineHeight = parseInt(getComputedStyle(this.el.nativeElement).lineHeight);
            this.valuesHeight = this.lineHeight; // The display starts collapsed
            this.valuesMaxHeight = this.lineHeight; // And without the collapse icon
            setTimeout(() => this.updateMaxHeight());
        }
    }

    onResize = () => this.updateMaxHeight()

    filterItem(valueItem: ValueItem) {
        if (this.isClickable) {
            this.filter.emit({
                item: this.config.item,
                valueItem: valueItem
            });
        }
    }

    excludeItem(valueItem: ValueItem) {
        if (this.isClickable) {
            this.exclude.emit({
                item: this.config.item,
                valueItem: valueItem
            });
        }
    }

    toggleCollapse() {
        this.valuesHeight = this.collapsed ? this.valuesMaxHeight : this.lineHeight;
    }

    private updateMaxHeight() {
        if (this.valuesEl) { // Display or not the collapse icon
            this.valuesMaxHeight = this.valuesEl.nativeElement.scrollHeight;
        }
    }
}

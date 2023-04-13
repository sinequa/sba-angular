import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { SearchService } from "@sinequa/components/search";
import { UIService } from "@sinequa/components/utils";
import { AppService, Query } from "@sinequa/core/app-utils";
import { FieldValue } from "@sinequa/core/base";
import { DocumentAccessLists, EntityItem, Record } from "@sinequa/core/web-services";
import { IconService } from "../../icon.service";
import { MetadataConfig, MetadataService, MetadataValue } from "../../metadata.service";

@Component({
    selector: "sq-metadata-2",
    templateUrl: "./metadata.component.html",
    styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnChanges {
    @Input() record: Record;
    @Input() query?: Query;
    @Input() config: MetadataConfig;
    @Input() style: 'inline' | 'tabular' | 'flex' = 'inline';

    @Input() showIcon = true;
    @Input() showFormatIcons = true;
    @Input() showTitle = true;
    @Input() showFiltersHighlights = true;
    @Input() collapseRows = true;
    @Input() tooltipLinesNumber = 8;

    @Input() actionsButtonsStyle = 'btn btn-primary';
    @Input() actionsButtonsSize = 'sm';

    @Output() filter = new EventEmitter();
    @Output() exclude = new EventEmitter();

    metadataValue: MetadataValue;
    display: boolean;
    valueIcon: string;
    itemLabelMessageParams: any;
    actions: Action[];

    get labels(): FieldValue[] {
        return this.metadataValue.valueItems.map(valueItem => valueItem.value);
    }

    @ViewChild('values') valuesEl: ElementRef<HTMLElement>;
    lineHeight: number;
    valuesMaxHeight: number;
    valuesHeight: number | undefined;

    entityTemplate: any;
    currentItem: EntityItem;
    loading = false;

    filterAction: Action = new Action({
        icon: "fas fa-filter",
        text: "Filter",
        action: () => this.filterItem(),
        updater: (action) => {
            action.disabled = this.currentItem && (this.currentItem['filtered'] || this.currentItem['excluded']);
        }
    });

    excludeAction: Action = new Action({
        icon: "fas fa-minus-circle",
        text: "Exclude",
        action: () => this.excludeItem(),
        updater: (action) => {
            action.disabled = this.currentItem && (this.currentItem['filtered'] || this.currentItem['excluded']);
        }
    });

    get label(): string {
        return this.appService.getLabel(this.metadataValue.item);
    }

    get isAccessLists(): boolean {
        return this.metadataValue.item === "accesslists";
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

    get bgColor(): string | undefined {
        return this.metadataValue.colors?.bgColor ? this.metadataValue.colors.bgColor
            : this.metadataValue.itemClass && this.metadataValue.itemClass?.indexOf('badge') !== -1 ? 'white' : undefined;
    }

    get color(): string | undefined {
        return this.metadataValue.colors?.color ? this.metadataValue.colors.color
            : this.metadataValue.itemClass && this.metadataValue.itemClass?.indexOf('badge') !== -1 ? '#7283a7' : undefined;
    }

    constructor(private iconService: IconService,
        private appService: AppService,
        private metadataService: MetadataService,
        private searchService: SearchService,
        private el: ElementRef,
        private ui: UIService) {
        this.ui.addElementResizeListener(this.el.nativeElement, this.onResize);
    }

    ngOnChanges(changes: SimpleChanges) {
        // Generate the metadata data
        if ((!!changes.record && !this.metadataValue) || !!changes.query) {
            this.metadataValue = this.metadataService.getMetadataValue(this.record, this.query, this.config);
        }

        // Generate format icon
        if (!!this.metadataValue.item) {
            if (this.metadataValue.item === 'docformat') {
                this.valueIcon = this.iconService.getFormatIcon(this.record[this.metadataValue.item]) || '';
            }
            this.itemLabelMessageParams = { values: { label: this.appService.getLabel(this.metadataValue.item) } };
        }

        // Generate line height for collapsing
        if (changes.collapseRows !== undefined) {
            this.lineHeight = parseInt(getComputedStyle(this.el.nativeElement).lineHeight);
            this.valuesHeight = this.lineHeight; // The display starts collapsed
            this.valuesMaxHeight = this.lineHeight; // And without the collapse icon
            setTimeout(() => this.updateMaxHeight());
        }

        this.setActions();
        this.display = !!this.metadataValue.item && !!this.record && !!this.record[this.metadataValue.item];
    }

    onResize = () => this.updateMaxHeight()

    filterItem(): void {
        if (this.metadataValue.filterable) {
            if (this.query) {
                this.searchService.addFieldSelect(this.metadataValue.item, this.currentItem);
                this.searchService.search();
            }
            this.filter.emit({
                item: this.metadataValue.item,
                valueItem: this.currentItem
            });
        }
    }

    excludeItem(): void {
        if (this.metadataValue.excludable) {
            if (this.query) {
                this.searchService.addFieldSelect(this.metadataValue.item, this.currentItem, { not: true });
                this.searchService.search();
            }

            this.exclude.emit({
                item: this.metadataValue.item,
                valueItem: this.currentItem
            });
        }
    }

    toggleCollapse(): void {
        this.valuesHeight = this.collapsed ? this.valuesMaxHeight : this.lineHeight;
    }

    openedPopper(valueItem: EntityItem): void {
        this.entityTemplate = undefined;
        this.currentItem = valueItem;
        this.filterAction.update();
        this.excludeAction.update();

        // add the metadata value inside the action
        if (this.metadataValue.actions?.length) {
            const value = {
                item: this.metadataValue.item,
                value: valueItem.value
            };
            this.metadataValue.actions.map(action => action.data = value);
        }

        if (!this.metadataValue.entityTooltip) return;

        this.loading = true;
        this.metadataValue.entityTooltip({ entity: valueItem, record: this.record, query: this.query! })
            .subscribe((value: any) => {
                this.entityTemplate = value;
                this.loading = false;
            }, () => {
                this.loading = false;
            });
    }

    private updateMaxHeight(): void {
        if (this.valuesEl) { // Display or not the collapse icon
            this.valuesMaxHeight = this.valuesEl.nativeElement.scrollHeight;
        }
    }

    private setActions(): void {
        this.actions = [];

        if (this.metadataValue.actions) {
            this.actions.push(...this.metadataValue.actions);
        }
        if (this.metadataValue.filterable) {
            this.actions.push(this.filterAction);
        }
        if (this.metadataValue.excludable) {
            this.actions.push(this.excludeAction);
        }
    }
}

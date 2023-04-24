import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { SearchService } from "@sinequa/components/search";
import { UIService } from "@sinequa/components/utils";
import { AppService, Query } from "@sinequa/core/app-utils";
import { EntityItem, Record } from "@sinequa/core/web-services";
import { IconService } from "../icon.service";
import { MetadataService, MetadataValue } from "../metadata.service";

@Component({
    selector: "sq-metadata",
    templateUrl: "./metadata.component.html",
    styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnChanges {
    @Input() record: Record;
    @Input() query?: Query;
    @Input() style: 'inline' | 'table' = 'inline';

    @Input() item: string;
    @Input() label: string
    @Input() icon?: string;
    @Input() itemClass?: string;
    @Input() filterable?: boolean;
    @Input() excludable?: boolean;
    @Input() showEntityTooltip?: boolean;
    @Input() actions?: Action[];

    @Input() showIcon: boolean;
    @Input() showFormatIcon: boolean;
    @Input() showTitle: boolean;
    @Input() showFiltersHighlights: boolean;
    @Input() collapseRows: boolean;
    @Input() tooltipLinesNumber = 8;
    @Input() separator: string;

    @Input() actionsButtonsStyle = 'btn btn-secondary';
    @Input() actionsButtonsSize = 'sm';

    @Output() filter = new EventEmitter();
    @Output() exclude = new EventEmitter();

    @ViewChild('values') valuesEl: ElementRef<HTMLElement>;

    metadataValue: MetadataValue;
    display: boolean;
    valueIcon: string;
    itemLabelMessageParams: any;
    allActions: Action[];

    lineHeight: number | undefined;
    valuesMaxHeight: number | undefined;
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

    get columnLabel(): string {
        return this.appService.getLabel(this.item);
    }

    get placement(): string {
        return this.style === 'inline' ? 'top' : 'top-start';
    }

    get collapsed(): boolean {
        return this.collapseRows && this.valuesHeight === this.lineHeight;
    }

    get needsCollapse(): boolean {
        return this.collapseRows && this.valuesMaxHeight! > this.lineHeight! * 2;
    }

    constructor(private iconService: IconService,
        private appService: AppService,
        private metadataService: MetadataService,
        private searchService: SearchService,
        private el: ElementRef,
        private ui: UIService) {
        this.ui.addElementResizeListener(this.el.nativeElement, this.onResize);
    }

    onResize = () => this.updateMaxHeight()

    ngOnChanges(changes: SimpleChanges) {
        // Generate the metadata data
        if ((!!changes.record && !this.metadataValue) || !!changes.query) {
            this.metadataValue = this.metadataService.getMetadataValue(this.record, this.query, this.item, this.showEntityTooltip);
        }

        // Generate format icon
        if (!!this.item) {
            if (this.item === 'docformat') {
                this.valueIcon = this.iconService.getFormatIcon(this.record[this.item]) || '';
            }
            this.itemLabelMessageParams = { values: { label: this.columnLabel } };
        }

        // Generate line height for collapsing
        if (this.collapseRows === true) {
            this.lineHeight = parseInt(getComputedStyle(this.el.nativeElement).lineHeight);
            this.valuesHeight = this.lineHeight;
            this.valuesMaxHeight = this.lineHeight;
            setTimeout(() => this.updateMaxHeight());
        } else {
            this.lineHeight = undefined;
            this.valuesHeight = undefined;
            this.valuesMaxHeight = undefined;
        }

        this.setActions();
        this.display = !!this.item && !!this.record && !!this.record[this.item];
    }

    filterItem(): void {
        if (this.filterable) {
            if (this.query) {
                this.searchService.addFieldSelect(this.item, this.currentItem);
                this.searchService.search();
            }
            this.filter.emit({
                item: this.item,
                valueItem: this.currentItem
            });
        }
    }

    excludeItem(): void {
        if (this.excludable) {
            if (this.query) {
                this.searchService.addFieldSelect(this.item, this.currentItem, { not: true });
                this.searchService.search();
            }

            this.exclude.emit({
                item: this.item,
                valueItem: this.currentItem
            });
        }
    }

    toggleCollapse(): void {
        this.valuesHeight = this.collapsed ? this.valuesMaxHeight : this.lineHeight;
    }

    setupTooltip(valueItem: EntityItem): void {
        this.entityTemplate = undefined;
        this.currentItem = valueItem;
        this.filterAction.update();
        this.excludeAction.update();

        // add the metadata value inside the action
        if (this.actions?.length) {
            const value = {
                item: this.item,
                value: valueItem.value
            };
            this.actions.map(action => action.data = value);
        }

        if (!this.metadataValue.fnEntityTooltip) return;

        this.loading = true;
        this.metadataValue.fnEntityTooltip({ entity: valueItem, record: this.record, query: this.query! })
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
        this.allActions = [];

        if (this.actions) {
            this.allActions.push(...this.actions);
        }
        if (this.filterable) {
            this.allActions.push(this.filterAction);
        }
        if (this.excludable) {
            this.allActions.push(this.excludeAction);
        }
    }
}

import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { SearchService } from "@sinequa/components/search";
import { UIService } from "@sinequa/components/utils";
import { AppService, Query } from "@sinequa/core/app-utils";
import { EntityItem, Filter, Record } from "@sinequa/core/web-services";
import { MetadataService } from "../../metadata.service";
import { MetadataValue } from "../../metadata.interface";

@Component({
    selector: "sq-metadata-item",
    templateUrl: "./metadata-item.component.html",
    styleUrls: ['./metadata-item.component.scss']
})
export class MetadataItemComponent implements OnChanges {
    @Input() record: Record;
    @Input() query?: Query;
    @Input() layout: 'inline' | 'table' = 'inline';

    @Input() field: string;
    @Input() label: string
    @Input() icon?: string;
    @Input() fieldClass?: string;
    @Input() filterable?: boolean;
    @Input() excludable?: boolean;
    @Input() showEntityExtract?: boolean;
    @Input() actions?: Action[];

    @Input() showTitle: boolean;
    @Input() collapseRows: boolean = true;
    @Input() entityExtractMaxLines = 8;
    @Input() separator: string;

    @Input() actionsButtonsStyle = 'btn btn-secondary';
    @Input() actionsButtonsSize = 'sm';

    @ViewChild('values') valuesEl: ElementRef<HTMLElement>;

    metadataValue: MetadataValue;
    display: boolean;
    fieldLabelMessageParams: any;
    allActions: Action[];

    lineHeight: number | undefined;
    valuesMaxHeight: number | undefined;
    valuesHeight: number | undefined;

    popoverTemplate?: string;
    currentItem: EntityItem;

    filterAction: Action = new Action({
        icon: "fas fa-filter",
        text: "Filter",
        action: () => this.filterItem(),
        updater: (action) => {
            action.hidden = this.currentItem && (this.currentItem['filtered'] || this.currentItem['excluded']);
        }
    });

    removeFilterAction: Action = new Action({
        icon: "fas fa-times",
        text: "Remove filter",
        action: () => this.filterItem(true),
        updater: (action) => {
            action.hidden = !this.currentItem || this.currentItem['excluded'] || !this.currentItem['filtered'];
        }
    });

    excludeAction: Action = new Action({
        icon: "fas fa-minus-circle",
        text: "Exclude",
        action: () => this.excludeItem(),
        updater: (action) => {
            action.hidden = this.currentItem && (this.currentItem['filtered'] || this.currentItem['excluded']);
        }
    });

    removeExcludeAction: Action = new Action({
        icon: "fas fa-times",
        text: "Remove exclude",
        action: () => this.excludeItem(true),
        updater: (action) => {
            action.hidden = !this.currentItem || this.currentItem['filtered'] || !this.currentItem['excluded'];
        }
    });

    get columnLabel(): string {
        return this.appService.getLabel(this.field);
    }

    get placement(): string {
        return this.layout === 'inline' ? 'top' : 'top-start';
    }

    get collapsed(): boolean {
        return this.collapseRows && this.valuesHeight === this.lineHeight;
    }

    get needsCollapse(): boolean {
        return this.collapseRows && this.valuesMaxHeight! > this.lineHeight! * 2;
    }

    get hasValues(): boolean {
        return this.metadataValue.isTree || !!this.metadataValue.valueItems?.filter(v => !!v.value).length;
    }

    constructor(private appService: AppService,
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
            this.metadataValue = this.metadataService.getMetadataValue(this.record, this.query, this.field, this.showEntityExtract);
        }

        // Generate format icon
        if (!!this.field) {
            this.fieldLabelMessageParams = { values: { label: this.columnLabel } };
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
        this.display = !!this.field && !!this.record && !!this.record[this.field];
    }

    filterItem(remove?: boolean): void {
        if (this.filterable) {
            if (this.query) {
                if (remove) {
                    this.removeFilter();
                } else {
                    this.searchService.addFieldSelect(this.field, this.currentItem);
                }
                this.searchService.search();
            }
        }
        this.filterAction.update();
        this.removeFilterAction.update();
    }

    excludeItem(remove?: boolean): void {
        if (this.excludable) {
            if (this.query) {
                if (remove) {
                    this.removeFilter();
                } else {
                    this.searchService.addFieldSelect(this.field, this.currentItem, { not: true });
                }
                this.searchService.search();
            }
        }
        this.excludeAction.update();
        this.removeExcludeAction.update();
    }

    toggleCollapse(): void {
        this.valuesHeight = this.collapsed ? this.valuesMaxHeight : this.lineHeight;
    }

    setupPopover(valueItem: EntityItem): void {
        this.popoverTemplate = undefined;
        this.currentItem = valueItem;
        this.filterAction.update();
        this.removeFilterAction.update();
        this.excludeAction.update();
        this.removeExcludeAction.update();

        // add the metadata value inside the action
        if (this.actions?.length) {
            const value = {
                field: this.field,
                value: valueItem.value
            };
            this.actions.map(action => action.data = value);
        }

        if (!this.metadataValue.fnEntityPopover) return;

        this.metadataValue.fnEntityPopover({ entity: valueItem, record: this.record, query: this.query! })
            .subscribe((value: string | undefined) => {
                this.popoverTemplate = value;
            });
    }

    private removeFilter(): void {
        if (!this.query) return;

        let filter: Filter;
        if (this.query.filters && this.query.filters['field'] && this.query.filters['field'] === this.field) {
            filter = this.query.filters;
        }
        if (this.query.filters && this.query.filters['filters']) {
            filter = this.query.filters['filters'].find(f => f.field === this.field);
        }
        this.query.removeFilters(f => f === filter);
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
            this.allActions.push(this.removeFilterAction);
        }
        if (this.excludable) {
            this.allActions.push(this.excludeAction);
            this.allActions.push(this.removeExcludeAction);
        }
    }
}

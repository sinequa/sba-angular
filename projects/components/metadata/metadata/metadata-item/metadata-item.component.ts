import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { SearchService } from "@sinequa/components/search";
import { UIService } from "@sinequa/components/utils";
import { Query } from "@sinequa/core/app-utils";
import { EntityItem, Filter, Record } from "@sinequa/core/web-services";
import { MetadataService } from "../../metadata.service";
import { MetadataValue, TreeMetadataItem } from "../../metadata.interface";
import { Observable, map, of } from "rxjs";
import { Utils } from "@sinequa/core/base";

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

    @Input() collapseRows: boolean = true;
    @Input() entityExtractMaxLines = 8;
    @Input() separator: string;

    @Input() actionsButtonsStyle = 'btn btn-secondary';
    @Input() actionsButtonsSize = 'sm';

    @ViewChild('values') valuesEl: ElementRef<HTMLElement>;

    metadataValue: MetadataValue;
    display: boolean;
    allActions: Action[];

    lineHeight: number | undefined;
    valuesMaxHeight: number | undefined;
    valuesHeight: number | undefined;

    currentItem: EntityItem;
    currentPart: any;

    filterAction: Action = new Action({
        icon: "fas fa-filter",
        text: "Filter",
        action: () => this.filterItem(),
        updater: (action) => {
            setTimeout(() => {
                const item = this.currentPart || this.currentItem;
                action.hidden = item && (item['filtered'] || item['excluded']);
            })
        }
    });

    removeFilterAction: Action = new Action({
        icon: "fas fa-times",
        text: "Remove filter",
        action: () => this.filterItem(true),
        updater: (action) => {
            setTimeout(() => {
                const item = this.currentPart || this.currentItem;
                action.hidden = !item || item['excluded'] || !item['filtered'];
            })
        }
    });

    excludeAction: Action = new Action({
        icon: "fas fa-minus-circle",
        text: "Exclude",
        action: () => this.excludeItem(),
        updater: (action) => {
            setTimeout(() => {
                const item = this.currentPart || this.currentItem;
                action.hidden = item && (item['filtered'] || item['excluded']);
            })
        }
    });

    removeExcludeAction: Action = new Action({
        icon: "fas fa-times",
        text: "Remove exclude",
        action: () => this.excludeItem(true),
        updater: (action) => {
            setTimeout(() => {
                const item = this.currentPart || this.currentItem;
                action.hidden = !item || item['filtered'] || !item['excluded'];
            })
        }
    });

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

    constructor(private metadataService: MetadataService,
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

    getTooltip = (valueItem: EntityItem): Observable<{ entityExtract?: string, actions: Action[] }> | undefined => {
        if (!this.allActions?.length && !this.metadataValue.fnEntityTooltip) return undefined;

        this.currentItem = valueItem;
        let actions: Action[] = [];

        if (this.allActions?.length) {
            this.filterAction.update();
            this.removeFilterAction.update();
            this.excludeAction.update();
            this.removeExcludeAction.update();
            const value = {
                field: this.field,
                value: valueItem.value
            };
            actions = this.allActions.map(action => {
                action.data = value
                return action;
            });
        }

        if (!this.metadataValue.fnEntityTooltip) {
            return of({ actions })
        } else {
            return this.metadataValue.fnEntityTooltip({ entity: valueItem, record: this.record, query: this.query! })
                .pipe(map((value: string | undefined) => ({ entityExtract: value, actions })));
        }
    }

    selectTreeItem(valueItem: TreeMetadataItem, partIndex: number, part: any): any {
        this.currentPart = part;
        const parts = valueItem.parts.map((item) => item.value).slice(0, partIndex + 1);
        if (parts.length > 0) {
            parts.unshift("");
            parts.push("");
        }
        const path = parts.join("/");
        this.currentItem = { value: path + "*", display: Utils.treepathLast(path) };
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

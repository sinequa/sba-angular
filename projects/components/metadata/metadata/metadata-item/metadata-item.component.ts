import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { SearchService } from "@sinequa/components/search";
import { UIService } from "@sinequa/components/utils";
import { Query } from "@sinequa/core/app-utils";
import { EntityItem, Filter, Record } from "@sinequa/core/web-services";
import { MetadataService } from "../../metadata.service";
import { MetadataValue } from "../../metadata.interface";
import { Observable, map, of } from "rxjs";

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
    lineHeight: number | undefined;
    valuesMaxHeight: number | undefined;
    valuesHeight: number | undefined;

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

        this.display = !!this.field && !!this.record && !!this.record[this.field];
    }

    filterItem(item: EntityItem, remove?: boolean): void {
        if (this.filterable) {
            if (this.query) {
                if (remove) {
                    item['filtered'] = false;
                    this.removeFilter();
                } else {
                    item['filtered'] = true;
                    this.searchService.addFieldSelect(this.field, item);
                }
                this.searchService.search();
            }
        }
    }

    excludeItem(item: EntityItem, remove?: boolean): void {
        if (this.excludable) {
            if (this.query) {
                if (remove) {
                    item['excluded'] = false;
                    this.removeFilter();
                } else {
                    item['excluded'] = true;
                    this.searchService.addFieldSelect(this.field, item, { not: true });
                }
                this.searchService.search();
            }
        }
    }

    toggleCollapse(): void {
        this.valuesHeight = this.collapsed ? this.valuesMaxHeight : this.lineHeight;
    }

    getTooltip = (item: EntityItem | any): Observable<{ entityExtract?: string, actions: Action[] }> | undefined => {
        const hasActions = this.actions || this.filterable || this.excludable;
        const valueItem = item.valueItem ? item.valueItem : item;

        if (!hasActions && !this.metadataValue.fnEntityTooltip) return undefined;

        const actions: Action[] = [];
        if (hasActions) {
            let value = valueItem.value;
            if (valueItem.parts) {
                const parts = valueItem.parts.map(i => i.value).slice(0, item.index + 1);
                if (parts.length > 0) {
                    parts.unshift("");
                    parts.push("");
                }
                const path = parts.join("/");
                value = path + "*";
            }
            const data = {
                field: this.field,
                part: item.part,
                value
            };

            const actionItem = item.part || valueItem;
            if (this.actions) {
                actions.push(...this.getActions(this.actions, data));
            }

            let filterAction: Action, removeFilterAction: Action, excludeAction: Action, removeExcludeAction: Action;

            const updateVisibility = (aItem: any) => {
                if (this.filterable) {
                    filterAction.hidden = aItem['filtered'] || aItem['excluded']
                    removeFilterAction.hidden = aItem['excluded'] || !aItem['filtered'];
                }
                if (this.excludable) {
                    excludeAction.hidden = aItem['filtered'] || aItem['excluded'];
                    removeExcludeAction.hidden = aItem['filtered'] || !aItem['excluded']
                }
            }

            if (this.filterable) {
                filterAction = new Action({
                    icon: "fas fa-filter",
                    text: "Filter",
                    hidden: actionItem['filtered'] || actionItem['excluded'],
                    action: (action) => {
                        this.filterItem(action.data);
                        updateVisibility(action.data);
                    }
                });

                removeFilterAction = new Action({
                    icon: "fas fa-times",
                    text: "Remove filter",
                    hidden: actionItem['excluded'] || !actionItem['filtered'],
                    action: (action) => {
                        this.filterItem(action.data, true);
                        updateVisibility(action.data);
                    }
                });
                actions.push(...this.getActions([filterAction, removeFilterAction], data));
            }
            if (this.excludable) {
                excludeAction = new Action({
                    icon: "fas fa-minus-circle",
                    text: "Exclude",
                    hidden: actionItem['filtered'] || actionItem['excluded'],
                    action: (action) => {
                        this.excludeItem(action.data);
                        updateVisibility(action.data);
                    }
                });

                removeExcludeAction = new Action({
                    icon: "fas fa-times",
                    text: "Remove exclude",
                    hidden: actionItem['filtered'] || !actionItem['excluded'],
                    action: (action) => {
                        this.excludeItem(action.data, true);
                        updateVisibility(action.data);
                    }
                });

                actions.push(...this.getActions([excludeAction, removeExcludeAction], data));
            }
        }

        if (!this.metadataValue.fnEntityTooltip) {
            return of({ actions })
        } else {
            return this.metadataValue.fnEntityTooltip({ entity: valueItem, record: this.record, query: this.query! })
                .pipe(map((value: string | undefined) => ({ entityExtract: value, actions })));
        }
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

    private getActions(actions: Action[], data: any): Action[] {
        return actions.map(action => {
            action.data = data;
            return action;
        });
    }
}

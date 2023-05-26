import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { SearchService } from "@sinequa/components/search";
import { UIService } from "@sinequa/components/utils";
import { AppService, Query } from "@sinequa/core/app-utils";
import { EntityItem, Filter, Record } from "@sinequa/core/web-services";
import { MetadataService } from "../../metadata.service";
import { MetadataItem, MetadataValue, TreeMetadataItem } from "../../metadata.interface";
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
        private appService: AppService,
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
                    this.removeFilter();
                } else {
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
                    this.removeFilter();
                } else {
                    this.searchService.addFieldSelect(this.field, item, { not: true });
                }
                this.searchService.search();
            }
        }
    }

    toggleCollapse(): void {
        this.valuesHeight = this.collapsed ? this.valuesMaxHeight : this.lineHeight;
    }

    getTooltip = (item: EntityItem | { valueItem: TreeMetadataItem, part: MetadataItem, index: number }): Observable<{ entityExtract?: string, actions: Action[] }> | undefined => {
        const hasActions = this.actions || this.filterable || this.excludable;
        const valueItem = 'valueItem' in item ? item.valueItem : item;

        if (!hasActions && !this.metadataValue.fnEntityTooltip) return undefined;

        const actions: Action[] = [];
        if (hasActions) {
            let value = valueItem.value;
            if ('parts' in valueItem && 'index' in item) {
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
                value
            };

            if (this.actions) {
                actions.push(...this.getActions(this.actions, data));
            }

            const filterAction = new Action({
                icon: "fas fa-filter",
                text: "Filter",
                action: (action) => {
                    this.filterItem(action.data);
                    updateVisibility(action.data);
                }
            });

            const excludeAction = new Action({
                icon: "fas fa-minus-circle",
                text: "Exclude",
                action: (action) => {
                    this.excludeItem(action.data);
                    updateVisibility(action.data);
                }
            });

            const removeFilterAction = new Action({
                icon: "fas fa-times",
                text: "Remove filter",
                action: (action) => {
                    this.filterItem(action.data, true);
                    updateVisibility(action.data);
                }
            });

            actions.push(...this.getActions([filterAction, excludeAction, removeFilterAction], data));

            const column = this.appService.getColumn(this.field);
            const updateVisibility = (aItem: any) => {
                const filters: any[] = this.query && column ? this.query.findFieldFilters(column.name) : [];
                const filtered = !!filters.find(f => f.value === aItem.value);
                filterAction.hidden = !this.filterable || filtered;
                removeFilterAction.hidden = (!this.filterable && !this.excludable) || !filtered;
                excludeAction.hidden = !this.excludable || filtered;
            }

            const actionItem = 'part' in item ? item.part : valueItem;
            updateVisibility(actionItem);
        }

        if (!this.metadataValue.fnEntityTooltip) {
            return of({ actions })
        } else {
            return this.metadataValue.fnEntityTooltip({ entity: valueItem as EntityItem, record: this.record, query: this.query! })
                .pipe(map((value: string | undefined) => ({ entityExtract: value, actions })));
        }
    }

    private removeFilter(): void {
        if (!this.query) return;

        let filter: Filter;
        if (this.query.filters && this.query.filters['field'] === this.field) {
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

import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { UIService } from "@sinequa/components/utils";
import { AppService, Query } from "@sinequa/core/app-utils";
import { DocumentAccessLists, EntityItem, Record } from "@sinequa/core/web-services";
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
    @Input() collapseRows = true;
    @Input() tooltipLinesNumber = 8;

    @Input() actionsButtonsStyle = 'btn btn-primary';
    @Input() actionsButtonsSize = 'sm';

    @Output() filter = new EventEmitter();
    @Output() exclude = new EventEmitter();

    display = false;
    valueIcon: string;
    itemLabelMessageParams: any;
    actions: Action[];

    @ViewChild('values') valuesEl: ElementRef<HTMLElement>;
    lineHeight: number;
    valuesMaxHeight: number;
    valuesHeight: number | undefined;

    entityTemplate: any;
    currentItem: EntityItem;
    loading = false;

    get isClickable(): boolean {
        return !!this.config.filterable || !!this.config.excludable || !!this.config.entityTooltip || !!this.config.actions?.length;
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

    get hasActions(): boolean {
        return this.config.filterable === true || this.config.excludable === true;
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
        if (changes.collapseRows !== undefined) {
            this.lineHeight = parseInt(getComputedStyle(this.el.nativeElement).lineHeight);
            this.valuesHeight = this.lineHeight; // The display starts collapsed
            this.valuesMaxHeight = this.lineHeight; // And without the collapse icon
            setTimeout(() => this.updateMaxHeight());
        }
        this.setActions();
    }

    onResize = () => this.updateMaxHeight()

    filterItem(): void {
        if (this.isClickable) {
            this.filter.emit({
                item: this.config.item,
                valueItem: this.currentItem
            });
        }
    }

    excludeItem(): void {
        if (this.isClickable) {
            this.exclude.emit({
                item: this.config.item,
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

        // add the metadata value inside the action
        if (this.config.actions?.length) {
            const value = {
                item: this.config.item,
                value: valueItem.value
            };
            this.config.actions.map(action => action.data = value);
        }

        if (!this.config.entityTooltip) return;

        this.loading = true;
        this.config.entityTooltip({ entity: valueItem, record: this.record, query: this.query! })
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

        if (this.config.actions) {
            this.actions.push(...this.config.actions);
        }
        if (this.config.filterable) {
            this.actions.push(new Action({
                icon: "fas fa-filter",
                title: "Filter",
                action: () => this.filterItem()
            }));
        }
        if (this.config.excludable) {
            this.actions.push(new Action({
                icon: "fas fa-minus-circle",
                title: "Exclude",
                action: () => this.excludeItem()
            }));
        }
        console.log('setActions', this.config.item, this.actions);
    }
}

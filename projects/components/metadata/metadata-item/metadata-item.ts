import {Component, Input, Output, HostBinding, OnChanges, SimpleChanges, EventEmitter, ElementRef, ViewChild, OnDestroy} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {AppService, FormatService, Query, ValueItem} from "@sinequa/core/app-utils";
import {Record, EntityItem, DocumentAccessLists, CCColumn, TextChunksWebService, TextLocation} from "@sinequa/core/web-services";
import {Observable, of, map} from "rxjs";
import {UIService} from "@sinequa/components/utils";

export interface TreeValueItem extends ValueItem {
    parts: ValueItem[];
}

@Component({
    selector: "sq-metadata-item",
    templateUrl: "./metadata-item.html",
    styleUrls: ['./metadata-item.scss']
})
export class MetadataItem implements OnChanges, OnDestroy {
    @Input() record: Record;
    @Input() item: string;
    @Input() showTitle = true;
    @Input() showIcon: boolean = false;
    @Input() showCounts: boolean = true;
    @Input() showEntityTooltip: boolean = false;
    @Input() clickable: boolean = true;
    @Input() tabular: boolean = true;
    @Input() collapseRows: boolean = true;
    @Input() query?: Query;
    @Output("select") _select = new EventEmitter<{item: string, valueItem: ValueItem}>();
    @HostBinding('hidden') get hidden(): boolean { return this.isEmpty; }
    valueItems: (ValueItem | TreeValueItem)[];
    column: CCColumn | undefined;
    isTree: boolean;
    isEntity: boolean;
    isCsv: boolean;
    itemLabelMessageParams: any;
    entityTooltip?: (entity: EntityItem) => Observable<string|undefined>;

    @ViewChild('values') valuesEl: ElementRef<HTMLElement>;
    lineHeight: number;
    valuesMaxHeight: number;
    valuesHeight: number | undefined;

    constructor(
        public el: ElementRef,
        public appService: AppService,
        public formatService: FormatService,
        public textChunkWebService: TextChunksWebService,
        public ui: UIService) {
        this.valueItems = [];
        this.ui.addElementResizeListener(this.el.nativeElement, this.onResize);
    }

    ensureScalarValue(value: any): any {
        if (Utils.isEmpty(value) && this.column) {
            if (AppService.isBoolean(this.column)) {
                value = 'msg#metadata.item.empty_boolean';
            }
            else if (AppService.isNumber(this.column)) {
                value = 'msg#metadata.item.empty_number';
            }
        }
        return value;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.column || changes.item) {
            this.column = this.appService.getColumn(this.item);
            this.itemLabelMessageParams = {values: {label: this.label}};
        }
        this.valueItems = [];
        this.isTree = !!this.column && AppService.isTree(this.column);
        this.isEntity = !!this.column && AppService.isEntity(this.column);
        this.isCsv = !!this.column && AppService.isCsv(this.column);
        const values = this.record[this.appService.getColumnAlias(this.column, this.item)];
        if (this.isTree) {
            const paths: string[] = values;
            if (paths) {
                for (const path of paths) {
                    const parts = path.split("/");
                    if (parts.length > 0 && parts[0] === "") {
                        parts.splice(0, 1);
                    }
                    if (parts.length > 0 && parts[parts.length - 1] === "") {
                        parts.splice(parts.length - 1, 1);
                    }
                    const item: TreeValueItem = {value: path, parts: parts.map(value => ({value: value}))};
                    this.valueItems.push(item);
                }
            }
        }
        else if (this.isEntity) {
            const entityItems: EntityItem[] = values;
            if (entityItems) {
                this.valueItems.push(...entityItems);
                if(this.showEntityTooltip && entityItems[0]?.locations) {
                    this.entityTooltip = this.getEntitySentence
                }
            }
        }
        else if (this.isCsv) {
            if (values && values instanceof Array) {
                this.valueItems.push(...values.map<ValueItem>(value => ({value: value})));
            }
            else if (!Utils.isEmpty(values)) {
                this.valueItems.push({value: values});
            }
        }
        else {
            const value = this.ensureScalarValue(values);
            if (!Utils.isEmpty(value)) {
                this.valueItems.push({value: value});
            }
        }

        this.valuesHeight = undefined;
        if(this.collapseRows) {
            this.lineHeight = parseInt(getComputedStyle(this.el.nativeElement).lineHeight);
            this.valuesHeight = this.lineHeight; // The display starts collapsed
            this.valuesMaxHeight = this.lineHeight; // And without the collapse icon
            setTimeout(() => this.updateMaxHeight());
        }
    }

    ngOnDestroy(): void {
        this.ui.removeElementResizeListener(this.el.nativeElement, this.onResize);
    }

    onResize = () => this.updateMaxHeight()


    public get isEmpty(): boolean {
        if (!this.item) {
            return true;
        }
        if (this.item === "accesslists") {
            if (!this.record.accesslists || !this.record.accesslists.accessListIndices
                || this.record.accesslists.accessListIndices.length === 0) {
                return true;
            }
        }
        else {
            if (this.valueItems.length === 0) {
                return true;
            }
        }
        return false;
    }

    public get itemClasses(): string {
        let classes = "sq-text";
        if (this.clickable) {
            classes += " sq-clickable";
        }
        if (this.tabular) {
            classes += " sq-tabular";
        }
        return classes;
    }

    public get label(): string {
        return this.appService.getLabel(this.item);
    }

    public get isAccessLists(): boolean {
        return this.item === "accesslists";
    }

    public get accessListsData(): DocumentAccessLists {
        return this.record.accesslists;
    }

    public get docFormatIconClass(): string {
        if (this.item == null || this.item !== "docformat" && this.item !== "fileext") {
            return "";
        }
        const value: string = this.record[this.item];
        if (!value) {
            return "far fa-file";
        }
        return "far fa-file sq-icon-file-" + value;
    }

    select(index: number, subIndex = 0) {
        if (this.isTree) {
            const valueItem = <TreeValueItem>this.valueItems[index];
            const parts = valueItem.parts.map((item) => item.value).slice(0, subIndex + 1);
            if (parts.length > 0) {
                parts.unshift("");
                parts.push("");
            }
            const path = parts.join("/");
            this._select.emit({item: this.item, valueItem: {value: path + "*", display: Utils.treepathLast(path)}});
        }
        else {
            this._select.emit({item: this.item, valueItem: this.valueItems[index]});
        }
        return false; // prevent default
    }

    // Collapse management

    get collapsed(): boolean {
      return this.valuesHeight === this.lineHeight;
    }

    get needsCollapse(): boolean {
        return this.valuesMaxHeight > this.lineHeight * 1.5; // take some margin as the actual size may slightly exceed the line height
    }

    toggleCollapse() {
        this.valuesHeight = this.collapsed? this.valuesMaxHeight : this.lineHeight;
    }

    updateMaxHeight() {
        if(this.valuesEl) { // Display or not the collapse icon
            this.valuesMaxHeight = this.valuesEl.nativeElement.scrollHeight;
        }
    }

    getEntitySentence = (entity: EntityItem) => {
        // Get entity location
        const location = this.getEntityLocation(entity);
        if(!location) return of(undefined);
        // Get list of highlights
        const highlights = this.getHighlights();
        // Get the text at the location of the entity
        // The query is optional, but can be useful to resolve aliases and relevant extracts/matches
        return this.textChunkWebService.getTextChunks(
            this.record.id, [location], highlights, this.query, 1, 1)
            .pipe(map(chunks => chunks?.[0]?.text));
    }

    getHighlights(): string[] {
        let preview = this.appService.app?.preview?.split(',')?.[0];
        if(preview) {
            return this.appService.getWebService<any>(preview)?.highlights?.split(",") || [];
        }
        return [];
    }

    getEntityLocation(entity: EntityItem): TextLocation | undefined {
        const locations = entity.locations?.split(";")?.[0]?.split(",");
        if(!locations?.length) return;
        const offset = parseInt(locations[0]);
        const length = parseInt(locations[1]);
        return {offset, length};
    }
}

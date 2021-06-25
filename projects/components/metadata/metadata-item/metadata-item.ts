import {Component, Input, Output, HostBinding, OnChanges, SimpleChanges, EventEmitter} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {AppService, FormatService, ValueItem} from "@sinequa/core/app-utils";
import {Record, EntityItem, DocumentAccessLists, CCColumn} from "@sinequa/core/web-services";
import {FacetService} from "@sinequa/components/facet";

export interface TreeValueItem extends ValueItem {
    parts: ValueItem[];
}

@Component({
    selector: "sq-metadata-item",
    templateUrl: "./metadata-item.html",
    styleUrls: ['./metadata-item.scss']
})
export class MetadataItem implements OnChanges {
    @Input() record: Record;
    @Input() item: string;
    @Input() showTitle = true;
    @Input() showIcon: boolean = false;
    @Input() showCounts: boolean = true;
    @Input() clickable: boolean = true;
    @Input() tabular: boolean = true;
    @Input() collapseRows: boolean = true;
    @Output("select") _select = new EventEmitter<{item: string, valueItem: ValueItem}>();
    @HostBinding('hidden') get hidden(): boolean { return this.isEmpty; }
    valueItems: (ValueItem | TreeValueItem)[];
    column: CCColumn | undefined;
    isTree: boolean;
    isEntity: boolean;
    isCsv: boolean;
    itemLabelMessageParams: any;
    collapsed: boolean;
    needsCollapse: boolean = false;

    constructor(
        public appService: AppService,
        public formatService: FormatService) {
        this.valueItems = [];
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
        if (!this.column) {
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
        
        const collapsable = (this.isEntity || this.isCsv) && !this.isTree; // Tree columns are multivalues, and therefore isCsv=true
        if (changes.collapseRows || this.collapsed === undefined) {
            this.collapsed = collapsable && this.collapseRows;
        }
        this.needsCollapse = collapsable && this.collapseRows && this.tabular && this.valueItems.length > 1; // We display the collapse button as soon as the number of values is >1 which does not take into account the actualy width of each value...
    }

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
            this._select.emit({item: this.item, valueItem: {value: path + "*", display: FacetService.treepathLast(path)}});
        }
        else {
            this._select.emit({item: this.item, valueItem: this.valueItems[index]});
        }
        return false; // prevent default
    }

    toggleCollapse() {
        this.collapsed = !this.collapsed;
        return false;
    }
}

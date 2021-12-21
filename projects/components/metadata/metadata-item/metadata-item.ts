import {Component, Input, Output, HostBinding, OnChanges, SimpleChanges, EventEmitter, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef} from "@angular/core";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

import {Utils} from "@sinequa/core/base";
import {AppService, FormatService, Query, ValueItem} from "@sinequa/core/app-utils";
import {Record, EntityItem, DocumentAccessLists, CCColumn, TextChunksWebService, TextLocation} from "@sinequa/core/web-services";

import {FacetService} from "@sinequa/components/facet";
import {UIService} from "@sinequa/components/utils";

export interface TreeValueItem extends ValueItem {
    parts: ValueItem[];
}

// max height of the first metadata row
// this size was found using HTML inspector
const MAX_METADATA_ROW_HEIGHT = 21.6;

@Component({
    selector: "sq-metadata-item",
    templateUrl: "./metadata-item.html",
    styleUrls: ['./metadata-item.scss']
})
export class MetadataItem implements OnChanges, AfterViewInit {
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
    collapsed: boolean;
    needsCollapse: boolean = false;
    entityTooltip?: (entity: EntityItem) => Observable<string | undefined>;
    
    // Needed to retrieve the scrollHeight value
    @ViewChild('values', {static: false}) template: ElementRef;
    
    @Input() scrollHeight = 0;
    get canExpand(): boolean {
        if (!this.collapsed) return true;
        return this.scrollHeight > MAX_METADATA_ROW_HEIGHT || false;
    };
    
    constructor(
        private uiService: UIService,
        private cd: ChangeDetectorRef,
        private hostElement: ElementRef,
        public appService: AppService,
        public formatService: FormatService,
        public textChunkWebService: TextChunksWebService) {
        this.valueItems = [];
        
        // use of the UI Service to detect resize changes
        this.uiService.resizeEvent.subscribe(() => {
            this.scrollHeight = this.template?.nativeElement.scrollHeight;
            
            // check if collapse/expand button is needed:
            // if  template is undefined or scroll height is 0, do nothing
            // if value items length is 1 or 0, do nothing
            if (this.scrollHeight === 0 || this.scrollHeight === undefined) return;
            if (this.valueItems.length <= 1) return;
            
            // adjust collapse/expand button
            if (this.scrollHeight < MAX_METADATA_ROW_HEIGHT) {
                this.needsCollapse = false;
            } else {
                this.needsCollapse = true;
            }
            // the this css var to adjust animation while collapsing/expanding
            this.hostElement.nativeElement.style.setProperty('--scroll-height', this.scrollHeight + 30 + 'px');
            this.cd.detectChanges();    
        });
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

    ngAfterViewInit() {
        // To display or not the collapse/expand button, we need to ask for the scrollHeight's container
        // It is available here, but settings the *ngIf value here trigger an NG0100 error
        // To avoid this error, NG0100: Expression has changed after if was checked
        // we need to trigger manually the detection changes.
        this.scrollHeight = this.template?.nativeElement.scrollHeight;
        // the this css var to adjust animation while collapsing/expanding
        // first time, the metadata container is created. We keep a saving space of 100px (sometime, scrollHeight is wrong)
        this.hostElement.nativeElement.style.setProperty('--scroll-height', this.scrollHeight + 100 + 'px');

        this.cd.detectChanges();
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
                
        // when "counter" are displayed, row's height must be adapted, otherwise glitch could appears while zooming
        // We are using css variable to fix that.
        // When "count" exists, add 0.1rem to the initial height
        const hasCount = this.valueItems.some(item => item.hasOwnProperty('count'));
        this.hostElement.nativeElement.style.setProperty('--has-count', hasCount ? '0.05rem' : '-.1rem');

        const collapsable = (this.isEntity || this.isCsv) && !this.isTree; // Tree columns are multivalues, and therefore isCsv=true
        if (changes.collapseRows || this.collapsed === undefined) {
            this.collapsed = collapsable && this.collapseRows;
        }
        
        // We display the collapse button as soon as the number of values is >1 which does not take into account the actualy width of each value...
        this.needsCollapse = collapsable && this.collapseRows && this.tabular && this.valueItems.length > 1;
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

    toggleCollapse(event: Event) {
        event.stopImmediatePropagation();
        this.collapsed = !this.collapsed;
        return false;
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
        const preview = this.appService.app?.preview?.split(',')?.[0];
        if(preview) {
            return this.appService.getWebService<any>(preview)?.highlights?.split(",") || [];
        }
        return [];
    }

    getEntityLocation(entity: EntityItem): TextLocation | undefined {
        const locations = entity.locations?.split(";")?.[0]?.split(",");
        if(!locations?.length) return;
        const offset = Number(locations[0]);
        const length = Number(locations[1]);
        return {offset, length};
    }
}

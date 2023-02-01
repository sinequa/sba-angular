import { Component, Input, OnChanges } from "@angular/core";
import { AppService, Query, ValueItem } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { CCColumn, EntityItem, Record, TextChunksWebService, TextLocation } from "@sinequa/core/web-services";
import { map, Observable, of } from "rxjs";
import { IconService } from "../../icon.service";
import { TreeValueItem } from "../../metadata-item/metadata-item";

@Component({
    selector: "sq-metadata-2",
    templateUrl: "./metadata.component.html",
    styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnChanges {
    @Input() record: Record;
    @Input() item: string;
    @Input() query?: Query;
    @Input() customClass?: string;

    @Input() showIcon = true;
    @Input() showTitle = true;
    @Input() showCounts = true;
    @Input() showEntityTooltip: false;
    @Input() clickable = true;

    display = false;
    icon: string;
    color: string | undefined;
    column: CCColumn | undefined;
    itemLabelMessageParams: any;

    valueItems: (ValueItem | TreeValueItem)[];
    entityTooltip?: (entity: EntityItem) => Observable<string|undefined>;
    isTree: boolean;
    isEntity: boolean;
    isCsv: boolean;

    get value(): any {
        return this.record[this.item];
    }

    get itemClass(): string {
        return this.clickable ? 'badge rounded-pill clickable' : '';
    }

    get label(): string {
        return this.appService.getLabel(this.item);
    }

    constructor(private iconService: IconService,
        private appService: AppService,
        private textChunkWebService: TextChunksWebService) {
    }

    ngOnChanges() {
        this.display = !!this.item && !!this.record && !!this.record[this.item];
        if (!!this.item) {
            if (this.item === 'docformat') {
                this.icon = this.iconService.getFormatIcon(this.record[this.item]) || '';
                this.color = this.iconService.getColor(this.record[this.item]);
            } else {
                this.icon = this.iconService.getIcon(this.item) || '';
            }

            this.column = this.appService.getColumn(this.item);
            this.itemLabelMessageParams = { values: { label: this.appService.getLabel(this.item) } };
            this.setValueItems();
        }
    }

    select(index, subindex?) {
        console.log(index, subindex);
    }

    private setValueItems() {
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
    }

    private ensureScalarValue(value: any): any {
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

    private getEntitySentence = (entity: EntityItem) => {
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

    private getHighlights(): string[] {
        const preview = this.appService.app?.preview?.split(',')?.[0];
        if(preview) {
            return this.appService.getWebService<any>(preview)?.highlights?.split(",") || [];
        }
        return [];
    }

    private getEntityLocation(entity: EntityItem): TextLocation | undefined {
        const locations = entity.locations?.split(";")?.[0]?.split(",");
        if(!locations?.length) return;
        const offset = parseInt(locations[0]);
        const length = parseInt(locations[1]);
        return {offset, length};
    }

}

import { Component, Input, OnChanges } from "@angular/core";
import { AppService, Query, ValueItem } from "@sinequa/core/app-utils";
import { CCColumn, EntityItem, Record } from "@sinequa/core/web-services";
import { Observable } from "rxjs";
import { IconService } from "../../icon.service";
import { TreeValueItem } from "../../metadata-item/metadata-item";
import { MetadataService } from "../../metadata.service";

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
    valueIcon: string;
    color: string | undefined;
    column: CCColumn | undefined;
    itemLabelMessageParams: any;

    valueItems: (ValueItem | TreeValueItem)[];
    entityTooltip?: (entity: EntityItem) => Observable<string | undefined>;
    isTree: boolean;
    isEntity: boolean;
    isCsv: boolean;

    get value(): any {
        return this.record[this.item];
    }

    get itemClass(): string {
        return this.clickable ? 'clickable' : '';
    }

    get label(): string {
        return this.appService.getLabel(this.item);
    }

    constructor(private iconService: IconService,
        private appService: AppService,
        private metadataService: MetadataService) {
    }

    ngOnChanges() {
        this.display = !!this.item && !!this.record && !!this.record[this.item];
        if (!!this.item) {
            this.icon = this.iconService.getIcon(this.item) || '';

            if (this.item === 'docformat') {
                this.valueIcon = this.iconService.getFormatIcon(this.record[this.item]) || '';
                this.color = this.iconService.getColor(this.record[this.item]);
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
            this.metadataService.setTreeValues(paths, this.valueItems);
        }
        else if (this.isEntity) {
            const entityItems: EntityItem[] = values;
            this.metadataService.setEntityValues(entityItems, this.valueItems, this.showEntityTooltip, this.entityTooltip);
        }
        else if (this.isCsv) {
            this.metadataService.setCsvValues(values, this.valueItems);
        }
        else {
            this.metadataService.setValues(values, this.valueItems, this.column);
        }
    }

}

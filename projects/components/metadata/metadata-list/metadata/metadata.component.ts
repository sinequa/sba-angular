import { Component, Input, OnChanges } from "@angular/core";
import { AppService, Query, ValueItem } from "@sinequa/core/app-utils";
import { CCColumn, EntityItem, Record } from "@sinequa/core/web-services";
import { Observable } from "rxjs";
import { IconService } from "../../icon.service";
import { TreeValueItem } from "../../metadata-item/metadata-item";
import { MetadataConfig, MetadataService } from "../../metadata.service";

@Component({
    selector: "sq-metadata-2",
    templateUrl: "./metadata.component.html",
    styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnChanges {
    @Input() record: Record;
    @Input() config: MetadataConfig;
    @Input() query?: Query;
    @Input() style: 'inline' | 'tabular' | 'flex' = 'inline';
    @Input() customClass?: string;

    @Input() showIcon = true;
    @Input() showFormatIcon = true;
    @Input() showTitle = true;
    @Input() showCounts = true;
    @Input() showEntityTooltip: false;

    display = false;
    valueIcon: string;
    column: CCColumn | undefined;
    itemLabelMessageParams: any;

    valueItems: (ValueItem | TreeValueItem)[];
    entityTooltip?: (entity: EntityItem) => Observable<string | undefined>;
    isTree: boolean;
    isEntity: boolean;
    isCsv: boolean;

    get isClickable(): boolean {
        return !!this.config.filterable || !!this.config.excludable;
    }

    get label(): string {
        return this.appService.getLabel(this.config.item);
    }

    get placement(): string {
        return this.style === 'inline' ? 'top' : 'top-start';
    }

    constructor(private iconService: IconService,
        private appService: AppService,
        private metadataService: MetadataService) {
    }

    ngOnChanges() {
        this.display = !!this.config.item && !!this.record && !!this.record[this.config.item];
        if (!!this.config.item) {
            if (this.config.item === 'docformat') {
                this.valueIcon = this.iconService.getFormatIcon(this.record[this.config.item]) || '';
            }

            this.column = this.appService.getColumn(this.config.item);
            this.itemLabelMessageParams = { values: { label: this.appService.getLabel(this.config.item) } };
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
        const values = this.record[this.appService.getColumnAlias(this.column, this.config.item)];
        if (this.isEntity) {
            const entityItems: EntityItem[] = values;
            this.metadataService.setEntityValues(entityItems, this.valueItems, this.showEntityTooltip, this.entityTooltip);
        }
        else if (this.isCsv) {
            this.metadataService.setCsvValues(values, this.valueItems);
        }
        else if (!this.isTree) {
            this.metadataService.setValues(values, this.valueItems, this.column);
        }
    }

}

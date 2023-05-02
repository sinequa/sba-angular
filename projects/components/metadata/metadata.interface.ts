import { Query } from '@sinequa/core/app-utils';
import { CCColumn, EntityItem, Record } from '@sinequa/core/web-services';
import { Observable } from 'rxjs';
import { ValueItem } from '@sinequa/core/app-utils';
import { Action } from '../action/action';

export interface MetadataItem extends ValueItem {
    filtered?: boolean; // Whether the item is included in the filters
    excluded?: boolean; // Whether the item is excluded from the filters
}

export interface TreeMetadataItem extends MetadataItem {
    parts: MetadataItem[];
}

export interface MetadataConfig {
    item: string;
    icon?: string;
    itemClass?: string;
    filterable?: boolean;
    excludable?: boolean;
    showPopover?: boolean;
    separator?: string;
    actions?: Action[];
}

export interface MetadataValue {
    valueItems: (MetadataItem | TreeMetadataItem)[]; // the determined value from the results
    column: CCColumn | undefined; // the results column
    isTree: boolean; // if is tree
    isEntity: boolean; // if is entity
    isCsv: boolean; // if is csv
    fnEntityPopover?: (data: { entity: EntityItem, record: Record, query: Query }) => Observable<string | undefined>;
}
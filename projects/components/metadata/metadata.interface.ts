import { Query } from '@sinequa/core/app-utils';
import { CCColumn, EntityItem, Record } from '@sinequa/core/web-services';
import { Observable } from 'rxjs';
import { Action } from '@sinequa/components/action';
import { SafeHtml } from '@angular/platform-browser';

export interface MetadataItem {
    value: string | boolean | number;
    display?: string;
    filtered?: boolean; // Whether the item is included in the filters
    excluded?: boolean; // Whether the item is excluded from the filters
}

export interface TreeMetadataItem {
    parts: MetadataItem[];
}

export function isTreeMetadataItem(item: MetadataItem | TreeMetadataItem): item is TreeMetadataItem {
    return !!(item as TreeMetadataItem).parts;
}

export interface MetadataConfig {
    field: string;
    label?: string;
    icon?: string;
    fieldClass?: string;
    filterable?: boolean;
    excludable?: boolean;
    showEntityExtract?: boolean;
    separator?: string;
    actions?: Action[];
    collapseRows?: boolean;
    entityExtractMaxLines?: number;
}

export interface MetadataValue {
    valueItems: (MetadataItem | TreeMetadataItem)[]; // the determined value from the results
    column: CCColumn | undefined; // the results column
    isTree: boolean; // if is tree
    isEntity: boolean; // if is entity
    isCsv: boolean; // if is csv
    fnEntityTooltip?: (data: { entity: EntityItem, record: Record, query: Query }) => Observable<SafeHtml | undefined>;
}

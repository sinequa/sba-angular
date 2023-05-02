import { Injectable } from '@angular/core';
import { AppService, Query, ValueItem } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { CCColumn, EntityItem, Record, TextChunksWebService, TextLocation } from '@sinequa/core/web-services';
import { map, Observable, of } from 'rxjs';
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
  showEntityTooltip?: boolean;
  separator?: string;
  actions?: Action[];
}

type RecordType = Record[keyof Record] & MetadataItem[] & EntityItem[]

export interface MetadataValue {
  valueItems: (MetadataItem | TreeMetadataItem)[]; // the determined value from the results
  column: CCColumn | undefined; // the results column
  isTree: boolean; // if is tree
  isEntity: boolean; // if is entity
  isCsv: boolean; // if is csv
  fnEntityTooltip?: (data: { entity: EntityItem, record: Record, query: Query }) => Observable<string | undefined>;
}

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private textChunkWebService: TextChunksWebService,
    private appService: AppService) { }

  getMetadataValue(record: Record, query: Query | undefined, item: string, showEntityTooltip?: boolean): MetadataValue {
    const valueItems: (MetadataItem | TreeMetadataItem)[] = [];
    const column = this.appService.getColumn(item);
    const isTree = !!column && AppService.isTree(column);
    const isEntity = !!column && AppService.isEntity(column);
    const isCsv = !!column && AppService.isCsv(column);
    let fnEntityTooltip: ((data: { entity: EntityItem, record: Record, query: Query }) => Observable<string | undefined>) | undefined;

    const values: RecordType = record[this.appService.getColumnAlias(column, item)];

    if (isEntity) {
      const entityItems: EntityItem[] = values;
      if (entityItems) {
        const filters: any[] = query && column ? query.findFieldFilters(column.name) : [];
        valueItems.push(...entityItems.map(i => {
          const filter = filters.find(f => f.value === i.value);
          const filtered = !!filter && (!filter.operator || filter.operator !== 'neq');
          const excluded = !!filter && filter.operator === 'neq';
          return { ...i, filtered, excluded };
        }));
        if (showEntityTooltip && entityItems[0]?.locations) {
          fnEntityTooltip = this.getEntitySentence
        }
      }
    }
    else if (isCsv) {
      this.setCsvValues(values, valueItems, column, query);
    }
    else if (!isTree) {
      this.setValues(values, valueItems, column, query);
    }

    return {
      valueItems,
      column,
      isTree,
      isEntity,
      isCsv,
      fnEntityTooltip
    }
  }

  protected setCsvValues(values: RecordType, valueItems: (MetadataItem | TreeMetadataItem)[], column: CCColumn | undefined, query?: Query | undefined): void {
    const filters: any[] = query && column ? query.findFieldFilters(column.name) : [];
    if (values && values instanceof Array) {
      valueItems.push(...values.map<MetadataItem>(value => {
        const filter = filters.find(f => f.value === value);
        const filtered = !!filter && (!filter.operator || filter.operator !== 'neq');
        const excluded = !!filter && filter.operator === 'neq' && filter.value === value;
        return { value: value.value, filtered, excluded };
      }));
    }
    else if (!Utils.isEmpty(values)) {
      const filter = filters[0];
      const filtered = !!filter && (!filter.operator || filter.operator !== 'neq') && filter.value === values;
      const excluded = !!filter && filter.operator === 'neq' && filter.value === values;
      valueItems.push({ value: values, filtered, excluded });
    }
  }

  protected setValues(values: any, valueItems: (MetadataItem | TreeMetadataItem)[], column: CCColumn | undefined, query?: Query | undefined): void {
    const value = this.ensureScalarValue(values, column);
    if (!Utils.isEmpty(value)) {
      const filters: any[] = query && column ? query.findFieldFilters(column.name) : [];
      const filter = filters.length ? filters[0] : undefined;
      const filtered = !!filter && (!filter.operator || filter.operator !== 'neq') && filter.value === value;
      const excluded = !!filter && filter.operator === 'neq' && filter.value === value;
      valueItems.push({ value: value, filtered, excluded });
    }
  }

  protected ensureScalarValue(value: any, column: CCColumn | undefined): any {
    if (Utils.isEmpty(value) && column) {
      if (AppService.isBoolean(column)) {
        value = 'msg#metadata.item.empty_boolean';
      }
      else if (AppService.isNumber(column)) {
        value = 'msg#metadata.item.empty_number';
      }
    }
    return value;
  }

  protected getEntitySentence = (data: { entity: EntityItem, record: Record, query: Query }) => {
    const { entity, record, query } = data;
    // Get entity location
    const location = this.getEntityLocation(entity);
    if (!location) return of(undefined);
    // Get list of highlights
    const highlights = this.getHighlights();
    // Get the text at the location of the entity
    // The query is optional, but can be useful to resolve aliases and relevant extracts/matches
    return this.textChunkWebService.getTextChunks(
      record.id, [location], highlights, query, 1, 1)
      .pipe(map(chunks => chunks?.[0]?.text));
  }

  protected getHighlights(): string[] {
    const preview = this.appService.app?.preview?.split(',')?.[0];
    if (preview) {
      return this.appService.getWebService<any>(preview)?.highlights?.split(",") || [];
    }
    return [];
  }

  protected getEntityLocation(entity: EntityItem): TextLocation | undefined {
    const locations = entity.locations?.split(";")?.[0]?.split(",");
    if (!locations?.length) return;
    // eslint-disable-next-line radix
    const offset = parseInt(locations[0]);
    // eslint-disable-next-line radix
    const length = parseInt(locations[1]);
    return { offset, length };
  }
}

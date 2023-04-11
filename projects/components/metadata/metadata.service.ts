import { Injectable } from '@angular/core';
import { AppService, Query, ValueItem } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { CCColumn, EntityItem, Record, TextChunksWebService, TextLocation } from '@sinequa/core/web-services';
import { METADATA_CONFIG } from '@sinequa/vanilla/config';
import { map, Observable, of } from 'rxjs';
import { Action } from '../action';
import { TreeValueItem } from './metadata-item/metadata-item';

export interface MetadataConfig {
  item: string; // the column name
  icon: string; // the icon css class
  itemClass?: string; // custom classes to apply to the value
  colors?: { bgColor?: string, color?: string }; // override for colors
  filterable?: boolean; // if clickable to add in the filters
  excludable?: boolean; // if clickable to exclude from the search
  showEntityTooltip?: boolean; // if the entity tooltip should be displayed
  actions?: Action[]; // additional custom actions to add with the filtering and excluding
};

export interface MetadataValue {
  item: string; // the parameter name
  valueItems: (ValueItem | TreeValueItem)[]; // the determined value from the results
  column: CCColumn | undefined; // the results column
  icon: string; // the icon css class
  isTree: boolean; // if is tree
  isEntity: boolean; // if is entity
  isCsv: boolean; // if is csv
  itemClass?: string; // custom classes to apply to the value
  colors?: { bgColor?: string, color?: string }; // override for colors
  filterable?: boolean; // if clickable to add in the filters
  excludable?: boolean; // if clickable to exclude from the search
  entityTooltip?: (data: { entity: EntityItem, record: Record, query: Query }) => Observable<string | undefined>;
  actions?: Action[]; // additional custom actions to add with the filtering and excluding
}

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private textChunkWebService: TextChunksWebService,
    private appService: AppService) { }

  setMetadata(record: Record, query: Query | undefined, metadataConfig?: MetadataConfig[]): void {
    record.$metadataValues = (metadataConfig || METADATA_CONFIG).map(config => {
      const item = config.item;
      const valueItems: (ValueItem | TreeValueItem)[] = [];
      const column = this.appService.getColumn(config.item);
      const isTree = !!column && AppService.isTree(column);
      const isEntity = !!column && AppService.isEntity(column);
      const isCsv = !!column && AppService.isCsv(column);
      const actions = config.actions;
      let entityTooltip: ((data: { entity: EntityItem, record: Record, query: Query }) => Observable<string | undefined>) | undefined;

      const values = record[this.appService.getColumnAlias(column, config.item)];

      if (isEntity) {
        const entityItems: EntityItem[] = values;
        if (entityItems) {
          const filters = this.getFilters(column, query);
          valueItems.push(...entityItems.map(i => {
            const filter = filters.find(f => f.value === i.value);
            const filtered = !!filter && (!filter.operator || filter.operator !== 'neq');
            const excluded = !!filter && filter.operator === 'neq';
            return { ...i, filtered, excluded };
          }));
          if (config.showEntityTooltip && entityItems[0]?.locations) {
            entityTooltip = this.getEntitySentence
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
        item,
        valueItems,
        column,
        icon: config.icon,
        isTree,
        isEntity,
        isCsv,
        itemClass: config.itemClass,
        colors: config.colors,
        filterable: config.filterable,
        excludable: config.excludable,
        entityTooltip,
        actions
      }
    });
  }

  getFilters(column: CCColumn | undefined, query?: Query | undefined): any[] {
    if (!query || !query.filters || !column) return [];
    if (query.filters['filters']) {
      return query.filters['filters'].filter((f: any) => f.field === column!.name);
    }
    if (query.filters['field'] && query.filters['field'] === column.name) {
      return [query.filters];
    }
    return [];
  }

  private setCsvValues(values: any, valueItems: (ValueItem | TreeValueItem)[], column: CCColumn | undefined, query?: Query | undefined): void {
    const filters = this.getFilters(column, query);
    if (values && values instanceof Array) {
      valueItems.push(...values.map<ValueItem>(value => {
        const filter = filters.find(f => f.value === value);
        const filtered = !!filter && (!filter.operator || filter.operator !== 'neq');
        const excluded = !!filter && filter.operator === 'neq' && filter.value === value;
        return { value: value, filtered, excluded };
      }));
    }
    else if (!Utils.isEmpty(values)) {
      const filter = filters[0];
      const filtered = !!filter && (!filter.operator || filter.operator !== 'neq') && filter.value === values;
      const excluded = !!filter && filter.operator === 'neq' && filter.value === values;
      valueItems.push({ value: values, filtered, excluded });
    }
  }

  private setValues(values: any, valueItems: (ValueItem | TreeValueItem)[], column: CCColumn | undefined, query?: Query | undefined): void {
    const value = this.ensureScalarValue(values, column);
    if (!Utils.isEmpty(value)) {
      const filter = this.getFilters(column, query)[0];
      const filtered = !!filter && (!filter.operator || filter.operator !== 'neq') && filter.value === value;
      const excluded = !!filter && filter.operator === 'neq' && filter.value === value;
      valueItems.push({ value: value, filtered, excluded });
    }
  }

  private ensureScalarValue(value: any, column: CCColumn | undefined): any {
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

  private getEntitySentence = (data: { entity: EntityItem, record: Record, query: Query }) => {
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

  private getHighlights(): string[] {
    const preview = this.appService.app?.preview?.split(',')?.[0];
    if (preview) {
      return this.appService.getWebService<any>(preview)?.highlights?.split(",") || [];
    }
    return [];
  }

  private getEntityLocation(entity: EntityItem): TextLocation | undefined {
    const locations = entity.locations?.split(";")?.[0]?.split(",");
    if (!locations?.length) return;
    // eslint-disable-next-line radix
    const offset = parseInt(locations[0]);
    // eslint-disable-next-line radix
    const length = parseInt(locations[1]);
    return { offset, length };
  }
}

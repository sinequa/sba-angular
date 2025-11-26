import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppService, Query } from '@sinequa/core/app-utils';
import { FieldValue, Utils } from '@sinequa/core/base';
import { CCColumn, EntityItem, Record, TextChunksWebService, TextLocation } from '@sinequa/core/web-services';
import { map, Observable, of } from 'rxjs';
import { isTreeMetadataItem, MetadataItem, MetadataValue, TreeMetadataItem } from './metadata.interface';

type RecordType = FieldValue | EntityItem[];

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    private textChunkWebService: TextChunksWebService,
    private appService: AppService,
    private sanitizer: DomSanitizer
  ) { }

  getMetadataValue(record: Record, query: Query, item: string, showEntityExtract?: boolean): MetadataValue {
    let valueItems: (MetadataItem | TreeMetadataItem)[] = [];
    const column = this.appService.getColumn(item);
    const isTree = !!column && AppService.isTree(column);
    const isEntity = !!column && AppService.isEntity(column);
    const isCsv = !!column && AppService.isCsv(column);
    let fnEntityTooltip: ((data: { entity: EntityItem, record: Record, query: Query }) => Observable<SafeHtml | undefined>) | undefined;

    const alias = this.appService.getColumnAlias(column, item);
    const key = Object.keys(record).find(k => k.toLowerCase() === alias.toLowerCase());

    const values: RecordType = record[key ?? alias];

    if (isTree) {
      if(Array.isArray(values)) {
        valueItems = this.getTreeValues(values as string[]);
      }
    }
    else if (isCsv) {
      if(Array.isArray(values)) {
        valueItems = values.map(value => Utils.isString(value)? {value} : {...value});
        if (isEntity && showEntityExtract && (values[0] as EntityItem)?.locations) {
          fnEntityTooltip = this.getEntitySentence;
        }
      }
    }
    else {
      if(!Array.isArray(values)) {
        valueItems = this.getSingleValue(values, column);
      }
    }

    // Get the filters for this field
    const filters = query.findValueFilters(item);
    if(filters.length > 0) {
      const filtered = new Map<boolean|number|string, boolean>();
      for(const filter of filters) {
        filtered.set(filter.value, filter.operator !== 'neq');
      }
      this.applyFilters(valueItems, filtered);
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

  /**
   * Sets the filtered and excluded properties to the value items
   * including the nested tree items
   */
  applyFilters(valueItems: (MetadataItem | TreeMetadataItem)[], filtered: Map<string | boolean | number, boolean>) {
    for(let item of valueItems) {
      if (isTreeMetadataItem(item)) {
        this.applyFilters(item.parts, filtered);
      }
      else {
        const isFiltered = filtered.get(item.value);
        if(isFiltered !== undefined) {
          item.filtered = isFiltered;
          item.excluded = !isFiltered;
        }
      }
    }
  }

  /**
   * Takes a list of paths like ["/a/b/c/", "/a/b/d/"] and returns an array of TreeMetadataItem
   */
  getTreeValues(values: string[]): TreeMetadataItem[] {
    return values.map(path => ({parts: this.getTreeParts(path)}));
  }

  /**
   * Takes a path like "/a/b/c/" and returns an array of MetadataItem
   * like [{value: "/a/*", display: "a"}, {value: "/a/b/*", display: "b"}, {value: "/a/b/c/*", display: "c"}]
   */
  getTreeParts(path: string): MetadataItem[] {
    const parts = path.substring(1, path.length-1).split("/");
    return parts.map((value,i) => ({
      value: `/${parts.slice(0,i+1).join("/")}/*`,
      display: value
    }));
  }

  /**
   * Takes a single value and returns an array of one or zero MetadataItem
   */
  getSingleValue(value: string|number|Date|boolean|undefined, column: CCColumn | undefined): MetadataItem[] {
    if (Utils.isEmpty(value)) {
      if (AppService.isBoolean(column)) {
        return [{value: false, display: 'msg#metadata.item.empty_boolean'}];
      }
      else if (AppService.isNumber(column)) {
        return [{value: 0, display: 'msg#metadata.item.empty_number'}];
      }
      else {
        return [];
      }
    }
    if(Utils.isDate(value)) {
      value = Utils.toSysDateStr(value);
    }
    return [{value}];
  }

  getEntitySentence = (data: { entity: EntityItem, record: Record, query: Query }) => {
    const { entity, record, query } = data;
    // Get entity location
    const location = this.getEntityLocation(entity);
    if (!location) return of(undefined);
    // Get list of highlights
    const highlights = this.getHighlights();
    // Get the text at the location of the entity
    // The query is optional, but can be useful to resolve aliases and relevant extracts/matches
    return this.textChunkWebService.getTextChunks(record.id, [location], highlights, query, 1, 1).pipe(
      map(chunks => this.sanitizer.bypassSecurityTrustHtml(chunks?.[0]?.text ?? ''))
    );
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

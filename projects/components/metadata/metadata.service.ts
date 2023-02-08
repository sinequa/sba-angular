import { Injectable } from '@angular/core';
import { AppService, Query, ValueItem } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { CCColumn, EntityItem, Record, TextChunksWebService, TextLocation } from '@sinequa/core/web-services';
import { map, Observable, of } from 'rxjs';
import { TreeValueItem } from './metadata-item/metadata-item';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  record: Record;
  query: Query;

  constructor(private textChunkWebService: TextChunksWebService,
    private appService: AppService) { }

  setTreeValues(paths: string[], valueItems: (ValueItem | TreeValueItem)[]): void {
    if (paths) {
      for (const path of paths) {
        const parts = path.split("/");
        if (parts.length > 0 && parts[0] === "") {
          parts.splice(0, 1);
        }
        if (parts.length > 0 && parts[parts.length - 1] === "") {
          parts.splice(parts.length - 1, 1);
        }
        const item: TreeValueItem = { value: path, parts: parts.map(value => ({ value: value })) };
        valueItems.push(item);
      }
    }
  }

  setEntityValues(entityItems: EntityItem[], valueItems: (ValueItem | TreeValueItem)[], showEntityTooltip: boolean, entityTooltip?: (entity: EntityItem) => Observable<string | undefined>): void {
    if (entityItems) {
      valueItems.push(...entityItems);
      if (showEntityTooltip && entityItems[0]?.locations) {
        entityTooltip = this.getEntitySentence
      }
    }
  }

  setCsvValues(values: any, valueItems: (ValueItem | TreeValueItem)[]): void {
    if (values && values instanceof Array) {
      valueItems.push(...values.map<ValueItem>(value => ({ value: value })));
    }
    else if (!Utils.isEmpty(values)) {
      valueItems.push({ value: values });
    }
  }

  setValues(values: any, valueItems: (ValueItem | TreeValueItem)[], column: CCColumn | undefined): void {
    const value = this.ensureScalarValue(values, column);
    if (!Utils.isEmpty(value)) {
      valueItems.push({ value: value });
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

  private getEntitySentence = (entity: EntityItem) => {
    // Get entity location
    const location = this.getEntityLocation(entity);
    if (!location) return of(undefined);
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
    if (preview) {
      return this.appService.getWebService<any>(preview)?.highlights?.split(",") || [];
    }
    return [];
  }

  private getEntityLocation(entity: EntityItem): TextLocation | undefined {
    const locations = entity.locations?.split(";")?.[0]?.split(",");
    if (!locations?.length) return;
    const offset = parseInt(locations[0]);
    const length = parseInt(locations[1]);
    return { offset, length };
  }
}

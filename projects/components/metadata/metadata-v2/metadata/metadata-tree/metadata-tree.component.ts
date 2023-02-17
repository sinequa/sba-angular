import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AppService, Query } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { CCColumn, Record } from '@sinequa/core/web-services';
import { TreeValueItem } from '../../../metadata-item/metadata-item';
import { MetadataService, MetadataValue } from '../../../metadata.service';

@Component({
  selector: 'sq-metadata-tree',
  templateUrl: './metadata-tree.component.html',
  styles: [`.clickable {
    font-weight: 600;
}`]
})
export class MetadataTreeComponent implements OnChanges {

  @Input() record: Record;
  @Input() query: Query;
  @Input() config: MetadataValue;
  @Input() clickable: boolean;
  @Input() column: CCColumn | undefined;
  @Input() showFiltersHighlights = true;

  @Output() filter = new EventEmitter();
  @Output() exclude = new EventEmitter();

  valueItems: TreeValueItem[];

  constructor(private appService: AppService,
    private metadataService: MetadataService) { }

  ngOnChanges(): void {
    this.valueItems = [];

    if (this.record) {
      const paths: string[] = this.record[this.appService.getColumnAlias(this.column, this.config.item)];
      if (paths) {
        const filter = this.metadataService.getFilter(this.column, this.query);
        const filterValuePath = filter?.value.split('/');
        if (filterValuePath) {
          this.removeUnnecessaryPathElements(filterValuePath);
        }

        for (const path of paths) {
          const parts = path.split("/");
          this.removeUnnecessaryPathElements(parts);
          const item: TreeValueItem = {
            value: path, parts: parts.map((value, index) => {
              const filtered = !!filterValuePath && filterValuePath[index] === value && (!filter.operator || filter.operator !== 'neq');
              const excluded = !!filterValuePath && filterValuePath[index] === value && filter.operator === 'neq';
              return { value: value, filtered, excluded };
            })
          };
          this.valueItems.push(item);
        }
      }
    }
  }

  filterItem(valueItem: TreeValueItem, partIndex: number): void {
    if (this.clickable) {
      const path = this.generatePath(valueItem, partIndex);
      this.filter.emit({ item: this.config.item, valueItem: { value: path + "*", display: Utils.treepathLast(path) } });
    }
  }

  excludeItem(valueItem: TreeValueItem, partIndex: number): void {
    if (this.clickable) {
      const path = this.generatePath(valueItem, partIndex);
      this.exclude.emit({ item: this.config.item, valueItem: { value: path + "*", display: Utils.treepathLast(path) } });
    }
  }

  private generatePath(valueItem: TreeValueItem, partIndex: number): string {
    const parts = valueItem.parts.map((item) => item.value).slice(0, partIndex + 1);
    if (parts.length > 0) {
      parts.unshift("");
      parts.push("");
    }
    return parts.join("/");
  }

  private removeUnnecessaryPathElements(paths: string[]): void {
    if (paths.length > 0 && paths[0] === "") {
      paths.splice(0, 1);
    }
    if (paths.length > 0 && paths[paths.length - 1] === "") {
      paths.splice(paths.length - 1, 1);
    }
  }

}

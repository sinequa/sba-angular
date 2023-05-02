import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { AppService, Query } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { CCColumn, Record } from '@sinequa/core/web-services';
import { TreeMetadataItem } from '../../metadata.service';

@Component({
  selector: 'sq-metadata-tree',
  templateUrl: './metadata-tree.component.html',
  styles: [`.sq-metadata-item-tree-node-separator {
  white-space: break-spaces;
}`]
})
export class MetadataTreeComponent implements OnChanges {

  @Input() record: Record;
  @Input() query: Query;
  @Input() item: string;
  @Input() itemClass: string;
  @Input() column: CCColumn | undefined;
  @Input() showFiltersHighlights = true;

  @Input() loading: boolean;
  @Input() popoverTemplate: string;
  @Input() actions: Action[];
  @Input() actionsButtonsStyle: string;
  @Input() actionsButtonsSize: string;
  @Input() popoverLinesNumber: number;

  @Output("selectedItem") _selectedItem = new EventEmitter();

  valueItems: TreeMetadataItem[];

  constructor(private appService: AppService) { }

  ngOnChanges(): void {
    this.valueItems = [];

    if (this.record) {
      const paths: string[] = this.record[this.appService.getColumnAlias(this.column, this.item)];
      if (paths) {
        const filters: any[] = this.query && this.column ? this.query.findFieldFilters(this.column.name) : [];
        const filter = filters.length ? filters[0] : undefined;
        const filterValuePath = filter?.value.split('/');
        if (filterValuePath) {
          this.removeUnnecessaryPathElements(filterValuePath);
        }

        for (const path of paths) {
          const parts = path.split("/");
          this.removeUnnecessaryPathElements(parts);
          const item: TreeMetadataItem = {
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

  selectItem(valueItem: TreeMetadataItem, partIndex: number): void {
    if (this.popoverTemplate) {
      const path = this.generatePath(valueItem, partIndex);
      this._selectedItem.emit({ value: path + "*", display: Utils.treepathLast(path) });
    }
  }

  private generatePath(valueItem: TreeMetadataItem, partIndex: number): string {
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

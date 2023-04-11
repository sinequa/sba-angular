import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { AppService, Query } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { CCColumn, Record } from '@sinequa/core/web-services';
import { TreeValueItem } from '../../../metadata-item/metadata-item';
import { MetadataService, MetadataValue } from '../../../metadata.service';

@Component({
  selector: 'sq-metadata-tree',
  templateUrl: './metadata-tree.component.html',
  styles: [`.badge {
    color: #7283a7 !important;
    background-color: white !important;
}

.sq-metadata-item-tree-node-separator {
  white-space: break-spaces;
}`]
})
export class MetadataTreeComponent implements OnChanges {

  @Input() record: Record;
  @Input() query: Query;
  @Input() config: MetadataValue;
  @Input() clickable: boolean;
  @Input() column: CCColumn | undefined;
  @Input() showFiltersHighlights = true;

  @Input() loading: boolean;
  @Input() entityTemplate: any;
  @Input() actions: Action[];
  @Input() actionsButtonsStyle: string;
  @Input() actionsButtonsSize: string;
  @Input() tooltipLinesNumber: number;

  @Output("openedPopper") _openedPopper = new EventEmitter();

  valueItems: TreeValueItem[];

  constructor(private appService: AppService,
    private metadataService: MetadataService) { }

  ngOnChanges(): void {
    this.valueItems = [];

    if (this.record) {
      const paths: string[] = this.record[this.appService.getColumnAlias(this.column, this.config.item)];
      if (paths) {
        const filter = this.metadataService.getFilters(this.column, this.query)[0];
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

  openedPopper(valueItem: TreeValueItem, partIndex: number): void {
    if (this.clickable) {
      const path = this.generatePath(valueItem, partIndex);
      this._openedPopper.emit({ value: path + "*", display: Utils.treepathLast(path) });
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

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AppService } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { CCColumn, Record } from '@sinequa/core/web-services';
import { TreeValueItem } from '../../metadata-item/metadata-item';
import { MetadataValue } from '../../metadata.service';

@Component({
  selector: 'sq-metadata-tree',
  templateUrl: './metadata-tree.component.html',
  styles: [`.clickable {
    font-weight: 600;
}`]
})
export class MetadataTreeComponent implements OnChanges {

  @Input() record: Record;
  @Input() config: MetadataValue;
  @Input() clickable: boolean;
  @Input() column: CCColumn | undefined;

  @Output() filter = new EventEmitter();
  @Output() exclude = new EventEmitter();

  valueItems: TreeValueItem[];

  constructor(private appService: AppService) { }

  ngOnChanges(): void {
    this.valueItems = [];

    if (this.record) {
      const paths: string[] = this.record[this.appService.getColumnAlias(this.column, this.config.item)];
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

}

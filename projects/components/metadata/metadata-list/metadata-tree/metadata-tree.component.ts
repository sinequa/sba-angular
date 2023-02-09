import { Component, Input, OnChanges } from '@angular/core';
import { AppService, ValueItem } from '@sinequa/core/app-utils';
import { CCColumn, Record } from '@sinequa/core/web-services';
import { TreeValueItem } from '../../metadata-item/metadata-item';

@Component({
  selector: 'sq-metadata-tree',
  templateUrl: './metadata-tree.component.html',
  styles: [`.clickable {
    font-weight: 600;
}`]
})
export class MetadataTreeComponent implements OnChanges {

  @Input() record: Record;
  @Input() item: string;
  @Input() itemClass: string;
  @Input() column: CCColumn | undefined;

  valueItems: (ValueItem | TreeValueItem)[];

  constructor(private appService: AppService) { }

  ngOnChanges(): void {
    this.valueItems = [];

    if (this.record) {
      const paths: string[] = this.record[this.appService.getColumnAlias(this.column, this.item)];
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

  select(index, subIndex): void {

  }

}

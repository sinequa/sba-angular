import { Component, Input, OnChanges } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { Query } from '@sinequa/core/app-utils';
import { Record } from "@sinequa/core/web-services";
import { MetadataConfig } from '../../metadata.service';

@Component({
  selector: 'sq-metadata-value',
  templateUrl: './metadata-value.component.html',
  styles: [`sq-metadata-2 {
    display: inline-flex;
}`]
})
export class MetadataValueComponent implements OnChanges {

  @Input() record: Record;
  @Input() query?: Query;

  @Input() item: string;
  @Input() icon?: string;
  @Input() itemClass = 'badge rounded-pill';
  @Input() colors?: { bgColor?: string, color?: string } = {
    bgColor: 'rgb(12, 117, 255)',
    color: 'white'
  };
  @Input() filterable?: boolean;
  @Input() excludable?: boolean;
  @Input() showEntityTooltip?: boolean;
  @Input() actions?: Action[];

  config: MetadataConfig;

  ngOnChanges() {
    this.config = {
      item: this.item,
      icon: this.icon,
      itemClass: this.itemClass,
      colors: this.colors,
      filterable: this.filterable,
      excludable: this.excludable,
      showEntityTooltip: this.showEntityTooltip,
      actions: this.actions
    };
  }

}

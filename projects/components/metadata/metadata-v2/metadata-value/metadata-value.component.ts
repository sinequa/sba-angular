import { Component, Input } from '@angular/core';
import { Query } from '@sinequa/core/app-utils';
import { Record } from "@sinequa/core/web-services";
import { MetadataConfig } from '../../metadata.service';

@Component({
  selector: 'sq-metadata-value',
  templateUrl: './metadata-value.component.html',
  styles: [`sq-metadata-list {
    display: inline-block;
}`]
})
export class MetadataValueComponent {

  @Input() record: Record;
  @Input() query?: Query;
  /**
   * Quick access to config itemClass
   * Overrides only if none provided inside MetadataConfig
   */
  @Input() itemClass = 'badge rounded-pill';
  /**
   * Quick access to config colors
   * Overrides only if none provided inside MetadataConfig
   */
  @Input() colors?: { bgColor?: string, color?: string } = {
    bgColor: 'rgb(12, 117, 255)',
    color: 'white'
  };
  /**
   * Configuration for the metadata
   * Can be either the record item as a string, or a whole MetadataConfig
   */
  @Input("config") _config: MetadataConfig | string;
  get config(): MetadataConfig {
    const config = typeof this._config === 'string' ?
      { item: this._config } : this._config;
    if (this.itemClass && !config.itemClass) {
      config.itemClass += ` ${this.itemClass}`;
    }
    if (this.colors && !config.colors) {
      config.colors = this.colors;
    }
    return config;
  }

}

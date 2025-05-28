import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-metadata-item',
  templateUrl: './metadata-item.component.html'
})
export class DocMetadataItemComponent extends BaseComponent {

  code = `<sq-metadata-item
    [record]="record"
    [field]="'filename'"
    [icon]="'far fa-file-alt'"
    [fieldClass]="'badge rounded-pill bg-secondary'"
    [filterable]="true"
    [excludable]="true"
    [label]="'Filename'">
</sq-metadata-item>`;

}

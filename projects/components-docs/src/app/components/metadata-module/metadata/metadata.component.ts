import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-metadata',
  templateUrl: './metadata.component.html'
})
export class DocMetadataComponent extends BaseComponent {

  metadata: string[] = [
    "authors", "docformat", "modified", "size", "treepath", "filename"
  ];

  code1 = `<sq-metadata
    [record]="record"
    [items]="metadata"
    [showTitles]="true"
    [showIcons]="true"
    [tabular]="true"
    [clickable]="true">
</sq-metadata>`;

  code2 = `metadata: string[] = [
    "authors", "docformat", "modified", "size", "treepath", "filename"
];`;

}

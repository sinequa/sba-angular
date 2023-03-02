import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-metadata',
  templateUrl: './metadata.component.html'
})
export class DocMetadataComponent {

  metadata: string[] = [
    "authors", "docformat", "modified", "size", "treepath", "filename"
  ];

  code = `metadata: string[] = [
    "authors", "docformat", "modified", "size", "treepath", "filename"
];`;
  code2 = `<sq-metadata
    [record]="record"
    [items]="metadata"
    [showTitles]="true"
    [showIcons]="true"
    [tabular]="true"
    [clickable]="true">
</sq-metadata>`;

  constructor(public globalService: GlobalService) { }

}

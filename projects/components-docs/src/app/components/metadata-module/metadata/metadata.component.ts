import { Component } from '@angular/core';
import { MetadataConfig } from '@sinequa/components/metadata';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-metadata',
  templateUrl: './metadata.component.html',
  styles: [`
  /* override just-the-docs.css for docs */
  :host ::ng-deep ol > li::before {
      content: initial;
  }

  :host ::ng-deep ol {
      padding-left: 0;
  }
  `]
})
export class DocMetadataComponent extends BaseComponent {

  metadata: MetadataConfig[] = [
    {
      field: "treepath",
      label: "msg#metadata.treepath_label",
      icon: "fas fa-fw fa-folder-open",
      filterable: true,
      collapseRows: true
    },
    {
      field: "filename",
      label: "msg#metadata.filename_label",
      icon: "far fa-fw fa-file-alt"
    },
    {
      field: "modified",
      label: "msg#metadata.modifiedLabel",
      icon: "far fa-fw fa-calendar-alt"
    }
  ];

  code1 = `<sq-metadata
    [record]="record"
    [config]="metadata"
    [layout]="'table'">
</sq-metadata>`;

  code2 = `metadata: MetadataConfig[] = [
    {
        field: "treepath",
        label: "msg#metadata.treepath_label",
        icon: "fas fa-fw fa-folder-open",
        filterable: true,
        collapseRows: true
    },
    {
        field: "filename",
        label: "msg#metadata.filename_label",
        icon: "far fa-fw fa-file-alt"
    },
    {
        field: "modified",
        label: "msg#metadata.modifiedLabel",
        icon: "far fa-fw fa-calendar-alt"
    }
];`;

}

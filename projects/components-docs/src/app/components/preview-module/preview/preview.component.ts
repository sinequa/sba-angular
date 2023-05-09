import { Component, ViewChild } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { Preview, PreviewHighlightColors } from '@sinequa/components/preview';
import { PreviewData } from '@sinequa/core/web-services';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-preview',
  templateUrl: './preview.component.html'
})
export class DocPreviewComponent extends BaseComponent {

  @ViewChild(Preview) preview: Preview;

  get previewData(): PreviewData | undefined {
    if (this.preview?.loading) {
      return undefined;
    }
    return this.preview?.data;
  }

  get extractsType(): string {
    return this.previewData?.highlightsPerCategory['matchingpassages']?.values.length ?
      'matchingpassages' : 'extractslocations';
  }

  tooltipEntityActions: Action[];
  tooltipTextActions: Action[] = [
    new Action({
      text: "msg#searchForm.search",
      title: "msg#preview.searchText",
      icon: "fas fa-search",
      action: () => { }
    })
  ];

  code = `<sq-preview
    [id]="record.id"
    [query]="query">
</sq-preview>`;

  code2 = `<sq-preview-entity-panel
    [previewData]="previewData"
    [preview]="preview">
</sq-preview-entity-panel>`;

  code3 = `<sq-preview-extracts-panel
    [previewData]="previewData"
    [preview]="preview"
    [extractsNumber]="10"
    [type]="extractsType">
</sq-preview-extracts-panel>`;

highlights: PreviewHighlightColors[] = [
  {
    name: 'company',
    color: 'white',
    bgColor: '#FF7675'
  },
  {
    name: 'geo',
    color: 'white',
    bgColor: '#74B9FF'
  },
  {
    name: 'person',
    color: 'white',
    bgColor: '#00ABB5'
  },
  {
    name: 'extractslocations',
    color: 'black',
    bgColor: '#fffacd'
  },
  {
    name: 'matchlocations',
    color: 'black',
    bgColor: '#ff0'
  }
]

}

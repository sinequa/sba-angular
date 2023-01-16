import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-preview-entity-panel',
  templateUrl: './preview-entity-panel.component.html'
})
export class PreviewEntityPanelComponent implements OnInit {

  code = `<sq-preview-entity-panel
    [previewData]="previewData"
    [previewDocument]="previewDocument">
</sq-preview-entity-panel>`;

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
  }

}

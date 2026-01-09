import { Component } from '@angular/core';
import { SelectionService } from '@sinequa/components/selection';
import { BaseComponent } from 'src/app/shared/base.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'doc-slide-builder',
    templateUrl: './slide-builder.component.html',
    standalone: false
})
export class DocSlideBuilderComponent extends BaseComponent {

  code = `<sq-slide-builder></sq-slide-builder>`;

  constructor(private selectionService: SelectionService) {
    super();
    if (environment.mock && this.globalService.records) {
      this.selectionService.toggleSelectedRecords(this.globalService.records[0]);
      this.selectionService.toggleSelectedRecords(this.globalService.records[1]);
      this.selectionService.toggleSelectedRecords(this.globalService.records[2]);
    }
  }

}

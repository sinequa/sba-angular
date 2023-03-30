import { Component } from '@angular/core';
import { Record } from '@sinequa/core/web-services';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-passage-list',
  templateUrl: './passage-list.component.html'
})
export class DocPassageListComponent extends BaseComponent {

  code = `<sq-passage-list
    [record]="record">
</sq-passage-list>`;

  get record(): Record | undefined {
    return this.globalService.records?.find(record => record.matchingpassages?.passages.length)
  }

}

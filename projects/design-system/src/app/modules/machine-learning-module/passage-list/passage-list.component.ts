import { Component } from '@angular/core';
import { Record } from '@sinequa/core/web-services';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-passage-list',
  templateUrl: './passage-list.component.html'
})
export class DocPassageListComponent {

  code = `<sq-passage-list
    [record]="record">
</sq-passage-list>`;

  description = `The passages list is used to display all of the relevant passages from the selected document in a collapsed number of lines that you can expand manually.

It is placed in the mini preview where you can switch of view between the document preview and the passages list when some are found.

##### Required parameters:

- \`record\`: The selected document from the results list

##### Optional parameters:

- \`maxPassages\`: The maximum number of passages to show from the passages list of the document
- \`passageId\`: The id from a passage to make it expanded automatically`;

  get record(): Record | undefined {
    return this.globalService.records?.find(record => record.matchingpassages?.passages.length)
  }

  constructor(public globalService: GlobalService) { }

}

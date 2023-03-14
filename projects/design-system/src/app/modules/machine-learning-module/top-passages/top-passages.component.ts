import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-top-passages',
  templateUrl: './top-passages.component.html'
})
export class DocTopPassagesComponent {

  code = `<sq-top-passages
    [results]="results">
</sq-top-passages>`;

  description = `Similar as the Answer component, the Top Passages one displays the relevant passages that Neural Search has figured from your query according to your documents.

##### Required parameters:

- \`record\`: The query’s results which includes all the necessary data to display the passages

##### Optional parameters:

- \`collapsed\` (default: \`false\`): Whether the components starts collapsed
- \`itemsPerPage\` (default: \`3\`): The number of passages to show per page. It can be 1 as for Answer or many at once
- \`lineNumber\` (default: \`3\`): The number of lines to display per passages on collapsed state, they can be expanded afterwards`;

  constructor(public globalService: GlobalService) { }

}

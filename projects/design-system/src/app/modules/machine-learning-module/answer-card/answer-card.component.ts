import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-answer-card',
  templateUrl: './answer-card.component.html'
})
export class DocAnswerCardComponent {

  code = `<sq-answer-card
    [results]="results"
    [showLikeButtons]="true">
</sq-answer-card>`;

  description = `The answers are the possible direct answers the platform supposes from your query according to the documents it searches through.

##### Required parameters:

- \`results\`: The query’s results which includes all the necessary data to display the answers

##### Optional parameters:

- \`collapsed\` (default: \`false\`): The query’s results which includes all the necessary data to display the answers
- \`itemsPerPage\` (default: \`3\`): The number of passages to show per page. It can be 1 as for Answer or many at once
- \`lineNumber\` (default: \`3\`): The number of lines to display per passages on collapsed state, they can be expanded afterwards
`;

  constructor(public globalService: GlobalService) { }

}

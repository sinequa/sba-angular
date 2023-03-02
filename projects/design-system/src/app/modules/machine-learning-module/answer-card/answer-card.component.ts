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

  constructor(public globalService: GlobalService) { }

}

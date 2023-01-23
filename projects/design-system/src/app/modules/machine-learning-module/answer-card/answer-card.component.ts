import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html'
})
export class AnswerCardComponent {

  code = `<sq-answer-card
    [results]="results"
    [showLikeButtons]="true">
</sq-answer-card>`;

  constructor(public globalService: GlobalService) { }

}

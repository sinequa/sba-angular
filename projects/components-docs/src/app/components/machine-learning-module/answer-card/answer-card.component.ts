import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-answer-card',
    templateUrl: './answer-card.component.html',
    standalone: false
})
export class DocAnswerCardComponent extends BaseComponent {

  code = `<sq-answer-card
    [results]="results"
    [showLikeButtons]="true">
</sq-answer-card>`;

}

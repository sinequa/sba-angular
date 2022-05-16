import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { AppService } from "@sinequa/core/app-utils";
import { NotificationsService } from "@sinequa/core/notification";
import { Answer, AuditEvent, AuditWebService, Results } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";

@Component({
  selector: 'sq-answer-card',
  template: `
<div class="card" *ngIf="answers.length">
    <div class="card-body">
        <h3>{{answer.text}}</h3>
        <p [innerHtml]="answer.passage.text" class="mb-0"></p>
        <ng-container *ngIf="answer.record as record">
            <sq-result-title [record]="record" titleLinkBehavior="action" (titleClicked)="openAnswer()" class="d-block text-truncate"></sq-result-title>
            <sq-result-source [record]="record" [displayTreepath]="true"></sq-result-source>
        </ng-container>
    </div>
    <div class="d-flex justify-content-center align-items-center small text-muted">
        <button class="btn btn-sm btn-link" (click)="selectedAnswer = (selectedAnswer+answers.length-1) % answers.length" *ngIf="answers.length > 1">
            <i class="fas fa-chevron-left"></i>
        </button>
        answer {{selectedAnswer+1}}/{{answers.length}}
        <button class="btn btn-sm btn-link" (click)="likeAnswer()" sqTooltip="This answer is helpful">
            <i class="far fa-thumbs-up" [ngClass]="{fas: answer.$liked}"></i>
        </button>
        <button class="btn btn-sm btn-link" (click)="dislikeAnswer()" sqTooltip="This answer is incorrect">
            <i class="far fa-thumbs-down" [ngClass]="{fas: answer.$liked === false}"></i>
        </button>
        <button class="btn btn-sm btn-link" (click)="selectedAnswer = (selectedAnswer+1) % answers.length" *ngIf="answers.length > 1">
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>
</div>
  `,
  styles: [`
  p {
    white-space: break-spaces;
  }
  `]
})
export class AnswerCardComponent implements OnChanges {
  @Input() results: Results;
  @Output() answerOpened = new EventEmitter<Answer>();
  selectedAnswer: number;

  get answers(): Answer[] {
    return this.results?.answers?.answers || [];
  }

  get answer(): Answer {
    return this.answers[this.selectedAnswer];
  }

  constructor(
    public searchService: SearchService,
    public appService: AppService,
    public auditService: AuditWebService,
    public notificationsService: NotificationsService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedAnswer = 0;
  }

  openAnswer() {
    this.answerOpened.next(this.answer);
  }

  likeAnswer() {
    this.setLiked(true);
  }

  dislikeAnswer() {
    this.setLiked(false);
  }

  setLiked(liked: boolean) {
    let type = liked? "Answer_Liked" : "Answer_Disliked";
    if(this.answer.$liked === liked) {
      this.answer.$liked = undefined;
      this.auditService.notify(this.makeAuditEvent(type+"_Cancelled"))
        .subscribe();
    }
    else {
      this.answer.$liked = liked;
      this.auditService.notify(this.makeAuditEvent(type))
        .subscribe(() => this.notificationsService.success("Thank you for your feedback!"));
    }
  }

  protected makeAuditEvent(type: string): AuditEvent {
    return {
      type,
      detail: {
          text: this.searchService.query.text,
          message: this.answer.text,
          detail: this.answer.passage.text,
          resultcount: this.answers.length,
          rank: this.selectedAnswer
      }
    }
  }
}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { AppService } from "@sinequa/core/app-utils";
import { NotificationsService } from "@sinequa/core/notification";
import { Answer, AuditEvent, AuditWebService, Results } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";

@Component({
  selector: 'sq-answer-card',
  templateUrl: './answer-card.component.html',
  styles: [`
  .card-body {
    padding-bottom: .25em;
  }
  p {
    white-space: break-spaces;
    max-height: 15em;
    overflow: auto;
    margin-bottom: 0;
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
          detail: this.answer.highlightedAnswer,
          resultcount: this.answers.length,
          rank: this.selectedAnswer
      }
    }
  }
}

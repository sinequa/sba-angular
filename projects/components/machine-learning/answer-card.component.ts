import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { AbstractFacet } from '@sinequa/components/facet';
import { AppService } from "@sinequa/core/app-utils";
import { NotificationsService } from "@sinequa/core/notification";
import { Answer, AuditEvent, AuditWebService, Results, Record } from "@sinequa/core/web-services";

@Component({
  selector: 'sq-answer-card',
  templateUrl: 'answer-card.component.html',
  styles: [`
.card-body {
  cursor: pointer;
}
  `]
})
export class AnswerCardComponent extends AbstractFacet implements OnChanges {
  @Input() results: Results;
  @Input() collapsed: boolean;
  @Input() showLikeButtons: boolean;
  @Output() previewOpened = new EventEmitter<Answer>();
  @Output() titleClicked = new EventEmitter<{ item: Answer, isLink: boolean }>();
  selectedAnswer: number;

  get answers(): Answer[] {
    return this.results?.answers?.answers || [];
  }

  get answer(): Answer {
    const answer = this.answers[this.selectedAnswer];
    if (answer.$record) {
      return answer;
    } else {
      // Get the missing record
      this.searchService.getRecords([answer.recordId], 'answers')
      .subscribe((records) => {
        if (records) {
          answer.$record = (records as Record[])[0];
        } 
        return answer;
      });
    }
    return answer;
  }

  constructor(
    public searchService: SearchService,
    public appService: AppService,
    public auditService: AuditWebService,
    public notificationsService: NotificationsService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedAnswer = 0;
  }

  openPreview() {
    this.previewOpened.next(this.answer);
  }

  onTitleClicked(isLink: boolean) {
    this.titleClicked.next({ item: this.answer, isLink });
  }

  likeAnswer() {
    this.setLiked(true);
  }

  dislikeAnswer() {
    this.setLiked(false);
  }

  setLiked(liked: boolean) {
    const type = liked? "Answer_Liked" : "Answer_Disliked";
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
          detail: this.answer.passage.highlightedText,
          resultcount: this.answers.length,
          rank: this.selectedAnswer
      }
    }
  }
}

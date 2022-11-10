import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { AbstractFacet } from '@sinequa/components/facet';
import { AppService } from "@sinequa/core/app-utils";
import { NotificationsService } from "@sinequa/core/notification";
import { Answer, AuditEvent, AuditWebService, Results, Record } from "@sinequa/core/web-services";
import { BehaviorSubject } from "rxjs";

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

  answer$ = new BehaviorSubject<Answer | undefined>(undefined);

  get answers(): Answer[] {
    return this.results?.answers?.answers || [];
  }

  get answer(): Answer | undefined {
    return this.answer$.getValue();
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
    this.setAnswer();
  }

  openPreview() {
    this.previewOpened.next(this.answer$.getValue() as Answer);
  }

  onTitleClicked(isLink: boolean) {
    this.titleClicked.next({ item: this.answer$.getValue() as Answer, isLink });
  }

  setAnswer() {
    const answer = this.answers[this.selectedAnswer];
    if (!!answer.$record) {
      this.answer$.next(answer);
    } else {
      // Get the missing record
      this.searchService.getRecords([answer.recordId])
      .subscribe((records) => {
        if (records) {
          answer.$record = (records as Record[])[0];
        }
        this.answer$.next(answer);
      });
    }
  }

  likeAnswer() {
    this.setLiked(true);
  }

  dislikeAnswer() {
    this.setLiked(false);
  }

  setLiked(liked: boolean) {
    const answer = this.answer$.getValue() as Answer;
    const type = liked? "Answer_Liked" : "Answer_Disliked";
    if(answer.$liked === liked) {
      answer.$liked = undefined;
      this.auditService.notify(this.makeAuditEvent(type+"_Cancelled"))
        .subscribe();
    }
    else {
      answer.$liked = liked;
      this.auditService.notify(this.makeAuditEvent(type))
        .subscribe(() => this.notificationsService.success("Thank you for your feedback!"));
    }
    this.answer$.next(answer);
  }

  protected makeAuditEvent(type: string): AuditEvent {
    return {
      type,
      detail: {
          text: this.searchService.query.text,
          message: (this.answer$.getValue() as Answer).text,
          detail: (this.answer$.getValue() as Answer).passage.highlightedText,
          resultcount: this.answers.length,
          rank: this.selectedAnswer
      }
    }
  }
}

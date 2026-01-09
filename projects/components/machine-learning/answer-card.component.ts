import { Observable, map, of } from "rxjs";

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

import { AbstractFacet } from '@sinequa/components/facet';
import { SearchService } from "@sinequa/components/search";
import { AppService } from "@sinequa/core/app-utils";
import { NotificationsService } from "@sinequa/core/notification";
import { Answer, AuditEvent, AuditEventType, AuditWebService, Results } from "@sinequa/core/web-services";
import { AuditEventTypeValues } from "@sinequa/core/web-services/types/audit/AuditEventType";

@Component({
    selector: 'sq-answer-card',
    templateUrl: 'answer-card.component.html',
    styles: [`
.card-body {
  cursor: pointer;
}

.card-body:hover {
  background-color: rgb(0,0,0,0.03);
}

.passage-text {
  font-size: 0.875em;
}
  `],
    standalone: false
})
export class AnswerCardComponent extends AbstractFacet implements OnChanges {
  @Input() results: Results;
  @Input() collapsed: boolean;
  @Input() showLikeButtons: boolean;
  @Input() hideDate: boolean = false;
  @Input() dateFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  @Output() previewOpened = new EventEmitter<Answer>();
  @Output() titleClicked = new EventEmitter<{ item: Answer, isLink: boolean }>();
  selectedAnswer: number;

  answer$: Observable<Answer>;

  get answers(): Answer[] {
    return this.results?.answers?.answers || [];
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
    const answers = changes.results?.currentValue?.answers?.answers;
    if (answers?.length) {
      this.notifyAnswerResult(answers);
    }
  }

  openPreview(answer: Answer) {
    this.notifyAnswer(AuditEventType.Answer_Click, answer);
    this.previewOpened.next(answer);
  }

  onTitleClicked(isLink: boolean, answer: Answer) {
    this.notifyAnswer(AuditEventType.Answer_Click, answer);
    this.titleClicked.next({ item: answer, isLink });
  }

  previous() {
    this.selectedAnswer = (this.selectedAnswer + this.answers.length - 1) % this.answers.length;
    this.setAnswer();
  }

  next() {
    this.selectedAnswer = (this.selectedAnswer + 1) % this.answers.length;
    this.setAnswer();
  }

  setAnswer() {
    const answer = this.answers[this.selectedAnswer];
    if (!!answer) {
      this.notifyAnswer(AuditEventType.Answer_Display, answer);
      if (!!answer.$record) {
        this.answer$ = of(answer);
      } else {
        // Get the missing record
        this.answer$ = this.searchService.getRecords([answer.recordId]).pipe(map(records => {
          answer.$record = records[0];
          return answer;
        }));
      }
    }
  }

  likeAnswer(answer: Answer) {
    this.setLiked(answer, true);
  }

  dislikeAnswer(answer: Answer) {
    this.setLiked(answer, false);
  }

  private setLiked(answer: Answer, liked: boolean) {
    const type = liked ? AuditEventType.Answer_Liked : AuditEventType.Answer_Disliked;
    if (answer.$liked === liked) {
      answer.$liked = undefined;
      this.auditService.notify(this.makeAuditEvent(`${type}_Cancelled`, answer));
    }
    else {
      answer.$liked = liked;
      this.auditService.notify(this.makeAuditEvent(type, answer))
        .subscribe(() => this.notificationsService.success("Thank you for your feedback!"));
    }
  }

  private notifyAnswer(type: AuditEventType, answer: Answer) {
    const auditEvent: AuditEvent = this.makeAuditEvent(type, answer);
    this.auditService.notify(auditEvent);
  }

  private notifyAnswerResult(answers: Answer[]) {
    const auditEvents: AuditEvent[] = answers
      .map((answer: Answer) => this.makeAuditEvent(AuditEventType.Answer_Result, answer));
    this.auditService.notify(auditEvents);
  }

  private makeAuditEvent(type: AuditEventType | AuditEventTypeValues, answer: Answer): AuditEvent {
    const rank = this.answers.indexOf(answer);
    return {
      type,
      detail: {
        querytext: this.searchService.query.text,
        answertext: answer.text,
        recordid: answer.recordId,
        passageid: answer.passage.id,
        afscore: answer["af.score"],
        rmscore: answer["rm.score"],
        rank
      }
    };
  }
}

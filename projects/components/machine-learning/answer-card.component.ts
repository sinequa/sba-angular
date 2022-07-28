import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { AppService } from "@sinequa/core/app-utils";
import { NotificationsService } from "@sinequa/core/notification";
import { Answer, AuditEvent, AuditWebService, Results } from "@sinequa/core/web-services";

@Component({
  selector: 'sq-answer-card',
  templateUrl: 'answer-card.component.html',
  styleUrls: ['answer-card.component.scss']
})
export class AnswerCardComponent implements OnChanges, OnInit {
  @HostBinding('class.sq-collapsed') collapsed: boolean;

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
  ) {}

  ngOnInit(): void {
    this.collapsed = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedAnswer = 0;
    this.collapsed = true;
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
          detail: this.answer.highlightedAnswer,
          resultcount: this.answers.length,
          rank: this.selectedAnswer
      }
    }
  }
}

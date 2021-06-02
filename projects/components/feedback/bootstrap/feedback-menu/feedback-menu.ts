import {Component, OnInit, Input, ChangeDetectionStrategy} from "@angular/core";
import {Action, ActionButtonsOptions} from "@sinequa/components/action";
import {FeedbackService} from "../../feedback.service";

@Component({
    selector: "sq-feedback-menu",
    templateUrl: "./feedback-menu.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsFeedbackMenu implements OnInit {

    @Input() size: string;
    @Input() style: string;
    @Input() rightAligned: boolean;

    items: Action[];
    options: ActionButtonsOptions;

    constructor(
        public feedbackService: FeedbackService) {
    }

    ngOnInit() {
        this.items = this.feedbackService.buildFeedbackAction();
        this.options = {
            items: this.items, 
            autoAdjust: true, 
            rightAligned: this.rightAligned, 
            size: this.size, 
            style: this.style
        };
    }


}
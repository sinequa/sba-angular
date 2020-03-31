import {Component, OnInit, Input} from "@angular/core";
import {Action} from "@sinequa/components/action";
import {FeedbackService} from "../../feedback.service";

@Component({
    selector: "sq-feedback-menu",
    templateUrl: "./feedback-menu.html"
})
export class BsFeedbackMenu implements OnInit {

    @Input() size: string;
    @Input() style: string;
    @Input() rightAligned: boolean;

    items: Action[];

    constructor(
        public feedbackService: FeedbackService) {
    }

    ngOnInit() {
        this.items = this.feedbackService.buildFeedbackAction();
    }


}
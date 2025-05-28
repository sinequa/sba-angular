import {Component, Input, OnChanges} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Record} from "@sinequa/core/web-services";

@Component({
    selector: "sq-result-extracts",
    templateUrl: "./result-extracts.html",
    styles: [`
p, ul {
    margin: 0;
}
.sq-single-extract {
    display: -webkit-box;
    -webkit-line-clamp: var(--line-clamp, 4);
    -webkit-box-orient: vertical;
}
.extracts-text {
    word-break: break-word;
}
.sq-matching-passage {
    max-height: 6em;
    overflow: hidden;
}
    `]
})
export class ResultExtracts implements OnChanges {
    @Input() record: Record;
    @Input() showTextAlways: boolean;
    @Input() showLongExtracts: boolean;
    @Input() hideDate: boolean;
    @Input() maxLongExtracts: number;
    @Input() dateFormat: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};
    text: string | undefined;
    longExtracts: string[] | undefined;
    extractsClass: string;

    ngOnChanges() {
        this.text = undefined;
        this.longExtracts = undefined;
        if (this.showTextAlways) {
            this.text = Utils.encodeHTML(this.record.text);
            this.extractsClass = "sq-text-extracts";
        }
        else {
            if (this.showLongExtracts && this.record.extracts) {
                this.longExtracts = this.record.extracts
                    .filter((extract,i) => (!this.maxLongExtracts || i < this.maxLongExtracts) && !!extract.highlighted) // Note: keep only extracts with 11.7 format - older format not supported
                    .map(extract => extract.highlighted.replace(/\{b\}/g, "<strong>").replace(/\{nb\}/g, "</strong>"));
                this.extractsClass = "sq-long-extracts";
            }
            else if (this.record.matchingpassages?.passages?.[0]) {
              this.text = this.record.matchingpassages.passages?.[0].highlightedText;
              this.extractsClass = "sq-matching-passage";
            }
            else if (this.record.relevantExtracts) {
                this.text = this.record.relevantExtracts;
                this.extractsClass = "sq-relevant-extracts";
            }
            else {
                this.text = Utils.encodeHTML(this.record.text);
                this.extractsClass = "sq-text-extracts";
            }
        }

    }

}

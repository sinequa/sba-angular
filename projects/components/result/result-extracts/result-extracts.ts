import {Component, Input, OnChanges} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Record} from "@sinequa/core/web-services";

@Component({
    selector: "sq-result-extracts",
    templateUrl: "./result-extracts.html",
    styles: [`
p, ul {
    margin: 0;
    color: #676767;
    font-size: 0.9em;
}
    `]
})
export class ResultExtracts implements OnChanges {
    @Input() record: Record;
    @Input() limitLinesDisplayed: boolean;
    @Input() showLinesExpander: boolean;
    @Input() showTextAlways: boolean;
    @Input() showLongExtracts: boolean;
    @Input() hideDate: boolean;
    @Input() maxLongExtracts: number;
    @Input() dateFormat: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};
    collapsed: boolean = true;
    text: string | undefined;
    longExtracts: string[] | undefined;
    extractsClass: string;

    setup() {
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
            else if (this.record.relevantExtracts) {
                this.text = this.record.relevantExtracts;
                this.extractsClass = "sq-relevant-extracts";
            }
            else {
                this.text = Utils.encodeHTML(this.record.text);
                this.extractsClass = "sq-text-extracts";
            }
        }

        if (!this.limitLinesDisplayed || !this.collapsed) {
            this.extractsClass += " sq-show-all";
        }
    }

    ngOnChanges() {
        this.setup();
    }

    collapseClick(event: Event) {
        this.collapsed = !this.collapsed;
        this.setup();
        event.preventDefault();
    }
}
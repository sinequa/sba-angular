import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Record} from "@sinequa/core/web-services";

@Component({
    selector: "sq-result-extracts",
    templateUrl: "./result-extracts.html",
    styles: [`
p {
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
    collapsed: boolean = true;
    text: string;
    extractsClass: string;

    setup() {
        if (this.showTextAlways) {
            this.text = Utils.encodeHTML(this.record.text);
            this.extractsClass = "sq-text-extracts";
        }
        else {

            if(this.showLongExtracts && this.record["extracts"]) {
                let extracts = "";
                for(let i=0; i<this.record["extracts"].length; i+=3)
                    extracts += "<li>"+this.record["extracts"][i].replace(/\{b\}/g,"<strong>").replace(/\{nb\}/g,"</strong>")+"</li>";
                this.text = "<ul>"+extracts+"</ul>"
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

        if(this.record.modified && !this.hideDate){
            var modified = new Date(this.record.modified);
            var date = modified.toLocaleDateString(navigator.language, { year: 'numeric', month: 'short', day: 'numeric' });
            this.text = date + " - " + this.text;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["record"]) {
            this.setup();
        }
    }

    collapseClick(event: Event) {
        this.collapsed = !this.collapsed;
        this.setup();
        event.preventDefault();
    }
}
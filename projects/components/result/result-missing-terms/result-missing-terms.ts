import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Record} from "@sinequa/core/web-services";

@Component({
    selector: "sq-result-missing-terms",
    templateUrl: "./result-missing-terms.html",
    styleUrls: ["./result-missing-terms.css"]
})
export class ResultMissingTerms implements OnChanges {
    @Input() record: Record;
    missingTerms: string[];

    ngOnChanges(changes: SimpleChanges) {
        if (changes["record"]) {
            this.missingTerms = [];
            if (this.record.termspresence) {
                for (const tp of this.record.termspresence) {
                    if (Utils.eqNC(tp.presence, "missing")) {
                        this.missingTerms.push(tp.term);
                    }
                }
            }
        }
    }
}
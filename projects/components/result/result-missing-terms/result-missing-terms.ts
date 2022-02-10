import {ChangeDetectionStrategy, Component, Input, OnChanges} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Record} from "@sinequa/core/web-services";

@Component({
    selector: "sq-result-missing-terms",
    templateUrl: "./result-missing-terms.html",
    styleUrls: ["./result-missing-terms.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultMissingTerms implements OnChanges {
    @Input() record: Record;
    missingTerms: string[];

    ngOnChanges() {
        this.missingTerms = this.record.termspresence
            ?.filter(tp => Utils.eqNC(tp.presence, "missing"))
            .map(tp => tp.term) || [];
    }
}
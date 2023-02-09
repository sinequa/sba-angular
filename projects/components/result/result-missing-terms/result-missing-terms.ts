import {ChangeDetectionStrategy, Component, Input, OnChanges} from "@angular/core";
import { SearchService } from "@sinequa/components/search";
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

    constructor(
        public searchService: SearchService
    ) {}

    ngOnChanges() {
        this.missingTerms = this.record.termspresence
            ?.filter(tp => Utils.eqNC(tp.presence, "missing"))
            .map(tp => tp.term) || [];
    }

    mustInclude(term: string) {
        if(this.searchService.query.text) {
            this.searchService.query.text = this.searchService.query.text.replace(new RegExp(`\\b${term}\\b`, 'gi'), "");
        }
        this.searchService.query.addConcepts([term], '+');
        this.searchService.search();
    }
}

import {ChangeDetectionStrategy, Component, Input, OnChanges} from "@angular/core";
import {SearchService} from "@sinequa/components/search";
import {Query} from "@sinequa/core/app-utils";
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
    @Input() query?: Query;
    @Input() showMustInclude = true;

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
        const query = this.query || this.searchService.query;
        if(query.text) {
            query.text = query.text.replace(new RegExp(`\\b${term}\\b`, 'gi'), "");
        }
        query.addConcepts([term], '+');
        if(this.searchService.isSearchRouteActive() && query === this.searchService.query) {
            this.searchService.search();
        }
    }
}

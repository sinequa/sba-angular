import {ChangeDetectionStrategy, Component, Input, OnChanges} from "@angular/core";
import {SearchService} from "@sinequa/components/search";
import {Query} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";
import {Record} from "@sinequa/core/web-services";

@Component({
    selector: "sq-result-missing-terms",
    templateUrl: "./result-missing-terms.html",
    styleUrls: ["./result-missing-terms.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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
        // Strip surrounding brackets if the term uses adjacent syntax (e.g. "[exit code]" → "exit code")
        const bracketMatch = term.match(/^\[(.+)\]$/);
        const cleanTerm = bracketMatch ? bracketMatch[1] : term;
        if(query.text) {
            // Escape special regex characters to avoid regex injection (e.g. brackets becoming character classes)
            const escapedTerm = cleanTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            query.text = query.text.replace(new RegExp(`\\b${escapedTerm}\\b`, 'gi'), "");
        }
        query.addConcepts([cleanTerm], '+');
        if(this.searchService.isSearchRouteActive() && query === this.searchService.query) {
            this.searchService.search();
        }
    }
}

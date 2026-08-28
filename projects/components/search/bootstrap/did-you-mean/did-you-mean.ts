import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Results, DidYouMeanItem, DidYouMeanAction, DidYouMeanKind} from "@sinequa/core/web-services";
import {SearchService} from "../../search.service";

@Component({
    selector: "sq-did-you-mean",
    templateUrl: "./did-you-mean.html",
    styleUrls: ["./did-you-mean.css"],
    standalone: false
})
export class BsDidYouMean implements OnChanges {
    @Input() results: Results;
    item: DidYouMeanItem | undefined;
    action: DidYouMeanAction | undefined;

    constructor(
        public searchService: SearchService) {
    }

    private handleResults() {
        this.item = undefined;
        this.action = undefined;
        if (this.results.didYouMean) {
            const item = this.results.didYouMean.text;
            if (item.corrected) {
                this.item = item;
                this.action = this.resolveAction(item, this.results.didYouMean.spellingCorrectionMode);
            }
        }
    }

    /**
     * Resolves the action to display from the per-term `appliedChanges` reported by the engine (ES-28698).
     * Falls back to `spellingCorrectionMode`-based inference for engine versions prior to 11.14 that
     * do not report `appliedChanges`, or when the applied changes disagree on the action to take
     * (defaults to `suggestion`, the only case that does not assert a search behavior that may not
     * actually have happened — the root cause of ES-27719).
     */
    private resolveAction(item: DidYouMeanItem, spellingCorrectionMode: string): DidYouMeanAction {
        const appliedChanges = item.appliedChanges;
        if (!appliedChanges?.length) {
            return this.legacyAction(spellingCorrectionMode);
        }
        const [first, ...rest] = appliedChanges;
        if (first.action && rest.every(change => change.action === first.action)) {
            return first.action;
        }
        return "suggestion";
    }

    /**
     * Fallback for engine versions prior to 11.14 that do not report the per-term `action` (ES-28698).
     * Defaults to `suggestion` for unknown modes, since it is the only case that does not assert
     * a search behavior that may not actually have happened (the root cause of ES-27719).
     */
    private legacyAction(spellingCorrectionMode: string): DidYouMeanAction {
        switch (spellingCorrectionMode) {
            case "Correct": return "correction";
            case "Smart": return "expansion";
            default: return "suggestion";
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.results) {
            this.handleResults();
        }
    }

    selectOriginal() {
        if (this.item) {
            this.searchService.didYouMean(this.item.original, DidYouMeanKind.Original);
        }
        return false;
    }

    selectCorrected() {
        if (this.item) {
            this.searchService.didYouMean(this.item.corrected, DidYouMeanKind.Corrected);
        }
        return false;
    }
}

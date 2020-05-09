import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Results, DidYouMeanItem, DidYouMeanKind} from "@sinequa/core/web-services";
import {SearchService} from "../../search.service";

@Component({
    selector: "sq-did-you-mean",
    templateUrl: "./did-you-mean.html",
    styleUrls: ["./did-you-mean.css"]
})
export class BsDidYouMean implements OnChanges {
    @Input() results: Results;
    @Input() context: "search" | "refine" = "search";
    item: DidYouMeanItem | undefined;

    constructor(
        public searchService: SearchService) {
    }

    private handleResults() {
        this.item = undefined;
        if (this.results && this.results.didYouMean) {
            if (this.context === "search") {
                const item = this.results.didYouMean.text;
                if (item && item.corrected) {
                    this.item = item;
                }
            }
            else {
                const refineSelect = this.searchService.query.findSelect("refine");
                if (refineSelect && Utils.startsWith(refineSelect.expression, "refine:") && !!this.results.didYouMean.refine) {
                    const dymItem = this.results.didYouMean.refine[this.results.didYouMean.refine.length - 1];
                    if (dymItem.corrected) {
                        this.item = dymItem;
                    }
                }
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes["results"]) {
            this.handleResults();
        }
    }

    selectOriginal() {
        if (this.item) {
            this.searchService.didYouMean(this.item.original, this.context, DidYouMeanKind.Original);
        }
        return false;
    }

    selectCorrected() {
        if (this.item) {
            this.searchService.didYouMean(this.item.corrected, this.context, DidYouMeanKind.Corrected);
        }
        return false;
    }
}
import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Results, DidYouMeanItem, DidYouMeanKind} from "@sinequa/core/web-services";
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

    constructor(
        public searchService: SearchService) {
    }

    private handleResults() {
        this.item = undefined;
        if (this.results.didYouMean) {
            const item = this.results.didYouMean.text;
            if (item.corrected) {
                this.item = item;
            }
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

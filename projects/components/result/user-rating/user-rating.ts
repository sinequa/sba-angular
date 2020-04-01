import {Component, OnInit, Input, ChangeDetectorRef} from "@angular/core";
import {Record, CCRating, UserRatingsWebService, UserRatingResponse} from "@sinequa/core/web-services";

@Component({
    selector: "sq-user-rating",
    templateUrl: "./user-rating.html",
    styleUrls: ["./user-rating.css"]
})
export class UserRating implements OnInit {
    @Input() record: Record;
    @Input() ratingsColumn: string;
    @Input() averageColumn: string;
    @Input() updateDocWeight: boolean;
    @Input() count: number;
    @Input() values: string;
    @Input() titles: string;
    @Input() caption: string;
    @Input() showAverage: boolean;
    userRatingIndex: number;
    averageRatingIndex: number;
    ratingValues: string[];

    constructor(
        private userRatingService: UserRatingsWebService,
        private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.ensureRatingValues();
        this.handleResponse(this.userRatingService.getRecordRating(this.record, this.getCCRating()));
    }

    getCCRating(): CCRating {
        return {
            ratingsColumn: this.ratingsColumn,
            averageColumn: this.averageColumn,
            updateDocWeight: this.updateDocWeight,
            ratingsDistribution: this.ratingValues
        };
    }

    get messageParams() {
        return {
            values: {
                average: this.getAverageRating()
            }
        };
    }

    getTitle(ratingIndex: number): string {
        if (this.titles) {
            return this.titles.split(";")[ratingIndex] || "";
        }
        else {
            return "";
        }
    }

    getRating(ratingIndex: number): string {
        return this.ratingValues[ratingIndex];
    }

    getAverageRating(): string {
        if (this.averageRatingIndex < 0) {
            return "";
        }
        else {
            return this.ratingValues[this.averageRatingIndex];
        }
    }

    select(selectedRatingIndex: number) {
        //If selected rating was already selected, remove the rating
        if (this.userRatingIndex === selectedRatingIndex) {
            this.userRatingService.deleteRating(this.record, this.getCCRating()).subscribe(this.handleResponse);
        }
        else {
            this.userRatingService.setRating(this.record, selectedRatingIndex, this.getCCRating()).subscribe(this.handleResponse);
        }
    }

    private ensureRatingValues() {
        if (!this.ratingValues) {
            const count = this.count || 0;

            //Work out rating value range
            if (this.values) {
                //Use predefined values
                this.ratingValues = this.values.split(";");

                //Initialize missing values - so that ratingValues.length matches config.count
                for (let i = this.ratingValues.length; i < count; i++) {
                    this.ratingValues.push((i + 1).toString());
                }
            }
            else {
                //Generates [1, ... config.count]
                this.ratingValues = Array(count).fill(0).map((_, i) => (i + 1).toString());
            }
        }
    }

    private handleResponse = (response: UserRatingResponse) => {
        this.userRatingIndex    = response.rating;
        this.averageRatingIndex = response.averagerating;

        this.changeDetector.markForCheck();
    }
}

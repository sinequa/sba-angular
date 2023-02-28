import { Component, Input } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { Record } from "@sinequa/core/web-services";

@Component({
    selector: 'sq-slide-tile',
    templateUrl: './slide-tile.component.html',
    styleUrls: ['./slide-tile.component.scss']
})
export class SlideTileComponent {
    @Input() record: Record;
    @Input() dateFormat: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};

    constructor(
        public searchService: SearchService
    ) {}

    onSlideFilterClick(record:Record, event: Event) {
        event.stopPropagation(); // stop progation to avoid adding this slide to the slide deck
        const tab = this.searchService.query.tab;
        this.searchService.query.clear();
        this.searchService.query.tab = tab; // Stay on same tab
        this.searchService.query.addFilter({
          field: 'title',
          value: record.title,
          display: record.filename || record.title
        });
        this.searchService.query.sort = "id";
        this.searchService.search();
    }

}

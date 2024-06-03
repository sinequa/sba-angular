import { Component, Input, Output, EventEmitter } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { Record } from "@sinequa/core/web-services";

@Component({
    selector: 'sq-image-tile',
    templateUrl: './image-tile.component.html',
    styleUrls: ['./image-tile.component.scss']
})
export class ImageTileComponent {
    @Input() record: Record;
    @Input() dateFormat: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};

    /** Event emitter to perform actions at the parent level */
    @Output() imageClicked = new EventEmitter<any>();   // TODO: Custom options to get title & URL (replace pluginservice)

    constructor(
        public searchService: SearchService
    ) {}

    public click() : void {
        console.log("click in ImageTileComponent");
        this.imageClicked.emit(this.record);
    }
}

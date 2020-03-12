import {Component, Input} from "@angular/core";

@Component({
    selector: "sq-heatmap-tooltip",
    templateUrl: "./results-timeline-tooltip.html",
    styles: [`ul { list-style: none; padding: 0 10px; }`]
})
export class BsTimelineTooltip{
    @Input() month: string;
    @Input() dates: any[];
}
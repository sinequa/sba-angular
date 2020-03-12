import {Component, Input} from "@angular/core";
import {Heatmap} from "./heatmap.component";

@Component({
    selector: "sq-heatmap-tooltip",
    templateUrl: "./heatmap-tooltip.component.html",
    styleUrls: ["./heatmap-tooltip.component.css"]
})
export class HeatmapTooltip {
    @Input() item: Heatmap.Item;
}
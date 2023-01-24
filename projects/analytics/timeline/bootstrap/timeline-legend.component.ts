import { Component, Input } from "@angular/core";
import { TimelineEventType, TimelineSeries } from "./timeline.model";

@Component({
    selector: 'sq-timeline-legend',
    template: `
        <div class="legend d-flex flex-{{orientation}} flex-wrap" style="height: {{height + 'px'}}" [ngStyle]="legendStyles">

            <div *ngFor="let timeline of data" class="series me-2">
                <svg width="20" height="15">
                    <rect class="area" x="0" [attr.y]="yOffset" width="20" [attr.height]="13-yOffset" [ngStyle]="timeline.areaStyles"></rect>
                    <line class="line" x1="0" [attr.y1]="yOffset" x2="20" [attr.y2]="yOffset" [ngStyle]="timeline.lineStyles"></line>
                </svg>
                <span class="name ms-1">{{ timeline.name }}</span>
            </div>

            <div *ngFor="let event of events" class="event me-2">
                <svg width="20" height="15">
                    <path class="event" [attr.d]="'M 10 1 l -7 11 l 14 0 z'" [ngStyle]="event.styles"></path>
                </svg>
                <span class="name ms-1">{{ event.name }}</span>
            </div>

        </div>
    `,
    styles: [`
        .series .area {
            fill: lightblue;
            opacity: 0.5;
        }

        .series .line {
            stroke: rgb(132, 187, 206);
            stroke-width: 2;
            fill: none;
        }

        .event {
            fill: #7c7c7c;
        }

        .name {
            font-size: 12px;
            color: darkgrey;
        }
    `]
})
export class TimelineLegendComponent {
    @Input() data?: TimelineSeries[];
    @Input() events?: TimelineEventType[];
    @Input() orientation: "row"|"column" = "row";
    @Input() yOffset: number = 3;
    @Input() height: number = 50;
    @Input() legendStyles?: {[key:string]: any};

}

import { Record } from "@sinequa/core/web-services";

export interface TimelineDate {
    date: Date;
    value: number;
    displayedDate?: Date;
}

export interface TimelineSeries {
    name: string;
    dates: TimelineDate[];
    primary: boolean;
    lineStyles?: {[key:string]: any};
    areaStyles?:  {[key:string]: any};
    showDatapoints?: boolean;
}

export interface TimelineEvent {
    date: Date;
    id: string;
    display: string;
    size?: number;
    sizeOpened?: number;
    styles?: {[key:string]: any};
    record?: Record;
}

export interface TimelineEventType {
    name: string;
    styles?: {[key:string]: any};
}

export interface Point extends TimelineDate {
    name: string;
}

export interface TooltipDataPoint {
    date: Date | string;
    values: Point[];
}

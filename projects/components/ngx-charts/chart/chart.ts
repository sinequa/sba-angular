import {Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, DoCheck, SimpleChanges, ViewChild, ElementRef, Type} from "@angular/core";
import {Subscription} from "rxjs";
import {Utils} from "@sinequa/core/base";
import {IntlService} from "@sinequa/core/intl";
import {BaseChartComponent, BarVerticalComponent, BarHorizontalComponent} from "@swimlane/ngx-charts";
import {UIService} from "@sinequa/components/utils";


export interface ChartOptions {
    type: string;
    colorScheme?: string;
    getItemColor?: (value: string) => string;
    tickFormatter?: (value: any) => string;
}

export interface ChartDataPoint {
    name: string;
    value: number;
}

@Component({
    selector: "sq-ngx-chart",
    templateUrl: "./chart.html",
    styleUrls: ["./chart.scss"]
})
export class NgxChart implements OnInit, OnDestroy, OnChanges, DoCheck {
    @Input() options: ChartOptions;
    @Input() data: ChartDataPoint[];
    @Output("item-click") itemClickEvent: EventEmitter<ChartDataPoint>;
    @ViewChild("wrapper", {static: true}) wrapper: ElementRef;
    @ViewChild("tooltipTemplate", {static: false}) tooltipTemplate;
    @ViewChild("chart", {static: false}) chart: BaseChartComponent;
    localeChange: Subscription;
    attached: boolean;

    constructor(
        protected intlService: IntlService,
        private uiService: UIService) {
        this.itemClickEvent = new EventEmitter<ChartDataPoint>();
    }

    updateChart() {
        if (!!this.chart) this.chart.update();
    }

    private onResize = () => this.updateChart();

    ngOnInit() {
        this.uiService.addElementResizeListener(this.wrapper.nativeElement, this.onResize);
        this.localeChange = Utils.subscribe(this.intlService.events,
            (value) => {
                this.updateChart();
            });
    }

    ngOnDestroy() {
        this.uiService.removeElementResizeListener(this.wrapper.nativeElement, this.onResize);
        this.localeChange.unsubscribe();
    }

    get chartType(): string {
        return Utils.toLowerCase(this.options.type);
    }

    chartComponent(type:string) : Type<any> {
        switch(type){
            case "horizontalbar": return BarHorizontalComponent;
            case "verticaltalbar": return BarVerticalComponent;
            default: return BarVerticalComponent;
        }
    }

    // so we don't end up with no color scheme if the color scheme is not set
    get colorScheme(): string {
        return this.options.colorScheme || "cool";
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    // This is a clunky way of avoiding (briefly) seeing ngx-charts rendering with the default 600x400 dimensions
    ngDoCheck() {
        if (!this.attached && !!this.wrapper) {
            if (document.body.contains(this.wrapper.nativeElement)) {
                this.updateChart();
                this.attached = true;
            }
        }
    }

    select = (dataPoint: ChartDataPoint): void => {
        this.itemClickEvent.emit(dataPoint);
    }
}
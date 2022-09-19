import {
  Input,
  ElementRef,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  NgZone,
  Output,
  EventEmitter,
  Directive
} from '@angular/core';

import { FusionChartsService } from './fusioncharts.service';
import { FusionChartsConstructor } from './fusioncharts.constructor';
import FusionChartsEvent from './interfaces/FusionChartsEvent';
import FusionChartInstance from './interfaces/FusionChartInstance';
import EventsList from './events/events';

@Directive({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'fusioncharts',
  providers: [FusionChartsService]
})
export class FusionChartsDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  chartObj: any;

  @Input()
  placeholder!: string;
  @Input() dataSource: any = undefined;
  @Input()
  type!: string;
  @Input()
  id!: string;
  @Input()
  width!: string;
  @Input()
  height!: string;
  @Input()
  renderAt!: string;
  @Input()
  dataFormat!: string;
  @Input()
  events!: string;
  @Input()
  link!: string;
  @Input()
  showDataLoadingMessage!: boolean;
  @Input()
  showChartLoadingMessage!: boolean;
  @Input()
  baseChartMessageFont!: string;
  @Input()
  baseChartMessageFontSize!: string;
  @Input()
  baseChartMessageColor!: string;
  @Input()
  dataLoadStartMessage!: string;
  @Input()
  dataLoadErrorMessage!: string;
  @Input()
  dataInvalidMessage!: string;
  @Input()
  dataEmptyMessage!: string;
  @Input()
  typeNotSupportedMessage!: string;
  @Input()
  loadMessage!: string;
  @Input()
  renderErrorMessage!: string;
  @Input()
  containerBackgroundColor!: string;
  @Input()
  containerBackgroundOpacity!: string;
  @Input()
  containerClassName!: string;
  @Input()
  baseChartMessageImageHAlign!: string;
  @Input()
  baseChartMessageImageVAlign!: string;
  @Input()
  baseChartMessageImageAlpha!: number;
  @Input()
  baseChartMessageImageScale!: number;
  @Input()
  typeNotSupportedMessageImageHAlign!: string;
  @Input()
  typeNotSupportedMessageImageVAlign!: string;
  @Input()
  typeNotSupportedMessageImageAlpha!: number;
  @Input()
  typeNotSupportedMessageImageScale!: number;
  @Input()
  dataLoadErrorMessageImageHAlign!: string;
  @Input()
  dataLoadErrorMessageImageVAlign!: string;
  @Input()
  dataLoadErrorMessageImageAlpha!: number;
  @Input()
  dataLoadErrorMessageImageScale!: number;
  @Input()
  dataLoadStartMessageImageHAlign!: string;
  @Input()
  dataLoadStartMessageImageVAlign!: string;
  @Input()
  dataLoadStartMessageImageAlpha!: number;
  @Input()
  dataLoadStartMessageImageScale!: number;
  @Input()
  dataInvalidMessageImageHAlign!: string;
  @Input()
  dataInvalidMessageImageVAlign!: string;
  @Input()
  dataInvalidMessageImageAlpha!: number;
  @Input()
  dataInvalidMessageImageScale!: number;
  @Input()
  dataEmptyMessageImageHAlign!: string;
  @Input()
  dataEmptyMessageImageVAlign!: string;
  @Input()
  dataEmptyMessageImageAlpha!: number;
  @Input()
  dataEmptyMessageImageScale!: number;
  @Input()
  renderErrorMessageImageHAlign!: string;
  @Input()
  renderErrorMessageImageVAlign!: string;
  @Input()
  renderErrorMessageImageAlpha!: number;
  @Input()
  renderErrorMessageImageScale!: number;
  @Input()
  loadMessageImageHAlign!: string;
  @Input()
  loadMessageImageVAlign!: string;
  @Input()
  loadMessageImageAlpha!: number;
  @Input()
  loadMessageImageScale!: number;

  /**
   * All Events List
   */

  private eventList: Array<string> = EventsList;

  /**
   * All events emitter
   */
  @Output() beforeLinkedItemOpen = new EventEmitter<FusionChartsEvent>();
  @Output() linkedItemOpened = new EventEmitter<FusionChartsEvent>();
  @Output() beforeLinkedItemClose = new EventEmitter<FusionChartsEvent>();
  @Output() linkedItemClosed = new EventEmitter<FusionChartsEvent>();
  @Output() printReadyStateChange = new EventEmitter<FusionChartsEvent>();
  @Output() dataLoadRequestCompleted = new EventEmitter<FusionChartsEvent>();
  @Output() dataLoadError = new EventEmitter<FusionChartsEvent>();
  @Output() dataLoadCancelled = new EventEmitter<FusionChartsEvent>();
  @Output() dataLoadRequestCancelled = new EventEmitter<FusionChartsEvent>();
  @Output() dataUpdated = new EventEmitter<FusionChartsEvent>();
  @Output() dataUpdateCancelled = new EventEmitter<FusionChartsEvent>();
  @Output() dataLoadRequested = new EventEmitter<FusionChartsEvent>();
  @Output() beforeDataUpdate = new EventEmitter<FusionChartsEvent>();
  @Output() realTimeUpdateComplete = new EventEmitter<FusionChartsEvent>();
  @Output() chartCleared = new EventEmitter<FusionChartsEvent>();
  @Output() slicingEnd = new EventEmitter<FusionChartsEvent>();
  @Output() slicingStart = new EventEmitter<FusionChartsEvent>();
  @Output() entityRollOut = new EventEmitter<FusionChartsEvent>();
  @Output() entityRollOver = new EventEmitter<FusionChartsEvent>();
  @Output() entityClick = new EventEmitter<FusionChartsEvent>();
  @Output() connectorRollOver = new EventEmitter<FusionChartsEvent>();
  @Output() connectorRollOut = new EventEmitter<FusionChartsEvent>();
  @Output() connectorClick = new EventEmitter<FusionChartsEvent>();
  @Output() markerRollOver = new EventEmitter<FusionChartsEvent>();
  @Output() markerRollOut = new EventEmitter<FusionChartsEvent>();
  @Output() markerClick = new EventEmitter<FusionChartsEvent>();
  @Output() pageNavigated = new EventEmitter<FusionChartsEvent>();
  @Output() rotationEnd = new EventEmitter<FusionChartsEvent>();
  @Output() rotationStart = new EventEmitter<FusionChartsEvent>();
  @Output() centerLabelRollover = new EventEmitter<FusionChartsEvent>();
  @Output() centerLabelRollout = new EventEmitter<FusionChartsEvent>();
  @Output() centerLabelClick = new EventEmitter<FusionChartsEvent>();
  @Output() centerLabelChanged = new EventEmitter<FusionChartsEvent>();
  @Output() chartClick = new EventEmitter<FusionChartsEvent>();
  @Output() chartMouseMove = new EventEmitter<FusionChartsEvent>();
  @Output() chartRollOver = new EventEmitter<FusionChartsEvent>();
  @Output() chartRollOut = new EventEmitter<FusionChartsEvent>();
  @Output() backgroundLoaded = new EventEmitter<FusionChartsEvent>();
  @Output() backgroundLoadError = new EventEmitter<FusionChartsEvent>();
  @Output() legendItemClicked = new EventEmitter<FusionChartsEvent>();
  @Output() legendItemRollover = new EventEmitter<FusionChartsEvent>();
  @Output() legendItemRollout = new EventEmitter<FusionChartsEvent>();
  @Output() logoRollover = new EventEmitter<FusionChartsEvent>();
  @Output() logoRollout = new EventEmitter<FusionChartsEvent>();
  @Output() logoClick = new EventEmitter<FusionChartsEvent>();
  @Output() logoLoaded = new EventEmitter<FusionChartsEvent>();
  @Output() logoLoadError = new EventEmitter<FusionChartsEvent>();
  @Output() beforeExport = new EventEmitter<FusionChartsEvent>();
  @Output() exported = new EventEmitter<FusionChartsEvent>();
  @Output() exportCancelled = new EventEmitter<FusionChartsEvent>();
  @Output() beforePrint = new EventEmitter<FusionChartsEvent>();
  @Output() printComplete = new EventEmitter<FusionChartsEvent>();
  @Output() printCancelled = new EventEmitter<FusionChartsEvent>();
  @Output() dataLabelClick = new EventEmitter<FusionChartsEvent>();
  @Output() dataLabelRollOver = new EventEmitter<FusionChartsEvent>();
  @Output() dataLabelRollOut = new EventEmitter<FusionChartsEvent>();
  @Output() scrollStart = new EventEmitter<FusionChartsEvent>();
  @Output() scrollEnd = new EventEmitter<FusionChartsEvent>();
  @Output() onScroll = new EventEmitter<FusionChartsEvent>();
  @Output() zoomReset = new EventEmitter<FusionChartsEvent>();
  @Output() zoomedOut = new EventEmitter<FusionChartsEvent>();
  @Output() zoomedIn = new EventEmitter<FusionChartsEvent>();
  @Output() zoomed = new EventEmitter<FusionChartsEvent>();
  @Output() zoomModeChanged = new EventEmitter<FusionChartsEvent>();
  @Output() pinned = new EventEmitter<FusionChartsEvent>();
  @Output() dataRestored = new EventEmitter<FusionChartsEvent>();
  @Output() beforeDataSubmit = new EventEmitter<FusionChartsEvent>();
  @Output() dataSubmitError = new EventEmitter<FusionChartsEvent>();
  @Output() dataSubmitted = new EventEmitter<FusionChartsEvent>();
  @Output() dataSubmitCancelled = new EventEmitter<FusionChartsEvent>();
  @Output() chartUpdated = new EventEmitter<FusionChartsEvent>();
  @Output() nodeAdded = new EventEmitter<FusionChartsEvent>();
  @Output() nodeUpdated = new EventEmitter<FusionChartsEvent>();
  @Output() nodeDeleted = new EventEmitter<FusionChartsEvent>();
  @Output() connectorAdded = new EventEmitter<FusionChartsEvent>();
  @Output() connectorUpdated = new EventEmitter<FusionChartsEvent>();
  @Output() connectorDeleted = new EventEmitter<FusionChartsEvent>();
  @Output() labelAdded = new EventEmitter<FusionChartsEvent>();
  @Output() labelDeleted = new EventEmitter<FusionChartsEvent>();
  @Output() selectionRemoved = new EventEmitter<FusionChartsEvent>();
  @Output() selectionStart = new EventEmitter<FusionChartsEvent>();
  @Output() selectionEnd = new EventEmitter<FusionChartsEvent>();
  @Output() labelClick = new EventEmitter<FusionChartsEvent>();
  @Output() labelRollOver = new EventEmitter<FusionChartsEvent>();
  @Output() labelRollOut = new EventEmitter<FusionChartsEvent>();
  @Output() labelDragStart = new EventEmitter<FusionChartsEvent>();
  @Output() labelDragEnd = new EventEmitter<FusionChartsEvent>();
  @Output() dataplotDragStart = new EventEmitter<FusionChartsEvent>();
  @Output() dataplotDragEnd = new EventEmitter<FusionChartsEvent>();
  @Output() processClick = new EventEmitter<FusionChartsEvent>();
  @Output() processRollOver = new EventEmitter<FusionChartsEvent>();
  @Output() processRollOut = new EventEmitter<FusionChartsEvent>();
  @Output() categoryClick = new EventEmitter<FusionChartsEvent>();
  @Output() categoryRollOver = new EventEmitter<FusionChartsEvent>();
  @Output() categoryRollOut = new EventEmitter<FusionChartsEvent>();
  @Output() milestoneClick = new EventEmitter<FusionChartsEvent>();
  @Output() milestoneRollOver = new EventEmitter<FusionChartsEvent>();
  @Output() milestoneRollOut = new EventEmitter<FusionChartsEvent>();
  @Output() chartTypeChanged = new EventEmitter<FusionChartsEvent>();
  @Output() overlayButtonClick = new EventEmitter<FusionChartsEvent>();
  @Output() loaded = new EventEmitter<FusionChartsEvent>();
  @Output() rendered = new EventEmitter<FusionChartsEvent>();
  @Output() drawComplete = new EventEmitter<FusionChartsEvent>();
  @Output() renderComplete = new EventEmitter<FusionChartsEvent>();
  @Output() dataInvalid = new EventEmitter<FusionChartsEvent>();
  @Output() dataXMLInvalid = new EventEmitter<FusionChartsEvent>();
  @Output() dataLoaded = new EventEmitter<FusionChartsEvent>();
  @Output() noDataToDisplay = new EventEmitter<FusionChartsEvent>();
  @Output() legendPointerDragStart = new EventEmitter<FusionChartsEvent>();
  @Output() legendPointerDragStop = new EventEmitter<FusionChartsEvent>();
  @Output() legendRangeUpdated = new EventEmitter<FusionChartsEvent>();
  @Output() alertComplete = new EventEmitter<FusionChartsEvent>();
  @Output() realTimeUpdateError = new EventEmitter<FusionChartsEvent>();
  @Output() dataplotRollOver = new EventEmitter<FusionChartsEvent>();
  @Output() dataplotRollOut = new EventEmitter<FusionChartsEvent>();
  @Output() dataplotClick = new EventEmitter<FusionChartsEvent>();
  @Output() linkClicked = new EventEmitter<FusionChartsEvent>();
  @Output() beforeRender = new EventEmitter<FusionChartsEvent>();
  @Output() renderCancelled = new EventEmitter<FusionChartsEvent>();
  @Output() beforeResize = new EventEmitter<FusionChartsEvent>();
  @Output() resized = new EventEmitter<FusionChartsEvent>();
  @Output() resizeCancelled = new EventEmitter<FusionChartsEvent>();
  @Output() beforeDispose = new EventEmitter<FusionChartsEvent>();
  @Output() disposed = new EventEmitter<FusionChartsEvent>();
  @Output() disposeCancelled = new EventEmitter<FusionChartsEvent>();
  @Output() linkedChartInvoked = new EventEmitter<FusionChartsEvent>();
  @Output() beforeDrillDown = new EventEmitter<FusionChartsEvent>();
  @Output() drillDown = new EventEmitter<FusionChartsEvent>();
  @Output() beforeDrillUp = new EventEmitter<FusionChartsEvent>();
  @Output() drillUp = new EventEmitter<FusionChartsEvent>();
  @Output() drillDownCancelled = new EventEmitter<FusionChartsEvent>();
  @Output() drillUpCancelled = new EventEmitter<FusionChartsEvent>();
  @Output() initialized = new EventEmitter<FusionChartInstance>();

  private configObj: any;
  private constructerParams = {
    type: true,
    id: true,
    width: true,
    height: true,
    renderAt: true,
    dataFormat: true,
    dataSource: true,
    events: true,
    link: true,
    showDataLoadingMessage: true,
    showChartLoadingMessage: true,
    baseChartMessageFont: true,
    baseChartMessageFontSize: true,
    baseChartMessageColor: true,
    dataLoadStartMessage: true,
    dataLoadErrorMessage: true,
    dataInvalidMessage: true,
    dataEmptyMessage: true,
    typeNotSupportedMessage: true,
    loadMessage: true,
    renderErrorMessage: true,
    containerBackgroundColor: true,
    containerBackgroundOpacity: true,
    containerClassName: true,
    baseChartMessageImageHAlign: true,
    baseChartMessageImageVAlign: true,
    baseChartMessageImageAlpha: true,
    baseChartMessageImageScale: true,
    typeNotSupportedMessageImageHAlign: true,
    typeNotSupportedMessageImageVAlign: true,
    typeNotSupportedMessageImageAlpha: true,
    typeNotSupportedMessageImageScale: true,
    dataLoadErrorMessageImageHAlign: true,
    dataLoadErrorMessageImageVAlign: true,
    dataLoadErrorMessageImageAlpha: true,
    dataLoadErrorMessageImageScale: true,
    dataLoadStartMessageImageHAlign: true,
    dataLoadStartMessageImageVAlign: true,
    dataLoadStartMessageImageAlpha: true,
    dataLoadStartMessageImageScale: true,
    dataInvalidMessageImageHAlign: true,
    dataInvalidMessageImageVAlign: true,
    dataInvalidMessageImageAlpha: true,
    dataInvalidMessageImageScale: true,
    dataEmptyMessageImageHAlign: true,
    dataEmptyMessageImageVAlign: true,
    dataEmptyMessageImageAlpha: true,
    dataEmptyMessageImageScale: true,
    renderErrorMessageImageHAlign: true,
    renderErrorMessageImageVAlign: true,
    renderErrorMessageImageAlpha: true,
    renderErrorMessageImageScale: true,
    loadMessageImageHAlign: true,
    loadMessageImageVAlign: true,
    loadMessageImageAlpha: true,
    loadMessageImageScale: true,
    chartConfig: true
  };

  constructor(
    public element: ElementRef,
    public fusionchartsService: FusionChartsService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.placeholder = this.placeholder || 'FusionCharts will render here';
  }

  ngOnChanges(changes: any) {
    if(changes.width) this.updateWidth();
    if(changes.height) this.updateHeight();
    if(changes.type) this.updateType();
    if(changes.dataSource) this.updateChartData();
  }

  updateChartData() {
    const dataFormat = this.configObj?.dataFormat || 'json';
    this.chartObj?.setChartData(this.dataSource, dataFormat);
  }

  updateWidth() {
    this.chartObj?.resizeTo({
      w: this.width
    });
  }

  updateHeight() {
    this.chartObj?.resizeTo({
      h: this.height
    });
  }

  updateType() {
    this.chartObj?.chartType(this.type);
  }

  generateEventsCallback(eventList: Array<string>) {
    const events = {} as any;
    eventList.forEach(eventName => {
      events[eventName] = (eventObj: any, dataObj: any) => {
        const fEventObj: FusionChartsEvent = { eventObj: {}, dataObj: {} };
        if (eventObj) fEventObj.eventObj = eventObj;
        if (dataObj) fEventObj.dataObj = dataObj;
        this[eventName as keyof FusionChartsDirective].emit(fEventObj);
      };
    });
    return events;
  }

  // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
  ngAfterViewInit() {
    const configObj = this.configObj || (this.configObj = {});

    for (const i of Object.keys(this.constructerParams)) {
      const value = this[i as keyof FusionChartsDirective];
      if (value) {
        configObj[i] = value;
      }
    }

    if (configObj['type']) {
      const events = this.generateEventsCallback(this.eventList);
      if (!configObj['events']) {
        configObj['events'] = events;
      } else {
        configObj['events'] = Object.assign(events, configObj['events']);
      }

      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.chartObj = FusionChartsConstructor(
            this.fusionchartsService,
            configObj
          );
          this.initialized.emit({ chart: this.chartObj });
          this.chartObj.render(this.element.nativeElement);
        }, 1);
      });
    }
  }

  ngOnDestroy() {
    this.chartObj?.dispose();
  }
}

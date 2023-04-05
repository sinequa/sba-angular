import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { TooltipComponent } from "@sinequa/components/utils";
import { Action } from "@sinequa/components/action";
import { Preview } from "../preview.component";
import { PreviewFrameService } from "../preview-frames.service";
import { Subscription } from "rxjs";

interface EntityHoverEvent {id: string, position: DOMRect};
interface TextSelectionEvent {selectedText: string, position: DOMRect};

export interface PreviewEntityOccurrence {
  id: string;
  type: string;
  index: number;
  count: number;
  value: string;
  label: string;
  display: string;
  position: DOMRect;
}

@Component({
  selector: 'sq-preview-tooltip',
  templateUrl: './preview-tooltip.component.html'
})
export class PreviewTooltipComponent implements OnInit, OnDestroy {
  /** Actions to display above a hovered entity */
  @Input() entityActions?: Action[];

  /** Actions to display above a selected text */
  @Input() textActions?: Action[];

  entityNavActions: Action[];

  @ViewChild(TemplateRef) tooltipTpl: TemplateRef<any>;

  entity?: PreviewEntityOccurrence;
  text?: string;

  placement: ConnectedPosition = {
    originX: "center",
    originY: "top",
    overlayX: "center",
    overlayY: "bottom",
    offsetY: -2
  }

  overlayRef?: OverlayRef;

  sub: Subscription;

  constructor(
    public overlayPositionBuilder: OverlayPositionBuilder,
    public overlay: Overlay,
    public previewFrames: PreviewFrameService,
    public preview: Preview
  ) {}

  ngOnInit(): void {
    this.sub = this.preview.ready.subscribe(() => {
      this.initTooltip(this.preview?.url!);
    });
  }

  ngOnDestroy(): void {
    this.detach();
    this.sub.unsubscribe();
  }

  showTooltip(position: DOMRect) {
    this.detach();

    if(!this.preview) {
      return;
    }

    const preview = this.preview.el.nativeElement.getBoundingClientRect();
    const y = preview.y + position.y * this.preview.scale;
    const x = preview.x + position.x * this.preview.scale;
    const width = position.width * this.preview.scale;
    const height = position.height * this.preview.scale;

    // set the tooltip's position strategy
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo({x, y, width, height})
      .withPositions([this.placement]);

    const scrollStrategy = this.overlay.scrollStrategies.close();
    this.overlayRef = this.overlay.create({positionStrategy, scrollStrategy});

    const tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
    tooltipRef.instance.template = this.tooltipTpl;
  }


  detach() {
    this.overlayRef?.detach();
  }


  // Tooltip management

  /**
   * Subscribe to the preview events needed to display or hide the tooltip.
   * The subscription is needed for a given preview URL
   */
  initTooltip(url: string) {
    this.previewFrames.subscribe<EntityHoverEvent|undefined>(url, 'highlight-hover',
      (event) => this.onHighlightHover(event)
    );
    this.previewFrames.subscribe<TextSelectionEvent|undefined>(url, 'text-selection',
      (event) => this.onTextSelection(event)
    );
    this.previewFrames.subscribe<{x: number, y: number}>(url, 'scroll',
      (event) => this.onScroll(event)
    );
  }

  tooltipTimeout?: NodeJS.Timeout;

  onHighlightHover(event: EntityHoverEvent|undefined) {
    if(event) {
      this.cancelHideTooltip();
      this.showEntityTooltip(event);
    }
    else {
      this.initHideTooltip();
    }
  }

  onTextSelection(event: TextSelectionEvent|undefined) {
    if(event && this.textActions) {
      this.cancelHideTooltip();
      this.showTextTooltip(event);
    }
    else {
      this.hideTooltip();
    }
  }

  showEntityTooltip(event: EntityHoverEvent) {
    if(this.preview?.data) {
      const i = event.id.lastIndexOf('_');
      const type = event.id.substring(0, i);
      // TODO Refactor this mess with better data structures from new web service
      const positionInCategories = +event.id.substring(i+1);
      const location = (this.preview?.data.highlightsPerLocation as any).find(value => value.positionInCategories[type] === positionInCategories);
      const display = location.displayValue;
      const category = this.preview?.data.highlightsPerCategory[type];
      const entity = category.values.find(v => location.values.includes(v.value));
      const occurrences = entity?.locations;
      const count = occurrences?.length || 0;
      const index = occurrences?.findIndex(o => o.start === location.start) || 0;
      const value = entity?.value;
      const label = category.categoryDisplayLabel;
      if(value) {
        this.text = undefined;
        this.entity = {...event, type, index, count, value, display, label};
        this.entityActions?.forEach(action => action.data = entity);
        this.entityNavActions = [
          new Action({
            icon: 'fas fa-chevron-left',
            disabled: this.entity.index === 0,
            action: () => this.preview?.selectEntity({...this.entity!, index: this.entity!.index-1})
          }),
          new Action({
            icon: 'fas fa-chevron-right',
            disabled: this.entity.index === this.entity.count-1,
            action: () => this.preview?.selectEntity({...this.entity!, index: this.entity!.index+1})
          })
        ];
        this.showTooltip(event.position);
      }
    }
  }

  showTextTooltip(event: TextSelectionEvent) {
    this.entity = undefined;
    this.textActions?.forEach(action => action.data = event.selectedText);
    this.text = event.selectedText;
    this.showTooltip(event.position);
  }

  initHideTooltip() {
    this.tooltipTimeout = setTimeout(() => this.hideTooltip(), 200);
  }

  hideTooltip() {
    this.detach();
    this.cancelHideTooltip();
  }

  cancelHideTooltip() {
    if(this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      delete this.tooltipTimeout;
    }
  }

  onScroll(event: {x: number, y: number}) {
    this.hideTooltip();
  }

}

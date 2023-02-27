import { ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, Output, TemplateRef, ViewChild } from "@angular/core";
import { TooltipComponent } from "@sinequa/components/utils";
import { Action } from "@sinequa/components/action";

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
  template: `
  <ng-template>

    <div *ngIf="entity"
      class="d-flex align-items-center"
      (mouseenter)="preventHide.emit()"
      (mouseleave)="resumeHide.emit()">
      <span class="text-truncate">
        <b>{{entity.display}}</b> ({{entity.label | sqMessage}})
      </span>
      <span class="ms-1 text-nowrap"> {{entity.index+1}} / {{entity.count}}</span>
      <div class="btn-group btn-group-sm ms-3" [sq-action-buttons]="{items: entityNavActions, style:'secondary'}"></div>
      <div class="btn-group btn-group-sm ms-2" [sq-action-buttons]="{items: actions, style:'secondary'}" *ngIf="actions"></div>
    </div>

    <div *ngIf="text && actions">
      <div class="btn-group btn-group-sm" [sq-action-buttons]="{items: actions, style:'secondary'}"></div>
    </div>

  </ng-template>
  `,
  styles: [`
  :host {
    position: absolute;
    display: block;
    pointer-events: none;
  }
  `]
})
export class PreviewTooltipComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() position: DOMRect;
  @Input() entity?: PreviewEntityOccurrence;
  @Input() text?: string;

  @Input() scale: number;

  @Input() placement: ConnectedPosition = {
    originX: "center",
    originY: "top",
    overlayX: "center",
    overlayY: "bottom",
    offsetY: -2
  }

  @Input() actions?: Action[];

  @Output() preventHide = new EventEmitter();
  @Output() resumeHide = new EventEmitter();
  @Output() selectEntity = new EventEmitter<PreviewEntityOccurrence>();

  @ViewChild(TemplateRef) tooltipTpl: TemplateRef<any>;

  @HostBinding('style.top.px') top: number;
  @HostBinding('style.left.px') left: number;
  @HostBinding('style.width.px') width: number;
  @HostBinding('style.height.px') height: number;

  overlayRef?: OverlayRef;

  entityNavActions: Action[];

  constructor(
    public el: ElementRef,
    public overlayPositionBuilder: OverlayPositionBuilder,
    public overlay: Overlay
  ) {}

  ngOnChanges() {
    this.detach();

    if(this.entity) {
      this.entityNavActions = [
        new Action({
          icon: 'fas fa-chevron-left',
          disabled: this.entity.index === 0,
          action: () => this.selectEntity.emit({...this.entity!, index: this.entity!.index-1})
        }),
        new Action({
          icon: 'fas fa-chevron-right',
          disabled: this.entity.index === this.entity.count-1,
          action: () => this.selectEntity.emit({...this.entity!, index: this.entity!.index+1})
        })
      ]
    }

    this.top = this.position.y * this.scale;
    this.left = this.position.x * this.scale;
    this.width = this.position.width * this.scale;
    this.height = this.position.height * this.scale;


    // set the tooltip's position strategy
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.el)
      .withPositions([this.placement]);

    const scrollStrategy = this.overlay.scrollStrategies.close();
    this.overlayRef = this.overlay.create({positionStrategy, scrollStrategy});

    this.attach();
  }

  ngAfterViewInit(): void {
    this.attach();
  }

  ngOnDestroy(): void {
    this.detach();
  }

  attach() {
    // instance of the tooltip's component
    if(this.overlayRef && this.tooltipTpl) {
      const tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
      tooltipRef.instance.template = this.tooltipTpl;
    }
  }

  detach() {
    this.overlayRef?.detach();
  }

}

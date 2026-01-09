import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { Action, BsDropdownService, DropdownActiveEvent } from "@sinequa/components/action";
import { BsFacetModule } from "@sinequa/components/facet";
import { UIService } from "@sinequa/components/utils";
import { IntlService } from "@sinequa/core/intl";
import { ModalResult, ModalService, PromptOptions } from "@sinequa/core/modal";
import { Draggable, GridsterComponent, GridsterConfig, GridsterItem, GridsterModule, Resizable } from "angular-gridster2";
import { filter, merge, Subscription } from "rxjs";
import { Widget } from "./widget.model";

@Component({
    selector: 'sq-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [CommonModule, GridsterModule, BsFacetModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnChanges, OnInit, OnDestroy {
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  @ViewChild(GridsterComponent) gridster: GridsterComponent;

  @Input() dashboard: Widget[];

  /**
   * Custom options for the Gridster component
   */
  @Input() gridsterOptions?: GridsterConfig;

  /**
   * Offset removed from the widget's horizontal space.
   */
  @Input() horizontalPadding = 0;

  /**
   * Offset removed from the widget's vertical space
   */
  @Input() verticalPadding = 0;

  /**
   * Padding applied to the gridster element and space between widgets
   */
  @Input() padding = 10;

  /**
   * Offset removed from window.innerHeight to compute the height of the
   * dashboard.
   */
   @Input() windowPadding = 0;

  /**
   * Standard number of rows in the dashboard
   */
  @Input() minRows = 4;

  /**
   * Standard number of columns in the dashboard
   */
  @Input() minCols = 4;

  @Input()
  draggable: Draggable = {
    enabled: true,
    ignoreContent: true, // By default, dragging is impossible
    dragHandleClass: 'card-header', // except in the facet header
    ignoreContentClass: 'btn-group', // *except* in the button group
  };

  @Input()
  resizable: Resizable = {
    enabled: true
  };


  @Output() created = new EventEmitter<Widget[]>();
  @Output() added = new EventEmitter<Widget>();
  @Output() removed = new EventEmitter<Widget>();
  @Output() updated = new EventEmitter<Widget>();
  @Output() moved = new EventEmitter<Widget>();
  @Output() resized = new EventEmitter<Widget>();
  @Output() renamed = new EventEmitter<Widget>();
  @Output() maximized = new EventEmitter<Widget>();

  @Output() changed = new EventEmitter<Widget[]>();

  options: GridsterConfig = {
    itemChangeCallback: (item, itemComponent) => {
      const widget = this.dashboard.find(w => w.state === item);
      this.moved.emit(widget);
    },
    itemResizeCallback: (item, itemComponent) => {
      const widget = this.dashboard.find(w => w.state === item);
      if (widget) {
        widget.height = itemComponent.height - this.verticalPadding;
        widget.width = itemComponent.width - this.horizontalPadding;
        this.resized.emit(widget);
      }
    },
    swap: true,
    scrollToNewItems: true, // Scroll to new items when inserted
    gridType: 'verticalFixed', // The grid has a fixed size vertically, and fits the screen horizontally
  };

  focusedWidget?: Widget;
  subscription: Subscription;

  constructor(
    public dropdownService: BsDropdownService,
    public modalService: ModalService,
    public intlService: IntlService,
    public ui: UIService,
    public cdRef: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.gridsterOptions && this.gridsterOptions) {
      this.options = { ...this.options, ...this.gridsterOptions };
    }
    if (changes.padding || !this.options.margin) {
      this.options.margin = this.padding;
    }
    if (changes.minCols || !this.options.minCols) {
      this.options.minCols = this.minCols;
    }
    if (changes.minRows || !this.options.minRows) {
      this.options.minRows = this.minRows;
    }
    if (changes.windowPadding || !this.options.fixedRowHeight) {
      this.options.fixedRowHeight = (window.innerHeight - this.windowPadding - 2 * this.options.margin) / this.options.minRows!; // 150px to account for header and margins
    }
    if (changes.draggable || !this.options.draggable) {
      this.options.draggable = this.draggable;
    }
    if (changes.resizable || !this.options.resizable) {
      this.options.resizable = this.resizable;
    }
    if (changes.dashboard) {
      this.dashboard.forEach(item => this.createActions(item));
      this.created.emit(this.dashboard);
    }
  }

  ngOnInit(): void {
    // listen only on dropdown active event
    // this allow us to display dropdown menu on top of the gridster
    this.subscription = this.dropdownService.events
      .pipe(
        filter(() => this.gridster !== undefined),
        filter((event) => event.type === "active")
      )
      .subscribe(event => {
        // when dropdown is active, disable gridster's overflow
        // with this, menu will be displayed on top of the gridster
        if ((event as DropdownActiveEvent).value && this.gridster.el.style.overflow !== "initial") {
          this.gridster.el.style.top = -this.gridster.el.scrollTop + "px";
          this.gridster.el.style.overflow = "initial";
        } else {
          this.gridster.el.style.overflow = "";
          this.gridster.el.style.top = "";
        }
      });

    // When the screen is resized, we resize the dashboard row height, so that items keep fitting the screen height
    this.subscription.add(this.ui.resizeEvent.subscribe(() => {
      this.options.fixedRowHeight = (window.innerHeight - this.windowPadding - 2 * this.options.margin!) / this.options.minRows!;
      this.options.api?.optionsChanged?.();
    }));

    this.subscription.add(
      merge(this.created, this.added, this.removed, this.updated, this.moved, this.renamed).subscribe(() => {
        this.changed.emit(this.dashboard);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  createActions(widget: Widget) {
    widget.actions = [];
    if (widget.renamable) {
      widget.actions.push(new Action({
        icon: "far fa-edit",
        title: "msg#dashboard.renameWidgetTitle",
        action: () => this.rename(widget.state)
      }));
    }
    if (widget.maximizable) {
      widget.actions.push(new Action({
        icon: "fas fa-expand-alt",
        title: "msg#dashboard.maximizeTitle",
        action: action => this.toggleMinimize(action, widget.state)
      }));
    }
    if (widget.removable) {
      widget.actions.push(new Action({
        icon: "fas fa-times",
        title: "msg#dashboard.widgetClose",
        action: () => this.remove(widget.state)
      }));
    }
  }

  toggleMinimize(action: Action, item: GridsterItem) {
    const widget = this.dashboard.find(w => w.state === item);
    if (widget) {
      widget.maximized = !widget.maximized;
      if (widget.maximized) {
        widget.stateMinimized = {
          width: widget.width!,
          height: widget.height!,
          top: this.gridster.el.scrollTop
        };
        widget.width = this.gridster.el.offsetWidth - (this.options.outerMarginLeft || this.options.margin)! - (this.options.outerMarginRight || this.options.margin)! - this.horizontalPadding;
        widget.height = this.gridster.el.offsetHeight - 2 * this.options.margin! - this.verticalPadding;
        this.options.resizable = { enabled: false };
        this.options.draggable = { enabled: false };
        this.gridster.el.scroll({ top: 0, left: 0, behavior: 'auto' });
      }
      else {
        widget.width = widget.stateMinimized?.width;
        widget.height = widget.stateMinimized?.height;
        this.options.resizable = this.resizable;
        this.options.draggable = this.draggable;
        this.gridster.el.scroll({ top: widget.stateMinimized?.top, left: 0, behavior: 'auto' });
      }
      this.options.api?.optionsChanged?.();
      action.icon = widget.maximized ? "fas fa-compress-alt" : "fas fa-expand-alt";
      action.title = widget.maximized ? "msg#dashboard.minimizeTitle" : "msg#dashboard.maximizeTitle";
      // Disable maximize action for all other widgets
      this.dashboard.flatMap(w => w.actions)
                    .filter(ac => ac && ac.title === 'msg#dashboard.maximizeTitle')
                    .forEach(ac => ac!.disabled = widget.maximized)
      this.maximized.emit(widget);
    }
  }

  add(widget: Widget) {
    this.createActions(widget);
    this.dashboard.push(widget);
    this.added.emit(widget);
    this.cdRef.detectChanges();
  }

  update(widget: Widget, state: any) {
    Object.assign(widget.state, state);
    this.updated.emit(widget);
  }

  rename(item: GridsterItem) {
    const model: PromptOptions = {
      title: 'msg#dashboard.renameWidget',
      message: 'msg#dashboard.renameWidgetMessage',
      buttons: [],
      output: this.intlService.formatMessage(item.title),
      validators: [Validators.required]
    };

    this.modalService.prompt(model).then(res => {
      if (res === ModalResult.OK) {
        item.title = model.output;
        const widget = this.dashboard.find(w => w.state === item);
        this.renamed.emit(widget);
        this.cdRef.detectChanges();
      }
    });
  }

  remove(item: GridsterItem) {
    const i = this.dashboard.findIndex(w => w.state === item);
    if (i !== -1) {
      const widget = this.dashboard[i]
      if (widget.maximized) {
        const maximizeAction = widget.actions!.find(ac => ac && ac.title === 'msg#dashboard.minimizeTitle');
        this.toggleMinimize(maximizeAction!, item);
      }
      this.dashboard.splice(i, 1);
      this.removed.emit(widget);
    }
  }

  resize() {
    this.gridster.onResize();
  }

}

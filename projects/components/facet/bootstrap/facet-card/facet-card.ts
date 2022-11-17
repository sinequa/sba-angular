import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ContentChild, HostBinding, AfterContentInit, HostListener, ContentChildren, QueryList, TemplateRef, DoCheck, OnChanges } from "@angular/core";
import { delay, Subscription } from "rxjs";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "../../abstract-facet";
import { FacetViewDirective } from "../facet-view.directive";

@Component({
    selector: "sq-facet-card",
    templateUrl: "./facet-card.html",
    styles: [`
.cursor-default {cursor: default;}
    `]
})
export class BsFacetCard implements OnInit, OnChanges, OnDestroy, DoCheck, AfterContentInit {

    /**
     * Title of this facet (optional)
     */
    @Input() title: string;

    /**
     * Tooltip of this facet (defaults to title)
     */
    @Input() tooltip: string;

    /**
     * Icon of this facet, in a form of a span class name (optional)
     */
    @Input() icon: string;

    /**
     * List of custom actions for this facet (optional)
     */
    @Input() actions: Action[] = [];

    /**
     * List of secondary actions
     */
    @Input() secondaryActions: Action[] = [];

    /**
     * Whether the [actions]="..." passed by binding should be displayed before or after
     * the actions from the inner facet component
     */
    @Input() actionsFirst = true;

    /**
     * Whether the actions from the inner facet components are to be treated as secondary
     */
    @Input() facetActionsAreSecondary = false;

    /**
     * Whether the actions for switching between views are to be treated as secondary
     */
    @Input() viewActionsAreSecondary = false;

    /**
     * Bootstrap theme name (light, dark...)
     */
    @Input() buttonsStyle?: string;
    @Input() viewButtonsStyle?: string;
    @Input() secondaryButtonsStyle?: string;

    /**
     * Size of the custom actions
     */
    @Input() actionsSize = "sm";
    @Input() viewActionsSize?: string;
    @Input() secondaryActionsSize: string;

    /**
     * Class applied to the button groups
     */
    @Input() actionsClass?: string = "btn-group";
    @Input() viewActionsClass?: string = "btn-group";
    @Input() secondaryActionsClass?: string = "btn-group float-end";

    /**
     * Whether the facet can be collapsed (default: true)
     */
    @Input() collapsible: boolean = true;

    /**
     * Whether the facet starts collapsed (if collapsible / default: false)
     */
    @Input() startCollapsed: boolean = false;

    /**
     * Whether other actions should be hidden when the facet is collapsed (default: true)
     */
    @Input() hideActionsCollapsed: boolean = true;

    /**
     * Whether the facet can be expanded (default: false)
     */
    @Input() expandable: boolean = false;

    /**
     * Whether the facet starts expanded (if expandable / default: false)
     */
    @Input() startExpanded: boolean = false;

    /**
     * Facet will collapse automatically once clicking outside of it
     */
    @Input() collapseOnClickOutside: boolean = false;

    /**
     * Whether the facet starts with opened settings (default: false)
     */
    @Input() startSettingsOpened: boolean = false;

    /**
     * Event triggered when the facet gets expanded or reduced
     */
    @Output() facetExpanded = new EventEmitter<"expanded" | "reduced">();

    /**
     * Event triggered when the facet gets expanded or reduced
     */
    @Output() facetCollapsed = new EventEmitter<"collapsed" | "expanded">();

    /**
     * Event triggered when the facet gets expanded or reduced
     */
    @Output() settingsOpened = new EventEmitter<"opened" | "saved" | "canceled">();

    /**
     * Reference to the child facet inserted by transclusion (ng-content)
     */
    @ContentChildren("facet")
    facetQuery: QueryList<AbstractFacet>;

    @ContentChildren(FacetViewDirective)
    views: QueryList<FacetViewDirective>;

    view: FacetViewDirective;
    viewActions: Action[];

    @ContentChild("headerTpl") headerTpl?: TemplateRef<any>;
    @ContentChild("subHeaderTpl") subHeaderTpl?: TemplateRef<any>;
    @ContentChild("footerTpl") footerTpl: TemplateRef<any>;
    @ContentChild("settingsTpl") settingsTpl: TemplateRef<any>;

    /**
     * Concluded reference to child facet inserted by transclusion AND which its content is also loaded by transclusion
     */
    public _facetComponent: AbstractFacet | undefined;

    @HostBinding('class.collapsed') _collapsed: boolean;
    @HostBinding('class.expanded') _expanded: boolean;
    @HostBinding('class.settings-opened') _settingsOpened: boolean;

    @HostBinding('hidden') get hidden(): boolean {
        return !!this.facetComponent?.isHidden?.()
    }

    allActions: Action[] = [];
    allSecondaryActions: Action[] = [];

    public readonly collapseAction;
    public readonly expandAction;
    public readonly settingsAction;

    private subs = new Subscription();

    constructor() {

        this.collapseAction = new Action({
            action: (action, event) => {
                // stop propagation to avoid the click outside event to be triggered
                event.stopPropagation();
                this._collapsed = !this._collapsed;
                this.facetCollapsed.next(this._collapsed ? "collapsed" : "expanded");
                if (!!this.facetComponent) {
                    this.facetComponent.onCollapse(this._collapsed);
                }
                action.update();
            },
            updater: (action) => {
                action.icon = this._collapsed ? "fas fa-chevron-down" : "fas fa-chevron-up";
                action.title = this._collapsed ? 'msg#facetCard.expand' : 'msg#facetCard.collapse';
            }
        });

        this.expandAction = new Action({
            action: (action) => {
                this._expanded = !this._expanded;
                this.facetExpanded.next(this._expanded ? "expanded" : "reduced");
                if (!!this.facetComponent) {
                    this.facetComponent.onExpand(this._expanded);
                }
                action.update();
            },
            updater: (action) => {
                action.icon = this._expanded ? "fas fa-compress" : "fas fa-expand";
                action.title = this._expanded ? "msg#facetCard.reduce" : "msg#facetCard.enlarge";
            }
        });

        this.settingsAction = new Action({
            action: (action) => {
                this._settingsOpened = !this._settingsOpened;
                this.settingsOpened.next(this._settingsOpened ? "opened" : "saved");
                this.facetComponent?.onOpenSettings(this._settingsOpened);
                action.update();
            },
            updater: (action) => {
                action.icon = this._settingsOpened ? "far fa-save" : "fas fa-cog";
                action.title = this._settingsOpened ? "msg#facetCard.saveSettings" : "msg#facetCard.openSettings";
            }
        });

    }

    ngOnInit() {
        // Initialize actions
        this._collapsed = this.startCollapsed;
        this._expanded = this.startExpanded;
        this._settingsOpened = this.startSettingsOpened;

        this.collapseAction.update();
        this.expandAction.update();
        this.settingsAction.update();

        this.updateActions(); // Note that OnInit is called AFTER the 1st OnChanges
    }

    ngOnChanges(): void {
        // Most Input() of this component potentially have an effect on the actions
        this.updateActions();
    }

    // In ngAfterContentInit we have access to the facet content (facet component or views, depending on how the facet-card is used)
    ngAfterContentInit() {
        this.updateFacetComponent();
        if (this.facetComponent) { // A facet component is directly passed to the facet
            this.subs.add(
                this.facetComponent.actionsChanged.subscribe((actions) => {
                    this.updateActions();
                    this.allActions.forEach(action => action.update());
                })
            );
        }
        else if (this.views.length) { // A list of views (containing facet components) is passed to the facet
            this.updateViews();
        }
        else {
            console.warn("No #facet component (or no view) is defined in this facet card: ", this.title);
        }

        // Catch the #facet component changes (which happens when we switch views)
        this.subs.add(
            this.facetQuery.changes.pipe(delay(0))
                .subscribe(() => this.updateFacetComponent())
        );

        // Catch a change in the list of views
        this.subs.add(
            this.views.changes
                .subscribe(() => this.updateViews())
        );
    }

    ngDoCheck(): void {
        if (this.actionsChanged()) {
            this.updateActions();
        }
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    updateFacetComponent() {
        this.facetComponent = this.facetQuery.first;
        this.updateActions();
    }

    public get facetComponent(): AbstractFacet | undefined {
        return this._facetComponent;
    }

    public set facetComponent(facet: AbstractFacet | undefined) {
        this._facetComponent = facet || this._facetComponent; // Allows overriding ContentChild (to avoid undefined facet)
    }

    updateViews() {
        this.viewActions = this.views.map(view => new Action({
            ...view.viewOptions,
            action: (action, event) => {
                view.viewOptions?.action?.(action, event); // If any, execute the view's action function
                this.setView(view)
            },
            selected: view === this.view,
            data: view
        }));
        // If the view is unset, or if the previously selected view is not found in the new list, set the default view
        if (!this.view || !this.views.find(v => v === this.view)) {
            const defaultView = this.views.find(v => !!v.default) || this.views.first;
            this.setView(defaultView); // Select the first view by default
        }
        if(!this.viewActionsAreSecondary) {
            this.updateActions(); // Refresh the actions if they include the view actions
        }
    }

    setView(view: FacetViewDirective) {
        this.view = view;
        this._facetComponent = undefined; // The _facetComponent must be set by the view, triggering a facetQuery change
        this.viewActions.forEach(a => a.selected = a.data === view);
    }

    setViewById(id: string) {
        const view = this.views.find(view => view.id === id);
        if (view) {
            this.setView(view);
        }
    }

    updateActions() {
        this.allActions = this.getActions();
        this.allSecondaryActions = this.getSecondaryActions();
    }

    public getActions(): Action[] {
        if (this.hideActions) return [this.collapseAction]; // Hide other actions if collapsed
        const actions = [] as Action[];
        if (this.actionsFirst) {
            actions.push(...this.actions);
        }
        if (!this.viewActionsAreSecondary && this.viewActions?.length > 1) {
            actions.push(...this.viewActions);
        }
        if (this.facetComponent && !this.facetActionsAreSecondary) actions.push(...this.facetComponent.actions);
        if (this.settingsTpl || (this.facetComponent?.settingsTpl && !this.facetActionsAreSecondary)) actions.push(this.settingsAction);
        if (this.expandable) actions.push(this.expandAction);
        if (this.collapsible) actions.push(this.collapseAction);
        if (!this.actionsFirst) {
            actions.push(...this.actions);
        }
        return actions;
    }

    public getSecondaryActions(): Action[] {
        if (this.hideActions) return [];
        const actions = [] as Action[];
        if (this.actionsFirst) {
            actions.push(...this.secondaryActions);
        }
        if (this.facetComponent && this.facetActionsAreSecondary) {
            actions.push(...this.facetComponent.actions);
            if(this.facetComponent.settingsTpl) actions.push(this.settingsAction);
        }
        if (!this.actionsFirst) {
            actions.push(...this.secondaryActions);
        }
        return actions;
    }

    // Manual change detection, to avoid constantly triggering refreshes of the actions
    _oldActions: Action[] | undefined;
    protected actionsChanged(): boolean {
        const actions = this.facetComponent?.actions;
        if (actions?.length !== this._oldActions?.length) {
            return true;
        }
        else if (actions && this._oldActions) {
            for (let i = 0; i < actions.length; i++) {
                if (actions[i] !== this._oldActions[i]) {
                    return true;
                }
            }
        }
        this._oldActions = actions;
        return false;
    }

    public get hideActions() {
        return this.hideActionsCollapsed && this._collapsed;
    }

    @HostListener('window:click', ['$event'])
    clickOut() {
        if (this.collapseOnClickOutside) {
            this._collapsed = true;
            this.collapseAction.update();
            this.expandAction.update();
            this.settingsAction.update();
        }
    }
}

import {Component, Input, Output, OnInit, OnDestroy, EventEmitter, ContentChild, HostBinding, AfterContentInit, ChangeDetectorRef, HostListener, ContentChildren, QueryList, TemplateRef} from "@angular/core";
import {Subscription} from "rxjs";
import {Action} from "@sinequa/components/action";
import {AbstractFacet} from "../../abstract-facet";
import {FacetViewDirective} from "../facet-view.directive";

@Component({
    selector: "sq-facet-card",
    templateUrl: "./facet-card.html",
    styles: [`
        .cursor-default {cursor: default;}
    `]
})
export class BsFacetCard implements OnInit, OnDestroy, AfterContentInit {

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
    @Output() facetExpanded = new EventEmitter<"expanded"|"reduced">();

    /**
     * Event triggered when the facet gets expanded or reduced
     */
    @Output() facetCollapsed = new EventEmitter<"collapsed"|"expanded">();

    /**
     * Event triggered when the facet gets expanded or reduced
     */
    @Output() settingsOpened = new EventEmitter<"opened"|"saved"|"canceled">();

    /**
     * Reference to the child facet inserted by transclusion (ng-content)
     */
    @ContentChild("facet", {static: false})
    public set facetComponent(facet: AbstractFacet | undefined){
        this._facetComponent = facet || this._facetComponent; // Allows overriding ContentChild (to avoid undefined facet)
    }

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

    public readonly collapseAction;
    public readonly expandAction;
    public readonly settingsAction;

    private actionChangedSubscription: Subscription;

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ){

        this.collapseAction = new Action({
            action: (action, event) => {
                // stop propagation to avoid the click outside event to be triggered
                event.stopPropagation();
                this._collapsed = !this._collapsed;
                this.facetCollapsed.next(this._collapsed ? "collapsed" : "expanded");
                if(!!this.facetComponent){
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
                if(!!this.facetComponent){
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
                this.settingsOpened.next(this._settingsOpened? "opened" : "saved");
                this.facetComponent?.onOpenSettings(this._settingsOpened);
                action.update();
            },
            updater: (action) => {
                action.icon = this._settingsOpened ? "far fa-save" : "fas fa-cog";
                action.title = this._settingsOpened ? "msg#facetCard.saveSettings" : "msg#facetCard.openSettings";
            }
        });

    }

    ngOnInit(){
        // Initialize actions
        this._collapsed = this.startCollapsed;
        this._expanded = this.startExpanded;
        this._settingsOpened = this.startSettingsOpened;

        this.collapseAction.update();
        this.expandAction.update();
        this.settingsAction.update();
    }

    ngAfterContentInit(){
        if(this.facetComponent) {
            this.actionChangedSubscription = this.facetComponent.actionsChanged.subscribe((actions) => {
                this.allActions.forEach(action => action.update());
                this.changeDetectorRef.markForCheck();
            });
        }
        else if(this.views.length) {
            this.viewActions = this.views.map(view => new Action({
                ...view.viewOptions,
                action: (action, event) => {
                    view.viewOptions?.action?.(action, event); // If any, execute the view's action function
                    this.setView(view)
                },
                data: view
            }));
            const defaultView = this.views.find(v => !!v.default) || this.views.first;
            this.setView(defaultView); // Select the first view by default
        }
        else {
            console.warn("No #facet component is defined in this facet card: ", this.title);
        }
    }

    setView(view: FacetViewDirective) {
        this.view = view;
        this._facetComponent = view.facet;
        this.viewActions.forEach(a => a.selected = a.data === view);
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(){
        if(this.actionChangedSubscription){
            this.actionChangedSubscription.unsubscribe();
        }
    }

    public get facetComponent(): AbstractFacet | undefined {
        return this._facetComponent;
    }

    public get allActions() : Action[] {
        if(this.hideActions) return [this.collapseAction]; // Hide other actions if collapsed
        const  actions = [] as Action[];
        if(this.actionsFirst) {
            actions.push(...this.actions);
        }
        if(this.facetComponent && !this.facetActionsAreSecondary) actions.push(...this.facetComponent.actions);
        if(this.hasSettings) actions.push(this.settingsAction);
        if(this.expandable) actions.push(this.expandAction);
        if(this.collapsible) actions.push(this.collapseAction);
        if(!this.actionsFirst) {
            actions.push(...this.actions);
        }
        return actions;
    }

    public get allSecondaryActions() : Action[] {
        if(this.hideActions) return [];
        const  actions = [] as Action[];
        if(this.actionsFirst) {
            actions.push(...this.secondaryActions);
        }
        if(this.facetComponent && this.facetActionsAreSecondary) actions.push(...this.facetComponent.actions);
        if(!this.actionsFirst) {
            actions.push(...this.secondaryActions);
        }
        return actions;
    }

    public get hideActions() {
        return this.hideActionsCollapsed && this._collapsed;
    }

    public get hasSettings() {
        return this.facetComponent?.settingsTpl || this.settingsTpl;
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

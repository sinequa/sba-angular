import {Component, Input, Output, OnInit, OnDestroy, EventEmitter, ContentChild, HostBinding, AfterContentInit, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";
import {Action} from "@sinequa/components/action";
import {AbstractFacet} from "../../abstract-facet";

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
     * Bootstrap theme name (light, dark...)
     */
    @Input() buttonsStyle: string;

    /**
     * List of custom actions for this facet (optional)
     */
    @Input() actions: Action[] = [];

    /**
     * Whether the [actions]="..." passed by binding should be displayed before or after
     * the actions from the inner facet component
     */
    @Input() actionsFirst = true;

    /**
     * Size of the custom actions
     */
    @Input() actionsSize = "sm";

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
    @ContentChild("facet", {static: false}) public facetComponent: AbstractFacet;

    @HostBinding('class.collapsed') _collapsed: boolean;
    @HostBinding('class.expanded') _expanded: boolean;
    @HostBinding('class.settings-opened') _settingsOpened: boolean;

    @HostBinding('hidden') get hidden(): boolean {
        return !!this.facetComponent && !!this.facetComponent.isHidden && this.facetComponent.isHidden();
    }

    private readonly collapseAction;
    private readonly expandAction;
    private readonly settingsAction;

    private actionChangedSubscription: Subscription;

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ){

        this.collapseAction = new Action({
            action: (action) => {
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
                if(!!this.facetComponent){
                    this.facetComponent.onOpenSettings(this._settingsOpened);
                }
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
        else {
            console.warn("No #facet component is defined in this facet card: ", this.title);
        }
    }

    ngOnDestroy(){
        if(this.actionChangedSubscription){
            this.actionChangedSubscription.unsubscribe();
        }
    }

    public get allActions() : Action[] {
        if(this.hideActionsCollapsed && this._collapsed) return [this.collapseAction]; // Hide other actions if collapsed
        let actions = [] as Action[];
        if(this.actionsFirst) {
            actions.push(...this.actions);
        }
        if(this.facetComponent) actions = actions.concat(this.facetComponent.actions);
        if(this.hasSettings) actions.push(this.settingsAction);
        if(this.expandable) actions.push(this.expandAction);
        if(this.collapsible) actions.push(this.collapseAction);
        if(!this.actionsFirst) {
            actions.push(...this.actions);
        }
        return actions;
    }

    public get hasSettings(){
        return !!this.facetComponent && !!this.facetComponent.settingsTpl;
    }
}

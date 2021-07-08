import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { Router, NavigationEnd, UrlSerializer } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { Location } from '@angular/common';
import { Utils } from '@sinequa/core/base';
import { LoginService } from '@sinequa/core/login';
import { UserSettingsWebService } from '@sinequa/core/web-services';
import { ModalResult, ModalService, PromptOptions, ModalButton, ConfirmType } from '@sinequa/core/modal';
import { Action } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';
import { DashboardAddItemModel, DashboardAddItemComponent } from './dashboard-add-item.component';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { NotificationsService } from '@sinequa/core/notification';
import { Subject } from 'rxjs';
import { UserPreferences } from '@sinequa/components/user-settings';
import { IntlService } from '@sinequa/core/intl';

/**
 * Interface storing the configuration of a widget. It must contain the minimal amount of information
 * to rebuild the widget's content (eg. for the preview we need an id and a query).
 * This configuration is stored in user settings and/or shared with other users, so it must not include
 * large objects or raw data (only the means to rebuild these objects or data).
 * This interface is an extension of GridsterItem, so that we store things like the position of each
 * widget in the dashboard.
 */
export interface DashboardItem extends GridsterItem {
    type: string;
    icon: string;
    title: string;
    width?: number;
    height?: number;

    // Properties specific to some types
    recordId?: string; // For type === 'preview'
    queryStr?: string; // For type === 'preview'
    aggregation?: string; // For type === 'chart'
    chartType?: string; // For type === 'chart'
}

/**
 * A dashboard configuration interface incl. a name and the configuration of each widget
 */
export interface Dashboard {
    name: string;
    items: DashboardItem[];
}

/**
 * An interface to define a type of widget that can be added to the dashboard. This basic information
 * is used to create a button to select a type of widget among a list.
 */
export interface DashboardItemOption {
    type: string;
    icon: string;
    text: string;
    unique: boolean;
}

// Name of the "default dashboard" (displayed prior to any user customization)
export const defaultDashboardName = "<default>";

// List of widgets supported in this dashboard. They can be used:
// - to define the "default dashboard" (by calling setDefaultDashboard())
// - to create the "dashboard actions" (which include the possibility of adding new widgets to the dashboard)
export const MAP_WIDGET: DashboardItemOption = {type: 'map', icon: 'fas fa-globe-americas fa-fw', text: 'msg#dashboard.map', unique: true};
export const TIMELINE_WIDGET: DashboardItemOption = {type: 'timeline', icon: 'fas fa-chart-line fa-fw', text: 'msg#dashboard.timeline', unique: true};
export const NETWORK_WIDGET: DashboardItemOption = {type: 'network', icon: 'fas fa-project-diagram fa-fw', text: 'msg#dashboard.network', unique: true};
export const CHART_WIDGET: DashboardItemOption = {type: 'chart', icon: 'fas fa-chart-bar fa-fw', text: 'msg#dashboard.chart', unique: false};
export const HEATMAP_WIDGET: DashboardItemOption = {type: 'heatmap', icon: 'fas fa-th fa-fw', text: 'msg#dashboard.heatmap', unique: false};
export const TAGCLOUD_WIDGET: DashboardItemOption = {type: 'tagcloud', icon: 'fas fa-comments fa-fw', text: 'msg#dashboard.tagcloud', unique: true}
export const MONEYTIMELINE_WIDGET: DashboardItemOption = {type: 'money-timeline', icon: 'fas fa-search-dollar fa-fw', text: 'msg#money.timeline', unique: true}
export const MONEYCLOUD_WIDGET: DashboardItemOption = {type: 'money-cloud', icon: 'fas fa-comment-dollar fa-fw', text: 'msg#money.cloud', unique: true}
export const PREVIEW_WIDGET: DashboardItemOption = {type: 'preview', icon: 'far fa-file-alt', text: '', unique: false}


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    /** Currently active dashboard */
    dashboard: Dashboard;
    /** Default dashboard (active by default or if the user reinitializes the dashboard) */
    defaultDashboard: Dashboard;

    /** Options of the Gridster dashboard component*/
    options: GridsterConfig;

    /** Action objects part of the "dashboard actions" (returned by createDashboardActions()) */
    manualLayout: Action;
    autoLayout: Action;
    fixedLayout: Action;
    openAction: Action;
    autoSaveAction: Action;
    setDefaultAction: Action;

    /** A subject firing events when the dashboard changes */
    dashboardChanged = new Subject<Dashboard>();

    constructor(
        public modalService: ModalService,
        public userSettingsService: UserSettingsWebService,
        public loginService: LoginService,
        public prefs: UserPreferences,
        public searchService: SearchService,
        public notificationService: NotificationsService,
        public router: Router,
        public location: Location,
        public urlSerializer: UrlSerializer,
        public clipboard: Clipboard,
        public intlService: IntlService
    ) {

        // Default options of the Gridster dashboard
        this.options = {
            swap: true,
            draggable: {
                enabled: true,
                ignoreContent: true, // By default, dragging is impossible
                dragHandleClass: 'card-header', // except in the facet header
                ignoreContentClass: 'btn-group', // *except* in the button group
            },
            resizable: {enabled: true},
            itemChangeCallback: (item, itemComponent) => {
                this.notifyItemChange(item as DashboardItem);
            },
            itemResizeCallback: (item, itemComponent) => {
                if (!document.fullscreenElement) { // Exclude the change detection on switch from/to full-screen mode
                    /** Items must know their height/width to (re)size their content*/
                    if (!itemComponent.el.classList.contains('widget-maximized-view')) {
                        item.height = itemComponent.height;
                        item.width = itemComponent.width;
                    } else {
                        item.height = itemComponent.gridster.curHeight;
                        item.width = itemComponent.gridster.curWidth;
                    }
                    this.notifyItemChange(item as DashboardItem);
                }
            },
            scrollToNewItems: true, // Scroll to new items when inserted
            gridType: 'verticalFixed', // The grid has a fixed size vertically, and fits the screen horizontally
            fixedRowHeight: (window.innerHeight - 150) / 4, // 150px to account for header and margins
            minRows: 4,
            minCols: 4
        };

        // Manage URL changes (which may include dashboard name or config to be imported)
        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.handleNavigation();
            }
        })

        // Dashboards are stored in User Settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Menus need to be rebuilt
            if(this.openAction) {
                this.updateOpenAction();
                this.updateAutoSaveAction();
                this.setLayout(this.layout);
            }
        });

        // Manage Autosave
        this.dashboardChanged.subscribe(dashboard => {
            if(this.autoSave && this.isDashboardSaved()) {
                this.debounceSave();
            }
        });
    }


    /**
     * Handle URL changes. Retrieve a dashboard name or configuration if any, depending on
     * the params contained in the URL.
     */
    protected handleNavigation() {
        const url = Utils.makeURL(this.router.url);
        const dashboard = url.searchParams.get("dashboard");
        const dashboardShared = url.searchParams.get("dashboardShared");
        // Dashboards are not available yet! (pending login complete...)
        if(dashboard && dashboard !== this.dashboard?.name) {
            this.searchService.queryStringParams.dashboard = dashboard;
            if(this.hasDashboard(dashboard)) {
                this.dashboard = this.getDashboard(dashboard)!;
            }
        }
        else if(dashboardShared) {
            const db = Utils.fromJson(dashboardShared);
            if(db as DashboardItem[]) {
                this.setDashboardItems(db);
            }
            else {
                this.notificationService.error("Could not import this dashboard...");
                console.error("Could not import this dashboard:", dashboardShared);
            }
        }
        // Update the state of the setDefault action after an Open, Save, New
        this.updateSetDefaultAction();
    }

    /**
     * Returns the list of this user's dashboards.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of dashboards if it does not already exist.
     */
    public get dashboards() : Dashboard[] {
        if(!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if(!this.userSettingsService.userSettings["dashboards"])
            this.userSettingsService.userSettings["dashboards"] = [];
        return this.userSettingsService.userSettings["dashboards"];
    }

    /**
     * Tests whether a dashboard name exists or not in the user settings
     * @param dashboard
     */
    public hasDashboard(dashboard: string): boolean {
        return !!this.getDashboard(dashboard);
    }

    /**
     * Retrieves a dashboard configuration from the user settings
     * @param dashboard
     */
    public getDashboard(dashboard: string): Dashboard | undefined {
        return this.dashboards.find(d => d.name === dashboard);
    }

    /**
     * Sets the configuration for the "default dashboard" (dashboard displayed by default or
     * when the user reinitializes the dashboard).
     * @param items
     */
    public setDefaultDashboard(items: DashboardItemOption[]) {
        // The default dashboard may have been customized by the user, in which case we ignore the "items" input
        const defaultDashboard = this.prefs.get("dashboard-default");
        if(defaultDashboard && this.hasDashboard(defaultDashboard)) {
            this.defaultDashboard = Utils.copy(this.getDashboard(defaultDashboard)!);
            this.defaultDashboard.name = defaultDashboardName;
        }
        // There is no user-customized default dashboard: we create one and initialize it with the "items" input
        else {
            this.defaultDashboard = {
                name: defaultDashboardName,
                items: []
            };
            items.forEach(item => this.addWidget(item, this.defaultDashboard));
        }
        // If there is no dashboard explicitly opened currently, we open the default dashboard that we just created
        if(!this.dashboard) {
            this.dashboard = Utils.copy(this.defaultDashboard); // Default dashboard is kept as a deep copy, so we don't change it by editing the dashboard
        }
    }

    /**
     * Explicitly sets the current dashboard's items (and optionally its name)
     * @param items
     */
    public setDashboardItems(items: DashboardItem[], name = defaultDashboardName) {
        this.dashboard = { name, items };
        this.dashboardChanged.next(this.dashboard);
    }

    /**
     * A dashboard is considered saved if it has a name that is different from the default one
     */
    public isDashboardSaved(): boolean {
        return this.defaultDashboard && this.dashboard && this.dashboard.name !== defaultDashboardName;
    }


    // Dashboard modifications

    /**
     * Fire an event when a dashboard item changes
     * @param item
     */
    public notifyItemChange(item: DashboardItem) {
        this.dashboardChanged.next(this.dashboard);
    }

    /**
     * Update the Gridster options
     * @param options
     */
    public updateOptions(options: GridsterConfig) {
        this.options = options;
        this.options.api?.optionsChanged!();
    }

    /**
     * Add a new widget to the dashboard. The widget is added a x = y = 0 so that Gridster automaticaly
     * finds a good spot to insert the widget.
     * @param option a DashboardItemOption, containing among other thing the type of widget to be created
     * @param dashboard a Dashboard object (default to the currently active widget)
     * @param rows the number of rows that this widget should take in the dashboard (default to 2)
     * @param cols the number of columns that this widget should take in the dashboard (default to 2)
     * @param closable whether this widget is closable (default to true)
     */
    public addWidget(option: DashboardItemOption, dashboard: Dashboard = this.dashboard, rows = 2, cols = 2): DashboardItem {
        dashboard.items.push({
            x: 0,
            y: 0,
            rows,
            cols,
            type: option.type,
            icon: option.icon,
            title: option.text
        });
        this.dashboardChanged.next(dashboard);
        return dashboard.items[dashboard.items.length - 1];
    }

    /**
     * Remove a widget from the dashboard
     * @param item
     */
    public removeItem(item: DashboardItem) {
        this.dashboard.items.splice(this.dashboard.items.indexOf(item), 1);
        this.notifyItemChange(item);
    }

    /**
     * Rename a widget in the dashboard
     * @param item
     * @param newTitle
     */
    public renameWidget(item: DashboardItem, newTitle: string) {
        item.title = newTitle;
        this.notifyItemChange(item);
    }

    /**
     * Open a dialog to submit a new name for a given widget
     * @param item
     */
    public renameWidgetModal(item: DashboardItem) {

        const model: PromptOptions = {
            title: 'msg#dashboard.renameWidget',
            message: 'msg#dashboard.renameWidgetMessage',
            buttons: [],
            output: this.intlService.formatMessage(item.title),
            validators: [Validators.required]
        };

        this.modalService.prompt(model).then(res => {
            if(res === ModalResult.OK) {
                this.renameWidget(item, model.output);
            }
        });
    }

    /**
     * Creates a list of Action objects that allow to interact with this dashboard.
     * These actions are meant to be displayed next to the dashboard within a menu
     * component.
     * The actions include:
     * - Adding widgets
     * - Sharing the dashboard
     * - Changing the layout mode of Gridster
     * - Saving, opening and deleting the dashboard
     * @param addWidgetOptions list of DashboardItemOption used to display a list
     * of widget types for the user to choose from
     */
    public createDashboardActions(addWidgetOptions: DashboardItemOption[]): Action[] {

        const dashboardActions = [] as Action[];

        // Action to add a widget
        dashboardActions.push(new Action({
            icon: 'fas fa-plus fa-fw',
            text: 'msg#dashboard.addWidget',
            title: 'msg#dashboard.addWidgetTitle',
            action: () => {
                // We include only items either not unique or not already in the dashboard
                const model: DashboardAddItemModel = {
                    options: addWidgetOptions.filter(item =>
                        !item.unique || !this.dashboard.items.find(widget => widget.type === item.type)
                    )
                };
                this.modalService.open(DashboardAddItemComponent, {model}).then(value => {
                    if(value === ModalResult.OK && model.selectedOption) {
                        this.addWidget(model.selectedOption, this.dashboard, model.height, model.width);
                    }
                });
            }
        }));

        // Action to share a widget
        dashboardActions.push(new Action({
            icon: 'fas fa-share-alt',
            text: 'msg#dashboard.share',
            title: 'msg#dashboard.shareTitle',
            action: () => {
                const dashboard = Utils.toJson(this.dashboard.items);
                const query = this.searchService.query.toJsonForQueryString();
                const urlTree = this.router.createUrlTree(['/search'], {queryParams: {query, dashboardShared: dashboard}});
                const url = window.location.origin+window.location.pathname+this.location.prepareExternalUrl(this.urlSerializer.serialize(urlTree));
                if(this.clipboard.copy(url)) {
                    this.notificationService.success("msg#dashboard.shareSuccess");
                }
                else {
                    this.notificationService.warning("msg#dashboard.shareError", {url});
                }
            }
        }));

        // Action to select the "manual" layout mode
        this.manualLayout = new Action({
            text: 'msg#dashboard.manual',
            title: 'msg#dashboard.manualTitle',
            selected: false,
            action: () => {
                if(!this.manualLayout.selected) {
                    this.setLayout("manual");
                }
            }
        });
        // Action to select the "auto" layout mode
        this.autoLayout = new Action({
            text: 'msg#dashboard.auto',
            title: 'msg#dashboard.autoTitle',
            selected: false,
            action: () => {
                if(!this.autoLayout.selected) {
                    this.setLayout("auto");
                }
            }
        });
        // Action to select the "fixed" layout mode
        this.fixedLayout = new Action({
            text: 'msg#dashboard.fixed',
            title: 'msg#dashboard.fixedTitle',
            selected: false,
            action: () => {
                if(!this.fixedLayout.selected) {
                    this.setLayout("fixed");
                }
            }
        });
        if(this.loginService.complete) {
            this.setLayout(this.layout);
        }

        // Action to create a new dashboard
        const newDashboard = new Action({
            text: "msg#dashboard.new",
            title: "msg#dashboard.newTitle",
            selected: false,
            action: () => this.newDashboard()
        });

        // Action to open a saved dashboard
        this.openAction = new Action({
            text: "msg#dashboard.open",
            title: "msg#dashboard.openTitle",
            selected: false,
            children: []
        });
        if(this.loginService.complete) {
            this.updateOpenAction();
        }

        // Action to delete the current dashboard from the saved dashboards
        const deleteAction = new Action({
            text: 'msg#dashboard.delete',
            title: 'msg#dashboard.deleteTitle',
            selected: false,
            action: () => {
                this.modalService.confirm({
                    title: "msg#dashboard.deleteConfirmTitle",
                    message: "msg#dashboard.deleteConfirmMessage",
                    messageParams: {values: {dashboard: this.dashboard.name}},
                    confirmType: ConfirmType.Warning,
                    buttons: [
                        new ModalButton({
                            result: ModalResult.OK,
                            primary: true
                        }),
                        new ModalButton({
                            result: ModalResult.Cancel
                        })
                    ]
                }).then(value => {
                    if(value === ModalResult.OK) {
                        if(this.isDashboardSaved()) {
                            const i = this.dashboards.findIndex(d => d.name === this.dashboard.name);
                            this.dashboards.splice(i, 1);
                            this.patchDashboards(false);
                            this.updateOpenAction();
                            if(this.prefs.get("dashboard-default") === this.dashboard.name) {
                                this.prefs.delete("dashboard-default");
                            }
                        }
                        else if(this.prefs.get("dashboard-default")) {
                            this.prefs.delete("dashboard-default");
                        }
                        this.newDashboard();
                    }
                });
            }
        });

        // Action to save this dashboard in the usersettings
        const saveAs = new Action({
            text: 'msg#dashboard.saveAs',
            title: 'msg#dashboard.saveAsTitle',
            selected: false,
            action: () => this.saveAs()
        });
        // Action to save this (already saved) dashboard in the usersettings
        const save = new Action({
            text: 'msg#dashboard.save',
            title: 'msg#dashboard.saveTitle',
            selected: false,
            action: () => {
                if(!this.isDashboardSaved()){
                    this.saveAs();
                }
                else {
                    this.patchDashboards();
                }
            }
        });
        // Action to toggle auto-save mode
        this.autoSaveAction = new Action({
            text: 'msg#dashboard.autoSave',
            title: 'msg#dashboard.autoSaveTitle',
            selected: this.autoSave,
            action: (action) => {
                this.prefs.set("auto-save-dashboards", !this.autoSave);
                action.selected = this.autoSave;
                if(this.autoSave && this.isDashboardSaved()) {
                    this.patchDashboards();
                }
            }
        });
        // Action to set the currently saved dashboard as the default one
        this.setDefaultAction = new Action({
            text: 'msg#dashboard.setDefault',
            title: 'msg#dashboard.setDefaultTitle',
            selected: false,
            disabled: true,
            action: () => {
                this.modalService.confirm({
                    title: "msg#dashboard.setDefaultConfirmTitle",
                    message: "msg#dashboard.setDefaultConfirm",
                    messageParams: {values: {dashboard: this.dashboard.name}},
                    buttons: [
                        new ModalButton({
                            result: ModalResult.OK,
                            primary: true
                        }),
                        new ModalButton({
                            result: ModalResult.Cancel
                        })
                    ]
                }).then(res => {
                    if(res === ModalResult.OK) {
                        // Make the current dashboard as the default one (locally)
                        this.defaultDashboard = Utils.copy(this.dashboard);
                        // Store the name of the saved default dashboard for resetting it upon next login
                        this.prefs.set("dashboard-default", this.defaultDashboard.name);
                        // Update the name of the current dashboard (it can diverge from its saved version)
                        this.defaultDashboard.name = defaultDashboardName;
                        // Update the action to reflect the new app state
                        this.updateSetDefaultAction();
                        // Notify user that this worked
                        this.notificationService.success("msg#dashboard.setDefaultSuccess", {dashboard: this.dashboard.name});
                    }
                });
            }
        });

        // Assemble the actions into one menu
        const settings = new Action({
            icon: 'fas fa-cog fa-fw',
            title: 'msg#dashboard.settingsTitle',
            children: [
                this.manualLayout,
                this.autoLayout,
                this.fixedLayout,
                new Action({separator: true}),
                newDashboard,
                this.openAction,
                deleteAction,
                new Action({separator: true}),
                save,
                saveAs,
                this.autoSaveAction,
                this.setDefaultAction
            ],
        });

        dashboardActions.push(settings);

        return dashboardActions;
    }

    /**
     * Update the "open" action to reflect the list of saved dashboards
     */
    protected updateOpenAction() {
        this.openAction.children = this.dashboards.map(dashboard => new Action({
            text: dashboard.name,
            title: 'msg#dashboard.openDashboard',
            messageParams: {values: {dashboard: dashboard.name}},
            action: () => {
                this.dashboard = dashboard;
                this.searchService.queryStringParams.dashboard = dashboard.name;
                this.searchService.navigate({skipSearch: true});
            }
        }));
        if(this.openAction.children.length > 0) {
            delete this.openAction.selected;
        }
    }

    /**
     * Update the state of the autosave action
     */
    protected updateAutoSaveAction() {
        this.autoSaveAction.selected = this.autoSave;
    }

    /**
     * Update the state of the setDefault action
     */
    protected updateSetDefaultAction() {
        // We cannot set this as the default dashboard if is unsaved or if it is already the default
        if(this.setDefaultAction) {
            this.setDefaultAction.disabled = !this.dashboard || this.dashboard.name === defaultDashboardName || this.dashboard.name === this.prefs.get("dashboard-default");
        }
    }

    /**
     * Modifies the layout mode of the Gridster dashboard
     * @param layout
     */
    protected setLayout(layout: string) {
        if(layout === "auto") {
            this.options.compactType = 'compactLeft&Up';
            this.options.draggable!.enabled = true;
            this.options.resizable!.enabled = true;
        }
        else if (layout === "fixed") {
            this.options.compactType = 'none';
            this.options.draggable!.enabled = false;
            this.options.resizable!.enabled = false;
        }
        else {
            this.options.compactType = 'none';
            this.options.draggable!.enabled = true;
            this.options.resizable!.enabled = true;
        }
        this.options.api?.optionsChanged!();
        this.prefs.set("dashboard-layout", layout);
        this.manualLayout.selected = this.layout === "manual";
        this.autoLayout.selected = this.layout === "auto";
        this.fixedLayout.selected = this.layout === "fixed";
    }

    /**
     * Creates a new dashboard (using the default dashboard)
     */
    protected newDashboard() {
        this.dashboard = Utils.copy(this.defaultDashboard);
        delete this.searchService.queryStringParams.dashboard;
        this.searchService.navigate({skipSearch: true});
    }

    /**
     * Prompts the user for a name and saves the dashboard under this name in the
     * user settings.
     */
    protected saveAs() {

        const unique : ValidatorFn = (control) => {
            const unique = control.value !== defaultDashboardName && !this.getDashboard(control.value);
            if(!unique) return {unique: true};
            return null;
        };

        const model: PromptOptions = {
            title: 'msg#dashboard.saveAsModalTitle',
            message: 'msg#dashboard.saveAsModalMessage',
            buttons: [],
            output: 'dashboard',
            validators: [Validators.required, unique]
        };

        this.modalService.prompt(model).then(res => {
            if(res === ModalResult.OK) {
                const dashboard = Utils.copy(this.dashboard);
                dashboard.name = model.output;
                // Update User settings
                this.dashboards.push(dashboard);
                this.patchDashboards();
                // Update URL (store dashboard name in the queryParams)
                this.searchService.queryStringParams.dashboard = model.output; // Needed when refreshing the page
                this.searchService.navigate({skipSearch: true});
                // Update menu
                this.updateOpenAction();
            }
        });

    }

    debounceSave = Utils.debounce(() => this.patchDashboards(false), 200); // debounce save to avoid multiple events

    /**
     * Updates the list of dashboards in the user settings
     * @param notify
     */
    protected patchDashboards(notify = true) {
        this.userSettingsService.patch({dashboards: this.dashboards})
            .subscribe(
                next => {
                    if(notify) {
                        this.notificationService.success("msg#dashboard.saveSuccess");
                    }
                },
                error => {
                    if(notify) {
                        this.notificationService.error("msg#dashboard.saveFailure");
                    }
                    console.error("Could not patch Dashboards!", error);
                }
            );
    }

    /** Getter for the auto-save preference */
    public get autoSave(): boolean {
        return !!this.prefs.get("auto-save-dashboards");
    }

    /** Getter for the layout mode preference */
    public get layout(): string {
        return this.prefs.get("dashboard-layout") || "manual";
    }
}

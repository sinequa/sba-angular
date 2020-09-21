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


export interface DashboardItem extends GridsterItem {
    type: string;
    icon: string;
    title: string;
    closable?: boolean;
    width?: number;
    height?: number;

    // Properties specific to some types
    recordId?: string; // For type === 'preview'
    queryStr?: string; // For type === 'preview'
    aggregation?: string; // For type === 'chart'
    chartType?: string; // For type === 'chart'
}

export interface Dashboard {
    name: string;
    items: DashboardItem[];
}

export interface DashboardItemOption {
    type: string;
    icon: string;
    text: string;
    unique: boolean;
}

export const MAP_WIDGET: DashboardItemOption = {type: 'map', icon: 'fas fa-globe-americas fa-fw', text: 'msg#dashboard.map', unique: true};
export const TIMELINE_WIDGET: DashboardItemOption = {type: 'timeline', icon: 'fas fa-chart-line fa-fw', text: 'msg#dashboard.timeline', unique: true};
export const NETWORK_WIDGET: DashboardItemOption = {type: 'network', icon: 'fas fa-project-diagram fa-fw', text: 'msg#dashboard.network', unique: true};
export const CHART_WIDGET: DashboardItemOption = {type: 'chart', icon: 'fas fa-chart-bar fa-fw', text: 'msg#dashboard.chart', unique: false};
export const HEATMAP_WIDGET: DashboardItemOption = {type: 'heatmap', icon: 'fas fa-th fa-fw', text: 'msg#dashboard.heatmap', unique: false};
export const PREVIEW_WIDGET: DashboardItemOption = {type: 'preview', icon: 'far fa-file-alt', text: '', unique: false}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    dashboard: Dashboard;
    defaultDashboard: Dashboard;

    options: GridsterConfig;

    manualLayout: Action;
    autoLayout: Action;
    fixedLayout: Action;
    openAction: Action;
    autoSaveAction: Action;

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
        public clipboard: Clipboard
    ) {
        
        // Default options
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
                item.layerIndex = itemComponent.gridster.rows - item.y; // Hack to give items at the top of the page a higher z-index than at the bottom, so their dropdown menus do not get hidden by the cards below
                this.dashboardChanged.next(this.dashboard);
            },
            itemResizeCallback: (item, itemComponent) => {
                item.height = itemComponent.height; // Items must know their own width/height to (re)size their content
                item.width = itemComponent.width;
                this.dashboardChanged.next(this.dashboard);
            },
            scrollToNewItems: true, // Scroll to new items when inserted
            gridType: 'verticalFixed', // The grid has a fixed size vertically, and fits the screen horizontally
            fixedRowHeight: (window.innerHeight - 150) / 4, // 150px to account for header and margins
            minRows: 4,
            minCols: 4
        };

        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                this.handleNavigation();
            }
        })
        
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Menus need to be rebuilt
            if(this.openAction) {
                this.updateOpenAction();
                this.updateAutoSaveAction();
                this.setLayout(this.layout);
            }
        });

        // Autosave
        this.dashboardChanged.subscribe(dashboard => {
            if(this.autoSave && this.isDashboardSaved()) {
                this.debounceSave();
            }
        });
    }


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

    public hasDashboard(dashboard: string): boolean {
        return !!this.getDashboard(dashboard);
    }

    public getDashboard(dashboard: string): Dashboard | undefined {
        return this.dashboards.find(d => d.name === dashboard);
    }

    public setDefaultDashboard(items: DashboardItemOption[]) {
        this.defaultDashboard = {
            name: "<default>",
            items: []
        };
        items.forEach(item => this.addWidget(item, this.defaultDashboard));
        if(!this.dashboard) {
            this.dashboard = Utils.copy(this.defaultDashboard); // Default dashboard is kept as a deep copy, so we don't change it by editing the dashboard
        }
    }

    public setDashboardItems(items: DashboardItem[]) {
        this.dashboard = { name: "<default>", items };
        this.dashboardChanged.next(this.dashboard);
    }

    public isDashboardSaved(): boolean {
        return this.defaultDashboard && this.dashboard.name !== this.defaultDashboard.name;
    }

    
    // Dashboard modifications

    public notifyItemChange(item: DashboardItem) {
        this.dashboardChanged.next(this.dashboard);
    }

    public updateOptions(options: GridsterConfig) {
        this.options = options;
        this.options.api?.optionsChanged!();
    }

    public addWidget(option: DashboardItemOption, dashboard: Dashboard = this.dashboard, rows = 2, cols = 2, closable = true): DashboardItem {
        dashboard.items.push({
            x: 0,
            y: 0,
            rows: rows || 2,
            cols: cols || 2,
            type: option.type,
            icon: option.icon,
            title: option.text,
            closable: closable
        });
        this.dashboardChanged.next(dashboard);
        return dashboard.items[dashboard.items.length - 1];
    }
    
    public removeItem(item: DashboardItem) {
        this.dashboard.items.splice(this.dashboard.items.indexOf(item), 1);
        this.dashboardChanged.next(this.dashboard);
    }

    public createDashboardActions(addWidgetOptions: DashboardItemOption[]): Action[] {

        const dashboardActions = [] as Action[];
                
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
                        this.addWidget(model.selectedOption, this.dashboard, model.width, model.height);
                    }
                });
            }
        }));

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

        const newDashboard = new Action({
            text: "msg#dashboard.new",
            title: "msg#dashboard.newTitle",
            selected: false,
            action: () => {
                this.newDashboard();
            }
        });

        this.openAction = new Action({
            text: "msg#dashboard.open",
            title: "msg#dashboard.openTitle",
            selected: false,
            children: []
        });
        if(this.loginService.complete) {
            this.updateOpenAction();
        }

        const deleteAction = new Action({
            text: 'msg#dashboard.delete',
            title: 'msg#dashboard.deleteTitle',
            selected: false,
            action: () => {
                this.modalService.confirm({
                    title: "msg#dashboard.deleteConfirmTitle",
                    message: "msg#dashboard.deleteConfirmMessage",
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
                        }
                        this.newDashboard();
                    }
                });
            }
        });

        const saveAs = new Action({
            text: 'msg#dashboard.saveAs',
            title: 'msg#dashboard.saveAsTitle',
            selected: false,
            action: () => {
                this.saveAs();
            }
        });
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
                this.autoSaveAction
            ],
        });
        
        dashboardActions.push(settings);

        return dashboardActions;
    }

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

    protected updateAutoSaveAction() {
        this.autoSaveAction.selected = this.autoSave;
    }


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

    protected newDashboard() {        
        this.dashboard = Utils.copy(this.defaultDashboard);
        delete this.searchService.queryStringParams.dashboard;
        this.searchService.navigate({skipSearch: true});
    }

    protected saveAs() {

        const unique : ValidatorFn = (control) => {
            const unique = control.value !== this.defaultDashboard.name && !this.getDashboard(control.value);
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
                // Update URL
                this.searchService.queryStringParams.dashboard = model.output; // Needed when refreshing the page
                this.searchService.navigate({skipSearch: true});
                // Update menu
                this.updateOpenAction();
            }
        });

    }

    debounceSave = Utils.debounce(() => this.patchDashboards(false), 200); // debounce save to avoid multiple events

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

    public get autoSave(): boolean {
        return !!this.prefs.get("auto-save-dashboards");
    }

    public get layout(): string {
        return this.prefs.get("dashboard-layout") || "manual";
    }
}
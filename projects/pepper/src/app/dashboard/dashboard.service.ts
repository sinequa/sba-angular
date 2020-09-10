import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Utils } from '@sinequa/core/base';
import { UserSettingsWebService } from '@sinequa/core/web-services';
import { ModalResult, ModalService, PromptOptions, ModalButton, ConfirmType } from '@sinequa/core/modal';
import { Action } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';
import { DashboardAddItemModel, DashboardItemOption, MAP_WIDGET, TIMELINE_WIDGET, NETWORK_WIDGET, CHART_WIDGET, DashboardAddItemComponent, HEATMAP_WIDGET } from './dashboard-add-item.component';
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

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    dashboard: Dashboard;
    defaultDashboard: Dashboard;

    options: GridsterConfig;

    openAction: Action;
    autoSaveAction: Action;

    dashboardChanged = new Subject<Dashboard>();

    constructor(
        public modalService: ModalService,
        public userSettingsService: UserSettingsWebService,
        public prefs: UserPreferences,
        public searchService: SearchService,
        public notificationService: NotificationsService,
        public router: Router
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
            }
        });

        // Autosave
        this.dashboardChanged.subscribe(dashboard => {
            if(this.autoSave && this.isDashboardSaved()) {
                this.deboundSave();
            }
        });
    }


    protected handleNavigation() {
        const url = Utils.makeURL(this.router.url);
        const dashboard = url.searchParams.get("dashboard");
        // Dashboards are not available yet! (pending login complete...)
        if(dashboard && dashboard !== this.dashboard?.name) {
            this.searchService.queryStringParams.dashboard = dashboard;
            if(this.hasDashboard(dashboard)) {
                this.dashboard = this.getDashboard(dashboard)!;
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
        this.dashboard = {
            name: "<default>",
            items: []
        };
        items.forEach(item => this.addWidget(item));
        this.defaultDashboard = Utils.copy(this.dashboard); // Default dashboard is kept as a deep copy, so we don't change it by editing the dashboard
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

    public addWidget(option: DashboardItemOption, width = 2, height = 2, closable = true): DashboardItem {
        this.dashboard.items.push({
            x: 0,
            y: 0,
            rows: height || 2,
            cols: width || 2,
            type: option.type,
            icon: option.icon,
            title: option.text,
            closable: closable
        });
        this.dashboardChanged.next(this.dashboard);
        return this.dashboard.items[this.dashboard.items.length - 1];
    }
    
    public removeItem(item: DashboardItem) {
        this.dashboard.items.splice(this.dashboard.items.indexOf(item), 1);
        this.dashboardChanged.next(this.dashboard);
    }

    public createDashboardActions(): Action[] {

        const dashboardActions = [] as Action[];
                
        dashboardActions.push(new Action({
            icon: 'fas fa-plus fa-fw',
            text: 'Add Widget',
            title: 'Add a widget to the dashboard',
            action: () => {
                // We include only items either not unique or not already in the dashboard
                const model: DashboardAddItemModel = {
                    options: [MAP_WIDGET, TIMELINE_WIDGET, NETWORK_WIDGET, CHART_WIDGET, HEATMAP_WIDGET].filter(item => 
                        !item.unique || !this.dashboard.items.find(widget => widget.type === item.type)
                    )
                };
                this.modalService.open(DashboardAddItemComponent, {model}).then(value => {
                    if(value === ModalResult.OK && model.selectedOption) {
                        this.addWidget(model.selectedOption, model.width, model.height);
                    }
                });
            }
        }));

        const manualLayout = new Action({
            text: 'Manual Layout',
            title: 'Manual layout allows to position widgets freely in the dashboard',
            selected: true,
            action: () => {
                if(this.options.compactType !== 'none') {
                    this.options.compactType = 'none';
                    this.options.api?.optionsChanged!();
                }
                manualLayout.selected = true;
                autoLayout.selected = false;
            }
        });
        const autoLayout = new Action({
            text: 'Auto Layout',
            title: 'Automatic layout compacts the view to the top-left corner, when space is available',
            selected: false,
            action: () => {
                if(this.options.compactType !== 'compactLeft&Up') {
                    this.options.compactType = 'compactLeft&Up';
                    this.options.api?.optionsChanged!();
                }
                manualLayout.selected = false;
                autoLayout.selected = true;
            }
        });

        const newDashboard = new Action({
            text: "New",
            title: "Create a new dashboard",
            selected: false,
            action: () => {
                this.newDashboard();
            }
        });

        this.openAction = new Action({
            text: "Open",
            title: "Open a saved dashboard",
            selected: false,
            children: []
        });
        if(this.userSettingsService.userSettings) {
            this.updateOpenAction();
        }

        const deleteAction = new Action({
            text: 'Delete',
            title: 'Delete the current dashboard',
            selected: false,
            action: () => {
                this.modalService.confirm({
                    title: "Delete the current dashboard",
                    message: "Are your sure you want to delete the current dashboard?",
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
            text: 'Save As...',
            title: 'Save the dashboard to open it later',
            selected: false,
            action: () => {
                this.saveAs();
            }
        });
        const save = new Action({
            text: 'Save',
            title: 'Save the dashboard',
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
            text: 'Auto-save',
            title: 'Automatically save your dashboard',
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
            title: 'Dashboard settings',
            children: [
                manualLayout,
                autoLayout,
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
            title: 'Open Dashboard "'+dashboard.name+'"',
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
            title: 'Save Dashboard As',
            message: 'Enter a name for this dashboard',
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

    deboundSave = Utils.debounce(() => this.patchDashboards(false), 200); // debounce save to avoid multiple events

    protected patchDashboards(notify = true) {
        this.userSettingsService.patch({dashboards: this.dashboards})
            .subscribe(
                next => {
                    if(notify) {
                        this.notificationService.success("Dashboard saved!");
                    }
                },
                error => {
                    if(notify) {
                        this.notificationService.error("Dashboard could not be saved!");
                    }
                    console.error("Could not patch Baskets!", error);
            });
    }

    public get autoSave(): boolean {
        return !!this.prefs.get("auto-save-dashboards");
    }
}
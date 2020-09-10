import { Component, ChangeDetectorRef } from "@angular/core";
import { ComponentWithLogin, LoginService } from "@sinequa/core/login";
import { BasketsService } from '@sinequa/components/baskets';
import { SavedQueriesService, RecentQueriesService, RecentDocumentsService } from '@sinequa/components/saved-queries';
import { AlertsService } from '@sinequa/components/alerts';
import { LabelsService } from '@sinequa/components/labels';
import { UserPreferences } from '@sinequa/components/user-settings';
import { SelectionService } from '@sinequa/components/selection';
import { AppService } from '@sinequa/core/app-utils';
import { FEATURES } from '../config';

@Component({
    selector: "app",
    templateUrl: "./app.component.html"
})
export class AppComponent extends ComponentWithLogin {


    constructor(
        // These 2 services are required by the constructor of ComponentWithLogin
        loginService: LoginService,
        cdRef: ChangeDetectorRef,

        // Services are instantiated by the app component,
        // to guarantee they are instantiated in a consistent order,
        // regardless of the entry route.
        // The order below impacts the order of the actions in the selection menu.
        prefs: UserPreferences,
        public savedQueriesService: SavedQueriesService,
        public basketsService: BasketsService,
        public alertsService: AlertsService,
        public labelsService: LabelsService,
        recentQueriesService: RecentQueriesService,
        RecentDocumentsService: RecentDocumentsService,
        public selectionService: SelectionService,
        public appService: AppService
        ){
        super(loginService, cdRef);

    }

    initDone: boolean = false;
    /**
     * Initialize the list of actions in the selection service.
     * This method may be called multiple times, before the login is actually complete,
     * hence the initDone and this.appService.app test
     */
    onLoginComplete(){

        if(!this.initDone && this.appService.app){

            this.initDone = true;

            let features = FEATURES;
            // The local config (config.ts) can be overriden by server-side config
            if(this.appService.app && this.appService.app.data && this.appService.app.data.features){
                features = <string[]> this.appService.app.data.features;
            }

            features.forEach(feature => {
                switch(feature) {
                    case 'saved-queries': {
                        this.selectionService.selectionActions.push(this.savedQueriesService.selectedRecordsAction);
                        break;
                    }
                    case 'baskets': {
                        this.basketsService.selectedRecordsAction.icon = "fas fa-inbox"; // Overriding the baskets icon (hard coded in the service)
                        this.selectionService.selectionActions.push(this.basketsService.selectedRecordsAction);
                        break;
                    }
                    case 'labels': {
                        const action = this.labelsService.buildSelectionAction();
                        if(action){
                            this.selectionService.selectionActions.push(action);
                        }
                        break;
                    }
                }
            });

        }
    }


}
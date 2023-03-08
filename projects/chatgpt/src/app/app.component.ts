import { Component } from "@angular/core";
import { ComponentWithLogin } from "@sinequa/core/login";
import { RecentQueriesService, RecentDocumentsService } from '@sinequa/components/saved-queries';
import { UserPreferences } from '@sinequa/components/user-settings';
import { AppService } from '@sinequa/core/app-utils';

@Component({
    selector: "app",
    templateUrl: "./app.component.html"
})
export class AppComponent extends ComponentWithLogin {


    constructor(
        // Services are instantiated by the app component,
        // to guarantee they are instantiated in a consistent order,
        // regardless of the entry route.
        // The order below impacts the order of the actions in the selection menu.
        prefs: UserPreferences,
        _recentQueriesService: RecentQueriesService,
        _RecentDocumentsService: RecentDocumentsService,
        public appService: AppService
        ){
        super();

    }

}

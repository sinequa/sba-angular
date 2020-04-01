import {Component, AfterViewInit} from "@angular/core";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {QueryWebService, Results} from "@sinequa/core/web-services";
import {LoginService} from "@sinequa/core/login";
import {AppService, Query} from "@sinequa/core/app-utils";
import {NotificationsService, Notification} from "@sinequa/core/notification";
import {Observable} from 'rxjs';

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
    searchControl: FormControl;
    form: FormGroup;
    results$: Observable<Results> | undefined;

    constructor(
        protected formBuilder: FormBuilder,
        public loginService: LoginService,
        public appService: AppService,
        public queryWebService: QueryWebService,
        public notificationsService: NotificationsService) {


        this.searchControl = new FormControl("");
        this.form = this.formBuilder.group({
            search: this.searchControl
        });
    }

    ngAfterViewInit() {
        this.login();
    }

    search() {
        const ccquery = this.appService.ccquery;
        const query = new Query(ccquery ? ccquery.name : "_unknown");
        query.text = this.searchControl.value || "";
        this.results$ = this.queryWebService.getResults(query);
    }

    clear() {
        this.results$ = undefined;
        this.searchControl.setValue("");
    }

    login() {
        this.loginService.login();
    }

    logout() {
        this.clear();
        this.loginService.logout();
    }

    deleteNotification(notification: Notification) {
        setTimeout(() => this.notificationsService.deleteNotification(notification), 5000);
        return true;
    }
}
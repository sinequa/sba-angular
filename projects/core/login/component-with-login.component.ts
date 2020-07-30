import {Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";
import {LoginService} from "./login.service";

/**
 * A utility base class to assist main components in the handling of the login state of the
 * the application. It initiates the login process and sets `loginComplete` accordingly
 * whenever the login state changes
 */
@Component({
    template: ''
})
export class ComponentWithLogin implements OnInit, OnDestroy, AfterViewInit {
    protected loginSubscription: Subscription;
    /**
     * `true` if the application is currently logged in successfully
     */
    loginComplete: boolean;

    constructor(
        protected loginService: LoginService,
        protected changeDetectorRef: ChangeDetectorRef) {
    }

    /**
     * A method called whenever the `session-changed` event is received. This can be
     * overridden by the subclassing component.
     */
    onLoginComplete() {
    }

    /**
     * Subscribes to the [LoginService.events]{@link LoginService#events} and sets
     * the `loginComplete` member whenever the `session-changed` event is received
     */
    ngOnInit() {
        this.loginComplete = this.loginService.complete;
        this.loginSubscription = this.loginService.events.subscribe(event => {
            if (event.type === "session-changed") {
                this.loginComplete = this.loginService.complete;
                this.onLoginComplete();
                this.changeDetectorRef.markForCheck();
            }
        });
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }

    /**
     * Initiates the login process by calling [LoginService.login]{@link LoginService#login}
     */
    ngAfterViewInit() {
        this.loginService.login();
    }
}

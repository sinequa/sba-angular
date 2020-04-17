import {Component, OnInit, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";
import {NotificationsService} from "@sinequa/core/notification";

@Component({
    selector: "sq-network-activity",
    templateUrl: "./network-activity.html",
    styleUrls: ["./network-activity.scss"]
})
export class BsNetworkActivity implements OnInit, OnDestroy {
    subscription: Subscription | undefined;
    active: boolean;
    hidden: boolean;

    constructor(
        private notificationsService: NotificationsService,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.unbind();
        this.bind();
    }

    ngOnDestroy() {
        this.unbind();
    }

    bind() {
        this.subscription = this.notificationsService.events.subscribe(
            (value) => {
                this.active = this.notificationsService.get("network") > 0;
                setTimeout(() => this.changeDetectorRef.markForCheck(), 0); // Value can switch synchronously => this can cause "Expression has changed" error
            });
    }

    unbind() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }

}
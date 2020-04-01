import {Component, OnInit, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";
import {NotificationsService, Notification, NotificationState} from "@sinequa/core/notification";

@Component({
    selector: "sq-notifications",
    templateUrl: "./notifications.html"
})
export class BsNotifications implements OnInit, OnDestroy {
    private subscription: Subscription;
    notifications: Notification[];

    constructor(
        private notificationsService: NotificationsService,
        private changeDetectorRef: ChangeDetectorRef) {
        this.notifications = [];
    }

    ngOnInit() {
        this.loadNotifications();
        this.subscription = this.notificationsService.events.subscribe(
            (event) => {
                if (event.type === "updated") {
                    this.loadNotifications();
                    this.changeDetectorRef.markForCheck();
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loadNotifications() {
        this.notifications.splice(0);
        for (const notification of this.notificationsService.notifications) {
            if (notification.state !== NotificationState.Hidden) {
                this.notifications.unshift(notification);
            }
        }
    }
}
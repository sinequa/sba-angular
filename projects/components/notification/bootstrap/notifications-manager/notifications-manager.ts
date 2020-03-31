import {Component, OnInit, OnDestroy, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";
import {NotificationsService} from "@sinequa/core/notification";
import {Action} from "@sinequa/components/action";


@Component({
    selector: "sq-notifications-manager",
    templateUrl: "./notifications-manager.html"
})
export class BsNotificationsManager implements OnInit, OnDestroy {
    private subscription: Subscription | undefined;
    action: Action;
    randomAction: Action;

    constructor(
        private notificationsService: NotificationsService,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.buildAction();
        this.unbind();
        this.bind();
    }

    bind() {
        this.subscription = this.notificationsService.notificationsStream.subscribe(
            notification => {
                this.action.update();
        });
    }

    unbind() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }

    ngOnDestroy() {
        this.unbind();
    }

    buildAction() {
        this.action = new Action({
            icon: "fas fa-shield-alt",
            title: "msg#notification.title",
            hidden: true,
            children: [
                new Action({
                    text: "msg#notification.showNotifications",
                    action: (item, $event) => {
                        this.notificationsService.showNotifications();
                    },
                    updater: (item) => {
                        item.hidden = this.notificationsService.allNotificationsShowing;
                        this.changeDetectorRef.markForCheck();
                    }
                }),
                new Action({
                    text: "msg#notification.hideNotifications",
                    action: (item, $event) => {
                        this.notificationsService.hideNotifications();
                    },
                    updater: (item) => {
                        item.hidden = this.notificationsService.allNotificationsHidden;
                        this.changeDetectorRef.markForCheck();
                    }
                }),
                new Action({
                    separator: true
                }),
                new Action({
                    text: "msg#notification.clearNotifications",
                    action: (item, $event) => {
                        this.notificationsService.deleteAllNotifications();
                    }
                })
            ]
        });
    }
}
import {Component, Input, OnInit} from "@angular/core";
import {trigger, animate, transition, style, AnimationTriggerMetadata} from '@angular/animations';
import {NotificationsService, Notification, NotificationState, NotificationType} from "@sinequa/core/notification";
import {Utils} from "@sinequa/core/base";

export function notificationAnimations(timings: number | string): AnimationTriggerMetadata[] {
    return [
        trigger('autoClose', [
            transition('1 => void', [
                animate(timings, style({ opacity: 0 }))
            ])
        ])
    ];
}

@Component({
    selector: "sq-notification",
    templateUrl: "./notification.html",
    animations: notificationAnimations(".15s ease-in-out")
})
export class BsNotification implements OnInit {
    @Input() notification: Notification;
    autoClose: boolean;
    constructor(
        private notificationsService: NotificationsService) {
    }

    ngOnInit() {
        if (this.notification.autoClose && this.notification.state === NotificationState.Initial) {
            this.autoClose = true;
            Utils.delay(5000).then(value => {
                if (this.notification.state === NotificationState.Initial) {
                    this.close();
                }
            });
        }
    }

    get alertClass(): string {
        switch (this.notification.type) {
            case NotificationType.Info: return "info";
            case NotificationType.Success: return "success";
            case NotificationType.Warning: return "warning";
            case NotificationType.Error: return "danger";
        }
        return "";
    }

    get notificationClass(): string {
        switch (this.notification.type) {
            case NotificationType.Info: return "fas fa-info-circle fa-lg";
            case NotificationType.Success: return "fas fa-check-circle fa-lg";
            case NotificationType.Warning: return "fas fa-exclamation-triangle fa-lg";
            case NotificationType.Error: return "fas fa-exclamation-circle fa-lg";
        }
        return "";
    }

    get showClose(): boolean {
        return !this.notification.autoClose || this.notification.state !== NotificationState.Initial;
    }

    close() {
        this.notificationsService.closeNotification(this.notification);
    }
}
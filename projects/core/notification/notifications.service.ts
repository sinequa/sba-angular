import {Injectable, OnDestroy} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Utils, MapOf} from "@sinequa/core/base";

/**
 * Notification types.
 */
export const enum NotificationType {
    Success,
    Info,
    Warning,
    Error,
    Last = Error
}

/**
 * Notification visibility states.
 */
export const enum NotificationState {
    Initial,
    Showing,
    Hidden
}

/**
 * Describes a notification object.
 */
export interface Notification {
    /**
     * The notification title.
     */
    title?: string;
    /**
     * The notification text.
     */
    text?: string;
    /**
     * Message parameters for the notification `text`.
     */
    params?: MapOf<any>;
    /**
     * Determines whether the notification should close automatically after a period.
     * The duration is determined by a particular UI implementation.
     */
    autoClose?: boolean;
    /**
     * The notification type.
     */
    type?: NotificationType;
    /**
     * The nofification state.
     */
    state?: NotificationState;
}

/**
 * Describes a base notification event.
 */
export interface NotificationEvent {
    /**
     * The possible notification event types.
     */
    type: "updated" | "data-updated";
}

/**
 * Describes a notification "updated" event. This event is emitted
 * when one or more notifications are added, shown, hidden or deleted.
 */
export interface UpdatedEvent extends NotificationEvent {
    type: "updated";
}

/**
 * Describes a data updated event. This event is emitted by the
 * [NotificationsService.set]{NotificationsService#set} method
 * is called.
 */
export interface DataUpdatedEvent extends NotificationEvent {
    type: "data-updated";
}

/**
 * This service provides methods for managing notifications. No user interface
 * is imposed. It also manages a key-value data store. Events are emitted
 * when the notifications and data store are updated.
 */
@Injectable({
    providedIn: "root"
})
export class NotificationsService implements OnDestroy {
    protected data: MapOf<any>;
    /**
     * The current notifications.
     */
    notifications: Notification[];
    protected _events = new Subject<UpdatedEvent | DataUpdatedEvent>();
    protected _notificationsStream = new Subject<Notification>();

    constructor() {
        this.data = {};
        this.notifications = [];
    }

    ngOnDestroy() {
        this._events.complete();
    }

    /**
     * Get the obervable stream of notification events.
     */
    get events(): Observable<UpdatedEvent | DataUpdatedEvent> {
        return this._events;
    }

    /**
     * Get the observable stream of notifications. This will
     * emit each time a notification is added. It will also emit
     * `null` when notifications are deleted.
     */
    get notificationsStream(): Observable<Notification> {
        return this._notificationsStream;
    }

    /**
     * Set a value in the data store. The `data-updated` event
     * is emitted.
     *
     * @param key The value's key.
     * @param value The value.
     */
    set(key: string, value: any) {
        this.data[key] = value;
        this._events.next({type: "data-updated"});
    }

    /**
     * Get a value from the data store.
     *
     * @param key The value's key.
     */
    get(key: string): any {
        return this.data[key];
    }

    /**
     * Increment a counter in the data store identified by the passed `key`.
     * The intial value is 0.
     *
     * @param key The key for the counter.
     */
    enter(key: string) {
        let value = this.data[key];
        if (!value) {
            value = 0;
        }
        value++;
        this.set(key, value);
    }

    /**
     * Decrement a counter in the data store identified by the passed `key`.
     * Calls to `leave` should match calls to `enter`. If the counter becomes negative
     * an "underflow" warning is emitted to the console and the counter set to 0.
     *
     * @param key The key for the counter.
     */
    leave(key: string) {
        let value = this.data[key];
        value--;
        if (value < 0) {
            console.warn("NotificationsService.leave underflow for:", key);
        }
        if (!value || value < 0) {
            value = 0;
        }
        this.set(key, value);
    }

    /**
     * `true` if there are current notifications.
     */
    get haveNotifications(): boolean {
        return this.notifications.length > 0;
    }

    /**
     * `true` if the all current notifications are in the `Showing` state.
     */
    get allNotificationsShowing(): boolean {
        for (const notification of this.notifications) {
            if (notification.state !== NotificationState.Showing) {
                return false;
            }
        }
        return true;
    }

    /**
     * `true` if all current notifications are in the `Hidden` state.
     */
    get allNotificationsHidden(): boolean {
        for (const notification of this.notifications) {
            if (notification.state !== NotificationState.Hidden) {
                return false;
            }
        }
        return true;
    }

    /**
     * Gets the last added notification.
     */
    get lastNotification(): Notification | undefined {
        if (this.notifications.length > 0) {
            return this.notifications[this.notifications.length - 1];
        }
        return undefined;
    }

    /**
     * Add a notification. The `updated` event is emitted and the added notification
     * is emitted on the notifications stream.
     *
     * @param type The notification type.
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     * @param autoClose A flag determining whether the notification should auto-close.
     */
    notify(type: NotificationType, text: string, params?: MapOf<any>, title?: string, autoClose?: boolean): Notification {
        const notification: Notification = {
            type,
            text,
            params,
            title,
            autoClose
        };
        // Replace the last notification if it is the same as the new one
        const lastNotification = this.lastNotification;
        if (lastNotification) {
            notification.state = lastNotification.state;
            if (Utils.equals(notification, lastNotification)) {
                this.notifications.splice(this.notifications.length - 1, 1);
            }
        }
        notification.state = NotificationState.Initial;
        this.notifications.push(notification);
        this._events.next({type: "updated"});
        this._notificationsStream.next(notification);
        return notification;
    }

    /**
     * Add a `Success` type notification. The notification will auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    success(text: string, params?: MapOf<any>, title?: string): Notification {
        return this.notify(NotificationType.Success, text, params, title, true);
    }

    /**
     * Add an `Info` type notification. The notification will auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    info(text: string, params?: MapOf<any>, title?: string): Notification {
        return this.notify(NotificationType.Info, text, params, title, true);
    }

    /**
     * Add a `Warning` type notification. The nofification will not auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    warning(text: string, params?: MapOf<any>, title?: string): Notification {
        return this.notify(NotificationType.Warning, text, params, title, false);
    }

    /**
     * Add an `Error` type notification. The nofification will not auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    error(text: string, params?: MapOf<any>, title?: string): Notification {
        return this.notify(NotificationType.Error, text, params, title, false);
    }

    /**
     * Set the state of all notifications to `Showing`. The `updated` event is
     * emitted.
     */
    showNotifications() {
        for (const notification of this.notifications) {
            notification.state = NotificationState.Showing;
        }
        this._events.next({type: "updated"});
    }

    /**
     * Set the state of all notifications to `Hidden`. The `updated` event is
     * emitted.
     */
    hideNotifications() {
        for (const notification of this.notifications) {
            notification.state = NotificationState.Hidden;
        }
        this._events.next({type: "updated"});
    }

    /**
     * Delete all notifications. The `updated` event is
     * emitted. `null` is emitted on the notifications stream.
     */
    deleteAllNotifications() {
        this.notifications.splice(0);
        this._events.next({type: "updated"});
        this._notificationsStream.next(undefined);
    }

    /**
     * Delete the passed `notification`. The `updated` event is
     * emitted. `null` is emitted on the notifications stream if no notifications
     * remain.
     *
     * @param notification The notification to delete.
     */
    deleteNotification(notification: Notification) {
        for (let i = 0, ic = this.notifications.length; i < ic; i++) {
            if (this.notifications[i] === notification) {
                this.notifications.splice(i, 1);
                this._events.next({type: "updated"});
                if (this.notifications.length === 0) {
                    this._notificationsStream.next(undefined);
                }
                break;
            }
        }
    }

    /**
     * Close the passed `notification`. If the notification is in the
     * `Initial` state then its state is set to `Hidden` otherwise the
     * notification is deleted. The `updated` event is emitted.
     *
     * @param notification The notification to close.
     */
    closeNotification(notification: Notification) {
        if (notification.state === NotificationState.Initial) {
            notification.state = NotificationState.Hidden;
            this._events.next({type: "updated"});
        }
        else {
            this.deleteNotification(notification);
        }
    }
}

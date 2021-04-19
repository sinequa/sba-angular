---
layout: default
title: Notification Module
parent: Components
grand_parent: Modules
nav_order: 14
---

# Notification Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/NotificationModule.html) auto-generated from source code.

## Features

This module introduces the Bootstrap-flavored components to display and manage user notifications.

For the creation and management of notifications, please refer to the [Core Notification module]({{site.baseurl}}core/modules/NotificationModule.html).

![Error notification]({{site.baseurl}}assets/modules/notification/notification-error-notification-example.png)
*An error notification*
{: .text-center }

## Import

```typescript
import { BsNotificationModule } from "@sinequa/components/notification";

@NgModule({
  imports: [
      /*....*/
      BsNotificationModule,
      /*....*/
  ],
  /*....*/
})
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enNotification} from "@sinequa/components/notification";

const messages = Utils.merge({}, ..., enNotification, appMessages);
```

## API usage

### Components

#### BsNotification

The [`BsNotification` component]({{site.baseurl}}components/components/BsNotification.html) is the Bootstrap-flavor implementation of a notification shown on the screen.

#### BsNotifications

The [`BsNotifications` component]({{site.baseurl}}components/components/BsNotifications.html) is the component representing the current notification list and displaying the notification on the screen.
It is imported and used in the `app.component.html` of `vanilla-search`.

#### BsNotificationsManager

The [`BsNotificationsManager` component]({{site.baseurl}}components/components/BsNotificationsManager.html) is the component
that is used to manage the list of notifications of your application.

For more information about how you can manage the notification list, please refer to [Manage user notifications]({{site.baseurl}}modules/core/notification.html#manage-user-notifications)

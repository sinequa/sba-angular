---
layout: default
title: User preferences
parent: Tips and Tricks
sidebar_position: 5
---

# User preferences

Users expect the app to "remember" their decisions and not have to re-apply the same simple settings every time.

There two main mechanisms to enable this:

- [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage): Store string key/value string pairs **in the user's browser** (note that in case of multiple devices you have to apply the setting once on each device).
- Sinequa [**User Settings**](user-settings.md): Store arbitrary objects tied to the user **on the Sinequa server**. User Settings is a general system supporting many specific features. One of them is the **User Preferences**, which allow you to store arbitrary key/value data for specific features of your app.

    Note that:
  - User settings (and preferences) are limited to **small objects**! There is no pagination system, and all the data is downloaded on the application started.
  - User settings (and preferences) are available **post-login**, which means you cannot use them to store the theme of the app or the preferred language (since you need them even before the user is logged in).

To store information in the **User Preferences**, do the following:

- Import `UserPreferences` from `@sinequa/components/user-settings` and inject it in your constructor:

    ```ts
    import { UserPreferences } from '@sinequa/components/user-settings';

    ...
    constructor(
        ...
        public prefs: UserPreferences
    )
    ```

- You can then read from the preferences (post-login) with:

    ```ts
    let value = this.prefs.get("some-parameter");
    ```

- And write (post-login) with:

    ```ts
    this.prefs.set("some-parameter", value);
    ```

Note: if you need to know whether login is complete or not, import the `LoginService` from `sinequa/core/login` and test the (boolean) value of `loginService.complete`.

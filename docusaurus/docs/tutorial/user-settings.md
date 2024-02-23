---
layout: default
title: User Settings Features
parent: Tutorial
sidebar_position: 8
---

# User Settings Features

[`User Settings`](/libraries/components/user-settings.md) allow you to store and retrieve user-specific data on the Sinequa server. Multiple features are based on User Settings:

- Saved Queries (Save a particular query to reuse it later)
- Recent Queries (Indifferently save all latest queries)
- Recent Documents (Save all documents recently opened)
- Baskets (Save documents to named "baskets")
- Alerts (Subscribe to an email alert for a particular query)
- Chat (Save chat sessions with ChatGPT)

These features come packaged in modules. The first 3 are packaged in the Saved Queries module, the baskets in the Baskets module, the alerts in the Alerts module and the chat in the Machine Leaning module.

Additionally the [User Settings module](/libraries/components/user-settings.md) provide a `UserPreferences` utility to easily store key-values data for the current user on the server (this can be useful for UI settings for example).

In this chapter of the tutorial, we will add **Saved Queries** to our app. This will consist of a **menu** to save a query at any given time, and a **facet** to display these saved queries. The other User-Settings-based features mentioned above include very much the same kind of functionality, feel free to integrate them as well!

## Importing the Saved Queries Module

In your `app.module.ts`, import the `BsSavedQueriesModule` and add it to the `NgModule` declaration:

```ts title="app.module.ts"
import { BsSavedQueriesModule } from '@sinequa/components/saved-queries';

@NgModule({
  imports: [
    ...
    BsSavedQueriesModule
```

## Saved Queries Menu

The menu is packaged in a component called `sq-saved-queries-menu`. We will add it to our `app.component.html` at the top, in a Bootstrap **navbar** element:

```html title="app.component.html"
<nav class="navbar px-0">
    <h1 class="mr-auto">Hello Search 🔍</h1>
    <ul class="navbar-nav navbar-right">
        <sq-saved-queries-menu></sq-saved-queries-menu>
    </ul>
</nav>
```

![Navbar issues](/assets/tutorial/navbar-issue.png)

This sort of works, but there are some issues:

- We are missing the language files for the Saved Queries
- The dropdown menus do not display correctly

Add the language files to your dictionaries:

```ts title="en.ts"
import {enSavedQueries} from "@sinequa/components/saved-queries";

...
    messages: Utils.merge({}, ..., enSavedQueries, appMessages)
```

Import the `action.scss` stylesheet in your `app.scss` (⚠️ NOT your component-specific `app.component.scss`) to fix the styles:

```scss title="app.scss"
@import "../../../components/action/bootstrap/action.scss";
```

Our menu is now displayed as expected:

![Navbar menu](/assets/tutorial/navbar-ok.png)

## Saved Queries Service

All the features exposed by the Saved Queries menu are also available programmatically via the `SavedQueriesService`.

For example, to display a button that saves the current query, you can:

1. Inject the `SavedQueriesService` in the constructor of your component:

    ```ts
    import { SavedQueriesService } from '@sinequa/components/saved-queries';
    ...
        constructor(
            ...
            public savedQueriesService: SavedQueriesService
        )
    ```

2. Add a button to your template:

    ```html
    <button class="btn btn-success" (click)="savedQueriesService.createSavedQueryModal()">
        <i class="fas fa-save"></i>
    </button>
    ```

![Save query button](/assets/tutorial/savedqueries-button.png)

## Saved Queries Facet

The module also includes a facet that displays your saved queries (as a possible alternative to the menu). Note that we need to set an empty `searchRoute` parameter since our application has no route.

```html
<sq-facet-card [title]="'msg#savedQueries.savedQueries'" [icon]="'fas fa-save'">
    <sq-facet-saved-queries #facet [maxQueries]="5" [searchRoute]=""></sq-facet-saved-queries>
</sq-facet-card>
```

![Save query facet](/assets/tutorial/savedqueries-facet.png)

## Developing your own User-Settings Service

You can leverage the User-Settings system to develop your own features. Keep in mind the following:

- User settings store data per user and per App unencrypted on the Sinequa server.
- User settings are systematically and fully downloaded from the server on your app initialization (during login). This means the amount of data you can store is necessarily restricted for scalability reasons. If your feature requires more storage, consider using an index on the backend and a custom REST API interact with that index.
- When you make changes to User Settings on the client-side (eg. Saving a query), the User Settings are synced with the server. Only a subset of the data is sent to the server to improve performance (See the `UserSettingsWebService.patch()` method).
- User settings are available post-login, which means not immediately on application startup. If you need data to be available immediately on startup, consider using the browser's `localStorage`.

![User settings services](/assets/tutorial/user-settings-services.png)
<p class="text--center"><em>User-settings services typically expose a chunk of the User-Settings (here, `recent-queries`) and a CRUD API to manipulate this data</em></p>


We recommend you implement your own service by mimicking the content of an existing service (`SavedQueriesService`, `RecentQueriesService`, `RecentDocumentsService`, `AlertsService`, `BasketsService`, `UserPreferences`...).

## User Preferences

If you need to store simple key-value data in the User Settings, no need to develop a full-blown service for that. Simply import the `UserPreferences` in your component, and use the getter and setter of this service, which take care of syncing the data with the server.

```ts
import { UserPreferences } from '@sinequa/components/user-settings';

...
    constructor(
        ...
        public prefs: UserPreferences,
    )

    likesPizza(): boolean {
        return this.prefs.get("user-likes-pizza");
    }

    setPizza(pizza: boolean) {
        this.prefs.set("user-likes-pizza", pizza);
    }
```

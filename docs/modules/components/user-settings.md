---
layout: default
title: User Settings Modules
parent: Components
grand_parent: Modules
nav_order: 6
---

# User Settings Modules

## Reference documentation

Please checkout the reference documentation auto-generated from source code for the following modules:

- [Saved Queries Module]({{site.baseurl}}components/modules/BsSavedQueriesModule.html) (which includes *Recent Queries* and *Recent Documents*)
- [Alerts Module]({{site.baseurl}}components/modules/BsAlertsModule.html)
- [Baskets Module]({{site.baseurl}}components/modules/BsBasketsModule.html)

The User Settings modules are also documented in the [Tutorial]({{site.baseurl}}tutorial/user-settings.html) and in the [Tips & Tricks]({{site.baseurl}}tipstricks/user-settings.html) section.

Also check the documention on the [User Settings web service]({{site.baseurl}}core/injectables/UserSettingsWebService.html) from the [Web Services libary]({{site.baseurl}}modules/core/web-services.html#user-settings-web-service) (in the Core library).

## Features

There are currently five functionalities based on the User Settings. The table below summarizes the features available for each of them:

| Functionality | Library `@sinequa/components` | Service | CRUD API | Edit Modal | Manage Modal | User Menu | Facet |
|---------|---------|---------|:--------:|:----------:|:------------:|:---------:|:-----:|
| Saved Queries | `/saved-queries` | `SavedQueriesService` | ✓ |   | ✓ | ✓ | ✓ |
| Recent Queries | `/saved-queries` | `RecentQueriesService` | ✓ |   |   |   | ✓ |
| Recent Documents | `/saved-queries` | `RecentDocumentsService` | ✓ |   |   |   | ✓ |
| Baskets | `/baskets` | `BasketsService` | ✓ | ✓ | ✓ | ✓ | ✓ |
| Alerts | `/alerts` | `AlertsService` | ✓ | ✓ | ✓ | ✓ |   |

## Import

Import one or more module(s) in your `app.module.ts`.

```ts
import { BsSavedQueriesModule } from '@sinequa/components/saved-queries';
import { BsAlertsModule } from '@sinequa/components/alerts';
import { BsBasketsModule } from '@sinequa/components/baskets';

@NgModule({
  imports: [
    ...
    BsSavedQueriesModule,
    BsAlertsModule,
    BsBasketsModule
```

These modules are internationalized: If not already the case, you need to import their messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enAlerts} from "@sinequa/components/alerts";
import {enBaskets} from "@sinequa/components/baskets";
import {enSavedQueries} from "@sinequa/components/saved-queries";

const messages = Utils.merge({}, ..., enAlerts, enBaskets, enSavedQueries, appMessages);
```

## Saved Queries

**Saved Queries** are a functionality that lets users save their current search criteria (which may include searched text, tabs and facets selections, etc.) to replay them later. These queries are given a name and can be displayed in a list (facet, or user menu).

### User Menu

The [`sq-saved-queries-menu`]({{site.baseurl}}components/components/BsSavedQueriesMenuComponent.html) component displays the list of saved queries, lets a user save his current query and allows to reorganize the list (See the *Manage* modal below).

![Saved queries menu]({{site.baseurl}}assets/modules/user-settings/saved-queries-menu.png){: .d-block .mx-auto }

This menu is meant to be inserted in a Bootstrap-styled navbar:

```html
<ul class="navbar-nav">
    <sq-saved-queries-menu></sq-saved-queries-menu>
    <!-- Other menus -->
</ul>
```

### Facet

The [`sq-facet-saved-queries`]({{site.baseurl}}components/components/BsFacetSavedQueries.html) component displays the list of saved queries, lets a user re-play one of them, open the *Manage* modal (see below), or delete specific queries.

![Saved queries facet]({{site.baseurl}}assets/modules/user-settings/saved-queries-facet.png){: .d-block .mx-auto }

This facet is meant to work with the [`sq-facet-card`]({{site.baseurl}}components/components/BsFacetCard.html) component (See [Facet Module](facet.html)):

```html
<sq-facet-card  [title]="'msg#savedQueries.savedQueries'"
                [tooltip]="'msg#home.savedQueriesTooltip'"
                [icon]="'fas fa-save'">
    <sq-facet-saved-queries #facet [maxQueries]="5"></sq-facet-saved-queries>
</sq-facet-card>
```

The component accepts the following (optional) inputs:

- `searchRoute` (default: `'/search'`): The route to navigate to when searching a query (clicked by the user).
- `maxQueries` (default: `5`): The maximum number of queries to display (the rest is available with pagination).
- `enableDelete` (default: `true`): Whether to enable the deletion of queries in the facet.

### Service & Modals

The [`SavedQueriesService`]({{site.baseurl}}components/injectables/SavedQueriesService.html) is the access point for the list of saved queries (`SavedQueriesService.savedqueries`), and it provides a list of public methods to create, read, update and delete this data (CRUD API).

Additional methods allow to display modal dialogs:

- `createSavedQueryModal()` displays the [`sq-edit-saved-query`]({{site.baseurl}}components/components/BsEditSavedQuery.html) modal component which prompts the user for a name (for the saved query)
- `manageSavedQueriesModal()` displays the [`sq-manage-saved-queries`]({{site.baseurl}}components/components/BsManageSavedQueries.html) modal component which displays the list of queries and lets the user reorganize it (change the order, remove or rename elements)
- `exportModal()` displays the [`sq-export-query`]({{site.baseurl}}components/components/BsExportQuery.html) modal component which allows to export a saved query or a list of results.

![Manage saved queries modal]({{site.baseurl}}assets/modules/user-settings/manage-saved-queries.png){: .d-block .mx-auto width="350px" }
*Manage Modal component to reorder, rename or delete saved queries*
{: .text-center }

## Recent Queries

**Recent Queries** are a functionality that records the latest queries of the user in the User Settings. These queries can then be displayed (eg. in a facet), or used in other ways (eg. autocomplete).

### Facet

The [`sq-facet-recent-queries`]({{site.baseurl}}components/components/BsFacetRecentQueries.html) component displays the list of recent queries and lets a user re-play, delete or save one of them.

![Recent queries facet]({{site.baseurl}}assets/modules/user-settings/recent-queries-facet.png){: .d-block .mx-auto }

This facet is meant to work with the [`sq-facet-card`]({{site.baseurl}}components/components/BsFacetCard.html) component (See [Facet Module](facet.html)):

```html
<sq-facet-card  [title]="'msg#facet.recentQueries.title'" 
                [tooltip]="'msg#home.recentQueriesTooltip'"
                [icon]="'fas fa-history'">
    <sq-facet-recent-queries #facet [maxQueries]="5"></sq-facet-recent-queries>
</sq-facet-card>
```

The component accepts the following (optional) inputs:

- `searchRoute` (default: `'/search'`): The route to navigate to when searching a query (clicked by the user).
- `maxQueries` (default: `5`): The maximum number of queries to display (the rest is available with pagination).
- `enableDelete` (default: `true`): Whether to enable the deletion of queries in the facet.
- `enableSave` (default: `true`): Whether to enable saving a recent query in the facet.

### Service

The [`RecentQueriesService`]({{site.baseurl}}components/injectables/RecentQueriesService.html) is the access point for the list of recent queries (`RecentQueriesService.recentqueries`), and it provides a list of public methods to create, read, update and delete this data (CRUD API).

## Recent Documents

**Recent Documents** are a functionality that records the latest documents opened by the user in the User Settings. This list of documents can then be displayed (eg. in a facet), or used in other ways (eg. autocomplete).

### Facet

The [`sq-facet-recent-documents`]({{site.baseurl}}components/components/BsFacetRecentDocuments.html) component displays the list of recent document and lets a user re-open one, or remove it from the list.

![Recent documents facet]({{site.baseurl}}assets/modules/user-settings/recent-documents-facet.png){: .d-block .mx-auto }

This facet is meant to work with the [`sq-facet-card`]({{site.baseurl}}components/components/BsFacetCard.html) component (See [Facet Module](facet.html)):

```html
<sq-facet-card  [title]="'msg#savedQueries.savedQueries'"
                [tooltip]="'msg#home.savedQueriesTooltip'"
                [icon]="'fas fa-save'">
    <sq-facet-recent-documents #facet [maxDocuments]="5"></sq-facet-recent-documents>
</sq-facet-card>
```

The component accepts the following (optional) inputs:

- `maxDocuments` (default: `5`): The maximum number of documents to display (the rest is available with pagination).
- `enableDelete` (default: `true`): Whether to enable the deletion of documents from the list.
- `openOriginal` (default: `false`): Whether to open the original document (`record.url1`) when clicked, or simply emit an event (`(documentOpened)` event emitter).

### Service

The [`RecentDocumentsService`]({{site.baseurl}}components/injectables/RecentDocumentsService.html) is the access point for the list of recent documents (`RecentDocumentsService.recentdocuments`), and it provides a list of public methods to create, read, update and delete this data (CRUD API).

## Alerts

**Alerts** are a functionality that lets a user schedule and subscribe to a search alert (which will regularly inform them of new relevant content). These alerts can then be displayed (eg. in a user menu), edited (*Edit* modal) and reorganized (*Manage* modal).

### User Menu

The [`sq-alerts-menu`]({{site.baseurl}}components/components/BsAlertsMenuComponent.html) component displays the list of alerts, lets a user schedule an alert for the current query and allows to reorganize the list (See the *Manage* modal below).

![Alerts menu]({{site.baseurl}}assets/modules/user-settings/alerts-menu.png){: .d-block .mx-auto }

This menu is meant to be inserted in a Bootstrap-styled navbar:

```html
<ul class="navbar-nav">
    <sq-alerts-menu></sq-alerts-menu>
    <!-- Other menus -->
</ul>
```

### Service & Modals

The [`AlertsService`]({{site.baseurl}}components/injectables/AlertsService.html) is the access point for the list of alerts (`AlertsService.Alerts`), and it provides a list of public methods to create, read, update and delete this data (CRUD API).

Additional methods allow to display modal dialogs:

- `createAlertModal()` displays the [`sq-edit-alert`]({{site.baseurl}}components/components/BsEditAlert.html) modal component which lets the user create and schedule an alert.
- `editAlertModal()` displays the [`sq-edit-alert`]({{site.baseurl}}components/components/BsEditAlert.html) modal component (same as above) which allows to edit the parameters of an existing alert.
- `manageAlertsModal()` displays the [`sq-manage-alerts`]({{site.baseurl}}components/components/BsManageAlerts.html) modal component which displays the list of alerts and lets the user reorganize it (change the order, remove or rename elements). This component is similar to the `sq-manage-saved-queries` component.

![Alerts modal]({{site.baseurl}}assets/modules/user-settings/alerts-modal.png){: .d-block .mx-auto width="350px" }
*Edit/Create Modal component for alerts*
{: .text-center }

## Baskets

**Baskets** (a.k.a *Bookmarks* or *Collections*) are a functionality that lets users store specific documents to retrieve them later. A basket is essentially a named list of document ids (the document is only referenced, not copied).

Note: in [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html), Baskets are actually renamed "Collections" (via internationalization).

### User Menu

The [`sq-baskets-menu`]({{site.baseurl}}components/components/BsBasketsMenuComponent.html) component displays the list of baskets, lets a user create a new basket and reorganize the list (See the *Manage* modal below).

![Baskets menu]({{site.baseurl}}assets/modules/user-settings/baskets-menu.png){: .d-block .mx-auto }

This menu is meant to be inserted in a Bootstrap-styled navbar:

```html
<ul class="navbar-nav">
    <sq-baskets-menu></sq-baskets-menu>
    <!-- Other menus -->
</ul>
```

### Facet

The [`sq-facet-baskets`]({{site.baseurl}}components/components/BsFacetBasketsComponent.html) component displays the list of baskets, lets a user open one of them, create a new one, open the *Manage* modal (see below), and delete specific baskets.

![Baskets facet]({{site.baseurl}}assets/modules/user-settings/baskets-facet.png){: .d-block .mx-auto }

This facet is meant to work with the [`sq-facet-card`]({{site.baseurl}}components/components/BsFacetCard.html) component (See [Facet Module](facet.html)):

```html
<sq-facet-card  [title]="'msg#baskets.baskets'" 
                [tooltip]="'msg#home.basketsTooltip'"
                [icon]="'fas fa-shopping-basket'">
    <sq-facet-baskets #facet [maxBaskets]="5"></sq-facet-baskets>
</sq-facet-card>
```

The component accepts the following (optional) inputs:

- `searchRoute` (default: `'/search'`): The route to navigate to when opening a basket (clicked by the user).
- `maxBaskets` (default: `5`): The maximum number of baskets to display (the rest is available with pagination).
- `enableDelete` (default: `true`): Whether to enable the deletion of baskets in the facet.

### Service & Modals

The [`BasketsService`]({{site.baseurl}}components/injectables/BasketsService.html) is the access point for the list of baskets (`BasketsService.baskets`), and it provides a list of public methods to create, read, update and delete this data (CRUD API).

Additional methods allow to display modal dialogs:

- `addToBasketModal()` displays the [`sq-select-basket`]({{site.baseurl}}components/components/BsSelectBasket.html) modal component which lets the user select a basket. The input document is then added to that basket.
- `removeFromBasketModal()` performs the same action as `addToBasketModal()` but removes the document from that basket.
- `createBasketModal()` displays the [`sq-edit-basket`]({{site.baseurl}}components/components/BsEditBasket.html) modal component which allows to create a basket after giving it a name.
- `manageBasketsModal()` displays the [`sq-manage-baskets`]({{site.baseurl}}components/components/BsManageBaskets.html) modal component which displays the list of baskets and lets the user reorganize it (change the order, remove or rename elements). This component is similar to the `sq-manage-saved-queries` component.

![Baskets modal]({{site.baseurl}}assets/modules/user-settings/baskets-select.png){: .d-block .mx-auto width="350px" }
*Select Modal to add or remove a document to/from a basket*
{: .text-center }

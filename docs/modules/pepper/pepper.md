---
layout: default
title: Pepper
parent: Modules
nav_order: 5
---

# Pepper

*Pepper* is a search & analytics app based on a modular, interactive and dashboard-based user interface.

Pepper has a single "search" route (which can easily replace the "search" route of Vanilla-Search, if the "home" and "preview" routes are required).

![Pepper]({{site.baseurl}}assets/modules/pepper.png)

## Dashboard

The dashboard of Pepper is based on the [**angular-gridster2**](https://tiberiuzuld.github.io/angular-gridster2/) library.

Dashboards can be customized by the user by dragging and resizing widgets, and adding new ones from a list of predefined widget types. A developer can easily add new widget types, or configure the existing ones.

Dashboards can be saved with a name, re-opened later, and shared with colleagues. A dropdown menu allows users to manage their dashboards and modify their settings.

![Dashboard menu]({{site.baseurl}}assets/modules/dashboard-menu.png){: .d-block .mx-auto }

The dashboard also allows to open multiple document previews, just like other widgets. When the dashboard is reopened, these previews are fetched again from the Sinequa indexes.

![Dashboard preview]({{site.baseurl}}assets/modules/dashboard-preview.png){: .d-block .mx-auto }

## Architecture

Pepper's search route look similar to Vanilla Search. In fact the navbar and results list are identical. Pepper's dashboard is located after this results list:

```html
<gridster [options]="dashboardService.options">
    <gridster-item [item]="item" *ngFor="let item of dashboardService.dashboard.items; index as i">
        <sq-dashboard-item
            [config]="item"
            [results]="results"
            [width]="item.width"
            [height]="item.height">
        </sq-dashboard-item>
    </gridster-item>
</gridster>
```

There are three levels in the above snippet:

- `<gridster>`: The main component provided by the [angular-gridster2](https://tiberiuzuld.github.io/angular-gridster2/) library, which wraps the widgets provided inside. This component takes in the **`options`** of the Gridster dashboard (of type [`GridsterConfig`](https://github.com/tiberiuzuld/angular-gridster2/blob/master/projects/angular-gridster2/src/lib/gridsterConfig.interface.ts)). These options are all detailed in the library's [online documentation](https://tiberiuzuld.github.io/angular-gridster2/).
- `<gridster-item>`: A component provided by the [angular-gridster2](https://tiberiuzuld.github.io/angular-gridster2/) library for wrapping each widget of the dashboard. This component will be responsible for managing the positioning, dragging and resizing of the widgets. The component takes in an **`item`** object (of type [`GridsterItem`](https://github.com/tiberiuzuld/angular-gridster2/blob/master/projects/angular-gridster2/src/lib/gridsterItem.interface.ts)).
- `<sq-dashboard-item>`: A Sinequa component that is defined in the Pepper app (`app/dashboard/dashboard-item.component.ts`). This component is essentially a switch to display the right component in function of the widget type. The widget type is passed via the **`config`** input. Notice that the `item` input of `<gridster-item>` is also used for this `config` input. This is because we chose to use a single object to manage both the state of the widget ([`GridsterItem`](https://github.com/tiberiuzuld/angular-gridster2/blob/master/projects/angular-gridster2/src/lib/gridsterItem.interface.ts) interface) and its configuration (`DashboardItem` interface). The `DashboardItem` interface is in fact a direct extension of [`GridsterItem`](https://github.com/tiberiuzuld/angular-gridster2/blob/master/projects/angular-gridster2/src/lib/gridsterItem.interface.ts).

Notice in the snippet above that the list of items, as well the options of the dashboard, are managed by a new `DashboardService`. This service is a Sinequa service that lives in the Pepper app (`app/dashboard/dashboard.service.ts`).

This service manages the following tasks:

- Storing the state of the dashboard and its global options.
- Generating the dashboard menu shown above (`createDashboardActions()` method).
- Saving, opening, deleting and sharing dashboards. The list of dashboards is persisted in the [User Settings]({{site.baseurl}}tipstricks/user-settings.html).
- Managing URL changes / navigation, when a dashboard is opened, saved, deleted or imported.
- Editing the dashboard (adding or removing items).
- Emitting events when the dashboard changes.

## Adding new widgets

Pepper is meant to be customized easily, especially to let developers create new types of widgets, either generic or specific to their project.

Adding a widget will impact several parts of the code:

- The widget must be displayed within an existing component.
- The widget must be created somewhere in the application (upon initialization or user action).
- The widget must be synchronized with other widgets and the results list.
- The widget might have properties needing to be persisted.

### Widget display

The widget's display must be implemented in the `sq-dashboard-item` component (`app/dashboard/dashboard-item.component`). The template of this component is composed of a `sq-facet-card` (see [facets](../components/facet.html)) wrapping a Switch-Case directive to display the desired component (either a chart, map, network, etc.). Therefore, adding a new component means simply adding a new "case" such as:

```html
<my-custom-widget *ngSwitchCase="'my-custom-type'" [results]="results">
</my-custom-widget>
```

Your widget might require other input parameters, that you can create and manage inside `dashboard-item.component.ts` (generally, binding the global `results` as an input of your component is needed to refresh the widget upon new results). The component might also generate events, which you will want to handle in the controller as well.

### Widget creation / initialization

The creation of the widget can occur in different ways:

  1. By clicking the "Add Widget" button and selecting your widget type.
  2. On initialization, when a default dashboard is created.
  3. Upon another type of user action (eg. we open the preview when the user selects a document).

In any case, it is necessary to create a `DashboardItemOption`, an object consisting of a widget's `type`, `name`, `icon` and a `unique` property (that can prevent users from creating two components of this type). Existing dahsboard options are defined in the `DashboardService`.

For example, the option to create a "Map" widget is as follow:

```ts
export const MAP_WIDGET: DashboardItemOption = {
    type: 'map',
    icon: 'fas fa-globe-americas fa-fw',
    text: 'Map',
    unique: true
};
```

To include a new widget via the "Add Widget" button, simply include your `DashboardItemOption` in the list passed to the `createDashboardActions()` method, which looks as follows in the search component. The service will include these options in the modal displayed when clicking on the "Add Widget" button (`sq-dashboard-add-item` component).

```ts
// The modal will propose to create maps, timelines, network, charts and heatmap (some of these must be unique though)
this.dashboardService.createDashboardActions([MAP_WIDGET, TIMELINE_WIDGET, NETWORK_WIDGET, CHART_WIDGET, HEATMAP_WIDGET]);
```

To include a new widget on initialization (in the "default" dashboard), add it to the list passed to the `setDefaultDashboard()` method. By default it looks as follows (in the search component):

```ts
// The default dashboard includes a map, timeline, network and chart
this.dashboardService.setDefaultDashboard([MAP_WIDGET, TIMELINE_WIDGET, NETWORK_WIDGET, CHART_WIDGET]);
```

Finally, if you want to add a widget programmatically, just pass your dashboard option to the `addWidget()` method:

```ts
// This adds a new widget with default size to the curent dashboard (ptional arguments can be passed to set the size and other settings)
this.dashboardService.addWidget(PREVIEW_WIDGET);
```

This method returns the `item` object (of type `DashboardItem`) that will be passed to the `sq-dashboard-item` component. You can add or modify properties of this `item`: This is useful if your widget expects specific types of inputs. For example, the preview widget requires a record `id` that is not available from the other inputs of the `DashboardItem` component.

### Widget synchronization

The way the built-in widgets are designed is actually to **avoid explicit synchronization**, that is: to do nothing and keep the components independent from each other.

However, it is clear when using Pepper that *some form of synchronization happens* when the user interacts with a component. For example, if I use the map to filter the search results, all the other components that display parts of the results are updated.

The way it works is that the widgets **respond only to an update of the global results**. Widgets cannot talk to each other, but some user interactions (like selecting an area on the map) can trigger a refresh of the global results (which itself triggers a refresh of the widgets).

Similarly, widgets can listen to other types of global events. For example, the `SelectionService` keeps track of documents selected via their `sq-result-selector` checkbox (See [Selection](../components/selection.html)). If a widget displays a document in one form or another (like a pin on the map), it can update the pin display when the document becomes selected, and conversely select the document when the user clicks on the pin.

### Widget persistence

### Widget sizing

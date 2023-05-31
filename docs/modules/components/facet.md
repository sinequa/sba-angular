---
layout: default
title: Facet Module
parent: Components
grand_parent: Modules
nav_order: 3
---

# Facet Module

*Facets* refer to the filters used to narrow down the results in a search interface (See [*Faceted Search*](https://en.wikipedia.org/wiki/Faceted_search)). In the SBA framework, the definition can extend more generally to other types of components that augment the search experience.

The standard facets (list, tree...), need data from the server. This data comes in the form of **aggregations** in the results ([`Results`]({{site.baseurl}}core/interfaces/Results.html)) returned by the [`QueryWebService`]({{site.baseurl}}core/injectables/QueryWebService.html). These aggregations are configured on the server in the [**Query web service**]({{site.baseurl}}gettingstarted/server-setup.html#query-web-service).

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/BsFacetModule.html) auto-generated from source code.

The Facet module is also documented in the [tutorial]({{site.baseurl}}tutorial/facet-module.html).

## Features

This modules provides:

- [`FacetService`]({{site.baseurl}}components/injectables/FacetService.html): A service to manage data for the facet components and modify the search criteria (via the [`SearchService`]({{site.baseurl}}components/injectables/SearchService.html)).
- [`sq-facet-card`]({{site.baseurl}}components/components/BsFacetCard.html) and [`AbstractFacet`]({{site.baseurl}}components/components/AbstractFacet.html): A flexible API for creating custom facets.
- A list of diverse facet components using the above facet API. These components are generally styled with the Bootstrap library, and their class names start with `Bs`.

## Import

Import this module in your `app.module.ts`. Optionally include lists of of dynamic facet configuration via the `forRoot()` method.

```ts
import { BsFacetModule } from '@sinequa/components/facet';

@NgModule({
  imports: [
    ...
    BsFacetModule
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enFacet} from "@sinequa/components/facet";

const messages = Utils.merge({}, ..., enFacet, appMessages);
```

## Facet Card API

### Standard usage

The facet card API is based on a generic **container** component, [`sq-facet-card`]({{site.baseurl}}components/components/BsFacetCard.html), and an **abstract facet** component for the content of the facets ([`AbstractFacet`]({{site.baseurl}}components/components/AbstractFacet.html)):

- The container displays the frame, icon, title, action buttons *around* the facet.
- The content can be any Angular template displayed *within* the facet. If the content extends [`AbstractFacet`]({{site.baseurl}}components/components/AbstractFacet.html), the container will automatically detect its dynamic list of actions (and other features) and display them.

For example, the [`sq-facet-list`]({{site.baseurl}}components/components/BsFacetList.html) component extends [`AbstractFacet`]({{site.baseurl}}components/components/AbstractFacet.html). The component implements the `get actions()` method to provide a list of actions, which are dynamically displayed when you select facet items within the facet.

![Facet card and content]({{site.baseurl}}assets/modules/facet/facet-api.png){: .d-block .mx-auto width="350px"}

```html
<sq-facet-card [title]="'Geography'" [icon]="'fas fa-globe-americas'" [expandable]="true">
    <sq-facet-list #facet [results]="results" [aggregation]="'Geo'"></sq-facet-list>
</sq-facet-card>
```

Notice the list of **actions** returned by `get actions()` in [`BsFacetList`](https://github.com/sinequa/sba-angular/blob/master/projects/components/facet/bootstrap/facet-list/facet-list.ts) (a method of [`AbstractFacet`]({{site.baseurl}}components/components/AbstractFacet.html)):

```ts
get actions(): Action[] {

    let actions: Action[] = [];

    let selected = this.getSelectedItems();

    if(!this.hasSuggestions() && selected.length > 0) {
        ...
    }

    if(!this.hasSuggestions() && this.hasFiltered()) {
        actions.push(this.clearFilters);
    }

    return actions;
}
```

The API is very flexible and allows for very different types of facets:

![Custom Facets]({{site.baseurl}}assets/modules/facet/facets.png)

### Multiple views

It is possible to inject multiple views inside the same facet card. Views need to be wrapped inside an `ng-template` augmented with the `sqFacetView` directive.

For example, one might want to display an aggregation viewed as a facet list OR as a chart.

```html
<sq-facet-card [title]="'Geography'" [icon]="'fas fa-globe-americas'">

    <!-- List view -->
    <ng-template [sqFacetView]="{icon: 'fas fa-list', title: 'List view'}">
        <sq-facet-list #facet [results]="results" [aggregation]="'Geo'"></sq-facet-list>
    </ng-template>

    <!-- Chart view -->
    <ng-template [sqFacetView]="{icon: 'fas fa-chart-bar', title: 'Chart view'}">
        <sq-fusion-chart #facet [results]="results" [aggregation]="'Geo'"></sq-fusion-chart>
    </ng-template>

</sq-facet-card>
```

The template above results in the following display:

![Multiple views]({{site.baseurl}}assets/modules/facet/views.png){: .d-block .mx-auto}

Adding/removing views is as easy as modifying the list of `ng-template`s injected into the facet card. The `[sqFacetView]` input is an `Action` object that is used to display the buttons to toggle between views.

### Template customization

It is possible to inject `ng-template`s to customize specific parts of the facet card:

- The header template (`#headerTpl`)
- The "sub-header" template (`#subHeaderTpl`)
- The footer template (`#footerTpl`)
- The settings template (`#settingsTpl`)

```html
<sq-facet-card actionsClass="ms-auto">

    <sq-facet-list #facet [results]="results" [aggregation]="'Geo'"></sq-facet-list>

    <ng-template #headerTpl><i>Custom header</i></ng-template>
    <ng-template #subHeaderTpl><i>Custom sub-header</i></ng-template>
    <ng-template #footerTpl><i>Custom footer</i></ng-template>
    <ng-template #settingsTpl><i>Custom settings</i></ng-template>

</sq-facet-card>
```

This results in the following view (notice the settings button in the top right, which displays the settings template):

![Custom templates]({{site.baseurl}}assets/modules/facet/templates.png)

Note that these templates can be injected in 2 different ways:

- Either injected by the parent, as in the example above
- Or defined in the child component's template (in the example above, it would be the `sq-facet-list` component). The child component (which extends `AbstractFacet`) can thus customize its display, when embedded in a facet card, without requiring the parent to do anything.

### Custom actions display

By default all actions are displayed in the facet card's top-right corner. These actions may come from different places:

- the `[actions]` input of the facet card
- the `get actions()` method of the child component (`AbstractFacet`)
- the different views injected in the facet
- specific options of the facet card, like `[collapsible]="true"`

For complex components, the number of buttons can grow quickly and become overwhelming or confusing. For this reason it is possible to split these actions into 3 separate groups, each with their own set of options:

- Primary actions (displayed in the top-right corner)
- Secondary actions (displayed under the primary actions)
- View actions to toggle between views (displayed in the bottom-left corner)

Secondary actions can be defined in two ways:

- The `[secondaryActions]` input of the facet card.
- Taken from the child component (`AbstractFacet`), via the `[facetActionsAreSecondary]="true"` option of the facet card.

View actions are displayed separately with the `[viewActionsAreSecondary]="true"` option of the facet card.

A complete example is the display of the preview:

```html
<!-- With selected document -->
<sq-facet-card class="mb-3 facet-preview"
    [actions]="previewCustomActions"
    actionsSize=""

    [facetActionsAreSecondary]="true"
    secondaryActionsClass="position-absolute end-0 btn-group-vertical mt-4 me-3 bg-light rounded shadow on-hover"

    [viewActionsAreSecondary]="true"
    viewActionsClass="d-block btn-group mt-2"
    viewButtonsStyle="outline-primary">

    <ng-template #headerTpl>
        <sq-result-title class="flex-grow-1" [record]="openedDoc" field="title" titleLinkBehavior="open-if-url">
        </sq-result-title>
    </ng-template>

    <ng-template #subHeaderTpl>
        <sq-metadata [record]="openedDoc" [items]="metadata" [showTitles]="false" [showIcons]="true"
            [tabular]="false" [clickable]="false">
        </sq-metadata>
    </ng-template>

    <ng-template [sqFacetView]="{text: 'msg#facet.preview.viewPreview'}">
        <sq-facet-preview-2 #facet [record]="openedDoc" [query]="searchService.query" [height]="750"
            (previewLoaded)="previewReady($event)">
        </sq-facet-preview-2>
    </ng-template>

    <ng-template [sqFacetView]="{text: 'msg#facet.preview.viewPassages'}" [default]="!!passageId"
        *ngIf="openedDoc.$hasPassages" #passagesList>
        <sq-passage-list [record]="openedDoc" [passageId]="passageId"></sq-passage-list>
    </ng-template>
</sq-facet-card>
```

This results in the following view (notice the custom positioning of the secondary actions made possible by the `[secondaryActionsClass]` input):

![Custom actions]({{site.baseurl}}assets/modules/facet/actions.png)

## Facet containers

It is possible to display facets in other types of containers besides the simple facet card:

- The facet bar component displays a list of facets in a column.
- The "multi-facet" component displays one facet at a time, and menu to switch between them.
- The "facet filters" component displays facets as a horizontal bar with dropdown menus.

These containers share a similar API. In particular, they require:
- A list of facet configuration objects ([`FacetConfig<T>`]({{site.baseurl}}components/interfaces/FacetConfig.html)).
- The Angular components instantiated within these containers, for each facet type.

Each facet requires a set of inputs. These inputs are included within the `FacetConfig` interface. For example, for a list facet the facet configuration looks like this:

```ts
const config: FacetConfig<FacetListParams> = {
    name: "myfacet",
    title: "My facet",
    type: "list",
    parameters: {
        aggregation: "MyAggregation",
        showCount: true,
        searchable: true
    }
}
```

The `FacetConfig` interface has a part that is common to all facets:
- `type` defines the type of component to be displayed
- `title` and `icon` define what is displayed in the facet header
- `includedTabs` and `excludedTabs` allow to list the tabs (from the `results` object) in which this facet should be displayed.

The `parameters` property is specific to the component `type`. In the example above, its type is [`FacetListParams`]({{site.baseurl}}components/interfaces/FacetListParams.html), which corresponds to the configuration of a `"list"` facet component.

The Angular components displayed by the containers is provided as a `MapOf<Type<any>>`. By default, the containers support the standard components from the `@sinequa/components/facet` module:

```ts
const default_facet_components: MapOf<Type<any>> = {
    "list": BsFacetList,
    "tree": BsFacetTree,
    "my-search": BsMySearch,
    "range": BsFacetRange,
    "refine": BsRefine,
    "tag-cloud": BsFacetTagCloud
}
```

But this list can be extended, to include components from other modules:

```ts
import { BsFacetDate } from '@sinequa/analytics/timeline';

public facetComponents = {
    ...default_facet_components,
    "date": BsFacetDate
};
```

And in the template:

```html
<sq-facet-bar [results]="results" [facetComponents]="facetComponents">
</sq-facet-bar>
```

### Facet Bar

<!-- <doc-facet-bar></doc-facet-bar> -->

The [`sq-facet-bar`]({{site.baseurl}}components/components/BsFacetBar.html) component is a container which can display a dynamic list of facets.

The [Facet Service](#facet-service) manages the list of facets displayed in the facet bar. The service allows adding, moving and removing facets dynamically. The facets' configuration and list of facets displayed by default must be injected in the Facet Service by calling `BsFacetModule.forRoot()` in your `app.module.ts`:

```ts
// List of facet configurations (of type list and tree)
export const allFacets: FacetConfig<FacetListParams | FacetTreeParams>[] = [
  {
    name: "facet1",
    type: "list",
    parameters: {
      aggregation: "Aggregation1"
    }
  },
  {
    name: "facet2",
    type: "tree",
    parameters: {
      aggregation: "Aggregation2"
    }
  }
];

// List of default facets displayed (only facet2 is displayed here)
export const defaultFacets: FacetState[] = [
  {name: "facet2", position: 0}
];


@NgModule({
  imports: [
    ...,
    BsFacetModule.forRoot(allFacets, defaultFacets)
  ]
})
```

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input and optionally a list of custom components (`facetComponents`).

```html
<sq-facet-bar [results]="results" [facetComponents]="facetComponents">
</sq-facet-bar>
```

It is also possible to insert static content which will be displayed at the top of the facet bar.

```html
<sq-facet-bar [results]="results" [facetComponents]="facetComponents">

    <!-- Static facet -->
    <sq-facet-card [title]="'Sources'" [icon]="'fas fa-sitemap'">
        <sq-facet-tree #facet [results]="results" [aggregation]="'Treepath'"></sq-facet-tree>
    </sq-facet-card>

</sq-facet-bar>
```

### Multiple-type Facet

The "multiple-type" facet [`sq-facet-multi`]({{site.baseurl}}components/components/BsFacetMultiComponent.html) displays multiple types of metadata in the same facet. The user selects the type of metadata, which then changes the view of the facet into one of the classical views above.

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input, the list of the `facets` configuration (equivalent to the `allFacets` list of the [facet bar](#facet-bar) above), and optionally a list of custom components (`facetComponents`). The title and icon of the facet card need to be set dynamically, as a function of the currently selected metadata.

<doc-facet-multi></doc-facet-multi>

### Facet Filters

<!-- <doc-facet-filters></doc-facet-filters> -->

The [`sq-facet-filters`]({{site.baseurl}}components/components/BsFacetFilters.html) components displays facets as a navigation bar where each item is a facet displayed as a dropdown component.

![Facet Filters]({{site.baseurl}}assets/modules/facet/facet-filters.png){: .d-block .mx-auto}

This component requires a:
  - [`Results`]({{site.baseurl}}core/interfaces/Results.html) input.
  - [`FacetConfig<T>[]`]({{site.baseurl}}components/interfaces/FacetConfig.html): A list of facets' configuration. This list can be passed directly via the `[facets]` input (as for the [Multiple type facet](#multiple-type-facet)). Or it can be injected with the `BsFacetModule.forRoot()` method (as for the [Facet bar](#facet-bar)). This 2nd option is interesting when `enableCustomization` is set to `true`.
  - `facetComponents`: Optionally, a list of custom components.
  - `enableCustomization`: Optionally, turns on user customization of the list of facets displayed in the component.


```html
<nav class="navbar navbar-expand">
    <sq-facet-filters [results]="results" [facets]="facets" [facetComponents]="facetComponents"></sq-facet-filters>
</nav>
```

## Facet Service

The [`FacetService`]({{site.baseurl}}components/injectables/FacetService.html) provides the following functionality:

- Provide access to the **facet data**, via the following methods:
  - `facetService.getAggregation(aggregation name, results)`: Returns the [`Aggregation`]({{site.baseurl}}core/interfaces/Aggregation.html) from the results (and takes care of initializing the aggregation items).
  - `facetService.getTreeAggregation(facet name, aggregation name, results)`: Returns the [`TreeAggregation`]({{site.baseurl}}core/interfaces/Aggregation.html) from the results (and takes care of initializing the tree aggregation items).
  - `facetService.getAggregationCount(aggregation name)`: Returns the "count" parameter of a given aggregation, as configured on the server.
  - `facetService.open(facet name, aggregation, item)`: Opens a collapsed node item in a tree aggregation (queries the server for the data inside that node).
  - `facetService.loadData(aggregation name, skip, count)`: Loads more data from the server to append at the end of a list aggregation.
- Add and remove **search filters** (When a user clicks on an aggregation item in a facet):
  - `facetService.addFilterSearch(facet name, aggregation, selected items)`: Add a filter to the query for a given facet and aggregation, and refresh the search.
  - `facetService.removeFilterSearch(facet name, aggregation, selected items)`: Remove a filter from the query for a given facet and aggregation, and refresh the search.
  - `facetService.clearFiltersSearch(facet name, all?)`: Clears filters from a facet, and refresh the search.
  - `facetService.hasFiltered(facet name)`: Returns whether a facet has any active filter.
  - `facetService.itemFiltered(facet name, aggregation, selected item)`: Returns whether a given facet *item* is currently filtered.
- Manage the presence/absence of facets in **dynamic containers** like the facet bar component (the states of dynamic facet is stored in the User Settings):
  - `facetService.isFacetOpened(facet name)`: Test whether a facet is visible in a container.
  - `facetService.addFacet(facet state)`: Add a facet to a container.
  - `facetService.removeFacet(facet state)`: Remove a facet from a container.

## Components

### List Facet

The [`sq-facet-list`]({{site.baseurl}}components/components/BsFacetList.html) component displays a regular list of metadata (aggregation). The user can click on items in the list to filter the results.

<doc-facet-list></doc-facet-list>

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input and the name of the aggregation to work properly.

The full list of inputs is:

   - `results`: The current search results.
   - `aggregation`: The name of the regular list of metadata.
   - `name`: The name of the search filter associated to this facet. If ommited, the aggregation name is used.
   - `showCount`: (**true** by default) Show/hide the number of occurrences.
   - `searchable`: (**true** by default) Whether the component allows to search for items in it.
   - `allowExclude`: (**true** by default) Allow to exclude selected items.
   - `allowOr`: (**true** by default) Allow to search various items in OR combination.
   - `allowAnd`: (**true** by default) Allow to search various items in AND combination.
   - `displayEmptyDistributionIntervals`: (**false** by default) If the aggregration is a distribution, then this property defines whether empty distribution intervals should be displayed.
   - `displayActions`: (**false** by default) Show/hide component's actions.
   - `showProgressBar`: (**false** by default) Allow to display item count as proportional progress bar.
   - `acceptNonAggregationItemFilter`: (**true** by default) When false, filtered items which don't match an existing aggregation item, should not be added to the filtered list.
   - `replaceCurrent`: (**false** by default) If true, the current search filter associated to this facet will be cleared and replaced by the new value.

This component can be used in two ways :

  - Basic angular component and input bindings (as the example above)
  - By transclusion within a parent component. This approach requires a config object implementing the `FacetListConfig` interface.

### Tree Facet

The [`sq-facet-tree`]({{site.baseurl}}components/components/BsFacetTree.html) component displays a hierarchical list of metadata (tree aggregation). The user can click on items in the list to filter the results.

![Tree facet]({{site.baseurl}}assets/modules/facet/facet-tree.png){: .d-block .mx-auto}

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input and the name of the aggregation to work properly.

The full list of inputs is:

   - `results`: The current search results.
   - `aggregation`: The name of the regular list of metadata.
   - `name`: The name of the search filter associated to this facet. If ommited, the aggregation name is used.
   - `showCount`: (**true** by default) Show/hide the number of occurrences.
   - `searchable`: (**true** by default) Whether the component allows to search for items in it.
   - `allowExclude`: (**true** by default) Allow to exclude selected items.
   - `allowOr`: (**true** by default) Allow to search various items in OR combination.
   - `displayActions`: (**false** by default) Show/hide component's actions.
   - `expandedLevel`: (**2** by default) Allow to display item count as proportional progress bar.
   - `forceMaxHeight`: (**true** by default) Allow to display a scrollbar automatically on long list items.

This component can be used in two ways :

  - Basic angular component and input bindings

  ```html
  <sq-facet-card [title]="'Sources'" [icon]="'fas fa-sitemap'">
      <sq-facet-tree #facet [results]="results" [aggregation]="'Treepath'"></sq-facet-tree>
  </sq-facet-card>
  ```

  - By transclusion within a parent component. This approach requires a config object implementing the `FacetTreeConfig` interface.

### Range Facet

The [`sq-facet-range`]({{site.baseurl}}components/components/BsFacetRange.html) component displays a slider to select a range of values for a numerical (eg. document size) or temporal (eg. modified date) metadata.

<doc-facet-range></doc-facet-range>

The full list of inputs is:

   - `results`: The current search results.
   - `aggregation`: The name of the regular list of metadata.
   - `name`: The name of the search filter associated to this facet. If ommited, the aggregation name is used.
   - `min`: Minimum authorized value of the range.
   - `max`: Maximum authorized value of the range.
   - `stepDefs`: Allow to exclude selected items.

This component can be used in two ways :

  - Basic angular component and input bindings (as the example above)
  - By transclusion within a parent component. This approach requires a config object implementing the `FacetRangeConfig` interface.

### My Search Facet

The "My Search" facet [`sq-mysearch`]({{site.baseurl}}components/components/BsMySearch.html) displays the current list of search criteria (similar to the [breadcrumbs component](search.html#breadcrumbs)).

![My search facet]({{site.baseurl}}assets/modules/facet/facet-mysearch.PNG){: .d-block .mx-auto}

The inputs of the component are:

  - `results`: The results of the current search.
  - `allowDeletion`: (**true** by default) Display icon to delete items.
  - `displayFieldNames`: (**false** by default) Display each item's field.
  - `collapsible`: (**false** by default) Make the div collapsible. It makes sens if used as breadcrumb.
  - `useBadges`: (**false** by default) Add a badge likely style to items.
  - `ignoreText`: (**true** by default) Ignore the search text and fielded search from being displayed.
  - `excludedFacets`: (**["search-form"]** by default) Search filters originated from those facets will be excluded.

This component can be used in different ways :

  - Basic angular component and input bindings

  ```html
  <sq-facet-card [title]="'My Search'" [icon]="'fas fa-info'">
      <sq-facet-mysearch #facet [results]="results"></sq-facet-mysearch>
  </sq-facet-card>
  ```

  Or as breadcrumbs, use the following :

  ```html
  <div class="d-flex flex-row align-items-center flex-wrap">
      <sq-facet-mysearch [results]="results" class="flex-grow-1 flex-basis-0"></sq-facet-mysearch>
  </div>
  ```

  - By transclusion within a parent component. This approach requires a config object implementing the `FacetMySearchConfig` interface.

### Refine Facet

The [`sq-refine`]({{site.baseurl}}components/components/BsRefine.html) component displays a secondary search form, including an autocomplete, to add a fulltext search criteria to a query, without removing the active filters.

<doc-refine></doc-refine>

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input. If the autocomplete is enabled, all the parameters of the [autocomplete directive](autocomplete.html) should be provided to this component.

The full list of inputs is:

   - `results`: The current search results.
   - `autocompleteEnabled`: Whether or not to enable autocompletion.
   - `suggestQuery`: Suggest query with which to perform autocompletion.
   - `suggestDelay`: (**200** by default) Minimum delay (in ms) between suggest queries.

This component can be used in two ways :

  - Basic angular component and input bindings (as the example above)
  - By transclusion within a parent component. This approach requires a config object implementing the `FacetRefineConfig` interface.


### Tag Cloud Facet

The [`sq-facet-tag-cloud`]({{site.baseurl}}components/components/BsFacetTagCloud.html) displays multiple types of metadata in the same facet. It provides a direct access to the most relevant filters, belonging to the supplied metadata.

<doc-facet-tag-cloud></doc-facet-tag-cloud>

The inputs of the component are:

  - `results`: The results of the current search.
  - `aggregations`: List of aggregations to be considered in collecting data.
  - `limit`: (**50** by default) Maximum number of data to be displayed.
  - `uniformRepartition`: (**false** by default) Define the way data are collected from given aggregations: equal repartition between them or most relevant among all of them.
  - `showCount`: (**false** by default) show/hide number of occurrences of each item.
  - `proportionalWeight`: (**true** by default) Define the size of each displayed item: common size for all or proportional size based on item's count.
  - `countThreshold`: (**0** by default) Lowest count under which items will not be taken into account.
  - `shuffleData`: (**false** by default) Wether data are rendered sorted according to their count or randomly.
  - `isolateFacetFilters`: (**false** by default) Isolate tag-cloud filters from other facets.

This component can be used in two ways :

  - Basic angular component and input bindings (as the example above)
  - By transclusion within a parent component. This approach requires a config object implementing the `FacetTagCloudConfig` interface.

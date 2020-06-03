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
- [`sq-facet-card`]({{site.baseurl}}components/components/BsFacetCard.html) and [`AbstractFacet`]({{site.baseurl}}components/classes/AbstractFacet.html): A flexible API for creating custom facets.
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

## Facet Card API

The facet card API is based on a generic **container** component, [`sq-facet-card`]({{site.baseurl}}components/components/BsFacetCard.html), and an **abstract facet** component for the content of the facets ([`AbstractFacet`]({{site.baseurl}}components/classes/AbstractFacet.html)):

- The container displays the frame, icon, title, action buttons *around* the facet.
- The content can be any Angular template displayed *within* the facet. If the content extends [`AbstractFacet`]({{site.baseurl}}components/classes/AbstractFacet.html), the container will automatically detect its dynamic list of actions (and other features) and display them.

For example, the [`sq-facet-list`]({{site.baseurl}}components/components/BsFacetList.html) component extends [`AbstractFacet`]({{site.baseurl}}components/classes/AbstractFacet.html). The component implements the `get actions()` method to provide a list of actions, which are dynamically displayed when you select facet items within the facet.

![Facet card and content]({{site.baseurl}}assets/modules/facet/facet-api.png){: .d-block .mx-auto width="350px"}

```html
<sq-facet-card [title]="'Geography'" [icon]="'fas fa-globe-americas'" [expandable]="true">
    <sq-facet-list #facet [results]="results" [aggregation]="'Geo'"></sq-facet-list>
</sq-facet-card>
```

Notice the list of **actions** returned by `get actions()` in [`BsFacetList`](https://github.com/sinequa/sba-angular/blob/master/projects/components/facet/bootstrap/facet-list/facet-list.ts) (a method of [`AbstractFacet`]({{site.baseurl}}components/classes/AbstractFacet.html)):

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

![List facet]({{site.baseurl}}assets/modules/facet/facet-list.png){: .d-block .mx-auto}

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input and the name of the aggregation to work properly.

```html
<sq-facet-card [title]="'Geography'" [icon]="'fas fa-globe-americas'" [expandable]="true">
    <sq-facet-list #facet [results]="results" [aggregation]="'Geo'"></sq-facet-list>
</sq-facet-card>
```

### Tree Facet

The [`sq-facet-tree`]({{site.baseurl}}components/components/BsFacetTree.html) component displays a hierarchical list of metadata (tree aggregation). The user can click on items in the list to filter the results.

![Tree facet]({{site.baseurl}}assets/modules/facet/facet-tree.png){: .d-block .mx-auto}

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input and the name of the aggregation to work properly.

```html
<sq-facet-card [title]="'Sources'" [icon]="'fas fa-sitemap'">
    <sq-facet-tree #facet [results]="results" [aggregation]="'Treepath'"></sq-facet-tree>
</sq-facet-card>
```

### Multiple-type Facet

The "multiple-type" facet [`sq-facet-multi`]({{site.baseurl}}components/components/BsFacetMulti.html) displays multiple types of metadata in the same facet. The user selects the type of metadata, which then changes the view of the facet into one of the classical views above.

![Multi facet]({{site.baseurl}}assets/modules/facet/facet-multi.png){: .d-block .mx-auto}

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input and the list of configuration of the facets ([`FacetConfig`]({{site.baseurl}}components/interfaces/FacetConfig.html)). The title and icon of the facet card need to be set dynamically, as a function of the currently selected metadata (See the [Vanilla-Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html) application for a concrete example).

```html
<sq-facet-card [title]="multiFacetTitle" [icon]="multiFacetIcon">
    <sq-facet-multi #facet [results]="results" [facets]="facets"></sq-facet-multi>
</sq-facet-card>
```

### Range Facet

The [`sq-facet-range`]({{site.baseurl}}components/components/BsFacetRange.html) component displays a slider to select a range of values for a numerical (eg. document size) or temporal (eg. modified date) metadata.

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input, the name of the aggregation and min and max values (as strings).

```html
<sq-facet-card [title]="'Range'">
    <sq-facet-range #facet [results]="results" [aggregation]="'modified'" [min]="'2017-01-01'" [max]="'2022-01-01'"></sq-facet-range>
</sq-facet-card>
```

### My Search Facet

The "My Search" facet [`sq-mysearch`]({{site.baseurl}}components/components/BsMySearch.html) displays the current list of search criteria (similar to the [breadcrumbs component](search.html#breadcrumbs)).

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input.

```html
<sq-facet-card [title]="'My Search'" [icon]="'fas fa-info'">
    <sq-mysearch #facet [results]="results"></sq-mysearch>
</sq-facet-card>
```

### Refine Facet

The [`sq-refine`]({{site.baseurl}}components/components/BsRefine.html) component displays a secondary search form, including an autocomplete, to add a fulltext search criteria to a query, without removing the active filters.

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input. If the autocomplete is enabled, all the parameters of the [autocomplete directive](autocomplete.html) should be provided to this component.

```html
<sq-facet-card [title]="'Refine'" [icon]="'fas fa-info'">
    <sq-refine #facet [results]="results"></sq-refine>
</sq-facet-card>
```

### Facet Bar

The [`sq-facet-bar`]({{site.baseurl}}components/components/BsFacetBar.html) component is a container which can display a dynamic list of facets managed by the [Facet Service](#facet-service). The facets' configuration and list of facets displayed by default must be injected in the Facet Service by calling `BsFacetModule.forRoot([...], [...])` in your `app.module.ts`. Then you can add or remove facets by calling the appropriate method in the Facet service.

This component requires at least a [`Results`]({{site.baseurl}}core/interfaces/Results.html) input. It is also possible to insert static content which will be displayed at the top of the facet bar.

```html
<sq-facet-bar [results]="results">

    <!-- Static facet -->
    <sq-facet-card [title]="'Sources'" [icon]="'fas fa-sitemap'">
        <sq-facet-tree #facet [results]="results" [aggregation]="'Treepath'"></sq-facet-tree>
    </sq-facet-card>

</sq-facet-card>
```

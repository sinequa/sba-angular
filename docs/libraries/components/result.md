---
layout: default
title: Result Module
parent: Components
grand_parent: Libraries
nav_order: 2
---

# Result Module

## Features

This module provides simple components to easily display the different fields of a document/result/record (object of type `Record`).

These components do **not** depend on a styling framework like Bootstrap, nor on a global stylesheet.

![Result item]({{site.baseurl}}assets/modules/result/result-item.png){: .d-block .mx-auto }

## Import

Import this module in your `app.module.ts`.

```ts
import { ResultModule } from '@sinequa/components/result';

@NgModule({
  imports: [
    ...
    ResultModule
```

This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's `src/locales/en.ts`:

```ts
...
import {enResult} from "@sinequa/components/result";

const messages = Utils.merge({}, ..., enResult, appMessages);
```

## Components

### Title

The `sq-result-title` component displays the title of a document. More precisely, it displays the `record.displayTitle` (formatted value) or `record.title` (raw value), or a custom field (`field` input).

<doc-result-title></doc-result-title>

When the title is clicked, various behaviour are possible (`titleLinkBehavior` field):

- `'open'` (default): The title is a regular link pointing at `record.url1` if it exists (the `titleClicked` event fires for information and an audit event is emitted).
- `'action'`: the title is a link pointing at no URL, the action is custom and must be performed by the parent via the `titleClicked` event.

### Source

The `sq-result-source` component displays the treepath (`record.treepath`) and URL (`record.url1`) of a document.

<doc-result-source></doc-result-source>

### Extracts

The `sq-result-extracts` component displays the relevant extracts of a document in a summarized form (`record.relevantExtracts`) or raw form (`record.extracts`). It can also display the `record.text` if that field is configured in the Query web service. It also displays the modified date of a document (`record.modified`).

<doc-result-extracts></doc-result-extracts>

### Thumbnail

The `sq-result-thumbnail` component displays the thumbnail of a document, if it exists. The behavior of a thumbnail click is similar to the [title](#title) component.

<doc-result-thumbnail></doc-result-thumbnail>

### Icon

The `sq-result-icon` component displays the icon of a document, defined by its **file extension** (`record.fileExt`). This component simply inserts a `<span>` element with a class name including the file extension. You need to map these extensions to actual icons in your stylesheet. In [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html), this is done with [Font Awesome](https://fontawesome.com/) icons, via the [`src/styles/icons.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/styles/icons.scss) stylesheet.

<doc-result-icon></doc-result-icon>

### Missing terms

The `sq-missing-terms` component displays the list of terms in the user's query that are *not* found in the document.

<doc-result-missing-terms></doc-result-missing-terms>

### Sponsored Results

The `sq-sponsored-results` component displays the sponsored links relevant for a user query (using the `SponsoredLinksWebService`). The configuration of these links must be done in the Sinequa administration.

![Sponso]({{site.baseurl}}assets/modules/result/sponso.png){: .d-block .mx-auto }

```html
<sq-sponsored-results [query]="searchService.query"></sq-sponsored-results>
```

<!-- <doc-sponsored-results></doc-sponsored-results> -->

Note that, in the background, the `SponsoredLinksWebService` makes a call to the `query.links` API endpoint, every time the query text is modified (which does not include clicks on facets for example).

The configuration of the links is done as depicted below in the Sinequa administration. Notice the bottom-right buttons to edit the properties of each link (including their thumbnail). See the general documentation about [Sponsored Links](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-ui-sponsored-links.html).

![Sponso configuration]({{site.baseurl}}assets/modules/result/sponso-config.png){: .d-block .mx-auto }

### User ratings

The `sq-user-rating` component displays the rating of a given document in the form of a number of stars. Users can assign a rating to a document by clicking on a star: This stores each user's rating (as a number) in the engine metadata store, and additionally it computes the average rating from all users (which is stored in a different column).

<doc-user-rating></doc-user-rating>

Note that the column names are **case sensitive** (should always be lower case), and aliases are **not** supported.

In the background, the component uses the `UserRatingsWebService` to update the engine metadata store. This web service has no configuration on the backend (at the moment). This is why it is required to pass the index column names to the component directly.

As a pre-requisite, an Engine Metadata store must exist on the backend, and the `engine*` columns must have been created. Note that the `ratingsColumn` should normally be an `engineusercsv` column, since it needs to store the rating for each user. Whereas the `averageColumn` should be an `enginecsv` column to store the average for all users (See [Implementing the Engine Metadata](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.how-to.engine-metadata.html)).

⚠️ Note that inserting user ratings in your SBA has no direct effect on the relevance computed by the engine. To influence the relevance (= the ranking of results), you must configure your Query web service to boost or penalize rated documents:

![Relevance rating]({{site.baseurl}}assets/modules/result/rating-relevance.png){: .d-block .mx-auto }

The `sq-user-rating` component supports additional optional parameters:

- `values`: By default, the rating values stored in the index are digits from `1` to `count`, but it is possible to instead store strings provided in this `values` input. For example: `terrible;poor;average;good;perfect`.
- `titles`: Similar to `values`, this input allows to define the tooltip texts displayed when hovering over the stars.
- `caption`: A caption for the ratings, displayed before the stars.
- `showAverage`: A boolean to display or not the average rating from all users (after the stars).

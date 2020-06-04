---
layout: default
title: Result Module
parent: Components
grand_parent: Modules
nav_order: 2
---

# Result Module

## Reference documentation

Please checkout the [reference documentation]({{site.baseurl}}components/modules/ResultModule.html) auto-generated from source code.

## Features

This modules provides simple components to easily display the different fields of a document/result/record (object of type [`Record`]({{site.baseurl}}core/interfaces/Record.html)).

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

## Components

### Title

The [`sq-result-title`]({{site.baseurl}}components/components/ResultTitle.html) component displays the title of a document. More precisely, it displays the `record.displayTitle` (formatted value) or `record.title` (raw value), or a custom field (`field` input).

![Title]({{site.baseurl}}assets/modules/result/title.png){: .d-block .mx-auto }

When the title is clicked, various behaviour are possible (`titleLinkBehavior` field):

- `'open'` (default): The title is a regular link pointing at `record.url1` if it exists (the `titleClicked` event fires for information and an audit event is emitted).
- `'action'`: the title is a link pointing at no URL, the action is custom and must be performed by the parent via the `titleClicked` event.

```html
<sq-result-title [record]="record"></sq-result-title>
```

### Source

The [`sq-result-source`]({{site.baseurl}}components/components/ResultSource.html) component displays the treepath (`record.treepath`) and URL (`record.url1`) of a document.

![Source]({{site.baseurl}}assets/modules/result/source.png){: .d-block .mx-auto }

```html
<sq-result-source [record]="record" [displayTreepath]="true"></sq-result-title>
```

### Extracts

The [`sq-result-extracts`]({{site.baseurl}}components/components/ResultExtracts.html) component displays the relevant extracts of a document in a summarized form (`record.relevantExtracts`) or raw form (`record.extracts`). It can also display the `record.text` if that field is configured in the Query web service. It also displays the modified date of a document (`record.modified`).

![Extracts]({{site.baseurl}}assets/modules/result/extracts.png){: .d-block .mx-auto }

```html
<sq-result-extracts [record]="record"></sq-result-title>
```

### Thumbnail

The [`sq-result-thumbnail`]({{site.baseurl}}components/components/ResultThumbnail.html) component displays the thumbnail of a document, if it exists. The behavior of a thumbnail click is similar to the [title](#title) component.

![Thumbnail]({{site.baseurl}}assets/modules/result/thumbnail.png){: .d-block .mx-auto }

```html
<sq-result-thumbnail [record]="record" [linkBehavior]="'action'"></sq-result-thumbnail>
```

### Icon

The [`sq-result-icon`]({{site.baseurl}}components/components/ResultIcon.html) component displays the icon of a document, defined by its **file extension** (`record.fileExt`). This component simply inserts a `<span>` element with a class name including the file extension. You need to map these extensions to actual icons in your stylesheet. In [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html), this is done with [Font Awesome](https://fontawesome.com/) icons, via the [`src/styles/icons.scss`](https://github.com/sinequa/sba-angular/blob/master/projects/vanilla-search/src/styles/icons.scss) stylesheet.

![Icon]({{site.baseurl}}assets/modules/result/icon.png){: .d-block .mx-auto }

```html
<sq-result-icon [record]="record"></sq-result-icon>
```

### Missing terms

The [`sq-missing-terms`]({{site.baseurl}}components/components/ResultMissingTerms.html) component displays the list of terms in the user's query that are *not* found in the document.

![Missing terms]({{site.baseurl}}assets/modules/result/missing-terms.png){: .d-block .mx-auto }

```html
<sq-result-missing-terms [record]="record"></sq-result-missing-terms>
```

### Metadata

The [`sq-result-metadata`]({{site.baseurl}}components/components/ResultMetadata.html) component displays the metadata of a document, offering various options (See [Metadata]({{site.baseurl}}tipstricks/metadata.html)). It is essentially a wrapper of the [`sq-metadata`]({{site.baseurl}}components/components/Metadata.html) document.

![Metadata]({{site.baseurl}}assets/modules/result/metadata.png){: .d-block .mx-auto }

```html
<sq-result-metadata [record]="record" [items]="['filename', 'size', 'authors']"></sq-result-metadata>
```

### Sponsored Results

The [`sq-sponsored-results`]({{site.baseurl}}components/components/SponsoredResults.html) component displays the sponsored links relevant for a user query (using the [`SponsoredLinksWebService`]({{site.baseurl}}core/injectables/SponsoredLinksWebService.html)). The configuration of these links must be done in the Sinequa administration.

![Sponso]({{site.baseurl}}assets/modules/result/sponso.png){: .d-block .mx-auto }

```html
<sq-sponsored-results [query]="searchService.query"></sq-sponsored-results>
```

### Entity summary

The [`sq-result-entity-summary`]({{site.baseurl}}components/components/ResultEntitySummary.html) component displays a summary of the entities found in the document. The entities should normally be styled as they are in the document preview (if you import your preview stylesheet in your main stylesheet).

![Entity summary]({{site.baseurl}}assets/modules/result/entity-summary.png){: .d-block .mx-auto }

```html
<sq-result-entity-summary [record]="record" [highlightedEntities]="['person', 'geo', 'company']"></sq-result-entity-summary>
```

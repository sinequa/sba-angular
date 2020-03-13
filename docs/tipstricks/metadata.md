---
layout: default
title: Custom metadata
parent: Tips and Tricks
nav_order: 2
---

# Custom Metadata

You will often be in the following situation:
- You index some content with custom metadata in a dedicated column (eg. a **category** metadata stored in `sourcestr1`).
- You want to display this value for each result.
- You want to display the distribution of categories in a *list facet*.
- You want to filter the search results for a given category.

Right away, you should notice that the `sourcestr1` value is by default available for each `Record` object in the `Results` object:

```ts
let record: Record = results.records[0];
let category: string = record['sourcestr1'];
```

## Back-end configuration

It is not the best practice to expose index column names in the front-end. You can assign an *alias* to this column, along with some useful *descriptors*. This is done in the administration under *Search-Based Applications > Web Services > Your query > **Advanced tab** > Column Aliases*.

![Column alias]({{site.baseurl}}assets/tipstricks/alias.png){: .d-block .mx-auto }

Now, your parameter is accessible under `record['category']`. The alias is used throughout the configuration of the SBA. Additionally, some Sinequa components (like `sq-metadata`) will use the *labels* to display that metadata. The labels can be raw strings, like **Category** and **Categories**, but the best practice is to use internationalization codes, as above (`msg#app.category.pluralLabel`). See [Internationalization]({{site.baseurl}}tutorial/intl.html).

While we are configuring the *Query*, we can also create an *aggregation* to feed our facet of categories. In the **General tab**, add a new line under the **Aggregations** table. Give it a meaningful name, like "Categories" and set the name of the column to your alias `category`. Optionally edit the configuration of your aggregation for more options:

![Aggregation]({{site.baseurl}}assets/tipstricks/aggregation.png){: .d-block .mx-auto }

Read more about [aggregations](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.syntax.sql.html#aggregations-distribution-and-correlation) to configure these (optional) advanced parameters. Note that if you leave *Include in standard search* checked, it means the distribution will be computed along with any query, which may come with a performance cost.

## Displaying the value

Your application probably displays results in a for-loop. In [Hello-Search]({{site.baseurl}}modules/hello-search/hello-search.html), it looks like this:

```html
{% raw %}<div *ngFor="let record of results.records" class="record">
    <a href="{{record.url1}}">
        <h3 [innerHtml]="record.displayTitle || record.title"></h3>
    </a>
    <div class="source">{{record.url1}}</div>
    <p *ngIf="record.relevantExtracts" [innerHTML]="record.relevantExtracts"></p>       
</div>{% endraw %}
```

You can directly display the value with something like:

```html
{% raw %}<span>{{ record['category'] }}</span>{% endraw %}
```

For something more sophisticated, which includes a *label* and an icon, you can try:

```html
<sq-metadata
    [record]="record" 
    [items]="['metadata']"
    [showTitles]="true" 
    [showIcons]="true" 
    [clickable]="false"
    [spacing]="'compact'">
</sq-metadata>
```

Note that the icon will be shown via a `class="sq-icon-category"` attribute. You need to assign an icon to `sq-icon-category`, which is done in `icons.scss`, if you are using [Vanilla-Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html).

```scss
$sq-icons-map: (
    ...
    "category": ("tag", "s"),  // Results in 'sq-icon-category' = 'fas fa-tag', a font awesome icon
```

## Displaying a list facet

If you configured an aggregation in the back-end configuration, you can first check that the data is correctly computed and available in the results. In the inspector, checkout the list of aggregations:

![List of aggregations]({{site.baseurl}}assets/tipstricks/aggregations.png)

If your aggregation is in the list and not empty, you can display a facet list component as in the [tutorial]({{site.baseurl}}tutorial/facet-module.html):

```html
<sq-facet-card [title]="'Categories'" [icon]="'fas fa-tag'">
    <sq-facet-list #facet [results]="results" [aggregation]="'Categories'"></sq-facet-list>
</sq-facet-card>
```

## Filtering the results

Both the `sq-metadata` component and the `sq-facet-list` components let you filter the results based on the value of metadata (for `sq-metadata`, with `[clickable]="true"`). Alternatively, you can apply these filters yourself by modifying the `Query` object and requesting new results to the server.

In the context of a facet, use the `FacetService` (from `@sinequa/components/facet`). For example:

```ts
let aggregation = this.facetService.getAggregation('Categories', results); // Get the aggregation data
let item = aggregation.items.find(item => item === 'some category'); // Find the item you want to "click" on 
this.facetService.addFilterSearch('facet name', aggregation, item); // Apply the filter (to the Query) and refresh the search
```

In a more general context (not tied to a facet), you can use the `SearchService` (from `@sinequa/components/search`):

```ts
this.searchService.addFieldSelect("category", {value: "some category"}); // Apply the filter (to the Query)
this.searchService.search(); // Request results to the server (with the new query)
```


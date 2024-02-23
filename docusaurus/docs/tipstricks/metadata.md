---
layout: default
title: Custom metadata
parent: Tips and Tricks
sidebar_position: 2
---

# Custom Metadata

You will often be in the following situation:

- You index some content with custom metadata in a dedicated column (let's say a **category** metadata stored in `sourcestr1`).
- You want to display this "category" metadata for each result.
- You want to customize the format of that display.
- You want to display the distribution of these "categories" in a *list facet*.
- You want to filter the search results for a given category.

Right away, you should notice that the `sourcestr1` value is by default available for each `Record` object in the `Results` object:

```ts
let record: Record = results.records[0];
let category: string = record['sourcestr1'];
```

## Back-end configuration

It is not the best practice to expose index column names in the front-end. You can assign an *alias* to this column, along with some useful *descriptors*. This is done in the administration under *Search-Based Applications > Web Services > Your query > **Advanced tab** > Column Aliases*.

![Column alias](/assets/tipstricks/alias.png)

Now, your parameter is accessible under `record['category']`. The alias is used throughout the configuration of the SBA.

While we are configuring the *Query*, we can also create an *aggregation* to feed our facet of categories. In the **General tab**, add a new line under the **Aggregations** table. Give it a meaningful name, like "Categories" and set the name of the column to your alias `category`. Optionally edit the configuration of your aggregation for more options:

![Aggregation](/assets/tipstricks/aggregation.png)

Read more about [aggregations](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.syntax.sql.md#aggregations-distribution-and-correlation) to configure these (optional) advanced parameters. Note that if you leave *Include in standard search* checked, it means the distribution will be computed along with any query, which may come with a performance cost.

## Displaying the value

Your application probably displays results in a for-loop. In [Hello Search](/apps/1-hello-search.md), it looks like this:

```html title="app.component.html"
<div *ngFor="let record of results.records" class="record">
    <a href="{{record.url1}}">
        <h3 [innerHtml]="record.displayTitle || record.title"></h3>
    </a>
    <div class="source">{{record.url1}}</div>
    <p *ngIf="record.relevantExtracts" [innerHTML]="record.relevantExtracts"></p>
</div>
```

You can directly display the value with something like:

```html title="app.component.html"
<span>{{ record['category'] }}</span>
```

For something more sophisticated, which can include a *label* and an *icon*, you can try using the [Metadata component](/libraries/components/metadata.md#the-sq-metadata-selector):

```html title="app.component.html"
<sq-metadata
    [record]="record"
    [config]="metadata">
</sq-metadata>
```

With a configuration like:

```ts title="app.component.ts"
this.metadata: MetadataConfig[] = [
    {
        field: "category", // the field in the record
        label: "Category", // the label to put in front of the value, it can be a key to use with sqMessage
        icon: "far fa-file-alt" // the Fontawesome class, you can find all available icons at https://fontawesome.com/v5/search
    }
];
```

## Custom formatter

If this metadata is stored in the index in a format that needs to be processed to be displayed, it is possible to specify a **custom formatter**.

First of all, choose a name for the formatter, like `"prettifyCategory"`. Set this name in the "formatter" column in the **Advanced tab** of your **Query** configuration.

![Custom formatter](/assets/tipstricks/metadata-formatter.png)

This custom formatter needs to be implemented in your Angular application. This is done by overriding the `FormatService`. An example is provided in the documentation of the [App Utils modules](/libraries/core/app-utils.md#format-service).

1. Create your extension of the `FormatService` in your app.

    ```ts title="my-format.service.ts"
    @Injectable({
        providedIn: 'root'
    })
    export class MyFormatService extends FormatService {

    }
    ```

2. Implement your custom formatter by overriding the `formatValue()` method. The `valueItem` input contains the raw value stored in the index, and the `column` contains the properties of the index column corresponding to each metadata.

    ```ts title="my-format.service.ts"
    // Add support for a custom formatter
    formatValue(valueItem: ValueItem | FieldValue, column?: CCColumn): string {
        if (column && column.formatter === 'prettifyCategory') {
            ...
            return "The formatter category"
        }
        return super.formatValue(valueItem, column);
    }
    ```

3. In your `app.module.ts`, provide your custom `FormatService`:

    ```ts title="app.module.ts"
    @NgModule({
        ...,
        providers: [
            ...,
            { provide: FormatService, useClass: MyFormatService }
        ]
    })
    ```

Your metadata will be automatically formatted in the built-in components, such as `sq-metadata`, `sq-facet-list`, etc. But if you want to format your custom value in your own template, this can be achieve with the `sqValue` pipe:

```html
<strong>Category:</strong> {{ record['category'] | sqValue:column}}
```

Notice that the `sqValue` pipe requires a `column` value as a parameter. This object can be retrieved with the following call:

```ts
this.column = this.appService.getColumn('category');
```

(Basically `getColumn()` returns the configuration of this index column, which includes the name of its formatter.)

## Displaying a list facet

If you configured an aggregation in the back-end configuration, you can first check that the data is correctly computed and available in the results. In the inspector, checkout the list of aggregations:

![List of aggregations](/assets/tipstricks/aggregations.png)

If your aggregation is in the list and not empty, you can display a facet list component as in the [tutorial](/tutorial/facet-module.md):

```html
<sq-facet-card [title]="'Categories'" [icon]="'fas fa-tag'">
    <sq-facet-list #facet [results]="results" [aggregation]="'Categories'"></sq-facet-list>
</sq-facet-card>
```

## Filtering the results

Both the `sq-metadata` component and the `sq-facet-list` components let you filter the results based on the value of metadata (for `sq-metadata`, with the `filterable` and `excludable` parameters from `MetadataConfig`).

Alternatively, you can apply these filters yourself by modifying the `Query` object and requesting new results to the server. To do so, you can use the `SearchService` (from `@sinequa/components/search`):

```ts
this.searchService.query.addFilter({field: 'category', value: "<a category>"}) // Apply the filter (to the Query)
this.searchService.search(); // Request results to the server (with the new query)
```

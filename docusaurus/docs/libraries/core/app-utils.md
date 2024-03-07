---
layout: default
title: App Utils Module
parent: Core
grand_parent: Libraries
nav_order: 1
---

# App Utils Module

## Overview

The App Utils module contains utilities for working with the configuration of a Sinequa SBA. It can be used by simply importing the module.

```ts
import { AppUtilsModule } from '@sinequa/core/app-utils';
...
@NgModule({
    imports: [
        ...
        AppUtilsModule
    ]
}}
```

## AppService

This service includes an `init` method which is called automatically by `LoginService.login` and loads the app configuration using
`AppWebService.get`. It maintains the currently active `ccquery` which can be used by higher level services and components. Each time
`ccquery` changes a `QueryChangedEvent` is emitted by the service.

The service provides facilities for working with various Sinequa configuration elements linked to an application:
- web services
- lists
- index columns and their aliases

## Query

The `Query` object is the main input of the query web service (see [web services](web-services.md#query-web-service) and [server configuration](../../guides/2-server-config.md#web-services)). It specifies the search query and its parameters.

### Creation

A `Query` is created with:

```ts
const query = new Query("<name of the query web service>");
```

### Searching for text

Specifying the fulltext query is done with the `text` property:

```ts
query.text = "my search query";
```

### Selecting a tab or scope

The `tab` property is used to select a tab:

```ts
query.tab = "tab name";
```

Similarly, the `scope` property is used to select a scope:

```ts
query.scope = "scope name";
```

### Filtering the metadata

A "filter" is a condition applied on the metadata of the documents. For example, a filter could be "the document's source is 'Documentation'":

```ts
query.addFilter({
  field: "source",
  value: "Documentation"
});
```

There are different types of filters, that roughly correspond to the SQL operators supported by the Sinequa engine:

- Equals: `{field: "source", value: "Documentation"}` (the `eq` operator is implicit)
- Not equals: `{field: "source", value: "Documentation", operator: "neq"}`
- Greater than: `{field: "size", value: 1000, operator: "gt"}`
- Greater than or equals: `{field: "size", value: 1000, operator: "gte"}`
- Less than: `{field: "size", value: 1000, operator: "lt"}`
- Less than or equals: `{field: "size", value: 1000, operator: "lte"}`
- Between: `{field: "size", start: 1000, end: 2000, operator: "between"}`
- Like: `{field: "title", value: "Sinequa", operator: "like"}`
- Contains: `{field: "authors", value: "John", operator: "contains"}`
- Regex: `{field: "format", value: "doc[xm]?", operator: "regex"}`
- In: `{field: "format", values: ["pdf", "doc", "docx"], operator: "in"}`
- Null: `{field: "msgto", operator: "null", not: true}`

Additionally, the `operator` property can be set to `"and"`, `"or"` or `"not"` to combine multiple filters:

```ts
query.addFilter({
  operator: "and",
  filters: [
    {field: "treepath", value: "/Documentation/Sinequa/"},
    {
      operator: "or",
      filters: [
        {field: "docformat", value: "pdf"},
        {field: "docformat", value: "html"},
      ]
    }
  ]
});
```

It is also possible to specify a `display` property to customize the display of the filter in the UI:

```ts
query.addFilter({
  field: "treepath",
  value: "/Documentation/Sinequa/",
  display: "Sinequa"
});
```

The `Query` has various helper methods to manage the filters:

- `addFilter`: Adds a filter to the query.
- `findFilter`: Return the first filter in the filter tree that matches the given predicate.

  For example, find all filters on the "source" field:

  ```ts
  query.findFilter(f => isFieldFilter(f) && f.field === "source");
  ```

- `findAllFilters`: Return all filters in the filter tree that match the given predicate.
- `findFieldFilters`: Return all filters in the filter tree that are field filters (with a `field` property, as opposed to `and`/`or`/`not` filters) and that match the given field(s).
- `findValueFilters`: Return all filters in the filter tree that are value filters (with a `value` property, as opposed to `and`/`or`/`not`/`in`/`between`/`null` filters) and that match the given field(s).
- `findSameFilter`: Return the first filter in the filter tree that is equivalent to the given filter.
- `forEachFilter`: Execute a function on each filter in the filter tree.
- `getFilterCount`: Return the number of filters in the filter tree.
- `removeFilters`: Remove all filters in the filter tree that match the given predicate.
- `removeSameFilter`: Remove the first filter in the filter tree that is equivalent to the given filter.
- `removeFieldFilters`: Remove all filters in the filter tree that are field filters (with a `field` property, as opposed to `and`/`or`/`not` filters) and that match the given field(s).

### Sorting the results

The `sort` property is used to sort the results. It must be configured in the query web service. For example, if the query web service has a sort named "date", then:

```ts
query.sort = "date";
```

### Paging

The `page` property is used to specify the page of results to fetch:

```ts
query.page = 2;
```

The `pageSize` property is used to specify the number of results per page:

```ts
query.pageSize = 20;
```

### Other properties

The `Query` object has other less frequently used properties that can be configured. See the source code for more details.

## Format Service

The `FormatService` is used to format values retrieved from a Sinequa index according to their type and the current locale.
Numbers, dates and booleans are all handled by default. Custom formatters can also be assigned to columns in the Sinequa
administration. The `memorysize` and `language` formatters are provided by default. The strings used in these formatters
are defined in the messages in the [Intl Module](/libraries/core/intl.md).

```ts
// The following will display "size: 2.92Kb" when using the en locale
let column = this.appService.getColumn('size');
// Note that this would normally be configured in the Sinequa administration
column.formatter = 'memorysize';
console.log('size:', this.formatService.format(3000, column));
// The following will display "language: French" when using the en locale
column = this.appService.getColumn('documentlanguages');
// Note that this would normally be configured in the Sinequa administration
column.formatter = 'language';
console.log('language:', this.formatService.format('fr', column));
```

Custom formatters can be provided by overriding the `FormatService`

```ts
import { Injectable } from '@angular/core/';
import { FormatService, ValueItem } from '@sinequa/core/app-utils';
import { FieldValue } from '@sinequa/core/base';
import { CCColumn } from '@sinequa/core/web-services';
...
@Injectable({
    providedIn: 'root'
})
export class MyFormatService extends FormatService {
    // Add support for a custom formatter
    formatValue: (valueItem: ValueItem | FieldValue, column?: CCColumn): string {
        if (column && column.formatter === 'mycustomformatter') {
            let [value, display] = this.getValueAndDisplay(valueItem);
            switch (value) {
                case 0:
                    return "zero";
                case 1:
                    return "one";
                case 2:
                    return "two";
            }
        }
        return super.formatValue(valueItem, column);
    }
};
...
// Provide
@NgModule({
    providers: [
        { provider: FormatService, useClass: MyFormatService }
    ]
})
```

Similarly, parsers can also be specified. These are used to parse values in fielded search expressions. A `memorysize` parser is included
by default so that fielded search expressions such as `size:>=25Kb` can be used. Note that server-side support for custom parsers is also
required so that the expressions can be parsed on the server. A server-side custom parser takes the form of a function plugin named
`ParseExpressionValue` which takes the custom parser name and the value to be parsed as parameters:

```csharp
public class ParseExpressionValue : FunctionPlugin
{
    public override string GetValue(IDocContext ctxt, params string[] values)
    {
        if (values.Length <= 1) return null;
        var parser = values[0];
        var value = values[1];
        if (parser == "mycustomparser")
        {
            // return the parsed value here
        }
        return null;
    }
}
```

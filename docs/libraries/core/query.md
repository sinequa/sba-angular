---
layout: default
title: Notification Module
parent: Core
grand_parent: Libraries
nav_order: 7
---

# Query

The `Query` object is the main input of the query web service (see [web services](web-services.md)). It is used to define the search query and its parameters.

## Creation

A `Query` is created with:

```ts
const query = new Query("<name of the query web service>");
```

## Searching for text

Specifying the fulltext query is done with the `text` property:

```ts
query.text = "my search query";
```

## Selecting a tab or scope

The `tab` property is used to select a tab:

```ts
query.tab = "tab name";
```

Similarly, the `scope` property is used to select a scope:

```ts
query.scope = "scope name";
```

## Filtering the metadata

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

## Sorting the results

The `sort` property is used to sort the results. It must be configured in the query web service. For example, if the query web service has a sort named "date", then:

```ts
query.sort = "date";
```

## Paging

The `page` property is used to specify the page of results to fetch:

```ts
query.page = 2;
```

The `pageSize` property is used to specify the number of results per page:

```ts
query.pageSize = 20;
```

## Other properties

The `Query` object has other less frequently used properties that can be configured. See the source code for more details.

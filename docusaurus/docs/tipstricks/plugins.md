---
layout: default
title: Server-side Plugins
parent: Tips and Tricks
sidebar_position: 15
---

# Server-side Plugins

The SBA framework offers a great deal of flexibility for customizing the client-side of your application, but sometimes the web services of Sinequa need to be customized on the server side.

The platform offers two types of C# plugins that may be useful:

- `QueryPlugin`: A plugin to customize the behavior of the Query web service (which is in charge of retrieving content from Sinequa indexes). This plugin is typically used to customize the SQL query sent to the engine, or post-process the results returned by the engine.
- `JsonMethodPlugin`: A plugin that can expose a new entirely custom REST API method. This plugin is typically used to create a custom service, independent of the regular search queries.

Note that former `SearchPlugin` can generally be replaced by either a `QueryPlugin` or some customization on the client-side (in the Angular source code). Similarly, the former `PagePlugin` will need to be replaced by a custom [Angular route](https://angular.io/guide/router), and possibly a custom Query web service or a `JsonMethodPlugin` to fetch its data.

## Query Plugins

A `QueryPlugin` is a C# plugin deployed on the Sinequa server and assigned to a specific Query web service configuration.

![Query Plugin](/assets/tipstricks/query-plugin.png)

The Query web service has a rich API which can be used in many different ways. Unlike other plugins, the `QueryPlugin` is NOT a class with blank hook methods called by the main web service. Instead, the plugin class implements a large part of the logic of the web service, and this `QueryPlugin` class is always used by the web service, *even when you don't create a plugin*. When you do create a `QueryPlugin`, you are overriding the service's behavior directly (not just hooking into it).

It is also important to know that other web services make use of the `QueryPlugin`. For example the Query Export web service need to fetch data in a way that is consistent with the Query web service, before exporting that data.

The `QueryPlugin` has many methods which can be overriden, and we cannot go in the details of all of them here. However, we can split these methods in the following categories:

- Initialization: These methods initialize the properties of the `QueryPlugin` class in function of the user's query. The query object sent by the client corresponds to the `Query` type, which is used throughout the SBA framework.
- Before Search: These methods can be overriden to modify the way the SQL query is built (eg. to add, remove or modify specific SQL clauses).
- After Search: These methods can be overriden to post-process the results of the SQL query and/or modify how these results are writen in the JSON response.

The complete API of the `QueryPlugin` is listed on [Sinequa's documentation website](https://doc.sinequa.com/api/.net/html/T_Sinequa_Plugins_QueryPlugin.htm).

Note that within a `QueryPlugin`, you have access to various useful objects, in particular:

- `this.Request`: The query object (a `Json` object) that this web service is responding to. It is possible to access any sub property of the query (which can include non-standard properties, added specifically for the purpose of customization).
- `this.Response`: The response returned by the web service (a `Json` object). It is possible to modify any property of this response. Note that, depending on the method you override, `this.Response` might not always have the same content (for example, if you override a "before search" method, the response does not contain any data yet). From the front-end point of view, this response is read as a `Results` object.

### Initialization methods

The initialization methods start with the prefix `Init`. The following methods are called in succession by the main `Init()` method (which itself may be overriden):

- `InitAction()`: Initializes the `Action` member from the query (no action means this is a regular search query; "open" is a specific type of query for obtaining the nested values in a tree aggregation; "aggregate" is a specific type of query for computing a given list of aggregations, with custom settings).
- `InitAggregations()`: Initializes the `Aggregations` member from the query and the aggregations defined in the Query web service configuration.
- `InitOpenAggregations()`: Initializes the `OpenAggregations` member when the query action is "open".
- `InitEngineClient()`: Sets the `Client` member to an instance taken from the pool if it has not already been set. Also sets `Indexes` and `IndexList`.
- `InitConditions()`: Initializes the `Conditions` member based on the full text, select or open conditions and advanced conditions specified in the query (sub-methods: `InitSelectConditions()`, `InitAdvancedConditions()` and  `PreProcessConditions()`).
- `InitTabSearch()`: Initializes the `TabSearch` member based on the Query configuration.
- `InitScope()`: Initializes the `Scope` member based on the `scope` value in the query and the web service configuration.
- `InitIds()`: Initializes the `Ids` member based on the `ids` value in the query.
- `InitBasket()`: Initializes the `Basket` member based on the basket value in the query.
- `InitTab()`: Initializes the `Tab`" member based on the `tab` value in the query.

It is rarely needed to override these methods, and more common to override the following ones (which actually perform some actions).

### Before Search methods

The methods that build the SQL query sent to the engine start with the prefix `Add`. The `ToSql()` method calls `ToSqlInternal()`, which calls in sequence the methods responsible for each sub-part of the query. These methods are themselves subdivided as follows:

- `AddSelect()`: Adds the SELECT clause of the SQL query
  - `AddTabSearchDistribution()`: Used when tab search is active, to compute the counters displayed for each tab.
  - `AddStandardColumns()`: Adds the columns of the index to the query.
  - `AddRelevanceColumns()`: Adds the columns specific to a full text search (where relevance is computed), such as `globalrelevance` and `matchlocations`, `extractlocations` clauses.
  - `AddGroupCountColumn()`: Adds the `groupcount` column when a GROUP BY clause is active.
  - `AddQueryColumns()`: Adds columns defined in the query.
  - `AddAdditionalSelectClause()`: Adds columns defined in the Query web service configuration.
  - `AddOpenAggregations()`: Adds the aggregation clause when the action is "open" (not used in regular search queries, only when the user "opens" a collapsed node in a tree facet).
  - `AddAggregations()`: Adds all the aggregations configured as "included in standard search" (unless specific actions like "open" or "aggregate").
    - `AddAggregation()`: Adds one aggregation, based on its configuration in the Query web service.
- `AddFrom()`: Adds the FROM clause of the SQL query, based on the list of index specified in the Query web service configuration.
- `AddWhere()`: Adds the WHERE clause of the SQL query
  - `AddBasketIds()`: Adds the list of ids present in a basket (when a basket is requested in the query).
  - `AddTextContains()`: Adds the "text contains" clause (when text is requested in the query).
  - `AddProcessEntities()`: Adds the "process-entities" clause (when configured in the web service configuration).
  - `AddIds()`: Adds the list of ids (when ids are request in the query)
  - `AddGlobalSelections()`: Adds configured "global selections". Global selections can be set on for the treepath and collection columns.
  - `AddConditions()`: Adds any metadata selection specified in the search text. Such selections can be specified using the Sinequa fielded search syntax.
  - `AddTabSelection()`: Adds the tab selection, if any. This is called both when building the tab and main query. For the tab query all possible tab values will be included. For the main query the values for the currently selected tab will be included.
  - `AddScope()`: Adds the scope, if any. Scopes can be configured on the query in the administration console (similar to tabs, with more flexibility).
  - `AddAdditionalWhereClause()`: Adds the configured "additional where clause", if any.
  - `AddRelevanceParameters()`: Adds the relevance-related clauses. This methods calls a long list of other methods, each responsible for an individual clause: `AddClassicSpellingCorrection()`, `AddDocumentWeight()`, `AddTextPartWeights()`, `AddRelevanceTransforms()`, `AddSynonyms()`, `AddReformulations()`, `AddDefaultSNS()`, `AddStopWords()`, `AddLightWords()`, `AddRawWords()`, `AddRequiredWords()`, `AddRewritings()`, `AddSpellingCorrectionFilter()`, `CreateInitialSearchParameters()`, `AddDefaultLanguage()`, `AddLanguageWeights()`, `AddPhonetizerLanguageMapping()`, `AddForceChineseScript()`, `AddSpellingCorrection()`, `AddQuestionStrategy()`, `AddStopWordsRuleSets()`, `AddDefaultOperator()`, `AddAdvancedSearchParameters()`, `AddSearchParameters()`, `AddRfmV2Options()`, `AddQuestionLanguage()`, `AddConceptsLimit()`, `AddGlobalRelevance()`, `AddWordsRelevance()`, `AddRelevanceDelta()`
  - `AddRights()`: Adds the access rights sub-clause
- `AddIn()`: Adds the IN clause of the SQL query
- `AddGroupBy()`: Adds the GROUP BY clause of the SQL query, based on the configuration of the Query web service (or a `groupBy` parameter included in the query, if any)
- `AddOrderBy()`: Adds the ORDER BY clause of the SQL query, based on the sorting options specified in the Query web service (and a `sort` parameter included in the query, if any)
  - `AddSortOrderBy`: Adds the ORDER BY clause of the SQL query
    - `GetCurrentSort`: Returns the ORDER BY expression based on the "sorting choices" configuration, taking into account tab search if configured. Checks are made for a relevance sort when no fulltext terms are active. In this case the default non-relevance sorting choice is returned.
- `AddPaging()`: Adds the SKIP/COUNT clause of the SQL query

When overriding one of the above methods, one problem arises: these methods do not return a `string`, they write their output directly to a `StringBuilder` object. So, it is not possible to modify directly what the base method adds to the SQL query. For example, if we want to override the `AddFrom()` method to replace one index by another, the following does not work:

```c#
public override void AddFrom(StringBuilder sb)
{
    // This fails, because AddFrom() does not return anything!
    // The output is written in the StringBuilder sb directly
    string from = base.AddFrom(sb);
    ...
}
```

But we can easily overcome this problem by using the following trick:

```c#
public override void AddFrom(StringBuilder sb)
{
    var sb2 = new StringBuilder();
    base.AddFrom(sb2); // Call the base method with a blank StringBuilder
    string from = sb2.ToString();

    // Now we can modify the from clause if we want to

    sb.Append(from); // Don't forget to write the clause to the real StringBuilder at the end
}
```

This lets us modify any part of the SQL query sent to the engine.

### After Search methods

After the SQL query is executed, the results from the engine are written in the `Response` object (which a simple `Json` container). The methods of the `QueryPlugin` starting with `Write` each write a piece of the results. These methods can all be overriden to customize what is actually sent back to the client.

- `WritePredefinedAggregations()`: Writes the aggregations with predefined values (if any).
- `WriteTabResults()`: Writes the results for the query responsible for computing the tabs counters (when tab search is enabled
  - `WriteTabs()`: Writes the current tab and the available tabs, as defined in the Query web service configuration
  - `WriteAttributes()`: Writes the non-aggregation attributes (such as `matchingrowcount`, `processingtime`, etc.)
  - `WriteAggregations()`: Writes the computed aggregations to the results
    - `WriteAggregation()`: Writes one computed aggregation to the results. This method has access to both the computed data and the aggregation's configuration in the Query web service.
      - `WriteTreeAggregationLevel()`: For aggregations of type "tree" (eg. treepath), writes one level of the tree and its children in a recursive manner.
- `WriteResults()`: Writes the results for the main query.
  - `WriteScope()`: Writes the current scope and the available scopes, as defined in the Query web service configuration (similar to the tabs)
  - `WriteSort()`: Writes the current "sort" value
  - `WriteDidYouMean()`: Writes the "did-you-mean" object to the results. This is derived from the "internalqueryanalysis" attribute.
  - `WriteAttributes()`: (as above, but for the main query)
  - `WriteAggregations()`: (as above, but for the main query)
  - `WriteRecords()`: Writes the list of `Record` objects retrieved by the engine. For each record, the data is retrieved from the `Cursor` object. Some helper methods can be overriden, to customize how some values are written:
    - `IsEmpty()`: Returns TRUE if the passed value can be considered "empty". Empty strings, numerics with value 0 and booleans with value false are all considered empty, and therefore not written in the record objects.
    - `GetColumnValue()`: Returns the passed value for a particular column as a `Json` object. The form of the JSON object depends on the type of the column.
    - `GetDisplayTitle()`: Returns the title field for the current record with highlighting applied using the "title" partname.
    - `GetRelevantExtracts()`: Returns relevant extracts paragraph for the current record. HTML highlighting markup is applied to the extracts.
    - `GetThumbnailUrl()`: Returns the thumbnail url for the current record.

Note the above methods manipulate `Json` objects, which have a rich set of methods for reading and writing values. As an example, the following piece of code produces a JSON object:

Code:

```c#
var example = Json.NewObject();
var data = example.SetArray("data");
data.EltAdd("value1");
data.EltAdd(42);
data.EltAdd(false);
example.Set("test", "ok");
```

Result:

```json
{
    "data": [
        "value1",
        42,
        false
    ],
    "test": "ok"
}
```

### Other methods

The `QueryPlugin` includes other customizable methods, notably:

**High-level methods**, which wrap the ones described above:

- `Execute()`: Executes the query (the highest-level method, which is rarely needed to override).
  - `Init()`: Wraps the initialization methods described above.
  - `ExecuteQuery()`: Executes the query. This calls "DoQuery" preceded by a call to "DoTabQuery" if tab search is configured.
    - `DoTabQuery()`: Executes the tab query and writes the results. This method (and the one below) wrap the "Before Search" and "After Search" methods described above. In particular they call the `ToSql()`, `WriteTabResults()` and `WriteResults()` methods.
    - `DoQuery()`: Executes the main query and writes the results
  - `Term()`: Cleans up this QueryPlugin instance. Members are set to their default values and the "Client" is returned to the pool unless it is external.

**Query intent detection methods**, which analyze the query text to detect an intent of the user, which can modify some members of the `QueryPlugin` to modify the search query:

- `MatchQueryIntents()`: Initializes the "QueryAnalysis" member and then matches any configured query intents. If the "QueryAnalysis" already exists, as can be the case when processing the main query during tab search, then any query intent actions are applied
  - `AnalyseQuery()`: Analyzes the text held in the "Text" member and returns an "IQueryAnalysis" instance. This method executes a custom SQL query, to get the text analysis from the engine.
    - `ToSqlForQueryAnalysis()`: Generates a SELECT statement used to produce an "IQueryAnalysis" instance.

## Json Method Plugins

### Create a custom endpoint

A `JsonMethodPlugin` is a C# plugin deployed on the Sinequa server that exposes a custom endpoint of the Sinequa REST API. A `JsonMethodPlugin` has access to the full Sinequa C# API, so it can do practically anything, including one or multiple queries to the Sinequa engines.

The complete API of the `JsonMethodPlugin` is listed on [Sinequa's documentation website](https://doc.sinequa.com/api/.net/html/Methods_T_Sinequa_Plugins_JsonMethodPlugin.htm).

As an example, let's take the following plugin:

```c#
public class MyJsonMethodPlugin : JsonMethodPlugin
{
    public override void OnPluginMethod()
    {
        var input = JsonRequest.ValueStr("input");
        JsonResponse.Set("output", "Hello, " + input);
    }
}
```

A POST request to `/api/v1/plugin/MyJsonMethodPlugin` with the following body:

```json
{
    "input": "World!"
}
```

Yields the following response:

```json
{
    "output": "Hello, World!",
    "methodresult": "ok"
}
```

The `@sinequa/core` library includes a service to easily sent GET/POST requests to a `JsonMethodPlugin`, as illustrated in the following example:

```ts
import { JsonMethodPluginService } from '@sinequa/core/web-services';

...

    constructor(public pluginService: JsonMethodPluginService) {}

    example() {
        // Send request to the plugin
        const obs = this.pluginService.post('MyJsonMethodPlugin', {input: "World!"});
        // Subscribe to response
        obs.subscribe(response => {
            console.log(response.output);
        });
    }
```

Note that even an empty `JsonMethodPlugin` performs things like user authentication (taking into account the different types of SSO). By default, only administrators are allowed to use these plugins, but it is possible to change this rule by overriding the `GetRequiredAuthLevel()` method:

```c#
public override JsonMethodAuthLevel GetRequiredAuthLevel()
{
    return JsonMethodAuthLevel.User; // Any authenticated user can use the plugin
}
```

There are four levels: `User`, `Admin`, `AdminOrDelegatedAdmin` and `None`. Note that it is possible to retrieve the user's identity via `this.Session.User`. Additionally, `this.Session` has the following properties indicating whether the current user is an admin or delegated admin: `IsAdmin`, `IsDelegatedAdmin`, and `IsAdminOrDelegatedAdmin` .

### Customizing existing web services

Additionally, it is possible to use a `JsonMethodPlugin` in the context of another web service, instead of as an independent endpoint. This gives the possibility to customize the behavior of an existing web service, which, unlike the Query web service, does not have a dedicated plugin type.

For example, we can post process the suggestions returned by the Suggest Query web service, by adding the name of our plugin to the body of the request:

```json
{
    "app": "app",
    "suggestQuery": "myQuery",
    "text": "barack ob",

    "plugin": "MyJsonMethodPlugin",
    "input": "World!"
}
```

However, in this case, the `OnPluginMethod()` method is not called. Instead, we can override our plugin logic in `OnBegin()` (to pre-process the request) or `OnEnd()` (to post-process the request).

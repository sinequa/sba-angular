---
layout: default
title: Web Services Module
parent: Core
grand_parent: Libraries
nav_order: 4
---

# Web Services Module

## Initialization

This module contains Angular services for the Sinequa web service APIs. The module can be initialized using the `WebServicesModule.forRoot` static method in your applications's `NgModule` which makes an injectable `StartConfig` object available to the services and components across the application. At a minimum the object
passed to forRoot should contain the `app` and `url` (for ng serve or CORS support) fields. Other fields such as `apiPath`, `browserUrl` will be initialized
automatically.

```ts
@NgModule({
    imports: [
        ...
        WebServicesModule.forRoot({
            app: 'app-name',
            url: 'http://localhost', // set for ng serve / CORS
            production: environment.production
        });
    ]
    ...
});
```

Services in this module use `SqHttpClient` which derives from Angular's `HttpClient` and does two things:
- pipes the returned observable through the `share` operator so that only one request is issued for multiple subscribers
- prevents *identical* concurrent requests by caching pending responses

Authentication is typically performed by the [Login Module](/libraries/core/login.md) which provides an Angular `HttpInterceptor` to handle `HTTP 401` errors and
automatically initiate the authentication process with the Sinequa server.

Information on the usage of the various services follows:

## App Web Service

Retrieves the `CCApp` configuration object from the Sinequa server. The application name is taken from the injected `StartConfig`.

```ts
    this.appWebService.get().subscribe(
        (app) => {
            console.log('app:', app);
        }
    );
```

## Principal Web Service

This service retrieves the `Principal` object associated with the authenticated user. Although a basic `get` method exists it is more usual to call
`load` which gets the principal and sets it on the `principal` property.

```ts
    this.principalWebService.load().subscribe(
        (principal) => {
            console.log('principal:', principal);
        }
    );
```

The service also has an events property which can be subscribed to. A `changed` event is emitted each time the `principal` property changes.

```ts
    this.principalWebService.events.subscribe(
        (event) => {
            console.log('principal changed:', this.principalWebService.principal);
        }
    );
```

## User Settings Web Service

This service can load and save user settings associated with the authenticated user. The user settings are stored as JSON on the Sinequa
server. The `load` method stores the loaded user settings in the `userSettings` property. The `UserSettings` interface is declared
with an index signature to allow arbitrary values to be stored in it.

```ts
    this.userSettingsService.load().subscribe(
        (userSettings) => {
            console.log('user settings:', userSettings);
        }
    );
```

The current user settings can be modified on the client by updating the `userSettings` property and then calling `save`:

```ts
    this.userSettingsService.userSettings.myProperty = 123;
    this.userSettingsService.userSettings.save();
```

The entire user settings are uploaded each time `save` is called. To update only a subset of the user settings the `patch` method can
be used. This performs a JSON merge patch (rfc7396) of the passed partial user settings object with the current user settings on the server.
Additions and updates can be performed like this:

```ts
    // Add/update data in the user settings
    if (!this.userSettingsService.userSettings) {
        this.userSettingsService.userSettings = {};
    }
    const details = {
        job: "Sales",
        region: "US"
    };
    // Update locally
    this.userSettingsService.userSettings.details = details;
    // Update the server, sending only the details object
    this.userSettingsService.patch({details});
```

To remove data from the user settings set a null value:

```ts
    if (this.userSettingsService.userSettings) {
        // Update locally
        delete this.userSettingsService.userSettings.details;
        // Update the server, sending an instruction to remove the `details` value from the user settings
        this.userSettingsService.patch({details: null});
    }
```

The service also has an events property which can be subscribed to. A `changed` event is emitted each time the `userSettings` property changes.

## Query Web Service

The query web service issues a Sinequa search `Query` and retrieves an observable of the `Results`. The query name used must correspond one of the
queries configured on the application in the Sinequa administration.

See the [documentation of the query object](app-utils.md#query).

```ts
    const query = new Query('my-query-name');
    query.text = 'football';
    this.queryWebService.getResults(query).subscribe(
        (results) => {
            console.log('results:', results);
        }
    );

```

## Preview Web Service

This service retrieves data related to the document preview feature including highlighting information and the url to the preview document in the Sinequa document
cache. The identifier of a document and the query context for highlighting are passed to the `get` call:

```ts
    ...
    this.previewWebService.get(docid, query).subscribe(
        (previewData) => {
            console.log('preview data:', previewData);
        }
    );
```

## Suggest Query Web Service

This service gets suggestions for some input text using a `Suggest Query` defined in the Sinequa administration console. The name of the current `Query`
must be passed and suggestions can optionally be limited to values from a set of passed fields. This service would typically be used by an autocomplete
component.

```ts
    // Get suggestions based on the input text for the authors column
    this.suggestQueryWebService.get('my-suggest-query', 'input-text', query.name, ['authors']).subscribe(
        (suggestions) => {
            console.log('suggestions:', suggestions);
        }
    );
```

## Suggest Field Web Service

This service gets suggestions for input text from the values found in the passed input fields in the Sinequa indexes. A `Query` can be passed to limit
suggestions to values in the context of a query.

```ts
    // Get field value suggestions based on the input text for the authors column in the context of the passed `query`
    this.suggestFieldWebService.get('input-text', ['authors'], query).subscribe(
        (suggestions) => {
            console.log('suggestions:', suggestions);
        }
    );
```

## Sponsored Links Web Service

This service retrieves any sponsored links configured on the Sinequa server that match the passed query context. The name of a sponsored links
web service configuration on the Sinequa server must also be passed.

```ts
    this.sponsoredLinksWebService.getLinks(query, '_sponsoredlinks').subscribe(
        (links) => {
            console.log('sponsored links:', links);
        }
    );
```

## Similar Documents Web Service

This service retrieves documents similar to the document with the passed id. It uses Sinequa's semantic vectors to return the documents closest
to the passed document in the semantic space.

```ts
    this.similarDocumentsWebService.get("docid", query.name).subscribe(
        (records) => {
            console.log('similar documents:', records);
        }
    );
```

## Labels Web Service

This service provides facilities for working with Sinequa's document tagging functionality. Labels are associated with documents and can be either
public (viewable by all users) or private (viewable only by the authenticated user). Labels matching a prefix can be retrieved using the `list` method.
This could be used to provide an autocomplete component for labels.

```ts
    // Retrieve public labels matching the 'foo' prefix
    this.labelsWebService.list('foo', true).subscribe(
        (labels) => {
            console.log('labels matching foo:', labels);
        }
    );
```

One or more labels can added to one or more documents using the `add` method:

```ts
    // Add a private 'my-label' to documents with ids 'docid1' and 'docid2'
    this.labelsWebService.add(['my-label'], ['docid1', 'docid2'], false);
```

Similarly, labels can be removed using the `remove` method:

```ts
    // Remove a private 'my-label' from documents with ids 'docid1' and 'docid2'
    this.labelsWebService.remove(['my-label'], ['docid1', 'docid2'], false);
```

Labels can be renamed in all documents using the `rename` method:

```ts
    // Rename the public 'a-label' to 'new-label'
    this.labelsWebService.rename(['a-label'], 'new-label', true);
```

Labels can be deleted from all documents using the `delete` method:

```ts
    // Delete the private 'my-label'
    this.labelsWebService.delete(['my-label'], false);
```

Labels can be added and removed in bulk for a set of documents identified by a passed query. The
number of matching documents is limited by a parameter configurable in the `Labels` web service
in the Sinequa administration console.

```ts
    // Add the public 'a-label' label to the documents returned by executing `query`
    this.labelsWebService.bulkAdd(['a-label'], query, true);
```

```ts
    // Remove the public 'a-label' label from the documents returned by executing `query`
    this.labelsWebService.bulkRemove(['a-label'], query, true);
```

## Query Export Web Service / Download Web Service

The Query Export Web Service provides methods for exporting the results of Sinequa search queries in a variety of formats.
The number of documents exported is limited by the `Maximum number of results by index` setting on the associated
`Query` in the Sinequa administration console. The output of the Query Export Web Service can be passed to the Download Web
Service to save the results to disk. There are methods for exporting all the results (`exportResult`), a selection of the
results (`exportSelection`) and the results of executing a saved query (`exportSavedQuery`).

Export the results of a query in CSV format and have the browser download the output to a file:

```ts
    this.downloadWebService.download(
        this.queryExportWebService.exportResult('web-service-name', query, results,
            ExportOutputFormat.Csv));
```

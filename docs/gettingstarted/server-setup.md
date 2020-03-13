---
layout: default
title: Server-side setup
parent: Getting Started
nav_order: 2
---

# Server-side setup

## WebApp configuration

Before starting, please make sure that the following options are configured as described in the your webapp:

- *Webapp > Stateless Mode > Return HTTP error codes* enabled,
- *Webapp > Stateless Mode > Permitted origins for Cross-Origin Resource Sharing (CORS) requests* set to the URL you will
use to test your app locally. For example, `http://localhost:4200` (or just `*`).

## Minimal configuration

The minimal configuration required to get started is an **App** and a **Query** web service.

To create an **App** configuration, in the administration:

- Go to *Search-based application > Apps*,
- In *Apps*, click *New empty SBA*, give it a name then click *Ok*. You will be redirected to the configuration page of the new **App**.
- Click *Edit*, and in the list of Queries, choose the default *_query*.

![New empty app action]({{site.baseurl}}assets/gettingstarted/admin-new-empty-app-action.png)
*'New empty app' action in Apps*
{: .text-center }
At this point your Sinequa server can be used to develop a SBA and you can go to [Developer-side setup](dev-setup.html)
 or spend more time reading the documentation below to fully configure the server.

## Apps

In order to work, an SBA needs a named **App** configuration object to exist on the Sinequa server.
This object is the entry point which references all the [**Web Services**](#web-services) that the SBA will use.
It is also where the (optional) **authentication providers** are specified.
The App can also contain **configuration** (in JSON format) which may be passed to the Angular application.
Finally, the App can be restricted to specific **Users and Groups**, rather than being opened to all.

The list of Apps can be found in the administration interface under *Search-Base Applications > Apps*:

![List of Apps]({{site.baseurl}}assets/gettingstarted/admin-apps.png)
*List of applications in the Sinequa server administration*
{: .text-center }

In this form, a new App may be created by clicking on the *New empty SBA* button, or using a *New app (Wizard)* button,
which lets you duplicating an existing App.

The **name of the App** is important, as it will be used by the Angular application to request data via the Web Services.
The configuration of an App specifies the **list of Web Services** available for this App.
If the App is deployed on the Sinequa server, it needs to point to an **Angular workspace**,
 which is shown via the property *Workspace application*.

![App Configuration]({{site.baseurl}}assets/gettingstarted/admin-app.png)
*App configuration - General tab*
{: .text-center }

In the **Auto-Login** tab of the App configuration, it is possible to reference a login provider configured at the level of the Webapp.
Note that for certain types of SSO (like Windows authentication), the configuration needs to be done essentially in the IIS server.

![Auto-Login tab]({{site.baseurl}}assets/gettingstarted/admin-app-auth.png)
*App configuration - Auto-Login tab*
{: .text-center }

In the **Customization (JSON)** tab of the App configuration, it is possible to write data (in JSON syntax),
which will be passed to the Angular app on initialization.
The benefit of using this field (rather than just writing the data in the app source code) is that
this data may change without having to recompile the Angular app.
For example, if you specify a list of widgets to be displayed, you will only need to modify this field and refresh the page to visualize the difference.

The underlying Monaco editor can verify that your JSON is valid and in any case, Sinequa ES verifies the JSON validity
when saving the App configuration and notifies you should the JSON is not valid.

![Customization tab]({{site.baseurl}}assets/gettingstarted/admin-app-conf.png)
*App configuration - Customization (JSON) tab*
{: .text-center }

![Customization tab with error]({{site.baseurl}}assets/gettingstarted/admin-app-conf-with-error.png)
*App configuration - Customization (JSON) tab - when the JSON is not valid*
{: .text-center }

In the **Advanced** tab of the App configuration, it is possible to restrict the availability of the app to certain users and groups.

![Advanced tab]({{site.baseurl}}assets/gettingstarted/admin-app-sec.png)
*App configuration - Advanced tab*
{: .text-center }

## Web Services

The **Web Services** configurations allow you to configure the behaviour of certain endpoints of the REST API.
Other (more complex) endpoints are configured on the server, which allows:

- To minimize the size and complexity of the requests sent to the server
- To prevent exposing sensitive or internal parameters and settings to the client side, which could be used maliciously or impact negatively the overal performance of Sinequa ES.

The list of Web Services can be found in the administration interface under *Search-Base Applications > Web Services*

![Advanced tab]({{site.baseurl}}assets/gettingstarted/admin-ws.png)
*List of **configurable** Web Services in the Sinequa server administration*
{: .text-center }

### Query web service

By far the most complex API, and by extension most complex Web Service configuration, is the **Query** web service.
This is the service that lets you build complex queries to retrieve data from the Sinequa indexes.

The **General** tab of the Query web service configuration allows to configure these key parameters:

- **Index list**: The list of indexes which this web service may query.
- **QueryPlugin**: A server-side plugin (written in C#), which lets you customize the search queries, or post-process the responses.
- **Aggregations**: A list of *Aggregations*. An aggregation is a short-list of metadata computed in function of a query.
For example, if you search for "automobile manufacturer", the *Company* aggregation could contain entries like "Volkswagen", "BMW", "Tesla", etc.

![Query Web Service configuration - General tab]({{site.baseurl}}assets/gettingstarted/admin-query.png)
*Query Web Service configuration - General tab*
{: .text-center }

The **Results Page** tab of the Query web service configuration allows to configure these key parameters:

- **Search scopes**: A "scope" allows to restrict the search to a specific subset of the corpus, with SQL rules.
The Angular application may select a scope by setting `query.scope = '<scope name>'`.
Unlike tabs, it is not possible to compute the number of document for each scope with one query (since each scope has a specific ruleset).
- **Relevant Extracts**: The relevant extracts are key passages and sentences found in the searched documents,
which are then used to compute a short summary typically displayed in the search results.

![Relevant extracts]({{site.baseurl}}assets/gettingstarted/relevant-extracts.png)
*Example of relevant extracts*
{: .text-center }

- **Tab Search**: Allows to specify a list of tabs to search in a specific subset of the corpus.
Tabs are meant to filter on a single column of the index (e.g. the format of document, name of the data source, etc.).
The Angular application may select a tab by setting `query.tab = '<tab name>'`.

The **Search settings** tab of the Query web service configuration allows to configure in fine details the query sent to the Sinequa engine.
In particular:

- Analysis of the user query:
  - Language detection & dictionaries
  - Intent detection
  - Entity detection
- Custom SQL:
  - Custom columns (SELECT)
  - Custom filters (WHERE)
  - Duplicate removal (GROUP BY)
  - Sorting options (ORDER BY)
- Other options:
  - Calculation of most relevant "Concepts"
  - Similar document search settings

The **Relevance** tab of the Query web service configuration allows to configure in fine details the relevance calculations performed by the Sinequa engine.
In particular:

- The statistical part of the relevance (global score formula, words & forms weighting)
- The freshness score (favoring most recent content)
- The part name weights (favoring specific parts of the content)
- The class weights (favoring specific classes of content)
- The relevance transforms (allowing for custom forms of relevance, such as popularity, ratings or importance)
- The relevance feedback model (allowing to account for user feedback)

The **Advanced** tab of the Query web service configuration allows to configure meaningful aliases and labels for specific columns.
This is useful to avoid exposing the bare structure of the index to front-end developers.
Instead, developers will see and use explicit variable names, which are used consistently across the different web services.

![Aliases]({{site.baseurl}}assets/gettingstarted/admin-query-aliases.png)
*Example of query aliases*
{: .text-center }

### Preview web service

The Preview web service form allows to configure the access to the documents' HTML preview (stored in Sinequa document cache).
It has two settings:

- **.css file**: Contains one (or more) CSS file names that are injected in the HTML previews as `<link>` elements,
either with a relative path (relative to the URL of the application), or an absolute URL.
The default SBA includes a `styles/preview.scss` file which get built as `/preview.css`.
The default setting is therefore `preview.css`.
- **Highlights to display**: Categories to be "highlighted" in the preview.
For example, relevant extracts are highlighted by wrapping `<span>` tags around the relevant text.
The visual highlight itself is effectively done by the aforementioned `preview.css` file (for example with a CSS rule of the type `background-color: yellow;`).

![Preview configuration]({{site.baseurl}}assets/gettingstarted/admin-preview.png)
*Example of preview configuration*
{: .text-center }

![highlights]({{site.baseurl}}assets/gettingstarted/highlights.png)
*Example of a highlighted HTML (each colored passage corresponds to a `<span>` element with a specific highlighted entity class)*
{: .text-center }

### Labels web service

The Labels web service form allows to configure the columns of the index where tags are stored.
**Labels** may be **private** (specific to each user) or **public** (visible to everyone).
Both options may be enabled simultaneously.

It is possible to restrict specific actions (Label creation, label modification) to specific populations of users.

This service also exposes an autocomplete feature to easily search and select a specific label.

![Labels configuration]({{site.baseurl}}assets/gettingstarted/admin-labels.png)
*Example of labels configuration*
{: .text-center }

### Autocomplete web service

The autocomplete web service essentially lists **suggest queries** that provide suggestions when the user types some text in a form.
Refer to the [documentation](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-sba-how-to-auto-complete.html) on suggest queries for more information.

![Autocomplete configuration]({{site.baseurl}}assets/gettingstarted/admin-autocomplete.png)
*Example of autocomplete configuration*
{: .text-center }

### Export web service

The export web service specifies the list of columns and maximum number of lines (records) to be exported when an user requests an export of the results list.
For obvious security and performance reasons, these parameters are not exposed directly to the user himself.

Note that this web service is always used with the query web service.
The latter provides the query configuration to retrieve the documents that user sees in the SBA.
Therefore, the number of exported records is also limited by the configuration of the associated query web service.
In particular, the query configuration can limit the maximum number of records per index that can be returned by the query.

You need to verify such options in the query web service when you change the maximum number of lines in the export web service.

![Export configuration]({{site.baseurl}}assets/gettingstarted/admin-export.png)
*Example of export configuration*
{: .text-center }

### Sponsored links service

The configuration of the sponsored links allows to specify the number of links returned by the API.
Refer to the [documentation](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-ui-sponsored-links.html) on sponsored links for more information.

![Sponsored links configuration]({{site.baseurl}}assets/gettingstarted/admin-sponsored-links.png)
*Example of Sponsored links configuration*
{: .text-center }

## Workspaces

The third part of the server-side configuration that powers the SBA framework is the **Workspaces** section.
Workspaces literally refer to Angular workspaces, (which is what [this Github repository](https://github.com/sinequa/sba-angular) contains).

The Angular workspace is not only available on Github, it is also shipped with Sinequa releases as a **zip file**.
A workspace can be unzipped, downloaded and uploaded on the Sinequa server via the Sinequa administration.

This allows:

- To host and serve an SBA on the Sinequa server, which is optional but typically the case in a production setting (cf. [Sinequa server](prerequisites.html#sinequa-server)).
- To release a pre-built SBA directly usable out-of-the-box.
- To manually deploy an SBA on the server (after a development performed on a developer's computer).
Note that deploying with Git is preferable, when possible (see [Workflow](workflow.html)).

Angular workspaces are unzipped in `<data folder>\sba`,
which is where Sinequa looks for them, to be displayed in the administration and to serve the built applications that they contain.
The **Angular workspaces** is located in the administration under *Search-Based Applications*:

![Workspaces]({{site.baseurl}}assets/gettingstarted/admin-workspaces.png)
*Angular workspaces in the administration*
{: .text-center }

When opening a workspace in the administration, it is possible to see its content (files and directories), as well as run the build commands listed in the `package.json` file at the root of the workspace. The build commands result in `/dist` or `/dist-debug` folders containing the actual builds. These are hidden in the administration but do exist on the file system. This is where Sinequa is looking for when serving a particular application. Obviously, the Angular app needs to be built in order to be served...

![Serving an app]({{site.baseurl}}assets/gettingstarted/admin-serving.png)
*When the app is hosted on Sinequa, the URL contains the name of the App, which itself points to a specific workspace and app*
{: .text-center }


---
layout: default
title: Vanilla Builder
parent: Applications
nav_order: 5
---

# Vanilla Builder

![Vanilla Builder](https://github.com/sinequa/ngx-ui-builder/raw/main/docs/demo.gif)

Vanilla-builder is built upon a Vanilla-search's application but each pages are surrounded by the **ngx-ui-builder** directives to allow their customizations.

## Project's folder structure
### /configurators
Contains all **configurators** widgets used to customize the vanilla-search application.  
Usually, a **configurator** widget is associated to a SBA components. But it's not always the case.

* Specific to Analytics components

|configurator|description|
|---|---|
|chart|configure a specific chart within a list of charts|
|heatmap|configure an heatmap component|
|network|configure a network component|
|timeline|configure a timeline component|

* Specific to SBA Components

|configurator|description|
|---|---|
|comments|configure a comments component|
|facet|configure a specific facet within a list of facets|
|facet-multi|configure a facet multi component|
|menu|configure the navbar menu|
|metadata|configure a metadata component|
|predefined-results-layout|configure how the results are displayed|
|preview|configure a preview component|
|search-form-legacy|configure a search bar (legacy) component|
|slide-builder|configure a slide builder component|

* Specific to Application component

Each application's pages contains a specific **configurator** component.  
This component describes how to customize the page and which SBA components are allowed to drop within it.

|configurator|description|
|---|---|
|home-facet|configure a home's facet component|
|home|configure the Vanilla's Home components|
|search|configure the Vanilla's Search components|

### /configurators/app-configuration
|configurator|description|
|---|---|
|global|configure the global's application configuration<br/>Today, only those parameters are customizable:<br/>- application's name<br/>- font family<br/>- background image/color<br/>- color's theme|
|global-service|use the configuration from the **ui-builder** when builder is enable and use the **config.ts** configuration in static mode (see [static export section](#static-export)) |

### /toolbar
The toolbar component allows you to add custom options to the **ui-builder**'s toolbar.  
By default, the **ui-builder**'s toolbar contains only the `eye` icon used to enable/disable the **ui-builder** and the undo/redo buttons.

To add your own buttons, just add them inside the `<uib-toolbar></uib-toolbar>` tag.

### config.ts
This file contains the configuration by default.  
When you reset your configuration, the content of this file will be applied.

Configuration are split in multiple configuration's constants to ease it's customization.  
Updating this file, allows you to specify your own configuration when the application is first launched but also when you reset the whole configuration.


## The ngx-ui-builder directives
To allow customization within a page, each page contains one or more `<uib-zone></uib-zone>`

Each `<uib-zone></uib-zone>` contains one or more `uib-directive`. Those directives allow the **ui-builder** library to know which components can be customized within each zones.

### Inside the **ui-builder** directives
Here we are exploring the directives allowing components customization.

Below a snippet of the `Home` page template (html)
```html
<uib-zone id="home">
  ...
  <ng-template uib-template="search-form" display="Search form" let-config>
    <app-search-form [autocompleteSources]="config.autocompleteSources"></app-search-form>
  </ng-template>
  ...
</uib-zone>
```

Here a zone called `home` is set.  
Inside this zone, a `uib-directive` called `search-form` is set.  
Now, the **ui-builder** library knows the `app-search-form` component can be customized.  
As you can notice in this example, `app-search-form` is not a SBA component: indeed, the **uib-builder** can be used with any kind of components. 

Now, take a look at the `home` configuration object:
```json
{
  id: 'home',
  type: '_container',
  classes: 'd-flex align-items-center flex-column w-100',
  items: ['home-logo', 'home-title', 'search-form', 'home-actions', 'home-facets']
}
```

This configuration is associated with the `uib-zone` with the id `home`.
So, this describes the zone:
* the zone is a container (`type: '_container'`)
* the zone contains various components (`items: [...]`). Each component within this array will be rendered by index order.
* class is just for css styling the host element

In the `items` property, you can notice the `search-form` id. This tells the **ui-builder** library to render a component whose id is `search-form`

Let's see what this component is... The template (html) gives us the answer:
```html
  <ng-template uib-template="search-form" display="Search form" let-config>
    <app-search-form [autocompleteSources]="config.autocompleteSources"></app-search-form>
  </ng-template>
```
`search-component` is an `app-search-form` component.

Take a look at it's configuration object:
```json
{
  id: 'search-form',
  type: 'search-form',
  classes: 'col-8 col-md-7 col-lg-5 col-xl-4 app-search-form px-2',
  autocompleteSources: ['suggests','baskets','recent-documents','recent-queries','saved-queries'],
  enableVoiceRecognition: true,
  keepTab: true,
  enableKeepFilters: true,
  keepFilters: true,
  enableAdvancedForm: true,
  keepAdvancedSearchFilters: true
}
```
All properties after `classes` are the component's inputs default values. If you want keep some inputs not configurable, do not include them in the configuration.

Now, to allow an user to customize this values, you need to set a *configurator*.  
*Configurators* are all set inside a special HTML tag: `<uib-configurator></uib-configurator>`

In our example, the *configutor*'s template looks like this:
```html
<uib-configurator>
  ...
  <ng-template uib-template="search-form" let-context>
    <sq-search-form-legacy-configurator [context]="context">
    </sq-search-form-legacy-configurator>
  </ng-template>
  ...
</uib-configurator>
```
Here we tell to the **ui-builder** which *configurator* to use with `search-form`.  
The `context` associated is (to be simple) the `search-form`'s configuration object, so the *configurator* knows how to interact with the component.

Building a *configurator* is quite easy.

Below the `search-form` *configurator*:
```typescript
import { Component, Input } from "@angular/core";
import { ConfiguratorContext } from "@sinequa/ngx-ui-builder";

@Component({
  selector: 'sq-search-form-legacy-configurator',
  template: `
  <h6>Autocomplete sources</h6>
  <uib-multi-selector
    [options]="sources"
    valueField="value"
    displayField="display"
    [(ngModel)]="context.config.autocompleteSources"
    (ngModelChange)="context.configChanged()">
  </uib-multi-selector>  `
})
export class SearchFormLegacyConfiguratorComponent {
  @Input() context: ConfiguratorContext;

  sources = [
    {value: "suggests", display: "Suggestions"},
    {value: "baskets", display: "Collections (aka. baskets)"},
    {value: "recent-documents", display: "Recent documents"},
    {value: "recent-queries", display: "Recent queries"},
    {value: "saved-queries", display: "Saved queries"},
  ]
}
```
**ui-builder** comes with multiple built-in components and *configurators* ready to use.
Here `<uib-multi-selector></uib-multi-selector>` is a kind of checkboxes list.

*Configurators* are displayed in the **ui-builder** panel, but while drag'n dropping component inside a `uib-zone`, those *configurators* can also be displayed as a modal window. 

You must have now a good understanding how the **ui-builder** works in the backstage.

## Static export
Static website generation is done using Angular's schematics provided by the **ui-builder** library.

This step can be done by the **Platform** using a json plugin.

But you can also do this using a command line.  
Inside the `package-json` file you can find a `make-static` script.
This script tells to the Angular's schematics how to convert `<uib-zone>` and `uib-directive` in a static website application.

Before, you need to download the configuration as a JSON file.

Take a look to this script:
```json
"make-static": "ng generate @sinequa/ngx-ui-builder:make-static --app-module-dependencies=projects/vanilla/src/app-dependencies.json --config=projects/vanilla/src/config.json --config-path=projects/vanilla/src/config.ts --config-identifier=GLOBAL_CONFIG",

```

* `--app-module-dependencies` is a configuration's dependencies file specific to vanilla-builder. It allows to remove useless dependencies depending on what components you use inside the application.
* `--config` is the path of the project's configuration json previously downloaded.
* `--config-path` is the path of the **config.ts** file to use to paste the global configuration.
* `--config-identifier` is the name of the constant to use inside the **config.ts** file to paste the configuration. By default it's value is `GLOBAL_CONFIG`, so it's optional if you don't use your own value.

When the static generation ends, a full static Angular's application will be available without any traces of the **ui-builder**'s components and directives. All the global configuration will be written inside the **config.ts** file and used by de configuration service by default.
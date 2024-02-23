---
layout: default
title: Configuration
parent: Tips and Tricks
sidebar_position: 7
---

# Configuration

It is a good practice to centralize some high-level parameters of your application in a place where you can easily modify them (rather than if they were hard-coded everywhere in the source code). For example, you could specify the list of facets or the metadata you want to display.

There are essentially two ways of doing this in the SBA framework:

1. Centralize configuration in the source code of your app.
2. Centralize configuration on the server and download it in your app via the `AppWebService`.

## Source-code configuration

The first one is not specific to Sinequa: You can simply store your settings in a global TypeScript file that you can import anywhere in your app. An example of this is available in [Vanilla Search](/apps/2-vanilla-search.md) with the `src/config.ts` file. You can use this file to store any data you need, and then import this data from a component or service.


```ts title="config.ts"
export const FACETS = [
    {
        "title": "Companies",
        "aggregation": "Companies"
    },
    {
        "title": "People",
        "aggregation": "People"
    },
    ...
]
```

```ts title="app.component.ts"
import { FACETS } from "../config";

...
public getFacets(){
    return FACETS
}
```

```html title="app.component.html"
<sq-facet-card *ngFor="let facet of getFacets()" [title]="facet.title">
    <sq-facet-list #facet [results]="results" [aggregation]="facet.aggregation"></sq-facet-list>
</sq-facet-card>
```

The drawback of this method is that you have to rebuild your application to take into account any change in the configuration.

## Server-side configuration

This approach stores the configuration in JSON format in the Sinequa administration. Your App configuration has a "Customization (JSON)" tab as described in [Server configuration](/guides/2-server-config.md#apps).

Unlike the first method, this configuration is **dynamic**, meaning you won't have to rebuild your application to see the difference. However, it is only available **post-login**, so you cannot store information like the URL of your web-service (See [environment](environment.md) for that).

We can adapt our first example:

![Server config](/assets/tipstricks/config.png)

```ts title="app.component.ts"
import { AppService } from '@sinequa/core/app-utils';

...
  constructor(
    ...
    private appService: AppService) { }

  public get facets() {
    return this.appService.app?.data?.facets || [];
  }
```

(The HTML template is unchanged)

## Combining both approaches

In [Vanilla Search](/apps/2-vanilla-search.md) both approaches are used. By default, the `src/config.ts` file is used, but if configuration is passed through the `AppService` as above, then it takes precedence.

For example, the Home component has the following logic for listing the active *features* (resulting in specific facets on the home page):

```ts title="home.component.ts"
import { AppService } from '@sinequa/core/app-utils';
import { FEATURES } from '../../config';

  constructor(
    ...
    private appService: AppService) { }

  ...
  public get features(): string[] {
    return this.appService.app?.data?.features as string[] || FEATURES;
  }
```

---
layout: default
title: Analytics
has_children: true
sidebar_position: 3
description: Analytics documentation
parent: Libraries
---

# Analytics library

## Building the library

At the root of the workspace, run the following command:

```bash
npm run buildanalytics
```

The build takes a few minutes to complete and produces a folder `dist/analytics/`. Note that this folder is aliased as `@sinequa/analytics`, in the [`tsconfig.json`](https://github.com/sinequa/sba-angular/blob/master/tsconfig.json) file. This means that all the imports of code of this library from the applications look like:

```ts
import { ... } from '@sinequa/analytics/....';
```

## Modules

This library contains several sub-libraries (or "secondary endpoints"). Each sub-library generally includes:

- One or more Angular modules. Generally, only one module is used. If the library depends on the [Bootstrap](https://getbootstrap.com/) library, the module is packaged within a `bootstrap/` subfolder and the module is prefixed by `Bs` (eg. `BsSearchModule`).
- Zero or one Angular service. Services are where the intelligence of the application is concentrated. Components generally use a service for the complex data processing tasks and the interactions with [`@sinequa/core`](/docs/libraries/core/core.md) and the web services (eg. `SearchService`).

    Services are always designed to be component-agnostic, and therefore do not depend on the Bootstrap or Material Design libraries. When a service depends on a component type, it is actually injected by dependency injection.

- Various Angular components, directives and pipes exported by the Angular module, and tied together by the service.
- Zero or one stylesheet, to be imported in your application's global stylesheet.
- Internationalization "messages", which are simple Typescript files exporting key/value pairs of text allowing to switch between various languages in your app (See [Internationalization](/docs/tutorial/intl.md)).

See the [tutorial introduction](/docs/tutorial/intro.md#modules) for additional information on the modules' structure and how to get started with them.

Below is list of documented modules.

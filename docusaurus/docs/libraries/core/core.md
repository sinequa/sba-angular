---
layout: default
title: Core
has_children: true
sidebar_position: 1
description: Core documentation
parent: Libraries
---

# Core library

## Building the library

At the root of the workspace, run the following command:

```bash
npm run buildcore
```

The build takes a few minutes to complete and produces a folder `dist/core/`. Note that this folder is aliased as `@sinequa/core`, in the [`tsconfig.json`](https://github.com/sinequa/sba-angular/blob/master/tsconfig.json) file. This means that all the imports of code of this library from the applications look like:

```ts
import { ... } from '@sinequa/core/....';
```

## Modules

This library contains several sub-libraries (or "secondary endpoints"). Each sub-library generally includes:

- One or more Angular modules. Generally, only one module is used.
- Zero or one Angular service. Services are where the intelligence of the application is concentrated. Here, top level interactions with Sinequa are maintained (calling the Sinequa REST API, authenticating users via standard protocols supported by Sinequa, etc.) Components generally use those services for the complex data processing tasks and the interactions.

- Some Angular components, directives and pipes exported by the Angular module, and tied together by the service.
- Internationalization "messages", which are simple Typescript files exporting key/value pairs of text allowing to switch between various languages in your app (See [Internationalization](/tutorial/intl.md)).

See the [tutorial introduction](/tutorial/intro.md#modules) for additional information on the modules' structure and how to get started with them.

Below is list of documented modules.

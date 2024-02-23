---
layout: default
title: Connection to Sinequa
parent: Tutorial
sidebar_position: 2
---

# Connection to the Sinequa server

In this chapter we need to connect the [**Hello Search**](/apps/1-hello-search.md) app to the Sinequa test server. The URL of this server is:  
`https://su-sba.demo.sinequa.com` and the name of the SBA configured on the server is just `'training'`. Additionally, the app is secured with the SAML protocol. The name of the identity provider is `'identity-dev'`.

In your `hello-search/` project, open the `src/app/app.module.ts` file, and replace the placeholders parameters in the `StartConfig` object:

```ts
export const startConfig: StartConfig = {
    app: "training",
    autoSAMLProvider: "identity-dev",
    production: environment.production,
    auditEnabled: true
};
```

Notice that this `startConfig` object gets passed to the `WebServiceModule` from `@sinequa/core`. In fact, the `forRoot()` method adds this object to the list of providers, and Angular then injects it in all the web services (which then know the URL of the server and can send queries to it).

At this point, you can build and serve your app (from the root of the workspace) with:

```bash
npm run ng serve hello-search -- --ssl=true --proxy-config=./projects/hello-search/src/proxy.conf.json
```

Please read the [Getting Started](/getting-started.md#develop-an-application) section if you wonder about the `proxyConfig` argument.

If the build is successful, you can navigate to `https://localhost:4200` in your favorite web browser. You should be greeted by a login page (this is where your need your Sinequa account). Put in your credentials and you should be redirected to the simplest of search pages. Type some keywords and search!

![Hello Search](/assets/tutorial/hello-search.png)

Note: the searchable content is composed of a few wikipedia pages and the Sinequa documentation.

Before going to the [next step](search-module.md), take some time to analyze the source code of [Hello Search](/apps/1-hello-search.md) and more specifically the `src/app/` subfolder, to fully understand its internal logic.

---
layout: default
title: Connection to Sinequa
parent: Tutorial
nav_order: 2
---

# Connection to the Sinequa server

In this chapter we need to connect the [**Hello Search**]({{site.baseurl}}/modules/hello-search/hello-search.html) app to the Sinequa test server. The URL of this server is: `https://vm-su-sba.sinequa.com:13343` and the name of the SBA configured on the server is just `'training'`. Additionally, the app is secured with the SAML protocol. The name of the identity provider is `'identity'`.

In your `hello-search/` project, open the `src/app/app.module.ts` file, and replace the placeholders parameters in the [`StartConfig`]({{site.baseurl}}/core/interfaces/StartConfig.html) object:

```ts
export const startConfig: StartConfig = {
    url: "https://vm-su-sba.sinequa.com:13343",
    app: "training",
    autoSAMLProvider: "identity",
    production: environment.production,
    auditEnabled: true
};
```

Notice that this `startConfig` object gets passed to the `WebServiceModule` from `@sinequa/core`. In fact, the `forRoot()` method adds this object to the list of providers, and Angular then injects it in all the web services (which then know the URL of the server and can send queries to it).

At this point, you can build and serve your app (from the root of the workspace) with:

    ng serve hello-search

(If Angular CLI is not installed globally, rather try with:)

    npm run ng serve hello-search

If the build is successful, you can navigate to `http://locahost:4200` in your favorite web browser. You should be greeted by a login page (this is where your need your Sinequa account). Put in your credentials and you should be redirected to the simplest of search pages. Type some keywords and search!

![Hello Search]({{site.baseurl}}/assets/tutorial/hello-search.png)

Note: the searchable content is composed of a few wikipedia pages and the Sinequa documentation.

---

Before going to the [next step](search-module.html), take some time to analyze the source code of [Hello Search]({{site.baseurl}}/modules/hello-search/hello-search.html), to fully understand its internal logic.
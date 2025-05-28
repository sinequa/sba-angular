---
layout: default
title: Environment
parent: Tips and Tricks
nav_order: 8
---

# Environments

In Angular, [application environments](https://angular.io/guide/build) allow you to specify different configurations for different build targets (typically `dev`, `prod`, `staging`, etc.).

In the case of the Sinequa SBA Framework, the parameters which often need to be environment-specific are those of the `StartConfig` object:

- `app`: Name of the App configured on the server
- `auditEnabled`: Whether or not to enable audit logging
- `autoSAMLProvider`, `autoOAuthProvider`: Name of the login providers configured on the server
- `production`: Whether the app is built for production or not
- `url`: URL of the Sinequa server (if you are using [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) -- See [Connecting to the Sinequa server]({{site.baseurl}}guides/3-development.html#connecting-to-the-sinequa-server)).

To take an example, let's say you have to develop your SBA with a Sinequa server at `https://sinequa-dev.customer.com` and you will deploy your production application on `https://sinequa.customer.com`. You may have something like the following:

`app.module.ts`:

```ts
import { environment } from "../environments/environment";

export const startConfig: StartConfig = {
  url: environment.url,
  app: environment.app,
  production: environment.production,
  auditEnabled: environment.auditEnabled,
  autoSAMLProvider: environment.autoSAMLProvider
};
```

`src/environment/environment.ts`:

```ts
export const environment = {
  url: "https://sinequa-dev.customer.com",
  app: "enterprise-search-app",
  auditEnabled: false,
  production: false
};
```

(Notice that `autoSAMLProvider` is omitted, meaning we will use default login/password authentication in `dev`)

`src/environment/environment.prod.ts`:

```ts
export const environment = {
  url: "https://sinequa-prod.customer.com",
  app: "enterprise-search-app",
  auditEnabled: true,
  production: true,
  autoSAMLProvider: "enterprise-sso"
};
```

Note that the `url` parameter can be omitted if your application is hosted on the Sinequa server or if you use a proxy (the `url` will just be inferred from the browser URL). It can also be omitted if you use a proxy with `ng serve` (See [Getting Started]({{site.site.baseurl}}getting-started.html#develop-an-application)).

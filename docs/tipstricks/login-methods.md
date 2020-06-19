---
layout: default
title: Login methods
parent: Tips and Tricks
nav_order: 10
---

# Login Methods

Sinequa supports different login methods, which involve different types of configuration. The main approaches are described below:

## Default form login

By default, if nothing is configured, you log in to Sinequa via a form asking for your username and password (which must exist in the Sinequa back-end):

![Login form]({{site.baseurl}}assets/tipstricks/login-form.png){: .d-block .mx-auto }

## Windows Single-Sign-On

First, note that Windows SSO has **no impact on the code of your Angular application**. All the work is handled by the Web Server (IIS) and the Sinequa WebApp. The only subtleties are how to enable `ng serve` with a proxy ("Normal mode") or without a proxy ("CORS mode", which is also required if you deploy your application outside of the Sinequa server).

### Normal mode

The configuration of Windows SSO is documented in the [official documentation](https://doc.sinequa.com/en.sinequa-es.v11/content/en.sinequa-es.how-to.implement-sso.html).

The applications deployed on the Sinequa server should work automatically.

However, you might get 401 errors when using `ng serve` with your regular proxy. You must replace your proxy file (by default `src/proxy.conf.json`) by a JavaScript file with the following content (eg. `src/proxy.conf.js`):

```js
const Agent = require("agentkeepalive");

module.exports = {
    '/api': {
        target: "http://<your sinequa server>",
        secure: false,
        agent: new Agent({
            maxSockets: 100,
            keepAlive: true,
            maxFreeSockets: 10,
            keepAliveMsecs: 100000,
            timeout: 6000000,
            keepAliveTimeout: 90000
        }),
        onProxyRes: proxyRes => {
            const key = "www-authenticate";
            proxyRes.headers[key] = proxyRes.headers[key] &&
                proxyRes.headers[key].split(",");
        }
    },

    '/xdownload': {
        target: "http://<your sinequa server>",
        secure: false,
        agent: new Agent({
            maxSockets: 100,
            keepAlive: true,
            maxFreeSockets: 10,
            keepAliveMsecs: 100000,
            timeout: 6000000,
            keepAliveTimeout: 90000
        }),
        onProxyRes: proxyRes => {
            const key = "www-authenticate";
            proxyRes.headers[key] = proxyRes.headers[key] &&
                proxyRes.headers[key].split(",");
        }
    }
};
```

And of course, update your `ng serve` command to reflect this new file:

```bash
npm run ng serve myapp -- --proxyConfig=./projects/myapp/src/proxy.conf.js
```

### CORS mode

If you need to enable Windows SSO with CORS ([Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)), which is needed is you use `ng serve` without a proxy to develop your application, additional steps are needed:

1. **Dependencies**: You need to install the following modules (IIS / Security):
  - Windows Authentication
  - URL Authorization

    ![Login form]({{site.baseurl}}assets/tipstricks/iis-deps.png){: .d-block .mx-auto }

2. Configure your site Authentication: **Enable both Anonymous and Windows Authentication**

    ![Login form]({{site.baseurl}}assets/tipstricks/iis-sso.png){: .d-block .mx-auto }

3. If not already done, enable CORS in your WebApp configuration from the specified origins (See [Server-side setup]({{site.baseurl}}gettingstarted/server-setup.html)).

4. **Add security rules into the web.config file**

    Go into the sinequa/website folder where your WebApplication is installed. Edit the `web.config` file:

    ![Login form]({{site.baseurl}}assets/tipstricks/web-config.png){: .d-block .mx-auto }

    Add the following `<security>` tag into the `<system.webServer>` tag:

    ```xml
    <security>
        <authorization>
            <remove users="*" roles="" verbs="" />
            <add accessType="Allow" users="?" verbs="OPTIONS" />
            <add accessType="Deny" users="?" verbs="GET, POST" />
            <add accessType="Allow" users="*" verbs="GET, POST" />
        </authorization>
    </security>
    ```

    ![Login form]({{site.baseurl}}assets/tipstricks/web-config-xml.png){: .d-block .mx-auto }

    **What it actually means:**
    - Allow `OPTIONS` queries for all **anonymous users**
    - Denied `GET` / `POST` queries for all **anonymous users** (So `GET` and `POST` will be handled by the next rule)
    - Allow  `GET` / `POST` queries for all users (here **authenticated users**)

    **Why this configuration:**

    The [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser. Additionally, for HTTP request methods that can cause side-effects on server data (in particular, HTTP methods other than `GET`, or `POST` with certain MIME types), the specification mandates that browsers "preflight" the request, soliciting supported methods from the server with the HTTP `OPTIONS` request method, and then, upon "approval" from the server, sending the actual request. Servers can also inform clients whether "credentials" (such as Cookies and HTTP Authentication) should be sent with requests.

    When you fire an AJAX call to Sinequa REST API, two HTTP queries are sent (this is automatically done by your browser):

    - The "preflight" : Using `OPTION` Method, will get the list of `Access-Control-Allow` in order to know if it can go to step #2. This first HTTP call is not passing any credential token in the HTTP headers so it'll be treated as "anonymous" by IIS

    - Send the actual `GET` or `POST` query to the REST API using authentication in the HTTP headers

    **⚠️ Important note**: Upgrading your Sinequa environment will override the `web.config` file. So it’s highly recommended to backup this file in the folder and replace the web.config file with the backup after an upgrade.

## SAML 2.0

The configuration of SAML 2.0 protocol involves various steps:
- Configure an identity provider in your Sinequa WebApp (See the [official documentation](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-grid-webapps.html))

![SAML identity provider]({{site.baseurl}}assets/tipstricks/saml.png){: .d-block .mx-auto }

- Add this identity provider to your App configuration:

![SAML identity provider in App]({{site.baseurl}}assets/tipstricks/saml-app.png){: .d-block .mx-auto }

- Add the name of the provider to your `app.module.ts`:

```ts
export const startConfig: StartConfig = {
    ...
    autoSAMLProvider: "identity"
};
```

## OAuth2

The configuration of SAML 2.0 protocol involves various steps:
- Configure an identity provider in your Sinequa WebApp (See the [official documentation](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-grid-webapps.html))

![OAuth identity provider]({{site.baseurl}}assets/tipstricks/oauth.png){: .d-block .mx-auto }

- Add this identity provider to your App configuration:

![OAuth identity provider in App]({{site.baseurl}}assets/tipstricks/oauth-app.png){: .d-block .mx-auto }

- Add the name of the provider to your `app.module.ts`:

```ts
export const startConfig: StartConfig = {
    ...
    autoOAuthProvider: "google"
};
```
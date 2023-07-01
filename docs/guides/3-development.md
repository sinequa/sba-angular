---
layout: default
title: Development
parent: Guides
nav_order: 3
---

# SBA Development

## Prerequisites

SBA developers should be familiar with [Angular](https://angular.io/) and [Bootstrap](https://getbootstrap.com/). Specific knowledge about Sinequa is not strictly required, although it is useful to understand where the data comes from, how it can be customized and what additional features can be enabled through custom APIs and plug-ins.

We recommend reading the [architecture](1-architecture.html) guide and completing the [tutorial](../tutorial/tutorial.html) before starting development. 

## Development environment

An SBA development environment requires the following tools and accesses:

- [**NodeJS**](https://nodejs.org/): Node and npm (Node Package Manager) are required to download and manage the dependencies of the project (like the [Angular](https://angular.io) library). ⚠️ To pick the right version, check the [Angular documentation](https://angular.io/guide/versions) and compare it with the version of Angular found in your `package.json`.
- [**Visual Studio Code**](https://code.visualstudio.com/): The recommended IDE (Integrated Development Environment) for Angular development.
- [**Git**](https://git-scm.com/): The version control system allowing you to sync your workspace with a Git or Github repository to work collaboratively and deploy the project on a server.
- Access to a Sinequa server over HTTP(S) and an account on this server with access to some data (for testing purposes).
- An Internet connection to download 3rd party libraries from the Internet via [npm](https://www.npmjs.com/) (Node Package Manager). Note that this is not a strict requirement since these libraries could be manually copied into the  environment.

⚠️ It can be tempting to use the Sinequa server as the development environment and/or use the administration interface to make changes to the source code, but this is not recommended. The preference is to use a local development environment (on your own computer) and deploy your application on the Sinequa server only when it is ready for production.

## Workspace

The workspace is the directory containing the source code of your application. The dependencies of your project are declared in the `package.json` file at the root of the workspace. These dependencies are installed by running `npm install` (they are stored in the `node_modules` folder). The workspace also contains the configuration files for Angular (`angular.json`) and TypeScript (`tsconfig.json`).

There are two ways to create a workspace with different pros and cons:

### Use the standard workspace

The SBA Framework is developped as an open-source project on [Github](https://github.com/sinequa/sba-angular). New versions of the SBA framework are published at the same time as the releases of the Sinequa product. You can clone the repository and use the standard workspace as a starting point for your own project.

```bash
git clone https://github.com/sinequa/sba-angular.git my-project
cd my-project
```

Updating the workspace is as simple as pulling the latest version from Github, although you may have to resolve some conflicts between your own code and the new version of the workspace (See [Updates](6-updates.html)).

The standard workspace contains the main Sinequa [libraries](../libraries/libraries.html) (Core, Components and Analytics) and sample [applications](../apps/apps.html) (Vanilla Search and Pepper).

You can either **modify an existing application directly** or **create a new one** (and modify the `angular.json` accordingly):

- Modify an existing application directly if you do not intend to customize it significantly. The benefit is that you can easily update the application by pulling the latest version of the workspace from Github with only a small amount of conflicts to manage.
- Create a new application if you want to start from scratch or if you want to deviate significantly from a sample application. You will not have any conflicts to resolve during updates, but you will need to manually update your application to benefit from the latest features of the SBA Framework.

Using the standard workspace allows you to customize anything you want, including the low-level libraries. Having access to the source code of the libraries is also useful to help you understand how they work and how to write your own components.

⚠️ The standard workspace is also packaged as a .zip file in the Sinequa product. However, if you use this file, you will not be able to update the workspace by pulling the latest version from Github!

### Create a new workspace and install the npm packages

You can also create a new workspace from scratch and include only the npm packages you need. In this case, you must install the SBA Framework libraries in your project via [npm](https://www.npmjs.com/).

```bash
# Create a new Angular workspace
ng new my-project
cd my-project

# Install the SBA Framework libraries
npm install @sinequa/core @sinequa/components @sinequa/analytics --legacy-peer-deps
```

⚠️ This last command requires the `--legacy-peer-deps` flag to prevent npm from installing the **peer dependencies** automatically. We recommend installing the peer dependencies manually on a case-by-case basis. An alternative approach is to copy the list of dependencies from the standard workspace's [`package.json`](https://github.com/sinequa/sba-angular/blob/master/package.json) file.

📝 With this approach, updating the SBA libraries is done via npm using the `npm update @sinequa/<library>` command. The [Sinequa npm packages](https://www.npmjs.com/package/@sinequa/core) are published at same time as the Sinequa product.

## Building the libraries

When using the standard workspace (see [above](#use-the-standard-workspace)), it is possible to build the SBA libraries. This step is NOT required because applications can reference the libraries' source code directly rather than the compiled code.

```bash
npm run buildcore
npm run buildcomponents
npm run buildanalytics
```

The `buildcore`, `buildcomponents` and `buildanalytics` scripts are defined in the [`package.json`](https://github.com/sinequa/sba-angular/blob/master/package.json). The builds are generated in the `/dist` folder at the root of your workspace.

📝 We recommend `npm run <command>` vs `ng <command>`: This guarantees that you are using the same version of Angular as the one defined in the `package.json` file.

## Building an app

Building an application is similar to [building a library](#building-the-libraries):

```bash	
npm run buildvanilla
```

This script runs the `ng build` command (see the [`package.json`](https://github.com/sinequa/sba-angular/blob/master/package.json)), which generates a build artifact in the `dist` folder. This build is needed to deploy the application on a server (See the [deployment guide](4-deployment.html)).

## Testing an app

In order to test the application, developers generally use the `ng serve` command, which performs 3 tasks:

- build the application in development mode (like `ng build --configuration=development` would)
- watch for changes in your code and update the build immediately (like the `--watch` flag would)
- start a local web server and serve the application on `http://localhost:4200`.

This command is also defined in the [`package.json`](https://github.com/sinequa/sba-angular/blob/master/package.json) file and can be run with:

```bash
npm run start:vanilla
```

The `start:vanilla` script contains options that can be customized based on your environment:

```bash
ng serve vanilla-search --ssl=true --proxy-config=./projects/vanilla-search/src/proxy.conf.json
```

- `ssl=true` serves the app with HTTPS (using a self-signed certificate). This option might be necessary depending on the authentication method used by the Sinequa server.
- `proxy-config` configures a proxy to redirect HTTP requests to the Sinequa server (See [below](#proxy) for more details)

## Connecting to the Sinequa server

### TL;DR

Connect your app to the Sinequa server by:

- Specifying the `app` property in the `StartConfig` object of the `app.module.ts` file. (Also specify the name of your webapp's login provider if any).
- Specifying the `url` of the Sinequa server in the `proxy.conf.json`.

### Basic configuration

An app communicates with Sinequa via its REST API (See [architecture](1-architecture.html)). But how does the app know where to find the Sinequa server?

The [standard workspace](#use-the-standard-workspace) contains a `StartConfig` object in the `app.module.ts` file of each application:

```ts
// Initialization of @sinequa/core
export const startConfig: StartConfig = {
    app: "training",
    production: environment.production,
    autoSAMLProvider: environment.autoSAMLProvider,
    auditEnabled: true
};
```

This object contains the following optional properties:
- `url`: The URL of the Sinequa server. If not specified, the app will use the URL of the host server.
- `app`: The name of the app on the Sinequa server. If not specified, the app will be inferred from the URL (`/app/<appname>`)
- `autoSAMLProvider` or `autoOAuthProvider`: The name of the login provider on the Sinequa server (if any). If not specified, the app attempts to retrieve it from the server. See [Login methods](../tipstricks/login-methods.html) for more details.

When building your app for deployment on a Sinequa server, it should be fine to omit the above properties.

### Development configuration

⚠️ During development, the `ng serve` command serves your app on `http://localhost:4200`, which is NOT the Sinequa server and does NOT contain the name of the app!

This is why we recommend defining the `app` and login providers (if any). For the `url`, there are two possibilities:

- If the `url` property is specified in the `StartConfig`, your browser URL (`http://localhost:4200`) and Sinequa URL will NOT match, and you will run into [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues. You can fix these issues by configuring `https://localhost:4200` as a permitted origin in Sinequa (See [CORS and WebApp configuration](2-server-config.html#cors-and-webapp-configuration)).
- Alternatively, you can define a proxy configuration (See [below](#proxy)) so that your browser URL and Sinequa URL (seemingly) share the same origin.

### Proxy

The `--proxy-config` option makes the local server redirect HTTP requests from `http://localhost:4200` to the Sinequa server. From the point of view of the browser, the requests are sent to the same origin, so there are no CORS issues.

The proxy configuration is a simple JSON file passed as an argument to the `ng serve` command.

```json
{
    "context": [
        "/api",
        "/xdownload",
        "/saml/redirect",
        "/r"
    ],
    "target": "https://vm-su-sba.sinequa.com:13343",
    "secure": false,
    "changeOrigin": true
}
```

The `context` property is an array of paths that will be redirected to the `target` URL. The `secure` property indicates whether to validate the SSL certificate of the target server. The `changeOrigin` property indicates whether the origin of the request should be changed to the target URL.

See the [Angular](https://angular.io/guide/build#proxying-to-a-backend-server) and [Webpack](https://webpack.js.org/configuration/dev-server/#devserverproxy) documentation for more details.

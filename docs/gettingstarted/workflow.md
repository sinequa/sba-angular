---
layout: default
title: Workflows
parent: Getting Started
nav_order: 4
---

# Workflows of the SBA Framework

There is not a single way of working with the SBA Framework, but there are different levels of sophistication, which offer different pros and cons. If you are working on a quick one-off project, prefer a [Local](#working-locally) [File-based](#file-based-workflow) Workflow. If you are working on a large, long-term project with many contributors, rather prefer a [Remote](#working-remotely) [Github-based](#github-based-workflow) Workflow.

## Local vs. Remote

Traditionally, any development done in a Sinequa project has to be implemented and tested on a Sinequa server. The Sinequa server may occasionally be on the local computer of a developer, but this is unpractical in a complex project, as the divergence between the state of the server(s) and that of the developer(s) is difficult to manage.

With the SBA framework, the development can take place anywhere, as long as the REST API of the Sinequa server is accessible. This means you can work:

- **Locally**: ie, directly on the Sinequa server (whether it's a physical or virtual server, or just your own computer with Sinequa installed on it). 
- **Remotely**: ie, on any regular workstation that knows nothing of Sinequa, but can access its remote REST API (This is generally the recommended approach).

### Working locally

When working **locally**, your Angular workspace lives in the `<sinequa>/data/sba/<name of the workspace>` folder. You can initialize the Angular workspace by unzipping the default workspace provided with the Sinequa release. To do so, in the Sinequa administration, open *Search-Based Applications > Workspaces* and in the top-right click *New > Unzip the default workspace*. The unzipped workspace includes all third-party dependencies (`node_modules/` folder) and the builds of each library and app (`dist/` folder).

Working locally makes the deployment very easy: you simply build your app for production, and it is ready to be served by Sinequa. It is adapted for quick projects with a single developer.

When working locally, you can configure the [`StartConfig`]({{site.baseurl}}core/interfaces/StartConfig.html) object in your `app.module.ts` like this:

```ts
export const startConfig: StartConfig = {
    app: "<name-of-your-app>",
    production: environment.production
};
```

### Working remotely

When working **remotely**, your Angular workspace can live anywhere on your computer. You can download and unzip the default workspace from the Sinequa release. To do so, in the Sinequa administration, open *Search-Based Applications > Workspaces* and in the top-right click *Download default workspace*/ The unzipped workspace includes all third-party dependencies (`node_modules/` folder) and the builds of each library and app (`dist/` folder).

Working remotely is well suited to complex projects, involving multiple developers. Each developer can work on the app independently and merge their work via a system like Git (See [Git-based workflow](#git-based-workflow)). At some point, of course, you have to deploy your application on the Sinequa server. This can be done via file transfers or via Git (more on that below).

When working remotely, you can use a **proxy**, as demonstrated in [Developer-side setup](dev-setup.html#building-an-app). Also read [`ng serve`](#ng-serve) below.

Alternatively, you can use Cross-Origin requests, in which case you can specify the URL of your Sinequa server in the `StartConfig` object in your `app.module.ts` like this:

```ts
export const startConfig: StartConfig = {
    url: "https://your-sinequa-server.com"
    app: "<name-of-your-app>",
    production: environment.production
};
```

⚠️ Using [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) limits some functionalities of the framework and requires the Sinequa API to be served over HTTPS, as discussed in [Deploying an app on another server](dev-setup.html#deploying-an-app-on-another-server).

### ng serve

`ng serve` performs three actions:

- It builds your application (by default with the debug settings)
- It watches for changes in your code and updates the build immediately (the two first steps are equivalent to `ng build --watch`)
- It serves your application on a local development server (by default `http://localhost:4200`)

The third step means by definition that the app is not served from the same URL as Sinequa, which causes [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues. To resolve them, there are two options:

- Proxy the Sinequa server so that your browser "thinks" that your app and the Sinequa server both live on the same server at `http://localhost:4200`. To do this, create a file `proxy.json` with the following content:

    ```json
    {
        "/api": {
            "target": "https://your-sinequa-server.com",
            "secure": true,
            "changeOrigin": true
        },

        "/xdownload": {
            "target": "https://your-sinequa-server.com",
            "secure": true,
            "changeOrigin": true
        },

    }
    ```

    ⚠️ Note that if your app uses auth protocols like SAML, you may also need to proxy additional URLs, like `/saml/redirect`.

    Then modify your `ng serve` command to use your proxy:

    ```
    npm run ng serve <your-app> -- --ssl=true --proxyConfig=<path-to-proxy.json>
    ```

    The proxy file can have various other options. Read the [online documentation]((https://angular.io/guide/build#proxying-to-a-backend-server)).

- Alternatively, configure the Sinequa Webapp to allow cross-origin requests (In the configuration of your *Webapp > Stateless Mode > Permitted origins for Cross-Origin Resource Sharing (CORS) requests*, write `http://localhost:4200` or just `*`). As mentioned in [Deploying an app on another server](dev-setup.html#deploying-an-app-on-another-server), the Sinequa API must be accessible over HTTPS. This does not resolve all CORS issues (in particular if you are working on the document preview).

Whether you work locally or remotely, you can build your app and use `ng serve`, as long as you correctly configure your `app.module.ts` (and/or a proxy) as described above. Alternatively, if you work locally, you can use `ng build --watch`, to build your app continuously but let Sinequa serve it at the URL `http(s)://<sinequa server>/app-debug/<name-of-the-app>`.

## File-based Workflow

The **File-based Workflow** consists in working with simple file transfers to move around your Angular workspace (eg. between your computer and server).

Like [working locally](#working-remotely), this approach is useful for simple one-off projects with a single developer..

**Pros:**

- Simplest workflow possible.

**Cons:**

- Incompatible with team work.
- Difficult to track changes in the code.
- Difficult to update the code.

## Git-based Workflow

The **Git-based Workflow** consists in using a Git repository to manage the code of your Angular workspace. This allows you to work collaboratively and to track the changes in your app.

![Git workflow]({{site.baseurl}}assets/gettingstarted/git-workflow.png){: .d-block .mx-auto width="500px" }

In this process, the project repository contains the reference, and every developer (and the Sinequa server) *clones* this repository locally. Developers *commit* their changes and then *push* them to the central repository, resolving potential *merge* conflicts in the process. Deploying a new version on the server simply means running a `git pull` command on the server.

When a new version of the workspace is *cloned* or *pulled* on a computer or server, it is generally necessary to run the following commands:

- `npm install`, which updates the dependencies from the Internet. This step is required when a developer updates the list of dependencies in the `package.json` file. If the server does not have access to the Internet, the `node_modules/` folder needs to be updated manually, via file transfer.
- `npm run buildcore`, which builds [`@sinequa/core`]({{site.baseurl}}modules/core/core.html). This step is required in case the code of this library was modified (by a developer, of after an update of the library).
- `npm run buildcomponents`, which builds [`@sinequa/components`]({{site.baseurl}}modules/components/components.html). This step is required in case the code of this library was modified (by a developer, of after an update of the library).
- `npm run buildanalytics`, which builds [`@sinequa/analytics`]({{site.baseurl}}modules/analytics/analytics.html). This step is required in case the code of this library was modified (by a developer, of after an update of the library).
- On the server: `npm run ng build <name-of-your-app> -- --prod`, which builds your app for release, which allows Sinequa to serve it.

Note that all the commands above can be run directly from the administration user interface.

**Pros:**

- Enables collaborative team work.
- Allows to track changes in the app.

**Cons:**

- Requires hosting a Git repository on a server.
- Updating the code can occasionally require to resolve Git merge conflicts.

## Github-based Workflow

The **Github-based Workflow** is a variation of the above **Git-based Workflow**, in which the Git repository is originally *cloned* or *forked* from our official [Sinequa Github repository](https://github.com/sinequa/sba-angular).

![Git workflow]({{site.baseurl}}assets/gettingstarted/github-workflow.png){: .d-block .mx-auto }

This process helps address the issue of updating the Sinequa libraries and apps. Without it, you need to download new versions of the workspace and manually copy the code into your workspace. Instead, you can *pull from the upstream repository*, as described [here](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/merging-an-upstream-repository-into-your-fork). This may look like:

```bash
git pull https://github.com/sinequa/sba-angular.git master   # Pull from the official repository
# Resolve potential conflicts...
git push origin master   # Update your project clone/fork
```

Keep in mind `origin` is your own clone/fork, which does not get updates automatically until you push them. When you perform such an update, keep in mind the Core and Components libraries were overwritten (that's the point), so don't forget to rebuild them.

![Update from Github]({{site.baseurl}}assets/gettingstarted/git-update.png)

Additionally, using the Github workflow allows you to **report issues** and **request changes** (bug fixes, new features) in our official repository, by submitting *pull requests*.

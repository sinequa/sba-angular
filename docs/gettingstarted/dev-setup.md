---
layout: default
title: Developer-side setup
parent: Getting Started
nav_order: 3
---

# Developer-side setup

## Prerequisites

To develop a SBA, developers need to install various utilities:
- [**NodeJS**](https://nodejs.org/): Node and npm (Node Package Manager) are required to download and manage the dependencies of the project (like the [Angular](https://angular.io) library).
- [**Visual Studio Code**](https://code.visualstudio.com/): The standard IDE (Integrated Development Environment) for Angular development.
- [**Git**](https://git-scm.com/): The version control system allowing you to sync your workspace with a Github repository, work collaboratively and deploy the project on a server.

![NodeJs]({{site.baseurl}}/assets/gettingstarted/node.png){: width="150px" .ml-5}
![Visual Studio Code]({{site.baseurl}}/assets/gettingstarted/vscode.png){: width="90px" .ml-5}
![Git]({{site.baseurl}}/assets/gettingstarted/git.png){: width="200px" .ml-5}

## Angular Workspace

A workspace is not just an Angular app or library, it is a directory that contains multiple libraries and apps, while sharing the same global configuration and dependencies (`package.json`, `tsconfig.json`, `angular.json`). For more information, please refer to the [Angular documentation](https://angular.io/guide/file-structure) on this topic.

As explained in the [introduction]({{site.baseurl}}/intro), the SBA framework is based on an Angular Workspace containing two libraries ([`@sinequa/core`]({{site.baseurl}}/modules/core/core.html) and [`@sinequa/components`]({{site.baseurl}}/modules/components/components.html)). This workspace is available from the Sinequa releases as a zip file (see [Server-side setup](server-setup.html#workspaces)) or directly from [this Github repository](https://github.com/sinequa/sba-angular).

Once downloaded or cloned on the developer's computer, the workspace can be opened in Visual Studio Code (*Add Folder to Workspace* > *Open the root of the Workspace*).

![Workspace in VS Code]({{site.baseurl}}/assets/gettingstarted/workspace.png){: .d-block .mx-auto }
*Workspace opened in Visual Studio Code*
{: .text-center }

## Dependencies

An Angular project can have many **dependencies**, starting with Angular itself. The list of dependencies is listed in the `package.json` file at the root of the workspace. If the workspace is downloaded or cloned without its dependencies, the developer will need to install them.

In Visual Studio Code, open a **Terminal** (*Terminal > New Terminal*).

In the terminal run:

    npm install

This takes a few minutes to run. npm downloads the required libraries from the Internet and stores them in the `node_modules/` folder at the root of the workspace. You can ignore the recommendations to run `npm audit fix` at the end of the process.

The dependencies can be updated by increasing the version number of a given library in `package.json` and running `npm install` again.

For example, to upgrate the Bootstrap library, just increment the version on this line:

    "bootstrap": "^4.4.1"

**We will keep updating dependencies in future versions of the workspaces we deliver.** If you want to update your workspace, you will need to update your `package.json` (potentially resolving conflicts with your own custom libraries) and re-run `npm install`. Such updates are generally not backward compatible (for example, new Angular version may use different syntax), and so require changes in your libs and applications.
{: .fs-2 .p-3 }

## Building the libraries

The workspace includes two libraries [`@sinequa/core`]({{site.baseurl}}/modules/core/core.html) and [`@sinequa/components`]({{site.baseurl}}/modules/components/components.html). These libraries need to be compiled before the apps. In the terminal, run:

    npm run buildcore

and then,

    npm run buildcomponents

<div markdown="1" class="fs-2 p-3">
Note that we use `npm run`, followed by the name of a command defined in the **scripts** section of the `package.json` rather than just calling `ng build core` directly. This allows:
- The command to work even if Angular CLI is not installed globally.
- To run the command with increased memory as specified in the `.npmrc` file.
</div>

The libraries are built to the `/dist` folder at the root of your workspace. If you import code from `@sinequa/core` or `@sinequa/components`, this is where it comes from.

Just like for the [dependencies](#dependencies), these two libraries will be regularly updated. Do not forget to re-run these build commands when you download or pull a new version of the workspace.

## Building an app

At this point you are ready to build one of the sample applications included in the workspace. The only thing missing is the URL of the Sinequa server, and the name of your App on this server. You need to specify them in the `src/app/app.module.ts` file:

```ts
export const startConfig: StartConfig = {
    url: "http://<your sinequa server>",
    app: "<name of your app>",
    production: environment.production
};
```

For example, if you are working on a server (or the server is your computer), and you named your app "my-app" in the [Server-side setup](dev-setup.html), this might look like this:

```ts
export const startConfig: StartConfig = {
    url: "http://localhost",
    app: "my-app",
    production: environment.production
};
```

You can now build and serve the app with:

    ng serve hello-search

Alternatively, you can run `npm run ng serve ...` if Angular CLI is not installed globally.
{: .fs-2 .p-3 }

If the build is successful, you can access your app by navigating to [`http://localhost:4200`](http://localhost:4200) in your favorite browser. Log in to the app with the same credentials as you would to log in to the administration interface. If you have set up a custom login method (SSO, SAML, OAuth...) on the Sinequa webapp, you may need to customize the `app.module.ts` a bit further (see [Login methods]({{site.baseurl}}/tipstricks/login methods.html)).

## Deploying an app on a Sinequa server

To deploy your app on the Sinequa server:
- Build the app with the production flag: `ng build hello-search --prod` (it will be built under the `dist/` folder)
- Upload your workspace on the Sinequa server, in `<sinequa directory>\data\sba\` (either via file transfer or preferably a `git pull` -- See [Workflow](workflow.html))
- In the administration, open your app (under *Search-Based Applications > Apps*) and set the **Workspace application** to the one you uploaded.

![Workspace application]({{site.baseurl}}/assets/gettingstarted/admin-deploy.png){: .d-block .mx-auto }

Your app is now served by Sinequa at the URL `http://<sinequa server>/app/<name of your App>` (note that `name of you App` refers to the name of the App object in the administration, not the name of the Angular project).

Note that if the URL of the Sinequa server is different between development and production settings, you will need to use the `src/environments` files to differentiate between these two (See [Environment]({{site.baseurl}}/tipstricks/environment.html)).
{: .fs-2 .p-3 }

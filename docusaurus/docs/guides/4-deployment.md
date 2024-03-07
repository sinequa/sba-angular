---
layout: default
title: Deployment
parent: Guides
sidebar_position: 4
---

# Deploying an application

## Build process

Your build process may be entirely manual, entirely automated (via [Continuous Deployment](https://en.wikipedia.org/wiki/Continuous_deployment)), or something in-between.

For example, your environment might look like this:

- Your workspace is hosted on a Git repository (e.g., GitHub, Gitlab, Bitbucket, etc.).
- When a `git push` is made to the `main` branch, a CI/CD pipeline is triggered (e.g., via GitHub Actions, Jenkins, etc.).
- The pipeline builds the application and runs some end-to-end tests
- When successful, the pipeline copies the build artifacts to your Sinequa server

There could be many variations of this process, but the key steps are:

- Building the application with e.g., `npm run buildvanilla` (see [Building an app](3-development.md#building-an-app)).
- Serving the build artifact (i.e., the `dist` folder) on a web server (which is often a Sinequa server).

## Deploying an SBA on a Sinequa server

Sinequa serves the `dist` folder of the workspace of an app at the URL `https://<sinequa server>/app/<app name>`.

### Example:

Let's assume:

- Your Sinequa server is hosted at `https://example.com`
- Your app (in the Sinequa configuration) is named "foo"
- Your workspace folder is named "bar".
- Your Angular application within that workspace is named "baz".

Then:

- Your application will be available at `https://example.com/app/foo`.
- Your app configuration will look like:

  ![App configuration](/assets/guides/app-deployment.png)

- You workspace folder will look like:

  ![Worskpace folder](/assets/guides/workspace-folder.png)

### Workspace content

On the Sinequa server, the project workspace is stored in `<sinequa data folder>/sba`. The workspace does not need to include the source code or node modules. For deployment, only the `dist` folder is needed (along with a few config files). This is summarized in this table:

| Folder/File         | Description                                     | Needed for build | Needed for deployment |
|---------------------|-------------------------------------------------|------------------|-----------------------|
| `projects`          | Source code of projects                         | Yes              | No                    |
| `node_modules`      | Dependencies (installed via `npm install`)      | Yes              | No                    |
| `dist`              | Build artifacts (generated via `npm run build`) | No               | Yes                   |
| `package.json`      | Project configuration                           | Yes              | Yes                   |
| `angular.json`      | Angular configuration                           | Yes              | Yes                   |
| `sba-workspace.xml` | Sinequa configuration object                    | Yes              | Yes                   |

It is possible to run the build command (e.g., `npm run buildvanilla`) via the administration interface to generate the `dist` folder. (This requires the `projects` and `node_modules` folders.) Conversely, if your build is generated in a CI/CD pipeline, do not bother uploading the `projects` and `node_modules` to Sinequa.

### Debug version

In addition to serving the `dist` folder at the `/app/<app name>` URL, Sinequa also serves the `dist-debug` folder at the `/app-debug/<app name>` URL.

This is useful when building your application in development mode (using `npm run build <app name> -- --configuration=development`), which generates a `dist-debug` folder instead of a `dist` folder. The debug version can be inspected with the browser's developer tools, which is very useful for debugging. It is equivalent to the version served by `ng serve`.

## Deploying an SBA on another server

An SBA can be deployed on any kind of static web server. Simply copy the `dist` folder to the server and serve it at the URL of your choice.

However, when the URL of the SBA is different from the URL of the Sinequa server, there are two issues to consider:

- The SBA cannot send requests to relative URLs (e.g., `/api/v1/query`), which is the default. It needs an absolute URL.
- Cross-origin requests must be enabled to avoid CORS errors (See [CORS and WebApp configuration](2-server-config.md#cors-and-webapp-configuration)).

This is exactly the same issue as when using `ng serve` (See [Development configuration](3-development.md#development-configuration)).

And similarly, these issues can be solved with the following approaches:

- by setting up a proxy (i.e., a web server that forwards requests from the SBA host to the Sinequa server).

OR:

- by enabling cross-origin requests on the Sinequa server (e.g., adding `https://<sba-host>` to the Permitted Origins in your *WebApp > Stateless Mode* configuration).
- by specifying the URL of the Sinequa server in the `StartConfig` object in your `app.module.ts`.

  ```ts
  export const startConfig: StartConfig = {
      url: "https://my-sinequa-server",
      app: "<name of your app>",
      production: environment.production
  };
  ```

---
layout: default
title: Getting Started
nav_order: 2
description: "Get started with the SBA Framework"
---

# Getting Started
{: .no_toc }

The SBA Framework is used in a variety of contexts by both technical and non-technical people. This section presents different approaches to getting started, depending on your role and overall objectives.

In this documentation, we make the assumption that you are a Sinequa customer or partner and that you can access a Sinequa server in your organization (or at the very least that you can connect to our [training server](https://vm-su-sba.sinequa.com:13343), using your provided Sinequa credentials).

1. TOC
{:toc}

## Browse sample applications and components

If you are new to Sinequa and just want to see what is on the menu, you can start by browsing our list of [sample applications](apps/apps.html).

If you want to discover new functionalities that may be useful for an existing application, have a look at the [Components](libraries/components/components.html) and [Analytics](libraries/analytics/analytics.html) libraries. You can also test most of the SBA Framework's components in the [Vanilla Builder](#vanilla-builder) application.

Sinequa also comes with pre-packaged applications (that are deployed out-of-the-box), so you can test these apps directly with your own data (See [prepackaged applications](#pre-packaged-applications) below).

## Create a first application

### Vanilla Builder

A good way to get started -that does not require any developer skill- is to use the [Vanilla Builder](apps/5-vanilla-builder.html) application. Vanilla Builder is a no-code tool that lets administrators customize an application by drag-and-dropping components and editing their settings, appearance and behavior.

When the customization is complete, it can be exported as a standalone application that can be [deployed](guides/4-deployment.html) independently on Sinequa.

Vanilla Builder is also a good way to discover and try out a wide range of components available in the SBA Framework, without having to study the documentation and API.

### Pre-packaged applications

Another common way to get started is to copy one of the pre-packaged applications available in the [Sinequa administration](guides/2-server-config.html):

![Prepackaged applications](assets/gettingstarted/prepackaged-apps.png)

However, please note the following warnings:

⚠️ Copying the "app" object exposes a new application at the URL `<sinequa>/app/<app-name>`, but **it does not copy the application's workspace** (which contains the source code and build artifacts of the app). The new app is still referencing the original workspace (See [server configuration](guides/2-server-config.html)).

⚠️ While it is possible to copy the workspace as well, you should carefully consider Version Control and Continuous Integration for the long-term maintainability of your project (See our [Version Control](guides/5-version-control.html) and [Updates](guides/6-updates.html) guides).

📝 Copying the "app" object is fine if you just want to customize the application's configuration and web services. If you copy the workspace and edit the source code, you should be comfortable with the following section.

## Develop an application

SBA developers should be familiar with the following topics:

- General web development (HTML, CSS and JavaScript languages)
- The basics of the [Angular](https://angular.io/tutorial) library (e.g., complete a tutorial)

Then, new developers should use this website to become familiar with the Sinequa-specific concepts. In particular:

- The [tutorial](tutorial/tutorial.html) is a good way to understand the main Sinequa services and components. It can be completed in a few hours.
- The [architecture](guides/1-architecture.html), [development](guides/3-development.html) and [version control](guides/5-version-control.html) guides are important first reads as well.
- The [tips & tricks](tipstricks/tipstricks.html) can also answer many common beginner questions.

BUT, if you are a learn-by-doing person who doesn't read documentation if they can avoid it, and you really just want to get started ***now***, then let's go:

1. Clone the repository

    ```bash
    git clone https://github.com/sinequa/sba-angular.git
    cd sba-angular
    ```

2. Install dependencies with [npm](https://www.npmjs.com/)

    ```bash
    npm install
    ```

3. Build Vanilla Search and test it on our demo server (Sinequa account required):

    ```bash
    npm run start:vanilla
    ```

    This commands is shorthand for `ng serve vanilla-search --ssl=true --proxy-config=./projects/vanilla-search/src/proxy.conf.json`. It builds the application then serves it on your computer at `https://localhost:4200`. The proxy file specifies the URL of the Sinequa server (in this case, our [demo server](https://vm-su-sba.sinequa.com:13343))

## Maintain and monitor an existing application

If you manage an existing application, you typically have to perform different tasks:

- **Monitor the usage of the application** (evaluate the adoption, the relevance of search results, the performance of the engine, read user feedback, etc.). Fortunately, *there's an app for that!* The [Usage Analytics application](apps/4-usage-analytics.html) displays all this information within a set of dashboards.

  📝 The SBA standard components and applications have a built-in audit system that records all relevant user actions into logs. These logs can be periodically indexed in an audit index. The Usage Analytics application computes metrics directly based on this data.

- **Modify the application's configuration**. Applications can be customized without changing their source to some extent. The Sinequa server lets

- **Implement small changes in the application** (bug fixes, new features).

- **Update the SBA Framework**

---
layout: default
title: Prerequisites
parent: Getting Started
nav_order: 1
---

# Prerequisites

## Sinequa server

SBA are built on top of the Sinequa REST API. You need to properly setup and configure a Sinequa server and index some content, which is out of the scope of this documentation.

Apps themselves can be hosted on various types of servers:

- The Sinequa server itself, which is generally the case in production, although not an obligation.
- Any other server will do too, with the limitation that the origin of the application being different from the origin of the Sinequa API can cause [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues.
- Your own local computer (localhost), which is very useful during the development phase.

![Serving a SBA]({{site.baseurl}}assets/gettingstarted/serving.png)

*An application always gets data from a Sinequa server, but the app itself can be hosted or deployed in other places*
{: .text-center }

The Sinequa server needs some specific configuration to enable the SBA. Read [Server-side Setup](server-setup.html) to know more.

## Development environment

A SBA developer will require the following:

- An Internet connection, to download 3rd party libraries from the Internet, via [npm](https://www.npmjs.com/) (Node Package Manager). Note that this is stricly speaking not a requirement, since these libraries could be manually copied into the environment.
- Access to the Sinequa server over HTTP or HTTPS.
- An account on this Sinequa server, giving access to a reasonable amount of content, to perform tests.

Developers need to be familiar with [Angular](https://angular.io/) and [Bootstrap](https://getbootstrap.com/) (the styling library primarily used in the SBA framework). Specific knowledge about Sinequa is not required per se, although it may be useful to understand where the data comes from, how it may be customized and what additional features may be enabled through custom APIs and plugins.

It is also recommended to use [Git](https://git-scm.com/) to track changes in the project, work collaboratively and deploy the app on the server (See [Workflows](workflow.html)).

To setup the development environment when these prerequisites are met, read [Developer-side Setup](dev-setup.html).
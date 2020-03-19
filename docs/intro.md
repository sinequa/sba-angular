---
layout: default
title: Introduction
nav_order: 2
description: "Introduction to the SBA framework"
permalink: /intro
---
{: toc}

# Introduction to the SBA framework

**SBA** stands for *Search-Based Application*. It is a type of application that provides users access to large amounts of data. Because of this large volume, a **search engine** is at the heart of the application to retrieve and display only the most relevant piece of information. Such applications typically embark other technologies (like **Natural Language Processing** and **Machine Learning** algorithms) that, like Search, help turn Big Data into useful insights.

Specifically in this framework, SBA are built on top of **Sinequa's REST API** (which provides access to data stored in indexes and to functionality and algorithms packaged in the platform).

## Purpose of the Framework

The purpose of this framework is to provide **all the building blocks required to quickly develop and deploy a rich and customized Search-Based Application**, that perfectly matches the requirements of a large and complex organization.

Additionally, the framework includes sample applications (like [Hello-Search](modules/hello-search/hello-search.html) and [Vanilla-Search](modules/vanilla-search/vanilla-search.html)) which may be used as a starting point for a project.

![Bricks](/assets/intro/bricks.png)
*An application is decomposed into small building blocks*
{: .text-center }

The framework allows to create applications that are much richer and more complex than an Enterprise Search like Vanilla-Search. The project below took about three weeks to complete, using the framework as well as other third-party libraries.

<iframe src="https://player.vimeo.com/video/375472589" width="100%" height="400px" frameborder="0" title="Intelligence demo" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Design Principles

### Single-Page Applications

The SBA framework is built on top of [Angular](https://angular.io/), a TypeScript-based open-source web application framework. Applications built on top of Angular are *Single-Page Applications* or **SPA**. In a SPA, the HTML is built dynamically on the client-side by JavaScript code, and the page is never reloaded. The client communicates with the server via Web Services, and more specifically in our case via the stateless Sinequa REST API.

This contrasts strongly with the former User Interface framework embarked in Sinequa in which the web pages were built by the server, which had to track the user actions in a server-side session. SPA have become an industry standard, as their speed provide a better User Experience, and their modular architecture scales better with the size of a project.

![SPA](/assets/intro/spa.png)
*Former UI framework (left) vs. SBA framework (right)*
{: .text-center }

Note that customization which used to be done on the server (e.g. with a *SearchPlugin*) can now be done on the client side in Angular. In some cases, it is required to modify the behaviour of a REST API or create a new custom API. In these cases, it is still possible to use server-side plugins (*QueryPlugin*, or *JsonMethodPlugin*).

### Modular Architecture

At the heart of the framework is the concept of **Angular workspace**. A workspace is not just a single Angular app or library, it is a directory that contains multiple libraries and apps, while sharing the same global configuration and dependencies (`package.json`, `tsconfig.json`, `angular.json`). For more information, please refer to the [Angular documentation](https://angular.io/guide/file-structure#multiple-projects) on this topic.

We release a complete workspace with:

- [**Core**](modules/core/core.html) (aka `@sinequa/core`): A low-level Angular library containing a wrapper of the Sinequa REST API, as well as dependencies to log in to the platform with various authentication protocols.
- [**Components**](modules/components/components.html) (aka `@sinequa/components`): A high-level library containing a set of Angular modules, each packaging an independant functionality. These modules are meant to be independant from each other (with exceptions, as some functionality enable other functionalities).
- **Sample Applications**: Currently two applications are included. [**Hello Search**](modules/hello-search/hello-search.html) is a minimalistic application (the "Hello world" of search) used essentially for trainings. [**Vanilla Search**](modules/vanilla-search/vanilla-search.html) is a full-fledged Enterprise Search application which can be used as is, or as the starting point of an Enterprise Search project.

![SBA architecture](/assets/intro/architecture.png)
*Content of the Angular workspace*
{: .text-center }

In the [Getting Started](gettingstarted/gettingstarted.html) section, you will see how to build each library and application in the workspace.

The SBA framework is built in a modular way, to maximize the reusability of functionalities and components. We package small, generic, and configurable components in the **Components library**. In contrast, our **applications** contain a small number of large and specific components, which are meant to be taken as examples of how to assemble together the small library components.

Developer are encouraged to embrace this pattern and develop their own reusable component libraries, which may eventually be used in multiple Search-Based Applications.

### Developer-Friendly Paradigm

The SBA framework is optimized for developer adoption and fast delivery of custom applications. In previous approaches, administrators of the Sinequa platform were given a lot of flexibility to customize their applications with form-based configuration. In contrast, the new SBA are customized by Angular developers by modifying the HTML templates and TypeScript controllers of the Angular components.

This approach allows developers to work fairly independently from the Sinequa back-end configuration. In fact, SBA developers do not need to install Sinequa locally in order to work. They only need a single instance of Sinequa running on a server with its REST API turned on (the back-end and its API may actually be administered by a completely different team).

### Open Source

We choose to release this framework as open source, to give more power to our customers and foster a worldwide community of developers. A consequence of this choice is that developers may fully modify the source code, and adapt it to their needs. When updates are delivered via Sinequa releases or via this repository, these updates may therefore cause breaking changes and require adaptations of the applications source code (which typically happens when we upgrade the version of Angular or another 3rd party libraries). For this reason, updates should be performed knowingly and selectively, rather than systematically.

Note that the process of update may be performed via our [Github repository](https://github.com/sinequa/sba-angular). Fork or clone our repository in your own environment, and use `git pull` to retrieve new versions of our libraries and apps. One benefit of this approach is that you can naturally leverage Git to understand changes and resolve potential conflicts with your project.

We use [Github](https://github.com/sinequa/sba-angular) to manage the project, collect issues, and discuss evolutions of the framework. The community may benefit from features (and even whole apps) developed in unrelated projects. We welcome your [contributions](contribute)!

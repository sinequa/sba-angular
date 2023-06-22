---
layout: default
title: Introduction
nav_order: 1
description: "Sinequa's SBA Framework Documentation"
---

# SBA Framework Documentation

The SBA Framework is a set of modular components that can be used to quickly build *Search-Based Applications* with [Sinequa](#about-sinequa).

The SBA Framework is [open-source](https://github.com/sinequa/sba-angular) and based on [Angular](https://angular.io/). Applications are [Single-Page Applications](https://en.wikipedia.org/wiki/Single-page_application) (SPA): They are written in [Typescript](https://www.typescriptlang.org/), are compiled into JavaScript and communicate with Sinequa through its REST API.

![SBA architecture]({{'/assets/index/architecture.png' | relative_url}})

The framework includes the following **libraries**:

- [**Core**](libraries/core/core.html) (`@sinequa/core`): Provides services for calling the Sinequa REST API and authenticating users via standard protocols supported by Sinequa (OAuth, SAML, etc.).
- [**Components**](libraries/components/components.html) (`@sinequa/components`): Provides a set of functionalities (e.g., search, facets, autocomplete, preview, etc.) packaged as independent Angular modules. These modules include *components*, *directives* and *services*, which can be assembled into full-fledged applications.
- [**Analytics**](libraries/analytics/analytics.html) (`@sinequa/analytics`): Provides a set of advanced visualization components (e.g., charts, grid, network, map, etc.), generally based on third-party libraries.
- [**UI Builder**](libraries/ngx-ui-builder.html) (`@sinequa/ngx-ui-builder`): A standalone library to create no-code tools and applications. This library powers the [Vanilla Builder](apps/5-vanilla-builder.html) application directly.

The framework also includes the following **applications** built directly with the above libraries. These applications can be used as-is or as a starting point for a new custom project.

- [**Hello Search**](apps/1-hello-search.html) is a minimalistic application (the "Hello world" of search) used essentially for training and [tutorials]({{site.baseurl}}tutorial/tutorial.html).
- [**Vanilla Search**](apps/2-vanilla-search.html) is a full-fledged Enterprise Search application. It features a faceted search User Interface, an advanced autocomplete, a highlighted document preview, and various functionalities like document tagging, saved queries, and so on.
- [**Pepper**](apps/3-pepper.md) is a search & analytics application designed as an interactive dashboard. It is especially useful for advanced use cases such as content analytics, e-discovery or investigation.
- [**Usage Analytics**](apps/4-usage-analytics.html) is an application that displays metrics and timelines of the usage of Sinequa applications. It is meant to help administrators optimize the adoption of their SBAs. 
- [**Vanilla Builder**](apps/5-vanilla-builder.html) is a no-code application builder that lets Sinequa administrators customize the Vanilla Search user interface. It is a good way to get started with SBAs without having to learn technologies like Angular.
- [**Chat Integration**](apps/6-chat-integration.md) is a sample integration for generative language models (such as GPT-4, powering [ChatGPT](https://openai.com/blog/chatgpt)) within the [Vanilla Search](apps/2-vanilla-search.md) application.


<iframe src="https://player.vimeo.com/video/534455071" width="100%" height="400px" frameborder="0" title="Pepper" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
*The Pepper SBA sample*
{: .text-center }

---

## About Sinequa

*Sinequa brings the leading platform for intelligent search to large, global companies and government agencies. Our platform is deployed on four continents, and the company has offices in New York, Paris, San Francisco, London, and Frankfurt.*

Sinequa excels at **searching** and **extracting** information from **unstructured data** (like text in natural language from documents and files). However, Sinequa can be readily process large amounts of both **structured and unstructured data**, enabling many use cases in large and complex organizations across industries. These use cases include, but are not limited to, **Enterprise Search** (An enterprise-wide smart search engine that includes many heterogeneous sources of content and tens of millions of documents), **360° Views** (An application that retrieves all relevant information about a product, person or any other entity across heterogenous and unstructured data sources), and more **specialized applications** (e.g., GDPR compliance, contract analysis, customer support portal, data loss prevention, pharmaceutical R&D, etc.).

The platform integrates proprietary and open-source technologies to deliver top performance and relevance in **Search**, **Natural Language Processing** and **Machine Learning**. We provide rich and extensible User Interfaces with our Angular-based SBA framework. We release this framework as open source, to give our customers more flexibility and foster a worldwide community of developers.

![Sinequa platform](/assets/index/sinequa-platform.png)
*Overview of the Sinequa platform*
{: .text-center }


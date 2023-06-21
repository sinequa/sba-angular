---
layout: default
title: Introduction
nav_order: 1
description: "Sinequa's SBA Framework Documentation"
---

# SBA Framework Documentation

The SBA Framework is a set of modular components to quickly build *Search-Based Applications* with [Sinequa](#about-sinequa).

The SBA Framework is [open-source](https://github.com/sinequa/sba-angular) and based on [Angular](https://angular.io/). Applications are [Single-Page Applications](https://en.wikipedia.org/wiki/Single-page_application) (SPA): They are written in [Typescript](https://www.typescriptlang.org/), compiled into JavaScript and communicate with Sinequa through its REST API.

![SBA architecture]({{'/assets/index/architecture.png' | relative_url}})

The framework includes the following **libraries**:

- [**Core**](libraries/core/core.html) (`@sinequa/core`): Provides services for calling the Sinequa REST API and authenticating users via standard protocols supported by Sinequa (Oauth, SAML...).
- [**Components**](libraries/components/components.html) (`@sinequa/components`): Provides a set of functionalities (eg. search, facets, autocomplete, preview, etc.) packaged as independant Angular modules. These modules include *components*, *directives* and *services* which can be assembled into full-fledged applications.
- [**Analytics**](libraries/analytics/analytics.html) (`@sinequa/analytics`): Provides a set of advanced visualization components (charts, grid, network, map, etc.), generally based on third-party libraries.
- [**UI Builder**](libraries/ngx-ui-builder.html) (`@sinequa/ngx-ui-builder`): A standalone library to create no-code tools and applications. This library directly powers the [Vanilla Builder](apps/5-vanilla-builder.html) application.

The framework also includes the following **applications**, directly built with the above libraries. These applications can be used as-is, or as a starting point for a new custom project.

- [**Hello Search**](apps/1-hello-search.html) is a minimalistic application (the "Hello world" of search) used essentially for trainings and [tutorials]({{site.baseurl}}tutorial/tutorial.html).
- [**Vanilla Search**](apps/2-vanilla-search.html) is a full-fledged Enterprise Search application. It features a faceted search User Interface, an advanced autocomplete, a highlighted document preview, and various functionalities like document tagging, saved queries, and so on.
- [**Pepper**](apps/3-pepper.md) is a search & analytics application designed as an interactive dashboard. It is especially useful for advanced applications such as content analytics, e-discovery or investigation use-cases.
- [**Usage Analytics**](apps/4-usage-analytics.html) is an application that displays metrics and timelines of the usage of Sinequa applications. It is an application meant to help administrators optimize the adoption of their SBAs. 
- [**Vanilla Builder**](apps/5-vanilla-builder.html) is a no-code application builder that lets Sinequa administrators customize the user interface of an SBA. It is a good way to get started with SBAs without having to learn technologies like Angular.
- [**Chat Integration**](apps/6-chat-integration.md) is a sample integration of generative language models (such as GPT-4, powering [ChatGPT](https://openai.com/blog/chatgpt)) at the heart of the [Vanilla Search](apps/2-vanilla-search.md) application.


<iframe src="https://player.vimeo.com/video/534455071" width="100%" height="400px" frameborder="0" title="Pepper" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
*The Pepper SBA sample*
{: .text-center }

---

## About Sinequa

*Sinequa is an independent software vendor providing a search and analytics platform for Global 2000 companies and government agencies. Our platform, Sinequa ES, is deployed on four continents and the company has offices in New York, Paris (HQ), San Francisco, London, and Frankfurt.*

Sinequa excels at **searching** and **extracting** information from **unstructured data** (like text in natural language from documents, files and databases). The Sinequa ES platform can nevertheless process large amounts of both **structured and unstructured data**, enabling many use-cases in large and complex organizations, across industries. These use-cases include non-exhaustively: **Enterprise Search** (An entreprise-wide smart search engine, including many heterogeneous sources of content and tens of millions of documents), **360° Views** (Application retrieving all relevant information about a product, person or any other entity, across heterogenous and unstructured data sources), as well as more **specialized applications** (GDPR compliance, contract analysis, customer support portal, data loss prevention, pharmaceutical R&D, etc.).

The platform integrates proprietary and open-source technologies to deliver top performance and relevance in **Search**, **Natural Language Processing** and **Machine Learning**. We provide rich and extensible User Interfaces with our Angular-based SBA framework. We release this framework as open source, to give our customers more flexibility and foster a worldwide community of developers.

![Sinequa platform](/assets/index/sinequa-platform.png)
*Overview of the Sinequa platform*
{: .text-center }


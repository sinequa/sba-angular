---
layout: default
title: Introduction
sidebar_position: 1
description: "Sinequa's SBA Framework Documentation"
---

# SBA Framework Documentation

The SBA Framework is a set of modular components that can be used to quickly build *Search-Based Applications* with [Sinequa](#about-sinequa).

The SBA Framework is [open-source](https://github.com/sinequa/sba-angular) and based on [Angular](https://angular.io/). Applications are [Single-Page Applications](https://en.wikipedia.org/wiki/Single-page_application) (SPA): They are written in [Typescript](https://www.typescriptlang.org/), are compiled into JavaScript and communicate with Sinequa through its REST API.

![SBA architecture](/assets/index/architecture.png)

The framework includes the following **libraries**:

- [**Core**](/docs/libraries/core/core.md) (`@sinequa/core`): Provides services for calling the Sinequa REST API and authenticating users via standard protocols supported by Sinequa (OAuth, SAML, etc.).
- [**Components**](/docs/libraries/components/components.md) (`@sinequa/components`): Provides a set of functionalities (e.g., search, facets, autocomplete, preview, etc.) packaged as independent Angular modules. These modules include *components*, *directives* and *services*, which can be assembled into full-fledged applications.
- [**Analytics**](/docs/libraries/analytics/analytics.md) (`@sinequa/analytics`): Provides a set of advanced visualization components (e.g., charts, grid, network, map, etc.), generally based on third-party libraries.
- [**UI Builder**](/docs/libraries/ngx-ui-builder.md) (`@sinequa/ngx-ui-builder`): A standalone library to create no-code tools and applications. This library powers the [Vanilla Builder](/docs/apps/5-vanilla-builder.md) application directly.

The framework also includes the following **applications** built directly with the above libraries. These applications can be used as-is or as a starting point for a new custom project.

- [**Hello Search**](/docs/apps/1-hello-search.md) is a minimalistic application (the "Hello world" of search) used essentially for training and the [tutorial](/docs/tutorial/tutorial.md).
- [**Vanilla Search**](/docs/apps/2-vanilla-search.md) is a full-fledged Enterprise Search application. It features a faceted search User Interface, an advanced autocomplete, a document preview with highlights, and various functionalities like document labels, saved queries, and so on.
- [**Pepper**](/docs/apps/3-pepper.md) is a search & analytics application designed as an interactive dashboard. It is especially useful for advanced use cases such as content analytics, e-discovery or investigation.
- [**Usage Analytics**](/docs/apps/4-usage-analytics.md) is an application that displays metrics and timelines of the usage of Sinequa applications. It is meant to help administrators optimize the adoption of their SBAs. 
- [**Vanilla Builder**](/docs/apps/5-vanilla-builder.md) is a no-code application builder that lets Sinequa administrators customize the Vanilla Search user interface. It is a good way to get started with SBAs without having to learn technologies like Angular.
- [**LLM Integration**](/docs/apps/6-llm-integration.md) is a sample integration for generative language models (such as GPT-4, powering [ChatGPT](https://openai.com/blog/chatgpt)) within the [Vanilla Search](/docs/apps/2-vanilla-search.md) application.

<div className="text--center">
  <iframe src="https://player.vimeo.com/video/534455071" width="100%" height="400px" frameBorder="0" title="Pepper"></iframe>
  <em>The Pepper SBA sample</em>
</div>

---

## About Sinequa

*Sinequa brings the leading platform for intelligent search to large, global companies and government agencies. Our platform is deployed on four continents, and the company has offices in New York, Paris, San Francisco, London, and Frankfurt.*

Sinequa excels at **searching** and **extracting** information from **unstructured data** (like text in natural language from documents and files). However, Sinequa can be readily process large amounts of both **structured and unstructured data**, enabling many use cases in large and complex organizations across industries. These use cases include, but are not limited to, **Enterprise Search** (An enterprise-wide smart search engine that includes many heterogeneous sources of content and tens of millions of documents), **360° Views** (An application that retrieves all relevant information about a product, person or any other entity across heterogenous and unstructured data sources), and more **specialized applications** (e.g., GDPR compliance, contract analysis, customer support portal, data loss prevention, pharmaceutical R&D, etc.).

The platform integrates proprietary and open-source technologies to deliver top performance and relevance in **Search**, **Natural Language Processing** and **Deep Learning**. We provide rich and extensible User Interfaces with our Angular-based SBA framework. We release this framework as open source to give our customers more flexibility and to foster a worldwide community of developers.

![Sinequa platform](/assets/index/sinequa-platform.png)
<div className="text--center">
  <em>Overview of the Sinequa platform</em>
</div>



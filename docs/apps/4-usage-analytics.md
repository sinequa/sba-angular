---
layout: default
title: Usage Analytics
parent: Applications
nav_order: 4
---

# Usage Analytics
*Usage analytics* is a set of analytic dashboards that lets the Sinequa administrators/users track the activity on search application(s).

This application relies on [dataset web service(s)](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-sba-ws-dataset.html) that requests an [audit-type index](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-indexing-indexes.html). It is designed to be fully customizable via a simple JSON configuration.

![Usage analytics]({{site.baseurl}}assets/apps/usage-analytics.PNG)

*Usage analytics* has **a unique route** made of many subcomponents from the [`@sinequa/components`]({{site.baseurl}}libraries/components/components.html) and [`@sinequa/analytics`]({{site.baseurl}}libraries/analytics/components.html) library:

- The **App** component, which is essentially a wrapper for the [`<router-outlet>`](https://angular.io/api/router/RouterOutlet).
- A **Audit** route, allowing users to browse analytic dashboards and customize them. Dashboards are built on top of the [**angular-gridster2**](https://tiberiuzuld.github.io/angular-gridster2/) library.

To access the comprehensive technical documentation of *Usage analytics*, please refer to the detailed information available in the [GitHub repository](https://github.com/sinequa/usage-analytics)

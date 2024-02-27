---
layout: default
title: Usage Analytics
parent: Applications
nav_order: 4
---

# Usage Analytics
*Usage analytics* is a set of analytic dashboards that lets Sinequa administrators/users track the activity of their application(s).

This application relies on the [dataset web service](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-sba-ws-dataset.html) to fetch usage data from an [audit-type index](https://doc.sinequa.com/en.sinequa-es.v11/Content/en.sinequa-es.admin-indexing-indexes.html). The application is designed to be fully customizable via a simple JSON configuration.

![Usage analytics](/assets/apps/usage-analytics.PNG)

*Usage analytics* has a single route "/audit". The dashboards are composed of many standard components from the [`@sinequa/components`](/docs/libraries/components/components.md) and [`@sinequa/analytics`](/docs/libraries/analytics/analytics.md) libraries. The 2 top-level components are:

- The **App** component, which is essentially a wrapper for the [`<router-outlet>`](https://angular.io/api/router/RouterOutlet).
- An **Audit** route, allowing users to browse analytic dashboards and customize them. Dashboards are built on top of the [**angular-gridster2**](https://tiberiuzuld.github.io/angular-gridster2/) library, like the [dashboard module](/docs/libraries/analytics/dashboard.md) powering [Pepper](3-pepper.md).

To access the comprehensive technical documentation of *Usage analytics*, please refer to the detailed information available in the [GitHub repository](https://github.com/sinequa/usage-analytics)

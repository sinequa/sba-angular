---
layout: default
title: 11.4.1
nav_order: 108
parent: Releases
---


[See on Github](https://github.com/sinequa/sba-angular/releases/tag/1.1.1){:.d-block .text-right }

This update brings many small improvements and bug fixes to the SBA framework.

The most significant changes include:
- Upgrade to **Angular 10**, which significantly improves the build performance
- A refactoring of the **HTTP interceptors** to make them more transparent and easy to customize. There are now 3 independent interceptors that should be added to your application's list of providers:
  - Login interceptor: takes care of initiating login/authentication when the server requires it.
  - Audit interceptor: requests to the Sinequa API can include audit events. This interceptor can be used to customize globally the content of these events.
  - Notifications interceptor: the server can now transmit notification messages in the JSON response of any request. This interceptor catches these notifications globally and displays them via the notifications service.
⚠️ When pulling this update into your project, do not forget to inject these interceptors into your own application(s), as it is done [here in Vanilla Search](https://github.com/sinequa/sba-angular/blob/a91aa40db32e4bf43e3f64fb6399972be4a1ee13/projects/vanilla-search/src/app/app.module.ts#L159)
- We release a new **Network component** in Beta. The component is based on the [Vis.js library](https://visjs.github.io/vis-network/docs/network/) and displays a graph that can be formed from Sinequa data (records, aggregations, metadata) in a flexible manner. Read the documentation [here](https://sinequa.github.io/sba-angular/modules/components/network.html).
- The **Query Export** functionality now lets the user select which columns to export into a file (CSV, XLSX, etc.).

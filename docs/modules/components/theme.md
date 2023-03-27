---
layout: default
title: Sinequa Theme
parent: Components
grand_parent: Modules
nav_order: 21
---

# Sinequa Theme

An additional theme is available to make Vanilla more modern with improvements such as better colors and paddings. All files related to this new theme are packaged inside `@sinequa/components/theme`.

Bootstrap provides a global set of styles and utilities that are used across the SBA framework. Our components and applications often use classes like `.card`, `.list-group` or `.navbar` which give them Bootstrap's "look & feel".

These styles can be customized, via SASS and CSS variables. The Sinequa Theme uses this approach by setting variables like `$bg-color` to redefine the color, border, padding, and many other properties of standard Bootstrap components.

## Previews

### Homepage

Without the theme:
![Homepage without the theme]({{site.baseurl}}assets/modules/theme/theme-1.png){: .d-block .mx-auto width="100%"}

With the theme:
![Homepage with the theme]({{site.baseurl}}assets/modules/theme/theme-2.png){: .d-block .mx-auto width="100%"}

### Results page

Without the theme:
![Results without the theme]({{site.baseurl}}assets/modules/theme/theme-3.png){: .d-block .mx-auto width="100%"}

With the theme:
![Results with the theme]({{site.baseurl}}assets/modules/theme/theme-4.png){: .d-block .mx-auto width="100%"}

## Importing/removing the theme

In your `app.scss`, just add or remove this imports:

```scss
@import "@sinequa/components/theme/sinequa";
```

* Sinequa theme includes Bootstrap imports.
* Sinequa theme come with an integrated Dark theme.

## Customization

Sinequa Theme overrides Bootstrap components using Sass files.
If you want to customize your application, do not overrides the Sinequa Theme files. Instead:
* overrides Bootstrap components as Sinequa Theme do [https://getbootstrap.com/docs/5.2/customize/overview/](https://getbootstrap.com/docs/5.2/customize/overview/)

OR

* import our `minimalist` Bootstrap files and write your custom css rules

  ```scss
  @import "@sinequa/components/theme/minimal"
  ```
  * contains Bootstrap imports
  * contains recommended imports to work with SBA components
  * does not include Dark theme

OR

* import our `recommended` Bootstrap files

  ```scss
  @import "@sinequa/components/theme/recommended"
  ```
  * contains Bootstrap imports
  * contains recommended imports with specific scss files to notifications and avdanced components.
  * contains also a minimalist Bootstrap Dark theme.
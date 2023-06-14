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

These styles can be customized, via SASS and CSS variables. The Sinequa Theme uses this approach by setting variables like `--bs-btn-color` to redefine the color, border, padding, and many other properties of standard Bootstrap components.

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

In your `app.scss`, you can add or remove these imports after the one for Bootstrap:

```scss
@import "../../../components/theme/vanilla";
@import "../../../components/theme/vanilla-dark";
```

Although they're in two different files, it's recommended to import both standard and dark files for the theme to work better.

## Customize which component theme to import

The theme modifications are split in many SCSS files per components you can find under `components/theme/components` so you can import them independently.

Note that some global Vanilla styling is done inside `components/theme/_vanilla.scss` that you may want to keep if you edit the files you wish to import.

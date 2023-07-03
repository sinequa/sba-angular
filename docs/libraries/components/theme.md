---
layout: default
title: Sinequa Theme
parent: Components
grand_parent: Libraries
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

In your `app.scss`, you have these lines:

```scss
// @import "../../../components/theme/minimal";
@import "../../../components/theme/sinequa";
```

To import or remove the theme, you can switch of import between `minimal` (the very basic one) and `sinequa` (with the complete theme).

Note that both files include Bootstrap imports and come with an integrated Dark theme.

## Architecture

As mentioned at the beginning, all files are located inside `@sinequa/components/theme`. They are organized as follow:

![Theme architecture]({{site.baseurl}}assets/modules/theme/theme-architecture.png){: .d-block .mx-auto width="100%"}

The components are designed to be minimally styled, with the least styling to be usable with Bootstrap. They are also unopiniated with the most simple and neutral customization. This styling is available while using the `minimal` theme which only imports the basic files such as Bootstrap, Fontawesome and the minimum of files to have everything working.

Only the `sinequa` theme inserts opiniated customization. It is based on `minimal` and imports with it all variables along with the files inside `components` and `sba`.

## Customization

### How to customize

Sinequa Theme overrides Bootstrap components using Sass files.
If you want to customize your application, do not overrides the Sinequa Theme files. Instead:

* override Bootstrap components as Sinequa Theme does [https://getbootstrap.com/docs/5.2/customize/overview/](https://getbootstrap.com/docs/5.2/customize/overview/)

OR

* import our `minimalist` Bootstrap files and write your custom css rules

  ```scss
  @import "@sinequa/components/theme/minimal"
  ```
  * contains Bootstrap imports
  * contains recommended imports to work with SBA components

### Examples

#### Updating a few variables

You may just want to use the whole Sinequa theme but update some properties like colors or borders. Let's say we want to :
* change the facet header background
* add a border to the facets and remove the border radius
* change the links color

You can have your `app.scss` like this in [Vanilla Search](../apps/2-vanilla-search.html):

```scss
// theme overrides
$card-cap-bg: #ddffe4; // facet header background
$card-border-width: .1rem; // facet border
$card-border-radius: 0; // facet border radius

// Sinequa global theme (contains Bootstrap imports)
@import "../../../components/theme/sinequa";

// SBA components custom CSS overrides
@import "vanilla";

// result title + result source color
.sq-result-title, sq-result-source a {
    color: green;
}
```

This will change this :

![Theme example before]({{site.baseurl}}assets/modules/theme/theme-example-1.png){: .d-block .mx-auto }

Into this:

![Theme example after]({{site.baseurl}}assets/modules/theme/theme-example-2.png){: .d-block .mx-auto }


#### Customize the files you want

You may also not want the whole package from what `sinequa` offers. In that case, you can import `minimal` and then any other files you need.

A possibility would be to check at the `sinequa` content and pick what you need. Let's say you don't need the sba files, you can have your `app.scss` like this:

```scss
// the variables (needed in most components and sba files)
@import "../../../components/theme/colors";
@import "../../../components/theme/variables";

// the minimal theme
@import "../../../components/theme/minimal";

// the components files
@import "../../../components/theme/components/forms";
@import "../../../components/theme/components/buttons";
@import "../../../components/theme/components/dropdown";
@import "../../../components/theme/components/tabs";
@import "../../../components/theme/components/alerts";
@import "../../../components/theme/components/pagination";

// SBA components custom CSS overrides
@import "vanilla";
```
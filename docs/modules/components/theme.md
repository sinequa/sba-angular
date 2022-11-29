---
layout: default
title: New theme
parent: Components
grand_parent: Modules
nav_order: 21
---

# New theme

The update 11.9.0 has introduced into Vanilla a new theme to make it more modern. It doesn't _disrupt_ the previous design but it adds some improvements to make it look better such as better colors and paddings.

All files related to this new theme are packaged inside `@sinequa/components/theme`.

It is still directly linked to Bootstrap's styling since most of the modified properties are its CSS variables, like `--bs-btn-color` for the font color of the buttons.

## Importing/removing the theme

In your `app.scss`, you can add or remove this import:

```scss
@import "../../../components/theme/vanilla";
@import "../../../components/theme/vanilla-dark";
```

Although they're in two different files, it's recommended to import both standard and dark files for the theme to work better.

## Customize which component theme to import

The theme modifications are split in many SCSS files per components you can find under `components/theme/components` so you can import them independently.

Note that some global Vanilla styling is done inside `components/theme/_vanilla.scss` that you may want to keep if you edit the files you wish to import.

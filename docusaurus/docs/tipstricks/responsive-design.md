---
layout: default
title: Responsive Design
parent: Tips and Tricks
sidebar_position: 4
---

# Responsive Design

*Responsive web design (RWD) is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes.* ([Wikipedia](https://en.wikipedia.org/wiki/Responsive_web_design))

There are multiple advantages to designing responsive apps for both the users and the developers. For example, you have no duplication of your app code in multiple "versions" of the app (mobile version, etc.). The challenge, of course, is that your app needs to manage the complexity of changing layouts, adding and removing elements based on the size of the screen. You may also make different choices of User Experience whether the user can swipe his finger on the screen or hover and click with a mouse.

## CSS Media Queries

The CSS language provides a very useful tool to make an application responsive: [Media Queries](https://www.w3schools.com/CSS/css3_mediaqueries_ex.asp).

For example, you may specify that a `.column` element must take the full width of its parent when the screen is 600px or less:

```css
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
```

Similarly, you can hide or show elements with a `display: none;` property, or change the layout with flexbox rules. The drawback of this approach is that your stylesheet is going to grow significantly.

## Bootstrap

These media query rules are also used by UI frameworks, like [**Bootstrap**](https://getbootstrap.com/). With Bootstrap, rather than writing rules in *your* stylesheet, you assign predefined rules to your HTML elements with class names (these class names include screen size modifiers that make the app responsive).

The [**Grid System**](https://getbootstrap.com/docs/5.3/layout/grid/) of Bootstrap allows you to design your app according to a layout that self-adjusts depending on the size of the screen. The names of the screen size modifiers used by bootstrap are by convention `xs`, `sm`, `md`, `lg`, `xl`, and each corresponds to a default **screen width range**. These sizes can be customized for your app, by setting your own sizes in CSS variables **before** importing Bootstrap (See [the tutorial on Responsive Design](/tutorial/responsive-design.md)).

Using Bootstrap is a good way to make your application responsive, all while minimizing the size of your stylesheet. In the SBA Framework, Bootstrap is used extensively:

- In the [@sinequa/components](/libraries/components/components.md) library, in all the components whose class name are prefixed by `Bs`.
- In the [Vanilla Search](/apps/2-vanilla-search.md) application.

The features of Bootstrap that are commonly used in the framework are:

- The [**Grid System**](https://getbootstrap.com/docs/4.4/layout/grid/) (`.container`, `.row`, `.col-xx-y`): Control the layout of the app in a responsive way.
- The [**Flex**](https://getbootstrap.com/docs/4.4/utilities/flex/) utilities (`d-flex`, `flex-column`, `align-items-center`, `flex-grow-1`, etc.): Easily use all the possibilities of the Flex layout.
- The [**Spacing**](https://getbootstrap.com/docs/4.4/utilities/spacing/) utilities (`p-1`, `m-3`, `pt-0`, etc.): Easily add margin and padding to your elements.
- Various UI components, like lists (`list-group`, `list-group-item`...), forms (`form-group`, `form-group-inline`...), cards (`card`, `card-header`...), modals, etc.

## UI Service

CSS can handle a lot of the work by changing the layout and visibility of elements, but keep it mind that it works on a **fixed HTML page**. The CSS cannot add or remove elements from the DOM (at best it can toggle their *display* or *visibility*).

However, Angular is very effective at adding and removing elements from the DOM, based on application logic. The SBA framework includes a dedicated Angular service, the `UIService` (from `@sinequa/components/utils`) that allows you to test the size of the screen, and perform arbitrary actions when a change occurs.

To use the `UIService`, do the following:

- First, inject the screen sizes you want to use in your `app.module.ts` (unless you are fine with the defaults):

    ```ts title="app.module.ts"
    import { SCREEN_SIZE_RULES } from '@sinequa/components/utils';

    ...
    // Screen size breakpoints (must be consistent with Bootstrap custom breakpoints in styles/app.scss)
    export const breakpoints = {
        lg: "(min-width: 1000px)",
        sm: "(min-width: 600px) and (max-width: 999px)",
        xs: "(max-width: 599px)",
    }

    ...
        providers: [
            ...
            {provide: SCREEN_SIZE_RULES, useValue: breakpoints}
        ],
    ```

- Import the `UIService` and inject it in your component's constructor:

    ```ts
    import { UIService } from '@sinequa/components/utils';

    ...
        constructor(
            ...
            public ui: UIService
        )
    ```

- Use the service in your HTML templates and/or TypeScript controllers:

    ```html
    <div *ngIf="ui.screenSizeIsGreaterOrEqual('lg')">
    ...
    </div>
    ```

    ```ts
    if(ui.screenSizeIsGreaterOrEqual('lg')){
        ...
    }
    ```

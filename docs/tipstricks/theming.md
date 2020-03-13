---
layout: default
title: Theming
parent: Tips and Tricks
nav_order: 5
---

# Theming

If you test [Vanilla Search]({{site.baseurl}}modules/vanilla-search/vanilla-search.html), you may notice that a **dark theme** is available, and that you can dynamically switch between light and dark colors.

To build this feature, the following steps are required:

- Store the styles of your theme in a dedicated stylesheet, such as `dark.scss`, which you import at the end of `app.scss` (you can also consider [lazy loading](https://egghead.io/lessons/angular-lazy-load-css-at-runtime-with-the-angular-cli)). It is assumed that `app.scss` contains default styles (incl. Bootstrap and other 3rd party styles), which `dark.scss` overrides.

- In the case of Vanilla Search, the styles in `dark.scss` are all wrapped inside a `body.dark { .. }` rule, which means that to toggle the theme, we simply need to toggle the `dark` class on the `<body>` element:

    ```ts
    document.body.classList.toggle("dark");
    ```

- You can also test what the current theme is with:

    ```ts
    if(document.body.classList.contains("dark")) {
        ...
    }
    ```

- We need to persist the decision of the user when he chooses a theme. The [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) of the browser is a convenient place to do so:

    ```ts
    localStorage.setItem('sinequa-theme', this.isDark()? 'dark' : 'normal');
    ```

- We need to activate the theme right at the beginning of the app loading, to avoid a flickering effect. To do so, we bypass Angular and add the following script in our `index.html`:

    ```html
    <script>
    let theme = localStorage.getItem('sinequa-theme');
    if(theme && theme === 'dark'){
        document.body.classList.toggle('dark');
    }
    </script>
    ```

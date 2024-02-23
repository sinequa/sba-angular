---
layout: default
title: Third Party Libraries
parent: Tips and Tricks
sidebar_position: 10
---

# Third-Party libraries

Adding third-party libraries to your SBA works just like with a regular Angular application. See the [official documentation](https://angular.io/guide/using-libraries).

When you install a new library, say with `npm install d3`, npm also installs the dependencies of this library, and modifies your `package.json` file accordingly. This can potentially have side effects on the Sinequa libraries (which maybe rely on the same dependencies, but a different version). When you install new libraries:

- Always check what happened in your `package.json` file. Use Git to look for the added libraries and the changes of version.
- Always rebuild the Sinequa libraries ([`@sinequa/core`](/libraries/core/core.md) and [`@sinequa/components`](/libraries/components/components.md)).

Also note that you can install dependencies specifically for your application, without affecting the rest of the workspace (although this does not solve possible conflicts of version mentioned above). To do so, [add a `package.json` file](https://docs.npmjs.com/creating-a-package-json-file) at the root of your application. You can then add libraries as usual with `npm install`. Your imports will be correctly resolved in the new `node_modules/` folder, as well as in the other `node_modules/` folder at the root of the workspace (the first one takes precedence).

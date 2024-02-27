---
layout: default
title: Updates
parent: Guides
sidebar_position: 6
---

# Managing updates of the SBA framework

Sinequa publishes new versions of the SBA framework regularly (see [Releases](/docs/releases/releases.md)).

These releases include bug fixes, new features and improvements. It is, therefore, recommended that you keep your application up-to-date with the latest version of the framework.

However, the new version of the libraries may break your existing applications for various reasons:

- We update Third-Party libraries (Angular, Bootstrap, RxJS, etc.), which may have breaking changes.
- We may introduce breaking changes in our own APIs, for example, to improve the design of our components.
- Non-breaking changes (e.g., regular refactoring of our code) may conflict with your code if you have customized it independently.

These changes potentially affect all files included in the standard workspace. If you [use the standard workspace](3-development.md#use-the-standard-workspace) as the basis for your application, you will likely face [**merge conflicts**](#merge-conflicts) when you try to update the framework (with a `git pull` or `git merge` command).

If you [use the NPM packages](3-development.md#create-a-new-workspace-and-install-the-npm-packages), the update will not generate merge conflict (using `npm update @sinequa/core ...`). But you will still have to [**migrate your code**](#migrate-your-code) to adapt to the new APIs.

## Merge conflicts

### Conflicts are good!

At first, merge conflicts look like they should be avoided at all costs. But conflicts are not a bad thing. They are a natural consequence of the fact that multiple developers work in parallel on the same codebase. Conflicts are a way for Git to ask you to **review the changes** and **decide which version to keep**.

Git actually resolves most conflicts automatically when it can. The remaining conflicts are the ones that require your attention.

### Size matters

When applying a **small change** to a component (i.e., changing only a few lines of code and preserving its general usage), it is generally fine to modify the component directly, even if it is part of the Sinequa [libraries](/docs/libraries/libraries.md). The update process might generate conflicts, but they will be easy to resolve.

When applying a **large change** to a component, the update process will generate conflicts that are more difficult to resolve. In this case, it is better to **copy** or **extend** the component. This way, you fully own your code and will not face conflicts during updates (although you may still have to [migrate your code](#migrate-your-code)).

The same principle applies to the sample [applications](/docs/apps/apps.md). If you want to make a small change to an application but leave the code ownership to Sinequa, you should modify the application directly. Conversely, if your application diverges too much from the original sample app, then you should take full ownership of the application by making a copy and editing it.

### Minimize conflicts

Conflicts occur when Sinequa makes changes to files that you have also modified. To prevent conflicts, you can:

- Avoid modifying the SBA framework files when possible:
  - Choose to use the input **parameters** and **templates** of the Sinequa components when they exist.
  - Make a **copy** of a file and modify the copy. (The drawback of this approach is that your copy will not be updated when the original file is updated! So this approach can actually make the update process harder.)
  - Alternatively, **extend** a component or a service by creating a new class that inherits from the original class. (The benefit here is that you can override the methods that you want to customize, but the underlying code is still managed by Sinequa and benefits from updates.)
  - Contact us or [**contribute**](7-contribute.md) if you think that your changes should be included in the SBA framework. We are open to contributions!
- Avoid cosmetic changes like changing the indentation or the order of the properties in a JSON file. These changes are not relevant, and they will generate conflicts for no good reason. Note that these changes can sometimes be caused by your IDE or by a linter.

### Resolve conflicts

When a conflict occurs during a `git pull` or `git merge` command, Git will tell you which files are in conflict.

In Visual Studio Code, the conflicting files are highlighted, and the conflicting lines of code are marked with a red background. You can click on the "Accept Incoming Change" or "Accept Current Change" buttons to resolve the conflict.

![Visual Studio Code merge conflict](/assets/guides/git-conflict.png)

After fixing all the conflicts, you can commit your changes and continue the merge process with `git merge --continue`. In a tool like [GitHub Desktop](https://desktop.github.com/), this process is even simpler: you just have to click on the "Merge" button and then push the fixed version to your main repository.

## Migrate your code

### Library migrations

When a library is upgraded, it may introduce breaking changes. In this case, you should follow the migration guide of the library. For example:

- [Angular update guide](https://update.angular.io/)
- [Bootstrap migration guide](https://getbootstrap.com/docs/5.2/migration/)
- [RxJS change list](https://rxjs.dev/6-to-7-change-summary)

### SBA migrations

When a new version of the SBA framework is released, we describe the changes in the [release notes](/docs/releases/releases.md). You should read these notes to understand what has changed and what you need to do to migrate your code. When migrating from an older version, you should read all the release notes published since the release of the version you are currently using.

The sample applications of the SBA framework are good reference points to see how components are used. If a particular component generates errors after an update, you can check how it is used in the sample applications.

### Compile-time errors

A single breaking change can generate an overwhelming chain reaction of compile-time errors. This typically happens when an Angular component breaks an Angular module, which in turns breaks all the components that depend on that module (and so on). The errors might look like *`Can't bind to X since it isn't a known property of Y`*. But these errors are often misleading, and a good strategy to find the root cause is to look for the first error in the list.

![Compile error](/assets/guides/compile-error.png)

### Runtime errors

Similarly, some runtime errors can fill your browser console with a cascade of errors. Errors often read *`Cannot read property 'X' of undefined`*. But again, this is a generic error message that can be caused by many different things.

A good approach is to use `ng serve` (or `ng build --configuration=development`) so that your browser can provide you with useful debugging information. Then, look at the first error in the list, and click on the first item in the stack trace that belongs to your code base (as opposed to internal Angular methods). This will give you two important pieces of information:

- Which component or service to look at in your IDE.
- Which variable was `undefined` (or more generally, what was the state that caused the error). From there, you can investigate further and determine what caused this state.

After an update, it's possible that a component can now expect a mandatory input parameter that was not required previously. Compilation does not catch this type of error, but the runtime will.

![Rune error](/assets/guides/runtime-error.png)

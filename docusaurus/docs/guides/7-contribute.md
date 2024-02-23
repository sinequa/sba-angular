---
layout: default
title: Contribute
sidebar_position: 7
parent: Guides
description: Why and how to contribute
---

# Why contribute

If you find a bug, design mistake or missing feature in our code, you can actually solve that problem (for you and for the community) by pushing the fix to [Github](https://github.com/sinequa/sba-angular), and submitting a pull request. 

Of course, we also fix these types of issues, but perhaps not as fast or not in the same way as you could have done it. Contributing is a great way of influencing the trajectory of this framework in the right direction. 

Obviously, the more people contribute, the more you benefit from more innovation and more robust applications.

# How to contribute

## Git and Github

We use [Git](https://git-scm.com/) (the version control system) and [Github](https://github.com/sinequa/sba-angular) (the popular online Git repository hosting service) to manage our source code.

A Git repository contains files that were added and modified over time by developers. These changes are bundled in *commits* that come one after the other. Developers work in parallel, so this history is not a straight line. It is more like a tree, where *branches* stem out of the main trunk (the `master` branch). But unlike real trees, the goal of a branch is eventually to be *merged* back into the `master`. You can learn all about Git with online tutorials like [this one](https://learngitbranching.js.org/).

Github is a cloud service that hosts Git repositories, for communities to develop software collaboratively. Github laid down the blueprint of modern open-source development, and we choose to adopt their established conventions and guidelines. You can learn about the Github collaborative workflow in the [online documentation](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests).

## Repository structure

The repository has a `master` branch which contains the latest working and validated version of our source code. The `master` branch is also what gets packaged in Sinequa, when a new version is built and released.

Contributors cannot push code directly to the `master` branch because this could unintentionally break things. Instead, contributors can **fork the repository**, **push code in a new branch** (eg. `my-feature`) and **submit a Pull Request**. Pull Requests (PR for shorts) are the way to say *"I've done these changes, can we merge them in the `master`?"*. Your PR may not be immediately accepted (there might be conflicts with the `master`, or the need for improvements). In that case, just push additional changes in the same branch (Github detects these changes and updates the PR) until it can be merged safely.

## Rules and Good Practices

In addition to Pull Requests, Github allows to open *issues*, to discuss bugs and features openly with all the community, which we recommend doing before actually pushing code to the repository.

Contributors should take a number of rules/principles into account:

- Do not break **genericity**: The SBA framework needs to remain generic. This means all the functionality in the repository needs to be relevant and usable for more than one project. For example, never hard-code the name of your index columns.
- Do not break **modularity**: The SBA framework needs to remain modular. Modularity is broken when some code ties together various modules that are supposed to be independent from each other. Prefer breaking down your code in small independent files, and prefer creating new libraries or apps, rather than pilling up additional functionality on a bloated module.
- Do not diverge from **conventions**: We follow as much as possible Typescript and Angular good practices, so that developers are immediately familiar with our code.
- Do include **documentation** of your contribution: Documentation starts with clear comments in the source code, but can also include readme files and other markdown pages (in the `/docs` folder) that will show up automatically on this website.
- Do **internationalize** your code: Our modules include strings in three languages (English, French and German), rather than single-language hard-coded strings. Please include at least an English language file in your contributions (which we can then translate in the PR process).

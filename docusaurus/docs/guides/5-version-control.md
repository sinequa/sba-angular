---
layout: default
title: Version control
parent: Guides
sidebar_position: 5
---

# Version Control

While using a Version Control system is not mandatory, it is highly recommended for any serious development project. Using a Version Control system such as Git allows you to:

## Download the standard SBA workspace

Simply run on your local computer:

```bash
git clone https://github.com/sinequa/sba-angular.git my-project
cd my-project
```

![Git clone](/assets/guides/git-clone.png)

The Git repository contains the source code of the SBA Framework, but the dependencies (i.e., the node modules) are not included. You need to install them with:

```bash
npm install
```

(Note that the list of dependencies is defined in the `package.json` file, and the exact library versions are defined in the `package-lock.json` file.)

## Track changes in the code

View your modified files with:

```bash
git status
```

A tool like [GitHub Desktop](https://desktop.github.com/) can also help you visualize the changes in your code.

Commit your changes (to your local clone of the repository) with:

```bash
git add .
git commit -m "My commit message"
```

![Git commit](/assets/guides/git-commit.png)

## Work collaboratively with other developers

When working collaboratively, you need a central repository to host the code. This can be a private repository on an internal server or a public repository on a service like [Github](https://github.com).

:::warning
If you cloned the official SBA repository, your local clone is configured to push to that repository. But obviously, you do not have write access to it! You need to add a new remote repository that you own and have write access to.
:::
For example:
```bash
git remote add internal https://my-internal-git-server/my-project.git
```

Then you can push your changes to that repository with:

```bash
git push internal master
```

Then, other developers can clone your repository with:

```bash
git clone https://my-internal-git-server/my-project.git
```

![Git push](/assets/guides/git-push.png)

Whenever new changes are pushed to the central repository, you can pull them with:

```bash
git pull internal master
```

![Git pull](/assets/guides/git-pull.png)

`git pull` is actually a shortcut for `git fetch` (which downloads the changes) and `git merge` (which merges the changes into your local branch). If there are conflicts, the merge process will ask you to resolve them manually.

:::warning
Note that after a `git pull`, the project dependencies might have been updated, so you need to run `npm install` again.
:::

## Review and approve changes before they are deployed

A good habit is working on a separate branch for each feature or bug fix. This allows you to review the changes before they are merged into the `master` branch.

To create a new branch for a special feature, run:

```bash
git checkout -b my-feature
```

Then, commit your changes as usual.

When you are ready to merge your changes into the `master` branch, push your branch to the central repository with:

```bash
git push internal my-feature
```

Then in the central repository, create a Pull Request to merge your branch into the `master` branch. This will trigger a code review process, and the changes will only be merged into the `master` branch when they are approved.

![Git pull request](/assets/guides/git-pr.png)

After that, the branch can be deleted, and all developers can pull the changes with a simple `git pull`.

![Git delete](/assets/guides/git-delete.png)

## Update the code with new versions of the SBA Framework

The SBA repository is updated regularly. The changes might conflict with your own code, so the update process can be complicated (See the [Updates guide](6-updates.md)).

In the simple case when there are no conflicts, you can run:

```bash 
# Fetch the latest changes from the official SBA repository (your "origin" remote)
git fetch origin
# Merge the changes into your local "master" branch
git merge origin/master
```

Now your local master branch has all the commits from the official SBA repository AND all the commits from your project.

![git merge](/assets/guides/git-merge.png)

When there are conflicts (i.e., when the same lines of code were modified in both repositories), Git points them out, and you will need to resolve them manually (i.e., choose which change to keep, which change to discard, or a mix of both).

## Deploy the code on a server

A simple strategy to deploy your application on a Sinequa server is to clone the repository in the Sinequa data folder, run `npm install` and then build the application with `npm run buildvanilla`. (This command can be executed from the administration interface.) See the [deployment guide](4-deployment.md) for more details.

![Deploying on Sinequa server with Git](/assets/guides/git-server.png)

While this process works, it has some drawbacks:

- It forces you to install the node modules on the server (requiring Internet access and various tools)
- It requires you to build the application on the server (which can be slow and consume resources)
- It cannot be fully automated

## Integrate with a Continuous Integration system

A Continuous Integration (CI) system is a tool that automates the build and deployment process. It can be used to build and deploy your application on a Sinequa server and also to run automated tests and perform other tasks. It can be configured to run automatically when new commits are pushed to the central repository.

![Deploying on Sinequa server with a CI/CD pipeline](/assets/guides/git-ci.png)

Your CI system must have access to the Sinequa server. This could be done by configuring the Sinequa server to allow remote access (e.g., via PowerShell Remoting). Alternatively, the CI system could be hosted on the same server as Sinequa.

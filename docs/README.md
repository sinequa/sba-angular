# Contributing to the docs

Contributing to the SBA documentation is possible via Pull Requests on Github. The documentation is part of the same repository as the SBA source code (located under the `docs/` folder).

## Getting Started

The SBA documentation website is based on [Github Pages](https://pages.github.com/) and [Jekyll](https://jekyllrb.com/). The following instructions let you build and review the website on your local computer before pushing the documentation online.

- Download and Install a Ruby+Devkit version from [RubyInstaller Downloads](https://rubyinstaller.org/downloads/). Use default options for installation.
- Run the ridk install step on the last stage of the installation wizard. This is needed for installing gems with native extensions. You can find additional information regarding this in the RubyInstaller Documentation.
- Open a new terminal in your repository, run `cd ./docs` and run `bundle install`: This should install Jekyll and other dependencies.
- Run `bundle exec jekyll serve` and navigate to http://localhost:4000
- Now you can edit the markdown files in `docs/` and its subdirectories and the website should update automatically.

## Documentation content

The website is composed of markdown files (`.md`) which are automatically transformed into HTML by [Jekyll](https://jekyllrb.com/). For example, check the content of `docs/tutorial`, `docs/modules` or `docs/tipstricks`. Note that all the images are centralized under the `docs/assets` folder.

The markdown files can include interactive SBA components that are generated from the `projects/components-docs` Angular project. These interactive components are packaged as JavaScript "Web components" that are built and integrated in the documentation site's `docs/assets/sq-doc-app` folder. These components can be rebuilt by running `npm run builddocs`.

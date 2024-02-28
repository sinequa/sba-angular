import { themes, Prism } from "prism-react-renderer";
(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-bash");

import { Config } from "@docusaurus/types";

const lightTheme = themes.github;
const darkTheme = themes.dracula;

const config: Config = {
  title: 'Sinequa SBA Framework',
  tagline: 'Connect your modern workplace and drive innovation from the inside out',
  favicon: 'img/favicon.ico',
  staticDirectories: ['static'],

  // Set the production url of your site here
  url: 'https://github.sinequa.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/pages/CustomerSolutions/sba-internal/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sinequa', // Usually your GitHub org/user name.
  projectName: 'sba-internal', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [require.resolve('docusaurus-lunr-search')],

  markdown: {
    mdx1Compat: {
      comments: false,
      admonitions: false,
      headingIds: false
    }
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/sinequa/sba-angular/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/sinequa/sba-angular/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'SBA Framework',
        logo: {
          alt: 'Sinequa Logo',
          src: 'assets/index/sinequa-logo-light-sm.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/sinequa/sba-angular',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/tutorial/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/sinequa',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Website',
                href: 'https://sinequa.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/sinequa/sba-angular',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} <a href="https://www.sinequa.com" aria-alt="Sinequa website">Sinequa</a>. Distributed under the terms of the <a href="https://github.com/sinequa/sba-angular/blob/master/license.txt" aria-alt="MIT license">MIT license</a>`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['csharp', 'bash'],
        magicComments: [
          {
            className: 'code-block-error-line',
            line: 'code-block-error-line',
            block: {start: 'code-block-error-start', end: 'code-block-error-end'}
          },
          {
            className: 'code-block-add-line',
            line: 'code-block-add-line',
            block: {start: 'code-block-add-start', end: 'code-block-add-end'}
          },
          {
            className: 'code-block-remove-line',
            line: 'code-block-remove-line',
          }
        ]
      },
    }),
};

export default config;
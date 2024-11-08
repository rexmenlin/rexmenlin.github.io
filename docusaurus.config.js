// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Code Tenshu 程式技術天守閣",
  tagline: "一個游離在程式設計與打雜工之間，站長雷哥的程式開發分享。",
  url: "https://rexmenlin.github.io/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "rexmenlin", // Usually your GitHub org/user name.
  projectName: "rexmenlin.github.io", // Usually your repo name.
  trailingSlash: false,
  deploymentBranch: "gh-pages",
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-TW",
    locales: ["zh-TW"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "程式技術天守閣",
        logo: {
          alt: "程式技術天守閣Logo",
          src: "img/codetenshu_logo_blackwhite.png",
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'intro',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          { to: "/blog", label: "Blog文章", position: "left" },
          { to: "/blog/tags", label: "分類Tags", position: "left" },
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: '系列文章',
          },          
          // {
          //   href: 'https://rexmenlin.github.io',
          //   label: '雷哥Github (空空一物)',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Code Tenshu",
            items: [
              {
                label: "Blog文章",
                to: "/blog",
              },
              {
                label: "系列文章",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "My Hobbies",
            items: [
              {
                label: "雨田良可 | 攝影集",
                href: "https://www.facebook.com/rainfieldcoco/",
              },
              // {
              //   label: '雷哥的GitHub',
              //   href: 'https://rexmenlin.github.io',
              // },
            ],
          },
          {
            title: "About Me",
            items: [
              {
                label: "誰是雷哥",
                to: "aboutme",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Code Tenshu 程式技術天守閣.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

module.exports = config;

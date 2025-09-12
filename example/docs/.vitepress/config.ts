import type { SidebarOptions } from '@project-trans/vitepress-theme-project-trans/theme'
import type { ThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import type { DefaultTheme } from 'vitepress'
import genConfig from '@project-trans/vitepress-theme-project-trans/config'
import { withThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'

const nav: DefaultTheme.NavItem[] = [
  {
    text: '进入主页',
    link: '/zh-cn/',
  },
//  {
//    text: '贡献指南',
//    items: [
//      {
//        text: '校园版块投稿指南',
//        link: '/contributor-guide/doc.md',
 //     },
 //     {
 //       text: '其他投稿指南',
 //       link: '/contributor-guide/other.md',
 //     },
 //     {
 //       text: '校园版块贡献模板',
 //       link: '/contributor-guide/docTemplate.md',
  //    },
  //  ],
  //},
]

const baseConfig = {
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  collapsed: true,
  documentRootPath: '/docs',
} satisfies Partial<SidebarOptions>

const sidebarOptions = [
  {
    ...baseConfig,
    scanStartPath: 'zh-cn',
    resolvePath: '/zh-cn/',
    sortMenusByFrontmatterOrder: true,
  }
]

const themeConfig: ThemeContext = {
  siteTitle: 'Drug_artist',
  siteDescription: '副标题',
  // baseUrl: '/',
  /** Repo */
  githubRepoLink: 'https://github.com/kazukokawagawa/drug_artist',
  /** vitepress 根目录 */
  rootDir: 'docs',
  /** 文档所在目录（目前似未使用此项） */
  include: ['zh-cn'],
  nav,
  sidebarOptions,
  // enableChangeLog: false,
  enableSuggestionBox: false,
  HideReadingTime: true, /* 隐藏字数和预计阅读时间 */
  HideLastUpdated: true, /* 隐藏最后更新时间 */
  HideAuthors: true, /* 隐藏作者信息 */
  // fontsBaseUrl: 'http://localhost:8788', // For local development with wrangler pages dev
  disclaimerPaths: [
    {
      path: '/zh-cn/',
      summaryHtml: 'Drug_artist 中的内容，仅供参考。可能存在过时或不准确的信息，请谨慎甄别。',
//      detailHtml: '<p>RLE.wiki「大学指南」中的内容，仅供参考。可能存在过时或不准确的信息，请谨慎甄别。</p>'
//        + '<p>「大学指南」板块中的内容，多数来自于读者投稿，并经编辑简单整理和形式审查后登载，主要体现其投稿者主观观点。不代表 RLE.wiki 编辑团队及我们的任何相关维护人员立场。</p>'
//        + '<p>若存在任何有误或不当内容，请联系 <a href="mailto:rlewiki@project-trans.org">rlewiki@project-trans.org</a>。</p>',
    },
  ],
  enableDisclaimer: true,
  disclaimerStatusKey: 'disclaimerStatus',

  // i18n
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
      link: '/zh-cn/',
    }
  },
  // 添加自定义 head 元素
  // additionalHead: [
  //   ['link', { rel: 'icon', href: 'https://rle.wiki/logo-with-shadow.png' }],
  //   ['meta', { name: 'theme-color', content: '#ffffff' }],
  //   ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  // ],
}

// https://vitepress.dev/reference/site-config
export default withThemeContext(themeConfig, () => {
  return {
    ...genConfig(),
    outDir: '../dist',
    sitemap: {
//    hostname: 'https://mtf.report',
    lastmodDateOnly: true
  }
  }
})
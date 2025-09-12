import type { SidebarOptions } from '@project-trans/vitepress-theme-project-trans/theme'
import type { ThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import type { DefaultTheme } from 'vitepress'
import genConfig from '@project-trans/vitepress-theme-project-trans/config'
import { withThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'

const nav: DefaultTheme.NavItem[] = [
  { 
    text: '首页', 
    link: '/' 
  },
  { 
    text: '商店', 
    link: '/store/' 
  },
  { 
    text: '条款', 
    link: '/terms/' 
  },
]

// 默认侧边栏配置
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
  siteTitle: '药物百科',
  siteDescription: '药物百科 是一个专注于提供高质量药物信息的平台。',
  githubRepoLink: 'https://github.com/kazukokawagawa/drug_artist',
  siteLogo: '/public/logo.png',
  rootDir: 'docs',
  include: ['zh-cn', 'store', 'terms'], // 包含所有需要处理的目录
  nav,
  sidebarOptions,
  enableSuggestionBox: false, // 
  HideReadingTime: true, 
  HideLastUpdated: true, 
  HideAuthors: true,
  // fontsBaseUrl: 'http://localhost:8788', // For local development with wrangler pages dev
  disclaimerPaths: [
    {
      path: '/zh-cn/',
      summaryHtml: 'Drug_artist 中的内容，仅供参考。可能存在过时或不准确的信息，请谨慎甄别。',
    },
  ],
  enableDisclaimer: true,
  disclaimerStatusKey: 'disclaimerStatus',

  // i18n
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
      link: '/',
    }
  },
}

// https://vitepress.dev/reference/site-config
export default withThemeContext(themeConfig, () => {
  return {
    ...genConfig(),
    outDir: '../dist',
    sitemap: {

    lastmodDateOnly: true
    },
  }
})

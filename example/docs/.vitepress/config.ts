import type { DefaultTheme } from 'vitepress'
import genConfig from '@project-trans/vitepress-theme-project-trans/config'
import { withThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'

const nav: DefaultTheme.NavItem[] = [
  { 
    text: '首页', 
    link: '/' 
  },
  { 
    text: '药物百科', 
    link: '/zh-cn/' 
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

// 标准侧边栏配置 - 只在/zh-cn/目录显示药物信息
const sidebar: DefaultTheme.Sidebar = {
  '/zh-cn/': [
    {
      text: '药物信息',
      collapsed: false,
      items: [
        {
          text: '药物概述',
          items: [
            { text: '首页', link: '/zh-cn/' },
            { text: '药物分类', link: '/zh-cn/categories' }
          ]
        }
      ]
    }
  ]
}

const themeConfig = {
  siteTitle: '药物百科',
  siteDescription: '药物百科 是一个专注于提供高质量药物信息的平台。',
  githubRepoLink: 'https://github.com/kazukokawagawa/drug_artist',
  siteLogo: '/public/logo.png',
  rootDir: 'docs',
  include: ['zh-cn'], // 包含所有需要处理的目录
  nav,
  sidebar,
  enableSuggestionBox: false,
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

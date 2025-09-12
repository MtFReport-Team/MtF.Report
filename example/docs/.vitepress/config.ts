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

// 手动生成的侧边栏配置 - 保持数组格式
const sidebarOptions = [
  {
    ...baseConfig,
    scanStartPath: 'zh-cn',
    resolvePath: '/zh-cn/',
    sortMenusByFrontmatterOrder: true,
    customSidebarItems: [
      {
        text: '药物分类',
        items: [
          {
            text: 'ADHD药物',
            items: [
              { text: '利他林', link: '/zh-cn/ADHD药物/利他林.md' },
              { text: '专注达', link: '/zh-cn/ADHD药物/专注达.md' },
              { text: '择思达', link: '/zh-cn/ADHD药物/择思达.md' },
              { text: '阿德拉', link: '/zh-cn/ADHD药物/阿德拉.md' },
              { text: 'Concerta', link: '/zh-cn/ADHD药物/Concerta.md' },
              { text: 'Daytrana', link: '/zh-cn/ADHD药物/Daytrana.md' },
            ]
          },
          {
            text: 'Z药物',
            items: [
              { text: '唑吡坦', link: '/zh-cn/Z药物/唑吡坦.md' },
              { text: '右佐匹克隆', link: '/zh-cn/Z药物/右佐匹克隆.md' },
              { text: '佐匹克隆', link: '/zh-cn/Z药物/佐匹克隆.md' },
              { text: '扎来普隆', link: '/zh-cn/Z药物/扎来普隆.md' },
            ]
          },
          {
            text: 'od药物',
            items: [
              { text: '奥施康定', link: '/zh-cn/od药物/奥施康定.md' },
              { text: '羟考酮', link: '/zh-cn/od药物/羟考酮.md' },
            ]
          },
          {
            text: '其他药物',
            items: [
              { text: '曲马多', link: '/zh-cn/其他药物/曲马多.md' },
              { text: '芬太尼', link: '/zh-cn/其他药物/芬太尼.md' },
              { text: '可待因', link: '/zh-cn/其他药物/可待因.md' },
              { text: '丙戊酸', link: '/zh-cn/其他药物/丙戊酸.md' },
              { text: '加巴喷丁', link: '/zh-cn/其他药物/加巴喷丁.md' },
            ]
          }
        ]
      },
      {
        text: '首页',
        link: '/zh-cn/'
      }
    ]
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

import type {
  SidebarItem,
  SidebarMultiItem,
  VitePressSidebarOptions,
} from 'vitepress-sidebar/types'
import { generateSidebar as genSidebar } from 'vitepress-sidebar'
import { useThemeContext } from './utils/themeContext'
import { normalizePath } from 'vite'

export function generateSidebar() {
  const { sidebarOptions } = useThemeContext()
  const optionMap: Map<string, VitePressSidebarOptions> = new Map(sidebarOptions.map(obj => [obj.resolvePath!.toString(), obj]))
  
  // 增强路径处理能力，确保在不同环境下都能正常工作
  const processedSidebarOptions = sidebarOptions.map(option => {
    return {
      ...option,
      // 确保路径标准化
      resolvePath: normalizePath(option.resolvePath || '')
    }
  })
  
  const sidebar = genSidebar(processedSidebarOptions)
  for (const key in sidebar) {
    const sidebarMultiItem: SidebarMultiItem = (sidebar as any)[key]
    if (optionMap.get(sidebarMultiItem.base)?.sortMenusByFrontmatterOrder !== true) {
      sidebarMultiItem.items.sort(sidebarTitleSorter)
    }
  }
  
  // 对于药品商店页面，移除侧边栏
  if (sidebar['/store/']) {
    delete sidebar['/store/']
  }
  
  return sidebar
}

function sidebarTitleSorter(infoA: SidebarItem, infoB: SidebarItem): number {
  const textA = infoA.text
  const textB = infoB.text
  if (textA === undefined || textB === undefined)
    return 0

  const infoANfc = textA.normalize('NFC')
  const infoBNfc = textB.normalize('NFC')
  return infoANfc.localeCompare(infoBNfc, 'zh', {
    numeric: true,
  })
}

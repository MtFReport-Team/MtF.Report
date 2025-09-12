<script lang="ts" setup>
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import {
  NolebaseHighlightTargetedHeading,
} from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import AppearanceToggle from './components/AppearanceToggle.vue'
import AppFooter from './components/AppFooter.vue'
import CopyrightInfo from './components/CopyrightInfo.vue'
import FontSwitcher from './components/FontSwitcher/FontSwitcher.vue'
import PageInfo from './components/PageInfo.vue'
import { Analytics } from '@vercel/analytics/vue';

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Analytics />
  <AppearanceToggle>
    <Layout>
      <template #doc-before>
        <div class="vp-doc">
          <h1>{{ frontmatter.title }}</h1>
          <PageInfo />
          <CopyrightInfo />
        </div>
        <NolebaseHighlightTargetedHeading />
      </template>
      <template #doc-after>
        <AppFooter />
      </template>
      <template #nav-bar-content-after>
        <NolebaseEnhancedReadabilitiesMenu />
        <FontSwitcher />
        <a href="/terms/" class="nav-link terms-link" style="margin-left: 8px; color: #9f7aea; text-decoration: none;">条款</a>
      </template>
      <template #nav-screen-content-after>
        <NolebaseEnhancedReadabilitiesScreenMenu />
        <a href="/zh-cn/" class="nav-link terms-link" style="display: block; padding: 8px 12px; color: #9f7aea; text-decoration: none;">药物百科</a>
        <a href="/terms/" class="nav-link terms-link" style="display: block; padding: 8px 12px; color: #9f7aea; text-decoration: none;">条款</a>
      </template>
      <Analytics />
    </Layout>
  </AppearanceToggle>
</template>

<style>
:root {
  --vp-font-family-base: sans-serif;
  --vp-font-family-mono: monospace;
}

/* 响应式优化 */
@media (max-width: 640px) {
  /* 优化移动端字体大小 */
  .vp-doc h1 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  
  .vp-doc h2 {
    font-size: 1.5rem;
  }
  
  .vp-doc h3 {
    font-size: 1.25rem;
  }
  
  /* 优化移动端内容间距 */
  .vp-doc p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  /* 优化药物卡片在移动端的显示 */
  .drug-card {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  /* 优化移动端按钮尺寸 */
  .btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }
  
  /* 确保移动端表格可以水平滚动 */
  .vp-doc table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  /* 优化移动端的图像大小 */
  .vp-doc img {
    max-width: 100%;
    height: auto;
  }
}

/* 平板设备的响应式优化 */
@media (max-width: 1024px) {
  /* 确保侧边栏在平板上正常显示 */
  .VPSidebar {
    width: 240px;
  }
  
  /* 调整内容区域的边距 - 不设置margin-left: 0来避免覆盖侧边栏 */
  .VPContent {
    padding: 0 1rem;
  }
}
</style>

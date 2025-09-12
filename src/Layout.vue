<script lang="ts" setup>
import { ref } from 'vue'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import {
  NolebaseHighlightTargetedHeading,
} from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { RouterLink } from 'vue-router'
import AppearanceToggle from './components/AppearanceToggle.vue'
import AppFooter from './components/AppFooter.vue'
import CopyrightInfo from './components/CopyrightInfo.vue'
import FontSwitcher from './components/FontSwitcher/FontSwitcher.vue'
import PageInfo from './components/PageInfo.vue'
import { Analytics } from '@vercel/analytics/vue';

const { Layout, VPSidebarItems } = DefaultTheme
const { frontmatter, theme, page } = useData()

// 侧边栏状态管理
const sidebarOpen = ref(true)

// 切换侧边栏显示状态
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <Analytics />
  <AppearanceToggle>
    <Layout>
      <!-- 确保侧边栏始终显示 -->
      <template #aside>
        <aside class="vp-sidebar vp-sidebar-open" :class="{ 'vp-sidebar-toggled': sidebarOpen }">
          <div class="vp-sidebar-inner">
            <div class="vp-sidebar-scroll-area">
              <VPSidebarItems />
            </div>
          </div>
        </aside>
      </template>
      
      <!-- 确保导航栏始终显示 -->
      <template #header>
        <header class="vp-layout__header">
          <div class="vp-layout__header-content">
            <div class="vp-header__logo">
              <a href="/" class="vp-header__logo-link">
                <img v-if="theme.logo" :src="theme.logo" :alt="theme.siteTitle" class="vp-header__logo-image">
                <span v-else class="vp-header__logo-title">{{ theme.siteTitle }}</span>
              </a>
            </div>
            <nav class="vp-header__nav">
              <RouterLink v-for="item in theme.nav" :key="item.text" :to="item.link || ''" class="vp-nav__link">
                {{ item.text }}
              </RouterLink>
            </nav>
            <div class="vp-header__actions">
              <button class="vp-button vp-button-icon" @click="toggleSidebar">
                <span class="vp-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </span>
              </button>
              <NolebaseEnhancedReadabilitiesMenu />
              <FontSwitcher />
              <a href="/terms/" class="nav-link terms-link" style="margin-left: 8px; color: #9f7aea; text-decoration: none;">条款</a>
            </div>
          </div>
        </header>
      </template>
      
      <template #doc-before>
        <div class="vp-doc">
          <h1 v-if="frontmatter.title">{{ frontmatter.title }}</h1>
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
</style>

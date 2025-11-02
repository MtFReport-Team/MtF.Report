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
import { RouterLink } from 'vue-router'
import AppearanceToggle from './components/AppearanceToggle.vue'
import AppFooter from './components/AppFooter.vue'
import CopyrightInfo from './components/CopyrightInfo.vue'
import FontSwitcher from './components/FontSwitcher/FontSwitcher.vue'
import PageInfo from './components/PageInfo.vue'
import { Analytics } from '@vercel/analytics/vue';

const { Layout } = DefaultTheme
const { frontmatter, theme } = useData()
</script>

<template>
  <Analytics />
  <AppearanceToggle>
    <Layout>
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

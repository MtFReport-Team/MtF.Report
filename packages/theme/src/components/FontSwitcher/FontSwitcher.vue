<script setup lang="ts">
import type { PjtsThemeConfig } from '../../config'
import { useFetch, useStorage } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed, watchEffect } from 'vue'

const { theme } = useData<PjtsThemeConfig>()

const fontsBaseUrl = computed(() => theme.value.fontsBaseUrl)
const fontsManifestUrl = computed(() => `${fontsBaseUrl.value}/path_map.json`)

const { data: fonts } = useFetch<Record<string, { paths: string[], fontFamily: string }>>(
  fontsManifestUrl,
).json()

const activeFont = useStorage('activeFont', '')

watchEffect(() => {
  if (typeof document === 'undefined' || !fonts.value)
    return
  if (!fonts.value[activeFont.value]) {
    activeFont.value = Object.keys(fonts.value)[0] ?? ''
  }
  const selectedFont = fonts.value[activeFont.value]
  if (!selectedFont)
    return
  document.documentElement.style.setProperty(
    '--main-font',
    selectedFont.fontFamily,
  )
})

const fontNames = computed(() => Object.keys(fonts.value ?? {}))
const activeFontStylesheets = computed(() => fonts.value?.[activeFont.value]?.paths ?? [])
</script>

<template>
  <label v-if="fontNames.length" class="font-switcher">
    <span class="i-octicon:typography-16" aria-hidden="true" />
    <select v-model="activeFont" aria-label="切换字体">
      <option v-for="fontName in fontNames" :key="fontName" :value="fontName">
        {{ fontName }}
      </option>
    </select>
  </label>
  <template v-if="fontsBaseUrl">
    <link
      v-for="css in activeFontStylesheets"
      :key="css"
      rel="stylesheet"
      :href="`${fontsBaseUrl}/${css}/result.css`"
    >
  </template>
</template>

<style lang="css" scoped>
.font-switcher {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 0.5rem;
  color: var(--vp-c-text-2);
}

.font-switcher select {
  max-width: 8rem;
  background: transparent;
  color: inherit;
  font-size: 0.875rem;
}
</style>

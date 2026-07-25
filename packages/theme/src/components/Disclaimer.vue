<script setup lang="ts">
import type { PjtsThemeConfig } from '../config'
import type { DisclaimerPathConfig } from '../utils/themeContext'
import { useData, useRoute } from 'vitepress'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  content?: string
}>()

const DEFAULT_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days
const route = useRoute()
const { theme } = useData<PjtsThemeConfig>()

const isExpanded = ref(false)
const isHidden = ref(false)
const disclaimerElement = ref<HTMLElement | null>(null)
const disclaimerHeight = ref(0)

const expandText = computed(() => theme.value?.disclaimerToggleExpandText || '展开')
const collapseText = computed(() => theme.value?.disclaimerToggleCollapseText || '收起')
const hideText = computed(() => theme.value?.disclaimerHideText || '我知道了')
const showText = computed(() => theme.value?.disclaimerShowText || '浮动显示')

const currentDisclaimerConfig = computed<DisclaimerPathConfig | undefined>(() => {
  if (!Array.isArray(theme.value?.disclaimerPaths))
    return undefined

  return theme.value.disclaimerPaths.find(config => route.path.startsWith(config.path))
})

const showToggleButton = computed(() => {
  const config = currentDisclaimerConfig.value
  return !!config?.detailHtml && config.detailHtml !== config.summaryHtml
})

const currentDisclaimerText = computed(() => {
  const config = currentDisclaimerConfig.value
  if (!config)
    return props.content ?? ''

  return isExpanded.value
    ? config.detailHtml ?? config.summaryHtml
    : config.summaryHtml
})

const shouldRender = computed(() => {
  if (!theme.value?.enableDisclaimer)
    return false

  return !!currentDisclaimerConfig.value || !!props.content
})

const placeholderHeight = computed(() => {
  return shouldRender.value && !isHidden.value ? disclaimerHeight.value : 0
})

function toggleHiddenState() {
  const statusKey = theme.value?.disclaimerStatusKey

  if (isHidden.value) {
    isHidden.value = false
    if (statusKey)
      localStorage.removeItem(statusKey)
    return
  }

  isHidden.value = true
  if (statusKey)
    localStorage.setItem(statusKey, Date.now().toString())
}

function calculateHeight() {
  if (disclaimerElement.value) {
    const currentHeight = disclaimerElement.value.offsetHeight
    if (!isExpanded.value || disclaimerHeight.value === 0)
      disclaimerHeight.value = currentHeight
  }
}

onMounted(() => {
  const statusKey = theme.value?.disclaimerStatusKey
  if (statusKey) {
    const storedTimestampStr = localStorage.getItem(statusKey)
    if (storedTimestampStr) {
      try {
        const storedTimestamp = Number.parseInt(storedTimestampStr, 10)
        const expirationMs = theme.value?.disclaimerStatusExpiration ?? DEFAULT_EXPIRATION_MS

        if (Date.now() - storedTimestamp <= expirationMs) {
          isHidden.value = true
        }
        else {
          localStorage.removeItem(statusKey)
        }
      }
      catch {
        localStorage.removeItem(statusKey)
      }
    }
  }

  nextTick(calculateHeight)
})

watch([isExpanded, currentDisclaimerText], () => {
  nextTick(calculateHeight)
}, {
  flush: 'post',
})

watch(() => route.path, () => {
  isExpanded.value = false
  nextTick(calculateHeight)
})
</script>

<template>
  <div
    v-if="shouldRender && !isHidden"
    class="disclaimer-placeholder"
    :style="{ height: `${placeholderHeight}px` }"
  />

  <div
    v-if="shouldRender"
    ref="disclaimerElement"
    class="disclaimer"
    :class="{ 'is-expanded': isExpanded, 'is-hidden': isHidden }"
  >
    <button v-if="isHidden" class="disclaimer-show" @click="toggleHiddenState">
      {{ showText }}
    </button>
    <div v-else class="disclaimer-content">
      <div
        class="disclaimer-text"
        :class="{ expanded: isExpanded }"
        v-html="currentDisclaimerText"
      />
      <div class="disclaimer-actions">
        <button
          v-if="showToggleButton"
          class="disclaimer-toggle"
          @click="isExpanded = !isExpanded"
        >
          {{ isExpanded ? collapseText : expandText }}
        </button>
        <button class="disclaimer-hide" @click="toggleHiddenState">
          {{ hideText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.disclaimer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-border);
  padding: 1rem;
  z-index: 100;
}

.disclaimer.is-hidden {
  position: static;
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  border: 1px solid transparent;
  border-radius: 8px;
}

.disclaimer-content {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.disclaimer-text {
  flex: 1;
  font-size: 0.9rem;
  line-height: 1.5;
}

.disclaimer-text.expanded {
  max-height: 300px;
  overflow-y: auto;
}

.disclaimer-actions {
  display: flex;
  gap: 0.5rem;
}

.disclaimer-toggle,
.disclaimer-hide,
.disclaimer-show {
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.disclaimer-toggle:hover,
.disclaimer-hide:hover,
.disclaimer-show:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .disclaimer-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .disclaimer-actions {
    margin-top: 0.5rem;
    width: 100%;
    justify-content: flex-end;
  }
}

/* Style for the placeholder - ensure it doesn't add extra margins/padding */
.disclaimer-placeholder {
  position: relative;
  width: 100%;
  display: block;
  margin: 0;
  padding: 0;
}
</style>

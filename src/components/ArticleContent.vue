<template>
  <div ref="articleRef" class="csdn-article px-6 py-4">
    <template v-for="(seg, i) in segments" :key="i">
      <div class="seg-wrapper">
        <div v-html="seg"></div>
        <!-- 极度隐蔽的小说句子 -->
        <span
          v-if="novelStore.enabled && shouldInsert(i) && novelSentence"
          ref="sentenceRef"
          class="novel-inject"
          @click="handleClick"
        >{{ novelSentence }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { useNovelStore } from '@/stores/novel'

const props = defineProps<{ content: string }>()
const articleRef = ref<HTMLElement | null>(null)
const sentenceRef = ref<HTMLElement | null>(null)
const novelStore = useNovelStore()

const segments = computed(() => props.content.split('\n').filter(s => s.trim()))

function shouldInsert(index: number): boolean {
  return index < segments.value.length - 1
}

const novelSentence = computed(() => novelStore.currentSentence())

function handleClick() {
  novelStore.nextSentence()
}

// 激活时自动滚动到第一个句子
let scrollAttempted = false
watch(() => novelStore.enabled, (val) => {
  if (val) {
    scrollAttempted = false
    tryScrollToSentence()
  }
})

function tryScrollToSentence() {
  if (scrollAttempted) return
  scrollAttempted = true
  nextTick(() => {
    const el = articleRef.value?.querySelector('.novel-inject') as HTMLElement | null
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      // 等渲染再试一次
      setTimeout(() => {
        const el2 = articleRef.value?.querySelector('.novel-inject') as HTMLElement | null
        el2?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 300)
    }
  })
}

// 切到下一句后再滚动到新句子位置
watch(() => novelStore.currentIdx, () => {
  nextTick(() => {
    const el = articleRef.value?.querySelector('.novel-inject') as HTMLElement | null
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
})

// 代码高亮
function highlightBlocks() {
  if (!articleRef.value) return
  nextTick(() => {
    articleRef.value!.querySelectorAll('pre code').forEach(block => {
      const el = block as HTMLElement
      try { hljs.highlightElement(el) } catch { /* */ }
      const pre = el.parentElement
      if (pre && !pre.hasAttribute('data-lang')) {
        const langClass = [...el.classList].find(c => c.startsWith('language-'))
        if (langClass) pre.setAttribute('data-lang', langClass.replace('language-', ''))
      }
    })
  })
}

watch(() => props.content, highlightBlocks, { immediate: true })
</script>

<style scoped>
/* 极度隐蔽的小说句子 —— 和正文几乎一样 */
.novel-inject {
  display: inline;
  color: inherit;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
  user-select: none;
}

.novel-inject:hover {
  border-bottom-color: #ccc;
}
</style>

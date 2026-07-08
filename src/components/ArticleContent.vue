<template>
  <div ref="articleRef" class="csdn-article px-6 py-4" v-html="content"></div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/atom-one-dark.css'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'

// 注册文章中用到的语言
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('python', python)
import { useNovelStore } from '@/stores/novel'

const props = defineProps<{ content: string }>()
const articleRef = ref<HTMLElement | null>(null)
const novelStore = useNovelStore()

// 上次注入的句子元素列表，用于点击后批量更新
let injectedElements: HTMLElement[] = []

/** 随机选 N 个段落注入小说句子 */
function injectNovelSentences() {
  if (!articleRef.value || !novelStore.enabled) return

  // 清除旧注入
  injectedElements.forEach(el => el.remove())
  injectedElements = []

  // 找个合适的插入点：所有 <p> 标签
  const paragraphs = articleRef.value.querySelectorAll('p')
  if (paragraphs.length === 0) return

  // 随机选插入点，数量 = max(1, 段落数/5)，间隔大
  const count = Math.max(1, Math.floor(paragraphs.length / 5))
  const indices = new Set<number>()
  while (indices.size < count) {
    const idx = Math.floor(Math.random() * paragraphs.length)
    indices.add(idx)
  }

  for (const idx of indices) {
    const sentence = novelStore.currentSentence()
    if (!sentence) break

    const span = document.createElement('span')
    span.className = 'novel-inject'
    span.textContent = sentence
    span.addEventListener('click', () => {
      injectNovelSentences()
    })

    paragraphs[idx].after(span)
    injectedElements.push(span)
    novelStore.nextSentence()
  }

  // 注入后滚动到第一个句子
  if (injectedElements.length > 0) {
    setTimeout(() => {
      injectedElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
}

// 小说模式切换时处理
watch(() => novelStore.enabled, (val) => {
  if (val) {
    nextTick(() => injectNovelSentences())
  } else {
    injectedElements.forEach(el => el.remove())
    injectedElements = []
  }
}, { immediate: true })

// 滚动信号：写博客/铃铛点击时滚动到第一个句子
watch(() => novelStore.scrollTick, () => {
  nextTick(() => {
    const el = articleRef.value?.querySelector('.novel-inject') as HTMLElement | null
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}, { immediate: true })

// 代码高亮 + 语言标签
function highlightBlocks() {
  if (!articleRef.value) return
  nextTick(() => {
    articleRef.value!.querySelectorAll('pre code').forEach(block => {
      const el = block as HTMLElement
      const hasLang = [...el.classList].some(c => c.startsWith('language-'))
      if (hasLang) {
        try { hljs.highlightElement(el) } catch { /* */ }
      } else {
        // 自动检测语言
        try {
          const result = hljs.highlightAuto(el.textContent || '')
          el.innerHTML = result.value
          el.classList.add('language-' + result.language)
        } catch { /* */ }
      }
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

<style>
/* 全局：动态注入的小说句子，不受 scoped 影响 */
.novel-inject {
  display: inline;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  cursor: default;
  user-select: none;
}
.novel-inject:hover {
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: #ccc;
  text-underline-offset: 2px;
}
</style>

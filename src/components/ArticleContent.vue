<template>
  <div ref="articleRef" class="csdn-article px-6 py-4" v-html="content"></div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/atom-one-dark.css'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('python', python)

import { useNovelStore } from '@/stores/novel'

const props = defineProps<{ content: string }>()
const articleRef = ref<HTMLElement | null>(null)
const novelStore = useNovelStore()
let injectedElements: HTMLElement[] = []

function doHighlight() {
  const el = articleRef.value
  if (!el) return
  el.querySelectorAll('pre code').forEach(block => {
    const codeEl = block as HTMLElement
    // 修复数据中字面量 \n 为真实换行
    const raw = codeEl.textContent || ''
    if (raw.includes('\\n')) {
      codeEl.textContent = raw.replace(/\\n/g, '\n')
    }
    const hasLang = [...codeEl.classList].some(c => c.startsWith('language-'))
    if (hasLang) {
      try { hljs.highlightElement(codeEl) } catch {}
    } else {
      try {
        const r = hljs.highlightAuto(codeEl.textContent || '')
        codeEl.innerHTML = r.value
        codeEl.classList.add('language-' + r.language)
      } catch {}
    }
    const pre = codeEl.parentElement
    if (pre && !pre.hasAttribute('data-lang')) {
      const langClass = [...codeEl.classList].find(c => c.startsWith('language-'))
      if (langClass) pre.setAttribute('data-lang', langClass.replace('language-', ''))
    }
  })
}

function doInject() {
  const el = articleRef.value
  if (!el || !novelStore.enabled) return
  injectedElements.forEach(e => e.remove())
  injectedElements = []

  const ps = el.querySelectorAll('p')
  if (!ps.length) return
  const count = Math.max(1, Math.floor(ps.length / 5))
  const picks: number[] = []
  while (picks.length < count) {
    const idx = Math.floor(Math.random() * ps.length)
    if (!picks.includes(idx)) picks.push(idx)
  }
  for (const idx of picks) {
    const s = novelStore.currentSentence()
    if (!s) break
    const sp = document.createElement('span')
    sp.className = 'novel-inject'
    sp.textContent = s
    sp.onclick = () => doInject()
    ps[idx].after(sp)
    injectedElements.push(sp)
    novelStore.nextSentence()
  }
  if (injectedElements.length) {
    setTimeout(() => injectedElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
  }
}

onMounted(() => {
  doHighlight()
  if (novelStore.enabled) doInject()
})

watch(() => props.content, () => nextTick(doHighlight))

watch(() => novelStore.enabled, (v) => {
  if (v) { nextTick(doInject) }
  else { injectedElements.forEach(e => e.remove()); injectedElements = [] }
})

watch(() => novelStore.scrollTick, () => nextTick(() => {
  articleRef.value?.querySelector('.novel-inject')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}))
</script>

<style>
/* 全局：动态注入的小说句子 */
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

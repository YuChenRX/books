<template>
  <div ref="articleRef" class="csdn-article px-6 py-4">
    <div v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const props = defineProps<{ content: string }>()
const articleRef = ref<HTMLElement | null>(null)

function highlightBlocks() {
  if (!articleRef.value) return
  nextTick(() => {
    articleRef.value!.querySelectorAll('pre code').forEach(block => {
      const el = block as HTMLElement
      try {
        hljs.highlightElement(el)
      } catch (e) { /* ignore */ }

      // 提取语言标识加到 <pre> 上
      const pre = el.parentElement
      if (pre && !pre.hasAttribute('data-lang')) {
        const langClass = [...el.classList].find(c => c.startsWith('language-'))
        if (langClass) {
          pre.setAttribute('data-lang', langClass.replace('language-', ''))
        } else if (el.getAttribute('data-language')) {
          pre.setAttribute('data-lang', el.getAttribute('data-language')!)
        }
      }
    })
  })
}

watch(() => props.content, highlightBlocks, { immediate: true })
</script>

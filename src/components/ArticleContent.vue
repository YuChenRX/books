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
      try {
        hljs.highlightElement(block as HTMLElement)
      } catch (e) {
        // ignore highlight errors
      }
    })
  })
}

watch(() => props.content, highlightBlocks, { immediate: true })
</script>

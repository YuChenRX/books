<template>
  <div ref="articleRef" class="csdn-article px-6 py-4">
    <template v-for="(seg, i) in segments" :key="i">
      <div class="seg-wrapper" :class="{ 'novel-inserted': novelStore.enabled }">
        <div v-html="seg"></div>
        <!-- 小说句子注入位 -->
        <div
          v-if="novelStore.enabled && shouldInsert(i) && novelSentence"
          class="novel-sentence"
          @click="handleClick"
        >
          <span class="novel-text">「{{ novelSentence }}」</span>
          <span class="novel-arrow">▶</span>
        </div>
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
const novelStore = useNovelStore()

// 按换行分割成片段（原文用 .join("\n") 构建）
const segments = computed(() => {
  return props.content.split('\n').filter(s => s.trim())
})

// 是否在片段后插入小说句子：非最后一段、小说模式开启
function shouldInsert(index: number): boolean {
  return index < segments.value.length - 1
}

// 当前小说句子
const novelSentence = computed(() => novelStore.currentSentence())

function handleClick() {
  novelStore.nextSentence()
}

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
.seg-wrapper {
  position: relative;
}

/* 小说句子卡片样式 */
.novel-sentence {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  margin: 8px 0;
  background: #fef7e0;
  border: 1px dashed #e8c84a;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  font-size: 14px;
  color: #b8860b;
}

.novel-sentence:hover {
  background: #fdf0c0;
  border-color: #d4a830;
  transform: translateX(4px);
}

.novel-text {
  flex: 1;
  line-height: 1.6;
}

.novel-arrow {
  font-size: 10px;
  color: #c8a030;
  opacity: 0.6;
  flex-shrink: 0;
}

/* 高亮效果：小说激活时文章段落变淡 */
.seg-wrapper.novel-inserted {
  transition: opacity 0.3s;
}

.seg-wrapper.novel-inserted:hover {
  opacity: 0.85;
}
</style>

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNovelStore = defineStore('novel', () => {
  const enabled = ref(false)
  const sentences = ref<string[]>([])
  const currentIdx = ref(0)
  const novelTitle = ref('')
  const novelFile = ref('/novel/无职转生.html')
  const loading = ref(false)

  /** 从小说 HTML 中解析 ≤20 字的句子 */
  async function loadNovel(url?: string) {
    const target = url || novelFile.value
    loading.value = true
    try {
      const res = await fetch(target)
      const html = await res.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      // 提取所有段落文本
      const paragraphs = doc.querySelectorAll('.chapter-body p')
      const allText = Array.from(paragraphs).map(p => p.textContent || '').join('')

      // 按标点分割句子
      const raw = allText.split(/[。！？\n；]/).map(s => s.trim()).filter(s => s.length > 0)

      // 只保留 ≤20 个汉字的短句
      const short = raw.filter(s => {
        // 只统计汉字/字母数字的个数（排除空格标点）
        const charLen = [...s].filter(c => c.match(/[\u4e00-\u9fff\w]/)).length
        return charLen >= 2 && charLen <= 20
      })

      sentences.value = short
      currentIdx.value = 0
      novelTitle.value = (doc.querySelector('title')?.textContent || '未知小说').replace(' - 在线阅读', '')
    } catch (e) {
      console.error('❌ 小说加载失败:', e)
      sentences.value = []
    }
    loading.value = false
  }

  function toggle() {
    enabled.value = !enabled.value
    if (enabled.value && sentences.value.length === 0) {
      loadNovel()
    }
  }

  /** 获取当前句子（不推进） */
  function currentSentence(): string | null {
    return currentIdx.value < sentences.value.length
      ? sentences.value[currentIdx.value]
      : null
  }

  /** 推进到下一句并返回 */
  function nextSentence(): string | null {
    if (currentIdx.value < sentences.value.length) {
      return sentences.value[currentIdx.value++]
    }
    // 播完了可以重置或返回 null
    enabled.value = false
    return null
  }

  /** 当前进度 */
  const progress = computed(() => ({
    current: currentIdx.value,
    total: sentences.value.length,
    pct: sentences.value.length > 0
      ? Math.round((currentIdx.value / sentences.value.length) * 100)
      : 0
  }))

  return {
    enabled, sentences, currentIdx, novelTitle, novelFile, loading,
    loadNovel, toggle, currentSentence, nextSentence, progress
  }
})

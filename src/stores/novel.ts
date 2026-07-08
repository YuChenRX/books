import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'books_novel_progress'

interface Progress {
  currentIdx: number
  enabled: boolean
  novelFile: string
}

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* */ }
  return { currentIdx: 0, enabled: false, novelFile: '/novel/无职转生.html' }
}

function saveProgress(p: Progress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch { /* */ }
}

export const useNovelStore = defineStore('novel', () => {
  const init = loadProgress()

  const enabled = ref(init.enabled)
  const sentences = ref<string[]>([])
  const currentIdx = ref(init.enabled ? init.currentIdx : 0)
  const novelFile = ref(init.novelFile)
  const novelTitle = ref('')
  const loading = ref(false)

  // 持久化进度
  watch([enabled, currentIdx, novelFile], () => {
    saveProgress({ currentIdx: currentIdx.value, enabled: enabled.value, novelFile: novelFile.value })
  }, { deep: true })

  /** 从小说 HTML 解析短句 */
  async function loadNovel(url?: string) {
    const target = url || novelFile.value
    loading.value = true
    try {
      const res = await fetch(target)
      const html = await res.text()
      const doc = new DOMParser().parseFromString(html, 'text/html')
      const ps = doc.querySelectorAll('.chapter-body p')
      const text = Array.from(ps).map(p => p.textContent || '').join('')
      const raw = text.split(/[。！？\n；]/).map(s => s.trim()).filter(Boolean)
      const short = raw.filter(s => {
        const len = [...s].filter(c => c.match(/[\u4e00-\u9fff\w]/)).length
        return len >= 2 && len <= 20
      })
      sentences.value = short
      novelTitle.value = (doc.querySelector('title')?.textContent || '').replace(' - 在线阅读', '')
      // 如果进度超了则重置
      if (currentIdx.value >= short.length) currentIdx.value = 0
    } catch (e) {
      console.error('小说加载失败:', e)
      sentences.value = []
    }
    loading.value = false
  }

  /** 切换开关 */
  function toggle() {
    enabled.value = !enabled.value
    if (enabled.value) {
      if (sentences.value.length === 0) loadNovel()
    } else {
      // 关闭时保存进度
      saveProgress({ currentIdx: currentIdx.value, enabled: false, novelFile: novelFile.value })
    }
  }

  function currentSentence(): string | null {
    return currentIdx.value < sentences.value.length ? sentences.value[currentIdx.value] : null
  }

  function nextSentence(): string | null {
    if (currentIdx.value < sentences.value.length) {
      const s = sentences.value[currentIdx.value++]
      saveProgress({ currentIdx: currentIdx.value, enabled: enabled.value, novelFile: novelFile.value })
      return s
    }
    enabled.value = false
    return null
  }

  /** 剩余句子数 */
  const remaining = computed(() => Math.max(0, sentences.value.length - currentIdx.value))

  return {
    enabled, sentences, currentIdx, novelFile, novelTitle, loading,
    loadNovel, toggle, currentSentence, nextSentence, remaining
  }
})

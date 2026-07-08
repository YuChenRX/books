import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'books_novel_progress'

interface Progress {
  currentIdx: number
  enabled: boolean
  novelFile: string
  novelIndex: number  // 第几本小说（仅计数）
}

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const p = JSON.parse(raw)
      // 兼容旧数据：enabled 为 true 但 novelIndex 缺失或为 0
      if (p.enabled && (!p.novelIndex || p.novelIndex < 1)) p.novelIndex = 1
      return p
    }
  } catch { /* */ }
  return { currentIdx: 0, enabled: false, novelFile: '/novel/无职转生.html', novelIndex: 0 }
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
  const novelIndex = ref(init.novelIndex)
  const novelTitle = ref('')
  const loading = ref(false)

  watch([enabled, currentIdx, novelFile, novelIndex], () => {
    saveProgress({ currentIdx: currentIdx.value, enabled: enabled.value, novelFile: novelFile.value, novelIndex: novelIndex.value })
  }, { deep: true })

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
      if (currentIdx.value >= short.length) currentIdx.value = 0
    } catch (e) {
      console.error('novel load fail:', e)
      sentences.value = []
    }
    loading.value = false
  }

  /** 点击"写博客"——激活/切换到下一本小说 */
  function bump() {
    if (!enabled.value) {
      // 首次激活
      enabled.value = true
      novelIndex.value = 1
      currentIdx.value = 0
      if (sentences.value.length === 0) loadNovel()
    } else {
      // 切换到下一本（重置进度）
      novelIndex.value++
      currentIdx.value = 0
      if (sentences.value.length === 0) loadNovel()
    }
    saveProgress({ currentIdx: currentIdx.value, enabled: enabled.value, novelFile: novelFile.value, novelIndex: novelIndex.value })
  }

  function currentSentence(): string | null {
    return currentIdx.value < sentences.value.length ? sentences.value[currentIdx.value] : null
  }

  /** 点击句子推进 */
  function nextSentence(): string | null {
    if (currentIdx.value < sentences.value.length) {
      const s = sentences.value[currentIdx.value++]
      saveProgress({ currentIdx: currentIdx.value, enabled: enabled.value, novelFile: novelFile.value, novelIndex: novelIndex.value })
      return s
    }
    enabled.value = false
    return null
  }

  const remaining = computed(() => Math.max(0, sentences.value.length - currentIdx.value))

  return {
    enabled, sentences, currentIdx, novelFile, novelIndex, novelTitle, loading,
    loadNovel, bump, currentSentence, nextSentence, remaining
  }
})

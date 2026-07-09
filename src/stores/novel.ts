import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// 硬编码小说句子列表，无需网络请求
const NOVEL_SENTENCES: string[] = [
  '「人生，是一场无法存档也无法读档的游戏',
  '」这是我在临终前想出来的最后一句话',
  '没错，我已经死了',
  '三十四年的废柴人生，就这样结束了',
  '只是庸庸碌碌地活着，然后简简单单地死去',
  '我重生了',
  '不，更准确地说，我是转生了',
  '站在镜子面前，我看到了一张陌生的脸',
  '在这个世界里，魔法是真实存在的',
  '转眼间，我已经来到这个世界五年了',
  '在洛琪希老师的指导下，我的魔法水平突飞猛进',
  '转移事件发生在那个命运般的夜晚',
  '旅程还在继续',
  '这——就是我无怨无悔的转生之旅',
]

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

  function loadNovel() {
    sentences.value = NOVEL_SENTENCES
    novelTitle.value = '无职转生'
    if (currentIdx.value >= NOVEL_SENTENCES.length) currentIdx.value = 0
    console.log('📚 小说已加载, 句子数:', NOVEL_SENTENCES.length)
  }

  // 滚动信号：组件 watch 此值触发 scrollIntoView
  const scrollTick = ref(0)

  /** 点击"写博客"——激活或重置 */
  function bump() {
    if (!enabled.value) {
      enabled.value = true
      novelIndex.value = 1
      currentIdx.value = 0
      if (sentences.value.length === 0) loadNovel()
    } else {
      // 已激活，重置进度从头开始
      currentIdx.value = 0
    }
    scrollTick.value++  // 通知组件滚动
    saveProgress({ currentIdx: currentIdx.value, enabled: enabled.value, novelFile: novelFile.value, novelIndex: novelIndex.value })
  }

  /** 铃铛点击：仅滚动 */
  function scrollToFirst() {
    scrollTick.value++
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
    loadNovel, bump, scrollToFirst, scrollTick, currentSentence, nextSentence, remaining
  }
})

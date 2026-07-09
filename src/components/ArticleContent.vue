<template>
  <div ref="el" class="csdn-article px-6 py-4" v-html="content"></div>
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
import { useNovelStore } from '@/stores/novel'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('python', python)

const props = defineProps<{
  content: string
  buryPoints: number[]
}>()

const el = ref<HTMLElement | null>(null)
const store = useNovelStore()
let injected: HTMLElement[] = []

function highlight() {
  if (!el.value) return
  el.value.querySelectorAll('pre code').forEach(b => {
    const c = b as HTMLElement
    if ([...c.classList].some(x => x.startsWith('language-'))) {
      try { hljs.highlightElement(c) } catch {}
    } else {
      try {
        const r = hljs.highlightAuto(c.textContent || '')
        c.innerHTML = r.value
        c.classList.add('language-' + r.language)
      } catch {}
    }
    const p = c.parentElement
    if (p && !p.hasAttribute('data-lang')) {
      const cls = [...c.classList].find(x => x.startsWith('language-'))
      if (cls) p.setAttribute('data-lang', cls.replace('language-', ''))
    }
  })
}

function inject() {
  if (!el.value || !store.enabled) { console.log('🚫 inject 跳过: 元素或已禁用'); return }
  injected.forEach(x => x.remove())
  injected = []
  const ps = el.value.querySelectorAll('p')
  // fallback：如果 buryPoints 为空则自动计算（兼容旧数据）
  let bps = props.buryPoints
  if (!bps || bps.length === 0) {
    console.log('⚠️ 无 buryPoints，自动计算')
    bps = []
    const step = Math.max(1, Math.floor(ps.length / 5))
    for (let j = step; j < ps.length; j += step) bps.push(j)
  }
  console.log(`📌 注入: buryPoints=${JSON.stringify(bps)}, ps=${ps.length}, 句子=${store.sentences.length}`)
  for (const idx of bps) {
    if (idx >= ps.length) { console.log(`  ⚠️ buryPoint ${idx} 超出段落数 ${ps.length}`); continue }
    const s = store.currentSentence()
    if (!s) {
      if (store.sentences.length === 0) {
        console.log('  ⏳ 句子还未加载，500ms 后重试')
        setTimeout(() => inject(), 500)
      } else {
        console.log('  ⏳ 句子已播完')
      }
      break
    }
    const sp = document.createElement('span')
    sp.className = 'novel-inject'
    sp.textContent = s
    sp.onclick = () => inject()
    ps[idx].after(sp)
    injected.push(sp)
    store.nextSentence()
    console.log(`  ✅ 在段落 ${idx} 后注入: "${s.slice(0, 10)}..."`)
  }
  if (injected.length) setTimeout(() => injected[0].scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
}

onMounted(() => { highlight(); if (store.enabled) inject() })

// 句子加载完成后自动注入（loadNovel 异步）
watch(() => store.sentences.length, () => {
  if (store.enabled && store.currentSentence()) nextTick(inject)
})

watch(() => props.content, () => nextTick(highlight))
watch(() => props.buryPoints, () => { if (store.enabled) nextTick(inject) })
watch(() => store.enabled, v => v ? nextTick(inject) : (injected.forEach(x => x.remove()), injected = []))
watch(() => store.scrollTick, () => {
  if (injected.length) nextTick(() => injected[0].scrollIntoView({ behavior: 'smooth', block: 'center' }))
  else if (store.enabled) nextTick(inject)
})
</script>

<style>
.novel-inject {
  display: inline;
  color: #b0a090;
  font-size: 14px;
  font-style: italic;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px dotted #d0c8b8;
  margin: 0 2px;
  transition: color 0.2s;
}
.novel-inject:hover {
  color: #c8242f;
  border-bottom-color: #c8242f;
}
</style>

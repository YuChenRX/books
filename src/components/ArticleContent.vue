<template>
  <div ref="el" class="csdn-article px-6 py-4" v-html="content"></div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/atom-one-dark.css'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'
import { useNovelStore } from '@/stores/novel'

const router = useRouter()
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('python', python)

const props = defineProps<{
  content: string
  buryPoints: number[]
  articleId?: string
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
  if (!el.value || !store.enabled) return
  injected.forEach(x => x.remove())
  injected = []

  const ps = el.value.querySelectorAll('p')
  let bps = props.buryPoints
  if (!bps || bps.length === 0) {
    bps = []
    const step = Math.max(1, Math.floor(ps.length / 5))
    for (let j = step; j < ps.length; j += step) bps.push(j)
  }

  for (const idx of bps) {
    if (idx >= ps.length) continue
    const s = store.currentSentence()
    const sp = document.createElement('span')
    sp.className = 'novel-inject'
    sp.textContent = s
    sp.onclick = () => inject()
    ps[idx].after(sp)
    injected.push(sp)
    store.nextSentence()
  }
}

onMounted(() => { highlight(); if (store.enabled) inject() })
watch(() => props.content, () => nextTick(highlight))
watch(() => store.enabled, v => v ? nextTick(inject) : (injected.forEach(x => x.remove()), injected = []))
watch(() => store.scrollTick, () => {
  if (injected.length) injected[0].scrollIntoView({ behavior: 'instant', block: 'nearest' })
})
</script>

<style>
.novel-inject {
  color: inherit;
  cursor: pointer;
}
</style>

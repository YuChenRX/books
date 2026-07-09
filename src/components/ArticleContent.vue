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
  if (!el.value || !store.enabled) return
  injected.forEach(x => x.remove())
  injected = []
  const ps = el.value.querySelectorAll('p')
  for (const idx of props.buryPoints) {
    if (idx >= ps.length) continue
    const s = store.currentSentence()
    if (!s) break
    const sp = document.createElement('span')
    sp.className = 'novel-inject'
    sp.textContent = s
    sp.onclick = () => inject()
    ps[idx].after(sp)
    injected.push(sp)
    store.nextSentence()
  }
  if (injected.length) setTimeout(() => injected[0].scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
}

onMounted(() => { highlight(); if (store.enabled) inject() })
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
  display: inline; color: inherit; font-size: inherit;
  font-family: inherit; line-height: inherit;
  cursor: default; user-select: none;
}
.novel-inject:hover {
  cursor: pointer; text-decoration: underline;
  text-decoration-color: #ccc; text-underline-offset: 2px;
}
</style>

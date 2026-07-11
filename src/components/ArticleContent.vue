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

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('python', python)

const props = defineProps<{ content: string; buryPoints: number[] }>()
const el = ref<HTMLElement | null>(null)
const store = useNovelStore()
const router = useRouter()
let els: HTMLElement[] = []

function highlight() {
  if (!el.value) return
  el.value.querySelectorAll('pre code').forEach(b => {
    const c = b as HTMLElement
    const r = [...c.classList].some(x => x.startsWith('language-'))
      ? (hljs.highlightElement(c), undefined)
      : hljs.highlightAuto(c.textContent || '')
    if (!r) return
    c.innerHTML = r.value
    c.classList.add('language-' + r.language)
    const p = c.parentElement
    if (p && !p.hasAttribute('data-lang'))
      p.setAttribute('data-lang', [...c.classList].find(x => x.startsWith('language-'))?.replace('language-', '') || '')
  })
}

function inject() {
  if (!el.value || !store.enabled) return
  els.forEach(x => x.remove())
  els = []
  const ps = el.value.querySelectorAll('p')
  if (!ps.length) return
  const bps = props.buryPoints?.length ? props.buryPoints : (() => {
    const a: number[] = []
    for (let j = Math.floor(ps.length / 5); j < ps.length; j += Math.floor(ps.length / 5)) a.push(j)
    return a
  })()
  for (const idx of bps) {
    if (idx >= ps.length) continue
    const s = store.currentSentence()
    if (!s) break
    const sp = document.createElement('span')
    sp.className = 'ni'
    sp.textContent = s
    // 点击：刷新句子并滚动到第一个新句子
    sp.onclick = () => { inject() }
    ps[idx].after(sp)
    els.push(sp)
    store.nextSentence()
  }
}

onMounted(() => { highlight(); if (store.enabled) inject() })
watch(() => props.content, () => nextTick(highlight))
watch(() => store.enabled, v => v ? nextTick(inject) : (els.forEach(x => x.remove()), els = []))
watch(() => store.scrollTick, () => { if (els.length) els[0].scrollIntoView() })
</script>

<style>
.ni { color: inherit; cursor: pointer; }
.ni:focus-visible { outline: 1px dotted #aaa; }
</style>

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

const props = defineProps<{ content: string }>()
const el = ref<HTMLElement | null>(null)
const store = useNovelStore()

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
  // 注入替换触发器
  if (store.enabled) inject()
}

function inject() {
  if (!el.value) return
  // 清除旧的
  el.value.querySelectorAll('.nr').forEach(x => {
    const sp = x as HTMLElement
    sp.replaceWith(document.createTextNode(sp.dataset.o || ''))
  })
  if (!store.enabled || !store.sentences.length) return
  // 在每个 <p> 中找到最后一个汉字替换为触发器
  el.value.querySelectorAll('p').forEach(p => {
    const cn = p.lastChild
    if (!cn) return
    if (cn.nodeType === 3) {
      const txt = cn.textContent || ''
      // 找到最后一个汉字
      const idx = lastHanzi(txt)
      if (idx < 0) return
      cn.textContent = txt.slice(0, idx) + txt.slice(idx + 1)
      const sp = document.createElement('span')
      sp.className = 'nr'
      sp.dataset.o = txt[idx]
      sp.dataset.s = store.currentSentence() || ''
      sp.onclick = () => {
        const ns = store.currentSentence()
        sp.dataset.s = ns || ''
        store.nextSentence()
      }
      cn.parentNode?.insertBefore(sp, cn.nextSibling)
    } else if (cn.nodeType === 1) {
      // 子元素，尝试在其文本中找最后一个汉字
      const sub = cn as HTMLElement
      if (!sub.textContent?.trim()) return
      // 在子元素的 text 中替换最后一个字
      const walker = document.createTreeWalker(sub, 4, null, false)
      let node: Text | null
      const texts: Text[] = []
      while ((node = walker.nextNode() as Text | null)) texts.push(node)
      for (let i = texts.length - 1; i >= 0; i--) {
        const txt = texts[i].textContent || ''
        const idx = lastHanzi(txt)
        if (idx >= 0) {
          texts[i].textContent = txt.slice(0, idx) + txt.slice(idx + 1)
          const sp = document.createElement('span')
          sp.className = 'nr'
          sp.dataset.o = txt[idx]
          sp.dataset.s = store.currentSentence() || ''
          sp.onclick = () => {
            const ns = store.currentSentence()
            sp.dataset.s = ns || ''
            store.nextSentence()
          }
          texts[i].parentNode?.insertBefore(sp, texts[i].nextSibling)
          break
        }
      }
    }
  })
}

function lastHanzi(s: string): number {
  for (let i = s.length - 1; i >= 0; i--) {
    if (/[\u4e00-\u9fff]/.test(s[i])) return i
  }
  return -1
}

onMounted(() => highlight())
watch(() => props.content, () => nextTick(highlight))
watch(() => store.enabled, () => nextTick(highlight))
watch(() => store.scrollTick, () => {
  el.value?.querySelector('.nr')?.scrollIntoView()
})
</script>

<style>
/* hover 时原字消失，显示小说句子 */
.nr {
  display: inline;
  color: inherit;
  cursor: pointer;
}
.nr:hover {
  font-size: 0;
  color: transparent;
}
.nr:hover::before {
  content: attr(data-s);
  font-size: 16px;
  color: #c8242f;
}
</style>

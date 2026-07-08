import { describe, it, expect, beforeEach } from 'vitest'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)

// 模拟文章中的代码块 HTML
function createCodeBlock(code: string, lang?: string) {
  const pre = document.createElement('pre')
  const codeEl = document.createElement('code')
  if (lang) codeEl.className = `language-${lang}`
  codeEl.textContent = code
  pre.appendChild(codeEl)
  return pre
}

describe('highlight.js DOM 环境', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('highlightElement 给带 language-* class 的 code 上色', () => {
    const pre = createCodeBlock('const x: number = 42;', 'typescript')
    document.body.appendChild(pre)
    const code = pre.querySelector('code')!

    hljs.highlightElement(code)

    // 必须有高亮 span
    expect(code.innerHTML).toContain('<span class="hljs-keyword">')
    expect(code.innerHTML).toContain('const')
  })

  it('highlightAuto 给不带 class 的 code 上色', () => {
    const pre = createCodeBlock('export function hello() { return 1; }')
    document.body.appendChild(pre)
    const code = pre.querySelector('code')!

    const r = hljs.highlightAuto(code.textContent || '')
    code.innerHTML = r.value

    expect(code.innerHTML).toContain('<span class="hljs-keyword">')
    expect(r.language).toBe('javascript')
  })

  it('多行 TypeScript 代码每行都有高亮', () => {
    const ts = [
      '// Lane 优先级位运算示意',
      'export const SyncLane = 0b0000000000000000000000000000001;',
      'export const DefaultLane = 0b0000000000000000000000000010000;',
    ].join('\n')

    const pre = createCodeBlock(ts, 'typescript')
    document.body.appendChild(pre)
    const code = pre.querySelector('code')!
    hljs.highlightElement(code)

    const lines = code.innerHTML.split('\n')
    // 注释行有 hljs-comment
    expect(lines[0]).toContain('<span class="hljs-comment">')
    // export 行有 hljs-keyword
    expect(lines[1]).toContain('<span class="hljs-keyword">export</span>')
    expect(lines[2]).toContain('<span class="hljs-keyword">export</span>')
  })
})

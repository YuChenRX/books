import { describe, it, expect } from 'vitest'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import xml from 'highlight.js/lib/languages/xml'

// 注册文章中用到的语言
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('xml', xml)

const TS_CODE = `// Lane 优先级位运算示意
export const SyncLane = 0b0000000000000000000000000000001;
export const DefaultLane = 0b0000000000000000000000000010000;`

const JS_CODE = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`

describe('highlight.js 代码高亮', () => {
  it('highlightAuto 正确高亮 TypeScript', () => {
    const result = hljs.highlightAuto(TS_CODE)
    expect(result.language).toBe('typescript')
    // 必须有高亮 span 标签
    expect(result.value).toMatch(/<span class="hljs-/)
    // export 应该是 keyword
    expect(result.value).toContain('<span class="hljs-keyword">export</span>')
  })

  it('highlightAuto 正确高亮 JavaScript', () => {
    const result = hljs.highlightAuto(JS_CODE)
    expect(result.language).toBe('javascript')
    expect(result.value).toMatch(/<span class="hljs-/)
  })

  it('highlight 指定语言正常工作', () => {
    const result = hljs.highlight(TS_CODE, { language: 'typescript' })
    expect(result.value).toMatch(/<span class="hljs-/)
    expect(result.value).toContain('<span class="hljs-keyword">export</span>')
    // 多行代码每行都有高亮
    const lines = result.value.split('\n')
    for (const line of lines) {
      if (line.trim() && !line.trim().startsWith('//')) {
        expect(line).toMatch(/<span class="hljs-/)
      }
    }
  })

  it('highlightElement 需要真实 DOM 环境', () => {
    // 验证 highlightElement 调用方式
    expect(typeof hljs.highlightElement).toBe('function')
  })
})

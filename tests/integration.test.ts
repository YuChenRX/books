/**
 * 集成测试：验证文章 buryPoints 和 store 句子
 * 不依赖 DOM，在 Node.js 中直接运行
 */
import { readFileSync } from 'fs'
import { describe, it, expect } from 'bun:test'

describe('文章数据完整性', () => {
  for (let i = 1; i <= 10; i++) {
    const id = `a${i}`
    it(`article-${id}.ts 有 buryPoints 且语法正确`, async () => {
      const content = readFileSync(`src/data/articles/article-${id}.ts`, 'utf8')
      expect(content).toContain('buryPoints:')
      const match = content.match(/buryPoints:\s*\[([\d\s,]*)\]/)
      expect(match).not.toBeNull()
      const pts = match![1].split(',').map(Number).filter(n => !isNaN(n))
      expect(pts.length).toBeGreaterThanOrEqual(1)
      // 验证埋点值小于段落数（content 中的 <p> 数量）
      const pCount = (content.match(/<p>/g) || []).length
      for (const p of pts) {
        expect(p).toBeLessThan(pCount)
      }
      // 验证能通过 TypeScript 编译
      const build = await Bun.$`bun build src/data/articles/article-${id}.ts 2>&1`.text()
      expect(build).not.toContain('error')
    })
  }
})

describe('store 小说句子', () => {
  it('konosuba.json 存在且有足够的句子', () => {
    const json = JSON.parse(readFileSync('public/novel/konosuba.json', 'utf8'))
    expect(json).toBeInstanceOf(Array)
    expect(json.length).toBeGreaterThan(2000)
    // 检查句子格式（单引号字符串）
    for (const s of json) {
      expect(typeof s).toBe('string')
      expect(s.length).toBeGreaterThan(0)
    }
  })

  it('novel.ts 语法正确', async () => {
    const build = await Bun.$`bun build src/stores/novel.ts 2>&1`.text()
    expect(build).not.toContain('error')
  })
})

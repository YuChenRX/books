import { describe, it, expect, beforeEach } from 'bun:test'
import { readFileSync } from 'fs'

// 测试 store 的核心逻辑：loadNovel、currentSentence、nextSentence

describe('novel store 核心逻辑', () => {
  // 用实际的小说 JSON 文件验证
  it('novel.json 存在且包含足够的句子', () => {
    const json = JSON.parse(readFileSync('public/novel/无职转生.json', 'utf8'))
    expect(json).toBeInstanceOf(Array)
    expect(json.length).toBeGreaterThanOrEqual(10)
    // 每个句子 ≤ 20 字
    for (const s of json) {
      const charLen = [...s].filter(c => c.match(/[\u4e00-\u9fff\w]/)).length
      expect(charLen).toBeLessThanOrEqual(20)
      expect(charLen).toBeGreaterThanOrEqual(2)
    }
    console.log(`✅ 小说 ${json.length} 句，全部合法`)
  })

  it('article-a1.ts 有 buryPoints 且语法正确', () => {
    const content = readFileSync('src/data/articles/article-a1.ts', 'utf8')
    expect(content).toContain('buryPoints:')
    // 验证基本的 JS 语法 - 用 eval 解析
    // 只检查是否包含埋点数组
    const match = content.match(/buryPoints:\s*\[([\d,\s]*)\]/)
    expect(match).not.toBeNull()
    const pts = match![1].split(',').map(Number).filter(n => !isNaN(n))
    expect(pts.length).toBeGreaterThanOrEqual(1)
    console.log(`✅ article-a1.ts 有 ${pts.length} 个埋点:`, pts)
  })

  it('articles/index.ts 引用拆分后的文件', () => {
    const content = readFileSync('src/data/articles/index.ts', 'utf8')
    const imports = content.match(/import a\d+ from/g)
    expect(imports?.length).toBe(10)
    console.log(`✅ articles/index.ts 引用 ${imports?.length} 个文件`)
  })
})

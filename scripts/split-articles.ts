import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

const src = readFileSync('handoff/articles/index.ts', 'utf8')
const outDir = 'src/data/articles'

// 提取每篇文章对象
const articleRegex = /(\{\s*id:\s*"[^"]+",[\s\S]*?\})\s*,?\s*(?=\/\/ ───|\])/g
const articles: string[] = []
let match
while ((match = articleRegex.exec(src)) !== null) {
  articles.push(match[1])
}

console.log(`📄 找到 ${articles.length} 篇文章`)

let indexContent = `import type { Article } from '@/data/types'\n\n`

articles.forEach((art, i) => {
  const idMatch = art.match(/id:\s*"([^"]+)"/)
  const id = idMatch?.[1] || `a${i + 1}`
  const num = i + 1

  // 计算埋点
  const contentMatch = art.match(/content:\s*\[([\s\S]*?)\]\s*\.join\("\\n"\)/)
  let buryPoints: number[] = []
  if (contentMatch) {
    const lines = contentMatch[1].split("',")
      .map(s => s.replace(/^\s*'/, '').replace(/\\n/g, '\n'))
    let inPre = false, inBq = false
    const pLines: number[] = []
    for (let li = 0; li < lines.length; li++) {
      const line = lines[li]
      if (line.includes('<pre>')) inPre = true
      if (line.includes('<blockquote>')) inBq = true
      if (!inPre && !inBq && /^<p>/i.test(line.trim())) pLines.push(li)
      if (line.includes('</pre>')) inPre = false
      if (line.includes('</blockquote>')) inBq = false
    }
    const count = Math.max(1, Math.floor(pLines.length / 5))
    const step = Math.max(1, Math.floor(pLines.length / count))
    for (let j = 0; j < count; j++) buryPoints.push(pLines[Math.min(j * step, pLines.length - 1)])
  }

  // 在 content 数组后插入 buryPoints
  const joinRegex = /\]\s*\.join\("\\n"\)/
  const joinMatch = art.match(joinRegex)
  let newArt = art
  if (joinMatch) {
    const idx = joinMatch.index! + joinMatch[0].length
    newArt = art.slice(0, idx) + `,\n  buryPoints: [${buryPoints.join(', ')}]` + art.slice(idx)
  }

  const fileContent = `import type { Article } from '@/data/types'\n\nconst article: Article = ${newArt}\n\nexport default article\n`
  const filePath = resolve(outDir, `article-${id}.ts`)
  writeFileSync(filePath, fileContent, 'utf8')
  console.log(`✅ ${num}. ${id}: ${buryPoints.length} 个埋点 → article-${id}.ts`)

  indexContent += `import a${num} from './article-${id}'\n`
})

indexContent += `\nexport const articles: Article[] = [\n`
for (let i = 0; i < articles.length; i++) {
  indexContent += `  a${i + 1},\n`
}
indexContent += `]\n`

writeFileSync(resolve(outDir, 'index.ts'), indexContent, 'utf8')
console.log('🎉 拆分完成')

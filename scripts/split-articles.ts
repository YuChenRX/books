import { readFileSync, writeFileSync } from 'fs'

const src = readFileSync('src/data/articles.ts', 'utf-8')
const blocks = src.split(/(?=\/\/ ─── \d+\.)/)

// 清理目标目录
const dir = 'src/data/articles'

let indexContent = `// 自动生成\nimport type { Article } from '@/data/types'\n\n`

for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i]
  const id = block.match(/id:\s*"([^"]+)"/)?.[1] || `a${i}`

  // 在 content 数组的 .join("") 之后、}, 之前插入 buryPoints
  const joinMatch = block.match(/\]\.join\(/)
  if (!joinMatch) continue
  const joinEnd = joinMatch.index! + joinMatch[0].length
  // 找到 .join("") 的闭合 ) 位置
  const afterJoin = block.slice(joinEnd)
  const parenMatch = afterJoin.match(/\)/)
  if (!parenMatch) continue
  const insertAt = joinEnd + parenMatch.index! + 1  // 在 ) 之后

  // 提取 content 中的行并计算埋点
  const contentStart = block.indexOf("content: [")
  const contentEnd = block.lastIndexOf("].join(")
  const contentBody = block.slice(contentStart + 10, contentEnd)

  // 解析数组元素 - 用简单方式提取 <p> 标签
  const lines = contentBody.split("',").map(s => {
    // 去掉开头的引号和空格
    return s.replace(/^\s*'/, '').replace(/\\n/g, '\n')
  })

  // 计算埋点
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
  const buryPoints: number[] = []
  for (let j = 0; j < count; j++) {
    buryPoints.push(pLines[Math.min(j * step, pLines.length - 1)])
  }

  // 在 content 数组后插入 buryPoints（补逗号）
  const beforeInsert = block.slice(0, insertAt)
  const afterInsert = block.slice(insertAt)
  const buryStr = `,\n  buryPoints: [${buryPoints.join(', ')}]`
  const newBlock = beforeInsert + buryStr + afterInsert

  writeFileSync(`${dir}/article-${id}.ts`,
    `import type { Article } from '@/data/types'\n\nconst article: Article = ${newBlock.trim()}\n\nexport default article\n`, 'utf-8')

  console.log(`✅ ${id}: ${pLines.length} 个 <p>, ${buryPoints.length} 个埋点 (${buryPoints.join(',')})`)
  indexContent += `import a${i} from './article-${id}'\n`
}

// index.ts
indexContent += `\nexport const articles: Article[] = [\n`
for (let i = 1; i < blocks.length; i++) {
  const id = blocks[i].match(/id:\s*"([^"]+)"/)?.[1] || `a${i}`
  indexContent += `  a${i},\n`
}
indexContent += `]\n`
writeFileSync(`${dir}/index.ts`, indexContent, 'utf-8')
console.log('🎉 完成')

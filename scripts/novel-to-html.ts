#!/usr/bin/env bun
/**
 * novel-to-html.ts — 小说 TXT → 文字+图片列表 HTML
 *
 * 用法:
 *   bun run scripts/novel-to-html.ts 小说.txt --title "书名" --author "作者"
 *   bun run scripts/novel-to-html.ts 小说.txt -t "书名" -a "作者" -o 输出.html
 *
 * 支持格式:
 *   - 中文章节: 第一章 / 第1章 / 第X章 / 第X回 / 第X节
 *   - 英文章节: Chapter 1 / ChapterX
 *   - 未匹配的内容归入"楔子"
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, basename, extname } from "path";

// ─── 参数解析 ──────────────────────────────────────────────
const args = process.argv.slice(2);
if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.log(`
  📖 小说 TXT → 列表 HTML

  用法:
    bun run scripts/novel-to-html.ts <输入.txt> [选项]

  选项:
    --title, -t    书名（默认取自文件名）
    --author, -a   作者
    --cover, -c    封面图片 URL 或本地路径
    --output, -o   输出 HTML 路径
    --charset      编码（auto | utf8 | gbk，默认 auto）
    --help, -h     显示帮助
  `);
  process.exit(0);
}

let inputFile = "";
let bookTitle = "";
let author = "";
let cover = "";
let outputFile = "";
let charset = "auto";

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--title" || a === "-t") bookTitle = args[++i] || "";
  else if (a === "--author" || a === "-a") author = args[++i] || "";
  else if (a === "--cover" || a === "-c") cover = args[++i] || "";
  else if (a === "--output" || a === "-o") outputFile = args[++i] || "";
  else if (a === "--charset") charset = args[++i] || "auto";
  else if (!inputFile) inputFile = a;
}

if (!inputFile || !existsSync(inputFile)) {
  console.error("❌ 文件不存在:", inputFile);
  process.exit(1);
}

if (!bookTitle) bookTitle = basename(inputFile, extname(inputFile));
if (!outputFile) outputFile = resolve(process.cwd(), `${bookTitle}.html`);

// ─── 读取文件 ──────────────────────────────────────────────
function readText(path: string): string {
  const raw = readFileSync(path);
  if (charset === "utf8" || charset === "utf-8") return raw.toString("utf-8");
  if (charset === "gbk" || charset === "gb2312") {
    try { return new TextDecoder("gbk").decode(raw); } catch { return raw.toString("utf-8"); }
  }
  try {
    const text = raw.toString("utf-8");
    if (text.includes("\uFFFD")) throw new Error("invalid utf-8");
    return text;
  } catch {
    try { return new TextDecoder("gbk").decode(raw); } catch { return raw.toString("utf-8"); }
  }
}

// ─── 章节解析 ──────────────────────────────────────────────
interface Chapter {
  title: string;
  paragraphs: string[];
}

const CHAPTER_RE = /^(?:\s*)((?:第[\u4e00-\u9fff\d]+[章回节部篇集]|Chapter\s*\d+|第\d+[章回节部篇集]|[一二三四五六七八九十百千]+[章回节部篇集]))[\s：:、\.\s]*.*$/im;

function parseChapters(text: string): Chapter[] {
  const lines = text.split(/\r?\n/);
  const chapters: Chapter[] = [];
  let current: Chapter | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      if (current) current.paragraphs.push("");
      continue;
    }

    const chapterMatch = line.match(CHAPTER_RE);
    if (chapterMatch) {
      if (current && current.paragraphs.length > 0) chapters.push(current);
      current = { title: chapterMatch[1].trim(), paragraphs: [] };
      continue;
    }

    if (!current) current = { title: "楔子", paragraphs: [] };
    current.paragraphs.push(raw);
  }

  if (current && current.paragraphs.length > 0) chapters.push(current);
  return chapters;
}

// ─── HTML 生成（简洁列表风格） ──────────────────────────────
function generateHtml(chapters: Chapter[]): string {
  const items = chapters
    .map((ch, i) => {
      const paras = ch.paragraphs
        .filter((p) => p.trim())
        .map((p) => `<p>${escapeHtml(p.trim())}</p>`)
        .join("\n          ");
      return `    <li class="chapter-item">
      <h2 class="chapter-title">${i + 1}. ${escapeHtml(ch.title)}</h2>
      <div class="chapter-body">
          ${paras}
      </div>
    </li>`;
    })
    .join("\n");

  const coverHtml = cover
    ? `<div class="cover-wrap"><img src="${escapeHtml(cover)}" alt="${escapeHtml(bookTitle)}" class="cover"></div>`
    : "";

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(bookTitle)}${author ? " - " + escapeHtml(author) : ""}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif;
      background: #f8f8f8;
      color: #333;
      line-height: 1.8;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 30px 20px 60px;
    }

    /* 书头 */
    .header {
      text-align: center;
      padding: 30px 0;
      border-bottom: 2px solid #e0d8d0;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
    }
    .header .author {
      margin-top: 8px;
      font-size: 15px;
      color: #888;
    }
    .header .meta {
      margin-top: 6px;
      font-size: 13px;
      color: #aaa;
    }

    /* 封面 */
    .cover-wrap {
      text-align: center;
      margin-bottom: 30px;
    }
    .cover {
      max-width: 260px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    /* 章节列表 */
    .chapter-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .chapter-item {
      background: #fff;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .chapter-title {
      margin: 0 0 12px;
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    .chapter-body p {
      margin: 0 0 0.6em;
      text-indent: 2em;
      font-size: 16px;
      letter-spacing: 0.3px;
    }
    .chapter-body p:last-child {
      margin-bottom: 0;
    }

    /* 底部 */
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #ccc;
    }

    @media (max-width: 640px) {
      .container { padding: 16px 12px 40px; }
      .header h1 { font-size: 22px; }
      .chapter-title { font-size: 17px; }
      .chapter-body p { font-size: 15px; }
      .chapter-item { padding: 16px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${escapeHtml(bookTitle)}</h1>
      ${author ? `<p class="author">${escapeHtml(author)}</p>` : ""}
      <p class="meta">${chapters.length} 章 · ${estimateWords(chapters)} 字</p>
    </div>

    ${coverHtml}

    <ul class="chapter-list">
${items}
    </ul>

    <div class="footer">Generated by novel-to-html</div>
  </div>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function estimateWords(chapters: Chapter[]): string {
  let len = 0;
  for (const ch of chapters) for (const p of ch.paragraphs) len += p.replace(/\s/g, "").length;
  if (len > 10000) return `${(len / 10000).toFixed(1)}万+`;
  if (len > 1000) return `${(len / 1000).toFixed(1)}千+`;
  return `${len}+`;
}

// ─── 主流程 ──────────────────────────────────────────────
console.log(`📖 正在转换: ${inputFile}`);
const raw = readText(inputFile);
const chapters = parseChapters(raw);
const html = generateHtml(chapters);
writeFileSync(outputFile, html, "utf-8");
console.log(`✅ 转换完成: ${outputFile}`);
console.log(`   📄 共 ${chapters.length} 章`);
if (author) console.log(`   ✍️  作者: ${author}`);

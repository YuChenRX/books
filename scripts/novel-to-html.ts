#!/usr/bin/env bun
/**
 * novel-to-html.ts — 小说 TXT 转单页 HTML 阅读器
 *
 * 用法:
 *   bun run scripts/novel-to-html.ts 小说.txt --title "书名" --author "作者"
 *   bun run scripts/novel-to-html.ts 小说.txt -o 输出.html
 *
 * 支持格式:
 *   - 中文章节: 第一章 / 第1章 / 第X章 / 第X回 / 第X节
 *   - 英文章节: Chapter 1 / ChapterX
 *   - 数字章节: 1. / 一、 / (1)
 *   未匹配的内容会归入"楔子/序章"
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname, basename, extname } from "path";

// ─── 参数解析 ──────────────────────────────────────────────
const args = process.argv.slice(2);
if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.log(`
  📖 小说 TXT → HTML 阅读器

  用法:
    bun run ${import.meta?.file ? basename(import.meta.file) : "scripts/novel-to-html.ts"} <输入.txt> [选项]

  选项:
    --title, -t    书名（默认取自文件名）
    --author, -a   作者
    --output, -o   输出 HTML 路径（默认同目录）
    --charset, -c  编码（auto | utf8 | gbk，默认 auto）
    --help, -h     显示帮助
  `);
  process.exit(0);
}

let inputFile = "";
let bookTitle = "";
let author = "";
let outputFile = "";
let charset = "auto";

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--title" || a === "-t") bookTitle = args[++i] || "";
  else if (a === "--author" || a === "-a") author = args[++i] || "";
  else if (a === "--output" || a === "-o") outputFile = args[++i] || "";
  else if (a === "--charset" || a === "-c") charset = args[++i] || "auto";
  else if (!inputFile) inputFile = a;
}

if (!inputFile || !existsSync(inputFile)) {
  console.error("❌ 文件不存在:", inputFile);
  process.exit(1);
}

if (!bookTitle) bookTitle = basename(inputFile, extname(inputFile));
if (!outputFile) outputFile = resolve(dirname(inputFile), `${bookTitle}.html`);

// ─── 读取文件 ──────────────────────────────────────────────
function readText(path: string): string {
  const raw = readFileSync(path);
  if (charset === "utf8" || charset === "utf-8") return raw.toString("utf-8");
  if (charset === "gbk" || charset === "gb2312") {
    try {
      // Bun 支持 decode
      return new TextDecoder("gbk").decode(raw);
    } catch {
      return raw.toString("utf-8");
    }
  }
  // auto detect
  try {
    const text = raw.toString("utf-8");
    if (text.includes("\uFFFD")) throw new Error("invalid utf-8");
    return text;
  } catch {
    try {
      return new TextDecoder("gbk").decode(raw);
    } catch {
      return raw.toString("utf-8");
    }
  }
}

// ─── 章节解析 ──────────────────────────────────────────────
interface Chapter {
  title: string;
  paragraphs: string[];
}

// 章节标题正则（匹配中英文各种章节格式）
const CHAPTER_RE = /^(?:\s*)((?:第[\u4e00-\u9fff\d]+[章回节部篇集]|Chapter\s*\d+|第\d+[章回节部篇集]|[一二三四五六七八九十百千]+[章回节部篇集]))[\s：:、\.\s]*.*$/im;

// 备用行级标题（如 "1. " "一、" "(1)"）
const LINE_CHAPTER_RE = /^\s*(?:([\d]+)\.\s*|[一二三四五六七八九十]+、|\(\d+\))\s*(.*)$/;

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
      if (current && current.paragraphs.length > 0) {
        chapters.push(current);
      }
      current = { title: chapterMatch[1].trim(), paragraphs: [] };
      continue;
    }

    if (!current) {
      current = { title: "楔子", paragraphs: [] };
    }
    current.paragraphs.push(raw);
  }

  if (current && current.paragraphs.length > 0) {
    chapters.push(current);
  }

  return chapters;
}

// ─── HTML 生成 ──────────────────────────────────────────────
function generateHtml(chapters: Chapter[]): string {
  const totalCh = chapters.length;

  const tocItems = chapters
    .map((ch, i) => `<li><a href="#ch-${i}">${ch.title}</a></li>`)
    .join("\n");

  const bodyContent = chapters
    .map(
      (ch, i) => `
      <section id="ch-${i}" class="chapter">
        <h2 class="chapter-title">${escapeHtml(ch.title)}</h2>
        <div class="content">
          ${ch.paragraphs
            .map((p) => {
              const t = p.trim();
              if (!t) return "";
              return `<p>${escapeHtml(t)}</p>`;
            })
            .join("\n")}
        </div>
        ${i < totalCh - 1 ? '<div class="chapter-end">◆ ◆ ◆</div>' : ""}
      </section>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(bookTitle)} - 在线阅读</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 16px; scroll-behavior: smooth; }
    body {
      font-family: -apple-system, "PingFang SC", "Noto Sans SC", "Microsoft YaHei", serif;
      background: #f5f0eb;
      color: #2c2c2c;
      line-height: 1.9;
    }

    /* ── 顶栏 ── */
    .top-bar {
      position: sticky; top: 0; z-index: 100;
      background: rgba(245,240,235,0.92);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid #e0d8d0;
      padding: 12px 20px;
      display: flex; align-items: center; gap: 16px;
    }
    .top-bar h1 {
      font-size: 18px; font-weight: 600;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .top-bar .meta { font-size: 13px; color: #888; white-space: nowrap; }
    .top-bar .toc-toggle {
      margin-left: auto;
      padding: 6px 14px; font-size: 13px;
      background: #c8242f; color: #fff; border: none; border-radius: 4px;
      cursor: pointer;
    }
    .top-bar .toc-toggle:hover { background: #a11d26; }

    /* ── 目录浮层 ── */
    .toc-overlay {
      display: none;
      position: fixed; inset: 0; z-index: 200;
      background: rgba(0,0,0,0.4);
    }
    .toc-overlay.open { display: block; }
    .toc-panel {
      position: fixed; top: 0; left: 0; bottom: 0; width: 300px; max-width: 80vw;
      background: #fff; overflow-y: auto; z-index: 210;
      transform: translateX(-100%); transition: transform 0.25s ease;
      box-shadow: 2px 0 16px rgba(0,0,0,0.1);
    }
    .toc-overlay.open .toc-panel { transform: translateX(0); }
    .toc-panel h2 {
      padding: 20px 20px 12px; font-size: 16px; font-weight: 600; color: #333;
      border-bottom: 1px solid #eee;
    }
    .toc-panel ul { list-style: none; padding: 8px 0; }
    .toc-panel li a {
      display: block; padding: 10px 20px; font-size: 14px; color: #555;
      text-decoration: none; border-bottom: 1px solid #f5f5f5;
      transition: background 0.15s;
    }
    .toc-panel li a:hover { background: #f5f0eb; color: #c8242f; }
    .toc-close {
      position: absolute; top: 16px; right: 16px;
      font-size: 22px; color: #999; cursor: pointer; line-height: 1;
    }
    .toc-close:hover { color: #333; }

    /* ── 书籍信息卡 ── */
    .book-info {
      max-width: 680px; margin: 40px auto 20px; padding: 0 20px;
      text-align: center;
    }
    .book-info h1 { font-size: 28px; font-weight: 700; color: #1a1a1a; letter-spacing: 2px; }
    .book-info .author { margin-top: 8px; font-size: 15px; color: #888; }
    .book-info .stats { margin-top: 12px; font-size: 13px; color: #aaa; }
    .book-info .stats span { margin: 0 8px; }

    /* ── 章节 ── */
    main { max-width: 680px; margin: 0 auto; padding: 0 20px 80px; }
    .chapter { margin-top: 40px; }
    .chapter:first-of-type { margin-top: 0; }
    .chapter-title {
      font-size: 22px; font-weight: 700; text-align: center;
      color: #1a1a1a; margin-bottom: 24px; letter-spacing: 2px;
      padding-bottom: 16px;
      border-bottom: 2px solid #e0d8d0;
    }
    .chapter .content p {
      text-indent: 2em; margin-bottom: 0.6em;
      font-size: 16px; letter-spacing: 0.5px;
    }
    .chapter-end {
      text-align: center; color: #ccc; margin: 36px 0; font-size: 14px;
      letter-spacing: 4px;
    }

    /* ── 底部 ── */
    .footer {
      max-width: 680px; margin: 0 auto; padding: 20px;
      text-align: center; font-size: 12px; color: #bbb;
      border-top: 1px solid #e0d8d0;
    }

    /* ── 响应式 ── */
    @media (max-width: 640px) {
      .top-bar h1 { font-size: 15px; }
      .top-bar .meta { display: none; }
      .book-info h1 { font-size: 22px; }
      .chapter-title { font-size: 18px; }
      .chapter .content p { font-size: 15px; }
    }
  </style>
</head>
<body>

<!-- 顶栏 -->
<header class="top-bar">
  <h1>${escapeHtml(bookTitle)}</h1>
  ${author ? `<span class="meta">/ ${escapeHtml(author)}</span>` : ""}
  <button class="toc-toggle" onclick="toggleToc()">📖 目录</button>
</header>

<!-- 目录浮层 -->
<div id="toc-overlay" class="toc-overlay" onclick="closeToc(event)">
  <nav class="toc-panel" onclick="event.stopPropagation()">
    <span class="toc-close" onclick="closeToc()">✕</span>
    <h2>📖 目录</h2>
    <ul>${tocItems}</ul>
  </nav>
</div>

<!-- 书籍信息 -->
<div class="book-info">
  <h1>${escapeHtml(bookTitle)}</h1>
  ${author ? `<p class="author">${escapeHtml(author)}</p>` : ""}
  <p class="stats">
    <span>📄 ${totalCh} 章</span>
    <span>📝 约 ${estimateWords(bodyContent)} 字</span>
  </p>
</div>

<!-- 正文 -->
<main>
  ${bodyContent}
</main>

<div class="footer">
  <p>Generated by novel-to-html · 阅读模式</p>
</div>

<script>
function toggleToc() {
  document.getElementById("toc-overlay").classList.toggle("open");
}
function closeToc(e) {
  if (!e || e.target === e.currentTarget) {
    document.getElementById("toc-overlay").classList.remove("open");
  }
}
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeToc();
});
</script>

</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function estimateWords(html: string): string {
  const text = html.replace(/<[^>]+>/g, "").replace(/\s+/g, "");
  const len = text.length;
  if (len > 10000) return `${(len / 10000).toFixed(1)}万+`;
  if (len > 1000) return `${(len / 1000).toFixed(1)}千+`;
  return `${len}+`;
}

// ─── 主流程 ──────────────────────────────────────────────
console.log(`📖 正在转换: ${inputFile}`);

const raw = readText(inputFile);
const chapters = parseChapters(raw);
const html = generateHtml(chapters);

mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(outputFile, html, "utf-8");

console.log(`✅ 转换完成: ${outputFile}`);
console.log(`   📄 共 ${chapters.length} 章`);
if (author) console.log(`   ✍️  作者: ${author}`);

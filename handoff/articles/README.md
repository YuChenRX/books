# 文章数据迁移说明

## 源文件位置

React 项目: `src/articles/all-articles.js`

该文件导出一个包含 10 篇文章对象的数组 `ARTICLES`。每个对象的结构如下：

```javascript
{
  id: "a1",          // 唯一标识
  title: "标题",     // 文章标题
  author: "作者名",
  date: "2026-06-28",
  views: "3.2k",     // 阅读量
  likes: 128,        // 点赞数
  comments: 42,      // 评论数
  tags: ["React"],   // 标签
  avatar: "💻",       // 头像 emoji
  excerpt: "摘要...", // 列表页摘要文本
  content: "<h2>...</h2>"  // HTML 正文
}
```

## 迁移方式（推荐）

### 方案 A：静态 JS/TS 文件

直接复制 `all-articles.js` 到 Vue 项目的 `src/data/articles.js`：

```javascript
// src/data/articles.js
export const articles = [ /* ... 10 篇文章对象 ... */ ];
```

### 方案 B：JSON 文件

导出为 JSON 文件 `src/data/articles.json`（注意 content 字段的 HTML 需转义）。

### 方案 C：从 React 项目直接复制

React 原文件的 `all-articles.js` 路径：
```
E:\study\web\react\all-in-one\src\articles\all-articles.js
```

直接复制到 Vue 项目即可。

## 文章内容量统计

| # | 文章 | 字数（含 HTML 标签） | 纯文本字数 |
|---|------|---------------------|-----------|
| 1 | React 18 并发模式 | ~4500 | ~3000 |
| 2 | Webpack → Turbopack | ~3000 | ~2000 |
| 3 | TypeScript 5.0 | ~3000 | ~2000 |
| 4 | 微前端架构 | ~3000 | ~2000 |
| 5 | Node.js Event Loop | ~2500 | ~1700 |
| 6 | Git 高级技巧 | ~2000 | ~1400 |
| 7 | 浏览器渲染原理 | ~3000 | ~2000 |
| 8 | CSS Container Queries | ~2500 | ~1700 |
| 9 | Module Federation | ~2000 | ~1400 |
| 10 | RxJS | ~2500 | ~1700 |

## 内容使用许可

文章内容为 AI 生成的技术写作，已避免与真实文章重复。可用于演示/Demo 项目。

## 扩展建议

如需更多文章，可：
1. 从真实 CSDN 博客爬取（注意版权）
2. 继续使用 AI 生成（推荐 Claude/GPT）
3. 手动编写（最可控）

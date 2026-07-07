# CSDN 风格博客系统 — 资源迁移文档

## 项目概述

在 React 项目中实现的一个 CSDN 风格技术博客系统。包含：
- CSDN 风格列表页（标题流 + 左分类栏 + 右热门推荐）
- CSDN 风格文章详情页（作者卡 + 代码高亮 + 版权声明 + 标签云）
- 10 篇超长技术文章（每篇 3000-5000 字）

## 文件结构（React 项目原位置）

```
src/
├── views/
│   └── Novel.jsx          ← 核心组件（CSDNHeader + ArticleList + ArticleDetail）
├── articles/
│   └── all-articles.js    ← 10 篇文章数据
src/components/
├── BookView/index.jsx     ← 备用文本渲染器（可用可不用）
```

## 迁移到 Vue 的核心任务

1. **移植组件结构** — CSDNHeader → ArticleList → ArticleDetail
2. **移植文章数据** — 直接复制 `all-articles.js` 内容
3. **移植样式** — CSDN 设计 Token 清单见下方
4. **代码高亮** — 安装 highlight.js（Vue 版本 `npm i highlight.js`）

## CSDN 设计 Token

```css
/* 颜色 */
--csdn-red:     #c8242f;
--csdn-red-lt:  #c20a0a;
--csdn-bg:      #f5f6f7;
--csdn-border:  #e8e8e8;
--csdn-text:    #333333;
--csdn-sub:     #999999;

/* 布局 */
--content-max-width: 1200px;
--header-height: 50px;
--subnav-height: 36px;
--total-header: 92px;

/* 排版 */
--article-font-size: 15px;
--article-line-height: 1.8;
```

## 快速开始（Vue）

```bash
# 创建 Vue 项目
npm init vue@latest csdn-blog
cd csdn-blog
npm install vue-router highlight.js
```

---

**下一份文档**: `ARCHITECTURE.md` — 架构与组件关系图

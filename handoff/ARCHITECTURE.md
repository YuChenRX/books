# 架构文档

## 页面路由设计

```
/              → ArticleList      (博客首页，文章列表)
/article/:id   → ArticleDetail    (文章详情)
```

## 组件树

```
App.vue
├── CSDNHeader.vue          ← 固定在顶部
│   ├── Logo + 导航链接
│   ├── 搜索框
│   └── 子导航栏
│
├── ArticleList.vue         ← 首页（路由 /）
│   ├── SidebarLeft.vue     ← 分类专栏
│   ├── ArticleFeed.vue     ← 文章列表流
│   └── SidebarRight.vue    ← 热门推荐
│
└── ArticleDetail.vue       ← 详情页（路由 /article/:id）
    ├── AuthorBar.vue       ← 作者信息
    ├── ArticleContent.vue  ← 正文（含代码高亮）
    ├── CopyrightNotice.vue ← 版权声明
    ├── PrevNextNav.vue     ← 上/下篇导航
    └── SidebarRight.vue    ← 作者卡 + 热门 + 标签云 + 广告
```

## 数据流

```
ArticleList
  │ 点击文章卡片
  ├─→ 跳转 /article/:id
  │  ← 从 ARTICLES 数组读取对应文章
  │
  ├─→ ArticleDetail.vue
  │   在 created/mounted 中通过 id 查找 ARTICLES
  │
  └─→ SidebarRight 复用 ARTICLES 数组
```

**状态管理**: 简单场景无需 Vuex/Pinia。ARTICLES 作为静态数据导入即可。

## 数据模型

```javascript
{
  id: "a1",              // 文章唯一 ID
  title: "文章标题",      // 标题
  author: "作者名",       // 作者
  date: "2026-06-28",    // 日期
  views: "3.2k",         // 阅读量
  likes: 128,            // 点赞数
  comments: 42,          // 评论数
  tags: ["React"],       // 标签数组
  avatar: "💻",           // 作者头像 emoji
  excerpt: "摘要...",     // 列表页摘要
  content: "<h2>...</h2>" // HTML 正文
}
```

---

**下一份文档**: `COMPONENTS.md` — 各组件详细说明

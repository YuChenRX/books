import type { Article } from '@/data/types'

const article: Article = {
    id: "a8",
    title: "CSS Container Queries 深度解析：告别媒体查询",
    author: "CSS 魔法师",
    date: "2026-06-07",
    views: "1.4k",
    likes: 45,
    comments: 15,
    tags: ["CSS", "响应式"],
    avatar: "🎨",
    excerpt: "Container Queries 允许组件根据自身容器大小而不是视口大小调整样式，解决了 Media Queries 无法解决的问题...",
    content: [
      '<h2>一、基本用法</h2>',
      '<p>Container Queries 是 CSS 近年最实用的新特性之一，允许组件根据自身容器大小而不是视口大小调整样式。在组件化前端架构中解决了 Media Queries 无法解决的问题。使用分两步：第一步在父容器上声明 container-type: inline-size 创建 containment context。第二步在子元素中使用 @container 规则查询容器尺寸。</p>',
      '<pre><code>.card-container {\n  container-type: inline-size;\n  container-name: card;\n}\n@container card (min-width: 400px) {\n  .card { grid-template-columns: 1fr 2fr; }\n}</code></pre>',
      '<h2>二、容器查询单位</h2>',
      '<p>Container Queries 还引入了 cqw、cqh、cqi、cqb、cqmin 和 cqmax 等容器查询单位。1cqw 等于查询容器宽度的 1%。这些单位让组件内部的尺寸相对于容器而非视口。</p>',
      '<h2>三、浏览器兼容性</h2>',
      '<p>Container Queries 在 Chrome 105+、Firefox 110+、Safari 16+ 中均已支持。在实际项目中可以放心使用。</p>',
    ].join("\n"),
  buryPoints: [1],
  }

export default article

import type { Article } from '@/data/types'

const article: Article = // ─── 8. CSS Container Queries ───
  {
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
      '<h2>一、基本概念与核心用法</h2>',
      '<p>CSS Container Queries（容器查询）是 CSS 近年最令人瞩目的新特性之一，它彻底改变了组件响应式设计的实现方式。在 Container Queries 出现之前，Media Queries 是唯一的响应式方案——但媒体查询只能基于视口（viewport）尺寸来判断，无法感知组件所在容器的实际大小。在组件化前端架构中，同一个组件可能被放在侧边栏（窄）或主内容区（宽）中，此时组件的样式应该根据其容器的尺寸而不是页面视口来调整。Container Queries 正是为解决这个问题而生。</p>',
      '<p>Container Queries 的使用分为两个核心步骤。第一步，在父容器上声明 containment context，通过 container-type 属性告诉浏览器你需要监视这个容器的尺寸变化。container-type 有三个可选值：inline-size（只监视内联方向——通常是宽度）、size（监视两个方向——宽度和高度）、normal（仅用于样式查询，不用于尺寸查询）。第二步，在子元素中使用 @container 规则来编写条件样式，就像使用 @media 一样。</p>',
      '<pre><code>/* 基本用法：创建容器上下文 */\n\n/* 在父容器上声明容器上下文 */\n.card-container {\n  container-type: inline-size;\n  container-name: card;\n  /* container 是 container-type + container-name 的简写 */\n  /* container: card / inline-size; */\n}\n\n/* 基于容器尺寸的条件样式 */\n@container card (min-width: 600px) {\n  .card {\n    display: grid;\n    grid-template-columns: 1fr 2fr;\n    gap: 1.5rem;\n  }\n  .card__image {\n    border-radius: 12px 0 0 12px;\n  }\n  .card__title {\n    font-size: 1.5rem;\n  }\n}\n\n@container card (max-width: 599px) {\n  .card {\n    display: flex;\n    flex-direction: column;\n  }\n  .card__image {\n    border-radius: 12px 12px 0 0;\n    height: 200px;\n  }\n  .card__title {\n    font-size: 1.25rem;\n  }\n}\n\n/* 嵌套容器：每个容器上下文独立 */\n.sidebar {\n  container-type: inline-size;\n  container-name: sidebar;\n}\n.main-content {\n  container-type: inline-size;\n  container-name: main;\n}\n\n@container sidebar (min-width: 300px) {\n  .widget { /* sidebar 窄布局 */ }\n}\n@container main (min-width: 800px) {\n  .widget { /* main 宽布局 */ }\n}</code></pre>',
      '<p>与媒体查询不同，容器查询支持嵌套使用。一个组件可以同时处于多个容器上下文中，查询时会向上遍历 DOM 树，找到最近的有容器上下文的祖先元素。通过 container-name 可以精确指定要查询哪个容器上下文，避免查询到错误的祖先容器。在实际项目中，建议为每个容器指定有意义的名称，这样可以提高代码的可读性和可维护性。</p>',
      '<blockquote><p>Container Queries 与 Media Queries 并不是替代关系，而是互补关系。Media Queries 负责"页面级"的布局响应——比如决定侧边栏是展开还是收起、主区域是单列还是多列。Container Queries 负责"组件级"的响应——比如卡片组件在其容器中的内部布局调整。一个完整的响应式设计架构应该同时使用两者，各司其职。</p></blockquote>',
      '<h2>二、容器查询单位详解</h2>',
      '<p>Container Queries 还引入了六个新的 CSS 长度单位，它们相对于查询容器的尺寸进行计算：cqw（容器宽度的 1%）、cqh（容器高度的 1%）、cqi（容器内联方向尺寸的 1%）、cqb（容器块方向尺寸的 1%）、cqmin（cqi 和 cqb 中较小的值）、cqmax（cqi 和 cqb 中较大的值）。这些单位让组件内部的尺寸、间距和字体大小可以相对于容器而非视口动态调整，实现了真正的容器响应式设计。</p>',
      '<pre><code>/* 容器查询单位实战示例 */\n\n/* 卡片组件使用容器单位 */\n.card-component {\n  container-type: inline-size;\n  container-name: product-card;\n}\n\n.card__title {\n  /* 字体大小随容器宽度变化 */\n  font-size: clamp(1rem, 4cqi, 2rem);\n}\n\n.card__padding {\n  /* 内边距随容器宽度缩放 */\n  padding: 2cqi;\n}\n\n.card__image {\n  /* 图片尺寸相对容器 */\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  border-radius: 1cqi;\n}\n\n.card__footer {\n  /* 间距自适应 */\n  gap: 1cqi;\n  padding: 1.5cqi 2cqi;\n}\n\n/* 实际应用：响应式表格 */\n.data-table {\n  container-type: inline-size;\n  container-name: table;\n}\n\n@container table (max-width: 500px) {\n  /* 窄容器时表格转为卡片布局 */\n  .data-table table,\n  .data-table thead,\n  .data-table tbody,\n  .data-table th,\n  .data-table td,\n  .data-table tr {\n    display: block;\n  }\n  .data-table thead {\n    display: none; /* 隐藏表头 */\n  }\n  .data-table td {\n    padding: 2cqw;\n    text-align: right;\n  }\n  .data-table td::before {\n    content: attr(data-label);\n    float: left;\n    font-weight: bold;\n  }\n}</code></pre>',
      '<p>容器查询单位与 clamp()、min()、max() 等 CSS 比较函数配合使用效果尤其出色。例如 font-size: clamp(1rem, 3cqi, 2rem) 可以确保字体大小在 1rem 到 2rem 之间随容器宽度变化。这种组合使得组件可以在任何容器中自动适配，无需手动编写多个 @container 断点。此外，容器单位在动画和过渡中也适用，可以实现流畅的容器尺寸响应效果。</p>',
      '<h2>三、实际应用场景与最佳实践</h2>',
      '<p>Container Queries 最典型的应用场景是卡片组件、仪表盘 Widget、表格/列表切换视图、导航菜单和表单布局等。在卡片组件中，容器查询可以实现从"横排大图"到"竖排小图"再到"极简列表"的多级响应式切换，而不管卡片被放在页面中的哪个位置。在仪表盘场景中，用户自由拖拽调整 Widget 大小时，Widget 内部的图表、文字和操作按钮能够自动适配新的尺寸。</p>',
      '<pre><code>/* 最佳实践：组件级响应式设计系统 */\n\n/* 定义组件级别的容器上下文 */\n:root {\n  /* 页面级使用媒体查询 */\n}\n\n/* 1. 可复用卡片组件 */\n.media-object {\n  container: media-card / inline-size;\n}\n\n@container media-card (min-width: 400px) {\n  .media-object {\n    display: flex;\n    flex-direction: row;\n  }\n  .media-object__image {\n    width: 40%;\n    max-width: 300px;\n  }\n}\n\n@container media-card (max-width: 399px) {\n  .media-object {\n    display: flex;\n    flex-direction: column;\n  }\n  .media-object__image {\n    width: 100%;\n  }\n}\n\n/* 2. 结合 CSS Grid 和容器查询 */\n.dashboard-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1rem;\n}\n\n.dashboard-widget {\n  container: widget / inline-size;\n  /* 每个 widget 自动适应其 grid 单元格大小 */\n}\n\n@container widget (min-width: 500px) {\n  .widget-content {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n  .widget-chart {\n    grid-column: 1 / -1;\n  }\n}\n\n/* 3. 性能优化：避免过度使用容器查询 */\n/* 只在需要的元素上使用，不是所有元素都需要 */\n.component {\n  /* 仅在需要容器查询的组件上声明 */\n  container-type: inline-size;\n}</code></pre>',
      '<p>使用 Container Queries 时需要注意几个最佳实践。首先，不要将 container-type 设置到每个组件上，只在真正需要根据容器尺寸调整样式的组件祖先上设置。其次，container-type: size 会锁定容器的宽高比约束，可能会产生意料之外的布局效果，推荐优先使用 inline-size。第三，容器查询不会影响容器本身在被查询尺寸方向上的布局，这是 CSS 包含（containment）机制的设计要求。最后，注意容器查询的层叠顺序——当多个 @container 规则匹配时，遵循 CSS 层叠的常规规则，特异性相同的情况下后面的规则覆盖前面的。</p>',
      '<h2>四、浏览器兼容性与渐进增强</h2>',
      '<p>截至 2024 年，Container Queries 在 Chrome 105+、Edge 105+、Firefox 110+、Safari 16+ 中均已获得良好支持，全球覆盖率超过 90%。在大多数现代项目中可以放心使用。对于需要兼容旧浏览器的场景，推荐采用渐进增强策略——先编写基于 Media Queries 的降级样式作为基线，然后再使用 @container 覆盖增强样式。当浏览器不支持 Container Queries 时，@container 规则会被忽略，降级样式生效。</p>',
      '<pre><code>/* 渐进增强策略 */\n\n/* 1. 基础样式（所有浏览器） */\n.card {\n  display: flex;\n  flex-direction: column;\n  /* 默认竖排布局 */\n}\n\n.card__image {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n}\n\n/* 2. 媒体查询降级（兼容旧浏览器） */\n@media (min-width: 768px) {\n  .card {\n    flex-direction: row;\n  }\n  .card__image {\n    width: 40%;\n    height: auto;\n  }\n}\n\n/* 3. 容器查询增强（现代浏览器） */\n.card-container {\n  container-type: inline-size;\n}\n\n@container (min-width: 500px) {\n  .card {\n    flex-direction: row;\n  }\n  .card__image {\n    width: 40%;\n  }\n}\n\n/* 4. 使用 @supports 检测支持 */\n@supports (container-type: inline-size) {\n  .card-container {\n    container-type: inline-size;\n  }\n}</code></pre>',
      '<p>除了 @supports 检测外，还可以使用 CSS 的 @when 和 @else 语句进行更优雅的特性检测（目前尚在提案阶段）。在生产环境中，推荐使用 PostCSS 插件 postcss-container-queries 来进行转换和 polyfill。虽然 polyfill 方案无法完全模拟容器查询的原生性能，但对于内容为主且不涉及高频动画的页面来说，是一个可接受的过渡方案。</p>',
      '<blockquote><p>Container Queries 的引入标志着前端响应式设计从"视口为中心"向"容器为中心"的范式转变。结合 CSS Grid 的 subgrid 和 Masonry 布局，前端开发者正在拥有前所未有的布局控制能力。这些新特性共同推动了一个理想的组件化设计系统——组件只关心自己的展示逻辑，完全独立于其所在的页面位置。</p></blockquote>',
    ].join("\n")
  buryPoints: [1],
  },

export default article

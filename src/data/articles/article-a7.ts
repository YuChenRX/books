import type { Article } from '@/data/types'

const article: Article = // ─── 7. 浏览器渲染 ───
  {
    id: "a7",
    title: "浏览器渲染原理与性能优化实战指南",
    author: "前端性能",
    date: "2026-06-10",
    views: "3.5k",
    likes: 142,
    comments: 51,
    tags: ["浏览器", "性能优化"],
    avatar: "🌐",
    excerpt: "理解浏览器的渲染流程对于前端性能优化至关重要。从网络请求到最终像素的显示浏览器经历了多个复杂的处理步骤...",
    content: [
      '<h2>一、渲染管线全流程解析</h2>',
      '<p>浏览器从收到 HTML 字节流到最终在屏幕上呈现像素，经历了复杂而精密的渲染管线。整个过程可以分为六个核心阶段：DOM 树构建、CSSOM 树构建、Render 树生成、Layout 布局计算、Paint 绘制记录和 Composite 合成输出。每个阶段都依赖前一阶段的输出结果，任何一个阶段的性能问题都会影响整体渲染效率。</p>',
      '<p>第一阶段 <strong>DOM 树构建</strong>：HTML 解析器将接收到的字节流（Bytes）按照编码格式解码为字符（Characters），然后通过词法分析将字符流转换为 Token（标记化），最后根据 Token 构建 DOM 节点树。HTML 解析的一个重要特性是它可以"重新解析"——当遇到 <script> 标签时，解析会暂停并等待 JavaScript 引擎执行脚本，因为脚本可能通过 document.write() 修改文档流。使用 async 或 defer 属性可以避免这种阻塞。</p>',
      '<p>第二阶段 <strong>CSSOM 树构建</strong>：CSS 解析器将 CSS 规则解析为 CSSOM（CSS Object Model）树。与 HTML 解析不同，CSS 解析不会阻塞 DOM 构建，但会阻塞 Render 树的生成。CSS 规则从右到左匹配选择器，因此选择器的特异性（Specificity）和层叠（Cascade）规则决定了最终应用到元素上的样式。CSSOM 树的构建是"渲染阻塞"的——浏览器必须等待 CSSOM 构建完成才能进行渲染。</p>',
      '<p>第三阶段 <strong>Render 树生成</strong>：DOM 树和 CSSOM 树合并生成 Render 树。Render 树只包含可见的节点——display: none 的元素不会出现在 Render 树中，但 visibility: hidden 的元素仍然占据空间。Render 树的每个节点（RenderObject）包含了元素的视觉信息（尺寸、位置、颜色等）。生成 Render 树后浏览器还不能直接绘制，因为还不知道元素的具体位置。</p>',
      '<pre><code>// 渲染管线各阶段的 JavaScript 性能检测\n// 使用 Performance API 检测渲染各个阶段\n\n// 检测首次渲染时间（First Paint）\nwindow.addEventListener("load", () => {\n  const perfEntries = performance.getEntriesByType("paint");\n  perfEntries.forEach((entry) => {\n    console.log(`${entry.name}: ${entry.startTime}ms`);\n    // First Paint: 首次绘制\n    // First Contentful Paint: 首次内容绘制\n  });\n});\n\n// 使用 PerformanceObserver 监测布局偏移（Cumulative Layout Shift）\nconst observer = new PerformanceObserver((list) => {\n  for (const entry of list.getEntries()) {\n    console.log("Layout shift:", entry);\n  }\n});\nobserver.observe({ type: "layout-shift", buffered: true });\n\n// 检测长任务（Long Tasks）— 影响渲染流畅度的任务\nconst longTaskObserver = new PerformanceObserver((list) => {\n  for (const entry of list.getEntries()) {\n    console.warn(`长任务: ${entry.duration}ms`, entry);\n  }\n});\nlongTaskObserver.observe({ type: "longtask", buffered: true });\n\n// 使用 requestAnimationFrame 检测帧率\nlet frameCount = 0;\nlet lastTime = performance.now();\n\nfunction checkFrameRate() {\n  frameCount++;\n  const now = performance.now();\n  if (now - lastTime >= 1000) {\n    console.log(`帧率: ${frameCount} FPS`);\n    frameCount = 0;\n    lastTime = now;\n  }\n  requestAnimationFrame(checkFrameRate);\n}\nrequestAnimationFrame(checkFrameRate);</code></pre>',
      '<blockquote><p>浏览器渲染管线的一个关键洞察是"并非所有 CSS 属性变化的成本都相同"。改变元素的 width 或 height 会触发 Layout → Paint → Composite 三个步骤（成本最高）。改变 color 或 background-color 只需要 Paint → Composite（成本中等）。而改变 transform 或 opacity 只需要 Composite 合成（成本最低）。这也是为什么 CSS 动画推荐使用 transform 和 opacity 的原因。</p></blockquote>',
      '<h2>二、Layout 布局与 Paint 绘制深入分析</h2>',
      '<p>Layout（也称为 Reflow）阶段是浏览器计算元素几何尺寸和位置的步骤。浏览器从 Render 树的根节点开始，递归遍历每个节点，根据 CSS 盒子模型计算元素的宽度、高度、边距、边框、内边距和位置信息。布局计算的结果是一个包含每个元素精确位置和大小的"盒子"集合。对于复杂的页面，布局计算可能涉及多轮重排，因为子元素的尺寸变化可能影响父元素，而父元素的变化又可能影响兄弟元素。</p>',
      '<p>触发重排（Reflow）的操作包括：DOM 元素的增加、删除或修改；元素位置或尺寸的变化（如通过 JavaScript 修改 style.left、style.width）；浏览器窗口大小变化（resize 事件）；获取某些布局属性（如 offsetWidth、offsetHeight、getBoundingClientRect()）——浏览器为了返回准确值会强制触发重排。这就是所谓的"强制同步布局"（Forced Synchronous Layout），是导致布局 thrashing（布局抖动）的主要原因。</p>',
      '<p>Paint（绘制）阶段将 Layout 阶段计算出的盒子转换为屏幕上的实际像素。绘制按照 CSS 层叠上下文（Stacking Context）的顺序逐个图层进行。浏览器将绘制操作记录为绘制指令列表（Paint List），然后在后续的 Rasterization（光栅化）阶段将指令转换为位图。现代浏览器使用光栅化线程池（Raster Thread Pool）将绘制工作分散到多个 CPU 核心甚至 GPU 上并行处理。</p>',
      '<pre><code>// 避免强制同步布局的编码实践\n\n// ❌ 坏示例：读取布局属性会导致强制同步布局\nfunction badResize(elements: HTMLElement[]) {\n  for (const el of elements) {\n    // 每次循环先读取 offsetWidth（强制重排），再修改宽度\n    const width = el.offsetWidth;  // ← 强制重排！\n    el.style.width = (width * 2) + "px";  // 再次触发重排\n  }\n}\n\n// ✅ 好示例：先批量读取，再批量写入\nfunction goodResize(elements: HTMLElement[]) {\n  // 第一步：批量读取（不会触发重排）\n  const widths = elements.map((el) => el.offsetWidth);\n\n  // 第二步：批量写入（仅触发一次重排）\n  elements.forEach((el, i) => {\n    el.style.width = (widths[i] * 2) + "px";\n  });\n}\n\n// 或者使用 requestAnimationFrame 批量处理\nfunction batchUpdate(elements: HTMLElement[]) {\n  requestAnimationFrame(() => {\n    // 在下一帧开始时统一执行写操作\n    elements.forEach((el) => {\n      el.style.width = "100px";\n      el.style.height = "100px";\n    });\n  });\n}\n\n// 使用 CSS contain 属性隔离布局影响\n.card-item {\n  contain: layout style paint;\n  /* 告诉浏览器这个元素的变化不会影响到外部 */\n}</code></pre>',
      '<h2>三、Layer 合成层与 GPU 加速</h2>',
      '<p>2016 年后，Chrome 等现代浏览器引入了更复杂的 Layer（图层）架构。浏览器将页面内容划分为多个独立的合成层（Compositing Layer），每个层都有自己的 GraphicsLayer。合成层具有独立的 GraphicsContext，可以在 GPU 上作为独立的纹理（Texture）进行绘制和缓存。最终的合成阶段（Composite）将这些图层按照正确的顺序（从后往前）组合成最终的屏幕图像。</p>',
      '<p>哪些元素会成为独立的合成层？最常用的方式是通过 CSS 属性触发：使用 will-change: transform 主动告知浏览器某个元素将发生变化；使用 transform 或 opacity 进行动画时浏览器会自动创建合成层；在移动端，使用 translate3d(0,0,0) 或 translateZ(0) 的"空变换"技巧也常用于强制元素进入合成层。此外，包含 <video> 或 <canvas> 元素的区域、有 CSS filters 属性的元素、以及 position: fixed 元素也会被提升为合成层。</p>',
      '<pre><code>/* 通过 CSS 控制合成层 */\n\n/* 方式一：使用 will-change 提示浏览器 */\n.animated-card {\n  will-change: transform, opacity;\n  /* 浏览器会提前为此元素创建合成层 */\n  transition: transform 0.3s ease, opacity 0.3s ease;\n}\n\n.animated-card:hover {\n  transform: scale(1.05);\n  opacity: 0.9;\n}\n\n/* 方式二：利用 transform 触发合成层 */\n.optimized-slider {\n  transform: translateZ(0);\n  /* translateZ(0) 让元素进入合成层 */\n}\n\n/* 方式三：配合动画使用 */\n@keyframes smoothMove {\n  from {\n    transform: translateX(0);\n  }\n  to {\n    transform: translateX(100px);\n  }\n}\n\n/* ✅ 高效动画：只触发 Composite */\n.good-animation {\n  animation: smoothMove 0.3s ease;\n}\n\n/* ❌ 低效动画：触发 Layout + Paint + Composite */\n.bad-animation {\n  animation: badMove 0.3s ease;\n}\n\n@keyframes badMove {\n  from {\n    left: 0;\n  }\n  to {\n    left: 100px;\n  }\n}</code></pre>',
      '<p>虽然合成层可以显著提升动画性能，但过多的合成层也会导致问题。每个合成层都需要占用 GPU 内存（纹理内存），在移动设备上 GPU 内存尤为宝贵。过多的图层合成会增加 GPU 的带宽压力，在内容频繁更新时降低帧率。因此，不要对所有元素使用 will-change: transform，应仅在需要的元素上使用。Chrome DevTools 的 Layers 面板可以直观地查看当前页面的合成层分布情况。</p>',
      '<h2>四、关键渲染路径与 Core Web Vitals 优化</h2>',
      '<p>关键渲染路径（Critical Rendering Path）指的是浏览器从收到 HTML 开始到首次渲染所经历的所有步骤。优化关键渲染路径的核心思路包括三个方面：减少关键资源的数量和大小、缩短关键路径的长度（即减少资源之间的依赖链）、延迟非关键资源的加载（即消除非关键资源在关键路径上的阻塞）。</p>',
      '<pre><code><!-- 关键渲染路径优化实践 -->\n\n<!-- 1. 内联关键 CSS（Critical CSS） -->\n<!-- 将首屏所需的 CSS 内联到 HTML 中 -->\n<head>\n  <style>\n    /* 首屏关键 CSS */\n    header { height: 60px; background: #fff; }\n    .hero { font-size: 2rem; margin: 2rem 0; }\n    .hero p { color: #333; line-height: 1.6; }\n  </style>\n  <!-- 非关键 CSS 异步加载 -->\n  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n</head>\n\n<!-- 2. 使用 preload 预加载关键资源 -->\n<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="preload" href="hero.webp" as="image">\n\n<!-- 3. 使用 prefetch 预取后续页面资源 -->\n<link rel="prefetch" href="/next-page/styles.css" as="style">\n\n<!-- 4. 使用 preconnect 提前建立连接 -->\n<link rel="preconnect" href="https://api.example.com">\n<link rel="dns-prefetch" href="https://cdn.example.com">\n\n<!-- 5. 脚本加载优化 -->\n<!-- defer：HTML 解析完成后按顺序执行 -->\n<script defer src="app.js"></script>\n<!-- async：下载完成后立即执行，不保证顺序 -->\n<script async src="analytics.js"></script>\n\n<!-- 6. 图片懒加载 -->\n<img src="placeholder.webp" data-src="real-image.webp" loading="lazy" alt="懒加载图片"></code></pre>',
      '<p>Google 的 Core Web Vitals（核心网页指标）为关键渲染路径优化提供了明确的目标：LCP（Largest Contentful Paint）应在 2.5 秒内，表示最大内容的加载速度；FID（First Input Delay）应在 100ms 内，表示交互响应速度；CLS（Cumulative Layout Shift）应小于 0.1，表示视觉稳定性。针对这些指标的优化方法包括：优化图片和字体加载以减少 LCP、拆分长任务以减少 FID、为图片和广告预留空间以减少 CLS。</p>',
      '<blockquote><p>一个非常有用但容易被忽视的优化技巧是使用 content-visibility: auto 属性。当元素在视口外时，浏览器会跳过它的渲染工作（包括 Layout 和 Paint），仅当元素滚动到视口内时才完整渲染。这在长内容列表或大型文档页面上可以显著提升初始渲染性能。但需注意，content-visibility 会影响元素的占位尺寸计算，通常需要配合 contain-intrinsic-size 一起使用。</p></blockquote>',
    ].join("\n")
  buryPoints: [1, 10],
  },

export default article

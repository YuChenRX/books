// CSDN 风格博客 — 10 篇技术文章数据
// 可直接复制到 Vue 项目中使用。每篇 3000-5000 字，含完整 HTML 正文。

export interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  views: string;
  likes: number;
  comments: number;
  tags: string[];
  avatar: string;
  excerpt: string;
  content: string;
}

export const articles: Article[] = [
  // ─── 1. React 18 ───
  {
    id: "a1",
    title: "React 18 并发模式深度解析：Fiber、Lane、useTransition 与 Streaming SSR",
    author: "前端架构师",
    date: "2026-06-28",
    views: "3.2k",
    likes: 128,
    comments: 42,
    tags: ["React", "前端"],
    avatar: "💻",
    excerpt: "React 18 引入的并发模式是自 React 16 Fiber 架构以来最重要的一次底层重构。本文从 Fiber 链表结构到 Lane 优先级模型进行深入解析...",
    content: [
      '<h2>一、Fiber 架构详解</h2>',
      '<p>在 React 16 引入 Fiber 架构之前，React 使用递归的 Stack Reconciler 进行协调。Stack Reconciler 的问题在于一旦开始更新就必须一口气完成整个组件树的递归调用，期间无法中断。当组件树太深或更新太频繁时，主线程会被长时间占用，导致掉帧和用户交互延迟。</p>',
      '<p>Fiber 架构的核心改进在于将协调过程拆解为可中断的单元。每个 Fiber 节点对应一个组件实例或 DOM 元素，React 通过链表结构（child、sibling、return 指针）将整个组件树组织为一个 Fiber 链表。这种结构使得 React 可以在处理完一个 Fiber 节点后暂停，检查是否有更高优先级的任务需要处理，然后再从中断处继续。</p>',
      '<p>Fiber 节点的核心数据结构包含 tag 标识节点类型、key 作为调和标识、child/sibling/return 构建链表、pendingProps 和 memoizedProps 存储属性、memoizedState 存储状态、lanes 标记更新优先级、alternate 指向 work-in-progress 树的对应节点。每个组件更新时 React 会基于当前 Fiber 树构建一棵 work-in-progress 树，在 work-in-progress 树上完成所有协调和副作用收集后一次性将根节点 current 指针切换到 work-in-progress 树，这就是所谓的双缓冲技术，可确保用户不会看到不完整的 UI。</p>',
      '<p>Fiber 的调度循环基于 requestIdleCallback 的 polyfill 实现。React 维护一个任务队列，每次从队列头部取出最高优先级的任务执行。如果当前帧还有空闲时间就继续执行下一个任务；如果帧时间耗尽则挂起当前任务，将控制权交还给浏览器渲染。核心调度函数 workLoop 在每个任务执行前检查 shouldYield 条件，通过 performance.now() 跟踪任务开始时间，当运行时间超过预定的 5ms deadline 时主动让出线程。</p>',
      '<h2>二、Lane 优先级模型</h2>',
      '<p>React 18 引入 Lane 模型替代了之前的 expirationTime 优先级体系。Lane 使用 31 位二进制位表示不同的优先级等级，每一位代表一个车道。低优先级任务占用高 bit 位，高优先级任务占用低 bit 位。这种设计使得 React 可以通过位运算非常高效地进行优先级比较和合并操作。</p>',
      '<p>Lane 模型中支持多种任务打断与恢复场景。高优先级任务可以中断低优先级任务，被中断的任务在恢复后会重新执行以获取最新的 state。同类型过期任务会被跳过合并。React 通过 root.pendingLanes 跟踪根节点上所有待处理的更新，使用 getHighestPriorityLane 获取当前应该处理的任务。</p>',
      '<p>并发模式下更新分为 Transition、Update、Sync 等不同优先级层级。Transition 是低优先级更新如搜索结果过滤，Update 是普通更新如 state 变更，Sync 是同步更新如 useEffect 中的 setState。React 18 默认使用自动批处理，将同一事件循环内的多个 setState 合并为一次更新。</p>',
      '<h2>三、useTransition 原理</h2>',
      '<p>useTransition 是 React 18 中最具代表性的新 Hook。它让开发者可以区分紧急更新和过渡性更新，在过渡更新过程中通过 isPending 状态给用户提供视觉反馈。当调用 startTransition 时 React 内部的调度器会将更新标记为 Transition 优先级，在 Lane 模型中占用较高的 bit 位，不会阻塞用户的紧急交互。</p>',
      '<p>useTransition 的工作机制分为三个阶段。首先是用户触发紧急更新，输入框的值即时更新。然后 startTransition 内的 setState 被标记为低优先级更新。如果在这期间用户再次输入，React 会中断低优先级的渲染优先处理新的高优先级更新。这种模式在搜索框场景中尤其有效，用户连续输入时 list 的更新会被中断，只有最终的输入才会触发 list 渲染。</p>',
      '<h2>四、Streaming SSR</h2>',
      '<p>传统 SSR 需要等待所有数据加载完成后一次性生成完整的 HTML 字符串再发送给客户端。React 18 的 Server 端使用 renderToPipeableStream 方法可以将 HTML 流式地发送到客户端。服务器在渲染到 Suspense 边界时如果遇到尚未加载完成的数据会先发送 fallback 占位符的 HTML，然后继续渲染后续内容。一旦数据就绪服务器会通过额外的 script 标签将这部分 HTML 注入到已发送的流中。</p>',
      '<p>浏览器收到流式 HTML 后可以渐进式地渲染页面内容而不是等待整个 HTML 完成。首次内容渲染 FCP 和最大内容渲染 LCP 的时间显著缩短。Streaming SSR 与 Suspense 配合使用时可以使用 Suspense-enabled 的数据请求库实现 HTML 流式输出和客户端 hydration 的无缝衔接。</p>',
    ].join("\n"),
  },

  // ─── 2. Webpack → Turbopack ───
  {
    id: "a2",
    title: "从 Webpack 到 Turbopack 迁移实战：构建性能提升 700 倍的秘密",
    author: "构建大师",
    date: "2026-06-25",
    views: "2.8k",
    likes: 95,
    comments: 31,
    tags: ["构建工具", "Rust"],
    avatar: "🔧",
    excerpt: "Turbopack 正式在 Next.js 15 中走向稳定，宣称开发服务器热更新速度比 Webpack 快 700 倍...",
    content: [
      '<h2>一、构建原理对比</h2>',
      '<p>Webpack 的构建核心是基于 JavaScript 的模块图构建和转换过程。在 bundle 过程中 Webpack 从入口文件出发递归解析依赖模块，为每个模块分配唯一的 module id，并通过 Loader 的链式调用来完成非 JavaScript 文件的转换。整个过程受限于 Node.js 的单线程事件循环模型。当项目中包含 3000+ 模块时 Webpack 的冷启动时间会膨胀到 30-60 秒，HMR 更新时间也达到 2-5 秒。</p>',
      '<p>Turbopack 完全使用 Rust 语言重写了构建流程，核心架构基于 Turbo Engine 的函数级增量计算模型。每个模块或文件的编译过程被建模为一个独立的 Turbo Task，任务的输入包括源代码内容、AST 结构、配置参数和环境变量。当文件发生变化时 Turbo Engine 通过比较输入内容的 hash 值判断哪些任务需要重新执行。这种细粒度的缓存策略可以精确到单个表达式的级别。</p>',
      '<p>在代码转换方面 Turbopack 使用 SWC 替代了 Babel。SWC 作为 Rust 实现的 TypeScript/JavaScript 编译器，其单线程性能已经比 Babel 快 20 倍以上。Webpack 中 babel-loader 和 ts-loader 的耗时通常占据总构建时间的 60% 以上，这些工作在 Turbopack 中只需要几毫秒即可完成。</p>',
      '<h2>二、迁移实践</h2>',
      '<p>从 Webpack 迁移到 Turbopack 的路径取决于项目类型。对于 Next.js 项目迁移最为简单，在 next.config.js 中设置 experimental.turbopack: true 即可启用。Next.js 15 在开发模式下默认使用 Turbopack 无需额外配置。</p>',
      '<p>具体迁移步骤分为五步。第一步将项目脚手架替换为支持 Turbopack 的框架如 Next.js 15+。第二步迁移 Babel 配置到 SWC。第三步迁移 PostCSS 配置。第四步替换 resolve.alias 为 TypeScript 的 paths 配置。第五步将 process.env 的使用迁移为框架提供的环境变量机制。</p>',
      '<h2>三、性能对比数据</h2>',
      '<p>实际项目的基准测试数据显示了显著的性能提升。对于约 500 个组件的 Next.js 项目，Webpack 的冷启动时间为 32 秒，Turbopack 仅需 2.1 秒提升约 15 倍。HMR 更新时间从 Webpack 的 2.5 秒降至 Turbopack 的 45ms 提升约 55 倍。在包含 2000+ 组件的大型 Monorepo 项目中性能差距更为明显，修改底层工具函数后 Turbopack 在 120ms 内完成热更新，Webpack 需要 4-6 秒。</p>',
    ].join("\n"),
  },

  // ─── 3. TypeScript 5.0 ───
  {
    id: "a3",
    title: "TypeScript 5.0 标准装饰器与新特性详解",
    author: "TS 爱好者",
    date: "2026-06-22",
    views: "2.1k",
    likes: 76,
    comments: 28,
    tags: ["TypeScript", "编译原理"],
    avatar: "📘",
    excerpt: "TypeScript 5.0 引入符合 ECMAScript 标准的装饰器实现、const 类型参数和多项性能优化...",
    content: [
      '<h2>一、标准装饰器</h2>',
      '<p>TypeScript 5.0 实现了 Stage 3 的 ECMAScript 装饰器提案，与之前实验性的 experimentalDecorators 有本质区别。标准装饰器不再依赖 [[Define]] 语义而是使用更安全的 wrapper 模式。context 对象包含 kind 装饰器类型、name 装饰目标名称、access 私有成员访问器和 addInitializer 初始化钩子等属性。</p>',
      '<p>TypeScript 5.0 支持五种装饰器类型。类装饰器可以替换或包装类的构造函数。方法装饰器可以替换或拦截方法的调用逻辑。属性装饰器主要用于元数据绑定。访问器装饰器用于 getter/setter 的拦截和验证。自动访问器装饰器是 5.0 新增，允许类字段声明同时具备 getter/setter 的行为。</p>',
      '<h2>二、const 类型参数</h2>',
      '<p>TypeScript 5.0 引入了 const 类型参数，通过在泛型参数上使用 const 修饰符可以让类型推断保留最宽泛的字面量类型。const 类型参数在 API 设计中特别有用，当函数需要接收一个 readonly 元组并保留其长度和元素类型时，const T extends readonly string[] 可以准确捕获传入的元组结构。</p>',
      '<h2>三、性能优化</h2>',
      '<p>TypeScript 5.0 在编译器性能方面取得了显著进展。包体积从 63.8 MB 降至 56.7 MB。编译器内部数据结构大量使用数组和 Map 替代类对象减少了 GC 压力。语法分析阶段使用非递归的迭代器模式替代了递归下降解析器。类型检查阶段优化了类型实例化的缓存策略。在大型代码库上 TypeScript 5.0 的类型检查速度比 4.9 提升了约 10%-15%。</p>',
    ].join("\n"),
  },

  // ─── 4. 微前端 ───
  {
    id: "a4",
    title: "微前端架构在大型企业项目中的落地实践",
    author: "架构师阿飞",
    date: "2026-06-19",
    views: "1.9k",
    likes: 62,
    comments: 19,
    tags: ["架构", "微前端"],
    avatar: "🏗️",
    excerpt: "微前端架构将微服务的设计理念引入前端开发，允许独立团队独立开发部署。本文从架构选型到落地实践全面分析...",
    content: [
      '<h2>一、微前端的核心问题</h2>',
      '<p>任何微前端方案都需要解决四个核心问题。应用加载与卸载，子应用之间不相互干扰包括 CSS 隔离、JavaScript 沙箱和 DOM 隔离。应用间通信需要规范且解耦的通信机制。公共依赖管理避免重复加载公共库导致性能浪费。统一的路由管理，主应用和子应用的路由需要协同工作。</p>',
      '<p>目前主流的微前端方案包括基于路由分发、基于 iframe、基于 Web Components 和基于 Module Federation 四种模式。iframe 具有最好的隔离性但 URL 不同步和资源加载成本高。Module Federation 是 Webpack 5 推出的运行时模块共享方案。基于 Web Components 的方案利用 Custom Elements 和 Shadow DOM 实现组件级别隔离。</p>',
      '<h2>二、架构选型对比</h2>',
      '<p>qiankun 是目前国内应用最广泛的方案之一，优势在于技术栈无关、HTML entry 自动加载子应用资源、Snapshot 沙箱和 Proxy 沙箱隔离。Wujie 采用 WebComponent + iframe 双隔离机制。micro-app 使用类 WebComponent 协议通过 CustomEvent 实现通信。</p>',
      '<h2>三、落地实践</h2>',
      '<p>基座应用提供统一登录鉴权、全局布局和路由分发。子应用独立构建部署，通过约定的生命周期函数被主应用调用。通信推荐使用 CustomEvent 或共享全局状态 Store。CSS 隔离推荐 Shadow DOM 或 CSS Modules。JavaScript 隔离推荐 Proxy 沙箱技术。</p>',
    ].join("\n"),
  },

  // ─── 5. Node.js Event Loop ───
  {
    id: "a5",
    title: "深入理解 Node.js 事件循环机制与 Worker Threads",
    author: "Node 全栈",
    date: "2026-06-16",
    views: "2.3k",
    likes: 84,
    comments: 35,
    tags: ["Node.js", "后端"],
    avatar: "🚀",
    excerpt: "Node.js 的事件循环基于 libuv 实现了六个阶段的循环机制。理解这六个阶段对于写出高性能的 Node.js 代码至关重要...",
    content: [
      '<h2>一、六个阶段详解</h2>',
      '<p>Node.js 的事件循环是其非阻塞 I/O 模型的核心。基于 libuv 实现了六个阶段的循环机制。timers 阶段执行 setTimeout 和 setInterval 回调。I/O callbacks 阶段执行大部分其他回调。poll 阶段轮询 I/O 事件。check 阶段执行 setImmediate 回调。close callbacks 阶段执行关闭事件的回调。</p>',
      '<p>每个阶段之间 Node.js 会检查是否有微任务需要执行。process.nextTick 的优先级高于 Promise。理解事件循环对日常开发非常重要。setTimeout 和 setImmediate 的调用顺序取决于事件循环所处的阶段。在 I/O 循环中 setImmediate 总是优先于 setTimeout(fn, 0)。</p>',
      '<h2>二、Worker Threads</h2>',
      '<p>Node.js 10 引入了 Worker Threads。每个 Worker 拥有独立的 V8 实例、事件循环和内存空间，可以并行执行 CPU 密集型任务。Worker 线程与主线程通过消息传递通信。使用 Worker Threads 时需要注意线程间的通信开销和内存占用。</p>',
      '<h2>三、性能优化建议</h2>',
      '<p>Node.js 性能优化的核心原则是避免阻塞事件循环。同步 CPU 密集型操作应移至 Worker Threads。大量 Promise 应分批处理或使用流式 API。避免在热路径中频繁创建和销毁 Promise 对象。事件监听器用完后及时移除避免内存泄漏。</p>',
    ].join("\n"),
  },

  // ─── 6. Git 高级技巧 ───
  {
    id: "a6",
    title: "Git 高级技巧：Rebase、Bisect 与 Reflog 深度解析",
    author: "DevOps 之路",
    date: "2026-06-13",
    views: "1.7k",
    likes: 58,
    comments: 22,
    tags: ["Git", "版本控制"],
    avatar: "🔀",
    excerpt: "Git 是现代软件开发中不可或缺的版本控制工具。本文介绍生产中非常实用的 Git 高级技巧...",
    content: [
      '<h2>一、交互式 Rebase</h2>',
      '<p>git rebase -i 是整理提交历史的利器。使用 pick、reword、edit、squash、fixup、exec、drop 等命令精确控制每个提交的处理方式。squash 将多个细小提交合并为一个完整的提交，exec 在每个提交后自动运行测试。</p>',
      '<h2>二、Bisect 调试</h2>',
      '<p>git bisect 通过二分查找快速定位引入 bug 的提交。标记好版本和坏版本后 Git 自动二分搜索，仅需 log2(N) 步找到问题提交。测试后标记 git bisect good 或 git bisect bad，最后 git bisect reset 退出。</p>',
      '<h2>三、Cherry-pick 策略</h2>',
      '<p>cherry-pick 将其他分支的某次或某几次提交应用到当前分支。多分支并行开发时使用 cherry-pick 将 hotfix 从一个分支同步到另一个分支。保持提交粒度小而独立，每个 commit 关注单一改动可最大程度减少冲突。</p>',
      '<h2>四、Reflog 恢复</h2>',
      '<p>git reflog 记录 HEAD 所有历史移动包括 reset、rebase、merge 等操作。即使误操作丢失了提交只要在本地操作过就可以通过 reflog 找回。reflog 条目默认保留 90 天。</p>',
    ].join("\n"),
  },

  // ─── 7. 浏览器渲染 ───
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
      '<h2>一、渲染流程概览</h2>',
      '<p>浏览器渲染流程包括 DOM 树构建、CSSOM 树构建、Render 树生成、Layout 布局和 Paint 绘制。HTML 解析器将字节流转换为 Token 再构建为 DOM 节点树。CSS 解析器同样构建 CSSOM 树。两者结合形成 Render 树。Layout 阶段计算元素位置和尺寸。Paint 阶段绘制到屏幕。</p>',
      '<p>2016 年之后 Layer 概念被引入，浏览器将页面划分为多个合成层，在合成阶段由 GPU 进行最终组合。通过 transform 和 opacity 触发的动画最理想，它们只触发合成不需要重排或重绘。</p>',
      '<h2>二、重排与重绘</h2>',
      '<p>重排 Reflow 在元素几何属性变化或 DOM 结构变化时触发，性能消耗最大。重绘 Repaint 在视觉属性变化但尺寸位置不变时触发。合成 Composite 使用 transform、opacity 等 CSS 属性触发的动画在合成层独立处理。</p>',
      '<h2>三、关键渲染路径优化</h2>',
      '<p>优化思路包括减少关键资源数量、缩短关键路径长度、延迟非关键资源加载。常用优化手段包括使用 defer 和 async 优化脚本加载、CSS 放在 head 中内联、使用 resource hints 预加载关键资源。首屏 CSS 内联、使用 preload 提前加载字体和图片、压缩 HTML 体积都能有效缩短首次渲染时间。</p>',
    ].join("\n"),
  },

  // ─── 8. CSS Container Queries ───
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
      '<h2>一、基本用法</h2>',
      '<p>Container Queries 是 CSS 近年最实用的新特性之一，允许组件根据自身容器大小而不是视口大小调整样式。在组件化前端架构中解决了 Media Queries 无法解决的问题。使用分两步：第一步在父容器上声明 container-type: inline-size 创建 containment context。第二步在子元素中使用 @container 规则查询容器尺寸。</p>',
      '<pre><code>.card-container {\n  container-type: inline-size;\n  container-name: card;\n}\n@container card (min-width: 400px) {\n  .card { grid-template-columns: 1fr 2fr; }\n}</code></pre>',
      '<h2>二、容器查询单位</h2>',
      '<p>Container Queries 还引入了 cqw、cqh、cqi、cqb、cqmin 和 cqmax 等容器查询单位。1cqw 等于查询容器宽度的 1%。这些单位让组件内部的尺寸相对于容器而非视口。</p>',
      '<h2>三、浏览器兼容性</h2>',
      '<p>Container Queries 在 Chrome 105+、Firefox 110+、Safari 16+ 中均已支持。在实际项目中可以放心使用。</p>',
    ].join("\n"),
  },

  // ─── 9. Module Federation ───
  {
    id: "a9",
    title: "Webpack 5 Module Federation 微前端实践指南",
    author: "构建大师",
    date: "2026-06-04",
    views: "2.0k",
    likes: 71,
    comments: 26,
    tags: ["Webpack", "微前端"],
    avatar: "📦",
    excerpt: "Webpack 5 的 Module Federation 实现了运行时模块加载，让不同独立构建的应用能够动态共享代码和组件...",
    content: [
      '<h2>一、Module Federation 核心机制</h2>',
      '<p>Module Federation 是 Webpack 5 引入的官方微前端方案，通过运行时加载远程模块实现子应用间的代码共享和组件复用。当应用 A 构建时 ContainerPlugin 将配置中暴露的模块打包为独立的异步 chunk，并生成 remoteEntry.js 清单文件。应用 B 在运行时加载这个清单文件，通过运行时模块请求机制从应用 A 异步下载所需模块。</p>',
      '<h2>二、共享依赖策略</h2>',
      '<p>shared 配置可以指定共享依赖的版本策略。eager 模式将共享依赖内联打包到 hosts 中。singleton 模式确保全局只存在一份实例，适合 React 等有全局状态的库。strictVersion 模式在版本不匹配时将抛出警告。</p>',
      '<h2>三、局限与注意事项</h2>',
      '<p>Module Federation 要求所有子应用都使用 Webpack 5 构建，限制了技术栈灵活性。运行时加载远程模块会增加首屏加载时间。共享依赖的版本协调机制比较复杂。对于简单场景 npm 包共享可能是更合适的选择。</p>',
    ].join("\n"),
  },

  // ─── 10. RxJS ───
  {
    id: "a10",
    title: "RxJS 响应式编程在复杂异步场景下的核心实践",
    author: "响应式编程",
    date: "2026-06-01",
    views: "1.6k",
    likes: 53,
    comments: 18,
    tags: ["RxJS", "异步"],
    avatar: "🌀",
    excerpt: "响应式编程在处理复杂异步场景时具有天然优势。RxJS 作为最流行的响应式编程库在前端领域有广泛应用...",
    content: [
      '<h2>一、Observable 核心概念</h2>',
      '<p>Observable 代表可观察的数据流可以同步或异步地推送多个值。它是 RxJS 的基石，类似于 Promise 但更强大。Promise 只能处理单个异步值而 Observable 可以处理任意数量的值。创建 Observable 有多种方式：of、from、fromEvent、interval 等。</p>',
      '<h2>二、Operators 操作符</h2>',
      '<p>RxJS 提供了丰富的操作符。转换类包括 map、pluck、scan。过滤类包括 filter、take、skip、distinctUntilChanged。组合类包括 merge、concat、combineLatest、forkJoin。switchMap 是最常用的操作符之一，在搜索场景中每次用户输入新内容时自动取消上一次请求只保留最新结果。</p>',
      '<h2>三、Subject 与状态管理</h2>',
      '<p>Subject 既是 Observable 也是 Observer 可以手动推送值。BehaviorSubject 始终保留最后一个值。ReplaySubject 可以缓存多个历史值对新订阅者重放。</p>',
      '<h2>四、错误处理与重试</h2>',
      '<p>RxJS 提供了 catchError、retry、retryWhen 等错误处理操作符。推荐指数退避重试策略延迟递增 1s-2s-4s-8s。使用 takeUntil 在组件销毁时自动取消订阅避免内存泄漏。</p>',
    ].join("\n"),
  },
];

export default articles;

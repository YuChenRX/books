import type { Article } from '@/data/types'

const article: Article = {
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
  buryPoints: [1],
  }

export default article

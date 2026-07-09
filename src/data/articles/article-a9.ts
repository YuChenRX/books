import type { Article } from '@/data/types'

const article: Article = {
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
  buryPoints: [1],
  }

export default article

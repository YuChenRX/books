import type { Article } from '@/data/types'

const article: Article = {
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
  buryPoints: [1],
  }

export default article

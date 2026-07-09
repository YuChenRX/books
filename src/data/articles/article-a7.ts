import type { Article } from '@/data/types'

const article: Article = {
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
  buryPoints: [1],
  }

export default article

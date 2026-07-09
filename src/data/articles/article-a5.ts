import type { Article } from '@/data/types'

const article: Article = {
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
  buryPoints: [1],
  }

export default article

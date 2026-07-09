import type { Article } from '@/data/types'

const article: Article = {
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
  buryPoints: [1, 7],
  }

export default article

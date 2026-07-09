import type { Article } from '@/data/types'

const article: Article = {
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
  buryPoints: [1],
  }

export default article

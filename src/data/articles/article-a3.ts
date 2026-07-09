import type { Article } from '@/data/types'

const article: Article = {
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
  buryPoints: [1],
  }

export default article

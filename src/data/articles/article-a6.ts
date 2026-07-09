import type { Article } from '@/data/types'

const article: Article = {
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
  buryPoints: [1],
  }

export default article

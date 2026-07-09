import type { Article } from '@/data/types'

const article: Article = // ─── 6. Git 高级技巧 ───
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
      '<h2>一、交互式 Rebase 实战</h2>',
      '<p>git rebase -i（交互式变基）是 Git 中最强大的提交历史整理工具之一。它允许开发者对一系列提交执行多种操作，包括 pick（保留）、reword（修改提交信息）、edit（修改提交内容）、squash（合并到上一个提交）、fixup（合并并丢弃提交信息）、exec（在每个提交后运行命令）和 drop（删除提交）。合理地使用这些操作可以让提交历史保持清晰、可读且易于回溯。</p>',
      '<p>在实际开发中，交互式 Rebase 最常见的用途是将多个零散的开发提交合并为一个完整的特性提交。例如在开发一个新功能时，你可能经历了多次"fix typo"、"add tests"、"review feedback"等小提交，在推送到远程仓库之前使用 squash 将它们合并为"feat: add user authentication"这样的完整提交。这不仅保持了历史的整洁，也方便后续的代码审查和回滚操作。</p>',
      '<pre><code># 交互式 Rebase 整理提交历史\n# 合并最近 5 个提交\n$ git rebase -i HEAD~5\n\n# 编辑器打开后显示如下内容：\n# pick a1b2c3d feat: add user model\n# squash e4f5g6h fix: correct user model typo\n# squash i7j8k9l add: user model tests\n# squash m0n1o2p chore: review feedback changes\n# squash q3r4s5t fix: lint error in user model\n# 将后四个提交的 pick 改为 squash，它们会被合并到第一个提交中\n# 保存退出后，Git 会提示修改合并后的提交信息\n\n# 使用 fixup 丢弃被合并提交的提交信息\n$ git rebase -i HEAD~3\n# pick  a1b2c3d feat: implement search API\n# fixup e4f5g6h fix search bug\n# fixup i7j8k9l lint fix\n# fixup 会保留内容但丢弃提交信息，适合临时修复提交\n\n# 在 rebase 过程中遇到冲突时的处理流程\n$ git rebase --continue   # 解决冲突后继续\n$ git rebase --skip       # 跳过当前提交\n$ git rebase --abort      # 放弃 rebase，回到之前状态</code></pre>',
      '<blockquote><p>交互式 Rebase 的一个重要原则：永远不要对已经推送到远程公共分支的提交执行 rebase 操作。因为 rebase 会改写提交的 SHA-1 哈希值，如果其他人已经基于这些提交做了开发，rebase 后会导致历史不一致和合并冲突。这个原则被称为"不要修改公共历史"（Don\'t rewrite public history）。仅在本地分支或你自己的功能分支上使用 rebase。</p></blockquote>',
      '<h2>二、Bisect 二分调试法</h2>',
      '<p>git bisect 是定位 Bug 引入点的利器。当你在某个版本发现了一个 Bug，但不知道是哪个提交引入时，bisect 通过二分查找算法在 O(log N) 步内精确定位问题提交。对于一个包含 1000 次提交的项目，只需要 10 步左右就能找到出错的提交，远胜于手动逐一排查。</p>',
      '<pre><code># git bisect 的基本使用流程\n# 1. 启动二分查找\n$ git bisect start\n\n# 2. 标记当前版本（或已知有 Bug 的版本）为 bad\n$ git bisect bad                 # 当前 HEAD 是坏版本\n# 或者指定某个版本\n$ git bisect bad v2.5.0          # v2.5.0 版本有 Bug\n\n# 3. 标记一个已知无 Bug 的版本为 good\n$ git bisect good v2.4.0         # v2.4.0 版本正常\n# Git 会检出中间的一个提交供你测试\n\n# 4. 测试后标记结果\n$ git bisect good                # 当前提交正常\n$ git bisect bad                 # 当前提交有 Bug\n\n# 重复步骤 4，直到 Git 找到第一个有 Bug 的提交\n# 输出：b1c3d5e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c is the first bad commit\n\n# 5. 退出 bisect\n$ git bisect reset\n\n# 自动化 bisect（使用脚本）\n$ git bisect start HEAD v2.4.0\n$ git bisect run npm test        # 如果测试失败返回非零退出码\n$ git bisect reset</code></pre>',
      '<p>自动化 bisect 是最强大的用法。你可以编写一个测试脚本，该脚本返回 0 表示版本正常，返回 1-127（除 125 外）表示版本有 Bug，返回 125 表示该提交无法测试（例如因为编译失败）。借助 git bisect run 和自动化测试，你可以在喝杯咖啡的时间内扫描数百次提交，精确找到引入问题的根源。这在大型团队协作排查回归 Bug 时尤其高效。</p>',
      '<h2>三、Cherry-pick 高级策略</h2>',
      '<p>cherry-pick 允许将其他分支的某次或某几次提交精确地应用到当前分支。这在多分支并行开发的场景中非常实用——当紧急修复需要同步到多个发布分支时，cherry-pick 比 merge 更精确、更可控。使用 cherry-pick 的关键在于保持提交粒度小而独立，每个 commit 只关注单一改动，这样可以最大程度地减少冲突并提高 cherry-pick 的成功率。</p>',
      '<pre><code># 基本用法：cherry-pick 单个提交\n$ git checkout release/v2.0\n$ git cherry-pick a1b2c3d        # 将 a1b2c3d 应用到 release/v2.0 分支\n\n# cherry-pick 多个提交（按顺序应用）\n$ git cherry-pick a1b2c3d e4f5g6h i7j8k9l\n\n# cherry-pick 一段连续的提交\n# 注意：.. 表示不包含起始提交，^.. 表示包含\n$ git cherry-pick m0n1o2p^..q3r4s5t  # 包含 m0n1o2p 到 q3r4s5t 之间的所有提交\n\n# 保留原始作者信息但添加 cherry-pick 标记\n$ git cherry-pick -x a1b2c3d    # -x 会在提交信息中添加原提交引用\n\n# cherry-pick 时保留或修改作者\n$ git cherry-pick --signoff a1b2c3d  # 添加 Signed-off-by\n\n# 处理 cherry-pick 冲突\n$ git cherry-pick --continue    # 解决冲突后继续\n$ git cherry-pick --skip        # 跳过当前提交\n$ git cherry-pick --abort       # 放弃整个 cherry-pick 操作\n\n# 实战场景：从 main 分支 cherry-pick hotfix 到多个发布分支\n# main 分支已合入 hotfix 提交 a1b2c3d\n# 需要同步到 v1.x 和 v2.x 分支\n$ git checkout release/v1.x\n$ git cherry-pick a1b2c3d -x\n$ git checkout release/v2.x\n$ git cherry-pick a1b2c3d -x</code></pre>',
      '<p>在使用 cherry-pick 时需要注意几个潜在问题。如果多个 cherry-pick 的提交之间有依赖关系，必须按顺序应用。如果这些提交已经在目标分支上有了更合适的实现，cherry-pick 可能导致冲突或重复代码。建议在 cherry-pick 后仔细审查结果，确保改动被正确应用。另外，cherry-pick 会创建新的提交对象（哈希值不同），因此在后续的合并操作中，Git 可能会遇到冲突。</p>',
      '<h2>四、Reflog 数据恢复实战</h2>',
      '<p>git reflog（引用日志）是 Git 最强大的安全保障机制之一。它记录了 HEAD 指针在过去 90 天内每一次移动的历史——包括 commit、reset、rebase、merge、checkout、cherry-pick 等操作。即使你不小心执行了 git reset --hard 导致"丢失"了提交，只要还保留在 reflog 的保留周期内，就可以通过 reflog 找回。这是很多开发者经历过"手滑"后的救命稻草。</p>',
      '<pre><code># 查看 HEAD 的引用日志\n$ git reflog\n# a1b2c3d (HEAD -> main) HEAD@{0}: commit: fix: security vulnerability\n# e4f5g6h HEAD@{1}: reset: moving to HEAD~1\n# i7j8k9l HEAD@{2}: commit: refactor database layer\n# m0n1o2p HEAD@{3}: rebase (finish): returning to refs/heads/main\n# ...\n\n# 找回误 reset 丢失的提交\n$ git reset --hard HEAD~3        # 糟糕！回退了 3 个提交\n$ git reflog                     # 查看 HEAD 的历史\n$ git reset --hard HEAD@{1}      # 恢复到 reset 之前的状态\n\n# 找回被删除的分支\n# 如果你不小心删除了一个尚未合并的分支：\n$ git branch -D feature-auth     # 糟糕！分支被删除\n# 如果记得分支最后一次指向的提交：\n$ git branch feature-auth a1b2c3d  # 用提交哈希恢复分支\n# 如果不记得提交哈希：\n$ git reflog                     # 找到 feature-auth 相关操作\n$ git branch feature-auth HEAD@{5} # 从 reflog 恢复分支\n\n# 查看特定分支的 reflog\n$ git reflog show feature-auth\n\n# 修改 reflog 保留期限（默认 90 天）\n$ git config gc.reflogExpire 180        # 有变动的引用保留 180 天\n$ git config gc.reflogExpireUnreachable 30  # 不可达的引用保留 30 天\n\n# 清理 reflog（慎用！清理后丢失的提交将无法找回）\n$ git reflog expire --all --expire=now\n$ git gc --prune=now</code></pre>',
      '<blockquote><p>养成定期使用 git reflog 的习惯是 Git 进阶的重要一步。当你执行任何有风险的 Git 操作前，可以先运行 git reflog 记录当前 HEAD 位置。如果操作出错，你可以在 reflog 中找到之前的哈希值并恢复。reflog 是 Git 的回收站，它在过去 90 天内记录了你所有的操作轨迹，这给了你充足的时间来纠正误操作。</p></blockquote>',
      '<p>git reflog 的最佳实践包括：在执行破坏性操作（如 rebase、reset --hard、branch -D）之前先记录当前 reflog 状态。当使用 git stash 后忘记 stash 的内容时，可以通过 git reflog show stash 查看 stash 的 reflog。在协作环境中，reflog 是恢复误删除的远程跟踪分支的唯一途径。需要注意的是，reflog 是本地仓库的日志，不会随 git push 推送到远程仓库，因此每个开发者都需要自己管理和备份。</p>',
    ].join("\n")
  buryPoints: [1],
  },

export default article

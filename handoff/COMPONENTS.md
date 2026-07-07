# 组件详细说明

## 1. CSDNHeader.vue

**功能**: 顶部固定导航栏

**结构**:
- 主栏（高 50px）: 深红渐变背景 `linear-gradient(180deg, #c20a0a, #c8242f)`
  - Logo "CSDN"（白色加粗）
  - 导航链接: 博客 / 下载 / 学习 / 社区 / GitCode / 猿如意
  - 会员标签（黄色背景）
  - 搜索框（半透明白色背景）
  - 登录按钮
- 子栏（高 36px）: 深红背景 `#b80e0e`
  - 导航: 首页 / 博客 / 移动 / 云原生 / AI / 程序员 / 问答
  - 右侧标语: "| 成就一亿技术人"

**Props**: 无（纯展示）

**Vue 实现注意**:
- 使用 `<style scoped>` 控制样式
- 导航链接用 `v-for` 渲染
- 搜索框绑定 `v-model`

---

## 2. ArticleList.vue

**功能**: 博客首页文章列表

**三栏布局**:
```
[左分类栏 220px] → [文章流 flex-1] → [右热门推荐 260px]
```

**状态**:
- `activeTag: string` — 当前选中的分类标签

**逻辑**:
- 点击分类栏 → 过滤 `ARTICLES` → 显示匹配文章
- 默认显示全部（`activeTag = ""`）
- 点击文章卡片 → 跳转 `/article/:id`

**Vue 实现注意**:
- `computed` 属性 `filteredArticles` 实现过滤
- 使用 `vue-router` 的 `router-link` 或 `useRouter()`
- 左侧"分类专栏"点击传入标签名

---

## 3. ArticleDetail.vue

**功能**: 文章详情页

**结构**:
```
[文章主内容 flex-1] — [右侧栏 300px]
├─ 标题区                ├─ 作者卡片
│  └─ 标题 + 日期/阅读    │  └─ 头像 + 获赞/评论 + 关注按钮
├─ 作者栏                ├─ 热门推荐
│  └─ 头像 + 博主标签     ├─ 标签云
├─ 正文（dangerouslySetInnerHTML） └─ 广告位
├─ 底部标签
└─ 上/下篇导航
```

**Props**:
- `articles: Array` — 完整文章列表
- `articleId: String` — 当前文章 ID

**逻辑**:
- 通过 `articleId` 在 `articles` 中查找当前文章
- 计算 `hasPrev` / `hasNext`
- 相关文章: 取当前文章前后各 2 篇

**Vue 实现注意**:
- 使用 `v-html` 渲染文章正文（注意 XSS 安全——数据从本地导入安全）
- highlight.js 在 `mounted` 和 `watch` 中调用
- h2 左侧红色边框用 `border-left: 4px solid #c8242f`

---

## 4. ArticleContent.vue

**功能**: 渲染文章 HTML 正文 + 代码高亮

**Props**: `content: String` — HTML 字符串

**高亮实现** (Vue 示例):
```javascript
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default {
  props: ['content'],
  mounted() {
    this.$nextTick(() => {
      this.$el.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    });
  },
  watch: {
    content() {
      this.$nextTick(() => {
        this.$el.querySelectorAll('pre code').forEach(block => {
          hljs.highlightElement(block);
        });
      });
    }
  }
}
```

**Article CSS 重要样式**:
```css
.csdn-article p { margin: 0 0 1em; text-indent: 2em; }
.csdn-article h2 { font-size: 1.3em; font-weight: 700; margin: 1.5em 0 0.8em;
  border-left: 4px solid #c8242f; padding-left: 12px;
  background: linear-gradient(to right, rgba(200,36,47,0.05), transparent); }
.csdn-article pre { background: #282c34; padding: 16px; border-radius: 4px;
  overflow-x: auto; border: 1px solid #ddd; }
.csdn-article pre code { font-family: 'Consolas','Courier New',monospace;
  font-size: 0.85em; line-height: 1.5; color: #abb2bf; }
```

---

**下一份文档**: `STYLES.md` — 详细样式指南

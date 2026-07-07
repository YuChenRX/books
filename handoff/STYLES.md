# 样式指南 — CSDN 复刻版

## 颜色系统

| Token | 色值 | 用途 |
|-------|------|------|
| `--csdn-red` | `#c8242f` | 主色: 链接、标签、hover、按钮 |
| `--csdn-red-lt` | `#c20a0a` | 深红: Header 渐变起点 |
| `--csdn-red-dk` | `#b80e0e` | 子导航栏背景 |
| `--csdn-bg` | `#f5f6f7` | 页面背景色 |
| `--csdn-border` | `#e8e8e8` | 卡片边框 |
| `--csdn-text` | `#333333` | 正文主色 |
| `--csdn-sub` | `#999999` | 弱化文字 |
| `--csdn-code-bg` | `#282c34` | 代码块背景 |
| `--csdn-code-fg` | `#abb2bf` | 代码块文字 |

## 字体

```css
body {
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
code, pre {
  font-family: 'Consolas', 'Courier New', monospace;
}
```

## 布局规格

```
Max Content Width:  1200px
Header:             50px (main) + 36px (sub) = 92px total
Content Padding:    16px (left/right)
Article Padding:    24px (left/right inside card)
Card Border:        1px solid #e8e8e8, 4px border-radius
Card Shadow:        none default, 0 2px 8px on hover
Gap Between Cards:  12px
Sidebar Width:      220px (left) / 300px (right detail) / 260px (right list)
```

## 响应式断点

```
xl (≥ 1280px):  三栏（左栏 + 内容 + 右栏）
lg (≥ 1024px):  隐藏右栏
< lg:           隐藏左栏 + 右栏，单列
```

## 组件间距

```
Article List:
  breadcrumb:  mb-4 (16px)
  tab bar:     mb-4 (16px)
  article cards: space-y-3 (12px)

Article Detail:
  sidebar sections: space-y-4 (16px)
  article sections: mt-3 (12px)
  copyright: mt-4 (16px)
  prevNext: mt-4 (16px)
```

## Tailwind → CSS 对照（无 CSS 框架时）

```
p-5          → padding: 20px
px-6         → padding: 0 24px
py-4         → padding: 16px 0
gap-3        → gap: 12px
gap-4        → gap: 16px
space-y-3    → > * + * { margin-top: 12px }
flex items-center → display: flex; align-items: center
text-sm      → font-size: 14px
text-xs      → font-size: 12px
line-clamp-2 → overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical
rounded      → border-radius: 4px
rounded-full → border-radius: 9999px
```

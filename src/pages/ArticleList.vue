<template>
  <div class="pt-[92px] min-h-screen" style="background: var(--csdn-bg)">
    <div class="max-w-[1200px] mx-auto px-4 flex gap-6">
      <!-- 左分类栏 -->
      <div class="hidden lg:block w-[220px] shrink-0 space-y-4">
        <div class="csdn-card p-4">
          <h3 class="text-xs font-bold mb-3 flex items-center gap-1.5" style="color: var(--csdn-text)">
            <svg class="w-3.5 h-3.5 text-[#c8242f]" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
            分类专栏
          </h3>
          <div class="space-y-1 text-sm text-gray-500">
            <div v-for="c in categories" :key="c"
              class="cursor-pointer px-3 py-1.5 rounded text-xs flex items-center gap-2 transition-all"
              :class="isActive(c) ? 'text-[#c8242f] bg-red-50 font-medium' : 'hover:text-[#c8242f] hover:bg-gray-50'"
              @click="currentTag = (c === '全部' ? '' : c)">
              <span class="w-1.5 h-1.5 rounded-full" :class="isActive(c) ? 'bg-[#c8242f]' : 'bg-gray-300'"></span>
              {{ c }}
            </div>
          </div>
        </div>
        <div class="csdn-card p-4 text-center">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-xl text-white mx-auto shadow-sm">👤</div>
          <div class="mt-2 text-sm font-medium" style="color: var(--csdn-text)">未登录</div>
          <div class="text-[11px] text-gray-400 mt-0.5">点击登录，解锁更多功能</div>
          <button class="mt-2 w-full py-1.5 text-xs text-white rounded-sm flex items-center justify-center gap-1" style="background: var(--csdn-red)">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/></svg>
            登录
          </button>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="flex-1 min-w-0">
        <div class="text-xs text-gray-400 mb-4 flex items-center gap-1">
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          首页 &gt; <span style="color: var(--csdn-red)">博客</span>
        </div>
        <div class="csdn-card mb-4">
          <div class="flex items-center px-4 h-11 border-b gap-6 text-sm" style="border-color: var(--csdn-border)">
            <span class="text-[#c8242f] font-medium border-b-2 border-[#c8242f] h-full flex items-center gap-1">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 8 11 7h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></svg>
              最新
            </span>
            <span class="text-gray-500 hover:text-[#c8242f] cursor-pointer flex items-center gap-1">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
              热门
            </span>
            <span class="text-gray-500 hover:text-[#c8242f] cursor-pointer flex items-center gap-1">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              推荐
            </span>
          </div>
        </div>

        <div class="space-y-3">
          <div v-for="art in filteredArticles" :key="art.id"
            class="csdn-card overflow-hidden cursor-pointer hover:shadow-md hover:border-gray-300 transition-all group"
            @click="$router.push(`/article/${art.id}`)">
            <div class="p-5">
              <div class="flex items-start gap-1">
                <span class="csdn-original-badge shrink-0 mt-1">原</span>
                <h2 class="text-lg font-bold leading-snug group-hover:text-[#c8242f] transition-colors" style="color: var(--csdn-text)">
                  {{ art.title }}
                </h2>
              </div>
              <p class="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">{{ art.excerpt }}</p>
              <div class="mt-3 flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                <div class="flex items-center gap-1.5">
                  <div class="w-5 h-5 rounded-full bg-gradient-to-br from-red-300 to-red-500 flex items-center justify-center text-[10px] text-white shadow-sm">{{ art.avatar }}</div>
                  <span class="text-gray-500">{{ art.author }}</span>
                </div>
                <span class="flex items-center gap-0.5">
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                  {{ art.date }}
                </span>
                <span class="flex items-center gap-0.5">
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  {{ art.views }}
                </span>
                <span class="flex items-center gap-0.5">
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
                  {{ art.likes }}
                </span>
                <span class="flex items-center gap-0.5">
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/></svg>
                  {{ art.comments }}
                </span>
              </div>
              <div class="mt-3 flex gap-1.5 flex-wrap">
                <span v-for="t in art.tags" :key="t" class="csdn-tag">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右热门推荐（列表页窄版） -->
      <div class="hidden xl:block w-[260px] shrink-0 space-y-4">
        <div class="csdn-card p-4">
          <h3 class="text-xs font-bold mb-3 flex items-center gap-1.5" style="color: var(--csdn-text)">
            <svg class="w-3.5 h-3.5 text-[#c8242f]" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 21l1.5-1.5L9 21l1.5-1.5L12 21l1.5-1.5L15 21l1.5-1.5L18 21l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18z"/></svg>
            🔥 热门推荐
          </h3>
          <div class="space-y-3">
            <div v-for="(a, i) in articles.slice(0, 6)" :key="a.id"
              class="flex gap-2 cursor-pointer group"
              @click="$router.push(`/article/${a.id}`)">
              <span class="w-5 h-5 rounded flex items-center justify-center shrink-0 text-xs font-bold"
                :class="i < 3 ? 'bg-red-50 text-[#c8242f]' : 'bg-gray-100 text-gray-400'">{{ i + 1 }}</span>
              <span class="text-sm text-gray-600 group-hover:text-[#c8242f] line-clamp-2 leading-snug flex-1">{{ a.title }}</span>
            </div>
          </div>
        </div>
        <div class="csdn-card overflow-hidden">
          <img src="/ad-cloud.svg" alt="云服务器" class="w-full block" style="max-height:140px;object-fit:cover;object-position:center top;">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { articles } from '@/data/articles'

const categories = ['全部', 'React', '前端', 'Node.js', 'TypeScript', '教程', '最佳实践']
const currentTag = ref('')

function isActive(c: string) {
  return (!currentTag.value && c === '全部') || currentTag.value === c
}

const filteredArticles = computed(() => {
  if (!currentTag.value) return articles
  return articles.filter(a => a.tags.includes(currentTag.value))
})
</script>

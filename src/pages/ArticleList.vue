<template>
  <div class="pt-[92px] min-h-screen" style="background: var(--csdn-bg)">
    <div class="max-w-[1200px] mx-auto px-4 flex gap-6">
      <!-- 左分类栏 -->
      <div class="hidden lg:block w-[220px] shrink-0 space-y-4">
        <div class="csdn-card p-4">
          <h3 class="text-xs font-bold mb-3" style="color: var(--csdn-text)">分类专栏</h3>
          <div class="space-y-2 text-sm text-gray-500">
            <div v-for="c in categories" :key="c"
              class="cursor-pointer px-2 py-1 rounded text-xs"
              :class="isActive(c) ? 'text-[#c8242f] bg-red-50' : 'hover:text-[#c8242f]'"
              @click="currentTag = (c === '全部' ? '' : c)">
              {{ c }}
            </div>
          </div>
        </div>
        <div class="csdn-card p-4 text-center">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-xl text-white mx-auto">👤</div>
          <div class="mt-2 text-sm font-medium" style="color: var(--csdn-text)">未登录</div>
          <button class="mt-2 w-full py-1.5 text-xs text-white rounded" style="background: var(--csdn-red)">登录</button>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="flex-1 min-w-0">
        <div class="text-xs text-gray-400 mb-4">
          首页 &gt; <span style="color: var(--csdn-red)">博客</span>
        </div>
        <div class="csdn-card mb-4">
          <div class="flex items-center px-4 h-11 border-b gap-6 text-sm" style="border-color: var(--csdn-border)">
            <span class="text-[#c8242f] font-medium border-b-2 border-[#c8242f] h-full flex items-center">最新</span>
            <span class="text-gray-500 hover:text-[#c8242f] cursor-pointer">热门</span>
            <span class="text-gray-500 hover:text-[#c8242f] cursor-pointer">推荐</span>
          </div>
        </div>

        <div class="space-y-3">
          <div v-for="art in filteredArticles" :key="art.id"
            class="csdn-card overflow-hidden cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
            @click="$router.push(`/article/${art.id}`)">
            <div class="p-5">
              <h2 class="text-lg font-bold leading-snug hover:text-[#c8242f] transition-colors" style="color: var(--csdn-text)">
                {{ art.title }}
              </h2>
              <p class="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">{{ art.excerpt }}</p>
              <div class="mt-3 flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                <div class="flex items-center gap-1.5">
                  <div class="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-xs">{{ art.avatar }}</div>
                  <span>{{ art.author }}</span>
                </div>
                <span>{{ art.date }}</span>
                <span>{{ art.views }}阅读</span>
                <span>赞{{ art.likes }}</span>
                <span>评论{{ art.comments }}</span>
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
          <h3 class="text-xs font-bold mb-3" style="color: var(--csdn-text)">🔥 热门推荐</h3>
          <div class="space-y-3">
            <div v-for="(a, i) in articles.slice(0, 5)" :key="a.id"
              class="flex gap-2 cursor-pointer group"
              @click="$router.push(`/article/${a.id}`)">
              <span class="w-5 h-5 rounded bg-red-50 text-xs flex items-center justify-center shrink-0 text-[#c8242f] font-bold">{{ i + 1 }}</span>
              <span class="text-sm text-gray-600 group-hover:text-[#c8242f] line-clamp-2 leading-snug">{{ a.title }}</span>
            </div>
          </div>
        </div>
        <div class="csdn-card py-6 text-center text-xs text-gray-300 h-40 flex items-center justify-center">
          📢 广告
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

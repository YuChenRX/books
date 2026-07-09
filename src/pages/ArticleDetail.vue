<template>
  <div class="pt-[92px] min-h-screen" style="background: var(--csdn-bg)">
    <div class="max-w-[1200px] mx-auto px-4 flex gap-6">
      <!-- 主文章区 -->
      <div class="flex-1 min-w-0">
        <div class="text-xs text-gray-400 mb-4 flex items-center gap-1">
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span class="hover:text-[#c8242f] cursor-pointer" @click="$router.push('/')">首页</span>
          <span>&gt;</span>
          <span style="color: var(--csdn-red)">{{ article?.title?.slice(0, 20) }}...</span>
        </div>

        <div class="csdn-card">
          <!-- 标题 -->
          <div class="px-6 pt-6 pb-2">
            <div class="flex items-start gap-2">
              <span class="csdn-original-badge shrink-0 mt-1">原</span>
              <h1 class="text-2xl font-bold leading-snug" style="color: var(--csdn-text)">{{ article?.title }}</h1>
            </div>
            <div class="flex items-center gap-4 mt-4 text-sm text-gray-400 flex-wrap">
              <div class="flex items-center gap-1.5">
                <div class="w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-xs text-white">{{ article?.avatar }}</div>
                <span class="text-gray-500 font-medium">{{ article?.author }}</span>
                <svg class="w-3 h-3 text-[#c8242f]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
              </div>
              <span class="flex items-center gap-0.5">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                {{ article?.date }}
              </span>
              <span class="flex items-center gap-0.5">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                {{ article?.views }}阅读
              </span>
              <span class="flex items-center gap-0.5">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
                {{ article?.likes }}
              </span>
              <span class="flex items-center gap-0.5">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/></svg>
                {{ article?.comments }}
              </span>
              <div class="ml-auto flex gap-3">
                <span class="flex items-center gap-0.5 text-gray-400 hover:text-[#c8242f] cursor-pointer text-xs">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  收藏
                </span>
                <span class="flex items-center gap-0.5 text-gray-400 hover:text-[#c8242f] cursor-pointer text-xs">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                  分享
                </span>
              </div>
            </div>
          </div>

          <!-- 作者条 -->
          <div class="mx-6 my-3 flex items-center gap-3 px-4 py-3 rounded-sm" style="background: #f8f9fa; border: 1px solid #eee;">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-lg text-white shadow-sm">{{ article?.avatar }}</div>
            <div>
              <div class="text-sm font-medium flex items-center gap-1" style="color: var(--csdn-text)">{{ article?.author }}
                <svg class="w-3 h-3 text-[#c8242f]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
              </div>
              <div class="text-[11px] text-gray-400">CSDN 认证博主</div>
            </div>
            <button class="ml-auto flex items-center gap-1 px-4 py-1.5 text-xs text-white rounded-sm transition-colors" style="background: var(--csdn-red)">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              关注
            </button>
          </div>

          <!-- 正文 -->
          <ArticleContent v-if="article" :content="article.content" :buryPoints="article.buryPoints ?? []" />

          <!-- 底部标签 -->
          <div v-if="article" class="px-6 pb-4 flex items-center gap-2 flex-wrap border-t pt-4" style="border-color: var(--csdn-border)">
            <span class="text-xs text-gray-400 flex items-center gap-0.5">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
              所属标签：
            </span>
            <span v-for="t in article.tags" :key="t" class="csdn-tag">{{ t }}</span>
          </div>
        </div>

        <!-- 版权声明 -->
        <div class="csdn-card mt-4 px-6 py-4">
          <div class="flex items-start gap-2 text-sm text-gray-400">
            <svg class="w-4 h-4 text-[#c8242f] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            <span>版权声明：本文为CSDN博主「{{ article?.author }}」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。</span>
          </div>
        </div>

        <!-- 上/下篇导航 -->
        <div class="csdn-card mt-4 px-6 py-4 flex justify-between text-sm">
          <span v-if="prevArticle" class="text-gray-500 hover:text-[#c8242f] cursor-pointer flex items-center gap-1 max-w-[45%]" @click="$router.push(`/article/${prevArticle.id}`)">
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            <span class="truncate">{{ prevArticle.title }}</span>
          </span>
          <span v-else></span>
          <span v-if="nextArticle" class="text-gray-500 hover:text-[#c8242f] cursor-pointer flex items-center gap-1 max-w-[45%] text-right" @click="$router.push(`/article/${nextArticle.id}`)">
            <span class="truncate">{{ nextArticle.title }}</span>
            <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z"/></svg>
          </span>
        </div>
      </div>

      <!-- 右侧栏 -->
      <SidebarRight
        v-if="article"
        :article="article"
        :hotList="relatedArticles"
        :allTags="allTags"
        @navigate="(id: string) => $router.push(`/article/${id}`)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { articles } from '@/data/articles'
import ArticleContent from '@/components/ArticleContent.vue'
import SidebarRight from '@/components/SidebarRight.vue'

const route = useRoute()
const articleId = computed(() => route.params.id as string)

const article = computed(() => articles.find(a => a.id === articleId.value))

const currentIdx = computed(() => articles.findIndex(a => a.id === articleId.value))

const prevArticle = computed(() => currentIdx.value > 0 ? articles[currentIdx.value - 1] : null)
const nextArticle = computed(() => currentIdx.value < articles.length - 1 ? articles[currentIdx.value + 1] : null)

const relatedArticles = computed(() => {
  const idx = currentIdx.value
  const result: typeof articles = []
  for (let i = idx - 2; i <= idx + 2; i++) {
    if (i >= 0 && i < articles.length && i !== idx) {
      result.push(articles[i])
    }
  }
  return result
})

const allTags = computed(() => {
  const set = new Set<string>()
  articles.forEach(a => a.tags.forEach(t => set.add(t)))
  return Array.from(set)
})
</script>


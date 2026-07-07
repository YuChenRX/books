<template>
  <div class="pt-[92px] min-h-screen" style="background: var(--csdn-bg)">
    <div class="max-w-[1200px] mx-auto px-4 flex gap-6">
      <!-- 主文章区 -->
      <div class="flex-1 min-w-0">
        <div class="csdn-card">
          <!-- 标题 -->
          <div class="px-6 pt-6 pb-2">
            <h1 class="text-2xl font-bold leading-snug" style="color: var(--csdn-text)">{{ article?.title }}</h1>
            <div class="flex items-center gap-4 mt-4 text-sm text-gray-400 flex-wrap">
              <div class="flex items-center gap-1.5">
                <div class="w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-xs text-white">{{ article?.avatar }}</div>
                <span class="text-gray-500">{{ article?.author }}</span>
              </div>
              <span>{{ article?.date }}</span>
              <span>{{ article?.views }}阅读</span>
              <span>赞{{ article?.likes }}</span>
              <span>评论{{ article?.comments }}</span>
            </div>
          </div>

          <!-- 作者条 -->
          <div class="mx-6 my-3 flex items-center gap-3 px-4 py-3 rounded" style="background: #f8f9fa; border: 1px solid #eee;">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-lg text-white">{{ article?.avatar }}</div>
            <div>
              <div class="text-sm font-medium" style="color: var(--csdn-text)">{{ article?.author }}</div>
              <div class="text-xs text-gray-400">CSDN 认证博主</div>
            </div>
            <button class="ml-auto csdn-btn-primary">关注</button>
          </div>

          <!-- 正文 -->
          <ArticleContent v-if="article" :content="article.content" />

          <!-- 底部标签 -->
          <div v-if="article" class="px-6 pb-4 flex gap-2 flex-wrap border-t pt-4" style="border-color: var(--csdn-border)">
            <span v-for="t in article.tags" :key="t" class="csdn-tag">{{ t }}</span>
          </div>
        </div>

        <!-- 版权声明 -->
        <div class="csdn-card mt-4 px-6 py-4 text-sm text-gray-400">
          版权声明：本文为CSDN博主「{{ article?.author }}」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
        </div>

        <!-- 上/下篇导航 -->
        <div class="csdn-card mt-4 px-6 py-4 flex justify-between text-sm">
          <span v-if="prevArticle" class="text-gray-500 hover:text-[#c8242f] cursor-pointer" @click="$router.push(`/article/${prevArticle.id}`)">
            上一篇：{{ prevArticle.title }}
          </span>
          <span v-else></span>
          <span v-if="nextArticle" class="text-gray-500 hover:text-[#c8242f] cursor-pointer text-right" @click="$router.push(`/article/${nextArticle.id}`)">
            下一篇：{{ nextArticle.title }}
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

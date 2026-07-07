<template>
  <div class="w-[300px] shrink-0 space-y-4">
    <!-- 作者卡片 -->
    <div v-if="article" class="csdn-card p-5">
      <div class="text-center">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-3xl text-white mx-auto">
          {{ article.avatar }}
        </div>
        <div class="mt-3 font-semibold" style="color: var(--csdn-text)">{{ article.author }}</div>
        <div class="mt-1 text-xs text-gray-400">CSDN 认证博主</div>
        <div class="mt-4 flex justify-around border-t" style="border-color: var(--csdn-border); padding-top: 16px;">
          <div class="text-center">
            <span class="text-lg font-bold" style="color: var(--csdn-text)">{{ article.likes }}</span><br />
            <span class="text-xs text-gray-400">获赞</span>
          </div>
          <div class="text-center">
            <span class="text-lg font-bold" style="color: var(--csdn-text)">{{ article.comments }}</span><br />
            <span class="text-xs text-gray-400">评论</span>
          </div>
        </div>
        <button class="mt-4 w-full py-2 text-sm text-white rounded transition-colors"
          style="background: var(--csdn-red)"
          @mouseenter="($event.target as HTMLElement).style.background = '#a11d26'"
          @mouseleave="($event.target as HTMLElement).style.background = 'var(--csdn-red)'">
          关注
        </button>
      </div>
    </div>

    <!-- 热门推荐 -->
    <div class="csdn-card p-5">
      <h3 class="text-sm font-bold" style="color: var(--csdn-text); border-bottom: 1px solid var(--csdn-border); padding-bottom: 8px; margin-bottom: 12px;">热门推荐</h3>
      <div class="space-y-3">
        <div v-for="(a, i) in hotList" :key="a.id"
          class="flex gap-3 cursor-pointer group"
          @click="$emit('navigate', a.id)">
          <span class="w-5 h-5 rounded flex items-center justify-center shrink-0"
            :class="i < 3 ? 'bg-red-50 text-[#c8242f] font-bold' : 'bg-[#f0f0f0] text-gray-400'"
            style="font-size: 12px;">{{ i + 1 }}</span>
          <span class="text-sm text-gray-600 group-hover:text-[#c8242f] leading-snug line-clamp-2">{{ a.title }}</span>
        </div>
      </div>
    </div>

    <!-- 标签云 -->
    <div class="csdn-card p-5">
      <h3 class="text-sm font-bold" style="color: var(--csdn-text); border-bottom: 1px solid var(--csdn-border); padding-bottom: 8px; margin-bottom: 12px;">标签</h3>
      <div class="flex flex-wrap gap-2">
        <span v-for="t in allTags" :key="t" class="csdn-tag">{{ t }}</span>
      </div>
    </div>

    <!-- 广告位 -->
    <div class="csdn-card py-8 text-center text-xs text-gray-300">
      <div class="h-24 bg-gray-50 mx-4 rounded flex items-center justify-center">广告位招租</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/data/articles'

defineProps<{
  article?: Article
  hotList: Article[]
  allTags: string[]
}>()

defineEmits<{
  navigate: [id: string]
}>()
</script>

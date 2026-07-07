<template>
  <div class="w-[300px] shrink-0 space-y-4">
    <!-- 作者卡片 -->
    <div v-if="article" class="csdn-card p-5">
      <div class="text-center">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-3xl text-white mx-auto shadow-sm">
          {{ article.avatar }}
        </div>
        <div class="mt-3 font-semibold text-sm" style="color: var(--csdn-text)">{{ article.author }}</div>
        <div class="mt-1 text-[12px] text-gray-400 flex items-center justify-center gap-1">
          <svg class="w-3 h-3 text-[#c8242f]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
          认证博主
        </div>
        <div class="mt-4 flex justify-around border-t pt-4" style="border-color: var(--csdn-border)">
          <div class="text-center">
            <span class="text-lg font-bold" style="color: var(--csdn-text)">{{ article.likes }}</span><br />
            <span class="text-[11px] text-gray-400">获赞</span>
          </div>
          <div class="text-center">
            <span class="text-lg font-bold" style="color: var(--csdn-text)">{{ article.comments }}</span><br />
            <span class="text-[11px] text-gray-400">评论</span>
          </div>
          <div class="text-center">
            <span class="text-lg font-bold" style="color: var(--csdn-text)">{{ article.views }}</span><br />
            <span class="text-[11px] text-gray-400">阅读</span>
          </div>
        </div>
        <button class="mt-4 w-full py-2 text-sm text-white rounded-sm transition-colors flex items-center justify-center gap-1" style="background: var(--csdn-red)">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          关注
        </button>
      </div>
    </div>

    <!-- 热门推荐 -->
    <div class="csdn-card p-5">
      <h3 class="text-sm font-bold flex items-center gap-1.5 pb-2 mb-3" style="color: var(--csdn-text); border-bottom: 1px solid var(--csdn-border);">
        <svg class="w-4 h-4 text-[#c8242f]" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 21l1.5-1.5L9 21l1.5-1.5L12 21l1.5-1.5L15 21l1.5-1.5L18 21l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18zM7 15h10v2H7zm0-4h10v2H7zm0-4h10v2H7z"/></svg>
        热门推荐
      </h3>
      <div class="space-y-3">
        <div v-for="(a, i) in hotList.slice(0, 5)" :key="a.id"
          class="flex gap-3 cursor-pointer group"
          @click="$emit('navigate', a.id)">
          <span class="w-5 h-5 rounded flex items-center justify-center shrink-0 text-xs font-bold"
            :class="i < 3 ? 'bg-red-50 text-[#c8242f]' : 'bg-gray-100 text-gray-400'">{{ i + 1 }}</span>
          <div class="flex-1 min-w-0">
            <span class="text-sm text-gray-600 group-hover:text-[#c8242f] leading-snug line-clamp-2 block">{{ a.title }}</span>
            <span class="text-[11px] text-gray-400 mt-0.5 block">{{ a.views }}阅读</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 标签云 -->
    <div class="csdn-card p-5">
      <h3 class="text-sm font-bold flex items-center gap-1.5 pb-2 mb-3" style="color: var(--csdn-text); border-bottom: 1px solid var(--csdn-border);">
        <svg class="w-4 h-4 text-[#c8242f]" viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
        标签
      </h3>
      <div class="flex flex-wrap gap-2">
        <span v-for="t in allTags" :key="t" class="csdn-tag">{{ t }}</span>
      </div>
    </div>

    <!-- 广告位：模拟 CSDN 风格广告图片 -->
    <div class="csdn-card overflow-hidden group cursor-pointer">
      <div class="h-52 flex flex-col items-center justify-center px-5 text-center relative overflow-hidden" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);">
        <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 30% 50%, #e94560 0%, transparent 60%), radial-gradient(circle at 70% 30%, #533483 0%, transparent 50%);"></div>
        <div class="text-5xl mb-3">☁️</div>
        <div class="text-white font-bold text-sm leading-tight">阿里云服务器</div>
        <div class="text-white/80 text-xs mt-1">2核4G 5M带宽</div>
        <div class="mt-2 flex items-baseline gap-0.5">
          <span class="text-[10px] text-white/60">¥</span>
          <span class="text-2xl font-bold text-white">99</span>
          <span class="text-[10px] text-white/60">/年</span>
        </div>
        <span class="mt-3 px-6 py-1 text-[11px] font-medium text-white rounded-full" style="background: linear-gradient(90deg, #e94560, #533483);">立即抢购</span>
        <div class="absolute top-1.5 right-2 text-[10px] text-white/30">广告</div>
      </div>
    </div>

    <div class="csdn-card overflow-hidden group cursor-pointer">
      <div class="h-36 flex items-center px-4 gap-4 relative overflow-hidden" style="background: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);">
        <div class="text-4xl">🎓</div>
        <div class="flex-1">
          <div class="text-sm font-bold text-gray-800">Python 全栈工程师</div>
          <div class="text-[11px] text-gray-500 mt-0.5">0基础入门 · 项目实战 · 就业指导</div>
          <div class="flex items-center gap-2 mt-2">
            <span class="text-[10px] line-through text-gray-400">¥6999</span>
            <span class="text-sm font-bold text-[#c8242f]">限时免费</span>
          </div>
        </div>
        <div class="absolute top-1.5 right-2 text-[10px] text-gray-400">广告</div>
      </div>
    </div>

    <!-- 友情链接 -->
    <div class="csdn-card p-4">
      <div class="text-[11px] text-gray-400 leading-loose">
        <span class="hover:text-[#c8242f] cursor-pointer">关于我们</span>
        <span class="mx-1">|</span>
        <span class="hover:text-[#c8242f] cursor-pointer">合作</span>
        <span class="mx-1">|</span>
        <span class="hover:text-[#c8242f] cursor-pointer">招聘</span>
        <span class="mx-1">|</span>
        <span class="hover:text-[#c8242f] cursor-pointer">联系</span>
      </div>
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

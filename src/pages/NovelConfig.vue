<template>
  <div class="pt-[92px] min-h-screen" style="background: #f4f5f6;">
    <div class="max-w-[600px] mx-auto px-4 py-10">
      <div class="csdn-card p-6">
        <h1 class="text-lg font-bold mb-2" style="color: var(--csdn-text)">📖 小说彩蛋设置</h1>
        <p class="text-xs text-gray-400 mb-6">此处仅用于技术演示，请勿随意开启</p>

        <!-- 开关 -->
        <div class="flex items-center justify-between py-3 border-b" style="border-color: var(--csdn-border)">
          <div>
            <div class="text-sm font-medium" style="color: var(--csdn-text)">小说模式</div>
            <div class="text-xs text-gray-400 mt-0.5">
              {{ store.enabled ? '已激活 · 文章段落间会藏入小说句子' : '关闭' }}
            </div>
          </div>
          <button
            class="w-12 h-6 rounded-full transition-colors relative"
            :class="store.enabled ? 'bg-[#c8242f]' : 'bg-gray-300'"
            @click="store.toggle()"
          >
            <span
              class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
              :class="store.enabled ? 'translate-x-6' : 'translate-x-0.5'"
            ></span>
          </button>
        </div>

        <!-- 状态信息 -->
        <div v-if="store.enabled" class="mt-4 space-y-3 text-sm">
          <div class="flex items-center gap-2 text-gray-500">
            <span class="text-gray-400">📕 小说：</span>
            <span>{{ store.novelTitle || '加载中...' }}</span>
          </div>
          <div class="flex items-center gap-2 text-gray-500">
            <span class="text-gray-400">📄 句子总数：</span>
            <span>{{ store.progress.total }}</span>
          </div>
          <div class="flex items-center gap-2 text-gray-500">
            <span class="text-gray-400">▶ 当前进度：</span>
            <span>{{ store.progress.current }} / {{ store.progress.total }}</span>
            <span class="text-[11px] text-gray-400">({{ store.progress.pct }}%)</span>
          </div>

          <!-- 进度条 -->
          <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-[#c8242f] rounded-full transition-all duration-300"
              :style="{ width: store.progress.pct + '%' }"
            ></div>
          </div>

          <!-- 当前句子预览 -->
          <div v-if="store.currentSentence()" class="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
            <div class="text-[11px] text-gray-400 mb-1">当前句子预览：</div>
            <div class="text-sm italic text-gray-600">「{{ store.currentSentence() }}」</div>
          </div>
        </div>

        <!-- 使用说明 -->
        <div class="mt-6 p-3 bg-gray-50 rounded text-xs text-gray-400 leading-relaxed">
          <p class="font-medium text-gray-500 mb-1">📌 使用方式：</p>
          <p>1. 开启小说模式后，去阅读任意技术文章</p>
          <p>2. 文章段落之间会藏入小说中的短句</p>
          <p>3. <strong>点击</strong>藏入的句子即可切换到下一句</p>
          <p>4. 句子的进度在所有文章之间共享</p>
          <p>5. 全部播完后自动关闭</p>
        </div>

        <div class="mt-6 text-center">
          <button
            class="csdn-btn-primary text-xs"
            @click="$router.push('/')"
          >← 返回首页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNovelStore } from '@/stores/novel'
const store = useNovelStore()
</script>

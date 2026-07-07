<template>
  <header class="fixed top-0 left-0 right-0 z-50" style="background:linear-gradient(180deg,#c20a0a,#c8242f)">
    <!-- 主栏 -->
    <div class="max-w-[1200px] mx-auto flex items-center h-[50px] px-4">
      <a class="text-white text-xl font-bold mr-8 tracking-wider" href="/">CSDN</a>
      <nav class="hidden lg:flex items-center gap-1 text-sm">
        <a v-for="item in navItems" :key="item"
          class="px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
          href="#">{{ item }}</a>
        <a class="px-2 py-0.5 text-[11px] bg-yellow-400 text-red-700 rounded font-bold ml-2" href="#">会员</a>
        <a class="px-2 py-0.5 text-[11px] text-white/80 border border-white/30 rounded ml-1" href="#">周边</a>
        <a class="px-2 py-0.5 text-[11px] text-white/80 ml-1" href="#">问答</a>
      </nav>
      <div class="ml-auto flex items-center gap-3">
        <div class="flex items-center bg-white/15 rounded-sm px-3 py-1">
          <svg class="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input class="bg-transparent text-white text-xs outline-none ml-2 w-28 placeholder-white/40" placeholder="搜索CSDN" />
        </div>
        <button class="hidden sm:block text-xs text-white/80 hover:text-white">登录</button>
      </div>
    </div>
    <!-- 子导航栏 -->
    <div class="border-t border-white/10" style="background:#b80e0e">
      <div class="max-w-[1200px] mx-auto flex items-center h-9 px-4 gap-4 text-xs text-white/70">
        <span class="text-white font-medium">首页</span>
        <span>博客</span>
        <span>移动</span>
        <span>云原生</span>
        <span>AI</span>
        <span>程序员</span>
        <span>问答</span>
        <span class="ml-auto text-white/50">| 成就一亿技术人</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const navItems = ['博客', '下载', '学习', '社区', 'GitCode', '猿如意']
</script>

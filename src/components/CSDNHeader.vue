<template>
  <header class="fixed top-0 left-0 right-0 z-50" style="background:linear-gradient(180deg,#c20a0a,#c8242f)">
    <!-- 主栏 -->
    <div class="max-w-[1200px] mx-auto flex items-center h-[50px] px-4">
      <!-- CSDN 红底白字 Logo -->
      <a href="/" class="flex items-center gap-1 no-underline mr-5">
        <span class="inline-flex items-center justify-center w-[54px] h-[28px] bg-[#c8242f] rounded-[3px] text-white text-[15px] font-bold tracking-wider" style="font-family: Arial, sans-serif;">CSDN</span>
        <span class="text-white/90 text-[13px] font-medium hidden sm:inline">博客</span>
      </a>
      <nav class="hidden lg:flex items-center gap-1 text-sm">
        <a v-for="item in navItems" :key="item"
          class="px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors no-underline"
          href="#">{{ item }}</a>
        <a class="px-2 py-0.5 text-[11px] bg-yellow-400 text-red-700 rounded font-bold ml-2 no-underline" href="#">会员</a>
        <a class="px-2 py-0.5 text-[11px] text-white/80 border border-white/30 rounded ml-1 no-underline" href="#">周边</a>
        <a class="px-2 py-0.5 text-[11px] text-white/80 ml-1 no-underline" href="#">问答</a>
      </nav>
      <div class="ml-auto flex items-center gap-3">
        <div class="flex items-center bg-white/15 rounded-sm px-3 py-1">
          <svg class="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input class="bg-transparent text-white text-xs outline-none ml-2 w-28 placeholder-white/40" placeholder="搜索CSDN" />
        </div>
        <button class="hidden sm:block text-xs text-white/80 hover:text-white px-3 py-1 rounded hover:bg-white/10 transition-colors">登录</button>
        <a class="hidden md:flex items-center gap-1 text-xs text-white bg-yellow-500/20 border border-yellow-500/30 rounded-sm px-3 py-1 hover:bg-yellow-500/30 transition-colors no-underline" href="#">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm-11 2l-5-5 5-5 1.41 1.41L7.83 10H17v2H7.83l3.58 3.59L8 16z"/></svg>
          写博客
        </a>
      </div>
    </div>
    <!-- 子导航栏 -->
    <div class="border-t border-white/10" style="background:#b80e0e">
      <div class="max-w-[1200px] mx-auto flex items-center h-9 px-4 gap-4 text-xs text-white/70">
        <span class="text-white font-medium cursor-pointer">首页</span>
        <span class="cursor-pointer hover:text-white transition-colors">博客</span>
        <span class="cursor-pointer hover:text-white transition-colors">移动</span>
        <span class="cursor-pointer hover:text-white transition-colors">云原生</span>
        <span class="cursor-pointer hover:text-white transition-colors">AI</span>
        <span class="cursor-pointer hover:text-white transition-colors">程序员</span>
        <span class="cursor-pointer hover:text-white transition-colors">问答</span>
        <span class="ml-auto text-white/50">| 成就一亿技术人</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const navItems = ['博客', '下载', '学习', '社区', 'GitCode', '猿如意']
</script>

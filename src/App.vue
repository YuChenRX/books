<template>
  <div class="csdn-app">
    <CSDNHeader />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import CSDNHeader from '@/components/CSDNHeader.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  color: #333;
  background: #f4f5f6;
}

.csdn-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 覆盖 Vuetify 遗留样式 */
.v-application {
  background: transparent !important;
  font-family: inherit !important;
}
</style>

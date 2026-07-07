<template>
  <VApp>
    <CSDNHeader />
    <router-view />
  </VApp>
</template>

<script setup lang="ts">
import CSDNHeader from '@/components/CSDNHeader.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

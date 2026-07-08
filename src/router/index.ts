import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/ArticleList.vue')
  },
  {
    path: '/article/:id',
    name: 'article-detail',
    component: () => import('@/pages/ArticleDetail.vue')
  },
  // 隐藏的小说彩蛋设置页
  {
    path: '/novel-config',
    name: 'novel-config',
    component: () => import('@/pages/NovelConfig.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

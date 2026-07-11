import 'core-js/stable'
import './extends'
import { createApp, watchEffect } from 'vue'
import App from './App.vue'
import 'uno.css'
import 'virtual:uno.css'
import '@/styles/index.scss'
import '@/styles/csdn.scss'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// @ts-ignore
import { registerPlugins } from './plugins'

// 构建版本号（北京时间，由 vite.config.ts 注入）
declare const __BUILD_TIME__: string
console.log(`📦 build: ${__BUILD_TIME__}`)

const app = createApp(App)

registerPlugins(app)
  .mount('#app')

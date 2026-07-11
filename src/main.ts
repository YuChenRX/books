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

// 构建版本号（由 vite.config.ts 注入，UTC 时间）
declare const __BUILD_TIME__: string
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)
const bt = dayjs.utc(__BUILD_TIME__).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
console.log(`📦 build: ${bt} (CST)`)
console.log(`📦 build(UTC): ${__BUILD_TIME__}`)

const app = createApp(App)

registerPlugins(app)
  .mount('#app')

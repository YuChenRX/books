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

const app = createApp(App)

registerPlugins(app)
  .mount('#app')

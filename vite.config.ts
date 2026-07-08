import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath, URL } from 'node:url'
import vuetify from 'vite-plugin-vuetify'

const stripPwaLinks = () => ({
  name: 'strip-pwa-links',
  transformIndexHtml(html: string) {
    return html
      .replace(/\s*<link[^>]*rel="manifest"[^>]*>\s*/i, '')
      .replace(/\s*<link[^>]*rel="icon"[^>]*>\s*/i, '')
      .replace(/\s*<link[^>]*rel="apple-touch-icon"[^>]*>\s*/i, '')
  }
})

export default defineConfig(({ mode }) => {
  const isSingleFile = mode === 'singlefile'
  const plugins = [
    vue(),
    vueJsx(),
    vuetify(),
    Unocss()
  ]

  if (isSingleFile) {
    plugins.push(stripPwaLinks())
    plugins.push(viteSingleFile())
  } else {
    plugins.push(VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Task Vue',
        short_name: 'TaskVue',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }))
  }

  return {
    base: isSingleFile ? './' : '/',
    server: {
      port: 3000
    },
    plugins,
    build: isSingleFile ? {
      cssCodeSplit: false,
      assetsInlineLimit: 100000000,
      chunkSizeWarningLimit: 100000000,
      rollupOptions: {
        output: {
          inlineDynamicImports: true
        }
      }
    } : undefined,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.ts', '.js', '.vue', '.json'],
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: ['./tests/utils/setup.ts'],
    }
  }
})

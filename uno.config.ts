import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import presetAttributify from '@unocss/preset-attributify'
import { ThemesConfig } from "./src/themes/index.js"

export default defineConfig({
  theme: {
    colors: ThemesConfig.themes.light.colors
  },
  
  presets: [
    // @ts-ignore
    presetUno(),
  // @ts-ignore
    presetIcons({
      scale: 1,
      warn: true,
      autoInstall: true,
    }),
    // @ts-ignore
    presetAttributify(),
  ],
})
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ThemesConfig } from '@/themes/index.js'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    global: {
      ripple: false
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  },
  theme: {
    ...ThemesConfig
  }
})
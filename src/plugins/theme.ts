// import { useThemeStore } from "@/stores/theme"
// import { watchEffect } from "vue"
// import { vuetify } from "./vuetifyPlugin"

// const themeStore = useThemeStore()

// export default {
//   theme: themeStore,
//   vuetify,
//   install(app) {
//     watchEffect(() => {
//       const theme = themeStore.isDarkMode ? 'dark' : 'light'
//       vuetify.theme.global.name.value = theme
//       vuetify.theme.themes.value[theme].colors = {
//         ...vuetify.theme.themes.value[theme].colors,
//         ...themeStore.themeColors
//       }
//     })
//   }
// }
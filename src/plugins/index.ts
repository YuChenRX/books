
import dayjs from './dayjsPlugin'
import { autoAnimatePlugin } from './autoAnimatePlugin'
import { vuetify } from './vuetifyPlugin'
import { router } from './routerPlugin'
import { pinia } from './piniaPlugin'
import { Toast, options as ToastOptions } from './toastPlugin.ts'
import piniaPersistedState from 'pinia-plugin-persistedstate'
import {type App} from "vue";

export const registerPlugins = (app:App<Element>) => {
    app.use(pinia)

    app.use(vuetify)
    app.config.globalProperties.$vuetify = vuetify

    app.use(autoAnimatePlugin)

    app.use(dayjs)

    app.use(router)

    app.use(Toast, ToastOptions)
    pinia.use(piniaPersistedState)

    return app
}

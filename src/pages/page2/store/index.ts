
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

/**
 * setup pinia store
 * @param app 
 */
const setupStore = (app: any) => {
  const pinia = createPinia()
  app.use(pinia.use(piniaPluginPersistedstate))
}

export {
  setupStore
}

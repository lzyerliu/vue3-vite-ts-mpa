import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import { setupStore } from './store/index.ts'
import '@/style/reset.less'
import '@/style/flex.less'
import '@/style/common.less'


// setup
const bootstrap = async () => {
  const app = createApp(App)

  // 配置 Store
  setupStore(app)

  app.use(router)
  app.mount('#app')
}

bootstrap()

// 局部指令
/**
  // Vue 3.X
  directives: {
    copy: copy
  }
 */

// 全局指令
/**
 * 
  // Vue 3.X
  const app = createApp(App)
  app.directive('copy', copy)
 */

// 批量注册
/**
 * // Vue 3.X
  import { createApp } from 'vue'
  import App from './App.vue'
  import Directive from './directives'

  const app = createApp(App)
  app.use(Directive)
  app.mount('#app')
 */

import copy from './copy.ts'
import longpress from './longpress.ts'
import debounce from './debounce.ts'
import throttle from './throttle.ts'

const directives: any = {
  copy,
  longpress,
  debounce,
  throttle
}

export default {
  install(Vue: any) {
    Object.keys(directives).forEach((key: any) => {
      Vue.directive(key, directives[key])
    })
  }
}


const throttle: any = {
  mounted(el: any, binding: any) {
    // 没有绑函数 抛出异常
    if (typeof binding.value !== 'function') {
      throw 'throttle callback not a function'
    }
    // 开关
    el._flag = true
    el._timer = null
    el._handler = () => {
      if (!el._flag) {
        return
      }
      // 函数执行后 关闭开关
      el._flag && binding.value()
      el._flag = false
      if (el._timer) {
        clearTimeout(el._timer)
      }
      let time: number = binding.arg ? Number(binding.arg) : 600
      el._timer = setTimeout(() => {
        el._flag = true
      }, time)
    }
    el.addEventListener('click', el._handler)
  },
  unmounted(el: any) {
    el.removeEventListener('click', el._handler)
  },
}

export default throttle

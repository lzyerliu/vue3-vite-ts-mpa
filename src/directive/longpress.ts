
const longpress: any = {
  mounted(el: any, binding: any, vNode: any) {
    console.log(vNode)
    if (typeof binding.value !== 'function') {
      throw 'longpress callback not a function'
    }
    // 计时器变量
    el._timer = null
    // 运行函数
    el.handler = (e: any) => {
      binding.value(e)
    }
    // 创建计时器
    el._start = (e: any) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      if (el._timer === null) {
        // 长按时长
        let time: number = binding.arg ? Number(binding.arg) : 1000
        el._timer = setTimeout(() => {
          el.handler(e)
        }, time)
        el.addEventListener('contextmeun', (e: any) => {
          e.preventDefault()
        })
      }
    }
    // 松手 取消计时器
    el._cancel = (e: any) => {
      console.log(e)
      if (el._timer !== null) {
        clearTimeout(el._timer)
        el._timer = null
      }
    }

    // 添加计时器 监听
    el.addEventListener('mousedown', el._start)
    el.addEventListener('touchstart', el._start)
    // 取消计时器 监听
    el.addEventListener('click', el._cancel)
    el.addEventListener('mouseout', el._cancel)
    el.addEventListener('touchend', el._cancel)
    el.addEventListener('touchcancel', el._cancel)
  },
  unmounted(el: any) {
    el.removeEventListener('mousedown', el._start)
    el.removeEventListener('touchstart', el._start)
    el.removeEventListener('click', el._cancel)
    el.removeEventListener('mouseout', el._cancel)
    el.removeEventListener('touchend', el._cancel)
    el.removeEventListener('touchcancel', el._cancel)
  },
}

export default longpress

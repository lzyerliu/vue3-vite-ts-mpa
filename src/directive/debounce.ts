
const debounce: any = {
  mounted(el: any, binding: any) {
    // 没有绑定函数 抛错误
    if (typeof binding.value !== 'function') {
      throw 'debounce callback not a function'
    }
    el._timer = null
    el._handler = () => {
      if (el._timer) {
        clearTimeout(el._timer)
      }
      let time: number = binding.arg ? Number(binding.arg) : 600
      el._timer = setTimeout(() => {
        binding.value()
      }, time)
    }
    el.addEventListener('click', el._handler)
  },
  unmounted(el: any) {
    el.removeEventListener('click', el._handler)
  },
}

export default debounce


const copy: any = {
  mounted(el: any, { value }: any) {
    el._value = value
    el.handler = () => {
      console.log('want to copy')
      if (!el._value) {
        // 内容为空
        console.log('无可复制的内容')
        return
      }

      const textarea: any = document.createElement('textarea')
      // 设置readOnly(规定字段为只读)属性，防止 iOS下自动唤起键盘，并移除可视区域
      textarea.readOnly = 'readOnly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      textarea.value = el._value
      document.body.appendChild(textarea)

      textarea.select()
      const result: any = document.execCommand('copy')
      if (result) {
        console.log('内容已复制')
      }
      document.body.removeChild(textarea)
    }
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  updated(el: any, { value }: any) {
    el._value = value
  },
  // 指令与元素解绑的时候触发，移除事件绑定
  unmounted(el: any) {
    el.removeEventListener('click', el.handler)
  }
}

export default copy

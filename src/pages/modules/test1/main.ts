import '@/style/reset.less'

window.onload = () => {
  console.log('test1 app')
  let hitEl = <HTMLElement>document.getElementById('_hit_el')
  const hitClickFn = (e: Event) => {
    e.preventDefault()
    console.log('event: ', e)
  }
  hitEl.addEventListener('click', hitClickFn)
}

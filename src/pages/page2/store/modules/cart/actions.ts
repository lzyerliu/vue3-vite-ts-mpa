const actions = {
  setCountAction (context: any, count: number) {
    // console.log(count)
    context.commit('setCount', count)
  }
}

export default actions

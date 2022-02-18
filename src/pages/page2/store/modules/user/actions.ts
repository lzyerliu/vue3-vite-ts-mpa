const actions = {
  setUserNameAction (context: any, name: any) {
    context.commit('setUserName', name)
  },
  setCountAction (context: any, count: number) {
    // console.log(count)
    context.commit('setCount', count)
  }
}

export default actions

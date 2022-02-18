const mutations = {
  setUserName (state: any, name: any) {
    console.log(state, name)
    state.userName = name
  },
  setCount (state: any, count: number) {
    state.count = count
  }
}

export default mutations

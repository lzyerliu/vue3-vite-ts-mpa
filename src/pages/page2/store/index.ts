import { createStore } from 'vuex'
import user from './modules/user/index'
import cart from './modules/cart/index'

export default createStore({
  modules: {
    user,
    cart
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCounter(state,payload){
      payload.count++
    },
    addToCart(state, payload){
      payload.checked = false
      state.cartList.push(payload)
    },
    checkClick(state, payload){
     payload.checked = ! payload.checked
     // let flag = state.cartList.find(item => item.checked === false)
     //  if ()
    }
  },
  actions: {
    addCart(context, payload){
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldProduct){
          context.commit('addCounter',oldProduct)
        }else{
          payload.count = 1
          context.commit('addToCart',payload)
        }
      }
  },
  modules: {

  },
  getters: {
    cartList(state) {
      return state.cartList
    },
    cartCount(state, getters) {
      return getters.cartList.length
    }
  }
})

export default store

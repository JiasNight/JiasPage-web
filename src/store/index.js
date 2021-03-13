import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '' || localStorage.getItem('userName')
  },
  getters: {
    userName: (state) => state.userName
  },
  mutations: {
    saveUserName: (state, userName) => {
      state.userName = userName
      // 把登录的用户的名保存到localStorage中
      localStorage.setItem('userName', userName)
    }
  },
  actions: {
  },
  modules: {
  }
})

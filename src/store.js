import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    count:{},
    showname:true,
    dingUrl: '',
    userInfo: {},
    user_name: '' || localStorage.getItem('user_name')
  },
  mutations: {
    login(state) {
      state.isLogin = true
    },
    
    logout(state) {
      state.isLogin = false
    },
    changeUrl(state, url) {
      state.dingUrl = url;
    },
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
    handleUserName: (state, user_name) => {
      state.user_name = user_name
          // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      localStorage.setItem('user_name', user_name)
  }

  },
  actions: {

  },
  getters:{
    userName: (state) => state.user_name
  }
})
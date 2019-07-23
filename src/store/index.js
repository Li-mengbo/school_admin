import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import navList from './modules/navList'
import getters from './getter'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login,
    navList
  },
  getters
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import navList from './modules/navList'
import indexData from './modules/index'
import getters from './getter'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login,
    navList,
    indexData
  },
  getters
})

export default store

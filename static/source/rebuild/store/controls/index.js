/**
 * @name: controls
 * @description: 主表控件
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './states'
import mutations from './mutations'

Vue.use(Vuex)

export default {
  namespaced: true,
  state,
  mutations
}

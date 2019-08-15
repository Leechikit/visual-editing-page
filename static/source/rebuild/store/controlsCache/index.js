/**
 * @name: controlCache
 * @description: 新建表单时控件值的缓存
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

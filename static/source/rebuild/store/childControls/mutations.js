import Vue from 'vue'

export default {
  // 设置子表控件
  setChildControls(
    state,
    { datafield, objectId, list, moduleExpand = true, childExpand = true }
  ) {
    if (!state.childMap[datafield]) {
      Vue.set(state.childMap, datafield, {})
    }
    if (!state.childMap[`${datafield}.expand`]) {
      Vue.set(state.childMap, `${datafield}.expand`, {})
      Vue.set(state.childMap[`${datafield}.expand`], 'module', moduleExpand)
    }
    !!list.length &&
      list.forEach((control, index) => {
        control.objectId = objectId
        let _id = `flag0000${index}`
        if (!control.datafield) {
          control.datafield = _id
        }
      })
    Vue.set(state.childMap[datafield], objectId, list)
    Vue.set(state.childMap[`${datafield}.expand`], objectId, childExpand)
  },
  // 设置子表条目展开收起
  setExpand(state, { datafield, objectId, isExpand }) {
    Vue.set(state.childMap[`${datafield}.expand`], objectId, isExpand)
  },
  // 移出子表某个条目的控件
  deleteChildControls(state, { datafield, objectId }) {
    Vue.delete(state.childMap[datafield], objectId)
    Vue.delete(state.childMap[`${datafield}.expand`], objectId)
  },
  // 清空子表
  emptyChildControls(state, { datafield, moduleExpand = true }) {
    if (
      state.childMap[datafield] &&
      Object.keys(state.childMap[datafield]).length > 0
    ) {
      Vue.set(state.childMap, datafield, {})
      Vue.set(state.childMap, `${datafield}.expand`, {})
      Vue.set(state.childMap[`${datafield}.expand`], 'module', moduleExpand)
    }
  },
  // 保存子表控件默认值
  setDefaultChildControls(state, { datafield, list }) {
    if (!state.defaultChildMap[datafield]) {
      Vue.set(state.defaultChildMap, datafield, {})
    }
    !!list.length &&
      list.forEach((control, index) => {
        let _id = `flag0000${index}`
        if (!control.datafield) {
          control.datafield = _id
        }
      })
    Vue.set(state.defaultChildMap, datafield, list)
  }
}

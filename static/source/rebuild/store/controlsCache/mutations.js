export default {
  // 设置表单控件值缓存
  setControlsCache(state, { appId, controls }) {
    let obj = {}
    !!controls.length &&
      controls.forEach(control => {
        if (control.datafield) {
          obj[control.datafield] = control.Value
        }
      })
    state.map[appId] = obj
  },
  // 清除表单控件值缓存
  removeControlsCache(state, { appId }) {
    if (state.map[appId] !== void 0) {
      delete state.map[appId]
    }
  }
}

import { find } from 'lodash'

export default {
  // 设置控件
  setControls(state, controls) {
    state.list = controls
    !!controls.length &&
      controls.forEach((control, index) => {
        let _id = `flag0000${index}`
        if (!control.datafield) {
          control.datafield = _id
        }
      })
  },
  // 设置计算规则
  setComputationRule(state, controlList) {
    let computationMapping = state.computationRule
    controlList.forEach(control => {
      if (control.ComputationRuleFields) {
        control.ComputationRuleFields.forEach(targetField => {
          if (!computationMapping.hasOwnProperty(targetField)) {
            computationMapping[targetField] = []
          }
          computationMapping[targetField].push(control.datafield)
        })
      }
    })
    state.computationRule = computationMapping
  },
  // 设置隐藏规则
  setDisplayRule(state, controlList) {
    let displayMapping = state.displayRule
    controlList.forEach(control => {
      if (control.DisplayRuleFields) {
        control.DisplayRuleFields.forEach(targetField => {
          if (!displayMapping.hasOwnProperty(targetField)) {
            displayMapping[targetField] = []
          }
          displayMapping[targetField].push(control.datafield)
        })
      }
    })
    state.displayRule = displayMapping
  },
  // 设置控件的值
  setControlsValue(state, controlValueMap) {
    for (let datafield in controlValueMap) {
      const control = find(state.list, { datafield })
      if (control) {
        control.Value = controlValueMap[datafield]
      }
    }
  }
}

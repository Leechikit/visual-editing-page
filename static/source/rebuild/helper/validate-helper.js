import { checkVisible } from '@/rebuild/helper/control-helper'

export function validateForm(controls, parentControl) {
  // 子表节点不显示，则子表内的控件无需判断
  if (parentControl && checkVisibleHandle(parentControl) === false) {
    return true
  }
  return controls.every(control => {
    if (
      control.Required &&
      typeof control.getValue === 'function' &&
      checkVisibleHandle(control) === true
    ) {
      const value = control.getValue()
      if (!value || (value instanceof Array && value.length === 0)) {
        // 增加提示
        console.log(`请填写${control.DisplayName}`)
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  })
}

function checkVisibleHandle(control) {
  let rule = control.DisplayRule
  if (!rule) {
    return true
  }
  return checkVisible(rule)
}

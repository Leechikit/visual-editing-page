import { findIndex, find } from 'lodash'
import controls from '@/rebuild/store/controls'
import childControls from '@/rebuild/store/childControls'
import mathFunctions from '@/rebuild/helper/math-helper'
import { numberToFixed } from '@/rebuild/helper/number-helper'

// eslint-disable-next-line no-extend-native
Array.prototype.forEachAsync = async function(fn) {
  for (let t of this) {
    await fn(t)
  }
}

const getRuleValue = async function(rule, objectId) {
  let re = /{(.*?)}/g
  let newArray = []
  let temp = []
  while ((temp = re.exec(rule)) !== null) {
    newArray.push(temp[1])
  }
  let fields = newArray
  var startIndex = 0
  let ruleTemp = rule
  while (ruleTemp.indexOf('$.fn.', startIndex) > -1) {
    var fnIndex = ruleTemp.indexOf('$.fn.', startIndex)
    // 截取fnIndex到rightBracket之间的字符串为函数体
    // 先把函数计算出来，再替换到表达式中
    ruleTemp = ruleTemp.replace('$.fn.', 'mathFunctions.')
    startIndex = fnIndex + 1
  }
  fields.forEach(field => {
    // 隐藏条件 组织机构
    ruleTemp = ruleTemp.replace(/[uo]\((.+)\)/, '"$1"')
    // 规则字段在主表
    if (field.indexOf('.') < 0) {
      let replaceField = `{${field}}`
      let reg = new RegExp(replaceField, 'g')
      let controlValue = getControlValue(controls.state.list, field)
      if (controlValue < 0) {
        controlValue = '(' + controlValue + ')'
      }
      ruleTemp = ruleTemp.replace(reg, controlValue)
      // 规则字段在子表
    } else {
      let replaceField = `{${field}}`
      let objectIdMap = childControls.state.childMap[field.split('.')[0]]
      let reg = new RegExp(replaceField, 'g')
      let content = ''
      // 相同子表，提供object
      if (objectId) {
        let controlValue = getControlValue(objectIdMap[objectId], field)
        if (controlValue < 0) {
          controlValue = '(' + controlValue + ')'
        }
        ruleTemp = ruleTemp.replace(reg, controlValue)
        // 不同子表
      } else {
        for (const objectId in objectIdMap) {
          let controlValue = getControlValue(objectIdMap[objectId], field)
          content += `,${controlValue}`
        }
        ruleTemp = ruleTemp.replace(reg, content.slice(1))
      }
    }
  })
  /* eslint-disable no-new-func */
  try {
    let fn = new Function(
      'mathFunctions',
      `
    if(${ruleTemp}!==null&&${ruleTemp}!==undefined){ return ${ruleTemp}}
  `
    )
    return await fn(mathFunctions)
  } catch (error) {
    console.error(error)
    console.log(`计算公式为:${ruleTemp}`)
  }
}

function getControlValue(list, field) {
  let index = findIndex(list, {
    datafield: field
  })
  let control = list[index]
  // 控件不可见时不获取他的默认值
  if (control.Visible === false) {
    return 0
  }
  let value = isNaN(+control.Value) ? `"${control.Value}"` : +control.Value
  // 人员单选和多选、创建人
  if (
    control.controlkey === 'FormUser' ||
    control.controlkey === 'FormMultiUser' ||
    control.controlkey === 'CreatedBy'
  ) {
    value = []
    if (control.Value instanceof Array && control.Value.length > 0) {
      control.Value.forEach(item => {
        value.push(`"${item.id}"`)
      })
    } else {
      value.push('null')
    }
  } else if (control.controlkey === 'FormCheckbox') {
    value = value === '"true"'
  }
  return value
}

export async function checkVisible(rule) {
  if (!rule) {
    return true
  }
  return !(await getRuleValue(rule))
}

export async function getComputationValue(rule, objectId) {
  if (!rule) {
    return 0
  }
  return await getRuleValue(rule, objectId)
}

/**
 * 触发计算公式并设置值
 *
 * @param: {Object} control 当前控件对象
 */
export function triggerComputationRule(control) {
  const TriggerComputationRuleFields =
    controls.state.computationRule[control.datafield]
  if (TriggerComputationRuleFields) {
    TriggerComputationRuleFields.forEachAsync(async field => {
      // 主表控件配置的计算公式
      if (field.indexOf('.') < 0) {
        let _targetControl = find(controls.state.list, { datafield: field })
        if (_targetControl) {
          let _targetValue = await getComputationValue(
            _targetControl.ComputationRule
          )
          if (_targetControl.decimalplaces) {
            _targetControl.Value = numberToFixed(
              _targetValue,
              _targetControl.decimalplaces
            )
          } else {
            _targetControl.Value = _targetValue
          }
        }
        // 子表控件配置的计算公式
      } else {
        const currentDatafield = control.datafield.split('.')[0]
        const targetDatafield = field.split('.')[0]
        // 当前控件为相同子表
        if (
          control.isChildControls === true &&
          currentDatafield === targetDatafield
        ) {
          const targetControlList =
            childControls.state.childMap[targetDatafield][control.objectId]
          const targetControl = find(targetControlList, { datafield: field })
          if (targetControl) {
            let targetValue = await getComputationValue(
              targetControl.ComputationRule,
              control.objectId
            )
            if (targetControl.decimalplaces) {
              targetControl.Value = numberToFixed(
                targetValue,
                targetControl.decimalplaces
              )
            } else {
              targetControl.Value = targetValue
            }
          }
          // 当前控件为不同子表或主表
        } else {
          const targetChildMap = childControls.state.childMap[targetDatafield]
          for (const objectId in targetChildMap) {
            targetChildMap[objectId].forEachAsync(async control => {
              if (control.datafield === field) {
                let _targetValue = await getComputationValue(
                  control.ComputationRule
                )

                if (control.decimalplaces) {
                  control.Value = numberToFixed(
                    _targetValue,
                    control.decimalplaces
                  )
                } else {
                  control.Value = _targetValue
                }
              }
            })
          }
        }
      }
    })
  }
}
/**
 * 设置默认值
 *
 * @param: {Object} control 当前控件对象
 */
export async function setDefaultValue(control) {
  if (control.ComputationRule && control.Value === null) {
    let value = await getComputationValue(control.ComputationRule)
    control.Value = value
  }
}

/**
 * 触发隐藏条件
 *
 * @param: {Object} control 当前控件对象
 */
export function triggerDisplayRule(control) {
  const TriggerDisplayRuleFields = controls.state.displayRule[control.datafield]
  if (TriggerDisplayRuleFields) {
    TriggerDisplayRuleFields.forEachAsync(async field => {
      // 主表控件配置的计算公式
      if (field.indexOf('.') < 0) {
        let _targetControl = find(controls.state.list, { datafield: field })
        if (_targetControl) {
          let result = await checkVisible(_targetControl.DisplayRule)
          _targetControl.isDisplay = result
          if (result === false) {
            let _targetValue = await getComputationValue(
              _targetControl.ComputationRule
            )
            _targetControl.Value = _targetValue
          }
        }
        // 子表控件配置的计算公式
      } else {
        const targetDatafield = field.split('.')[0]
        const targetChildMap = childControls.state.childMap[targetDatafield]
        for (const objectId in targetChildMap) {
          targetChildMap[objectId].forEachAsync(async control => {
            if (control.datafield === field) {
              let result = await checkVisible(control.DisplayRule)
              control.isDisplay = result
              if (result === false) {
                let _targetValue = await getComputationValue(
                  control.ComputationRule
                )
                control.Value = _targetValue
              }
            }
          })
        }
      }
    })
  }
}

/**
 * 设置默认显示状态
 *
 * @param: {Object} control 当前控件对象
 */
export async function setDefaultDisplay(control) {
  if (control.DisplayRule) {
    let result = await checkVisible(control.DisplayRule)
    control.isDisplay = result
  }
}

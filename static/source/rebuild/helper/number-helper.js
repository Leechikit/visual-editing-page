let isNumber = function(str) {
  return !isNaN(parseFloat(str))
}
export { isNumber }

// 默认的toFixed会四舍五入
export function numberToFixed(vStr, decimalplaces) {
  let v
  if (isNumber(vStr)) {
    vStr += ''
    if (isNumber(decimalplaces)) {
      if (~vStr.indexOf('.')) {
        let decimalLength = vStr.split('.')[1].length

        if (decimalLength <= decimalplaces) {
          v = parseFloat(vStr).toFixed(decimalplaces)
        } else {
          let integer = vStr.split('.')[0]
          let decimal = vStr.split('.')[1] || ''
          let num = decimal[decimalplaces]
          decimal = decimal.substring(0, parseInt(decimalplaces))

          if (parseInt(num) >= 5) {
            if (decimalplaces === '0') {
              if (integer.indexOf('-') >= 0) {
                integer = parseInt(integer) - 1 + ''
              } else {
                integer = parseInt(integer) + 1 + ''
              }
            } else {
              decimal = parseInt(decimal) + 1 + ''
              if (decimal.length === parseInt(decimalplaces) + 1) {
                decimal = decimal.substring(1, decimal.length)
                if (integer.indexOf('-') >= 0) {
                  integer = parseInt(integer) - 1 + ''
                } else {
                  integer = parseInt(integer) + 1 + ''
                }
              }
            }
          }
          if (decimal === '') {
            v = integer
          } else {
            v = integer + '.' + decimal
          }
        }
      } else {
        v = parseFloat(vStr).toFixed(decimalplaces)
      }
    }
  }
  return v
}

export function numberToKbit(num) {
  let temp = num
  num = (num || 0).toString()
  let result = ''
  if (isNaN(num)) return 0
  let numStr = num + ''
  let potIndex = numStr.indexOf('.')
  let decimal = ''
  if (potIndex > -1) {
    num = numStr.slice(0, potIndex)
    decimal = numStr.slice(potIndex)
  }
  num = parseInt(num)
  let negative = false
  if (parseFloat(temp) < 0) {
    negative = true
    num = Math.abs(num) + ''
  }
  num += ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  if (potIndex > -1) {
    result += decimal
  }
  if (negative) {
    result = '-' + result
  }
  return result
}

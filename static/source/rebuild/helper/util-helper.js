/**
 * @name: util-hepler
 * @description: 工具方法
 */
/**
 * 获取字符串长度，中文占2个字符，英文占1个字符
 *
 * @param: {String} str 字符串
 * @return: {Number} 字符长度
 */
export function getStrLength(str) {
  let result = 0
  for (let i = 0, len = str.length; i < len; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      result += 2
    } else {
      result++
    }
  }
  return result
}

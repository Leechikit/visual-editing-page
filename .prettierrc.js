module.exports = {
  printWidth: 80, // 一行最大字符量，超过换行
  tabWidth: 2, // tab 缩进大小,默认为 2
  useTabs: false, // 使用 tab 缩进，默认 false
  singleQuote: true, // 使用单引号, 默认 false(在 jsx 中配置无效, 默认都是双引号)
  semi: false, // 不使用分号, 默认 true
  trailingComma: 'none', // 无尾逗号,默认 none,可选 none|es5|all
  bracketSpacing: true, // 对象中的空格 默认 true
  jsxBracketSameLine: true, // JSX 标签闭合位置 默认 false
  arrowParens: 'avoid' // 箭头函数参数括号能省略括号的时候就省略 默认 avoid 可选 avoid| always
}
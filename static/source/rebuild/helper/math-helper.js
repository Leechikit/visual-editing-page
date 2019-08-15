/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-empty */
import HTTP from '@/rebuild/api/form.js'

let CalcEval = function() {}
CalcEval.prototype.eval = function(str) {
  let result = this.evalRecursion(str)
  if (typeof result === 'string') {
    result = result.replace(/"/g, '')
  }
  return result
}

CalcEval.prototype.evalRecursion = function(str) {
  // console.log("a:"+str)
  let isRetStr = str.match(new RegExp(/^".+"$/g)) != null
  if (isRetStr == true) {
    str = str.replace(/^"|"$/g, '')
  }
  let bracketsList = this.matchOutBrackets(str)
  for (let i = 0; i < bracketsList.length; i++) {
    let newCalc = bracketsList[i]
    let calcStr = this.evalRecursion(newCalc.str.replace(/^\(|\)$/g, ''))
    str = str.replace(newCalc.str, calcStr)
  }
  let errorObj = new Array()
  let tIndex = new Date().getTime()

  // console.log("b:"+str);

  // 除
  // eslint-disable-next-line no-constant-condition
  while (1) {
    let multObj = this.matchExp(str, '/')
    if (multObj == null) {
      break
    }
    let v = this.executeDivi(multObj.firstValue, multObj.secondValue)
    if (v == 'NaN') {
      let t = 'T' + tIndex++
      errorObj.push({
        Name: t,
        Exp: multObj.str
      })
      str = str.replace(multObj.str, t)
    } else {
      str = str.replace(multObj.str, v)
    }
  }

  // console.log("c:"+str);

  // 乘
  // eslint-disable-next-line no-constant-condition
  while (1) {
    let multObj = this.matchExp(str, '*')
    if (multObj == null) {
      break
    }
    let v = this.executeMult(multObj.firstValue, multObj.secondValue)

    if (v == 'NaN') {
      let t = 'T' + tIndex++
      errorObj.push({
        Name: t,
        Exp: multObj.str
      })
      str = str.replace(multObj.str, t)
    } else {
      // str = str.replace(multObj.firstValue+"*"+multObj.secondValue, v)
      str = str.replace(multObj.str, v)
    }
    // console.log("d:"+str);
  }

  // 加
  // eslint-disable-next-line no-constant-condition
  while (1) {
    let multObj = this.matchExp(str, '+')
    if (multObj == null) {
      break
    }
    let v = this.executeAddi(multObj.firstValue, multObj.secondValue)
    if (v == 'NaN' || isNaN(v)) {
      let t = 'T' + tIndex++
      errorObj.push({
        Name: t,
        Exp: multObj.str
      })
      str = str.replace(multObj.str, t)
    } else {
      str = str.replace(multObj.str, v)
    }
  }

  // console.log("e:"+str);

  // 减
  // eslint-disable-next-line no-constant-condition
  while (1) {
    let multObj = this.matchExp(str, '-')
    if (multObj == null) {
      break
    }
    let v = this.executeSubt(multObj.firstValue, multObj.secondValue)
    if (v == 'NaN') {
      let t = 'T' + tIndex++
      errorObj.push({
        Name: t,
        Exp: multObj.str
      })
      str = str.replace(multObj.str, t)
    } else {
      str = str.replace(multObj.str, v)
    }
  }
  for (let i = errorObj.length - 1; i >= 0; i--) {
    let ex = errorObj[i]
    str = str.replace(ex.Name, ex.Exp)
  }

  // 连等
  // eslint-disable-next-line no-constant-condition
  while (1) {
    // let multObj = str.match(/\d*={2,3}\d*/g);
    let multObj = str.match(/\S*={2,3}\S*/g)
    if (multObj == null) {
      break
    }
    let replaceTemp = multObj[0]
    if (multObj[0].indexOf('"=="') > 0 || multObj[0].indexOf('"==="') > 0) {
      replaceTemp = '"' + replaceTemp + '"'
    }
    let v = eval(replaceTemp)
    str = str.replace(multObj[0], v)
  }

  // console.log("f:"+str);

  if (isRetStr == true) {
    try {
      return eval('"' + str + '"')
    } catch (e) {}
    try {
      return eval(str)
    } catch (e) {}
    return str
  }
  if (str.match(/(^true$)|(^false$)/g)) {
    return str === 'true'
  }
  if (!isNaN(Number(str))) {
    return Number(str)
  }
  try {
    let evalTemp = eval(str)
    if (typeof evalTemp === 'string') {
      evalTemp = '"' + eval(str) + '"'
    }
    return evalTemp
  } catch (e) {}
  return str
}
CalcEval.prototype.matchOutBrackets = function(f) {
  let h = new Array()
  if (f == null) {
    return h
  }
  if (typeof f !== 'string') {
    f = f + ''
  }
  let d = f.split('')
  let a = 0
  let g = false
  let b = -1
  for (let c = 0; c < d.length; c++) {
    if (d[c] == '(') {
      a++
      g = true
      if (b == -1) {
        b = c
      }
    }
    if (d[c] == ')') {
      a--
    }
    if (g == true && a == 0) {
      let e = new Object()
      e.str = f.substring(b, c + 1)
      e.firstIndex = b
      e.lastIndex = c + 1
      h.push(e)
      b = -1
      g = false
      a = 0
    }
  }
  return h
}
CalcEval.prototype.matchExp = function(l, f) {
  let j = null
  if (l == null) {
    return null
  }
  if (typeof l !== 'string') {
    l = l + ''
  }
  let k = l.split('')
  let c = 0
  let b = 0
  let g = ''
  let e = ''
  let a = ''
  let d = false
  for (let h = 0; h <= k.length; h++) {
    if (
      k[h] == '+' ||
      k[h] == '-' ||
      k[h] == '*' ||
      k[h] == '/' ||
      k[h] == '%' ||
      h == k.length
    ) {
      if (a == '' && k[h] == '-') {
        a += k[h]
        continue
      }
      if (d == true) {
        e = a
        b = h
        j = new Object()
        j.firstIndex = c
        j.secondIndex = b
        // j.str = l.substring(c, b);
        j.str = g + f + e
        j.firstValue = Number(g)
        j.secondValue = Number(e)
        break
      }
      if (k[h] == null) {
        break
      }
      if (k[h] == f) {
        d = true
        g = a
        a = ''
      } else {
        a = ''
        c = -1
      }
    } else {
      a += k[h]
      if (c == -1) {
        c = h
      }
    }
  }
  return j
}
CalcEval.prototype.executeAddi = function(arg1, arg2) {
  let r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return this.numToString(
    (this.evalRecursion(arg1 + '*' + m) + this.evalRecursion(arg2 + '*' + m)) /
      m
  )
}
CalcEval.prototype.executeSubt = function(arg1, arg2) {
  let r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  n = r1 >= r2 ? r1 : r2

  return this.numToString(
    (
      (this.evalRecursion(arg1 + '*' + m) -
        this.evalRecursion(arg2 + '*' + m)) /
      m
    ).toFixed(n)
  )
}
CalcEval.prototype.executeMult = function(arg1, arg2) {
  let a = 0,
    f = arg1.toString(),
    c = arg2.toString()
  try {
    a += f.split('.')[1].length
  } catch (g) {}
  try {
    a += c.split('.')[1].length
  } catch (g) {}

  return this.numToString(
    (Number(f.replace('.', '')) * Number(c.replace('.', ''))) / Math.pow(10, a)
  )
}
CalcEval.prototype.executeDivi = function(arg1, arg2) {
  let t1 = 0,
    t2 = 0,
    r1,
    r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))

  return this.executeMult(
    this.numToString(r1 / r2),
    Math.pow(10, t2 - t1).toString
  )
  // return this.executeMult(r1 / r2, pow(10, t2 - t1))
}

CalcEval.prototype.numToString = function(n) {
  let d, l, r, len, lArr
  if (typeof n === 'number') {
    d = n.toString()
    if (d.indexOf('e') != -1) {
      // l: 1234564120000.0000000
      l = d.split('e')[0] //    1.23456412e+20   1.23456412e-20
      // +20
      r = d.split('e')[1] // 1.23456412e+20   1.23456412e-20
      // 20
      len = parseInt(r.substring(2, r.length - 1))
      // +20
      if (r.indexOf('+') != -1) {
        // 1.2345.6412000000000000000000000000
        l = l + '00000000000000000000000000000000000000'

        // 1          2345664120000000
        lArr = l.split('.')
        // 12345664120000000000000
        l = lArr[0] + lArr[1].substring(0, len)
        return l
      } else if (l.indexOf('-') != 1) {
        // 000000000000000001.23456412e+20
        l = '00000000000000000000000000000000000000' + l
        // 000000000000000001    23456412e+20
        lArr = l.split('.')
        //
        let str =
          lArr[0].substring(lArr[0].length - len, lArr[0].length) + lArr[1]
        l = '0.' + str
        return l
      }
    } else {
      return n.toString()
    }
  } else {
    return n
  }
}
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) {
  //author: meizz
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  }
  return fmt
}
export default {
  // SUM(a,b,...),求和
  SUM: function() {
    let str = ''
    for (let i = 0; i < arguments.length; i++) {
      if (arguments[i] != '' && !isNaN(arguments[i])) {
        str += arguments[i] + '+'
      }
    }
    str = str.substring(0, str.length - 1)
    if (str == '') {
      return 0
    }
    let cal = new CalcEval()
    return cal.eval(str)
  },
  // MAX(a,b,c,...),求最大值
  MAX: function() {
    let max = arguments[0]
    for (let i = 0; i < arguments.length; i++) {
      if (max < arguments[i]) {
        max = arguments[i]
      }
    }
    return max
  },
  // MIN(a,b,...),求最小值
  MIN: function() {
    let min = arguments[0]
    for (let i = 0; i < arguments.length; i++) {
      if (min > arguments[i]) {
        min = arguments[i]
      }
    }
    return min
  },
  // ABS(a),求绝对值
  ABS: function() {
    let abs = 0
    if (!isNaN(arguments[0])) {
      abs = Math.abs(Number(arguments[0]))
    }
    return Number(abs)
  },
  // AVG(a,b,...),求平均值
  AVG: function() {
    let length = 0
    let str = ''
    for (let i = 0, len = arguments.length; i < len; i++) {
      if (!isNaN(arguments[i])) {
        // sum += Number(arguments[i]);
        str += arguments[i] + '+'
        length++
      }
    }
    if (length == 0) {
      return 0
    }
    str = str.substring(0, str.length - 1)
    if (str == '') {
      return 0
    }
    str = '(' + str + ')/' + length
    let cal = new CalcEval()
    return cal.eval(str)
  },
  // SIN(a)//参数是角度
  SIN: function() {
    let sin = 0
    let arg = arguments[0]
    if (!isNaN(arg)) {
      sin = Math.sin((Number(arg) * 2 * Math.PI) / 360)
    }
    return Number(sin)
  },
  // COS(a)//参数是角度
  COS: function() {
    let cos = 0
    let arg = arguments[0]
    if (!isNaN(arg)) {
      cos = Math.cos((Number(arg) * 2 * Math.PI) / 360)
    }
    return Number(cos)
  },
  // PI()
  PI: function() {
    return Number(Math.PI)
  },
  // ROUND(a,b) 四舍五入到制定位数
  ROUND: function() {
    let target = arguments[0]
    let accuracy = arguments[1]

    if (isNaN(target) || isNaN(accuracy)) {
      return 0
    }
    return Number(Number(target).toFixed(Number(accuracy)))
  },
  // SQRT(a)
  SQRT: function() {
    let sqrt = 0
    if (!isNaN(arguments[0])) {
      sqrt = Math.sqrt(Number(arguments[0]))
    }
    return Number(sqrt)
  },
  // NOW(),当前时间
  NOW: function() {
    return new Date().Format('yyyy-MM-dd hh:mm:ss')
  },
  // YEAR(date),返回日期年份()
  YEAR: function() {
    let year = 1900
    if (arguments.length < 1) {
      return year
    }
    let date = arguments[0]
    if (!date) {
      return -1
    }
    // Error要处理data格式
    date = date.toString().replace(/-/g, '/')
    let d = new Date(date)
    year = d.getFullYear()
    return Number(year)
  },
  // YEARS(endDate,startDate)返回两个日期之间年份差
  YEARS: function() {
    let end = arguments[0]
    let start = arguments[1]
    let second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      year = day * 365
    if (!end || !start) {
      return 0
    }
    end = end.toString().replace(/-/g, '/')
    start = start.toString().replace(/-/g, '/')
    let dateEnd = new Date(end)
    let dateStart = new Date(start)
    let diff = dateEnd - dateStart
    // if (isNaN(diff)) return NaN;
    if (isNaN(diff)) return 0
    return Number((diff / year).toFixed(2))
  },
  // QUARTER(date),返回日期季度
  QUARTER: function() {
    let quarter = 1
    if (arguments.length < 1) {
      return quarter
    }
    let date = arguments[0]
    if (!date) {
      return -1
    }
    date = date.toString().replace(/-/g, '/')
    let d = new Date(date)
    // quarter = parseInt((d.getMonth() + 2) / 4) + 1;
    let curMonth = d.getMonth() + 1
    if (curMonth >= 1 && curMonth <= 3) {
      return 1
    } else if (curMonth > 3 && curMonth <= 6) {
      return 2
    } else if (curMonth > 6 && curMonth <= 9) {
      return 3
    } else if (curMonth > 9 && curMonth <= 12) {
      return 4
    } else {
      return null
    }
    // return Number(quarter);
  },
  // MONTH(date),返回日期月份
  MONTH: function() {
    let month = 1
    if (arguments.length < 1) {
      return month
    }
    let date = arguments[0]
    if (!date) {
      return -1
    }
    date = date.toString().replace(/-/g, '/')
    let d = new Date(date)
    month = d.getMonth() + 1
    return Number(month)
  },
  // DAY(date),返回日期天
  DAY: function() {
    let day = 1
    if (arguments.length < 1) {
      return day
    }
    let date = arguments[0]
    if (!date) {
      return -1
    }
    date = date.toString().replace(/-/g, '/')
    let d = new Date(date)
    day = d.getDate()
    return Number(day)
  },
  // HOUR(time),返回时间中小时部分
  HOUR: function() {
    let hour = 0
    if (arguments.length < 1) {
      return hour
    }
    let date = arguments[0]
    if (!date) {
      return -1
    }
    date = date.toString().replace(/-/g, '/')
    if (date.trim().length <= 5 && date.indexOf(':') > 0) {
      return Number(date.trim().split(':')[0])
    }
    let d = new Date(date)
    hour = d.getHours()
    return Number(hour)
  },
  // MINUTE(time),返回时间中分钟部分
  MINUTE: function() {
    let minute = 0
    if (arguments.length < 1) {
      return minute
    }
    let date = arguments[0]
    if (!date) {
      return -1
    }
    date = date.toString().replace(/-/g, '/')
    if (date.trim().length <= 5 && date.indexOf(':') > 0) {
      return Number(date.trim().split(':')[1])
    }
    let d = new Date(date)
    minute = d.getMinutes()
    return Number(minute)
  },
  // SECOND(time),返回时间中秒部分
  SECOND: function() {
    let second = 0
    if (arguments.length < 1) {
      return second
    }
    let date = arguments[0]
    if (!date) {
      return -1
    }
    date = date.toString().replace(/-/g, '/')
    let d = new Date(date)
    second = d.getSeconds()
    return Number(second)
  },
  // TODAY(),返回当前日期
  TODAY: function() {
    return new Date().Format('yyyy-MM-dd')
  },
  // WEEKDAY(date),返回指定日期为星期几
  WEEKDAY: function() {
    let weekday = 0
    if (arguments[0].length == 0) {
      return weekday
    }
    let date = arguments[0]
    if (!date) {
      return -1
    }
    date = date.toString().replace(/-/g, '/')
    date = new Date(date)
    weekday = date.getDay()
    return weekday
  },
  // WEEKNUM(date),返回指定日期是一年中第几周
  WEEKNUM: function() {
    let weeknum = 0
    if (arguments[0].length == 0) {
      return weeknum
    }
    let date = arguments[0]
    if (!date) {
      return -1
    }
    date = date.toString().replace(/-/g, '/')
    date = new Date(date)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()

    let today = new Date(year, month, day)
    let firstDayOfYear = new Date(year, 0, 1)
    let days =
      (today.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24)

    let firstWeekDay = firstDayOfYear.getDay() // 第一天星期几
    weeknum = Math.ceil(Number(days - (6 - firstWeekDay)) / 7)
    return weeknum + 1
  },
  // DATE(year,month,day,[hour,minute,second]),将年月日时分秒转成日期对象
  DATE: function() {
    let date = null
    if (arguments.length != 3 && arguments.length != 6) {
      return date
    }
    let y = arguments[0]
    if (!y) {
      return null
    }
    let m = arguments[1] ? arguments[1] : 0
    let d = arguments[2] ? arguments[2] : 0
    let h = arguments[3] ? arguments[3] : 0
    let mm = arguments[4] ? arguments[4] : 0
    let s = arguments[5] ? arguments[5] : 0
    date = new Date(y, m - 1, d, h, mm, s)
    if (arguments.length == 3) {
      return date.Format('yyyy-MM-dd')
    } else if (arguments.length == 6) {
      return date.Format('yyyy-MM-dd hh:mm:ss')
    }
  },
  // 转换日期格式为yyyy-mm-dd hh:m:ss
  CONVERTTIME: function(time) {
    time = time.toString().replace(/-/g, '/')
    return new Date(time).Format('yyyy-MM-dd hh:mm:ss')
  },
  // ADDYEAR(date,years),将指定日期加减指定年数
  ADDYEAR: function() {
    let date = arguments[0]
    if (date == void 0 || date == '') {
      return void 0
    }
    let flag = false
    if (date.length <= 10) {
      flag = true
    }
    date = date.toString().replace(/-/g, '/')
    date = new Date(date)
    let newDate = new Date(
      date.setYear(date.getFullYear() + parseInt(arguments[1]))
    )
    if (flag) {
      newDate = new Date(newDate).Format('yyyy-MM-dd')
    } else {
      newDate = new Date(newDate).Format('yyyy-MM-dd hh:mm')
    }
    return newDate
  },
  // ADDMONTH(date,months),将指定日期加减指定月数
  ADDMONTH: function() {
    let date = arguments[0]
    if (date == void 0 || date == '') {
      return void 0
    }
    let flag = false
    if (date.length <= 10) {
      flag = true
    }
    date = date.toString().replace(/-/g, '/')
    date = new Date(date)
    let newDate = new Date(
      date.setMonth(date.getMonth() + parseInt(arguments[1]))
    )
    if (flag) {
      newDate = new Date(newDate).Format('yyyy-MM-dd')
    } else {
      newDate = new Date(newDate).Format('yyyy-MM-dd hh:mm')
    }
    return newDate
  },
  // ADDDAY(date,days),将指定日期加减指定天数
  ADDDAY: function() {
    let date = arguments[0]
    let days = arguments[1]
    if (date == void 0 || date == '') {
      return void 0
    }
    // Error,建议用正则表达式匹配
    let flag = false // 标识是否只是日期格式yyyy-mm-dd
    if (date.length <= 10) {
      flag = true
    }
    date = date.toString().replace(/-/g, '/')

    date = new Date(date)
    let newDate = new Date(date.setDate(date.getDate() + parseInt(days)))
    if (flag) {
      newDate = new Date(newDate).Format('yyyy-MM-dd')
    } else {
      newDate = new Date(newDate).Format('yyyy-MM-dd hh:mm')
    }
    return newDate
  },
  // DAYS(end,start) 两个日期之间天数
  DAYS: function() {
    let end = arguments[0]
    let start = arguments[1]
    if (end == void 0 || start == void 0) {
      return 0
    }
    let second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24
    end = end.toString().replace(/-/g, '/')
    start = start.toString().replace(/-/g, '/')
    let dateEnd = new Date(end)
    let dateStart = new Date(start)
    let diff = dateEnd - dateStart
    // if (isNaN(diff)) return NaN;
    if (isNaN(diff)) return 0
    return Number((diff / day).toFixed(2))
  },
  // DAY8S(end,start) 两个日期之间天数,一天八小时工作制
  DAY8S: function() {
    let end = arguments[0]
    let start = arguments[1]
    if (end == void 0 || start == void 0) {
      return 0
    }
    let second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24
    end = end.toString().replace(/-/g, '/')
    start = start.toString().replace(/-/g, '/')
    let dateEnd = new Date(end)
    let dateStart = new Date(start)
    let diff = dateEnd - dateStart
    if (diff / hour > 24) {
      if (isNaN(diff)) return 0
      return Math.ceil(diff / day) * 8
    } else {
      if (isNaN(diff)) return 0
      if (dateEnd.getDate() == dateStart.getDate()) {
        return dateEnd.getHours() - dateStart.getHours() > 8
          ? 8
          : dateEnd.getHours() - dateStart.getHours()
      } else {
        return 16
      }
    }

    // if (isNaN(diff)) return NaN;
  },
  FILTERWEEK: async function() {
    try {
      let total = 0
      let workour = 0
      let dy = 24 * 60 * 60 * 1000

      if (arguments.length >= 4) {
        let end = arguments[0] || ''
        let start = arguments[1] || ''
        var flag = arguments[2] || ''
        let endString = end.split(' ')[0]
        let startString = start.split(' ')[0]
        let endDay = new Date(endString.replace(/-/g, '/')).getTime()
        let startDay = new Date(startString.replace(/-/g, '/')).getTime()

        let dateEnd = new Date(end.replace(/-/g, '/')).getTime()
        let dateStart = new Date(start.replace(/-/g, '/')).getTime()
        if (dateStart > dateEnd) {
          return 0
        }
        for (let i = 3; i < arguments.length; i++) {
          let temp1 = arguments[i].split('-')[0]
          let temp2 = arguments[i].split('-')[1]
          let nowTime1 = new Date(
            (endString + ' ' + temp1).replace(/-/g, '/')
          ).getTime()
          let nowTime2 = new Date(
            (endString + ' ' + temp2).replace(/-/g, '/')
          ).getTime()
          workour += nowTime2 - nowTime1
        }

        if (startString == '' || endString == '') {
          return 0
        }
        let res = await HTTP.dateFilter({
          startTime: startString,
          endTime: endString
        })
        let Rounding = function(diff) {
          let hour = 60 * 60 * 1000
          let temp1, temp2
          if (flag.toLowerCase() == 'hh') {
            temp1 = (diff / hour).toString().split('.')[0]
            temp2 = (diff / hour).toString().split('.')[1]
          } else if (flag.toLowerCase() == 'dd') {
            temp1 = (diff / workour).toString().split('.')[0]
            temp2 = (diff / workour).toString().split('.')[1]
          } else {
            return 0
          }
          if (temp2) {
            if (parseFloat('0.' + temp2) > 0.5) {
              return parseInt(temp1) + 1
            } else {
              return parseFloat(temp1) + 0.5
            }
          } else {
            return temp1
          }
        }
        if (res.code != 0) {
          this.$Message.error(res.msg)
        } else {
          //在同一天
          if (endString == startString) {
            if (res.data.startTime == 0) {
              return 0
            }
            for (let i = 3; i < arguments.length; i++) {
              let obj = {}
              let temp1 = arguments[i].split('-')[0]
              let temp2 = arguments[i].split('-')[1]
              let nowTime1 = new Date(
                (endString + ' ' + temp1).replace(/-/g, '/')
              ).getTime()
              let nowTime2 = new Date(
                (endString + ' ' + temp2).replace(/-/g, '/')
              ).getTime()
              obj.start = nowTime1
              obj.end = nowTime2
              if (dateStart <= nowTime1) {
                if (dateEnd <= nowTime1) {
                  return Rounding(total)
                } else if (nowTime1 < dateEnd && dateEnd <= nowTime2) {
                  total += dateEnd - nowTime1
                  console.log(Rounding(total))
                  return Rounding(total)
                } else if (dateEnd > nowTime2) {
                  total += nowTime2 - nowTime1
                }
              } else if (nowTime1 < dateStart && dateStart <= nowTime2) {
                if (nowTime1 < dateEnd && dateEnd <= nowTime2) {
                  total += dateEnd - dateStart
                  console.log(Rounding(total))
                  return Rounding(total)
                } else if (dateEnd > nowTime2) {
                  total += nowTime2 - dateStart
                }
              } else {
                continue
              }
            }
            console.log(Rounding(total))
            return Rounding(total)
          }
          //不再同一天
          else {
            //中间没有间隔
            // eslint-disable-next-line no-empty
            if ((endDay - startDay) / dy < 2) {
            }
            //中间有间隔
            else {
              total = total + res.data.intervalDay * workour
            }
            let firstflag = true
            if (res.data.startTime === 1) {
              for (let i = 3; i < arguments.length; i++) {
                let temp1 = arguments[i].split('-')[0]
                let temp2 = arguments[i].split('-')[1]
                let startTime1 = new Date(
                  (startString + ' ' + temp1).replace(/-/g, '/')
                ).getTime()
                let startTime2 = new Date(
                  (startString + ' ' + temp2).replace(/-/g, '/')
                ).getTime()

                if (firstflag == true) {
                  if (dateStart <= startTime1) {
                    total += workour
                    break
                  } else if (
                    startTime1 < dateStart &&
                    dateStart <= startTime2
                  ) {
                    total += startTime2 - dateStart
                    firstflag = false
                    continue
                  } else if (dateStart > startTime2) {
                  }
                } else {
                  total += startTime2 - startTime1
                }
              }
            }
            if (res.data.endTime == 1) {
              for (let i = 3; i < arguments.length; i++) {
                let temp1 = arguments[i].split('-')[0]
                let temp2 = arguments[i].split('-')[1]
                let endTime1 = new Date(
                  (endString + ' ' + temp1).replace(/-/g, '/')
                ).getTime()
                let endTime2 = new Date(
                  (endString + ' ' + temp2).replace(/-/g, '/')
                ).getTime()

                if (dateEnd <= endTime1) {
                } else if (endTime1 < dateEnd && dateEnd <= endTime2) {
                  total += dateEnd - endTime1
                  continue
                } else if (dateEnd > endTime2) {
                  total += endTime2 - endTime1
                }
              }
            }

            return Rounding(total)
          }
        }
      } else {
        return 0
      }
    } catch (e) {
      console.log(e)
    } finally {
    }
  },

  INTIMESTAMP: function() {
    let total = 0
    let workour = 0
    let dy = 24 * 60 * 60 * 1000
    let Rounding = function(diff) {
      let hour = 60 * 60 * 1000
      let temp1 = (diff / hour).toString().split('.')[0]
      let temp2 = (diff / hour).toString().split('.')[1]
      if (temp2) {
        if (parseFloat('0.' + temp2) > 0.5) {
          return parseInt(temp1) + 1
        } else {
          return parseFloat(temp1) + 0.5
        }
      } else {
        return temp1
      }
    }
    if (arguments.length >= 3) {
      let end = arguments[0]
      let start = arguments[1]
      let endString = end.split(' ')[0]
      let startString = start.split(' ')[0]
      let endDay = new Date(endString.replace(/-/g, '/')).getTime()
      let startDay = new Date(startString.replace(/-/g, '/')).getTime()

      let dateEnd = new Date(end.replace(/-/g, '/')).getTime()
      let dateStart = new Date(start.replace(/-/g, '/')).getTime()
      if (dateStart > dateEnd) {
        return Rounding(total)
      }
      for (let i = 2; i < arguments.length; i++) {
        let temp1 = arguments[i].split('-')[0]
        let temp2 = arguments[i].split('-')[1]
        let nowTime1 = new Date(
          (endString + ' ' + temp1).replace(/-/g, '/')
        ).getTime()
        let nowTime2 = new Date(
          (endString + ' ' + temp2).replace(/-/g, '/')
        ).getTime()
        workour += nowTime2 - nowTime1
      }

      //在同一天
      if (endString == startString) {
        for (let i = 2; i < arguments.length; i++) {
          let obj = {}
          let temp1 = arguments[i].split('-')[0]
          let temp2 = arguments[i].split('-')[1]
          let nowTime1 = new Date(
            (endString + ' ' + temp1).replace(/-/g, '/')
          ).getTime()
          let nowTime2 = new Date(
            (endString + ' ' + temp2).replace(/-/g, '/')
          ).getTime()
          obj.start = nowTime1
          obj.end = nowTime2
          if (dateStart <= nowTime1) {
            if (dateEnd <= nowTime1) {
              return Rounding(total)
            } else if (nowTime1 < dateEnd && dateEnd <= nowTime2) {
              total += dateEnd - nowTime1
              console.log(Rounding(total))
              return Rounding(total)
            } else if (dateEnd > nowTime2) {
              total += nowTime2 - nowTime1
            }
          } else if (nowTime1 < dateStart && dateStart <= nowTime2) {
            if (nowTime1 < dateEnd && dateEnd <= nowTime2) {
              total += dateEnd - dateStart
              console.log(Rounding(total))
              return Rounding(total)
            } else if (dateEnd > nowTime2) {
              total += nowTime2 - dateStart
            }
          } else {
            continue
          }
        }
        console.log(Rounding(total))
        return Rounding(total)
      }
      //不再同一天
      else {
        //中间没有间隔
        if ((endDay - startDay) / dy < 2) {
        }
        //中间有间隔
        else {
          total = ((endDay - startDay) / dy - 1) * workour
        }
        let firstflag = true
        for (let i = 2; i < arguments.length; i++) {
          let temp1 = arguments[i].split('-')[0]
          let temp2 = arguments[i].split('-')[1]
          let startTime1 = new Date(
            (startString + ' ' + temp1).replace(/-/g, '/')
          ).getTime()
          let startTime2 = new Date(
            (startString + ' ' + temp2).replace(/-/g, '/')
          ).getTime()

          if (firstflag == true) {
            if (dateStart <= startTime1) {
              total += workour
              break
            } else if (startTime1 < dateStart && dateStart <= startTime2) {
              total += startTime2 - dateStart
              firstflag = false
              continue
            } else if (dateStart > startTime2) {
            }
          } else {
            total += startTime2 - startTime1
          }
        }
        for (let i = 2; i < arguments.length; i++) {
          let temp1 = arguments[i].split('-')[0]
          let temp2 = arguments[i].split('-')[1]
          let endTime1 = new Date(
            (endString + ' ' + temp1).replace(/-/g, '/')
          ).getTime()
          let endTime2 = new Date(
            (endString + ' ' + temp2).replace(/-/g, '/')
          ).getTime()

          if (dateEnd <= endTime1) {
          } else if (endTime1 < dateEnd && dateEnd <= endTime2) {
            total += dateEnd - endTime1
            continue
          } else if (dateEnd > endTime2) {
            total += endTime2 - endTime1
          }
        }
        return Rounding(total)
      }
    }
  },
  //HOURS(end,start) 两个日期之间小时数
  HALF: function() {
    let end = arguments[0]
    if (end.length == 10) {
      end += ' 00:00'
    }
    let reg = new RegExp(/^\d{2}:\d{2}/)
    if (reg.test(end)) {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      m = m > 9 ? m : '0' + m
      d = d > 9 ? d : '0' + d
      end = y + '-' + m + '-' + d + ' ' + end
    }
    let start = arguments[1]
    if (start.length == 10) {
      start += ' 00:00'
    }
    if (reg.test(start)) {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      m = m > 9 ? m : '0' + m
      d = d > 9 ? d : '0' + d
      start = y + '-' + m + '-' + d + ' ' + start
    }
    let second = 1000,
      minute = second * 60,
      hour = minute * 60
    ;(end = end.toString().replace(/-/g, '/')),
      (start = start.toString().replace(/-/g, '/'))
    let dateEnd = new Date(end)
    let dateStart = new Date(start)
    let diff = dateEnd - dateStart
    //if (isNaN(diff)) return NaN;
    if (isNaN(diff)) return 0

    let temp = (diff / hour).toString().split('.')
    let temp1 = temp[0]
    let temp2 = temp[1]

    if (temp2) {
      temp2 = '0.' + temp2
      if (parseFloat(temp2) <= 0.5) {
        return parseFloat(temp1) + 0.5
      } else {
        return parseInt(temp1) + 1
      }
    } else {
      return parseInt(temp1)
    }
  },

  // HOURS(end,start) 两个日期之间小时数
  HOURS: function() {
    let end = arguments[0]
    if (end.length == 10) {
      end += ' 00:00'
    }
    let reg = new RegExp(/^\d{2}:\d{2}/)
    if (reg.test(end)) {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      m = m > 9 ? m : '0' + m
      d = d > 9 ? d : '0' + d
      end = y + '-' + m + '-' + d + ' ' + end
    }
    let start = arguments[1]
    if (start.length == 10) {
      start += ' 00:00'
    }
    if (reg.test(start)) {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      m = m > 9 ? m : '0' + m
      d = d > 9 ? d : '0' + d
      start = y + '-' + m + '-' + d + ' ' + start
    }
    let second = 1000,
      minute = second * 60,
      hour = minute * 60
    end = end.toString().replace(/-/g, '/')
    start = start.toString().replace(/-/g, '/')
    let dateEnd = new Date(end)
    let dateStart = new Date(start)
    let diff = dateEnd - dateStart
    // if (isNaN(diff)) return NaN;
    if (isNaN(diff)) return 0
    return Number((diff / hour).toFixed(2))
  },
  // MINUTES(end,start) 两个日期之间分钟数
  MINUTES: function() {
    let end = arguments[0]
    if (end.length == 10) {
      end += ' 00:00'
    }
    let reg = new RegExp(/^\d{2}:\d{2}/)
    if (reg.test(end)) {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      m = m > 9 ? m : '0' + m
      d = d > 9 ? d : '0' + d
      end = y + '-' + m + '-' + d + ' ' + end
    }
    let start = arguments[1]
    if (start.length == 10) {
      start += ' 00:00'
    }
    if (reg.test(start)) {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      m = m > 9 ? m : '0' + m
      d = d > 9 ? d : '0' + d
      start = y + '-' + m + '-' + d + ' ' + start
    }
    let second = 1000,
      minute = second * 60
    end = end.toString().replace(/-/g, '/')
    start = start.toString().replace(/-/g, '/')
    let dateEnd = new Date(end)
    let dateStart = new Date(start)
    let diff = dateEnd - dateStart
    // if (isNaN(diff)) return NaN;
    if (isNaN(diff)) return 0
    return Number((diff / minute).toFixed(2))
  },
  // StartsWith(string,start) 判断字符串是否以特定字符串开始
  STARTSWITH: function() {
    let string = arguments[0]
    let starter = arguments[1]
    if (!isNaN(string)) {
      string += ''
    }
    if (!isNaN(starter)) {
      starter += ''
    }
    let str = string.substring(0, starter.length)
    return str == starter
  },
  // IsNullOrEmpty(a) 判断字符串是否为空
  ISEMPTY: function() {
    let arg = arguments[0]
    if (typeof arg === 'boolean' && !arg) {
      return true
    }
    return arg == null || arg == '' || arg == undefined
  },
  // FORMAT(a,b) 格式化字符串
  FORMAT: function() {},
  // IIF(a,b,c) 如果a成立则返回b否则返回c
  // 'IIF': function () {
  //    let condition = arguments[0];
  //    if (eval(condition)) {
  //        return arguments[1];
  //    } else {
  //        return arguments[2];
  //    }
  // },
  IF: function() {
    let condition = arguments[0]
    if (eval(condition)) {
      return arguments[1]
    } else {
      return arguments[2]
    }
  },
  CASE: function() {
    for (let i = 0; i < arguments.length - 1; i++) {
      if (i % 2 == 0 && eval(arguments[i])) {
        return arguments[i + 1]
      }
    }
  },
  NEWGUID: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },
  // COUNT(v) 统计
  COUNT: function() {
    return arguments.length
  },
  // MOD(a,b)两数相除余数
  MOD: function() {
    let mod = 0
    if (arguments.length === 0) {
      return 0
    } else if (arguments.length === 1) {
      return Number(arguments[0])
    }
    let num = Number(arguments[0])
    let div = Number(arguments[1])
    if (div == 0) {
      return mod
    }
    let r1, r2, m
    try {
      r1 = num.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = div.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = r1 > r2 ? r1 : r2
    let ret =
      ((num * Math.pow(10, m)) % (div * Math.pow(10, m))) / Math.pow(10, m)
    return ret
  },
  // INT(v),向下取整
  INT: function() {
    if (arguments.length == 0) {
      return 0
    }
    return Math.floor(Number(arguments[0]))
  },
  FLOOR: function() {},
  // trunc(number,digits),将数字截为整数或保留指定位数小数
  TRUNC: function() {
    let trunc = 0
    if (arguments.length == 0) {
      return trunc
    } else if (arguments.length < 2) {
      return arguments[0]
    }
    let number = '' + arguments[0]
    let digits = Number(arguments[1])
    let arr = number.split('.')
    let decimal = arr[1] || ''
    if (decimal.length <= digits) {
      trunc = Number(arr[0] + '.' + decimal)
    } else {
      decimal = decimal.slice(0, digits)
      trunc = Number(arr[0] + '.' + decimal)
    }
    return trunc
  },
  // IsNumber(v),判断是否是数字
  ISNUMBER: function() {
    let isNumber = false
    if (arguments.length > 0) {
      isNumber = !isNaN(arguments[0])
    }
    return isNumber
  },
  // LEFT(text,number),从左边第一个字符串开始截取制定长度的字符串
  LEFT: function() {
    let left = ''
    if (arguments.length > 0) {
      let str = arguments[0]
      let len = arguments[1] ? arguments[1] : 0
      if (Number(len) <= 0) {
        return ''
      }
      left = (str + '').slice(0, len)
    }
    return left
  },
  // LEN(text),计算字符串长度
  LENGTH: function() {
    let len = 0
    if (!arguments[0]) {
      return 0
    }
    if (arguments.length > 0) {
      len = (arguments[0] + '').length
    }
    return len
  },
  // LOWER(text),将字符串转成小写
  TOLOWER: function() {
    let lower = ''
    if (arguments.length > 0) {
      let notNum = isNaN(arguments[0])
      if (notNum) {
        lower = arguments[0].toLowerCase()
      } else {
        lower = arguments[0]
      }
    }
    return lower
  },
  // ToUpper(text),将字符串转成大写
  TOUPPER: function() {
    let upper = ''
    if (arguments.length > 0) {
      let notNum = isNaN(arguments[0])
      if (notNum) {
        upper = arguments[0].toUpperCase()
      } else {
        upper = arguments[0]
      }
    }
    return upper
  },
  // replace(oldtext,start,num,newtext),将字符串中部分字符串用另外字符串替换
  REPLACE: function() {
    let replace = ''
    if (arguments.length == 0) {
      return replace
    } else if (arguments.length < 4) {
      return arguments[0]
    }
    let oldStr = arguments[0] || ''
    oldStr += ''
    let start = parseInt(arguments[1])
    let num = parseInt(arguments[2])
    let newStr = arguments[3]
    // 如果旧字符串为空，则返回新字符串
    if (oldStr.length == 0) {
      return newStr
    }
    if (start <= 0) {
      start = 1
    }
    // 如果替换起始位置大于旧字符串长度，返回旧字符串+新字符串
    if (start > oldStr.length) {
      return oldStr + newStr
    }
    // 如果替换起始位置+替换长度>旧字符串长度,返回前部+新字符串
    if (start + num - 1 > oldStr.length) {
      let pre = oldStr.slice(0, start - 1)
      return pre + newStr
    }
    let pre = oldStr.slice(0, start - 1)
    let post = oldStr.slice(start + num - 1)
    return pre + newStr + post
  },
  // right(text,num),从字符串右边查找指定位数字符
  RIGHT: function() {
    let right = ''
    if (arguments.length == 0) {
      return right
    } else if (arguments.length < 2) {
      return arguments[0]
    }
    let text = arguments[0] || ''
    let num = Number(arguments[1])
    let len = text.length
    let start = len - num
    if (start <= 0) {
      return text
    }
    right = (text + '').slice(start)
    return right
  },
  // search(text_find,text_within,start_num),在第二个字符串中从指定位置开始查找第一个字符串
  SEARCH: function() {
    let index = 0
    if (arguments.length < 3) {
      return index
    }
    let oldStr = arguments[1] || ''
    let target = arguments[0]
    let start = Number(arguments[2])
    if (start <= 0) {
      start = 1
    }
    index = (oldStr + '').indexOf(target, start - 1)
    // index = (target + '').indexOf(oldStr, start - 1);
    return index + 1
  },
  // substitute(text,old,new,times),将字符串中旧字符串用新字符串替换
  SUBSTITUTE: function() {
    let postText = ''
    if (arguments.length >= 4) {
      // subsitute = arguments[0];
      let originalText = arguments[0] || ''
      let oldText = arguments[1] || ''
      let newText = arguments[2] || ''
      let times = arguments[3]
      originalText += ''
      if (isNaN(times)) {
        postText = originalText.replace(oldText, newText)
      } else {
        let tag = 0
        while (tag < times) {
          originalText = originalText.replace(oldText, newText)
          tag++
        }
        postText = originalText
      }
    } else {
      postText = arguments[0]
    }
    return postText
  },
  // trim(t),去掉字符首位空格
  TRIM: function() {
    let trim = ''
    if (arguments.length > 0) {
      trim = $.trim(arguments[0])
    }
    return trim
  },
  // Concatenate(a,b,c,...),拼接字符串
  CONCATENATE: function() {
    let concatenate = ''
    let arg = arguments
    for (let i = 0; i < arg.length; i++) {
      concatenate += arg[i]
    }
    return concatenate
  },
  // VALUE(t),将文本转化为数字
  VALUE: function() {
    let value = 0
    if (arguments.length > 0) {
      value = Number(arguments[0])
    }
    return value
  },
  // CONTAIN()
  CONTAINS: function() {
    let ret = false
    if (typeof arguments[0] !== 'string' || arguments.length < 2) {
      return ret
    }
    let source = arguments[0]
    let target = arguments[1]
    ret = source.indexOf(target) > -1
    return ret
  },
  // split(text,separator),分割字符串
  SPLIT: function() {
    if (arguments.length == 0) {
      return []
    }
    if (arguments.length == 1) {
      let split = []
      split.push(arguments[0])
      return split
    }
    let text = arguments[0]
    let separator = arguments[1]
    return text.split(separator)
  },
  // substring(text,start,num)
  SUBSTRING: function() {
    if (arguments.length < 3 || arguments[0] == '') {
      return null
    }
    let start = Number(arguments[1])
    let length = Number(arguments[2])
    if (start <= 0) {
      start = 1
    }
    if (length <= 0) {
      length = 0
    }
    let substring = (arguments[0] + '').slice(start - 1, start + length - 1)
    return substring
  },
  // 获取地址控件值
  GETADDRESS: function() {
    let address = ''
    if (arguments.length == 0) {
      return ''
    }
    address = arguments[0]
    if (address == '') {
      return address
    } else {
      let temp = $.parseJSON(address)
      // address = temp.Province + temp.City + temp.Town + temp.Detail;
      address = temp.adname
      if ($.trim(temp.Detail) != '') {
        if ($.trim(address) != '') {
          address += ' ' + temp.Detail
        } else {
          address = temp.Detail
        }
      }
    }
    return address
  },
  // 将数值转成大写人民币
  UPPERMONEY: function() {
    if (arguments.length == 0) {
      return ''
    }
    let money = arguments[0]
    if (isNaN(money)) {
      money = 0
    }
    money = new String(Math.round(money * 100))
    let chineseMoney = '' // 准换后的汉字金额
    let str1 = '零壹贰叁肆伍陆柒捌玖' // 汉字数字
    let str2 = '万仟佰拾亿仟佰拾万仟佰拾元角分' // 对应单位
    let len = money.length // money的字符串长度
    let ch1 // 数字的汉语读法
    let ch2 // 数字位的汉字读法
    let nZero = 0 // 用来计算连续的零值的个数
    let str3 // 指定位置的数值
    if (len > 15) {
      // 超出计算范围
      return ''
    }
    if (money == 0) {
      chineseMoney = '零元整'
      return chineseMoney
    }
    str2 = str2.substr(str2.length - len, len) // 取出对应位数的string2值
    for (let i = 0; i < len; i++) {
      str3 = parseInt(money.substr(i, 1), 10)
      if (i != len - 3 && i != len - 7 && i != len - 11 && i != len - 15) {
        if (str3 == 0) {
          ch1 = ''
          ch2 = ''
          nZero = nZero + 1
        } else if (str3 != 0 && nZero != 0) {
          ch1 = '零' + str1.substr(str3, 1)
          ch2 = str2.substr(i, 1)
          nZero = 0
        } else {
          ch1 = str1.substr(str3, 1)
          ch2 = str2.substr(i, 1)
          nZero = 0
        }
      } else {
        // 该位是万亿，亿，万，元位等关键位
        if (str3 != 0 && nZero != 0) {
          ch1 = '零' + str1.substr(str3, 1)
          ch2 = str2.substr(i, 1)
          nZero = 0
        } else if (str3 != 0 && nZero != 0) {
          ch1 = '零' + str1.substr(str3, 1)
          ch2 = str2.substr(i, 1)
          nZero = 0
        } else if (str3 != 0 && nZero == 0) {
          ch1 = str1.substr(str3, 1)
          ch2 = str2.substr(i, 1)
          nZero = 0
        } else if (str3 == 0 && nZero >= 3) {
          ch1 = ''
          ch2 = ''
          nZero = nZero + 1
        } else {
          ch1 = ''
          ch2 = str2.substr(i, 1)
          nZero = nZero + 1
        }
        if (i == len - 11 || i == len - 3) {
          // 如果该位是亿位或元位，则必须写上
          ch2 = str2.substr(i, 1)
        }
      }
      chineseMoney = chineseMoney + ch1 + ch2
    }
    if (str3 == 0) {
      // 最后一位（分）为0时，加上“整”
      chineseMoney = chineseMoney + '整'
    }
    return chineseMoney
  }
}

export function idNumberCheck (idNumber) {
  return isCardNo(idNumber) && checkProvince(idNumber) && checkBirthday(idNumber) && checkParity(idNumber)
}

let vcity = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' };

// 检查号码是否符合规范，包括长度，类型
function isCardNo (idNumber) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
  return reg.test(idNumber);
};

// 取身份证前两位,校验省份
function checkProvince (idNumber) {
	var province = idNumber.substr(0, 2);
  return vcity[province]
}

// 检查生日是否正确
function checkBirthday (idNumber) {
	var len = idNumber.length;
  // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
  if (len === 15) {
    var fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
    var arrdata = idNumber.match(fifteen);
    var year = arrdata[2];
    var month = arrdata[3];
    var day = arrdata[4];
    var birthday = new Date('19' + year + '/' + month + '/' + day);
    return verifyBirthday('19' + year, month, day, birthday);
  }

  // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
  if (len === 18) {
    var eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    var arrdata1 = idNumber.match(eighteen);
    var year1 = arrdata1[2];
    var month1 = arrdata1[3];
    var day1 = arrdata1[4];
		var birthday1 = new Date(year1 + '/' + month1 + '/' + day1);
    return verifyBirthday(year1, month1, day1, birthday1);
  }
  return false;
}

// 校验日期
function verifyBirthday (year, month, day, birthday) {
  var now = new Date();
  var nowyear = now.getFullYear();
  // 年月日是否合理
  if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
    // 判断年份的范围（3岁到100岁之间)
    var time = nowyear - year;
    if (time >= 3 && time <= 100) return true;
    return false;
  }
  return false
}

// 校验位的检测
function checkParity (idNumber) {
  // 15位转18位
  idNumber = changeFivteenToEighteen(idNumber);
  var len = idNumber.length;
  if (len === 18) {
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    var cardTemp = 0;
    var valnum = '';
    for (var i = 0; i < 17; i++) {
      cardTemp += idNumber.substr(i, 1) * arrInt[i];
    }
		valnum = arrCh[cardTemp % 11];
		console.log(valnum === idNumber.substr(17, 1))
    return valnum === idNumber.substr(17, 1);
  }
  return false;
}

// 15位转18位身份证号
function changeFivteenToEighteen (idNumber) {
  if (idNumber.length === 15) {
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
    var cardTemp = 0;
    idNumber = idNumber.substr(0, 6) + '19' + idNumber.substr(6, idNumber.length - 6);
    for (var i = 0; i < 17; i++) {
      cardTemp += idNumber.substr(i, 1) * arrInt[i];
    }
    idNumber += arrCh[cardTemp % 11];
    return idNumber;
  }
  return idNumber;
}
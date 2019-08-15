export default {
    Successful: true,
    ErrorMessage: null,
    Logined: true,
    ReturnData: {
        Parameter: {
            WorkflowCode: null,
            SchemaCode: null,
            RuleCode: null,
            FormulaGlobalString: null,
            IntelligentFunctions: [{
                FunctionName: 'ABS',
                Description: '返回数字number的绝对值',
                Example: 'ABS(number)'
            },
            {
                FunctionName: 'COS',
                Description: '返回-1到1之间的余弦值，参数A为角度',
                Example: 'COS(A)'
            },
            {
                FunctionName: 'INT',
                Description: '将数字number向下取整为最接近的整数',
                Example: 'INT(number)'
            },
            {
                FunctionName: 'MAX',
                Description: '返回参数列表中的最大值，参数v是子表的某一个数字控件',
                Example: 'MAX(v)'
            },
            {
                FunctionName: 'MIN',
                Description: '返回参数列表中的最小值，参数v是子表的某一个数字控件',
                Example: 'MIN(v)'
            },
            {
                FunctionName: 'MOD',
                Description: '返回两数相除的余数，参数number是被除数，divisor是除数',
                Example: 'MOD(number,divisor)'
            },
            {
                FunctionName: 'PI',
                Description: '圆周率3.1415...',
                Example: 'PI()'
            },
            {
                FunctionName: 'ROUND',
                Description: '将数字四舍五入到指定的位数，number为要处理的数字，num_digits为指定小数位数',
                Example: 'ROUND(number,num_digits)'
            },
            {
                FunctionName: 'SIN',
                Description: '返回-1到1之间的正弦值，参数A为角度',
                Example: 'SIN(A)'
            },
            {
                FunctionName: 'SQRT',
                Description: '开平方，参数number为非负数',
                Example: 'SQRT(number)'
            },
            {
                FunctionName: 'AVG',
                Description: '返回所有参数的平均值，参数v是子表的某一个数字控件',
                Example: 'AVG(v)'
            },
            {
                FunctionName: 'COUNT',
                Description: '统计参数列表中选项值的个数，参数v是子表的某一个控件',
                Example: 'COUNT(v)'
            },
            {
                FunctionName: 'SUM',
                Description: '统计输入参数的数值之和，参数v是子表的某一个数字控件',
                Example: 'SUM(v)'
            },
            {
                FunctionName: 'STARTSWITH',
                Description: '判断文本字符串text是否以特定字符串start_string开始，是则返回true，否则返回false',
                Example: 'STARTSWITH(text,start_string)'
            },
            {
                FunctionName: 'CONTAINS',
                Description: '判断参数1是否包含参数2的值，包含则返回true，不包含则返回false',
                Example: 'CONTAINS(参数1,参数2)'
            },
            {
                FunctionName: 'LEFT',
                Description: '从文本字符串的第一个字符开始返回指定个数的字符，text为字符串，num_chars为指定个数，若不填则取默认值1',
                Example: 'LEFT(text,[num_chars])'
            },
            {
                FunctionName: 'LEN',
                Description: '返回文本字符串text中的字符个数',
                Example: 'LEN(text)'
            },
            {
                FunctionName: 'REPLACE',
                Description: '使用其他文本字符串并根据所指定的字符数替换某文本字符串中的部分文本，old_text为某文本字符串，start_num为要替换的起始位置编号，num_chars为要替换的字符个数，new_text为替换后的字符串',
                Example: 'REPLACE(old_text,start_num,num_chars,new_text)'
            },
            {
                FunctionName: 'RIGHT',
                Description: '从文本字符串的最后一个字符开始返回指定个数的字符，text为文本字符串，num_chars为指定个数，若不填则取默认值1',
                Example: 'RIGHT(text,[num_chars])'
            },
            {
                FunctionName: 'SEARCH',
                Description: '返回文本字符串find_text在指定字符串within_text中出现的起始位置编号，未找到则返回0（忽略大小写），其中start_num为在within_text中第几个位置开始查找',
                Example: 'SEARCH(find_text,within_text,start_num)'
            },
            {
                FunctionName: 'SUBSTITUTE',
                Description: '将文本字符串中的部分字符替换成新字符串，text为原文本，old_text为要替换的文本，new_text为新的文本，instance_num为替换次数',
                Example: 'SUBSTITUTE(text,old_text,new_text,instance_num)'
            },
            {
                FunctionName: 'MID',
                Description: '返回文本字符串中从指定位置开始的特定数目的字符，text为文本字符串，start_num为指定开始位置，num_chars为特定数目',
                Example: 'MID(text,start_num,num_chars)'
            },
            {
                FunctionName: 'LOWER',
                Description: '将文本字符串text中所有大写字母转换为小写',
                Example: 'LOWER(text)'
            },
            {
                FunctionName: 'UPPER',
                Description: '将文本字符串text中所有小写字母转换为大写',
                Example: 'UPPER(text)'
            },
            {
                FunctionName: 'TRIM',
                Description: '去掉文本字符串text中的首尾空格',
                Example: 'TRIM(text)'
            },
            {
                FunctionName: 'YEARS',
                Description: '返回两个日期之间的年数差值，精确到两位小数。end_date为结束日期，start_date为开始日期',
                Example: 'YEARS(end_date,start_date)'
            },
            {
                FunctionName: 'DAYS',
                Description: '返回两个日期之间的天数差值，精确到两位小数。end_date为结束日期，start_date为开始日期',
                Example: 'DAYS(end_date,start_date)'
            },
            {
                FunctionName: 'HOURS',
                Description: '返回两个时间之间的小时数，精确到两位小数。end_time为结束时间，start_time为开始时间',
                Example: 'HOURS(end_time,start_time)'
            },
            {
                FunctionName: 'MINUTES',
                Description: '返回两个时间之间的分钟数，精确到两位小数。end_time为结束时间，start_time为开始时间',
                Example: 'MINUTES(end_time,start_time)'
            },
            {
                FunctionName: 'NOW',
                Description: '返回当前时间，精确到时分秒，格式为yyyy-MM-dd hh:mm:ss',
                Example: 'NOW()'
            },
            {
                FunctionName: 'ADDDAY',
                Description: '将指定日期加/减指定天数，date为指定日期，days为指定天数，当为负数时在date上减去此天数',
                Example: 'ADDDAY(date,days)'
            },
            {
                FunctionName: 'ADDMONTH',
                Description: '将指定日期加/减指定月数，date为指定日期，months为指定月数，当为负数时在此date上减去此月数',
                Example: 'ADDMONTH(date,months)'
            },
            {
                FunctionName: 'ADDYEAR',
                Description: '将指定日期加/减指定年数，date为指定日期，years为指定年数，当为负数时在此date上减去此年数',
                Example: 'ADDYEAR(date,years)'
            },
            {
                FunctionName: 'DATE',
                Description: '返回格式化的日期，格式为:yyyy-MM-dd',
                Example: 'Date(\"year-month-day\")'
            },
            {
                FunctionName: 'YEAR',
                Description: '返回日期date的年份',
                Example: 'YEAR(date)'
            },
            {
                FunctionName: 'MONTH',
                Description: '返回日期date月份，值为介于1到12之间的整数',
                Example: 'MONTH(date)'
            },
            {
                FunctionName: 'DAY',
                Description: '返回日期date的天数，值为介于1到31之间的整数',
                Example: 'DAY(date)'
            },
            {
                FunctionName: 'HOUR',
                Description: '返回日期time的小时部分',
                Example: 'HOUR(time)'
            },
            {
                FunctionName: 'MINUTE',
                Description: '返回日期time的分钟部分',
                Example: 'MINUTE(time)'
            },
            {
                FunctionName: 'QUARTER',
                Description: '返回日期date的所属季度，值为介于1到4的整数',
                Example: 'QUARTER(date)'
            },
            {
                FunctionName: 'TODAY',
                Description: '返回今天的日期，格式为:yyyy-MM-dd',
                Example: 'TODAY()'
            },
            {
                FunctionName: 'WEEKDAY',
                Description: '返回指定日期date为星期几',
                Example: 'WEEKDAY(date)'
            },
            {
                FunctionName: 'WEEKNUM',
                Description: '返回一个数字，该数字代表指定日期date是一年中的第几周',
                Example: 'WEEKNUM(date)'
            },
            {
                FunctionName: 'IF',
                Description: '如果满足条件A，则返回B，否则返回C，支持多层嵌套IF函数',
                Example: 'IF(A,B,C)'
            },
            {
                FunctionName: 'ISEMPTY',
                Description: '判断是否为空，为空则返回true，不为空则返回false，可用于判断具体值',
                Example: 'ISEMPTY(文本)'
            },
            {
                FunctionName: 'GETADDRESS',
                Description: '将地址控件的值转换为文本字符串',
                Example: 'GETADDRESS(地址控件)'
            }
            ],
            BizDataTypes: {
                '1': {
                    Name: 'Bool',
                    DisplayName: '逻辑型'
                },
                '5': {
                    Name: 'DateTime',
                    DisplayName: '日期'
                },
                '7': {
                    Name: 'Double',
                    DisplayName: '数值'
                },
                '9': {
                    Name: 'Int',
                    DisplayName: '整数'
                },
                '11': {
                    Name: 'Long',
                    DisplayName: '长整数'
                },
                '13': {
                    Name: 'String',
                    DisplayName: '长文本'
                },
                '14': {
                    Name: 'ShortString',
                    DisplayName: '短文本'
                },
                '20': {
                    Name: 'ByteArray',
                    DisplayName: '二进制流'
                },
                '23': {
                    Name: 'Image',
                    DisplayName: 'Image'
                },
                '24': {
                    Name: 'File',
                    DisplayName: 'File'
                },
                '25': {
                    Name: 'TimeSpan',
                    DisplayName: '时间段'
                },
                '26': {
                    Name: 'Unit',
                    DisplayName: 'Unit'
                },
                '27': {
                    Name: 'UnitArray',
                    DisplayName: 'UnitArray'
                },
                '30': {
                    Name: 'Html',
                    DisplayName: 'HTML'
                },
                '32': {
                    Name: 'Xml',
                    DisplayName: 'Xml'
                },
                '40': {
                    Name: 'BizObject',
                    DisplayName: '业务对象'
                },
                '41': {
                    Name: 'BizObjectArray',
                    DisplayName: '业务对象数组'
                },
                '42': {
                    Name: 'BizStructure',
                    DisplayName: '复合对象'
                },
                '43': {
                    Name: 'BizStructureArray',
                    DisplayName: '复合对象数组'
                },
                '50': {
                    Name: 'Association',
                    DisplayName: 'Association'
                },
                '51': {
                    Name: 'AssociationArray',
                    DisplayName: 'AssociationArray'
                },
                '55': {
                    Name: 'Map',
                    DisplayName: 'Map'
                },
                '56': {
                    Name: 'Address',
                    DisplayName: 'Address'
                },
                '57': {
                    Name: 'Formula',
                    DisplayName: 'Formula'
                },
                '-1': {
                    Name: 'Unspecified',
                    DisplayName: 'Unspecified'
                }
            },
            Tree: {
                ShowSystem: false,
                ShowSystemEN: false,
                ShowSubSheet: false,
                ShowAssociation: false,
                ShowField: false,
                ShowOrganization: false,
                ShowPost: false,
                ShowRules: false,
                ShowFunction: false,
                ShowConst: false,
                ShowSubSheetField: false,
                ShowBizProperties: false,
                ShowAssociationField: false,
                ShowOnlyParticipant: false,
                ShowSheetAssociation: false,
                CurSheetCode: '',
                FormulaType: null,
                AppCode: '',
                Display: '',
                Icon: '',
                Expand: true,
                ExcludeFields: [],
                CustomCodes: []
            }
        }
    }
}
export const ConstVariables = ['AND', 'OR', 'true', 'false']; // 用于智能感知

// 编辑器类型
export const FormulaTypeList = {
    SCHEMADISPLAY: 'SCHEMADISPLAY', // 显示规则
    SCHEMACOMPUTATION: 'SCHEMACOMPUTATION', // 计算规则
    BOOL: 'BOOL', // 路由跳转
    SCHEMASUBMIT: 'SCHEMASUBMIT', // 表单提交
    BUSINESS: 'BUSINESS', // 业务逻辑
    DATASOURCE: 'DATASOURCE', // 报表数据源
    ASSOCIATIONFILTER: 'AssociationFilter', // 'ASSOCIATIONFILTER' //关联查询过滤
    SCHEDULERULE: 'SCHEDULERULE', // 推送提醒条件
    ActivityName: 'ActivityName' // 流程设计节点消息内容
};
// 编辑器中的各种提示配置
export let FormulaTypeTitle = {
    SCHEDULERULE: {
        title: '提醒条件',
        formulaTitle: '仅对符合以下条件的数据进行提醒',
        placeholder: '例：员工状态=="未转正"',
        formulaDescription: [
            '请从左侧面板选择字段或选项',
            '支持<span style="color:#d25f5f;font-size: 12px;">英文</span>模式下运算符(+,-,*,/,>,<,==,!=,<=,>=,!=,&&,||,%)及函数',
            '参考场景：<br/>仅对表单中员工状态字段的值等于未转正的数据进行提醒，则可将提醒条件设置为：员工状态=="未转正"'
        ]
    },
    SCHEMADISPLAY: {
        title: '隐藏条件',
        formulaTitle: '当满足以下条件时此控件隐藏',
        placeholder: '例：报销金额>10000',
        formulaDescription: [
            '请从左侧面板选择字段或选项',
            '支持<span style="color:#d25f5f;font-size: 12px;">英文</span>模式下运算符(+,-,*,/,>,<,==,!=,<=,>=,!=,&&,||,%)及函数',
            '参考场景：<br/> 报销金额控件输入的值大于10000时，需要隐藏当前控件，则可将隐藏条件设置为：报销金额>10000'
        ]
    },
    SCHEMACOMPUTATION: {
        title: '计算公式',
        formulaTitle: '{}控件的值=',
        placeholder: '例: 数量*单价',
        formulaDescription: [
            '请从左侧面板选择字段或选项',
            '支持<span style="color:#d25f5f;font-size:12px;">英文</span>模式下运算符(+,-,*,/,>,<,==,!=,<=,>=,!=,&&,||)及函数',
            '参考场景：<br/> 根据输入的数量和单价，自动计算出金额，则可将计算公式设置为：数量*单价'
        ]
    },
    AssociationFilter: {
        title: '数据范围',
        formulaTitle: '仅可选择符合以下条件的数据',
        placeholder: '例：关联表单.员工状态=="未转正"',
        formulaDescription: [
            '请从左侧面板选择字段或选项',
            '支持<span style="color:#d25f5f;font-size:12px;">英文</span>模式下运算符(+,-,*,/,>,<,==,!=,<=,>=,!=,&&,||,%)及函数',
            '参考场景：<br/> 仅可选择关联表单中员工状态为未转正的数据，则可将数据范围设置为：关联表单.员工状态=="未转正"'
        ]
    },
    BUSINESS0: {
        title: '数据生效时',
        formulaTitle: '数据生效时执行以下函数',
        placeholder: '例：UPDATE(目标表单,目标表单.姓名=="张三",目标表单.员工状态,=,"已转正")',
        formulaDescription: [
            '请先从左侧面板设定目标表单',
            '再从右侧插入高级函数，如UPDATE(),并按照函数指引进行操作',
            '支持<span style="color:#d25f5f;font-size:12px;">英文</span>模式下运算符(+,-,*,/,>,<,==,!=,<=,>=,!=,&&,||,%)及函数'
        ]
    },
    BUSINESS1: {
        title: '数据作废时',
        formulaTitle: '数据作废时执行以下函数',
        placeholder: '例：UPDATE(目标表单,目标表单.姓名=="张三",目标表单.员工状态,=,"已转正")',
        formulaDescription: [
            '请先从左侧面板设定目标表单',
            '再从右侧插入高级函数，如UPDATE(),并按照函数指引进行操作',
            '支持<span style="color:#d25f5f;font-size:12px;">英文</span>模式下运算符(+,-,*,/,>,<,==,!=,<=,>=,!=,&&,||,%)及函数'
        ]
    },
    SCHEMASUBMIT: {
        title: '表单提交校验',
        formulaTitle: '当满足以下条件时表单不允许提交',
        placeholder: '例：报销金额>10000',
        formulaDescription: [
            '请从左侧面板选择字段或选项',
            '支持<span style="color:#d25f5f;font-size: 12px;">英文</span>模式下运算符(+,-,*,/,>,<,==,!=,<=,>=,!=,&&,||,%)及函数',
            '参考场景：<br/> 报销金额控件的值大于10000时，不允许提交表单，则可将校验条件设置为：报销金额>10000'
        ]
    },
    DATASOURCE: {
        title: '计算字段',
        formulaTitle: '',
        placeholder: '例: 数量*单价',
        formulaDescription: [
            '请从左侧面板选择字段或选项',
            '支持<span style="color:#d25f5f;font-size:12px;">英文</span>模式下运算符(+,-,*,/,>,<,==,!=,<=,>=,!=,&&,||,%)及函数'
        ]
    },
    ActivityName: {
        title: '消息内容',
        formulaTitle: '将发送以下消息内容',
        placeholder: '例："请及时处理"+发起人+"的请假单"',
        formulaDescription: [
            '请从左侧面板选择字段或选项',
            '支持<span style="color:#d25f5f;font-size: 12px;">英文</span>模式下运算符(+,-,*,/,>,<,==,!=,<=,>=,!=,&&,||,%)及函数',
            '消息示例："请及时处理"+发起人+"的请假单"'
        ]
    },
    BOOL: {
        title: '',
        formulaTitle: '符合以下条件时进入这条连接线下的节点',
        placeholder: '例：报销金额>10000',
        formulaDescription: [
            '请从左侧面板选择字段或选项',
            '支持<span style="color:#d25f5f;font-size: 12px;">英文</span>模式下运算符(+,-,*,/,>,<,==,!=,<=,>=,!=,&&,||,%)及函数',
            '参考场景：<br/> 当报销金额大于10000时，才能进入这条连接线下的节点，则可将流转条件设置为：报销金额>10000'
        ]
    },
    Flow: {
        title: '流程条件',
        formulaTitle: '符合以下条件时进入这条连接线下的节点',
        placeholder: '例：报销金额>10000',
        formulaDescription: [
            '请从左侧面板选择字段或选项',
            '支持<span style="color:#d25f5f;font-size: 12px;">英文</span>模式下运算符(+,-,*,/,>,<,==,!=,<=,>=,!=,&&,||,%)及函数',
            '参考场景：<br/> 当报销金额大于10000时，才能进入这条连接线下的节点，则可将流转条件设置为：报销金额>10000'
        ]
    }

};

export let IntelligentFunctions = [];

export const DocumentRange = {
    // 禁用Enter键自动
    ForbidIntelligentWhenEnter: false,
    getSelection: function () {
        if (window.getSelection) {
            return window.getSelection();
        }
        return document.getSelection();
    },
    getRange: function (selection) {
        selection = selection || DocumentRange.getSelection();
        try {
            if (selection.getRangeAt) {
                return selection.getRangeAt(0);
            } else {
                var range = document.createRange();
                range.setStart(selection.anchorNode, selection.anchorOffset);
                range.setEnd(selection.focusNode, selection.focusOffset);
                return range;
            }
        } catch (e) {
            FormulaStack.CatchErrorOnRange = true;
        }
    }
};

export const ExecutionTypes = {
    Function: 'function',
    User: 'user',
    Input: 'input',
    Varible: 'varible'
};

let SchemaCode = '';
let FormulaType = '';
let FormulaField = '';
let CurSheetFileds = []; // 当前表单数据项

export const FormulaSettings = {
    FormulaHandlerAjaxUrl: '/Formula/',
    // 用户表达式属性名称
    ExpressionAttrName: 'expression',
    // 公式类型属性名称
    ExecutionTypeName: 'ExecutionType',
    // 编辑器类型，计算规则，隐藏规则，业务规则。。。
    // 初始化参数
    ResetConfig: function (config) {
        SchemaCode = JSON.parse(sessionStorage.getItem("currentApp")).appId;
        FormulaType = config.FormulaType;
        FormulaField = config.FormulaField;
        if (config.CurSheetFileds && config.CurSheetFileds.length > 0) {
            for (let i = 0, len = config.CurSheetFileds.length; i < len; i++) {
                CurSheetFileds.push(config.CurSheetFileds[i].id);
            }
        }
    },
    // 是否编辑器
    IsEditor: function (selector) {
        return $(selector).hasClass(FormulaStyleClassName.Editor);
    },
    // 是否函���名
    IsFunctionName: function (text) {
        if (typeof IntelligentFunctions !== 'undefined' && IntelligentFunctions) {
            for (var i = 0; i < IntelligentFunctions.length; i++) {
                if (IntelligentFunctions[i].FunctionName === text) {
                    return true;
                }
            }
        }
        // AND OR TRUE  FALSE
        if ($.inArray(text, ConstVariables) > -1) {
            return true;
        }
        return false;
    },
    // 删除前面的元素
    deleteBefore: function (node) {
        if (!FormulaSettings.IsEditor(node)) {
            var parentNode = $(node).parent()[0];
            for (; ;) {
                if (parentNode.childNodes[0] != node) {
                    $(parentNode.childNodes[0]).remove();
                } else {
                    break;
                }
            }
            // 删除上级前面的元素
            FormulaSettings.deleteBefore(parentNode);
        }
    },
    // 删除后面的元素
    deleteBehind: function (node) {
        if (node && !FormulaSettings.IsEditor(node)) {
            var parentNode = node.parentNode;
            if (!parentNode) {
                return;
            }
            for (var i = parentNode.childNodes.length - 1; i >= 0; i--) {
                if (parentNode.childNodes[i] != node) {
                    $(parentNode.childNodes[i]).remove();
                } else {
                    break;
                }
            }
            // 删除上级后面的元素
            FormulaSettings.deleteBehind(parentNode);
        }
    },
    // 获取直属于Editor的节点
    getEditorChildNode: function (currentNode) {
        if (currentNode) {
            // 获取直属于Editor的节点
            if (FormulaSettings.IsEditor(currentNode.parentNode)) {
                return currentNode;
            }
            return FormulaSettings.getEditorChildNode(currentNode.parentNode);
        }
    },

    Intelligent: function (textElement, cursorOffset) {
        // 去掉智能感知前面的=和，

        var formulaType = $(textElement)
            .parent()
            .attr(FormulaSettings.ExecutionTypeName);
        if (
            formulaType == ExecutionTypes.User ||
            formulaType == ExecutionTypes.Input
        ) {
            return;
        }

        // 隐藏感知框
        FormulaSettings.HideIntelligent();

        FormulaStack.IntelligentString = FormulaStack.IntelligentString || '';

        // 用于智能感知的片段
        // 隐藏所有项
        FormulaStack.IntelligentList.find('li').hide();
        FormulaStack.IntelligentList
            .find('li.' + FormulaStyleClassName.ItemSelected)
            .removeClass(FormulaStyleClassName.ItemSelected);
        // 显示相关项
        var isFirst = true;
        var mostSuitableFound = false;
        var visibleItems;
        // 感知字符是空格,显示全部
        if (FormulaStack.IntelligentString == '') {
            return;
        }
        if (
            FormulaStack.IntelligentString &&
            FormulaStack.IntelligentString.length > 0 &&
            FormulaStack.IntelligentString
                .substring(
                    FormulaStack.IntelligentString.length - 1,
                    FormulaStack.IntelligentString.length
                )
                .trim() == ''
        ) {
        } else {
            visibleItems = FormulaStack.IntelligentList.find('li').filter(function () {
                var intelligentKeyWord = $(this).attr('IntelligentKeyWord');
                if (
                    intelligentKeyWord &&
                    intelligentKeyWord
                        .toLowerCase()
                        .indexOf(FormulaStack.IntelligentString.toLowerCase()) /* > -1*/ == 0
                ) {
                    // 默认选中首项
                    if (isFirst) {
                        isFirst = false;
                        $(this).addClass(FormulaStyleClassName.ItemSelected);
                    }

                    // 寻找最优项
                    if (
                        !mostSuitableFound &&
                        intelligentKeyWord
                            .toLowerCase()
                            .indexOf(FormulaStack.IntelligentString.toLowerCase()) == 0
                    ) {
                        FormulaStack.IntelligentList
                            .find('li.' + FormulaStyleClassName.ItemSelected)
                            .removeClass(FormulaStyleClassName.ItemSelected);
                        $(this).addClass(FormulaStyleClassName.ItemSelected);
                        mostSuitableFound = true;
                    }
                    $(this).show();
                    return true;
                }
            });
        }

        if (!visibleItems || visibleItems.length == 0) {
            return;
        }

        // 定位感知框
        var range = document.createRange();
        range.setStart(textElement, cursorOffset);
        range.setEnd(textElement, cursorOffset);

        var focusFlag = document.createElement('input');
        $(focusFlag).css('type', 'text').css('width', '1px');
        range.insertNode(focusFlag);

        FormulaSettings.ShowIntelligent(
            $(focusFlag).position().left + 2,
            $(focusFlag).position().top + $(focusFlag).outerHeight()
        );

        $(focusFlag).remove();
        FormulaSettings.LiSelected();
    },

    // 显示智能感知
    ShowIntelligent: function (x, y) {
        x = x - FormulaStack.Editor.scrollLeft();
        y = y - FormulaStack.Editor.scrollTop() + 20;

        FormulaStack.Container.css('left', x).css('top', y).show();
        var over =
            FormulaStack.Container.offset().left +
            FormulaStack.Container.outerWidth() -
            ($(FormulaStack.Editor).parent().offset().left +
                $(FormulaStack.Editor).parent().outerWidth());
        if (over > 0) {
            FormulaStack.Container.css('left', x - over - 10);
        }
        // 显示描述
        // FormulaSettings.ShowDescription();
    },

    // 隐藏感知框
    HideIntelligent: function () {
        FormulaStack.Container.hide();
        FormulaStack.Description.hide();
    },

    // 显示智能感知描述
    ShowDescription: function () {
        var selectedLi = $('.' + FormulaStyleClassName.ItemSelected);
        if (selectedLi && selectedLi.length > 0) {
            // 只显示参与者函数描述
            if (selectedLi.hasClass(FormulaStyleClassName.FunctionItem)) {
                var functionName = selectedLi.text();
                if (
                    typeof IntelligentFunctions !== 'undefined' &&
                    IntelligentFunctions.length > 0
                ) {
                    for (var i = 0; i < IntelligentFunctions.length; i++) {
                        if (IntelligentFunctions[i].FunctionName == functionName) {
                            FormulaStack.Description
                                .text(
                                    '描述:' +
                                (IntelligentFunctions[i].Description
                                    ? IntelligentFunctions[i].Description
                                    : '')
                                )
                                .css(
                                    'left',
                                    FormulaStack.Container.position().left +
                                FormulaStack.Container.outerWidth() +
                                'px'
                                )
                                .css(
                                    'top',
                                    FormulaStack.Container.position().top +
                                selectedLi.offset().top -
                                FormulaStack.Container.offset().top
                                )
                                .show();
                        }
                    }
                }
            } else if (
                typeof BizDataTypes !== typeof void 0 &&
                selectedLi.attr('BizDataType')
            ) {
                // 数据项,显示字段类型
                FormulaStack.Description
                    .text(
                        selectedLi.text() +
                    ':' +
                    BizDataTypes[selectedLi.attr('BizDataType')].DisplayName
                    )
                    .css(
                        'left',
                        FormulaStack.Container.position().left +
                    FormulaStack.Container.outerWidth() +
                    'px'
                    )
                    .css(
                        'top',
                        FormulaStack.Container.position().top +
                    selectedLi.offset().top -
                    FormulaStack.Container.offset().top
                    )
                    .show();
            } else {
                // 其他内容,显示全文本即可
                FormulaStack.Description
                    .text(selectedLi.text())
                    .css(
                        'left',
                        FormulaStack.Container.position().left +
                    FormulaStack.Container.outerWidth() +
                    'px'
                    )
                    .css(
                        'top',
                        FormulaStack.Container.position().top +
                    selectedLi.offset().top -
                    FormulaStack.Container.offset().top
                    )
                    .show();
            }
        }

        if (
            FormulaStack.Description.offset().left +
            FormulaStack.Description.outerWidth() >
            $(FormulaStack.Editor).parent().offset().left +
            $(FormulaStack.Editor).parent().outerWidth()
        ) {
            FormulaStack.Description.css(
                'left',
                FormulaStack.Container.position().left -
                FormulaStack.Description.outerWidth()
            );
            // 变换位置后宽度会变,重调一次
            FormulaStack.Description.css(
                'left',
                FormulaStack.Container.position().left -
                FormulaStack.Description.outerWidth()
            );
        }
    },

    // 显示参数描述
    // ShowArgDescription: function (functionName, argIndex) {
    //    if (functionName && !isNaN(argIndex)) {
    //        FormulaStack.ArgDescription.children().remove();
    //        FormulaStack.ArgDescription.append($("<p>Function Name:" + functionName + "</p>"));
    //        FormulaStack.ArgDescription.append($("<p>Function Args 1:Some Text About Args 1...</p>"));
    //        var range = DocumentRange.getRange();

    //        var tmpInput = document.createElement("input");
    //        $(tmpInput).width("1px");
    //        range.insertNode(tmpInput);
    //        FormulaStack.ArgDescription.css("left", $(tmpInput).position().left + "px").css("top", $(tmpInput).position().top + $(tmpInput).outerHeight() + 10 + "px").show();
    //        $(tmpInput).remove();
    //    }
    //    else
    //        FormulaStack.ArgDescription.hide();
    // },

    // 隐藏参数描述
    // HideArgDescription: function () {
    //    FormulaStack.ArgDescription.hide();
    // },

    // 聚焦到元素后
    FocusAfter: function (element) {
        var range = document.createRange();
        range.setStartAfter(element);
        range.setEndAfter(element);

        FormulaSettings.FocusRange(range);

        // FormulaStack.Editor.focus();
    },

    // 聚焦到选择区
    FocusRange: function (range) {
        var selection = DocumentRange.getSelection();
        try {
            selection.removeAllRanges();
            selection.addRange(range);
            FormulaStack.Range = range;
        } catch (ex) {
            FormulaStack.Range = selection.getRangeAt(0);
            FormulaStack.Range.setStart(range.startContainer, range.startOffset);
            FormulaStack.Range.setEnd(range.endContainer, range.endOffset);
        }
    },

    BeforeInsert: function () {
        if (!FormulaStack.Range.collapsed) {
            FormulaStack.Range.deleteContents();
            FormulaStack.Editor.focus();
        }
    },
    GetInsertLink: function (context) {
        if (
            context &&
            context.PrevText &&
            context.PrevText.trim() &&
            (context.PrevText.trim().split('').reverse()[0] == '}' ||
                context.PrevText.trim().split('').reverse()[0] == ')')
        ) {
            // return "+";
            return ' ';
        }
        return '';
    },
    // 插入AND OR Fasle True
    InsertConstVariables: function (text, isIntelligent) {
        FormulaSettings.BeforeInsert();
        // var context = FormulaSettings.GetContext(FormulaStack.Range.endContainer, FormulaStack.Range.endOffset);
        // 匹配FormulaStack.Range.endContainer中的字符
        var endContainer = FormulaStack.Range.endContainer;
        var endOffset = FormulaStack.Range.endOffset;
        if (isIntelligent) {
            // 如果是智能感知要清除掉手动输入的字符，这里的做法是先匹配endContainer中的以下字符，字符后面就是手动输入的文本，去掉这些文本
            var content = endContainer.textContent;
            content = content.match(/[+\-/*/()<>\s!&|=,]+/);
            var len1 = FormulaStack.Range.endContainer.length;
            var len2 = content == null ? 0 : content.toString().length;
            endOffset = FormulaStack.Range.endOffset - (len1 - len2);
            endContainer.textContent = content;
        }
        // var context = FormulaSettings.GetContext(FormulaStack.Range.endContainer, FormulaStack.Range.endOffset-1);
        var context = FormulaSettings.GetContext(endContainer, endOffset);
        if (context.NextText && context.NextText.indexOf('}') == 0) {
            context.NextText = context.NextText.replace('}', '');
        }
        var code = FormulaSettings.GetCode(
            FormulaStack.Range.endContainer,
            FormulaStack.Range.endOffset
        );
        if (code.NextCode && code.NextCode.indexOf('}') == 0) {
            code.NextCode = code.NextCode.replace('}', '');
        }
        FormulaSettings.ResetAll(
            false,
            context.PrevText + ' ' + text + ' ',
            context.NextText,
            true,
            true,
            code.PrevCode + text + code.NextCode
        );
    },
    // 插入输入常量
    InsertInput: function () {
        FormulaSettings.BeforeInsert();
        var context = FormulaSettings.GetContext(
            FormulaStack.Range.endContainer,
            FormulaStack.Range.endOffset
        );
        FormulaSettings.ResetAll(
            false,
            context.PrevText + '"',
            '"' + context.NextText,
            true,
            true
        );
    },
    // 插入块
    InsertBlock: function (blockText, isIntelligent) {
        FormulaSettings.BeforeInsert();
        var context = FormulaSettings.GetContext(
            FormulaStack.Range.endContainer,
            FormulaStack.Range.endOffset,
            isIntelligent
        );
        FormulaSettings.ResetAll(
            false,
            context.PrevText + blockText,
            context.NextText,
            true,
            true
        );
    },
    // 插入变量
    InsertVariable: function (variableName, variableCode) {      
        FormulaSettings.BeforeInsert();
        var context = FormulaSettings.GetContext(
            FormulaStack.Range.endContainer,
            FormulaStack.Range.endOffset
        );
        if (context.NextText && context.NextText.indexOf('}') == 0) {
            context.NextText = context.NextText.replace('}', '');
        }
        var code = FormulaSettings.GetCode(
            FormulaStack.Range.endContainer,
            FormulaStack.Range.endOffset
        );
        if (code.NextCode && code.NextCode.indexOf('}') == 0) {
            code.NextCode = code.NextCode.replace('}', '');
        }
        FormulaSettings.ResetAll(
            false,
            context.PrevText +
            FormulaSettings.GetInsertLink(context) +
            '{' +
            variableName +
            '}',
            context.NextText,
            true,
            true,
            code.PrevCode + '{' + variableCode + '}' + code.NextCode
        );
    },

    InsertUser: function (userName, userFlag,nodeType) {
        FormulaSettings.BeforeInsert();
        var context = FormulaSettings.GetContext(
            FormulaStack.Range.endContainer,
            FormulaStack.Range.endOffset
        );
        if (context.NextText && context.NextText.indexOf('}') == 0) {
            context.NextText = context.NextText.replace('}', '');
        }
        var code = FormulaSettings.GetCode(
            FormulaStack.Range.endContainer,
            FormulaStack.Range.endOffset
        );
        if (code.NextCode && code.NextCode.indexOf('}') == 0) {
            code.NextCode = code.NextCode.replace('}', '');
        }
        if(nodeType=="Company"){
            FormulaSettings.ResetAll(
                false,
                context.PrevText +
                FormulaSettings.GetInsertLink(context) +
                '{' +
                userName +
                '}',
                context.NextText,
                true,
                true,
                code.PrevCode + 'o(' + userFlag + ')' + code.NextCode
            );
        }
        else{
            FormulaSettings.ResetAll(
                false,
                context.PrevText +
                FormulaSettings.GetInsertLink(context) +
                '{' +
                userName +
                '}',
                context.NextText,
                true,
                true,
                code.PrevCode + 'u(' + userFlag + ')' + code.NextCode
            );
        }
       
    },
    // 插入函数
    // 在感知中
    InsertFunction: function (functionName, isIntelligent) {       
        FormulaSettings.BeforeInsert();

        var context = FormulaSettings.GetContext(
            FormulaStack.Range.startContainer,
            FormulaStack.Range.startOffset,
            isIntelligent
        );

        FormulaSettings.ResetAll(
            false,
            context.PrevText +
            FormulaSettings.GetInsertLink(context) +
            functionName +
            '(',
            ')' + context.NextText,
            true,
            true
        );

        // 显示函数帮助
        FormulaSettings.ShowFunctionHelper(functionName);
    },

    // 获取数据类型数组的字符串
    GetBizDataTypesString: function (bizDataTypes) {
        if (
            typeof BizDataTypes !== 'undefined' &&
            bizDataTypes &&
            bizDataTypes.length > 0
        ) {
            var BizDataTypesString = '';
            $(bizDataTypes).each(function (index) {
                if (BizDataTypes[this]) {
                    BizDataTypesString += BizDataTypes[this].Name + ';';
                }
            });

            return BizDataTypesString;
        } else {
            return bizDataTypes + '';
        }
    },

    // 显示函数帮助,帮助只显示函数示例和函数说明
    ShowFunctionHelper: function (functionName) {
        // 获取函数示例
        // 获取函数说明
        $('#formula_example').parent().show();
        $('#formula_description').parent().show();
        $('#formula_validate').parent().hide();
        $('#FormulaDescriptions').hide();

        if (functionName == 'AND') {
            $('#formula_example').text('表达式1 AND 表达式2');
            $('#formula_description').text(
                '多个用AND连接的表达式，当所有表达式均为true时，表达式返回true，否则返回false'
            );
            return;
        } else if (functionName == 'OR') {
            $('#formula_example').text('表达式1 OR 表达式2');
            $('#formula_description').text('多个用OR连接的表达式，只要有一个表达式为true，表达式返回true');
            return;
        }
        for (var index = 0; index < IntelligentFunctions.length; index++) {
            if (IntelligentFunctions[index].FunctionName == functionName) {
                var helper = IntelligentFunctions[index];
                $('#formula_example').text(helper.Example);
                $('#formula_description').text(helper.Description);
                return;
            }
        }
    },

    // 检验是否正确
    Validate: function (formula) {
        // 字段名称中不允许有特殊符号
        // debugger
        var result = {
            Successful: true,
            msg: ''
        };
        var flag = true;
        var reg = new RegExp(/[{}]/);
        $(FormulaStack.Editor[0].childNodes).each(function (index) {
            var fragExpression = '';
            if ($(this).attr('data-value')) {
                fragExpression = $(this).attr('expression');
                fragExpression = fragExpression.slice(1, fragExpression.length - 1);
                if (reg.test(fragExpression)) {
                    // $.IShowError('', '规则中的字段名称不能包含"{"或"}"');
                    flag = false;
                    result.Successful = false;
                    result.msg = '规则中的字段名称不能包含"{"或"}"';
                    return result;
                }
            }
        });
        if (!flag) return false;
        // 字段名称中不允许有"{}"
        var reg = new RegExp(/[{}]/);
        if (FormulaStack.Ec) {
            var fragExpression = '';
        }

        var expression = FormulaSettings.ReadExpression();
        // 空,直接通过
        if (!expression || expression.length == 0) {
            return result;
        }
        // 将"xxx"替换为""进行检验
        // 这个验证有问题
        // expression = expression.replace(/"[^"]+"/g, "\"\"");

        // 暂时禁用,测试后台验证
        // 验证 ""
        if (expression.match(/"/g) && expression.match(/"/g).length % 2 == 1) {
            var exp = expression;
            exp = exp.replace(/"[^"]+"/g, '""');
            if (exp.match(/"/g) && exp.match(/"/g).length % 2 == 1) {
                $.IShowError('', '存在未关闭的"');
                result.Successful = false;
                result.msg = '规则中的字段名称不能包含"{"或"}"';
                return result;
            }
        }
        // 验证()
        if (expression.match(/\(/g) || expression.match(/\)/g)) {
            var leftCount = 0;
            if (expression.match(/\(/)) {
                leftCount = expression.match(/\(/g).length;
            }
            var rightCount = 0;
            if (expression.match(/\)/)) {
                rightCount = expression.match(/\)/g).length;
            }
            if (leftCount > rightCount) {
                // $.IShowError('', '存在未关闭的(');
                result.Successful = false;
                result.msg = '存在未关闭的(';
                return result;
            } else if (leftCount < rightCount) {
                // $.IShowError('', '存在多余的)');
                result.Successful = false;
                result.msg = '存在多余的)';
                return result;
            }
        }
        // 验证{}
        if (expression.match(/\{/g) || expression.match(/\}/g)) {
            var leftCount = 0;
            if (expression.match(/\{/)) {
                leftCount = expression.match(/\{/g).length;
            }
            var rightCount = 0;
            if (expression.match(/\}/)) {
                rightCount = expression.match(/\}/g).length;
            }
            if (leftCount > rightCount) {
                // $.IShowError('', '存在未关闭的{');
                result.Successful = false;
                result.msg = '存在未关闭的{';
                return result;
            } else if (leftCount < rightCount) {
                // $.IShowError('', '存在多余的}');
                result.Successful = false;
                result.msg = '存在多余的)';
                return result;
            }
        }
        /// /验证是否存在空{}
        if (expression.match(/{}/g)) {
            // $.IShowError('', '存在空变量表达式{}');
            result.Successful = false;
            result.msg = '存在空变量表达式{}';
            return result;
        }

        var valid = true;
        var error = '';
        // 暂时取消服务器验证 20160622
        // 服务器检验
        var params = {
            ActionName: 'Validate',
            Formula: expression,
            FormulaType: FormulaType,
            SchemaCode: SchemaCode,
            DataField: FormulaField
        };
        let baseUrl = '/ctg-workflow';
        // development 处理跨域问题
        if (process.env.NODE_ENV == 'development') {
            baseUrl = '/apis';
        }
        $.ajax({
            type: 'POST',
            url: baseUrl + '/act/app/formulaValidate',
            cache: false,
            async: false,
            dataType: 'json',
            data: params,
            success: function (data) {
                if (data.code >= 0) {
                } else {
                    valid = false;
                    error = data.msg;
                }
            },
            error: function (msg) {
                valid = false;
                error = '校验失败';
            }
        });

        if (valid) {
            return {
                Successful: true
            };
        } else {
            return {
                Successful: false,
                msg: error
            };
            // 在界面设置错误信息
            // $('#formula_validate').text(error);
            // $('.formula-container .row.example').hide();
            // $('.formula-container .row.description').hide();
            // $('.formula-container .row.validate').show();
            // 设置滚动条到最底部
            // $('.row .formula-description')[0].scrollTop = $('.row .formula-description')[0].scrollHeight;
        }
    },

    // 读取完整表达式
    ReadExpression: function () {
        var expression = '';

        var editor = FormulaStack.Editor[0];
        $(editor.childNodes).each(function (index) {
            var fragExpression = '';
            // if ($(this).attr(FormulaSettings.ExpressionAttrName))
            //    fragExpression = $(this).attr(FormulaSettings.ExpressionAttrName);
            if ($(this).attr('data-value')) {
                fragExpression = $(this).attr('data-value');
            } else {
                fragExpression = $(this).text().replace(/“/g, '"').replace(/”/g, '"');
            }

            /// /两个表达式,中间如果没有空格,则补充
            // if (this.nodeType != "3" && expression[expression.length - 1] != " ") {
            //    fragExpression = " " + fragExpression;
            // }

            expression += fragExpression.replace(/；/g, ';').replace(/，/g, ',');
        });
        return expression;
    },

    // 读取完整显示文本
    ReadText: function () {
        var text = '';

        var editor = FormulaStack.Editor[0];
        $(editor.childNodes).each(function (index) {
            var fragText = '';
            if ($(this).attr('expression-text')) {
                fragText = $(this).attr('expression-text');
            } else {
                fragText = $(this).text();
            }

            text += fragText;
        });

        return text;
    },

    // 选择项
    DoLiSelect: function (li) {
        // ERROR:替换FormulaStack.IntelligentString
        if (typeof FormulaStack.IntelligentString !== 'undefined') {
            // 如果是函数,显示帮助
            if ($(li).hasClass(FormulaStyleClassName.FunctionItem)) {
                FormulaSettings.InsertFunction($(li).text(), true);
            } else if ($(li).hasClass(FormulaStyleClassName.ConstItem)) {
                FormulaSettings.InsertBlock($(li).text(), true);
            } else if ($(li).hasClass(FormulaStyleClassName.GlobalVariableItem)) {
                FormulaSettings.InsertConstVariables($(li).text(), true);
            } else {
                FormulaSettings.InsertVariable($(li).text(), true);
            }

            FormulaSettings.HideIntelligent();

            FormulaSettings.ResetAll(false);
        }
    },

    // 项选中时:滚动显示
    LiSelected: function () {
        var selectedLi = $(
            'li.' + FormulaStyleClassName.ItemSelected + ':visible:first'
        );
        if (selectedLi.length > 0) {
            var itemBottom = selectedLi.offset().top + selectedLi.outerHeight();
            var containerBottom =
                FormulaStack.Container.offset().top + FormulaStack.Container.height();
            // 18是下滚动条的高度
            if (itemBottom + 18 > containerBottom) {
                FormulaStack.Container.scrollTop(
                    FormulaStack.Container.scrollTop() + itemBottom + 18 - containerBottom
                );
            } else if (
                FormulaStack.Container.scrollTop() &&
                selectedLi.offset().top < FormulaStack.Container.offset().top
            ) {
                FormulaStack.Container.scrollTop(
                    FormulaStack.Container.scrollTop() +
                    selectedLi.offset().top -
                    FormulaStack.Container.offset().top
                );
            }
        }
    },

    // 获取元素的值
    GetElementExpression: function (selector) {
        var clone = $('<div></div>').append($(selector).clone());
        clone.find('[' + FormulaSettings.ExpressionAttrName + ']').each(function () {
            $(this).text($(this).attr(FormulaSettings.ExpressionAttrName));
        });
        return clone.text();
    },

    // _PrevTextSuffix: _PrevText的后缀
    GetPrevText: function (node, prevTextSuffix) {
        if (typeof prevTextSuffix === 'undefined') {
            prevTextSuffix = '';
        }
        // 如果当前节点是Editor
        if (FormulaSettings.IsEditor(node)) {
            return prevTextSuffix;
        } else {
            var prevText = '';
            for (var i = 0; i < node.parentNode.childNodes.length; i++) {
                if (node != node.parentNode.childNodes[i]) {
                    prevText += FormulaSettings.GetElementExpression(
                        node.parentNode.childNodes[i]
                    );
                } else {
                    break;
                }
            }
            prevTextSuffix = prevText + prevTextSuffix;

            if (FormulaSettings.IsEditor(node.parentNode)) {
                return prevTextSuffix;
            } else {
                return FormulaSettings.GetPrevText(node.parentNode, prevTextSuffix);
            }
        }
    },

    // _NextTextPrefix: _NextText的前缀
    GetNextText: function (node, nextTextPrefix) {
        if (typeof nextTextPrefix === 'undefined') {
            nextTextPrefix = '';
        }
        // 如果当前节点是Editor
        if (FormulaSettings.IsEditor(node)) {
            return nextTextPrefix;
        } else {
            var nextText = '';
            for (var i = node.parentNode.childNodes.length - 1; i >= 0; i--) {
                if (node != node.parentNode.childNodes[i]) {
                    nextText =
                        FormulaSettings.GetElementExpression(
                            node.parentNode.childNodes[i]
                        ) + nextText;
                } else {
                    break;
                }
            }
            nextTextPrefix += nextText;

            if (FormulaSettings.IsEditor(node.parentNode)) {
                return nextTextPrefix;
            } else {
                return FormulaSettings.GetNextText(node.parentNode, nextTextPrefix);
            }
        }
    },

    // 获取选中区域的上下文
    // _IsIntelligent:在感知中
    GetContext: function (container, offset, isIntelligent) {
        var prevText = '';
        var nextText = '';
        // container是文本
        if (container.nodeType == 3) {
            prevText = $(container).text().substring(0, offset);
            nextText = $(container)
                .text()
                .substring(offset, $(container).text().length);

            prevText = FormulaSettings.GetPrevText(container, prevText);
            nextText = FormulaSettings.GetNextText(container, nextText);
        } else if (FormulaSettings.IsEditor(container)) {
            // 如果container是编辑器
            for (var i = 0; i < offset; i++) {
                prevText += FormulaSettings.GetElementExpression(
                    FormulaStack.Editor[0].childNodes[i]
                );
            }
            for (var i = offset; i < FormulaStack.Editor[0].childNodes.length; i++) {
                nextText += FormulaSettings.GetElementExpression(
                    FormulaStack.Editor[0].childNodes[i]
                );
            }
        } else {
            // 如果Container不是文本也不是编辑器
            if (container.childNodes.length > 0) {
                if (offset > 0) {
                    prevText = FormulaSettings.GetElementExpression(
                        container.childNodes[offset - 1]
                    );

                    prevText = FormulaSettings.GetPrevText(
                        container.childNodes[offset - 1],
                        prevText
                    );
                    nextText = FormulaSettings.GetNextText(
                        container.childNodes[offset - 1],
                        nextText
                    );
                } else {
                    nextText = FormulaSettings.GetElementExpression(
                        container.childNodes[0]
                    );

                    prevText = FormulaSettings.GetPrevText(
                        container.childNodes[0],
                        prevText
                    );
                    nextText = FormulaSettings.GetNextText(
                        container.childNodes[0],
                        nextText
                    );
                }
            } else {
                prevText = FormulaSettings.GetPrevText(container, prevText);
                nextText = FormulaSettings.GetNextText(container, nextText);
            }
        }

        // 如果在感知中,前面的文本应去除感知片段长度
        if (isIntelligent && FormulaStack.IntelligentString) {
            prevText = prevText.substring(
                0,
                prevText.length - FormulaStack.IntelligentString.length
            );
        }

        return {
            PrevText: prevText,
            NextText: nextText
        };
    },
    // 获取数据的code编码Error:手动输入时候有的情况下无法获取到code
    GetCode: function (container, offset) {
        // 按照GetContext的规则分割PrevCode和NextCode
        const context = FormulaSettings.GetContext(
            FormulaStack.Range.endContainer,
            FormulaStack.Range.endOffset
        );
        const wholeCode = FormulaSettings.GetEditorCode(
            FormulaStack.Editor,
            FormulaStack.Range.endOffset
        );
        const prevLength = FormulaSettings.sliceText(context.PrevText).length;
        const sliceCode = FormulaSettings.sliceText(wholeCode);
        const prevCode = sliceCode.slice(0, prevLength).join('');
        const nextCode = sliceCode.slice(prevLength).join('')
        // console.log(prevCode);
        // console.log('=============================')
        // console.log(nextCode);
        return {
            PrevCode: prevCode,
            NextCode: nextCode
        };
        // var prevCode = '';
        // var nextCode = '';
        // // container是文本
        // if (container.nodeType == 3) {
        //     prevCode = $(container).text().substring(0, offset);
        //     nextCode = $(container)
        //         .text()
        //         .substring(offset, $(container).text().length);

        //     prevCode = FormulaSettings.GetPrevText(container, prevCode);
        //     nextCode = FormulaSettings.GetNextText(container, nextCode);

        //     prevCode = '';
        //     nextCode = '';
        //     var spans = FormulaStack.Editor[0].childNodes;
        //     var codeffset = spans.length;
        //     var index = 0;
        //     for (var i = 0; i < codeffset; i++) {
        //         var code = $(spans[i]).attr('data-value');
        //         index++;
        //         if (code == void 0 && $(spans[i]).text() == $(container).text()) {
        //             prevCode += $(container).text().substring(0, offset);
        //             nextCode += $(container)
        //                 .text()
        //                 .substring(offset, $(container).text().length);
        //             break;
        //         }
        //         prevCode += code == void 0 ? $(spans[i]).text() : code;
        //     }
        //     for (var j = index; j < codeffset; j++) {
        //         var code = $(spans[j]).attr('data-value');
        //         nextCode += code == void 0 ? $(spans[i]).text() : code;
        //     }
        // } else if (FormulaSettings.IsEditor(container)) {
        //     // 如果container是编辑器
        //     // offset = FormulaStack.Editor[0].childNodes.length;
        //     var len = FormulaStack.Editor[0].childNodes.length;
        //     // var step = (len > offset) ? (len - offset) : offset;
        //     for (var i = 0; i < offset; i++) {
        //         var code = $(FormulaStack.Editor[0].childNodes[i]).attr('data-value');
        //         // prevCode += code == undefined ? '' : code;
        //         prevCode +=
        //             code == void 0 ? $(FormulaStack.Editor[0].childNodes[i]).text() : code;
        //     }
        //     for (var i = offset; i < len; i++) {
        //         var code = $(FormulaStack.Editor[0].childNodes[i]).attr('data-value');
        //         // nextCode += code == undefined ? '' : code;
        //         nextCode +=
        //             code == void 0 ? $(FormulaStack.Editor[0].childNodes[i]).text() : code;
        //     }
        // } else {
        //     // 如果Container不是文本也不是编辑器
        //     if (container.childNodes.length > 0) {
        //         if (offset > 0) {
        //             prevCode = $(container.childNodes[offset - 1]).attr('data-value');

        //             prevCode = FormulaSettings.GetPrevText(
        //                 container.childNodes[offset - 1],
        //                 prevCode
        //             );
        //             nextCode = FormulaSettings.GetNextText(
        //                 container.childNodes[offset - 1],
        //                 nextCode
        //             );
        //         } else {
        //             nextCode = $(container.childNodes[0]).attr('data-value');

        //             prevCode = FormulaSettings.GetPrevText(
        //                 container.childNodes[0],
        //                 prevCode
        //             );
        //             nextCode = FormulaSettings.GetNextText(
        //                 container.childNodes[0],
        //                 nextCode
        //             );
        //         }
        //     } else {
        //         prevCode = FormulaSettings.GetPrevText(container, prevCode);
        //         nextCode = FormulaSettings.GetNextText(container, nextCode);
        //     }
        // }

        // return {
        //     PrevCode: prevCode,
        //     NextCode: nextCode
        // };
    },
    // 获取全部的code
    GetEditorCode (container, offset) {
        var prevCode = '';
        var nextCode = '';
        // 如果container是编辑器
        // offset = FormulaStack.Editor[0].childNodes.length;
        var len = FormulaStack.Editor[0].childNodes.length;
        // var step = (len > offset) ? (len - offset) : offset;
        for (var i = 0; i < offset; i++) {
            var code = $(FormulaStack.Editor[0].childNodes[i]).attr('data-value');
            // prevCode += code == undefined ? '' : code;
            prevCode +=
                code == void 0 ? $(FormulaStack.Editor[0].childNodes[i]).text() : code;
        }
        for (var i = offset; i < len; i++) {
            var code = $(FormulaStack.Editor[0].childNodes[i]).attr('data-value');
            // nextCode += code == undefined ? '' : code;
            nextCode +=
                code == void 0 ? $(FormulaStack.Editor[0].childNodes[i]).text() : code;
        }
        return prevCode + nextCode;
    },
    // 把规则分割，为了取得长度
    sliceText (str) {        
        const reg = /{([^{}}]+)}|[uor]\([^{}}()]+\)/g;
        let result = [];
        let index = 0;
        str.replace(reg, (match, escape, offset, evaluate) => {
            const prevArrs = str.slice(index, offset).split('');
            result.push(...prevArrs);
            index = offset + match.length;
            result.push(match);
        });
        if (index > 0) {
            const lastArrs = str.slice(index);
            result.push(...lastArrs);
        }
        return result;
    },
    GetDisplayHtml: function (formula, formulaCode) {
        console.time('displayHtml')
        var Offset = 0; // TEXT的解析位置标识
        var FieldIndex = 0; // 解析到第几个表单数据项标识
        var NextChar;
        var Html = $('<div></div>');
        // 组装文本
        while (Offset < formula.length) {
            // 剩下的公式
            var remainFormula = formula.substring(Offset, formula.length);

            // 下一个字符
            NextChar = remainFormula[0];

            // 是分隔符
            var dividers = remainFormula.match(/[+\-/*/()<>\s!&|=]+/);
            if (
                dividers &&
                dividers.length > 0 &&
                remainFormula.indexOf(dividers[0]) == 0
            ) {
                Html.append($('<span class=\'dividers\'></span>').text(dividers[0]));
                Offset += dividers[0].length;
                continue;
            } else {
                // 不是分隔符
                // 双引号打头
                if (NextChar == '"') {
                    // 关闭双引号
                    var CloseQuotationIndex = remainFormula.indexOf('"', 1);
                    if (CloseQuotationIndex > -1) {
                        Html.append(
                            $('<span></span>')
                                .attr(FormulaSettings.ExecutionTypeName, ExecutionTypes.Input)
                                .text(remainFormula.substring(0, CloseQuotationIndex + 1))
                        );
                        Offset += CloseQuotationIndex + 1;
                    } else {
                        // 双引号未关闭,后面全改为输入样式
                        Html.append(
                            $('<span></span>')
                                .attr(FormulaSettings.ExecutionTypeName, ExecutionTypes.Input)
                                .text(remainFormula)
                        );
                        break;
                    }
                } else if (NextChar == '{') {
                    ++FieldIndex;
                    var CloseVaribleIndex = remainFormula.indexOf('}', 1);
                    if (CloseVaribleIndex > -1) {
                        var varibleText = remainFormula.substring(0, CloseVaribleIndex + 1);
                        if (varibleText) {
                            var blockHtml =
                                '<span style="font-family: Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;display:inline-block;font-size:14px">' +
                                varibleText +
                                '</span>';
                            var block = $(blockHtml);
                            $('body').append(block);

                            // 先绘制矩形区域
                            var color = 'rgb(45,127,255)';
                            var isCurrentSheet = true;
                            // 当前的数据项code,用于判断是否是当前表单字段,业务规则和关联表单过滤才做判断
                            if (FormulaType == FormulaTypeList.BUSINESS || FormulaType == FormulaTypeList.ASSOCIATIONFILTER) {
                                isCurrentSheet = FormulaSettings.IsCurrentSheetFiled(formulaCode, FieldIndex);
                            }
                            if (!isCurrentSheet) {
                                color = 'rgb(25,158,216)';
                            }
                            // 使用jq获取宽度影响性能，改用字符计算宽度
                            // var width = block.width() + 1;
                            var width = (varibleText.replace(/[\u0391-\uFFE5&]/g,"aa").length - 2) * 7 + 10

                            var font = '14px/1em Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif';
                            var $canvas = null;
                            var img = new Image();
                            // IE不支持SVG图片展示方式
                            // 20180118有客户字段名称中配置了&符号，导致svg绘图出错，暂时全部采用canvas的方式
                            // 20190522 使用canvas绘图性能过低，数据量多时会卡顿，高级浏览器使用SVG绘图，&符号使用&amp;替换
                            if ((window.navigator.userAgent.indexOf('MSIE') > -1 || window.navigator.userAgent.indexOf('rv:11') > -1) && (window.navigator.userAgent.indexOf('Opera') < 0)) {
                                // IE用canvas
                                $canvas = $('<canvas width="' + width + 'px" height="20px"></canvas>');
                                $canvas.css({ 'margin': '0px', 'text-align': 'center' });
                                $canvas.appendTo('body');
                                var c = $canvas[0];
                                var ctx = c.getContext('2d');
                                ctx.textAlign = 'center';
                                ctx.fillStyle = color;
                                ctx.fillRect(0, 0, width, 20);
                                ctx.fillStyle = 'white';
                                // 绘制文字
                                ctx.font = font;
                                ctx.fillText(varibleText.replace('{', '').replace('}', ''), width / 2, 15);
                                img.src = c.toDataURL();
                            } else {
                                // 如果名称中有"&"符号处理有问题
                                // 非IE浏览器用svg
                                // var data = "data:image/svg+xml,";
                                // data += "<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='20'>";
                                // data += "<foreignObject width='100%' height='20'>";
                                // data += "<p xmlns='http://www.w3.org/1999/xhtml' style='font-family:" + font + ";margin:0;background:" + color + ";color:rgb(255,255,255);height:20px;line-height:20px;text-indent:5px;'>";
                                // data += varibleText.replace("{", "").replace("}", "");
                                // data += "</p>";
                                // data += "</foreignObject>";
                                // data += "</svg>";
                                var data =
                                    'data:image/svg+xml,' +
                                    '<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'' +
                                    width +
                                    '\' height=\'20\'>' +
                                    '<foreignObject width=\'100%\' height=\'20\'>' +
                                    // "<body xmlns='http://www.w3.org/1999/xhtml' style='margin: 0;'>" +
                                    '<p xmlns=\'http://www.w3.org/1999/xhtml\' style=\'font-family: Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;font-size:14px;margin:0;background:' +
                                    color +
                                    ';color:rgb(255,255,255);' +
                                    'height:20px;line-height: 20px;text-indent: 5px;\'> ' +
                                    varibleText.replace('{', '').replace('}', '').replace('&', '&amp;') +
                                    ' </p>' +
                                    // '</body>' +
                                    '</foreignObject>' +
                                    '</svg>';
                                img.src = data;
                            }
                            $(img).attr('expression-text', varibleText)
                                .attr(FormulaSettings.ExpressionAttrName, varibleText)
                                .attr(FormulaSettings.ExecutionTypeName, ExecutionTypes.Varible)
                                .css('vertical-align', 'middle')
                                .attr('style', 'width:' + width + 'px;height:20px');
                            $(img).appendTo(Html);
                            block.remove();
                            $canvas && $canvas.remove();
                            Offset += varibleText.length;
                        }
                    } else {
                        // ERROR:'{'未关闭,后面全改为变量输入样式
                        Html.append($('<span></span>').text(remainFormula));
                        break;
                    }
                } else if (NextChar == ',' || NextChar == ';') {
                    // 逗号
                    Html.append(
                        $('<span class=\'delimiter\'></span>').text(
                            NextChar
                        ) /*.attr('data-value', NextChar) */
                    );
                    Offset++;
                } else {
                    // 字符块
                    // 如果字符块有结束
                    if (remainFormula.match(/[+\-/*/()<>\s!&|]+/)) {
                        // 字符块长度
                        var blockLength = remainFormula.indexOf(
                            remainFormula.match(/[+\-/*/()<>\s!&|]+/)
                        );
                        var blockText = remainFormula.substring(0, blockLength);
                        // 判断块里面是否有逗号:{}>20,{}
                        if (blockText.indexOf(',') >= 0) {
                            blockText = remainFormula.substring(0, remainFormula.indexOf(','));
                            blockLength = remainFormula.indexOf(',');
                        }
                        var block = $('<span></span>').text(blockText);

                        // 如果是U结构
                        if (blockText == 'U') {
                            // 获取 U ( UserCode ) 结构
                            // var userExpressions = remainFormula.match(/U[\s]*[(][\s]*[0-9A-z\-]+[\s]*[)]/);
                            // 编码允许中文
                            var userExpressions = remainFormula.match(/U[\s]*[(][^)]*[)]/);
                            if (userExpressions && userExpressions[0]) {
                                // 获取 UserCode
                                // 左右括号位置
                                var leftParIndex = userExpressions[0].indexOf('(');
                                var rightParIndex = userExpressions[0].indexOf(')');
                                if (leftParIndex < rightParIndex) {
                                    var userKey = userExpressions[0]
                                        .substring(leftParIndex + 1, rightParIndex)
                                        .trim();
                                    if (
                                        userKey &&
                                        FormulaStack.UnitCache[userKey.toLowerCase()]
                                    ) {
                                        block
                                            .attr(
                                                FormulaSettings.ExecutionTypeName,
                                                ExecutionTypes.User
                                            )
                                            .attr('data-value', userKey)
                                            .appendTo(Html);

                                        Offset += userExpressions[0].length;
                                        continue;
                                    }
                                }
                            }
                        }
                        // 如果是函数名称
                        if (FormulaSettings.IsFunctionName(blockText)) {
                            // 函数
                            block.attr(
                                FormulaSettings.ExecutionTypeName,
                                ExecutionTypes.Function
                            );
                        }

                        Html.append(block);

                        Offset += blockLength;
                    } else {
                        var blockLength = remainFormula.indexOf(',');
                        if (blockLength > -1) {
                            var blockText = remainFormula.substring(0, blockLength);
                            var block = $('<span></span>').text(blockText);
                            Html.append(block);
                            Offset += blockLength;
                        } else {
                            // 字符块未结束,后面全改为字符块输入样式
                            Html.append($('<span></span>').text(remainFormula));
                            break;
                        }
                    }
                }
            }
        }
        // 增加data-value
        if (formulaCode != void 0) {
            // debugger            
            var startIndex = 0;
            var endIndex = 0;
            Offset = 0;
            $(Html).children().each(function () {
                var attr = $(this).attr('executiontype');
                if (
                    attr != void 0 &&
                    (attr == ExecutionTypes.User || attr == ExecutionTypes.Varible)
                ) {
                    // 从FormulaCode中查找变量,如果先有{则匹配变量，如果先有u(则匹配用户
                    var index1 = formulaCode.indexOf('{', Offset);
                    var indexu = formulaCode.indexOf('u(', Offset);
                    var indexo = formulaCode.indexOf('o(', Offset);
                    var index2= ""
                    if(indexu!=-1&&indexo!=-1){
                        index2=indexo<=indexu?indexo:indexu
                    }
                    else if(indexu==-1){
                        index2=indexo
                    }
                    else if(indexo==-1){
                        index2=indexu
                    }
                    else{
                        index2=-1
                    }
                    
                   
                    if (index1 > -1) {
                        if (index2 > -1) {
                            if (index1 < index2) {
                                // 变量
                                startIndex = index1;
                                if (Offset + 1 <= startIndex) {
                                    Offset = startIndex;
                                }
                                endIndex = formulaCode.indexOf('}', Offset + 1);
                                // 处理字符串中出现{}的情况
                                let nextIndex = formulaCode.indexOf('{', Offset + 1);
                                while (nextIndex <= endIndex && nextIndex > -1) {
                                    endIndex = formulaCode.indexOf('}', endIndex + 1);
                                    nextIndex = formulaCode.indexOf('{', nextIndex + 1);
                                }
                            } else {
                                // 用户
                                startIndex = index2;
                                if (Offset + 1 <= startIndex) {
                                    Offset = startIndex;
                                }
                                endIndex = formulaCode.indexOf(')', Offset + 1);
                            }
                        } else {
                            // 变量
                            startIndex = index1;
                            if (Offset + 1 <= startIndex) {
                                Offset = startIndex;
                            }
                            endIndex = formulaCode.indexOf('}', Offset + 1);
                            // 处理字符串中出现{}的情况
                            let nextIndex = formulaCode.indexOf('{', Offset + 1);
                            while (nextIndex <= endIndex && nextIndex > -1) {
                                endIndex = formulaCode.indexOf('}', endIndex + 1);
                                nextIndex = formulaCode.indexOf('{', nextIndex + 1);
                            }
                        }
                    } else if (index2 > -1) {
                        // 用户
                        startIndex = index2;
                        if (Offset + 1 <= startIndex) {
                            Offset = startIndex;
                        }
                        endIndex = formulaCode.indexOf(')', Offset + 1);
                    }
                    if (endIndex > startIndex) {
                        var code = formulaCode.substring(startIndex, endIndex + 1);
                        $(this).attr('data-value', code);
                        Offset = endIndex + 1;
                    }
                }
            });
        }
        console.timeEnd('displayHtml')
        return Html.html();
    },

    // 获取字符位置

    getPlaceFromString: function (str, subStr) {
        var positions = new Array();
        var pos = str.indexOf(subStr);
        while (pos > -1) {
            positions.push(pos);
            pos = str.indexOf(subStr, pos + 1);
        }
        return positions;
    },

    // 判断字段是否是当前表单字段
    IsCurrentSheetFiled: function (formulaCode, filedIndex) {
        // debugger
        var code; // 当前索引的  code
        // 1、  '{'  开头
        // 2、  'u(' 开头
        var pos1 = FormulaSettings.getPlaceFromString(formulaCode, '{'),
            pos2 = FormulaSettings.getPlaceFromString(formulaCode, 'u('),
            pos = pos1.concat(pos2).sort(function sortNumber (a, b) {
                return a - b;
            });

        // 获取当前字段编码
        try {
            code = formulaCode
                .substring(pos[filedIndex - 1])
                .split('}')[0]
                .split(')')[0]
                .replace('{', '')
                .replace('u(', '');
        } catch (e) {
            return false;
        }

        var codes = code.split('.');
        if (codes.length == 1) {
            if ($.inArray(code, CurSheetFileds) > -1) {
                return true;
            }
        } else if (codes.length == 2) {
            if(codes[0]&&codes[0].length>40){
                var appId  = JSON.parse(sessionStorage.getItem("currentApp")).appId;
                if(codes[0]==appId){
                    return true
                }
                else{
                    return false
                }
            }
            else{
                if ($.inArray(codes[0], CurSheetFileds) > -1) {
                    return true;
                }
            }
           
        }
        return false;
    },

    // 编辑过程中重设全部
    //  _TriggerIntelligent 是否触发感知事件
    //  _PrevText和_NextText用于更新光标位置
    //  _ForceReset:考虑性能可能延时处理,若使用_ForceReset则强制立即处理
    //  _ResetCursor:重设光标
    ResetAll: function (
        triggerIntelligent,
        prevText,
        nextText,
        forceReset,
        resetCursor,
        dataValue
    ) {
        // debugger
        if (FormulaStack.Editor[0].childNodes.length == 0) {
            // var span = document.createElement("span");
            // FormulaStack.Editor.append(span);
            // FormulaSettings.FocusAfter(span);
            FormulaStack.Editor.focus();
        }
        // 已测试,持续重新调整会引发性能问题,其中两次粘贴间至少40毫秒,此处取200
        // 如果200毫秒秒内处理过,延后处理
        var currentTime = new Date().getTime();
        if (!FormulaStack.LatestResetTime) {
            FormulaStack.LatestResetTime = currentTime;
        } else if (
            !forceReset &&
            currentTime - FormulaStack.LatestResetTime < 200
        ) {
            // 更新最后请求时间
            FormulaStack.LatestRequestTime = currentTime;
            setTimeout(
                function (setTime) {
                    // 不是最新请求,不处理
                    if (setTime != FormulaStack.LatestRequestTime) {
                        return;
                    }
                    // 重设全部内容
                    FormulaSettings.ResetAll();
                },
                200,
                currentTime
            );
            return;
        }

        if (prevText || nextText) {
        } else {
            var textContext = FormulaSettings.GetContext(
                FormulaStack.Range.endContainer,
                FormulaStack.Range.endOffset
            );
            prevText = textContext.PrevText;
            nextText = textContext.NextText;
        }
        if (dataValue == void 0) {
            // dataValue==undefined即未传入编码，为手动输入的时候，FormulaStack.Range中无法取到code，需要从Editor中取
            var codeContext = FormulaSettings.GetCode(
                FormulaStack.Editor,
                FormulaStack.Range.endOffset
            );
            // var codeContext = FormulaSettings.GetCode(FormulaStack.Range.endContainer, FormulaStack.Range.endOffset);
            var prevCode = codeContext.PrevCode;
            var nextCode = codeContext.NextCode;
            dataValue = prevCode + nextCode;
        }
        var formula = prevText + nextText;

        // 两次文本一样,不重设
        if (!forceReset && formula == FormulaStack.LastText) {
            return;
        } else {
            FormulaStack.LastText = formula;
        }

        var containerClone = $('<div></div>');
        containerClone.html(FormulaSettings.GetDisplayHtml(formula, dataValue));

        if (
            resetCursor ||
            // || (forceReset && triggerIntelligent)
            FormulaStack.Range.startOffset == 0 ||
            // 前面文本为空或分隔符,直接重置
            !prevText ||
            prevText
                .substring(prevText.length - 1, prevText.length)
                .match(/[=+\-/*/()<>\s!&|",}]+/g) ||
            // 如果startContainer 是空<span><span>
            (FormulaStack.Range.startContainer &&
                FormulaStack.Range.startContainer.tagName &&
                FormulaStack.Range.startContainer.childNodes.length == 0 &&
                FormulaStack.Range.startContainer.tagName.toLowerCase() == 'span')
        ) {
            FormulaStack.Editor.html(containerClone.html());
            var preCharCount = 0;
            // 重置光标
            for (var i = 0; i < FormulaStack.Editor[0].childNodes.length; i++) {
                var currentValueLength = FormulaSettings.GetElementExpression(
                    FormulaStack.Editor[0].childNodes[i]
                ).length;
                preCharCount += currentValueLength;
                if (preCharCount >= prevText.length) {
                    if (preCharCount == prevText.length) {
                        FormulaSettings.FocusAfter(FormulaStack.Editor[0].childNodes[i]);

                        // 感知框
                        if (
                            triggerIntelligent &&
                            prevText &&
                            prevText[prevText.length - 1].match(/\s/)
                        ) {
                            FormulaStack.IntelligentString = '';
                            FormulaSettings.Intelligent(
                                FormulaStack.Editor[0].childNodes[i].childNodes[0],
                                $(FormulaStack.Editor[0].childNodes[i].childNodes[0]).text()
                                    .length
                            );
                        } else {
                            FormulaSettings.HideIntelligent();
                        }
                    } else {
                        var range = document.createRange();
                        range.setStart(
                            FormulaStack.Editor[0].childNodes[i].childNodes[0],
                            prevText.length - (preCharCount - currentValueLength)
                        );
                        range.setEnd(
                            FormulaStack.Editor[0].childNodes[i].childNodes[0],
                            prevText.length - (preCharCount - currentValueLength)
                        );
                        FormulaSettings.FocusRange(range);

                        // 感知框
                        if (
                            triggerIntelligent &&
                            prevText &&
                            prevText[prevText.length - 1].match(/\s/)
                        ) {
                            FormulaStack.IntelligentString = '';
                            FormulaSettings.Intelligent(
                                FormulaStack.Editor[0].childNodes[i].childNodes[0],
                                prevText.length - (preCharCount - currentValueLength)
                            );
                        } else {
                            FormulaSettings.HideIntelligent();
                        }
                    }

                    break;
                }
            }
            FormulaStack.Editor.focus();
        } else {
            if (
                !forceReset &&
                FormulaStack.Range.startContainer.nodeType == 3 &&
                prevText &&
                prevText[prevText.length - 1].match(/[A-z]/)
            ) {
                // 获得感知字符串
                var preCharCount = 0;
                for (var i = 0; i < containerClone[0].childNodes.length; i++) {
                    var currentValueLength = FormulaSettings.GetElementExpression(
                        containerClone[0].childNodes[i]
                    ).length;
                    preCharCount += currentValueLength;
                    if (preCharCount >= prevText.length) {
                        FormulaStack.IntelligentString = prevText.substring(
                            preCharCount - currentValueLength,
                            prevText.length
                        );
                        break;
                    }
                }
                FormulaSettings.Intelligent(
                    FormulaStack.Range.startContainer,
                    FormulaStack.Range.startOffset
                );
            } else {
                var prevContainer = $('<div></div>');
                var nextContainer = $('<div></div>');
                // 当前节点副本
                var currentNodeClone;
                //
                var preCharCount = 0;
                // 光标在当前元素上的位置
                var cursorOffset;
                var prevNode;
                var currentNode;
                var nextNode;

                // 文本节点
                if (FormulaStack.Range.startContainer.nodeType == 3) {
                    cursorOffset = FormulaStack.Range.startOffset;
                    prevNode = currentNode = nextNode = FormulaStack.Range.startContainer;
                } else if (
                    FormulaSettings.IsEditor(FormulaStack.Range.startContainer)
                ) {
                    // Editor
                    if (
                        FormulaStack.Range.startContainer.childNodes[
                            FormulaStack.Range.startOffset - 1
                        ].nodeType == 3
                    ) {
                        cursorOffset = $(
                            FormulaStack.Range.startContainer.childNodes[i]
                        ).text().length;
                        prevNode = currentNode = nextNode =
                            FormulaStack.Range.startContainer.childNodes[i];
                    } else {
                        var span =
                            FormulaStack.Range.startContainer.childNodes[
                                FormulaStack.Range.startOffset - 1
                            ];
                        prevNode = currentNode = nextNode =
                            span.childNodes[span.childNodes.length - 1];
                        cursorOffset = $(prevNode).text().length;
                    }
                } else {
                    // span
                    cursorOffset = $(
                        FormulaStack.Range.startContainer.childNodes[
                            FormulaStack.Range.startOffset - 1
                        ]
                    ).text().length;
                    prevNode = currentNode = nextNode =
                        FormulaStack.Range.startContainer.childNodes[
                            FormulaStack.Range.startOffset - 1
                        ];
                }

                // 感知字符串
                for (var i = 0; i < containerClone[0].childNodes.length; i++) {
                    var currentValueLength = FormulaSettings.GetElementExpression(
                        containerClone[0].childNodes[i]
                    ).length;
                    preCharCount += currentValueLength;
                    if (!currentNodeClone) {
                        if (preCharCount >= prevText.length) {
                            // 感知字符串
                            FormulaStack.IntelligentString = prevText.substring(
                                preCharCount - currentValueLength,
                                prevText.length
                            );

                            // 目标样式
                            currentNodeClone = containerClone[0].childNodes[i];
                            // 复制span属性
                            $(prevNode)
                                .parent()
                                .removeAttr(FormulaSettings.ExpressionAttrName)
                                .removeAttr(FormulaSettings.ExecutionTypeName)
                                .attr(
                                    FormulaSettings.ExecutionTypeName,
                                    $(currentNodeClone).attr(FormulaSettings.ExecutionTypeName)
                                )
                                .attr(
                                    FormulaSettings.ExpressionAttrName,
                                    $(currentNodeClone).attr(FormulaSettings.ExpressionAttrName)
                                );

                            /** *修改当前节点的内容***/
                            var range = document.createRange();

                            {
                                // 如果文本后侧长度超过应有
                                if (
                                    $(prevNode).text().length - cursorOffset >
                                    preCharCount - prevText.length
                                ) {
                                    // 删减多余尾部
                                    range.setStart(
                                        prevNode,
                                        cursorOffset + (preCharCount - prevText.length)
                                    );
                                    range.setEnd(prevNode, $(prevNode).text().length);
                                    range.deleteContents();
                                } else if (
                                    $(prevNode).text().length - cursorOffset + prevText.length <
                                    preCharCount
                                ) {
                                    // 如果文本后侧短于应有
                                    range.setStart(prevNode, prevNode.length);
                                    range.setEnd(prevNode, prevNode.length);

                                    // 尾部添加额外文本
                                    var text = document.createTextNode(
                                        formula.substring(
                                            prevText.length +
                                            ($(prevNode).text().length - cursorOffset),
                                            preCharCount
                                        )
                                    );
                                    $(currentNode).after(text);

                                    // 记录后元素
                                    nextNode = text;
                                }

                                // 前段应有长度
                                var shouldLength =
                                    prevText.length - (preCharCount - currentValueLength);

                                // 前段文本长于应有
                                if (cursorOffset > shouldLength) {
                                    // 删除前段多余文本

                                    // 冗余长度
                                    var redudanceLength = cursorOffset - shouldLength;
                                    prevNode.deleteData(0, redudanceLength);

                                    // 记录新的偏移位置
                                    cursorOffset -= redudanceLength;
                                } else if (cursorOffset < shouldLength) {
                                    // 前端文本少于应有
                                    // 缺少长度
                                    var lackLength = shouldLength - cursorOffset;

                                    // 前端添加额外文本
                                    range.setStart(prevNode, 0);
                                    range.setEnd(prevNode, 0);

                                    var text = document.createTextNode(
                                        prevText.substring(
                                            preCharCount - currentValueLength,
                                            prevText.length - cursorOffset
                                        )
                                    );
                                    range.insertNode(text);

                                    // 记录前元素
                                    prevNode = text;
                                }
                            }
                        } else {
                            $(containerClone[0].childNodes[i]).clone().appendTo(prevContainer);
                        }
                    } else {
                        $(containerClone[0].childNodes[i]).clone().appendTo(nextContainer);
                    }
                }

                // TODO:删除前后所有节点
                FormulaSettings.deleteBefore(prevNode);
                FormulaSettings.deleteBehind(nextNode);

                // 添加副本元素到前\后
                if (prevContainer.html()) {
                    $(FormulaSettings.getEditorChildNode(prevNode)).before(
                        prevContainer.html()
                    );
                }
                if (nextContainer.html()) {
                    $(FormulaSettings.getEditorChildNode(nextNode)).after(
                        nextContainer.html()
                    );
                }
                // TODO:触发智能感知事件
                FormulaSettings.Intelligent(currentNode, cursorOffset);
            }
        }

        // 函数感知
        if (
            typeof IntelligentFunctions !== typeof undefined &&
            prevText &&
            prevText.trim() &&
            prevText.trim().length >= 2 &&
            // 非输入模式
            (prevText.match(/"/g) == null || prevText.match(/"/g).length % 2 == 0)
        ) {
            // 翻转的前段文本
            var reversePrevString = prevText.trim().split('').reverse().join('');
            // 从后往前匹配符号
            // 若当前位置的前一个符号是, 则当前位于函数输入
            // 若当前位置前一个符号是( 则【可能】当前位于函数输入的第一个参数
            var symbols = reversePrevString.match(/[,\(\)\+\-\*\\=><!&\|]/);
            if (!symbols) {
                return;
            }
            // 前一符号是(
            if (symbols[0] == '(') {
                // 去掉(后所有内容
                reversePrevString = reversePrevString.substring(
                    reversePrevString.indexOf('('),
                    reversePrevString.length
                );
                // 去掉所有(
                reversePrevString = reversePrevString.replace(/\(+/, ' ').trim();
                // 函数名称
                var functionName = reversePrevString.match(/[_A-z0-9]*[_A-z]+/);
                if (functionName && reversePrevString.indexOf(functionName[0]) == 0) {
                    functionName = functionName[0].split('').reverse().join('');
                    // 描述区域显示函数
                    FormulaSettings.ShowFunctionHelper(functionName);
                }
            } else if (symbols[0] == ',') {
            }
        }
    }
};

export const FormulaStack = {
    // 编辑框
    Editor: void 0,
    // 智能感知框
    Container: void 0,
    // 智能感知列表ul
    IntelligentList: void 0,
    // 描述框
    Description: void 0,

    // 参数描述
    ArgDescription: void 0,

    // 选择区
    Range: void 0,

    // 智能感知字符串
    IntelligentString: '',

    // 用户缓存, < Code/ID , UserName >
    UnitCache: {},
    // 上次处理时的文本,用于避免重复处理
    LastText: void 0,
    // 最后请求调整时间
    LatestRequestTime: void 0,
    // 最后调整时间
    LatestResetTime: void 0
};

// 编辑器事件
export const FormulaEditorEvent = {
    // 键按下的keycode
    keydownCode: null,
    // 键按下时当前编辑器的上下文
    keydownContext: '',
    // 键按下
    DoKeyDown: function (e) {
        // 不允许输入`(192)，
        var forbiddenChars = [192];
        if ($.inArray(e.which, forbiddenChars) > -1) {
            return false;
        }
        // 存储keycode
        this.keydownCode = e.which;
        // 存储编辑器上下文
        this.keydownContext = FormulaSettings.GetContext(
            FormulaStack.Range.endContainer,
            FormulaStack.Range.endOffset
        );
        // 上/下箭头 , 若智能感知框可见,选中智能感知中的项
        if (e.which == 38 || e.which == 40) {
            if (FormulaStack.Container.is(':visible')) {
                var selectedLi = $(
                    'li.' + FormulaStyleClassName.ItemSelected + ':first'
                );
                // 向上
                if (e.which == 38) {
                    var findPrevVisbleLi = function (currentLi, filterString) {
                        var targetLi = $(currentLi).prev();
                        for (; ;) {
                            if (!$(targetLi) || $(targetLi).length == 0) {
                                break;
                            }
                            if ($(targetLi).is(filterString)) {
                                return targetLi;
                            }
                            targetLi = $(targetLi).prev();
                        }
                    };
                    var prevLi = findPrevVisbleLi(selectedLi, ':visible');
                    if (
                        prevLi &&
                        prevLi.length > 0 &&
                        prevLi[0] &&
                        prevLi[0].tagName &&
                        prevLi[0].tagName.toLocaleLowerCase() == 'li'
                    ) {
                        selectedLi.removeClass(FormulaStyleClassName.ItemSelected);
                        prevLi.addClass(FormulaStyleClassName.ItemSelected);

                        FormulaSettings.LiSelected();

                        FormulaSettings.ShowDescription();
                    }
                }
                // 向下
                if (e.which == 40) {
                    var findNextVisbleLi = function (currentLi, filterString) {
                        var targetLi = $(currentLi).next();
                        for (; ;) {
                            if (!$(targetLi) || $(targetLi).length == 0) {
                                break;
                            }
                            if ($(targetLi).is(filterString)) {
                                return targetLi;
                            }
                            targetLi = $(targetLi).next();
                        }
                    };
                    var nextLi = findNextVisbleLi(selectedLi, ':visible');
                    if (
                        nextLi &&
                        nextLi.length > 0 &&
                        nextLi[0] &&
                        nextLi[0].tagName &&
                        nextLi[0].tagName.toLocaleLowerCase() == 'li'
                    ) {
                        selectedLi.removeClass(FormulaStyleClassName.ItemSelected);
                        nextLi.addClass(FormulaStyleClassName.ItemSelected);

                        FormulaSettings.LiSelected();

                        FormulaSettings.ShowDescription();
                    }
                }

                e.preventDefault();
            }
        } else if (e.which == 13) {
            // ENTER
            e.stopPropagation();
            e.preventDefault();
        }
    },
    // 键放开
    DoKeyUp: function (e) {
        // 中文逗号
        if( this.keydownCode === 229 && e.which === 188) {
            FormulaSettings.ResetAll(
                false,
                this.keydownContext.PrevText,
                this.keydownContext.NextText,
                true,
                true
            );
            alert('请使用英文逗号')
        }
        FormulaStack.Range = DocumentRange.getRange();
        // ESC , 若智能感知框可见,隐藏智能感知框
        if (e.which == 27) {
            if (FormulaStack.Container.is(':visible')) {
                FormulaSettings.HideIntelligent();

                e.preventDefault();
                e.stopPropagation();
            }
            return;
        }

        // 上/下箭头 , 若智能感知框可见,选中智能感知中的项
        if (
            (e.which == 38 || e.which == 40) &&
            FormulaStack.Container.is(':visible')
        ) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }

        // ENTER
        if (
            e.which == 13 &&
            $('li.' + FormulaStyleClassName.ItemSelected + ':visible').length > 0
        ) {
            FormulaSettings.DoLiSelect(
                'li.' + FormulaStyleClassName.ItemSelected + ':first'
            );
            FormulaSettings.HideIntelligent();
            e.preventDefault();
            return;
        }

        // 当前选中点
        if (
            !FormulaStack.Range ||
            !FormulaStack.Range.collapsed ||
            !FormulaStack.Range.startContainer
        ) {
            return;
        }

        // 任何副键已放开,重置
        if (!e.ctrlKey && !e.shiftKey && !e.altKey) {
            FormulaSettings.ResetAll(true);
        }
        // FormulaSettings.InsertVariable(e.which,e.which);
        // 隐藏校验信息
        // $('#formula_validate').text('');
        // $('.formula-container .row.validate').hide();
    },
    DoChange: function () {
        FormulaSettings.ResetAll(true);
    },
    // 鼠标放开
    DoMouseUp: function (e) {
        // TODO 鼠标聚焦调整功能先去掉
        // FormulaStack.Range = DocumentRange.getRange();
        // if (e.target && e.target.tagName && (e.target.tagName.toLocaleLowerCase() == "a" || e.target.tagName.toLocaleLowerCase() == "span")) {
        //   FormulaStack.Range.setStartAfter(e.target);
        //   FormulaStack.Range.setEndAfter(e.target);
        // }
    },
    // 粘贴
    DoPaste: function (e) {
        alert('暂不支持复制粘贴');
        // jquery未传入粘贴事件参数
        e = event;

        e.preventDefault();
        return;
        var clipboardData = e.clipboardData || window.clipboardData;
        if (clipboardData) {
            // 剪贴版文本
            var clontText = clipboardData.getData('Text');
            var range = DocumentRange.getRange();
            if (range) {
                range.deleteContents();
            }

            FormulaSettings.InsertBlock(clontText);

            // 添加延时调整请求
            FormulaSettings.ResetAll(true);
        }
    },
    // 复制
    DoCopy: function (e) {
        alert('暂不支持复制粘贴!');
        return;
        // jquery未传入���贴事件参数
        e = event;
        // 若包含用户,将用户改为表达式
        var range = DocumentRange.getRange();
        if (range.collapsed) {
        } else {
            e.preventDefault();

            var startContext = FormulaSettings.GetContext(
                range.startContainer,
                range.startOffset
            );
            var endContext = FormulaSettings.GetContext(
                range.endContainer,
                range.endOffset
            );
            var formula = startContext.PrevText + startContext.NextText;

            var selectedText = formula.substring(
                Math.min(startContext.PrevText.length, endContext.PrevText.length),
                Math.max(startContext.PrevText.length, endContext.PrevText.length)
            );

            // 剪贴板
            var clipboardData = window.clipboardData || event.clipboardData;
            clipboardData.setData('Text', selectedText);
        }
    },
    // 剪切
    DoCut: function (e) {
        alert('暂不支持剪切');
        return;
        // jquery未传入粘贴事件参数
        e = event;

        e.preventDefault();

        // 执行复制动作
        FormulaEditorEvent.DoCopy();

        // 删除选中内容
        var range = DocumentRange.getRange();
        range.deleteContents();

        // 添加延时调整请求
        FormulaSettings.ResetAll(true);
    },
    // 点击
    DoClick: function (e) {
        if (
            e &&
            e.target &&
            $(e.target).attr(FormulaSettings.ExecutionTypeName) ==
            ExecutionTypes.Function
        ) {
            FormulaSettings.ShowFunctionHelper($(e.target).text());
        }
    }
};

// 编辑器样式名称
export const FormulaStyleClassName = {
    // 公式编辑器
    Editor: 'formula-editor',
    // 智能感知浮出框
    IntelligentContainer: 'div-intelligent-container',
    // 项选中时
    ItemSelected: 'intelligent-li-selected',
    // 函数
    FunctionItem: 'item-function',
    // MathFunctionItem: "item-function-math",
    // ParticipantFunctionItem: "item-function",

    // 常量
    ConstItem: 'item-const',
    // 逻辑函数
    LogicItem: 'item-logic',
    // 全局变量
    GlobalVariableItem: 'item-global-variable',
    // 流程实例变量
    InstanceVariableItem: 'item-instance',
    // 数据项
    DataItem: 'item-dataitem',

    // 项的描述
    ItemDescription: 'item-description',

    // 参数描述
    ArgDescription: 'arg-description',

    // 函数帮助
    Helper: 'function-description',
    // 函数名称
    HelperName: 'helper-name',
    // 函数描述
    HelperDescription: 'helper-description',
    // 返回值类型
    HelperReturnType: 'helper-return-type',
    // 函数示例
    HelperExample: 'helper-example',
    // 函数参数表
    HelperParameters: 'helper-parameters'
};
export const FormulaEditorLoaded = function (intelligentFunctions) {
    IntelligentFunctions = intelligentFunctions;
    // 公式编辑控件
    FormulaStack.Editor = $('.' + FormulaStyleClassName.Editor);

    console.log('FormulaStack.Editor.lenght----' + FormulaStack.Editor.length);
    // 初始化焦点
    {
        if (FormulaStack.Editor.children().length == 0) {
            // FormulaStack.Editor.append($("<span></span>"));

            var input = $('<input type=\'text\' />');
            input.appendTo(FormulaStack.Editor);

            FormulaSettings.FocusAfter(input[0]);

            FormulaStack.Editor.focus();

            input.remove();
        }
        try {
            // 判断是否支持某些特性
            window.getSelection().getRangeAt(0);
        } catch (e) {
            DocumentRange.ForbidIntelligentWhenEnter = true;
        }
    }
    // 感知显示控件
    FormulaStack.Container = $('.' + FormulaStyleClassName.IntelligentContainer);
    // 函数描述
    FormulaStack.Description = $('<div></div>').addClass(
        FormulaStyleClassName.ItemDescription
    );
    // 函数参数描述
    FormulaStack.ArgDescription = $('<div></div>').addClass(
        FormulaStyleClassName.ArgDescription
    );
    FormulaStack.ArgDescription.appendTo(FormulaStack.Container.parent()).hide();

    FormulaStack.IntelligentList = FormulaStack.Container.find('ul');
    // 初始化感知列表
    FormulaStack.IntelligentList.find('li').remove();
    var lis = [];
    // 智能感知函数
    if (typeof IntelligentFunctions !== 'undefined') {
        $(IntelligentFunctions).each(function () {
            try {
                var li = $('<li></li>');
                li
                    .attr('IntelligentKeyWord', this.FunctionName)
                    .text(this.FunctionName)
                    .attr(
                        'BizDataType',
                        this.ReturnType == null ? -1 : this.ReturnType.join(',')
                    )
                    .addClass(FormulaStyleClassName.FunctionItem)
                    .addClass(FormulaStyleClassName.FunctionItem);
                lis.push(li);
            } catch (ex) { }
        });
    }
    // 全局变量
    if (typeof GlobalVariables !== 'undefined') {
        $(GlobalVariables).each(function () {
            var li = $('<li></li>');
            li
                .attr('IntelligentKeyWord', this)
                .text(this)
                .addClass(FormulaStyleClassName.GlobalVariableItem);
            lis.push(li);
        });
    }
    // And Or
    if (typeof ConstVariables !== 'undefined') {
        $(ConstVariables).each(function () {
            var li = $('<li></li>');
            li
                .attr('IntelligentKeyWord', this)
                .text(this)
                .addClass(FormulaStyleClassName.GlobalVariableItem);
            lis.push(li);
        });
    }

    // 排序
    var sortedLis = lis.sort(function (a, b) {
        return $(a).text().toLocaleLowerCase() > $(b).text().toLocaleLowerCase()
            ? 1
            : -1;
    });
    $(sortedLis).each(function () {
        $(this).appendTo(FormulaStack.IntelligentList);
    });

    // 鼠标移动时,设置项选中样式
    FormulaStack.IntelligentList
        .unbind('mousemove')
        .bind('mousemove', function (e) {
            if (
                e.target &&
                e.target.tagName &&
                e.target.tagName.toLowerCase() == 'li'
            ) {
                FormulaStack.IntelligentList
                    .find('li.' + FormulaStyleClassName.ItemSelected)
                    .removeClass(FormulaStyleClassName.ItemSelected);
                $(e.target).addClass(FormulaStyleClassName.ItemSelected);

                FormulaSettings.LiSelected();

                // 显示描述
                FormulaSettings.ShowDescription();
            }
        });
    // 鼠标点击项,选中
    FormulaStack.IntelligentList.unbind('click').bind('click', function (e) {
        if (
            e.target &&
            e.target.tagName &&
            e.target.tagName.toLowerCase() == 'li'
        ) {
            FormulaSettings.DoLiSelect(e.target);
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // 编辑器全局事件
    FormulaStack.Editor
        .unbind('mouseup.global')
        .bind('mouseup.global', FormulaEditorEvent.DoMouseUp);

    FormulaStack.IntelligentList
        .unbind('keyup.intelligent')
        .bind('keyup.intelligent', function (e) {
            // ENTER
            if (
                e.which == 13 &&
                $('li.' + FormulaStyleClassName.ItemSelected + ':visible').length > 0
            ) {
                FormulaSettings.DoLiSelect(
                    'li.' + FormulaStyleClassName.ItemSelected + ':first'
                );
                FormulaSettings.HideIntelligent();
                e.preventDefault();
            }
        });

    FormulaStack.Editor
        .unbind('keydown.intelligent')
        .bind('keydown.intelligent', FormulaEditorEvent.DoKeyDown);

    // 编辑器keyup时感知
    FormulaStack.Editor
        .unbind('keyup.intelligent')
        .bind('keyup.intelligent', FormulaEditorEvent.DoKeyUp);
    // FormulaStack.Editor.unbind("change.intelligent").bind("change.intelligent", FormulaEditorEvent.DoChange);
    // 文档任意点击,隐藏弹出框
    $(document)
        .unbind('mouseup.intelligent')
        .bind('mouseup.intelligent', function (e) {
            if (FormulaStack.IntelligentList.is(':visible')) {
                FormulaSettings.HideIntelligent();
            }
        });
    // 粘贴
    FormulaStack.Editor
        .unbind('paste.intelligent')
        .bind('paste.intelligent', FormulaEditorEvent.DoPaste);
    // 复制
    FormulaStack.Editor
        .unbind('copy.intelligent')
        .bind('copy.intelligent', FormulaEditorEvent.DoCopy);
    // 剪切
    FormulaStack.Editor
        .unbind('cut.intelligent')
        .bind('cut.intelligent', FormulaEditorEvent.DoCut);
    // 点击:显示说明
    FormulaStack.Editor
        .unbind('click.intelligent')
        .bind('click.intelligent', FormulaEditorEvent.DoClick);
};

// 获取模型名称
function getNodeName (treeNode) {
    if (
        treeNode == null ||
        treeNode == undefined ||
        treeNode.NodeType == 'AppPackage' ||
        (treeNode.id == SchemaCode &&
            treeNode.level == 0 &&
            !(FormulaType == 'AssociationFilter' && treeNode.mark == void 0)) ||
        treeNode.NodeType == 'AppGroup'
    ) {
        return '';
    }
    if (treeNode.pId == 'Root') {
        return '';
    }
    var parentName = getNodeName(treeNode.parentData);
    if (parentName.length > 0) {
        return parentName + '.' + treeNode.name;
    }
    return treeNode.name;
}

// 获取模型ID
function getNodeId (treeNode) {
    if (
        treeNode == null ||
        treeNode.NodeType == 'AppPackage' ||
        (treeNode.id == SchemaCode &&
            treeNode.level == 0 &&
            !(FormulaType == 'AssociationFilter' && treeNode.mark == void 0)) ||
        treeNode.NodeType == 'AppGroup'
    ) {
        return '';
    }
    if (treeNode.pId == 'Root') {
        return '';
    }
    var parentId = getNodeId(treeNode.parentData);
    if (parentId.length > 0) {
        return parentId + '.' + treeNode.id;
    }
    return treeNode.id;
}

function getIsCurrentField (treeNode, sheetCode) {
    if (treeNode == null || treeNode == undefined) {
        return false;
    }
    if (treeNode.id === sheetCode) {
        return true;
    }
    var isc = getIsCurrentField(treeNode.parentData, sheetCode);
    if (isc) {
        return true;
    }
    return false;
}

// 公式编辑器点击左侧树节点或者右侧函数事件
export const chooseLeftTreeNode = function (treeNode, sheetCode) {
    sheetCode=JSON.parse(sessionStorage.getItem("currentApp")).appId;
    if (
        treeNode.id == 'root' ||
        treeNode.NodeType == 'AppPackage' ||
        (treeNode.NodeType == 'Post' && treeNode.parentData == null) ||
        treeNode.NodeType == 'AppGroup'
    ) {
        // 应用对象,当前对象,AppPackage
        return false;
    }
    let nodeType = treeNode.NodeType;
    let name = '';
    let id = '';
    let isCurrentSheet = getIsCurrentField(treeNode, sheetCode);
    if (nodeType == 'Field') {
        var parent = treeNode.parentData;
        if (parent.id == SchemaCode && treeNode.level == 1) {
            // 当前对象中的节点只显示字段
            name = treeNode.name;
            id = treeNode.id;
            // 如果是关联表单过滤的表单关联自己情况
            if (FormulaType == 'AssociationFilter' && parent.IsCurScehma) {
                name = getNodeName(treeNode);
                id = getNodeId(treeNode);
            }
        } else {
            name = getNodeName(treeNode);
            id = getNodeId(treeNode);
        }
    } else if (nodeType == 'AppMenu' && treeNode.id == SchemaCode) {
        name = treeNode.name;
        id = treeNode.id;
    } else if (
        nodeType == 'User' ||
        nodeType == 'Post' ||
        nodeType == 'OrganizationUnit' ||
        nodeType == 'Company'
    ) {
        // 用户的话不需要前面的节点
        name = treeNode.name;
        id = treeNode.id;
    } else {
        name = getNodeName(treeNode);
        id = getNodeId(treeNode);
    }
    if (
        nodeType == 'User' ||
        nodeType == 'Post' ||
        nodeType == 'OrganizationUnit' ||
        nodeType == 'Company'
    ) {
        FormulaSettings.InsertUser(name, id,nodeType);
    } else {
        FormulaSettings.InsertVariable(name, id);
    }
};

// WEBPACK FOOTER //
// ./src/lib/H3/Console/Formula/Formula.js

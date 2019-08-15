(function ($) {
    // 所有的控件，都可以通过这个接口选择
    $.fn.RoleJControl = function () {
        var jControl;
        var args = arguments;
        $(this).each(function () {
            var $control = $(this);

            //add by xc 若已经渲染过该控件，则不进行重新渲染 
            jControl = $control.data("RoleJControl");
            if (!$.isEmptyObject(jControl)) {
                return true;
            }

            //数据项
            var datafield = $control.data($.RoleControlManager.DataFieldKey.toLocaleLowerCase());
            var controlkey = $control.data($.RoleControlManager.SheetControlKey.toLocaleLowerCase());
            if (!controlkey) {
                return jControl;
            }
            var dataitem = $.RoleControls.GetSheetDataItem(datafield, $control);

            if (args.length > 0) {
                dataitem = $.extend(dataitem, args[0]);
            }
            jControl = $.RoleControlManager.Run.call($control, controlkey, [dataitem]);
            //add by xc 保存JControl值，避免重复渲染同一个控件
            $control.data("RoleJControl", jControl);
        });
        return jControl;
    };

    $.RoleControls = {};
    //控件属性
    $.RoleControls.GetDefaultOptions = function (controlKey) {
        var p = {};
        var options = FormControls[controlKey];
        if (options != null) {
            for (var key in options) {
                if (options[key].constructor == String
                    || options[key].constructor == Number
                    || options[key].constructor == Object) {
                    p[key] = options[key] || "";
                }
                else if (options[key].constructor == Array) {
                    for (var i = 0; i < options[key].length; ++i) {
                        p[options[key][i].Name] = options[key][i].DefaultValue || "";
                    }
                }
            }
        }
        return p;
    };

    // 读取表单数据
    $.RoleControls.GetSheetDataItem = function (datafield, $control) {
        if ($.RoleSmartForm.ResponseContext == null) return null;
        // Error:
        if (datafield == "Comments") {
            //审批控件
            return $.IClone($.RoleSmartForm.ResponseContext.Comments);
        }
        var DataItems = $.RoleSmartForm.ResponseContext.ReturnData;
        if (datafield == void 0) return null;
        var dataitem = DataItems[datafield];

        if (dataitem == null && (datafield + "").indexOf(".") > -1) {
            var pDataField = datafield.split(".")[0];
            var pDataItem = DataItems[pDataField];
            var $trRow = $.RoleSmartForm.ResponseContext.IsMobile ? $control.parent() : $control.closest("tr");
            var ObjectId = $trRow.attr("data-ObjectId");
            //从已存到数据库地方取数据
            if (ObjectId) {
                if (pDataItem != void 0 && pDataItem != null) {
                    var rows = pDataItem.Value.R;
                    dataitem = $.IClone(pDataItem.Value.T[datafield]);
                    for (var i = 0; i < rows.length; i++) {
                        var rowData = rows[i];
                        if (rowData[pDataField + ".ObjectId"].Value == ObjectId) {
                            dataitem.Value = rowData[datafield].Value;
                            dataitem.Editable = rowData[datafield].Editable;
                            // 某单元格的可见属性自己控制
                            if (dataitem.Visible) {
                                dataitem.Visible = rowData[datafield].Visible;
                            }
                            break;
                        }
                    }
                }
            }
            else {
                ObjectId = $.IGuid();
                $trRow.attr("data-ObjectId", ObjectId);
            }

            if (dataitem == null && pDataItem) {
                dataitem = pDataItem.Value.T[datafield];
            }

            if (dataitem) {
                // 为区别子表里不同行的同一字段
                dataitem["ObjectId"] = ObjectId;
            }
        }

        return $.IClone(dataitem);
    };

})(jQuery);

(function ($) {
    //控件基类
    //1,完成界面初始化:设置组件id并存入组件管理器池,���始化参数
    //2,渲染的工作,细节交给子类实现
    //parm [element] 组件对应的dom element对象
    //parm [options] 组件的参数
    $.RoleControls.RoleBaseControl = function (element, options, ResponseContext) {
        // 表单信息
        this.ResponseContext = ResponseContext;

        //外链表单  0/1
        this.IsExternalForm = ResponseContext && ResponseContext.IsExternalForm;

        //是否支持Html5
        this.IsSupportHtml5 = window.applicationCache != undefined;
        this.SchemaCode = ResponseContext == null ? "" : ResponseContext.SchemaCode;
        this.IsMobile = ResponseContext == null ? false : ResponseContext.IsMobile;
        //页面元素，可以通过$(this.Element)得到jquery对象
        this.Element = element;

        //是否发起模式
        this.Originate = $.IQuery("Mode").toLowerCase() == "originate";

        // 记录当前控件是否验证通过
        this.ValidateResult = true;
        //配置参数,包含属性和事件
        this.Options = options || {};

        //样式列表
        this.Css = {
            ControlTitle: "ControlTitle",
            ControlContent: "ControlContent"
        };

        this.ChangeEvents = {};

        //初始化参数
        this.Init();

        // 是否可见
        if (this.Visible == null) {
            this.Visible = true;
        }

        // 是否可编辑
        if (this.Editable == null) {
            this.Editable = true;
        }
        //渲染控件前函数
        this.PreRender();
        //渲染控件
        this.Render();
        //渲染后函数
        //this.Rendered();
        //隐藏规则
        this.InitHideRule();
        //计算规则
        this.InitComputationRule();
    };

    //基础属性
    $.RoleControls.RoleBaseControl.prototype = {
        // 从页面读取参数,将页面上 data-***的设置读取到Options里面
        // 初始化参数，转为容易用的方式this.***
        // 循环所有默认属性事件,构造成 this.***的格式
        Init: function () {
            var g = this, p = this.Options;
            for (var key in p) {
                var elementkey = key.toLowerCase();

                if ($(g.Element).data(elementkey) != void 0) {
                    if (p[key] == null) {
                        p[key] = $(g.Element).data(elementkey);
                    }
                    else if (p[key].constructor == Boolean) {
                        p[key] = $(g.Element).data(elementkey).constructor == Boolean ?
                            $(g.Element).data(elementkey) :
                            ($(g.Element).data(elementkey).toString().toLowerCase() == "true"
                                || $(g.Element).data(elementkey).toString().toLowerCase() == "1");
                    }
                    else if (p[key].constructor == Number) {
                        p[key] = parseInt($(g.Element).data(elementkey));
                    }
                    else if (key.toLocaleLowerCase() != "displayname" || p[key] == "" || p[key] == "CreatedBy.FullName") {
                        p[key] = $(g.Element).data(elementkey);
                    }
                }
            }

            for (var key in this.Options) {
                this[key] = this.Options[key];
            }
        },

        // 控件渲染前函数
        PreRender: function () {
            if (this.IsMobile) {
                var controlkey = $(this.Element).attr('data-controlkey');

                if (controlkey == "FormGridView") {
                    $(this.Element).removeClass("row  form-group").addClass("list childitems");
                    this.$Title = $("<div class='childitemtilte'><span>" + this.DisplayName + "(共" + this.Value.R.length + "条明细)</span></div>");

                    if (this.Required) {
                        //this.$Title.append("<span style='color:red;vertical-align:middle'>*<span>");
                    }

                } else if (controlkey == "FormBoList") {
                    $(this.Element).removeClass("row  form-group").addClass("list childitems");
                    this.$Title = $("<div class='childitemtilte'><span>" + this.DisplayName + "</span></div>");
                } else if (controlkey == "FormUser" || controlkey == "FormCheckboxList") {
                    $(this.Element).removeClass("row  form-group").addClass("item item-input");
                    //根据是否可以编辑,此处添加点击事件
                    if (this.Editable) {
                        var that = this;
                        $(this.Element).unbind('click').bind('click', function () {
                            var path = "";
                            var datafield = $(this).attr('data-datafield');
                            switch (controlkey) {
                                case "FormUser":
                                case "FormMultiUser":
                                    H3Config.GlobalState.go('app.sheetuser', { field: datafield, rowid: that.ObjectId, unitSelectionRange: that.UnitSelectionRange, showunactive: that.ShowUnActive });
                                    break;
                                case "FormCheckboxList":
                                    if (that.isCheckbox == "false" || that.isCheckbox == false) {
                                        H3Config.GlobalState.go('app.checkboxlist', { field: datafield, rowid: that.ObjectId });
                                    }
                                    break;
                            }
                        });
                    } else {
                        $(this.Element).unbind('click');
                    }

                    this.$Title = $("<span>" + this.DisplayName + "</span>").addClass("has-input").addClass(this.Css.ControlTitle);

                    $(this.Element).append(this.$Title);
                    if (this.Required) {
                        //this.$Title.append("<span style='color:red;vertical-align:middle'>*<span>");
                    }
                } else if (controlkey == "FormDropDownList" || controlkey == "FormRadioButtonList") {
                    $(this.Element).removeClass("row  form-group").addClass("item item-input item-select");
                    this.$Title = $("<span>" + this.DisplayName + "</span>").addClass("has-input").addClass(this.Css.ControlTitle);
                    if (this.Required) {
                        //this.$Title.append("<span style='color:red;vertical-align:middle'>*<span>");
                    }
                }
                else if (controlkey == "FormAttachment" || controlkey == "FormQuery") {
                    $(this.Element).removeClass("row  form-group").addClass("item item-input item-floating-label");
                    this.$Title = $("<span>" + this.DisplayName + "</span>").addClass("input-label").addClass("has-input").addClass(this.Css.ControlTitle);
                    if (controlkey == "FormComment") this.$Title.addClass("shenhe");
                    $(this.Element).append(this.$Title);
                    if (this.Required) {
                        //this.$Title.append("<span style='color:red;vertical-align:middle'>*<span>");
                    }
                } else if (controlkey == "FormButton") {
                    $(this.Element).removeClass("row  form-group");
                } else if (controlkey == "FormComment") {

                }
                else {
                    if (controlkey == "FormNumber") {
                        $(this.Element).empty();
                    }
                    $(this.Element).removeClass("row  form-group").addClass("item item-input");
                    this.$Title = $("<span>" + (this.DisplayName || "") + "</span>").addClass("input-label").addClass("has-input").addClass(this.Css.ControlTitle);

                    $(this.Element).append(this.$Title);
                    if (this.Required) {
                        //this.$Title.append("<span style='color:red;vertical-align:middle'>*<span>");
                    }
                }
            }
            else {
                //PC
                var spanCss = "col-sm-2 col-xs-2";
                var inputCss = "col-sm-10 col-xs-10";
                if ($(this.Element).parent().hasClass("col-sm-6")) {
                    spanCss = "col-sm-4 col-xs-4";
                    inputCss = "col-sm-8 col-xs-8";
                }
                //标题列模式
                if (this.TitleDirection == "Vertical") {
                    spanCss = "col-sm-12";
                    inputCss = "col-sm-12";
                }

                $(this.Element).addClass("form-group");
                //标题
                //this.$Title = $("<span></span>").text(this.DisplayName).addClass(spanCss).addClass(this.Css.ControlTitle);
                this.$Title = $("<span class='" + spanCss + " " + this.Css.ControlTitle + "'>" + this.DisplayName + "</span>");
                if (this.Editable && this.Required) {
                    this.$Title.append("<span style='color:red;vertical-align:middle'>*<span>");
                }
            }
            var controlkey = $(this.Element).attr("data-controlkey");
            //if (controlkey != "SheetButton") {
            if (this.IsMobile) {
                if (controlkey == "FormUser") {
                    this.$InputBody = $("<div>").addClass("ControlContent");
                }
                else if (controlkey == "FormQuery") {
                    this.$InputBody = $("<div>").addClass("ControlContent");
                } else if (controlkey == "FormComment") {
                    this.$InputBody = $("<div>").css("width", "100%").css({ "text-align": "left" });
                }
                else if (controlkey == "FormAttachment" || controlkey == "FormButton" || controlkey == "FormSns" || controlkey == "FormTaskTips") {
                    this.$InputBody = $("<div>").css("width", "100%");
                }
                else if (controlkey == "FormDropDownList" || controlkey == "FormRadioButtonList") {
                    this.$InputBody = $('<select class="ControlContent"></select>');
                    if (!this.Editable) {
                        this.$InputBody = $("<div class='ControlContent'></div>");

                        //this.$InputBody.css({ "background-color": "#f8f8f8" });
                    } else {
                        this.$InputBody = $('<select class="ControlContent"></select>');
                    }
                } else if (controlkey == "FormCheckboxList") {
                    this.$InputBody = $("<div>").addClass("ControlContent");

                    if (this.isCheckbox && !this.Editable) {
                        //this.$InputBody.css({ "background-color": "#f8f8f8" });
                    }
                }
                else {
                    this.$InputBody = $("<div>").addClass("ControlContent");
                }
            } else {
                this.$InputBody = $("<div>");
            }

            //添加样式    
            if (($.isEmptyObject(this.Options.DataField)
                || this.Options.DataField.indexOf('.') == -1
                || this.Options.DataField == "CreatedBy.FullName")
                && (this.DisplayName || this.DataField) && controlkey) {
                if (controlkey != "FormButton") {
                    $(this.Element).append(this.$Title);
                    if (controlkey == "FormCheckBoxList" && !this.isCheckbox) {
                        this.$display = $("<sapn class='display'></span>");
                        $(this.Element).append(this.$display);
                    }
                }

                this.$InputBody.addClass(inputCss);
            } else {
                if (this.IsMobile) {
                    $(this.Element).append(this.$Title);
                }
            }

            $(this.Element).append(this.$InputBody);
            //对于可见的字段，添加是否打印属性
            if (this.Visible) {
                if (this.Printable == void 0) {
                    //如果字段没有设置是否可打印则默认可打印
                    $(this.Element).attr('data-printable', true);
                } else {
                    $(this.Element).attr('data-printable', this.Printable);
                }
            }
        },

        // 控件渲染
        Render: function () { },
        //计算规则
        InitComputationRule: function () {
            if (!$(this.Element).hasClass('sheet-control')) {
                return;
            }
            math.config({ number: "BigNumber" });
            //try {
            if (this.DataItem == null || this.DataItem.ComputationRule == null) { return; }
            var computationRule = this.DataItem.ComputationRule;//计算规则
            var computationRuleFields = this.DataItem.ComputationRuleFields;//计算规则使用的字段
            //原来是如果规则没有控件字段则直接执行，修改后只有新建表单时候执行
            //公式型控件每次加载页面都要执行计算
            //子流程第一个节点执行计算规则
            if (this.ResponseContext.IsCreateMode ||
                this instanceof $.RoleControls.FormFormula ||
                this.ResponseContext.IsChildInstance && (this.ResponseContext.ActivityCode == this.ResponseContext.StartActivityCode)) {
                this.SetComputationResult(computationRule, computationRuleFields);
            }
            var that = this;
            var eventName = "change.cr." + this.DataField;
            for (var fi = 0, flen = computationRuleFields.length; fi < flen; fi++) {
                var field = computationRuleFields[fi];
                if (field == 'CreatedBy') {
                    field += '.FullName';
                }
                // 子表字段
                if (field.indexOf(".") > -1) {//规则字段在子表
                    if (this.DataField.indexOf(".") > -1) {//配置规则的字段在子表
                        eventName = "change.cr." + this.ObjectId + "." + this.DataField;
                        //eidt by xc 不需要选择整列再筛选，直接找出对应的单元格，缩短时间
                        //这里要判断是否是在同一个子表
                        var childSchemaName1 = this.DataField.slice(0, this.DataField.indexOf("."));
                        var childSchemaName2 = field.slice(0, field.indexOf("."));
                        if (childSchemaName1 == childSchemaName2) {//同一个子表
                            var $ctrl = $(this.Element).closest("tr").find("div.sheet-control[data-controlkey][data-datafield='" + field + "']");
                            if ($ctrl && $ctrl.length > 0) {
                                var controlMgr = $ctrl.RoleJControl();
                                controlMgr.UnbindChange(eventName);
                                controlMgr.BindChange(eventName, function () {
                                    that.SetComputationResult(computationRule, computationRuleFields);
                                });
                                if (that.ResponseContext.IsCreateMode) {
                                    // 被绑定的值，已经有可能已经渲染
                                    controlMgr.ChangeEvents[eventName].apply(this);
                                }
                            }
                        }
                        else {//跨子表
                            var $ctrl = $("div.sheet-control[data-controlkey][data-datafield='" + field + "']").not(".table_th");
                            for (var i = 0; i < $ctrl.length; i++) {
                                var controlMgr = $ctrl.RoleJControl();
                                eventName = "change.cr." + controlMgr.ObjectId + "." + controlMgr.DataField;
                                controlMgr.UnbindChange(eventName);
                                controlMgr.BindChange(eventName, function () {
                                    that.SetComputationResult(computationRule, computationRuleFields);
                                });
                                if (that.ResponseContext.IsCreateMode) {
                                    // 被绑定的值，已经有可能已经渲染
                                    controlMgr.ChangeEvents[eventName].apply(this);
                                }
                            }
                            eventName = "change.cr." + field.slice(0, field.indexOf(".")) + this.DataField.slice(this.DataField.indexOf("."));
                            var gridMgr = $("div.sheet-control[data-datafield='" + field.slice(0, field.indexOf(".")) + "']").RoleJControl();
                            if (gridMgr) {
                                //gridMgr.UnbindChange(eventName);
                                if (gridMgr.ChangeEvents[eventName] == undefined) {
                                    gridMgr.BindChange(eventName, function (args) {
                                        if (window[eventName]) {
                                            window.clearTimeout(window[eventName]);
                                            window[eventName] = null;
                                        }
                                        window[eventName] = setTimeout(function () {
                                            var targetCtrls = $("div.sheet-control[data-controlkey][data-datafield='" + that.DataField + "']").not(".table_th");
                                            for (var i = 0; i < targetCtrls.length; i++) {
                                                $(targetCtrls[i]).RoleJControl().SetComputationResult(computationRule, computationRuleFields);
                                            }
                                            //that.SetComputationResult(computationRule, computationRuleFields);
                                        }, 600);
                                    });
                                }
                            }
                        }
                    } else {
                        eventName = "change.cr." + this.DataField;

                        // 子表删除行、添加行会触发子表Change，将field的事件绑定放到子表Change事件中
                        var gridMgr = $("div.sheet-control[data-datafield='" + field.slice(0, field.indexOf(".")) + "']").RoleJControl();

                        // 给子表上对应的列绑定Change事件
                        var tdCtrl = $("div.sheet-control[data-controlkey][data-datafield='" + field + "']:not(.table_th)");
                        for (var i = 0; i < tdCtrl.length; i++) {
                            var controlMgr = $(tdCtrl[i]).RoleJControl();
                            if (controlMgr) {
                                controlMgr.UnbindChange(eventName);
                                controlMgr.BindChange(eventName, function () {
                                    that.SetComputationResult(computationRule, computationRuleFields);
                                });
                                if (that.ResponseContext.IsCreateMode) {
                                    // 被绑定的值，已经有可能已经渲染
                                    controlMgr.ChangeEvents[eventName].apply($(tdCtrl[i]));
                                }
                            }
                        }
                        if (gridMgr) {
                            gridMgr.UnbindChange(eventName);
                            gridMgr.BindChange(eventName, function (args) {
                                // 子表删除行前触发change事件，要等待行删除后，才重新计算值，所以用setTimeout
                                // 连续添加行，最后一次新增或者删除行，才执行计算规则

                                if (window[eventName]) {
                                    window.clearTimeout(window[eventName]);
                                    window[eventName] = null;
                                }
                                window[eventName] = setTimeout(function () {
                                    that.SetComputationResult(computationRule, computationRuleFields);
                                }, 600);
                            });
                            if (that.ResponseContext.IsCreateMode) {
                                // 被绑定的值，已经有可能已经渲染
                                gridMgr.ChangeEvents[eventName].apply(this);
                            }
                        }
                    }
                } else {
                    eventName = "change.cr." + this.DataField;
                    var changeControl = $("div.sheet-control[data-datafield='" + field + "']").RoleJControl();
                    if (!changeControl) {
                        continue;
                    }
                    changeControl.UnbindChange(eventName);
                    changeControl.BindChange(eventName, function () {
                        //这里不能调用SetComputationResult,如果子表字段规则配置了主表则在主表字段change的时候要更新同一列所有行的字段
                        var targetCtrls = $('div.sheet-control[data-controlkey][data-datafield="' + that.DataField + '"]:not(.table_th)');
                        //if (that.IsInGridView) {
                        //    var objectId = $(that.Element).closest("tr").attr("data-objectid");
                        //    targetCtrls = $('tr[data-objectId="' + objectId + '"]').find('div.sheet-control[data-controlkey][data-datafield="' + that.DataField + '"]:not(.table_th)');
                        //}
                        targetCtrls.each(function () {
                            // Error :主表会自己调用自己
                            var targetCtrl = $(this).RoleJControl();
                            if (targetCtrl != null) {
                                var ret = targetCtrl.GetComputationResult(computationRule, computationRuleFields);
                                targetCtrl.SetValue(ret);
                            }
                        });
                    });
                    if (that.ResponseContext.IsCreateMode) {
                        // 被绑定的值，已经有可能已经渲染
                        changeControl.ChangeEvents[eventName].apply(this);
                    }
                }
            }
        },
        SetComputationResult: function (computationRule, computationRuleFields) {
            //设置计算规则时候先判断控件是否是隐藏的，如果控件是隐藏的则不执行计算规则
            try {
                var ret = this.GetComputationResult(computationRule, computationRuleFields);
                this.SetValue(ret);
            } catch (ex) {
            }
        },
        GetComputationResult: function (rule, fields) {
            if (rule == undefined || fields == undefined) {
                return;
            }
            var ruleTemp = rule;
            for (var j = 0, len = fields.length; j < len; j++) {
                //需要考虑字段是子表情况
                var ctrlField = fields[j];
                var val = [];
                if (ctrlField.indexOf('.') > -1) {
                    //子表外部聚合函数计算规则
                    if (this.DataField.indexOf(".") == -1) {
                        //配置字段在主表，规则字段在子表
                        var ctrls = $('div.sheet-control[data-controlkey][data-datafield="' + ctrlField + '"]:not(.table_th)');
                        var ctrlKey = ctrls.attr('data-controlkey');
                        var ctrl = ctrls.RoleJControl();

                        for (var childFieldIndex = 0, childFieldLen = ctrls.length; childFieldIndex < childFieldLen; childFieldIndex++) {
                            var ctrl = $(ctrls[childFieldIndex]).RoleJControl();

                            if (ctrlKey == 'FormNumber' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Number)) {
                                val.push(ctrl.GetNum());
                            } else if (ctrlKey == 'FormCheckbox' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Bool)) {
                                val.push(ctrl.GetValue());
                            } else if (ctrlKey == 'FormTextBox' || ctrlKey == 'FormTextArea') {
                                val.push('"' + ctrl.GetValue() + '"');
                            } else if (ctrlKey == 'Formuser') {
                                val.push('"' + ctrl.GetUnitIDs()[0] + '"');
                            } else if (ctrlKey == 'FormMultiKey') {
                                //不支持多人
                                val.push('""');
                            } else if (ctrlKey == 'FormFormula') {
                                var ctrlVal = ctrl.GetValue();
                                val.push('"' + ctrlVal + '"');
                            } else {
                                //其他类型控件，取值后判断是否是输入，不是数字则转成字符串
                                var ctrlVal = ctrl.GetValue();
                                if ($.isNumeric(ctrlVal)) {
                                    val.push(ctrlVal);
                                } else {
                                    val.push('"' + ctrlVal + '"');
                                }
                            }
                        }
                    } else {//行内字段计算规则
                        //配置字段在子表，规则字段在子表
                        //eidt byxc 优化不需要选择整列再筛选，直接渠道对应的单元格
                        var childSchemaName1 = this.DataField.slice(0, this.DataField.indexOf("."));//当前子表
                        var childSchemaName2 = ctrlField.slice(0, ctrlField.indexOf("."));//规则字段子表
                        if (childSchemaName1 == childSchemaName2) {
                            //同一个子表，取与当前字段在同一行的字段
                            var ctrls = $(this.Element).closest("tr").find("div.sheet-control[data-controlkey][data-datafield='" + ctrlField + "']");
                            if (ctrls.length == 0) continue;
                            var ctrlKey = ctrls.attr('data-controlkey');
                            var ctrl = ctrls.RoleJControl();
                            if (ctrlKey == 'FormNumber' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Number)) {
                                val.push(ctrl.GetNum());
                            } else if (ctrlKey == 'FormCheckbox' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Bool)) {
                                val.push(ctrl.GetValue());
                            } else if (ctrlKey == 'FormTextBox' || ctrlKey == 'FormTextArea') {
                                val.push('"' + ctrl.GetValue() + '"');
                            } else if (ctrlKey == 'FormUser') {
                                val.push('"' + ctrl.GetUnitIDs()[0] + '"');
                            } else if (ctrlKey == 'FormMultiUser') {
                                //不支持多人
                                val.push('""');
                            } else if (ctrlKey == 'FormFormula') {
                                var ctrlVal = ctrl.GetValue();
                                val.push('"' + ctrlVal + '"');
                            } else {
                                var ctrlVal = ctrl.GetValue();
                                if ($.isNumeric(ctrlVal)) {
                                    val.push(ctrlVal);
                                } else {
                                    val.push('"' + ctrlVal + '"');
                                }
                            }
                        } else {
                            //跨子表
                            var ctrls = $("div.sheet-control[data-controlkey][data-datafield='" + ctrlField + "']").not('.table_th');
                            for (var i = 0; i < ctrls.length; i++) {
                                var ctrlKey = $(ctrls[i]).attr("data-controlkey");
                                var ctrl = $(ctrls[i]).RoleJControl();
                                if (ctrlKey == 'FormNumber' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Number)) {
                                    val.push(ctrl.GetNum());
                                } else if (ctrlKey == 'FormCheckbox' || (ctrlKey == "FormFormula" && ctrl.BindType == ctrl.BindControlType.Bool)) {
                                    val.push(ctrl.GetValue());
                                } else if (ctrlKey == 'FormTextBox' || ctrlKey == 'FormTextArea') {
                                    val.push('"' + ctrl.GetValue() + '"');
                                } else if (ctrlKey == 'FormUser') {
                                    var uid = ctrl.GetUnitIDs()[0];
                                    val.push('"' + (uid == undefined ? "" : uid) + '"');
                                } else if (ctrlKey == 'FormMultiUser') {
                                    //不支持多人
                                    val.push('""');
                                } else if (ctrlKey == 'FormFormula') {
                                    var ctrlVal = ctrl.GetValue();
                                    val.push('"' + ctrlVal + '"');
                                } else {
                                    var ctrlVal = ctrl.GetValue();
                                    if ($.isNumeric(ctrlVal)) {
                                        val.push(ctrlVal);
                                    } else {
                                        val.push('"' + ctrlVal + '"');
                                    }
                                }
                            }
                        }
                    }
                } else {
                    //非子表字段
                    var ctrl = $('div.sheet-control[data-datafield="' + ctrlField + '"]');
                    var ctrlKey = ctrl.attr('data-controlkey');
                    if (ctrlKey == 'FormNumber' || (ctrlKey == "FormFormula" && ctrl.RoleJControl().BindType == ctrl.RoleJControl().BindControlType.Number)) {
                        val.push(ctrl.RoleJControl().GetNum());
                    } else if (ctrlKey == 'FormTextBox' || ctrlKey == 'FormTextArea') {
                        val.push('"' + ctrl.RoleJControl().GetValue() + '"');
                    } else if (ctrlKey == void 0) {
                        if (ctrlField == 'CreatedBy') {
                            val.push('"' + $.RoleSmartForm.ResponseContext.Originator + '"');
                        } else if (ctrlField == 'CreatedTime') {
                            val.push('"' + $.RoleSmartForm.ResponseContext.ReturnData.CreatedTime.Value + '"');
                        }
                    } else if (ctrlKey == 'FormLabel') {
                        if (ctrlField == 'CreatedTime')
                            val.push('"' + $.RoleSmartForm.ResponseContext.ReturnData.CreatedTime.Value + '"');
                    } else if (ctrlKey == 'OwnerId') {
                        val.push('"' + $.RoleSmartForm.ResponseContext.ReturnData.OwnerId.Value[0].UnitId + '"');
                    } else if (ctrlKey == 'FormAreaSelect') {
                        val.push("'" + ctrl.RoleJControl().GetValue() + "'");
                    } else if (ctrlKey == 'FormCheckbox' || (ctrlKey == "FormFormula" && ctrl.RoleJControl().BindType == ctrl.RoleJControl().BindControlType.Bool)) {
                        val.push(ctrl.RoleJControl().GetValue());
                    } else if (ctrlKey == 'FormUser') {
                        var uid = ctrl.RoleJControl().GetUnitIDs()[0];
                        val.push('"' + (uid == undefined ? "" : uid) + '"');
                    } else if (ctrlKey == 'FormMultiUser') {
                        //不支持多人
                        val.push('""');
                    } else if (ctrlKey == 'FormFormula') {
                        var ctrlVal = ctrl.RoleJControl().GetValue();
                        val.push('"' + ctrlVal + '"');
                    }
                    else {
                        //其他类型控件，取值后判断是否是输入，不是数字则转成字符串
                        for (var childFieldIndex = 0, childFieldLen = ctrl.length; childFieldIndex < childFieldLen; childFieldIndex++) {
                            var ctrlVal = $(ctrl[childFieldIndex]).RoleJControl().GetValue();
                            if ($.isNumeric(ctrlVal)) {
                                val.push(ctrlVal);
                            } else {
                                val.push('"' + ctrlVal + '"');
                            }
                        }
                    }
                }
                var replaceField = '{' + ctrlField + '}';
                var reg = new RegExp(replaceField, 'g');
                ruleTemp = ruleTemp.replace(reg, val);
            }
            if (this.Type == 7) {
                //数值类型为了保证精度用逆波兰表达式计算
                var expression = this.CalculateFn(ruleTemp);
                return math.eval(expression);
            } else {
                return new Function('return ' + ruleTemp)();
            }
        },
        // 计算隐藏规则表达式结果
        GetHideRuleResult: function (rule, fields) {
            //如果字段权限设置了不可见，则隐藏规则不生效
            if (this.Visible == false) {
                return true;
            }
            if (rule == null) {
                return false;
            }
            var ruleTemp = rule;
            for (var j = 0, len = fields.length; j < len; j++) {
                //需要考虑字段是子表情况
                var ctrlField = fields[j];
                var val = [];
                if (ctrlField.indexOf('.') > -1) {
                    //子表字段
                    var ctrls = [];
                    if (this.DataField.indexOf('.') > -1) {
                        //当前字段也是子表字段
                        if (this.IsMobile) {
                            ctrls = $($(this.Element).closest('.list')).find('div.sheet-control[data-datafield="' + ctrlField + '"]');
                        } else {
                            ctrls = $($(this.Element).closest('tr')).find('div.sheet-control[data-datafield="' + ctrlField + '"]');
                        }
                    } else {
                        ctrls = $('div.sheet-control[data-controlkey][data-datafield="' + ctrlField + '"]:not(.table_th)');
                    }
                    var ctrlKey = ctrls.attr('data-controlkey');
                    for (var childFieldIndex = 0, childFieldLen = ctrls.length; childFieldIndex < childFieldLen; childFieldIndex++) {
                        if (ctrlKey == 'FormNumber') {
                            val.push($(ctrls[childFieldIndex]).RoleJControl().GetNum());
                        } else if (ctrlKey == 'FormTextBox' || ctrlKey == 'FormTextArea') {
                            var v = $(ctrls[childFieldIndex]).RoleJControl().GetValue();
                            val.push(v == "" ? "''" : ("'" + v + "'"));
                        } else if (ctrlKey == 'FormUser' || ctrlKey == 'FormMultiUser') {
                            var units = $(ctrls[childFieldIndex]).RoleJControl().GetUnitIDs();
                            if (units != null && units != void 0 && units != '') {
                                for (var i = 0; i < units.length; i++) {
                                    val.push('"' + units[i] + '"');
                                }
                            } else { val.push('""'); }
                        } else if (ctrlKey == 'FormAreaSelect') {
                            var area = $(ctrls[childFieldIndex]).RoleJControl().GetValue();
                            val.push(area == '' ? '""' : ("'" + area + "'"));
                        } else if (ctrlKey == 'FormAttachment' || ctrlKey == 'FormPhoto') {
                            var attach = $(ctrls[childFieldIndex]).RoleJControl().GetValue();
                            val.push(attach.AttachmentIds == '' ? "" : ('"' + attach.AttachmentIds + '"'));
                        } else if (ctrlKey == 'FormCheckbox') {
                            var c = $(ctrls[childFieldIndex]).RoleJControl().GetValue();
                            val.push(c);
                        } else if (ctrlKey == 'FormDropDownList') {
                            var dropDown = $(ctrls[childFieldIndex]).RoleJControl().GetValue();
                            val.push(dropDown == null ? '""' : ('"' + dropDown + '"'));
                        } else {
                            //其他类型控件，取值后判断是否是输入，不是数字则转成字符串
                            var ctrlVal = $(ctrls[childFieldIndex]).RoleJControl().GetValue();
                            if ($.isNumeric(ctrlVal)) {
                                val.push(ctrlVal);
                            } else {
                                val.push((ctrlVal == null || ctrlVal == void 0 || ctrlVal == '') ? '""' : ('"' + ctrlVal + '"'));
                            }
                        }
                    }
                } else {
                    //非子表字段
                    var ctrl = $('div.sheet-control[data-datafield="' + ctrlField + '"]');
                    var ctrlKey = ctrl.attr('data-controlkey');

                    if (ctrlKey == 'FormNumber') {
                        val.push(ctrl.RoleJControl().GetNum());
                    } else if (ctrlKey == 'FormTextBox' || ctrlKey == 'FormTextArea') {
                        var v = ctrl.RoleJControl().GetValue();
                        val.push(v == '' ? "''" : ('"' + v + '"'));
                    } else if (ctrlKey == 'FormUser' || ctrlKey == 'FormMultiUser') {
                        var units = ctrl.RoleJControl().GetUnitIDs();
                        if (units != null && units != void 0 && units != "") {
                            for (var i = 0; i < units.length; i++) {
                                val.push('"' + units[i] + '"');
                            }
                        } else {
                            val.push('""');
                        }
                    } else if (ctrlKey == 'FormAreaSelect') {
                        var area = ctrl.RoleJControl().GetValue();
                        val.push(area == '' ? '""' : ("'" + area + "'"));
                    } else if (ctrlKey == 'FormAttachment' || ctrlKey == 'FormPhoto') {
                        var attach = ctrl.RoleJControl().GetValue();
                        val.push(attach.AttachmentIds == '' ? '' : ('"' + attach.AttachmentIds + '"'));
                    } else if (ctrlKey == 'FormCheckbox') {
                        var c = ctrl.RoleJControl().GetValue();
                        val.push(c);
                    } else if (ctrlKey == 'FormDropDownList') {
                        var dropDown = ctrl.RoleJControl().GetValue();
                        val.push(dropDown == null ? '""' : ('"' + dropDown + '"'));
                    } else if (ctrlKey == 'FormLabel') {
                        if (ctrlField == 'CreatedTime') {
                            val.push('"' + $.RoleSmartForm.ResponseContext.ReturnData.CreatedTime.Value + '"');
                        }
                    } else {
                        //createdby
                        if (ctrlKey == void 0) {
                            if (ctrlField == 'CreatedBy')
                                val.push('"' + $.RoleSmartForm.ResponseContext.Originator + '"');
                            else if (ctrlField == 'OwnerId') {
                                val.push('"' + $.RoleSmartForm.ResponseContext.ReturnData.OwnerId.Value[0].UnitId + '"');
                            } else if (ctrlField == 'OwnerDeptId') {
                                val.push('"' + $.RoleSmartForm.ResponseContext.ReturnData.OwnerDeptId.Value[0].UnitId + '"');
                            }
                        } else {
                            //其他类型控件，取值后判断是否是数字，不是数字则转成字符串
                            for (var childFieldIndex = 0, childFieldLen = ctrl.length; childFieldIndex < childFieldLen; childFieldIndex++) {
                                var ctrlVal = $(ctrl[childFieldIndex]).RoleJControl().GetValue();
                                if ($.isNumeric(ctrlVal)) {
                                    val.push(ctrlVal);
                                } else {
                                    if (ctrlVal == null || ctrlVal == void 0 || ctrlVal == '')
                                        val.push('""');
                                    else
                                        val.push('"' + ctrlVal + '"');
                                }
                            }
                        }
                    }
                }
                var replaceField = '{' + ctrlField + '}';
                var reg = new RegExp(replaceField, 'g');
                ruleTemp = ruleTemp.replace(reg, val);
            }
            return ruleTemp;
        },
        SetHideResult: function (rule, fields, canHideColumn) {
            var ruleTemp = this.GetHideRuleResult(rule, fields);
            var fun = new Function('return ' + ruleTemp)();




            if (!fun) {
                this.SetVisible(true);
            } else {
                this.SetVisible(false);
                if (canHideColumn)
                    this.HideColumn(true);
                //this.HidePreHeaderTitle();
            }
            this.HidePreHeaderTitle();
        },
        //只用于主表字段隐藏子表列使用
        //子表字段隐藏规则配置了主表字段，当条件满足时候隐藏子表列
        HideColumn: function (hide) {
            //Error 这里逻辑要重新整理
            if (!hide && !this.Visible) {
                return;
            }
            var dataField = this.DataField;
            var thatCtrl = $('div.sheet-control[data-controlkey][data-datafield="' + dataField + '"]');
            //var table = thatCtrl.closest('.SheetGridView').children('table');
            var table = thatCtrl.closest('.SheetGridView').find('.table-body table');
            if (table != void 0 && table.length > 0) {
                var th = table.find('div.sheet-control[data-datafield="' + dataField + '"][class*="table_th"]').parent();
                var td = $('div.sheet-control[data-controlkey][data-datafield="' + dataField + '"]:not(".table_th")').parent();
                if (!hide) {

                    if (!this.IsMobile) {
                        //PC端
                        $(td).show();
                        $(th).show();
                        $(th).trigger('DomProChange.form', dataField);
                    } else {
                        //移动端
                        //table.find("div[data-DataField='" + dataField + "']").parent().show();
                        //table.find("tr").find("div[data-DataField='" + dataField + "']").parent().show();
                        //thatCtrl.parent().show();
                        thatCtrl.show()
                    }
                } else {
                    if (!this.IsMobile) {
                        //PC端
                        $(td).hide();
                        $(th).hide();
                        $(th).trigger('DomProChange.form', [dataField, 'hide']);
                    }
                    else//移动端
                        thatCtrl.hide();
                }
            }
        },
        InitHideRule: function () {
            //如果不在表单中不要执行
            if (!$(this.Element).hasClass('sheet-control')) {
                return;
            }
            //math.config({ number: "BigNumber" });
            //如果有新的规则则使用新的，否则判断是否有旧规则
            var that = this;
            if (this.DataItem != null && this.DataItem.DisplayRule) {
                var rule = this.DataItem.DisplayRule;//规则表达式
                var fields = this.DataItem.DisplayRuleFields;//规则中引用的字段

                //如果规则中没有子表字段且当前字段是子表字段则为true
                //1.先要确定当前控件是否是子表控件
                //2.判断规则中的控件是否都是主表控件
                var canHideColumn = (that.DataField.indexOf('.') > -1) && that.DataField != 'CreatedBy.FullName';
                if (canHideColumn) {
                    for (var i = 0; i < fields.length; i++) {
                        var field = fields[i];
                        if (field.indexOf('.') > -1) {
                            //规则中字段是子表字段，不隐藏该列
                            canHideColumn = false;
                            break;
                        }
                    }
                }
                //如果that是子表控件，且fields里面全是主表字段或者常量，则当子表控件不可见的时候隐藏该列
                if (fields.length == 0) {
                    //规则中没有字段，直接执行
                    that.SetHideResult(rule, fields, canHideColumn);
                    return;
                }

                //给规则中引用到的字段绑定change事件
                for (var i = 0; i < fields.length; i++) {
                    var field = fields[i];
                    if (field == 'CreatedBy') {
                        field += '.FullName';
                    }
                    var ctrl = $('div.sheet-control[data-datafield="' + field + '"]');
                    if (field.indexOf(".") > -1) {
                        if (this.DataField.indexOf(".") > -1) {
                            //规则中字段在子表,配置的字段在子表
                            var eventName = "change.hr." + this.ObjectId + "." + this.DataField;
                            var $ctrl = $(this.Element).closest("tr").find("div.sheet-control[data-controlkey][data-datafield='" + field + "']");
                            if ($ctrl && $ctrl.length > 0) {
                                var controlMgr = $ctrl.RoleJControl();
                                controlMgr.BindChange(eventName, function () {
                                    that.SetHideResult(rule, fields);
                                });
                                if (that.ResponseContext.IsCreateMode || that.Value == null) {
                                    controlMgr.ChangeEvents[eventName].apply(this);
                                }
                            }
                        } else {
                            //规则中字段在子表,配置的字段在主表
                            //子表删除/添加行会触发子表Change，将field的事件绑定放到子表Change事件中
                            var eventName = "change.hr." + this.DataField;
                            var gridMgr = $("div.sheet-control[data-datafield='" + field.slice(0, field.indexOf(".")) + "']").RoleJControl();
                            //给子表上对应列绑定Change事件
                            var tdCtrl = $("div.sheet-control[data-controlkey][data-datafield='" + field + "']:not('.table_th')");
                            for (var j = 0; j < tdCtrl.length; j++) {
                                var controlMgr = $(tdCtrl[j]).RoleJControl();
                                if (controlMgr) {
                                    controlMgr.UnbindChange(eventName);
                                    controlMgr.BindChange(eventName, function () {
                                        that.SetHideResult(rule, fields);
                                    });
                                    if (that.ResponseContext.IsCreateMode || that.Value == null) {
                                        controlMgr.ChangeEvents[eventName].apply($(tdCtrl[j]));
                                    }
                                }
                            }
                            if (gridMgr) {
                                gridMgr.UnbindChange(eventName);
                                gridMgr.BindChange(eventName, function (args) {
                                    if (window[eventName]) {
                                        window.clearTimeout(window[eventName]);
                                        window[eventName] = null;
                                    }
                                    window[eventName] = setTimeout(function () {
                                        that.SetHideResult(rule, fields);
                                    }, 600);
                                });
                                if (that.ResponseContext.IsCreateMode || that.Value == null) {
                                    gridMgr.ChangeEvents[eventName].apply(this);
                                }
                            }
                        }
                    } else {
                        var ruleCtrl = ctrl.RoleJControl();
                        if (ruleCtrl) {
                            ruleCtrl.BindChange('change.' + this.DataField, function () {
                                var ruleTemp = that.GetHideRuleResult(rule, fields);
                                var fun = new Function('return ' + ruleTemp)();
                                var thatCtrl = $('div.sheet-control[data-datafield="' + that.DataField + '"]:not(".table_th")');
                                for (var m = 0; m < thatCtrl.length; m++) {
                                    $(thatCtrl[m]).RoleJControl().SetVisible(!fun);
                                }
                                if (!fun) {
                                    if (canHideColumn) {
                                        that.HideColumn(false);
                                    }
                                } else {
                                    //that.HidePreHeaderTitle();
                                    if (canHideColumn) {
                                        that.HideColumn(true);
                                    }
                                }
                                that.HidePreHeaderTitle();
                            });
                        }
                    }
                }
                var ruleTemp = that.GetHideRuleResult(rule, fields);
                var func = new Function('return ' + ruleTemp)();
                if (!func) {
                    that.SetVisible(true);
                    if (canHideColumn) {
                        that.HideColumn(false);
                    }
                } else {
                    that.SetVisible(false);
                    if (canHideColumn) {
                        that.HideColumn(true);
                    }
                }
            } else if (this.DisplayRule) {//兼容旧的规则
                if (this.DisplayRule.RuleDataField != void 0) {
                    //旧的
                    var $controls = $('div.sheet-control[data-datafield="' + this.DisplayRule.RuleDataField + '"]');
                    if (this.DataField.toString().indexOf('.') > -1) {
                        if (this.IsMobile) {
                            $controls = $(this.Element).closest('div.item').find('div.sheet-control[data-datafield="' + this.DisplayRule.RuleDataField + '"]');
                        }
                        else {
                            $controls = $(this.Element).closest('tr').find('div.sheet-control[data-datafield="' + this.DisplayRule.RuleDataField + '"]');
                        }
                    }
                    var ruleControl = $controls.RoleJControl();
                    if (ruleControl) {
                        ruleControl.BindChange('OnChange.' + this.DataField, function () {
                            if (this.GetValue() + '' == that.DisplayRule.RuleValue) {
                                that.SetVisible(true);
                            } else {
                                that.SetVisible(false);
                            }
                        });
                        ruleControl.OnChange();
                    }
                }
            }
        },
        //如果控件设置了不可见，且控件后面没有可见控件，则隐藏控件前面的标题栏
        HidePreHeaderTitle: function () {
            var $headerDescribles, $headerTitles;
            if (this.ResponseContext.SheetView) {//移动端
                $headerDescribles = $(this.ResponseContext.SheetView).find(".page-header.page-describle");
                $headerTitles = $(this.ResponseContext.SheetView).find(".page-header").not(".page-describle");
            } else {//pc端
                $headerDescribles = $(".page-header.page-describle");
                $headerTitles = $(".page-header").not(".page-describle");

            }
            $headerTitles.css("display", "block");
            $headerDescribles.css("display", "block");
            $.RoleSmartForm.HideEmptyHeader();
        },

        // 增加验证消息显示
        AddInvalidText: function ($el, invalidText) {
            $el = $el || $(this.Element);
            this.invalidText = invalidText;
            if (this.IsMobile) {
                //$el.css({border:"1px dashed red",    box-shadow: "0 0 3px rgba(255,0,0,0.7)"});
                //$el.addClass("promptPlaceholder").attr("placeholder", invalidText);
                return;
            }
            else {//edit by xc
                //单选框，复选框
                if ($el.length > 0 && $el[0].tagName.toLowerCase() === "label") {
                    $el.closest(".radiolistwrap").css({
                        border: "1px solid red ", "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                    });
                } else {

                    if (($el.length > 0 && $el[0].tagName.toLowerCase() === "select") || $(this.Element).data("controlkey") == "FormDropDownList") {
                        //下拉框
                        $el.css({
                            outline: "1px solid red ", "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                        }).siblings(".btn-group").css({
                            outline: "1px solid red ", "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                        });
                        $el.prev("span").css({
                            outline: "1px solid red ", "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                        });
                    } else if ($el.find(".AreaSelectWrap").length > 0) {
                        //地址
                        $el.find(".AreaSelectWrap").css({
                            border: "1px solid red", "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                        });
                    }
                    //其它
                    else if ($el.attr("class") && $el.attr("class").indexOf("col-") > -1) {
                        $el.find(".form-control").css({
                            border: "1px solid red", "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                        });
                    } else {
                        $el.css({
                            border: "1px solid red", "box-shadow": "0 0 3px rgba(255,0,0,0.7)"
                        });
                    }
                }
                $el.addClass('invalid');//添加这个类的目的是判断控件是否校验过，并无样式

            }

            if (invalidText != "必填" && invalidText.length > 0) {
                top.$.IShowWarn("抱歉，[" + this.DisplayName + "]选项" + invalidText);
            }
            //if ($el.attr("data-toggle") != "popover") {
            //    $el.attr("data-toggle", "popover").attr("data-placement", "bottom");
            //    $el.attr("data-content", invalidText);
            //}
            //$el.popover("show");

            //add by xc定位到相应位置
            var Offset = $el.offset();
            var Top = Offset.top - $(window).scrollTop();
            if (Top > $(window).height()) {
                $(window).scrollTop(Offset.top + $el.outerHeight() - $(window).height());
            }
            else if (Top < 0) {
                $(window).scrollTop(Offset.top - 40);
            }
            //子表内部定位
            var $par = $el.closest(".SheetGridView[data-controlkey='FormGridView']");
            if ($par.length > 0) {
                var $scroll = $par.find("div.table-scroll");
                var Left = Offset.left - $par.scrollLeft() - $par.width();
                if (Left > 5) {
                    $scroll.scrollLeft(Offset.left + $el.outerWidth() - $par.width() + 100);
                }
            }
        },

        // 移除验证显示信息
        RemoveInvalidText: function ($el) {
            $el = $el || $(this.Element);
            if (this.IsMobile) {
            }
            else {
                this.invalidText = "";
                $el.removeClass('invalid');
                $el.css("border", "");
                $el.css("box-shadow", "");
                if (($el.length > 0 && $el[0].tagName.toLowerCase() === "select") || $(this.Element).data("controlkey") == "FormDropDownList") {
                    $el.siblings(".btn-group").removeClass('invalid');
                    $el.siblings(".btn-group").css("border", "");
                    $el.siblings(".btn-group").css("outline", "");
                    $el.siblings(".btn-group").css("box-shadow", "");

                    $el.prev("span").removeClass('invalid');
                    $el.prev("span").css("outline", "");
                    $el.prev("span").css("box-shadow", "");
                }
            }
        },

        // 控件的保存函数
        SaveDataField: function () {
            return {
            };
        },

        // 获取值
        GetValue: function () {
            return this.$InputBody.val();
        },

        //设置值:复杂控件必须重写该接口
        SetValue: function (obj) {
            this.$InputBody.val(obj);
        },

        // 对应复杂控件，Value可���是ID或Code，但是Text是显示名称
        GetText: function () {
            return this.$InputBody.text();
        },

        //设置是否可编辑
        SetReadonly: function (flag) {
        },

        //设置是否可见
        SetVisible: function (flag) {
            var lastVisible = this.Visible || $(this.Element).css('visibility') == 'visible';
            if (flag) {
                //Error:如果原来是隐藏的话，有可能控件就没渲染，需要渲染后在显示
                //}//如果权限控制了visible则不执行隐藏规则的结果
                //$(this.Element).show();
                //edit by xc
                if (this.IsMobile || this.DataField.indexOf(".") == -1 || this.DataField == 'CreatedBy.FullName') {
                    $(this.Element).show();

                    //if ($(this.Element).attr('data-controlkey') == 'FormGridView') {
                    //    var that = this;
                    //    setTimeout(function () {
                    //        that.Resize();
                    //    }, 10);
                    //}

                } else {
                    $(this.Element).css("visibility", 'visible');
                }
                //end
                if (($(this.Element).attr('data-controlkey') == 'FormTextBox' || $(this.Element).attr('data-controlkey') == 'FormTextArea') && !this.Editable) {
                    $(this.Element).find('pre').css('border', 'none');
                }
                //如果控件有计算规则，要重新计算
                if (this.DataItem.ComputationRule && lastVisible == false) {
                    var rule = this.DataItem.ComputationRule;
                    var fields = this.DataItem.ComputationRuleFields;
                    var ret = this.GetComputationResult(rule, fields);
                    this.SetValue(ret);
                }
            }
            else {
                //先清除再隐藏
                if (($.RoleSmartForm.IsLoaded || this.ResponseContext.IsCreateMode) && this.Editable) {
                    // 表单加载完，才隐藏清空值
                    this.ClearValue();
                }
                //$(this.Element).hide();
                //edit by xc
                if (this.IsMobile || this.DataField.indexOf(".") == -1 || this.DataField == 'CreatedBy.FullName') {
                    $(this.Element).hide();
                } else {
                    $(this.Element).css("visibility", 'hidden');
                }
                //$(this.Element).css("visibility", 'hidden');
                //end
                //if (($.RoleSmartForm.IsLoaded || this.ResponseContext.IsCreateMode) && this.Editable) {
                //    // 表单加载完，才隐藏清空值
                //    this.ClearValue();
                //}
            }
            ////add by xc
            //$(this.Element).trigger('DomProChange.form', this.DataField);
        },

        //去掉规则中的函数:$.fn
        CalculateFn: function (rule) {
            var functionExpression = [];//方法表达式
            var functionValue = [];//方法计算值
            var startIndex = 0;
            while (rule.indexOf("$.fn.", startIndex) > -1) {
                var fnIndex = rule.indexOf("$.fn.", startIndex);
                var leftBracket = rule.indexOf("(", fnIndex + 1);//左括号位置
                var rightBracket = rule.indexOf(")", leftBracket + 1);//右括号位置
                leftBracket = rule.indexOf("(", leftBracket + 1);//下一个左括号位置
                while (leftBracket > -1 && rightBracket > leftBracket) {
                    rightBracket = rule.indexOf(")", rightBracket + 1);
                    leftBracket = rule.indexOf("(", leftBracket + 1);
                }
                //截取fnIndex到rightBracket之间的字符串为函数体
                //先把函数计算出来，再替换到表达式中
                var fn = rule.slice(fnIndex, rightBracket + 1);
                var val = new Function("return " + fn)();
                functionExpression.push(fn);
                functionValue.push(val);
                startIndex = rightBracket + 1;
            }

            for (var i = 0; i < functionExpression.length; i++) {
                rule = rule.replace(functionExpression[i], functionValue[i]);
            }
            return rule;
        },

        ClearValue: function () {
            //对于配置了隐藏规则的字段，字段隐藏的时候Visible是true，值会被清掉，如果该字段参与了其他字段的计算则会出现问题
            if (this.Visible && $(this.Element).is(':visible')) {
                this.SetValue("");
            }
        },

        // 设置为焦点
        SetFocus: function () {
            if (this.$InputBody) {
                if (this.$InputBody.is("div")) {
                    this.$InputBody.find("input,select").focus();
                } else {
                    this.$InputBody.focus();
                }
            }
        },

        //值改变事件
        OnChange: function () {
            if (this.ChangeEvents == null) return;
            if ($.isEmptyObject(this.ChangeEvents)) return;
            for (var key in this.ChangeEvents) {
                if ($.isFunction(this.ChangeEvents[key])) {
                    this.ChangeEvents[key].apply(this, [arguments]);
                }
            }
        },

        //绑定改变值事件
        BindChange: function (key, fn) {
            this.ChangeEvents[key] = fn;
        },

        ///解除绑定
        UnbindChange: function (key) {
            delete this.ChangeEvents[key];
        },


        //
        // Error : 这里需要去掉，统一从 $.RoleSmartForm.PostForm 入口
        //异步取数
        //@url:地址
        //@type:类型，post、get
        //@dataParam:传入的json数据
        //@successCallBack:回调，可不传
        //@isAsync:是否异步，可不传
        //@errorCallBack:回调，可不传
        Ajax: function (url, type, dataParam, successCallBack, isAsync, errorCallBack) {
            console.log("Ajax 这个接口后续将移除，请关注!");
            if(!window.isExpAccount){
                url = window.zuul + url   //配置接口地址
            }
            var sharingKey = $.IQuery("SharingKey");
            var engineCode = $.IQuery("EngineCode");
            // var data = $.extend({
            //     SharingKey: sharingKey, EngineCode: engineCode
            // }, dataParam);
            $.ajax({
                type: type,
                url: url,
                data: dataParam,
                dataType: "json",
                xhrFields:{
                    withCredentials: true
                },
                crossDomain:true,
                async: isAsync == null ? true : isAsync,
                success: function (data) {
                    if ($.isFunction(successCallBack))
                        successCallBack.apply(this, [data]);
                },
                error: function (data) {
                    if ($.isFunction(errorCallBack))
                        errorCallBack.apply(this, [data]);
                }
            });
        }
    }

    //用于计算的栈
    function Stack() {
        this.store = [];
        this.top = 0;
        this.push = function (ele) {
            this.store[this.top++] = ele;
        };
        this.pop = function () {
            var top = --this.top;
            if (top >= 0) {
                var val = this.store[top];
                this.store.splice(this.top, 1);
                return val;
            } else {
                return null;
            }
        };
    }
})(jQuery);


// WEBPACK FOOTER //
// ./src/lib/H3/Form/BaseControl.js
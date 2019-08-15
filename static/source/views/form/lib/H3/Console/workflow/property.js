import {PackageManager} from './package';
import {ActivityEventEditor} from './activity/activityEvent';
import {WorkflowMode, WorkflowElementType} from './setting';
import {TraceManager} from './workflowTrace';
import {ShowFormulaHtml} from './common';
import HTTP from '../../../../../../api/work-flow.js';




/*
    属性编辑脚本库
*/
export const  WorkflowProperties = {
    // 开始节点包含属性
    Start: [{ Group: 'ActivityBasic', Display: true, Properties: ['ActivityCode', 'DisplayName'] },
    { Group: 'DataItem', Display: true, Properties: ['PropertyPermissions'] }
    // { Group: 'Style', Display: false }
    ],
    // 结束节点包含属性
    End: [{ Group: 'ActivityBasic', Display: true, Properties: ['ActivityCode', 'DisplayName'] }, 
    { Group: 'EndNotify', Display: true, Properties: ['NotifyUrl'] }
    // { Group: 'DataItem', Display: true, Properties: ['PropertyPermissions'] },
    // { Group: 'Style', Display: false }
    ],
    // 手工节点包含属性
    FillSheet: [{
        Group: 'ActivityBasic', Display: true, Properties: ['ActivityCode', 'DisplayName']
    },
    { Group: 'Participant', Display: true, Properties: ['Participants'] },
    { Group: 'DataItem', Display: true, Properties: ['PropertyPermissions'] },
    // { Group: 'NotificationMessage', Display: true, Properties: ['WorkItemDisplayName'] },
    { Group: 'ActivityRule', Display: true, Properties: ['ParticipateMethod','ApproveExit','NoParticipantPolicy','AllowedTime'] },
    // { Group: 'Assist', Display: false },
    // { Group: 'ActivitySenior', Display: false },
    // { Group: 'ActivityEvent', Display: false },
    // { Group: 'ActivityPlan', Display: false },
    // { Group: 'Extend', Display: false },
    // { Group: 'CustomCode', Display: false },
    // { Group: 'Style', Display: false }
    ],
    // 审批节点
    Approve: [{
        Group: 'ActivityBasic', Display: true, Properties: ['ActivityCode', 'DisplayName']
    },
    { Group: 'Participant', Display: true, Properties: ['Participants'] },
    { Group: 'DataItem', Display: false, Properties: ['PropertyPermissions'] },
    // { Group: 'NotificationMessage', Display: true, Properties: ['WorkItemDisplayName'] },
    { Group: 'ActivityRule', Display: true, Properties: ['ParticipateMethod','ApproveExit','DisapproveExit','DisapproveExitType','DisapproveExitActivityCode','NoParticipantPolicy','AllowedTime'] },
    // { Group: 'Assist', Display: false },
    // { Group: 'ActivitySenior', Display: false },
    // { Group: 'ActivityEvent', Display: false },
    // { Group: 'ActivityPlan', Display: false },
    // { Group: 'Extend', Display: false },
    // { Group: 'CustomCode', Display: false },
    // { Group: 'Style', Display: false }
    ],
    // 传阅
    Circulate: [{ Group: 'ActivityBasic', Display: true, Properties: ['ActivityCode', 'DisplayName'] },
    { Group: 'Participant', Display: true, Properties: ['Participants'] },
    { Group: 'DataItem', Display: false, Properties: ['PropertyPermissions'] },
    { Group: 'NotificationMessage', Display: true, Properties: ['WorkItemDisplayName'] },
    // { Group: 'ActivityPlan', Display: false },
    // { Group: 'Extend', Display: false },
    // { Group: 'CustomCode', Display: false },
    // { Group: 'Style', Display: false }
    ],
    // 连接点
    Connection: [{ Group: 'ActivityBasic', Display: true, Properties: ['ActivityCode','DisplayName'] },
    ],
    // 子流程
    SubInstance: [{ Group: 'ActivityBasic', Display: true, Properties: ['ActivityCode', 'DisplayName'] },
    { Group: 'Participant', Display: true, Properties: ['Participants'] },
    { Group: 'SubInstanceDataMaps', Display: false, Properties: ['DataMaps'] },
    { Group: 'SubInstanceTemplate', Display: false, Properties: ['SchemaCode'] },
    { Group: 'SubInstanceRule', Display: false, Properties: ['Sync', 'FinishStartActivity',] },
    // { Group: 'ActivityEvent', Display: false },
    // { Group: 'ActivityPlan', Display: false },
    // { Group: 'Extend', Display: false },
    // { Group: 'CustomCode', Display: false },
    // { Group: 'Style', Display: false }
    ],
    //通知
    Notify: [{ Group: 'ActivityBasic', Display: true, Properties: ['ActivityCode', 'DisplayName', 'SortKey', 'EntryCondition', 'DisplayName', 'WaitCondition'] },
    { Group: 'Notification', Display: true, Properties: ['WorkItemDisplayName','Block'] },
    { Group: 'DataItem', Display: false, Properties: ['PropertyPermissions'] },
    // { Group: 'ActivityPlan', Display: false },
    // { Group: 'Extend', Display: false },
    // { Group: 'Style', Display: false }
    ],
    // 线条包含属性
    Line: [{ Group: 'LineBasic', Display: true, Properties: ['DisplayName', 'LineCode', 'Exclusive', 'Formula','LineNotifyType'] },
    { Group: 'Custom', Display: false, Properties: ['Custom', 'CustomCode'] },
    { Group: 'Style', Display: false }
    ],
    // 流程模板包含属性
    Workflow: [{ Group: 'WorkflowBasic', Display: true,Properties:['SchemaCode','WorkflowFullName'] },
    // { Group: 'WorkflowPlan', Display: false },
    // { Group: 'WorkflowBizActions', Display: false },
    // { Group: 'WorkflowExtend', Display: false }
    ]
}

export const WorkflowProperty = function (workflowDocument) {
    this.ObjectId = null;
    this.PropertyTitleBarHeight = 25;  // 属性区域标题栏的高度
    this.PropertyType = "";            // 获取或设置当前属性的类型
    this.CurrentObject = null;         // 获取或设置当前正在编辑的对象
    // this.Layout = layout;              // 获取当前布局对象
    this.WorkflowDocument = workflowDocument;  // 流程对象模型
    this.Controls = {
        PropertyTable: $(".PropertyTable"),
        PropertyTableTR: $(".PropertyTable>div[group]"),
        PropertyValue: $(".PropertyValue"),
        divPropertyContainer: $("#divPropertyContainer"),
        PropertyGroup: $("td[group]"),

        propertyTab: $('.property-tabs'), //流程、节点、连接线属性切换框
        selectControls: $('select.form-control'), //属性选择框
        SettingToggle: $('div.setting-toggle'),
        btnBasicSetting: $('.basic-setting'), //基础设置
        btnPrioritySetting: $('.priority-setting'), // 高级设置
        divBasicSettingProperties: $('div[target=basic-setting]'), //基础属性
        divPrioritySettingProperties: $('div[target=priority-setting]') //高级属性
    },
    this.DefaultWorkflowRoamText={
        FillSheet: '所有人同意时进入下一个节点',
        Approve: '所有人同意时进入下一节点，有1人不同意时回退到前一个经办节点'
    }

    this.Multi = {
        //是否多选
        IsMulti: false,
        //源状态集合<PropertyName,Value>
        SourceStatus: {
        },
        CurrentObjects: []
    }
    var that=this;
    this.Controls.selectControls.each(function(){
        $(this).DropDownList({
            Width: "100%"
          });
    });

    $("input[type=text],textarea").attr("spellcheck", false);
    //初始化时全隐藏
    this.Controls.PropertyTableTR.hide();
    //初始化属性列表
    for (var _ElementType in WorkflowProperties) {
        $(WorkflowProperties[_ElementType]).each(function () {
            if (this.Group != "DataItem" && this.Group != "Operation" && !this.Properties) {
                var thisProperties = this.Properties = [];
                $("tr[group='" + this.Group + "']").each(function () {
                    var _PropertyName = $(this).attr("property");
                    if (_PropertyName){
                        thisProperties.push(_PropertyName);
                    }
                });
            }
        });
    }

    var _DataItems = PackageManager.GetDataItems();
    var printItems = PackageManager.GetPrintConfigItems();



    _DataItems = _DataItems.concat(printItems);
    //数据权限
    if (_DataItems && _DataItems.length > 0) {
        //全选中
        var _DataItemTable = $("[property=PropertyPermissions]").find("table:first");
        //初始化数据权限编辑控件
        $(_DataItems).each(function () {
            var currentDatafield = this.Value.indexOf(".") > -1 ? this.Value.split('.')[1] : this.Value;
            var isFormulaField = false;
            var disabledString = "";
            if ($.inArray(currentDatafield, GlobalWorkflowProperties.FormulaFields) > -1) {
                isFormulaField = true;
                disabledString = "disabled";
            }
            var _DataRow = $("<tr item-name='" + this.Value + "' data-isformula='" + isFormulaField + "'></tr>");
            if ($.inArray(currentDatafield, GlobalWorkflowProperties.MappingProperties) > -1) {
                _DataRow.attr("data-ismappingproperty", true);
            }
            // $("<td class='PropertyRow'></td>").appendTo(_DataRow);
            $("<td class='PropertyTitle' style='width:30%;'>" + this.Text + "</td>").appendTo(_DataRow);
            for (var i = 0; i < 4; i++) {
                var CID = $.IGuid();
                if (i == 0 || i == 1)//可见或可写默认勾中
                {
                    $("<td class='PropertyDataItem'></td>").append("<input id='" + CID + "' type='checkbox' checked='true' data-index='" + i + "' " + disabledString + "/><label for='" + CID + "'></label>").appendTo(_DataRow);
                }
                else {
                    $("<td class='PropertyDataItem'></td>").append("<input id='" + CID + "' type='checkbox' data-index='" + i + "' " + disabledString + "/><label for='" + CID + "'></label>").appendTo(_DataRow);
                }
            }
            if (this.Value == 'PrintCompanyName' ||
                this.Value == 'PrintComment' ||
                this.Value == 'Printer' ||
                this.Value == 'PrintTime' ||
                this.Value == 'PrintQrCode') {
                // _DataRow.find('input[type="checkbox"]').not(':last').closest('td.PropertyDataItem').css('visibility', 'hidden');
                _DataRow.find('input[type="checkbox"]').closest('td.PropertyDataItem').css('visibility', 'hidden');
            }
            _DataRow.appendTo(_DataItemTable);
            if (this.ItemType) {
                //标记是否子表头
                _DataRow.attr("ItemType", this.ItemType);
                _DataRow.addClass("SubTableHeader");
            }
        });

        //数据项label点击事件
        _DataItemTable.find("label").each(function () {
            var labelFor = $(this).attr("for");
            if (labelFor == "AllEnabelShow" ||
                labelFor == "AllEnabelEdit" ||
                labelFor == "AllNeeded" ||
                labelFor == "AllEnabelPrint")
                return true;
            // $(this).unbind("change.SelectAllDataItem").bind("click.SelectAllDataItem", function (e) {
            //     var $tar = $("#" + $(this).attr("for"));
            //     //$tar.click();
            // });
        });

        //首行全选事件
        _DataItemTable.find("tr:has('input[type=checkbox]'):first").find("input[type=checkbox]").each(function () {
            $(this).unbind("change.SelectAllDataItem").bind("change.SelectAllDataItem", function (e) {
                var cellIndex = $(e.target).parents("td:first").index();
                var checked = $(e.target).prop("checked");
                $(e.target).parents("table:first").find("tr").each(function (index) {
                    var isFormula = $(this).attr("data-isformula") == "true" ? true : false;
                    var isMappingProperty = false;
                    if ($(this).attr("data-ismappingproperty") != undefined && $(this).attr("data-ismappingproperty") == "true") {
                        isMappingProperty = true;
                    }
                    if (index != 0) {
                        //点击“全选”时候不对关联属性控件设置“可写”“必填”
                        if ((isFormula || isMappingProperty) && (cellIndex == "3" || cellIndex == "4")) {
                            //公式型控件不参与
                            //return true;
                        } else {
                            var _CheckBox = $(this).find("td:eq(" + cellIndex + ")").find("input[type=checkbox]")
                            _CheckBox.prop("checked", checked);
                            _CheckBox.trigger("change", true);
                        }

                    }
                });
            });
        });

        //绑定数据项选择事件
        _DataItemTable.find("tr:has('input[type=checkbox]')").each(function (n, o) {
            var checkboxs = $(this).find("input[type=checkbox]");
            var isFormulaField = $(this).attr("data=isformula") == "true";
            checkboxs.eq(0).unbind("click.Property" + n).bind("click.Property" + n, checkboxs, function (e) {
                checkboxs[1].checked = true;
                //可见
                if (!this.checked) { // 不可见则不可写/必填/痕迹
                    checkboxs[0].checked = false;
                    checkboxs[1].checked = false;
                    checkboxs[2].checked = false;
                    checkboxs[3].checked = false;
                    checkboxs.eq(0).change();
                    checkboxs.eq(1).change();
                    checkboxs.eq(2).change();
                    checkboxs.eq(3).change();
                    if (n != 0) {
                        var selectAllCheckboxs = _DataItemTable.find("tr:has('input[type=checkbox]'):first").find("input[type=checkbox]");
                        selectAllCheckboxs[0].checked = false;
                        selectAllCheckboxs[1].checked = false;
                        selectAllCheckboxs[2].checked = false;
                        selectAllCheckboxs[3].checked = false;
                    }
                } else {
                    if(n != 0){
                        that.syncAllCheckState(_DataItemTable, 0);
                    }
                }
            });
            checkboxs.eq(1).unbind("click.Property" + n).bind("click.Property" + n, checkboxs, function (e) {
                //公式型控件不能点击可写
                if (isFormulaField) {
                    return;
                }
                //可写
                if (this.checked) { // 可写必可见
                    checkboxs[0].checked = true;
                    checkboxs.eq(0).change();

                    if(n != 0){
                        that.syncAllCheckState(_DataItemTable, 1);
                    }
                }
                else { // 不可写则不必填
                    checkboxs[2].checked = false;
                    //checkboxs[3].checked = false;
                    checkboxs.eq(2).change();
                    //checkboxs.eq(3).change();
                    if (n != 0) {
                        var selectAllCheckboxs = _DataItemTable.find("tr:has('input[type=checkbox]'):first").find("input[type=checkbox]");
                        selectAllCheckboxs[1].checked = false;
                        selectAllCheckboxs[2].checked = false;
                    }
                }
            });

            checkboxs.eq(2).unbind("click.Property" + n).bind("click.Property" + n, checkboxs, function (e) {
                if (isFormulaField) {
                    return;
                }
                //必填
                if (this.checked) { // 必填则可见并可写
                    checkboxs[0].checked = true;
                    checkboxs[1].checked = true;
                    checkboxs.eq(0).change();
                    checkboxs.eq(1).change();
                    if(n != 0){
                        that.syncAllCheckState(_DataItemTable, 2);
                    }
                }
                else {
                    if (n != 0) {
                        _DataItemTable.find("tr:has('input[type=checkbox]'):first").find("input[type=checkbox]")[2].checked = false;
                    }
                }
            });
            checkboxs.eq(3).unbind("click.Property" + n).bind("click.Property" + n, checkboxs, function (e) {
                //打印
                if (this.checked) { // 打印则必可见
                    checkboxs[0].checked = true;
                    checkboxs.eq(0).change();
                    // 初始时装载默认数据
                    if (checkboxs[1].checked) {
                        checkboxs[1].checked = true;
                        checkboxs.eq(1).change();
                    }
                    if(n != 0){
                        that.syncAllCheckState(_DataItemTable, 3);
                    }
                }
                else {
                    if (n != 0) {
                        _DataItemTable.find("tr:has('input[type=checkbox]'):first").find("input[type=checkbox]")[3].checked = false;
                    }
                }
            });
        });

        //子表首行CheckBox长摁时全选
        _DataItemTable.find("tr.SubTableHeader").find("input[type=checkbox]")
            .unbind("mousedown").bind("mousedown", function (e) {
                BatchSubColumnState = false;

                //长摁500毫秒,启用全选模式
                SubTableTimeHandler = setTimeout(function (_CheckBox) {
                    BatchSubColumnState = true;

                    var _Cell = $(_CheckBox).parents("td:first");
                    _Cell.addClass("BatchColumn");

                    var _Row = $(_CheckBox).parents("tr:first");
                    var _CellIndex = _Cell.index();
                    $(_Cell).parents("table:first").find("tr[item-name*='" + _Row.attr("item-name") + ".']").each(function () {
                        $(this).find("td:eq(" + _CellIndex + ")").addClass("BatchColumn");
                    });
                }, 500, e.target);

                $(this).one("mouseup mouseout", function (e2) {
                    $(".BatchColumn").removeClass("BatchColumn");
                    if (SubTableTimeHandler)
                        clearTimeout(SubTableTimeHandler);
                });
            })
        // _DataItemTable.find("tr.SubTableHeader").each(function () {
        //     $(this).find("input[type=checkbox]:gt(1)").attr("title", _WorkflowDesigner_GlobalString.Porperty_LeftKey);
        // });

        //数据权限改变时
        _DataItemTable.find("tr:has('input[type=checkbox]'):not(':eq(0)')").find("input[type=checkbox]")
            .unbind("change.DataPermission")
            //_ChangeSelfOnly时,用于代码直接调用Change事件
            .bind("change.DataPermission", function (e, _ChangeSelfOnly) {
                var _Value = $(e.target).prop("checked");
                var _CurrentItemName = $(e.target).parents("tr:first").attr("item-name");
                var _CellIndex = $(e.target).parents("td:first").index()
                //数据权限类型
                var _DataPermissionType;
                switch (_CellIndex) {
                    case 1:
                        _DataPermissionType = "Visible";
                        break;
                    case 2:
                        _DataPermissionType = "Editable";
                        break;
                    case 3:
                        _DataPermissionType = "Required";
                        break;
                    case 4:
                        _DataPermissionType = "Printable";
                        break;
                    case 5:
                        _DataPermissionType = "TrackVisible";
                        break;
                    case 6:
                        _DataPermissionType = "MobileVisible";
                        break;
                    default:
                        break;
                }
                if (!_DataPermissionType)
                    return;

                var set = false;
                var _Activities = GlobalWorkflowProperties.Wp.CurrentObject;
                if (GlobalWorkflowProperties.Wp.Multi.IsMulti) {
                    _Activities = GlobalWorkflowProperties.Wp.Multi.CurrentObjects;
                }
                $(_Activities).each(function () {
                    $(this.PropertyPermissions).each(function () {
                        if (this.PropertyName == _CurrentItemName) {
                            this[_DataPermissionType] = _Value;
                            set = true;
                        }
                    });
                    if (!set) {
                        if (!this.PropertyPermissions)
                            this.PropertyPermissions = [];
                        this.PropertyPermissions.push({ PropertyName: _CurrentItemName });
                        this.PropertyPermissions[this.PropertyPermissions.length - 1][_DataPermissionType] = _Value;
                    }
                });

                $(".BatchColumn").removeClass("BatchColumn");

                if (!_ChangeSelfOnly) {
                    //子表列选中可见、可写时,将子表头选中
                    if ((_DataPermissionType == "Visible" || _DataPermissionType == "Editable")
                        && _CurrentItemName.indexOf(".") > -1 && _Value) {
                        var _SubTableName = _CurrentItemName.substring(0, _CurrentItemName.indexOf("."));
                        var _HeaderCheckBox = $(e.target).parents("table:first").find("tr[item-name=" + _SubTableName + "]").find("td:eq(" + _CellIndex + ")").find("input[type=checkbox]");
                        if (!_HeaderCheckBox.prop("checked")) {
                            _HeaderCheckBox.prop("checked", true);
                            _HeaderCheckBox.trigger("change", [true]);
                        }
                    }
                    else {
                        var _thisRow = $(e.target).parents("tr:first");
                        //若当前是表头
                        if (_thisRow.hasClass("SubTableHeader")
                            //表头是全选模式
                            && ((_DataPermissionType == "Visible") || BatchSubColumnState)) {
                            $(e.target).parents("table:first").find("tr[item-name*='" + _CurrentItemName + "." + "']").each(function () {
                                var _CheckBox = $(this).find("td:eq(" + _CellIndex + ")").find("input[type=checkbox]:first");
                                _CheckBox.prop("checked", _Value);
                                if (!_Value) {
                                    $(this).find("td:eq(" + _CellIndex + ")").siblings().each(function () {
                                        $(this).find("input[type=checkbox]:first").prop("checked",false);
                                    });
                                }
                                _CheckBox.trigger("change", [true]);
                            });
                        }
                    }
                }
            });
    }

    this.init();
}

WorkflowProperty.prototype.filterCharacter=function(str){
    var newStr = str;
    var range = /[a-zA-Z0-9\~\!\@\#\$\%\&\*\(\)\_\+\|\:\"\<\>\?\/\-\=\[\]\;\,\.\！\￥\……]/g;
    var arr = str.match(range);
    if (arr == null)
        newStr = "";
    else
        newStr = arr.join('');
    return newStr
}

// 属性类初始化事件
WorkflowProperty.prototype.init = function () {
    // 设置属性区域高度
    this.Controls.divPropertyContainer.css("overflow-x", "hidden").css("overflow-y", "auto");
}

WorkflowProperty.prototype.setActivityContentReplace = function(content,activityType){
    var dom=$('<div>');
    $('.content-replace').each(function(){
        var tip=$(this).attr('data-tip');
        if(tip){
            dom.html(tip);
            var spans=dom.find('span');
            if(spans.length>1){
                $(spans[0]).html(content);
                if(activityType==='FillSheet'){
                    $(spans[1]).html('自动提交');
                }else{
                    $(spans[1]).html('自动审批同意');
                }
            }else{
                $(spans[0]).html(content);
            }
            $(this).attr('data-tip',dom.html());
        }else{
            $(this).html(content);
        }
    });
    dom.remove();
}

// 根据对象类型，构造属性显示界面
WorkflowProperty.prototype.DisplayProperties = function (obj, display) {

    //滚动条滚动到顶部
    document.getElementById('ActivitySet').scrollTop=0;
    // 设置所有属性不可见
    this.Controls.PropertyTableTR.hide();
    var workflow=GlobalWorkflowProperties.Workflow;
    var _PropertyType;
    GlobalWorkflowProperties.Wp.Multi = {};

    $('input[readonly],input[disabled]').parent('div.property-value').css('background','#efeff4');

    //如果当前显示的是活动并且有其他活动被选中,则启用多选模式
    //显示共同属性【数据权限】【允许的操作】【样式】编辑
    if (GlobalWorkflowProperties.WorkflowMode == WorkflowMode.Designer && obj.WorkflowElementType == WorkflowElementType.Activity
        && workflow.selectedActivities && workflow.selectedActivities.length > 1) {
        GlobalWorkflowProperties.Wp.Multi.IsMulti = true;
        //将要显示的活动移到首位
        if (obj.SwitchToFirst){
            obj.SwitchToFirst();
        }
        GlobalWorkflowProperties.Wp.Multi.CurrentObjects = workflow.selectedActivities;
        //批量编辑【样式】
        //全是手工或审批活动,批量编辑【允许的操作】【数据权限】
        if ($(workflow.selectedActivities).filter(function () { return this.ToolTipText != "FillSheet" && this.ToolTipText != "Approve"; }).length == 0) {
            GlobalWorkflowProperties.Wp.Multi.isAllParticipative = true;
        }
    }
     $('.normal-message').hide();
     //切换属性显示框
     if(obj.WorkflowElementType == WorkflowElementType.Workflow){
        if(!$("#WorkFlowSet").hasClass('active')){
            //选中流程属性切换
            $("#WorkFlowSet").addClass('active');
            $("#ActivitySet").removeClass('active');
            $("#WorkFlowSet").show();
            $('.h3-lnk-bar').css('transform', 'translate3d(200px, 0px, 0px)');
            $("#WorkFlowSet").css({ "transform": "translateX(0px) translateZ(0px)" });
            $("#ActivitySet").css({ "transform": "translateX(-100%) translateZ(0px)" });
        }
     }else{
        if(!$("#ActivitySet").hasClass('active')){
            //选中节点属性切换
            $("#ActivitySet").addClass('active');
            $("#WorkFlowSet").removeClass('active');
            $("#ActivitySet").show();
            $( $("#ActivitySet").attr("data-target")).show().siblings(".pro-item").hide();
            $('.h3-lnk-bar').css('transform', 'translate3d(30px, 0px, 0px)');
            $("#ActivitySet").css({ "transform": "translateX(0px) translateZ(0px)" });
            $("#WorkFlowSet").css({ "transform": "translateX(200%) translateZ(0px)" });

        }
     }

     if(obj.WorkflowElementType == WorkflowElementType.Workflow ||
        obj.WorkflowElementType == WorkflowElementType.Line){
            this.Controls.SettingToggle.hide();
        }

    // 记录需要显示属性的元素类型
    if (obj.WorkflowElementType == WorkflowElementType.Activity) {
        GlobalWorkflowProperties.VM.curActivity=obj;
        _PropertyType = obj.ToolTipText;
        this.ObjectId = obj.Id;
        if(_PropertyType == "Circulate"){
            this.setActivityContentReplace('抄送人');
        }else if(_PropertyType == "Approve"){
            this.setActivityContentReplace('审批人','Approve');
        }else if(_PropertyType == "FillSheet"){
            this.setActivityContentReplace('经办人','FillSheet');
        }else {
            this.setActivityContentReplace('子流程发起人');
        }

        if(_PropertyType==='Start' || _PropertyType==='End' || _PropertyType==='Connection'  ){
            this.Controls.SettingToggle.hide();
            $("div[group=DataItem][property=PropertyPermissions]").find("table").find("tr").each(function () {
                $(this).find("td:eq(5)").hide();
            });
            if( _PropertyType==='Connection' ){
                $('.activity-description').show();
                $('div[property="ActivityCode"]').hide();
            }else{
                $('.activity-description').hide();
                $('div[property="ActivityCode"]').show();
            }
        }else{
            $('.activity-description').hide();
            $('div[property="ActivityCode"]').show();
            this.Controls.SettingToggle.show();
        }
        if (_PropertyType == "Approve") {
            $("div[group=DataItem][property=PropertyPermissions]").find('input[type="checkbox"]').removeAttr('disabled');
            $("div[group=DataItem][property=PropertyPermissions]").find("table").find("tr").each(function () {
                $(this).find("td:eq(5)").hide();
            });


        }

        if (_PropertyType == "Circulate") {
            $("div[group=DataItem][property=PropertyPermissions]").find('input[type="checkbox"]').removeAttr('disabled');
            $("div[group=DataItem][property=PropertyPermissions]").find("table").find("tr").each(function () {
                // $(this).find("td:eq(3),td:eq(4),td:eq(5)").hide();
                // 抄送也要打印
                $(this).find("td:eq(3),td:eq(5)").hide();
            });


        }
        else {
            //手工隐藏前一活动参与
            if (_PropertyType == "FillSheet") {
                $("div[group=ActivityBasic][property=DuplicatedParticipantPolicy]").hide();
                //saas 应用第一个手工节点不允许编辑
                if (!GlobalWorkflowProperties.IsDeveloper &&
                GlobalWorkflowProperties.IsDetachApp &&
                GlobalWorkflowProperties.IsSaasApp &&
                obj.ActivityCode == GlobalWorkflowProperties.FirstActivityCode) {
                    var isHasElement = function (arr, value) {
                        var str = arr.toString();
                        var index = str.indexOf(value);
                        if (index >= 0) {
                            //存在返回索引
                            var reg1 = new RegExp("((^|,)" + value + "(,|$))", "gi");
                            return str.replace(reg1, "$2@$3").replace(/[^,@]/g, "").indexOf("@");
                        } else {
                            return -1;//不存在此项
                        }
                    }
                    $("div[group=DataItem][property=PropertyPermissions]").addClass('disable');
                    //todo 预设字段不可编辑，其他字段可以编辑，先全部禁用，然后遍历
                    $("div[group=DataItem][property=PropertyPermissions]").find("tr:eq(0)").find('input[type="checkbox"]').attr('disabled', 'disabled');

                    $("div[group=DataItem][property=PropertyPermissions]").find('tr[item-name]').each(function () {
                        var itemName = $(this).attr('item-name');
                        var index = itemName.indexOf('.');
                        if (index > -1) {
                            itemName = itemName.substr(0, index);
                        }
                        if (GlobalWorkflowProperties.PresetFields && GlobalWorkflowProperties.PresetFields.length > 0) {
                            if (isHasElement(GlobalWorkflowProperties.PresetFields, itemName) > 1) {
                                $(this).find('input[type="checkbox"]').attr('disabled', 'disabled');
                            }
                        }
                    });
                } else {
                    $("div[group=DataItem][property=PropertyPermissions]").removeClass('disable');
                    $("div[group=DataItem][property=PropertyPermissions]").find('input[type="checkbox"]').removeAttr('disabled');
                    $("div[group=DataItem][property=PropertyPermissions]").find('tr[item-name]').each(function () {
                        var itemName = $(this).attr('item-name');
                        var index = itemName.indexOf('.');
                        if (index > -1) {
                            itemName = itemName.substr(index + 1);
                        }
                        if (GlobalWorkflowProperties.FormulaFields && GlobalWorkflowProperties.FormulaFields.length > 0) {
                            if ($.inArray(itemName, GlobalWorkflowProperties.FormulaFields) > -1) {
                                // $(this).find('input[type="checkbox"]:eq(1)').attr('disabled', 'disabled');
                                // $(this).find('input[type="checkbox"]:eq(2)').attr('disabled', 'disabled');
                                $(this).find("td:eq(3),td:eq(4)").children().hide();
                            }
                        }
                    });
                }
            } else {
                $("div[group=DataItem][property=PropertyPermissions]").removeClass('disable');
                $("div[group=DataItem][property=PropertyPermissions]").find('input[type="checkbox"]').removeAttr('disabled');
                $("div[group=DataItem][property=PropertyPermissions]").find('tr[item-name]').each(function () {
                    var itemName = $(this).attr('item-name');
                    var index = itemName.indexOf('.');
                    if (index > -1) {
                        itemName = itemName.substr(index + 1);
                    }
                    if (GlobalWorkflowProperties.FormulaFields && GlobalWorkflowProperties.FormulaFields.length > 0) {
                        if ($.inArray(itemName, GlobalWorkflowProperties.FormulaFields) > -1) {
                            // $(this).find('input[type="checkbox"]:eq(1)').attr('disabled', 'disabled');
                            // $(this).find('input[type="checkbox"]:eq(2)').attr('disabled', 'disabled');

                            $(this).find("td:eq(3),td:eq(4)").children().hide();
                        }
                    }
                });
            }

            if (GlobalWorkflowProperties.MappingProperties && GlobalWorkflowProperties.MappingProperties.length > 0) {
                //关联属性不允许“可写”和“必填”
                $("div[group=DataItem][property=PropertyPermissions]").find('tr[item-name]').each(function () {
                    var itemName = $(this).attr('item-name');
                    if ($.inArray(itemName, GlobalWorkflowProperties.MappingProperties) > -1) {
                        //$(this).find('input[type="checkbox"]:eq(1)').attr({ 'disabled': 'disabled' });
                        //$(this).find('input[type="checkbox"]:eq(2)').attr('disabled', 'disabled');
                        $(this).find("td:eq(2),td:eq(3)").children().hide();
                    }
                });
            }

            $("div[group=DataItem][property=PropertyPermissions]").find("table").find("tr").each(function () {
                $(this).find("td:eq(3),td:eq(4)").show();
            });
        }


        //活动排序默认为1
        if (isNaN(obj.SortKey)) {
            obj.SortKey = 1;
        }
    }
    else {

        _PropertyType = obj.WorkflowElementType;
        this.ObjectId = -1;
    }

    this.CurrentObject = obj;
    this.PropertyType = _PropertyType;

    this.SetTitle();

    if (!WorkflowProperties[_PropertyType]) {
        return;
    }
    else {
        var _Properties = WorkflowProperties[_PropertyType];
        // 如果是多选模式,只显示公共属性
        if (GlobalWorkflowProperties.Wp.Multi.IsMulti) {
            _Properties = $(WorkflowProperties[_PropertyType]).filter(function () {
                return this.Group == "Style" || (GlobalWorkflowProperties.Wp.Multi.isAllParticipative && (this.Group == "DataItem" || this.Group == "Operation"));
            })
        }
        for(let property of _Properties){
            this.Controls.PropertyTable.find("div[group='" + property.Group + "']").show();
            //var header = this.Controls.PropertyTable.find("div[group='" + property.Group + "']").show();
            //header.find("td:first").trigger("InitHeader");
            if(property.Properties){
                for (var i = 0,len=property.Properties.length; i < len; i++) {
                    this.Controls.PropertyTable.find("div[property='" + property.Properties[i] + "']")
                        .filter("[group='" + property.Group + "']")
                        .PropertyControlValueBind(obj, property.Properties[i]);
                }
            }
        }
        var that=this;
        var target='';
        this.Controls.btnBasicSetting.off('click').on('click',function(){
            //that.Controls.divPrioritySettingProperties.hide();
            that.Controls.btnPrioritySetting.removeClass('active');
            //that.Controls.divBasicSettingProperties.show();
            that.Controls.btnBasicSetting.addClass('active');
            for(let property of _Properties){
                var groups=that.Controls.PropertyTable.find("div[group='" + property.Group + "']");
                for(let group of groups){
                    target=$(group).attr('target');
                    if(target==='basic-setting'){
                        $(group).show();
                    }else if(target==='priority-setting'){
                        $(group).hide();
                    }
                }

            }
        });
        this.Controls.btnPrioritySetting.off('click').on('click',function(){
            // that.Controls.divBasicSettingProperties.hide();
            // that.Controls.divPrioritySettingProperties.show();
            that.Controls.btnPrioritySetting.addClass('active');
            that.Controls.btnBasicSetting.removeClass('active');
            for(let property of _Properties){
                var groups=that.Controls.PropertyTable.find("div[group='" + property.Group + "']");
                for(let group of groups){
                    target=$(group).attr('target');
                    if(target==='basic-setting'){
                        $(group).hide();
                    }else if(target==='priority-setting'){
                        $(group).show();
                    }
                }

            }
        });

        if(obj.WorkflowElementType !== WorkflowElementType.Workflow){
            this.Controls.btnBasicSetting.click();
        }
    }

    var $dataItemTable = $("[property=PropertyPermissions]").find("table:first")
    for(var i = 0; i < 4; i++){
        this.syncAllCheckState($dataItemTable, i);
    }
}

WorkflowProperty.prototype.SetTitle = function () {
    //ERROR:这个Header有什么更可靠的查找方式
    var _PropertyTitle = $(".l-layout-header-inner");
    var workflow=GlobalWorkflowProperties.Workflow;
    if (this.CurrentObject && this.CurrentObject.WorkflowElementType) {
        switch (this.CurrentObject.WorkflowElementType) {
            case WorkflowElementType.Activity:
                if (GlobalWorkflowProperties.Wp.Multi.IsMulti) {
                    //_PropertyTitle.text('Activity:' + this.CurrentObject.DisplayName + "[" + this.CurrentObject.ActivityCode + "]...更多"  + workflow.selectedActivities.length + _WorkflowDesigner_GlobalString.Poeperty_One);
                    _PropertyTitle.text('Activity:' + this.CurrentObject.DisplayName + "[" + this.CurrentObject.ActivityCode + "]...更多"  + workflow.selectedActivities.length);

                }
                else {
                    //显示属性主体
                    _PropertyTitle.text('Activity:' + this.CurrentObject.DisplayName + "[" + this.CurrentObject.ActivityCode + "]");
                }
                ////选中活动
                //obj.Select();
                break;
            case WorkflowElementType.Workflow:
                {
                    _PropertyTitle.text('流程模板:');
                    var _WorkflowDisplayName = $("<input type='text' id='txtWorkflowDisplayName' />");
                    if (typeof (ClauseName) != typeof (undefined)) {
                        _WorkflowDisplayName.val(ClauseName);
                    }
                    _WorkflowDisplayName.unbind("change").bind("change", function (e) {
                        //环境变量
                        ClauseName = $(e.target).val();
                        //左侧
                        WorkflowDocument.DisplayWorkflowFullName();
                        //更新后台
                        WorkflowDocument.UpdateClauseName($(e.target).val());
                        //更新标签标题
                        WorkflowDocument.DisplayTabName();
                        //刷新左侧树
                        top.ReloadNode(workflow.SchemaCode);
                    });
                    _PropertyTitle.append(_WorkflowDisplayName);
                }
                break;
            case WorkflowElementType.Line:
                //obj.Select();
                _PropertyTitle.text( '连接线:' + this.CurrentObject.startActivity.DisplayName + "->" + this.CurrentObject.endActivity.DisplayName);
                break;
            default:
                _PropertyTitle.text('属性');
                break;
        }
    }
}

// 设置属性区域是否显示
WorkflowProperty.prototype.SetPropertyDisplay = function (display) {
    //this.Layout.setRightCollapse(!display);
    if(display){
        $('#divPropertyContainer').show();
    }else{
        $('#divPropertyContainer').hide();
    }

};

//设置当前对象属性值
WorkflowProperty.prototype.SetPropertyValue = function(propertyName,propertyValue){
    GlobalWorkflowProperties.Wp.CurrentObject[propertyName]=propertyValue;
};

WorkflowProperty.prototype.syncAllCheckState = function($dataItemTable, index){
    var allChecked = true;
    $dataItemTable.find("tbody tr").each(function () {
        var _CheckBox = $(this).find("input[type=checkbox]:eq(" + index + ")");
        if(_CheckBox && _CheckBox.parents("td:first").css("visibility") != "hidden" && _CheckBox.prop("checked") == false){
            allChecked = false;
            return false;
        }
    });
    if(allChecked){
        var $checkboxs = $dataItemTable.find("tr:has('input[type=checkbox]'):first").find("input[type=checkbox]");

        var targetCheckbox = $checkboxs[index];
        targetCheckbox.checked = true;
        if(index !== 0){
            $checkboxs[0].checked = true;
        }
        if(index === 2){
            $checkboxs[1].checked = true;
        }

    }
};

/*
JQuery扩展方法
*/
// 绑定当前行编辑和显示控件的值
/*
    obj:图像对象,流程、节点、线条
    name:属性名称
*/
// 设置数据项的权限
var PropertyPermissions = function (obj, parent) {
    //所有Checkbox,包括头行的全选框
    var headerAndRowCheckboxes = $("div[group=DataItem][property=PropertyPermissions]").find("input[type=checkbox]")
    if (GlobalWorkflowProperties.Wp.Multi.IsMulti) {
        //点击启用
        headerAndRowCheckboxes.attr("data-batch", true);
    }
    else {
        headerAndRowCheckboxes.removeAttr("data-batch")
    }
    //首行全选框默认不选中
    $("div[group=DataItem][property=PropertyPermissions]").find("table").find("tr:first").find("input[type=checkbox]").prop("checked", false);

    var _DataItems = PackageManager.GetDataItems()
    var printItems = PackageManager.GetPrintConfigItems();
    _DataItems = _DataItems.concat(printItems);

    if (!_DataItems || _DataItems.length == 0)
        return;

    if (!obj["PropertyPermissions"])
        obj["PropertyPermissions"] = [];
    if (typeof obj["PropertyPermissions"] === 'string')
      obj["PropertyPermissions"] = JSON.parse(obj["PropertyPermissions"]);
    var DataPermissionRows = $("div[group=DataItem][property=PropertyPermissions]").find("tr:has('input[type=checkbox]')").not(":first");
    //若数据权限为空,则初始化为全部只读
    if (obj["PropertyPermissions"].length == 0) {
        obj["PropertyPermissions"] = [];
        $(_DataItems).each(function () {
            obj["PropertyPermissions"].push({
                PropertyName: this.Value,
                Visible: true,
                Editable: false,
                Required: false,
                Printable: true,
                MobileVisible: true
            });
        });
    }

    if (DataPermissionRows && DataPermissionRows.length > 0 && obj["PropertyPermissions"] && obj["PropertyPermissions"].length > 0) {
        $(obj["PropertyPermissions"]).each(function () {
            if (this.PropertyName) {
                var _ItemName = this.PropertyName;
                var _CurrentRow = $(DataPermissionRows).filter(function () {
                    return $(this).attr("item-name") == _ItemName;
                });

                var isFormulaField = $.inArray(_ItemName.indexOf(".") > -1 ? _ItemName.split(".")[1] : _ItemName, GlobalWorkflowProperties.FormulaFields) > -1;
                var isMappingProperty = $.inArray(_ItemName, GlobalWorkflowProperties.MappingProperties) > -1;
                if (isFormulaField || isMappingProperty) {
                    this.Required = false;
                    this.Editable = false;
                }
                //显示属性
                _CurrentRow.find("input[type=checkbox]:eq(0)").prop("checked", this.Visible ? true : false);
                _CurrentRow.find("input[type=checkbox]:eq(1)").prop("checked", this.Editable ? true : false);
                _CurrentRow.find("input[type=checkbox]:eq(2)").prop("checked", this.Required ? true : false);
                _CurrentRow.find("input[type=checkbox]:eq(3)").prop("checked", this.Printable ? true : false);
                _CurrentRow.find("input[type=checkbox]:eq(4)").prop("checked", this.TrackVisible ? true : false);
                _CurrentRow.find("input[type=checkbox]:eq(5)").prop("checked", this.MobileVisible ? true : false);
                //打印配置的字段
                _CurrentRow.find("input[permission='printable']").prop("checked", this.Printable ? true : false);
            }
        });
    }
}

// 设置控件绑定对象的属性
$.fn.PropertyControlValueBind = function (obj, _PropertyName) {
    if (!_PropertyName){
        return;
    }
    var workflow=GlobalWorkflowProperties.Workflow;

    var o = $(this);

    // 显示只读属性(当前只有流程模板编码)
    if (GlobalWorkflowProperties.Wp.CurrentObject.WorkflowElementType == WorkflowElementType.Workflow && _PropertyName == "SchemaCode") {
        o.find("div.property-value input").val(workflow.SchemaCode);
        return o;
    }
    else if(GlobalWorkflowProperties.Wp.CurrentObject.WorkflowElementType == WorkflowElementType.Workflow &&_PropertyName == "FlowCode"){
       if(workflow.WorkflowFullName){
        o.find("div.WorkflowFullName input").val(workflow.WorkflowFullName);
       }
       else{
        o.find("div.WorkflowFullName input").val('');
       }
        return o;
    }
    // 数据项权限
    else if (_PropertyName == "PropertyPermissions") {
        return PropertyPermissions(obj, o);
    }
    // 子流程数据映射
    else if (_PropertyName == "DataMaps") {
        return;
        //return DataMapSettings.SubInstanceDataMapsBind(_PropertyName);
    }
    //参与人
    else if( _PropertyName==='Participants'){
        if(obj.ToolTipText==='SubInstance'){
            $(o).find('i').show();
        }else{
            $(o).find('i').hide();
        }
        var val=GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName];
        if(val){
            $(o).find('.trigger').children('.default').hide();
            $(o).find('.trigger').children('.custom').show();
            ShowFormulaHtml(val,$(o).find('.trigger').children('.custom'),GlobalWorkflowProperties.SchemaCode,HTTP.parseParticipantName);
        }else{
            var handler='';
            if(obj.ToolTipText==='FillSheet'){
                handler='经办人'
            }else if(obj.ToolTipText==='Approve'){
                handler='审批人';
            }else if(obj.ToolTipText==='Circulate'){
                handler='抄送人';
            }else {
                handler='发起人';
            }
            $(o).find('.trigger').children('.default').children('span.content-replace').html(handler);
            $(o).find('.trigger').children('.default').show();
            $(o).find('.trigger').children('.custom').hide();
        }
        return;
    }
    //消息通知
    else if(_PropertyName==='WorkItemDisplayName' || _PropertyName==='Formula' || _PropertyName==='Exclusive'  ){
        if(_PropertyName==='Exclusive'){
            return;
        }
        var val=GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName];
        // if(val){
        //     ShowFormulaHtml(val,$(o).find('.trigger'),GlobalWorkflowProperties.SchemaCode,);
        // }
        var that=o;
        that.find('select').unbind("change").bind("change", function () {
            var type = $(this).val();
            if(type==="0"){
                o.find('div.custom').hide();
                o.find('div.default').show();
                if(_PropertyName==='Formula'){
                    GlobalWorkflowProperties.Wp.CurrentObject['Exclusive']=true;
                    //设置线条样式
                    if (GlobalWorkflowProperties.Wp.CurrentObject.SetLineStyle){
                        GlobalWorkflowProperties.Wp.CurrentObject.SetLineStyle();
                    }
                }else{
                    GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName] = '';
                    if(_PropertyName==='WorkItemDisplayName'){
                        o.find('.trigger').html('设置参数');
                    }
                }
            }else{
                GlobalWorkflowProperties.Wp.CurrentObject['Exclusive']=false;
                o.find('div.custom').show();
                if(_PropertyName==='WorkItemDisplayName'){
                    if(!GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName]){
                        o.find('.trigger').html('设置参数');
                    }
                }
                o.find('div.default').hide();
            }
            that.find('select').DropDownList('SetValue', type);
        });
        var flag =GlobalWorkflowProperties.Wp.CurrentObject['LineNotifyType']
        if(val&&!flag){
            if(_PropertyName==='Formula'){
                GlobalWorkflowProperties.Wp.CurrentObject['Formula']=val
            } 
            that.find('select').val(1);
        }else {
            if(_PropertyName==='Formula'){
                GlobalWorkflowProperties.Wp.CurrentObject['Formula']=val
                if(GlobalWorkflowProperties.Wp.CurrentObject['Exclusive']){
                    that.find('select').val(0);
                }else{
                    that.find('.trigger').html('设置条件');
                    that.find('select').val(1);
                }
            }
        }
        that.find('select').change();
        return;
    }
    //业务处理顺序
    else if(_PropertyName==='ParticipateMethod' || _PropertyName==='NoParticipantPolicy'){
        var that=o;
        var val=GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName];
        var textCtrl=o.find('div.drop-text');
        if(obj.ToolTipText==='FillSheet'){
            // textCtrl.each(function(){
            //     $(this).html($(this).html().replace('审批','经办'));
            // });
            // $('a.drop-item-btn').each(function(){

            // });
            o.find('option').each(function(){
                $(this).html($(this).html().replace('审批','经办'));
            });
        }else if(obj.ToolTipText==='Approve'){
            // textCtrl.each(function(){
            //     $(this).html($(this).html().replace('经办','审批'));
            // });
            // $('ul.drop-list').find('a.drop-item-btn').each(function(){
            //     $(this).html($(this).html().replace('经办','审批'));
            // });
            o.find('option').each(function(){
                $(this).html($(this).html().replace('经办','审批'));
            });
        }
        $(o).find('select').DropDownList({
        });
        that.find('select').unbind("change").bind("change", function () {
            var type = $(this).val();
            GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName]=type;
            that.find('select').DropDownList('SetValue', type);
        });
        if(val){
            that.find('select').val(val);
        }else{
            that.find('select').val(0);
        }
        that.find('select').change();
        return;
    }

    //其他属性根据控件渲染类型来划分
    else {
        var wp=GlobalWorkflowProperties.Wp;
        var val = wp.CurrentObject[_PropertyName];
       // 文本框
        var ctls = o.find("input[type=text],input[type=number],textarea");
        if (ctls.length > 0) {
            //1、节点名称，2、节点编码，3、审批时限自定义时可以输入值
            if (_PropertyName == "AllowedTime" ){
                ctls.unbind("change.property").bind("change.property", function (e) {
                    if($(this).val()==='0'){
                        wp.CurrentObject[_PropertyName]=null;
                    }else{
                        wp.CurrentObject[_PropertyName]=$(this).val();
                    }
                });
                if(parseFloat(val) >0){
                    //设置下拉框为自定义
                    o.find('select').val(1);
                    ctls.val(val);
                }else{
                    o.find('select').val(0);
                }
                var that=o;
                that.find('select').unbind("change").bind("change", function () {
                    var type = $(this).val();
                    if(type!=='0'){
                        o.find('div.custom').show();
                    }else{
                        ctls.val("");
                        wp.CurrentObject[_PropertyName]=null;
                        o.find('div.custom').hide();
                    }
                    that.find('select').DropDownList('SetValue', type);
                });
                that.find('select').change();
                return;
            } else if(_PropertyName==='DisplayName' && wp.CurrentObject.SetText){
                ctls.val(val);
                ctls.unbind("change.NameChanged").bind("change.NameChanged", function (e) {
                    if (wp.CurrentObject && wp.CurrentObject.SetText) {
                        //原名称
                        var _Source = wp.CurrentObject.DisplayName;

                        wp.CurrentObject.DisplayName = $(e.target).val();
                        wp.CurrentObject.SetText();
                        wp.SetTitle();

                        if (wp.CurrentObject.WorkflowElementType == WorkflowElementType.Activity) {
                            TraceManager.AddTrace(TraceManager.TraceType.Activity.TextChange, wp.CurrentObject, _Source);
                        }
                        else if (wp.CurrentObject.WorkflowElementType == WorkflowElementType.Line) {
                            TraceManager.AddTrace(TraceManager.TraceType.Line.TextChange, wp.CurrentObject, _Source);
                        }
                    }
                });
            } else {
                ctls.val(val);
                ctls.unbind("change.property").bind("change.property", function (e) {
                    if(_PropertyName==='ActivityCode'){
                        $(this).val(wp.filterCharacter($(this).val()));
                        wp.CurrentObject[_PropertyName]=$(this).val();

                    }else{
                        wp.CurrentObject[_PropertyName]=$(this).val();
                    }
                });
                //节点编码
                if(_PropertyName==='ActivityCode'){
                    if( obj.ToolTipText==='Connection' ){
                        $(o).hide();
                    }else{
                        $(o).show();
                    }

                }
            }
            return;
        }
        //下拉框
        ctls=o.find('select');
        if(ctls.length>0){
            if (_PropertyName === 'SchemaCode'){
                //模板编码选择
                o.find('select').val(val).change();
                var that=o;
                that.find('select').unbind("change").bind("change", function () {
                    var _SchemaCode = $(this).val();
                    GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName] = _SchemaCode;

                    //更新缓存
                    if (_SchemaCode) {
                        PackageManager.WorkflowNameCache[_SchemaCode.toLowerCase()] = that.find('select').find("option:selected").text();
                    }
                    that.find('select').DropDownList('SetValue', _SchemaCode);
                });
                return;
            }else{
                var _Found = false;
                var that = o;
                o.find("option").each(function () {
                    if ($(this).val() == GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName]) {
                        $(this).prop("selected", true);
                        that.find('select').DropDownList('SetValue', $(this).val());
                        _Found = true;
                    }
                });
                if (!_Found){
                    o.find("option:first").prop("selected", true);
                    that.find('select').DropDownList('SetValue', '0');
                }
                ctls.unbind("change.Property").bind("change.Property", function () {
                    GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName] = $(this).val();
                });
            }
            return;
        }
        //单选框
        ctls=o.find('input[type=radio]');
        if(ctls.length>0){
            //判断值是否=true
            if(val){
                o.find("input[type='radio']:first").prop("checked", true);
            }else{
                o.find("input[type='radio']:first").prop("checked", false);
            }
            //绑定change事件
            $(ctls).each(function(index,el){
                $(el).unbind('change').bind('change',function(){
                    if($(this).prop('checked')){
                        if(index==1){
                            GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName] =false;
                        }else{
                            GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName] =true;
                        }

                    }else{
                        if(index==1){
                            GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName] =true;
                        }else{
                            GlobalWorkflowProperties.Wp.CurrentObject[_PropertyName] =false;
                        }
                    }
                });
            })
            return;
        }
    }
    return o;
}

var SubTableTimeHandler;
var BatchSubColumnState = false;


// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/property.js

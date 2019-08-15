import BizDataType from '../../BizDataType';
import BusinessRuleVue from '../../../../components/console/business-rule/index';
import ScheduleRuleVue from '../../../../components/sheetdesigner/schedule-rule/index';
import SubmitRuleVue from '../../../../components/console/submit-rule/index';
import ExternalFormVue from '../../../../components/sheetdesigner/externalForm/index';
import '../../../plugins/sortable/DragSortable.js';
import { AppTree } from './AppTree';
import HTTP from '../../../../../../api/form.js';
import { Message } from 'iview';
import '../../../../../../assets/bootstrap/js/bootstrap.min.js';
import '../../../../../../assets/bootstrap/css/bootstrap.css';
// import '../../plugins/zTree/css/zTreeStyle/zTreeStyle.css';
import '../../../plugins/zTree/js/jquery.ztree.core.min.js';
import '../../../plugins/zTree/js/jquery.ztree.excheck.min.js';

import { UnitType } from '../../../../../form/config/const.js';

window.SheetDesigner = function (sheetCode, ajaxUrl, engineCode, dataLoadedCallback, type) {
  this.AjaxUrl = ajaxUrl;
  // 表单编码
  this.SheetCode = sheetCode;
  //引擎编码
  this.EngineCode = engineCode;
  //加载完成后回调事件
  this.DataLoadedCallback = dataLoadedCallback;
  // 开发者模式
  this.IsDevMode = false;
  //是否是流程
  this.IsWorkflow = false;
  //摘要
  this.SummarySchema = null;
  //名称
  this.NameSchema = null;
  //描述
  this.DescSchema = null;
  //富文本规则
  this.RTFData = null;
  // Word 模板
  this.wordTemplate = null;
  //表单Code
  this.formCode = null;
  this.isOpenBigForm = false
  //不可删除字段
  // this.UnRemovableProperties = null;
  //表单提交校验规则
  //this.SubmitRules = null;
  //业务规则
  //this.BusinessRules = null;
  this.HostAddress = "www.h3yun.com";
  //字段编号，用于生成字段DataField。新的字段生成规则为F+编码，目的是为了缩短字段编码长度
  this.DataFieldNo = 0;
  // 属性管理
  this.Controlmanagers = {};
  this.type = type
  //表单中关联表单信息
  this.PublishedSchemas = {}; //{SchemaCode:Schema},保存LoadPublishedSchemas获取的数据
  this.Action_Load = "Load"; //加载表单
  this.Action_Save = "Save"; //保存表单草稿
  this.Action_Release = "Release"; //发布表单
  this.Action_LoadPublishedSchemas = "LoadPublishedSchemas"; //根据表单编码获取发布的表单信息
  this.Action_LoadPublishedSchemaProperty = "LoadPublishedSchemaProperty"; //加载发布的表单属性
  this.Action_LoadDataDictValueByItemName = "LoadDataDictItemValueByItemName"; //根据数据字典名称获取值，用于数据字典升级时候
  this.Action_CheckCodeDuplicated = "CheckCodeDuplicated"; //检查字段编码重复
  this.Action_LoadAssociations = "LoadAssociations"; //加载关联列表
  this.Action_LoadPreDataFiled = "LoadPreDataFiled"; //加载预装字段
  this.Action_SwitchExternalForm = "SwitchExternalForm"; //表单外链

  //标记表单是否已经保存过，如果表单DOM改变则标记为false，保存后修改为true
  this.IsSaved = false;
  if (sheetCode == null || sheetCode == void 0 || sheetCode == "") {
    //$.IShowError();
    Message.error("表单不存在");
    //setTimeout(function () { window.close(); }, 500);//提示后关闭
    //return;
  }

  // ----- 记录页面元素 -----
  // 控件区域
  this.$Controls = $("#Controls");
  //设计内容
  this.$SheetContent = $("#sheetContent");
  //表单名称
  this.$NameItems = $("#NameItems");
  //描述
  this.$DescItems = $("#DescSchema");
  //表单摘要
  this.$SummaryItems = $("#SummaryItems");
  //可删除字段
  // this.$DeleteItems = $("#DeleteItems");
  // 权限继承
  this.$InheritObject = $("#InheritObject");
  // 菜单权限编辑容器
  this.$FormActions = $("<div style='overflow-y:auto;height:100%;'>");
  //子表“数据标题”
  this.$ChildNameItems = null;

  // 表单内的按钮和复选框
  this.$btn_SheetControlProperty = $("#btn_SheetControlProperty"); //控件属性Tab切换按钮
  this.$btn_SheetProperty = $("#btn_SheetProperty"); //表单属性Tab切换按钮
  this.$ckEnableFormSns = $("input.ckEnableFormSns"); //启用动态按钮
  this.$ckEnableTask = $("input.ckEnableTask"); //启用任务提醒按钮
  this.$btn_SelectBoList = $("#btn_SelectBoList"); //启用关联列表按钮
  // this.$btn_ResetDataFiled = $("#btn_ResetDataFiled"); //重置字段
  this.$btn_PropertyEventHandler = $("#btn_PropertyEventHandler"); //
  this.$btn_SchemaSubmitFormula = $("#btn_SchemaSubmitFormula"); //提交校验
  this.$btn_ScheduleRuleFormula = $("#btn_ScheduleRuleFormula"); //推送提醒
  this.$btn_ExternalFormFormula = $("#btn_ExternalFormFormula"); //表单外链
  // this.$textExternalForm = $("#textExternalForm"); //
  // this.$btn_ExternalFormPreview = $("#btnExternalFormPreview");
  // this.$QrCodeExternalForm = $("#QrCodeExternalForm");

  // 保存按钮
  this.$btn_Save = $("#btn_Save");
  // 菜单功能按钮
  this.$btn_ActionAcl = $("#btn_ActionAcl");
  // 字段权限
  this.$btn_FiledAcl = $("#btnShowFieldAclModal");
  // 普通权限
  // this.$btn_UserActions = $("#btn_UserActions");
  //管理员权限
  // this.$btn_AdminActions = $("#btn_AdminActions");

  // 表单属性
  this.$SheetPropertysPanel = $("#SheetPropertysPanel");
  // 控件属性
  this.$SheetControlPropertysPanel = $("#SheetControlPropertysPanel");
  this.$tabsContent = $("#tabs-content");
  //定义所有常量
  this.ControlKey = "controlkey"; //全局属性定义
  this.TowColsKey = "layout_towcols"; //一行两列控件
  this.ExpandLayoutKey = 'layout_expand'; // 展开收起布局控件
  this.PageHeader = "page-header"; //标题栏
  this.DesControl = "DesControl"; //标题栏
  this.DataFieldKey = "DataField";//数据项属性
  this.SheetButton = "FormButton";
  this.SheetLabelKey = "FormLabel";
  this.SheetUserKey = "FormUser";
  this.CreatedBy = "CreatedBy.FullName";//发起人、创建人
  this.CreatedTime = "CreatedTime";//发起时间
  this.ModifiedTime = "ModifiedTime";//修改时间
  this.Owner = "OwnerId";//拥有者
  this.OwnerDept = "OwnerDeptId";//拥有者部门
  this.SequenceNo = "SequenceNo";//序列号(只对流程)
  this.SeqNo = "SeqNo";//流水号
  this.FormUserKey = "FormUser";
  this.FormLabelKey = "FormLabel";
  this.FormAssociateProperty = "FormAssociateProperty";
  this.FormFormula = "FormFormula";
  this.FormEmbedCode = "FormEmbedCode"; //代码内嵌
  this.FormApprovalRecord = "FormApprovalRecord"; //审批记录
  // this.Organizations = null;//组织机构
  //删除的控件
  this.RemoveFields = {};

  this.Init();
  //表单提交规则
  //this.SubmitRules = [];
  //表单业务规则
  //this.BusinessRules=[];
  //关联表单属性
  this.SchemaProperties = {};
  //标识是否是安装未断开的表单
  this.IsInstalledSchema = false;
  //预装的字段
  this.PreInstalledFields = [];
  //公式型控件
  this.FormulaFields = [];
  //不能拖放到子表内的控件ControlKey
  this.NotInGridViewControlKeys = [
    "layout_towcols", //一行两列
    "descontrol", //描述
    "page-header", //标题
    "formgridview", //子表
    "formmap", //地图
    "formphoto", //图片
    "formbutton", //按钮
    "formseqno", //流水号
    "layout_expand", //展开收起
    "formformula",//富文本编辑
    "formembedcode", //代码内嵌
    "formapprovalrecord" // 审批记录
  ];
  //不能拖放到一行两列的控件
  this.NotInTowColsControlKeys = [
    "layout_towcols",
    "descontrol",
    "page-header",
    "formgridview",
    "layout_expand",

  ];
  //不能拖放到展开收起的控件
  this.NotInExpandControlKeys = [
    "layout_towcols",
    "descontrol",
    "page-header",
    "formgridview",
    "layout_expand"
  ];

  //系统控件DataField
  this.SystemDataField = [
    "seqno",
    "createdby.fullname",
    "ownerid",
    "ownerdeptid",
    "createdtime",
    "modifiedtime",
  ];
};

(function (SheetDesigner) {
  "use strict";
  SheetDesigner.prototype = {
    //初始化
    Init: function () {
      var that = this;

      that.IsLoaded = 0; //将标记清零
      setTimeout(function () {
        that.LoadSheet.apply(that); //加载表单
        that.MonitorDOMChange(); //监控DOM变化，用于决定是否要保存表单
      }, 0);
    },

    //监视DOM变化，主要用于判定什么是否可以保存表单，如果表单控件数量没有改变则不保存
    MonitorDOMChange: function () {
      var that = this;
      var mutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      if (!!mutationObserver) {
        var callback = function (records) {
          that.IsSaved = false;
        };
        var mo = new MutationObserver(callback);
        var options = {
          'childList': true,
          'substree': true
        }
        mo.observe(that.$SheetContent[0], options);
      }
    },
    //初始化切换按钮居中
    initChangeBtn: function () {
      var widthLeft = $('.layoutrow-item[data-layoutitem="Left"]').width();
      $('.layoutrow  span[data-type="changeplace"]').css({ 'left': widthLeft });
      if ($('.layoutrow[data-controlkey="layout_towcols"]').find('.btn-change').length == 0) {
        $('.layoutrow[data-controlkey="layout_towcols"]').append($('<span data-type="changeplace" title="点击交换位置" class="btn-change icon-exchange" style="left:' + widthLeft + 'px"></span>'));
      }
    },

    //加载表单
    LoadSheet: function () {
      var that = this;
      that.IsLoaded--;
      if (this.type == 'flow') {
        HTTP.load2(that.SheetCode)
          .then(function (res) {
            if (!res.Successful) {
              Message.error("加载失败");
              //window.close();
            }
            //console.log(res);
            
            that.$SheetControlPropertysPanel.empty();
            let data = res.ReturnData;
            //SheetCode
            $.BizSheet.SheetCode = that.SheetCode;
            //表单业务规则
            $.BizSheet.BusinessRules = null;
            //表单提交校验规则
            $.BizSheet.SubmitRules = data.SubmitRules;
            //标记提交校验规则和业务规则是否修改过
            $.BizSheet.SubmitRulesUpdated = false;
            $.BizSheet.BusinessRulesUpdated = false;
            //外链是否开启
            $.BizSheet.EnableExternalForm = data.EnableExternalForm;

            that.AppCode = data.AppCode;
            //表单提交规则，只有规则没有规则的文本信息，用于校验字段是否存在于规则中
            that.SubmitRules = data.SubmitRules;
            //业务规则，只有规则没有规则的文本信息，用于校验字段是否存在于规则中
            that.BusinessRules = data.BusinessRules;
            // 开发者模式
            that.IsDevMode = data.IsDevMode;
            that.formCode = data.formCode || '';
            that.isOpenBigForm = data.isOpenBigForm === 'true'
            $.Schema.formCode = data.formCode || '';
            $.Schema.isOpenBigForm = that.isOpenBigForm;
            that.RTFData = data.RTFData;
            that.wordTemplate = {
              id: res.attachId,
              name: res.fileName
            };

            // 是否流程表单
            that.IsWorkflow = data.IsWorkflow;
            //是否是安装的表单
            that.IsInstalledSchema = data.IsInstalled;
            //系统域名
            that.HostAddress = data.HostAddress;
            //是否开启外链
            //that.EnableExternalForm = data.EnableExternalForm
            //预装的字段
            that.PreInstalledFields = data.InstalledFields;
            if (data.IsDevMode) {
              that.DevCode = data.DevCode;
              that.EngineUsageType = data.EngineUsageType;
            } else {
              // 代码为空
              that.DevCode = "";
              // 把按钮控件隐藏
              that.$Controls.find("a[data-controlkey='FormButton']").parent().remove();
            }
            //是否启用动态
            that.$ckEnableFormSns.eq(data.EnableFormSns ? 0 : 1).prop("checked", true);
            //是否启用任务提醒任务提醒
            that.$ckEnableTask.eq(data.EnableTask ? 0 : 1).prop("checked", true);
            //关联列表
            that.$btn_SelectBoList.attr("data-associationcodes", data.AssociationCodes);

            if ($.isEmptyObject(data.DesignModeContent) && !$.isEmptyObject(data.PreProperties)) {
              //从第三方系统绑定数据项
              for (var preDataFiled in data.PreProperties) {
                that.AddDataFieldFromData.apply(that, [preDataFiled, data.PreProperties[preDataFiled]]);
              }
            } else if (data.DesignModeContent != null) {
              if (data.DesignModeContent.indexOf("navTabs") === -1) {
                if (data.DesignModeContent === '<img src="./huizhi.svg" id="tipPic">') {
                  data.DesignModeContent = data.DesignModeContent.replace("../../../", "./");
                }
                that.$SheetContent.empty().html(data.DesignModeContent);
                that.$SheetContent.find(".SheetGridView tr.SheetGridView_tr").each(function () {
                  // 如果子表的最后一列不是占位列，那么为其添加占位列
                  if ($(this).find("td:last").html() != "") {
                    $(this).append('<td class="SheetGridView_td ui-sortable ui-droppable" style="min-width: 176px;"></td>');
                  }
                });
              } else {
                $("#tipPic").remove();
                //原来有tab页签的,需要去掉所有的tab页
                var $tempDiv = $("<div>").html(data.DesignModeContent);
                var $rows = $tempDiv.find("#tabContent>.tab-pane").children("div.row");
                var boSchemaCodes = [];
                for (var i = 0; i < $rows.length; i++) {
                  var $control = $($rows[i]);
                  var controlkey = $control.attr("data-controlkey");
                  if (typeof (controlkey) != "undefined") {
                    if ($control.attr("data-controlkey").toLowerCase() == "sheetbolist") {
                      //关联列表
                      boSchemaCodes.push($control.attr("data-BOSchemaCode"));//+ ";";
                    } else if ($control.attr("data-controlkey").toLowerCase() == "sheetsns") {
                      //动态
                      that.$ckEnableFormSns.eq(0).prop("checked", true);
                    } else {
                      that.$SheetContent.append($control);
                    }
                  } else {
                    that.$SheetContent.append($control);
                  }
                }
              }

              //Error:添加兼容性版本
              that.UpgradeHtml.apply(that);
            }
            // 名称、摘要、删除字段
            that.IsLoaded--;
            setTimeout(function () {
              that.NameSchema = data.NameSchema;
              that.DescSchema = data.DescSchema
              that.SummarySchema = data.SummarySchema;
              // that.UnRemovableProperties = data.UnRemovableProperties;
              that.SubmitRules = data.SubmitRules;
              // that.BusinessRules = data.BusinessRules;
              that.LoadSummary.apply(that, [that.SummarySchema, that.$SummaryItems]);
              if (that.SummarySchema.length > 0) {
                that.$SummaryItems.next(i).remove()
              }
              that.LoadSummary.apply(that, [that.NameSchema, that.$NameItems]);
              if (that.NameSchema.length > 0) {
                that.$NameItems.next(i).remove()
              }
              //that.LoadSummary.apply(that, [that.UnRemovableProperties, that.$DeleteItems]);
              that.BindServer = data.BindServer;
              // if (!that.BindServer && (that.UnRemovableProperties == null || that.UnRemovableProperties.length == 0) && data.AppSource != 1) {
              //   // 没有绑定服务，又无不可删除字段
              //   that.$btn_ResetDataFiled.remove();
              // } else {
              //   that.$btn_ResetDataFiled.show();
              // }
              that.IsLoaded++;
            }, 0);

            // 是否启用数据权限
            that.IsLoaded--;
            setTimeout(function () {
              that.EnableDataAcl = data.EnableDataAcl;
              that.SingletonModule = data.SingletonModule;
              if (that.SingletonModule) {
                that.$btn_ExternalFormFormula.hide();
              }
              that.DataAclInheritedFrom = data.DataAclInheritedFrom;
              that.InitInheritObjectSelect.apply(that);
              that.IsLoaded++;
            }, 0);

            //加载菜单
            that.DefaultActions = that.IsDevMode ? data.DefaultActions : data.Actions;
            that.SmartActionCategories = data.SmartActionCategories;
            that.IsLoaded--;
            setTimeout(function () {
              that.LoadActions.apply(that, [data.Actions]);
              that.IsLoaded++;
            }, 0);

            // 绑定加载后的元素事件
            // 控件点击事件
            that.$SheetContent.find("div.sheet-control:not(.SheetGridView),div." + that.PageHeader + ",div." + that.DesControl).click(function (e) {
              that.ControlElementSelected($(this), e);
            });

            // 描述点击显示隐藏
            that.$SheetContent.find(".sheet-control .icon-tip").click(function (e) {
              $(this).parent().siblings('.descriptionBox').toggle();
              $(this).find('.arrowhead').toggle();
              return false;
            });

            // 控件鼠标移动事件
            that.$SheetContent.find("div.sheet-control:not(.SheetGridView),div." + that.PageHeader + ",div." + that.DesControl).hover(function () {
              $(this).css({
                "background-color": "#DCF1FF !important",
              });
            }, function () {
              $(this).css({
                "background-color": "#F1FAFF"
              })
            });

            //获取之前控件编码，用于设置DataFieldNo初始值
            that.$SheetContent.find("div.sheet-control:not(.SheetGridView),div." + that.PageHeader + ",div." + that.DesControl).each(function () {
              var dataField = $(this).attr("data-datafield");
              if (dataField == undefined) {
                return true;
              }
              if (dataField.indexOf(".") > -1) {
                dataField = dataField.split(".")[1];
              }
              if (dataField.length == 8 && dataField.indexOf("F") == 0) {
                var no = parseInt(dataField.slice(1));
                if (no > that.DataFieldNo) {
                  that.DataFieldNo = no;
                }
              }
            });
            // 控件附件点击事件
            that.$SheetContent.find("input[type='file']").click(function (e) {
              e.preventDefault();
            });

            // 所有控件删除按钮
            that.$SheetContent.find("button[data-buttontype='remomvecontrol']").off("click").on("click", function () {
              that.RemoveControl($(this).parent());
            });

            // 交换位置按钮
            that.$SheetContent.find("span[data-type='changeplace']").off("click").on("click", function () {
              var $Items = $(this).parent().children("div.layoutrow-item");
              if ($Items.length == 2) {
                $($Items[0]).attr("data-layoutitem", "Right").before($($Items[1]).attr("data-layoutitem", "Left"));
              }
            });

            // 新增一行按钮
            that.$SheetContent.find("span[data-type='addnewline']").off("click").on("click", function () {
              var $layoutContainer = $(this).parent().children("div.expand-layout-container");
              $layoutContainer.append($('<div class="col-sm-12 col-xs-12 layoutrow-item" data-layoutitem="Expand" placeholder="将左侧控件拖入此处"></div>'));
              that.BindDragEvent();
            });

            // 子表编辑按钮
            // $("button.editcontrol").off("click").on("click", function (e) {
            //   that.ControlElementSelected.apply(that, [$(this).parent(), e]);
            // });

            // 子表
            $("div[data-controlkey='FormGridView']").off("click").on("click", function (e) {
              that.ControlElementSelected.apply(that, [$(this), e]);
            });

            // 一行两列
            $("div[data-controlkey='layout_towcols']").off("click").on("click", function (e) {
              that.ControlElementSelected.apply(that, [$(this), e]);
            });

            // 展开收起
            $("div[data-controlkey='layout_expand']").off("click").on("click", function (e) {
              that.ControlElementSelected.apply(that, [$(this), e]);
            });

            // 已经存到数据库的选人控件,不允许改变类型
            // that.PublishedUserProperties = data.PublishedUserProperties;
            // 已经存到数据库的单选控件,不允许改变类型
            that.PublishedCheckboxProperties = data.PublishedCheckboxProperties;
            // that.Organizations = data.Organizations;
            that.BindBtnEvent();
            that.BindDragEvent.apply(that);
            that.IsLoaded++;

            //如果是非开发者安装的表单
            if (!that.IsDevMode && that.IsInstalledSchema) {
              //不允许修改表单名称
              $("#ProAddNameItems").off("click.AddNameItems");
              $("#ProAddNameItems").find(".property-input").addClass("itemDisabled");
              //不允许修改表单摘要
              $("#ProAddSummaryItems").off("click.AddSummaryItems");
              $("#ProAddSummaryItems").find(".property-input").addClass("itemDisabled");
              //不允许修改功能那妞
              that.$btn_ActionAcl.off("click.ActionAcl").addClass("itemDisabled").attr("disabled", "disabled");
              //不允许修改字段权限（点击事件在VUE中控制了）
              //that.$btn_FiledAcl.unbind().addClass("itemDisabled").attr("disabled", "disabled");
              //不允许修改数据权限
              $('#InheritObject').attr('disabled', 'disabled');
              //不允许修改业务规则
              that.$btn_PropertyEventHandler.off('click.PropertyEventHandler').addClass("itemDisabled").attr("disabled", "disabled");
              //不允许修改提交校���规则
              that.$btn_SchemaSubmitFormula.off('click.SchemaSubmitFormula').addClass("itemDisabled").attr("disabled", "disabled");
              //不允许修改推送提醒
              that.$btn_ScheduleRuleFormula.off('click.ScheduleRuleFormula').addClass("itemDisabled").attr("disabled", "disabled");
              //不允许修改表单外链,可以查看外链状态
              //that.$btn_ExternalFormFormula.off("click").addClass("itemDisabled").attr("disabled", "disabled");
              //不允许开启/关闭表单动态
              that.$ckEnableFormSns.attr('disabled', 'disabled');
              //不允许开启/关闭任务提醒
              that.$ckEnableTask.attr('disabled', 'disabled');
              //不允许修改关联列表
              that.$btn_SelectBoList.off('click.SelectBoList').addClass("itemDisabled").attr("disabled", "disabled");
              //不允许操作恢复预装字段
              // that.$btn_ResetDataFiled.off('click.ResetDataFiled').addClass("itemDisabled").attr("disabled", "disabled");
            }

            //移除所有预装字段的删除按钮
            // for (var fieldIndex = 0; fieldIndex < this.PreInstalledFields.length; fieldIndex++) {
            //   var $el = this.GetControlElement(this.PreInstalledFields[fieldIndex]);
            //   if ($el != undefined) {
            //     //判断是否在一行两列内，如果在一行两列内要去掉一行两列的删除按钮
            //     $el.children("button[data-buttontype='remomvecontrol']").remove();
            //     var layOut = $el.closest('.layoutrow');
            //     if (layOut != undefined) {
            //       layOut.children("button[data-buttontype='remomvecontrol']").remove();
            //     }

            //   }
            // }
            if ($("#DesignerZone").is(':visible')) {
              that.initChangeBtn(); //初始化切换按钮居中
            }
            if (that.DataLoadedCallback) {
              that.DataLoadedCallback();
            }


          })
          .catch(err => {
            console.log(err);
            //$.IShowError("加载失败2");
            Message.error("加载失败2");
          }).finally(() => {
          })
      }
      else {
        HTTP.load(that.SheetCode)
          .then(function (res) {
            if (!res.Successful) {
              Message.error("加载失败");
              //window.close();
            }
            //console.log(res);
            that.$SheetControlPropertysPanel.empty();
            let data = res.ReturnData;
            //SheetCode
            $.BizSheet.SheetCode = that.SheetCode;
            //表单业务规则
            $.BizSheet.BusinessRules = null;
            //表单提交校验规则
            $.BizSheet.SubmitRules = data.SubmitRules;
            //标记提交校验规则和业务规则是否修改过
            $.BizSheet.SubmitRulesUpdated = false;
            $.BizSheet.BusinessRulesUpdated = false;
            //外链是否开启
            $.BizSheet.EnableExternalForm = data.EnableExternalForm;

            that.AppCode = data.AppCode;
            //表单提交规则，只有规则没有规则的文本信息，用于校验字段是否存在于规则中
            that.SubmitRules = data.SubmitRules;
            //业务规则，只有规则没有规则的文本信息，用于校验字段是否存在于规则中
            that.BusinessRules = data.BusinessRules;
            // 开发者模式
            that.IsDevMode = data.IsDevMode;
            that.formCode = data.formCode || '';
            that.isOpenBigForm = data.isOpenBigForm === "true"
            $.Schema.formCode = data.formCode || '';
            $.Schema.isOpenBigForm = that.isOpenBigForm;
            that.RTFData = data.RTFData;
            that.wordTemplate = {
              id: res.attachId,
              name: res.fileName
            };

            // 是否流程表单
            that.IsWorkflow = data.IsWorkflow;
            //是否是安装的表单
            that.IsInstalledSchema = data.IsInstalled;
            //系统域名
            that.HostAddress = data.HostAddress;
            //是否开启外链
            //that.EnableExternalForm = data.EnableExternalForm
            //预装的字段
            that.PreInstalledFields = data.InstalledFields;
            if (data.IsDevMode) {
              that.DevCode = data.DevCode;
              that.EngineUsageType = data.EngineUsageType;
            } else {
              // 代码为空
              that.DevCode = "";
              // 把按钮控件隐藏
              that.$Controls.find("a[data-controlkey='FormButton']").parent().remove();
            }
            //是否启用动态
            that.$ckEnableFormSns.eq(data.EnableFormSns ? 0 : 1).prop("checked", true);
            //是否启用任务提醒任务提醒
            that.$ckEnableTask.eq(data.EnableTask ? 0 : 1).prop("checked", true);
            //关联列表
            that.$btn_SelectBoList.attr("data-associationcodes", data.AssociationCodes);

            if ($.isEmptyObject(data.DesignModeContent) && !$.isEmptyObject(data.PreProperties)) {
              //从第三方系统绑定数据项
              for (var preDataFiled in data.PreProperties) {
                that.AddDataFieldFromData.apply(that, [preDataFiled, data.PreProperties[preDataFiled]]);
              }
            } else if (data.DesignModeContent != null) {
              if (data.DesignModeContent.indexOf("navTabs") === -1) {
                if (data.DesignModeContent === '<img src="./huizhi.svg" id="tipPic">') {
                  data.DesignModeContent = data.DesignModeContent.replace("../../../", "./");
                }
                that.$SheetContent.empty().html(data.DesignModeContent);
                that.$SheetContent.find(".SheetGridView tr.SheetGridView_tr").each(function () {
                  // 如果子表的最后一列不是占位列，那么为其添加占位列
                  if ($(this).find("td:last").html() != "") {
                    $(this).append('<td class="SheetGridView_td ui-sortable ui-droppable" style="min-width: 176px;"></td>');
                  }
                });
              } else {
                $("#tipPic").remove();
                //原来有tab页签的,需要去掉所有的tab页
                var $tempDiv = $("<div>").html(data.DesignModeContent);
                var $rows = $tempDiv.find("#tabContent>.tab-pane").children("div.row");
                var boSchemaCodes = [];
                for (var i = 0; i < $rows.length; i++) {
                  var $control = $($rows[i]);
                  var controlkey = $control.attr("data-controlkey");
                  if (typeof (controlkey) != "undefined") {
                    if ($control.attr("data-controlkey").toLowerCase() == "sheetbolist") {
                      //关联列表
                      boSchemaCodes.push($control.attr("data-BOSchemaCode"));//+ ";";
                    } else if ($control.attr("data-controlkey").toLowerCase() == "sheetsns") {
                      //动态
                      that.$ckEnableFormSns.eq(0).prop("checked", true);
                    } else {
                      that.$SheetContent.append($control);
                    }
                  } else {
                    that.$SheetContent.append($control);
                  }
                }
              }

              //Error:添加兼容性版本
              that.UpgradeHtml.apply(that);
            }
            // 名称、摘要、删除字段
            that.IsLoaded--;
            setTimeout(function () {
              that.NameSchema = data.NameSchema;
              that.DescSchema = data.DescSchema
              that.SummarySchema = data.SummarySchema;
              // that.UnRemovableProperties = data.UnRemovableProperties;
              that.SubmitRules = data.SubmitRules;
              // that.BusinessRules = data.BusinessRules;
              that.LoadSummary.apply(that, [that.SummarySchema, that.$SummaryItems]);
              if (that.SummarySchema.length > 0) {
                that.$SummaryItems.next(i).remove()
              }
              that.LoadSummary.apply(that, [that.NameSchema, that.$NameItems]);
              if (that.NameSchema.length > 0) {
                that.$NameItems.next(i).remove()
              }
              //that.LoadSummary.apply(that, [that.UnRemovableProperties, that.$DeleteItems]);
              that.BindServer = data.BindServer;
              // if (!that.BindServer && (that.UnRemovableProperties == null || that.UnRemovableProperties.length == 0) && data.AppSource != 1) {
              //   // 没有绑定服务，又无不可删除字段
              //   that.$btn_ResetDataFiled.remove();
              // } else {
              //   that.$btn_ResetDataFiled.show();
              // }
              that.IsLoaded++;
            }, 0);

            // 是否启用数据权限
            that.IsLoaded--;
            setTimeout(function () {
              that.EnableDataAcl = data.EnableDataAcl;
              that.SingletonModule = data.SingletonModule;
              if (that.SingletonModule) {
                that.$btn_ExternalFormFormula.hide();
              }
              that.DataAclInheritedFrom = data.DataAclInheritedFrom;
              that.InitInheritObjectSelect.apply(that);
              that.IsLoaded++;
            }, 0);

            //加载菜单
            that.DefaultActions = that.IsDevMode ? data.DefaultActions : data.Actions;
            that.SmartActionCategories = data.SmartActionCategories;
            that.IsLoaded--;
            setTimeout(function () {
              that.LoadActions.apply(that, [data.Actions]);
              that.IsLoaded++;
            }, 0);

            // 绑定加载后的元素事件
            // 控件点击事件
            that.$SheetContent.find("div.sheet-control:not(.SheetGridView),div." + that.PageHeader + ",div." + that.DesControl).click(function (e) {
              that.ControlElementSelected($(this), e);
            });

            // 描述点击显示隐藏
            that.$SheetContent.find(".sheet-control .icon-tip").click(function (e) {
              $(this).parent().siblings('.descriptionBox').toggle();
              $(this).find('.arrowhead').toggle();
              return false;
            });

            // 控件鼠标移动事件
            that.$SheetContent.find("div.sheet-control:not(.SheetGridView),div." + that.PageHeader + ",div." + that.DesControl).hover(function () {
              $(this).css({
                "background-color": "#DCF1FF !important",
              });
            }, function () {
              $(this).css({
                "background-color": "#F1FAFF"
              })
            });

            //获取之前控件编码，用于设置DataFieldNo初始值
            that.$SheetContent.find("div.sheet-control:not(.SheetGridView),div." + that.PageHeader + ",div." + that.DesControl).each(function () {
              var dataField = $(this).attr("data-datafield");
              if (dataField == undefined) {
                return true;
              }
              if (dataField.indexOf(".") > -1) {
                dataField = dataField.split(".")[1];
              }
              if (dataField.length == 8 && dataField.indexOf("F") == 0) {
                var no = parseInt(dataField.slice(1));
                if (no > that.DataFieldNo) {
                  that.DataFieldNo = no;
                }
              }
            });
            // 控件附件点击事件
            that.$SheetContent.find("input[type='file']").click(function (e) {
              e.preventDefault();
            });

            // 所有控件删除按钮
            that.$SheetContent.find("button[data-buttontype='remomvecontrol']").off("click").on("click", function () {
              that.RemoveControl($(this).parent());
            });

            // 交换位置按钮
            that.$SheetContent.find("span[data-type='changeplace']").off("click").on("click", function () {
              var $Items = $(this).parent().children("div.layoutrow-item");
              if ($Items.length == 2) {
                $($Items[0]).attr("data-layoutitem", "Right").before($($Items[1]).attr("data-layoutitem", "Left"));
              }
            });

            // 新增一行按钮
            that.$SheetContent.find("span[data-type='addnewline']").off("click").on("click", function () {
              var $layoutContainer = $(this).parent().children("div.expand-layout-container");
              $layoutContainer.append($('<div class="col-sm-12 col-xs-12 layoutrow-item" data-layoutitem="Expand" placeholder="将左侧控件拖入此处"></div>'));
              that.BindDragEvent();
            });

            // 子表编辑按钮
            // $("button.editcontrol").off("click").on("click", function (e) {
            //   that.ControlElementSelected.apply(that, [$(this).parent(), e]);
            // });

            // 子表
            $("div[data-controlkey='FormGridView']").off("click").on("click", function (e) {
              that.ControlElementSelected.apply(that, [$(this), e]);
            });

            // 一行两列
            $("div[data-controlkey='layout_towcols']").off("click").on("click", function (e) {
              that.ControlElementSelected.apply(that, [$(this), e]);
            });

            // 展开收起
            $("div[data-controlkey='layout_expand']").off("click").on("click", function (e) {
              that.ControlElementSelected.apply(that, [$(this), e]);
            });

            // 已经存到数据库的选人控件,不允许改变类型
            // that.PublishedUserProperties = data.PublishedUserProperties;
            // 已经存到数据库的单选控件,不允许改变类型
            that.PublishedCheckboxProperties = data.PublishedCheckboxProperties;
            // that.Organizations = data.Organizations;
            that.BindBtnEvent();
            that.BindDragEvent.apply(that);
            that.IsLoaded++;

            //如果是非开发者安装的表单
            if (!that.IsDevMode && that.IsInstalledSchema) {
              //不允许修改表单名称
              $("#ProAddNameItems").off("click.AddNameItems");
              $("#ProAddNameItems").find(".property-input").addClass("itemDisabled");
              //不允许修改表单摘要
              $("#ProAddSummaryItems").off("click.AddSummaryItems");
              $("#ProAddSummaryItems").find(".property-input").addClass("itemDisabled");
              //不允许修改功能那妞
              that.$btn_ActionAcl.off("click.ActionAcl").addClass("itemDisabled").attr("disabled", "disabled");
              //不允许修改字段权限（点击事件在VUE中控制了）
              //that.$btn_FiledAcl.unbind().addClass("itemDisabled").attr("disabled", "disabled");
              //不允许修改数据权限
              $('#InheritObject').attr('disabled', 'disabled');
              //不允许修改业务规则
              that.$btn_PropertyEventHandler.off('click.PropertyEventHandler').addClass("itemDisabled").attr("disabled", "disabled");
              //不允许修改提交校���规则
              that.$btn_SchemaSubmitFormula.off('click.SchemaSubmitFormula').addClass("itemDisabled").attr("disabled", "disabled");
              //不允许修改推送提醒
              that.$btn_ScheduleRuleFormula.off('click.ScheduleRuleFormula').addClass("itemDisabled").attr("disabled", "disabled");
              //不允许修改表单外链,可以查看外链状态
              //that.$btn_ExternalFormFormula.off("click").addClass("itemDisabled").attr("disabled", "disabled");
              //不允许开启/关闭表单动态
              that.$ckEnableFormSns.attr('disabled', 'disabled');
              //不允许开启/关闭任务提醒
              that.$ckEnableTask.attr('disabled', 'disabled');
              //不允许修改关联列表
              that.$btn_SelectBoList.off('click.SelectBoList').addClass("itemDisabled").attr("disabled", "disabled");
              //不允许操作恢复预装字段
              // that.$btn_ResetDataFiled.off('click.ResetDataFiled').addClass("itemDisabled").attr("disabled", "disabled");
            }

            //移除所有预装字段的删除按钮
            // for (var fieldIndex = 0; fieldIndex < this.PreInstalledFields.length; fieldIndex++) {
            //   var $el = this.GetControlElement(this.PreInstalledFields[fieldIndex]);
            //   if ($el != undefined) {
            //     //判断是否在一行两列内，如果在一行两列内要去掉一行两列的删除按钮
            //     $el.children("button[data-buttontype='remomvecontrol']").remove();
            //     var layOut = $el.closest('.layoutrow');
            //     if (layOut != undefined) {
            //       layOut.children("button[data-buttontype='remomvecontrol']").remove();
            //     }

            //   }
            // }
            if ($("#DesignerZone").is(':visible')) {
              that.initChangeBtn(); //初始化切换按钮居中
            }
            if (that.DataLoadedCallback) {
              that.DataLoadedCallback();
            }


          })
          .catch(err => {
            console.log(err);
            //$.IShowError("加载失败2");
            Message.error("加载失败2");
          }).finally(() => {
          })
      }




      that.Requst(this.Action_Load, { SheetCode: that.SheetCode }, function (data) {

      });
    },

    // 绑定按钮事件
    BindBtnEvent: function () {
      var that = this;
      // 属性切换
      var btnPropertyChange = function () {
        if (that.$SheetContent.find('.drop-item').length == 0) {
          that.$SheetControlPropertysPanel.empty();
        }

        that.$btn_SheetControlProperty.removeClass("active");
        that.$btn_SheetProperty.removeClass("active");
        AppTree.destroyTree();//销毁所有树
        $(this).addClass("active");
        if ($(this).attr("data-target") == "#SheetControlPropertysPanel") {
          that.$tabsContent.css({ "transform": "translateX(0px) translateZ(0px)" });
          that.$SheetControlPropertysPanel.getNiceScroll(0).doScrollTop(0, 0); // Scroll Y Axis
        } else {
          that.$SheetPropertysPanel.getNiceScroll(0).doScrollTop(0, 0); // Scroll Y Axis
          that.$tabsContent.css({ "transform": "translateX(-100%) translateZ(0px)" });
        }

        //无列表表单屏蔽表单外链
        if (that.SingletonModule) {
          that.$btn_ExternalFormFormula.hide();
        }
      };

      that.$btn_SheetControlProperty.off("click.SheetControlProperty").on("click.SheetControlProperty", btnPropertyChange);
      that.$btn_SheetProperty.off("click.SheetProperty").on("click.SheetProperty", btnPropertyChange);

      // 点击屏蔽，切换属性
      that.$SheetContent.off("click.SheetContent").on("click.SheetContent", function (e) {
        if (e.target === this) {
          that.$SheetContent.find(".drop-item").find("button[data-buttontype='remomvecontrol']").hide();
          that.$SheetContent.find(".drop-item").find("[data-buttontype='changecontrol']").hide();
          that.$SheetContent.find(".drop-item").removeClass("drop-item");
          that.$btn_SheetProperty.click();
        }
        e.stopPropagation();
      });

      // 开发者
      if (!that.IsDevMode) {
        // 界面布局修改
        $(".Designer-container").css("padding-top", "60px");
      } else {
        // 添加不允许删除字段
        //$("#ProAddDeleteItems").off("click.AddDeleteItems").on("click.AddDeleteItems", function () {
        //that.ShowNameSummarySelector.apply(that, [that.$DeleteItems]);
        // });
      }

      // 保存事件
      that.$btn_Save.off("click.btn_Save").on("click.btn_Save", function () {
        that.Release.apply(that);
      });

      // 添加表单名称
      $("#ProAddNameItems").off("click.AddNameItems").on("click.AddNameItems", function () {
        that.ShowNameSummarySelector.apply(that, [that.$NameItems, "Name"]);
      });

      // 添加表单摘要
      $("#ProAddSummaryItems").off("click.AddSummaryItems").on("click.AddSummaryItems", function () {
        that.ShowNameSummarySelector.apply(that, [that.$SummaryItems, "Summary"]);
      });

      //  菜单权限
      that.$btn_ActionAcl.off("click.ActionAcl").on("click.ActionAcl", function () {
        that.ShowEditActionAcl.apply(that);
      });

      // 字段权限
      // that.$btn_FiledAcl.off("click.FiledAcl").on("click.FiledAcl", function () {
      //   that.ShowEditFiledAcl.apply(that);
      // });

      // 关联列表
      that.$btn_SelectBoList.off("click.SelectBoList").on("click.SelectBoList", function () {
        that.ShowEditAssociations.apply(that);
      });

      // 恢复预装字段
      // that.$btn_ResetDataFiled.off("click.ResetDataFiled").on("click.ResetDataFiled", function () {
      //   that.ResetDataFiled.apply(that);
      // });

      //业务规则
      that.$btn_PropertyEventHandler.off('click.PropertyEventHandler').on('click.PropertyEventHandler', function () {
        //先保存表单
        that.Save();
        let params = {
          sheetCode: that.SheetCode,
          rules: $.BizSheet.BusinessRules
        }
        BusinessRuleVue.show(params);
      });
      //校验规则
      that.$btn_SchemaSubmitFormula.off('click.SchemaSubmitFormula').on('click.SchemaSubmitFormula', function () {
        //保存表单
        that.Save();
        let params = {
          sheetCode: that.SheetCode
        }
        SubmitRuleVue.show(params)
      });
      //推送提醒
      that.$btn_ScheduleRuleFormula.off('click.ScheduleRuleFormula').on('click.ScheduleRuleFormula', function () {
        //保存表单
        //that.Save();
        let params = {
          sheetCode: that.SheetCode
        }
        ScheduleRuleVue.show(params);
      });

      //表单外链
      that.$btn_ExternalFormFormula.off("click.ExternalFormFormula").on("click.ExternalFormFormula", function () {
        //保存表单
        //that.Save();
        var schemaCode = that.SheetCode;
        //外链链接
        var externalLink = that.HostAddress + "/FormExternal/index/" + schemaCode + "?EngineCode=" + that.EngineCode;
        //预览链接
        var externalLinkPreview = ((that.HostAddress.indexOf("http") > -1) ? "" : "http://") + externalLink + "&IsPreview=1";

        let params = {
          schemaCode: schemaCode,
          externalLink: externalLink,
          externalLinkPreview: externalLinkPreview,
          EnableExternalForm: $.BizSheet.EnableExternalForm, //that.EnableExternalForm,
          sheetDesigner: that
        }
        ExternalFormVue.show(params);
      });

      //绑定键盘事件
      $(window).off("keydown.SheetDesigner").on("keydown.SheetDesigner", this, function (e) {
        var that = e.data;
        switch (e.keyCode) {
          case 46://DEL
            if (that.CurrentSettingKey && $("#DesignerZone").is(":visible") && e.target.tagName.toUpperCase() != "INPUT") {
              var $el = that.GetControlElement(that.CurrentSettingKey);
              that.RemoveControl($el);
            }
            break;
          case 83://s
            if (e.ctrlKey) {
              // ctrl+s
              that.Release();

              if (e && e.preventDefault) {
                e.preventDefault();
              } else {
                window.event.returnValue = false;
              }
              return false;
            }
            break;
        }
      });
    },

    //功能按钮
    LoadActions: function (actions) {
      this.$FormActions.empty();
      // 添加
      var $addBtn = $("<a class='btn btn-default addActive'>").append("<i class='fa icon-add'></i>").append(" 新增");
      if (this.IsDevMode) {
        var $tabs = $("<div class='row' style='margin:0'>").append($addBtn);
        this.$FormActions.append($tabs);
        var that = this;
        $addBtn.click(function () {
          that.EditAction.apply(that);
        });
      }
      var $actionList = $("<ul class='ActionList'>");
      this.$FormActions.append($actionList);
      if (actions == void 0) {
        return;
      }
      for (var i = 0; i < actions.length; i++) {
        var actionElement = this.CreateActionElement(actions[i]);
        actionElement.children('.col-sm-2').remove();
        $actionList.append(actionElement);
      }
      this.BindActionSortable();
    },

    // Html 升级
    UpgradeHtml: function () {

      // 1. 读取所有控件
      // 2. 控件标示修改：Sheet =》 Form
      // 3. 多行文本 =》 换控件
      // 4. 多人参与者 =》 多人控件
      // 5.
      var rows = this.$SheetContent.find("div.row[data-" + this.ControlKey + "^='Sheet'],div.row[data-" + this.ControlKey + "^='Form']");
      for (var i = 0; i < rows.length; i++) {
        var $row = $(rows[i]);
        var controlkey = $row.attr("data-" + this.ControlKey);
        if (controlkey.toLocaleLowerCase().indexOf("sheet") > -1) {
          controlkey = "Form" + controlkey.substring("sheet".length, controlkey.length);
        }
        if (controlkey.toLocaleLowerCase() == "formtextbox") {
          var isMultiple = $row.attr("data-IsMultiple");
          if (isMultiple != null && isMultiple == true + "") {
            controlkey = "FormTextArea";
          }
        } else if (controlkey.toLocaleLowerCase() == "formuser") {
          var isMultiple = $row.attr("data-IsMultiple");
          if (isMultiple != null && isMultiple == true + "") {
            controlkey = "FormMultiUser";
          }
        } else if (controlkey.toLocaleLowerCase() == "formcheckboxlist") {
          var isCheckbox = $row.attr("data-isCheckbox");
          if (isCheckbox != null && isCheckbox == true + "") {
            controlkey = "FormCheckbox";
          }
        }
        switch (controlkey.toLocaleLowerCase()) {
          case "apitextarea": controlkey ="ApiTextArea";break;
          case "apinumber": controlkey ="ApiNumber";break;
          case "apidatetime": controlkey ="ApiDateTime";break;
          case "formtseqno": controlkey = "FormSeqNo"; break;
          case "formttextarea": controlkey = "FormTextArea"; break;
          case "formttextbox": controlkey = "FormTextBox"; break;
          case "formtdatetime": controlkey = "FormDateTime"; break;
          case "formtnumber": controlkey = "FormNumber"; break;
          case "formtradiobuttonlist": controlkey = "FormRadioButtonList"; break;
          case "formtcheckboxlist": controlkey = "FormCheckboxList"; break;
          case "formtcheckbox": controlkey = "FormCheckbox"; break;
          case "formtdropdownlist": controlkey = "FormDropDownList"; break;
          case "formtmultiuser": controlkey = "FormMultiUser"; break;
          case "formtuser": controlkey = "FormUser"; break;
          case "formtattachment": controlkey = "FormAttachment"; break;
          case "formfolder": controlkey = "FormFolder"; break;
          case "formcityselect": controlkey = "FormCitySelect"; break;
          case "formtquery": controlkey = "FormQuery"; break;
          case "formtareaselect": controlkey = "FormAreaSelect"; break;
          case "formtmap": controlkey = "FormMap"; break;
          case "formtbolist": controlkey = "FormBoList"; break;
          case "formtgridview": controlkey = "FormGridView"; break;
          case "formtlabel": controlkey = "FormLabel"; break;
          case "formtbutton": controlkey = "FormButton"; break;
          case "formtsns": controlkey = "FormSns"; break;
          case "formttasktips": controlkey = "FormTaskTips"; break;
          case "formtcomment": controlkey = "FormComment"; break;
          case "formtaclscope": controlkey = "FormAclScope"; break;
        }
        $row.attr("data-" + this.ControlKey, controlkey);
      }
    },

    // 绑定菜单权限拖拽
    BindActionSortable: function () {
      this.$FormActions.find("ul").sortable({
        forcePlaceholderSize: true,
        placeholder: "ColumnItem",
        axis: "y"
      });
    },

    // Error：代码很乱   编辑/新增菜单
    EditAction: function (action) {
      var that = this;

      var $content = $("<div>");
      var $txtCode = $("<input type='text' class='form-control'>");
      var $txtDisplayName = $("<input type='text' class='form-control'>");
      var $icon = $("<select ref='iconPicker'>");


      var $row = $("<div class='row' style='height:40px;line-height:40px;'>");
      $row.append("<div class='col-sm-4'>按钮编码</div>").append($("<div class='col-sm-8'>").append($txtCode));
      $content.append($row);

      $row = $("<div class='row' style='height:40px;line-height:40px;'>");
      $row.append("<div class='col-sm-4'>按钮名称</div>").append($("<div class='col-sm-8'>").append($txtDisplayName));
      $content.append($row);

      $row = $("<div class='row' style='height:40px;line-height:40px;'>");
      $row.append("<div class='col-sm-4'>图标</div>").append($("<div class='col-sm-8'>").append($icon));

      $content.append($row);
      var iconPicker = $.IFontPicker();
      iconPicker.AddFontPicker($icon);

      if (action != null) {
        $txtCode.val(action.ActionCode).attr("readonly", "readonly");
        $txtDisplayName.val(action.DisplayName);
        iconPicker.SetIcon(action.Icon);
      }
      that.EditActionAclModal.hide();
      if (that.EditActionMdal != null) {
        that.EditActionMdal.Content.empty();
        that.EditActionMdal.Content.append($content);
        that.EditActionMdal.ActionObjects[0].CallBack = function () {
          var icon = $('span.selected-icon').children('i').attr('class');

          var newAction = { ActionCode: $txtCode.val(), DisplayName: $txtDisplayName.val(), Categories: "", Icon: icon };
          if (that.$FormActions.find("ul").find("li[data-ActionCode='" + newAction.ActionCode + "']").length > 0) {
            if (action == null) {
              // 新增状态，重复
              $.IShowWarn("编码重复");
              return;
            } else if (action.ActionCode == newAction.ActionCode) {
              that.$FormActions.find("ul").find("li[data-ActionCode='" + action.ActionCode + "']").remove();
            } else {
              // 编辑状态，重复
              $.IShowWarn("编码重复");
              return;
            }
          }

          that.$FormActions.find("ul").append(that.CreateActionElement(newAction));
          that.BindActionSortable();
          that.EditActionMdal.hide();
          that.EditActionAclModal.show();
        };
        that.EditActionMdal.show();
      } else {
        var Actions = [{
          Key: "btn_Ok",
          Text: "确定",
          Theme: 'btn_ok',
          CallBack: function () {
            var icon = $('span.selected-icon').children('i').attr('class');
            var newAction = { ActionCode: $txtCode.val(), DisplayName: $txtDisplayName.val(), Categories: "", Icon: icon };
            if (that.$FormActions.find("ul").find("li[data-ActionCode='" + newAction.ActionCode + "']").length > 0) {
              if (action == null) {
                // 新增状态，重复
                $.IShowWarn("编码重复");
                return;
              }
              else if (action.ActionCode == newAction.ActionCode) {
                that.$FormActions.find("ul").find("li[data-ActionCode='" + action.ActionCode + "']").remove();
              }
              else {
                // 编辑状态，重复
                $.IShowWarn("编码重复");
                return;
              }
            }
            that.$FormActions.find("ul").append(that.CreateActionElement(newAction));
            that.BindActionSortable();
            that.EditActionMdal.hide();
            that.EditActionAclModal.show();
          }
        },
        {
          Text: '取消',
          Theme: 'btn_cancel',
          CallBack: function () {
            that.EditActionMdal.hide();
            that.EditActionAclModal.show();
          }
        }];
        this.EditActionMdal = new $.IModal({
          Title: '新增功能按钮',
          Width: 400,
          // Height: 250,
          ShowBack: true,
          HasIframe: false,
          Content: $content,
          ToolButtons: Actions,
          ContentUrl: ''
        });
      }
    },

    // 创建菜单元素
    CreateActionElement: function (action) {
      var that = this;
      var $el = $("<li class='ColumnItem row' style='margin:10px 0 0 !important;position:relative'>");
      $el.attr({
        "data-ActionCode": action.ActionCode,
        "data-DisplayName": action.DisplayName,
        "data-Icon": action.Icon,
        "data-Categories": action.Categories
      });

      var $div = $("<div class='col-sm-6'>");
      $div.append("<i class='fa " + action.Icon + "' style='padding-top:10px'> " + action.DisplayName + "</i>");
      $el.append($div);
      $el.append('<i class="fa icon-move" style="cursor: move;position: absolute; right: 8px;top: 10px;"></i>');

      if (that.SmartActionCategories != null) {
        for (var i = 0; i < that.SmartActionCategories.length; i++) {
          $div = $("<div class='col-sm-2'>");
          var id = $.IGuid();
          var $userAcl = $("<input type='checkbox' data-type='User'>").attr({
            "data-type": "SmartAction",
            "id": id,
            "data-ObjectId": that.SmartActionCategories[i].ObjectId
          });//.attr("data-type", "SmartAction").attr("id", id).attr("data-ObjectId", that.SmartActionCategories[i].ObjectId);
          $div.append($userAcl).append("<label for='" + id + "' style='padding:5px;line-height:25px;top:2px;'> " + that.SmartActionCategories[i].DisplayName + "</label>");
          $el.append($div);

          if (action.Categories.indexOf(that.SmartActionCategories[i].ObjectId) > -1) {
            $userAcl.prop("checked", true);
          }
        }
      }

      var aclClickFun = function () {
        var categories = [];
        $el.find("input[data-type='SmartAction']:checked").each(function () {
          categories.push($(this).attr("data-ObjectId"));
        });
        $el.attr("data-Categories", categories);
      };

      $el.find("input[data-type='SmartAction']").click(aclClickFun);

      if (this.IsDevMode) {
        for (var j = 0; j < that.DefaultActions.length; j++) {
          if (that.DefaultActions[j].ActionCode == action.ActionCode) {
            return $el;
          }
        }
        $div = $("<div class='col-sm-1' style='position: absolute;right: 20px;color: red;'>");
        var $btnRemove = $("<i class='fa fa-minus ' style='float:right;margin-right:15px;cursor:pointer;margin-top: 10px;'></i>");
        $div.append($btnRemove);
        $btnRemove.click(function () {
          $el.remove();
        });
        $el.append($div);

        $div = $("<div class='col-sm-1' style='position: absolute;right: 47px;color:#2d7fff'>");
        var $btnEdit = $("<i class='fa fa-edit' style='float:right;margin-right:15px;cursor:pointer;margin-top: 10px;'></i>");
        $div.append($btnEdit);
        $btnEdit.click(function () {
          that.EditAction.apply(that, [action]);
        });
        $el.append($div);
      }
      return $el;
    },

    // 显示编辑菜单
    ShowEditActionAcl: function () {
      var that = this;
      if (this.EditActionAclModal != null) {
        this.EditActionAclModal.show();
      } else {
        var Actions = [{
          Text: '确定',
          Theme: 'btn_ok',
          CallBack: function () {
            that.EditActionAclModal.hide();
          }
        },
        {
          Text: '取消',
          Theme: 'btn_cancel',
          CallBack: function () {
            that.EditActionAclModal.hide();
          }
        }];
        this.EditActionAclModal = new $.IModal({
          Title: '功能按钮',
          Width: 600,
          Height: 400,
          ShowBack: true,
          HasIframe: false,
          Content: this.$FormActions,
          ToolButtons: Actions,
          ContentUrl: ''
        });
      }
    },

    // 显示关联列表编辑
    ShowEditAssociations: function () {
      var that = this;
      if (that.Associations == null && that.EditAssociationsModal == null) {
        that.Requst(that.Action_LoadAssociations, { SheetCode: that.SheetCode }, function (data) {
          that.Associations = data.ReturnData.Associations || {};
          // that.ShowEditAssociations.apply(that);
          //已经选中的关联表单
          var selectedAssociationCodes;
          if (that.$btn_SelectBoList.attr("data-associationcodes")) {
            selectedAssociationCodes = that.$btn_SelectBoList.attr("data-associationcodes").split(',');
          }

          //模态框容器
          var $associationContainerTitle = $("<div class='modal-association-title'>当前表单有被其他表单中关联控件关联时，可在此处配置关联列表，实现对其他表单数据的快捷查看与新增</div>");
          var $associationContainerContent = $("<div class='modal-association-content'></div>");
          var $associationContainer = $("<div class='modal-association-container'></div>").append($associationContainerTitle).append($associationContainerContent);

          //已启用容器
          var $selectedContainerTitle = $("<div class='modal-association-selected-title'>已启用关联列表<span class='mark-title'>(左右拖动可排序)</span></div>");
          var $selectedContainerContent = $("<div class='modal-association-selected-content'></div>");
          var $selectedContainer = $("<div class='modal-association-selected-container'></div>").append($selectedContainerTitle).append($selectedContainerContent);

          //未启用容器
          var $unSelectedContainerTitle = $("<div class='modal-association-unselected-title'>未启用关联列表</div>");
          var $unSelectedContainerContent = $("<div class='modal-association-unselected-content'></div>");
          var $unSelectedContainer = $("<div class='modal-association-unselected-container'></div>").append($unSelectedContainerTitle).append($unSelectedContainerContent);

          $associationContainerContent.append($selectedContainer).append($unSelectedContainer);

          //将表单数据绑定到已启用和未启用容器
          for (var key in that.Associations) {
            var displayName = that.Associations[key];
            if ($.inArray(key, selectedAssociationCodes) > -1) {
              //已启用的
              var $item = $("<span class='association-item' data-code = '" + key + "'><p class='association-item-text'>" + displayName + "</p><i class='icon-remove-item'></i></span>")
              $selectedContainerContent.append($item);
            } else {
              //未启用的
              var $item = $("<span class='association-item' data-code='" + key + "'><p class='association-item-text'>" + displayName + "</p><i class='icon-add-item'></i></span>");
              $unSelectedContainerContent.append($item);
            }
          }

          //已启用的关联表单支持拖拽排序
          Sortable.create($selectedContainerContent[0], {
            group: "selectedItems",
            ghostClass: "ghost"
          });

          //删除已选中的
          $selectedContainerContent.on("click", ".icon-remove-item", function () {
            $unSelectedContainerContent.find(".association-unselected-empty").remove();
            var $item = $(this).parent();
            var $clone = $item.clone();
            var $btn = $clone.find("i.icon-remove-item").removeClass("icon-remove-item").addClass("icon-add-item");
            $btn.off("click").on("click", function () {
              var $item = $(this).parent();
              var $clone = $item.clone();
              $item.remove();
              $clone.find("i.icon-add-item").removeClass("icon-add-item").addClass("icon-remove-item");
              $selectedContainerContent.prepend($clone);
            });
            $item.remove();
            $unSelectedContainerContent.append($clone);
          });


          //将未启用的选中到已启用
          $unSelectedContainerContent.on("click", ".icon-add-item", function () {
            $selectedContainerContent.find(".association-selected-empty").remove();
            var $item = $(this).parent();
            var $clone = $item.clone();
            var $btn = $clone.find("i.icon-add-item").removeClass("icon-add-item").addClass("icon-remove-item");
            $btn.off("click").on("click", function () {
              var $item = $(this).parent();
              var $clone = $item.clone();
              $item.remove();
              $clone.find("i.icon-remove-item").removeClass("icon-remove-item").addClass("icon-add-item");
              $unSelectedContainerContent.append($clone);
            });
            $item.remove();
            $selectedContainerContent.prepend($clone);
          });

          //处理没有关联表单情况
          var selectedCount = $selectedContainerContent.children().length;
          var unSelectedCount = $unSelectedContainerContent.children().length;
          //1.如果没有已启用和未启用
          //2.如果有已启用，没有未启用
          //3.如果没有已启用，有未启用
          if (selectedCount == 0 && unSelectedCount == 0) {
            var $noDataIcon = $("<i class='icon-exclamation-circle'>").css({
              "font-size": "52px",
              "text-align": "center",
              "color": "#F0AD4E",
              "display": "block",
              "margin-top": "110px"
            });
            var $noDataInfo = $("<div>当前表单尚未被其他表单关联，无需启用关联列表</div>").css({
              "text-align": "center",
              "color": "#666",
              "font-size": "14px",
              "margin-top": "32px"
            });
            var $noDataContainer = $("<div></div>").append($noDataIcon).append($noDataInfo);
            $selectedContainer.hide();
            $unSelectedContainer.hide();
            $associationContainerContent.append($noDataContainer);
          } else if (selectedCount == 0 && unSelectedCount > 0) {
            var $span = $("<span class='association-selected-empty'>没有已启用的关联列表，可从下方添加</span>");
            $selectedContainerContent.append($span);
          } else if (selectedCount > 0 && unSelectedCount == 0) {
            var $span = $("<span class='association-unselected-empty'>没有未启用的关联列表</span>");
            $unSelectedContainerContent.append($span);
          }

          var Actions = [{
            Text: '确定',
            Theme: 'btn_ok',
            CallBack: function () {
              var selectedAssociations = [];
              $(".modal-association-selected-content").find("span.association-item").each(function () {
                var code = $(this).attr("data-code");
                selectedAssociations.push(code);
              });
              that.$btn_SelectBoList.attr("data-associationcodes", selectedAssociations);
              that.EditAssociationsModal.hide();
            }
          }, {
            Text: '取消',
            CallBack: function () {
              that.EditAssociationsModal.hide();
            }
          }];
          this.EditAssociationsModal = new $.IModal({
            Title: '关联列表配置',
            Width: 700,
            Height: 450,
            ShowBack: true,
            HasIframe: false,
            Content: $associationContainer,
            ToolButtons: Actions
          });
        });
      } else {
        that.EditAssociationsModal.show();
      }
    },

    //重置预装字段
    // ResetDataFiled: function () {
    //   var that = this;
    //   if (that.PreDataFileds == null || $.isEmptyObject(that.PreDataFileds)) {
    //     that.Requst(that.Action_LoadPreDataFiled, { SheetCode: that.SheetCode }, function (data) {
    //       that.PreDataFileds = data.ReturnData;
    //       for (var DataFiled in that.PreDataFileds) {
    //         that.AddDataFieldFromData.apply(that, [DataFiled, that.PreDataFileds[DataFiled]]);
    //       }
    //     });
    //   } else {
    //     for (var DataFiled in that.PreDataFileds) {
    //       that.AddDataFieldFromData.apply(that, [DataFiled, that.PreDataFileds[DataFiled]]);
    //     }
    //   }
    // },

    //添加从后台数据，加载过来的字段
    AddDataFieldFromData: function (DataFiled, DataFiledObject, target) {
      var that = this;
      // 已经存在设计器里，返回
      if (that.GetControlElement(DataFiled).length > 0) return;
      //添加控件
      var $el = null;
      var $item = null;
      switch (DataFiledObject.DataType) {
        case $.BizDataType.ApiTextArea:
          $item = that.$Controls.find("[data-controlkey='ApiTextArea']");
        break;
        case $.BizDataType.ApiNumber:
          $item = that.$Controls.find("[data-controlkey='ApiNumber']");
        break;
        case $.BizDataType.ApiDateTime:
          $item = that.$Controls.find("[data-controlkey='ApiDateTime']");
        break;
        case $.BizDataType.Attachment:
          $item = that.$Controls.find("[data-controlkey='FormAttachment']");
          break;
        case $.BizDataType.Folder:
          $item = that.$Controls.find("[data-controlkey='FormFolder']");
          break;
        case $.BizDataType.City:
          $item = that.$Controls.find("[data-controlkey='FormCitySelect']");
          break;
        case $.BizDataType.BizObjectArray:
          //Error:子表
          $item = that.$Controls.find("[data-controlkey='FormGridView']");
          break;
        case $.BizDataType.DateTime:
          $item = that.$Controls.find("[data-controlkey='FormDateTime']");
          break;
        case $.BizDataType.Decimal:
        case $.BizDataType.Double:
        case $.BizDataType.Int:
        case $.BizDataType.Long:
          $item = that.$Controls.find("[data-controlkey='FormNumber']");
          break;
        case $.BizDataType.String:
        case $.BizDataType.ShortString:
          $item = that.$Controls.find("[data-controlkey='" + (DataFiledObject.ControlKey || "FormTextBox") + "']");
          break;
        case $.BizDataType.SingleParticipant:
          $item = that.$Controls.find("[data-controlkey='FormUser']");
          break;
        case $.BizDataType.MultiParticipant:
          $item = that.$Controls.find("[data-controlkey='FormMultiUser']");
          break;
        case $.BizDataType.Association:
          $item = that.$Controls.find("[data-controlkey='FormQuery']");
          break;
        case $.BizDataType.AssociationArray:
          $item = that.$Controls.find("[data-controlkey='FormMultiQuery']");
          break;
        case $.BizDataType.AssociationList:
          $item = that.$Controls.find("[data-controlkey='FormList']");
          break;
        case $.BizDataType.Bool:
          $item = that.$Controls.find("[data-controlkey='FormCheckbox']");
          break;
      }
      if ($item) {
        //取到的item可能是多个控件
        $item = $item.first().clone();
        //$item = $item.clone();
        if (DataFiledObject.DisplayName)
          $item.text(DataFiledObject.DisplayName);
        that.SetDataFieldValue($item, DataFiled);
        var $el = that.RenderControl($item, 2);
        if ($el) {
          if (target) {
            if (target.$next && target.$next.length > 0) {
              target.$next.before($el);
            } else if (target.$parent && target.$parent.length > 0) {
              target.$parent.append($el);
            }
          } else {
            if (DataFiled.indexOf('.') == -1) {
              that.$SheetContent.append($el);
            } else {
              //Error:子表数据项
              var tds = that.GetControlElement(DataFiled.split('.')[0]).find("td.SheetGridView_td");
              var isAddToGridView = false;
              for (var i = 0; i < tds.length; i++) {
                if ($(tds[i]).children("div").length == 0) {
                  isAddToGridView = true;
                  $(tds[i]).append($el);
                  break;
                }
              }
              if (!isAddToGridView) {
                //没添加
                that.GetControlElement(DataFiled.split('.')[0]).find("tr.SheetGridView_tr").append($("<td class='SheetGridView_td'>").append($el));
              }
            }
          }
        }
      }
    },

    DoSave: function (isAsync, callback) {
      var that = this;
      if (isAsync == void 0) {
        isAsync = true;
      }
      if (!that.IsLoaded == 0) {
        return;
      }
      if (that.IsSaved) {
        console.log('不需要保存');
        return;
      }
      if (!that.BuildData(true)) {
        return false;
      };
      that.Requst(that.Action_Save, {
        BizSheetStr: JSON.stringify($.BizSheet),
        SchemaStr: JSON.stringify($.Schema),
        BoSchemaCodeStr: JSON.stringify($.BoSchemaCodes)
      }, function () {
        that.IsSaved = true;
        if ($.isFunction(callback)) {
          callback.apply(that, []);
        }
      }, isAsync);
    },
    // 保存草稿
    //如果传入对象则表示对象点击时候执行保存操作
    Save: function (target, isAsync) {
      var that = this;
      var save = '';
      if (!that.IsLoaded == 0) {
        return;
      }
      if (target != void 0) {
        $(target).on('click', function () {
          save = that.DoSave(isAsync);
        });
      } else {
        save = this.DoSave(isAsync);
      }
      if (save === undefined) {
        return true;
      } else {
        return false;
      }
    },

    //  发布
    Release: function (validateCode) {
      var that = this;
      // if (!that.IsLoaded == 0) {
      //   return;
      // }
      if (this.IsPosting == true) {
        console.log("提交太频繁了，上次提交还没完成，请稍等！");
        return;
      }
      this.IsPosting = true;
      if (!this.BuildData()) {
        this.IsPosting = false;
        return;
      }
      var param = {};
      param.ActionName = this.Action_Release;
      param.SheetCode = that.SheetCode;
      
    

      //luzx add SubmitRules 不能为null
      if ($.BizSheet.SubmitRules == null) {
        $.BizSheet.SubmitRules = [];
      }
      
      if(that.isOpenBigForm){        
        var src = 'data-norepeat="true"';
        var reg = "/"+src+"/g";
        $.BizSheet.DesignModeContent = $.BizSheet.DesignModeContent.replace(eval(reg),'data-norepeat="false"');
      }
      param.BizSheetStr = JSON.stringify($.BizSheet);
     
      const mySchemaProperties = {};
      console.log($.Schema)
      if(this.type==="flow"){
        for (let p in $.Schema.Properties) {
          if( $.Schema.Properties[p].ControlCode!= void 0){
            mySchemaProperties[$.Schema.Properties[p].ControlCode] = $.Schema.Properties[p];
          }
          else{
            mySchemaProperties[p] = $.Schema.Properties[p];
          }
        }
      }
      else{
        for (let p in $.Schema.Properties) { 
            mySchemaProperties[p] = $.Schema.Properties[p];  
        }
      }
      
      $.Schema.Properties = mySchemaProperties;

      param.SchemaStr = JSON.stringify($.Schema);
      param.BoSchemaCodeStr = JSON.stringify($.BoSchemaCodes);
      param.attachId = this.wordTemplate.id || '';
      if(this.type=="flow"){
          HTTP.releaseFlowApp(param)
          .then(data => {
            //console.log("btn_Save call back " + (new Date()).toLocaleString());
            if (!data.Successful) {
              //$.IShowError(data.ErrorMessage);
              Message.error(data.ErrorMessage);
            } else {
              // 重新加载表单数据
              //luzx add
              that.SheetCode = data.SheetCode;
              that.LoadSheet();
              //$.IShowSuccess("保存成功!");
              Message.success("保存成功!");
              //保存后切换到“表单属性”
              that.$btn_SheetProperty.click();
            }
          })
          .catch(err => {
            //$.IShowError(data.ErrorMessage);
            that.IsPosting = false;
            Message.error(err.ErrorMessage || '保存失败');
          }).finally(() => {
            that.IsPosting = false;
          })
      }
      else{
        HTTP.release(param)
        .then(data => {
          //console.log("btn_Save call back " + (new Date()).toLocaleString());
          if (!data.Successful) {
            //$.IShowError(data.ErrorMessage);
            Message.error(data.ErrorMessage);
          } else {
            // 重新加载表单数据
            //luzx add
            that.SheetCode = data.SheetCode;
            that.LoadSheet();
            //$.IShowSuccess("保存成功!");
            Message.success("保存成功!");
            //保存后切换到“表单属性”
            that.$btn_SheetProperty.click();
          }
        })
        .catch(err => {
          //$.IShowError(data.ErrorMessage);
          that.IsPosting = false;
          Message.error(err.ErrorMessage || '保存失败');
        }).finally(() => {
          that.IsPosting = false;
        })
      }
      


    },

    // 绑定表单数据
    BuildData: function (unValidate) {
      // 自定义代码
      if (this.IsDevMode) {
        if (this.JSEditor.getValue().replace(/\s+/g, "") != this.defaultJsCode.replace(/\s+/g, "")) {
          $.BizSheet.Javascript = this.JSEditor.getValue();
        } else {
          $.BizSheet.Javascript = "";
        }

        if (this.CSEditor.getValue().replace(/\s+/g, "") != this.defaultCsCode.replace(/\s+/g, "")) {
          $.BizSheet.BehindCode = this.CSEditor.getValue();
        } else {
          $.BizSheet.BehindCode = "";
        }
      }
      //解析控件
      var rows = this.$SheetContent.children("div.row");
      if (rows.length == 0 && !unValidate) {
        //$.IShowError("没有设置字段");
        Message.error("没有设置字段");
        return false;
      }
      //绑定摘要
      $.Schema.SummarySchema = "";
      this.$SummaryItems.find("label[data-value]").each(function () {
        $.Schema.SummarySchema += "{" + $(this).attr("data-value") + "}";
      });

      $.Schema.NameSchema = "";
      this.$NameItems.find("label[data-value]").each(function () {
        $.Schema.NameSchema += "{" + $(this).attr("data-value") + "}";
      });

      // $.Schema.UnRemovableProperties = "";
      // if (this.IsDevMode) {
      //   this.$DeleteItems.find("label[data-value]").each(function () {
      //     $.Schema.UnRemovableProperties += "{" + $(this).attr("data-value") + "}";
      //   });
      // } else {
      //   $.Schema.UnRemovableProperties = "NULL";
      // }

      // 绑定是否启用数据权限
      if (this.$InheritObject.val() == "false") {
        $.Schema.EnableDataAcl = false;
        $.Schema.DataAclInheritedFrom = "false";
      } else {
        $.Schema.EnableDataAcl = true;
        $.Schema.DataAclInheritedFrom = this.$InheritObject.val();
      }

      //表单外链是否启用在Modal中处理了
      //检测表单外链
      if ($.BizSheet.EnableExternalForm) {
        var message = this.CheckExternalForm();
        if (message != "") {
          $.IShowWarn(message);
          return false;
        }
      }

      if (!unValidate) {
        //判断表单名称
        if ($.Schema.NameSchema == "" || $.isEmptyObject($.Schema.NameSchema)) {
          //$.IShowError("没有设置数据标题");
          Message.error("没有设置字段");
          $("#btn_SheetProperty").click();
          $("#SheetPropertys").collapse("show");
          return false;
        }

        //校验通过标记
        var valid = true;
        var that = this;
        var $formQuery = this.$SheetContent.find('[data-controlkey="FormQuery"],[data-controlkey="FormMultiQuery"]');
        $formQuery.each(function () {
          var boschema = $(this).attr('data-boschemacode');
          if (!boschema) {
            var displayName = $(this).attr('data-displayname');
            //$.IShowError();
            Message.error('[' + displayName + ']没有配置关联表单');
            valid = false;
            return false;
          }

          //校验关联配置和关联属性中配置的本表单字段是否都存在
          var mappingControls = $(this).attr("data-mappingcontrols");
          var mappingProperties = $(this).attr("data-mappingproperties");
          if (mappingControls) {
            if ($.isJsonLike(mappingControls)) {
              mappingControls = JSON.parse(mappingControls);
            }
            var newMappingControls = {};
            for (var key in mappingControls) {
              var ctrl = that.GetControlElement(key);
              if (ctrl.length > 0) {
                newMappingControls[key] = mappingControls[key];
              }
            }
            if (!$.isEmptyObject(newMappingControls)) {
              $(this).attr("data-mappingcontrols", JSON.stringify(newMappingControls));
            } else {
              $(this).removeAttr("data-mappingcontrols");
            }
          }

          if (mappingProperties) {
            if ($.isJsonLike(mappingProperties)) {
              mappingProperties = JSON.parse(mappingProperties);
            }
            var newMappingProperties = {};
            for (var key in mappingProperties) {
              var ctrl = that.GetControlElement(key);
              if (ctrl.length > 0) {
                newMappingProperties[key] = mappingProperties[key];
              }
            }
            if (!$.isEmptyObject(newMappingProperties)) {
              $(this).attr("data-mappingproperties", JSON.stringify(newMappingProperties));
            } else {
              $(this).removeAttr("data-mappingproperties");
            }
          }

        });
        if (!valid) {
          return false;
        }
        /**/
        //判断下拉框选择数据源是关联表单时，需要配置关联表单和关联字段
        var $formDropdownListAss = this.$SheetContent.find('[data-controlkey="FormDropDownList"][data-datasource="Association"]');
        var isBindDDBoSchema = true;
        var isBindDDSchemaField = true;
        $formDropdownListAss.each(function () {
          //清除自定义数据源中的默认值
          $(this).attr("data-defaultvalue", "");
          var boschema = $(this).attr("data-boschemacode");
          var boschemaField = $(this).attr("data-mappingfield");
          var displayName = $(this).attr('data-displayname');
          if (!boschema) {
            $.IShowError('【' + displayName + '】没有配置关联表单');
            isBindDDBoSchema = false;
            return false;
          }
          if (!boschemaField) {
            $.IShowError('【' + displayName + '】没有配置关联表单字段');
            isBindDDSchemaField = false;
            return false;
          }
        });

        if (!isBindDDBoSchema || !isBindDDSchemaField) {
          return false;
        }

        //校验单选、复选、下拉选项长度
        var $formItems = this.$SheetContent.find("[data-controlkey='FormRadioButtonList'],[data-controlkey='FormCheckboxList'],[data-controlkey='FormDropDownList'][data-datasource='Custom']");
        $formItems.each(function () {
          var controlKey = $(this).attr("data-controlkey");
          var items = $(this).attr("data-defaultitems") || "";
          if (items) {
            items = JSON.parse(items);
          }
          var displayName = $(this).attr("data-displayname") || "";
          if (controlKey == "FormRadioButtonList" || controlKey == "FormDropDownList") {
            //单选框，下拉框项长度不能超过200
            for (var i = 0; i < items.length; i++) {
              if (items[i].length > 200) {
                $.IShowError("【" + displayName + "】选项长度不能超过200");
                valid = false;
                return false;
              }
            }
          } else {
            //复选框选项总字数校验放到前台
          }
        });

        if (!valid) {
          return false;
        }

        //如果子表是矩阵模式必须配置矩阵字段
        var $gridViews = this.$SheetContent.find("div[data-controlkey='FormGridView']");
        $gridViews.each(function () {
          var mode = $(this).attr("data-gridviewmode");
          if (mode != void 0 && mode == "1") {
            //矩阵模式
            var fields = $(this).attr("data-displayfields");
            if (!fields) {
              $.IShowError('移动端显示模式设置为"矩阵显示"的子表必须配置显示字段');
              valid = false;
              return false;
            }
          }
        });

        if (!valid) {
          return false;
        }
      }


      $.BizSheet.RuntimeContent = "";

      //启动动态
      $.BizSheet.EnableFormSns = this.$ckEnableFormSns.eq(0).prop("checked");
      //启用任务提醒
      $.BizSheet.EnableTask = this.$ckEnableTask.eq(0).prop("checked");

      //关联列表
      var data = this.$btn_SelectBoList.attr("data-associationcodes");
      if (data != null) {
        $.BizSheet.AssociationCodes = data.split(',');
      }

      //绑定操作权限
      $.BizSheet.Actions = [];
      var $actions = this.$FormActions.find("li[data-ActionCode]");
      for (var i = 0; i < $actions.length; i++) {
        var action = {
          ActionCode: $($actions[i]).attr("data-ActionCode"),
          DisplayName: $($actions[i]).attr("data-DisplayName"),
          Icon: $($actions[i]).attr("data-Icon"),
          Categories: $($actions[i]).attr("data-Categories") == null ? [] : $($actions[i]).attr("data-Categories").split(",")
        };
        $.BizSheet.Actions.push(action);
      }

      //移除设计器的选中
      this.$SheetContent.find(".drop-item").find("button[data-buttontype='remomvecontrol']").hide();
      this.$SheetContent.find(".drop-item").find("[data-buttontype='changecontrol']").hide();
      this.$SheetContent.find(".drop-item").removeClass("drop-item");
      $.BizSheet.DesignModeContent = this.$SheetContent.html();
      $.Schema.Properties = {};
      var sheetContentHtml = "";
      var enableSeqNo = false;//默认不启用流水号

      //如果有关联属性控件但是没有关联表单控件则不能保存表单
      var hasMappingPropertyControl = false;//标记是否有关联属性控件
      var hasFormQuery = false; //标记是否有关联表单控件
      var dataFields = [];
      for (var i = 0; i < rows.length; ++i) {
        var $row = $(rows[i]);
        if ($row.hasClass(this.PageHeader) || $row.hasClass(this.DesControl)) {
          var $header = $row.clone().removeClass("row");
          sheetContentHtml += this.JqObjectToHtml($header);
        } else if ($row.hasClass(this.SheetButton)) {
          var $header = $row.clone().removeClass("row");
          sheetContentHtml += this.JqObjectToHtml($header);
        } else if ($row.hasClass("FormBoList")) {
          //关联列表
          sheetContentHtml += this.JqObjectToHtml($row.clone().html(""));
        } else if ($row.hasClass("SheetSns")) {
          sheetContentHtml += this.JqObjectToHtml($row.clone().empty());
        } else if ($row.hasClass("sheet-control")) {
          //控件
          if ($row.hasClass("SheetGridView")) {
            //子表控件
            var $gridView = this.BuildRuntimeControl($row);
            var $tr = $("<tr>");
            var $table = $("<table>").addClass("table table-bordered table-hover table-condensed").append($("<thead>").append($tr));
            var cols = $row.clone().find("table").find("td").children("div.row");
            if (cols.length > 0) {//子表里没配置字段的时候，不需要添加
              for (var j = 0; j < cols.length; ++j) {
                var $rowCtrl = $(cols[j]);
                var ctrlKey = $rowCtrl.attr("data-controlkey");

                //保存字段编码，校验编码是否重复
                var dataField = $rowCtrl.attr("data-datafield");
                
                if (dataField) {
                  if ($.inArray(dataField, dataFields) > -1) {
                    $.IShowError("存在重复的编码【" + dataField + "】");
                    return false;
                  } else {
                    dataFields.push(dataField);
                  }
                }

                if (ctrlKey == "FormQuery") {
                  hasFormQuery = true;
                }
                if (ctrlKey == "FormAssociateProperty") {
                  hasMappingPropertyControl = true;
                }
                var $col = this.BuildRuntimeControl($rowCtrl);
                $col.removeClass("row").addClass("table_th");
                // $col.text($col.data("displayname")).removeAttr("data-displayname");
                $col.text($col.data("displayname"));
                $tr.append($("<th>").append($col));
              }
              $gridView.append($table);
              sheetContentHtml += this.JqObjectToHtml($gridView);
            }
          } else {
            sheetContentHtml += this.JqObjectToHtml(this.BuildRuntimeControl($row));
            
            if(this.type=="flow"){
              if($row.attr("data-controlcode")!= void 0){
                $row.attr("data-datafield",$row.attr("data-controlcode"));
              }
            }
            //保存字段编码，校验编码是否重复
            var dataField = $row.attr("data-datafield");
            if (dataField) {
              if ($.inArray(dataField, dataFields) > -1) {
                $.IShowError("存在重复的编码【" + dataField + "】");
                return false;
              } else {
                dataFields.push(dataField);
              }
            }

            var ctrlKey = $row.attr("data-controlkey");
            if (ctrlKey == "FormSeqNo") {
              var dataField = this.GetDataField($row);
              var Settings = this.GetSettings(dataField);
              enableSeqNo = true;
              $.Schema.SeqNoDateFormat = Settings["DateTimeMode"];//流水号格式
              $.Schema.SeqNoPrefix = Settings["Prefix"];//流水号前缀
              $.Schema.SeqNoLength = 0 // $.Schema.SeqNoPrefix.length + ($.Schema.SeqNoDateFormat == "None" ? 0 : $.Schema.SeqNoDateFormat.length) + parseInt(Settings["IncrementNum"]);
            }
            if (ctrlKey == "FormQuery") {
              hasFormQuery = true;
            }
            if (ctrlKey == "FormAssociateProperty") {
              hasMappingPropertyControl = true;
            }
            if (ctrlKey == "FormAssociateProperty" && !$row.attr("data-boschemacode")) {
              var ctrlName = $row.find('.col-sm-2').text();
              $.IShowError('[' + ctrlName + '] 没有配置关联表单');
              return false;
            }
          }
        } else if ($row.hasClass("layoutrow")) {
          //布局控件
          var $layoutRow = this.BuildLayoutRow();
          var $leftControl = $row.find("div[data-layoutitem='Left']").children("div.sheet-control");
          var $rightControl = $row.find("div[data-layoutitem='Right']").children("div.sheet-control");
          var $expandControl = $row.find("div[data-layoutitem='Expand']").children("div.sheet-control");
          var needAddRow = false;
          if ($leftControl.length > 0) {
            $layoutRow.find("div:first").append(this.BuildRuntimeControl($leftControl));
            needAddRow = true;
            var ctrlKey = $leftControl.attr("data-controlkey");
            if (ctrlKey == "FormSeqNo") {
              enableSeqNo = true;
              var dataField = this.GetDataField($leftControl);
              var Settings = this.GetSettings(dataField);
              $.Schema.SeqNoDateFormat = Settings["DateTimeMode"];//流水号格式
              $.Schema.SeqNoPrefix = Settings["Prefix"];//流水号前缀
              $.Schema.SeqNoLength = 0 // $.Schema.SeqNoPrefix.length + ($.Schema.SeqNoDateFormat == "None" ? 0 : $.Schema.SeqNoDateFormat.length) + parseInt(Settings["IncrementNum"]);
            }
            if (ctrlKey == "FormQuery") {
              hasFormQuery = true;
            }
            if (ctrlKey == "FormAssociateProperty") {
              hasMappingPropertyControl = true;
            }
          }
          if ($rightControl.length > 0) {
            $layoutRow.find("div:last").append(this.BuildRuntimeControl($rightControl));
            needAddRow = true;
            var ctrlKey = $rightControl.attr("data-controlkey");
            if (ctrlKey == "FormSeqNo") {
              enableSeqNo = true;
              var dataField = this.GetDataField($rightControl);
              var Settings = this.GetSettings(dataField);
              $.Schema.SeqNoDateFormat = Settings["DateTimeMode"];//流水号格式
              $.Schema.SeqNoPrefix = Settings["Prefix"];//流水号前缀
              $.Schema.SeqNoLength = 0 // $.Schema.SeqNoPrefix.length + ($.Schema.SeqNoDateFormat == "None" ? 0 : $.Schema.SeqNoDateFormat.length) + parseInt(Settings["IncrementNum"]);
            }
            if (ctrlKey == "FormQuery") {
              hasFormQuery = true;
            }
            if (ctrlKey == "FormAssociateProperty") {
              hasMappingPropertyControl = true;
            }
          }
          if ($expandControl.length > 0) {
            var expandTitle = $row.find('input[expand-title]').attr('value');
            var formDefault = $row.find('form[default-status]')[0];
            var defaultStatus = formDefault ? formDefault.defaultStatus.value : 'open';
            $layoutRow = this.BuildExpandLayoutRow($expandControl.length, expandTitle);
            for (let i = 0; i < $expandControl.length; i++) {
              $layoutRow.find('div:first').find(`div:nth-child(${i + 1})`).append(this.BuildRuntimeControl($($expandControl[i])));
              needAddRow = true;
              var ctrlKey = $($expandControl[i]).attr("data-controlkey");
              if (ctrlKey == "FormSeqNo") {
                enableSeqNo = true;
                var dataField = this.GetDataField($($expandControl[i]));
                var Settings = this.GetSettings(dataField);
                $.Schema.SeqNoDateFormat = Settings["DateTimeMode"];//流水号格式
                $.Schema.SeqNoPrefix = Settings["Prefix"];//流水号前缀
                $.Schema.SeqNoLength = 0 // $.Schema.SeqNoPrefix.length + ($.Schema.SeqNoDateFormat == "None" ? 0 : $.Schema.SeqNoDateFormat.length) + parseInt(Settings["IncrementNum"]);
              }
              if (ctrlKey == "FormQuery") {
                hasFormQuery = true;
              }
              if (ctrlKey == "FormAssociateProperty") {
                hasMappingPropertyControl = true;
              }
            }
          }
          if (needAddRow) {
            sheetContentHtml += this.JqObjectToHtml($layoutRow);
          }
        }
      }

      if (hasMappingPropertyControl && !hasFormQuery) {
        $.IShowError('表单有关联属性字段，但是没有配置关联表单');
        return false;
      }

      $.Schema.EnableSeqNo = enableSeqNo;
      this.SetAssociationMappings();
      $.BizSheet.RuntimeContent = sheetContentHtml;

      console.log("BuildData end " + (new Date()).toLocaleString());
      return true;
    },
    //开启外链时不支持关联表单，选人控件，下拉框关联表单模式
    CheckExternalForm: function () {
      var $formAssociation = this.$SheetContent.find('[data-controlkey="FormQuery"],[data-controlkey="FormMultiQuery"]');
      if ($formAssociation.length > 0) {
        return "外链表单暂不支持关联表单控件";
      }
      //排除选人控件/选部门控件及创建人
      var $formSheetUser = this.$SheetContent.find('[data-controlkey="FormUser"],[data-controlkey="FormMultiUser"],[data-controlkey="FormDepartment"],[data-controlkey="FormMultiDepartment"],div[data-datafield="CreatedBy.FullName"]');
      if ($formSheetUser.length > 0) {
        return "外链表单暂不支持选人控件";
      }

      var $formDropdownListAss = this.$SheetContent.find('[data-controlkey="FormDropDownList"][data-datasource="Association"]');
      if ($formDropdownListAss.length > 0) {
        return "外链表单暂不支持下拉框关联表单模式";
      }

      var $formMaps = this.$SheetContent.find('[data-controlkey="FormMap"]');
      if ($formMaps.length > 0) {
        return "外链表单暂不支持位置控件";
      }
      return "";
    },
    // 显示名称/摘要选择
    ShowNameSummarySelector: function ($ItemEl, type) {
      var that = this;
      that.ItemNameType = type;
      if (type == "Name") {
        that.NameItemContainer = $ItemEl;
      } else if (type == "Summary") {
        that.SummaryItemContainer = $ItemEl;
      }
      if (!that.SummarySelector) {
        that.SummarySelector = $("<div class='seleBox' style='top:0px;'>");

      }
      that.SummarySelector.html("");
      var $desc = $("<input id='DescSchema' type='text' placeholder='请输入前缀' style='width:100%;height:30px;margin-bottom:4px'/>")
      if (that.DescSchema) {
        $desc.val(that.DescSchema)
      }
      that.SummarySelector.append($desc);
      var rows = that.$SheetContent.children("div.row:not(.SheetGridView):not(." + this.PageHeader + "):not(." + this.DesControl + "):not([data-controlkey='FormBoList']):not([data-controlkey='FormSns']):not([data-controlkey='FormAttachment']):not([data-controlkey='FormFolder']):not([data-controlkey='FormPhoto']):not([data-controlkey='FormButton']):not([data-controlkey='FormFormula']):not([data-controlkey='FormAssociateProperty']):not([data-controlkey='FormList']):not([data-controlkey='FormEmbedCode']):not([data-controlkey='FormApprovalRecord'])");

      // if ($ItemEl == that.$DeleteItems) {
      //   //过滤掉按钮控件
      //   var rows = that.$SheetContent.find("div[data-datafield]:not([data-controlkey='FormButton'])");
      // }
      //添加全选
      var allId = $.IGuid();
      var $allHolder = $("<div class='checkall-holder'></div>");
      var Selected = 0;
      var TotalItem = 0;
      var $checkAll = $("<input type='checkbox'/>").attr({ "id": allId, "data-type": "all" });
      var $labelAll = $("<label class='icon-get' for='" + allId + "'>全选</label>").css("float", "none");
      var $whichCheck = $("<div class='checkedBox property-input' placeholder='请从下方选择内容'></div>");
      that.SummarySelector.append($whichCheck);
      $allHolder.append($checkAll).append($labelAll).appendTo(that.SummarySelector);

      //添加单选
      var $singleCheckBox = $("<div class='singleCheckBox'></div>");
      var checkboxContainer = $(that.SummarySelector).find("div.checkedBox");

      for (var i = 0; i < rows.length; i++) {
        var $el = $(rows[i]);
        var id = $.IGuid();
        var controlKey = this.GetControlKey($el);
        if (controlKey == "FormAreaSelect" || controlKey == "FormCheckbox") {
          continue;
        }
        if ($el.hasClass("sheet-control")) {
          var dataField = this.GetDataField($el);
          //CreateBy.FullName-》CreateBy
          if (dataField == this.CreatedBy) {
            dataField = "CreatedBy";
          }
          var $checkbox = $("<input type='checkbox'/>").attr({ "id": id, "data-value": dataField });
          var $label = $("<label for='" + id + "'>").text(this.GetDataFieldDisplayName($el)).css("float", "none");
          if ($ItemEl.find("label[data-value='" + dataField + "']").length > 0) {
            $checkbox.prop("checked", "checked");
            Selected++;
          }
          $singleCheckBox.append($checkbox).appendTo(this.SummarySelector);
          $singleCheckBox.append($label).appendTo(this.SummarySelector);
          TotalItem++;
        } else if ($el.hasClass("layoutrow")) {
          //布局控件
          var $leftControl = $el.find("div[data-layoutitem='Left']").children("div.sheet-control:not([data-controlkey='FormBoList']):not([data-controlkey='FormSns']):not([data-controlkey='FormAttachment']):not([data-controlkey='FormFolder']):not([data-controlkey='FormPhoto']):not([data-controlkey='FormButton']):not([data-controlkey='FormFormula']):not([data-controlkey='FormAssociateProperty']):not([data-controlkey='FormList']):not([data-controlkey='FormEmbedCode']):not([data-controlkey='FormApprovalRecord'])");
          var $rightControl = $el.find("div[data-layoutitem='Right']").children("div.sheet-control:not([data-controlkey='FormBoList']):not([data-controlkey='FormSns']):not([data-controlkey='FormAttachment']):not([data-controlkey='FormFolder']):not([data-controlkey='FormPhoto']):not([data-controlkey='FormButton']):not([data-controlkey='FormFormula']):not([data-controlkey='FormAssociateProperty']):not([data-controlkey='FormList']):not([data-controlkey='FormEmbedCode']):not([data-controlkey='FormApprovalRecord'])");
          var $expandControl = $el.find("div[data-layoutitem='Expand']").children("div.sheet-control:not([data-controlkey='FormBoList']):not([data-controlkey='FormSns']):not([data-controlkey='FormAttachment']):not([data-controlkey='FormFolder']):not([data-controlkey='FormPhoto']):not([data-controlkey='FormButton']):not([data-controlkey='FormFormula']):not([data-controlkey='FormAssociateProperty']):not([data-controlkey='FormList']):not([data-controlkey='FormEmbedCode']):not([data-controlkey='FormApprovalRecord'])");
          if ($leftControl.length > 0) {
            id = $.IGuid();
            var dataField = this.GetDataField($leftControl);
            //CreateBy.FullName-》CreateBy
            if (dataField == this.CreatedBy) {
              dataField = "CreatedBy";
            }
            var $checkbox = $("<input type='checkbox'/>").attr({ "id": id, "data-value": dataField });
            var $label = $("<label for='" + id + "'>").text(this.GetDataFieldDisplayName($leftControl));
            if ($ItemEl.find("label[data-value='" + dataField + "']").length > 0) {
              $checkbox.prop("checked", "checked");
              Selected++;
            }
            $singleCheckBox.append($checkbox).appendTo(this.SummarySelector);
            $singleCheckBox.append($label).appendTo(this.SummarySelector);
            TotalItem++;
          }
          if ($rightControl.length > 0) {
            id = $.IGuid();
            var dataField = this.GetDataField($rightControl);
            //CreateBy.FullName-》CreateBy
            if (dataField == this.CreatedBy) {
              dataField = "CreatedBy";
            }
            var $checkbox = $("<input type='checkbox'/>").attr({ "id": id, "data-value": dataField });
            var $label = $("<label for='" + id + "'>").text(this.GetDataFieldDisplayName($rightControl));
            if ($ItemEl.find("label[data-value='" + dataField + "']").length > 0) {
              $checkbox.prop("checked", "checked");
              Selected++;
            }
            $singleCheckBox.append($checkbox).appendTo(this.SummarySelector);
            $singleCheckBox.append($label).appendTo(this.SummarySelector);
            TotalItem++;
          }
          if ($expandControl.length > 0) {
            for (let i = 0; i < $expandControl.length; i++) {
              id = $.IGuid();
              var dataField = this.GetDataField($($expandControl[i]));
              //CreateBy.FullName-》CreateBy
              if (dataField == this.CreatedBy) {
                dataField = "CreatedBy";
              }
              var $checkbox = $("<input type='checkbox'/>").attr({ "id": id, "data-value": dataField });
              var $label = $("<label for='" + id + "'>").text(this.GetDataFieldDisplayName($($expandControl[i])));
              if ($ItemEl.find("label[data-value='" + dataField + "']").length > 0) {
                $checkbox.prop("checked", "checked");
                Selected++;
              }
              $singleCheckBox.append($checkbox).appendTo(this.SummarySelector);
              $singleCheckBox.append($label).appendTo(this.SummarySelector);
              TotalItem++;
            }
          }
        }
      }
      $labelAll.data("Selected", Selected);
      $labelAll.data("TotalItem", TotalItem);
      if (TotalItem == 0) {
        $checkAll.prop("disabled", "disabled").css("opacity", 0.4);
      } else if (TotalItem === Selected && TotalItem > 0) {
        $checkAll.prop("checked", "checked");
      }
      //初始化checkedBox中的数据
      var inputArray = that.SummarySelector.find("input")
      for (var i = 0, len = inputArray.length; i < len; i++) {
        var value = $(inputArray[i]).attr("data-value");
        if ($(inputArray[i]).prop("checked") && $(inputArray[i]).attr("data-type") != "all") {
          that.AddSummaryItem.apply(that, [value, checkboxContainer, true]);
        }
      }
      that.SummarySelector.find("input").click(function () {
        //全选
        if ($(this).attr("data-type") && $(this).attr("data-type") === "all") {
          var $inputs = that.SummarySelector.find("input").not($(this));
          for (var i = 1, len = $inputs.length; i < len; i++) {
            var value = $($inputs[i]).attr("data-value");
            var $item = checkboxContainer.find("label[data-value='" + value + "']");
            if ($(this).prop("checked")) {
              if ($item.length == 0) {
                that.AddSummaryItem.apply(that, [value, checkboxContainer, true]);
                $($inputs[i]).prop("checked", true);
              }
            } else {
              if ($item.length >= 1) {
                $item.remove();
                $($inputs[i]).prop("checked", false);
              }
            }
          }
          var Selected = $labelAll.data("Selected");
          var TotalItem = $labelAll.data("TotalItem");
          Selected = $(this).prop("checked") ? TotalItem : 0;
          $labelAll.data("Selected", Selected);
        } else {//单选
          var Selected = $labelAll.data("Selected");
          var TotalItem = $labelAll.data("TotalItem");

          if ($(this).prop("checked")) {
            that.AddSummaryItem.apply(that, [$(this).attr("data-value"), checkboxContainer, true]);
            Selected++;
          } else {
            checkboxContainer.find("label[data-value='" + $(this).attr("data-value") + "']").remove();
            Selected--;
          }
          $checkAll.prop("checked", TotalItem === Selected);
          $labelAll.data("Selected", Selected);
        }
        $whichCheck[0].scrollTop = $whichCheck[0].scrollHeight;
      });
      if (this.SummaryModal) {
        this.SummaryModal.show();
      } else {

        var Actions = [{
          Text: "确定",
          Theme: 'btn_ok',
          CallBack: function () {
            $.Schema.DescSchema = that.SummarySelector.find('#DescSchema').val();
            that.DescSchema = that.SummarySelector.find('#DescSchema').val();
            $ItemEl = (that.ItemNameType == "Name") ? that.NameItemContainer : that.SummaryItemContainer;
            $ItemEl.html('');
            var $label = that.SummarySelector.find("div.checkedBox").find("label");
            for (var i = 0, len = $label.length; i < len; i++) {
              that.AddSummaryItem.apply(that, [$($label[i]).attr("data-value"), $ItemEl, false]);
              $ItemEl.next('i').remove();
            }
            that.SummaryModal.hide();
            //控制隐藏+号
            if ($label.length == 0 && $ItemEl.next('#AddNameItems').length == 0) {
              $ItemEl.after($('<i id="AddNameItems" class="icon-add"></i>'));
            }
            if ($label.length == 0 && $ItemEl.next('#AddSummaryItems').length == 0) {
              $ItemEl.after($('<i id="AddSummaryItems" class="icon-add"></i>'));
            }
          }
        }, {
          Text: '取消',
          Theme: 'btn_cancel',
          CallBack: function () {
            that.SummaryModal.hide();
          }
        }];
        var title = "";
        if (that.ItemNameType == "Name") {
          title = "数据标题";
        } else if (that.ItemNameType == "Summary") {
          title = "数据摘要";
        }
        that.SummaryModal = new $.IModal({
          Title: title,
          Width: 500,
          Height: 500,
          ShowBack: true,
          HasIframe: false,
          Content: that.SummarySelector,
          ToolButtons: Actions,
          ContentUrl: ''
        });
      }
    },

    //显示子表名称选择
    ShowGridViewNameSelector: function ($GridView, $NameItems) {
      var that = this;
      if (!that.childNameSelector) {
        that.childNameSelector = $("<div class='childNameSelector'>");
      }
      that.childNameSelector.empty();
      var mainSchemaSelector = $("<div class='mainSchemaSelector'>");
      var $ItemEl = $('.property-group[propertyname="NameItems"]').find('div[controlkey="FormGridView"]');
      if (!that.$childNameSelectorBOX) {
        that.$childNameSelectorBOX = $('<div class="childNameSelectorBOX seleBox"></div')


      }
      that.$childNameSelectorBOX.empty();

      if (!that.childNameSelector) {
        that.childNameSelector = $("<div class='childNameSelector'>");
      }
      var rows = that.$SheetContent.children("div.row:not(.SheetGridView):not(." + this.PageHeader + "):not(." + this.DesControl + "):not([data-controlkey='FormBoList']):not([data-controlkey='FormSns']):not([data-controlkey='FormAttachment']):not([data-controlkey='FormFolder']):not([data-controlkey='FormPhoto']):not([data-controlkey='FormButton']):not([data-controlkey='FormFormula']):not([data-controlkey='FormAssociateProperty']):not([data-controlkey='FormList']):not([data-controlkey='FormEmbedCode'])");

      // if ($ItemEl == that.$DeleteItems) {
      //   //过滤掉按钮控件
      //   var rows = that.$SheetContent.find("div[data-datafield]:not([data-controlkey='FormButton'])");
      // }
      //添加全选
      var allId = $.IGuid();
      var $allHolder = $("<div class='checkall-holder'></div>"), Selected = 0, TotalItem = 0,
        $checkAll = $("<input type='checkbox'/>").attr({ "id": allId, "data-type": "all" }),
        $labelAll = $("<label class='icon-get' for='" + allId + "'>全选</label>").css("float", "none"),
        $whichCheck = $("<div class='checkedBox property-input' placeholder='请从下方选择内容'></div>"),
        $childNameWrapper = $("<div class='childNameWrapper'></div>")
      $allHolder.append($checkAll).append($labelAll);
      that.childNameSelector.append($allHolder);
      //主表字段
      var rows = this.$SheetContent.children("div.row:not(.SheetGridView):not(." + this.PageHeader + "):not(." + this.DesControl + "):not([data-controlkey='FormBoList']):not([data-controlkey='FormSns']):not([data-controlkey='FormAttachment']):not([data-controlkey='FormFolder']):not([data-controlkey='FormPhoto']):not([data-controlkey='FormButton']):not([data-controlkey='FormAssociateProperty']):not([data-controlkey='FormList'])");
      for (var i = 0; i < rows.length; i++) {
        var $el = $(rows[i]);
        var id = $.IGuid();
        if ($el.hasClass("sheet-control")) {
          var dataField = this.GetDataField($el);
          //CreateBy.FullName-》CreateBy
          if (dataField == this.CreatedBy) {
            dataField = "CreatedBy";
          }
          var $checkbox = $("<input type='checkbox'/>").attr({ "id": id, "data-value": dataField });
          var $label = $("<label for='" + id + "'>").text(this.GetDataFieldDisplayName($el)).css("float", "none");
          if ($NameItems.find("label[data-value='" + dataField + "']").length > 0) {
            $checkbox.prop("checked", "checked");
            that.AddSummaryItem.apply(that, [$NameItems.find("[data-value='" + dataField + "']").attr("data-value"), $whichCheck, true]);
          }
          mainSchemaSelector.append($checkbox).append($label);
        } else if ($el.hasClass("layoutrow")) {
          //布局控件
          var $control = $el.find("div.sheet-control:not([data-controlkey='FormBoList']):not([data-controlkey='FormSns']):not([data-controlkey='FormAttachment']):not([data-controlkey='FormFolder']):not([data-controlkey='FormPhoto']):not([data-controlkey='FormButton']):not([data-controlkey='FormAssociateProperty']):not([data-controlkey='FormList'])");
          if ($control.length > 0) {
            for (var j = 0; j < $control.length; j++) {
              id = $.IGuid();
              var dataField = this.GetDataField($($control[j]));
              //CreateBy.FullName-》CreateBy
              if (dataField == this.CreatedBy) {
                dataField = "CreatedBy";
              }
              var $checkbox = $("<input type='checkbox' id='" + id + "' data-value='" + dataField + "' />");//.attr("id", id).attr("data-value", dataField);
              var $label = $("<label for='" + id + "'>" + this.GetDataFieldDisplayName($($control[j])) + "</label>");
              if ($NameItems.find("label[data-value='" + dataField + "']").length > 0) {
                $checkbox.prop("checked", "checked");
              }
              mainSchemaSelector.append($checkbox).append($label);
            }
          }
        }
      }
      $childNameWrapper.append("<div style='clear:both;'>主表单</div>").append(mainSchemaSelector.css("float", "left"));
      //子表字段
      var childSchemaSelector = $("<div>");
      var ctrls = $GridView.find(".sheet-control:not([data-controlkey='FormBoList']):not([data-controlkey='FormSns']):not([data-controlkey='FormAttachment']):not([data-controlkey='FormFolder']):not([data-controlkey='FormButton']):not([data-controlkey='FormAssociateProperty']):not([data-controlkey='FormList'])");
      for (var i = 0; i < ctrls.length; i++) {
        var $el = $(ctrls[i]);
        var id = $.IGuid();
        if ($el.hasClass("sheet-control")) {
          var dataField = this.GetDataField($el);
          var $checkbox = $("<input type='checkbox'/>").attr({ "id": id, "data-value": dataField });
          var $label = $("<label for='" + id + "'>").text($el.attr("data-displayname")).css("float", "none");
          if ($NameItems.find("[data-value='" + dataField + "']").length > 0) {
            $checkbox.prop("checked", "checked");
            that.AddSummaryItem.apply(that, [$NameItems.find("[data-value='" + dataField + "']").attr("data-value"), $whichCheck, true]);
          }
          childSchemaSelector.append($checkbox).append($label);
        }
      }
      $childNameWrapper.append("<div style='clear:both;'>子表单</div>").append(childSchemaSelector.css("float", "left"));
      //全选
      that.childNameSelector.off('click').on('click', '.checkall-holder input', function () {
        var $inputs = $childNameWrapper.find("input");
        for (var i = 0, len = $inputs.length; i < len; i++) {
          var value = $($inputs[i]).attr("data-value");
          var $item = $whichCheck.find("label[data-value='" + value + "']");
          if ($(this).prop("checked")) {
            if ($item.length == 0) {
              that.AddSummaryItem.apply(that, [value, $whichCheck, true]);
              $($inputs[i]).prop("checked", true);
            }
          } else {
            if ($item.length >= 1) {
              $item.remove();
              $($inputs[i]).prop("checked", false);
            }
          }
        }
        var Selected = $labelAll.data("Selected");
        var TotalItem = $labelAll.data("TotalItem");
        Selected = $(this).prop("checked") ? TotalItem : 0;
        $labelAll.data("Selected", Selected);
        $whichCheck[0].scrollTop = $whichCheck[0].scrollHeight;
      });
      //单选
      $childNameWrapper.off('click').on('click', 'input', function () {
        var Selected = $labelAll.data("Selected");
        var TotalItem = $labelAll.data("TotalItem");

        if ($(this).prop("checked")) {
          that.AddSummaryItem.apply(that, [$(this).attr("data-value"), $whichCheck, true]);
          Selected++;
        } else {
          $whichCheck.find("label[data-value='" + $(this).attr("data-value") + "']").remove();
          Selected--;
        }
        // if (TotalItem === Selected) {
        //   $checkAll.prop("checked", "checked");
        // } else {
        //   $checkAll.prop("checked", false);
        // }
        $checkAll.prop("checked", TotalItem === Selected);
        $labelAll.data("Selected", Selected);
        $whichCheck[0].scrollTop = $whichCheck[0].scrollHeight;
      });
      that.$childNameSelectorBOX.append($whichCheck);
      that.childNameSelector.append($childNameWrapper);
      that.$childNameSelectorBOX.append(that.childNameSelector);

      if (this.childNameModal) {
        this.childNameModal.show();
      }
      else {
        var Actions = [{
          Text: "确定",
          Theme: 'btn_ok',
          CallBack: function () {
            that.$ChildNameItems.empty();
            // $NameItems.empty();

            var $label = that.$childNameSelectorBOX.find("div.checkedBox").find("label");
            for (var i = 0, len = $label.length; i < len; i++) {
              that.AddGridViewNameItem.apply(that, [$($label[i]).attr("data-value"), that.$ChildNameItems]);
            }
            that.childNameModal.hide();
            if ($label.length == 0) {
              that.$ChildNameItems.after($('<i class="icon-add" data-index="0" controlkey="FormGridView" style="position: absolute; top: 50%; right: 5px; height: 20px; width: 20px; line-height: 20px; text-align: center; display: block; cursor: pointer; margin-top: -16px;"></i>'));
            } else {
              that.$ChildNameItems.next('i').remove();
            }
          }
        },
        {
          Text: '取消',
          Theme: 'btn_cancel',
          CallBack: function () {
            that.childNameModal.hide();
          }
        }];
        this.childNameModal = new $.IModal({
          Title: '数据标题',
          Width: 500,
          Height: 474,
          ShowBack: true,
          HasIframe: false,
          Content: that.$childNameSelectorBOX,
          ToolButtons: Actions,
          ContentUrl: ''
        });
      }
    },

    //添加子表名称
    AddGridViewNameItem: function (datafield, $NameItems) {
      var idatafield = datafield;
      var that = this;
      var $el = that.GetControlElement(idatafield);
      var $label = $("<label class='label label-info'>").attr("data-value", datafield).val(datafield).text($el.attr("data-displayname"));
      $NameItems.append($label);
    },

    // 设置关联对象映射
    SetAssociationMappings: function () {
      var that = this;
      $.Schema.AssociationMappings = {};
      that.$SheetContent.find("[data-controlkey='FormQuery'],[data-controlkey='FormUser']").each(function (index) {
        var $control = $(this);
        var dataMappingControls = $control.attr("data-mappingcontrols");
        if (dataMappingControls) {
          var mapping = JSON.parse(dataMappingControls);
          if (mapping && !$.isEmptyObject(mapping)) {
            $.Schema.AssociationMappings[$control.attr("data-" + that.DataFieldKey.toLowerCase())] = mapping;
          }
        }
      });
    },

    //创建运行时控件
    BuildRuntimeControl: function ($row) {
      var dataField = this.GetDataField($row);
      var Settings = this.GetSettings(dataField);
      if (Settings["IsCheckbox"] != null && typeof (Settings["IsCheckbox"]) != "undefined" && (Settings["IsCheckbox"] == "true" || Settings["IsCheckbox"] == true))
        Settings["DataDictItemName"] = "";
      var $el = $("<div class='row sheet-control'>").attr("data-" + this.DataFieldKey, dataField);

      for (var key in Settings) {
        $el.attr("data-" + key, Settings[key]);
      }
      if (Settings["ControlKey"] == "FormCheckbox") {
        var array = JSON.parse(Settings['DefaultItems']);
        if (array != null && array.length > 0)
          Settings.DisplayName = array[0];
      }
      if (dataField != null && dataField != this.SequenceNo) {
        if ($row.attr("data-controlkey") != this.SheetButton) {
          this.BuildPropertie(dataField, Settings);
        }
      }
      if (Settings["ControlKey"] == "FormAssociateProperty") {
        var dataType = parseInt(Settings["SourceType"]);
        switch (dataType) {
          case 58://文档库
            $el.attr("data-controlkey", "FormFolder");
            break;
          case 54://城市选择
            $el.attr("data-controlkey", "FormCitySelect");
            break;
          case 56://地址
            $el.attr("data-controlkey", "FormAreaSelect");
            break;
          case 51:
            $el.attr("data-controlkey", "FormMultiQuery");
            break;
          case 50:
            $el.attr("data-controlkey", "FormQuery");
            break;
          case 27:
            $el.attr("data-controlkey", "FormMultiUser");
            break;
          case 26:
            $el.attr("data-controlkey", "FormUser");
            break;
          case 24:
            $el.attr("data-controlkey", "FormAttachment");
            break;
          case 14:
            $el.attr("data-controlkey", "FormTextBox");
            break;
          case 13:
            $el.attr("data-controlkey", "FormTextArea");
          case 9:
            break;
          case 7:
            $el.attr("data-controlkey", "FormNumber");
            break;
          case 5:
            $el.attr("data-controlkey", "FormDateTime");
            break;
          case 1://是否
            $el.attr("data-controlkey", "FormCheckbox");
            break;
          default:
        }
        if (isNaN(dataType)) {
          $el.attr("data-controlkey", "FormTextBox");
        }
      }
      if (Settings["ControlKey"] == "FormDepartment") {
        $el.attr("data-controlkey", "FormUser");
      } else if (Settings["ControlKey"] == "FormMultiDepartment") {
        $el.attr("data-controlkey", "FormMultiUser");
      }
      return $el;
    },
    IsJsonLike: function (str) {
      var JSON_START = /^\[|^\{(?!\{)/;
      var JSON_ENDS = {
        '[': /]$/,
        '{': /}$/
      };
      var jsonStart = str.match(JSON_START);
      return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
    },
    //创建数据模型数据项
    BuildPropertie: function (dataField, Settings) {
      var parentDataField = "";
      var schemaCode = "";//关联表单code
      var folderName = "";
      var controlKey = "";
      var IsRelatedMember = false;
      var dataDictItemName = "";
      var optionalValues = "";
      var datetimemode = "";
      var decimalPlaces = 0;
      var computationRule = "";//计算规则
      var displayRule = "";//显示规则
      var associationFilter = "";//关联查询过滤规则
      var unitSelectionRange = "";//选人限制范围，";"分割的UnitId
      var nameItems = "";
      var defaultValue = "";
      var boSchemaInfo = "";//关联表单信息
      var noRepeat = false;//不允许重复值
      var showMode = 0;
      var selectShowMode = 0;
      var mappingField = "";
      var unitType = null;
      var interfaceOptions = null; // 接口选择id
      var defaultValueSetting = null; // 默认值设置
      switch (Settings.ControlKey.toLowerCase()) {
        case "apitextarea":
        controlKey = $.BizDataType.ApiTextArea || 53;
        break;
        case "apitextarea":
        controlKey = $.BizDataType.ApiTextArea || 53;
        break;
        case "apitextarea":
        controlKey = $.BizDataType.ApiTextArea || 53;
        break;
        case "formlist":
          
          controlKey = $.BizDataType.AssociationList || 53;
          schemaCode = (Settings.BOSchemaCode || "");
          boSchemaInfo = (Settings.BOSchemaInfo || "");
          if (Settings.AssociationFilter) {
            associationFilter = JSON.parse(Settings.AssociationFilter).Rule;
          }
          break;
        case "formassociateproperty":
          controlKey = $.BizDataType.AssociationProperty || 52;
          break;
        case "formmap":
          controlKey = $.BizDataType.Map;
          break;
        case "formtextarea":
          controlKey = $.BizDataType.String;
          break;
        case "formtextbox":
          if (Settings.IsMultiple == "true") {
            controlKey = $.BizDataType.String;
          }
          else {
            controlKey = $.BizDataType.ShortString;
          }
          if(this.isOpenBigForm==true||this.isOpenBigForm=="true"){
            noRepeat = false
          }
          else{
            noRepeat = Settings.NoRepeat || false;
          }
          break;
        case "formmultidepartment":
          controlKey = $.BizDataType.MultiParticipant;
          IsRelatedMember = Settings.IsRelatedMember;
          unitSelectionRange = Settings.UnitSelectionRange;
          unitType = UnitType.OrganizationUnit;
          break;
        case "formmultiuser":
          controlKey = $.BizDataType.MultiParticipant;
          IsRelatedMember = Settings.IsRelatedMember;
          unitSelectionRange = Settings.UnitSelectionRange;
          unitType = UnitType.User;
          break;
        case "formdepartment":
          if (Settings.IsMultiple == "true") {
            controlKey = $.BizDataType.MultiParticipant;
            IsRelatedMember = Settings.IsRelatedMember;
          }
          else {
            controlKey = $.BizDataType.SingleParticipant;
            IsRelatedMember = Settings.IsRelatedMember;
          }
          unitType = UnitType.OrganizationUnit;
          unitSelectionRange = Settings.UnitSelectionRange;
          break;
        case "formuser":
          if (Settings.IsMultiple == "true") {
            controlKey = $.BizDataType.MultiParticipant;
            IsRelatedMember = Settings.IsRelatedMember;
          }
          else {
            controlKey = $.BizDataType.SingleParticipant;
            IsRelatedMember = Settings.IsRelatedMember;
          }
          unitSelectionRange = Settings.UnitSelectionRange;
          unitType = UnitType.User;
          break;
        case "formgridview":
          controlKey = $.BizDataType.BizObjectArray;
          nameItems = Settings.NameItems;
          break;
        case "formdatetime":
          controlKey = $.BizDataType.DateTime;
          datetimemode = Settings.DateTimeMode;
          break;
        case "formattachment":
          controlKey = $.BizDataType.Attachment;
          break;
        case "formphoto":
          controlKey = $.BizDataType.Image;
          break;
        case "formnumber":
          controlKey = $.BizDataType.Double;
          showMode = Settings.ShowMode || 0;
          decimalPlaces = Settings.DecimalPlaces || 0;
          break;
        case "formquery":
        case "formmultiquery":
          if (Settings.ControlKey.toLowerCase() == "formquery") {
            controlKey = $.BizDataType.Association;
          } else {
            controlKey = $.BizDataType.AssociationArray;
          }
          schemaCode = (Settings.BOSchemaCode || "");
          boSchemaInfo = (Settings.BOSchemaInfo || "");
          if (Settings.AssociationFilter) {
            associationFilter = JSON.parse(Settings.AssociationFilter).Rule;
          }
          break;
        case 'formfolder':
          controlKey = $.BizDataType.Folder;
          folderName = (Settings.FolderName || "");
          break;
        case "formcheckboxlist":
          controlKey = $.BizDataType.ShortString;
          dataDictItemName = Settings.DataDictItemName;
          optionalValues = Settings.DefaultItems;
          defaultValue = Settings.DefaultValue;
          selectShowMode = Settings.SelectShowMode || 0;
          break;
        case "formcheckbox":
          controlKey = $.BizDataType.Bool;
          defaultValue = Settings.DefaultValue;
          //selectShowMode = Settings.SelectShowMode || 0;
          break;
        case "formradiobuttonlist":
          controlKey = $.BizDataType.ShortString;
          dataDictItemName = Settings.DataDictItemName;
          optionalValues = Settings.DefaultItems;
          defaultValue = Settings.DefaultValue;
          break;
        case "formdropdownlist":
          controlKey = $.BizDataType.ShortString;
          dataDictItemName = Settings.DataDictItemName;
          optionalValues = Settings.DefaultItems;
          defaultValue = Settings.DefaultValue;
          schemaCode = (Settings.BOSchemaCode || "");
          mappingField = (Settings.MappingField || "");
          if (Settings.AssociationFilter) {
            associationFilter = JSON.parse(Settings.AssociationFilter).Rule;
          }
          break;
        case "formareaselect":
          controlKey = $.BizDataType.Address;
          break;
        case "formcityselect":
          controlKey = $.BizDataType.City;
          break;
        case "formcityselect":
          controlKey = $.BizDataType.City;
          break;
        case "formformula":
          controlKey = $.BizDataType.Formula;
          break;
        case "formembedcode":
          controlKey = $.BizDataType.FormEmbedCode;
          break;
        case "formapprovalrecord":
          controlKey = $.BizDataType.FormApprovalRecord;
          break;
        default:
          controlKey = $.BizDataType.ShortString;
          break;
      }
      if (Settings.ComputationRule) {
        if (this.IsJsonLike(Settings.ComputationRule)) {
          computationRule = JSON.parse(Settings.ComputationRule).Rule;
        } else {
          computationRule = Settings.ComputationRule;
        }
      }
      if (Settings.DisplayRule && Settings.DisplayRule.length > 0) {
        //旧的DisplayRule {"RuleDataField":"","RuleValue":""}
        //新的DisplayRule {"Rule":"","Text":""}
        var rule = JSON.parse(Settings.DisplayRule).Rule;
        if (rule == undefined) {//如果没有新的规则则使用旧规则，旧规则只配置 DataField=Value
          rule = JSON.parse(Settings.DisplayRule).RuleDataField + '==' + JSON.parse(Settings.DisplayRule).RuleValue;
        }
        displayRule = rule;
        //displayRule = JSON.parse(Settings.DisplayRule).RuleDataField;
      }
      if (Settings.InterfaceOptions && Settings.InterfaceOptions.length > 0) {
        interfaceOptions = JSON.parse(Settings.InterfaceOptions).id;
        showMode = Settings.ShowMode || 0;
      }
      if (Settings.DefaultValueSetting && Settings.DefaultValueSetting.length > 0) {
        defaultValueSetting = JSON.parse(Settings.DefaultValueSetting).id;
      }
      if (dataField == this.CreatedBy) {
        dataField = "CreatedBy";
      } else if (dataField == this.CreatedTime) {
        //设置创建时间显示分钟 20150514 caojp add
        datetimemode = 'yyyy-mm-dd hh:ii';
      }
      if (optionalValues && typeof optionalValues !== "string") {
        optionalValues = JSON.stringify(optionalValues);
      }
      if (dataField.indexOf(".") > -1) {
        var id = dataField.split(".");
        parentDataField = id[0];
        $.Schema.Properties[dataField] = {
          ControlKey: controlKey,
          DisplayName: Settings.DisplayName,
          ParentKey: parentDataField,
          AssociationSchemaCode: schemaCode,
          ControlCode: Settings.ControlCode,
          ControlType:Settings.ControlKey,
          IsRelatedMember: IsRelatedMember,
          DataDictItemName: dataDictItemName,
          OptionalValues: optionalValues,
          DateTimeMode: datetimemode,
          ComputationRule: computationRule,
          DisplayRule: displayRule,
          AssociationFilter: associationFilter,
          UnitSelectionRange: unitSelectionRange,
          DefaultValue: defaultValue,
          MappingField: mappingField,
          UnitType: unitType
        };
        if (Settings.ControlKey.toLocaleLowerCase() == "formnumber") {
          $.Schema.Properties[dataField]['ShowMode'] = showMode;
          $.Schema.Properties[dataField]['DecimalPlaces'] = decimalPlaces;
        } else if (Settings.ControlKey.toLocaleLowerCase() == "formcheckboxlist" ||
          Settings.ControlKey.toLocaleLowerCase() == "formradiobuttonlist" ||
          Settings.ControlKey.toLocaleLowerCase() == "formdropdownlist") {
          $.Schema.Properties[dataField]['SelectShowMode'] = selectShowMode;
          if (Settings.ControlKey.toLocaleLowerCase() === 'formdropdownlist') {
            // 接口选择id
            $.Schema.Properties[dataField]['InterfaceOptions'] = interfaceOptions === null ? null : +interfaceOptions;
            // 是否开启远程搜索：0-正常,1-开启远程搜索
            $.Schema.Properties[dataField]['ShowMode'] = showMode;
          }
        } else if (Settings.ControlKey.toLocaleLowerCase() == "formassociateproperty") {
          $.Schema.Properties[dataField]['IsMappingProperty'] = true;
        } else if (Settings.ControlKey.toLocaleLowerCase() === 'formdatetime' ||
          Settings.ControlKey.toLocaleLowerCase() === 'formuser') {
            // 默认值设置
            $.Schema.Properties[dataField]['DefaultValue'] = defaultValueSetting === null ? null : defaultValueSetting + '';
        }
      } else {
        if (Settings.ControlKey.toLowerCase() == "formgridview") {
          //子表
          $.Schema.Properties[dataField] = {
            ControlKey: controlKey, DisplayName: Settings.DisplayName,
            AssociationSchemaCode: schemaCode,
            ControlCode: Settings.ControlCode,
            ControlCode: Settings.ControlCode,
            ControlCode: Settings.ControlCode,
            IsRelatedMember: IsRelatedMember,
            ControlType:Settings.ControlKey,
            DataDictItemName: dataDictItemName,
            OptionalValues: optionalValues,
            DateTimeMode: datetimemode,
            ControlCode: Settings.ControlCode,
            ComputationRule: computationRule,
            DisplayRule: displayRule,
            AssociationFilter: associationFilter,
            UnitSelectionRange: unitSelectionRange,
            NameItems: nameItems,
            MappingField: mappingField,
            UnitType: unitType
          };
        } else {
          $.Schema.Properties[dataField] = {
            ControlKey: controlKey, DisplayName: Settings.DisplayName,
            AssociationSchemaCode: schemaCode,
            ControlCode: Settings.ControlCode,
            ControlCode: Settings.ControlCode,
            IsRelatedMember: IsRelatedMember,
            ControlType:Settings.ControlKey,
            DataDictItemName: dataDictItemName,
            OptionalValues: optionalValues,
            DateTimeMode: datetimemode,
            ComputationRule: computationRule,
            DisplayRule: displayRule,
            AssociationFilter: associationFilter,
            UnitSelectionRange: unitSelectionRange,
            DefaultValue: defaultValue,
            MappingField: mappingField,
            UnitType: unitType
          };
          if (Settings.ControlKey.toLowerCase() == 'formquery' ||
            Settings.ControlKey.toLowerCase() == 'formmultiquery' || Settings.ControlKey.toLowerCase() == 'formlist') {
            $.Schema.Properties[dataField]['AssociationSchemaInfo'] = boSchemaInfo;
          } else if (Settings.ControlKey.toLowerCase() == 'formtextbox') {
            $.Schema.Properties[dataField]['NoRepeat'] = noRepeat;
          } else if (Settings.ControlKey.toLowerCase() == 'formnumber') {
            $.Schema.Properties[dataField]['ShowMode'] = showMode;
            $.Schema.Properties[dataField]['DecimalPlaces'] = decimalPlaces;
          } else if (Settings.ControlKey.toLowerCase() == 'formassociateproperty') {
            $.Schema.Properties[dataField]['IsMappingProperty'] = true;
          }
          else if (Settings.ControlKey.toLowerCase() == 'formfolder') {
            $.Schema.Properties[dataField]['FolderName'] = folderName;
          } else if (Settings.ControlKey.toLowerCase() === 'formembedcode') {
            // 接口选择id
            $.Schema.Properties[dataField]['InterfaceOptions'] = interfaceOptions === null ? null : +interfaceOptions;
          } else if (Settings.ControlKey.toLowerCase() === 'formdropdownlist') {
            // 接口选择id
            $.Schema.Properties[dataField]['InterfaceOptions'] = interfaceOptions === null ? null : +interfaceOptions;
            // 是否开启远程搜索：0-正常,1-开启远程搜索
            $.Schema.Properties[dataField]['ShowMode'] = showMode;
          } else if (Settings.ControlKey.toLocaleLowerCase() === 'formdatetime' ||
            Settings.ControlKey.toLocaleLowerCase() === 'formuser') {
            // 默认值设置
            $.Schema.Properties[dataField]['DefaultValue'] = defaultValueSetting === null ? null : defaultValueSetting + '';
          }
        }
      }
    },

    //创建布局行
    BuildLayoutRow: function () {
      var $el = $("<div class='row'>");
      $el.append("<div class='col-md-6 col-sm-6 col-xs-6'>");
      $el.append("<div class='col-md-6 col-sm-6 col-xs-6'>");
      return $el;
    },

    //创建布局行-展开收起
    BuildExpandLayoutRow: function (n, title) {
      var $el = $(`<div expand-title="${title}" class="row expand-layout-row"></div>`);
      var content = '<div style="height: 0" class="expand-layout-comps">';
      for (let i = 0; i < n; i++) {
        content += '<div class="col-md-12 col-sm-12 col-xs-12"></div>';
      }
      content += `</div><div class="expand-layout-title" onclick="
        var controlArea = this.parentNode.querySelector('.expand-layout-comps');
        if (this.expand) {
          this.expand = false;
          this.compsHeight = controlArea.scrollHeight + 'px';
          controlArea.style.height = this.compsHeight;
          var that = this;
          setTimeout(function() {
            that.innerHTML='<span>${title}</span><span>展开 +</span>';
            controlArea.style.height = 0;
          }, 0);
        } else {
          this.expand = true;
          this.innerHTML='<span>${title}</span><span>收起 -</span>';
          controlArea.style.height = this.compsHeight || '';
        }"><span>${title}</span><span>展开 +</span></div>`;
      $el.html(content);
      return $el;
    },

    //Json转为Html
    JqObjectToHtml: function ($el) {
      return $("<div>").append($el.clone()).remove().html();
    },

    //获取数据项的DataField值
    GetDataField: function ($el) {
      return $el.attr("data-" + this.DataFieldKey);
    },
    //获取数据项的ControlKey值
    GetControlKey: function ($el) {
      return $el.attr("data-controlkey");
    },

    //获取数据项的显示名称
    GetDataFieldDisplayName: function ($el) {
      //获取子表字段的名称
      var dataField = this.GetDataField($el);
      var displayName = "";
      if (dataField == "CreatedBy.FullName") {
        dataField = "CreatedBy";
      }
      if (dataField != null && dataField.indexOf('.') > 0) {
        var ParentdataField = dataField.split('.')[0];
        var ParentControl = this.GetControlElement(ParentdataField);
        var ParentDisplayName = ParentControl.attr("data-DisplayName");
        if (ParentDisplayName != null) {
          displayName = ParentDisplayName + "." + $el.attr("data-DisplayName");
        } else {
          displayName = $el.attr("data-DisplayName");
        }
      } else {
        displayName = $el.attr("data-DisplayName");
      }
      return displayName || dataField;
    },

    //创建新的datafield值
    // CreateNewDataFieldValue: function () {
    //   return "F" + $.IGuid().replace(/-/g, "");
    // },
    //创建子表的datafield值
    CreateNewChildSchemaDataField: function () {
      return "F" + $.IGuid().replace(/-/g, "");
    },
    //创建控件的datafield值
    //每次新增都要判断是否存在
    CreateNewControlDataField: function () {
      var that = this;
      var newDataField = "";
      var needCheck = true;
      while (needCheck) {
        that.DataFieldNo += 1;
        newDataField = "F" + that.GenerateDataFieldNo(7, '0', that.DataFieldNo);
        //先判断表单设计器中是否已经有相同的编码
        var existControl = that.$SheetContent.find("div[data-controlkey][data-datafield='" + newDataField + "']");
        if (existControl && existControl.length > 0) {
          continue;
        }
        //请求后台判断字段是否重复
        that.Requst(that.Action_CheckCodeDuplicated, {
          DataField: newDataField
        }, function (data) {
          if (data.Successful) {
            needCheck = false;
          }
        }, false)
      }
      return newDataField;
    },
    //格式化DataFieldNo到7位
    GenerateDataFieldNo: function (bits, identifier, value) {
      value = Array(bits + 1).join(identifier) + value;
      return value.slice(-bits);
    },

    //设置DataField的值
    SetDataFieldValue: function ($el, datafield) {
      $el.attr("data-" + this.DataFieldKey, datafield);
      var id = datafield.replace(/\./g, "-");
      $el.attr("id", id);
    },

    //根据DataFiled 的值，获取控件
    GetControlElement: function (datafield) {
      var id = (datafield || "").replace(/\./g, "-");
      var $el = this.$SheetContent.find("#" + id);
      if ($el == undefined || $el.length == 0) {
        if (datafield.toLowerCase() == "createdby") {
          $el = this.$SheetContent.find("#CreatedBy-FullName");
        }
      }
      return $el;
    },

    //读取控件的配置
    GetSettings: function (datafield) {
      var $el = this.GetControlElement(datafield);
      if ($el.length == 0) return {
      };
      var controlKey = $el.attr("data-" + this.ControlKey);
      var settings = {
        ControlKey: controlKey
      };
      if (controlKey == void 0) {
        //如果控件有异常（没有controlkey）返回null
        return null;
      }
      var designProperties = FormControls[controlKey].DesignProperties;
      for (var i = 0; i < designProperties.length; i++) {
        var propertyName = designProperties[i].Name;
        if (propertyName == "Description") {
          //之前名字是describe，后面改成了description。做兼容处理
          //影响的客户为灰度环境
          if ($el.attr("data-" + propertyName) || $el.attr("data-describe")) {
            settings[propertyName] = $el.attr("data-" + propertyName) || $el.attr("data-describe");
          } else {
            settings[propertyName] = designProperties[i].DefaultValue;
          }
        } else if (propertyName == "AssociationFilter") {
          if ($el.attr('data-' + propertyName) || $el.attr('data-bofilter')) {
            settings[propertyName] = $el.attr('data-' + propertyName) || $el.attr('data-bofilter');
          } else {
            settings[propertyName] = designProperties[i].DefaultValue;
          }
        } else if (propertyName == "DefaultValue") {
          if (controlKey == "FormRadioButtonList" ||
            controlKey == "FormCheckboxList" ||
            controlKey == "FormDropDownList") {//单选/复选/下拉
            if ($el.attr("data-" + propertyName)) {
              var v = $el.attr("data-" + propertyName);
              v = JSON.parse(v).join(";");
              settings[propertyName] = v;
            } else {
              settings[propertyName] = designProperties[i].DefaultValue;
            }
          } else {
            if ($el.attr("data-" + propertyName)) {
              settings[propertyName] = $el.attr("data-" + propertyName);
            } else {
              settings[propertyName] = designProperties[i].DefaultValue;
            }
          }
        } else {
          if ($el.attr("data-" + propertyName)) { //控件有属性
            settings[propertyName] = $el.attr("data-" + propertyName);
          } else {//控件上没有属性，取默认值
            if ((propertyName == "DisplayName") && $el.attr("data-" + propertyName) == "") {
              //如果用户把DisplayName清空了，不要取DefaultValue
              settings[propertyName] = "";
            } else {
              settings[propertyName] = designProperties[i].DefaultValue;
            }
          }
        }
      }
      if (controlKey == 'FormAssociateProperty') {
        settings['unitType'] = $el.attr("data-unittype");
      }
      return settings;
    },
    //判断控件是否允许拖入指定区域
    CanDrop: function (sourceElement, targetElement) { },
    //计算是否在表单设计器范围内
    IsInSheetDesigner: function (x, y) {
    },

    // 从左侧拖入右侧事件绑定
    BindDraggable: function (element, sortable) {
      var that = this;
      var $tipPic = $("#tipPic");
      $(element).draggable({
        appendTo: "#sheetContent",
        helper: "clone",
        scroll: true,
        snap: true,
        snapTolerance: 10,
        scrollSensitivity: 100,
        cursorAt: {
          cursor: 'move', top: 25, left: -5
        },
        connectToSortable: sortable,//拖拽目标，且自动排序
        start: function (e, ui) {
          $(ui.helper).css({
            "width": "108px",
            "border": "1px dashed #2d7FFF",
            "font-size": "12px",
            "color": "#2D7FFF",
            "backgroundColor": "#f0f4ff",
            'box-shadow': '0 0 3px 0 rgba(201,201,201,0.50)',
            "padding": "4px 0 9px 10px",
            "text-align": "left",
            "overflow": "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
            "text-decoration": "none"
          });
          $(ui.helper).find(".fa").css({
            "font-size": "16px",
            "width": "16px",
            "color": " #46b2fe",
            "margin-right": "5px",
            "position": "relative",
            "top": "2px"
          });

          $tipPic.remove()
          that.CurrentDrag = $(this);//记录当前拖拽的对象
          that.CurrentDrag.addClass("draggThis");
          //标示不可以拖放的区域
          that.AddUnDropArea();
        },
        stop: function (event, ui) {
          that.CurrentDrag && that.CurrentDrag.removeClass("draggThis");
          that.RemoveUnDropArea();
          $tipPic.remove()
          //一行两列中切换按钮的位置调整
          var widthLeft = $('.layoutrow-item[data-layoutitem="Left"]').width();
          $('.layoutrow  span[data-type="changeplace"]').css({ 'left': widthLeft })
        }
      });
    },
    // 绑定拖拽事件
    BindDragEvent: function () {
      var that = this;
      var sortableS = $("#sheetContent"); //接收容器是#sheetContent
      var sortableST = $("#sheetContent,.layoutrow-item"); //接收容器是#sheetContent,.layoutrow-item
      var sortableSTG = $("#sheetContent,.layoutrow-item,.SheetGridView_td"); //接收容器是#sheetContent,.layoutrow-item,.sheetGridView_td
      var sortable = $("#sheetContent,.layoutrow-item,.SheetGridView_td");

      var $tipPic = $("#tipPic");

      var $controlsS = this.$Controls.find(".drag[candroptype='S']");
      var $controlsST = this.$Controls.find(".drag[candroptype='ST']");
      var $controlsSTG = this.$Controls.find(".drag[candroptype='STG']");

      that.BindDraggable($controlsS, sortableS);
      that.BindDraggable($controlsST, sortableST);
      that.BindDraggable($controlsSTG, sortableSTG);

      //设计器中控件拖拽
      $("#sheetContent").sortable({
        connectWith: sortable,
        forcePlaceholderSize: true,
        placeholder: "drop-item",//拖拽位置显示值
        scroll: true,
        scrollSensitivity: 100,
        cancel: "notdrag,.SheetGridView_wrap,#sheetContent .sheet-control.SheetGridView >div.col-sm-12",
        //containment: "parent",
        over: function (e, ui) {
          $(this).find(".drop-item").show();
        },
        stop: function (e, ui) {
          return that.SortableStop(ui.item, e);
        }
      });
      //一行两列里的拖拽
      $("#sheetContent").find(".layoutrow-item").sortable({
        connectWith: sortable,
        forcePlaceholderSize: true,
        placeholder: "drop-item blockquote",
        cancel: "notdrag",
        over: function (e, ui) {
          var $this = $(this);
          var $dragItem = $(ui.item);
          if ($this.find(".row").length > 1 || $dragItem.hasClass("layoutrow")) {
            $this.find(".drop-item:not(.sheet-control)").hide();
          } else if ($this.attr('data-layoutitem') === 'Expand') {
            //如果是不允许拖入此控件的控件进入则不要显示占位符
            that.SortableOver($this, $dragItem, 3);
          } else {
            //如果是不允许拖入此控件的控件进入则不要显示占位符
            that.SortableOver($this, $dragItem, 1);
          }
        },
        stop: function (e, ui) {
          return that.SortableStop(ui.item, e);
        }
      });

      //子表排序
      var $table = $(".SheetGridView>div>table");
      $(".SheetGridView_tr").sortable({
        connectWith: $table,
        forcePlaceholderSize: true,
        placeholder: "SheetGridView_td",
        helper: "clone",
        cancel: "notdrag",
        axis: "x",
        over: function (e, ui) {
          var $this = $(this);
          var $dragItem = $(ui.item);
          if ($this.find(".row").length > 1 || $dragItem.hasClass("layoutrow")) {
            $this.find(".drop-item:not(.sheet-control)").hide();
          } else {
            that.SortableOver($this, $dragItem, 2);
          }
        },
        stop: function (e, ui) {
          return that.SortableStop(ui.item, e);
        }
      });

      $(".SheetGridView_td").sortable({
        items: ":not(*)",
        connectWith: $table,
        forcePlaceholderSize: true,
        placeholder: "drop-item blockquote",
        helper: "clone",
        cancel: "notdrag",
        axis: "x",
        over: function (e, ui) {
          var $this = $(this);
          var $dragItem = $(ui.item);
          if ($this.find(".row").length > 1 || $dragItem.hasClass("layoutrow")) {
            $this.find(".drop-item:not(.sheet-control)").hide();
          } else {
            //如果是不允许拖入此控件的控件进入则不要显示占位符
            that.SortableOver($this, $dragItem, 2);
          }
        },
        stop: function (e, ui) {
          return that.SortableStop(ui.item, e);
        }
      });

      //绑定一行两列和子表接收draggable的事件
      $("#sheetContent").find(".layoutrow-item").droppable({
        over: function (event, ui) {
          var $this = $(this);
          var count = $this.find(".row.sheet-control").length;
          if (count > 0) {
            $this.find(".drop-item:not(.sheet-control)").hide();
          }
        }
      });
      $(".SheetGridView_td").droppable({
        over: function (event, ui) {
          var $this = $(this);
          var count = $this.find(".row.sheet-control").length;
          if (count > 0) {
            $this.find(".drop-item:not(.sheet-control)").hide();
          }
        }
      });
    },
    //排序的over事件
    //source-排序容器
    //dragItem-拖拽对象
    //type-1:一行两列,2:子表,3:展开收起
    SortableOver: function (source, dragItem, type) {
      var that = this;
      var $dragItem = $(dragItem);
      var notInContainer = [];
      if (type == 1) {
        notInContainer = that.NotInTowColsControlKeys;
      } else if (type == 2) {
        notInContainer = that.NotInGridViewControlKeys.concat(that.SystemDataField);
      } else if (type == 3) {
        notInContainer = that.NotInExpandControlKeys;
      }

      var dragControlKey = "";
      var dragControlDataField = ($(dragItem).attr("data-datafield") || "").toLocaleLowerCase();
      if ($.inArray(dragControlDataField, that.SystemDataField) > -1) {
        //系统控件
        dragControlKey = dragControlDataField;
      } else {
        //非系统控件
        dragControlKey = $(dragItem).attr("data-controlkey");
        if (dragControlKey) {
          dragControlKey = dragControlKey.toLocaleLowerCase();
        } else {
          if ($dragItem.hasClass("page-describle")) {
            //描述
            dragControlKey = "descontrol";
          } else if ($dragItem.hasClass("page-header")) {
            //标题
            dragControlKey = "page-header";
          }
        }
      }
      if ($.inArray(dragControlKey, notInContainer) > -1) {
        $(source).find(".drop-item:not(.sheet-control)").attr('placeholder', '此控件不能拖入').addClass("undrop");
      } else {
        $(source).find(".drop-item").show().attr('placeholder', '').removeClass("undrop");
      }
    },
    //给设计器中的控件增加不可拖入提示
    //type:0-子表，1-一行两列，2-展开收起
    //info:显示信息
    //dragKey:拖拽的控件的ControlKey
    SetUnDropMask: function (type, info, dragKey, from) {
      var that = this;
      var $unDropControls = undefined;
      if (type == 0) {
        $unDropControls = that.$SheetContent.find("div.row.sheet-control.drop-item[data-controlkey='FormGridView']");
      } else if (type == 1) {
        $unDropControls = that.$SheetContent.find("div.row.layoutrow.drop-item[data-controlkey='layout_towcols']");
      } else if (type == 2) {
        $unDropControls = that.$SheetContent.find("div.row.layoutrow.drop-item[data-controlkey='layout_expand']");
      }
      //如果是一行两列，替换placeholder提示
      if ($unDropControls.attr("data-controlkey") == "layout_towcols") {
        $unDropControls.find('.layoutrow-item').attr('placeholder', info);
        $unDropControls.find('drop-item').css({ 'display': "none" });
      } else if ($unDropControls.attr("data-controlkey") == "layout_expand") {
        $unDropControls.find('.layoutrow-item').attr('placeholder', info);
        $unDropControls.find('drop-item').css({ 'display': "none" });
      } else if ($unDropControls.attr("data-controlkey") == "FormGridView") {
        //如果是子表
        $unDropControls.find('.SheetGridView_td').each(function () {
          var $_this = $(this);
          $_this.attr('placeholder', info).find('drop-item');
          $_this.find('drop-item').css({ 'display': "none" });
          if ($_this.find(".sheet-control").length == 0) {
            return false
          }
        });
      }
    },
    //添加不可拖放提示
    AddUnDropArea: function (currentDrag) {
      var that = this;
      if (that.CurrentDrag == void 0 && currentDrag == void 0) {
        return;
      }
      that.RemoveUnDropArea();
      var dragElement = that.CurrentDrag || currentDrag;
      //当前拖动控件的ControlKey
      var controlKey = dragElement.attr("data-controlkey");
      if (controlKey) {
        controlKey = controlKey.toLocaleLowerCase();
      } else {
        if (dragElement.hasClass("page-describle")) {
          //描述
          controlKey = "descontrol";
        } else if (dragElement.hasClass("page-header")) {
          //标题
          controlKey = "page-header";
        }
      }
      var controlKey
      if (that.CurrentDrag != void 0) {
        //从左侧拖入设计器
        if ($.inArray(controlKey, that.NotInTowColsControlKeys) > -1) {
          that.SetUnDropMask(1, "此控件不能拖入", controlKey);
        }
        if ($.inArray(controlKey, that.NotInExpandControlKeys) > -1) {
          that.SetUnDropMask(2, "此控件不能拖入", controlKey);
        }
        if (dragElement.hasClass("issystem") || $.inArray(controlKey, that.NotInGridViewControlKeys) > -1) {
          that.SetUnDropMask(0, "此控件不能拖入", controlKey);
        }
      } else {
        //设计器内部排序
        //不允许拖入子表
        that.SetUnDropMask(0, "主表单控件不能拖入", controlKey);
        //部分控件不允许拖入一行两列
        if ($.inArray(controlKey, that.NotInTowColsControlKeys) > -1) {
          that.SetUnDropMask(1, "此控件不能拖入", controlKey);
        }
        if ($.inArray(controlKey, that.NotInExpandControlKeys) > -1) {
          that.SetUnDropMask(2, "此控件不能拖入", controlKey);
        }
      }
    },
    //删除不可拖放区域
    RemoveUnDropArea: function () {
      var that = this;
      that.$SheetContent.find('.layoutrow-item').attr('placeholder', '将左侧控件拖入此处');
      that.$SheetContent.find('.SheetGridView_td').each(function () {
        if ($(this).attr('placeholder') == '此控件不能拖入' || $(this).attr('placeholder') == '主表单控件不能拖入') {
          $(this).attr('placeholder', '拖入左侧控件绘制子表');
          return false;
        }
      });
    },
    //拖拽停止事件
    //从左侧拖动控件到设计器中停止时候会执行此事件
    SortableStop: function (item, event) {
      //alert(123666);
      var that = this;
      var $el = null;
      var $parent = $(item).parent();
      var $item = $(item);
      var currentDataField = $item.attr("data-datafield");
      that.CurrentDrag && this.CurrentDrag.removeClass("draggThis");
      that.RemoveUnDropArea();
      //一行两列中切换按钮的位置调整
      var widthLeft = $('.layoutrow-item[data-layoutitem="Left"]').width();
      $('.layoutrow  span[data-type="changeplace"]').css({ 'left': widthLeft })

      if (that.CurrentDrag) {
        //从左侧拖动字段到设计器
        //系统字段等不能拖动到子表
        var currentControlKey = $item.attr("data-controlkey").toLocaleLowerCase();
        if (($parent.hasClass("SheetGridView_td") && ($.inArray(currentControlKey, that.NotInGridViewControlKeys) == -1) && ($parent.find(".sheet-control[data-datafield]").length >= 1))
          || (that.CurrentDrag.hasClass("issystem") && $parent.hasClass("SheetGridView_td"))) {
          that.CurrentDrag = null;
          $item.remove();
          return true;
        }
        //不能拖入子表
        if ($parent.hasClass("SheetGridView_td") && $.inArray(currentControlKey, that.NotInGridViewControlKeys) > -1) {
          that.CurrentDrag = null;
          $item.remove();
          return true;
        }
        //不能拖入一行两列
        if ($parent.hasClass("layoutrow-item") && ($.inArray(currentControlKey, that.NotInTowColsControlKeys) > -1 || ($parent.find(".sheet-control[data-datafield]").length >= 1))) {
          that.CurrentDrag = null;
          $item.remove();
          return true;
        }
        //不能拖入展开收起
        if ($parent.hasClass("layoutrow-item") && $parent.hasClass('col-sm-12') && ($.inArray(currentControlKey, that.NotInExpandControlKeys) > -1 || ($parent.find(".sheet-control[data-datafield]").length >= 1))) {
          that.CurrentDrag = null;
          $item.remove();
          return true;
        }
        //不能有两个以上图片控件
        if (currentControlKey == "formphoto" && that.$SheetContent.find('[data-controlkey="FormPhoto"]').length > 1) {
          that.CurrentDrag = null;
          $item.remove();
          $.IShowError("同一表单该字段唯一");
          return true;
        }
        //不能有两个以上图片控件
        if (currentControlKey == "formformula" && that.$SheetContent.find('[data-controlkey="FormFormula"]').length > 1) {
          that.CurrentDrag = null;
          $item.remove();
          $.IShowError("同一表单该字段唯一");
          return true;
        }
        //不能有两个以上审批记录控件
        if (currentControlKey == "formapprovalrecord" && that.$SheetContent.find('[data-controlkey="FormApprovalRecord"]').length > 1) {
          that.CurrentDrag = null;
          $item.remove();
          $.IShowError("同一个表单该字段唯一");
          return true;
        }
        //不能有两个以上代码内嵌控件
        // if (currentControlKey == "formembedcode" && that.$SheetContent.find('[data-controlkey="FormEmbedCode"]').length > 1) {
        //   that.CurrentDrag = null;
        //   $item.remove();
        //   $.IShowError("同一个表单该字段唯一");
        //   return true;
        // }
        //不能有两个以上系统控件
        if (that.CurrentDrag.hasClass("issystem") && that.$SheetContent.find("[data-datafield='" + currentDataField + "']").length > 1) {
          that.CurrentDrag = null;
          $item.remove();
          $.IShowError("同一个表单该字段唯一");
          return true;
        }
        var spanwith = 4;
        // 非一行两列布局控件里的控件以2:10进行显示
        if ($parent.hasClass("sheetContent") || $parent.hasClass('col-sm-12')) {
          spanwith = 2;
        }
        //添加控件
        $el = that.RenderControl(item, spanwith);
        if ($el != null) {
          //拖拽审批记录时总是插入表单最后
          if ($item.attr('data-controlkey') == 'FormApprovalRecord') {
            $parent.append($el);
          // 拖拽其他控件到审批记录控件后面时，总是插入到审批记录前面  
          } else if($item.prev().attr('data-controlkey') == 'FormApprovalRecord'){
            $item.prev().before($el)
            $.IShowError('审批记录仅能显示在表单最下方')
          } else {
            $item.after($el);
          }
          $item.remove();
          if ($el.attr('data-controlkey') == 'FormGridView') {
            var width = $el.find('.SheetGridView_td').width();
            $el.find('.SheetGridView_td').css({
              'min-width': width + 'px'
            });
          }
          if ($parent.hasClass("SheetGridView_td")) {
            var isFindTd = false;
            var tds = $parent.parent().find("td.SheetGridView_td");
            for (var index = 0; index < tds.length; index++) {
              if ($(tds[index]).find(".sheet-control[data-datafield]").length == 0) {
                isFindTd = true;
                break;
              }
            }
            if (!isFindTd) {
              var width = $parent.parent().find('.SheetGridView_td:eq(0)').width();
              var $td = $('<td>').addClass('SheetGridView_td').css({
                'min-width': '146px'
              });
              $parent.parent().append($td);
            }
          }
          that.BindDragEvent();
          that.CurrentDrag = null;
          //设置控件选择
          that.ControlElementSelected($el, event);
          if (that.GetDataField($el)) {
            //如果是开发者，需要输入编码
            if (that.IsDevMode) {
              that.ChangeDataFieldValueByDev();
            }
          }
        }
        //子表出现滚动条时自动滚动到最右边
        var container_div = $parent.closest('div')[0];
        if (container_div.scrollWidth > container_div.clientWidth) {
          container_div.scrollLeft = container_div.scrollWidth - container_div.clientWidth;
        }
        that.CurrentDrag = null;
        return true;
      } else {
        //设计器中字段排序
        if ($parent.hasClass("SheetGridView_td")) {
          return false;
        }
        if ($parent.hasClass("layoutrow-item") &&
          (2 == $parent.find("[data-datafield]").length
            || $item.hasClass("layoutrow") || $item.hasClass("SheetGridView"))) {
          //布局里出现两个控件
          return false;
        }
        // 设计器里的动态控件和关联列表控件不能拖放到布局里
        var itemControlKey = $item.attr('data-ControlKey');
        if ($parent.hasClass("layoutrow-item") && (itemControlKey === "FormSns" || itemControlKey === "FormBoList" || $item.hasClass('page-header'))) {
          return false;
        }
        if ($item.hasClass("SheetGridView")) {
          $item.removeAttr("style");
        }
        if (!$item.hasClass("SheetGridView") && !$item.hasClass("SheetGridView_td") && !$item.hasClass("layoutrow") && !$item.hasClass("page-header") && $item.attr("data-ControlKey") != "FormBoList") {
          //调整布局
          var spanwith = 4;
          // 非一行两列布局控件里的控件以2:10进行显示
          if ($parent.hasClass("sheetContent") || $parent.hasClass('col-sm-12')) {
            spanwith = 2;
          }
          $item.find("span:first").removeClass("col-sm-4").removeClass("col-sm-2").addClass("col-sm-" + spanwith);
          $item.find("div[class^='col-sm-']:first").removeClass("col-sm-8").removeClass("col-sm-10").addClass("col-sm-" + (12 - spanwith));
        }
        //子表内部调整顺序时候要同步调整右侧属性“子表字段”顺序
        if ($parent.hasClass("SheetGridView_tr")) {
          //如果控件属性页面可见且是子表的属性页面要同步调整子表内字段顺序
          if (that.$SheetControlPropertysPanel.is(":visible") && (that.$SheetControlPropertysPanel.find("div.property-group[propertyname='GridViewFields']").length > 0)) {
            var $gridviewFieldPanel = that.$SheetControlPropertysPanel.find("div.property-group[propertyname='GridViewFields']");
            //1.当前拖动控件的dataField
            var currentDataField = $item.find("div.row.sheet-control").attr("data-datafield");
            //2.前一个控件的DataField
            var prevDataField = $item.prev().find("div.row.sheet-control").attr("data-datafield");
            //3.操作controlPropertyPanel
            var $currentItem = $gridviewFieldPanel.find("div[data-itemfield='" + currentDataField + "']").closest("li");
            if (prevDataField == undefined) {
              //移动到第一位
              var $firstItem = $gridviewFieldPanel.find("li.property-item:first");
              $currentItem.insertBefore($firstItem);
            } else {
              //移动到prev后面
              var $prevItem = $gridviewFieldPanel.find("div[data-itemfield='" + prevDataField + "']").closest("li");
              $currentItem.insertAfter($prevItem);
            }
          }
        }
        //拖拽审批记录时总是插入表单最后
        if ($item.attr('data-controlkey') == 'FormApprovalRecord') {
          $parent.append($item);
          $.IShowError('审批记录仅能显示在表单最下方')
        // 拖拽其他控件到审批记录控件后面时，总是插入到审批记录前面  
        } else if($item.prev().attr('data-controlkey') == 'FormApprovalRecord'){
          $item.prev().before($item)
          $.IShowError('审批记录仅能显示在表单最下方')
        }
        return true;
      }
    },

    //渲染控件
    RenderControl: function (item, spanwith) {
      var that = this;
      var itemName = $.trim(item.text());
      var controlkey = item.data(this.ControlKey);
      var datafield = this.GetDataField($(item));
      if (datafield == null) {
        //datafield = this.CreateNewDataFieldValue();
        if (controlkey == "FormGridView") {
          datafield = this.DevCode + this.CreateNewChildSchemaDataField();
          //datafield = this.DevCode + datafield;
        } else {
          datafield = this.CreateNewControlDataField();
        }
      } else if (this.GetControlElement(datafield).length > 0) {
        item.remove();
        return;
      }
      var $parent = $(item).parent();
      var $el = $('<div class="row sheet-control"></div>').attr("data-" + this.ControlKey, controlkey).attr("data-DisplayName", itemName);
      var $input = $('<input type="text" />').prop("readOnly", "true").css("width", "100%");
      switch (controlkey) {
        case "FormMultiUser":
        case "FormUser":
          //如果是所属部门显示的placeholder要做区分
          $input.attr("placeholder", datafield == "OwnerDeptId" ? "点击选择部门" : "点击选择人员");
          break;
        case "FormDepartment":
        case "FormMultiDepartment":
          $input.attr("placeholder", "点击选择部门");
          break;
        case this.FormAssociateProperty:
          $input.attr("placeholder", "用于展示关联表单的属性,且数据不会保存");
          break;
        case this.FormFormula:
          $input.attr("placeholder", "富文本编辑");
          break;
        case this.FormEmbedCode:
          $input.attr("placeholder", "代码内嵌");
          break;
        case this.FormApprovalRecord:
          $input.attr("placeholder", "审批记录");
          break;
        case "FormAreaSelect":
          //地区控件
          $input = $("<div>").css("width", "100%");
          var $province = $("<select class='form-control notdrag' style='width:33%;display:inline-block;' >").append($("<option>省</option>"));
          var $city = $("<select class='form-control notdrag' style='width:33%;display:inline-block;' >").append($("<option>市</option>"));
          var $town = $("<select class='form-control notdrag' style='width:34%;display:inline-block;' >").append($("<option>县</option>"));
          var $detail = $("<textarea class='notdrag' rows='2' placeholder='详细地址' style='resize:none; margin-top:2px; width:100%; display:block;min-height:60px; padding:5px;border:1px solid #ddd' readonly>");
          $input.append($province).append($city).append($town).append($detail);
          break;
        case this.TowColsKey:
          //添加布局控件
          $el = null;
          if (!$parent.hasClass("layoutrow-item")) {
            $el = $('<div class="row layoutrow delete-limit">').attr("data-" + this.ControlKey, controlkey);
            var $layoutitem = $('<div class="col-sm-6 col-xs-6 layoutrow-item" data-layoutitem="Left" placeholder="将左侧控件拖入此处"></div><div class="col-sm-6 col-xs-6 layoutrow-item" data-layoutitem="Right"  placeholder="将左侧控件拖入此处"></div>');
            var $changebtn = $("<span data-type='changeplace' title='点击交换位置' class='btn-change'><i class='ivu-icon ivu-icon-arrow-swap'></i></span>");
            var $removebtn = $('<button type="button" data-buttontype="remomvecontrol" class="btn btn-default btn-xs remove"><span class="icon-sheet"><i class="ivu-icon ivu-icon-ios-trash-outline" style="color:#e97763;font-size:20px!important"></i></span></button>');
            $el.append($layoutitem).append($removebtn).append($changebtn);

            $removebtn.click(function () {
              //   Message.warning({
              //     content: '删除控件可能导致流程或者规则失效,请检查流程和规则中是否使用这个控件再确认删除',
              //     duration: 2
              // })
              that.RemoveControl($(this).parent());
            });
            $changebtn.click(function () {
              var $Items = $(this).parent().children("div.layoutrow-item");
              if ($Items.length == 2) {
                $($Items[0]).attr("data-layoutitem", "Right").before($($Items[1]).attr("data-layoutitem", "Left"));
              }
            });
          } else {//布局里不能再添加布局
            $(item).remove();
          }

          $el && $el.click(function (e) {
            that.ControlElementSelected.apply(that, [$(this), e]);
          });
          return $el;
        case this.ExpandLayoutKey:
          //添加布局控件
          $el = null;
          if (!$parent.hasClass("layoutrow-item")) {
            $el = $('<div class="row layoutrow delete-limit">').attr("data-" + this.ControlKey, controlkey);
            var $editableTilte = $('<input expand-title value="" placeholder="请输入标题" style="height:28px;margin-left:5px;" onclick="this.focus()" onchange="this.setAttribute(\'value\', this.value)">');
            var $defaultStatus = $('<form default-status style="display:inline-block;vertical-align:top;height:28px;margin-left:10px;"><input style="display:inline;margin:0;vertical-align:top;height:28px;" type="radio" checked name="defaultStatus" value="open"><span style="vertical-align:top;line-height:27px;">默认展开</span> <input style="display:inline;margin:0;vertical-align:top;height:100%;" type="radio" name="defaultStatus" value="close"><span style="vertical-align:top;line-height:27px;">默认收起</span></form>');
            var $layoutitem = $('<div class="expand-layout-container"><div class="col-sm-12 col-xs-12 layoutrow-item" data-layoutitem="Expand" placeholder="将左侧控件拖入此处"></div></div>');
            var $changebtn = $("<span data-type='addnewline' title='新增一行' class='btn-change-expand'><i class='ivu-icon ivu-icon-android-add'></i></span>");
            var $removebtn = $('<button type="button" data-buttontype="remomvecontrol" class="btn btn-default btn-xs remove-expand"><span class="icon-sheet"><i class="ivu-icon ivu-icon-ios-trash-outline" style="color:#e97763;font-size:20px!important"></i></span></button>');
            $el.append($editableTilte).append($layoutitem).append($removebtn).append($changebtn);

            $removebtn.click(function () {
              //   Message.warning({
              //     content: '删除控件可能导致流程或者规则失效,请检查流程和规则中是否使用这个控件再确认删除',
              //     duration: 2
              // })
              that.RemoveControl($(this).parent());
            });
            $changebtn.click(function () {
              $layoutitem.append($('<div class="col-sm-12 col-xs-12 layoutrow-item" data-layoutitem="Expand" placeholder="将左侧控件拖入此处"></div>'));
              that.BindDragEvent();
            });
          } else {//布局里不能再添加布局
            $(item).remove();
          }

          $el && $el.click(function (e) {
            that.ControlElementSelected.apply(that, [$(this), e]);
          });
          return $el;
        case this.PageHeader:
          $el = null;
          if (!$parent.hasClass("layoutrow-item ")) {
            $el = $('<div class="row"><strong>分组标题</strong></div>').addClass(this.PageHeader).attr("ID", $.IGuid());
            var $removebtn = $('<button type="button" data-buttontype="remomvecontrol" class="btn btn-default btn-xs remove"><span class="icon-sheet"><i class="ivu-icon ivu-icon-ios-trash-outline" style="color:#e97763;font-size:20px!important"></i></span></button>');
            $el.append($removebtn.hide());
            $removebtn.click(function () {
              that.RemoveControl($(this).parent());
            });
            $el.click(function (e) {
              that.ControlElementSelected.apply(that, [$(this), e]);
            });
          } else {//布局里不能再添加标题
            $(item).remove();
          }
          $el && $el.hover(function () {
            $(this).css({ "background-color": "#DCF1FF" });
          }, function () {
            $(this).css({ "background-color": "#fff" });
          });
          return $el;
        case this.DesControl:
          $el = null;
          if (!$parent.hasClass("layoutrow-item")) {
            $el = $('<div class="row"><strong>描述</strong></div>').addClass(this.PageHeader).addClass("page-describle").attr("ID", $.IGuid());
            var $removebtn = $('<button type="button" data-buttontype="remomvecontrol" class="btn btn-default btn-xs remove"><span class="icon-sheet"><i class="ivu-icon ivu-icon-ios-trash-outline" style="color:#e97763;font-size:20px!important"></i></span></button>');
            $el.append($removebtn.hide());
            $removebtn.click(function () {
              that.RemoveControl($(this).parent());
            });
            $el.click(function (e) {
              that.ControlElementSelected.apply(that, [$(this), e]);
            });
          } else {//布局里不能再添加描述
            $(item).remove();
          }
          $el && $el.hover(function () {
            $(this).css({ "background-color": "#DCF1FE" });
          }, function () {
            $(this).css({ "background-color": "#fff" });
          });
          return $el;
        //case this.FormButton:
        case this.SheetButton:
          {
            $input = $("<button type='button' class='btn btn-default' style='width:100%;'>按钮</span></button>");
          }
          ; break;
        case this.FormLabelKey:
          {
            $input = $('<label>').text('系统自动生成');
          }
          break;
        case "FormAttachment":
          $input = $('<div class="FormAttachmentBox"><input type="file" class="notdrag"/><span><i class="ivu-icon ivu-icon-plus-round" style="color:#57a3f3"></i>点击或拖拽文件上传</span></div>');
          $input.find('input').prop("readonly", "readonly");
          $input.find('input[type=file]').off('click').on('click', function () {
            return false;
          });
          break;
        case "FormFolder"://文件库
          $input = $('<div class="form-query-add" placeholder="选择已有文件库"></div><span><i class="ivu-icon ivu-icon-map" style="color:#8aaed1;font-size:20px!important"></i></span>');
          break;
        case "FormCitySelect"://选择城市
          $input.attr("placeholder", "请选择城市");
          break;
        case "FormPhoto":
          $input = $('<span style="width:100%;"><img src="./tianjiatupian.svg" class="notdrag"></span>').prop("readonly", "readonly");
          break;
        case "FormTextArea"://// 增加多行文本框
          $input = $('<textarea class="notdrag" rows="3" style="resize:none; width:100%;border:1px solid #ddd;overflow:hidden; "></textarea>');
          break;
        case "FormMap":
          if (that.$SheetContent.find("div[data-controlkey='FormMap']").length === 0) {
            $input = $('<i class=" ivu-icon ivu-icon-location" style="color:#57a3f3"></i>').text("读取地理位置");
          } else {
            // 表单中只允许有一个动态控件
            $(item).remove();
            $.IShowError("提示", "同一个表单该字段唯一");
            return null;
          }
          break;
        case "FormCheckboxList": {
          var DefaultItems = [];
          var DesignProperties = FormControls[controlkey].DesignProperties;
          var isCheckbox = false;
          for (var i = 0; i < DesignProperties.length; i++) {
            switch (DesignProperties[i].Name) {
              case "DefaultItems": DefaultItems = DesignProperties[i].DefaultValue;
              case "IsCheckbox": isCheckbox = DesignProperties[i].DefaultValue;
            }
          }

          var $input = controlkey == "FormDropDownList" ? $("<select class='form-control form-group-margin'>").css("width", "100%") : $("<div class='row'>");
          $el.attr("data-DefaultItems", JSON.stringify(DefaultItems));
          $el.attr("data-isCheckbox", isCheckbox);
          var inputType = controlkey == "FormRadioButtonList" ? "radio" : "checkbox";
          var $select;
          for (var i = 0; i < DefaultItems.length; i++) {
            var id = $.IGuid();
            if (controlkey == "FormDropDownList") {
              $select = $("<option>" + DefaultItems[i] + "</option>");
              break;
            } else {
              $select = $('<input type="' + inputType + '"  id="' + id + '"/><label for="' + id + '">' + DefaultItems[i] + '</label>').prop("disabled", "disabled");
            }
            $input.append($select);
          }
          break;
        }; break;
        case "FormCheckbox": {// //  单选框
          var DefaultItems = [];
          var DesignProperties = FormControls[controlkey].DesignProperties;
          var isCheckbox = true;
          for (var i = 0; i < DesignProperties.length; i++) {
            switch (DesignProperties[i].Name) {
              case "DefaultItems": DefaultItems = DesignProperties[i].DefaultValue;
            }
          }

          var $input = controlkey == "FormDropDownList" ? $("<select class='form-control form-group-margin'>").css("width", "100%") : $("<div class='row'>");
          $el.attr("data-DefaultItems", JSON.stringify(DefaultItems));
          $el.attr("data-isCheckbox", isCheckbox);
          var $select;
          for (var i = 0; i < DefaultItems.length; i++) {
            var id = $.IGuid();
            if (controlkey == "FormDropDownList") {
              $select = $("<option>" + DefaultItems[i] + "</option>");
              break;
            } else {
              $select = $('<input type="checkbox"  id="' + id + '"/><label for="' + id + '">' + DefaultItems[i] + '</label>').prop("disabled", "disabled");
            }
            $input.append($select);
          }
          break;
        }; break;
        case "FormRadioButtonList":
        case "FormDropDownList":
          var DefaultItems = [];
          var DesignProperties = FormControls[controlkey].DesignProperties;
          for (var i = 0; i < DesignProperties.length; i++) {
            if (DesignProperties[i].Name == "DefaultItems") {
              DefaultItems = DesignProperties[i].DefaultValue;
              break;
            }
          }

          var $input = controlkey == "FormDropDownList" ? $("<select class='form-control form-group-margin'>").css("width", "100%") : $("<div class='row'>");
          $el.attr("data-DefaultItems", JSON.stringify(DefaultItems));
          var inputType = controlkey == "FormRadioButtonList" ? "radio" : "checkbox";
          var $select;
          for (var i = 0; i < DefaultItems.length; i++) {
            var id = $.IGuid();
            if (controlkey == "FormDropDownList") {
              $select = $("<option>" + DefaultItems[i] + "</option>");
              break;
            } else {
              $select = $('<input type="' + inputType + '"  id="' + id + '"/><label for="' + id + '">' + DefaultItems[i] + '</label>').prop("disabled", "disabled");
            }
            $input.append($select);
          }
          break;
        case "FormQuery":
        case "FormMultiQuery":
          $input = $('<div class="form-query-add" placeholder="选择已有表单的数据"></div><span><i class="ivu-icon ivu-icon-map" style="color:#8aaed1;font-size:20px!important"></i></span>');
          break;
        case "FormGridView":
          //添加子表控件
          if (!$parent.hasClass("layoutrow-item")) {
            $el.addClass("SheetGridView");
            var $table = $("<table class='table table-bordered'></table>");
            var $tr = $("<tr class='SheetGridView_tr'>");//
            for (var t = 0; t < 4; t++) {
              //默认4列
              if (t == 0) {
                $tr.append($("<td class='SheetGridView_td' placeholder='拖入左侧控件绘制子表'>"));
              } else {
                $tr.append($("<td class='SheetGridView_td'>"));
              }
            }
            var $editbtn = $('<button type="button" data-buttontype="editcontrol" class="btn btn-default btn-xs editcontrol"><span class="glyphicon icon-bianji"></span></button>');
            // var $addbtn = $('<button type="button" data-buttontype="addTd" class="btn btn-default btn-xs addtd"><span class="glyphicon icon-add"></span>添加记录</button>');
            var $addbtn = $('<p data-buttontype="addTd" class="addtd"><span class="glyphicon icon-add"></span>添加记录</p>');
            var $removebtn = $('<button type="button" data-buttontype="remomvecontrol" class="btn btn-default btn-xs remove btn-sheet-del"><span class="icon-sheet-del"><i class="ivu-icon ivu-icon-ios-trash-outline" style="color:#e97763;font-size:20px!important"></i></span></button>');
            //var $undrop = $("<p class='undrop' style='display:none;'>该控件不允许拖入子表</p>");
            $el.append($('<span class="col-sm-12" style="cursor:pointer">' + itemName + '</span>'));
            $el.append($("<div>").addClass("col-sm-12 SheetGridView_wrap").css({ "overflow-x": "auto", "width": "90%", "float": "none" }).append($table.append($tr)));
            $el.append($editbtn);
            $el.append($removebtn);
            $editbtn.click(function (e) {
              that.ControlElementSelected.apply(that, [$(this).parent(), e]);
            });
            $el.click(function (e) {
              that.ControlElementSelected.apply(that, [$(this), e]);
            });
            $addbtn.click(function () {

            });
            $removebtn.click(function () {
              that.RemoveControl($(this).parent());
            });
            $table.after($addbtn);//.after($undrop);

          } else {//布局里不能再添加子表控件
            $(item).remove();
          }
          this.SetDataFieldValue($el, datafield);

          return $el;
      }
      $input.addClass("notdrag");
      if ($parent.hasClass("SheetGridView_td")) {
        if (datafield.indexOf(".") == -1) {
          datafield = this.GetDataField($parent.closest("div[data-" + this.ControlKey + "='FormGridView']")) + "." + datafield;
        }
        if (controlkey == "FormCheckbox") {
          $el.append($('<span class="single-cb col-sm-12">' + itemName + '</span>'));
          $input.find("label").css({
            left: "50%", "margin-left": "-10px"
          }).text("");
        } else if (controlkey != this.SheetButton) {
          //出现两个创建人的bug
          datafield != that.CreatedBy && $el.append($('<span class="col-sm-12">' + itemName + '</span>'));
        }
        $el.append($('<div class="col-sm-12"></div>').append($input));
      } else {
        if (controlkey == "FormCheckbox" || controlkey == this.SheetButton) {
          $el.append($('<span class="col-sm-' + spanwith + '"></span>'));
        } else if (controlkey != this.SheetButton) {
          $el.append($('<span class="col-sm-' + spanwith + '">' + itemName + '</span>'));
        }
        $el.append($('<div class="col-sm-' + (12 - spanwith) + '"></div>').append($input));
      }

      $el.append($('<button type="button" data-buttontype="remomvecontrol" class="btn btn-default btn-xs remove"><span><i class="ivu-icon ivu-icon-ios-trash-outline" style="color:#e97763;font-size:20px!important"></i></span></button>').hide().click(function () {
        that.RemoveControl($(this).parent());
        return false;
      }));

      $el.hover(function () {
        $(this).css({ "background-color": "#DCF1FE" });
      }, function () {
        $(this).css({ "background-color": "#F1FAFF" });
      });
      $el.click(function (e) {
        that.ControlElementSelected.apply(that, [$(this), e]);
      });
      this.SetDataFieldValue($el, datafield);
      return $el;
    },

    //开发者修改编码
    ChangeDataFieldValueByDev: function () {
      if (!this.IsDevMode) return;
      if (this.CurrentSettingKey == this.CreatedBy
        || this.CurrentSettingKey == this.CreatedTime
        || this.CurrentSettingKey == this.ModifiedTime
        || this.CurrentSettingKey == this.Owner
        || this.CurrentSettingKey == this.OwnerDept
        || this.CurrentSettingKey == this.SeqNo
        || this.CurrentSettingKey == this.SequenceNo)
        return;
      var that = this;
      var oldDataField = that.CurrentSettingKey;
      var Settings = that.GetSettings(oldDataField);
      if (oldDataField.indexOf('.') > -1) {
        oldDataField = oldDataField.split('.')[1];
      }
      if (that.DataFieldModel) {
        that.$DataFieldEditor.find("input").val(oldDataField);

        //子表的话，需要以开发编码起步
        that.$DataFieldEditor.find("input").unbind("keyup.SheetGridView");
        if (Settings.ControlKey == "FormGridView") {
          that.$DataFieldEditor.find("input").bind("keyup.SheetGridView", function () {
            var val = $(this).val();
            if (val.indexOf(that.DevCode) != 0) {
              $(this).val(that.DevCode);
            }
            else {
              return false;
            }
          });
        }
        that.DataFieldModel.show();
      } else {
        that.$DataFieldEditor = $("<div>").append("<span style='margin: 0 29px 0 21px;'>控件编码</span>").append($("<input onkeyup='this.value != this.value.replace(/[^\\w\\.\\/]/ig, \"\")&&(this.value = this.value.replace(/[^\\w\\.\\/]/ig, \"\"))' >").val(oldDataField).css({ "width": "220", "height": "32px", "margin": "30px 0" }));
        //子表的话，需要以开发编码起步
        that.$DataFieldEditor.find("input").unbind("keyup.SheetGridView");
        if (Settings.ControlKey == "FormGridView") {
          that.$DataFieldEditor.find("input").bind("keyup.SheetGridView", function () {
            var val = $(this).val();
            if (val.indexOf(that.DevCode) != 0) {
              $(this).val(that.DevCode + val);
            }
          });
        }
        var Actions = [{
          Text: "确定",
          Theme: 'btn_ok',
          CallBack: function () {
            var newDataField = that.$DataFieldEditor.find("input").val().replace(/[^\w\.]/ig, "").replace(/\./g, "");
            if (!$.IValidateStrictText(newDataField)) {
              $.IShowError("编码不符合规范！");
              return;
            }

            if ($.isEmptyObject(newDataField)
              || newDataField == that.DevCode) {
              $.IShowError("编码不能为空！");
              return;
            }
            //编码不能是纯数字
            var reg = /^[0-9]*$/;
            if (reg.test(newDataField)) {
              $.IShowWarn('编码不能为纯数字');
              return;
            }
            if (that.CheckSchemaCodeDuplicated.apply(that, [that.CurrentSettingKey, newDataField])) {
              that.DataFieldModel.hide();
            }
          }
        },
        {
          Text: '取消',
          Theme: 'btn_cancel',
          CallBack: function () {
            that.DataFieldModel.hide();
          }
        }];

        if (Settings.ControlKey != this.SheetButton) {
          //"设置字段编码", this.$DataFieldEditor, Actions
          this.DataFieldModel = new $.IModal({
            Title: '设置控件编码',
            Width: 420,
            // Height: 205,
            ShowBack: true,
            HasIframe: false,
            Content: that.$DataFieldEditor,
            ToolButtons: Actions,
            ContentUrl: ''
          });
        } else {
          this.DataFieldModel = new $.IModal({
            Title: '设置控件编码',
            Width: 420,
            // Height: 205,
            ShowBack: true,
            HasIframe: false,
            Content: that.$DataFieldEditor,
            ToolButtons: Actions,
            ContentUrl: ''
          });
        }
      }
    },

    //检查编码是否重复
    CheckSchemaCodeDuplicated: function (oldDataField, newDataField) {
      if (newDataField.length > 40) {
        $.IShowError("字段编码太长");
        return false;
      }
      //字段编码：检验重复
      var Settings = this.GetSettings(oldDataField);
      var $control = this.GetControlElement(oldDataField);

      //元素里记录的datafield
      var elementDatafield = $control.attr("data-datafield");
      if (elementDatafield && elementDatafield.indexOf(".") > -1) {
        newDataField = elementDatafield.split('.')[0] + "." + newDataField;
      }
      if (oldDataField.toLowerCase() == newDataField.toLowerCase()) return true;

      var isFound = false;
      var allControls = (elementDatafield && elementDatafield.indexOf(".") < 0) ? this.$SheetContent.find("div[data-datafield]:not([data-datafield*='.'])") : $control.closest(".SheetGridView_tr").find("div[data-datafield]");

      for (var i = 0; i < allControls.length; i++) {
        if ($(allControls[i]).attr("data-datafield").toLowerCase() == newDataField.toLowerCase()) {
          isFound = true;
          break;
        }
      }

      var msg = "已经存在编码";
      if (!isFound) {
        this.Requst(this.Action_CheckCodeDuplicated, {
          DataField: newDataField
        }, function (data) {
          if (!data.Successful) {
            msg = data.ErrorMessage;
            isFound = true;
          }
        }, false)
      }

      if (isFound) {
        $.IShowError(msg);
        return false;
      } else {
        this.Controlmanagers[this.CurrentSettingKey].$SheetControlPropertysPanel.find("[propertyname='DataField']").find("div.property-input").html(newDataField);
        this.SetDataFieldValue($control, newDataField);
        this.CurrentSettingKey = newDataField;
        this.$SummaryItems.find("label[data-value='" + oldDataField + "']").attr("data-value", newDataField);
        this.$NameItems.find("label[data-value='" + oldDataField + "']").attr("data-value", newDataField);
        // if (this.IsDevMode) {
        //   this.$DeleteItems.find("label[data-value='" + oldDataField + "']").attr("data-value", newDataField);
        // }
        //修改编码后对于绑定规则编辑器的控件要重新绑定
        var controlkey = $control.attr('data-controlkey');
        if (controlkey == 'FormTextBox' ||
          controlkey == 'FormTextArea' ||
          controlkey == 'FormNumber' ||
          controlkey == 'FormDateTime' ||
          controlkey == 'FormQuery' ||
          controlkey == 'FormMultiQuery') {
          this.LoadPropertySetting(newDataField);
        }
        return true;
      }
    },

    //选中控件
    ControlElementSelected: function ($el, event) {
      if (event && event.stopPropagation != null) {
        event.stopPropagation();
      }
      //如果控件已经选中则不要再次选中
      if ($el.hasClass("drop-item")) {
        return;
      }

      //清除所有选中控件的选中状态
      this.$SheetContent.find(".drop-item").children("button[data-buttontype='remomvecontrol']").hide();
      this.$SheetContent.find(".drop-item").children("button[data-buttontype='editcontrol']").hide();
      this.$SheetContent.find(".drop-item").children("button[data-buttontype='changecontrol']").hide();
      this.$SheetContent.find(".drop-item").removeClass("drop-item");
      //处理一行两列控件以及里面的控件hover和不hover的时候背景色设置
      this.$SheetContent.find('.layoutrow').css({ "background-color": "#f1faff" });

      //设置当前控件的选中状态
      $el.addClass("drop-item");
      $el.children("button[data-buttontype='remomvecontrol']").show();
      $el.children("button[data-buttontype='changecontrol']").show();
      $el.children("button[data-buttontype='editcontrol']").show();

      if ($el.attr("data-" + this.ControlKey) == "FormGridView") {
        this.$SelectedGridView = $el;
      }

      // if ($el.attr("data-" + this.ControlKey) == this.TowColsKey) return;

      if ($el.hasClass(this.PageHeader) || $el.hasClass(this.DesControl)) {
        //标题栏
        $.LoadPageHeaderProperty(this, $el);
      } else if ($el.hasClass(this.SheetButton)) {
        $("#SheetPropertys").collapse("hide");
        $("#SheetControlPropertysPanel").show();
        $("#SheetControlPropertys").collapse("show");

        this.PropertySettingZone.html("");
        var $groupDiv = $("<div></div>").addClass("form-group clearfix");
        $groupDiv.append($("<label>标题</label>"));
        var $valInput = $("<input>").attr("forid", $el.attr("ID")).val($el.find("strong").text());
        $groupDiv.append($("<div>").addClass("controls").append($valInput));
        this.PropertySettingZone.append($groupDiv);
        $valInput.keyup(function () {
          var forID = $(this).attr("forid");
          $("#" + forID).find("strong").text($(this).val());
        });
      } else if ($el.attr("data-controlkey") == "FormBoList") {
        //关联列表属性
      } else if ($el.attr("data-controlkey") == "FormSns") {
        // 动态控件没有控件属性
        this.PropertySettingZone.html("");
      } else {
        var dataField = this.GetDataField($el);
        //加载控件属性
        this.LoadPropertySetting.apply(this, [dataField]);
      }
    },

    //加载控件属性
    LoadPropertySetting: function (datafield) {
      if ((!this.CurrentSettingKey && this.CurrentSettingKey == datafield) || !datafield) {
        return;
      }
      var that = this;
      that.$btn_SheetControlProperty.click();
      that.$SheetControlPropertysPanel.getNiceScroll(0).doScrollTop(0, 0); // Scroll Y Axis
      // 读取当前配置加载配置
      var Settings = this.GetSettings(datafield);
      if ($.isEmptyObject(Settings)) {
        return;
      }
      //记录当前设置的控件
      that.CurrentSettingKey = datafield;
      setTimeout(() => {
        // 清空原来的配置
        that.$SheetControlPropertysPanel.empty();
        var controlManager = new $.ControlMana(
          this,
          datafield,
          Settings
        );
        that.Controlmanagers[this.CurrentSettingKey] = controlManager;
      }, 300);
    },
    UpdateGridViewNameItem: function (dataField) {
      if (dataField == this.CreatedBy) {
        dataField = "CreatedBy";
      }

      var gridViews = this.$SheetContent.find("div[data-controlkey='FormGridView']");
      gridViews.each(function () {
        var nameItem = $(this).attr("data-nameitems");
        if (nameItem) {
          var items = nameItem.split(",");
          if ($.inArray(dataField, items) > -1) {
            var newNameItem = "";
            for (var i = 0; i < items.length; i++) {
              if (items[i] != dataField) {
                newNameItem += items[i] + ",";
              }
            }
            $(this).attr("data-nameitems", newNameItem);
          }
        }
      });
    },
    //执行删除操作
    DoRemoveControl: async function ($el, needValidate) {
      var that = this;
      var $sheetContent = $("#sheetContent");
      // var $tipPic = $('<img src="./huizhi.svg" id="tipPic">');
      if (needValidate == void 0 || needValidate == true) {
        //删除校验
        //配置新的规则后删除字段校验做了调整
        var flag = await that.RemoveControlValidate($el)
        // debugger
        if (!flag) {
          return;
        }
        var Actions = [{
          Key: "btn_OK",
          Text: "删除",
          Theme: 'btn_delete',
          CallBack: async function () {
            await that.RemoveControl.apply(that, [$el, false]);
            //拖拽的时候判断是否有控件在中间区域，如果没有，tipimg就出现
            if ($sheetContent.find(".row").length == 0) {
              //$sheetContent.append($tipPic);
            }
            that.DeleteModal.hide();
            that.$SheetControlPropertysPanel.empty();
          }
        },
        {
          Text: '取消',
          Theme: 'btn_cancel',
          CallBack: function () {
            that.DeleteModal.hide();
          }
        }];
        var $contentDelete = $('<div style="text-align:center;"><p style="margin-bottom:15px;"><i class="ivu-icon ivu-icon-information-circled" style="font-size:52px!important;color:#f0ad4e;margin-top:15px;"></i></p><p style="font-size:20px;color:#333;margin-bottom:15px">删除控件</p><p style="font-size:14px;color:#666">该控件所有数据同时被删除，且无法恢复，确定删除？</p></div')
        that.DeleteModal = new $.IModal({
          Title: '删除控件',
          Width: 420,
          Height: 233,
          ShowBack: true,
          HasIframe: false,
          Content: $contentDelete,
          ToolButtons: Actions,
          ContentUrl: ''
        });
        return;
      }

      //布局控件
      if ($el.hasClass("layoutrow")) {
        var $controls = $el.find("div.sheet-control");
        $controls.each(function () {
          var dataField = that.GetDataField($(this));
          that.RemoveFields[dataField] = that.GetSettings(dataField);
          that.$SummaryItems.find("label[data-value='" + dataField + "']").remove();
          that.$NameItems.find("label[data-value='" + dataField + "']").remove();
          //从子表名称配置中删除
          that.UpdateGridViewNameItem(dataField);
          // if (that.IsDevMode) {
          //   that.$DeleteItems.find("label[data-value='" + dataField + "']").remove();
          // }
        });
      } else if (!$el.hasClass(this.PageHeader) && !$el.hasClass(this.DesControl)) {
        var $parent = $el.parent();
        //控件
        var dataField = this.GetDataField($el);
        if (dataField) {
          //CreateBy.FullName-》CreateBy
          var iDataField = dataField;
          if (iDataField == this.CreatedBy) {
            iDataField = "CreatedBy";
          }

          //如果是关联表单配置的携带或者关联属性控件要从对应的关联表单中删除配置信息

          this.RemoveFields[dataField] = that.GetSettings(dataField);
          if ($parent.hasClass("SheetGridView_td") && $parent.parent().find(".SheetGridView_td").length > 1) {
            //子表中控件删除时候先判断子表是否配置了矩阵模式，如果是举证模式且矩阵模式显示字段配置了该控件，则修改子表矩阵模式显示字段
            var $parentGridView = $parent.closest(".SheetGridView");
            var displayFields = $parentGridView.attr("data-displayfields");
            if (displayFields && displayFields.indexOf(dataField) > -1) {
              displayFields = displayFields.replace(dataField + ";", "");
              $parentGridView.attr("data-displayfields", displayFields);
            }
            $parent.remove();
          }
          this.$SummaryItems.find("label[data-value='" + iDataField + "']").remove();
          this.$NameItems.find("label[data-value='" + iDataField + "']").remove();
          this.UpdateGridViewNameItem(dataField);
          // if (this.IsDevMode) {
          //   this.$DeleteItems.find("label[data-value='" + iDataField + "']").remove();
          // }
        }
      }
      //删除元素
      $el.detach();
      this.$SheetContent.click();
    },
    //删除控件,先判断能不能删除
    RemoveControl: async function ($el, needValidate) {
      var that = this;
      var fields = [];
      if (!$el.hasClass("layoutrow")) {
        var field = that.GetDataField($el);
        //描述和标题控件没有field
        if (field) {
          if (field.toLowerCase() == 'createdby.fullname') {
            field = field.split('.')[0];
          }
          fields.push(field);
        }
      } else if ($el.hasClass('delete-limit')) {
        if ($el.find('.sheet-control').length > 0) {
          Message.info('布局中有控件，不能删除');
        } else {
          that.DoRemoveControl($el, false);
        }
        return;
      } else {
        var ctrls = $el.find('.sheet-control');
        for (var i = 0; i < ctrls.length; i++) {
          fields.push(that.GetDataField($(ctrls[i])));
        }
      }

      //先判断字段能不能删除,如果当前用户不是开发者则不能删除SaaS表单的字段
      var existPreInstalledFields = false;
      for (var i = 0; i < fields.length; i++) {
        if ($.inArray(fields[i], that.PreInstalledFields) > -1) {
          existPreInstalledFields = true;
          break;
        }
      }
      if (existPreInstalledFields) {
        //不可以删除
        // $.IShowWarn("不允许删除预装字段");
        that.ShowRemoveValidateModal("提示", "不允许删除预装字段");
      } else {
        that.DoRemoveControl($el, needValidate);
      }
    },

    //删除控件校验
    RemoveControlValidate: async function ($el) {

      //删除控件时候，如果其他字段控件的显示规则或者计算规则中配置了当前要删除的控件，则清除目标字段的规则
      var that = this;
      //所有配置了计算规则的控件
      var $ctrlComputation = this.$SheetContent.find('[data-computationrule]');
      //所有配置了显示规则的控件
      var $ctrlDisplay = this.$SheetContent.find('[data-displayrule]');
      //所有配置了关联查询过滤的控件
      var $ctrlAssociationFilter = this.$SheetContent.find('[data-associationfilter]');

      var displayRuleCtrls = [];//显示规则配置了当前控件的字段
      var displayRuleCtrlNames = [];//显示规则配置了当前控件的字段名称
      var computationRuleCtrls = [];//计算规则配置了当前控件的字段
      var computationRuleCtrlNames = [];//计算规则配置了当前控件的字段名称
      var associationRuleCtrls = [];//关联查询过滤规则中配置了当前控件的字段
      var associationRuleCtrlNames = [];//关联查询过滤规则中配置了当前控件的字段名称

      if ($el.hasClass('layoutrow') || $el.hasClass('SheetGridView')) {
        var $controls = $el.find('div.sheet-control');
        //布局控件中有非自定义字段时不允许删除
        for (var i = 0, len = $controls.length; i < len; i++) {
          var dataField = that.GetDataField($($controls[i]));
          if (!that.IsCustomControl(dataField)) {
            //$.IShowError('布局控件中含有非自定义字段，不允许删除');
            that.ShowRemoveValidateModal("提示", "布局控件中含有非自定义字段，不允许删除");
            return false;
          }
          var gridField = dataField.slice(0, dataField.indexOf('.'));
          //找是否在计算规则中配置了控件
          for (var j = 0; j < $ctrlComputation.length; j++) {
            var $ctrl = $($ctrlComputation[j]);
            var ctrlField = that.GetDataField($($ctrl));
            //目标字段跟要删除的字段在同一个子表则continue
            if (ctrlField.indexOf(gridField) > -1) {
              continue;
            }
            var computationRule = $ctrl.attr('data-computationrule');
            if (computationRule && computationRule != '')
              computationRule = JSON.parse(computationRule).Rule;
            if (computationRule != void 0 && computationRule != '' && computationRule.indexOf('{' + dataField + '}') > -1) {
              computationRuleCtrls.push($ctrl);
              var ctrlName = $ctrl.attr("data-DisplayName");
              if ($.inArray(ctrlName, computationRuleCtrlNames) < 0) {
                computationRuleCtrlNames.push(ctrlName);
              }
            }
          }
          //找是否在显示规则中配置了控件
          for (var k = 0; k < $ctrlDisplay.length; k++) {
            var $ctrl = $($ctrlDisplay[k]);
            var displayRule = $ctrl.attr('data-displayrule');
            if (displayRule != void 0 && displayRule.indexOf('{' + dataField + '}') > -1) {
              displayRuleCtrls.push($ctrl);
              var ctrlName = $ctrl.attr("data-DisplayName");
              if ($.inArray(ctrlName, displayRuleCtrlNames) < 0) {
                displayRuleCtrlNames.push(ctrlName);
              }
            }
          }
          //找是否在关联查询过滤规则中配置了控件
          for (var l = 0; l < $ctrlAssociationFilter.length; l++) {
            var $ctrl = $($ctrlAssociationFilter[l]);
            var associationRule = $ctrl.attr('data-associationfilter');
            if (associationRule != void 0 && associationRule.indexOf('{' + dataField + '}') > -1) {
              associationRuleCtrls.push($ctrl);
              var ctrlName = $ctrl.attr('data-displayname');
              if ($.inArray(ctrlName, associationRuleCtrls) < 0) {
                associationRuleCtrlNames.push(ctrlName);
              }
            }
          }
        }

        //如果是子表要判断当前表单是否有关联表单控件关联了要删除的子表
        if ($el.hasClass('SheetGridView')) {
          var dataField = $el.attr('data-datafield');
          var formQuery = this.$SheetContent.find('div[data-boschemacode="' + dataField + '"]');
          if (formQuery.length > 0) {
            // $.IShowError("存在关联该子表的关联表单控件，请先修改后删除");
            this.ShowRemoveValidateModal("提示", "存在关联该子表的关联表单控件，请先修改后删除");
            return false;
          }
        }
      } else if (!$el.hasClass(this.PageHeader) && !$el.hasClass(this.DesControl)) {
        //控件
        var dataField = this.GetDataField($el);
        if (dataField) {
          //CreateBy.FullName-》CreateBy
          var iDataField = dataField;
          if (iDataField == this.CreatedBy) {
            iDataField = "CreatedBy";
          }
          if (!this.IsCustomControl(iDataField)) {
            // $.IShowError("该字段为系统预设字段，不允许删除");
            this.ShowRemoveValidateModal("提示", "该字段为系统预设字段，不允许删除");
            return false;
          }

          // debugger
          //找是否在计算规则里配置
          for (var j = 0; j < $ctrlComputation.length; j++) {
            var $ctrl = $($ctrlComputation[j]);
            var computationRule = $ctrl.attr('data-computationrule');
            if (computationRule != void 0 && computationRule.indexOf('{' + iDataField + '}') > -1) {
              computationRuleCtrls.push($ctrl);
              var ctrlName = $ctrl.attr("data-DisplayName");
              if ($.inArray(ctrlName, computationRuleCtrlNames) < 0) {
                computationRuleCtrlNames.push(ctrlName);
              }
            }
          }
          //找是否在隐藏规则中配置了控件
          for (var k = 0; k < $ctrlDisplay.length; k++) {
            var $ctrl = $($ctrlDisplay[k]);
            var displayRule = $ctrl.attr('data-displayrule');
            if (displayRule != void 0 && displayRule.indexOf('{' + iDataField + '}') > -1) {
              displayRuleCtrls.push($ctrl);
              var ctrlName = $ctrl.attr("data-DisplayName");
              if ($.inArray(ctrlName, displayRuleCtrlNames) < 0) {
                displayRuleCtrlNames.push(ctrlName);
              }
            }
          }
          //找是否在关联查询过滤规则中配置了控件
          for (var l = 0; l < $ctrlAssociationFilter.length; l++) {
            var $ctrl = $($ctrlAssociationFilter[l]);
            var associationRule = $ctrl.attr('data-associationfilter');
            if (associationRule != void 0 && associationRule.indexOf('{' + dataField + '}') > -1) {
              associationRuleCtrls.push($ctrl);
              var ctrlName = $ctrl.attr('data-displayname');
              if ($.inArray(ctrlName, associationRuleCtrls) < 0) {
                associationRuleCtrlNames.push(ctrlName);
              }
            }
          }
        }
      }
      //判断表单提交规则中是否配置了该字段
      var dataField = this.GetDataField($el);
      var existInSubmitRule = this.CheckFieldExistInSubmitRule(dataField);

      // if ($.BizSheet.SubmitRules) {
      //   var df = this.GetDataField($el);
      //   for (var i = 0; i < that.SubmitRules.length; i++) {
      //     var rule = that.SubmitRules[i].Rule;
      //     if (rule.indexOf(df) > -1) {
      //       existInSubmitRule = i;
      //       break;
      //     }
      //   }
      // }
      //判断业务规则中是否配置了该字段
      var existInBusinessRule = -1;
      if ($.BizSheet.BusinessRules) {
        // var df = this.GetDataField($el);
        // for (var i = 0; i < that.BusinessRules.length; i++) {
        //   var submit = that.BusinessRules[i].EffectRule;
        //   var rollback = that.BusinessRules[i].CancelRule;
        //   if (submit.indexOf(df) && submit.indexOf("." + df) == -1 || rollback.indexOf(df) > -1) {
        //     existInBusinessRule = i;
        //     break;
        //   }
        // }
      }

      if (displayRuleCtrls.length > 0) {
        var names = '【' + displayRuleCtrlNames.join('】,【') + '】';
        var info = names + "控件的隐藏条件中配置了此字段，请先修改对应条件";
        // $.IShowError();
        this.ShowRemoveValidateModal("提示", info);
        return false;
      } else if (computationRuleCtrls.length > 0) {
        var names = '【' + computationRuleCtrlNames.join('】,【') + '】';
        var info = names + "控件的计算公式中配置了此字段，请先修改对应公式";
        // $.IShowError(info);
        this.ShowRemoveValidateModal("提示", info);
        return false;
      } else if (associationRuleCtrls.length > 0) {
        var names = '【' + associationRuleCtrlNames.join('】,【') + '】';
        var info = names + "控件的数据范围限定中配置了此字段，请先修改对应控件";
        // $.IShowError(names + '');
        this.ShowRemoveValidateModal("提示", info);
        return false;
      } else if (existInSubmitRule > -1) {
        var info = "【表单提交校验】中配置了此字段,请先从第【" + (existInSubmitRule + 1) + "】行校验条件中去掉此字段";
        // $.IShowError();
        this.ShowRemoveValidateModal("提示", info);
        return false;
      } else if (existInBusinessRule > -1) {
        var info = "【业务规则】中配置了此字段,请先从第【" + (existInBusinessRule + 1) + "】行规则中去掉此字段";
        // $.IShowError(info);
        this.ShowRemoveValidateModal("提示", info);
        return false;
      } else {
        var df = this.GetDataField($el);
        var delResult = await HTTP.getDelTips({ appId: this.SheetCode, controlId: df })
        if (delResult.tips === null) {
          return true
        }
        else {
          this.ShowRemoveValidateModal("提示", delResult.tips);
          return false
        }

      }
    },

    //删除控件时，校验信息弹窗
    ShowRemoveValidateModal(title, content) {
      var that = this;
      title = title || "提示";
      var actions = [{
        Text: "确定",
        Theme: "btn_ok",
        CallBack: function () {
          that.removeValidateModal.hide();
        }
      }, {
        Text: "取消",
        Theme: "btn_cancel",
        CallBack: function () {
          that.removeValidateModal.hide();
        }
      }];
      var $content = $('<div style="text-align:center;"><p style="margin-bottom:15px;"><i class="icon-exclamation-circle" style="font-size:52px;color:#f0ad4e;margin-top:15px;"></i></p><p style="font-size:20px;color:#333;margin-bottom:15px"></p><p style="font-size:14px;color:#666">' + content + '</p></div')
      that.removeValidateModal = new $.IModal({
        Title: title,
        Width: 420,
        Height: 233,
        ShowBack: true,
        HasIframe: false,
        Content: $content,
        ToolButtons: actions,
        ContentUrl: ""
      });
    },
    //检查字段是否配置在提交校验规则中,如果不存在返回-1，否则返回规则序号
    CheckFieldExistInSubmitRule: function (dataField) {
      var ruleIndex = -1;
      var that = this;
      var rules = [];
      if ($.BizSheet.SubmitRulesUpdated) {
        //规则修改过，从$.BizSheet.SubmitRules中读
        for (var i = 0; i < $.BizSheet.SubmitRules.length; i++) {
          var rule = $.BizSheet.SubmitRules[i].Rule;
          if (rule.indexOf(dataField) > -1) {
            return i;
          }
        }
      } else {
        //规则没有修改过,直接从SheetDesigner.SubmitRules中读
        for (var i = 0; i < that.SubmitRules.length; i++) {
          var rule = that.SubmitRules[i].Rule;
          if (rule.indexOf(dataField) > -1) {
            return i;
          }
        }
      }
      return -1;
    },
    //ERROR 可能要放到后台校验？
    //检验字段是否配置在业务规则中
    CheckFieldExistInBusinessRule: function (dataField, rule) {
      // return false;
    },

    //非自定义字段不能删除
    IsCustomControl: function (dataField) {
      var isCustom = true;
      if (!this.IsDevMode && this.PreInstalledFields && this.PreInstalledFields.length > 0) {
        return $.inArray(dataField, this.PreInstalledFields) > -1;
      }
      return isCustom;
    },

    // // Error : 控件分类得重新设计
    // // 加载左边的控件列表
    // LoadSheetControls: function () {
    //   this.IsLoaded--;
    //   //删除所有节点
    //   this.$Controls.empty();

    //   // === 布局控件 ===
    //   var $controlHeader = $("<div class='control-header'>布局控件</div>");
    //   this.$Controls.append($controlHeader);

    //   var $ul = $("<ul class='nav'>");
    //   this.$Controls.append($ul);

    //   var $li = $("<li>");
    //   $ul.append($li);
    //   var $control = $(' <a href="javascript:void(0);" class="drag issystem" title="标题"><i class="fa fa-tumblr"></i> 标题</a>').attr("data-" + this.ControlKey, this.PageHeader);
    //   $li.append($control);

    //   var $control = $(' <a href="javascript:void(0);" class="drag issystem" title="一行两列"><i class="fa fa-columns"></i> 一行两列</a>').attr("data-" + this.ControlKey, this.TowColsKey);
    //   $li.append($control);


    //   $li = $("<li>");
    //   $ul.append($li);
    //   $control = $(' <a href="javascript:void(0);" class="drag issystem" title="描述说明"><i class="fa fa-font"></i> 描述说明</a>').attr("data-" + this.ControlKey, this.DesControl);
    //   $li.append($control);

    //   $control = $(' <a href="javascript:void(0);" class="drag" title="子表"><i class="fa fa-table"></i> 子表</a>').attr("data-" + this.ControlKey, "FormGridView");
    //   $li.append($control);



    //   // === 系统控件 ===
    //   $controlHeader = $("<div class='control-header'>系统控���</div>");
    //   this.$Controls.append($controlHeader);
    //   $ul = $("<ul class='nav'>");
    //   this.$Controls.append($ul);

    //   $li = $("<li>");
    //   $ul.append($li);
    //   var $control = $(' <a href="javascript:void(0);" class="drag issystem" title="流水号"><i class="fa fa-barcode"></i> 流水号</a>').attr("data-" + this.ControlKey, "FormSeqNo").attr("data-" + this.DataFieldKey, this.SeqNo);
    //   $li.append($control);

    //   $control = $(' <a href="javascript:void(0);" class="drag issystem" title="创建人"><i class="fa fa-user"></i> 创建人</a>').attr("data-" + this.ControlKey, this.FormLabelKey).attr("data-" + this.DataFieldKey, this.CreatedBy);
    //   $li.append($control);

    //   $li = $("<li>");
    //   $ul.append($li);
    //   $control = $(' <a href="javascript:void(0);"class="drag issystem" title="拥有者"><i class="fa fa-user"></i> 拥有者</a>').attr("data-" + this.ControlKey, this.FormUserKey).attr("data-" + this.DataFieldKey, this.Owner);
    //   $li.append($control);

    //   $control = $(' <a href="javascript:void(0);" class="drag issystem" title="所属部门"><i class="fa fa-sitemap"></i> 所属部门</a>').attr("data-" + this.ControlKey, this.FormUserKey).attr("data-" + this.DataFieldKey, this.OwnerDept);
    //   $li.append($control);

    //   $li = $("<li>");
    //   $ul.append($li);
    //   $control = $(' <a href="javascript:void(0);" class="drag issystem" title="创建时间"><i class="fa fa-calendar-o"></i> 创建时间</a>').attr("data-" + this.ControlKey, this.FormLabelKey).attr("data-" + this.DataFieldKey, this.CreatedTime);
    //   $li.append($control);
    //   //新增修改时间控件
    //   $li = $("<li>");
    //   $ul.append($li);
    //   $control = $(' <a href="javascript:void(0);" class="drag issystem" title="修改时间"><i class="fa fa-calendar"></i> 修改时间</a>').attr("data-" + this.ControlKey, this.FormLabelKey).attr("data-" + this.DataFieldKey, this.ModifiedTime);
    //   $li.append($control);

    //   // === 通用控件 ===
    //   $controlHeader = $("<div class='control-header'>通用控件</div>");
    //   this.$Controls.append($controlHeader);
    //   $ul = $("<ul class='nav'>");
    //   this.$Controls.append($ul);

    //   //加载控件
    //   var i = 0;
    //   for (var key in FormControls) {
    //     if (key == this.SheetLabelKey
    //       || key == "FormBoList"
    //       || key == "FormSns"
    //       || key == "FormSeqNo"
    //       || key == "FormTaskTips"
    //       || key == "FormGridView"
    //       || key == "FormComment"
    //     ) continue;
    //     if (!FormControls[key].Designable) continue;

    //     if (i % 2 == 0) {
    //       $li = $("<li>");
    //       $ul.append($li);
    //     }

    //     var $control = $(' <a href="javascript:void(0);" class="drag"><i class="fa ' + FormControls[key].Icon + '"></i> ' + (FormControls[key].Text || key) + '</a>').attr("data-" + this.ControlKey, key);
    //     $control.attr("title", (FormControls[key].Text || key));
    //     $li.append($control);
    //     i++;
    //   }
    //   this.IsLoaded++;
    // },

    // 加载表单名称、表单摘要、删除字段
    LoadSummary: function (items, $ItemEl) {
      // debugger
      if (!items) return;
      var SummaryArray = items;
      if (!$.isArray(items)) {
        items = items.replace(/}{/g, ";").replace(/{/g, "").replace(/}/g, "");
        SummaryArray = items.split(";");
      }

      $ItemEl.empty(); // 清空选项
      for (var i = 0; i < SummaryArray.length; i++) {
        this.AddSummaryItem(SummaryArray[i], $ItemEl, false);
      }
    },

    //添加摘要
    AddSummaryItem: function (datafield, $item, showCloseIcon) {
      //CreateBy.FullName-》CreateBy
      var that = this;
      var idatafield = datafield;
      if (idatafield == "CreatedBy") {
        idatafield = that.CreatedBy;
      }

      var $el = that.GetControlElement(idatafield);
      var displayName = that.GetDataFieldDisplayName($el) || idatafield;
      var labelInfo = showCloseIcon ? "label-info-icon" : "label-info";
      var $label = $("<label class='label " + labelInfo + "'>" + displayName + "</label>").attr("data-value", datafield);
      $item.append($label);
      if (showCloseIcon) {
        $label.click(function () {
          var field = $(this).attr("data-value");
          $(this).remove();
          if (that.SummarySelector) {
            that.SummarySelector.find("input[data-value='" + field + "']").prop("checked", false);
            that.SummarySelector.find("input[data-type='all']").prop("checked", false); //取消"全选"选中状态
          } else {
            that.$childNameSelectorBOX.find("input[data-value='" + field + "']").prop("checked", false);
            that.$childNameSelectorBOX.find("input[data-type='all']").prop("checked", false); //取消"全选"选中状态
          }
          return false;
        });
      }
    },

    // 初始化权限
    InitInheritObjectSelect: function (noLoad) {
      if (this.SingletonModule) {
        // 无列表表单不继承权限
        if (this.$InheritObject.children().length == 0) {
          this.$InheritObject.append('<option value="false" selected="true">所有用户可查看全部数据</option>');
        }
      } else {
        var boSchemaCodes = [];
        this.$SheetContent.find('[data-controlkey="FormQuery"],[data-controlkey="FormMultiQuery"]').each(function (i) {
          var boSchemaCode = $(this).attr("data-boschemacode");
          if ($.inArray(boSchemaCode, boSchemaCodes) < 0) {
            boSchemaCodes.push(boSchemaCode);
          }
        });

        if (typeof (noLoad) == "undefined" || noLoad == true) {
          var existCodes = [];
          for (var code in this.PublishedSchemas) {
            existCodes.push(code);
          }

          var needRequestData = false;//标识是否需要请求后台
          for (var i = 0; i < boSchemaCodes.length; i++) {
            if ($.inArray(boSchemaCodes[i], existCodes) < 0) {
              needRequestData = true;
              break;
            }
          }

          if (needRequestData) {
            this.LoadPublishedSchemas(boSchemaCodes, this.InitInheritObjectSelect);
            return;
          }
        }

        this.$InheritObject.empty();
        this.$InheritObject.append('<option value="">用户根据角色权限查看数据</option>');
        this.$InheritObject.append('<option value="false">所有用户可查看全部数据</option>');
        for (var i = 0, len = boSchemaCodes.length; i < len; i++) {
          var boSchemaCode = boSchemaCodes[i];
          var displayName = "";
          if (!$.isEmptyObject(this.PublishedSchemas)) {
            for (var code in this.PublishedSchemas) {
              if (code == boSchemaCode) {
                displayName = this.PublishedSchemas[code].DisplayName;
              }
            }
          }

          if (displayName != "") {
            this.$InheritObject.append('<option value="' + boSchemaCode + '">与【' + displayName + '】表单数据权限一致</option>');
          }
        }
        if (this.EnableDataAcl) {
          this.$InheritObject.val(this.DataAclInheritedFrom);
        } else {
          this.$InheritObject.val("false");
        }
        this.$InheritObject.DropDownList({
          Width: "100%"
        });

        //属性面板滚动的时候隐藏所有下拉
        this.$SheetPropertysPanel.scroll(function () {
          $("ul.drop-list.drop-list_s").hide();
        });
        this.$SheetControlPropertysPanel.scroll(function () {
          $("ul.drop-list.drop-list_s").hide();
        });


        //非开发者安装的表单不允许修改“数据权限”
        if (!this.IsDevMode && this.IsInstalledSchema) {
          var dropdown = this.$InheritObject.prev();
          dropdown.find('.drop-handle').css('background-color', 'rgb(235,235,228)').off('click');
          dropdown.find('.drop-btn').css('background-color', 'rgb(235,235,228)')
        }
      }
    },

    // 根据表单编码获取已发布的表单
    //schemaCodes:要查询的表单编码数组
    //callBack:请求完成执行的回调
    LoadFiles: function (param, callBack) {
      var that = this;

      HTTP.LoadFile({ appId: param.schemaCodes, controlId: param.controlId }).then((data) => {
        if (data.code == 0) {
          var schemas = data.info;
          for (var i = 0; i < schemas.length; i++) {
            that.PublishedSchemas[schemas[i].fileId] = schemas[i];
          }
          if ($.isFunction(callBack)) {
            callBack.apply(that);
          }
        }
      })
    },



    // 根据表单编码获取已发布的表单
    //schemaCodes:要查询的表单编码数组
    //callBack:请求完成执行的回调
    LoadPublishedSchemas: function (schemaCodes, callBack) {
      var that = this;
      var existCodes = [];

      //如果that.PublishedSchemas中已经存在的Schema则不要再请求
      for (var code in that.PublishedSchemas) {
        existCodes.push(code);
      }

      var requestCodes = [];
      for (var i = 0; i < schemaCodes.length; i++) {
        if ($.inArray(schemaCodes[i], existCodes) < 0) {
          requestCodes.push(schemaCodes[i]);
        }
      }
      console.log(schemaCodes);

      HTTP.LoadPublishedSchemas(schemaCodes).then((data) => {
        //data={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"PublishedSchemas":[]}};
        if (data.code == 0) {

          var schemas = data.data.schemas;
          for (var i = 0; i < schemas.length; i++) {
            that.PublishedSchemas[schemas[i].SchemaCode] = schemas[i];
            console.log(that.PublishedSchemas);
          }
          if ($.isFunction(callBack)) {
            callBack.apply(that);
          }
        }
      })
      // that.Requst(that.Action_LoadPublishedSchemas, { Codes: JSON.stringify(requestCodes) }, function (data) {

      // }, true);
    },
    //加载指定schema的property
    LoadPublishedSchemaProperty: async function (schemaCode) {
      var that = this;
      var exist = that.SchemaProperties[schemaCode] != void 0;
      if (!exist) {
        await HTTP.getDataItemsByWorkflowCode(schemaCode).then((data) => {
          console.log(data);
          if (data.code == 0) {
            // that.SchemaProperties[schemaCode] = data.ReturnData.Properties;
            var ret = [];
            // for(var index in data.data.dataItems){
            //     var tmp ={};
            //     tmp.Name=data.data.dataItems[index].displayName;
            //     tmp.DisplayName = data.data.dataItems[index].displayName;
            //     tmp.DataType= data.data.dataItems[index].controlKey;
            //     tmp.IsChildField=false;
            //     tmp.HasOptionValue = false;
            //     ret.push(tmp);
            // }
            data.data.dataItems.forEach((item, index) => {
              var tmp = {};
              tmp.Name = item.controlId;
              tmp.DisplayName = item.displayName;
              tmp.DataType = item.controlKey;
              tmp.IsChildField = false;
              tmp.HasOptionValue = false;
              ret.push(tmp);
            })
            that.SchemaProperties[schemaCode] = ret;
          }

        })
      }
      // if (!exist) {
      //   that.Requst(this.Action_LoadPublishedSchemaProperty, {
      //     CurSchemaCode: that.SheetCode, //当前表单的SchemaCode
      //     SchemaCode: schemaCode //关联表单的SchemaCode
      //   }, function (data) {
      //     that.SchemaProperties[schemaCode] = data.ReturnData.Properties;
      //   }, false)
      // }
    },

    // 后台请求
    Requst: function (actionName, data, callBack, isAsync) {
      data = { "Successful": true, "ErrorMessage": null, "Logined": true, "ReturnData": { "SubmitRules": [], "BusinessRules": null, "IsDevMode": false, "IsWorkflow": true, "BindServer": false, "DesignModeContent": "", "EnableFormSns": false, "EnableTask": false, "EnableExternalForm": false, "AssociationCodes": [], "AppSource": 0, "IsInstalled": false, "AppCode": "Acddd8f7643d946a3a22beb54648b157f", "EnableDataAcl": true, "DataAclInheritedFrom": "", "SingletonModule": false, "NameSchema": "", "SummarySchema": "", "PublishedCheckboxProperties": [], "InstalledFields": [], "HostAddress": document.location.origin } }
      if ($.isFunction(callBack)) {
        callBack.apply(this, [data]);
      }
      return;

      var that = this;
      if (isAsync == null) {
        isAsync = true;
      }
      console.log(callBack);
      var param = $.extend({
        ActionName: actionName
      }, data);
      param = { PostData: JSON.stringify(param) };
      $.ajax({
        cache: false,
        url: that.AjaxUrl,
        type: "POST",
        data: param,
        dataType: "json",
        async: isAsync,
        success: function (data) {
          if (data.DebugLogs != null) {
            for (var i = 0; i < data.DebugLogs.length; i++) {
              console.log(data.DebugLogs[i]);
            }
          }
          if ($.isFunction(callBack)) {
            callBack.apply(that, [data]);
          }
        },
        error: function (data) {
          data = { "Successful": true, "ErrorMessage": null, "Logined": true, "ReturnData": { "SubmitRules": [], "BusinessRules": null, "IsDevMode": false, "IsWorkflow": true, "BindServer": false, "DesignModeContent": "", "EnableFormSns": false, "EnableTask": false, "EnableExternalForm": false, "AssociationCodes": [], "AppSource": 0, "IsInstalled": false, "AppCode": "Acddd8f7643d946a3a22beb54648b157f", "EnableDataAcl": true, "DataAclInheritedFrom": "", "SingletonModule": false, "NameSchema": "", "SummarySchema": "", "PublishedCheckboxProperties": [], "InstalledFields": [], "HostAddress": "https://www.h3yun.com" } }
          if (data.DebugLogs != null) {
            for (var i = 0; i < data.DebugLogs.length; i++) {
              console.log(data.DebugLogs[i]);
            }
          }
          if ($.isFunction(callBack)) {
            callBack.apply(that, [data]);
          }
        }
      });




    }
  };

}(SheetDesigner));



// WEBPACK FOOTER //
// ./src/lib/H3/Console/SheetDesigner/SheetDesigner.js

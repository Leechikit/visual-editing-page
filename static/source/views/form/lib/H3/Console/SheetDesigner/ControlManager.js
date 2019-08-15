import { AppTree } from './AppTree'
import { baseUrl } from '../../../../config/env';
import UnitSelectionRange from "../../../../components/workflowdesigner/participantIndex";
import HTTP from "@/api/form.js"
import '@/views/form/components/interfaceOptions/index.js'
import '@/views/form/components/defaultValueSetting/index.js'

jQuery.extend({
  // 控件管理器
  ControlMana: function (sheetDesigner, dataField, settings) {
    this.Designer = sheetDesigner;
    this.DataField = dataField;
    this.Settings = settings;
    this.$SheetControlPropertysPanel = sheetDesigner.$SheetControlPropertysPanel;
    this.$Control = this.Designer.GetControlElement(dataField);
    this.ControlKey = this.Settings.ControlKey;
    this.DesignProperties = FormControls[this.ControlKey].DesignProperties;
    this.BoSchema = null;//关联表单
    this.TransferContent = $("<div id='transFerRadios'></div>");
    this.PropertyManagers = {};

    // 拥有者和所属部门
    if (this.ControlKey == "FormUser") {
      if (this.DataField == this.Designer.Owner) {
        var oldMapping = this.$Control.attr("data-MappingControls");
        // 拥有者默认携带所属部门
        if (oldMapping == void 0 || JSON.parse(oldMapping).ParentId == null) {
          oldMapping = oldMapping || {};
          if (!$.isEmptyObject(oldMapping)) {
            oldMapping = JSON.parse(oldMapping);
          }
          oldMapping["ParentId"] = "OwnerDeptId";
          var oldMappingStr = JSON.stringify(oldMapping);

          this.Settings["MappingControls"] = oldMappingStr;
          this.$Control.attr("data-MappingControls", oldMappingStr);
        }
      } else if (this.DataField == this.Designer.OwnerDept) {
        //所属部门设置只能选部门不能选人员，后面可以改成FormDepartment
        this.Settings["OrgUnitVisible"] = true;
        this.Settings["UserVisible"] = false;
        this.$Control.attr({
          "data-OrgUnitVisible": true,
          "data-UserVisible": false
        });
      }
    }

    // 加载控件属性
    this.LoadPropertySetting = async function () {
      for (var i = 0; i < this.DesignProperties.length; ++i) {
        var designProperty = this.DesignProperties[i];
        if (designProperty.Visiable != null && !designProperty.Visiable) {
          continue;
        }
        var pManager = null;
        var that = this;
        switch (designProperty.Name) {
          case "NameItems": //子表名
            pManager = this.RenderNameItems(designProperty);
            break;
          case "DataField": //字段编码
            pManager = this.RenderDataField(designProperty);
            break;
          case "DisplayName": //显示名称
            pManager = this.RenderTextBox(designProperty, function (val) {
              var $i = $('<i class="icon-tip"><i class="arrowhead"></i></i>');

              if (that.ControlKey === "FormButton") {
                if (val.length > 6) {
                  this.$Control.find("button:first").css({ "padding-top": "0px", "padding-bottom": "0px" });
                } else {
                  this.$Control.find("button:first").css({ "padding-top": "11px", "padding-bottom": "11px" });
                }
                this.$Control.find("button:first").text(val);
              } else if (that.ControlKey === "FormLabel" && that.DataField != "CreatedTime"&&that.DataField !="CreatedBy.FullName"&&that.DataField !="ModifiedTime") {

                if (this.$Control.find(".icon-tip").length > 0) { //判断是否有描述的Icon，有的话就还是加上
                  this.$Control.find(".notdrag").text(val).append($i);
                } else {
                  this.$Control.find(".notdrag").text(val);
                }
              } else {
                if (this.$Control.find(".icon-tip").length > 0) { //判断是否有描述的Icon，有的话就还是加上
                  this.$Control.find("span:first").text(val).append($i);
                } else {
                  this.$Control.find("span:first").text(val);
                }
              }
              if (this.$Control.find(".descriptionBox").is(':visible')) {
                $i.find('.arrowhead').show();
              }
              $i.off('click').on('click', function () {
                $(this).parent().siblings('.descriptionBox').toggle();
                $(this).find('.arrowhead').toggle();
              })
            });
            break;
          case "ControlCode": //显示名称
            pManager = this.RenderTextBox(designProperty, function (val) {
              var $i = $('<i class="icon-tip"><i class="arrowhead"></i></i>');

            
                // if (this.$Control.find(".icon-tip").length > 0) { //判断是否有描述的Icon，有的话就还是加上
                //   this.$Control.find("span:first").text(val).append($i);
                // } else {
                //   this.$Control.find("span:first").text(val);
                // }
              
            
            });
            break;
          case "InterfaceOptions": // 接口选择
            pManager = this.RenderInterfaceOptions(designProperty);
            if (this.ControlKey == "FormDropDownList" && this.Settings["DataSource"] != "Interface") {
              pManager.Hide();
            }
            break;
          case "DefaultValueSetting": // 默认值编辑器
            pManager = this.RenderDefaultValueSetting(designProperty);
            break;
          case "Prefix": //流水号前缀
            pManager = this.RenderPrefix(designProperty, function (prefix) {
              this.UpdateSeqNoPreview(prefix);
            });
            break;
          case "DateTimeMode": //日期模式
            pManager = this.RenderSelectShowMode(designProperty, function (dateTimeMode) {
              var range, rangeText;
              for (var i = 0; i < that.DesignProperties.length; i++) {
                if (that.DesignProperties[i].Name == "DateTimeMode") {
                  range = that.DesignProperties[i].ValueRange;
                }
              }
              for (var i = 0; i < range.length; i++) {
                if (range[i].Val == dateTimeMode) {
                  rangeText = range[i].Text;
                }
              }

              if (that.ControlKey == "FormDateTime") {
                this.$Control.find("input").attr("placeholder", rangeText);
              } else {
                this.UpdateSeqNoPreview(null, dateTimeMode);
              }
            });
            break;
          case "IncrementNum": //流水号自增长度
            pManager = this.RenderTextBox(designProperty, function (incrementNum) {
              var num = 0;
              if (!isNaN(incrementNum)) {
                num = parseInt(incrementNum);
              }
              if (num > 0) {
                this.UpdateSeqNoPreview(null, null, num);
              }
            });
            break;
          case "IsCheckbox":
            if ($.inArray(this.DataField, this.Designer.PublishedCheckboxProperties) > -1) {
              // 已经发布过后的复选框，不允许再更改
              var disLabel = this.Settings[designProperty.Name] + "" == "true" ? "单选项" : "复选框";
              pManager = this.RenderLabel(designProperty, disLabel);
              if (this.Settings[designProperty.Name] + "" == "true") {
                this.PropertyManagers["DataDictItemName"].Hide();
              }
            }
            break;
          case "Mode":
            pManager = this.RenderSelectShowMode(designProperty, function (dateTimeMode) {
              var range, rangeText;
              for (var i = 0; i < that.DesignProperties.length; i++) {
                if (that.DesignProperties[i].Name == "Mode") {
                  range = that.DesignProperties[i].ValueRange;
                }
              }
              for (var i = 0; i < range.length; i++) {
                if (range[i].Val == dateTimeMode) {
                  rangeText = range[i].Text;
                }
              }
              if (that.ControlKey == "FormTextBox") {
                this.$Control.find("input").attr("placeholder", rangeText);
              } else {
                this.UpdateSeqNoPreview(null, rangeText);
              }
            });
            break;
          case "DisplayFields": //子表中显示的字段
            pManager = this.RenderDisplayFields(designProperty, function (dataField) {
            });
            break;
          case "IsMultiple":
          case "MaxUploadSize":
            pManager = this.RenderSelectShowMode(designProperty);
            break;
          case "AreaMode":
            if (this.ControlKey == "FormAreaSelect") {
              pManager = this.RenderSelectShowMode(designProperty, function (data) {
                this.$Control.find("select").hide();
                if (data.indexOf("P") > -1) {
                  this.$Control.find("select:eq(0)").show();
                }
                if (data.indexOf("C") > -1) {
                  this.$Control.find("select:eq(1)").show();
                }
                if (data.indexOf("T") > -1) {
                  this.$Control.find("select:eq(2)").show();
                }
              });
            } else if (this.ControlKey == "FormUser" && (this.DataField == this.Designer.Owner || this.DataField == this.Designer.OwnerDept)) {
              break;
            } else {
              pManager = this.RenderRadio(designProperty, function (data) {
                this.$Control.find("input").attr("placeholder", data.Text);
              });
            }
            break;
          case "ShowDetailAddr": //显示详细地址
            pManager = this.RenderCheckbox(designProperty, function (data) {
              if (data) {
                this.$Control.find("textarea").show();
              } else {
                this.$Control.find("textarea").hide();
              }
            });
            break;
          case "UnitSelectionRange":  //选人范围
            pManager = this.RenderUnitSelectionRange(designProperty);
            break;
          case "OrgUnitVisible":
          case "UserVisible":
            if (this.DataField != this.Designer.Owner && this.DataField != this.Designer.OwnerDept) {
              pManager = this.RenderRadio(designProperty, function (data) {
                this.$Control.find("input").attr("placeholder", data.Text);
              });
            }
            break;
          case "IsRelatedMember":
            if (this.DataField != this.Designer.Owner && this.DataField != this.Designer.OwnerDept) {
              pManager = this.RenderRadio(designProperty, function (data) { });
            }
            break;
          case "Description": //控件描述信息
            var showdescribe = true;
            if (this.$Control.parent('.SheetGridView_td').length > 0) {
              //子表中字段不要显示描述信息
              showdescribe = false;
            }
            //系统字段不要显示描述信息
            var systemFields = ["SeqNo", "CreatedBy.FullName", "OwnerId", "OwnerDeptId", "CreatedTime", "ModifiedTime"];
            if ($.inArray(this.DataField, systemFields) > -1) {
              showdescribe = false;
            }
            if (showdescribe) {
              pManager = this.RenderTextBox(designProperty, function (val) {
                var $iconDescribe = $("<i class='icon-tip'><i class='arrowhead'></i></i>");
                var $descriptionBox = $("<div class='descriptionBox'></div>")
                if (val && val.trim().length != '0') {//val存在并且都不是空格
                  if (this.$Control.find('.icon-tip').length == 0) {
                    //如果已经存在这个icon，就不需再次添加
                    this.$Control.find("span:first").append($iconDescribe);
                    this.$Control.append($descriptionBox);
                  }
                  $iconDescribe.off('click').on('click', function (e) {
                    $(this).parent().siblings('.descriptionBox').toggle();
                    $(this).find('.arrowhead').toggle();
                    return false;//阻止冒泡点击到组件
                  });
                  // //设置点击这个区域阻止冒泡
                  // this.$Control.find(".descriptionBox").off('click').on('click', function (e) {
                  //   return false;
                  // });
                  this.$Control.find(".descriptionBox").length && this.$Control.find(".descriptionBox").text(val);
                } else {
                  this.$Control.find('.descriptionBox').remove();
                  this.$Control.find('.icon-tip').remove();
                }
              });
            }
            break;
          case "PlaceHolder":
            pManager = this.RenderTextBox(designProperty, function (val) {
              if (this.ControlKey === "FormTextArea") {
                this.$Control.find("textarea").attr("placeholder", val);
              } else {
                this.$Control.find("input").attr("placeholder", val);
              }
            });
            break;
          case "DisplayRule": //隐藏条件
            pManager = this.RenderTextBox(designProperty, function (val) {
            });
            this.RenderFormulaEditable(designProperty, pManager);
            break;
          case "ComputationRule": //字段计算规则
            pManager = this.RenderTextBox(designProperty, function (val) {
            });
            this.RenderFormulaEditable(designProperty, pManager);
            break;
          case "DecimalPlaces": //小数位数
            pManager = this.RenderMulitTextBox(designProperty, function (val, $that) {
              $that.val($that.val().replace(/[^\d]/g, ''));
              val = $that.val();
              if (parseInt(val) > 6) {
                $.IShowWarn("长度不能超过6位");
                val = 6;
                $that.val(6);
                this.$Control.attr("data-DecimalPlaces", val);
                this.Settings["DecimalPlaces"] = val;
              }
              var n = 0;
              this.$Control.find("input").attr("placeholder", n.toFixed(val));
            });

            if (this.ControlKey == "FormFormula" && this.Settings["BindType"] != "number") {
              pManager.Hide();
            }

            break;
          case "DataDictItemName":
            if (that.Designer.DataDictItemNames == null) {
              that.Designer.Requst(that.Designer.Action_LoadDataDictItemNames, {
              }, function (data) {
                that.Designer.DataDictItemNames = data.ReturnData.DataDictItemNames;
              }, false);
            }
            pManager = this.RenderDataDictItem(designProperty, function (pName, dictitems) {
              var that = this;
              var manager = this.PropertyManagers[pName];
              var $div = this.$Control.find(".notdrag");
              var items = [];
              var defaultValues = [];
              if (this.ControlKey != "FormDropDownList") {
                $div.empty();
              }
              if (dictitems != null) {
                for (var i = 0; i < dictitems.length; i++) {
                  var text = $(dictitems[i]).find("input").val();
                  var inputType = this.ControlKey == "FormRadioButtonList" ? "radio" : "checkbox";
                  var isItemChecked = $(dictitems[i]).find("input:radio,input:checkbox").is(":checked");
                  if (isItemChecked) {
                    defaultValues.push(text);
                  }
                  if (this.ControlKey != "FormDropDownList") {
                    var id = $.IGuid();
                    var $input = $('<input type="' + inputType + '" id="' + id + '" disabled="disabled">');
                    var $label = $('<label for="' + id + '">' + text + '</label>');

                    if (isItemChecked) {
                      $input.prop("checked", true);
                    }
                    $div.append($input).append($label);
                  }
                  items.push(text);
                }
              }
              //赋值默认值
              this.$Control.attr("data-DefaultValue", JSON.stringify(defaultValues));
            });

            if (this.ControlKey == "FormDropDownList" && !this.Settings["DataDictItemName"] && this.Settings["DataSource"] != "DictItem") {
              pManager.Hide();
            }
            break;
          case "DefaultItems":
            if (this.ControlKey === "FormTextBox") break;
            pManager = this.RenderDefaultItems(designProperty, function (pName) {
              var that = this;
              var manager = this.PropertyManagers[pName];
              var $div = this.$Control.find(".notdrag");
              var items = [];
              var defaultValues = [];
              if (this.ControlKey != "FormDropDownList") {
                $div.empty();
              }
              if (manager != null) {
                for (var i = 0; i < manager.$Items.length; i++) {
                  var text = manager.$Items[i].find("input.property-input").val();
                  var itemId = manager.$Items[i].find("input[type][name='DefaultItems']").attr("id");
                  var inputType = this.ControlKey == "FormRadioButtonList" ? "radio" : "checkbox";
                  var isItemChecked = manager.$Items[i].find("input:radio,input:checkbox").is(":checked");
                  if (isItemChecked) {
                    defaultValues.push(text);
                  }
                  if (this.ControlKey != "FormDropDownList") {
                    var id = $.IGuid();
                    var $input = $('<input type="' + inputType + '" id="' + id + '" disabled="disabled" data-itemId="' + itemId + '">');
                    var $label = $('<label for="' + id + '">' + text + '</label>');

                    if (that.ControlKey === "FormCheckbox") {
                      var title = this.$Control.find("span.col-sm-12");
                      if (title.length > 0) {
                        $label.text("");
                        title.text(text);
                      }
                    }
                    if (isItemChecked) {
                      $input.prop("checked", true);
                      $input.attr("checked", 'checked');
                    }
                    $div.append($input).append($label);
                  }
                  items.push(text);
                }
              }
              this.$Control.attr("data-" + pName, JSON.stringify(items));
              if (that.ControlKey === "FormCheckbox") {
                if (defaultValues.length > 0) {
                  this.$Control.attr("data-DefaultValue", true);
                }
                else {
                  this.$Control.attr("data-DefaultValue", false);
                }
              }
              else {
                this.$Control.attr("data-DefaultValue", JSON.stringify(defaultValues));
              }
            });
            if (this.ControlKey == "FormDropDownList" && this.Settings["DataSource"] != "Custom" && this.Settings["DataSource"] != "DictItem") {
              pManager.Hide();
            }
            break;
          case "BOSchemaCode":
            // 关联列表
            pManager = this.RenderBOSchemaCode(designProperty);
            if ((this.ControlKey == "FormDropDownList" && this.Settings["DataSource"] == "Association") || (this.ControlKey == "FormQuery") || (this.ControlKey == "FormMultiQuery") || (this.ControlKey == "FormList")) {
              pManager.Show();
            }
            else {
              pManager.Hide();
            }
            break;
          case "FolderName":
            // 文档库
            pManager = this.RenderFolderName(designProperty);
            if ((this.ControlKey == "FormDropDownList" && this.Settings["DataSource"] == "Association") || (this.ControlKey == "FormFolder")) {
              pManager.Show();
            }
            else {
              pManager.Hide();
            }
            break;
          case "MappingControls": //关联配置
          case "MappingProperties": //关联属性
            if (this.DataField != this.Designer.OwnerDept) {
              pManager = this.RenderMappingControls(designProperty);
            }
            break;
          case "AsFilter":
            pManager = this.RenderAsFilter(designProperty);
            break;
          case "AssociationFilter": //关联查询过滤
            pManager = this.RenderAssociationFilter(designProperty);
            if ((this.ControlKey == "FormDropDownList" && this.Settings["DataSource"] == "Association") || (this.ControlKey == "FormQuery") || (this.ControlKey == "FormMultiQuery") || (this.ControlKey == "FormList")) {
              pManager.Show();
            } else {
              pManager.Hide();
            }
            break;
          case "Rows": //多行文本框可见行数
            pManager = this.RenderNumTextBox(designProperty, function (val) {
              this.$Control.find("textarea").attr("rows", parseInt(val));
            });
            break;
          case "TransferItems":
            pManager = this.RenderTransferLink(designProperty, function (data) {
            });
            break;
          case "Range":
            pManager = this.RenderSelectShowMode(designProperty, function (val) { });
            break;
          case "ShowMode":
            pManager = this.RenderShowMode(designProperty, function (val) { });
            if (this.ControlKey == "FormFormula" && this.Settings["BindType"] != "number") {
              pManager.Hide();
            }
            if (this.ControlKey == "FormDropDownList" && this.Settings["DataSource"] != "Interface") {
              pManager.Hide();
            }
            break;
          case "SelectShowMode":
          case "GridViewMode":
            pManager = this.RenderSelectShowMode(designProperty, function (val) { });
            break;
          case "NoRepeat":
            pManager = this.RenderNoRepeat(designProperty);
            break;
          case "InputByScan":
          case "ScanUpdateEnable":
            pManager = this.RenderScanInput(designProperty, function (data, propertyName) {
              if (propertyName == "InputByScan") {
                if (data) {
                  $('div[propertyname="ScanMappingField"],div[propertyname="ScanUpdateEnable"]').show();
                  $("#SheetControlPropertysPanel").getNiceScroll().resize();
                } else {
                  $('div[propertyname="ScanMappingField"],div[propertyname="ScanUpdateEnable"]').hide();
                }
              }
            });
            break;

          case "UpLoadMultiple":
            pManager = this.RenderUpLoadMultiple(designProperty, function (val) { });
            break;
          //下拉框匹配字段,如果选择关联表单  必填
          case "MappingField":
            pManager = this.RenderMappingControls(designProperty);
            if ((this.ControlKey == "FormDropDownList" && this.Settings["DataSource"] == "Association")) {
              pManager.Show();
            } else {
              pManager.Hide();
            }
            break;
          // 下拉框数据来源
          case "DataSource":
            pManager = this.RenderDropDownDataSource(designProperty);
            break;
          //公式型控件绑定控件类型
          case "BindType":
            pManager = this.RenderBindTypeRadio(designProperty, function (data) {
              if (data) {
                var DefaultItems = that.$Control.attr("data-defaultitems");
                DefaultItems && (DefaultItems = JSON.parse(DefaultItems));
                DefaultItems = DefaultItems || (eval(this.Settings['DefaultItems']) || this.Settings["DefaultItems"].DefaultValue);
                var $outer = that.$Control.find("div[class^='col-sm-']").html("");
                switch (data) {
                  case "FormTextBox": {
                    //文本框
                    $outer.append($('<input type="text" class="notdrag"/>').prop("readOnly", "true").css("width", "100%"));
                  } break;
                  case "FormRadioButtonList":
                  case "FormCheckboxList": {
                    var type = data == "FormCheckboxList" ? "checkbox" : "radio";
                    var $select;
                    var $input = $("<div class='row notdrag'>");
                    for (var i = 0; i < DefaultItems.length; i++) {
                      var id = $.IGuid();
                      $select = $('<input type="' + type + '"  id="' + id + '"/><label for="' + id + '">' + DefaultItems[i] + '</label>').prop("disabled", "disabled");

                      $input.append($select);
                    }
                    $outer.append($input);
                  } break;
                  case "FormDropDownList": {
                    //下拉框 
                    var $input = $("<select class='form-control form-group-margin notdrag' style='width:100%'>");
                    var $select;
                    $outer.append($input.append($select));
                  } break;
                }
                sheetDesigner.LoadPropertySetting.call(sheetDesigner, that.DataField);
              }
            });
            break;
          case "GridViewFields":
            pManager = this.RenderGridViewFields(designProperty, function (dataField, index) {
              var controlDataField = dataField;
              var gridViewDataField = this.DataField;
              var $currentControlTd = this.$Control.find("div.row.sheet-control[data-controlkey][data-datafield='" + controlDataField + "']").parent();
              if (index == 0) {
                //放到第一位
                var $firstControlTd = this.$Control.find("div.row.sheet-control[data-controlkey][data-datafield]:eq(" + index + ")").parent();
                $currentControlTd.insertBefore($firstControlTd);
              } else {
                //插入指定位置
                var $prevControlTd = this.$Control.find("div.row.sheet-control[data-controlkey][data-datafield]:eq(" + index + ")").parent();
                var oldIndex = $currentControlTd.index();
                if (oldIndex > index)
                  $currentControlTd.insertBefore($prevControlTd);
                else
                  $currentControlTd.insertAfter($prevControlTd);
              }
            });
            break;
          case "DataRule":
            pManager = this.RenderMappingRule(designProperty);
            break;
          case "BOSchemaField": //关联属性关联字段
            pManager = await this.RenderBOSchemaField(designProperty);
            break;
            // case "CameraOnly":
            //   pManager = this.RenderCameraOnly(designProperty);
            break;
          case "FormPhotoFormat":
            pManager = this.RenderFormPhotoFormat(designProperty);
            break;
          case "ExpandRange": // 子表展开收起
            pManager = this.RenderGridViewExpandRange(designProperty);
            break;
        }
        if (designProperty.Name != "DisplayName") {
          var dataField = this.DataField;
          if (dataField.toLowerCase() == 'createdby.fullname') {
            dataField = dataField.split('.')[0];
          }
          if ($.inArray(dataField, this.Designer.PreInstalledFields) > -1) {
            if (pManager != undefined) {
              var target = pManager.$Items[0];
              if (target != undefined) {
                target.off('click').attr('disabled', 'disabled');
                if (designProperty.Name == 'InputByScan' ||
                  designProperty.Name == 'ScanUpdateEnable' ||
                  designProperty.Name == 'UpLoadMultiple' ||
                  designProperty.Name == 'NoRepeat' ||
                  designProperty.Name == 'ShowDetailAddr') {
                  //checkbox
                  target.find('input').attr('disabled', 'disabled');
                } else if (designProperty.Name == 'DateTimeMode' ||
                  designProperty.Name == 'MaxUploadSize' ||
                  designProperty.Name == 'TransferItems' ||
                  designProperty.Name == 'Mode' ||
                  designProperty.Name == 'Range' ||
                  designProperty.Name == 'AreaMode' ||
                  designProperty.Name == 'OrgUnitVisible' ||
                  designProperty.Name == "UserVisible" ||
                  designProperty.Name == "IsRelatedMember") {
                  //radio
                  var item1 = pManager.$Items[0];
                  if (item1 != undefined)
                    item1.find('input').attr('disabled', 'disabled');
                  var item2 = pManager.$Items[1];
                  if (item2 != undefined)
                    item2.find('input').attr('disabled', 'disabled');
                } else if (designProperty.Name == 'MappingControls') {
                  var items = pManager.$Items;
                  for (var kk = 0; kk < items.length; kk++) {
                    $(items[kk]).find('select').attr('disabled', 'disabled').css({ 'background-color': 'rgb(235,235,228)', 'border-color': '#ddd' });
                  }
                } else if (designProperty.Name == 'DataSource') {
                  var items = pManager.$Items;
                  for (var kk = 0; kk < items.length; kk++) {
                    $(items[kk]).attr('disabled', 'disabled').css({ 'background-color': 'rgb(235,235,228)', 'border-color': '#ddd' });
                  }
                } else if (designProperty.Name == 'DefaultItems') {
                  pManager.$RightTools.remove();;
                  var items = pManager.$Items;
                  for (var kk = 0; kk < items.length; kk++) {
                    $(items[kk]).find('input').attr('disabled', 'disabled');
                    $(items[kk]).find('i.fa-plus-circle').remove();
                    $(items[kk]).find('i.icon-delete').remove();
                  }
                }
                //div
                if (designProperty.Name == 'NameItems') {
                  target.css('background-color', 'rgb(235,235,228)');
                } else if (designProperty.Name == 'ShowMode') {
                  target.css({ 'background-color': 'rgb(235,235,228)', 'border-color': '#ddd' });
                } else if (designProperty.Name == 'UnitSelectionRange') {
                  target.css({ 'background-color': 'rgb(235,235,228)', 'border-color': '#ddd' });
                } else if (designProperty.Name == 'SelectShowMode') {
                  target.css({ 'background-color': 'rgb(235,235,228)', 'border-color': '#ddd' });
                } else if (designProperty.Name == 'DataDictItemName') {
                  target.css({ 'background-color': 'rgb(235,235,228)', 'border-color': '#ddd' });
                }
              }
            }
          }
        }
        if (pManager && pManager.$Items[0]) {
          pManager.$Items[0].attr("controlkey", this.ControlKey);
        }
        //“子表字段”不要保存
        if (designProperty.Name != "GridViewFields") {
          this.PropertyManagers[designProperty.Name] = pManager;
        }
      }
      ////
      that.$SheetControlPropertysPanel.find("select").each(function () {
        var disabled = $(this).attr('disabled')
        if (disabled != undefined && disabled == 'disabled') {
          return true;
        }
        $(this).DropDownList();
      });
    };
    //验证流水号总长度
    this.CheckSeqNoLength = function () {
      var item = this.$Control.find("input");
      var prefix = item.data("Prefix") || "";
      var dateMode = item.data("DateMode") || "";
      var incrementNum = item.data("IncrementNum") || 0;
      //前缀长度
      var len = 0;
      len += prefix.length;
      //日期格式长度
      var dateModeLength = 0;
      switch (dateMode) {
        case "YYYY":
          dateModeLength = 4
          break;
        case "YYYYMM":
          dateModeLength = 6
          break;
        case "YYYYMMDD":
          dateModeLength = 8;
          break;
      }
      len += dateModeLength;
      //自增序号长度
      len += incrementNum;
      if (len > 20) {
        //重置自增序号长度
        var num = 20 - prefix.length - dateModeLength;
        if (this.PropertyManagers.IncrementNum)
          this.PropertyManagers.IncrementNum.$Items[0].val(num);
        this.$Control.find("input").data('IncrementNum', num);
        this.UpdateSeqNoPreview();
        return false;
      }
      return true;
    };
    //更新流水号预览
    this.UpdateSeqNoPreview = function (prefix, dateTimeMode, incrementNum) {
      var item = this.$Control.find("input");
      var preview = '';
      if (prefix || prefix == '') {
        item.data('Prefix', prefix);
      } else {
        prefix = item.data('Prefix') || '';
      }
      if (dateTimeMode) {
        item.data('DateMode', dateTimeMode);
      } else {
        dateTimeMode = item.data('DateMode') || '';
      }
      if (incrementNum) {
        item.data('IncrementNum', incrementNum);
      } else {
        incrementNum = item.data('IncrementNum') || 8;
      }
      if (!this.CheckSeqNoLength()) { return; }
      preview += prefix;
      var date = new Date();
      switch (dateTimeMode) {
        case 'YYYY':
          preview += date.getFullYear();
          break;
        case 'YYYYMM':
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m > 9 ? m : '0' + m;
          preview += (y + '' + m);
          break;
        case 'YYYYMMDD':
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          var d = date.getDate();
          m = m > 9 ? m : '0' + m;
          d = d > 9 ? d : '0' + d;
          preview += (y + '' + m + '' + d);
          break;
        default:
          break;
      }
      for (var i = 0; i < incrementNum - 1; i++) {
        preview += '0';
      }
      preview += '1';
      //item.attr('placeholder', preview);
    };

    // 图片格式
    // this.RenderFormPhotoFormat = function (designProperty) {
    //   var that = this;
    //   var propertyManager = new $.propertyManager(designProperty.Name);
    //   propertyManager.SetTitle(designProperty.Text);
    //   if (designProperty.Children) {

    //   }
    // };

    //临时代码，后面要替换成上面那个
    this.RenderFormPhotoFormat = function (designProperty) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);

      var $uploadMultiple = $("<div style='width:100%;float:left;overflow:hidden;height:36px;line-height:36px;'>");
      var id = $.IGuid();
      var $input_uploadMultiple = $("<input type='checkbox' id='" + id + "' name='uploadMultiple' />");
      var $label_uploadMultiple = $("<label for='" + id + "' style='padding:0;margin:5px;font-size:14px;'>允许上传多张照片</label>");
      $uploadMultiple.append($input_uploadMultiple).append($label_uploadMultiple);


      var $cameraOnly = $("<div style='width:100%;float:left;overflow:hidden;height:36px;line-height:36px;'>");
      id = $.IGuid();
      var $input_cameraOnly = $("<input type='checkbox' id='" + id + "' name='cameraOnly' />");
      var $label_cameraOnly = $("<label for='" + id + "' style='padding:0;margin:5px;font-size:14px;'>仅允许拍照上传</label>");
      // $label_cameraOnly.append("<i data-tip='该功能仅移动端有效' class='icon-tooltip icon-tips'></i>");
      $cameraOnly.append($input_cameraOnly).append($label_cameraOnly).append("<i data-tip='该功能仅移动端有效' class='ivu-icon ivu-icon-help-circled' style='color:#2d7fff'></i>")

      $input_uploadMultiple.off("change").on("change", function (e) {
        var val = this.checked;
        that.$Control.attr("data-uploadmultiple", val);
        that.Settings["UpLoadMultiple"] = val;
      });

      $input_cameraOnly.off("change").on("change", function (e) {
        var val = this.checked;
        that.$Control.attr("data-cameraonly", val);
        that.Settings["CameraOnly"] = val;
      });

      var defaultValue_uploadMultiple = this.Settings["UpLoadMultiple"] || false;
      if (defaultValue_uploadMultiple == "true") {
        $input_uploadMultiple[0].checked = true;
      }

      var defaultValue_cameraOnly = this.Settings["CameraOnly"] || false;
      if (defaultValue_cameraOnly == "true") {
        $input_cameraOnly[0].checked = true;
      }

      propertyManager.AddItem($uploadMultiple);
      propertyManager.AddItem($cameraOnly);

      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());

      return propertyManager;
    }
    //支持批量图片
    this.RenderUpLoadMultiple = function (designProperty) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      propertyManager.SetTitle(designProperty.Text);
      var $div = $('<div></div>');
      var $div1 = $('<div data-index="0" style="width: 47%; display: inline-block; overflow: hidden;"></div>');
      var $div2 = $('<div data-index="0" style="width: 47%; display: inline-block; overflow: hidden;"></div>');
      var id = $.IGuid();
      var $input = $("<input  type='radio' id='" + id + "' name = '" + designProperty.Name + "' value='true'>");
      var $label = $("<label for='" + id + "' style='padding:0;margin:5px' >允许</label>");
      var $inputnot = $("<input  type='radio' id='" + (id + 1) + "' name = '" + designProperty.Name + "' value='false'>");
      var $labelnot = $("<label for='" + (id + 1) + "' style='padding:0;margin:5px' >不允许</label>");
      $div1.append($input).append($label)
      $div2.append($inputnot).append($labelnot)
      $div.append($div1).append($div2);

      $div.off("click").on("click", "input[type='radio']", function () {
        var val = $div.find("input[type='radio'][name='" + designProperty.Name + "']:checked").val();
        that.$Control.attr('data-' + designProperty.Name, val);
        that.Settings[designProperty.Name] = val;
      });

      propertyManager.AddItem($div);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      if (defaultValue == "true") {
        $input.attr("checked", true);
      } else {
        $inputnot.attr("checked", true);
      }
      return propertyManager;
    };

    //显示模式
    this.RenderShowMode = function (designProperty) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      propertyManager.SetTitle(designProperty.Text);
      var $modeSelect = $("<select id='" + designProperty.Name + "' name='" + designProperty.Name + "' style='width:100%;'></select>");
      var valueRange = designProperty.ValueRange;
      for (var i = 0; i < valueRange.length; i++) {
        $modeSelect.append('<option value="' + valueRange[i].Val + '">' + valueRange[i].Text + '</option>');
      }
      propertyManager.AddItem($modeSelect);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      $modeSelect.val(defaultValue);
      $modeSelect.off('change.showmode').on('change.showmode', function () {
        var val = $modeSelect.val();
        that.$Control.attr('data-' + designProperty.Name, val);
        that.Settings[designProperty.Name] = val;
      });
      return propertyManager;
    };
    //下拉款显示模式
    this.RenderSelectShowMode = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      propertyManager.SetTitle(designProperty.Text);
      var $modeSelect = $("<select id='" + designProperty.Name + "' name='" + designProperty.Name + "' style='width:100%;'></select>");
      var valueRange = designProperty.ValueRange;

      for (var i = 0; i < valueRange.length; i++) {
        $modeSelect.append('<option value="' + valueRange[i].Val + '">' + valueRange[i].Text + '</option>');
      }
      propertyManager.AddItem($modeSelect);

      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      //如果是下拉框，并且选中了关联属性，则不显示
      if (that.$Control.attr("data-datasource") == "Association" && that.$Control.attr("data-displayname") == "下拉框") {
        that.$SheetControlPropertysPanel.find('div[propertyname="SelectShowMode"]').hide();
      }
      $modeSelect.val(defaultValue);
      $modeSelect.off('change.showmode').on('change.showmode', function (e) {
        var val = $modeSelect.val();
        that.$Control.attr('data-' + designProperty.Name, val);
        that.Settings[designProperty.Name] = val;
        if (callback && $.isFunction(callback)) {
          callback.apply(that, [val]);
        }
        if (that.ControlKey == "FormGridView") {
          if (val == "1") {
            that.$SheetControlPropertysPanel.find("div[propertyname='DisplayFields']").show();
            that.$SheetControlPropertysPanel.getNiceScroll().resize();
          } else {
            that.$SheetControlPropertysPanel.find("div[propertyname='DisplayFields']").hide();
          }
        }
      });
      if (designProperty.Name == "ComputationRule") {
        propertyManager.$Title.css("position", "relative").append("<i data-tip='选择不同的显示模式，在移动端展示效果不同' class='ivu-icon ivu-icon-help-circled' style='color:#2d7fff'></i>");
      }

      $modeSelect.change();
      return propertyManager;
    };
    this.RenderUnitSelectionRange = function (designProperty) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var title = designProperty.Text;
      if (this.DataField.toLowerCase() == "ownerdeptid") {
        title = "仅以下部门可被选择";
      }
      var currentDataField = that.Settings["DataField"];
      propertyManager.SetTitle(title);
      var placeholder = designProperty.placeholder;
      if (that.DataField == "OwnerDeptId") {
        placeholder = "添加部门范围";
      }
      //获取设计器中可以被选中的控件
      //选部门控件
      var canChooseControlDataField = this.GetDepartmentFields(currentDataField);

      var $item = $("<div class='property-input' style='cursor:pointer;padding:0;max-height:80px;overflow-y:scroll' placeholder='" + placeholder + "'>");
      $item.unbind("click.unitSelectionRange").bind("click.unitSelectionRange", that, function (e) {
        var that = e.data;

        that.Designer.Save(null, false);
        //判断当前控件是选人还是选部门控件
        //如果是选人控件要显示"角色"
        var isUser = (that.ControlKey == "FormUser" || that.ControlKey == "FormMultiUser") && that.DataField != "OwnerDeptId";
        var formula = "";
        var range = that.$Control.attr('data-unitselectionrange');
        if (range && range != "") {
          var items = range.split(";");
          for (var i = 0; i < items.length; i++) {
            if (items[i] != "") {
              if (canChooseControlDataField.indexOf("{" + items[i] + "}") > -1) {
                formula += "{" + items[i] + "}" + "+";
              } else if (/[ruo]\(\S+\)/.test(items[i])) {
                formula += items[i] + "+";
              } else {
                formula += "u(" + items[i] + ")" + "+";
              }
            }
          }
          formula = formula.slice(0, formula.length - 1);
        }
        //如果没有可以选择的控件则加一个空数据进去，目的是在选人弹窗中不要显示“部门控件”内容
        if (canChooseControlDataField.length == 0) {
          canChooseControlDataField.push("");
        }
        let params = {
          sheetCode: that.Designer.SheetCode,
          title: isUser ? "选人范围" : "选部门范围",
          schemaCode: that.Designer.SheetCode,
          formula: formula,
          tabName: 'role',
          showDepartment: true,
          showUser: true,
          showFunction: false,
          showRole: isUser,
          showOthers: true,
          showControl: false,
          canSelectControls: canChooseControlDataField,
          controlTabTitle: "部门控件",
          callback: function (val, text) {
            var formula = val.replace(/\+/g, ";").replace(/{/g, "").replace(/}/g, "");
            // var formula = val.replace(/u\(/g, "").replace(/\+/g, ";").replace(/{/g, "").replace(/}/g, "");
            // var formula = val.replace(/u\(/g, "").replace(/\)/g, "").replace(/\+/g, ";").replace(/{/g, "").replace(/}/g, "");
            var textItems = text.split("+");
            var $this = that.$SheetControlPropertysPanel.find("div[propertyname='UnitSelectionRange']").find("ul.property-items").find("div.property-input");
            $this.empty();
            for (var i = 0; i < textItems.length; i++) {
              if (textItems[i] != "") {
                var $item = $("<label class='label label-info'>" + textItems[i] + "</label>");
                $this.append($item);
              }
            }
            var cls = $this.children().length > 0 ? "" : "ivu-icon ivu-icon-plus-round";
            $this.parent().removeClass("ivu-icon ivu-icon-plus-round").addClass(cls);
            that.$Control.attr("data-unitselectionrange", formula);
            that.Settings["UnitSelectionRange"] = formula;
          }
        }
        UnitSelectionRange.show(params);
        return;
      });

      if (this.Settings["UnitSelectionRange"]) {
        //将已有的组织机构id转成名称添加到$item
        var unitSelectionRange = this.Settings["UnitSelectionRange"];//用户选择范围
        var that = this;
        var source=null;
        if(sessionStorage.getItem("currentAppType")=="op"){
            source='op'
        }
        $.ajax({
          cache: false,
          url: baseUrl + "/parseParticipantName",
          type: "GET",
          data: { formula: unitSelectionRange.replace(/;/g, '+') ,source:source},
          dataType: "json",
          async: true,
          success: function (data) {
            if (data.code === '0') {
              data = data.formulaText.replace(/[{}]/g, '').split('+');
              // data = data.ReturnData.UnitItems;
              //选部门控件
              // if (canChooseControlDataField && canChooseControlDataField.length > 0) {
              //   var temp = unitSelectionRange.split(";");
              //   var ranges = [];
              //   for (var i = 0; i < temp.length; i++) {
              //     if (temp[i] != "") {
              //       ranges.push("{" + temp[i] + "}");
              //     }
              //   }
              //   for (var i = 0; i < canChooseControlDataField.length; i++) {
              //     var dataField = canChooseControlDataField[i];
              //     if ($.inArray(dataField, ranges) > -1) {
              //       var displayName = that.Designer.GetControlElement(dataField.replace(/{/g, "").replace(/}/g, "")).attr("data-displayname");
              //       data.push({ UnitID: "", DisplayName: displayName, code: "" });
              //     }
              //   }
              // }
              for (var i = 0; i < data.length; i++) {
                var $label = $("<label class='label label-info'>" + data[i] + "</label>");
                $item.append($label);
              }
              var cls = $item.children().length > 0 ? "" : "icon-add";
              $item.parent().removeClass("icon-add").addClass(cls);
            }
          }
        });
      }
      propertyManager.AddItem($item).addClass("icon-add");
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };
    //子表名称
    this.RenderNameItems = function (designProperty) {
      var that = this;
      var propertyName = designProperty.Name;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      var $itemGroup = $('<div>');
      var $itemDiv = $('<div class="property-input" style="cursor:pointer" placeholder="添加标题">');
      var $itemBtn = $('<i class="ivu-icon ivu-icon-plus-round">').css({
        'position': 'absolute',
        'top': '50%',
        'right': '5px',
        'height': '20px',
        'width': '20px',
        'line-height': '20px',
        'text-align': 'center',
        'display': 'block',
        'cursor': 'pointer',
        'margin-top': '-10px'
      });
      $itemBtn.on('click', function () {
        that.Designer.$ChildNameItems = $itemDiv;
        that.Designer.ShowGridViewNameSelector(that.$Control, $itemDiv);
      });
      $itemDiv.on('click', function () {
        that.Designer.$ChildNameItems = $itemDiv;
        that.Designer.ShowGridViewNameSelector(that.$Control, $itemDiv);
      });
      var items = that.$Control.attr('data-nameitems');
      if (items && items.length > 0) {
        $itemGroup.append($itemDiv);
      } else {
        $itemGroup.append($itemDiv).append($itemBtn);
      }
      propertyManager.AddItem($itemGroup.children());
      if (items != void 0) {
        var itemarr = items.split(',');
        var labelInfo = "label-info";

        for (var j = 0; j < itemarr.length; j++) {
          if (itemarr[j] == '') {
            continue;
          }
          var $itemctrl = that.Designer.GetControlElement(itemarr[j]);
          //控件已经被删除不显示
          if ($itemctrl[0] == undefined) { continue; }
          var itemvalue = itemarr[j];
          var $labelctrl = $("<label class='label " + labelInfo + "' data-value='" + itemvalue + "'>" + $itemctrl.attr("data-displayname") + "</label>");
          $itemDiv.append($labelctrl);
        }
      }
      $itemDiv.off('DOMNodeInserted').on('DOMNodeInserted', function () {
        var items = $(this).find('label');
        var gridViewNameItem = '';
        for (var i = 0, len = items.length; i < len; i++) {
          gridViewNameItem += $(items[i]).attr('data-value') + ',';
        }
        gridViewNameItem = gridViewNameItem.substring(0, gridViewNameItem.length - 1);
        that.$Control.attr('data-nameitems', gridViewNameItem);
      });
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };
    //关联查询过滤
    this.RenderAssociationFilter = function (designProperty) {
      var that = this;
      var propertyName = designProperty.Name;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      designProperty.Name === "AssociationFilter" && propertyManager.$Title.css("position", "relative").append("<span class='property-tip'>仅可选择符合以下条件的数据</span>");
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $item = $("<input maxlength=10 class='property-input' placeholder='点击设置条件'>").val(defaultValue);
      $item.keyup(function () {
        var newValue = $(this).val();
        that.$Control.attr("data-" + designProperty.Name, $(this).val());
        that.Settings[designProperty.Name] = $(this).val();
      });
      var schemaCode = this.Designer.SheetCode;
      var ruleJson = null;
      var rule = '';
      if (this.Settings[propertyName] && this.Settings[propertyName].length > 0) {
        ruleJson = this.Settings[propertyName] ? JSON.parse(this.Settings[propertyName]) : null;
        if (!$.isEmptyObject(ruleJson)) {
          rule = ruleJson.Rule;
        }
      }
      propertyManager.AddItem($item).addClass("icon-add");
      var target = propertyManager.$Items[0];
      //先保存
      //在关联表单设置不为空时再保存
      $(target).off("keyup").on("click", function () {
        if (that.Settings["BOSchemaCode"] != "") {
          that.Designer.IsSaved = false;
          that.Designer.Save(null, false);
        }
      })
      target.FormulaEditable({
        SchemaCode: this.Designer.SheetCode,
        FormulaType: "AssociationFilter",
        Formula: rule,
        FormulaField: this.DataField
      });

      //绑定chang事件,将新的规则数据设定到控件Settings中
      target.next('input.FormulaControl').change(propertyName, function (e) {
        var formula = $(this).attr('formula') || '';
        if (formula.length > 0) {
          var propertyVal = '{"Rule":"' + formula.replace(/"/g, '\\\"') + '"}';
          that.$Control.attr('data-' + e.data, propertyVal);
          //关联过滤的名字由bofilter改为associationfilter，删除旧的属性
          if (that.$Control.attr('data-bofilter')) {
            that.$Control.removeAttr('data-bofilter');
          }
          that.Settings[e.data] = propertyVal;
        } else {
          if (e.data == "AssociationFilter") {
            that.$Control.removeAttr('data-bofilter');
          }
          that.$Control.removeAttr('data-' + e.data);
        }
      });
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };

    //渲染显示规则和计算规则
    this.RenderFormulaEditable = function (designProperty, pManager) {
      if (designProperty.Name == 'DisplayRule' || designProperty.Name == 'ComputationRule') {
        var propertyName = designProperty.Name;
        var target = pManager.$Items[0];

        //先保存,否则规则编辑器左侧树中未保存的字段不显示
        // this.Designer.Save(target, false); //如果加入保存这段代码，会把控件选中的状态给取消了

        var formulaType = '';
        if (propertyName == 'DisplayRule') {
          formulaType = 'SCHEMADISPLAY';
        } else if (propertyName == 'ComputationRule') {
          formulaType = 'SCHEMACOMPUTATION';
        }
        var schemaCode = this.Designer.SheetCode;
        var ruleJson = null;
        var rule = '';
        if (this.Settings[propertyName] && this.Settings[propertyName].length > 0) {
          rule = this.Settings[propertyName];
          if (rule != undefined) {
            rule = JSON.parse(rule);
            if (!$.isEmptyObject(rule)) {
              rule = rule.Rule;
            }
          }
        }
        // target.off('keyup');//不执行textbox的keyup事件
        target.off("keyup").FormulaEditable({
          SchemaCode: schemaCode,
          FormulaType: formulaType,
          Formula: rule,
          FormulaField: this.DataField
        });
        //绑定change事件,将新的规则数据设定到控件Settings中
        var that = this;
        target.next('input.FormulaControl').change(propertyName, function (e) {
          var formula = $(this).attr('formula') || '';
          //var formulaText = $(this).attr('formula-text') || '';
          if (formula.length > 0) {
            var propertyVal = '{"Rule":"' + formula.replace(/"/g, '\\\"') + '"}';//,"Text":"' + formulaText.replace(/"/g, '\\\"') + '"}';
            that.$Control.attr('data-' + e.data, propertyVal);
            that.Settings[e.data] = propertyVal;
          } else {
            that.$Control.removeAttr('data-' + e.data);
          }
        });
      }
    };
    // 渲染接口选择
    this.RenderInterfaceOptions = function (designProperty, callback) {
      var that = this;
      var propertyName = designProperty.Name;
      var propertyValue = designProperty.DefaultValue;
      var propertyManager = new $.PropertyManager(propertyName);
      var defaultValue = (this.Settings[propertyName] || propertyValue) + '';
      propertyManager.SetTitle(designProperty.Text);
      
      var $item = $("<input maxlength=10 class='property-input'>").val(defaultValue.replace(/(^\s*)|(^\s*$)/g, "")).attr('placeholder', '添加接口');;
      var interfaceCache = {}
      if (this.Settings[propertyName] && this.Settings[propertyName].length > 0) {
        interfaceCache = this.Settings[propertyName];
        if (interfaceCache != undefined) {
          interfaceCache = JSON.parse(interfaceCache);
        }
      }
      $item.off("keyup").InterfaceOptions(interfaceCache, obj => {
        if (obj) {
          const param = `{"id": "${obj.id}"}`
          $item.val(obj.name)
          interfaceCache.id = obj.id
          this.Settings[propertyName] = param
          this.$Control.attr('data-InterfaceOptions', param);
        }
      });
      propertyManager.AddItem($item);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };
    // 渲染默认值编辑器
    this.RenderDefaultValueSetting = function (designProperty, callback) {
      var that = this;
      var propertyName = designProperty.Name;
      var propertyValue = designProperty.DefaultValue;
      var propertyManager = new $.PropertyManager(propertyName);
      var defaultValue = (this.Settings[propertyName] || propertyValue) + '';
      propertyManager.SetTitle(designProperty.Text);

      var $item = $("<input maxlength=10 class='property-input'>").val(defaultValue.replace(/(^\s*)|(^\s*$)/g, "")).attr('placeholder', '设置默认值');;
      var dataCache = {}
      if (this.Settings[propertyName] && this.Settings[propertyName].length > 0) {
        dataCache = this.Settings[propertyName];
        if (dataCache != undefined) {
          dataCache = JSON.parse(dataCache);
        }
      }
      let type = ''
      switch (this.ControlKey) {
        case 'FormDateTime':
          type = 'date';
          break;
        case 'FormUser':
          type = 'user';
          break;
      }
      let params = {
        ...dataCache,
        type
      }
      $item.off("keyup").DefaultValueSetting(params, obj => {
        let param = ''
        if (obj.id) {
          param = `{"id": "${obj.id}","name": "${obj.name}"}`
          $item.val(obj.name)
          dataCache.id = obj.id
          dataCache.name = obj.name
        } else {
          $item.val('')
          dataCache = {}
        }
        this.Settings[propertyName] = param
        this.$Control.attr('data-DefaultValueSetting', param);
      });
      propertyManager.AddItem($item);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };
    this.IsJson = function (str) {
      if (typeof str == 'string') {
        try { JSON.parse(str); return true; } catch (e) { return false; }
      }
    };
    this.RenderLabel = function (designProperty, value) {
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);

      var defaultValue = value == null ? (this.Settings[designProperty.Name] || designProperty.DefaultValue) : value;
      var $item = $("<div>").addClass("property-input").text(defaultValue);

      propertyManager.AddItem($item);
      this.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };

    this.RenderDataField = function (designProperty) {
      if (!this.Designer.IsDevMode) {
        //非开发者不要渲染字段编码
        return;
      }
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $item = $("<div class='property-input' >" + defaultValue + "</div>").css({
        "font-style": "oblique",
        "border": "none",
        "background-color": "#ddd",
        "line-height": "40px", "padding-left": "10px",
        "padding-bottom": "0"
      });
      propertyManager.AddItem($item);
      this.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };

    this.RenderMulitTextBox = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $div = $("<div style='width:100%;'>");
      var $div1 = $("<div style='width:100%;float:left;overflow:hidden;'>");
      var $div2 = $("<div style='width:100%;float:left;overflow:hidden;'>");
      var id = $.IGuid();
      var $input = $("<input  type='checkbox' id='" + id + "' name='" + designProperty.Name + "'>");
      var $label = $("<label for='" + id + "' style='padding:0;margin:5px' >小数位数</label>");
      var $proInput = $('<input maxlength="10" class="property-input decimalPlaces-input" data-index="0" style="display:none">');
      $div1.append($input).append($label).append($proInput);
      // 保存小数位数状态
      var defaultValdecimalChecked = false;
      var decimalPlaces = that.$Control.attr("data-decimalplaces");
      if (decimalPlaces) {
        var val = parseInt(decimalPlaces);
        defaultValdecimalChecked = !isNaN(val);
      }
      if (defaultValdecimalChecked) {
        $input.attr("checked", true);
        $proInput.show();
      } else {
        $input.attr("checked", false);
        $proInput.hide();
      }

      $proInput.val(defaultValue);
      $div1.off('click').on('click', 'input[type=checkbox],label', function () {
        var val = $input.is(":checked");
        if (val) {
          $proInput.show();
          $proInput.val(defaultValue);
          //that.$Control.attr('data-decimalChecked', true);
        } else {
          //that.$Control.attr('data-decimalChecked', false);
          $proInput.hide();
          //清空小数位数配置
          that.$Control.removeAttr("data-decimalPlaces");
          that.$Control.find("input").attr("placeholder", "");
        }
        //that.Settings['decimalChecked'] = val;
      });
      //keydown是为了防止用户输入"{"和"}"
      $proInput.keydown(function (event) {
        var keyCode = event.keyCode;
        if (keyCode == 219 || keyCode == 221) {
          return false;
        }
      });
      $proInput.on('blur', function () {
        var $this = $(this);
        var newValue = $this.val().replace(/[{}]/g, '');
        newValue = $.IFilterCharacter(newValue);
        $this.val(newValue);
        $this.keyup();
      });
      $proInput.keyup(function () {
        //字段名称不允许包含"{"或"}"
        var newValue = $(this).val().replace(/[{}]/g, '');
        that.$Control.attr("data-" + designProperty.Name, newValue);
        that.Settings[designProperty.Name] = newValue;
        if (callback && $.isFunction(callback)) {
          callback.apply(that, [newValue, $(this)]);
        }
      });
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());

      //显示模式
      var idShowMode = $.IGuid();
      var $inputShowMode = $("<input  type='checkbox' id='" + idShowMode + "' name='" + designProperty.Name + "'>");
      var $labelShowMode = $("<label for='" + idShowMode + "' style='padding:0;margin:5px' >显示千位分隔符</label>");
      $div2.append($inputShowMode).append($labelShowMode);
      $div.append($div1).append($div2)
      propertyManager.AddItem($div);
      var defaultValShowModal = that.$Control.attr('data-ShowMode');
      if (defaultValShowModal == '1') {
        $inputShowMode.attr("checked", true);
      } else {
        $inputShowMode.attr("checked", false);
      }
      $div2.off('click').on('click', 'input,label', function () {
        var val = $inputShowMode.is(":checked");
        if (val) {
          that.$Control.attr('data-ShowMode', "1");
        } else {
          that.$Control.attr('data-ShowMode', "0");
        }
        that.Settings['ShowMode'] = val;
      });
      return propertyManager;
    };

    this.RenderTextBox = function (designProperty, callback) {
      var that = this;
      //是否控件不要渲染名称
      var propertyName = designProperty.Name;
      var propertyValue = designProperty.DefaultValue;
      if (propertyName == "DisplayName" && that.ControlKey == "FormCheckbox") {
        return;
      }
      var propertyManager = new $.PropertyManager(propertyName);
      propertyManager.SetTitle(designProperty.Text);
      propertyName === "DisplayRule" && propertyManager.$Title.css("position", "relative").append("<span class='property-tip'>当满足以下条件时此控件隐藏</span>");
      propertyName === "ComputationRule" && propertyManager.$Title.css("position", "relative").append("<i data-tip='1.通过“函数公式”得到最终值,例如{单价}*{数量}=总价<br/>2.可实现字段“默认值”,例如:{单价}=1' class='ivu-icon ivu-icon-help-circled'style='color:#2d7fff'></i>");

      //右上角显示控件名称
      if (propertyName == "DisplayName") {
        switch (that.DataField) {
          case "OwnerId":
            propertyValue = "拥有者";
            break;
          case "OwnerDeptId":
            propertyValue = "所属部门";
            break;
          case "CreatedTime":
            propertyValue = "创建时间";
            break;
          case "ModifiedTime":
            propertyValue = "修改时间";
            break;
          case "CreatedBy.FullName":
            propertyValue = "创建人";
            break;
        }
        if (propertyValue) {
          propertyManager.AddHeadRightText(propertyValue);
        }
      }

      //控件名称不要取默认值
      var defaultValue = this.Settings[propertyName] || "";
      if (propertyName != "DisplayName") {
        defaultValue = (this.Settings[propertyName] || propertyValue) + '';
      }
      //初始化input里面的数据
      if (propertyName == "PlaceHolder" && callback && $.isFunction(callback)) {
        callback.apply(that, [defaultValue, $(this)]);
      }
      //初始时候执行回调
      if (propertyName == 'IncrementNum') {
        var item = this.$Control.find('input');
        var prefix = item.data('Prefix') || '';
        var dateMode = item.data('DateMode') || '';
        var incrementNum = defaultValue;
        var len = 0;
        len += prefix.length;
        len += dateMode == 'None' ? 0 : dateMode.length;
        len += parseInt(defaultValue);
        if (len > 20) {
          defaultValue = (20 - prefix.length - (dateMode == 'None' ? 0 : dateMode.length)) + '';
        }
        if (callback && $.isFunction(callback)) {
          callback.apply(that, [defaultValue, $(this)]);
        }
      }
      var $item;
      if (propertyName === "PlaceHolder") {
        $item = $("<textarea maxlength=20 style='width:100%; line-height:20px;resize:none;overflow-y:scroll' class='property-input' rows='1'>").val(defaultValue.replace(/(^\s*)|(^\s*$)/g, ""));
      } else if (designProperty.Name === 'Description') {
        $item = $("<textarea maxlength=2000 style='width:100%; resize:none;line-height:20px;overflow-y:scroll' class='property-input' rows='2'>").val(defaultValue.replace(/(^\s*)|(^\s*$)/g, ""));
        //升级处理，原来是describe，后面改成了description。只有灰度有这个问题
        that.$Control.find("i.icon-exclamation-circle").addClass("ivu-icon-help-circled").removeClass("icon-exclamation-circle");
        var describe = that.$Control.attr("data-describe");
        that.$Control.attr("data-description", describe).removeAttr("data-describe");
        that.$Control.find("div.describeBox").addClass("descriptionBox").removeClass("describeBox");
      } else {
        $item = $("<input maxlength=10 class='property-input'>").val(defaultValue.replace(/(^\s*)|(^\s*$)/g, ""));
        if (designProperty.Text == "隐藏条件") {
          $item.attr('placeholder', '添加隐藏条件');
        }
      }

      //keydown是为了防止用户输入"{"和"}"
      $item.keydown(function (event) {
        var keyCode = event.keyCode;
        if (keyCode == 219 || keyCode == 221) {
          return false;
        }
      });
      $item.on('blur', function () {
        var $this = $(this);
        var newValue = $this.val().replace(/[{}]/g, '');
        newValue = $.IFilterCharacter(newValue);
        $this.val(newValue);
        $this.keyup();
      });
      $item.keyup(function () {
        //字段名称不允许包含"{"或"}"
        var newValue = $(this).val().replace(/[{}]/g, '');
        if (propertyName == "IncrementNum") {
          if (isNaN(newValue) || parseInt(newValue) == 0) {
            newValue = 1;
            $(this).val(1);
          }
        }
        that.$Control.attr("data-" + propertyName, newValue);
        that.Settings[propertyName] = newValue;
        if (callback && $.isFunction(callback)) {
          callback.apply(that, [newValue, $(this)]);
        }
      });
      if (propertyName === "DisplayRule" || propertyName === "ComputationRule") {
        // propertyManager.AddItem($item).addClass("icon-add");
        propertyManager.AddItem($item);
      } else {
        propertyManager.AddItem($item);
      }

      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());

      if (propertyValue == "关联属性") {
        var $itemglsx = $("<div class='property-group'><label class='glsxlabel'>注：关联其他表单的某个字段，且会跟随关联表单对应的字段值实时变化</label></div>")
        that.$SheetControlPropertysPanel.append($itemglsx);
      }
      return propertyManager;
    };
    //// 文本框可现实行数输入框
    this.RenderNumTextBox = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);

      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $item = $("<input maxlength=10 class='property-input'>").val(defaultValue);

      $item.keyup(function () {
        var newValue = $(this).val($(this).val().replace(/[^\d]/g, ''));

        if (parseInt(newValue.val()) > 10) {
          $.IShowWarn("可见行数不能超过 10");
          newValue.val(10);
        }
        that.$Control.attr("data-" + designProperty.Name, $(this).val());
        that.Settings[designProperty.Name] = $(this).val();
        if (callback && $.isFunction(callback)) {
          callback.apply(that, [$(this).val()]);
        }
      });

      propertyManager.AddItem($item);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };

    this.RenderPrefix = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);

      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $item = $(`<input maxlength=${designProperty.MaxLength} class='property-input'>`).val(defaultValue);
      //初始渲染时候也要更新预览
      if (callback && $.isFunction(callback)) {
        callback.apply(that, [defaultValue]);
      }
      $item.keyup(function () {
        var reg = new RegExp(`^[a-zA-Z0-9]{0,${designProperty.MaxLength}}$`);
        var val = $(this).val();
        if (!reg.test(val)) {
          $.IShowError(`前缀必须是${designProperty.MaxLength}位以内的字母或数字`);
          // $(this).val("");
          return;
        }
        that.$Control.attr("data-" + designProperty.Name, val);
        that.Settings[designProperty.Name] = val;
        //这里要更新预览
        if (callback && $.isFunction(callback)) {
          callback.apply(that, [val]);
        }
      });

      propertyManager.AddItem($item);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };

    this.RenderRadio = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;

      var $lineDiv = null;
      for (var i = 0; i < designProperty.ValueRange.length; i++) {
        if (i % 2 == 0) {
          $lineDiv = $("<div>");
        }
        var $div = $("<div>").css({ "width": "50%", "float": "left", "overflow": "hidden" });
        var range = designProperty.ValueRange[i];

        var id = $.IGuid();
        var $input = $("<input  type='radio' id='" + id + "' name='" + designProperty.Name + "'>").val(range.Val);
        var $label = $("<label style='padding-left:0;' for='" + id + "' class='radio-inline'>" + range.Text + "</label>");
        $div.append($input).append($label);


        $input.click(range, function (e) {
          that.$Control.attr("data-" + designProperty.Name, $(this).val());
          that.Settings[designProperty.Name] = $(this).val();
          if (callback && $.isFunction(callback)) {
            callback.apply(that, [e.data]);
          }
        });

        if (range.Val == 'Telephone') {
          if (defaultValue == 'Mobile' || defaultValue == 'Telephone') {
            $input.prop("checked", "checked");
            $input.click();
          }
        } else {
          if (range.Val + "" == defaultValue + "") {
            $input.prop("checked", "checked");
            $input.click();
          }
        }


        $lineDiv.append($div);
        if (i % 2 == 1 || i == designProperty.ValueRange.length - 1) {
          propertyManager.AddItem($lineDiv.children());
        }
      }

      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };
    this.RenderAsFilter = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $div = $("<div style='width:100%;float:left;overflow:hidden;'>");
      var id = $.IGuid();
      var $input = $("<input  type='checkbox' id='" + id + "' name='" + designProperty.Name + "'>");
      var $label = $("<label for='" + id + "' style='padding:0;margin:5px' >设置为关联表单下拉搜索项<i data-tip='选择后，在搜索关联表单数据时支持此字段的���速搜索。' class='ivu-icon ivu-icon-help-circled'style='color:#2d7fff'></i></label>");//.css("padding", "0px").css("margin", "5px").text("显示详细地址");


      //$div.append($input).append($label);
      $input.unbind("change.asFilter").bind("change.asFilter", function (e) {
        var val = this.checked;
        that.$Control.attr("data-" + designProperty.Name, val);
        that.Settings[designProperty.Name] = val;
        if (callback && $.isFunction(callback)) {
          callback.call(that, val);
        }
      });
      propertyManager.AddItem($div);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      if (defaultValue == "true") {
        $input[0].checked = true;
      }
      return propertyManager;
    }
    this.RenderCheckbox = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $div = $("<div style='width:100%;float:left;overflow:hidden;'>");
      var id = $.IGuid();
      var $input = $("<input  type='checkbox' id='" + id + "' name='" + designProperty.Name + "'>");
      var $label = $("<label for='" + id + "' style='padding:0;margin:5px' >显示详细地址</label>");
      $div.append($input).append($label);
      $input.unbind("change.showDetail").bind("change.showDetail", function (e) {
        var val = this.checked;
        that.$Control.attr("data-" + designProperty.Name, val);
        that.Settings[designProperty.Name] = val;
        if (callback && $.isFunction(callback)) {
          callback.call(that, val);
        }
      });
      propertyManager.AddItem($div);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      if (defaultValue == "true") {
        $input[0].checked = true;
      }
      return propertyManager;
    }
    //不允许重复值
    this.RenderNoRepeat = function (designProperty) {
      //子表内单行文本不需要检查重复
      if (this.DataField.indexOf('.') > -1) {
        return;
      }
      
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $div = $("<div style='width:100%;float:left;overflow:hidden'>");
      var id = $.IGuid();
      var $input = $("<input  type='checkbox' id='" + id + "' name = '" + designProperty.Name + "' >");
      var $label = $("<label for='" + id + "' style='padding:0;margin:5px' >不允许重复录入</label>");
      propertyManager.SetTitle("校验");
      $div.append($input).append($label);
      $input.off("change.norepeat").on("change.norepeat", function (e) {
        var val = this.checked;
        that.$Control.attr('data-' + designProperty.Name, val);
        that.Settings[designProperty.Name] = val;
      });
      if(this.Designer.isOpenBigForm==true){
        $input.attr("disabled", "disabled");
      }
      propertyManager.AddItem($div);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      if (defaultValue == "true") {
        $input[0].checked = true;
      }
      return propertyManager;
    };

    this.RenderScanInput = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $div = $("<div style='width:100%;float:left;overflow:hidden;'>");
      var id = $.IGuid();
      var $input = $("<input  type='checkbox' id='" + id + "' name='" + designProperty.Name + "'>");
      var $label = $("<label for='" + id + "' style='padding:0;margin:0 5px' >" + designProperty.Text + "</label>");
      $div.append($input).append($label);
      $input.unbind("change.showDetail").bind("change.showDetail", function (e) {
        var val = this.checked;
        that.$Control.attr("data-" + designProperty.Name, val);
        that.Settings[designProperty.Name] = val;
        if (callback && $.isFunction(callback)) {
          callback.call(that, val, designProperty.Name);
        }

        if (designProperty.Name == "InputByScan") {
          $("input[name=ScanUpdateEnable]").prop("checked", val);
          $("input[name=ScanUpdateEnable]").change();
        }
      });
      propertyManager.AddItem($div);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());

      // if (that.$Control.attr("data-controlkey") != "FormQuery") {
      //   propertyManager.SetTitle("校验");
      // }

      // if (designProperty.Name == "InputByScan") {
      propertyManager.SetTitle("扫码");
      if (that.ControlKey == "FormTextBox") {
        propertyManager.$Title.css("position", "relative").append("<i data-tip='支持扫条形码、二维码' class='ivu-icon ivu-icon-help-circled'></i>");
      } else {
        propertyManager.$Title.css("position", "relative").append("<i data-tip='仅识别关联表单中数据对应的二维码，可在列表打印二维码或数据详情页获取' class='ivu-icon ivu-icon-help-circled' style='color:#2d7fff'></i>");
      }

      // }

      if (defaultValue == "true") {
        $input[0].checked = true;
      }

      if (designProperty.Name == "ScanUpdateEnable") {
        propertyManager.$Header.remove();
        var canInputByScan = this.Settings["InputByScan"];
        if (canInputByScan && canInputByScan != "false") {
          propertyManager.$Group.show();
        } else {
          propertyManager.$Group.hide();
        }
      }

      return propertyManager;
    }
    this.RenderTransferLink = function (designProperty, callback) {
      var that = this;
      //当前控件类型
      var currentControlKey = that.ControlKey;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var $linkItem = $("<div id='changeToOtherType'>转换为其他类型控件</div>");
      propertyManager.AddItem($linkItem);
      //调整TransferContent内容
      that.TransferContent.empty();
      var valueRange = designProperty.ValueRange;
      var $transferItem;
      //将可以转换的控件放到content中
      for (var i = 0; i < valueRange.length; i++) {
        var val = valueRange[i].Val;
        var text = valueRange[i].Text;
        var id = $.IGuid();
        var $input = $("<input type='radio' name = 'transferItems' value='" + val + "' id='" + id + "' />");
        var $label = $("<label for='" + id + "' data-val='" + val + "' class='radio-inline'>" + text + "</label>");
        $transferItem = $("<p>").append($input).append($label);
        if (val == currentControlKey) {
          $input.prop("checked", "true");
        }
        that.TransferContent.append($transferItem);
      }
      $linkItem.off("click").on("click", function () {
        if (that.TransferModal) {
          that.TransferModal.show();
        } else {
          var Actions = [{
            Text: "确定",
            Theme: 'btn_ok',
            CallBack: function () {
              var checkedVal = that.TransferContent.find("input[type=radio]:checked").val()
              that.TransferModal.hide();
              //切换成其他控件的属性
              if (checkedVal) {
                //获取选项
                var defaultItems = that.$Control.attr("data-defaultitems");
                defaultItems && (defaultItems = JSON.parse(defaultItems));
                that.$Control.attr("data-controlkey", checkedVal).attr("data-transferitems", checkedVal);
                var $outer = that.$Control.find("div[class^='col-sm-']").html("");
                switch (checkedVal) {
                  case "FormTextBox": {
                    //文本框
                    $outer.append($('<input type="text" class="notdrag"/>').prop("readOnly", "true").css("width", "100%"));
                  } break;
                  case "FormRadioButtonList":
                  case "FormCheckboxList": {
                    var type = checkedVal == "FormCheckboxList" ? "checkbox" : "radio";
                    var $input = $("<div class='row notdrag'>");
                    if (defaultItems == undefined) {
                      defaultItems = ["选项1", "选项2", "选项3"];
                    }
                    for (var i = 0; i < defaultItems.length; i++) {
                      var id = $.IGuid();
                      var $select = $('<input type="' + type + '"  id="' + id + '"/><label for="' + id + '">' + defaultItems[i] + '</label>').prop("disabled", "disabled");
                      $input.append($select);
                    }
                    $outer.append($input);
                  } break;
                  case "FormDropDownList": {
                    //下拉框 
                    var $input = $("<select class='form-control form-group-margin notdrag' style='width:100%'>");
                    $outer.append($input);
                  } break;
                }
                sheetDesigner.LoadPropertySetting.call(sheetDesigner, that.DataField);
              }
            }
          }, {
            Text: '取消',
            Theme: 'btn_cancel',
            CallBack: function () {
              that.TransferModal.hide();
            }
          }];

          that.TransferModal = new $.IModal({
            Title: '转换为其他控件',
            Width: 420,
            ShowBack: true,
            HasIframe: false,
            Content: that.TransferContent,
            ToolButtons: Actions,
            ContentUrl: ''
          });
        }
      });
      propertyManager.$Header.css("display", "none");
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };

    this.RenderTransferRadio = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;

      var $lineDiv = null;
      for (var i = 0; i < designProperty.ValueRange.length; i++) {
        if (i % 2 == 0) {
          $lineDiv = $("<div>");
        }
        var $div = $("<div style='width:50%;float:left;overflow:hidden;'>");
        var range = designProperty.ValueRange[i];
        var id = $.IGuid();
        var $inputs = $("<input  type='radio' id='" + id + "' name='" + designProperty.Name + "'>").val(range.Val);
        var $label = $("<label style='padding-left:0' for='" + id + "' data-val='" + range.Val + "' class='radio-inline'>" + range.Text + "</label>");
        $div.append($inputs).append($label);
        if ($.inArray(that.DataField, that.Designer.PreInstalledFields) == -1) {
          $label.click(function (e) {
            var val = $(this).attr("data-val");
            that.$Control.attr("data-" + designProperty.Name, val).attr("data-controlkey", val);
            var defaultItems = that.$Control.attr("data-DefaultItems");
            if (defaultItems == void 0 || defaultItems == "") {
              that.$Control.attr("data-DefaultItems", JSON.stringify((eval(that.Settings['DefaultItems']) || that.Settings["DefaultItems"].DefaultValue)));
            }
            that.Settings[designProperty.Name] = val;
            that.ControlKey = val;
            that.Settings.ControlKey = val;
            if (callback && $.isFunction(callback)) {
              callback.apply(that, [val]);
            }
          });
        }

        if (range.Val + "" == defaultValue + "") {
          $inputs.prop("checked", "checked");
          $inputs.click();
        }
        $lineDiv.append($div);
        if (i % 2 == 1 || i == designProperty.ValueRange.length - 1) {
          propertyManager.AddItem($lineDiv.children());
        }
      }

      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };

    //公式型控件绑定类型
    this.RenderBindTypeRadio = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;

      var $modeSelect = $("<select id='" + designProperty.Name + "' name='" + designProperty.Name + "' style='width:100%;'></select>");
      var valueRange = designProperty.ValueRange;
      propertyManager.SetTitle(designProperty.Text);
      for (var i = 0; i < valueRange.length; i++) {
        $modeSelect.append('<option value="' + valueRange[i].Val + '">' + valueRange[i].Text + '</option>');
      }
      propertyManager.AddItem($modeSelect);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      $modeSelect.val(defaultValue);
      $modeSelect.off('change.showmode').on('change.showmode', function (e) {
        var val = $modeSelect.val();
        that.$Control.attr("data-bindtype", val);
        that.Settings[designProperty.Name] = val;
        if (val == "number") {
          that.PropertyManagers["DecimalPlaces"] && that.PropertyManagers["DecimalPlaces"].Show();
          that.PropertyManagers["ShowMode"] && that.PropertyManagers["ShowMode"].Show();
        } else {
          that.PropertyManagers["DecimalPlaces"] && that.PropertyManagers["DecimalPlaces"].Hide();
          that.PropertyManagers["ShowMode"] && that.PropertyManagers["ShowMode"].Hide();
        }

      });
      if ($.inArray(that.DataField, that.Designer.PreInstalledFields) == -1) {
        $modeSelect.change();
      }
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };

    this.RenderDefaultItems = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      if (callback && $.isFunction(callback)) {
        propertyManager.CallBack = callback;
      }

      var defaultValues;
      if (that.ControlKey != "FormCheckbox") {
        defaultValues = this.Settings["DefaultValue"] || []
      }
      else {
        defaultValues = eval(this.Settings["DefaultValue"]) == null ? false : eval(this.Settings["DefaultValue"]);
      }
      var items = eval(this.Settings[designProperty.Name]) || designProperty.DefaultValue;
      //如果配置的是数据字典，则从数据字典中读取数据
      var dataDictName = this.$Control.attr("data-datadictitemname");
      if (dataDictName) {
        //根据字典名从后台取字典数据项
        that.Designer.Requst(that.Designer.Action_LoadDataDictValueByItemName, {
          ItemName: dataDictName
        }, function (data) {
          if (data.Successful && data.ReturnData.DataDictItemValue != void 0 && data.ReturnData.DataDictItemValue != '') {
            items = data.ReturnData.DataDictItemValue.split(';');
            that.$Control.removeAttr("data-datadictitemname");
            that.$Control.attr("data-datasource", "Custom");
          }
        }, false);
      }
      var inputType = (this.ControlKey == "FormCheckboxList" || this.ControlKey == "FormCheckbox") ? "checkbox" : "radio";

      //是否控件不需要执行以下操作
      if (that.ControlKey != "FormCheckbox") {
        propertyManager.AddBottomButton("", "添加选项", '', function () {
          var index = propertyManager.$Items.length + 1;
          AddItemElement("选项" + index);
          executeCallback();
          that.$SheetControlPropertysPanel.getNiceScroll().resize();
        });

        propertyManager.AddBottomButton("", "批量编辑", '', function () {
          var SubmitFunction = function () {
            var vals = that.Designer.$MultiModal.Content.find("textarea").val();
            var multiItems = vals.split("\n");

            //校验选项长度
            var itemTotalLength = 0;
            for (var i = 0; i < multiItems.length; i++) {
              var itemContent = multiItems[i].trim();
              if (that.ControlKey == "FormRadioButtonList" && itemContent.length > 200) {
                //单选框选项长度不能超过200
                $.IShowError("单选框单个选项长度不能超过200");
                return;
              } else if (that.ControlKey == "FormDropDownList" && itemContent.length > 200) {
                //下拉框选项长度不能超过200
                $.IShowError("下拉框单个选项长度不能超过200");
                return;
              }
              itemTotalLength += itemContent.length;
            }

            propertyManager.ClearItems();
            for (var i = 0; i < multiItems.length; i++) {
              var itemContent = multiItems[i].trim();
              if (itemContent != "") {
                AddItemElement(itemContent);
              }
            }
            executeCallback();
            that.Designer.$MultiModal.hide();
            $("#SheetControlPropertysPanel").getNiceScroll().resize();
          };

          var items = JSON.parse(that.$Control.attr("data-" + designProperty.Name));
          if (that.Designer.$MultiModal == null) {
            var $div = $("<div style='height:100%;'></div>")
            var $tip = $("<p style='margin-bottom:10px;'>每行对应一个选项</p>")
            var $textarea = $("<textarea style='width:100%;height:93%;resize:none;line-height: 25px;padding: 10px;'>");
            for (var i = 0; i < items.length; i++) {
              $textarea.val($textarea.val() + items[i] + "\n");
            }
            $div.append($tip).append($textarea);
            var Actions = [{
              Text: "生成选项",
              Theme: 'btn_ok',
              CallBack: SubmitFunction
            }, {
              Text: '取消',
              Theme: 'btn_cancel',
              CallBack: function () {
                that.Designer.$MultiModal.hide();
              }
            }];
            that.Designer.$MultiModal = new $.IModal({
              Title: '批量编辑',
              Width: 530,
              Height: 474,
              ShowBack: true,
              HasIframe: false,
              Content: $div,
              ToolButtons: Actions,
              ContentUrl: ''
            });
          } else {
            that.Designer.$MultiModal.ActionObjects[0].CallBack = SubmitFunction;
            that.Designer.$MultiModal.Content.find("textarea").val("");
            var items = JSON.parse(that.$Control.attr("data-" + designProperty.Name));
            for (var i = 0; i < propertyManager.$Items.length; i++) {
              var temp = that.Designer.$MultiModal.Content.find("textarea").val();
              that.Designer.$MultiModal.Content.find("textarea").val(temp + items[i] + "\n");
            }
            that.Designer.$MultiModal.show();
          }
        });
      }

      var AddItemElement = function (item) {
        var id = $.IGuid();
        var $div = $("<div class='row'>");
        var $left = $("<div class='col-sm-1' style='padding:3px 0px 0px 0px;margin:0'>");
        var $input = $("<input type='" + inputType + "' id='" + id + "' name='" + designProperty.Name + "'>").val(item);
        var $lable = $("<label for='" + id + "' style='padding:0;margin:0;' ></label>");
        $left.append($input).append($lable);
        var $minddle = $("<div class='col-sm-9' style='padding:0px 0px 0px 5px;margin:0;'>");
        var $item = $("<input class='property-input'>").val(item);
        $minddle.append($item);
        $div.append($left).append($minddle);

        // add 判断 by xiechang 当为单选框时不需要显示此操作按钮
        if (that.ControlKey != "FormCheckbox") {
          if (defaultValues != [] && defaultValues.indexOf(item) > -1) {
            $input.prop("checked", true);
            $input.data("ischecked", "1"); //判断是否选中
          }

          var $right1 = $("<div class='col-sm-1'>").css({
            "padding": "3px 0px 0px 2px",
            "margin-top": "2px",
            "text-align": "center",
            "font-size": "18px"
          });
          var $btnRemove = $('<i class="ivu-icon ivu-icon-trash-a" style="cursor:pointer;color:red"></i>');
          $right1.append($btnRemove);

          var $right2 = $("<div class='col-sm-1'>").css({
            "padding": "3px 0px 0px 2px",
            "margin-top": "2px",
            "text-align": "center",
            "font-size": "18px"
          });
          var $btnMove = $('<i class="ivu-icon ivu-icon-arrow-move" style="cursor:pointer"></i>');
          $right2.append($btnMove);
          $div.append($right1).append($right2)
        } else {
          $input.prop("checked", defaultValues);
        }
        propertyManager.AddItem($div);

        $input.click(function () {
          if ($(this).data("ischecked") == "1") {
            $(this).prop("checked", false).data("ischecked", "0");
          } else {
            $(this).closest("ul").find("input:radio[name=" + designProperty.Name + "]").data("ischecked", "0");
            $(this).data("ischecked", "1");
          }
          if (callback && $.isFunction(callback)) {
            callback.apply(that, [designProperty.Name]);
          }
        });
        $item.on('blur', function () {
          var $this = $(this);
          var newValue = $.IFilterCharacter($this.val());
          $this.val(newValue);
          $this.keyup();
        });
        $item.keyup(function (e) {
          if (that.ControlKey === "FormCheckbox") {
            //是否控件
            var val = $(this).val().trim();
            that.$Control.attr("data-DisplayName", val);
            that.Settings["DisplayName"] = val;
          } else if (that.ControlKey == "FormRadioButtonList") {
            //单选框
            var val = $(this).val().trim();
            if (val.length > 200) {
              $.IShowError("单选框单个选项长度不能超过200");
              val = val.slice(0, 200);
              $(this).val(val);
            }
          } else if (that.ControlKey == "FormDropDownList") {
            //下拉框
            var val = $(this).val().trim();
            if (val.length > 200) {
              $.IShowError("下拉框单个选项长度不能超过200");
              val = val.slice(0, 200);
              $(this).val(val);
            }
          } else if (that.ControlKey == "FormCheckboxList") {
            //复选框
            var val = $(this).val().trim();
            //计算当前选项的序号
            var index = parseInt($(this).closest("div.row").attr("data-index"));
            var itemLength = val.length;
            var defaultItems = that.$Control.attr("data-defaultitems") || [];
            if (typeof defaultItems == "string") {
              defaultItems = JSON.parse(defaultItems);
            }
            var totalLength = 0;
            for (var i = 0; i < defaultItems.length; i++) {
              if (i != index) {
                totalLength += defaultItems[i].length;
              }
            }
            if (totalLength + itemLength > 200) {
              $.IShowError("复选框选项总长度不能超过200");
              var leftLenth = 200 - totalLength;
              val = val.slice(0, leftLenth);
              $(this).val(val);
            }
          }

          if (callback && $.isFunction(callback)) {
            callback.apply(that, [designProperty.Name]);
          }
        });

        $btnRemove && $btnRemove.click(function () {
          if (propertyManager.$Items.length == 1) {
            $.IShowWarn("最后一项，不允许删除");
          } else {
            propertyManager.RemoveItem($(this).closest("li"));
          }
          if (callback && $.isFunction(callback)) {
            callback.apply(that, [designProperty.Name]);
          }
        });
      };

      //执行回调函数
      var executeCallback = function () {
        if ($.isFunction(callback)) {
          if (that.PropertyManagers[designProperty.Name]) {
            var items = that.$SheetControlPropertysPanel.find("div[propertyname='DefaultItems']").find("ul.property-items>li").children();
            var $items = [];
            for (var i = 0; i < items.length; i++) {
              $items.push($(items[i]));
            }
            that.PropertyManagers[designProperty.Name].$Items = $items;
            //修改“批量”按钮
          } else {
            that.PropertyManagers[designProperty.Name] = propertyManager;
          }
          callback.apply(that, [designProperty.Name]);
        }
      };

      for (var i = 0; i < items.length; i++) {
        AddItemElement(items[i]);
      }
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());

      that.$SheetControlPropertysPanel.find("div[propertyname='DefaultItems'] ul").sortable({
        forcePlaceholderSize: true,
        placeholder: "ColumnItem",
        axis: "y",
        over: function (e, ui) {
          $(this).find(".drop-item").show();
          $(ui.helper).css({
            "background-color": "rgb(255, 255, 255)",
            "top": "0px",
            "left": " 0px"
          });
        },
        stop: function (e, ui) {
          executeCallback();
        },
        out: function (e, ui) {
        }
      });
      executeCallback();
      return propertyManager;
    };

    this.RenderDataDictItem = function (designProperty, callback) {
      var that = this;
      var inputType = this.ControlKey == "FormCheckboxList" ? "checkbox" : "radio";
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      var defaultValue = that.Settings[designProperty.Name] || designProperty.DefaultValue;

      var AddDataDictItems = function () {
        if (that.Designer.DataDictItemNames && that.Designer.DataDictItemNames.length > 0) {
          for (var dindex = 0, dlen = that.Designer.DataDictItemNames.length; dindex < dlen; dindex++) {
            $itemSelect.append("<option value='" + that.Designer.DataDictItemNames[dindex] + "'>" + that.Designer.DataDictItemNames[dindex] + "</option>");
          }
        }
      };

      var $itemSelect = $("<select id='" + designProperty.Name + "' name='" + designProperty.Name + "' style='width:100%;'></select>");
      $itemSelect.append("<option value=''>--请选择--</option>");
      AddDataDictItems();
      propertyManager.AddItem($itemSelect);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      var $SelectedItem = $('<div style="display: none;"></div>');
      $itemSelect.data("target", $SelectedItem);

      $itemSelect.change(function () {
        var itemName = $(this).val();
        //设置的默认值
        var defaultValues = that.Settings["DefaultValue"] || [];
        var $curControl = that.$Control;
        $curControl.attr("data-" + designProperty.Name, itemName);
        that.Settings[designProperty.Name] = itemName;
        //根据itemName查找字典值
        var $SelectedItem = $(this).data("target");
        that.Designer.Requst(that.Designer.Action_LoadDataDictValueByItemName, {
          ItemName: itemName
        }, function (data) {
          if (data.Successful && data.ReturnData.DataDictItemValue != void 0 && data.ReturnData.DataDictItemValue != '') {
            var items = data.ReturnData.DataDictItemValue.split(';');
            if (items && items.length > 0) {
              $SelectedItem.html('<div class="selected-title">数据字典值</div>');
              for (var i = 0, len = items.length; i < len; i++) {
                //数据字典添加默认值勾选项
                var dictRowDiv = $("<div class='row'>").attr("data-index", i);
                var id = "dict" + i
                var $left = $("<div class='col-sm-1'>").css({ "padding": "3px 0px 0px 0px", "margin": "0px" });
                var $input = $("<input>").attr({ "type": inputType, "id": id, "name": designProperty.Name }).val(items[i]);
                var $label = $("<label for='" + id + "' ></label>").css({ "padding": "0px", "margin": "0px" });
                $left.append($input).append($label);
                var $minddle = $("<div class='col-sm-9'>").css({ "padding": "0px 0px 0px 5px", "margin": "0px" });
                $minddle.append("<div class='property-selected'>" + items[i] + "</div>");
                dictRowDiv.append($left).append($minddle);
                $SelectedItem.append(dictRowDiv);
                if (defaultValues != [] && defaultValues.indexOf(items[i]) > -1) {
                  $input.prop("checked", true);
                  $input.data("ischecked", "1"); //判断是否选中
                }
                $input.click(function () {
                  //单选框取消选中
                  if ($(this).data("ischecked") == "1") {
                    $(this).prop("checked", false);
                    $(this).data("ischecked", "0");
                  } else {
                    $SelectedItem.find("input:radio[name=" + designProperty.Name + "]").data("ischecked", "0");
                    $(this).data("ischecked", "1");
                  }

                  if (callback && $.isFunction(callback)) {
                    callback.apply(that, [designProperty.Name, $SelectedItem.find("div.row")]);
                  }
                });
              }
              //选择数据字典时控件显示数据字典选项
              if (callback && $.isFunction(callback)) {
                if ($SelectedItem.find("div.row").length > 0) {
                  callback.apply(that, [designProperty.Name, $SelectedItem.find("div.row")]);
                }
              }
            }
          }
        }, false);
        // 设置选项设置是否显示
        if (itemName == "") {
          that.PropertyManagers["DefaultItems"] && that.PropertyManagers["DefaultItems"].Show();
          $SelectedItem.remove();
          //表单设计页面显示选项值
          $("div[propertyname=DefaultItems]").find("input:radio,input:checkbox").first().click();
        }
        else {
          that.PropertyManagers["DefaultItems"] && that.PropertyManagers["DefaultItems"].Hide();
          $SelectedItem.show().insertAfter($(this));
        }
      });
      $itemSelect.val(defaultValue);
      defaultValue != "" && $itemSelect.change();
      return propertyManager;
    };

    //生成关联表单选择下拉框
    //如果有传入目标元素，则直接渲染目标
    this.GenerateBoSchemaDropDown = function (item) {
      var that = this;
      var $item = $("<input  class='property-input' placeholder='选择需要关联的表单' readonly name='BOSchemaCode'/>");
      if (item != void 0) {
        $item = $(item);
      }
      $item.click(function () {
        AppTree.destroyTree();//销毁所有树
        var $this = $(this);
        var dataField = that.DataField;
        if (dataField.indexOf('.') > 0) {
          dataField = dataField.slice(dataField.indexOf('.') + 1);
        }
        var setting = {
          treeId: 'apptree_' + dataField,
          displayType: AppTree.DisplayType.Popup,
          containerHeight: '300px',
          showOrganization: false,
          showSubSheet: true,
          showAssocation: false,
          showField: false,
          showSystem: false,
          events: {
            onClick: function (event, treeId, treeNode, clickFlag) {
              //先判断是否可以选择
              if (treeNode.NodeType != 'AppMenu' && treeNode.NodeType != 'SubSheet') {
                AppTree.getTreeObj().cancelSelectedNode(treeNode);
                return;
              }
              var boSchemaCode = treeNode.id;
              //如果关联的表单改变则要清除原来的关联配置/关联属性/关联过滤条件
              var oldBoSchemaCode = that.$Control.attr("data-BOSchemaCode");
              if (oldBoSchemaCode && oldBoSchemaCode != boSchemaCode) {
                that.$Control.removeAttr("data-mappingcontrols").removeAttr("data-mappingproperties").removeAttr("data-associationfilter");
              }
              that.$Control.attr("data-BOSchemaCode", boSchemaCode);
              var parentName = "";
              if (treeNode.NodeType == "SubSheet") {
                parentName = treeNode.getParentNode().name + ".";
              }
              that.Settings["BOSchemaCode"] = boSchemaCode;
              if ($this.find("input").length > 0) {
                $this.find("input").val(parentName + treeNode.name);
              } else {
                $this.val(parentName + treeNode.name);
              }
              //清除上次的关联配置
              if (that.ControlKey == "FormDropDownList") {
                //下拉框关联字段
                that.$Control.attr("data-mappingfield", "");
              } else {
                that.$Control.attr("data-mappingcontrols", "{}");
              }

              //下拉框关联字段
              if (that.PropertyManagers["MappingField"] != null) {
                that.InitDropDownListMappingFields(that.PropertyManagers["MappingField"], "");

              }
              // 重新构造权限继承自下拉框
              that.Designer.InitInheritObjectSelect();
              //--------获取AppPackage/AppGroup/AppMenu等,用于展开树时候定位节点-----
              var packageNode = null;
              var groupNode = null;
              var parentMenuNode = null;
              switch (treeNode.NodeType) {
                case 'SubSheet':
                  parentMenuNode = treeNode.getParentNode();
                  groupNode = parentMenuNode.getParentNode();
                  if (groupNode.NodeType == 'AppGroup') {
                    packageNode = groupNode.getParentNode();
                  } else {
                    packageNode = groupNode;
                    groupNode = null;
                  }
                  break;
                case 'AppMenu':
                  groupNode = treeNode.getParentNode();
                  if (groupNode.NodeType == 'AppGroup') {
                    packageNode = groupNode.getParentNode();
                  } else {
                    packageNode = groupNode;
                    groupNode = null;
                  }
                  break;
              }
              var boSchemaInfo = {
              };
              boSchemaInfo['AppPackage'] = packageNode == void 0 ? null : packageNode.Code;
              boSchemaInfo['AppGroup'] = groupNode == void 0 ? null : groupNode.Code;
              if (parentMenuNode != void 0) {//childSchema
                boSchemaInfo['AppMenu'] = parentMenuNode.Code;
                boSchemaInfo['IsChildSchema'] = true;
              } else {
                boSchemaInfo['AppMenu'] = null;
                boSchemaInfo['IsChildSchema'] = false;
              }
              that.$Control.attr("data-boSchemaInfo", JSON.stringify(boSchemaInfo));
              that.Settings["BOSchemaInfo"] = JSON.stringify(boSchemaInfo);
              //------------------------------end------------------
              AppTree.destroyTree();
              var $SelectList = that.$SheetControlPropertysPanel.find("select.form-control");
              if ($SelectList.length > 0) {
                $SelectList.each(function () {
                  $(this).DropDownList();
                });
              }
            },
            onExpand: function () {
              $('div[id="apptree_' + that.DataField + '"]').find(".center_open").addClass("arrow-down");
              $('div[id="apptree_' + that.DataField + '"]').find(".roots_open").addClass("arrow-down");
              $('div[id="apptree_' + that.DataField + '"]').find(".bottom_open").addClass("arrow-down");
            },
            onCollapse: function () {
              $('div[id="apptree_' + that.DataField + '"]').find(".center_close").addClass("arrow-right");
              $('div[id="apptree_' + that.DataField + '"]').find(".roots_close").addClass("arrow-right");
              $('div[id="apptree_' + that.DataField + '"]').find(".bottom_close").addClass("arrow-right");
            },
            onNodeCreated: function (event, treeId, treeNode) {
              $('div[id="apptree_' + that.DataField + '"]').find(".center_close").addClass("arrow-right");
              $('div[id="apptree_' + that.DataField + '"]').find(".roots_close").addClass("arrow-right");
              $('div[id="apptree_' + that.DataField + '"]').find(".bottom_close").addClass("arrow-right");

              var boSchemaInfo = that.$Control.attr('data-boSchemaInfo');
              var boSchemaCode = that.$Control.attr('data-boSchemaCode');
              if (boSchemaInfo == void 0 || $.isEmptyObject(boSchemaInfo)) {
                return;
              }
              var infoJson = $.parseJSON(boSchemaInfo);
              var appPackage = infoJson.AppPackage;
              var appGroup = infoJson.AppGroup;
              var appMenu = infoJson.AppMenu;

              var nodeCode = treeNode.Code;
              var nodeType = treeNode.NodeType;
              if (nodeType == 'AppPackage' && nodeCode == appPackage) {
                AppTree.getTreeObj().expandNode(treeNode);
              } else if (nodeType == 'AppGroup' && appGroup == nodeCode) {
                AppTree.getTreeObj().expandNode(treeNode);
              } else if (nodeType == 'AppMenu') {
                if (boSchemaCode == nodeCode) {
                  AppTree.getTreeObj().selectNode(treeNode);
                  return;
                }
                if (nodeCode == appMenu) {
                  AppTree.expandNode(treeNode);
                }
              } else if (nodeType == 'SubSheet') {
                if (boSchemaCode == nodeCode)
                  AppTree.getTreeObj().selectNode(treeNode);
              }
            }
          },
          target: $item
        };
        AppTree.init(setting);
        $('div[id="apptree_' + dataField + '"][class="ztree"]').addClass('ztree-boschema');
      });
      //设置关联表单名称
      if (that.Settings["BOSchemaCode"]) {
        that.SetBoSchemaDisplayName($item);
      }
      return $item;
    };

    //展示关联表单名称
    this.SetBoSchemaDisplayName = function (item) {
      var that = this;
      var boSchemaCode = that.Settings["BOSchemaCode"];
      that.BoSchema = that.Designer.PublishedSchemas[boSchemaCode];
      if (that.BoSchema == null) {
        var schemaCodes = [];
        schemaCodes.push(boSchemaCode);
        that.Designer.LoadPublishedSchemas(schemaCodes, function () { that.SetBoSchemaDisplayName(item) });
        return;
      }
      var displayName = "";
      if (that.BoSchema) {
        displayName = that.BoSchema.DisplayName;
      } else {
        //判断关联的是不是当前表单中子表
        var childView = that.Designer.$SheetContent.find('div[data-controlkey="FormGridView"][data-datafield="' + boSchemaCode + '"]');
        if (childView.length > 0) {
          displayName = childView.attr('data-displayname');
        }
      }
      var $childrenInput = item.find("input");
      if ($childrenInput != void 0 && $childrenInput.length > 0) {
        $childrenInput.val(displayName);
      } else {
        item.val(displayName);
      }
    };

    this.RenderBOSchemaCode = function (designProperty) {
      var that = this;
      //点击关联表单控件时候先把表单保存，这样可以选择到当前表单

      //如果关联表单控件没有选择关联的表单或者选择的关联表单是当前表单时候每次点击关联表单控件都要执行保存操作
      //20170727 只有在关联自己的时候才会保存
      if (that.Settings.BOSchemaCode == that.Designer.SheetCode) {
        that.Designer.Save(null, false);
      }

      var propertyManager = new $.PropertyManager(designProperty.Name);
      if (that.$Control.attr("data-datasource") == "Association" && that.$Control.attr("data-displayname") == "下拉框") {
        propertyManager.SetTitle('将根据以下表单字段生成选项');
      } else {
        propertyManager.SetTitle(designProperty.Text);
      }
      if (that.$Control.attr("data-controlkey") == "FormQuery") {
      }

      var $item = that.GenerateBoSchemaDropDown();
      //加载关联的表单
      //如果是saas表单不且当前用户不是开发者则不支持修改关联表单
      if ($.inArray(that.DataField, that.Designer.PreInstalledFields) > -1) {
        //是预装的字段，不能修改关联的表单
        $item.attr('disabled', 'disabled').off('click');
      }
      //设置关联表单名称


      // if (this.Settings["BOSchemaCode"] && this.BoSchema == null) {
      //   that.SetBoSchemaDisplayName($item);
      // } else if (this.BoSchema) {
      //   $item.val(this.BoSchema.DisplayName);
      // }

      propertyManager.AddItem($item).addClass('icon-arrow-down2');
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };


    //生成关联表单选择下拉框
    //如果有传入目标元素，则直接渲染目标
    this.GenerateFolderDropDown = function (item) {
      var that = this;
      var $item = $("<div style='position:relative'><input  class='property-input' placeholder='选择需要的文档库' readonly name='BOSchemaCode'/><span  id='folderDel' style='position:absolute;top:6px;right:10px;cursor:pointer;font-size:14px'>X</span></div>");
      if (item != void 0) {
        $item = $(item);
      }

      var $del =$item.find('#folderDel');
      $del.click(function(event){
        $item.find('input').val("");
        that.Settings["FolderName"]="";
        that.$Control.attr("data-folderName", "");
        event.stopPropagation();    //  阻止事件冒泡
            //return false;
      });
      $item.click(function () {
        AppTree.destroyTree();//销毁所有树
        var $this = $(this);
        var dataField = that.DataField;
        if (dataField.indexOf('.') > 0) {
          dataField = dataField.slice(dataField.indexOf('.') + 1);
        }
        var setting = {
          treeId: 'apptree_' + dataField,
          displayType: AppTree.DisplayType.Popup,
          containerHeight: '300px',
          showOrganization: false,
          showSubSheet: true,
          showAssocation: false,
          showField: false,
          showSystem: false,
          events: {
            onClick: function (event, treeId, treeNode, clickFlag) {
              //先判断是否可以选择
              if (treeNode.NodeType != 'AppMenu' && treeNode.NodeType != 'SubSheet') {
                AppTree.getTreeObj().cancelSelectedNode(treeNode);
                return;
              }
              var folderId = treeNode.id;
              //如果关联的表单改变则要清除原来的关联配置/关联属性/关联过滤条件
              var oldfolderId = that.$Control.attr("data-folderName");
              if (oldfolderId && oldfolderId != folderId) {
                //that.$Control.removeAttr("data-mappingcontrols").removeAttr("data-mappingproperties").removeAttr("data-associationfilter");
              }
              that.$Control.attr("data-folderName", folderId);
              var parentName = "";
              if (treeNode.NodeType == "SubSheet") {
                parentName = treeNode.getParentNode().name + ".";
              }
              that.Settings["FolderName"] = folderId;
              if ($this.find("input").length > 0) {
                $this.find("input").val(parentName + treeNode.name);
              } else {
                $this.val(parentName + treeNode.name);
              }

              //下拉框关联字段
              if (that.PropertyManagers["MappingField"] != null) {
                that.InitDropDownListMappingFields(that.PropertyManagers["MappingField"], "");

              }
              // 重新构造权限继承自下拉框
              that.Designer.InitInheritObjectSelect();
              //--------获取AppPackage/AppGroup/AppMenu等,用于展开树时候定位节点-----
              var packageNode = null;
              var groupNode = null;
              var parentMenuNode = null;
              switch (treeNode.NodeType) {
                case 'SubSheet':
                  parentMenuNode = treeNode.getParentNode();
                  groupNode = parentMenuNode.getParentNode();
                  if (groupNode.NodeType == 'AppGroup') {
                    packageNode = groupNode.getParentNode();
                  } else {
                    packageNode = groupNode;
                    groupNode = null;
                  }
                  break;
                case 'AppMenu':
                  groupNode = treeNode.getParentNode();
                  if (groupNode && groupNode.NodeType == 'AppGroup') {
                    packageNode = groupNode.getParentNode();
                  } else {
                    packageNode = groupNode;
                    groupNode = null;
                  }
                  break;
              }
              var folderInfo = {
              };
              folderInfo['AppPackage'] = packageNode == void 0 ? null : packageNode.Code;
              folderInfo['AppGroup'] = groupNode == void 0 ? null : groupNode.Code;
              if (parentMenuNode != void 0) {//childSchema
                folderInfo['AppMenu'] = parentMenuNode.Code;
                folderInfo['IsChildSchema'] = true;
              } else {
                folderInfo['AppMenu'] = null;
                folderInfo['IsChildSchema'] = false;
              }
              that.$Control.attr("data-folderInfo", JSON.stringify(folderInfo));
              that.Settings["FolderInfo"] = JSON.stringify(folderInfo);
              //------------------------------end------------------
              AppTree.destroyTree();
              var $SelectList = that.$SheetControlPropertysPanel.find("select.form-control");
              if ($SelectList.length > 0) {
                $SelectList.each(function () {
                  $(this).DropDownList();
                });
              }
            },
            onExpand: function () {
              $('div[id="apptree_' + that.DataField + '"]').find(".center_open").addClass("arrow-down");
              $('div[id="apptree_' + that.DataField + '"]').find(".roots_open").addClass("arrow-down");
              $('div[id="apptree_' + that.DataField + '"]').find(".bottom_open").addClass("arrow-down");
            },
            onCollapse: function () {
              $('div[id="apptree_' + that.DataField + '"]').find(".center_close").addClass("arrow-right");
              $('div[id="apptree_' + that.DataField + '"]').find(".roots_close").addClass("arrow-right");
              $('div[id="apptree_' + that.DataField + '"]').find(".bottom_close").addClass("arrow-right");
            },
            onNodeCreated: function (event, treeId, treeNode) {
              $('div[id="apptree_' + that.DataField + '"]').find(".center_close").addClass("arrow-right");
              $('div[id="apptree_' + that.DataField + '"]').find(".roots_close").addClass("arrow-right");
              $('div[id="apptree_' + that.DataField + '"]').find(".bottom_close").addClass("arrow-right");

              var folderInfo = that.$Control.attr('data-boSchemaInfo');
              var folderInfo = that.$Control.attr('data-boSchemaCode');
              if (folderInfo == void 0 || $.isEmptyObject(folderInfo)) {
                return;
              }
              var infoJson = $.parseJSON(folderInfo);
              var appPackage = infoJson.AppPackage;
              var appGroup = infoJson.AppGroup;
              var appMenu = infoJson.AppMenu;

              var nodeCode = treeNode.Code;
              var nodeType = treeNode.NodeType;
              if (nodeType == 'AppPackage' && nodeCode == appPackage) {
                AppTree.getTreeObj().expandNode(treeNode);
              } else if (nodeType == 'AppGroup' && appGroup == nodeCode) {
                AppTree.getTreeObj().expandNode(treeNode);
              } else if (nodeType == 'AppMenu') {
                if (boSchemaCode == nodeCode) {
                  AppTree.getTreeObj().selectNode(treeNode);
                  return;
                }
                if (nodeCode == appMenu) {
                  AppTree.expandNode(treeNode);
                }
              } else if (nodeType == 'SubSheet') {
                if (boSchemaCode == nodeCode)
                  AppTree.getTreeObj().selectNode(treeNode);
              }
            }
          },
          target: $item
        };
        setting.showFolderFlag = true
        AppTree.init(setting);
        $('div[id="apptree_' + dataField + '"][class="ztree"]').addClass('ztree-boschema');
      });
      //设置关联表单名称
      if (that.Settings["FolderName"]) {
        that.SetFolderDisplayName($item);
      }
      return $item;
    };

    //展示名称
    this.SetFolderDisplayName = function (item) {
      var that = this;
      var folderName = that.Settings["FolderName"];
      that.BoSchema = that.Designer.PublishedSchemas[folderName];
      if (that.BoSchema == null) {
        var currentId = JSON.parse(sessionStorage.getItem("currentApp")).appId;
        that.Designer.LoadFiles({ schemaCodes: currentId, controlId: that.Settings.DataField }, function () { that.SetFolderDisplayName(item) });
        return;
      }
      var displayName = "";
      if (that.BoSchema) {
        displayName = that.BoSchema.fileName;
      } else {
        var childView = that.Designer.$SheetContent.find('div[data-controlkey="FormGridView"][data-datafield="' + folderName + '"]');
        if (childView.length > 0) {
          displayName = childView.attr('data-displayname');
        }
      }
      var $childrenInput = item.find("input");
      if ($childrenInput != void 0 && $childrenInput.length > 0) {
        $childrenInput.val(displayName);
      } else {
        item.val(displayName);
      }
    };




    this.RenderFolderName = function (designProperty) {
      var that = this;
      //点击关联表单控件时候先把表单保存，这样可以选择到当前表单

      //如果关联表单控件没有选择关联的表单或者选择的关联表单是当前表单时候每次点击关联表单控件都要执行保存操作
      //20170727 只有在关联自己的时候才会保存
      if (that.Settings.FolderName == that.Designer.SheetCode) {
        that.Designer.Save(null, false);
      }

      var propertyManager = new $.PropertyManager(designProperty.Name);
      if (that.$Control.attr("data-datasource") == "Association" && that.$Control.attr("data-displayname") == "下拉框") {
        propertyManager.SetTitle('将根据以下表单字段生成选项');
      } else {
        propertyManager.SetTitle(designProperty.Text);
      }
      if (that.$Control.attr("data-controlkey") == "FormFolder") {
        //关联表单显示“向导”
        // propertyManager.AddHeadRightButton("", "不太理解？试试向导", function () {
        //   that.tryGuide(designProperty)
        // });
      }

      var $item = that.GenerateFolderDropDown();
      //加载关联的表单
      //如果是saas表单不且当前用户不是开发者则不支持修改关联表单
      if ($.inArray(that.DataField, that.Designer.PreInstalledFields) > -1) {
        //是预装的字段，不能修改关联的表单
        $item.attr('disabled', 'disabled').off('click');
      }
      //设置关联表单名称


      // if (this.Settings["BOSchemaCode"] && this.BoSchema == null) {
      //   that.SetBoSchemaDisplayName($item);
      // } else if (this.BoSchema) {
      //   $item.val(this.BoSchema.DisplayName);
      // }

      propertyManager.AddItem($item).addClass('icon-arrow-down2');
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };

    //关联表单配置向导
    //如果向导中点了确定则把配置后的信息保存，否则要恢复原来的配置
    this.tryGuide = function (designProperty) {
      var that = this;
      var propertyName = designProperty.Name;
      var $guideWrapper = $("<div class='guideWrapper'></div>");
      var $guideTipsTit = $("<p class='guideTipsTit'>按如下步骤配置关联表单的属性</p>");
      var $guideLeft = $('<div class="guideleft"><p class="guideNum">1</p><span class="line line1"></span><p class="guideNum">2</p><span class="line line2"></span><p class="guideNum">3</p>');
      var $guideRight = $('<div class="guideRight"></div>');
      var $tip1 = $("<p class='tip'>绑定需要选择数据关联的表单</p>");
      var $tip2 = $("<p class='tip' style='margin-top:0px;'>前台选择绑定表单的数据</p>");
      var $tip3 = $("<p class='tip'>将所选数据的字段值自动填充给当前表单对应字段</p>");
      // 关联查询的关联表单
      var $title1 = $("<h3>关联表单</h3>");
      var $p1 = $("<p class='chemacode'></p>");
      var $iconXia = $("<span class='icon icon-xia-span'></span>");
      var $item = $("<input  class='property-input' placeholder='选择需要关联的表单' readonly name='BOSchemaCode'/>");

      //获取原来的配置信息用于“取消”时候恢复原来配置信息
      var oldBoSchemaCode = that.$Control.attr("data-boschemacode"); //旧的关联表单
      var oldMappingControls = that.$Control.attr("data-mappingcontrols"); //旧的关联配置
      var oldBoSchemaPath = that.$Control.attr("data-boschemainfo"); //旧的关联表单信息
      var oldAssociationFilter = that.$Control.attr("data-associationfilter"); //旧的关联表单过滤
      var oldInputByScan = that.$Control.attr("data-inputbyscan"); //允许扫码输入
      var oldScanUpdateEnable = that.$Control.attr("data-scanupdateenable"); //允许手动修改扫码结果
      that.OldBoSchemaInfo = {};
      that.OldBoSchemaInfo["BoSchemaCode"] = oldBoSchemaCode;
      that.OldBoSchemaInfo["MappingControls"] = oldMappingControls;
      that.OldBoSchemaInfo["BoSchemaPath"] = oldBoSchemaPath;
      that.OldBoSchemaInfo["AssociationFIlter"] = oldAssociationFilter;
      that.OldBoSchemaInfo["InputByScan"] = oldInputByScan;
      that.OldBoSchemaInfo["ScanUpdateEnable"] = oldScanUpdateEnable;


      $p1.append($item).append($iconXia);

      that.GenerateBoSchemaDropDown($p1);


      //-----begin数据范围限定
      var $title2 = $("<h3>数据范围限定<span>仅可选择符合以下条件的数据</span></h3>");
      var $p2 = $("<p class='chemacode'></p>");
      var $iconAdd2 = $("<span class='icon icon-add'></span>");
      var $iconAdd = $("<span class='icon icon-add'></span>");
      var $item2 = $("<input maxlength=10 class='property-input' placeholder='点击设置条件'>");

      // $item2.on("click", function () {
      //   that.Designer.Save(null, false);
      // });

      var rule = '';
      if (that.Settings["AssociationFilter"] && this.Settings["AssociationFilter"].length > 0) {
        var ruleJson = this.Settings["AssociationFilter"] ? JSON.parse(this.Settings["AssociationFilter"]) : null;
        if (!$.isEmptyObject(ruleJson)) {
          rule = ruleJson.Rule;
        }
      }

      //-----end数据范围限定
      $p2.append($item2).append($iconAdd2);//.append($iconAdd);

      var $title3 = $("<h3>允许通过扫描二维码来自动识别并选择数据<i data-tip='仅识别关联表单中数据对应的二维码，可在列表打印二维码或数据详情页获取' class='ivu-icon ivu-icon-help-circled' style='color:#2d7fff'></i></h3>")
      var $radioInline3 = $("<div class='radioItem'>");
      var canScanId = $.IGuid();
      var $canScan = $("<p>").append("<input type='radio' name='canScan' id='" + canScanId + "' value=true />").append("<label for='" + canScanId + "'>允许</label>");
      var cannotScanId = $.IGuid();
      var $cannotScan = $("<p>").append("<input type='radio' name='canScan' id='" + cannotScanId + "' value=false />").append("<label for='" + cannotScanId + "'>不允许</label>");
      $radioInline3.append($canScan).append($cannotScan);


      var $title4 = $("<h3>扫码结果是否允许修改</h3>")
      var $radioInline4 = $("<div class='radioItem'>");
      var canModifyId = $.IGuid();
      var $canModify = $("<p>").append("<input type='radio' name='canModify' id='" + canModifyId + "' value=true />").append("<label for='" + canModifyId + "'>允许</label>");
      var cannotModifyId = $.IGuid();
      var $cannotModify = $("<p>").append("<input type='radio' name='canModify' id='" + cannotModifyId + "' value=false />").append("<label for='" + cannotModifyId + "'>不允许</label>");
      $radioInline4.append($canModify).append($cannotModify);

      var canScanVal = that.Settings["InputByScan"] || false;
      var canUpdateScanVal = that.Settings["ScanUpdateEnable"] || false;
      canScanVal = (typeof canScanVal == "boolean" && canScanVal == true) || (typeof canScanVal == "string" && canScanVal == "true");
      canUpdateScanVal = (typeof canUpdateScanVal == "boolean" && canUpdateScanVal == true) || (typeof canUpdateScanVal == "string" && canUpdateScanVal == "true");
      if (canScanVal) {
        $radioInline3.find("input[name='canScan']:first").prop("checked", true);
      } else {
        $radioInline3.find("input[name='canScan']:last").prop("checked", true);
      }

      if (!canScanVal) {
        $guideLeft.find(".line2").height(119);
        // $tip3.hide();
        $title4.hide();
        $radioInline4.hide();
      }

      if (canUpdateScanVal) {
        $radioInline4.find("input[name='canModify']:first").prop("checked", true);
      } else {
        $radioInline4.find("input[name='canModify']:last").prop("checked", true);
      }

      $radioInline3.off("click").on("click", "input[type='radio']", function () {
        var val = $(this).val();
        that.$Control.attr("data-inputbyscan", (val == "true"));
        that.Settings["InputByScan"] = (val == "true");
        if (val == "false") {
          $guideLeft.find(".line2").height(118);
          // $tip3.hide();
          $title4.hide();
          $radioInline4.hide();
          that.$Control.attr("data-scanupdateenable", false);
          that.Settings["ScanUpdateEnable"] = false;
        } else {
          $guideLeft.find(".line2").height(170);
          // $tip3.show();
          $title4.show();
          $radioInline4.show();
        }
      });

      $radioInline4.off("click").on("click", "input[type='radio']", function () {
        var val = $(this).val();
        if (val == "true") {
          var canScan = $radioInline3.find("input[type='radio']:eq(0)").prop("checked");
          if (!canScan) {
            return;
          }
        }
        that.$Control.attr("data-scanupdateenable", (val == "true"));
        that.Settings["ScanUpdateEnable"] = (val == "true");
      });


      //填充规则
      var $title5 = $("<h3>填充规则</h3>");
      var $p5 = $("<p class='chemacode'></p>");
      var $iconAdd5 = $("<span class='icon icon-add'></span>");
      var $item5 = $('<input class="property-input" placeholder="点击设置" readonly="readonly">');
      $p5.append($item5).append($iconAdd5);
      $p5.off("click").on("click", function () {
        that.Designer.IsSaved = false;
        that.Designer.Save(null, false);
        that.ShowDataRuleModal();
      });
      $guideRight.append($tip1).append($title1).append($p1)
        .append($tip2).append($title2).append($p2);
      if (that.ControlKey == "FormMultiQuery") {
        $guideLeft.find(".line2").next().remove();
        $guideLeft.find(".line2").remove();
      } else {
        $guideRight.append($title3).append($radioInline3)
          .append($title4).append($radioInline4)
          .append($tip3).append($title5).append($p5);
      }
      $guideWrapper.append($guideTipsTit).append($guideLeft).append($guideRight);

      $item2.on("click", function () {
        that.Designer.IsSaved = false;
        that.Designer.Save(null, false);
      });

      $item2.FormulaEditable({
        SchemaCode: that.Designer.SheetCode,
        FormulaType: "AssociationFilter",
        Formula: rule,
        FormulaField: that.DataField
      });

      $iconAdd2.off("click").on("click", function () {
        $item2.trigger("click");
      });

      $item2.next('input.FormulaControl').change(propertyName, function (e) {
        var formula = $(this).attr('formula') || '';
        if (formula.length > 0) {
          var propertyVal = '{"Rule":"' + formula.replace(/"/g, '\\\"') + '"}';
          that.$Control.attr('data-associationfilter', propertyVal);
          //关联过滤的名字由bofilter改为associationfilter，删除旧的属性
          if (that.$Control.attr('data-bofilter')) {
            that.$Control.removeAttr('data-bofilter');
          }
          that.Settings["AssociationFilter"] = propertyVal;
        } else {
          that.$Control.removeAttr('data-bofilter').removeAttr("data-associationfilter");
        }
      });

      if (that.GuideModal) {
        that.GuideModal.SetBody($guideWrapper);
        that.GuideModal.show();
      } else {
        var Actions = [{
          Text: "确定",
          Theme: 'btn_ok',
          CallBack: function () {
            //将配置信息保存到控件上
            that.GuideModal.hide();
            that.Designer.ControlElementSelected(that.$Control);
          }
        }, {
          Text: '取消',
          Theme: 'btn_cancel',
          CallBack: function () {
            //恢复关联表单控件原来配置
            if (that.OldBoSchemaInfo != void 0 && !$.isEmptyObject(that.OldBoSchemaInfo)) {
              that.$Control.attr("data-boschemacode", that.OldBoSchemaInfo["BoSchemaCode"]); //旧的关联表单
              that.$Control.attr("data-mappingcontrols", that.OldBoSchemaInfo["MappingControls"]); //旧的关联配置
              that.$Control.attr("data-boschemainfo", that.OldBoSchemaInfo["BoSchemaPath"]); //旧的关联表单信息
              that.$Control.attr("data-associationfilter", that.OldBoSchemaInfo["AssociationFIlter"]); //旧的关联表单过滤
              that.$Control.attr("data-inputbyscan", that.OldBoSchemaInfo["InputByScan"]); //允许扫码输入
              that.$Control.attr("data-scanupdateenable", that.OldBoSchemaInfo["ScanUpdateEnable"]); //允许手动修改扫码结果
            }
            that.GuideModal.hide();
          }
        }];
        that.GuideModal = new $.IModal({
          Title: '向导',
          Width: 750,
          MarginTop: 70,
          Height: 544,
          ShowBack: true,
          HasIframe: false,
          Content: $guideWrapper,
          ToolButtons: Actions
        });
      }
    };
    this.RenderMappingControls = function (designProperty) {
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      var propertyValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;

      if (this.ControlKey == "FormQuery") {
        this.PreInitSheetQueryMappingControls(propertyManager, propertyValue);
      } else if (this.ControlKey == "FormUser") {
        this.InitSheetUserMappingControls(propertyManager, propertyValue);
      } else if (this.ControlKey == "FormDropDownList") {
        this.InitDropDownListMappingFields(propertyManager, propertyValue);
      }
      this.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      if (this.$Control.attr("data-datasource") == "Association" && this.$Control.attr("data-displayname") == "下拉框") {
        this.$SheetControlPropertysPanel.find('div[propertyname="MappingField"]').find('.property-title').remove();
      }
      return propertyManager;
    };

    this.PreInitSheetQueryMappingControls = function (propertyManager, propertyValue) {
      var that = this;

      var boSchemaCode = that.Settings["BOSchemaCode"];
      var exist = that.Designer.PublishedSchemas[boSchemaCode] != null;

      if (!exist) {
        var schemaCodes = [];
        schemaCodes.push(boSchemaCode);
        that.Designer.LoadPublishedSchemas(schemaCodes, function () { that.InitSheetQueryMappingControls(propertyManager, propertyValue, that) });
      } else {
        that.InitSheetQueryMappingControls(propertyManager, propertyValue, that);
      }
    };

    this.InitSheetQueryMappingControls = function (propertyManager, propertyValue, obj) {

      var that = obj;
      var boSchemaCode = that.Settings["BOSchemaCode"];
      propertyManager.ClearItems();

      //标记是关联配置还是关联属性
      var isMappingProperties = propertyManager.PropertyName == "MappingProperties";
      // Error: 这里需要优化;关联表单的属性数组
      var ValueRange = [];

      that.BoSchema = that.Designer.PublishedSchemas[boSchemaCode];
      //加载表单属性
      var properties = [];
      if (that.BoSchema != null) {
        that.Designer.LoadPublishedSchemaProperty(that.BoSchema.SchemaCode);
        if (!$.isEmptyObject(that.Designer.SchemaProperties)) {
          properties = that.Designer.SchemaProperties[that.BoSchema.SchemaCode];
        }
      }
      if (that.BoSchema && properties) {
        var prefix = "";
        if (that.BoSchema.IsChildSchema) {
          prefix = schema.SchemaCode + ".";
        }
        for (var pi = 0, plen = properties.length; pi < plen; pi++) {
          var property = properties[pi];
          // 过滤掉定位
          if (property.DataType == $.BizDataType.Map) {
            continue;
          }
          //如果是配置关联属性，则不要显示附件/图片
          if (isMappingProperties && property.DataType == $.BizDataType.Attachment) {
            continue;
          }
          //如果是子表关联主表则不显示关联表单的子表字段
          if (that.DataField.indexOf('.') > 0 && boSchemaCode.indexOf('.') == -1 && property.Name.indexOf('.') > -1) {
            continue;
          }
          ValueRange.push({
            Val: prefix + property.Name,
            Text: property.DisplayName,
            DataType: property.DataType,
            IsChildField: property.IsChildField,
            HasOptionValue: property.HasOptionValue
          });
        }
      }
      propertyManager.$Header.show();
      // 当前关联配置的值
      var mappings = {
      };
      if (propertyValue) {
        var mappingsObj = JSON.parse(propertyValue);
        if (mappingsObj && !$.isEmptyObject(mappingsObj)) {
          mappings = mappingsObj;
        }
      }
      // 关联表单的属性
      var $propertys = $('<select data-MappingType="Source" class="form-control" style="width:40%;float:left;">');
      $propertys.append("<option value=''>--关联字段--</option>");

      for (var i = 0; i < ValueRange.length; i++) {
        var $option = $("<option>");
        $option.val(ValueRange[i].Val).text(ValueRange[i].Text).attr({
          "data-DataType": ValueRange[i].DataType,
          "data-IsChild": ValueRange[i].IsChildField,
          "data-HasOptionValue": ValueRange[i].HasOptionValue
        });

        $propertys.append($option);
      }

      //关联配置绑定本表单字段的DataType
      var getBizDataType = function (controlKey) {
        switch (controlKey.toLowerCase()) {
          case "formseqno"://流水号
          case "formradiobuttonlist"://单选框
          case "formcheckboxlist"://复选框
          case "formtextbox"://单行文本
          case "formdropdownlist": return 14;//下拉框
          case "formuser": return 26;//单人
          case "formdatetime": return 5;//日期
          case "formtextarea": return 13;//多行文本
          case "formnumber": return 7;//数值
          case "formcheckbox": return 1;//是否
          case "formmultiuser": return 27;//多人
          case "formattachment": return 24;//附件
          case "formquery": return 50;//关联查询
          case "formareaselect": return 56;//地址
          default: return -1;
        }
      }
      // 本表单的属性
      var $sheetControls = [];
      if (isMappingProperties) {
        $sheetControls = that.Designer.$SheetContent.find(".sheet-control[data-controlkey='FormAssociateProperty']");
      } else {
        $sheetControls = that.Designer.$SheetContent.find(".sheet-control[data-controlkey!='FormAssociateProperty'][data-controlkey!='FormLabel'][data-controlkey!='FormGridView'][data-controlkey!='FormSns'][data-controlkey!='FormBoList'][data-controlkey!='FormMap'][data-controlkey!='FormFormula']");
      }
      var $fields = $("<select data-MappingType='Target' class='form-control'>").css({ "width": "40%", "float": "left", "margin-left": "10px" });
      $fields.append("<option>--表单字段--</option>");
      for (var ci = 0, clen = $sheetControls.length; ci < clen; ci++) {
        var $sheetControl = $($sheetControls[ci]);
        var $option = $("<option>");
        var dataField = that.Designer.GetDataField($sheetControl);
        // 不能关联到当前设置的字段上
        if (dataField == that.DataField) {
          continue;
        }
        //如果关联表单控件在子表中则应该只能携带到当前表单的同一个子表中字段
        if (that.DataField.indexOf(".") > -1 && dataField.indexOf(".") > -1) {
          var childCode1 = that.DataField.split(".")[0];
          var childCode2 = dataField.split(".")[0];
          if (childCode1 != childCode2) {
            continue;
          }
        }
        var controlKey = $sheetControl.attr('data-controlkey');
        if (controlKey == void 0 || controlKey.toLowerCase() == 'formseqno') {
          continue;
        }
        $option.val(dataField);
        $option.text(that.Designer.GetDataFieldDisplayName($sheetControl));
        $option.attr("data-DataType", getBizDataType(controlKey));
        $fields.append($option);
      }

      // 按钮
      var $actions = $("<div>").css({
        "float": "left",
        "margin-left": "5px",
        "height": "34px",
        "line-height": "34px",
        "font-size": "18px"
      });
      var $btnRemove = $('<i class="fa icon-delete" style="cursor:pointer"></i>');
      var $btnAdd = $('<i class="ivu-icon ivu-icon-plus-round"></i>').css({ "cursor": "pointer", "margin-left": "5px" });
      if ($.inArray(that.DataField, that.Designer.PreInstalledFields) > -1) {
        //是预装的字段
        //不能编辑
        $propertys.attr('disabled', true);
        $fields.attr('disabled', true);
      } else {
        $actions.append($btnRemove).append($btnAdd);
      }

      // 配置模板行
      var $tempRow = $("<div class='row' data-MappingType='Row'>");
      $tempRow.append($propertys).append($fields).append($actions);

      var mappingChange = function (propertyManager, event) {
        var $control = that.$Control;
        var rows = propertyManager.$Items;
        var mappingJson = {
        };
        //开发者主表关联表单字段���联主表单，不允许将关联表单中子表字段关联到主表字段
        var controlDataField = $control.attr('data-datafield'); //当前表单关联表单控件编码
        for (var i = 0; i < rows.length; ++i) {
          var $row = $(rows[i]);
          var source = $row.find("select[data-MappingType='Source']").val();
          var target = $row.find("select[data-MappingType='Target']").val();
          if (source == '--关联字段--' || target == '--表单字段--') {
            continue;
          }
          //主表字段关联主表，不允许将子表字段携带到主表
          var dataField = event.data.DataField;
          var boSchemaCode = event.data.Settings["BOSchemaCode"];
          var boSchemaIsChildSchema = event.data.BoSchema.IsChildSchema;
          if (datafield.indexOf('.') == -1 && !boSchemaIsChildSchema && source.indexOf('.') > -1 && target.indexOf('.') == -1) {
            $.IShowError('主表单字段关联主表单时候，不允许将关联表单的子表字段配置到当前表单的主表字段');
            $row.find("select[data-MappingType='Target']").val('');
            $row.find("select[data-MappingType='Target']").find('option').removeAttr('selected');
            $row.find("select[data-MappingType='Target']").find('option:eq(0)').attr('selected', 'selected');
            continue;
          }
          var sourceType = $row.find("option[value='" + source + "']").first().data('datatype');
          var targetType = $row.find("option[value='" + target + "']").last().data('datatype');
          var hasOptionValue = $row.find("option[value='" + source + "']").first().data('hasoptionvalue');
          var targetControlKey = that.Designer.$SheetContent.find('[data-datafield="' + target + '"]').attr('data-controlkey').toLowerCase();
          var isContinue = false;
          //触发change控件,用于配置不正确时候重置
          var triggerCtrl = event.target;
          //不允许给“流水号”赋值
          if (targetControlKey == 'formseqno') {
            var targetControlDisplayName = $row.find("option[value='" + target + "']").last().text();
            $.IShowError('不允许给"' + targetControlDisplayName + '"字段赋值');
            $row.find("select[data-MappingType='Target']").val('');
            $row.find("select[data-MappingType='Target']").find('option').removeAttr('selected');
            $row.find("select[data-MappingType='Target']").find('option:eq(0)').attr('selected', 'selected');
            continue;
          }
          if (!isMappingProperties) {//关联配置
            switch (sourceType) {
              case 1://关联字段是“是否”，表单字段可以是“是否”、“单行文本”
                if (targetType != 1 && targetType != 14) {
                  isContinue = true;
                }
                break;
              case 5://关联字段是“修改时间”、“日期”、“创建时间”，表单字段可以是“日期”、“单行文本”
                if (targetType != 5 && targetType != 14) {
                  isContinue = true;
                }
                break;
              case 7://关联字段是“数值”，表单字段可以是“数值”、“单行文本”
                if (targetType != 7 && targetType != 14) {
                  isContinue = true;
                }
                break;
              case 9://关联字段是“Status”，表单字段可以是“Status”、“数值”、“单行文本”
                if (targetType != 9 && targetType != 7 && targetType != 14) {
                  isContinue = true;
                }
                break;
              case 13://关联字段是“多行文本”，表单字段可以是“多行文本”
                if (targetType != 13) {
                  isContinue = true;
                }
                break;
              case 14://关联字段是“单行文本”，表单字段可以是“单行文本”、“关联表单”、“关联多选”
                if (targetType != 14 && targetType != 50 && targetType != 51) {
                  isContinue = true;
                } else {
                  if (!hasOptionValue) {
                    if (targetType == 14 && targetControlKey != 'formtextbox') {
                      isContinue = true;
                    }
                  }
                }
                break;
              case 24://关联字段是“附件”，表单字段可以是“附件”
                if (targetType != 24) {
                  isContinue = true;
                }
                break;
              case 26://关联字段是“单人”，表单字段可以是“单人”，“多人”
                if (targetType != 26 && targetType != 27) {
                  isContinue = true;
                }
                break;
              case 27://关联字段是“多人”，表单字段可以是“多人”
                if (targetType != 27) {
                  isContinue = true;
                }
                break;
              case 50://关联字段是“关联查询”，表单字段可以是“关联查询”
                if (targetType != 50) {
                  isContinue = true;
                }
                break;
              case 56://关联字段是“地址”，表单字段可以是“地址”
                if (targetType != 56) {
                  isContinue = true;
                }
                break;
              default:

            }
          } else {
            //如果是关联属性要把目标的DataType保存在关联属性控件
            //添加源类型
            that.Designer.$SheetContent.find("div[data-datafield='" + target + "']").attr("data-sourcetype", sourceType);
          }

          if (isContinue) {
            $.IShowError('存在类型不匹配的配置！');
            $(triggerCtrl).find('option:eq(0)').removeAttr('selected');
            $(triggerCtrl).find('option:eq(0)').attr('selected', 'selected');
            continue;
          }
          if (target) {
            mappingJson[target] = source;
          }
        }
        $control.attr("data-" + propertyManager.PropertyName, JSON.stringify(mappingJson));
      }

      //移除
      $btnRemove.click(this, function (e) {
        //只剩下一个时，不允许删除
        if (propertyManager.$Items.length == 1) {
          return;
        }
        propertyManager.RemoveItem($(this).closest("div[data-MappingType='Row']"));
        mappingChange(propertyManager, e);
      });

      // 添加
      $btnAdd.click(this, function (e) {
        var $li = propertyManager.AddItem($tempRow.clone(true));
        var $SelectList = $li.find("select.form-control");
        if ($SelectList.length > 0) {
          $SelectList.each(function () {
            $(this).DropDownList();
          });
        }

      });
      $tempRow.find("select").change(this, function (e) {
        mappingChange(propertyManager, e);
      });
      // 添加配置行
      var addFlag = false;
      var $row = $tempRow.clone(true);
      if ($.isEmptyObject(mappings)) {
        propertyManager.AddItem($row);
        addFlag = true;
        var $SelectList = that.$SheetControlPropertysPanel.find("select.form-control");
        if ($SelectList.length > 0) {
          $SelectList.each(function () {
            $(this).DropDownList();
          });
        }
        return;
      }
      var $sourceSelect = $row.find("select[data-MappingType='Source']");
      var $targetSelect = $row.find("select[data-MappingType='Target']");
      for (var key in mappings) {
        $row = $tempRow.clone(true);
        var sourceOption = $sourceSelect.find("option[value='" + mappings[key] + "']");
        var targetOption = $targetSelect.find("option[value='" + key + "']");
        if (sourceOption.length == 0 && targetOption.length == 0) {
          continue;
        }
        if (sourceOption.length == 0) {
          $row.find("select[data-MappingType='Source']").find("option:eq(0)").attr("selected", "selected");
        } else {
          $row.find("select[data-MappingType='Source']").val(mappings[key]);
        }
        if (targetOption.length == 0) {
          $row.find("select[data-MappingType='Target']").find("option:eq(0)").attr("selected", "selected");
        } else {
          $row.find("select[data-MappingType='Target']").val(key);
        }
        propertyManager.AddItem($row);
        addFlag = true;
      }
      if (!addFlag) {
        propertyManager.AddItem($row);
      }

    };

    this.InitSheetUserMappingControls = function (propertyManager, propertyValue) {
      var that = this;
      //这里需要从后台读取用户属性配置列表
      var ValueRange = [];
      ValueRange.push({
        Val: "ParentId", Text: "部门",
        tips: '的值填充到',
        ControlKey: "FormUser"
      });
      ValueRange.push({
        Val: "Gender",
        Text: "性别",
        tips: '的值填充到',
        ControlKey: "FormTextBox"
      });
      ValueRange.push({
        Val: "Email",
        Text: "邮件",
        tips: '的值填充到',
        ControlKey: "FormTextBox"
      });
      ValueRange.push({
        Val: "Mobile",
        Text: "手机",
        tips: '的值填充到',
        ControlKey: "FormTextBox"
      });
      var $el = $("<div>").attr("data-MappingType", "MapptingList").addClass("clearfix");
      var mappingJson = {};
      if (propertyValue) {
        mappingJson = JSON.parse(propertyValue);
      }
      var $chosedTip = $("<p style='font-size:12px'>选择人员后，将</p>");
      propertyManager.AddItem($chosedTip);
      var AddSheetUserProperty = function (range, $el, mapping) {
        var $row = $("<div class='row' data-MappingType='Row'>");
        var $propertys = $("<label data-MappingType='" + range.Val + "' style='width:41%;float:left;padding:10px 0;color:#333'>" + range.Text + "<span style='font-size:12px;margin-left:5px;color:#757575'>" + range.tips + "</span></label>");

        var $fields = $("<select data-MappingType='Value' class='form-control' style='width:57%;' >");
        var rows = that.Designer.$SheetContent.find("div.row[data-" + that.Designer.ControlKey + "='" + range.ControlKey + "'][data-datafield!='" + that.DataField + "']");
        if (range.ControlKey == "FormUser") {
          var temp = that.Designer.$SheetContent.find("div.row[data-controlkey='FormDepartment'][data-datafield!='" + that.DataField + "']");
          if (temp.length > 0) {
            if (rows.length == 0) {
              rows = temp;
            } else {
              for (var i = 0; i < temp.length; i++) {
                rows.push(temp[i]);
              }
            }
          }
        }
        $fields.append("<option value=''>当前表单控件</option>");
        for (var i = 0; i < rows.length; i++) {
          var $control = $(rows[i]);
          if (range.Val == "ParentId") {
            //过滤掉选人
            if ($control.attr("data-controlkey") == "FormUser" && $control.attr("data-datafield") != "OwnerDeptId") {
              continue;
            }
            //过滤掉拥有者
            if ($control.attr("data-controlkey") == "FormUser" && $control.attr("data-datafield") == "OwnerId") {
              continue;
            }
          }
          var $option = $("<option>");
          $option.val(that.Designer.GetDataField($control));
          $option.text(that.Designer.GetDataFieldDisplayName($control));
          $fields.append($option);
        }

        propertyManager.AddItem($row.append($propertys).append($fields));

        if (mapping) {
          $fields.val(mapping);
        }

        //绑定事件------------------
        var RebindMapping = function () {
          //控件
          var $control = that.$Control;
          var rows = propertyManager.$Items;
          var mappingJson = {
          };
          for (var i = 0; i < rows.length; ++i) {
            var $row = $(rows[i]);
            var key = $row.find("label").attr("data-MappingType");
            var value = $row.find("select[data-MappingType='Value']").val();

            if (value) {
              mappingJson[key] = value;
            }
          }

          $control.attr("data-" + propertyManager.PropertyName, JSON.stringify(mappingJson));
        };

        $row.find("select").change(function (e) {
          var $parent = $(this).closest("div[data-MappingType='MapptingList']");
          RebindMapping();
        });
      };

      for (var i = 0; i < ValueRange.length; i++) {
        var mapping = mappingJson[ValueRange[i].Val] != null ? mappingJson[ValueRange[i].Val] : "";
        AddSheetUserProperty(ValueRange[i], $el, mapping);
      }
    };

    //下拉框匹配关联字段
    this.InitDropDownListMappingFields = function (propertyManager, propertyValue, obj) {
      var that = obj || this;
      var boSchemaCode = that.Settings["BOSchemaCode"];
      propertyManager.ClearItems();

      // Error: 这里需要优化;关联表单的属性数组
      var ValueRange = [];
      that.BoSchema = that.Designer.PublishedSchemas[boSchemaCode];

      if (that.BoSchema == null) {
        var schemaCodes = [];
        schemaCodes.push(boSchemaCode);
        that.Designer.LoadPublishedSchemas(schemaCodes, function () { that.InitDropDownListMappingFields(propertyManager, propertyValue, that) });
        return;
      }

      //加载表单属性
      var properties = [];
      if (that.BoSchema != null) {
        that.Designer.LoadPublishedSchemaProperty(that.BoSchema.SchemaCode);
        if (!$.isEmptyObject(that.Designer.SchemaProperties)) {
          properties = that.Designer.SchemaProperties[that.BoSchema.SchemaCode];
        }
      }
      if (that.BoSchema && properties) {
        var prefix = "";
        if (that.BoSchema.IsChildSchema) {
          prefix = schema.SchemaCode + ".";
        }
        for (var pi = 0, plen = properties.length; pi < plen; pi++) {
          var property = properties[pi];

          //如果是子表关联主表则不显示关联表单的子表字段
          if (that.DataField.indexOf('.') > 0 && boSchemaCode.indexOf('.') == -1 && property.Name.indexOf('.') > -1) {
            continue;
          }
          //排除字段
          if (property.Name == "ObjectId" ||
            property.Name == "CreatedTime" ||
            property.Name == "ModifiedTime" ||
            property.Name == "WorkflowInstanceId" ||
            property.Name == "SeqNo") {
            continue;
          }

          //单行文本 日期 下拉框 单选框 复选框
          if (property.DataType == $.BizDataType.ShortString) {
            ValueRange.push({
              Val: prefix + property.Name,
              Text: property.DisplayName,
              DataType: property.DataType,
              IsChildField: property.IsChildField,
              HasOptionValue: property.HasOptionValue
            });
          }
        }
      }
      propertyManager.$Header.show();

      // 关联表单的属性
      var $propertys = $('<select data-MappingType="Source" class="form-control">');
      $propertys.append("<option value=''>--关联字段--</option>");
      for (var i = 0; i < ValueRange.length; i++) {
        var $option = $("<option>");
        $option.val(ValueRange[i].Val);
        $option.text(ValueRange[i].Text);
        $option.attr("data-DataType", ValueRange[i].DataType);
        $option.attr("data-IsChild", ValueRange[i].IsChildField);//用于区分是否是子表字段，主要用在开发者关联主表携带子表情况的关联配置校验，暂未实现
        $option.attr("data-HasOptionValue", ValueRange[i].HasOptionValue);//用于区分短文本类型
        $propertys.append($option);
      }
      $propertys.change(function () {
        var f = $(this).val();
        that.Settings["MappingField"] = f;
        that.$Control.attr("data-mappingfield", f);
      });

      $propertys.val(propertyValue); //赋值
      // 配置模板行
      var $row = $("<div class='row' data-MappingType='Row'>");
      $row.append($propertys);
      $row.find('select').DropDownList();
      propertyManager.AddItem($row);
    };

    //下拉框数据来源
    this.RenderDropDownDataSource = function (designProperty, callBack) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      var valueRange = designProperty.ValueRange;
      var defaultValue = that.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $itemSelfDe = $('<div  style="width: 40%; display: inline-block; overflow: hidden;">' +
        '<input type="radio" name="' + designProperty.Name + '" value="Custom" id="itemSelfDe" class="ckEnableTask">' +
        '<label for="itemSelfDe" class="radio-inline" style="padding-left: 0px;">自定义</label></div>');
      var $itemFromInterface = $('<div  style="width: 55%; display: inline-block; overflow: hidden;">' +
        '<input type="radio" name="' + designProperty.Name + '" value="Interface" id="itemFromForm" class="ckEnableTask">' +
        '<label for="itemFromForm" class="radio-inline" style="padding-left: 0px;">关联外部接口</label></div>');
      // var $itemFromForm = $('<div  style="width: 55%; display: inline-block; overflow: hidden;">' +
      //   '<input type="radio" name="' + designProperty.Name + '" value="Association" id="itemFromForm" class="ckEnableTask">' +
      //   '<label for="itemFromForm" class="radio-inline" style="padding-left: 0px;">关联已有表单数据</label></div>');
      var $div = $("<div></div>");
      $div.append($itemSelfDe, $itemFromInterface);
      propertyManager.AddItem($div);

      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());

      $div.off('click').on('click', 'input[type=radio]', function () {
        var itemName = $(this).val();
        that.Settings[designProperty.Name] = itemName;
        that.$Control.attr("data-datasource", itemName);
        if (itemName == 'Custom') {
          // 下拉框显示模式
          if (that.PropertyManagers["SelectShowMode"] && that.PropertyManagers["SelectShowMode"]) {
            that.PropertyManagers["SelectShowMode"].Show();
          }
          //自定义选项
          if (that.PropertyManagers["DataDictItemName"] && that.PropertyManagers["DataDictItemName"] != null) {
            that.PropertyManagers["DataDictItemName"].Hide();
            that.Settings["DataDictItemName"] = "";
            that.$Control.removeAttr("data-datadictitemname");
          }
          //选项设置
          if (that.PropertyManagers["DefaultItems"] && that.PropertyManagers["DefaultItems"] != null) {
            that.PropertyManagers["DefaultItems"].Show();
          }
          if (that.PropertyManagers["BOSchemaCode"] && that.PropertyManagers["BOSchemaCode"] != null) {
            that.PropertyManagers["BOSchemaCode"].Hide();
            that.$Control.removeAttr("data-boschemacode");
          }
          if (that.PropertyManagers["MappingField"] && that.PropertyManagers["MappingField"] != null) {
            that.PropertyManagers["MappingField"].Hide();
            that.$Control.removeAttr("data-mappingfield");
          }
          if (that.PropertyManagers["AssociationFilter"] && that.PropertyManagers["AssociationFilter"] != null) {
            that.PropertyManagers["AssociationFilter"].Hide();
            that.$Control.removeAttr("data-associationfilter");
          }
          if (that.PropertyManagers["InterfaceOptions"] && that.PropertyManagers["InterfaceOptions"] != null) {
            that.PropertyManagers["InterfaceOptions"].Hide();
            that.$Control.removeAttr("data-interfaceOptions");
            that.PropertyManagers["InterfaceOptions"].$Items[0].val('')
          }
          if (that.PropertyManagers["ShowMode"] && that.PropertyManagers["ShowMode"] != null) {
            that.PropertyManagers["ShowMode"].Hide();
            that.$Control.removeAttr("data-showMode");
          }
        }
        else if (itemName === 'Interface') {
          that.PropertyManagers["DefaultItems"].$Items.forEach($item => {
            const $radio = $item.find('input[type="radio"]')
            $radio.attr('checked', false)
          })
          // 下拉框显示模式
          if (that.PropertyManagers["SelectShowMode"] && that.PropertyManagers["SelectShowMode"]) {
            that.PropertyManagers["SelectShowMode"].Show();
          }
          //自定义选项
          if (that.PropertyManagers["DataDictItemName"] && that.PropertyManagers["DataDictItemName"] != null) {
            that.PropertyManagers["DataDictItemName"].Hide();
            that.Settings["DataDictItemName"] = "";
            that.$Control.removeAttr("data-datadictitemname");
          }
          if (that.PropertyManagers["BOSchemaCode"] && that.PropertyManagers["BOSchemaCode"] != null) {
            that.PropertyManagers["BOSchemaCode"].Hide();
            that.$Control.removeAttr("data-boschemacode");
          }
          if (that.PropertyManagers["MappingField"] && that.PropertyManagers["MappingField"] != null) {
            that.PropertyManagers["MappingField"].Hide();
            that.$Control.removeAttr("data-mappingfield");
          }
          if (that.PropertyManagers["AssociationFilter"] && that.PropertyManagers["AssociationFilter"] != null) {
            that.PropertyManagers["AssociationFilter"].Hide();
            that.$Control.removeAttr("data-associationfilter");
          }
          //选项设置
          if (that.PropertyManagers["DefaultItems"] && that.PropertyManagers["DefaultItems"] != null) {
            that.PropertyManagers["DefaultItems"].Hide();
            //that.$Control.removeAttr("data-defaultitems");
          }
          if (that.PropertyManagers["InterfaceOptions"] && that.PropertyManagers["InterfaceOptions"] != null) {
            that.PropertyManagers["InterfaceOptions"].Show();
            // 清空默认值
            that.$Control.attr("data-DefaultValue", "");
            // that.PropertyManagers["InterfaceOptions"].$Header.empty().append('<div class="property-left property-paddingleft-1x">将根据选择的接口生成选项</div>');
            // that.PropertyManagers["InterfaceOptions"].$Items[0].val('');
          }
          if (that.PropertyManagers["ShowMode"] && that.PropertyManagers["ShowMode"] != null) {
            that.PropertyManagers["ShowMode"].Show();
          }
        }
        else if (itemName == "Association") {
          // 下拉框显示模式
          if (that.PropertyManagers["SelectShowMode"] && that.PropertyManagers["SelectShowMode"]) {
            that.PropertyManagers["SelectShowMode"].Hide();
            that.Settings["SelectShowMode"] = "0";//关联表单时只有侧滑显示
            that.$Control.attr("data-selectshowmode", "0");
          }
          //关联表单
          if (that.PropertyManagers["DataDictItemName"] && that.PropertyManagers["DataDictItemName"] != null) {
            that.PropertyManagers["DataDictItemName"].Hide();
            that.Settings["DataDictItemName"] = "";
            that.$Control.removeAttr("data-datadictitemname");
          }
          //选项设置
          if (that.PropertyManagers["DefaultItems"] && that.PropertyManagers["DefaultItems"] != null) {
            that.PropertyManagers["DefaultItems"].Hide();
            //that.$Control.removeAttr("data-defaultitems");
          }
          if (that.PropertyManagers["InterfaceOptions"] && that.PropertyManagers["InterfaceOptions"] != null) {
            that.PropertyManagers["InterfaceOptions"].Hide();
            that.$Control.removeAttr("data-interfaceOptions");
            that.PropertyManagers["InterfaceOptions"].$Items[0].val('')
          }
          if (that.PropertyManagers["ShowMode"] && that.PropertyManagers["ShowMode"] != null) {
            that.PropertyManagers["ShowMode"].Hide();
            that.$Control.removeAttr("data-showMode");
          }
          if (that.PropertyManagers["BOSchemaCode"] && that.PropertyManagers["BOSchemaCode"] != null) {
            that.PropertyManagers["BOSchemaCode"].Show();
            that.PropertyManagers["BOSchemaCode"].$Header.empty().append('<div class="property-left property-paddingleft-1x">将根据以下表单字段生成选项</div>');
            that.PropertyManagers["BOSchemaCode"].$Items[0].val('');
          }
          if (that.PropertyManagers["MappingField"] && that.PropertyManagers["MappingField"] != null) {
            that.PropertyManagers["MappingField"].Show();
            that.PropertyManagers["MappingField"].$Header.remove();
            that.PropertyManagers["MappingField"].$Items[0].find('select').val("").DropDownList();
          }
          if (that.PropertyManagers["AssociationFilter"] && that.PropertyManagers["AssociationFilter"] != null) {
            that.PropertyManagers["AssociationFilter"].Show();
            that.PropertyManagers["AssociationFilter"].$Items[0].val('');
          }
        }
      });
      if (defaultValue == "DictItem") {
        defaultValue = "Custom";
      }
      $div.find('input[value=' + defaultValue + ']').prop('checked', true);

      return propertyManager;
    };
    //移动端显示子表字段
    this.RenderDisplayFields = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var defaultValue = that.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $addDataButton = $("<div><i class='ivu-icon ivu-icon-plus-round'></i>添加显示字段</div>").css({ "color": "#3d7fff", "cursor": "pointer" })
      var $displayFieldsBox = $("<div class='displayFieldsBox'>");
      propertyManager.SetTitle(designProperty.Text);
      var $selectBox = $("<ul class='mobileDisplaydata'>").css({ 'display': "none" });
      //添加到选中div
      var addItemToSelectBox = function (item) {
        var $li = $("<li data-datafield='" + item.attr("data-datafield") + "'>" + $(item).data("displayname") + "</li>")
        $selectBox.append($li);
      }
      //添加到拖动div
      $selectBox.off('click').on('click', 'li', function () {
        var $this = $(this);
        $this.css({ "color": "#cecece", "cursor": "not-allowed" })
        $selectBox.hide();
        //已经加过的，不能再添加
        if ($displayFieldsBox.find(".displayFieldsBox[data-itemfield='" + $this.attr("data-datafield") + "']").length > 0) {
          return;
        }
        if ($displayFieldsBox.find(".displayFieldsBox").length >= 2) {  //如果已经选择够了三个，就隐藏添加按钮
          $addDataButton.hide();
        }
        addItemElement($this.text(), $this.attr("data-datafield"));
      })
      propertyManager.AddItem($displayFieldsBox);
      propertyManager.AddItem($addDataButton);
      //显示选中div
      $addDataButton.off('click').on('click', function () {
        if ($selectBox.find("li").length == 0) {
          $.IShowWarn('请添加子表字段');
          return;
        }
        $selectBox.find("li").length && $selectBox.toggle();
        $("#SheetControlPropertysPanel").getNiceScroll().resize();
      })
      //删除拖动div中的元素
      $displayFieldsBox.off("click").on('click', '.delete', function () {
        var $this = $(this);
        var itemfield = $this.prev('.displayFieldsBox').data("itemfield");
        $selectBox.find("li[data-datafield='" + itemfield + "']").css({ "cursor": "pointer", "color": "#666" });
        $this.parent().remove();
        $addDataButton.show();
        saveMatrixData();
      })
      propertyManager.AddItem($selectBox);
      if (callback && $.isFunction(callback)) {
        propertyManager.CallBack = callback;
      }
      var addItemElement = function (displayName, dataField) {
        var id = $.IGuid();
        var $div = $("<div class='row'>");
        //子表内字段名称
        var displayName = displayName;
        //子表内字段DataField
        var dataField = dataField;
        if (!displayName) { return; } //如果字段为undefined，就不渲染了
        //字段div
        var $divField = $("<div class='col-sm-8 displayFieldsBox' data-itemField='" + dataField + "'>" + displayName + "</div>").css({
          "padding-left": "0px",
          "font-family": "MicrosoftYaHei",
          "font-size": "14px",
          "color": "#333"
        });

        //删除按钮div
        var $divDele = $("<div class='col-sm-2 delete'><i class='fa icon-delete' style='cursor:pointer'></i></div>").css({
          "padding-right": "0px",
          "text-align": "right",
          "color": "red",
          "font-size": "16px"
        });

        //拖拽按钮div
        var $divMove = $("<div class='col-sm-2'><i class='fa icon-move' style='cursor:move'></i></div>").css({
          "padding-right": "0px",
          "text-align": "right",
          "color": "#666",
          "font-size": "16px"
        });

        $div.append($divField).append($divDele).append($divMove);
        $displayFieldsBox.append($div);
        saveMatrixData();
      };
      //获取子表内控件
      //不支持矩阵模式的控件
      //多行文本、复选框、附件、人员多选、部门多选、关联表单多选
      //多行文本、复选框、人员多选、部门多选、关联表单、关联多选、关联属性、公式型、地址、附件、图片
      var items = that.$Control.find(".sheet-control");
      var excludeKeys = ["FormTextArea",
        "FormCheckboxList",
        "FormAttachment",
        'FormFolder',
        "FormMultiUser",
        "FormMultiDepartment",
        "FormMultiQuery",
        "FormQuery",
        "FormAreaSelect",
        "FormCitySelect",
        "FormFormula",
        "FormEmbedCode",
        "FormAssociateProperty"];
      for (var i = 0; i < items.length; i++) {
        var $item = $(items[i]);
        var controlKey = $item.attr("data-controlkey");
        if ($.inArray(controlKey, excludeKeys) > -1) {
          continue;
        }
        addItemToSelectBox($item);
      }
      //获取数据顺序并存储
      var saveMatrixData = function () {
        var data = [];
        var dataText = '';
        $displayFieldsBox.find(".displayFieldsBox").each(function () {
          var $this = $(this);
          var text = $($this).text();
          var id = $this.data("itemfield");
          data += (id + ';');
        });
        that.$Control.attr('data-' + designProperty.Name, data);
        that.Settings[designProperty.Name] = data;
      }
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      if (that.$Control.attr("data-gridviewmode") == "0") {
        that.$SheetControlPropertysPanel.find('div[propertyname="DisplayFields"]').hide();
      } else {
        that.$SheetControlPropertysPanel.find('div[propertyname="DisplayFields"]').show();
      }
      //初始化渲染已经选择的控件
      var displayFields = that.$Control.attr("data-displayfields") || "";
      displayFields = displayFields.split(";")
      if (displayFields.length > 3) {
        $addDataButton.hide();
      } else {
        $addDataButton.show();
      }
      var that = this;
      displayFields.forEach(function (item, index) {
        var displayName = that.Designer.$SheetContent.find("div[data-controlkey][data-datafield='" + item + "']").attr("data-displayname");
        if (index == displayFields.length - 1) return
        if (item) {
          addItemElement(displayName, item);
          $selectBox.find('[data-datafield="' + item + '"]').css({ "color": "#cecece", "cursor": "not-allowed" });
        }
      });

      that.$SheetControlPropertysPanel.find(".displayFieldsBox").sortable({
        forcePlaceholderSize: true,
        placeholder: "ColumnItem",
        axis: "y",
        over: function (e, ui) {
          $(this).find(".drop-item").show();
        },
        start: function (e, ui) {
          $(ui.helper).css({
            "background-color": "rgb(255, 255, 255)",
            "padding": " 0px 10px 0px 10px",
            "text-align": "left",
            "top": "0px",
            "left": " 0px",
            "height": "29px",
            "line-height": "29px"
          });
        },
        stop: function (e, ui) {
          saveMatrixData();
        },
        out: function (e, ui) { }
      });
    };
    //子表字段
    this.RenderGridViewFields = function (designProperty, callback) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      propertyManager.$BottomTools.attr('placeholder', '请先从左侧拖入控件')
      if (callback && $.isFunction(callback)) {
        propertyManager.CallBack = callback;
      }
      var addItemElement = function (item) {
        var id = $.IGuid();
        var $div = $("<div class='row grid'>");
        //子表内字段名称
        var displayName = item.attr("data-displayName");
        //子表内字段DataField
        var dataField = item.attr("data-datafield");
        //字段div
        var $divField = $("<div class='col-sm-10' data-itemField='" + dataField + "'>" + displayName + "</div>").css({
          "padding-left": "0px",
          "font-family": "MicrosoftYaHei",
          "font-size": "14px",
          "color": "#333"
        });
        //拖拽按钮div
        var $divMove = $("<div class='col-sm-2'><i class='fa icon-move' style='cursor:move'></i></div>").css({
          "padding-right": "0px",
          "text-align": "right",
          "color": "#666",
          "font-size": "16px"
        });

        $div.append($divField).append($divMove);
        propertyManager.AddItem($div);
      };
      //获取子表内控件
      var items = that.$Control.find(".sheet-control");
      for (var i = 0; i < items.length; i++) {
        addItemElement($(items[i]));
        propertyManager.$BottomTools.removeAttr('placeholder').hide();
      }
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      that.$SheetControlPropertysPanel.find('.property-group[propertyname="GridViewFields"] ul')
        .addClass('grid-view-fields__property-items__counter');
      that.$SheetControlPropertysPanel.find('.property-group[propertyname="GridViewFields"] ul li')
        .addClass('grid-view-fields__property-item__content').css({
          overflow: 'visible'
        });
      that.$SheetControlPropertysPanel.find('.property-group[propertyname="GridViewFields"] ul').sortable({
        forcePlaceholderSize: true,
        placeholder: "ColumnItem",
        axis: "y",
        over: function (e, ui) {
          $(this).find(".drop-item").show();
        },
        start: function (e, ui) {
          $(ui.helper).css({
            "background-color": "rgb(255, 255, 255)",
            "padding": " 0px 10px 9px 10px",
            "text-align": "left",
            "top": "0px",
            "left": " 0px",
            "height": "29px",
            "line-height": "29px"
          });
        },
        stop: function (e, ui) {
          if (callback && $.isFunction(callback)) {
            var index = ui.item.index(); //拖动的控件的序号
            var itemDataField = ui.item.find("div[data-itemfield]").attr("data-itemfield");
            callback.apply(that, [itemDataField, index]);
          }
        },
        out: function (e, ui) { }
      });
    };
    this.RenderGridViewExpandRange = function (designProperty, callback) {
      var that = this;
      var propertyName = designProperty.Name;
      var propertyManager = new $.PropertyManager(propertyName);
      propertyManager.SetTitle(designProperty.Text);
      propertyName === "ExpandRange" && propertyManager.$Title.css("position", "relative").append("<span class='property-tip'>索引参照上面子表字段</span>");

      var expandRange = {};
      try {
        expandRange = JSON.parse(this.Settings[propertyName]) || {};
      } catch (error) {}

      var $startIndex = $("<input placeholder='起始控件索引' class='property-input'>").val(expandRange.start || '');
      var $endIndex = $("<input placeholder='结尾控件索引' class='property-input'>").val(expandRange.end || '');
      var $expandName = $("<input placeholder='展开收起名称' class='property-input'>").val(expandRange.name || '');
      var $divStartEnd = $("<div class='row'></div>")
        .append($("<div class='col-sm-6' style='padding-left:0;padding-right:5px;'></div>").append($startIndex))
        .append($("<div class='col-sm-6' style='padding-left:5px;padding-right:0;'></div>").append($endIndex));

      function stringifyExpand() {
        return JSON.stringify({
          start: $startIndex.val(),
          end: $endIndex.val(),
          name: $expandName.val()
        });
      };

      function assignValue() {
        var value = stringifyExpand();
        that.$Control.attr("data-" + propertyName, value);
        that.Settings[propertyName] = value;
      }

      function assignValueNum() {
        $(this).val($(this).val().replace(/[^\d]/g, ''));
        assignValue();
      }

      $startIndex.blur(assignValueNum);
      $endIndex.blur(assignValueNum);
      $expandName.blur(assignValue);

      propertyManager.AddItem($divStartEnd);
      propertyManager.AddItem($expandName);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };
    //关联配置绑定本表单字段的DataType
    this.GetBizDataType = function (controlKey) {
      switch (controlKey.toLowerCase()) {
        case "formseqno"://流水号
        case "formradiobuttonlist"://单选框
        case "formcheckboxlist"://复选框
        case "formtextbox"://单行文本
        case "formdropdownlist": return 14;//下拉框
        case "formuser": return 26;//单人
        case "formdatetime": return 5;//日期
        case "formtextarea": return 13;//多行文本
        case "formnumber": return 7;//数值
        case "formcheckbox": return 1;//是否
        case "formmultiuser": return 27;//多人
        case "formattachment": return 24;//附件
        case "formquery": return 50;//关联查询
        case "formareaselect": return 56;//地址
        default: return -1;
      }
    };
    this.ShowDataRuleModal = function () {
      var that = this;
      if (that.Settings["BOSchemaCode"] == void 0 || that.Settings["BOSchemaCode"] == "") {
        $.IShowError("请先配置关联表单");
        return;
      } else {
        that.BOSchemaCode = that.Settings["BOSchemaCode"];
        //已经配置了关联表单，加载关联表单字段信息
        var schemaCodes = [];
        schemaCodes.push(that.BOSchemaCode);
        that.Designer.LoadPublishedSchemas(schemaCodes, async function () {
          that.BoSchema = that.Designer.PublishedSchemas[that.BOSchemaCode];
          //已经存在的关联配置
          var currentMappings = {};
          var propertyValue = that.Settings["MappingControls"];
          if (propertyValue && that.IsJson(propertyValue)) {
            var mappingsObj = JSON.parse(propertyValue);
            if (mappingsObj && !$.isEmptyObject(mappingsObj)) {
              currentMappings = mappingsObj;
            }
          }

          //关联表单字段
          var boProperties = [];
          var properties = [];
          if (that.BoSchema != void 0) {
            await that.Designer.LoadPublishedSchemaProperty(that.BOSchemaCode);
            if (!$.isEmptyObject(that.Designer.SchemaProperties)) {
              properties = that.Designer.SchemaProperties[that.BOSchemaCode];
            }
          }

          if (properties && properties.length > 0) {
            var prefix = "";
            if (that.BoSchema.IsChildSchema) {
              prefix = that.BoSchema.SchemaCode + ".";
            }
            for (var i = 0; i < properties.length; i++) {
              var property = properties[i];
              //过滤定位
              if (property.DataType == $.BizDataType.Map) {
                continue;
              }
              //如果是关联属性，则不要显示关联表单的附件/图片字段
              //如果是子表关联主表则不要显示关联表单的子表字段
              if (that.DataField.indexOf(".") > 0 && that.BOSchemaCode.indexOf(".") == -1 && property.Name.indexOf(".") > -1) {
                continue;
              }
              boProperties.push({
                Val: prefix + property.Name,
                Text: property.DisplayName,
                DataType: property.DataType,
                IsChildField: property.IsChildField,
                HasOptionValue: property.HasOptionValue
              });
            }
          }

          //设置规则弹窗内容
          var $ruleWrapper = $("<div></div>");
          var $ruleTip = $("<p>当选择具体数据后，将按如下规则给当前表单字段填充数据</p>");
          var $addRule = $("<p class='addrule'><i class='ivu-icon ivu-icon-plus-round' style='font-size:12px;margin-right:3px'></i>添加规则</p>");
          var $rulePropWrap = $("<div class='rulePropWrap'></div>");
          var $connectTip = $("<span class='connectTip'>的值填充到</span>");
          var $tempRow = $("<div class='row' data-MappingType='Row'>");
          var $actions = $("<div class='actions'></div>");
          var $btnRemove = $('<i class="fa icon-delete" style="cursor:pointer">删除</i>');

          $addRule.click(function (e) {// 添加
            var $newRow = $tempRow.clone(true);
            $rulePropWrap.append($newRow);
            $newRow.find("select.form-control").each(function () {
              $(this).DropDownList();
            });
          });

          $btnRemove.click(this, function (e) { //移除
            if ($rulePropWrap.find("div[data-MappingType='Row']").length == 1) return;
            $(this).parents("div[data-MappingType='Row']").remove();
          });

          //关联表单字段Option
          var $propertys = $('<select data-MappingType="Source" class="form-control"><option>--关联字段--</option></select>');// 关联字段
          for (var i = 0; i < boProperties.length; i++) {
            var item = boProperties[i];
            var $option = $("<option>");
            $option.val(item.Val).text(item.Text).attr({
              "data-DataType": item.DataType,
              "data-IsChild": item.IsChildField, //用于区分是否是子表字段,主要用于在开发者关联主表携带子表情况的关联配置校验
              "data-HasOptionValue": item.HasOptionValue //用于区分短文本类型
            });
            $propertys.append($option);
          }

          //当前表单字段Option
          var $fields = $("<select data-MappingType='Target' class='form-control'><option>--表单字段--</option></select>"); // 表单字段
          var $sheetControls = that.Designer.$SheetContent.find(".sheet-control[data-controlkey!='FormAssociateProperty'][data-controlkey!='FormLabel'][data-controlkey!='FormGridView'][data-controlkey!='FormSns'][data-controlkey!='FormBoList'][data-controlkey!='FormMap'][data-controlkey!='FormFormula'][data-controlkey!='FormEmbedCode']");
          for (var i = 0; i < $sheetControls.length; i++) {
            var $sheetControl = $($sheetControls[i]);
            var $option = $("<option>");
            var dataField = that.Designer.GetDataField($sheetControl);
            if (dataField == that.DataField) {
              //当前的“关联表单”字段不能存在于关联配置中
              continue;
            }
            if (that.DataField.indexOf(".") > -1 && dataField.indexOf(".") > -1) {
              //如果挂了年表单控件在子表中则应该只能携带到当前表单的同一个子表中字段
              var childCode1 = that.DataField.split(".")[0];
              var childCode2 = dataField.split(".")[0];
              if (childCode1 != childCode2) {
                continue;
              }
            }
            var controlKey = $sheetControl.attr("data-controlkey");
            if (controlKey == void 0 || controlKey.toLowerCase() == "formseqno") {
              continue;
            }
            $option.val(dataField).text(that.Designer.GetDataFieldDisplayName($sheetControl)).attr("data-DataType", that.GetBizDataType(controlKey));
            $fields.append($option);
          }

          if ($.inArray(that.DataField, that.Designer.PreInstalledFields) > -1) {
            //如果当前关联表单控件是预装的，则不能编辑关联配置
            $addRule.off("click").css("color", "#666");
            $propertys.attr('disabled', true);
            $fields.attr('disabled', true);
          } else {
            $actions.append($btnRemove);
          }




          $tempRow.append($propertys).append($connectTip).append($fields).append($actions);
          //$rulePropWrap.append($tempRow.clone(true));//把行添加到块
          $ruleWrapper.append($ruleTip).append($addRule).append($rulePropWrap);//把块添加到弹窗

          var existMappingRow = false;//标记是否有关联配置，如果没有关联配置则初始显示一行空配置，否则不显示
          //将已有的关联配置添加进去
          var $sourceSelect = $tempRow.find("select[data-mappingtype='Source']");
          var $targetSelect = $tempRow.find("select[data-mappingtype='Target']");
          for (var key in currentMappings) {
            var $row = $tempRow.clone(true);
            var sourceOption = $sourceSelect.find("option[value='" + currentMappings[key] + "']");
            var targetOption = $targetSelect.find("option[value='" + key + "']");
            if (sourceOption.length == 0 && targetOption.length == 0) {
              continue;
            }
            if (sourceOption.length == 0) {
              $row.find("select[data-MappingType='Source']").find("option:eq(0)").attr("selected", "selected");
            } else {
              $row.find("select[data-MappingType='Source']").val(currentMappings[key]);
            }
            if (targetOption.length == 0) {
              $row.find("select[data-MappingType='Target']").find("option:eq(0)").attr("selected", "selected");
            } else {
              $row.find("select[data-MappingType='Target']").val(key);
            }
            $rulePropWrap.append($row);
            existMappingRow = true;
          }

          if (!existMappingRow) {
            $rulePropWrap.append($tempRow.clone(true));//把行添加到块
          }

          $rulePropWrap.find("select.form-control").each(function () {
            $(this).DropDownList();
          });

          if (that.setRuleModal) {
            that.setRuleModal.show();
          } else {
            var actions = [{
              Text: "确定",
              Theme: 'btn_ok',
              CallBack: function () {
                //保存关联配置
                var errorMessage = "";
                var newMappings = {};
                $ruleWrapper.find("div.row[data-MappingType='Row']").each(function (index, item) {
                  var sourceSelect = $(this).find("select[data-mappingtype='Source']");
                  var targetSelect = $(this).find("select[data-mappingtype='Target']");
                  var source = sourceSelect.val();
                  var target = targetSelect.val();
                  if (source == "--关联字段--" || target == "--表单字段--") {
                    //没有配置的行
                    return true;
                  }
                  var sourceType = parseInt(sourceSelect.find("option:selected").attr("data-datatype"));
                  var targetType = parseInt(targetSelect.find("option:selected").attr("data-datatype"));
                  var sourceHasOption = sourceSelect.find("option:selected").attr("data-HasOptionValue");
                  //校验类型是否匹配
                  if (!that.CompareDataType(sourceType, targetType, sourceHasOption)) {
                    errorMessage = "第" + index + "行两侧类型不匹配,请修改配置";
                    return false;
                  }
                  //主表字段关联主表，不允许将子表字段携带到主表
                  var dataField = that.DataField;
                  var boSchemaCode = that.BOSchemaCode;
                  var boSchemaIsChildSchema = that.BoSchema.IsChildSchema;
                  if (dataField.indexOf(".") == -1 && !boSchemaIsChildSchema && source.indexOf(".") > -1 && target.indexOf(".") == -1) {
                    errorMessage = "主表单字段关联主表单时，不允许将关联表单的子表字段配置到当前表单的主表字段";
                    return false;
                  }

                  newMappings[target] = source;
                });
                if (errorMessage != "") {
                  $.IShowError(errorMessage);
                  return;
                }
                //将关联配置保存到控件属性上
                that.$Control.attr("data-mappingcontrols", JSON.stringify(newMappings));
                that.Settings["MappingControls"] = JSON.stringify(newMappings);
                that.SetRuleModal.hide();
              }
            }, {
              Text: "取消",
              Theme: "btn_cancel",
              CallBack: function () {
                that.SetRuleModal.hide();
              }
            }];

            that.SetRuleModal = new $.IModal({
              Title: '填充规则',
              Width: 600,
              ShowBack: true,
              HasIframe: false,
              Content: $ruleWrapper,
              ToolButtons: actions,
              ContentUrl: ''
            });
          }
        });
      }
    };
    //关联表单关联配置填充规则
    this.RenderMappingRule = function (designProperty, callBack) {
      var that = this;
      var propertyName = designProperty.Name;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      designProperty.Name === "DataRule" && propertyManager.$Title.css("position", "relative").append("<i data-tip='将关联表单字段的值填充到当前表单字段' class='ivu-icon ivu-icon-help-circled' style='color:#2d7fff'></i>");
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $item = $("<input maxlength=10 class='property-input' placeholder='设置规则' readonly='readonly'>").val(defaultValue);
      propertyManager.AddItem($item).addClass("ivu-icon ivu-icon-plus-round");

      //设置规则弹窗显示
      $item.off("click").on("click", function () {
        that.ShowDataRuleModal();
      });

      //+点击生成关联属性控件
      propertyManager.AddBottomButtonSimple("", "<i class='ivu-icon ivu-icon-plus-round'></i>生成关联属性控件", "根据关联表单自动生成关联属性控件，且此控件的之会跟随关联表单对应字段的值实时变化", function () {
        //如果没有配置关联表单则不允许快捷新增
        var boSchemaCode = that.$Control.attr("data-boschemacode");
        if (boSchemaCode && boSchemaCode != "") {
          that.QuickAddMappingProperty(that.DataField);
        } else {
          $.IShowError("请先配置关联的表单");
        }
      });
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };

    //更新关联属性配置选择字段
    this.UpdateMappingFields = async function (schemaCode, $item) {
      var that = this;
      if (schemaCode == void 0 || schemaCode == "" || $item == void 0) {
        return;
      }
      $item.empty();
      var $option = $("<option value=''>选择关联表单字段</option>");
      $item.append($option);
      // that.mappingSchemaCode = schemaCode;
      //根据schemaCode获取property绑定到字段选择器
      await that.Designer.LoadPublishedSchemaProperty(schemaCode);
      if (!$.isEmptyObject(that.Designer.SchemaProperties)) {
        var properties = that.Designer.SchemaProperties[schemaCode];
        if (properties != void 0 && properties.length > 0) {
          for (var i = 0; i < properties.length; i++) {
            if (properties[i].DataType == $.BizDataType.Attachment || properties[i].DataType == $.BizDataType.Image) {
              //过滤掉图片/附件
              continue;
            }
            var propertyDisplayName = properties[i].DisplayName;
            var propertyName = properties[i].Name;
            var propertyType = properties[i].DataType;
            $option = $("<option>").text(propertyDisplayName).val(propertyName).attr("data-datatype", propertyType);
            $item.append($option);
          }
        }
      }
      $item.DropDownList();
    };
    //关联表单字段/用于关联配置
    this.RenderBOSchemaField = async function (designProperty, callBack) {
      var that = this;
      var propertyName = designProperty.Name;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      propertyManager.SetTitle(designProperty.Text);
      designProperty.Name === "DataRule" && propertyManager.$Title.css("position", "relative");
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $div = $("<div></div>");
      var $schemaSelector = $('<select class="form-control" style="display: none;"><option value="" data-boschemacode="">选择关联表单</option></select>');
      var $propertySelector = $('<select class="form-control" style="display: none;"><option value="">选择关联表单字段</option></select>');
      $div.append($schemaSelector).append($propertySelector);

      var existMappingSchemaCode = "";  //已经配置的关联表单编码
      var existMappingField = ""; //已经配置的关联表单中的字段
      var existMappingFormQuery = ""; //配置了关联属性的控件
      var boField = that.$Control.attr("data-bofield"); //关联属性控件上绑定的关联表单控件

      //获取表单中所有的关联表单控件
      var formQueryControl = that.Designer.$SheetContent.find("div.row.sheet-control[data-controlkey='FormQuery'][data-boschemacode]");
      formQueryControl.each(function () {
        var $this = $(this);
        var boSchemaCode = $this.attr("data-boschemacode");
        if (boSchemaCode == "") {
          return true;
        }
        var dataField = $this.attr("data-datafield");
        var displayName = $this.attr("data-displayname");
        var $newOption = $("<option>");
        $newOption.text(displayName).val(dataField).attr("data-boschemacode", boSchemaCode);
        $schemaSelector.append($newOption);

        //读取当前关联表单控件的关联属性配置信息，判断是否配置了当前字段
        var mappingProperties = $this.attr("data-mappingproperties");
        if (mappingProperties && that.IsJson(mappingProperties)) {
          mappingProperties = JSON.parse(mappingProperties);
          for (var key in mappingProperties) {
            if (key == that.DataField) {
              existMappingField = mappingProperties[key];
              existMappingSchemaCode = boSchemaCode;
              existMappingFormQuery = $this.attr("data-datafield");
              break;
            }
          }
        }
      });

      if (boField && boField != "") {
        existMappingFormQuery = boField;
        var $formQuery = $(that.Designer.$SheetContent.find("div.row.sheet-control[data-controlkey='FormQuery'][data-datafield='" + boField + "']")[0]);
        existMappingSchemaCode = $formQuery.attr("data-boschemacode");
        $schemaSelector.val(existMappingFormQuery);
        //加载字段到item2
        await that.UpdateMappingFields(existMappingSchemaCode, $propertySelector);
      } else if (existMappingFormQuery != "") {
        $schemaSelector.val(existMappingFormQuery);
        //加载字段到item2
        await that.UpdateMappingFields(existMappingSchemaCode, $propertySelector);
      }

      if (existMappingField != "") {
        $propertySelector.val(existMappingField);
      }
      $schemaSelector.on("change", function () {
        // that.mappingSchemaCode = "";
        that.lastBoSchemaCode = that.$Control.attr("data-boschemacode");
        var $this = $(this);
        var schemaCode = $this.find("option:selected").attr("data-boschemacode");
        that.UpdateMappingFields(schemaCode, $propertySelector);
        that.$Control.attr("data-boschemacode", schemaCode);
        //从关联表单控件中删除当前关联属性控件的配置
        var formQueryControl = that.Designer.$SheetContent.find("div.row.sheet-control[data-controlkey='FormQuery'][data-boschemacode='" + schemaCode + "']")[0];
        if (formQueryControl) {
          var newMappingProperties = {};
          var mappingProperties = $(formQueryControl).attr("data-mappingproperties");
          if (mappingProperties && that.IsJson(mappingProperties)) {
            var mappingPropertiesVal = JSON.parse(mappingProperties);
            for (var key in mappingPropertiesVal) {
              if (key != that.DataField) {
                newMappingProperties[key] = mappingPropertiesVal[key];
              }
            }
            $(formQueryControl).attr("data-mappingproperties", JSON.stringify(newMappingProperties));
          }
        }
        $propertySelector.DropDownList();
      });
      $propertySelector.on("change", async function (e) {
        //将选中的值反写到关联表单控件
        var $itemSelected = $schemaSelector.find("option:selected");
        var mappingSchemaCode = $itemSelected.attr("data-boschemacode");
        var formQueryControlDataField = $itemSelected.val();
        console.log(e.target.value)
        if (mappingSchemaCode != "") {
          var mappingSource = $(this).val();
          var mappingTarget = that.DataField;
          var sourceType = $(this).find("option:selected").attr("data-datatype");

          if (sourceType == 26 || sourceType == 27) {
            var unityType = await HTTP.getControlItemUnitType({ appId: mappingSchemaCode, controlId: e.target.value });
            that.$Control.attr({
              "data-SourceType": sourceType,
              "data-BOSchemaField": mappingSource,
              "data-unitType": unityType.unitType,
            });

          }
          else {
            that.$Control.attr({
              "data-SourceType": sourceType,
              "data-BOSchemaField": mappingSource
            });
          }


          var formQueryControl = that.Designer.GetControlElement(formQueryControlDataField);
          if (formQueryControl.length > 0) {
            var mappingProperties = $(formQueryControl).attr("data-mappingproperties");
            if (mappingSource != "") {
              //当前选中了源字段，要修改关联表单的关联属性配置
              var newMappingProperty = {};
              newMappingProperty[mappingTarget] = mappingSource;
              if (mappingProperties == void 0) {
                mappingProperties = newMappingProperty;
              } else {
                mappingProperties = JSON.parse(mappingProperties);
                $.extend(mappingProperties, newMappingProperty);
              }
              $(formQueryControl).attr("data-mappingproperties", JSON.stringify(mappingProperties));
            } else {
              //当前没有选中源字段，要从关联表单的关联属性中删除当前字段
              if (mappingProperties != void 0) {
                var newMappingProperties = {};
                mappingProperties = JSON.parse(mappingProperties);
                for (var key in mappingProperties) {
                  if (key != mappingTarget) {
                    newMappingProperties[key] = mappingProperties[key];
                  }
                }
                $(formQueryControl).attr("data-mappingproperties", JSON.stringify(mappingProperties));
              }
            }

            //如果切换了关联表单控件，则要从原来的关联表单控件中清除当前关联属性配置
            if (that.lastBoSchemaCode != undefined && that.lastBoSchemaCode != mappingSchemaCode) {
              var oldFormQuery = that.Designer.$SheetContent.find("div.row.sheet-control[data-controlkey='FormQuery'][data-boschemacode='" + that.lastBoSchemaCode + "']");
              if (oldFormQuery.length > 0) {
                for (var i = 0; i < oldFormQuery.length; i++) {
                  var oldMappingProperties = $(oldFormQuery[i]).attr("data-mappingproperties");
                  if (oldMappingProperties && that.IsJson(oldMappingProperties)) {
                    oldMappingProperties = JSON.parse(oldMappingProperties);
                    var newMappingProperties = {};
                    for (var key in oldMappingProperties) {
                      if (key != that.DataField) {
                        newMappingProperties[key] = oldMappingProperties[key];
                      }
                    }
                    if (!$.isEmptyObject(newMappingProperties)) {
                      $(oldFormQuery[i]).attr("data-mappingproperties", JSON.stringify(newMappingProperties));
                    } else {
                      $(oldFormQuery[i]).removeAttr("data-mappingproperties");
                    }
                  }
                }
              }
            }
          }
        }
      });


      propertyManager.AddItem($div);

      $propertySelector.DropDownList({
        Width: "100%"
      });

      $schemaSelector.DropDownList({
        Width: "100%"
      });

      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };
    //校验关联配置两侧类型是否匹配
    this.CompareDataType = function (sourceType, targetType, hasOption) {
      var result = true;
      switch (sourceType) {
        case 1://关联字段是“是否”，表单字段可以是“是否”、“单行文本”
          result = targetType == 1 || targetType == 14;
          break;
        case 5://关联字段是“修改时间”、“日期”、“创建时间”，表单字段可以是“日期”、“单行文本”
          result = targetType == 5 || targetType == 14;
          break;
        case 7://关联字段是“数值”，表单字段可以是“数值”、“单行文本”
          result = targetType == 7 || targetType == 14;
          break;
        case 9://关联字段是“Status”，表单字段可以是“Status”、“数值”、“单行文本”
          result = targetType == 9 || targetType == 7 || targetType == 14;
          break;
        case 13://关联字段是“多行文本”，表单字段可以是“多行文本”
          result = targetType == 13;
          break;
        case 14://关联字段是“单行文本”，表单字段可以是“单行文本”、“关联表单”、“关联多选”
          if (targetType != 14 && targetType != 50 && targetType != 51) {
            result = false;
          } else {
            if (!hasOption) {
              if (targetType == 14 && targetControlKey != 'formtextbox') {
                result = false;
              }
            }
          }
          break;
        case 24://关联字段是“附件”，表单字段可以是“附件”
          targetType == 24;
          break;
        case 26://关联字段是“单人”，表单字段可以是“单人”，“多人”
          result = targetType == 26 || targetType == 27;
          break;
        case 27://关联字段是“多人”，表单字段可以是“多人”
          result = targetType == 27;
          break;
        case 50://关联字段是“关联查询”，表单字段可以是“关联查询”
          result = targetType == 50;
          break;
        case 56://关联字段是“地址”，表单字段可以是“地址”
          result = targetType == 56;
          break;
        default:

      }
      return true;
    };
    //快捷新增关联属性控件
    this.QuickAddMappingProperty = function (boField) {
      var that = this;
      var designer = that.Designer;
      var $mappingPropertyItem = $('<a href="javascript:void(0);" class="drag ui-draggable" data-controlkey="FormAssociateProperty" title="关联属性"><i class="fa icon-guanlianshux"></i>关联属性 </a>');
      //添加控件
      var $el = designer.RenderControl($mappingPropertyItem, 2);
      if ($el != null) {
        //将当前关联表单控件的编码跟关联属性控件关联
        $el.attr("data-bofield", boField);
        designer.$SheetContent.append($el);
        designer.BindDragEvent();
        //设置控件选择
        designer.ControlElementSelected($el, event);
        if (designer.GetDataField($el)) {
          //如果是开发者，需要输入编码
          if (designer.IsDevMode) {
            designer.ChangeDataFieldValueByDev();
          }
        }
      }
      return true;
    };

    //获取设计器中部门控件
    this.GetDepartmentFields = function (excludeField) {
      var that = this;
      var departmentFields = [];
      var departmentControls = that.Designer.$SheetContent.find("div[data-controlkey='FormDepartment']:not([data-datafield='" + that.Settings["DataField"] + "']):not([data-datafield*='.']),div[data-controlkey='FormMultiDepartment']:not([data-datafield='" + that.Settings["DataField"] + "']):not([data-datafield*='.']),div[data-controlkey='FormUser'][data-orgunitvisible='true']:not([data-datafield='" + that.Settings["DataField"] + "']):not([data-datafield*='.']),div[data-controlkey='FormMultiUser'][data-orgunitvisible='true']:not([data-datafield='" + that.Settings["DataField"] + "']):not([data-datafield*='.'])");

      //子表可以选择当前子表里面的控件和主表里面的控件
      if (that.Settings["DataField"].indexOf(".") > 0) {
        var $tr = that.$Control.closest("tr");
        var childTableDepartmentControls = $tr.find("div[data-controlkey='FormDepartment']:not([data-datafield='" + that.Settings["DataField"] + "']):not([data-datafield*='.']),div[data-controlkey='FormMultiDepartment']:not([data-datafield='" + that.Settings["DataField"] + "']):not([data-datafield*='.']),div[data-controlkey='FormUser'][data-orgunitvisible='true']:not([data-datafield='" + that.Settings["DataField"] + "']):not([data-datafield*='.']),div[data-controlkey='FormMultiUser'][data-orgunitvisible='true']:not([data-datafield='" + that.Settings["DataField"] + "']):not([data-datafield*='.'])");
        if (childTableDepartmentControls.length > 0) {
          $.each(childTableDepartmentControls, function () {
            departmentControls.push(this);
          });
        }
      }
      for (var i = 0; i < departmentControls.length; i++) {
        var dataField = $(departmentControls[i]).attr("data-datafield");
        if (excludeField && excludeField != dataField) {
          departmentFields.push("{" + dataField + "}");
        }
      }
      return departmentFields;
    };

    this.RenderCameraOnly = function (designProperty) {
      var that = this;
      var propertyManager = new $.PropertyManager(designProperty.Name);
      var defaultValue = this.Settings[designProperty.Name] || designProperty.DefaultValue;
      var $div = $("<div style='width:100%;float:left;overflow:hidden'>");
      var id = $.IGuid();
      var $input = $("<input  type='checkbox' id='" + id + "' name = '" + designProperty.Name + "' >");
      var $label = $("<label for='" + id + "' style='padding:0;margin:5px' >" + designProperty.Text + "</label>");
      $label.append("<i data-tip='该功能仅移动端有效' class='ivu-icon ivu-icon-help-circled' style='color:#2d7fff'></i>");
      propertyManager.SetTitle("");
      $div.append($input).append($label);
      $input.off("change.cameraonly").on("change.cameraonly", function (e) {
        var val = this.checked;
        that.$Control.attr('data-' + designProperty.Name, val);
        that.Settings[designProperty.Name] = val;
      });
      propertyManager.AddItem($div);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      if (defaultValue == "true") {
        $input[0].checked = true;
      }
      return propertyManager;
    };

    this.LoadPropertySetting();
  },
  // 属性管理
  PropertyManager: function (propertyName) {
    this.PropertyName = propertyName;
    this.$Title = $("<div class='property-left property-paddingleft-1x'>");
    this.$RightTools = $("<div class='property-right property-paddingright-1x'>");
    this.$Header = $("<div class='property-item property-title'>").append(this.$Title).append(this.$RightTools);
    this.$Ul = $("<ul class='property-items'>");
    this.$BottomTools = $('<div class="property-items contrlPaneLabel">').append(this.$BottomTools);
    this.$Group = $("<div class='property-group' propertyName='" + propertyName + "'>").append(this.$Header).append(this.$Ul).append(this.$BottomTools);
    this.$Items = [];
    this.IndexNo = 0;

    this.GetElement = function () {
      return this.$Group;
    };

    this.SetTitle = function (title) {
      this.$Title.text(title);
    };

    this.AddHeadRightButton = function (icon, text, callBack) {
      var $a = $("<a href='javascript:void(0);' class='guide'>" + text + "</a>");
      if (callBack && $.isFunction(callBack)) {
        $a.click(function () {
          callBack.call();
        });
      }
      this.$RightTools.append($a);
    };

    this.AddHeadRightText = function (text) {
      var $a = $("<span class='type'>" + text + "</span>");
      this.$RightTools.append($a);
    };

    this.AddBottomButton = function (icon, text, tiptext, callBack) {
      var $a = $("<a href='javascript:void(0);'>" + text + "</a>");
      if (callBack && $.isFunction(callBack)) {
        $a.click(function () {
          callBack.call();
        });
      }
      this.$BottomTools.append($a);
    };
    this.AddBottomButtonSimple = function (icon, text, tiptext, callBack) {
      var $a = $("<span href='javascript:void(0);' class='simplebtn'>" + text + "</span>");
      var $tip = $("<i data-tip='" + tiptext + "' class='ivu-icon ivu-icon-help-circled' style='color:#2d7fff'></i>");
      if (tiptext) {
        $a.append($tip)
      }
      $tip.click(function (event) {
        event.stopPropagation();
      });
      if (callBack && $.isFunction(callBack)) {
        $a.click(function () {
          callBack.call();
        });
      }
      this.$BottomTools.append($a);
    };

    this.removeBottomButtonSimple = function () {
      this.$BottomTools.find('.simplebtn').remove();
      this.$BottomTools.find('.icon-tooltip').remove();
    }

    this.$BottomTools
    this.HideHeadButton = function () {
      this.$RightTools.hide();
    };

    this.ShowHeadButton = function () {
      this.$RightTools.show();
    };

    this.Show = function () {
      this.$Group.show();
    };

    this.Hide = function () {
      this.$Group.hide();
    };

    this.AddItem = function ($item) {
      $item.attr("data-index", this.IndexNo);
      var $li = $("<li data-index='" + this.IndexNo + "' class='property-item'>").append($item);
      this.$Ul.append($li);

      this.$Items.push($item);
      this.IndexNo++;
      return $li;
    };

    this.RemoveItem = function (item) {
      for (var i = 0; i < this.$Items.length; i++) {
        if (this.$Items[i].attr("data-index") == item.attr("data-index")) {
          this.$Items.splice(i, 1);
          break;
        }
      }
      item.detach();
    };

    this.ClearItems = function () {
      this.$Ul.empty();
      this.$Items = [];
    };
  },

  // 标题栏属性
  LoadPageHeaderProperty: function (sheetDesigner, $pageHeader) {
    this.Designer = sheetDesigner;// 清空原来的配置
    this.$Control = $pageHeader;
    this.$SheetControlPropertysPanel = sheetDesigner.$SheetControlPropertysPanel;
    this.$SheetControlPropertysPanel.empty();

    this.Designer.$btn_SheetControlProperty.click();
    // 标题
    this.RenderTitle = function () {
      var that = this;
      var propertyManager = new $.PropertyManager("title");
      var $item = $("<div>");
      var current = that.$Control.hasClass("page-describle") ? "isDescrible" : "isTitle";

      $item.empty();
      var $input;
      if (current == "isTitle") {
        var defaultValue = that.$Control.find("strong").text();
        propertyManager.SetTitle("标题");
        that.$Control.removeClass("page-describle");
        $input = $("<input class='property-input'>").val(defaultValue);
      }
      else {
        var defaultValue = that.$Control.find("strong").html();
        propertyManager.SetTitle("描述");
        that.$Control.addClass("page-describle");
        $input = $("<textarea style='width:100%;height:120px;overflow-y:scroll;line-height:20px;' class='property-input'>").val(defaultValue.replace(/<br\s*\/?>/gi, "\n"));
      }

      $input.keyup(function () {
        //将类似<script><font>等尖括号标签转为浏览器不可识别的标签
        var wrapText = $(this).val().replace(/</g, "〈").replace(/>/g, "〉").replace(/\n/g, "<br/>").replace(/\r/g, "<br/>").replace(/\r\n/g, "<br/>");//将\n替换成br   
        that.$Control.find("strong").html(wrapText);
      });
      $item.append($input);

      propertyManager.AddItem($item);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
      return propertyManager;
    };

    // 对其方式
    this.RenderAlign = function () {
      var that = this;
      var propertyManager = new $.PropertyManager("align");
      propertyManager.SetTitle("对齐");

      var textAlign = that.$Control.css("text-align");
      if (textAlign != "left" && textAlign != "center" && textAlign != "right") {
        textAlign = "left";
      }

      var alignItems = [
        {
          Id: "headerLeft", Text: "左", Value: "left"
        },
        {
          Id: "headerCenter", Text: "中", Value: "center"
        },
        {
          Id: "headerRight", Text: "右", Value: "right"
        }
      ];
      var $div = $("<div>");
      for (var i = 0; i < alignItems.length; i++) {
        var item = alignItems[i];
        var $input = $('<input id="' + item.Id + '" name="headerAlign" type="radio" data-align="' + item.Value + '">');
        var $label = $('<label for="' + item.Id + '" class="radio-inline">' + item.Text + '</label>');
        if (textAlign == item.Value) {
          $input.prop("checked", true);
        }
        $input.click(function () {
          that.$Control.css({
            "text-align": $(this).attr("data-align")
          });
        });
        $div.append($input).append($label);
      }
      propertyManager.AddItem($div);

      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
    };
    //是否打印标题栏
    this.RenderPrintTitle = function () {
      var that = this;
      var propertyManager = new $.PropertyManager("printTitle");
      var $div = $("<div>");
      var $check = $("<input type='checkbox' checked='true' id='printTitle'>");
      $div.append($check).append("<label for='printTitle'>打印标题/描述说明</label>");
      $check.on("change", function () {
        that.$Control.attr("data-printable", $(this).prop("checked"));
      });

      propertyManager.AddItem($div);
      that.$SheetControlPropertysPanel.append(propertyManager.GetElement());
    };
    var titileManager = this.RenderTitle();
    this.RenderAlign();
    //表单暂时不控制标题栏是否打印，需求在流程中控制。目前没有解决办法
    //this.RenderPrintTitle();
  }
});



// WEBPACK FOOTER //
// ./src/lib/H3/Console/SheetDesigner/ControlManager.js
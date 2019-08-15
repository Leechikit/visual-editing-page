<template>
    <div>
        <!-- 新建表单 -->
        <Modal v-model="showPopups"  :title="modalTitle" :mask-closable="false"     
            @on-ok="ok" @on-cancel="cancel" width="420px"  :loading="loading">
            <div class="popupsContent">
                <div class="main">
                    <div class="bd">
                        <form id="form">
                            <div class="msgBox_row" v-if="!modify && isDeveloper">
                                <div class="col-left">
                                    <!-- <i data-tip='表单编码' class='icon-tooltip icon-tips'></i> -->
                                    <label class="row_name" for="txtFormDevCode">
                                        {{formCode}}
                                        <Poptip v-if="modalTitle=='新建表单'" trigger="hover" style="margin-left:6px;" class="help icon-tips" width="238" placement="top"> 
                                            <div slot="content" class="pop_content">
                                                <p>
                                                    表单编码为表单的唯一标识，允许开发者
                                                </p>
                                                <p>
                                                    自定义，便于后期在代码或SQL中使用
                                                </p>
                                            </div>
                                        </Poptip>
                                    </label>
                                </div>
                                <div class="col-right">
                                    <input type="text" class="row_input row_label_code" readonly :value="currentDevCode" id="txtFormDevCode">
                                    <input type="text" class="row_input row_input_code" name="txtFormDevCode" placeholder="请输入编码" v-model="AppCode" id="txtFormCode" @blur="clearChiness.call(this, arguments[0])" @keyup="checkvalue.call(this,arguments[0])">
                                </div>
                            </div>
                            <div class="msgBox_row" v-if="modify && isDeveloper">
                                <div class="col-left">
                                    <label class="row_name" for="txtFormDevCode">
                                        {{formCode}}
                                        <Poptip v-if="modalTitle=='修改表单'" trigger="hover" style="margin-left:6px;" class="help icon-tips" width="238" placement="top"> 
                                            <div slot="content" class="pop_content">
                                                <p> 
                                                    表单编码为表单的唯一标识，允许开发者
                                                </p>
                                                <p>
                                                    自定义，便于后期在代码或SQL中使用
                                                </p>
                                            </div>
                                        </Poptip>
                                    </label>
                                </div>
                                <div class="col-right">
                                    <input type="text" class="row_input row_label_code devModify" readonly :value="formList.Code" id="txtFormDevCode">
                                </div>
                            </div>
                            <div class="msgBox_row">
                                <div class="col-left">
                                    <label class="row_name" for="txtFormDevCode">{{formName}}</label>
                                </div>
                                <div class="col-right">
                                    <input type="text" class="row_input row_input_text" placeholder="请输入名称" v-model="DisplayName" id="txtFormName" v-on:input="txtFormNameCheck()">
                                </div>
                            </div>
                            <div class="msgBox_row">
                                <div class="col-left">
                                    <label class="row_name" for="txtRepName">所属分组</label>
                                </div>
                                <div class="col-right">
                                    <div class="btn-group" @click="openMenu()" id="menu">
                                        <button type="button" class="btn btn-default" id="btnFormGroup">{{currentGroup}}</button>
                                        <button type="button" class="btn btn-primary dropdown-toggle">
                                            <span class="icon icon-arrow-down2"  @click.stop="openMenu()"></span>
                                            <span class="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <ul class="dropdown-menu" data-tar="#btnRepGroup" id="RepGroupUl" v-if="isOpenMenu && GroupNamesArray.length">
                                          <li :code="group.Code" @click.stop="choseGroup(group.Code,group.DisplayName)" v-for="group in GroupNamesArray"><a>{{group.DisplayName}}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="msgBox_row">
                                <div class="col-left">
                                    <label class="row_name">图标</label>
                                </div>
                                <div class="col-right">
                                    <select id="iconPicker" ref="iconPicker" v-model="formList.icon"></select>
                                </div>
                            </div>
                            <div class="msgBox_row" v-if="isDeveloper && createSheet">
                                <div v-if="createSheet">
                                    <div class="col-left">
                                        <label class="row_name">单表模式</label>
                                    </div>
                                    <div class="col-right">
                                        <input type="checkbox" id="NoteTypeinput" ref="NoteType" v-model="NodeTypeBoolean">
                                        <label for="NoteTypeinput">开启</label>
                                        <span class="color999">(确定开启后不允许关闭)</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
import {
  addSheet,
  modifySheetOrReport,
  AddAppReport,
  AddWorkflowPackage,
  UpdateWorkflowPackag,
  CheckCodeDuplicated
} from "../../../service/getData";

import "../../../lib/H3/H3Plugins/fontpicker";
import "../../../lib/plugins/fontIconPicker/jquery.fonticonpicker.js";


export default {
  data() {
    return {
      showPopups: false,
      formList: {
        AppCode: "",
        DisplayName: "",
        icon: "",
        Code: "",
        NodeTypeBoolean:""
      },
      loading: true,
      fontPicker: null, //字体图标对象
      iconClass: "",
      GroupNamesArray: [],
      isOpenMenu: false,
      currentGroup: "无分组",
      ParentCode: "",
      modify: false,
      currentDevCode: "",
      AppCode: "",
      DisplayName: "",
      createReport: false,
      createSheet: false,
      modifySheet: false,
      modifyReport: false,
      formCode: "表单编码",
      formName: "表单名称",
      sysWorkflow: false,
      codeDuplicated: false,
      NodeType: "", // 单表模式是否开启
      onlyAddSheetShow: false,
      NodeTypeBoolean:false
    };
  },
  props: {
    ifShowPopups: {
      default: false,
      type: Boolean,
      twoWay: true
    },
    modalTitle: {
      default: "",
      type: String,
      twoWay: true
    },
    code: {
      default: "",
      type: String,
      twoWay: true
    },
    groupnames: {
      default: "",
      type: Array,
      twoWay: true
    },
    isModifySheet: {
      default: false,
      type: Boolean,
      twoWay: true
    },
    modifyObject: {
      default: "",
      type: Object,
      twoWay: true
    },
    devCode: {
      default: "",
      type: String,
      twoWay: true
    },
    ifCreateReport: {
      default: false,
      type: Boolean,
      twoWay: true
    },
    ifCreateSheet: {
      default: false,
      type: Boolean,
      twoWay: true
    },
    ifModifyReport: {
      default: false,
      type: Boolean,
      twoWay: true
    },
    ifSysWorkflow: {
      default: false,
      type: Boolean,
      twoWay: true
    },
    ifModifyWorkflow: {
      default: false,
      type: Boolean,
      twoWay: true
    },
    isDeveloper: {
      default: false,
      type: Boolean,
      twoWay: true
    }
  },
  created: function() {
    var that = this;
    // 创建页面时，渲染icon图标下拉框，使用插件fontIconPicker
    that.fontPicker = $.IFontPicker();
    let iconClass = $("span.selected-icon:last")
      .children("i")
      .attr("class");

    that.formList = {};
    this.ParentCode = this.code;
    that.isOpenMenu = false;
    that.GroupNamesArray = [];

    $(document).on("click", function(e) {
      // console.log($(e.target).parent("#menu").length)
      if ($(e.target).parent("#menu").length == 0) {
        that.isOpenMenu = false;
      }
    });
    var $ToolTip = $(
      '<div class="table-tip" style="display: none;"></div>'
    ).appendTo($("body"));
    $("body")
      .off("mouseenter.tooltip")
      .on("mouseenter.tooltip", ".icon-tooltip", function() {
        var $that = $(this);
        var offset = $that.offset();
        $ToolTip
          .html($that.attr("data-tip"))
          .css({
            left:
              offset.left +
              ($that.outerWidth() - $ToolTip.outerWidth()) / 2 -
              $(window).scrollLeft(),
            bottom: $(window).height() - offset.top + 6 + $(window).scrollTop()
          })
          .toggle();
        return false;
      });

    $("body")
      .off("mouseleave.tooltip")
      .on("mouseleave.tooltip", ".icon-tooltip", function() {
        $ToolTip.hide();
      });
  },
  watch: {
    ifShowPopups: function(cur) {
      var that = this;
      if (cur == true) {
        that.showPopups = true;
        // 添加fontIconPicker
        let iconPicker = $("#iconPicker");
        that.fontPicker.AddFontPicker(iconPicker);
        that.NodeTypeBoolean = false;
      } else {
        that.showPopups = false;
      }
    },
    ifCreateReport: function(cur) {
      var that = this;
      that.createReport = cur ? true : false;
      if (cur) {
        that.formName = "报表名称";
        that.formCode = "报表编码";
      }
    },
    ifCreateSheet: function(cur) {
      var that = this;
      that.createSheet = cur ? true : false;
      if (cur) {
        that.formName = "表单名称";
        that.formCode = "表单编码";
      }
    },
    isModifySheet: function(cur) {
      var that = this;
      that.modifySheet = cur;
      if (cur == true) {
        that.modify = true;
        // 图标展示之前保存的图标
        that.fontPicker.SetIcon(that.formList.IconCss);
        that.formName = "表单名称";
        that.formCode = "表单编码";
      } else {
        that.modify = false;
        $("span.selected-icon:last")
          .children("i")
          .attr("class", "icon-cgfk");
        that.currentGroup = "无分组";
        that.ParentCode = that.code;
      }
    },
    ifModifyReport: function(cur) {
      var that = this;
      that.modifyReport = cur;
      if (cur == true) {
        that.modify = true;
        // 图标展示之前保存的图标
        that.fontPicker.SetIcon(that.formList.IconCss);
        that.formName = "报表名称";
        that.formCode = "报表编码";
      } else {
        that.modify = false;
        $("span.selected-icon:last")
          .children("i")
          .attr("class", "icon-cgfk");
        that.currentGroup = "无分组";
        that.ParentCode = that.code;
      }
    },
    groupnames: function(cur) {
      var that = this;
      that.GroupNamesArray = cur;
    },
    modifyObject: function(cur) {
      var that = this;
      that.formList = cur;
      that.AppCode = that.formList.AppCode;
      that.DisplayName = that.formList.DisplayName;
      $("span.selected-icon:last")
        .children("i")
        .attr("class", that.formList.IconCss);
      for (var i = 0, len = that.GroupNamesArray.length; i < len; i++) {
        if (that.GroupNamesArray[i].Code == that.formList.ParentCode) {
          that.currentGroup = that.GroupNamesArray[i].DisplayName;
          that.ParentCode = that.GroupNamesArray[i].Code;
        }
      }
      if(that.formList.NodeType == "240"){
        that.NodeTypeBoolean = true;
      }else if(that.formList.NodeType == "200"){
        that.NodeTypeBoolean = false;
      }
    },
    devCode: function(cur) {
      var that = this;
      that.currentDevCode = cur;
    }
  },
  methods: {
    ok() {
      var that = this;
      var Code = that.AppCode;
      var reg_number = /^[0-9]*$/; //编码不能是纯数字
      // var reg_world = /^[\u4e00-\u9fa5]+$/;//编码不能是特殊字符
      var reg_world = /[^\w\.\/]/gi; //编码不能是特殊字符
      if (
        (Code == "" || Code == undefined) &&
        that.currentDevCode != "" &&
        that.isDeveloper
      ) {
        $.IShowWarn("编码不能为空");
        $("#txtFormCode").focus();
        that.isClose();
        return;
      }
      if (
        reg_number.test(Code) &&
        that.currentDevCode != "" &&
        that.isDeveloper
      ) {
        $.IShowWarn("编码不能为纯数字");
        $("#txtFormCode").focus();
        that.isClose();
        return;
      }
      if (
        reg_world.test(Code) &&
        that.currentDevCode != "" &&
        that.isDeveloper
      ) {
        $.IShowWarn("编码只能是中英文、数字和下划线");
        $("#txtFormCode").focus();
        that.isClose();
        return;
      }

      if (that.DisplayName == "" || that.DisplayName == undefined) {
        $.IShowWarn("名称不能为空");
        $("#txtFormName").focus();
        that.isClose();
        return;
      }
      that.formList.icon = $("span.selected-icon:last")
        .children("i")
        .attr("class");
      if (that.formList.icon == "fip-icon-block") {
        $.IShowWarn("图标不能为空");
        that.isClose();
        return;
      }
      if (that.isDeveloper) {
        // if (AppNames[currentDevCode+datas.Code]) { currentDevCode+datas.Code
        //     $.IShowWarn("编码已存在");
        //     $("#txtFormCode").focus();
        //     that.isClose();
        //     return;
        // }
        that.CheckCodeDuplicated(that.currentDevCode + Code);
      } else {
        //如果编码不存在，则取执行其他接口
        that.checkUseWhichOperation();
      }
      that.isOpenMenu = false;
    },
    cancel() {
      var that = this;
      that.$emit("closeSheetPopups", false);
      that.isOpenMenu = false;
    },
    checkUseWhichOperation() {
      var that = this;
      if (that.ifSysWorkflow) {
        if (that.ifModifyWorkflow) {
          // 是否是修改流程表单
          that.updateWorkflowPackag();
        } else {
          that.addWorkflowPackage();
        }
      } else {
        if (that.modifySheet) {
          that.modifySheetOrReport();
        } else if (that.createSheet) {
          that.addSheet();
        } else if (that.createReport) {
          that.addAppReport();
        } else if (that.modifyReport) {
          that.modifySheetOrReport();
        }
      }
    },
    isClose() {
      setTimeout(() => {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }, 2000);
    },
    async addSheet() {
      var that = this;
      if (that.NodeTypeBoolean) {
        that.NodeType = 240;
      } else {
        that.NodeType = 200;
      }
      let res = await addSheet(
        that.ParentCode,
        that.DisplayName,
        that.formList.icon,
        that.code,
        that.AppCode,
        that.NodeType
      );
      if (res.Successful) {
        that.showPopups = false;
        $.IShowSuccess("新建表单成功");
        // 将点击确定之后的showModal 派发给父组件
        that.$emit("getSheetList", false);
      } else {
        that.haslist = false;
        $.IShowWarn(res.ErrorMessage);
        that.isClose();
      }
    },
    async modifySheetOrReport() {
      var that = this,
        NodeType,
        successTip;
      if (that.modifySheet) {
        NodeType = 200;
        successTip = "修改表单成功";
      } else {
        NodeType = 220;
        successTip = "修改报表成功";
      }
      let res = await modifySheetOrReport(
        that.formList.Code,
        that.ParentCode,
        that.DisplayName,
        that.formList.icon,
        that.AppCode,
        NodeType
      );
      if (res.Successful) {
        that.showPopups = false;
        $.IShowSuccess(successTip);
        // 将点击确定之后的showModal 派发给父组件
        that.$emit("getSheetList", false);
      } else {
        that.haslist = false;
        $.IShowWarn(res.ErrorMessage);
      }
    },
    async addAppReport() {
      var that = this;
      let res = await AddAppReport(
        that.ParentCode,
        that.DisplayName,
        that.formList.icon,
        that.code,
        that.AppCode
      );
      if (res.Successful) {
        that.showPopups = false;
        $.IShowSuccess("新建报表成功");
        // 将点击确定之后的showModal 派发给父组件
        that.$emit("getSheetList", false);
      } else {
        that.haslist = false;
        $.IShowWarn(res.ErrorMessage);
        that.isClose();
      }
    },
    async addWorkflowPackage() {
      var that = this;
      let res = await AddWorkflowPackage(
        that.ParentCode,
        that.DisplayName,
        that.formList.icon,
        that.code,
        that.AppCode
      );
      if (res.Successful) {
        that.showPopups = false;
        $.IShowSuccess("新建流程表单成功");
        // 将点击确定之后的showModal 派发给父组件
        that.$emit("getSheetList", false);
      } else {
        that.haslist = false;
        $.IShowWarn(res.ErrorMessage);
        that.isClose();
      }
    },
    async updateWorkflowPackag() {
      var that = this;
      let res = await UpdateWorkflowPackag(
        that.ParentCode,
        that.formList.Code,
        that.DisplayName,
        that.formList.icon
      );
      if (res.Successful) {
        that.showPopups = false;
        $.IShowSuccess("修改流程表单成功");
        // 将点击确定之后的showModal 派发给父组件
        that.$emit("getSheetList", false);
      } else {
        that.haslist = false;
        $.IShowWarn(res.ErrorMessage);
        that.isClose();
      }
    },
    async CheckCodeDuplicated(devcode) {
      var that = this;
      let res = await CheckCodeDuplicated(devcode);
      if (res.Successful) {
        if (res.ErrorMessage != null) {
          $.IShowWarn(ErrorMessage);
        } else {
          //如果编码不存在，则取执行其他接口
          that.checkUseWhichOperation();
        }
        that.hasSaveCodeDuplicated = true;
        return;
      } else {
        that.haslist = false;
        $.IShowWarn(res.ErrorMessage);
        that.isClose();
      }
    },
    openMenu() {
      this.isOpenMenu = !this.isOpenMenu;
    },
    choseGroup(groupcode, name) {
      var that = this;
      that.ParentCode = groupcode;
      that.currentGroup = name;
      that.isOpenMenu = false;
    },
    // 验证formList.AppCode是否合法
    checkvalue(e) {
      var reg = /^[_a-zA-Z0-9]+$/;
      if (!reg.test(this.AppCode)) {
        this.AppCode="";
      }
      // if (e.keyCode >= 37 && e.keyCode <= 40){
      //     return
      // }
      // //复制的时候判断编码是不是中文
      // var reg = /[^\w\.\/]/ig
      // if(e.keyCode==86){
      //    for(var i = 0;i<_self.AppCode.length;i++){
      //        var code = _self.AppCode.charAt(i); 
      //        if(reg.test(code)){
      //            _self.AppCode = '';
      //            return;
      //        }
      //    }
      // }
      // var val = e.key.replace(/[^\w\.\/]/ig, '');
      // if (val != e.key) {
      //    _self.AppCode = val
      // }
    },
    clearChiness(e) {
      var reg = /[^\w\.\/]/gi;
      for (var i = 0; i < this.AppCode.length; i++) {
        var code = this.AppCode.charAt(i);
        if (reg.test(code)) {
          this.AppCode = '';
          return;
        }
      }
    },
    txtFormNameCheck() {
      var that = this;
      var newFormName;
      if (that.DisplayName != undefined) {
        newFormName = $.IFilterCharacter(that.DisplayName);
        that.DisplayName = newFormName;
      }
    }
  }
};
</script>

<style>


button {
    outline: none;
}

#menu .dropdown-toggle {
    height: 32px;
    margin-top: 1px;
}

.icon-tooltip {
    color: #2D7FFF;
    display: inline-block;
    margin-left: 6px;
}
</style>






// WEBPACK FOOTER //
// src/components/sheetdesigner/popups/create-sheet.vue
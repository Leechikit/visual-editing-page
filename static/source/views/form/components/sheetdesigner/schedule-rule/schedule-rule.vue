<template>
  <div v-show="visible">
    <!--主界面-->
    <Modal title="消息推送提醒" class="modal-schedulerule modal-schedulerule-main" :width="700" :height="500" v-model="modalRule" :mask-closable="false">
      <div class="title" style="margin-top:0px;">通过设置消息推送提醒可以在指定时间收到消息提醒内容（只对新增数据有效）</div>
      <div :class="(scheduleRules&&scheduleRules.length>0)?'hasRuleList':'noRuleList'">
        <button class="fa  btn-add" @click="doAdd"> 新增 <Icon type="android-add"></Icon></button>
      </div>
      <div v-show="scheduleRules&&scheduleRules.length>0">
        <!--提醒列表-->
        <div class="rulelist-title">推送提醒列表</div>
        <div class="rulelist-container">
          <Row class="rulelist-item" v-for="rule in scheduleRules" :key="rule.ObjectId">
            <div>
              <span class="title">被提醒人：</span>
              <span class="content">{{rule.ReceiversText}}</span>
            </div>
            <div>
              <span class="title">重复类型：</span>
              <span class="content">{{rule.RecurrenceType|RecurrenceTypeHandler}}</span>
            </div>
            <div>
              <span class="title">提醒时间：</span>
              <span class="content">{{rule.AlertTimeText}}</span>
              <span class="content">{{[rule.StartTime,rule.OffsetTime,rule.AlertTimeFormat]|OffsetHandler}}</span>
            </div>
            <div>
              <span class="title">提醒条件：</span>
              <span class="content">{{rule.ConditionExpressionText}}</span>
              <div class="rulelist-item-action">
                <span class="btn-edit" @click="doEdit(rule.ObjectId)">编辑</span>
                <Poptip title="确定删除此条推送提醒设置吗？" :confirm="true" placement="bottom-end" class="btn-remove" @on-ok="doRemove(rule.ObjectId)">删除</Poptip>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </Modal>
    <!--新建界面-->
    <Modal title="新增消息推送提醒" class="modal-schedulerule" :width="700" v-model="showAddModal" :mask-closable="false" @on-ok="modalOkHandler"
      @on-cancel="modalCancelHandler">
      <div class="schedule-edit-container" id="scheduleeditcontainer">
        <div class="schedule-edit-receivers-container">
          <span class="container-title">被提醒人</span>
          <div class="schedule-edit-receivers-formula-container">
            <input id="scheduleeditreceiversformula" readonly="readonly" :value="receiverExpressionText" placeholder="添加被提醒人" @click="toShowAddReceiver">
            <span class="icon icon-add" @click="toShowAddReceiver"></span>
          </div>
        </div>
        <div class="schedule-edit-timetype-container">
          <span class="container-title">提醒模式</span>
          <div class="schedule-edit-timetype-select-container">
          </div>
        </div>
        <div class="schedule-edit-alerttime-container" v-show="!isCustomTime">
          <div class="schedule-edit-alerttime-container-item">
            <span class="container-title">选择日期控件</span>
            <div class="schedule-edit-alerttime-select-container">
            </div>
          </div>

          <!--选择当时/当天/之前/之后-->
          <div class="schedule-edit-alerttimeoffset-container-item">
            <span class="container-title">&nbsp;</span>
            <div class="schedule-edit-offsettime1-select-container">
            </div>
          </div>

          <!--选择之前/之后出现以下选项-->
          <div class="schedule-edit-alerttime-container-offset">
            <div class="schedule-edit-alerttime-container-offsetday" v-show="showDay">
              <span class="container-title">&nbsp;</span>
              <div class="schedule-edit-offsettime2-select-container">
                <input type="text" class="input-offset" v-model="offset_day">
                <div>
                  天
                </div>
              </div>
            </div>
            <div class="schedule-edit-alerttime-container-offsethour" v-show="showHour">
              <span class="container-title">&nbsp;</span>
              <div class="schedule-edit-offsettime2-select-container">
                <input type="text" class="input-offset" v-model="offset_hour">
                <div>
                  小时
                </div>
              </div>
            </div>
            <div class="schedule-edit-alerttime-container-offsetminute" v-show="showMinute">
              <span class="container-title">&nbsp;</span>
              <div class="schedule-edit-offsettime2-select-container">
                <input type="text" class="input-offset" v-model="offset_minute">
                <div>
                  分钟
                </div>
              </div>
            </div>
          </div>

          <!--选择当天出现以下选项-->
          <div class="schedule-edit-alerttime-container-item" v-show="showHourMinute">
            <span class="container-title">&nbsp;</span>
            <div>
              <TimePicker format="HH:mm" placeholder="选择时间" style="width:100px;margin-left:10px" v-model="offsetTimeHourMinute"></TimePicker>
            </div>
          </div>
        </div>
        <div class="schedule-edit-time-container">
          <div class="schedule-edit-starttime-container" v-show="isCustomTime">
            <span class="container-title">提醒时间</span>
            <div class="schedule-edit-starttime-select-container">
              <DatePicker type="datetime" placeholder="选择提醒时间" style="width:240px" format="yyyy-MM-dd HH:mm" :value="fixAlertTime" @on-change="changeDate"></DatePicker>
            </div>
          </div>
          <div class="schedule-edit-recurrencetype-container" v-show="isCustomTime">
            <span class="container-title">重复周期</span>
            <div class="schedule-edit-recurrencetype-select-container">
            </div>
          </div>

        </div>
        <div class="schedule-edit-condition-container">
          <div class="schedule-edit-conditiontype-condition">
            <span class="container-title">提醒条件</span>
            <div class="schedule-edit-conditiontype-select-container">
            </div>
          </div>
          <div class="schedule-edit-content-container" v-show="showConditionEditor">
            <span class="container-title">&nbsp;</span>
            <!--<div class="schedule-edit-content-editor"  placeholder="设置过滤条件" @click="toShowConditionRule">
            </div>-->
            <div class="schedule-edit-content">
              <input class="schedule-edit-content-editor" readonly placeholder="设置过滤条件" @click="toShowConditionRule" :value="conditionExpressionText"
              />
              <span class="icon icon-add"></span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <i-button type="primary" class="btn-ok" @click="modalOkHandler">确定</i-button>
        <i-button type="text" class="btn-cancel" @click="modalCancelHandler">取消</i-button>
      </div>
    </Modal>

    <Modal title="提醒条件" class="modal-conditionrule-editor" :width="700" v-model="showConditionRule" :mask-closable="false" @on-cancel="editRuleCancelHandler">
      <div v-if="true">
        <formula ref="advanceView" :Formula="conditionExpression" :FormulaType="conditionExpressionType" :SchemaCode="sheetCode"
          :Width="conditionExpressionEditor_width" :Height="conditionExpressionEditor_height"></formula>
      </div>
      <div slot="footer">
        <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="editRuleDoneHandler()">
          <span>确定</span>
        </button>
        <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="editRuleCancelHandler()">
          <span>取消</span>
        </button>
      </div>
    </Modal>
    <participant :schema-code="sheetCode" :title="receiverTtitle" :showFlag="showAddReceiver" :formula="receiverExpression" @cancel="receiverModalCancel"
      @ok="receiverModalOk">
    </participant>
  </div>
</template>

<script>
import $ from "jquery";

import "../../../lib/H3/H3Plugins/H3.plugins.system";
import {
  LoadSchedule,
  AddSchedule,
  UpdateSchedule,
  RemoveSchedule
} from "../../../service/SheetDesigner/getData";
import Bus from "../../../lib/H3/H3Plugins/bus.js";
import { FormulaTypeList } from "../../../lib/H3/Console/Formula/Formula";
import "../../../lib/H3/Console/Formula/NewFormulaEditable.js";
import Formula from "../../console/formula/formula";
import participant from "../../workflowdesigner/participant";
import "../../../lib/H3/Form/FormControls.js";
import "../../../lib/H3/Form/BaseControl.js";
import "../../../lib/H3/Form/ControlManager.js";
import "../../../lib/H3/Form/Controls/FormDateTime.js";

export default {
  components: {
    Formula,
    participant
  },
  filters: {
    OffsetHandler(args) {
      var startTime = args[0];
      var offset = args[1];
      var format = args[2];
      var offsetText = "";
      if (startTime != "") {
        offsetText = startTime;
      } else {
        var json = JSON.parse(offset);
        var offsetDay = parseInt(json.offsetDay);
        var fixedTime = json.fixedTime || "";
        if (offsetDay == 0) {
          offsetText = format == "yyyy-mm-dd" ? "当天" : "当时";
          offsetText += fixedTime;
        } else {
          offsetText = offsetDay < 0 ? "之前" : "之后";
          offsetDay = Math.abs(offsetDay);
          var day = parseInt(offsetDay / (24 * 60));
          offsetText += day + "天";
          if (fixedTime == "") {
            var hour = parseInt((offsetDay - day * 24 * 60) / 60);
            var minute = offsetDay % 60;
            offsetText += hour + "小时" + minute + "分钟";
          } else {
            offsetText += fixedTime;
          }
        }
      }
      return offsetText;
    },
    RecurrenceTypeHandler(type) {
      var recurrenceTypeText = "";
      if (type == 0) {
        recurrenceTypeText = "不执行";
      } else if (type == 1) {
        recurrenceTypeText = "只执行一次";
      } else if (type == 2) {
        recurrenceTypeText = "每天执行";
      } else if (type == 3) {
        recurrenceTypeText = "每周同一天执行";
      } else if (type == 4) {
        recurrenceTypeText = "每月同一天执行";
      } else if (type == 5) {
        recurrenceTypeText = "每年同一天执行";
      }
      return recurrenceTypeText;
    }
  },
  props: {
    sheetCode: {
      type: String,
      default: ""
    }
  },
  created() {
    //监听公式编辑器中的保存事件
    Bus.$on(FormulaTypeList.SCHEDULERULE, target => {
      this.conditionExpression = target.formula;
      this.conditionExpressionText = target.formulaText;
      setTimeout(() => {
        this.showConditionRule = false;
      }, 500);
    });
  },
  mounted() {
    this.loadSchedule();
  },
  data() {
    return {
      receiverExpressionText: "",
      receiverExpression: "",
      receiverTtitle: "推送提醒接收人",
      showConditionRule: false,
      // loading_addModal: true,
      visible: true,
      modalRule: true,
      showAddModal: false,
      // schemaCode: '', //表单编码
      $timeTypeSelector: null, //提醒模式选择器
      $recurrenceTypeSelector: null, //重复周期选择器
      $conditionTypeSelector: null, //提醒类型选择器
      $fixedTimeSelector: null, //提醒时间选择器
      $timeControlSelector: null, //日期字段选择器
      $timeControlOffsetSelector: null, //日期控件偏移量选择器

      timeType: "0", //提醒模式
      recurrenceType: "1", //重复类型
      conditionType: "0", //提醒条件
      //timeOffsetType: "0", //提醒时间偏移量
      isCustomTime: true, //是否是自定义时间
      showAddReceiver: false, //显示"添加被提醒人"界面
      scheduleRules: [], //提醒规则
      timeProperties: [], //时间控件
      timeFields: [], //用于绑定到界面的
      timeFormats: {}, //{字段编码，格式}
      showConditionEditor: false, //是否显示"提醒条件"编辑器
      //showHourMinute: false,//提醒时间偏移选择"当天"显示"时分"
      //showDayHourMinute: false, //提醒时间偏移选择"之前","之后"显示"天","小时","分钟"
      showDay: false,
      showHour: false,
      showMinute: false,
      showHourMinute: false,
      offsetTimeHourMinute: "",
      fixAlertTime: "",
      timeControl: "",
      timeControlOffset: "",
      // initTimeControlFlag: false, //如果是编辑状态初始化“选择日期控件”时候不用修改控件偏移值

      offset_day: 0,
      offset_hour: 0,
      offset_minute: 0,
      conditionExpression: "",
      conditionExpressionText: "",
      conditionExpressionType: "SCHEDULERULE",
      conditionExpressionEditor_width: "700px",
      conditionExpressionEditor_height: "506px",

      ruleObjectId: "",
      newScheduleRule: {}
    };
  },
  watch: {
    timeControlOffset: function(val) {
      var format = this.timeFormats[this.timeControl];
      if (format == "yyyy-mm-dd") {
        //控件格式是年月日
        this.showHourMinute = true;

        if (val == "0") {
          //当天
          this.showDay = false;
          this.showHour = false;
          this.showMinute = false;
          this.offset_day = 0;
          this.offset_hour = 0;
          this.offset_minute = 0;
        } else if (val == "1" || val == "2") {
          //之前/之后
          this.showDay = true;
          this.showHour = false;
          this.showMinute = false;
          this.offset_hour = 0;
          this.offset_minute = 0;
        }
      } else if (format == "yyyy-mm-dd hh:ii") {
        //控件格式是年月日时分
        this.showHourMinute = false;

        if (val == "-1") {
          this.showDay = false;
          this.showHour = false;
          this.showMinute = false;
          this.offset_day = 0;
          this.offset_hour = 0;
          this.offset_minute = 0;
        } else if (val == "1" || val == "2") {
          this.showDay = true;
          this.showHour = true;
          this.showMinute = true;
        }
      }
    },
    timeType: function(val) {
      //如果选择的是“自定义时间提醒”则将isCustomTime置为true
      this.isCustomTime = val == "0";
    },
    recurrenceType: function(val) {},
    conditionType: function(val) {
      this.showConditionEditor = val == "1";
    }
  },
  methods: {
    changeDate: function(val) {
      this.fixAlertTime = val;
    },
    doAdd() {
      //先清除数据
      this.resetParams();
      //打开新增界面
      this.toShowAddModal();
    },
    doEdit(objectId) {
      this.resetParams;
      this.ruleObjectId = objectId;
      this.toShowAddModal();
    },
    doRemove(objectId) {
      this.removeRuleItem(objectId);
    },

    modalCancelHandler() {
      this.ruleObjectId = "";
      this.showAddModal = false;
    },

    modalOkHandler() {
      var offsetTime = {};
      var offsetDay =
        this.offset_day * 24 * 60 + this.offset_hour * 60 + this.offset_minute * 1;
      offsetTime["offsetDay"] =
        parseInt(this.timeControlOffset) == 1 ? 0 - offsetDay : offsetDay;
      var d = new Date(this.offsetTimeHourMinute);
      if (!isNaN(d.getTime())) {
        var h = d.getHours();
        h = (h > 9 ? h : "0" + h) + "";
        var m = d.getMinutes();
        m = (m > 9 ? m : "0" + m) + "";
        offsetTime["fixedTime"] = h + ":" + m;
      }else{
        offsetTime["fixedTime"] = "";
      }
      //offsetTime["fixedTime"] = this.offsetTimeHourMinute;
      this.newScheduleRule["OffsetTime"] = JSON.stringify(offsetTime); //偏移时间
      this.newScheduleRule["Receivers"] = this.receiverExpression.split("+"); //接收方
      this.newScheduleRule["ReceiversText"] = this.receiverExpressionText;
      this.newScheduleRule["TimeType"] = this.timeType; //时间类型，是自定义时间还是控件时间

      this.newScheduleRule["ActionType"] = 1; //动作类型，提醒是1
      this.newScheduleRule["AlertTime"] = this.timeControl;
      this.newScheduleRule["ConditionExpression"] = this.conditionExpression; //生效条件
      this.newScheduleRule[
        "ConditionExpressionText"
      ] = this.conditionExpressionText;
      this.newScheduleRule["CreatedBy"] = ""; //创建人
      this.newScheduleRule["EndTime"] = ""; //截止时间
      this.newScheduleRule["ObjectId"] = $.IGuid();
      this.newScheduleRule["SchemaCode"] = this.sheetCode; //表单编码
      this.newScheduleRule["StartTime"] = this.fixAlertTime; //开始时间d
      this.newScheduleRule["RecurrenceType"] = this.recurrenceType; //重复类型

      //如果是自定义时间且开始时间小于当前时间则不能保存

      if (this.timeType == 0) {
        if (this.fixAlertTime == "") {
          $.IShowError("提醒时间不正确");
          return;
        } else {
          var alert = new Date(this.fixAlertTime);
          var now = new Date();
          if (alert.getTime() < now.getTime()) {
            $.IShowError("提醒时间不能早于当前时间");
            return;
          }
        }
      }

      //根据控件编码获取控件名称
      for (var i = 0; i < this.timeFields.length; i++) {
        if (this.timeFields[i].Value == this.timeControl) {
          this.newScheduleRule["AlertTimeText"] =
            "{" + this.timeFields[i].Text + "}";
          break;
        }
      }
      //获取控件格式
      for (var key in this.timeFormats) {
        if (key == this.timeControl) {
          this.newScheduleRule["AlertTimeFormat"] = this.timeFormats[key];
          break;
        }
      }

      if (this.ruleObjectId == "") {
        this.addRuleItem();
      } else {
        this.updateRuleItem();
      }
    },

    //重置参数
    resetParams() {
      this.offset_day = 0;
      this.offset_hour = 0;
      this.offset_minute = 0;
      this.timeControlOffset = "";
      this.offsetTimeHourMinute = "";
      this.receiverExpression = "";
      this.receiverExpressionText = "";
      this.timeType = "0";
      this.timeControl = "";
      this.conditionExpression = "";
      this.conditionExpressionText = "";
      this.fixAlertTime = "";
      this.recurrenceType = "1";
    },
    async updateRuleItem() {
      var that = this;
      that.newScheduleRule.ObjectId = that.ruleObjectId;
      var res = await UpdateSchedule(that.newScheduleRule);
      if (res.Successful) {
        $.IShowSuccess("", "更新成功");
        that.resetParams();
        for (var i = 0; i < that.scheduleRules.length; i++) {
          if (that.scheduleRules[i].ObjectId == that.ruleObjectId) {
            that.scheduleRules[i] = that.newScheduleRule;
            break;
          }
        }
      } else {
        $.IShowError("", res.ErrorMessage);
      }
      that.newScheduleRule = {};
      that.showAddModal = !res.Successful;
    },
    //添加推送提醒
    async addRuleItem() {
      var that = this;
      var res = await AddSchedule(that.newScheduleRule);
      if (res.Successful) {
        $.IShowSuccess("", "新增成功");
        that.resetParams();
        that.scheduleRules.push(that.newScheduleRule);
        that.ruleObjectId = "";
      } else {
        //显示提示信息
        $.IShowError("", res.ErrorMessage);
      }
      that.newScheduleRule = {};
      that.showAddModal = !res.Successful;
    },
    //删除推送提醒
    async removeRuleItem(objectId) {
      var that = this;
      var res = await RemoveSchedule(objectId);
      if (res.Successful) {
        //要更新列表
        for (var i = 0; i < that.scheduleRules.length; i++) {
          if (that.scheduleRules[i].ObjectId == objectId) {
            that.scheduleRules.splice(i, 1);
            break;
          }
        }
        that.resetParams();
        that.ruleObjectId = "";
      } else {
      }
    },
    show() {
      this.visible = true;
      this.modalRule = true;
    },
    toShowConditionRule() {
      this.showConditionRule = true;
    },
    //显示创建窗口
    toShowAddModal() {
      //重置控件选中值状态
      this.$timeControlSelector && this.$timeControlSelector.SetValue("");
      this.$timeControlOffsetSelector &&
        this.$timeControlOffsetSelector.SetValue("");

      this.showAddModal = true;
      if (this.ruleObjectId != "") {
        var editRule = null;
        for (var i = 0; i < this.scheduleRules.length; i++) {
          if (this.scheduleRules[i].ObjectId == this.ruleObjectId) {
            editRule = this.scheduleRules[i];
            break;
          }
        }
        this.receiverExpression = editRule.Receivers.join("+");
        this.receiverExpressionText = editRule.ReceiversText;
        this.conditionExpression = editRule.ConditionExpression;
        this.conditionExpressionText = editRule.ConditionExpressionText;
        this.timeType = editRule.AlertTime == "" ? "0" : "1";
        this.fixAlertTime = editRule.StartTime;
        this.recurrenceType = editRule.RecurrenceType;
        this.timeControl = editRule.AlertTime;
        var offsetJson = JSON.parse(editRule.OffsetTime);
        var offsetDay = parseInt(offsetJson.offsetDay);
        var fixedTime = offsetJson.fixedTime;

        var format = this.timeFormats[editRule.AlertTime];
        if (format == "yyyy-mm-dd") {
          this.offsetTimeHourMinute = fixedTime;
        }

        if (offsetDay == 0) {
          this.timeControlOffset = "0";
        } else if (offsetDay < 0) {
          this.timeControlOffset = "1";
        } else {
          this.timeControlOffset = "2";
        }

        if (format == "yyyy-mm-dd hh:ii" && this.timeControlOffset == "0") {
          this.timeControlOffset = "-1";
        }

        this.offset_day = parseInt(Math.abs(offsetDay) / (24 * 60));
        this.offset_hour = parseInt(
          (Math.abs(offsetDay) - this.offset_day * 24 * 60) / 60
        );
        this.offset_minute =
          Math.abs(offsetDay) -
          this.offset_day * 24 * 60 -
          this.offset_hour * 60;
        this.conditionType = this.conditionExpression === "" ? "0" : "1";
      } else {
        this.timeType = "0";
        this.recurrenceType = "1";
        this.conditionType = "0";
        this.isCustomTime = true;
        this.showDay = false;
        this.showHour = false;
        this.showMinute = false;
        this.showHourMinute = false;
        this.offsetTimeHourMinute = "";
        this.fixAlertTime = "";

        this.offset_day = 0;
        this.offset_hour = 0;
        this.offset_minute = 0;
      }
      //初始化提醒模式
      this.initTimeType();
      //初始化重复周期
      this.initRecurrenceType();
      //初始化提醒条件
      this.initConditionType();
      //初始化时间字段选择
      this.initTimeControlSelector();
      //初始化时间字段偏移量
      this.initTimeControlOffset();
    },
    async loadSchedule() {
      var that = this;
      let res = await LoadSchedule(that.sheetCode);
      if (res.Successful) {
        that.scheduleRules = res.ReturnData["rules"];
        that.timeProperties = res.ReturnData["timeProperties"];
        for (var i = 0; i < that.timeProperties.length; i++) {
          that.timeFields.push({
            Value: that.timeProperties[i].Name,
            Text: that.timeProperties[i].DisplayName
          });
          that.timeFormats[that.timeProperties[i].Name] =
            that.timeProperties[i].Format;
        }
      } else {
      }
    },

    //提醒条件
    initConditionType() {
      var that = this;
      if (that.$conditionTypeSelector == null) {
        that.$conditionTypeSelector = $.SelectForm({
          DropList: [
            { Value: 0, Text: "任意数据" },
            { Value: 1, Text: "满足条件的数据" }
          ],
          ID: "scheduleeditconditiontype",
          Change: function() {
            if (that.$conditionTypeSelector) {
              that.conditionType = that.$conditionTypeSelector.Value;
            }
          }
        });
        that.$conditionTypeSelector.AppendTo(
          $(".schedule-edit-conditiontype-select-container")
        );
      }
      var conditionType = isNaN(that.conditionType)
        ? ""
        : parseInt(that.conditionType);
      that.$conditionTypeSelector.SetValue(conditionType);
    },
    //"选择日期控件"偏移
    initTimeControlOffset() {
      var that = this;
      if (that.$timeControlOffsetSelector == null) {
        that.$timeControlOffsetSelector = $.SelectForm({
          DropList: [
            { Value: "-1", Text: "当时" },
            { Value: "0", Text: "当天" },
            { Value: "1", Text: "之前" },
            { Value: "2", Text: "之后" }
          ],
          ID: "scheduleeditoffsetday",
          Change: function() {
            if (that.$timeControlOffsetSelector) {
              that.timeControlOffset = that.$timeControlOffsetSelector.Value;
              $("div.schedule-edit-alerttime-container-offset").hide();
              that.showHourMinute = false;
              if (that.timeControlOffset == "0") {
                //当天
                that.showHourMinute = true;
              } else if (
                that.timeControlOffset == "1" ||
                that.timeControlOffset == "2"
              ) {
                $("div.schedule-edit-alerttime-container-offset").show();
              }
            }
          }
        });
        that.$timeControlOffsetSelector.$Items
          .find("li[data-value='-1']")
          .hide();
        that.$timeControlOffsetSelector.AppendTo(
          $(".schedule-edit-offsettime1-select-container")
        );
      }
      if (that.timeControlOffset !== "") {
        var timeControlOffset = parseInt(that.timeControlOffset);
        that.$timeControlOffsetSelector.SetValue(timeControlOffset);
      }
    },
    //"选择日期控件"下拉框
    initTimeControlSelector() {
      var that = this;
      if (that.$timeControlSelector == null) {
        that.$timeControlSelector = $.SelectForm({
          DropList: that.timeFields,
          ID: "scheduleeditalerttime",
          Change: function() {
            //如果选择的控件格式是"yyyy-mm-dd hh:ii"则将“当天”显示为“当时”
            //如果选择的控件是"创建时间"/"修改时间",则偏移量只显示"当时"和"之后"
            if (that.$timeControlSelector && that.$timeControlOffsetSelector) {
              var val = that.$timeControlSelector.Value;
              var format = that.timeFormats[val];
              that.timeControl = val;
              that.$timeControlOffsetSelector.$Items
                .find("li[data-value='-1']")
                .show();
              that.$timeControlOffsetSelector.$Items
                .find("li[data-value='0']")
                .show();
              that.$timeControlOffsetSelector.$Items
                .find("li[data-value='1']")
                .show();
              if (format == "yyyy-mm-dd hh:ii") {
                //当时
                that.$timeControlOffsetSelector.$Items
                  .find("li[data-value='-1']")
                  .show(); //显示"当时"
                if (that.ruleObjectId == "") {
                  that.$timeControlOffsetSelector.SetValue(-1);
                }
                that.$timeControlOffsetSelector.$Items
                  .find("li[data-value='0']")
                  .hide(); //隐藏"当天"
                if (val == "CreatedTime" || val == "ModifiedTime") {
                  //如果是"创建时间"/"修改时间"，则隐藏"之前"
                  that.$timeControlOffsetSelector.$Items
                    .find("li[data-value='1']")
                    .hide(); //隐藏"
                  if (that.timeControlOffset == 0) {
                    that.$timeControlOffsetSelector.SetValue(-1);
                  }
                }
              } else {
                //当天
                that.$timeControlOffsetSelector.$Items
                  .find("li[data-value='0']")
                  .show();
                if (that.ruleObjectId == "") {
                  that.$timeControlOffsetSelector.SetValue(0);
                }
                that.$timeControlOffsetSelector.$Items
                  .find("li[data-value='-1']")
                  .hide();
              }
            }
          }
        });
        that.$timeControlSelector.AppendTo(
          $(".schedule-edit-alerttime-select-container")
        );
      }
      if (that.timeControl != "") {
        that.$timeControlSelector.SetValue(that.timeControl);
      }
    },
    //重复周期
    initRecurrenceType() {
      var that = this;
      if (that.$recurrenceTypeSelector == null) {
        that.$recurrenceTypeSelector = $.SelectForm({
          DropList: [
            { Value: 0, Text: "不执行" },
            { Value: 1, Text: "只执行一次" },
            { Value: 2, Text: "每天执行" },
            { Value: 3, Text: "每周同一天执行" },
            { Value: 4, Text: "每月同一天执行" },
            { Value: 5, Text: "每年同一天执行" }
          ],
          ID: "scheduleeditrecurrencetype",
          Change: function() {
            if (that.$recurrenceTypeSelector) {
              that.recurrenceType = that.$recurrenceTypeSelector.Value;
            }
          }
        });
        that.$recurrenceTypeSelector.AppendTo(
          $(".schedule-edit-recurrencetype-select-container")
        );
      }
      that.$recurrenceTypeSelector.SetValue(that.recurrenceType);
    },
    //提醒模式
    initTimeType() {
      var that = this;
      if (that.$timeTypeSelector == null) {
        that.$timeTypeSelector = $.SelectForm({
          DropList: [
            { Value: 0, Text: "自定义时间提醒" },
            { Value: 1, Text: "根据日期控件提醒" }
          ],
          ID: "scheduleeditalerttime",
          Change: function() {
            if (that.$timeTypeSelector) {
              that.timeType = that.$timeTypeSelector.Value;
            }
          }
        });
        that.$timeTypeSelector.AppendTo(
          $(".schedule-edit-timetype-select-container")
        );
      }
      that.$timeTypeSelector.SetValue(that.timeType);
    },
    editRuleDoneHandler() {
      this.$refs.advanceView.save();
    },
    editRuleCancelHandler() {
      this.showConditionRule = false;
      this.timeControlOffset = "";
    },
    toShowAddReceiver() {
      this.showAddReceiver = true;
    },
    receiverModalOk(expression, text) {
      this.showAddReceiver = false;
      this.receiverExpression = expression;
      this.receiverExpressionText = text;
    },
    receiverModalCancel() {
      this.showAddReceiver = false;
    }
  }
};
</script>

<style>

.modal-schedulerule-main .ivu-tooltip-popper[x-placement^=top] .ivu-tooltip-arrow {
  border-top-color: transparent;
}

.modal-schedulerule .ivu-modal-footer {
  display: inline-block;
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.modal-schedulerule .ivu-btn-primary {
  background-color: #2d7fff;
}

.modal-schedulerule .ivu-btn-primary:hover {
  background-color: #005def;
}

.modal-conditionrule-editor .ivu-modal-body {
  padding: 0;
}

.modal-schedulerule-main .ivu-modal-footer {
  display: none;
}

.modal-conditionrule-editor .ivu-btn-primary {
  width: 100px;
  height: 36px;
}

.modal-conditionrule-editor .ivu-btn-text {
  width: 100px;
  border: 1px solid #e1e1e1;
}
</style>



// WEBPACK FOOTER //
// src/components/sheetdesigner/schedule-rule/schedule-rule.vue
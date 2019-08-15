<template>
  <div>
    <Modal title="业务规则" v-model="modalRule" width="780" :Height="advanceViewModal.Height" class="business-rule-modal"
      class-name="vertical-center-modal" :mask-closable="false" @on-cancel="cancel">
      <div>
        <header>
          <Row>
            <Col span="2">
              <span class=''>优先级</span>
            </Col>
            <Col span="6">
              <span class='' style="color: #696969;">
                数据生效时
                <Tooltip placement="top" content="指表单数据提交、流程表单数据审批完成">
                  <Icon type="help-circled" color="#2d7fff" size=15 />
                </Tooltip>
              </span>
            </Col>
            <Col span="6">
              <span class="middle" style="color: #696969;">
                数据作废时
                <Tooltip placement="top" content="指表单数据删除、流程表单数据重新激活">
                  <Icon type="help-circled" color="#2d7fff" size=15 />
                </Tooltip>
              </span>
            </Col>
            <Col span="5">
              <span class="remarks" style="color: #6d6d6e;">备注</span>
            </Col>
            <Col span="3">
              <span class="validate" style="color: #6d6d6e;">表单验证</span>
            </Col>
            <Col span="1">
              <span style="visibility: hidden;">占位</span>
            </Col>
          </Row>
        </header>
        <main>
          <ul class="rule-list">
            <draggable :ref="'businessrule'" :options="{ handle: '.action-drag'} " @start="toggleIcon" @end="toggleIcon">
              <Row v-for="( item, index ) in rules" :key="index">
                <Col span="2">
                  <span class="seq">{{ index + 1 }}</span>
                </Col>
                <Col span="6" :ref="'FormulaSubmit'+index">
                  <span class="rule-text" @click="shwoEditor(item.submitCode,item.submitText,0,index)">{{ item.submitText==''?'添加业务规则':item.submitText }}</span>
                  <input class="FormulaControl" :formula-schemacode="sheetCode" formula-type="BUSINESS" :formula="item.submitCode" style="display: none;">
                </Col>
                <Col span="6" :ref="'FormulaRollback'+index">
                  <span class="rule-text" @click="shwoEditor(item.rollbackCode,item.rollbackText,1,index)">{{ item.rollbackText==''?'添加业务规则':item.rollbackText }}</span>
                  <input class="FormulaControl" :formula-schemacode="sheetCode" formula-type="BUSINESS" :formula="item.rollbackCode" style="display: none;">
                </Col>
                <Col span="5">
                  <input class="description" v-model="item.description">
                </Col>
                <Col span="3">
                   <input type="checkbox" :id="`validate${index}`" class="validate"  v-model="item.checkForm">
                   <label :for="`validate${index}`">启动</label>
                </Col>
                <Col span="2">
                  <i @click="removeRule(index)" class="action action-remove ivu-icon ivu-icon-trash-a" :style="{visibility:draging?'hidden':'visible'}" style="font-size:20px!important"></i>
                  <i class=" action action-drag  ivu-icon ivu-icon-arrow-move" style="font-size:20px!important"></i>
                </Col>
              </Row>
            </draggable>
          </ul>
        </main>
        <footer>
          <span @click="addRule" class="addbtn">
            <Icon type="plus-round" color="#2d7fff" size=15 />
            <span>添加规则</span>
          </span>
        </footer>
      </div>
      
      <div slot="footer" class="bottom_btns">
        <a class="confirm" @click="saveRules">确定</a>
        <a class="cancel" @click="cancel">取消</a>
        <!-- <i-button type="primary" class="btn-ok" @click="saveRules">确定</i-button>
        <i-button type="text" class="btn-cancel" @click="cancel">取消</i-button> -->
      </div>
    </Modal>

    <Modal v-model="showEditorRule" width="780" class="business-editor-rule" :mask-closable="false" :closable="false">
      <header slot="header">
        <Row>
          <Col span="4">
            <p class="title">{{this.curEditorRule.type == 0?'数据生效时':'数据作废时'}}</p>
          </Col>
          <Col span="10">
            <span style="visibility: hidden;">占位</span>
          </Col>
          <Col span="10">
            <div class="close" style="margin-top: 10px;margin-left: 10px; opacity: 1;">
              <i class="ivu-icon ivu-icon-ios-close-empty" style="font-size: 30px;color: #999;"
                @click="editRuleCancelHandler()"></i>
            </div>
            <div class="modebtn" :class="{active:activeMode==1}" @click="handleSwitchMode(1)">高级模式</div>
            <div class="modebtn" :class="{active:activeMode==0}" @click="handleSwitchMode(0)">简易模式</div>
          </Col>
        </Row>
      </header>
      <div v-if="activeMode==0">
        <formula-simple-editor ref="simpleView" :current-sheet-code="sheetCode"></formula-simple-editor>
      </div>
      <div v-if="activeMode==1">
        <formula-box ref="advanceView" :Formula="advanceViewModal.Formula" :FormulaText="advanceViewModal.FormulaText" :FormulaType="advanceViewModal.FormulaType"
          :BusinessType="advanceViewModal.BusinessType" :SchemaCode="advanceViewModal.SchemaCode" :Width="advanceViewModal.Width"
          :Height="advanceViewModal.Height" :num="advanceViewModal.num"></formula-box>
      </div>
      <div slot="footer" class="bottom_btns">
        <a class="confirm" @click="editRuleDoneHandler()">确定</a>
        <a class="cancel" @click="editRuleCancelHandler()">取消</a>
        <!-- <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click="editRuleDoneHandler()">
          <span>确定</span>
        </button>
        <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="editRuleCancelHandler()">
          <span>取消</span>
        </button>  -->
      </div>
      <Card class="user-limit">
        <p slot="title">支持情况</p>
        <div class="card-content">
          <!--<div class="content">-->
             <!--当左右数据均来自于子表时，不能为两个不同子表的字段。-->
          <!--</div>-->
           <Collapse v-model="collapseModal" accordion>
            <Panel name="1">
              insert操作
              <div slot="content">
                <p class="tit">左边</p>
                <p class="con">可以是主表或者是任意子表字段，当子表插入主表数据时，左边只能是主表字段</p>
                <p class="tit">右边</p>
                <p class="con">可以是主表或者是任意子表字段</p>
              </div>
            </Panel>
            <Panel name="2">
              insert子表操作
              <div slot="content">
                <p class="tit">过滤条件</p>
                <p class="con">左右两边只能是主表字段</p>
                <p class="tit">操作</p>
                <p class="con">左右两边只能是子表字段</p>
              </div>
            </Panel>
            <Panel name="3">
              update操作
              <div slot="content">
                <p class="tit">过滤条件</p>
                <p class="con">左右两边都可以是主表或者任意子表字段</p>
                <p class="tit">操作</p>
                <p class="con">左右两边都可以是主表或者任意子表字段</p>
                <p class="tit">过滤条件的左边和操作的左边要保持表一致，过滤条件的右边要和操作的右边保持表一致</p>
              </div>
            </Panel>
            <Panel name="4">
              upsert操作
              <div slot="content">
                <p class="con"> insert 和 update 的结合操作</p>
              </div>
            </Panel>
            <Panel name="5">
              delete操作
              <div slot="content">
                <p class="con">只能是主表条件删除</p>
              </div>
            </Panel>
          </Collapse>
        </div>
      </Card>
    </Modal>

    <!-- @* 确认切换简易模式 *@ -->
    <Modal v-model="showComfirmSwitch"  title="切换简易模式"  :mask-closable="false"
     width="420px" class="confirm-switch">
        <div class="switch-container">
            <i class="icon-exclamation-circle"></i>
            <p class="switch-title">切换简易模式</p>
            <p class="switch-warning">切换后配置好的函数将会被清空，确定切换？</p>
        </div>
        
        <div slot="footer" class="bottom_btns">
            <a class="confirm" @click="activeMode=0;showComfirmSwitch = false">确定</a>
            <a class="cancel" @click="showComfirmSwitch = false">取消</a>
        </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import Bus from "../../../lib/H3/H3Plugins/bus.js";
import { Icon, Button, Modal, Tooltip, Row, Col } from "iview";
import { getFormulaEventHandlerOnAction } from "../../../service/getData";
import {
  FormulaTypeList,
  FormulaTypeTitle
} from "../../../lib/H3/Console/Formula/Formula";
import { BusinessRuleSave } from "../../../lib/H3/Console/SheetDesigner/SheetDesigner";
import "../../../lib/H3/Console/Formula/NewFormulaEditable.js";
import draggable from "vuedraggable";
import FormulaBox from "../formula/formula-box";
import FormulaSimpleEditor from "./formular-simple-editor/formular-simple-editor";
export default {
  components: {
    Icon,
    Button,
    Tooltip,
    Row,
    Col,
    Modal,
    draggable,
    FormulaBox,
    FormulaSimpleEditor,
  },
  props: {
    sheetCode: {
      type: String,
      default: ""
    },
    Width: {
      type: String,
      default: "780px"
    },
    Height: {
      type: String,
      default: "570px"
    }
  },
  data() {
    return {
      modalRule: false,
      showEditorRule: false,
      showComfirmSwitch: false,
      activeMode: 3, //简易模式0，高级模式1, 默认不渲染组件
      rules: [],
      sortindex: [],
      preAction: "save", //上一次操作
      curEditorRule: {
        //当前编辑的规则
        index: 0, //序号
        type: 0 //生效0， 作废1
      },
      draging: false, //拖拽排序标识
      advanceViewModal: {
        Formula: "",
        FormulaText: "",
        FormulaType: FormulaTypeList.BUSINESS,
        BusinessType: 0,
        SchemaCode: this.sheetCode,
        Width: this.Width,
        Height: this.Height,
        num: 0 // 第几条规则
      },
      simpleViewModel: {
        targetSheetCode: "",
        targetSheetName: "",
        selectedOperationOption: {},
        filters: [],
        operations: []
      },
      collapseModal: '1'
    };
  },
  computed: {
    mainStyles() {
      let styleWidth = {
        width: this.Width,
        height: this.Height
      };
      return styleWidth;
    }
  },
  created() {
    if ($.BizSheet.BusinessRules == null) {
      this.getRules();
    } else {
      this.rules = $.BizSheet.BusinessRules;
    }

    //监听公式编辑器中的保存事件
    Bus.$on(FormulaTypeList.BUSINESS, target => {
      if (target.saveSuccessful) {
        //校验通过，保存成功
        let code = this.curEditorRule.type == 0 ? "submitCode" : "rollbackCode",
          text = this.curEditorRule.type == 0 ? "submitText" : "rollbackText";
        this.rules[this.curEditorRule.index][code] = target.formula;
        this.rules[this.curEditorRule.index][text] = target.formulaText;
        this.showEditorRule = false;
        setTimeout(() => {
          this.activeMode = 3;
        }, 200);
      }
    });
  },
  methods: {
    show() {
      this.modalRule = true;
    },
    cancel() {
      this.modalRule = false;
      this.preAction = "cancel";
      this.destroy();
    },
    saveRules() {
      this.preAction = "save";
      this.modalRule = false;

      let refs = this.$refs.businessrule;
      let seq = refs.$el.getElementsByClassName("seq");
      this.sortindex = [];
      for (let i = 0, len = seq.length; i < len; i++) {
        let index = Number(seq[i].innerHTML);
        this.sortindex.push(index - 1);
      }
      let rule = [];
      for (let i = 0, len = this.sortindex.length; i < len; i++) {
        let r = this.rules[this.sortindex[i]];
        // 存在 生效或失效时的业务规则才保存
        if (r.rollbackCode || r.submitCode) {
          r.ruleNo = i;
          console.log(r);
          rule.push(r);
        }
      }
      $.BizSheet.BusinessRulesUpdated = true;
      $.BizSheet.BusinessRules = rule;
      this.destroy();
    },
    destroy() {
      setTimeout(() => {
        Bus.$off(FormulaTypeList.BUSINESS);
        this.$destroy();
        document.body.removeChild(this.$el);
      }, 100);
    },
    handleSwitchMode(mode) {
      if (mode == 1) {
        let formulaInfo = { formula: "", formulaText: "" };
        try {
          formulaInfo = this.$refs.simpleView.generateFormula();
        } catch (e) {}
        this.advanceViewModal.Formula = formulaInfo.formula;
        this.advanceViewModal.FormulaText = formulaInfo.formulaText;
        this.activeMode = mode;
      } else {
        this.showComfirmSwitch = true;

        // $.IConfirm("切换模式", "若切换为简易模式,则已经配置好的函数也将会被清空。确定切换?", ok => {
        //   if (ok) {
        //     this.activeMode = mode;
        //   }
        // });
      }
    },
    async getRules() {
      let res = await getFormulaEventHandlerOnAction(this.sheetCode);
      if (res && res.code == 0) {
        if (res.datas) {
          this.rules = res.datas;
        } else {
          this.addRule();
        }
      }
    },
    addRule() {
      let add = {
        description: "",
        rollbackCode: "",
        rollbackText: "",
        ruleNo: this.rules.length,
        submitCode: "",
        submitText: "",
        appId: this.sheetCode,
        checkForm: false
      };
      this.rules.push(add);
    },
    removeRule(index) {
      this.rules.splice(index, 1);
    },
    shwoEditor(code, text, type, index) {
      //规则编码，成功or作废，编辑行
      this.curEditorRule.type = type;
      this.curEditorRule.index = index;
      let params = {
        Formula: code,
        FormulaText: text,
        FormulaType: FormulaTypeList.BUSINESS,
        BusinessType: type,
        SchemaCode: this.sheetCode,
        Width: this.Width,
        Height: this.Height,
        num: index
      };
      this.advanceViewModal = params;
      this.showEditorRule = true;
      if (!text) {
        this.activeMode = 0;
      } else {
        this.activeMode = 1;
      }
    },
    toggleIcon: function(e) {
      this.draging = !this.draging;
    },
    editRuleDoneHandler() {
      //debugger
      var that = this;

      //简易模式
      if (this.activeMode == 0) {
        var formulaInfo = this.$refs.simpleView.generateFormula();

        this.$refs.simpleView.getValidateMessage(
          this.sheetCode, 
          formulaInfo.formula,
          "BUSINESS").then(function(data){
            if(data == ""){
              that.saveSuccessfulCallbak(formulaInfo.formula, formulaInfo.formulaText, true);
            } 
          });
      } else {
        //高级模式
        this.$refs.advanceView.save();
      }
    },
    editRuleCancelHandler() {
      this.showEditorRule = false;
      setTimeout(() => {
        this.activeMode = 3;
      }, 200);
    },
    saveSuccessfulCallbak(formula, formulaText, closeModal){
      let code = this.curEditorRule.type == 0 ? "submitCode" : "rollbackCode",
          text = this.curEditorRule.type == 0 ? "submitText" : "rollbackText";
      this.rules[this.curEditorRule.index][code] = formula;
      this.rules[this.curEditorRule.index][text] = formulaText;

      if(closeModal){
        this.showEditorRule = false;
          setTimeout(() => {
            this.activeMode = 3;
          }, 200);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ivu-modal-close .ivu-icon-ios-close-empty {
  color: #fff;
  font-size: 30px;
}

.business-rule-modal {
  .ivu-modal {
  }

  .ivu-modal-header-inner {
    color: #fff;
    font-size: 16px;
  }

  .ivu-modal-body {
    font-size: 14px;
    min-height: 460px;
  }

  .ivu-modal-header {
    border: 0;
    background-color: #090723;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .ivu-modal-footer {
    display: block;
    padding: 10px;
    text-align: center;
    border: 0;

    button {
      float: none;
      width: 100px;
      height: 36px;

      &.btn-ok {
        color: #fff;
        background: #2d7fff;
      }

      &.btn-cancel {
        border: 1px solid #d6d4d4;
      }
    }
  }

  .ivu-modal-content {
    height: 570px;
  }

  .ivu-modal-body {
    padding: 16px !important;
  }

  .ivu-tooltip-inner {
    font-size: 12px;
    background-color: #fff;
    color: #666;
    border: 0 solid #2D7FFF;
    border-radius: 3px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.22);
  }

  .ivu-tooltip-popper[x-placement^=top] .ivu-tooltip-arrow {
    border-top-color: transparent;
  }

  header, main {
    span {
      display: inline-block;
      text-align: center;
      width: 100%;
    }
  }

  header {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    font-size: 0;

    span {
      height: 32px;
      background-color: #f4faff;
      color: #848484;
      font-size: 14px;
      border: 1px solid #e2e6e8;
      padding: 5px;
    }

    div+div span {
      border-left: 0;
    }

    .ivu-tooltip-content {
      box-shadow: 0px 0px 2px 1px #2d7fff;

      .ivu-tooltip-arrow {
        width: 10px;
        height: 10px;
        border: 0;
        transform: rotate(45deg);
        background: #fff;
        box-shadow: -1px -1px 0px 0px #2d7fff inset;
        border-radius: 2px;
      }
    }
  }

  main {
    margin-top: 20px;

    .rule-list {
      text-align: center;
      max-height: 300px;
      overflow-y: auto;
    }

    span {
      color: #848484;
      width: 95%;
      border: 1px solid #e3e7e9;
      padding: 7px;
      font-size: 14px;
      border-radius: 3px;
    }

    .seq {
      color: #333;
      border: 0;
    }

    .rule-text {
      display: inline-block;
      min-height: 32px;
      height: 32px;
      line-height: 30px;
      padding: 0;
      overflow: hidden;
      word-break: break-all;
      text-align: center;
      
      color: #848484;
      width: 95%;
      border: 1px solid #e3e7e9;
      padding: 0 7px;
      font-size: 14px;
      border-radius: 3px;
    }

    .description {
      width: 95%;
      height: 32px;
      line-height: 32px;
      margin: 0;
      border: 1px solid #e3e7e9;
    }

    .action {
      font-size: 18px;
      line-height: 30px;

      &.action-remove {
        color: #e97763;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
      }

      &.action-drag {
        color: #7e7e7e;
        cursor: move;
      }
    }

    .sortable-chosen, .sortable-drag {
      box-shadow: 0 1px 6px #989898;

      .action-drag {
        color: #2d7fff;
      }
    }
  }

  footer {
    margin-top: 10px;
    margin-left: 9%;
    color: #2d7fff;
    font-size: 15px;

    .addbtn {
      cursor: pointer;
    }
  }

  .data-effective {
    margin: 10px 0 25px 40px;

    p {
      margin-bottom: 5px;
    }

    cite {
      font-style: normal;
      color: #333;
      margin-right: 10px;
    }

    span {
      font-size: 11px;
      color: #999;
    }
  }

  span.ivu-select-selected-value {
    color: #3e3e3e;
  }
}

.business-editor-rule {
  .ivu-modal-content {
    border-radius: 3px;
    height: 570px;

    .ivu-modal-body {
      padding: 0;
    }
  }

  .ivu-modal-footer {
    display: block;
    border: 0;

    button {
      float: none;
      width: 100px;
      height: 36px;
      border: 1px solid #d6d4d4;
      border-radius: 2px;
    }
  }

  header {
    height: 48px;
    line-height: 48px;
    padding: 0px 16px;
    font-size: 16px;
    color: #1c2438;
    background: none;
    overflow: hidden;
    .title{
      float:left;
    }
    .modebtn {
      float: right;
      width: 70px;
      height: 46px;
      line-height: 46px;
      margin-right: 10px;
      border: 0;
      text-align: center;
      background: none;
      color: #1c2438;
      cursor: pointer;

      &.active {
        border-bottom: 3px solid #2d7fff;
        color: #2d7fff;
      }
    }
  }
}

.bottom_btns a:hover{
  text-decoration : none;  
}

.switch-container{
  text-align: center;
  padding: 19px 0;
  .icon-exclamation-circle:before{
    font-size: 52px;
    color: #F0AD4E;
    margin-bottom: 7px;
  }
  .switch-title{
    font-size: 20px;
    color: #333;
    margin-bottom: 5px;
  }
  .switch-warning{
    font-size: 14px;
    color: #666;
  }
}

.business-rule-modal{
  .ivu-modal-content{
    height: 570px !important;
    background-color: #fff;
  }
}
.user-limit{
  position: absolute;
  top: 0;
  left: -210px;
  width: 200px;
  .card-content{
    margin: -16px;
    .content {
      margin: 10px 5px;
    }
    p{
      margin-bottom: 5px;
      &::last-child{
        margin-bottom: 0;
      }
    }
    .tit{
      color: #999;
    }
    .con{
      margin-left: 5px;
    }
  }
  .ivu-collapse{
    border-radius: 0;
    border: none;
  }
}
</style>



// WEBPACK FOOTER //
// src/components/console/business-rule/business-rule.vue
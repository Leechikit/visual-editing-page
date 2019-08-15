<style scoped>
.submit-rule-modal .ivu-modal-content {
    height: 570px
}

.submit-rule-modal .ivu-modal-body {
    padding: 16px!important
}

.submit-rule-modal header span,.submit-rule-modal main span {
    display: inline-block;
    text-align: center;
    width: 100%
}

.submit-rule-modal header {
  margin:20px;
    font-size: 0
}

.submit-rule-modal header span {
    height: 32px;
    line-height: 25px;
    background-color: #f4faff;
    color: #848484;
    font-size: 14px;
    border: 1px solid #e2e6e8;
    padding: 3px
}

.submit-rule-modal header div+div span {
    border-left: 0
}

.submit-rule-modal main {
    margin-top: 10px
}

.submit-rule-modal main .rule-list {
    padding: 2px;
    max-height: 350px;
    text-align: center;
    overflow-y: auto
}

.submit-rule-modal main .rule-list .ivu-row {
    padding-top: 5px
}

.submit-rule-modal main span {
    color: #000;
    width: 100%;
    border: 1px solid #e3e7e9;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px
}

.submit-rule-modal main .seq {
    color: #333;
    border: 0
}

.submit-rule-modal main .rule-text {
    display: inline-block;
    min-height: 30px;
    height: 30px;
    line-height: 30px;
    padding: 0;
    text-align: left;
    overflow: hidden;
    word-break: break-all
}

.submit-rule-modal main .description {
    width: 95%;
    height: 30px;
    line-height: 30px;
    margin: 0
}

.submit-rule-modal main .action {
    font-size: 18px;
    line-height: 30px
}

.submit-rule-modal main .action.action-remove {
    color: #e97763;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer
}

.submit-rule-modal main .action.action-drag {
    color: #9b9b9b;
    cursor: move
}

.submit-rule-modal main .sortable-chosen,.submit-rule-modal main .sortable-drag {
    box-shadow: 0 1px 6px #989898
}

.submit-rule-modal main .sortable-chosen .action-drag,.submit-rule-modal main .sortable-drag .action-drag {
    color: #2d7fff
}

.submit-rule-modal footer {
    margin-top: 10px;
    margin-left: 8.3%;
    color: #2d7fff;
    font-size: 15px
}

.submit-rule-modal footer .addbtn {
    cursor: pointer
}

.submit-rule-modal .data-effective {
    margin: 10px 0 25px 40px
}

.submit-rule-modal .data-effective p {
    margin-bottom: 5px
}

.submit-rule-modal .data-effective cite {
    font-style: normal;
    color: #333;
    margin-right: 10px
}

.submit-rule-modal .data-effective span {
    font-size: 11px;
    color: #999
}

.submit-rule-modal .ivu-modal-header-inner {
    color: #fff;
    font-size: 16px;
    font-weight: 400
}

.submit-rule-modal .ivu-modal-body {
    font-size: 14px;
    min-height: 460px
}

.submit-rule-modal .ivu-modal-header {
    background-color: #090723;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px
}

.submit-rule-modal .ivu-tooltip-inner {
    background-color: #fff;
    color: #666;
    box-shadow: 0 0 5px #6bcaff
}

.submit-rule-modal .ivu-tooltip-popper[x-placement^=top] .ivu-tooltip-arrow {
    border-top-color: transparent
}

.submit-rule-modal .ivu-modal-footer {
    display: block;
    padding: 10px;
    text-align: center;
    border: 0
}

.submit-rule-modal .ivu-modal-footer button {
    float: none;
    width: 100px;
    height: 36px
}

.submit-rule-modal .ivu-modal-footer button.btn-ok {
    color: #fff;
    background: #2d7fff
}

.submit-rule-modal .ivu-modal-footer button.btn-cancel {
    border: 1px solid #d6d4d4
}

.submit-rule-modal span.ivu-select-selected-value {
    color: #3e3e3e
}
</style>

<template>
  <div>
    <Modal title="表单提交校验" v-model="modalRule" :width="Width" class="submit-rule-modal" :mask-closable="false" @on-cancel="cancel">
      <header>
        <Row>
          <Col span="2">
            <span class=''>优先级</span>
          </Col>
          <Col span="20">
            <span class='' style="color: #414141;">
                当满足以下任一条件时表单不允许提交
            </span>
          </Col>
          <Col span="2">
            <span style="visibility: hidden;">占位</span>
          </Col>
        </Row>
      </header>
      <main style="margin:20px">
        <ul class="rule-list">
          <draggable :ref="'businessrule'" :options="{ handle: '.action-drag'}" 
            @start="toggleIcon" @end="toggleIcon">
            <Row v-for="( item, index ) in rules" :key="index">
              <Col span="2">
                <span class="seq">{{ index + 1 }}</span>
              </Col>
              <Col span="20" :ref="'FormulaSubmit'+index">
                <span class="rule-text" @click="shwoEditor(item.Rule,item.Description,index)">{{ item.Text }}</span>
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
          <span>添加条件</span>
        </span>
      </footer>
      <div slot="footer">
          <Button type="primary" class="btn-ok" @click="saveRules">确定</Button>
          <Button type="text" class="btn-cancel"  @click="cancel">取消</Button>
      </div>
    </Modal>

    <!-- 规则编辑器 -->
    <Modal title="表单提交校验" v-model="showEditorRule" :width="950" class="submit-editor-rule" 
      :mask-closable="false" :on-cancel="editRuleCancelHandler()">
      <div v-if="showFormulEditor">
        <formula ref="advanceView" 
        :Formula="editorRuleViewModal.Formula"
        :FormulaText="editorRuleViewModal.FormulaText" 
        :SubmitErrDes="editorRuleViewModal.SubmitErrDes" 
        :FormulaType="editorRuleViewModal.FormulaType"
        :SchemaCode="editorRuleViewModal.SchemaCode" 
        :Width="editorRuleViewModal.Width"
        :Height="editorRuleViewModal.Height"></formula>
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
  </div>
</template>

<script type="text/ecmascript-6">
import Bus from "../../../lib/H3/H3Plugins/bus.js";
import { Icon, Button, Modal, Tooltip, Row, Col } from "iview";
import { getLoadSubmitRule } from "../../../service/getData";
import {
  FormulaTypeList,
  FormulaTypeTitle
} from "../../../lib/H3/Console/Formula/Formula";
import { BusinessRuleSave } from "../../../lib/H3/Console/SheetDesigner/SheetDesigner";
import "../../../lib/H3/Console/Formula/NewFormulaEditable.js";
import draggable from "vuedraggable";

import Formula from "../formula/formula";
import FormulaEditorVue from "../formula/index";
import HTTP from "../../../../../api/form.js"

export default {
  components: {
    Icon,
    Button,
    Tooltip,
    Row,
    Col,
    Modal,
    draggable,
    Formula
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
      showEditorRule: false,
      showFormulEditor: false,
      modalRule: false,
      rules: [],
      sortindex: [],
      curEditorRule: 0,
      editorRuleViewModal: {
        Formula: "",
        FormulaText:"",
        SubmitErrDes: "",
        FormulaType: FormulaTypeList.SCHEMASUBMIT,
        SchemaCode: "",
        Width: this.Width,
        Height: this.Height
      },
      draging: false //拖拽排序标识
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
    if ($.BizSheet.SubmitRules == null) {
      this.getRules();
    } else {
      this.rules = $.BizSheet.SubmitRules;
    }
    //监听公式编辑器中的保存事件
    Bus.$on(FormulaTypeList.SCHEMASUBMIT, target => {
      this.rules[this.curEditorRule].Rule = target.formula;
      this.rules[this.curEditorRule].Text = target.formulaText;
      this.rules[this.curEditorRule].Description = target.description;
      this.showEditorRule = false;
      setTimeout(() => {
        this.showFormulEditor = false;
      }, 500);
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
        rule.push(this.rules[this.sortindex[i]]);
      }
      //标记是否修改过提交校验规则
      $.BizSheet.SubmitRulesUpdated = true;
      //修改过的提交校验规则
      $.BizSheet.SubmitRules = rule;
      this.destroy();
    },
    async getRules() {


      HTTP.loadSubmitRule(this.sheetCode)
          .then(res => {
              if (res && res.code==0) {
                if (
                  res.ReturnData.SchemaSubmitRules &&
                  res.ReturnData.SchemaSubmitRules.length > 0
                ) {
                  this.rules = res.ReturnData.SchemaSubmitRules;
                } else {
                  this.addRule();
                }
              }
          })
          .catch(err => {
              this.$Message.error('This is an error'+err);
          }).finally(()=>{
      })
      //let res = await getLoadSubmitRule(this.sheetCode);
      
    },
    destroy() {
      Bus.$off(FormulaTypeList.SCHEMASUBMIT);
      this.$destroy();
      document.body.removeChild(this.$el);
    },
    addRule() {
      let add = {
        Description: "",
        Rule: "",
        Text: ""
      };
      this.rules.push(add);
    },
    removeRule(index) {
      this.rules.splice(index, 1);
    },
    shwoEditor(code, description, index) {
      this.curEditorRule = index;
      
      var tem = {
              formula:code,
              appId: this.sheetCode,
              SchemaCodes: null
        };

      let params = {
        Formula: code,
        FormulaText:"",
        SubmitErrDes: description,
        FormulaType: FormulaTypeList.SCHEMASUBMIT,
        SchemaCode: this.sheetCode,
        Width: this.Width,
        Height: this.Height
      };

     if(sessionStorage.getItem("currentAppType")=="op"){
          tem.source='op'
      }
      HTTP.parseFormulaText(tem)
            .then(data => {
                  if (data && data.code == 0) {
                        params.FormulaText=data.ReturnData.FormulaText;
                        this.editorRuleViewModal = params;
                        this.showEditorRule = true;
                        this.showFormulEditor = true;
                }
                else{
                    this.$Message.error("异常"+data.msg);
                }
        })

             
      

    },
    toggleIcon: function(e) {
      this.draging = !this.draging;
    },
    editRuleDoneHandler() {
      this.$refs.advanceView.save();
    },
    editRuleCancelHandler() {
      if(this.showFormulEditor&&this.$refs.advanceView){
        this.$refs.advanceView.cancel();
        this.showEditorRule = false;
        setTimeout(() => {
          this.showFormulEditor = false;
        }, 500);
      }
    }
  }
};
</script>

<style scoped>
.ivu-modal-close .ivu-icon-ios-close-empty {
  color: #fff;
  font-size: 30px;
}

.submit-rule-modal {
  .ivu-modal-content {
    height: 570px;
  }

  .ivu-modal-body {
    padding: 16px !important;
  }

  header, main {
    span {
      display: inline-block;
      text-align: center;
      width: 100%;
    }
  }

  header {
    font-size: 0;

    span {
      height: 32px;
      line-height: 25px;
      background-color: #f4faff;
      color: #848484;
      font-size: 14px;
      border: 1px solid #e2e6e8;
      padding: 3px;
    }

    div+div span {
      border-left: 0;
    }
  }

  main {
    margin-top: 10px;

    .rule-list {
      padding: 2px;
      max-height: 350px;
      text-align: center;
      overflow-y: auto;

      .ivu-row {
        padding-top: 5px;
      }
    }

    span {
      color: #000;
      width: 100%;
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
      min-height: 30px;
      height: 30px;
      line-height: 30px;
      padding: 0;
      text-align: left;
      overflow: hidden;
      word-break: break-all;
    }

    .description {
      width: 95%;
      height: 30px;
      line-height: 30px;
      margin: 0;
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
        color: #9b9b9b;
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
    margin-left: 8.3%;
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

  .ivu-modal-header-inner {
    color: #fff;
    font-size: 16px;
    font-weight: normal;
  }

  .ivu-modal-body {
    font-size: 14px;
    min-height: 460px;
  }

  .ivu-modal-header {
    background-color: #090723;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .ivu-tooltip-inner {
    background-color: #fff;
    color: #666;
    box-shadow: 0 0 5px #6bcaff;
  }

  .ivu-tooltip-popper[x-placement^=top] .ivu-tooltip-arrow {
    border-top-color: transparent;
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

  span.ivu-select-selected-value {
    color: #3e3e3e;
  }
}

.submit-editor-rule {
  .ivu-modal-body {
    display: block;
    padding: 0px;
    overflow: hidden;
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

      &.ivu-btn-text {
        border: 1px solid #d6d4d4;
        color:#495060 !important;
      }
    }
  }
}
.ivu-btn-primary{
    background:#2D7FFF;
    margin-right:15px;
   /* &:hover
        background-color: #005def !important;
    &:active
        background-color: #005def !important;
        box-shadow: 0 1px 2px 0 #666 inset !important;
      }*/
  }
.ivu-btn-text{
    background:#FFFFFF;
    border:1px solid #D6D4D4;
   /* &:hover
        background-color: #f6f6f6 !important;
        color: #495060;
    &:active
        background-color: #f6f6f6;
        box-shadow: 0 1px 1px 0 #dbdbdb inset;
        color: #495060;*/
      }
</style>


// WEBPACK FOOTER //
// src/components/console/submit-rule/submit-rule.vue
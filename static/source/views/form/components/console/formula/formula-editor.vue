<template>
  <div v-if="showFormule">
    <Modal v-model="modalFormula" :width="850" ref="modal" :mask-closable="false" @on-cancel="cancel" class="formula-editor-modal">
      <p slot="header" style="color:#fff;">
        <span v-text="title"></span>
      </p>
      <formula ref="formula" :Controlkey="Controlkey" :Formula="Formula" :FormulaText="FormulaText" :FormulaType="FormulaType" :SubmitErrDes="SubmitErrDes"
        :FormulaField="FormulaField" :FormulaParameter="FormulaParameter" :SchemaCode="SchemaCode"
        :WorkflowCode="WorkflowCode" :Width="Width" :Height="Height" :TitleText="TitleText"></formula>
      <div slot="footer" style="text-align:center;">
        <button type="button" class="btn-ok ivu-btn ivu-btn-primary"  @click="save()">
          <span>确定</span>
        </button>
        <button type="button" class="btn-cancel ivu-btn ivu-btn-ghost" @click="cancel()">
          <span>取消</span>
        </button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import Bus from "../../../lib/H3/H3Plugins/bus.js";
import {
  FormulaTypeList,
  FormulaTypeTitle
} from "../../../lib/H3/Console/Formula/Formula";
import { Modal } from "iview";
import Formula from "./formula";
import { FormulaEditableStack } from "../../../lib/H3/Console/Formula/NewFormulaEditable";
let errMsgHeight = 60;

export default {
  components: {
     Modal,
    Formula
  },
  props: {
    Title: {
      type: String,
      default: ""
    },
    TitleText: {
      type: String,
      default: ""
    },
    Controlkey: {
      type: String,
      default: ""
    },
    Formula: {
      //公式code
      type: String,
      default: ""
    },
    FormulaText: {
      //公式text
      type: String,
      default: ""
    },
    FormulaType: {
      type: String,
      default: ""
    },
    SubmitErrDes: {
      //表单校验错误提示
      type: String,
      default: ""
    },
    BusinessType: {
      //业务规则 区分生效作废
      type: [String, Number],
      default: ""
    },
    FormulaField: {
      type: String,
      default: ""
    },
    FormulaParameter: {
      type: String,
      default: ""
    },
    SchemaCode: {
      type: String,
      default: ""
    },
    WorkflowCode: {
      type: String,
      default: ""
    },
    Width: {
      type: String,
      default: "800px"
    },
    Height: {
      type: String,
      default: "540px"
    }
  },
  data() {
    return {
      showFormule: true,
      modalFormula: false,
      contentHeight: 0,
      orgRoot: "18f923a7-5a5e-426d-94ae-a55ad1a4b240",
      title: "",

      IntelligentFunctions: [], //方法
      BizDataTypes: [],

      placeholder: "",
      formulaDescription: [],
      showFormulaDescription: true,
      formulaResult: "",
      functionSearchKey: "", //函数搜索
      unitSearchKey: "", //组织搜索
      controlName: "", //目标控件

      submibtErrMsg: "", //提交校验失败提示
      errMsgRequire: false //必填
    };
  },
  computed: {
    mainWidth() {
      return this.Width.replace("px", "");
    }
  },
  created() {
    let formulaType = this.FormulaType;
    let formulaSetting;
    if (formulaType === FormulaTypeList.BUSINESS) {
      formulaSetting =
        FormulaTypeTitle[this.FormulaType + this.BusinessType + ""];
    } else {
      formulaSetting = FormulaTypeTitle[this.FormulaType];
    }

    this.title = formulaSetting.title;
    this.SchemaCode = this.SchemaCode || this.WorkflowCode;
    Bus.$on(this.FormulaType, target => {
      if (target.saveSuccessful) {
        FormulaEditableStack.SaveValue(
          target.formula,
          target.formulaText,
          target.titleCode,
          target.titleText
        );
      }
      this.destroy();
      Bus.$emit(this.FormulaType, target);
    });
  },
  methods: {
    show() {
      this.modalFormula = true;
    },
    save() {
      this.$refs.formula.save();
    },
    cancel() {
      this.modalFormula = false;
      this.destroy();
    },
    destroy() {
      this.modalFormula = false;
      Bus.$off(this.FormulaType);
      this.$destroy();
      this.showFormule = false;
      document.body.removeChild(this.$el);
    }
  }
};
</script>

<style>
.formula-editor-modal {

  .ivu-modal-close .ivu-icon-ios-close-empty {
    color: #fff;
    font-size: 30px;
  }

  .ivu-modal-header {
    height: 48px;
    background-color: #232323;
    border-radius: 3px 3px 0 0;
  }

  .ivu-modal-content{
    border-radius: 3px;
  }

  .ivu-modal-body {
    display: block;
    padding: 0px !important;
    overflow: hidden;
  }

  .ivu-modal-footer {
    position: relative;
    display: block;
    padding: 10px;
    text-align: center;
    border: 0;

    button {
      float: none;
      width: 100px;
      border:0px;
      height: 36px;
      border-radius: 4px;

      &.btn-ok {
        color: #fff;
        background: #2d7fff;
      }

      &.btn-cancel {
        color: #666;
        border:1px solid #e1e1e1;
        background: #fff;
      }
    }
  }
}
</style>

<style>

.formula-editor-modal {
  li {
    display: block;
  }
}

.ivu-tree-arrow {
  margin-right: 4px;
}

.ivu-icon-arrow-right-b {
  color: #797979;
}

.ivu-tree-arrow-open .ivu-icon-arrow-right-b {
  color: #2d7fff;
}
</style>


// WEBPACK FOOTER //
// src/components/console/formula/formula-editor.vue
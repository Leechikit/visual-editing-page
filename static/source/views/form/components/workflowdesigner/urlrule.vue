  <template>
  <div>
  <Modal title="通知地址配置" v-model="modal"  class="submit-rule-modal" :width="900" :mask-closable="false" @on-cancel="cancel">
      <header>
        <Row>
          <Col span="2">
            <span class=''>接口地址</span>
          </Col>
          <Col span="20"> 
            <Input v-model="url" style="color: #414141;" :placeholder="placeholder"></Input>
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
                <Input v-model="item.Text" class="rule-text"></Input>
              </Col>
              <Col span="2">
               <i @click="removeRule(index)" class="action action-remove ivu-icon ivu-icon-trash-a" :style="{visibility:draging?'hidden':'visible'}" style="font-size:20px!important"></i>
                  <!-- <i class=" action action-drag  ivu-icon ivu-icon-arrow-move" style="font-size:20px!important"></i> -->
              </Col>
            </Row>
          </draggable>
        </ul>
      </main>
      <footer>
        <span @click="addRule" class="addbtn">
          <Icon type="plus-round" color="#2d7fff" size=15 />
          <span>添加参数</span>
        </span>
      </footer>
      <div slot="footer">
          <Button type="primary" class="btn-ok" @click="saveRules">确定</Button>
          <Button type="text" class="btn-cancel"  @click="cancel">取消</Button>
      </div>
  </modal>
  </div>
</template>

<script>
import { Icon, Button, Modal, Tooltip, Row, Col,Input } from "iview";
import { Message } from "iview";
import draggable from "vuedraggable";
// import HTTP from "../../../../../api/form.js"
import Bus from "../../lib/H3/H3Plugins/bus.js";
export default {
  components: {
    Icon,
    Button,
    Tooltip,
    Row,
    Col,
    Modal,
    Input,
    draggable,
  },

  props:[
            'sheetCode',
            'formulaText',
            'Width',
            'Height',
            'formulaType',
            'showModal',
            'notifyType'
        ],
  data() {
    return {
      showEditorRule: false,
      showFormulEditor: false,
      placeholder:'请输入接口地址',
      url:'',
      rules: [],
      modal:false,
      sortindex: [],
      curEditorRule: 0,
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
    
    

  },

  
  watch:{
    showModal() {
        this.modal= this.showModal;
        if(this.showModal){
          try{
              if(this.formulaText){
              this.url = this.formulaText.split('?')[0]
              if(this.formulaText.split('?')[1]){
                var param = this.formulaText.split('?')[1].split('&')
                for(var index of param){
                  let add = {
                      Description: "",
                      Rule: "",
                      Text: index
                    };
                  this.rules.push(add);
                }
                
              }
              else{
                this.rules=[]
              }
            }
            }
            catch(e){
              Message.error("获取规则失败");
              console.log(e);
              this.rules=[]
            }
        }
    }
  },
  methods: {
    cancel(){
      this.url="";
      this.rules=[];
      this.$emit('cancel');
      setTimeout(()=>{
          this.modal = false;
      },200)
     },
    saveRules() {
      // let refs = this.$refs.businessrule;
      // let seq = refs.$el.getElementsByClassName("seq");
      var param = "";
      for(var data of this.rules){
         param+=data.Text;
         param+="&"
      }
      if(param){
        param=param.substring(0,param.length-1)
      }
      var formulaText = this.url+'?'+param
      this.addListener({formula:formulaText,lineNotifyType:2,Exclusive:true});
      //this.destroy();
    },


    addListener(param){
      if(this.notifyType==="Line"){
         this.$emit('ok',this.formulaType, param);
      }
      else{
         this.$emit('notify', param);
      }
      this.url='';
      this.rules=[];
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
   
    toggleIcon: function(e) {
      this.draging = !this.draging;
    },
    editRuleDoneHandler() {
      this.$refs.advanceView.save();
    },
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
      min-height: 35px;
      height: 35px;
      line-height: 35px;
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
  .title{
      margin-left:100px;
      font-size:20px;
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
    min-height: 35px;
    height: 35px;
    line-height: 35px;
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


// WEBPACK FOOTER //
// src/components/console/submit-rule/submit-rule.vue
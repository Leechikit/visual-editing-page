<template>
  <div>
      <Modal v-model="show"  @on-cancel="cancel" :loading="loading" :title="title" :mask-closable="false"
        width="700px" class="expression-modal">
        <div>
            <formulaEditor ref="formulaEditor" v-if="showFormula" :Formula="formula" :FormulaText="formulaText" :FormulaType="formulaType" 
            :SchemaCode="schemaCode" >
            </formulaEditor>
        </div>
        <div slot="footer" class="bottom_btns">
            <a class="confirm" @click="ok()">确定</a>
            <a class="cancel" @click="cancel()">取消</a>
        </div>
      </Modal>
  </div>
</template>
<script>
    import { Modal} from "iview";
    import formulaEditor from '../console/formula/formula';
    import Bus from "../../lib/H3/H3Plugins/bus.js";
    export default {
        name:'expression',
        data(){
            return {
                show: false,
                loading: false,
                showFormula: false,
            }
        },
        props:[
            'showFlag',
            'title',
            'formula',
            'formulaText',
            'formulaType',
            'schemaCode',
        ],
        components:{
            Modal,
            formulaEditor
        },
        created(){
        },
        mounted(){
        },
        methods:{
            addListener(){
                Bus.$on(this.formulaType, target => {
                    target.lineNotifyType=1;
                    target.Exclusive=false;
                    this.$emit('ok',this.formulaType, target);
                    Bus.$off(this.formulaType);
                });

            },
            ok(){
                this.addListener();
                this.$refs.formulaEditor.save();
            },
            cancel(){
                this.$emit('cancel');
                setTimeout(()=>{
                    this.showFormula = false;
                },200)
            },
            
        },
        computed:{
           
        },
        watch:{
            showFlag:function(){
                this.show = this.showFlag;
                if(this.showFlag) {
                    this.showFormula = this.showFlag;
                }else{
                    setTimeout(()=>{
                        this.showFormula = false;
                    },200)
                }
                
            },
        }
    }
</script>
<style lang="less">
    .expression-modal .ivu-modal-body{
        padding: 0;
    }
</style>



// WEBPACK FOOTER //
// src/components/workflowdesigner/expression.vue
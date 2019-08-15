<template>
    <div>
        <!-- @* 确认删除 *@ -->
        <Modal v-model="showConfirmDelete"  :title="modalTitle"  :mask-closable="false"
            @on-ok="ok" @on-cancel="cancel" width="420px" class="del-sheet">
            <div class="del-container">
                <i class="icon-exclamation-circle"></i>
                <p class="del-title">删除{{typeName}}</p>
                <p class="del-warning">{{typeWaring}}</p>
            </div>
            
            <div slot="footer" class="bottom_btns">
                <a class="confirm delapp-button" @click="ok($event)">删除</a>
                <a class="cancel" @click="cancel">取消</a>
            </div>
        </Modal>
    </div>
</template>

<script>
import {deleteSheet,removeGroup,RemoveWorkflowPackages} from '../../../service/getData'

export default {
    data(){
        return {
            groupName:'',
            showConfirmDelete:false,
            modalTitle:'提示',
            type:'',
            typeName : '',
            typeWaring: '',
        }
    },
    props:{
        ifShowConfirmDelete:{
            default:false,
            type:Boolean,
            twoWay:true
        },
        code:{
            default:'',
            type:String,
            twoWay:true
        },
        deltype:{
            default:'',
            type:String,
            twoWay:true
        },
        ifSysWorkflow:{
            default:false,
            type:Boolean,
            twoWay:true
        }
    },
    watch:{
        ifShowConfirmDelete:function(cur){
            var that = this;
            if(cur == true){
                that.showConfirmDelete = true;
            }else{
                that.showConfirmDelete = false;
            }
        },
        deltype:function(cur){
            var that = this;
            if(cur == 'sheet'){
                that.type = 'sheet';
                that.typeName = "表单";
                that.typeWaring = '对应的表单数据也会被清除';
            }else if(cur == 'group'){
                that.type = 'group';
                that.typeName = "分组";
                that.typeWaring = '分组下的所有表单、报表将同时被删除';
            }else{
                that.type = 'report';
                that.typeName = "报表";
                that.typeWaring = '对应的报表配置将会丢失';
            }
        }
    },
    methods:{
        ok(e) {
            var that = this;
            //console.log(e)
            e.target.innerHTML = '删除中...'
            if(that.ifSysWorkflow){
               that.RemoveWorkflowPackages();
            }else{
               that.deleteSheet(e);
            }
        },
        cancel() {
            var that = this;
            that.$emit('closeConfirm',false); 
        },
        async deleteSheet(e){
            var that = this,
                res;
            if(this.type == 'sheet' || this.type == 'report'){
                res = await deleteSheet(that.code);
            }else{
                res = await removeGroup(that.code);
            }
            if (res.Successful) {
                $.IShowSuccess('删除成功');
                that.$emit('getSheetList',false);
                that.$emit('closeConfirm',true); 
                e.target.innerHTML = '删除'
            }else{
                $.IShowWarn(res.ErrorMessage);
            }
            
        },
        async RemoveWorkflowPackages(){
            var that = this;
            var res = await RemoveWorkflowPackages(that.code);
            if (res.Successful) {
                $.IShowSuccess('删除成功');
                that.$emit('getSheetList',false); 
            }else{
                $.IShowWarn(res.ErrorMessage);
            }
            that.$emit('closeConfirm',true); 
        }
    }
}
</script>







// WEBPACK FOOTER //
// src/components/sheetdesigner/popups/confirm-delete.vue
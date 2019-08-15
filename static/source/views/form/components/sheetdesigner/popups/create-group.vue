<template>
    <div>
        <!-- @* 新建分组 *@ -->
        <Modal v-model="showCreateGroup" :title="modalTitle"  :mask-closable="false"     
            @on-ok="ok" @on-cancel="cancel" width="420px" :loading="loading">
            <div class="popupsContent">
                <div class="main create">
                    <div class="bd">
                        <div class="msgBox_row">
                            <div class="col-left">
                                <label class="row_name" for="txtGroupName">分组名称</label>
                            </div>
                            <div class="col-right">
                                <input type="text" class="row_input row_input_text" placeholder="请输入分组名称" name="txtGroupName"  maxlength="12" v-model="groupObject.DisplayName"  v-on:input="txtGroupNameCheck()">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import {AddGroup,UpdateGroup} from '../../../service/getData'
import '../../../lib/H3/H3Plugins/H3.plugins.system.js'
export default {
    data(){
        return {
            loading: true,
            showCreateGroup:false,
            ismodify:false,
            groupObject:{
                DisplayName:''
            }
        }
    },
    props:{
        ifShowCreateGroup:{
            default:false,
            type:Boolean,
            twoWay:true
        },
        modalTitle:{
            default:'',
            type:String,
            twoWay:true
        },
        isModifyGroup:{
            default:false,
            type:Boolean,
            twoWay:true
        },
        code:{
            default:'',
            type:String,
            twoWay:true
        },
        modifyGroup:{
            default:'',
            type:Object,
            twoWay:true
        }
    },
    watch:{
        ifShowCreateGroup:function(cur){
            this.groupObject.groupName = '';
            if(cur == true){
                this.showCreateGroup = true;
            }else{
                this.showCreateGroup = false;
            }
        },
        isModifyGroup:function(cur){
            this.ismodify = cur;
        },
        modifyGroup:function(cur){
            this.groupObject = cur;
            // console.log(this.groupObject);
        }
    },
    methods:{
        ok() {
            var that = this;
            if(that.groupObject.DisplayName == ''){
                $.IShowWarn("分组名称不能为空");
                setTimeout(() => {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
                    });
                }, 2000);
                return;
            }
            if(this.ismodify){
                that.UpdateGroup();
            }else{
                that.AddGroup();
            }
        },
        cancel() {
            var that = this;
            that.$emit('closeGroupPopups',false); 
        },
        async AddGroup(){
            var that = this;
            let res = await AddGroup(that.groupObject.DisplayName,that.code,that.code);
            if (res.Successful) {
                that.showCreateGroup = false;
                $.IShowSuccess('新建分组成功');
                // 将点击确定之后的showModal 派发给父组件
                that.$emit('getSheetList',false);
            }else{
                $.IShowWarn(res.ErrorMessage);
            }
            
        },
        async UpdateGroup(){
            var that = this;
            let res = await UpdateGroup(that.groupObject.DisplayName,that.groupObject.Code,that.code,that.code);
            if (res.Successful) {
                that.showCreateGroup = false;
                $.IShowSuccess('修改分组成功');
                // 将点击确定之后的showModal 派发给父组件
                that.$emit('getSheetList',false);
            }else{
                $.IShowWarn(res.ErrorMessage);
            }
            
        },
        txtGroupNameCheck(){
            var that = this;
            var newFormName;
            if(that.groupObject.DisplayName != undefined){
                newFormName = $.IFilterCharacter(that.groupObject.DisplayName);
                that.groupObject.DisplayName = newFormName;
            }
        }
    }
}
</script>





<style>
.msgBox_row
    margin:20px 0
</style>


// WEBPACK FOOTER //
// src/components/sheetdesigner/popups/create-group.vue
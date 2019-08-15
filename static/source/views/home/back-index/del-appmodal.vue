<template>
    <div class="del-appmodal">
        <Modal v-model="showDelFlag" title="删除应用" :appName="appName" :appCode="appCode"
         @on-ok="ok" @on-cancel="cancel" :mask-closable="false" class="del-app"
         width="420px" :loading="loading">
            <div class="removeappcontainer">
                <i class="icon-exclamation-circle"></i>
                <div class="del-title">删除应用</div>
                <div class="del-app-name">若删除 “{{appName}}” 应用</div>
                <div class="del-waring">对应的表单、报表、数据也会被清除</div>
                <div>
                    <span class="app-name">应用名称：</span>
                    <input v-model="inputAppName" type="text" id="removeappcheckname" class="removeappinput row_input" placeholder="请输入应用名称后删除">
                </div>
            </div>
            <div slot="footer" class="bottom_btns">
                <a class="confirm delapp-button" @click="ok">删除</a>
                <a class="cancel" @click="cancel">取消</a>
            </div>
        </Modal>
        <!-- <comfirmDelapp :appCode="appCode" @changeConfirmShowFlag="reSetShowModal" :delErrorMsg="delErrorMsg" :showComfirmModal="showComfirmModal"></comfirmDelapp> -->
    </div>
</template>

<script>
//import comfirmDelapp from 'components/back-index/comfirmDelapp'  //引入确认删除应用弹框
//import { delAppData } from '../../service/getData'   //引入删除应用接口

export default {
    props: [
        "appName",
        "showDelModal",
        "appCode"
    ],
    data() {
        return {
            loading: true,
            inputAppName: '',
            showDelFlag: false,
            delErrorMsg: '',
            showComfirmModal: false
        }
    },
    watch: {
        showDelModal: function() {
            this.showDelFlag = this.showDelModal
            if(!this.showDelFlag) {
                this.inputAppName = '';
            }
        }
    },
    created: function() {
        var _self = this
    },
    methods: {
        // 远程请求时，确定按钮出现loading圆圈
         _setLoading() {
            var _self = this
            setTimeout(() => {
                _self.loading = false;
                _self.$nextTick(() => {
                    _self.loading = true;
                })
            }, 1000)
        },
        // 启用删除应用数据接口
        async _delApp() {
            var _self = this
            // let res = await delAppData('RemoveApp', _self.appCode, _self.appName)
            if (true) {
                //删除数据成功   
                this.$emit('updateAppList');
                $.IShowSuccess("应用成功删除！");  
                this.showDelFlag = false   
                this.$emit('changeDelShowFlag', this.showDelFlag)
            }else {
                // 删除数据失败
                // 如果是删除解决方案应用，弹出提示框是否确认删除
                if(res.ReturnData.SolutionError) {
                    this.delErrorMsg = res.ErrorMessage
                    this.showDelFlag = false
                    this.showComfirmModal = true
                }
            }
        },
        ok() {
            var _self = this
            // 点击确认按钮，验证应用名称是否正确
            if(_self.inputAppName != _self.appName){
                 $.IShowError("应用名称输入有误");    
            }else{
                // 验证成功之后，删除后台数据及app
                _self._delApp()
                // _self.showDelFlag = false
            }
            // 将点击确定之后的showModal 派发给父组件
            _self.$emit('changeDelShowFlag', _self.showDelFlag)
        },
        cancel() {
            // 将点击取消之后的showModal 派发给父组件
            this.showDelFlag = false
            this.$emit('changeDelShowFlag', this.showDelFlag)
        },
        reSetShowModal() {
            this.showDelFlag = false
            this.showComfirmModal = false
            this.$emit('changeDelShowFlag', false)
        }
    },
    components: {
        
    }
}
</script>

<style  rel="stylesheet/stylus">

.del-appmodal .modal-body{
    padding : 0 !important;
}

 #removeappcheckname{
    width : 140px !important;
}
</style>




// WEBPACK FOOTER //
// src/components/back-index/del-appmodal.vue
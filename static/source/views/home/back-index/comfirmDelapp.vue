<template>
    <div class="comfirm-delapp">
        <Modal v-model="showDelFlag" title="提示" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         width="420px">
            <div class="modal-body" style="padding: 0;">
                <div class="removeappcontainer">
                    <div class="removeappfistline" id="removeappdisplayname" style="color:#333;">{{delErrorMsg}}</div>
                </div>
            </div>
            <div slot="footer" class="bottom_btns">
                <a class="confirm" @click="ok">确定</a>
                <a class="cancel" @click="cancel">取消</a>
            </div>
        </Modal>
        <!-- 加载中gif图 -->
       <!--  <div v-show="showLoading" class="loading-container">
          <loading :showLoadingImg="false" :title="delTitle"></loading>
        </div> -->
    </div>
</template>

<script>
//import loading from "components/role/loading"; //引入加载中蒙层
//import { RemoveSolution } from '../../service/getData'   //引入删除应用接口

export default {
    props: [
        "delErrorMsg",
        "showComfirmModal",
        'appCode'
    ],
    data() {
        return {
            showDelFlag: false,
            delTitle: '解决方案删除中，请耐心等待...',
            showLoading: false
        }
    },
    watch: {
        showComfirmModal: function() {
            this.showDelFlag = this.showComfirmModal
        }
    },
    created: function() {
    },
    methods: {
        // 远程请求时，确定按钮出现loading圆圈
        // 启用删除解决方案数据接口
        // async _RemoveSolution() {
        //     this.showLoading = true;
        //     let res = await RemoveSolution('RemoveSolution', this.appCode)
        //     if (res.Successful) {
        //         //删除数据成功     
        //         // $.IShowSuccess("应用成功删除！");     
        //         window.location.reload()
        //         this.showLoading = false;
        //         this.showDelFlag = false
        //     }else {
        //         // 删除数据失败
        //         $.IShowError(res.ErrorMessage);
        //         this.showDelFlag = false
        //     }
        // },
        ok() {
            // $.IShowLoading('解决方案删除中，请耐心等待...');
            let _self = this
            setTimeout(function(){
               // _self._RemoveSolution()
            }, 0)
            // 将点击确定之后的showModal 派发给父组件
            this.$emit('changeConfirmShowFlag', this.showDelFlag)
        },
        cancel() {
            // 将点击取消之后的showModal 派发给父组件
            this.showDelFlag = false
            this.$emit('changeConfirmShowFlag', this.showDelFlag)
        }
    },
    components: {
        // loading
    }
}
</script>

<style  rel="stylesheet/stylus">

.del-appmodal .modal-body{
    padding : 0 !important;
}

.loading-container{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 9999999999999;
}

.loading-container .loading{
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: 15%;
}
</style>




// WEBPACK FOOTER //
// src/components/back-index/comfirmDelapp.vue
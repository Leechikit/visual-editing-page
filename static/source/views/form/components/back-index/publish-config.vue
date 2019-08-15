<!--发布到钉钉 -->
<template>
        <modal  v-model="showModal" :title="modalTitle" :appCode="appCode"  class="publish-config" 
        @on-ok="ok" @on-cancel="cancel"  width="420px" :loading="loading" :mask-closable="false" :sheetOrApp="sheetOrApp">
            <div id="Pub2TalkIneer">
                <div style="height:268px;position:relative">
                    <div>
                        <div style="height:60px;">
                            <div class="upload-logo-left" v-if="sheetOrApp == 'app'">
                                应用LOGO<span>*</span>
                            </div>
                            <div class="upload-logo-left" v-if="sheetOrApp == 'sheet'">
                                表单LOGO<span>*</span>
                            </div>
                            <div class="upload-logo-left" v-if="sheetOrApp == 'report'">
                                报表LOGO<span>*</span>
                            </div>
                            <div class="upload-logo-wrapper">
                                <label class="upload-logo-box">
                                    <span v-if="logoImage == null"> 上传logo </span>
                                    <form><input type="file" name="file_upload" id="file_upload"/></form>
                                    <img v-if="logoImage != null" id="appIcon" :src="logoImage" />
                                </label>
                            </div>
                            <div class="logo-limit">
                                   图片大小限制在100kb以下
                            </div>
                        </div>
                    </div>
                    <div class="tips-info">
                        <span v-if="sheetOrApp == 'app'">
                            注：应用发布后将以微应用的形式展示在钉钉工作台界面
                        </span>
                        <span v-if="sheetOrApp == 'sheet'">
                            注：表单发布后将以微应用的形式展示在钉钉工作台界面，点击后可直接新增表单数据
                        </span>
                        <span v-if="sheetOrApp == 'report'">
                            注：报表发布后将以微应用的形式展示在钉钉工作台界面，点击后可直接查看报表
                        </span>
                    </div>
                </div>
            </div>
            <div slot="footer" class="bottom_btns">
                <a class="confirm" @click="ok">确定</a>
                <a class="cancel" @click="cancel">取消</a>
            </div>
        </modal>
</template>

<script>
import { createSmartApp } from "../../service/getData"; //引入发布应用到钉钉接口
import { UploadPic } from "../../lib/plugins/uploadpic/uploadpic"; //上传图片插件
export default {
  props: ["showPublishFlag", "modalTitle", "appCode", 'sheetOrApp', 'sheetCode'],
  data() {
    return {
      loading: true,
      showModal: false,
      logoImage: null,
      AppRankType: {
          app: 'App',
          sheet: 'Sheet',
          report: 'Report'
      }
    };
  },
  watch: {
    showPublishFlag: function() {
      var _self = this;
      this.showModal = this.showPublishFlag;
      this.$nextTick(() => {
            if (this.showModal) {
                //上传应用图标
                var u = new UploadPic();
                u.init({
                input: $("#file_upload"),
                maxSize: 100 * 1024,
                callback: function(base64) {
                    _self.logoImage = base64;
                    //$("#appIcon").attr("src", base64);
                },
                loading: function() {}
                });
            }
      })
    }
  },
  mounted: function() {},
  created: function() {},
  methods: {
    // 发布到钉钉
    async _createSmartApp() {
      let type,sheetcode;
      if(this.sheetOrApp == 'app') {
          type = this.AppRankType.app
          sheetcode = ''
      }
      if(this.sheetOrApp == 'sheet'){
          type = this.AppRankType.sheet
          sheetcode = this.sheetCode
      }
      if(this.sheetOrApp == 'report') {
          type = this.AppRankType.report
          sheetcode = this.sheetCode
      }
      let res = await createSmartApp("CreateSmartApp", this.logoImage, this.appCode, sheetcode, type);
      
      if (res.Successful) {
        $.IShowSuccess("发布成功！");
        this.logoImage = null;
        this.showModal = false;
        this.$emit("changePublishShowFlag", this.showModal);
      } else {
        $.IShowError(res.ErrorMessage);
        // this.logoImage = null;
      }
    },
    ok() {
      var s = new UploadPic();
      // 点击确认按钮，验证是否上传图片
      if (this.logoImage == null) {
        $.IShowWarn("请先上传应用图标");
        return;
      } else {
        this._createSmartApp();
      }
    },
    cancel() {
      $("#appIcon").attr("src", "");
      this.logoImage = null;
      this.showModal = false;
      this.$emit("changePublishShowFlag", this.showModal);
    }
  }
};
</script>
        
<style>
    .publish-config {
        .ivu-modal-body {
            height: 287px;
        }

        .ivu-modal-footer{
          padding-right: 0px !important;
        }

        #appIcon {
            width: 80px;
        }
    }

    .upload-logo-left {
        height: 60px;
        line-height: 60px;
        color: rgb(41, 41, 41);
        float: left;
        vertical-align: middle;
        span{
            color: red;
        }
    }

    .upload-logo-wrapper {
        margin-left: 8px;
        vertical-align: middle;
        display: inline-block;
    }

    .upload-logo-box {
        display: inline-block;
        width: 90px;
        line-height: 60px;
        cursor: pointer;
        border: 1px dashed rgb(45, 127, 255);
        background-color: rgb(247, 250, 251);
        color: rgb(45, 127, 255);
        text-align: center;
        input{
            display: none;
        }
    }

    .logo-limit {
        color: rgb(41, 41, 41);
        height: 60px;
        line-height: 60px;
        vertical-align: middle;
        width: 200px;
        float: right;
        font-size: 12px;
        padding-left: 2px;
        display: inline-block;
    }

    .tips-info{
        position:absolute;
        bottom:20px;  
        span{
            font-size:11px;
            color:#FF4141
        }  
    }
</style>


// WEBPACK FOOTER //
// src/components/back-index/publish-config.vue
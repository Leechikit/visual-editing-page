<template>
    
    <Modal v-model="showExternal" title="表单外链" width="700px" class="external-modal">
        <div id="divExternalForm" style="height:406px;">
            <div class="ExternalForm_content row">
                <div >
                    <span style="font-size:14px;color:#333333;">开启表单外链后将允许外部人员填写当前表单</span >&nbsp;&nbsp;
                    <div>
                        <span style="font-size:12px;color:#6F6F6F">注:外链表单暂不支持选人控件、选部门控件、���建人、关联表单、关联表单多选、下拉框关联表单模式、位置控件</span>
                    </div>
                </div>
                <div class="row">
                    <input type="checkbox" @change="switchExternal()" id="ExternalFormSwitch" v-model="openExternalForm" class="chk_switch" /><label for="ExternalFormSwitch"></label>
                </div>
                <div v-show="openExternalForm">
                    <div class="externallink" >
                        <div class="row">表单填写链接</div>
                        <div class="row" style="position:relative">
                            <input type="text" readonly id="textExternalForm" v-model="externalFormUrl"  style="width:525px;height:32px;border:1px solid #DDDEDD"/>
                            <i-button type="primary" @click="openTestUrl()" style="width:100px;height:32px;font-size:14px;color:#ffffff;padding:5px;margin-left:10px;margin-top:-4px;">点击打开链接</i-button>
                        </div>
                    </div>
                    <div class="externalqrcode" style="text-align:center">
                        <div style="font-size:14px;color:#333333;">表单填写二维码</div>
                        <div id="QrCodeExternalForm"></div>
                        <div style="font-size:12px;color:#8B8B8B">复制二维码，分享给好友</div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer">
            </div>
    </Modal>
</template>

<script>
// import { iButton } from "iview";
import { switchExternalForm } from '../../../service/getData';  //引入开启关闭表单外链接口
import "../../../lib/plugins/qrCode/jquery.qrcode.min.js";

export default {
    props:[
        "schemaCode",
        "EnableExternalForm",
        "externalLink",
        "externalLinkPreview",
        "sheetDesigner"
    ],
    data(){
        return {
            showExternal:false,
            externalFormUrl:"",
            openExternalForm:false
        }
    },
    watch: {
        externalLink:function(){
        },
        openExternalForm:function(){
        }
    },
    mounted:function(){
                
    },
    created: function() {
        var _self = this;
        this.openExternalForm = this.EnableExternalForm;
    },
    methods:{
        show() {
            this.showExternal=true;
            
            this.externalFormUrl =this.externalLink;
           
            //console.log("externalLink:"+this.externalLink);
            //生成二维码
            this.$QrCodeExternalForm= $("#QrCodeExternalForm")
            this.$QrCodeExternalForm.html("");
            this.$QrCodeExternalForm.qrcode({ width: 160, height: 160, text: this.externalFormUrl });
        },
        openTestUrl(){
            this.openExternalForm=true;
            window.open(this.externalLinkPreview);
        },
        switchExternal(){
            //console.log($.BizSheet);
            //检查是否有外链不支持的控件
            if (this.openExternalForm) {
                var message = this.sheetDesigner.CheckExternalForm();
                if (message != "") {
                    this.openExternalForm=false;
                    $.IShowWarn(message);
                    return;
                }
            }
            
            $.BizSheet.EnableExternalForm = this.openExternalForm;            
            this._switchExternalForm();
        },
        async _switchExternalForm(){
            var _self=this;
            var tipString = this.openExternalForm ? "表单外链已启用" : "表单外链已禁用";
            let res = await switchExternalForm( _self.schemaCode, _self.openExternalForm)
            if (res.Successful) {
               $.IShowSuccess(tipString);
            }else{
                $.IShowWarn(res.ErrorMessage);
            }
        },
        cancel(){

        }
    },
    components:{
    //    iButton
    }
}
</script>

<style>
.external-modal{

    .chk_switch {
        display:none;
    }

    #divExternalForm .chk_switch + label {
        background-color: #fafbfa;
        padding: 6px !important;
        border-radius: 30px;
        display: inline-block !important;
        position: relative;
        margin-right: 30px !important;
        -webkit-transition: all 0.1s ease-in;
        transition: all 0.1s ease-in;
        width: 48px !important;
        height: 26px !important;
    }

    #divExternalForm .chk_switch + label:after {
        content: '关';
        position: absolute;
        top: 0;
        -webkit-transition: box-shadow 0.1s ease-in;
        transition: box-shadow 0.1s ease-in;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 100px;
        box-shadow: inset 0 0 0 0 #eee,0 0 1px rgba(0,0,0,0.4);
        text-align: right;
        padding-right: 8px;
        line-height: 26px;
        color: #ffffff;
        background-color:#999999;
    }
    #divExternalForm .chk_switch + label:before {
        content: ' ';
        position: absolute;
        background: white;
        top: 1px !important;
        left: 1px !important;
        z-index: 999999;
        width: 25px !important;
        -webkit-transition: all 0.1s ease-in;
        transition: all 0.1s ease-in;
        height: 25px !important;
        border-radius: 100px;
        margin-top:0 !important;
        box-shadow: 0 3px 1px rgba(0,0,0,0.05),0 0px 1px rgba(0,0,0,0.3);
    }

    #divExternalForm .chk_switch:active + label:after {
        box-shadow: inset 0 0 0 0 #eee,0 0 1px #eee;
    }

    #divExternalForm .chk_switch:active + label:before {
        width: 37px;
    }
    #divExternalForm .chk_switch:checked:active + label:before {
        width: 37px;
        left: 20px;
        background-color: #ffffff !important;
    }
    #divExternalForm .chk_switch + label:active {
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(0,0,0,0.1);
    }

    #divExternalForm .chk_switch:checked + label:before {
        background-color: #ffffff !important;
        content: ' ';
        position: absolute;
        left: 26px !important;
        border-radius: 100px;
    }

    #divExternalForm .chk_switch:checked + label:after {
        content: '开';
        position: absolute;
        background: #37ABFD;
        box-shadow: 0 0 1px #37ABFD;
        text-align: left;
        line-height: 26px;
        padding-left: 8px;
        color:#ffffff;
    }

    .ExternalForm_content > div {
        padding:5px 6px;
    }

    .externallink > div {
    padding-top:5px;
    padding-bottom:6px;
    }

    .externalqrcode > div {
        padding-top:8px;
    }

    .ivu-modal-footer{
        border-top-width:0 !important;
    }
    }
</style>



// WEBPACK FOOTER //
// src/components/sheetdesigner/externalForm/external-form.vue
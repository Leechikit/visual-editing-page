<template>
    <div class="modal">
        <Modal v-model="showFlag" :title="modalTitle" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         width="420px" :loading="loading" :code="code" :DisplayName="DisplayName" :devCode="devCode" :iconClass="iconClass">
            <form id="App_form" ref="App_form">
                <div class="msgBox_row" v-show="IsDeveloper">
                    <div class="col-left">
                        <label class="row_name" for="txtAppCode">
                            应用ID
                            <Poptip trigger="hover" class="help icon-tips" width="228" placement="top"> 
                                <div slot="content" class="pop_content">
                                    <p>
                                        应用ID为应用的唯一标识，允许开发者
                                    </p>
                                    <p>
                                        自定义， 便于后期在代码中使用
                                    </p>
                                </div>
                            </Poptip>
                        </label>
                    </div>
                    <div class="col-right">
                        <label class="row_input row_label_code " :class="{row_label_code_editW : !addNewApp}" id="txtAppDevCode" ref="txtAppDevCode">{{codeTxt}}</label>
                        <input v-model="appID" v-show="addNewApp" type="text" class="row_input row_input_code" @keyup="checkvalue.call(this,arguments[0])" id="txtAppCode" placeholder="请输入应用ID" />
                    </div>
                </div>

                <div class="msgBox_row">
                    <div class="col-left">
                        <label class="row_name" for="txtAppName">应用名称</label>
                    </div>
                    <div class="col-right">
                        <input v-model="appName" type="text" maxlength="15" class="row_input row_input_text" id="txtAppName" name="txtAppName" placeholder="请输入应用名称" />
                    </div>
                </div>
            </form>
            <div slot="footer" class="bottom_btns">
                <a class="confirm" @click="ok">确定</a>
                <a class="cancel" @click="cancel()">取消</a>
            </div>
        </Modal>
    </div>
</template>

<script>
import { addAppData, editAppData } from './getData'


export default {
    props: [
        "code",
        "showModal",
        "modalTitle",
        "IsDeveloper",
        "DisplayName",
        "devCode",
        'iconClass'
    ],
    data() {
        return {
            fontPicker: null,     //字体图标对象
            model1: '',
            appID: '',        //输入的应用ID
            appName: '',        //输入的应用名称
            loading: true,        //确定时显示loading条
            showFlag: false,      //控制弹窗的显示隐藏
            addNewApp: true,        
            codeTxt: ''
        }
    },
    watch: {
        showModal: function() {
            this.showFlag = this.showModal
            if(!this.showFlag) {
                this.appID = '';
            }
            let _self = this
            // 添加fontIconPicker
            this.fontPicker.AddFontPicker(iconPicker)
            if(this.modalTitle == '新建应用'){
                // 新建应用
                _self.addNewApp = true
                _self.appName = ''
                _self.codeTxt = _self.devCode
            }else{
                // 编辑应用
                _self.addNewApp = false
                _self.appName = _self.DisplayName
                _self.codeTxt = _self.code
                // 图标展示之前保存的图标
                this.fontPicker.SetIcon(_self.iconClass)
            }
        }
    },
    created: function() {
        // 创建页面时，渲染icon图标下拉框，使用插件fontIconPicker
        var _self = this
        // this.fontPicker = $.IFontPicker()
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
        // 验证appID是否合法
        checkvalue(e) {
            var _self = this
            if (e.keyCode >= 37 && e.keyCode <= 40) return

            //复制的时候判断编码是不是中文
            var reg = /[^\w\.\/]/ig
            if(e.keyCode==86){
               for(var i = 0;i<_self.appID.length;i++){
                   var code = _self.appID.charAt(i);
                   if(reg.test(code)){
                       _self.appID = '';
                       return;
                   }
               }
            }

            var val = e.key.replace(/[^\w\.\/]/ig, '')
            if (val != e.key) {
               _self.appID = val
            }
        },
        // // 新增应用接口启用
        // async _addApp() {
        //     var _self = this
        //     let iconClass = $('span.selected-icon:last').children('i').attr('class')
        //     let res = await addAppData('AddAppPackage', _self.appName, iconClass, _self.appID)
        //     if (res.Successful) {
        //         //请求app数据成功,将请求成功的数据绑定到vue页面     
        //         this.$emit('updateAppList')
        //         $.IShowSuccess("新建应用成功"); 
        //         this.showFlag = false;
        //         this.$emit('changeShowFlag', this.showFlag)
        //     }else{
        //         $.IShowError(res.ErrorMessage);
        //     }

        // },
        // // 编辑应用时，点击确定按钮，保存编辑好的信息
        // async _editApp() {
        //     var _self = this;
        //     let appName = _self.appName;
        //     let appcode = _self.code;
        //     let iconClass = $('span.selected-icon:last').children('i').attr('class');
        //     let res = await editAppData('UpdateApp', appName, iconClass, appcode);
        //     if (res.Successful) {
        //         //请求app数据成功,将请求成功的数据绑定到vue页面   
        //         // this.$Message.info('修改应用成功')   
        //         $.IShowSuccess("修改应用成功");  
        //         _self.$emit('changeDisplayName', [appName,iconClass]);
        //     }
        // },
        ok() {
            // 验证新建应用表单信息
            var _self = this
            let appId = _self.appID
            let appName = _self.appName
            // 如果是开发者用户，并且是新建应用的时候才需要验证应用编码
            if (_self.IsDeveloper && _self.addNewApp) {
                if (!appId) {
                    // $.IShowError("应用ID不能为空");  
                    return
                }

                //编码不能是纯数字
                var reg = /^[0-9]*$/;
                if (appId && reg.test(appId)) {
                    // $.IShowError("应用ID不能为纯数字");  
                    return
                }
                // 应用编码只能是中英文数字和下划线
                reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
                if (appId && !reg.test(appId)) {
                    // $.IShowError("应用ID只能是中英文数字和下划线");
                    return
                }

            }

            if (!appName) {
                // $.IShowError("应用名称不能为空");  
                return
            }

            // if (_self.appName && _self.appName) {
            //     // _self.loading = false
            //     // 验证通过时，页面新增app模块
            //     if(_self.modalTitle == "新建应用") {
            //         _self._addApp()
            //     }else{
            //         // 编辑app应用时，点击确定时，启用编辑保存接口
            //         _self._editApp()
            //         // 将点击确定之后的showModal 派发给父组件
            //         _self.showFlag = false
            //     }
            // }
            _self.$emit('changeShowFlag', _self.showFlag)
        },
        cancel() {
            this.showFlag = false
            this.$emit('changeShowFlag', this.showFlag)
            if(this.modalTitle == '新建应用'){
                // this.$Message.info('取消新建应用')
            }else{
                // this.$Message.info('取消修改应用')
            }
            
        },
        loadData(item, callback) {
            item.loading = true;
            setTimeout(() => {
                item.loading = false;
                callback();
            }, 1000);
        }
    }
}
</script>

<style>


.help .ivu-poptip-popper{
    top: 92px !important;  
}

.help .ivu-poptip-body{
    padding: 7px 9px !important;
}

.ivu-poptip-popper[x-placement=top] .ivu-poptip-arrow{
    margin-left: -12px !important;  
}

/*.ivu-poptip-content{
    border: 1px solid #2d7fff;
    box-shadow : 0 0 5px 0 rgba(0, 0, 0, 0.22)
    border-radius : 5px;
}*/

.ivu-poptip-popper[x-placement^=top] .ivu-poptip-arrow{
    border-top-color: #2d7fff;  
    box-shadow : none;
    -webkit-box-shadow : none;
}
.pop_content p{
    color: #333;
    font-size: 12px;
}

.ivu-modal-body{
    padding-bottom : 80px !important;
}

</style>




// WEBPACK FOOTER //
// src/components/back-index/modal.vue
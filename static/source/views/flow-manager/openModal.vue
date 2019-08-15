<style src='../style/openModal.css' type="text/css" scoped>

    #action_more {
        list-style: none;
        width: 100%;
        padding-left: 0;
    }

    #action_more > li > a {
        height: 36px;
        line-height: 36px;
        padding: 8px 15px 8px 15px;
        width: 100%;
    }

    #action_more > li {
        /*border: 1px solid #e1e1e1;*/
        width: 100%;
        text-align: left;
    }

    #action_more > li:hover {
        /*border: 1px solid #e1e1e1;*/
        background: #f7f7f7;
    }

    .btn-outline {
        width: 100%;
        min-height: 85px;
        display: table;
    }
     .btn-outline {
        border: 1px dashed #d7d5d5;
        background-color: #f9fafb;
        border-radius: 3px;
        color: #848484;
        font-size: 14px;
        padding: 0;
        height: 32px;
        padding-top: 5px;
    }





</style>

<style lang="less">
.submit-info-modal {
    .loading-spin {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
}
</style>



<template>

<div class="submit-info-modal">
    <!-- Fixed navbar -->

    <nav style="position: relative" class="sheet-navbar navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header navbar-title">
                <!-- <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button> -->
                <a class="navbar-brand" href="javascript:void(0);" style="cursor:default;width:100%" title="">
                    <span class="navbar-head"></span> <span id="navarbarSheetName" class="navbar-title-con"></span>
                </a>
            </div>

        </div>
    </nav>
    <!-- <Association></Association> -->
    <div class="container-fluid sheet_container">
        <div id="SheetContent" class="current-container" data-bv-message="This value is not valid"
             data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
             data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
             data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"></div>
    </div>

    <!-- 底部工具栏 在显示在弹出框时显示-->
    <nav class="sheet-navbar navbar navbar-default navbar-fixed-bottom hide">
        <div class="container-fluid">
            <div id="navbarbottom" class=" navbar-right">
                <ul data-sheettoolbar-bottom="true" class="nav navbar-nav"></ul>
            </div>
        </div>
    </nav>

    <div id="divForward" style="display:none;">
        <div class="form-group">
            <label class="col-sm-2 control-label">转发给</label>
            <div class="col-sm-10">
                <div id="forwardParticipant" data-width="100%" data-orgunitvisible="false" data-ismultiply="false" data-orgtagvisible="false"></div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">转发意见</label>
            <div class="col-sm-10">
                <textarea id="forwardComment" data-width="100%" style="width:100%;height:100px;" placeholder="请输入转发意见(非必填)"></textarea>
            </div>
        </div>
    </div>
    <div id="navbar" class="navbar-collapse collapse navbar-right submit-btn">
        <ul data-sheettoolbar="true" class="nav navbar-nav submit-btn-con"></ul>
    </div>
    <Spin class="loading-spin" size="large" v-show="loading"></Spin>
    <!--/.nav-collapse -->

    <!-- 应用暂存/提交成功后关闭Tab -->
    <div id="app-add-submit-success" style="display: none;" @click="$emit('close');"></div>
</div>
</template>


 <script>
import '../home/jquery.js'
import '../home/DefaultSheet.js'

import HTTP from '../../api/form.js'
import Association from "./components/associationSheet.vue"
import {
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
export default {
    name: 'dataSourcePie',
    data () {
        return {
            loading: true
        };
    },
    components: {
    Association,
    },
    props:['code', 'approvalTitle'],
    mounted () {
        var OwnerDeptId_Name;
        var requestData = {};
        var engineCode = "n3wk40r211ew2fafgh9jg71x6";
        $.SheetRuntimeContentCache.Init(engineCode);
        requestData["ActionName"] = "Load";
        requestData["SchemaCode"] = $.IQuery("SchemaCode");
        requestData["BizObjectId"] = $.IQuery("BizObjectId") || "";
        requestData["SideModal"] = $.IQuery("SideModal") || "";
        requestData["WorkItemID"] = $.IQuery("WorkItemID") || "";
        requestData["Mode"] = $.IQuery("Mode") || "";
        requestData["IsExternalForm"] = $.IQuery("IsExternalForm") || "";
        var sheetContentCacheItem = $.SheetRuntimeContentCache.Get(requestData["SchemaCode"],"form");
        var timeStamp = -1;
        var runtimeContent;
        var javascript;
        if (sheetContentCacheItem && sheetContentCacheItem[$.SheetRuntimeContentCache.JavaScriptName]) {
            timeStamp = sheetContentCacheItem[$.SheetRuntimeContentCache.TimeStampName]-0;
            runtimeContent = sheetContentCacheItem[$.SheetRuntimeContentCache.SheetContentName]
            javascript = sheetContentCacheItem[$.SheetRuntimeContentCache.JavaScriptName]
        }
        requestData["TimeStamp"] = timeStamp;
        //显示在Modal框中,工具栏显示到底部
        var showInModal = $.IQuery("ShowInModal") || $.IQuery("showinmodal") || $.IQuery("showInmodal") || "";
        // var defaultUrl = "/Form/OnAction";
        var param={}
        param.ActionName="Load";
        //luzx add
        var appRunId = "";
        console.log("this.code="+this.code);
        try{
            if(this.code.indexOf(',')>0){
                var arr = this.code.split(",");
                param.SchemaCode = arr[0];
                appRunId = arr[1];
                param.appRunId = appRunId;
            }else{
                param.SchemaCode =this.code;
            }
        }catch(e){
            console.log("this.code.indexOf(',') fail");
            param.SchemaCode =this.code;
        }
        var that=this;
	//luzx add end
        param.BizObjectId="";
        param.SideModal=true;
        HTTP.FormGet(param)
            .then((result)=>{
                
                if (result.Successful) {
                     if(result.ReturnData&&result.ReturnData.ResponseContext){
                    }
                var displayName = result.ReturnData.DisplayName;
                var isDelete = result.ReturnData.IsDelete;
                OwnerDeptId_Name = result.ReturnData.OwnerDeptId;

                //$("title").html("氚云 - " + result.ReturnData.DisplayName);
                // top.$.ISideModal.SetTile(displayName);

                if (result.ReturnData.RuntimeContent) {
                //luzx mod
                    debugger
                    let currentIndex = this.$store.state.listview.currentTabIndex
                    let tabTypeObj   =this.$store.state.listview.tabTypeObj
                    let currentTabType = this.$store.state.listview.tabTypeObj
                    if(appRunId==null||appRunId==undefined||appRunId==""){
                        tabTypeObj[currentIndex]='new'
                        that.$store.state.listview.tabTypeObj = tabTypeObj
                        that.$store.state.listview.currentTabType ='new'
                    }
                    else{
                         tabTypeObj[currentIndex]='modify'
                        this.$store.state.listview.tabTypeObj = tabTypeObj
                        this.$store.state.listview.currentTabType ='modify'    
                    }
                    $.SheetRuntimeContentCache.Set(param.SchemaCode, result.ReturnData.RuntimeContent, result.ReturnData.TimeStamp, result.ReturnData.Javascript, "form", engineCode, appRunId);
                    runtimeContent = result.ReturnData.RuntimeContent;
                    javascript = result.ReturnData.Javascript;
                }

                //script
                if (javascript) {
                    var scriptTag = document.createElement("script");
                    scriptTag.text = javascript;
                    var head = document.getElementsByTagName("head")[0];
                    head.appendChild(scriptTag);
                }

                //html
                if (runtimeContent) {
                    $("#SheetContent").html(runtimeContent);
                }
                if (displayName != null) {
                    //标题
                    $("span.navbar-head").text(this.approvalTitle.appRunName);
                    $("#navarbarSheetName").text('(' + this.approvalTitle.nameSchema + ')');
                }

                $("a.navbar-brand").attr("title", this.approvalTitle.appRunName + '(' + this.approvalTitle.nameSchema + ')');
                /*下面的处理方式有问题，无法过滤掉所有情况*/
                var jsonResponseContext = {};
                var responseContext = result.ReturnData.ResponseContext;
                try {
                    //responseContext = responseContext.replace(/\\\\/g, "\\").replace(/\\'/g, "\'");
                    jsonResponseContext = responseContext;
                } catch (e) {
                    responseContext = responseContext.replace(/&quot;/g, "\"").replace(/\\{2,}/g, "\\\\");
                    jsonResponseContext = JSON.parse(responseContext);
                }

                //var responseContext = result.ReturnData.ResponseContext.replace(/&quot;/g, "\"").replace(/\\\\/g, "\\").replace(/\\\\/g, "\\").replace(/\\'/g,"\'").replace(/\\{2,}/g, "\\\\");
                //var jsonResponseContext = JSON.parse(responseContext);
                //jsonResponseContext.QrCodeUrl = result.ReturnData.QrCodeUrl; //二维码地址传递到smartform.js
                jsonResponseContext.ShowInModal = showInModal; //表单是否显示在弹出框中

                if (result.ReturnData.IsChildInstance != void 0) {
                    //如果是流程实例会返回标记当前流程是否是子流程标识
                    jsonResponseContext.IsChildInstance = result.ReturnData.IsChildInstance;
                    //如果是子流程实例会返回StartActivityCode
                    jsonResponseContext.StartActivityCode = result.ReturnData.StartActivityCode;
                }
                //表单显示在弹出框中时
                if (showInModal == "true") {
                    $(".sheet_container").css("margin-top", "0");
                }

                $.SmartForm.Init(jsonResponseContext);
                if ($.IQuery("printmodal") == "true") {
                    window.print();
                }

            } else {
                that.$Message.error(result.msg)
                var isDelete = result.ReturnData.IsDelete;
                if (isDelete) {
                    ErrorHandler(result.ErrorMessage);
                }
            }
            })
            .catch(err => {
                    console.log(err);
                    that.$Message.error(err)
            }).finally(()=>{
                that.loading = false
            })

    },
     method:{
             ...mapMutations("listview", ['setTabTypeObj','setCurrentTabType']),

    }
};















function ErrorHandler(msg) {
    if (window.parent) {
        window.parent.$.IShowError(msg.replace("\r\n", "\\r\\n"));
        window.parent.$.ISideModal.CloseLastModal();
    }
}
</script>

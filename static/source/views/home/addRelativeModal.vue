<style lang="less">

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

    /* 弹窗 */
    .relative-modal{
        position: relative;
        z-index: 1041;
        .ivu-modal-mask {
            background-color: rgba(55,55,55,.4);
        }

        .ivu-modal {
            width: 1000px !important;
            top: 20px;
        }

        .ivu-modal-body {
            padding-bottom: 0 !important;
        }

        .add-relative-modal {
            min-height: 400px;
            max-height: 520px;
            overflow-y: auto;
        }

        .ivu-modal-close {
            position: absolute;
            z-index: 3000;
            &:hover {
                cursor: pointer;
            }
        }

        .navbar-fixed-top, .navbar-fixed-bottom {
            position: absolute;
            border-bottom: none;
            box-shadow: none;
        }

        .navbar-fixed-top {
            top: 30px;
        }

        .sheet-navbar .container-fluid #navbar ul.navbar-nav li {
            border-left: none;
        }

        .ivu-modal-confirm-head {
            display: none;
        }

        .container-fluid.sheet_container{
            padding-bottom: 70px;
            margin-top: 0;
        }

        // .ivu-modal-footer {
        //     display: none;
        // }

        .navbar-title {
            background-color: #fff;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            top: -35px;
            position: absolute;
            left: 0;
            right: 0;
            border-bottom: 1px solid #eee;
            padding-left: 20px;

            .navbar-title-con{
                font-size: 18px;
            }
        }

        .submit-btn {
            margin: 0;
            background-color: #fff;
            border-top: 1px solid #eee;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            box-sizing: border-box;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;

            .close-btn {
                display: inline-block;
                width: 100px;
                border: 1px solid #eee;
                padding: 6px 0;
                margin-top: -2px;
                vertical-align: middle;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                color: #888;
            }

            .submit-btn-con {
                display: inline-block;
                float: none;

                li {
                    float: left;

                    a {
                        display: inline-block;
                        width: 100px;
                        padding: 0;
                        margin: 10px;
                        height:39px;
                        line-height: 39px;
                    }
                    &.active{
                        a:hover, a:focus, a:active {
                            background-color: transparent;
                            background: transparent;
                        }

                    }
                }
            }

            .icon-submit {
                display: block;
                width: 100%;
                margin: 0 auto;
                padding: 10px;
                border-radius: 5px;
                color: #fff;
                background-color: #2d8cf0;
            }
        }

    }

    // 表单

    .relative-modal{
        .loading-spin {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .ivu-modal-confirm-footer {
            display: none;
        }
        input[type=radio]:checked+label:after {
            margin-top: -3px;
        }
        .form-group {
            display: flex;
            align-items: center;
            span {
                line-height: 30px;
            }

            .SheetUser-Item {
                line-height: 20px;
            }

            .form-control.icon-arrow-down-full {
                line-height: 18px;
            }
        }

        .icon-arrow-down-full {
            .form-control.myform-control.mytext {
                line-height: 18px;
            }
        }
        .add-pic {
            margin: 0 auto;
        }
        .ivu-modal-confirm-body  {
            .SheetQuery .form-query-add:empty:not(:focus):before {
                top: 0;
            }

            #SheetContent .SheetMultiQuery .form-query-add a.label-info>i, #SheetContent .SheetQuery .form-query-add a.label-info>i {
                top: 6px;
            }

            .SheetQuery .form-query-add .label.label-info {
                margin-top: 4px;
                color: #38adff !important;
            }

            .form-group {
                display: flex;
                align-items: center;
                padding: 10px 0;
                justify-content: flex-start;

                .ControlTitle {
                    padding: 0;
                }

                textarea {
                    height: auto !important;
                }
            }

            .col-md-6.col-sm-6.col-xs-6 {
                    padding-left: 0 !important;
                }

            .SheetUser .label-info {
                font-size: 14px !important;
            }

            .nav-tabs.user-tabs>li.active>a, .nav-tabs.user-tabs>li.active>a:focus, .nav-tabs.user-tabs>li.active>a:hover, .SheetUser .label-info {
                color: #38adff!important;
            }

            .SheetAttachment .btn-outline {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .SheetUser {
            display: flex;
            justify-content: center;
        }

        .SheetUser, .SheetQuery {
            margin-top: 12px;
        }
    }

.add-relative-modal {
  #navbar {
    display: flex;
    z-index: 66;
  }
  .container-fluid.sheet_container {
    padding-bottom: 320px;
  }
}
</style>


<template>

<div class="add-relative-modal open-modal-scroll-container">

    <div class="container-fluid sheet_container">
        <!-- Form标签改成div 20170629-->
        <div :id="code" data-bv-message="This value is not valid"
             data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
             data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
             data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"></div>
    </div>

    <!-- 底部工具栏 在显示在弹出框时显示-->
    <nav class="sheet-navbar navbar navbar-default navbar-fixed-bottom hide">
        <div class="container-fluid">
            <div id="navbarbottom" class=" navbar-right">
                <ul data-sheettoolbar-bottom="true" class="nav navbar-nav"></ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav>

    <div id="divForward" style="display:none">
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
        <div class="close-btn" id="relative--close-btn"  @click="close()">取消</div>
        <ul data-sheettoolbar="true" class="nav navbar-nav submit-btn-con"></ul>
    </div>

    <Spin v-show="loading" size="large" class="loading-spin"></Spin>

</div>
</template>


 <script>
import './jquery.js'
import './DefaultSheet.js'
import {
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
import HTTP from '../../api/form.js'
export default {
    name: 'dataSourcePie',
    data () {
        return {
            loading: true
        };
    },
    methods: {
        close() {
            $('.relative-modal').remove()
        }
    },
    props:['code'],
    mounted () {
        this.$nextTick(function() {
            $('.add-relative-modal').parents('.v-transfer-dom').addClass('relative-modal')
        })
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
	//luzx add end
        param.BizObjectId="";
        param.SideModal=true;
        this.loading = true

        HTTP.FormGet(param)
            .then((result)=>{
                var that=this;
                this.loading = false
                if (result.Successful) {
                var displayName = result.ReturnData.DisplayName;
                var isDelete = result.ReturnData.IsDelete;
                OwnerDeptId_Name = result.ReturnData.OwnerDeptId;

                //$("title").html("氚云 - " + result.ReturnData.DisplayName);
                // top.$.ISideModal.SetTile(displayName);

                if (result.ReturnData.RuntimeContent) {
                    
            //luzx mod
                    let currentIndex = this.$store.state.listview.currentTabIndex
                    let tabTypeObj   =this.$store.state.listview.tabTypeObj
                    let currentTabType = this.$store.state.listview.tabTypeObj
                    if(appRunId==null||appRunId==undefined||appRunId==""){
                        tabTypeObj[currentIndex]='new'
                        this.$store.state.listview.tabTypeObj = tabTypeObj
                        this.$store.state.listview.currentTabType ='new'
                         
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
                   $(`#${this.code}`).html(runtimeContent);
                }
                if (displayName != null) {
                    //标题
                    // $("span.navbar-head").text(result.ReturnData.DisplayName + "-");
                    $("#navarbarSheetName").text(result.ReturnData.Name);
                }

                // $("a.navbar-brand").attr("title", result.ReturnData.DisplayName + "-" + result.ReturnData.Name);
                $("a.navbar-brand").attr("title", result.ReturnData.Name)
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
                this.$Message.error(result.msg)
                var isDelete = result.ReturnData.IsDelete;
                if (isDelete) {
                    ErrorHandler(result.ErrorMessage);
                }
            }
            })
            .catch(err => {
                    console.log(err);
                    this.$Message.error(err)
            }).finally(()=>{
                this.loading = false;
                this.$emit('close');
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

<style type="text/css">

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
// .show-info-modal {
.print-btn {
    margin: 0;
    background-color: #fff;
    position: absolute;
    z-index: 1235;
    bottom: 0;
    // left: 344px;
    margin-left:40px;
    text-align: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    box-sizing: border-box;
    background: transparent;
    border: 1px solid #dddee1;
    border-radius: 5px;
    min-width: auto !important;
    min-height: 30px !important;
    line-height: 30px !important;
    color: #495060;
    padding-left: 0 !important;
    padding-right: 0 !important;
    border-top: 1px solid #dddee1 !important;

    &:hover {
        cursor: pointer;
        color: #57a3f3;
        background-color: transparent;
        border-color: #57a3f3;
        border-top-color: #57a3f3 !important;

    }

    .print-btn-con {
        display: inline-block;
        float: none;

        li {
            float: none;
            width: 100%;
            a {
                display: inline-block;
                width: 60px;
                padding: 0;
                &:hover {
                    color: #57a3f3;
                    border-color: #57a3f3;
                    border-top-color: #57a3f3 !important;
                }
            }
            &.active{
                a:hover, a:focus, a:active {
                    background-color: transparent;
                    background: transparent;
                    color: #57a3f3;
                    border-color: #57a3f3;
                    border-top-color: #57a3f3 !important;
                }

            }

            a span {
                color: #495060;

                &:hover {
                    color: inherit;
                }
            }
        }
    }
}

.noedit-body {
    .print-btn {
        // left: 380px
    }
}

// }
</style>

<style>
.print-btn {
  left: calc(50% + 72px);
}

.noedit-body .print-btn {
  left: calc(50% + 72px);
}
</style>



<template>

<div>
    <!-- Fixed navbar -->

    <div class="container-fluid sheet_container">
        <!-- Form标签改成div 20170629-->
        <div id="SheetContent" data-bv-message="This value is not valid"
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

    <div id="navbar" class="navbar-collapse collapse navbar-right print-btn">
        <ul data-sheettoolbar="true" class="nav navbar-nav print-btn-con"></ul>
    </div>

</div>
</template>


 <script>
import '../../home/jquery.js'
import '../../home/DefaultSheet.js'
import '../../style/openModal.css'
import HTTP from '../../../api/work-flow.js';
export default {
    name: 'dataSourcePie',
    data () {
        return {
            //
        };
    },
    props:['code','result'],
    watch: {
        code() {
            this.init()
        }
    },
    mounted () {
        this.init()
    },
    methods:{
        init() {
            var OwnerDeptId_Name;
            var requestData = {};
            var engineCode = "n3wk40r211ew2fafgh9jg71x6";
            $.SheetRuntimeContentCache.Init(engineCode);
            var sheetContentCacheItem = $.SheetRuntimeContentCache.Get(requestData["SchemaCode"],"form");
            var timeStamp = -1;
            var runtimeContent;
            var javascript;
            if (sheetContentCacheItem && sheetContentCacheItem[$.SheetRuntimeContentCache.JavaScriptName]) {
                timeStamp = sheetContentCacheItem[$.SheetRuntimeContentCache.TimeStampName]-0;
                runtimeContent = sheetContentCacheItem[$.SheetRuntimeContentCache.SheetContentName]
                javascript = sheetContentCacheItem[$.SheetRuntimeContentCache.JavaScriptName]
            }

            //显示在Modal框中,工具栏显示到底部
            var showInModal = $.IQuery("ShowInModal") || $.IQuery("showinmodal") || $.IQuery("showInmodal") || "";
            // var defaultUrl = "/Form/OnAction";

                if (this.result.Successful) {

                // fix: 创建人无法打印，因为CreatedBy和CreatedBy.FullName的问题
                if (this.result.ReturnData.ResponseContext.ReturnData.CreatedBy&&this.result.ReturnData.ResponseContext.ReturnData['CreatedBy.FullName']) {
                    this.result.ReturnData.ResponseContext.ReturnData['CreatedBy.FullName'].Printable =
                    this.result.ReturnData.ResponseContext.ReturnData.CreatedBy.Printable;
                }

                var displayName = this.result.ReturnData.DisplayName;
                //var isDelete = this.result.ReturnData.IsDelete;
                OwnerDeptId_Name = this.result.ReturnData.OwnerDeptId;

                //$("title").html("氚云 - " + result.ReturnData.DisplayName);
                // top.$.ISideModal.SetTile(displayName);

                if (this.result.ReturnData.RuntimeContent) {
                    $.SheetRuntimeContentCache.Set(this.code, this.result.ReturnData.RuntimeContent, this.result.ReturnData.TimeStamp, this.result.ReturnData.Javascript, "form", engineCode);
                    runtimeContent = this.result.ReturnData.RuntimeContent;
                    javascript = this.result.ReturnData.Javascript;
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
                    $("span.navbar-head").text(this.result.ReturnData.DisplayName + "-");
                    $("#navarbarSheetName").text(this.result.ReturnData.Name);
                }

                $("a.navbar-brand").attr("title", this.result.ReturnData.DisplayName + "-" + this.result.ReturnData.Name);
                /*下面的处理方式有问题，无法过滤掉所有情况*/
                var jsonResponseContext = {};
                var responseContext = this.result.ReturnData.ResponseContext;
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

                if (this.result.ReturnData.IsChildInstance != void 0) {
                    //如果是流程实例会返回标记当前流程是否是子流程标识
                    jsonResponseContext.IsChildInstance = this.result.ReturnData.IsChildInstance;
                    //如果是子流程实例会返回StartActivityCode
                    jsonResponseContext.StartActivityCode = this.result.ReturnData.StartActivityCode;
                }
                //表单显示在弹出框中时
                if (showInModal == "true") {
                    $(".sheet_container").css("margin-top", "0");
                }

                // 加入打印按钮
                var param= {
                    "Action":"Print",
                    "Icon":"fa-print",
                    "Text":"打印",
                    "IsPrintAction":false,
                    "PrintTemplateCode":null
                }
                console.log(jsonResponseContext)
                jsonResponseContext.Actions = Object.assign(jsonResponseContext.Actions, {
                    Print: param
                })

                $.SmartForm.Init(jsonResponseContext);
                if ($.IQuery("printmodal") == "true") {
                    window.print();
                }

            } else {
                // var isDelete = this.result.ReturnData.IsDelete;
                // if (isDelete) {
                //     ErrorHandler(this.result.ErrorMessage);
                // }
            }
        }
    }
};















function ErrorHandler(msg) {
    if (window.parent) {
        window.parent.$.IShowError(msg.replace("\r\n", "\\r\\n"));
        window.parent.$.ISideModal.CloseLastModal();
    }
}
</script>

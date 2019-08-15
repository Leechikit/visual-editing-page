<style>
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
    </style>
<template>
<div>
    <!-- Fixed navbar -->
    <nav class="sheet-navbar navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header navbar-title">
                <!-- <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button> -->
                <a class="navbar-brand" href="javascript:void(0);" style="cursor:default;" title="">
                    <span class="navbar-head"></span> <span id="navarbarSheetName" class="navbar-title-con"></span>
                </a>
            </div>

        </div>
    </nav>

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
    <div id="navbar" class="navbar-collapse collapse navbar-right submit-btn">
        <ul data-sheettoolbar="true" class="nav navbar-nav submit-btn-con"></ul>
    </div><!--/.nav-collapse -->
</div>
</template>


<script>
        import "../../home/jquery.js"
        import "../../home/DefaultSheet.js"
    
                export default {
                name: 'association',
                data () {
                    return {
                        //
                    };
                },
                props:['code'],
                mounted () {
                    var OwnerDeptId_Name;
                    var requestData = {};
                    var engineCode = "m83njcbr1kp2u5fzno9ikccl5";
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


                    


                    $(function () {


                        var defaultUrl = "/Form/OnAction";
                        $.ajax({
                            type: "POST",
                            url: defaultUrl,
                            data: { PostData: JSON.stringify(requestData) },
                            async: true,
                            dataType: "json",
                            cache: false,
                            success: function (result) {
                                if (result.Successful) {
                                    var displayName = result.ReturnData.DisplayName;
                                    var isDelete = result.ReturnData.IsDelete;
                                    OwnerDeptId_Name = result.ReturnData.OwnerDeptId;

                                    $("title").html(result.ReturnData.DisplayName);
                                    top.$.ISideModal.SetTile(displayName);

                                    if (result.ReturnData.RuntimeContent) {
                                        $.SheetRuntimeContentCache.Set(requestData["SchemaCode"], result.ReturnData.RuntimeContent, result.ReturnData.TimeStamp, result.ReturnData.Javascript, "form", engineCode);
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
                                        $("span.navbar-head").text(result.ReturnData.DisplayName + "-");
                                        $("#navarbarSheetName").text(result.ReturnData.Name);
                                    }

                                    $("a.navbar-brand").attr("title", result.ReturnData.DisplayName + "-" + result.ReturnData.Name);
                                    /*下面的处理方式有问题，无法过滤掉所有情况*/
                                    var jsonResponseContext = {};
                                    var responseContext = result.ReturnData.ResponseContext;
                                    try {
                                        responseContext = responseContext.replace(/\\\\/g, "\\").replace(/\\'/g, "\'");
                                        jsonResponseContext = JSON.parse(responseContext);
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
                                    var isDelete = result.ReturnData.IsDelete;
                                    if (isDelete) {
                                        ErrorHandler(result.ErrorMessage);
                                    }
                                }
                                // Error:未知用处的代码，先屏蔽
                                //add by xc 子表表头和内容等宽
                                //$(function () {
                                //    var $gd = $(".SheetGridView");
                                //    $gd.each(function (i) {
                                //        var $that = $(this);
                                //        $that.children("span").width($that.children("table.table").width());
                                //    });
                                //});

                            },
                            error: function (result) {
                                    result = {"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"RuntimeContent":"\u003cdiv class=\"page-header\" id=\"69ca4c71-b467-499f-920d-1cbb2862b777\" style=\"background-color: rgb(241, 250, 255);\"\u003e\u003cstrong\u003e基本信息\u003c/strong\u003e\u003cbutton class=\"btn btn-default btn-xs remove\" style=\"display: none;\" type=\"button\" data-buttontype=\"remomvecontrol\"\u003e\u003cspan class=\"glyphicon glyphicon-trash\"\u003e\u003c/span\u003e\u003c/button\u003e\u003c/div\u003e\u003cdiv class=\"row\"\u003e\u003cdiv class=\"col-md-6 col-sm-6 col-xs-6\"\u003e\u003cdiv class=\"row sheet-control\" data-datafield=\"FName\" data-controlkey=\"FormTextBox\" data-displayname=\"客户名称\" data-transferitems=\"FormTextBox\" data-width=\"100%\" data-displayrule=\"\" data-computationrule=\"\" data-mode=\"Normal\" data-inputbyscan=\"false\" data-scanupdateenable=\"false\" data-norepeat=\"false\" data-defaultitems=\"选项1,选项2,选项3\" data-placeholder=\"\" data-description=\"\"\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"col-md-6 col-sm-6 col-xs-6\"\u003e\u003cdiv class=\"row sheet-control\" data-datafield=\"Fbba18991962f49499129b0bebd10ee4e\" data-controlkey=\"FormTextBox\" data-displayname=\"客户地址\" data-transferitems=\"FormTextBox\" data-width=\"100%\" data-displayrule=\"\" data-computationrule=\"\" data-mode=\"Normal\" data-inputbyscan=\"false\" data-scanupdateenable=\"false\" data-norepeat=\"false\" data-defaultitems=\"选项1,选项2,选项3\" data-placeholder=\"\" data-description=\"\"\u003e\u003c/div\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"row\"\u003e\u003cdiv class=\"col-md-6 col-sm-6 col-xs-6\"\u003e\u003cdiv class=\"row sheet-control\" data-datafield=\"FSource\" data-controlkey=\"FormDropDownList\" data-displayname=\"客户来源\" data-transferitems=\"FormDropDownList\" data-width=\"100%\" data-displayrule=\"\" data-selectshowmode=\"0\" data-datasource=\"Custom\" data-datadictitemname=\"\" data-defaultitems=\"[\u0026quot;官网留言\u0026quot;,\u0026quot;400电话\u0026quot;,\u0026quot;市场活动\u0026quot;,\u0026quot;关系介绍\u0026quot;,\u0026quot;销售开拓\u0026quot;,\u0026quot;其它\u0026quot;]\" data-defaultvalue=\"选项1\" data-boschemacode=\"\" data-mappingfield=\"\" data-associationfilter=\"\" data-description=\"\"\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"col-md-6 col-sm-6 col-xs-6\"\u003e\u003cdiv class=\"row sheet-control\" data-datafield=\"F0000006\" data-controlkey=\"FormDropDownList\" data-displayname=\"客户级别\" data-transferitems=\"FormDropDownList\" data-width=\"100%\" data-displayrule=\"\" data-selectshowmode=\"0\" data-datasource=\"Custom\" data-datadictitemname=\"\" data-defaultitems=\"[\u0026quot;普通客户\u0026quot;,\u0026quot;重点客户\u0026quot;,\u0026quot;战略客户\u0026quot;]\" data-defaultvalue=\"\" data-boschemacode=\"\" data-mappingfield=\"\" data-associationfilter=\"\" data-description=\"\"\u003e\u003c/div\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"row\"\u003e\u003cdiv class=\"col-md-6 col-sm-6 col-xs-6\"\u003e\u003cdiv class=\"row sheet-control\" data-datafield=\"F0000002\" data-controlkey=\"FormTextBox\" data-displayname=\"客户联系人\" data-transferitems=\"FormTextBox\" data-width=\"100%\" data-displayrule=\"\" data-computationrule=\"\" data-mode=\"Normal\" data-inputbyscan=\"false\" data-scanupdateenable=\"false\" data-norepeat=\"false\" data-defaultitems=\"选项1,选项2,选项3\" data-placeholder=\"\" data-description=\"\"\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"col-md-6 col-sm-6 col-xs-6\"\u003e\u003cdiv class=\"row sheet-control\" data-datafield=\"F0000003\" data-controlkey=\"FormTextBox\" data-displayname=\"联系电话\" data-transferitems=\"FormTextBox\" data-width=\"100%\" data-displayrule=\"\" data-computationrule=\"\" data-mode=\"Telephone\" data-inputbyscan=\"false\" data-scanupdateenable=\"false\" data-norepeat=\"false\" data-defaultitems=\"选项1,选项2,选项3\" data-placeholder=\"\" data-description=\"\"\u003e\u003c/div\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"row\"\u003e\u003cdiv class=\"col-md-6 col-sm-6 col-xs-6\"\u003e\u003cdiv class=\"row sheet-control\" data-datafield=\"F0000005\" data-controlkey=\"FormUser\" data-displayname=\"客户经理\" data-width=\"100%\" data-displayrule=\"\" data-ismultiple=\"false\" data-unitselectionrange=\"\" data-orgunitvisible=\"false\" data-uservisible=\"true\" data-isrelatedmember=\"true\" data-showunactive=\"false\" data-usedatacache=\"true\" data-description=\"\"\u003e\u003c/div\u003e\u003c/div\u003e\u003cdiv class=\"col-md-6 col-sm-6 col-xs-6\"\u003e\u003c/div\u003e\u003c/div\u003e","Javascript":null,"TimeStamp":1528430304000,"Name":"111     ","ResponseContext":"{\"WorkflowState\":0,\"ActivityCode\":null,\"DisplayName\":\"客户\",\"SchemaCode\":\"D000030Custmer\",\"Originator\":\"2ed97f8c-8b38-440b-bda1-21d8a7b20db4\",\"OriginatorCode\":\"$:LWCP_v1:$/RszIoHurHQ2XF/T0Z3jZg==\",\"OriginatorParentId\":\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\",\"WorkflowVersion\":0,\"FormMode\":4,\"IsCreateMode\":false,\"InstanceId\":null,\"BizObjectId\":\"420c0516-9333-4465-aeb8-0b8725a82148\",\"BizObjectStatus\":1,\"WorkItemId\":null,\"Close\":false,\"WorkItemType\":0,\"Actions\":{\"Edit\":{\"Action\":\"Edit\",\"Icon\":\"icon-ok\",\"Text\":\"编辑\"},\"Print\":{\"Action\":\"Print\",\"Icon\":\"fa-print\",\"Text\":\"打印\"},\"Remove\":{\"Action\":\"Remove\",\"Icon\":\"fa-minus\",\"Text\":\"删除\"},\"ViewQrCode\":{\"Action\":\"ViewQrCode\",\"Icon\":\"fa-qrcode\",\"Text\":\"二维码\"},\"Close\":{\"Action\":\"Close\",\"Icon\":\"icon-close\",\"Text\":\"关闭\"}},\"AssociatedBoNames\":{},\"AssociationLists\":{\"D000030Gathering\":\"回款\",\"D000030BusinessOpportunity\":\"商机\",\"D000030ContactRecord\":\"跟进\"},\"EnableFormSns\":true,\"EnableTask\":true,\"Name\":\"111     \",\"FormDataType\":2,\"ReturnData\":{\"ObjectId\":{\"Type\":14,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":\"420c0516-9333-4465-aeb8-0b8725a82148\",\"DisplayName\":\"ObjectId\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"Name\":{\"Type\":14,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":\"111     \",\"DisplayName\":\"Name\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"CreatedBy\":{\"Type\":26,\"Visible\":true,\"Editable\":false,\"Required\":true,\"Printable\":true,\"Value\":[{\"UnitType\":4,\"FullName\":\"卢宗兴[$:LWCP_v1:$h+hEuPxiaZNWNbjrLRZdmg==]\",\"Birthday\":\"1753-01-01T00:00:00\",\"Gender\":0,\"EntryDate\":\"1753-01-01T00:00:00\",\"DepartureDate\":\"1753-01-01T00:00:00\",\"EmployeeNumber\":null,\"Title\":null,\"HomePhone\":null,\"OfficePhone\":null,\"QQ\":null,\"IdNumber\":null,\"EmployeeRank\":0,\"ProfilePhotoUrl\":\"\",\"DepartmentName\":\"穿云团队\",\"Password\":null,\"Mobile\":null,\"Email\":null,\"DingTalkAccount\":\"165643170521261215.dingf59c7dec662ad6b335c2f4657eb6378f\",\"DingId\":\"$:LWCP_v1:$h+hEuPxiaZNWNbjrLRZdmg==\",\"WeChatUserId\":null,\"Position\":null,\"ExtAttr\":\"{}\",\"ViceParentIds\":[],\"ParentIds\":[\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\"],\"ParentId\":\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\",\"CompanyId\":\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\",\"Visibility\":7,\"State\":0,\"DomainType\":1,\"Name\":\"卢宗兴\",\"Description\":null,\"UnitId\":\"1b19dbc0-7ec0-404b-b7b5-21c95298230c\",\"Code\":\"$:LWCP_v1:$h+hEuPxiaZNWNbjrLRZdmg==\",\"ManagerId\":null,\"CreatedTime\":\"2018-04-27T11:41:12\",\"ModifiedTime\":\"2018-04-27T11:41:12\",\"SortKey\":0,\"Serialized\":true,\"ObjectId\":\"1b19dbc0-7ec0-404b-b7b5-21c95298230c\",\"ParentObjectId\":\"\",\"ParentPropertyName\":null,\"ParentIndex\":0,\"DirtyProperties\":[]}],\"DisplayName\":\"创建人\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"OwnerDeptId\":{\"Type\":26,\"Visible\":true,\"Editable\":false,\"Required\":true,\"Printable\":true,\"Value\":[{\"UnitType\":1,\"CompanyId\":\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\",\"DomainType\":1,\"Name\":\"穿云团队\",\"Description\":null,\"UnitId\":\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\",\"Code\":\"MyCompany\",\"ManagerId\":null,\"CreatedTime\":\"2018-04-13T20:20:49\",\"ModifiedTime\":\"2018-05-09T18:14:27\",\"SortKey\":0,\"Serialized\":true,\"ObjectId\":\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\",\"ParentObjectId\":\"\",\"ParentPropertyName\":null,\"ParentIndex\":0,\"DirtyProperties\":[]}],\"DisplayName\":\"所属部门\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"ModifiedBy\":{\"Type\":26,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":null,\"DisplayName\":\"ModifiedBy\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"ModifiedTime\":{\"Type\":5,\"Visible\":true,\"Editable\":false,\"Required\":true,\"Printable\":true,\"Value\":\"2018-06-08 10:59:40\",\"DisplayName\":\"修改时间\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"WorkflowInstanceId\":{\"Type\":14,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":\"\",\"DisplayName\":\"WorkflowInstanceId\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"Status\":{\"Type\":9,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":1,\"DisplayName\":\"Status\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"CreatedTime\":{\"Type\":5,\"Visible\":true,\"Editable\":false,\"Required\":true,\"Printable\":true,\"Value\":\"2018-06-08 10:59:40\",\"DisplayName\":\"创建时间\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"OwnerId\":{\"Type\":26,\"Visible\":true,\"Editable\":false,\"Required\":true,\"Printable\":true,\"Value\":[{\"UnitType\":4,\"FullName\":\"卢宗兴[$:LWCP_v1:$h+hEuPxiaZNWNbjrLRZdmg==]\",\"Birthday\":\"1753-01-01T00:00:00\",\"Gender\":0,\"EntryDate\":\"1753-01-01T00:00:00\",\"DepartureDate\":\"1753-01-01T00:00:00\",\"EmployeeNumber\":null,\"Title\":null,\"HomePhone\":null,\"OfficePhone\":null,\"QQ\":null,\"IdNumber\":null,\"EmployeeRank\":0,\"ProfilePhotoUrl\":\"\",\"DepartmentName\":\"穿云团队\",\"Password\":null,\"Mobile\":null,\"Email\":null,\"DingTalkAccount\":\"165643170521261215.dingf59c7dec662ad6b335c2f4657eb6378f\",\"DingId\":\"$:LWCP_v1:$h+hEuPxiaZNWNbjrLRZdmg==\",\"WeChatUserId\":null,\"Position\":null,\"ExtAttr\":\"{}\",\"ViceParentIds\":[],\"ParentIds\":[\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\"],\"ParentId\":\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\",\"CompanyId\":\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\",\"Visibility\":7,\"State\":0,\"DomainType\":1,\"Name\":\"卢宗兴\",\"Description\":null,\"UnitId\":\"1b19dbc0-7ec0-404b-b7b5-21c95298230c\",\"Code\":\"$:LWCP_v1:$h+hEuPxiaZNWNbjrLRZdmg==\",\"ManagerId\":null,\"CreatedTime\":\"2018-04-27T11:41:12\",\"ModifiedTime\":\"2018-04-27T11:41:12\",\"SortKey\":0,\"Serialized\":true,\"ObjectId\":\"1b19dbc0-7ec0-404b-b7b5-21c95298230c\",\"ParentObjectId\":\"\",\"ParentPropertyName\":null,\"ParentIndex\":0,\"DirtyProperties\":[]}],\"DisplayName\":\"拥有者\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"FName\":{\"Type\":14,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":\"111\",\"DisplayName\":\"客户名称\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"Fbba18991962f49499129b0bebd10ee4e\":{\"Type\":14,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":\"11\",\"DisplayName\":\"客户地址\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"FSource\":{\"Type\":14,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":\"官网留言\",\"DisplayName\":\"客户来源\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"F0000006\":{\"Type\":14,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":\"普通客户\",\"DisplayName\":\"客户级别\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"F0000002\":{\"Type\":14,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":\"11\",\"DisplayName\":\"客户联系人\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"F0000003\":{\"Type\":14,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":\"11\",\"DisplayName\":\"联系电话\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"F0000005\":{\"Type\":26,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":[{\"UnitType\":4,\"FullName\":\"卢宗兴[$:LWCP_v1:$h+hEuPxiaZNWNbjrLRZdmg==]\",\"Birthday\":\"1753-01-01T00:00:00\",\"Gender\":0,\"EntryDate\":\"1753-01-01T00:00:00\",\"DepartureDate\":\"1753-01-01T00:00:00\",\"EmployeeNumber\":null,\"Title\":null,\"HomePhone\":null,\"OfficePhone\":null,\"QQ\":null,\"IdNumber\":null,\"EmployeeRank\":0,\"ProfilePhotoUrl\":\"\",\"DepartmentName\":\"穿云团队\",\"Password\":null,\"Mobile\":null,\"Email\":null,\"DingTalkAccount\":\"165643170521261215.dingf59c7dec662ad6b335c2f4657eb6378f\",\"DingId\":\"$:LWCP_v1:$h+hEuPxiaZNWNbjrLRZdmg==\",\"WeChatUserId\":null,\"Position\":null,\"ExtAttr\":\"{}\",\"ViceParentIds\":[],\"ParentIds\":[\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\"],\"ParentId\":\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\",\"CompanyId\":\"18f923a7-5a5e-426d-94ae-a55ad1a4b240\",\"Visibility\":7,\"State\":0,\"DomainType\":1,\"Name\":\"卢宗兴\",\"Description\":null,\"UnitId\":\"1b19dbc0-7ec0-404b-b7b5-21c95298230c\",\"Code\":\"$:LWCP_v1:$h+hEuPxiaZNWNbjrLRZdmg==\",\"ManagerId\":null,\"CreatedTime\":\"2018-04-27T11:41:12\",\"ModifiedTime\":\"2018-04-27T11:41:12\",\"SortKey\":0,\"Serialized\":true,\"ObjectId\":\"1b19dbc0-7ec0-404b-b7b5-21c95298230c\",\"ParentObjectId\":\"\",\"ParentPropertyName\":null,\"ParentIndex\":0,\"DirtyProperties\":[]}],\"DisplayName\":\"客户经理\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null},\"CreatedBy.FullName\":{\"Type\":14,\"Visible\":true,\"Editable\":false,\"Required\":false,\"Printable\":true,\"Value\":\"卢宗兴\",\"DisplayName\":\"CreatedBy.FullName\",\"DataDictItemValue\":null,\"ComputationRuleFields\":null,\"ComputationRule\":null,\"DisplayRuleFields\":null,\"DisplayRule\":null}},\"PrintConfig\":{\"PrintCompanyName\":true,\"PrintComment\":true,\"Printer\":true,\"PrintTime\":true,\"PrintQrCode\":true},\"Comments\":null,\"WorkItems\":null,\"RequestParameters\":{\"SchemaCode\":\"D000030Custmer\",\"BizObjectId\":\"420c0516-9333-4465-aeb8-0b8725a82148\",\"Mode\":\"View\",\"IsExternalForm\":\"False\"},\"QrCodeUrl\":\"https://www.h3yun.com/mobile/?CorpId=dingf59c7dec662ad6b335c2f4657eb6378f\u0026sc=D000030Custmer\u0026bo=420c0516-9333-4465-aeb8-0b8725a82148\u0026mt=Task\u0026IsIsv=1\u0026sk=suitefcoyqxthbd1xwjiu\u0026ao=1\",\"Successful\":true,\"IsMobile\":false,\"Errors\":[],\"Message\":\"\",\"Infos\":[],\"DebugTrack\":null,\"ChangeSet\":null,\"IsExternalForm\":false,\"ExternalFormUrl\":null,\"RecentChange\":{\"FormDataType\":2,\"FormMode\":4,\"SchemaDisplayName\":\"客户\"}}","DisplayName":"客户","Mode":"View","OwnerDeptId":"OwnerDeptId"}}
                                    if (result.Successful) {
                                    var displayName = result.ReturnData.DisplayName;
                                    var isDelete = result.ReturnData.IsDelete;
                                    OwnerDeptId_Name = result.ReturnData.OwnerDeptId;

                                    $("title").html("氚云 - " + result.ReturnData.DisplayName);
                                    top.$.ISideModal.SetTile(displayName);

                                    if (result.ReturnData.RuntimeContent) {
                                        $.SheetRuntimeContentCache.Set(requestData["SchemaCode"], result.ReturnData.RuntimeContent, result.ReturnData.TimeStamp, result.ReturnData.Javascript, "form", engineCode);
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
                                        $("span.navbar-head").text(result.ReturnData.DisplayName + "-");
                                        $("#navarbarSheetName").text(result.ReturnData.Name);
                                    }

                                    $("a.navbar-brand").attr("title", result.ReturnData.DisplayName + "-" + result.ReturnData.Name);
                                    /*下面的处理方式有问题，无法过滤掉所有情况*/
                                    var jsonResponseContext = {};
                                    var responseContext = result.ReturnData.ResponseContext;
                                    try {
                                        responseContext = responseContext.replace(/\\\\/g, "\\").replace(/\\'/g, "\'");
                                        jsonResponseContext = JSON.parse(responseContext);
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
                                    var isDelete = result.ReturnData.IsDelete;
                                    if (isDelete) {
                                        ErrorHandler(result.ErrorMessage);
                                    }
                                }



                            }
                        })
                    });

                }
                    
                } ;

        function ErrorHandler(msg) {
            if (window.parent) {
                window.parent.$.IShowError(msg.replace("\r\n", "\\r\\n"));
                window.parent.$.ISideModal.CloseLastModal();
            }
        }
    </script>


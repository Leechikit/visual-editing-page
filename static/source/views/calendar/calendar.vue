<template>
<div>
    <div class="form-horizontal myform-horizontal" style="display:none">
        <div class="form-group myform-group">
            <div class="text-center" style="display:none" id="myMore">
                <div class="btn-group" role="group">
                    <a href="javascript:void(0);" id="toggleSearch" style="color:#4a535e">
                        <i class="icon-arrow-up-double-b" style="color:#e5e6e6;"></i>
                    </a>
                </div>
            </div>
            <div class="pull-right" id="myMode" style="min-width:80px;display:none">
                <select class="form-control selectmyform-control" id="toggleMode">
                    
                </select>
            </div>
            <div class="pull-right" id="myfilter" style="min-width:80px;display:none">
                <select class="form-control selectmyform-control" id="scopeType"></select>
            </div>
            <div class="pull-right" id="mychildschemacode" style="min-width:80px;display:none">
                <select class="form-control selectmyform-control" style="" id="showchildschemacode">
                    <option value="">主表</option>
                </select>
            </div>
        </div>
    </div>
    <div id="ListView"></div>
</div>
</template>



<script>
    import './Scripts/plugins/jquery.js'
    //import './bundles/layout.js'
    import './Scripts/plugins/growinglo/growingIo.js'
    import {LoadControlJSCSS,InitData} from "./bundles/AppIndex.js"
    import './Scripts/plugins/require.min.js'

    import "./Scripts/plugins/bootstrap-calendar/underscore-min.js"
    import  "./Scripts/plugins/bootstrap-calendar/jstz.min.js" 
    import        "./Scripts/plugins/bootstrap-calendar/language/zh-CN.js"
    import         "./Scripts/plugins/bootstrap-calendar/calendar.js" 
    import        "./Scripts/h3/FormList/CalendarMode.js"

    export default {
        name: 'calendar-yun',
        data () {
            return {
                //
            };
        },
        props:['code'],
        mounted () {

            var version = "201812270001";

            var constName = {
                QueryCode: "",
                ShowMode: "",
                LoadViewName: "LoadView",
                ResponseName: "Response",
                CommandName: "Command",
                QueryCodeName: "QueryCode",
                resultName: "result",
                SolutionStateName: "SolutionState",
                EngineCodeName: "EngineCode",
                TitleName: "Title",
                DisplayModeName: "DisplayMode",
                SchemaName: "Schema",
                QueryDefaultValuesName: "QueryDefaultValues",
                UnitSelectionRangesName: "UnitSelectionRanges",
                ChildSchemaCodesName: "ChildSchemaCodes",
                QueryItemsName: "QueryItems",
                GetListScopeTypesName: "GetListScopeTypes",
                VisibleCounterName: "visibleCounter",
                EngineCode: ""
            };
            var mySchemaCode;
            var ChildSchemaCodes = "";
            var PropertyName_ObjectId = "ObjectId";
            var OwnerDeptId_Name = "OwnerDeptId" + "_Name";
            var QueryDefaultValues = {}, UnitSelectionRanges = {};
            var QueryItems;
            var AdressCache;
            constName.QueryCode = mySchemaCode = getUrlParam('id');
            constName.ShowMode = getUrlParam('mode');
            constName.EngineCode = "o3and2j65xolcv0ipmhht2lf1";
            $.SheetRuntimeContentCache.Init(constName.EngineCode);
            var ListCacheItem = $.SheetRuntimeContentCache.Get(constName.QueryCode, "list");
            var timeStamp = -1;
            var javascript;
            if (ListCacheItem && ListCacheItem[$.SheetRuntimeContentCache.ListJavaScriptName]) {
                timeStamp = ListCacheItem[$.SheetRuntimeContentCache.TimeStampName] - 0;
                javascript = ListCacheItem[$.SheetRuntimeContentCache.ListJavaScriptName];
            }



            var ViewContext ={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"Response":{"SchemaCode":"D0008860000C4","DisplayName":"商机","Axis":"CreatedTime","AxisSortDirection":1,"SortBy":"CreatedTime","SortDirection":1,"DisplayMode":1,"Selectable":true,"Javascript":null,"QueryItems":[{"PropertyName":"CreatedTime","PropertyName_FilterValue":"FilterValue","FilterValue":"","PropertyName_DefaultValue":"DefaultValue","DefaultValue":"","PropertyName_OrganizationType":"OrganizationType","OrganizationType":2,"PropertyName_AllowNull":"AllowNull","AllowNull":true,"PropertyName_Visible":"Visible","Visible":true,"Serialized":true,"ObjectId":"4dbe0d41-540a-49dd-b09c-e3cd3b4dea0e","ParentObjectId":"2790159f-9b81-4613-82fb-47a1c6d529de","ParentPropertyName":"QueryItems","ParentIndex":0,"DirtyProperties":[]}],"Actions":{"Create":{"Action":"Create","Icon":"fa-plus","Text":"新增","IsPrintAction":false,"PrintTemplateCode":"","SortKey":0,"CommentConfig":null},"Import":{"Action":"Import","Icon":" fa-download","Text":"导入","IsPrintAction":false,"PrintTemplateCode":"","SortKey":0,"CommentConfig":null},"Export":{"Action":"Export","Icon":" fa-upload","Text":"导出","IsPrintAction":false,"PrintTemplateCode":"","SortKey":0,"CommentConfig":null},"Remove":{"Action":"Remove","Icon":" fa-times","Text":"删除","IsPrintAction":false,"PrintTemplateCode":"","SortKey":0,"CommentConfig":null},"PrintQrCode":{"Action":"PrintQrCode","Icon":" fa-qrcode","Text":"打印二维码","IsPrintAction":false,"PrintTemplateCode":"","SortKey":0,"CommentConfig":null}},"Columns":{"Name":{"Code":"Name","DisplayName":"数据标题","Visible":true,"Sortable":false,"Url":"/Form/DefaultSheet/D0008860000C4?SchemaCode=D0008860000C4\u0026BizObjectId={ObjectId}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"CreatedBy":{"Code":"CreatedBy","DisplayName":"创建人ID","Visible":false,"Sortable":false,"Url":"/Account/Setting/{CreatedBy}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"CreatedBy_Name":{"Code":"CreatedBy_Name","DisplayName":"创建人","Visible":false,"Sortable":false,"Url":"/Account/Setting/{CreatedBy}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"OwnerId":{"Code":"OwnerId","DisplayName":"拥有者ID","Visible":false,"Sortable":false,"Url":"/Account/Setting/{OwnerId}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"OwnerId_Name":{"Code":"OwnerId_Name","DisplayName":"拥有者","Visible":false,"Sortable":false,"Url":"/Account/Setting/{OwnerId}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"OwnerDeptId":{"Code":"OwnerDeptId","DisplayName":"所属部门ID","Visible":false,"Sortable":false,"Url":"/Account/Setting/{OwnerDeptId}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"OwnerDeptId_Name":{"Code":"OwnerDeptId_Name","DisplayName":"所属部门","Visible":false,"Sortable":false,"Url":"/Account/Setting/{OwnerDeptId}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"CreatedTime":{"Code":"CreatedTime","DisplayName":"创建时间","Visible":false,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"ModifiedTime":{"Code":"ModifiedTime","DisplayName":"修改时间","Visible":false,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000006":{"Code":"F0000006","DisplayName":"商机名称","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000007":{"Code":"F0000007","DisplayName":"商机来源","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000014":{"Code":"F0000014","DisplayName":"商机状态","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000009":{"Code":"F0000009","DisplayName":"预估金额","Visible":true,"Sortable":true,"Url":"","Align":"right","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000010":{"Code":"F0000010","DisplayName":"竞争对手","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000015":{"Code":"F0000015","DisplayName":"跟进人ID","Visible":false,"Sortable":false,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000015_Name":{"Code":"F0000015_Name","DisplayName":"跟进人","Visible":true,"Sortable":false,"Url":"/Account/Setting/{F0000015}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000012":{"Code":"F0000012","DisplayName":"发掘日期","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"D000886Fcfa9808d7ee74a63bc7e968809919588":{"Code":"D000886Fcfa9808d7ee74a63bc7e968809919588","DisplayName":"客户信息","Visible":false,"Sortable":false,"Url":"","Align":"center","IsChild":true,"IsLabel":false,"ChildColumns":{"F0000016":{"Code":"F0000016","DisplayName":"客户ID","Visible":false,"Sortable":false,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000016_Name":{"Code":"F0000016_Name","DisplayName":"客户","Visible":true,"Sortable":false,"Url":"/Form/DefaultSheet/D0008860000C2?SchemaCode=D0008860000C2\u0026BizObjectId={D000886Fcfa9808d7ee74a63bc7e968809919588.F0000016}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000017":{"Code":"F0000017","DisplayName":"客户分类","Visible":true,"Sortable":false,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""}},"ShowMode":0,"DecimalPlaces":""},"D000886F702a7f1530904bd1bb742f6c5116a5e3":{"Code":"D000886F702a7f1530904bd1bb742f6c5116a5e3","DisplayName":"联系人信息","Visible":false,"Sortable":false,"Url":"","Align":"center","IsChild":true,"IsLabel":false,"ChildColumns":{"F0000018":{"Code":"F0000018","DisplayName":"联系人ID","Visible":false,"Sortable":false,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000018_Name":{"Code":"F0000018_Name","DisplayName":"联系人","Visible":true,"Sortable":false,"Url":"/Form/DefaultSheet/D0008860000C3?SchemaCode=D0008860000C3\u0026BizObjectId={D000886F702a7f1530904bd1bb742f6c5116a5e3.F0000018}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000019":{"Code":"F0000019","DisplayName":"部门","Visible":true,"Sortable":false,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000020":{"Code":"F0000020","DisplayName":"职务","Visible":true,"Sortable":false,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},"F0000021":{"Code":"F0000021","DisplayName":"手机","Visible":true,"Sortable":false,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""}},"ShowMode":0,"DecimalPlaces":""},"F0000022":{"Code":"F0000022","DisplayName":"备注","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""}},"ReturnData":null,"DataCount":0,"StartTimePropertyName":null,"WorkflowState":null,"IconProperty":"","ListScopeType":0,"ChildSchemaCode":null,"PagedByParent":false,"RequireAssociatedBoHeaders":false,"TimeLineAxisDisplayFormat":null,"Successful":true,"IsMobile":false,"Message":"","Infos":[],"IsExternalForm":false,"IsExternalShare":false,"ExternalFormUrl":null,"RecentChange":null,"Errors":[],"DebugTrack":null,"ChangeSet":null},"QueryCode":"D0008860000C4","EngineCode":"o3and2j65xolcv0ipmhht2lf1","Title":"商机","DisplayMode":1,"QueryDefaultValues":"{}","UnitSelectionRanges":"{}","QueryItems":[{"PropertyName":"CreatedTime","DefaultValue":"","OrganizationType":2,"DisplayName":"创建时间","DataType":5,"DataDictItemName":"","OptionalValues":null,"itemValues":null,"IsBoReservedPropertiesOnly":true,"DisplayFormat":"","AssociationSchemaCode":"","UnitSelectRange":null,"SelectedValues":"","DateTimeMode":"","AllowNotNull":true,"FilterValue":"","Visible":true,"AssociationField":null}],"ChildSchemaCodes":"{\"D000886Fcfa9808d7ee74a63bc7e968809919588\":\"客户信息\",\"D000886F702a7f1530904bd1bb742f6c5116a5e3\":\"联系人信息\"}","GetListScopeTypes":[{"Key":4,"Value":"全部"},{"Key":5,"Value":"我部门的"},{"Key":0,"Value":"我的"}],"IsDevAndAdmin":false,"DefaultDisplayChildCode":"D000886F702a7f1530904bd1bb742f6c5116a5e3","OptionalDisplayMode":[0,1],"SortedColumns":[{"Code":"Name","DisplayName":"数据标题","Visible":true,"Sortable":false,"Url":"/Form/DefaultSheet/D0008860000C4?SchemaCode=D0008860000C4\u0026BizObjectId={ObjectId}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"CreatedBy","DisplayName":"创建人ID","Visible":false,"Sortable":false,"Url":"/Account/Setting/{CreatedBy}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"CreatedBy_Name","DisplayName":"创建人","Visible":false,"Sortable":false,"Url":"/Account/Setting/{CreatedBy}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"OwnerId","DisplayName":"拥有者ID","Visible":false,"Sortable":false,"Url":"/Account/Setting/{OwnerId}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"OwnerId_Name","DisplayName":"拥有者","Visible":false,"Sortable":false,"Url":"/Account/Setting/{OwnerId}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"OwnerDeptId","DisplayName":"所属部门ID","Visible":false,"Sortable":false,"Url":"/Account/Setting/{OwnerDeptId}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"OwnerDeptId_Name","DisplayName":"所属部门","Visible":false,"Sortable":false,"Url":"/Account/Setting/{OwnerDeptId}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"CreatedTime","DisplayName":"创建时间","Visible":false,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"ModifiedTime","DisplayName":"修改时间","Visible":false,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"F0000006","DisplayName":"商机名称","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"F0000007","DisplayName":"商机来源","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"F0000014","DisplayName":"商机状态","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"F0000009","DisplayName":"预估金额","Visible":true,"Sortable":true,"Url":"","Align":"right","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"F0000010","DisplayName":"竞争对手","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"F0000015","DisplayName":"跟进人ID","Visible":false,"Sortable":false,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"F0000015_Name","DisplayName":"跟进人","Visible":true,"Sortable":false,"Url":"/Account/Setting/{F0000015}","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"F0000012","DisplayName":"发掘日期","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""},{"Code":"F0000022","DisplayName":"备注","Visible":true,"Sortable":true,"Url":"","Align":"left","IsChild":false,"IsLabel":false,"ChildColumns":null,"ShowMode":0,"DecimalPlaces":""}],"TimeStamp":1547026849000}}
            if (!ViewContext.Successful) {
                    $.IShowError({ title: "提示", msg: "出错了", detail: ViewContext.ErrorMessage });
                    return false;
                }

                //window.document.title = "氚云 - " + ViewContext.ReturnData.Title;
                if (ViewContext.ReturnData.Response.Javascript) {
                    javascript = ViewContext.ReturnData.Response.Javascript;
                    $.SheetRuntimeContentCache.Set(constName.QueryCode, "", ViewContext.ReturnData.TimeStamp, ViewContext.ReturnData.Response.Javascript, "list", constName.EngineCode);
                }
                ViewContext.ReturnData.Response.Javascript = javascript;
                //动态加载列表、日历jscss
                try {
                    QueryDefaultValues = JSON.parse(ViewContext.ReturnData.QueryDefaultValues);
                } catch (e) { }
                try {
                    UnitSelectionRanges = JSON.parse(ViewContext.ReturnData.UnitSelectionRanges);
                } catch (e) { }
                console.log(window)
                console.log($)
                console.log(this)
                LoadControlJSCSS(ViewContext, InitData, version);

                AdressCache = ViewContext.ReturnData.AdressCache;
                //OptionalDisplayModes
                //可选模式
                var optionalDisplayMode = [];
                if (ViewContext.ReturnData.OptionalDisplayMode == null) {
                    for (var key in $.ListView.ListViewDisplayMode) {
                        optionalDisplayMode.push($.ListView.ListViewDisplayMode[key]);
                    }
                } else {
                    optionalDisplayMode = ViewContext.ReturnData.OptionalDisplayMode;
                }
                var opt = "";
                for (var i = 0; i < optionalDisplayMode.length; i++) {
                    switch (optionalDisplayMode[i]) {
                        case 0:
                            opt += "<option value='0'>列表</option>";
                            break;
                        case 1:
                            opt += "<option value='1'>日历</option>";
                            break;
                        case 2:
                            opt += "<option value='2'>时间轴</option>";
                            break;
                        default:
                    }
                }
                $("#toggleMode").append(opt);

                var selectedMode = constName.ShowMode || ViewContext.ReturnData.DisplayMode;
                $("#toggleMode").find("option[value='" + selectedMode + "']").attr("selected", true);

                //GetListScopeTypes
                if (ViewContext.ReturnData.GetListScopeTypes != null) {
                    try {
                        var scopeTypes = ViewContext.ReturnData.GetListScopeTypes;
                        $("#myfilter").show();
                        var scopeType = $("#scopeType");
                        for (var i = 0; i < scopeTypes.length; i++) {
                            var item = scopeTypes[i];
                            var op = '<option value="' + item.Key + '">' + item.Value + '</option>';
                            scopeType.append(op)
                        }

                    } catch (e) { }
                }
                //ChildSchemaCodes
                if (ViewContext.ReturnData.ChildSchemaCodes != null) {
                    try {
                        var ChildSchemaCodes = JSON.parse(ViewContext.ReturnData.ChildSchemaCodes);
                        var $showchildschemacode = $("#showchildschemacode");
                        for (var c in ChildSchemaCodes) {
                            var op = '<option value="' + c + '">' + ChildSchemaCodes[c] + '</option>';
                            $showchildschemacode.append(op)
                        }
                        $showchildschemacode.val(ViewContext.ReturnData.DefaultDisplayChildCode);
                        if (constName.ShowMode != ListViewDisplayMode.Calendar) {
                            $("#mychildschemacode").show();
                        }
                    } catch (e) { }
                }

        }
    };
    
    function ErrorHandler(msg) {
        if (window.parent) {
            window.parent.$.IShowError(msg.replace("\r\n", "\\r\\n"));
            window.parent.$.ISideModal.CloseLastModal();
        }
    }

    function getUrlParam(paramName) {
        var ParamValue = "";
        var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)")
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            ParamValue = unescape(r[2]);
        }
        return ParamValue;
    }
    </script>

    
    
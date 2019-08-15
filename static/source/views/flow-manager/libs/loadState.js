/// <reference path="Activity.js" />
/// <reference path="ActivityDrag.js" />
/// <reference path="ActivityDock.js" />
/// <reference path="ActivityModel.js" />
/// <reference path="Line.js" />
/// <reference path="misc.js" />
/// <reference path="Workflow.js" />
/// <reference path="WorkflowDocument.js" />
/// <reference path="Package.js" />
/// <reference path="TraceManager.js" />
/// <reference path="Property.js" />

import './misc'
import { WorkflowMode, WorkflowDocument } from './WorkflowDocument'
import { WorkflowSettings, WorkflowStyleClassName, Workflow} from './Workflow'
import { ActivityModelInit } from './ActivityModel'

let loadState = function(appRunId, callback) {
    let workflow = undefined;
    let svg = undefined;
    let body;
    let layout;
    let wp;
    let thumbnail_container;
    let console = window.console || { log: function (t) { } };
    let WorkflowInstance = null;
    let workflowMode = undefined;
    let ActivityTemplateConfigs = undefined;
    let WorkflowTemplate;
    let WorkItems;
    let UserViewUrl;
    let WorkflowHandlerUrl;
    let ExceptionActivities;
    let _WorkflowDesigner_GlobalString = undefined;

    //加载脚本
    let WorkflowScripts = [
        //流程图
        //    "Workflow.js",
        //    //活动
        //    "Activity.js",
        //    //线条
        //    "Line.js",
        //    //拖拽
        //    "ActivityDrag.js",
        //    //活动模板
        //    "ActivityModel.js",
        ////活动格式
        //"ActivityStyle.js",
        ////杂项
        //"misc.js"
    ]

    //脚本加载完成后事件
    let loadFinished = function () {
        if (workflowMode == WorkflowMode.Designer) {
            //初始化流程操作按钮
            $("#ToolBar").AspLinkToolBar({
                items: [
                    { id: "btnSave", text: "保存", click: function (item) { WorkflowDocument.SaveWorkflow(); }, icon: "save" },
                    { id: "btnSave", text: "校验", click: function (item) { WorkflowDocument.FullValidateWorkflow(); }, icon: "Validate" },
                    { id: "btnSave", text: "发布", click: function (item) { WorkflowDocument.PublishWorkflow(); }, icon: "Publish" },
                    //{ id: "btnImport", text: "导入", click: function (item) { WorkflowDocument.ImportWorkflow(); }, icon: "table" },
                    //{ id: "btnExport", text: "导出", click: function (item) { WorkflowDocument.ExportWorkflow(); }, icon: "table" },
                    { id: "btnSaveAsImage", text: "存为图片", click: function (item) { WorkflowDocument.SaveAsImage(); }, icon: "fa fa-picture-o" },
                    //{ line: true },
                    { id: "btnHeight", text: "等高度", icon: "SameHeight", click: function (item) { workflow.setSameStyle(WorkflowSettings.SameStyle.Height); } },
                    { id: "btnWidth", text: "等宽度", icon: "SameWidth", click: function (item) { workflow.setSameStyle(WorkflowSettings.SameStyle.Width); } },
                    { id: "btnSize", text: "等大小", icon: "SameSize", click: function (item) { workflow.setSameStyle(WorkflowSettings.SameStyle.Size); } },
                    { id: "btnVertical", text: "竖排等距", icon: "VEqual", click: function (item) { workflow.setSameStyle(WorkflowSettings.SameStyle.VerticalDistance); } },
                    { id: "btnHorizontal", text: "横排等距", icon: "HEqual", click: function (item) { workflow.setSameStyle(WorkflowSettings.SameStyle.HorizontalDistance); } },
                    { id: "btnUndo", text: "撤销", icon: "Undo", click: function (item) { TraceManager.Undo(); } },
                    { id: "btnRedo", text: "重做", icon: "Redo", click: function (item) { TraceManager.Redo(); } }
                ]
            });

            //提示文字
            $("[toolbarid=btnUndo]").css("overflow", "visible").attr("title", "撤销(Ctrl+Z)")
            $("[toolbarid=btnRedo]").css("overflow", "visible").attr("title", "重做(Ctrl+Y)")

            //显示痕迹
            $("[toolbarid=btnUndo]").append("<ul id='ulPrevTraces'></ul>");
            $("[toolbarid=btnRedo]").append("<ul id='ulNextTraces'></ul>");
        }

        body = $("body:first");
        //流程模板对象
        workflow = new Workflow(`div.workspace`, workflowMode);

        ////线条画布对象
        //svg = $("svg:first");
        //如果支持SVG
        //ERROR:For Debug
        //使用Svg
        workflow.UtilizeSvg = true;
        svg = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
            .addClass("workspace_svg")
            .attr("version", "1.1");
        svg.css("width", "100%").css("height", "100%");
        workflow.svg = svg
        $(workflow.workspace).children(":first").before(svg);

        if (workflowMode == WorkflowMode.Designer || workflowMode == WorkflowMode.ViewWithProperty) {
            layout = $("#divDesigner").ligerLayout({ isRightCollapse: true, rightWidth: 380 });
            wp = new WorkflowProperty(layout, WorkflowDocument);
        }

        ActivityModelInit(ActivityTemplateConfigs);

        //宽和高
        $(workflow.workspace).width(WorkflowSettings.MinInnerWidth);
        $(workflow.workspace).height(WorkflowSettings.MinInnerHeight);

        //在流程图中添加点击时自动生成活动和线条的箭头
        if ($(workflow.workspace).find("." + WorkflowStyleClassName.WorkflowAotuArrow).length == 0) {
            var arrow = $("<div class='" + WorkflowStyleClassName.WorkflowAotuArrow + "'></div>");
            arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowLeft).appendTo(workflow.workspace);
            arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowUp).appendTo(workflow.workspace);
            arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowRight).appendTo(workflow.workspace);
            arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowDown).appendTo(workflow.workspace);
        }

        //在流程图中添加活动移动时对齐的线
        if ($(workflow.workspace).find("." + WorkflowStyleClassName.ActivityDockLine).length == 0) {
            //<div class="dock_line dock_line_horizontal dock_line_top"></div>
            var dockLine = $("<div class='" + WorkflowStyleClassName.ActivityDockLine + "' ></div>");
            var dockLine_horizontal = dockLine.clone().addClass(WorkflowStyleClassName.ActivityDockLineHorizontal);
            dockLine_horizontal.clone().addClass(WorkflowStyleClassName.ActivityDockLineTop).appendTo(workflow.workspace);
            dockLine_horizontal.clone().addClass(WorkflowStyleClassName.ActivityDockLineMiddle).appendTo(workflow.workspace);
            dockLine_horizontal.clone().addClass(WorkflowStyleClassName.ActivityDockLineBottom).appendTo(workflow.workspace);

            var dockLine_vertical = dockLine.clone().addClass(WorkflowStyleClassName.ActivityDockLineVertical);
            dockLine_vertical.clone().addClass(WorkflowStyleClassName.ActivityDockLineOffsetLeft).appendTo(workflow.workspace);
            dockLine_vertical.clone().addClass(WorkflowStyleClassName.ActivityDockLineCenter).appendTo(workflow.workspace);
            dockLine_vertical.clone().addClass(WorkflowStyleClassName.ActivityDockLineRight).appendTo(workflow.workspace);
        }

        if (typeof (WorkflowTemplate) != "undefined" && WorkflowTemplate) {
            WorkflowDocument.LoadWorkflow(workflow, WorkflowTemplate, WorkflowInstance, true);
        }
        else if ($.fn.getUrlParam("WorkflowCode")) {
            WorkflowDocument.InitWorkflow(decodeURI($.fn.getUrlParam("WorkflowCode")), workflow);
        }

        if (workflowMode == WorkflowMode.Designer || workflowMode == WorkflowMode.ViewWithProperty) {
            //显示流程标题
            WorkflowDocument.DisplayWorkflowFullName();
        }

        var outerContainerSize = {
            width: $(workflow.outerContainer).css("width"),
            height: $(workflow.outerContainer).css("height")
        }

        //开发人员预留接口,在流程加载完成后执行
        if (typeof (LoadWorflowFinished) == "function") {
            LoadWorflowFinished();
        }

        if (workflowMode == WorkflowMode.Designer) {
            thumbnail_container = $(".div-thumbnail");
        }
        // var _MonitorWorkflowSize = function () {
        //     //活动拖动\调整大小时不处理
        //     if (!ActivityDragStack.IsDragging && !ActivityResizeStack.Resizing
        //         && (!WorkflowEventStack.CurrentMultiAction || WorkflowEventStack.CurrentMultiAction == WorkflowMultiActionType.None)
        //         && $(workflow.workspace).is(":visible")) {
        //         if (outerContainerSize.width != $(workflow.outerContainer).css("width") || outerContainerSize.height != $(workflow.outerContainer).css("height")) {
        //             outerContainerSize.width = $(workflow.outerContainer).css("width");
        //             outerContainerSize.height = $(workflow.outerContainer).css("height");
        //             workflow.autoFit();
        //             //更新缩略图
        //             if (typeof (TraceManager) != "undefined" && TraceManager.UpdateThumbnail)
        //                 TraceManager.UpdateThumbnail();
        //         }
        //     }
        //     setTimeout(_MonitorWorkflowSize, 200);
        // }
        //
        // //监控流程设计区域大小变化
        // setTimeout(_MonitorWorkflowSize, 200);
    }
    let scriptIndex = 0;
    let BizObjectId = $.fn.getUrlParam("BizObjectId");
    let WorkItemID = $.fn.getUrlParam("WorkItemId");
    let WorkflowCode = $.fn.getUrlParam("WorkflowCode");
    let InstanceId = $.fn.getUrlParam("InstanceId");
    if (WorkflowCode == null)
        WorkflowCode = " ";
    let WorkflowVersion = $.fn.getUrlParam("WorkflowVersion");
    if (WorkflowVersion == null)
        WorkflowVersion = -1;

    let loadJs = function () {
        $.ajax({
            url: "/ctg-workflow/act/model/getWorkflowDesinStatus",
            dataType: "json",
            type: "POST",
            data: { appRunId: appRunId },
            success: function (data) {
                // var res = require('./Init.json')
                // var jsonStr = JSON.stringify(res)
                // var json = JSON.parse(jsonStr)
                // var data = json.ReturnData.Data;
                callback(data.ReturnData.startProcess)
                if(!data.ReturnData.startProcess) {
                    return
                }
                var data = data.ReturnData.datas;
                if (data.ActivityTemplateConfigs != null)
                    ActivityTemplateConfigs = data.ActivityTemplateConfigs.Data;
                if (data.WorkflowTemplate != null)
                    WorkflowTemplate = data.WorkflowTemplate.Data;
                if (data.WorkItems != null)
                    WorkItems = data.WorkItems.Data;
                if (data.WorkflowInstance != null)
                    WorkflowInstance = data.WorkflowInstance.Data;
                if (data.UserViewUrl != null)
                    UserViewUrl = data.UserViewUrl.Data;
                if (data.WorkflowHandlerUrl != null)
                    WorkflowHandlerUrl = data.WorkflowHandlerUrl.Data;
                if (data.ExceptionActivities != null)
                    ExceptionActivities = data.ExceptionActivities.Data;
                if (scriptIndex < WorkflowScripts.length)
                    $.ajax({
                        url: "~/Scripts/H3/WFDesigner/designer/" + WorkflowScripts[scriptIndex],
                        cache: true,
                        dataType: "script",
                        success: function (a, b, c) {
                            scriptIndex++;
                            loadJs();
                        },
                        error: function (a, b, c) {
                        }
                        //success: loadJs
                    });
                else
                    $(function () {
                        //获取本地化字符串
                        var _WorkflowDesigner_params = "Activity_SaveSuccess,Activity_SaveFailed,ActivityEvent_Set,ContextMenu_Attribute,ContextMenu_SetTemplate,"
                            + "DataItem_ChooseDataItem,DataItem_Confirm,Formula_FunctionName,Formula_NoClosed,Formula_TestFailed,"
                            + "FormulaEditable_EditFormul,Package_Failed,Package_Mssg,Porperty_LeftKey,Porperty_Activity,Porperty_WokflowTempalte,"
                            + "Porperty_Line,Porperty_Attribute,Porperty_More,Poeperty_One,Workflow_StratNode,Workflow_EndNode,Workflow_Estimate,"
                            + "WorkflowDocument_Internal,WorkflowDocument_WorkflowName,WorkflowDocument_ActivityCode,WorkflowDocument_TestSuccessful,"
                            + "WorkflowDocument_TestFailed,WorkflowDocument_ConfirmRelease,WorkflowDocument_FailedRelease,WorkflowDocument_Playback,"
                            + "WorkflowDocument_FormartValid,WorkflowDocument_Specification,WorkflowDocument_ImportSuccessful,WorkflowDocument_ImportFailed,"
                            + "WorkflowDocument_FileFormart,WorkflowDocument_Mssg,WorkflowDocument_ExportSuccessful,WorkflowDocument_ExportFailed,"
                            + "WorkflowDocument_ViewPicture,WorkflowDocument_RefreshedSuccessful,WorkflowDocument_Empty,WorkflowTrace_AddActivity,"
                            + "WorkflowTrace_AddLine,WorkflowTrace_ChangeText,WorkflowTrace_ChangeTextSize,WorkflowTrace_ChangeTextColor,"
                            + "WorkflowTrace_ChangeLineText,WorkflowTrace_ChangeLineTextSize,WorkflowTrace_ChangeLineTextColor,WorkflowTrace_AdjustLine,"
                            + "WorkflowTrace_RemoveActivity,WorkflowTrace_RemoveLine,WorkflowTrace_ChangeActivitySize,WorkflowTrace_MoveActivity,"
                            + "WorkflowTrace_MoveActivityMulti,WorkflowTrace_ActivitySize,WorkflowTrace_ActivityColor,Button_Remove,Button_Cancel,"
                            + "Description,Msg_SaveSuccess,Msg_SaveFailed,WorkflowVersion,PortalPageManage_Design,Button_Heigth,Button_Width,"
                            + "Button_Size,Button_Vertical,Button_Horizontal";
                        $.ajax({
                            type: "POST",
                            url: "/ctg-workflow/act/module/listModule",
                            data: { PostData: JSON.stringify({ ActionName: 'GetLocalString', Code: _WorkflowDesigner_params})},
                            dataType: "json",
                            success: function () {
                                var res = require('./GetLocalString.json')
                                if (res.Successful) {
                                    var data = res.ReturnData.Data;
                                    if (data.IsSuccess) {
                                        _WorkflowDesigner_GlobalString = JSON.parse(data.TextObj);
                                        loadFinished();
                                    }
                                }
                            },
                        });

                    });
            },
            error: function () {
            }
        });

    }
    loadJs();
}

export default loadState

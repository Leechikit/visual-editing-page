
/// <reference path="Activity.js" />
/// <reference path="ActivityDrag.js" />
/// <reference path="ActivityDock.js" />
/// <reference path="ActivityModel.js" />
/// <reference path="Line.js" />
/// <reference path="misc.js" />
/// <reference path="Workflow.js" />
/// <reference path="WorkflowTrace.js" />
import { ActivityStyleClassName, ActivitySettings } from './Activity'

//活动模板
let ActivityModelSettings = {
    //活动模板定义的Xml
    ActivityModels: [],
    //活动模板DOM保存活动模板JS对象的属性名
    ActivityDataProperty: "ActivityModel",

    //.拖动事件的命名空间
    EventNameSpace: ".ActivityModelDraggable",

    GetActivityModelByType: function (_ActivityType) {
        if (ActivityModelSettings.ActivityModels) {
            return $(ActivityModelSettings.ActivityModels).filter(function () {
                return this.ActivityType == _ActivityType;
            })[0];
        }
    },

    GetActivityModelByTypeName: function (_ToolTipText) {
        if (ActivityModelSettings.ActivityModels) {
            return $(ActivityModelSettings.ActivityModels).filter(function () {
                return this.ToolTipText == _ToolTipText;
            })[0];
        }
    }
}

//活动模板的样式名称
let ActivityModelStyleClassName = {
    //活动模板放置的容器
    ActivityModelContainer: "model_container",

    //活动模板
    ActivityModel: "activity_model",
    //活动模板拖动样式
    ActivityModelDragProxy: "activity_model_proxy",
    //Logo所在的Div
    ActivityModelLogoDiv: "activity_model_logo",
    ////Logo图片
    //ActivityModelLogo: "activity_model_img",
    //Label
    ActivityModelLabel: "activity_model_label",

    //图标字体内容
    LogoFontContent: {
        "Start": "e751",
        "End": "e753",
        "FillSheet": "e7f8",
        "Approve": "e64c",
        "Circulate": "e7b4",
        "Notify": "e75c",
        "Connection": "e7cd",
        "Wait": "e68f",
        "BizAction": "e6d7",
        "SubInstance": "e700"
    }
}

//活动模板
//selector          :DOM对象选择器
let ActivityModel = function (_selector) {
    //DOM对象
    this.htmlObject = void 0;
    this.compatibleTypes = void 0;

    this.init(_selector);
    return this;
}

ActivityModel.prototype = {
    init: function (_selector) {
        this.htmlObject = $(_selector)[0];
        if (this.htmlObject) {
            //在DOM中保存当前模板
            $(this.htmlObject).data(ActivityModelSettings.ActivityDataProperty, this);
            this.initActions();
        }
    },

    initActions: function () {
        $(this.htmlObject).bind("mousedown" + ActivityModelSettings.EventNameSpace, function (e) {
            e.preventDefault();
            //左键
            if ($.fn.isOffsetLeftMouseDown(e)) {
                workflow.setMultiActionFlag(WorkflowMultiActionType.ModelDrag);

                //初始化设置
                ActivityModelDragStack = {};

                //edit by xc 拖出即生成节点 进行位置排序

                if ($(e.target).hasClass(ActivityModelStyleClassName.ActivityModel))
                    ActivityModelDragStack.DraggingActivityModel = $(e.target).data(ActivityModelSettings.ActivityDataProperty);
                else if ($(e.target).parents("." + ActivityModelStyleClassName.ActivityModel).length > 0)
                    ActivityModelDragStack.DraggingActivityModel = $(e.target).parents("." + ActivityModelStyleClassName.ActivityModel + ":first").data(ActivityModelSettings.ActivityDataProperty);

                if (!ActivityModelDragStack.DraggingActivityModel)
                    return;

                //拖动代理
                ActivityModelDragStack.DraggingProxy = $(ActivityModelDragStack.DraggingActivityModel.htmlObject).clone()
                    .addClass(ActivityModelStyleClassName.ActivityModelDragProxy)
                    .css("left", $(ActivityModelDragStack.DraggingActivityModel.htmlObject).offset().left)
                    .css("top", $(ActivityModelDragStack.DraggingActivityModel.htmlObject).offset().top)
                    .bind("mousedown" + ActivityModelSettings.EventNameSpace, function (e) { e.preventDefault(); })
                    .appendTo(body);

                //初始点
                ActivityModelDragStack.DragStartPoint = ActivityModelDragStack.LastDragPoint = {
                    x: e.pageX,
                    y: e.pageY
                }

                $("." + ActivityModelStyleClassName.ActivityModel).each(function (index) {
                    if (this == $(ActivityModelDragStack.DraggingActivityModel.htmlObject)[0])
                        ActivityModelDragStack.ModelType = index;
                });

                //$(document).bind("mousemove" + ActivityModelSettings.EventNameSpace, function (e) {
                //    $(ActivityModelDragStack.DraggingProxy).move({
                //        x: e.pageX - ActivityModelDragStack.LastDragPoint.x,
                //        y: e.pageY - ActivityModelDragStack.LastDragPoint.y
                //    });
                //    ActivityModelDragStack.LastDragPoint = {
                //        x: e.pageX,
                //        y: e.pageY
                //    }
                //});
                //$(document).one("mouseup" + ActivityModelSettings.EventNameSpace, function (e) {
                workflow.setMultiActionFlag(WorkflowMultiActionType.None);
                //放置在流程图内
                //if ($(ActivityModelDragStack.DraggingProxy).inRangeOf(workflow.workspace)
                //    || (e.pageX >= $(workflow.workspace).offset().left && e.pageX <= $(workflow.workspace).offset().left + $(workflow.workspace).outerWidth()
                //          && e.pageY >= $(workflow.workspace).offset().top && e.pageY <= $(workflow.workspace).offset().top + $(workflow.workspace).outerHeight())) {
                $(ActivityModelDragStack.DraggingProxy)
                    .css("left", $(ActivityModelDragStack.DraggingProxy).offset().left - $(workflow.workspace).innerOffsetLeft())
                    .css("top", $(ActivityModelDragStack.DraggingProxy).offset().top - $(workflow.workspace).innerTop())
                    .appendTo(workflow.workspace)
                    .removeClass(ActivityModelStyleClassName.ActivityModelDragProxy);
                $(ActivityModelDragStack.DraggingProxy).css("height",42);
                //保存活动
                var activity = workflow.addActivity(ActivityModelDragStack.DraggingProxy, ActivityModelDragStack.DraggingActivityModel);

                if (!activity.width || activity.width < ActivitySettings.MinOuterWidth) {
                    $(activity.htmlObject).outerWidth(ActivitySettings.MinOuterWidth);
                }
                if (!activity.height || activity.height < ActivitySettings.MinOuterHeight) {
                    $(activity.htmlObject).outerHeight(ActivitySettings.MinOuterHeight);
                }
                if (activity.left < ActivityMovingStack.WorkflowContentEdgeLeft)
                    $(activity.htmlObject).css("left", ActivityMovingStack.WorkflowContentEdgeLeft);
                if (activity.top < ActivityMovingStack.WorkflowContentEdgeTop)
                    $(activity.htmlObject).css("top", ActivityMovingStack.WorkflowContentEdgeTop);
                activity.savePosition();


                //初始化属性
                activity.getPropertyFromModel();

                workflow.autoFit();
                $(workflow.workspace).focus();

                TraceManager.AddTrace(TraceManager.TraceType.Activity.Add, activity);

                //设为唯一选中
                //activity.Select(true);
                //wp.DisplayProperties(activity);
                e.target = e.srcElement = $(activity.htmlObject).find("div.activity_model_label");
                activity.doDown(e);
                //第一次拖拽出操作栏，隐藏主本节点，显示副本节点
                $(activity.htmlObject).addClass("firstDragOut").find("input.display_edit").val(activity.DisplayName);//给文本框赋值，防止值丢失
                //}
                //else
                ////回转并消失
                //$(ActivityModelDragStack.DraggingProxy).animate(
                //    {
                //        "left": $(ActivityModelDragStack.DraggingProxy).css("left").parsePxToFloat() + ActivityModelDragStack.DragStartPoint.x - e.pageX,
                //        "top": $(ActivityModelDragStack.DraggingProxy).css("top").parsePxToFloat() + ActivityModelDragStack.DragStartPoint.y - e.pageY
                //    }, function () {
                //        $(ActivityModelDragStack.DraggingProxy).remove();
                //    });

                //$(document).unbind(ActivityModelSettings.EventNameSpace);
                //});
            }
        })
    }
}

//活动模板拖拽设置
let ActivityModelDragSettings = {
    //拖入时是否检测并停靠到活动
    Dockable: false
}

//活动模板拖拽栈
let ActivityModelDragStack = {
    //拖拽的模板JS对象
    DraggingActivityModel: void 0,
    //拖拽的副本
    DraggingProxy: void 0,

    //拖拽开始时鼠标的位置（相对于文档原点）
    DragStartPoint: {
        x: 0, y: 0
    },

    //记录计算过的最新的鼠标的位置（相对于文档原点）
    LastDragPoint: {
        x: 0, y: 0
    },
    //模板类型
    ModelType: void 0
}

//活动模板初始化
let ActivityModelInit = function (ActivityTemplateConfigs) {
    //加载模板定义
    if (ActivityTemplateConfigs && ActivityTemplateConfigs.length > 0) {
        //活动模板的容器
        var container = $("." + ActivityModelStyleClassName.ActivityModelContainer);

        var modelDiv = $("<div ></div>").addClass(ActivityModelStyleClassName.ActivityModel);
        var modelContent = $("<div><div>").addClass(ActivityStyleClassName.ActivityContent);
        //图标
        var logoDiv = $("<div></div>").addClass(ActivityModelStyleClassName.ActivityModelLogoDiv);
        modelContent.append(logoDiv);
        modelDiv.append(modelContent);

        //文字
        modelContent.append($("<div></div>").addClass(ActivityModelStyleClassName.ActivityModelLabel));
        //添加编辑框
        ActivityModelSettings.ActivityModels = [];

        //活动模板按SortKey排序
        ActivityTemplateConfigs.sort(function (a, b) {
            if (a && b && !isNaN(a.SortKey) && !isNaN(b.SortKey)) {
                return a.SortKey > b.SortKey;
            }
        });

        //初始化各模板
        $(ActivityTemplateConfigs).each(function () {
            if (this.ToolTipText) {
                //解析和初始化活动模板区域
                var currentModelHtml = modelDiv.clone();
                currentModelHtml.find("." + ActivityModelStyleClassName.ActivityModelLogoDiv).addClass("activity_logo_" + this.ToolTipText);
                currentModelHtml.find("." + ActivityModelStyleClassName.ActivityModelLogoDiv).attr("title", this.DisplayName);
                var label = currentModelHtml.find("." + ActivityModelStyleClassName.ActivityModelLabel);
                label.text(this.DisplayName);
                //添加隐藏编辑框
                var $input = $('<input type="text"  class="display_edit" style="display:none;"/>');
                label.append($input);

                currentModelHtml.appendTo(container);

                var activitymodel = new ActivityModel(currentModelHtml);
                ActivityModelSettings.ActivityModels.push(activitymodel);

                //隐藏开始、结束
                if (this.ToolTipText == "Start") {
                    currentModelHtml.hide();
                    currentModelHtml.addClass("ActivityStart");
                } else if (this.ToolTipText == "End") {
                    currentModelHtml.hide();
                    currentModelHtml.addClass("ActivityEnd");
                }

                $.extend(activitymodel, activitymodel, this);
                activitymodel.ToolTipText = this.ToolTipText;
            }
        });
    }
}

export {
    ActivityModelSettings,
    ActivityModelStyleClassName,
    ActivityModel,
    ActivityModelDragSettings,
    ActivityModelDragStack,
    ActivityModelInit
}

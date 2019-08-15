import {WorkflowMultiActionType} from '../setting';
import {ActivityStyleClassName, ActivityModelSettings,
    ActivityModelStyleClassName, ActivityModelDragStack, 
    ActivitySettings,ActivityMovingStack} from './setting';
import {TraceManager} from '../workflowTrace';

//活动模板
//selector          :DOM对象选择器
export const ActivityModel = function (_selector) {
    //DOM对象
    this.htmlObject = void 0;
    this.compatibleTypes = void 0;

    this.init(_selector);
    return this;
};

export const TooltipTexts={
    FillSheet:'只能提交数据，提交后进入下一节点',
    Approve:'可同意或驳回流程',
    Circulate:'可提醒相关人员查看流程进度或流程处理结果',
    Connection: '多个节点均处理完成后才能进入下一节点的场景，可用汇合点来实现',
    SubInstance: '可在当前流程中创建另外一个流程',
    Line: '用于连接节点，标识流程走向'
}

ActivityModel.prototype = {
    init: function (_selector) {
        this.htmlObject = $(_selector)[0];
        if (this.htmlObject) {
            //在DOM中保存当前模板
            $(this.htmlObject).data(ActivityModelSettings.ActivityDataProperty, this);
            this.initActions(GlobalWorkflowProperties.Workflow);
        }
    },

    initActions: function () {
        $(this.htmlObject).bind('mousedown' + ActivityModelSettings.EventNameSpace, function (e) {
            e.preventDefault();
            //左键
            var _workflow=GlobalWorkflowProperties.Workflow;
            if ($.fn.isOffsetLeftMouseDown(e)) {
                _workflow.setMultiActionFlag(WorkflowMultiActionType.ModelDrag);

                //初始化设置
                if ($(e.target).hasClass(ActivityModelStyleClassName.ActivityModel))
                    ActivityModelDragStack.DraggingActivityModel = $(e.target).data(ActivityModelSettings.ActivityDataProperty);
                else if ($(e.target).parents('.' + ActivityModelStyleClassName.ActivityModel).length > 0)
                    ActivityModelDragStack.DraggingActivityModel = $(e.target).parents('.' + ActivityModelStyleClassName.ActivityModel + ':first').data(ActivityModelSettings.ActivityDataProperty);

                if (!ActivityModelDragStack.DraggingActivityModel){
                    return;
                }
                    

                //拖动代理
                ActivityModelDragStack.DraggingProxy = $(ActivityModelDragStack.DraggingActivityModel.htmlObject).clone()
                    .addClass(ActivityModelStyleClassName.ActivityModelDragProxy)
                    .css('left', $(ActivityModelDragStack.DraggingActivityModel.htmlObject).offset().left)
                    .css('top', $(ActivityModelDragStack.DraggingActivityModel.htmlObject).offset().top)
                    .bind('mousedown' + ActivityModelSettings.EventNameSpace, function (e) { e.preventDefault(); })
                    .appendTo(document.body);

                //初始点
                ActivityModelDragStack.DragStartPoint = ActivityModelDragStack.LastDragPoint = {
                    x: e.pageX,
                    y: e.pageY
                }

                $('.' + ActivityModelStyleClassName.ActivityModel).each(function (index) {
                    if (this == $(ActivityModelDragStack.DraggingActivityModel.htmlObject)[0])
                        ActivityModelDragStack.ModelType = index;
                });

                
                $(document).bind("mousemove" + ActivityModelSettings.EventNameSpace, function (e) {
                    $(ActivityModelDragStack.DraggingProxy).move({
                        x: e.pageX - ActivityModelDragStack.LastDragPoint.x,
                        y: e.pageY - ActivityModelDragStack.LastDragPoint.y
                    });
                    ActivityModelDragStack.LastDragPoint = {
                        x: e.pageX,
                        y: e.pageY
                    }
                });

                 $(document).one("mouseup" + ActivityModelSettings.EventNameSpace, function (e) {
                    if ($(ActivityModelDragStack.DraggingProxy).inRangeOf(_workflow.workspace)
                    || (e.pageX >= $(_workflow.workspace).offset().left && e.pageX <= $(_workflow.workspace).offset().left + $(_workflow.workspace).outerWidth()
                         && e.pageY >= $(_workflow.workspace).offset().top && e.pageY <= $(_workflow.workspace).offset().top + $(_workflow.workspace).outerHeight())) {
                            _workflow.setMultiActionFlag(WorkflowMultiActionType.None);
                            //放置在流程图内
                            $(ActivityModelDragStack.DraggingProxy)
                                .css('left', $(ActivityModelDragStack.DraggingProxy).offset().left - $(_workflow.workspace).innerOffsetLeft())
                                .css('top', $(ActivityModelDragStack.DraggingProxy).offset().top - $(_workflow.workspace).innerTop())
                                .appendTo(_workflow.workspace)
                                .removeClass(ActivityModelStyleClassName.ActivityModelDragProxy);
                            $(ActivityModelDragStack.DraggingProxy).css('height',20);
                            //保存活动
                            var activity = _workflow.addActivity(ActivityModelDragStack.DraggingProxy, ActivityModelDragStack.DraggingActivityModel);
            
                            if (!activity.width || activity.width < ActivitySettings.MinOuterWidth) {
                                $(activity.htmlObject).outerWidth(ActivitySettings.MinOuterWidth);
                            }
                            if (!activity.height || activity.height < ActivitySettings.MinOuterHeight) {
                                $(activity.htmlObject).outerHeight(ActivitySettings.MinOuterHeight);
                            }
                            if (activity.left < ActivityMovingStack.WorkflowContentEdgeLeft)
                                $(activity.htmlObject).css('left', ActivityMovingStack.WorkflowContentEdgeLeft);
                            if (activity.top < ActivityMovingStack.WorkflowContentEdgeTop)
                                $(activity.htmlObject).css('top', ActivityMovingStack.WorkflowContentEdgeTop);
                            activity.savePosition();
            
            
                            //初始化属性
                            activity.getPropertyFromModel();
            
                            _workflow.autoFit();
                            $(_workflow.workspace).focus();
                            GlobalWorkflowProperties.VM.setUndo();
                            TraceManager.AddTrace(TraceManager.TraceType.Activity.Add, activity);
            
                            //设为唯一选中
                            
                            e.target = e.srcElement = $(activity.htmlObject).find('div.activity_model_label');
                            activity.doDown(e);
                            //第一次拖拽出操作栏，隐藏主本节点，显示副本节点
                            $(activity.htmlObject).addClass('firstDragOut').find('input.display_edit').val(activity.DisplayName);//给文本框赋值，防止值丢失
                            
                    } 
                    else{
                    //回转并消失
                        $(ActivityModelDragStack.DraggingProxy).animate(
                        {
                            "left": $(ActivityModelDragStack.DraggingProxy).css("left").parsePxToFloat() + ActivityModelDragStack.DragStartPoint.x - e.pageX,
                            "top": $(ActivityModelDragStack.DraggingProxy).css("top").parsePxToFloat() + ActivityModelDragStack.DragStartPoint.y - e.pageY
                        }, function () {
                            $(ActivityModelDragStack.DraggingProxy).remove();
                        });
        
                       
                        
                    }
                    $(document).unbind(ActivityModelSettings.EventNameSpace);

                 });
            }
        })
    }
};

//活动模板初始化
export const ActivityModelInit = function (activityTemplateConfigs) {
    //加载模板定义
    if (activityTemplateConfigs && activityTemplateConfigs.length > 0) {
        //活动模板的容器
        var container = $('.' + ActivityModelStyleClassName.ActivityModelContainer);

        var modelDiv = $('<div ></div>').addClass(ActivityModelStyleClassName.ActivityModel);
        var modelContent = $('<div></div>').addClass(ActivityStyleClassName.ActivityContent);
        //图标
        var logoDiv = $('<span></span>').addClass(ActivityModelStyleClassName.ActivityModelLogoDiv);
        modelDiv.append(modelContent);
        modelContent.append(logoDiv);
        //文字
        modelContent.append($('<span></span>').addClass(ActivityModelStyleClassName.ActivityModelLabel));
        //添加编辑框
        ActivityModelSettings.ActivityModels = [];

        //活动模板按SortKey排序
        activityTemplateConfigs.sort(function (a, b) {
            if (a && b && !isNaN(a.SortKey) && !isNaN(b.SortKey)) {
                return a.SortKey > b.SortKey;
            }
        });

        //初始化各模板
        $(activityTemplateConfigs).each(function () {
            if (this.ToolTipText) {
                //解析和初始化活动模板区域
                var currentModelHtml = modelDiv.clone();
                currentModelHtml.find('.' + ActivityModelStyleClassName.ActivityModelLogoDiv).addClass('activity_logo_' + this.ToolTipText);
                currentModelHtml.find('.' + ActivityModelStyleClassName.ActivityModelLogoDiv).attr('title', this.DisplayName);
                var label = currentModelHtml.find('.' + ActivityModelStyleClassName.ActivityModelLabel);
                if(this.DisplayName ==='手工'){
                    this.DisplayName='经办节点';
                }else if(this.DisplayName==='审批'){
                    this.DisplayName='审批节点';
                }else if(this.DisplayName ==='传阅'){
                    this.DisplayName='抄送节点';
                }else if(this.DisplayName ==='连接点'){
                    this.DisplayName='汇合点';
                }
                label.text(this.DisplayName);
                
                //添加隐藏编辑框
                // var $input = $("<input type='text'  class='display_edit' style='display:none;'/>");
                // label.append($input);
                if(this.ToolTipText==='SubInstance'){
                    currentModelHtml.appendTo(container.find('div.subinstance_contanier'));
                }else{
                    if (this.ToolTipText !== 'Start' && this.ToolTipText !== 'End') {
                       currentModelHtml.appendTo(container.find('div.node_container'));
                    }
                    
                }
                var tooltip=TooltipTexts[this.ToolTipText];
                //添加tooltip
                $(currentModelHtml).tinytip({
                    position: 'right',
                    tooltip: tooltip,
                    speed: 100,
                    addClass:'h3-tooltip',
                    fix:{
                        left: '5px'
                    }
                });

                var activitymodel = new ActivityModel(currentModelHtml);
                ActivityModelSettings.ActivityModels.push(activitymodel);


                $.extend(activitymodel, activitymodel, this);
                activitymodel.ToolTipText = this.ToolTipText;
            }
        });
    }
    $('div.activity-template-node').tinytip({
        position: 'right',
        tooltip: TooltipTexts.Line,
        speed: 100,
        addClass:'h3-tooltip',
        fix:{
            left: '5px'
        }
    });
};




// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/activity/activityModal.js
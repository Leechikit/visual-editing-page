import {WorkflowElementType, WorkflowMode, WorkflowStyleClassName,
    WorkflowSettings, WorkflowMultiActionType, WorkflowMultiSelectStack,
     ActionCollection, WorkflowEventStack,WorkflowMouseMoveStack} from './setting';
import {ActivityMovingStack, ActivityStyleClassName,ActivitySettings} from './activity/setting';
import {Activity} from './activity/activity';
import {Line} from './line/line';
import {LineStyleClassName, LineSettings,LineArrowDirection} from './line/setting';
import {WorkflowDocument} from './workflowDocument';
import {TraceManager} from './workflowTrace';
import {ActivityResizeStack, ActivityDragSettings, ActivityDragStack} from './activity/activityDrag';
import {ShowContextMenu} from './contextMenu';

/**
 * 单例对象
 */
export const Workflow= function (selector) {
    this.WorkflowElementType = WorkflowElementType.Workflow;

    //画图空间对象
    this.workspace = undefined;
    this.ActivityInstaneDiv= undefined;

    this.NewShapeID = 1;

    //活动绘制区域
    this.workspace_content = undefined;

    //流程图所在的父容器
    this.outerContainer = undefined;

    //流程图内元素可放置区域离流程图offset().left的距离
    this.minInnerPaddingOffsetLeft = 30;
    //流程图内元素可放置区域离流程图offset().top的距离
    this.minInnerPaddingTop = 30;

    //活动集合
    this.activities = [];

    //是否显示辅助线
    this.showAssistLine=false;

    //线条集合
    this.lines = [];

    this.selectedActivities = [];
    //初始化
    this.init(selector);
    
    return this;
};

Workflow.prototype = {
    //初始化流程图对象和行为
    init: function (selector) {
        //DOM对象
        this.workspace = $(selector)[0];

        if (GlobalWorkflowProperties.WorkflowMode === WorkflowMode.Designer){
            $(this.workspace).attr('tabindex', 0);
        }
            
        //活动绘制区域
        if ($(this.workspace).find('.' + WorkflowStyleClassName.WorkSpaceContent).length == 0){
            $('<div></div>').addClass(WorkflowStyleClassName.WorkSpaceContent).appendTo(this.workspace);
        }
            
        this.workspace_content = $(this.workspace).children('.' + WorkflowStyleClassName.WorkSpaceContent);

        //流程图所在的父容器
        this.outerContainer = $(this.workspace).parent();

        this.initActions();

        //流程图的最小尺寸为 容器的尺寸
        WorkflowSettings.MinInnerWidth = $(this.outerContainer).width();
        WorkflowSettings.MinInnerHeight = $(this.outerContainer).height();

        if ($(this.workspace_content).position() != void 0) {
            //上侧
            ActivityMovingStack.WorkflowContentEdgeLeft = $(this.workspace_content).position().left //+ $(this.workspace_content).css('border-left-width').parsePxToFloat();
            //左侧
            ActivityMovingStack.WorkflowContentEdgeTop = $(this.workspace_content).position().top //+ $(this.workspace_content).css('border-top-width').parsePxToFloat();
            //最小内部右侧
            ActivityMovingStack.WorkspaceContentMinInnerRight = $(this.workspace_content).position().left + $(this.workspace_content).outerWidth() //- $(this.workspace_content).css('border-right-width').parsePxToFloat();
            //最小内部下侧
            ActivityMovingStack.WorkspaceContentMinInnerBottom = $(this.workspace_content).position().top + $(this.workspace_content).outerHeight() //- $(this.workspace_content).css('border-bottom-width').parsePxToFloat();
        }
    },

    getNewShapeID: function () {
        if (!this.NewShapeID) {
            this.NewShapeID = 1;
        }

        this.NewShapeID++;
        return this.NewShapeID - 1;
    },

    initActions: function () {
        if (GlobalWorkflowProperties.WorkflowMode == WorkflowMode.MobileView){
            return;
        }
        //流程图的事件
        $(this.workspace).unbind(WorkflowSettings.EventNameSpace)
            //鼠标按下时事件
            .bind('mousedown' + WorkflowSettings.EventNameSpace, this.doDown)
            .bind('dblclick' + WorkflowSettings.EventNameSpace, this.doDblClick)
            //鼠标移动时事件
            .bind('mousemove' + WorkflowSettings.EventNameSpace, this.doMouseMove)
            //鼠标放开时事件
            .bind('mouseup' + WorkflowSettings.EventNameSpace, this.doMouseUp)
            //鼠标右键时事件
            .bind('contextmenu' + WorkflowSettings.EventNameSpace, this.doContextMenu)
            .bind('keyup' + WorkflowSettings.EventNameSpace, this.doKeyUp)
            .bind('keydown' + WorkflowSettings.EventNameSpace, this.doKeyDown);
    },

    autoFit: function (_triggerActivity) {
        //流程为只读时,调整外容器
        if (GlobalWorkflowProperties.WorkflowMode == WorkflowMode.ViewOnly) {
            $(this.workspace).width('100%');
            $(this.outerContainer).width('100%');

            var _height = 0; var _width = 0;
            $(this.activities).each(function () {
                if (this.right > _width)
                    _width = this.right;
                if (this.bottom > _height)
                    _height = this.bottom;
            });
            if ($(this.workspace).width() < _width + 100) {
                $(this.workspace).width(_width + 100);
                $(this.outerContainer).width(_width + 100);
            }
            $(this.workspace).height(_height + 100);
            $(this.outerContainer).height(_height + 100);
            return;
        }
            //流程设计模式,调整流程尺寸
        else {
            WorkflowSettings.MinInnerWidth = $(this.outerContainer).width();
            WorkflowSettings.MinInnerHeight = $(this.outerContainer).height();

            //当前右、下边缘
            ActivityMovingStack.CurrentRightRange = $(this.workspace_content).position().left + $(this.workspace_content).outerWidth();
            ActivityMovingStack.CurrentBottomRange = $(this.workspace_content).position().top + $(this.workspace_content).outerHeight();

            if (_triggerActivity) {
                if (_triggerActivity.right > ActivityMovingStack.CurrentRightRange) {
                    $(this.workspace).css('width', $(this.workspace).width() + (_triggerActivity.right - ActivityMovingStack.CurrentRightRange));
                    ActivityMovingStack.CurrentRightRange = _triggerActivity.right;
                }
                if (_triggerActivity.bottom > ActivityMovingStack.CurrentBottomRange) {
                    $(this.workspace).css('height', $(this.workspace).height() + (_triggerActivity.bottom - ActivityMovingStack.CurrentBottomRange));
                    ActivityMovingStack.CurrentBottomRange = _triggerActivity.bottom;
                }
            }
            else {
                //内边缘
                var _RightEdge = 0;
                var _BottomEdge = 0;

                $(this.activities).each(function () {
                    if (_RightEdge < this.right)
                        _RightEdge = this.right;
                    if (_BottomEdge < this.bottom)
                        _BottomEdge = this.bottom;
                });
                //外边缘
                _RightEdge += $(this.workspace_content).css('right').parsePxToFloat();
                _BottomEdge += $(this.workspace_content).css('bottom').parsePxToFloat();
                $(this.lines).each(function () {
                    $(this.Points).each(function () {
                        if (this.x > _RightEdge) {
                            _RightEdge = this.x;
                        }
                        if (this.y > _BottomEdge) {
                            _BottomEdge = this.y;
                        }
                    });
                });
                if (_RightEdge > WorkflowSettings.MinInnerWidth) {
                    $(this.workspace).width(_RightEdge);
                    $(this.workspace).parent().css('overflow-x', 'scroll');
                }
                else {
                    $(this.workspace).width('100%');
                    $(this.workspace).parent().css('overflow-x', 'visible');
                }
                if (_BottomEdge > WorkflowSettings.MinInnerHeight) {
                    $(this.workspace).height(_BottomEdge);
                    $(this.outerContainer).css('overflow-y', 'scroll');
                }
                else {
                    $(this.workspace).height('100%');
                    $(this.outerContainer).css('overflow-y', 'visible');
                }
            }
        }
    },

    //获取流程图节点(活动、线条)
    getWorkflowNode: function (Id) {
        var _Activity = $(this.activities).filter(function () {
            return this.Id === Id;
        });
        if (_Activity.length > 0)
            return _Activity[0];

        var _Line = $(this.lines).filter(function () {
            return this.Id === Id;
        });
        if (_Line.length > 0)
            return _Line[0];
    },

    //获取流程图里的活动
    getActivityByCode: function (_ActivityCode) {
        return $(this.activities).filter(function () {
            return this.ActivityCode === _ActivityCode;
        })[0];
    },

    //获取流程图里的线条
    getLine: function (Id) {
        return $(this.lines).filter(function () {
            return this.Id === parseInt(Id);
        })[0];
    },

    //添加活动
    addActivity: function (selector, activityModel,id) {
        var activity = new Activity(selector, activityModel,id);
        this.activities.push(activity);
        return activity;
    },

    //添加线条，若存在则更新
    saveLine: function (lineConfig) {
        var line;
        if (lineConfig) {
            line = this.getLine(lineConfig.currentLineId);
            if (line)
                line.init(lineConfig);
            else {
                line = new Line(lineConfig);
                this.lines.push(line);
            }
        }
    },

    //移除活动
    removeActivity: function (activityId) {
        var workflow=GlobalWorkflowProperties.Workflow;
        if (activityId) {
            //如果是saasapp 不允许删除第一个手工节点  add by eys
            for (var index = workflow.activities.length - 1; index >= 0; index--) {
                if (workflow.activities[index].Id == activityId) {
                    if (!GlobalWorkflowProperties.IsDeveloper &&
                        GlobalWorkflowProperties.IsAppSpecial &&
                        GlobalWorkflowProperties.IsSaasApp &&
                        workflow.activities[index].ActivityCode === FirstActivityCode) {
                        return;
                    }
                    if (workflow.activities[index].ToolTipText == 'Start') {
                        WorkflowDocument.ShowDealResult(_WorkflowDesigner_GlobalString.Workflow_StratNode);
                        return;
                    }
                    else if (workflow.activities[index].ToolTipText == 'End') {
                        WorkflowDocument.ShowDealResult(_WorkflowDesigner_GlobalString.Workflow_EndNode);
                        return;
                    }
                    TraceManager.AddTrace(TraceManager.TraceType.Activity.Remove, workflow.activities[index]);
                    //移除线条
                    $(workflow.lines).each(function () {
                        if (this.startActivity == workflow.activities[index]
                            || this.endActivity == workflow.activities[index])
                            workflow.removeLine(this.Id);
                    });
                    workflow.activities[index].Unselect();
                    $(workflow.activities[index].htmlObject).remove();
                    workflow.activities.splice(index, 1);
                    break;
                }
            }
        }

        GlobalWorkflowProperties.Wp.DisplayProperties(workflow);
    },

    //移除线条
    removeLine: function (lineId) {
        if (lineId != null) {
            for (var index = this.lines.length - 1; index >= 0; index--) {
                if (this.lines[index].Id == lineId) {
                    var _line = this.lines[index];
                    //如果是选���状态，移除控制点
                    if (this.lines[index].isSelected)
                        $('.' + LineStyleClassName.LineHandler).remove();
                    if (_line && _line.Path)
                        _line.Path.remove();
                    if (_line && _line.Arrow)
                        _line.Arrow.remove();
                    if (_line && _line.Label)
                        _line.Label.remove();

                    $(this.lines).each(function () {
                        if (this != _line) {
                            this.removeCrossPointToLine(_line.Id);
                            if (this.needRedraw)
                                this.draw(true);
                        }
                    });
                    this.lines.splice(index, 1);
                    break;
                }
            }
        }

        //若属性显示的是当前删除的线条,改为显示流程模板属性
        if (GlobalWorkflowProperties.Wp.CurrentObject && GlobalWorkflowProperties.Wp.CurrentObject.Id == lineId) {
            GlobalWorkflowProperties.Wp.DisplayProperties(this);
        }
    },

    getFocusLine: function (e) {
        //判断是否选中线条
        if (this.lines && this.lines.length > 0) {
            for(let line of this.lines){
                var points = line.Points;
                if (points && points.length > 0) {
                    //鼠标点击处相对于SVG的位置
                    var mousePoint = { x: e.pageX - GlobalWorkflowProperties.SVG.offset().left, y: e.pageY - GlobalWorkflowProperties.SVG.offset().top };
                    for (var pointIndex = 0 ; pointIndex < points.length - 1; pointIndex++) {
                        //竖直线
                        if ((points[pointIndex].x == points[pointIndex + 1].x) && (Math.abs(mousePoint.x - points[pointIndex].x) <= 10 && mousePoint.y >= Math.min(points[pointIndex].y, points[pointIndex + 1].y) && mousePoint.y <= Math.max(points[pointIndex].y, points[pointIndex + 1].y))
                            //水平线
                            || (points[pointIndex].y == points[pointIndex + 1].y) && (Math.abs(mousePoint.y - points[pointIndex].y) <= 10 && mousePoint.x >= Math.min(points[pointIndex].x, points[pointIndex + 1].x) && mousePoint.x <= Math.max(points[pointIndex].x, points[pointIndex + 1].x))) {
                            return line;
                        }
                    }
                }
            }
        }
    },
    doDblClick: function (e) {
        return;
    },

    //鼠标摁下事件
    doDown: function (e) {
        //用于解决鼠标点击后流程图滚动到原点
        var workflow=GlobalWorkflowProperties.Workflow;
        var outerContainer=workflow.outerContainer;
        var _Scroll = {
            X: outerContainer.scrollLeft(),
            Y: outerContainer.scrollTop()
        }
        GlobalWorkflowProperties.VM.setHightlight(false);

        workflow.workspace.focus();
        workflow.hideAssistLine();
        GlobalWorkflowProperties.VM.removeLineSelected();

        outerContainer.scrollLeft(_Scroll.X).scrollTop(_Scroll.Y);

        //左键事件
        if ($.fn.isOffsetLeftMouseDown(e)) {
            e.preventDefault();
        }
            //右键事件
        else {
            return;
        }
        //如果是线条文字
        if ($(e.target).is('.' + LineStyleClassName.Label) && $(e.target).text()) {
            // ShowTab(true);
            workflow.setMultiActionFlag(WorkflowMultiActionType.LineLabelMoving);
            $('.' + LineStyleClassName.LabelMoving).removeClass(LineStyleClassName.LabelMoving);
            $(e.target).addClass(LineStyleClassName.LabelMoving);

            //所有线条不选中
            $(workflow.lines).each(function () {
                this.Unselect();
            });
            var _Line = workflow.getLine($(e.target).attr(LineSettings.Label_LineIDPropertyName));
            if(_Line){
                _Line.Select();
            }
            

            $(document).unbind(LineSettings.LineLabelEventNamespace).bind('mousemove' + LineSettings.LineLabelEventNamespace, function (e) {
                var _Label = $('.' + LineStyleClassName.LabelMoving);
                var _Line = workflow.getLine(_Label.attr(LineSettings.Label_LineIDPropertyName));
                if (_Label.length > 0 && _Line) {
                    var _CursorPoint = {
                        x: e.pageX - GlobalWorkflowProperties.SVG.offset().left,
                        y: e.pageY - GlobalWorkflowProperties.SVG.offset().top
                    }
                    var _NearstPoint;
                    //鼠标与线最小距离的平方
                    var _MinDistance_2;
                    for (var i = 0; i < _Line.Points.length - 1; i++) {
                        var _CurrentNearstPoint = {
                            x: _CursorPoint.x,
                            y: _CursorPoint.y
                        }
                        var _Distance;
                        //水平线
                        if (_Line.Points[i].y == _Line.Points[i + 1].y) {
                            _CurrentNearstPoint.y = _Line.Points[i].y;
                            if (_CursorPoint.x <= Math.min(_Line.Points[i].x, _Line.Points[i + 1].x) || (_CursorPoint.x >= Math.max(_Line.Points[i].x, _Line.Points[i + 1].x))) {
                                if (_CursorPoint.x <= Math.min(_Line.Points[i].x, _Line.Points[i + 1].x)) {
                                    _CurrentNearstPoint.x = Math.min(_Line.Points[i].x, _Line.Points[i + 1].x);
                                }
                                else {
                                    _CurrentNearstPoint.x = Math.max(_Line.Points[i].x, _Line.Points[i + 1].x)
                                }
                                _Distance = (_CursorPoint.y - _CurrentNearstPoint.y) * (_CursorPoint.y - _CurrentNearstPoint.y) + (_CursorPoint.x - _CurrentNearstPoint.x) * (_CursorPoint.x - _CurrentNearstPoint.x);
                            }
                            else {
                                _Distance = (_CursorPoint.y - _CurrentNearstPoint.y) * (_CursorPoint.y - _CurrentNearstPoint.y);
                            }
                        }
                            //竖直线
                        else {
                            _CurrentNearstPoint.x = _Line.Points[i].x;
                            if (_CursorPoint.y <= Math.min(_Line.Points[i].y, _Line.Points[i + 1].y) || _CursorPoint.y >= Math.max(_Line.Points[i].y, _Line.Points[i + 1].y)) {
                                if (_CursorPoint.y <= Math.min(_Line.Points[i].y, _Line.Points[i + 1].y)) {
                                    _CurrentNearstPoint.y = Math.min(_Line.Points[i].y, _Line.Points[i + 1].y);
                                }
                                if (_CursorPoint.y >= Math.max(_Line.Points[i].y, _Line.Points[i + 1].y)) {
                                    _CurrentNearstPoint.y = Math.max(_Line.Points[i].y, _Line.Points[i + 1].y);
                                }
                                _Distance = (_CursorPoint.x - _CurrentNearstPoint.x) * (_CursorPoint.x - _CurrentNearstPoint.x) + (_CursorPoint.y - _CurrentNearstPoint.y) * (_CursorPoint.y - _CurrentNearstPoint.y);
                            }
                            else {
                                _Distance = (_CursorPoint.x - _CurrentNearstPoint.x) * (_CursorPoint.x - _CurrentNearstPoint.x);
                            }
                        }
                        if (i == 0) {
                            _NearstPoint = _CurrentNearstPoint;
                            _MinDistance_2 = _Distance;
                        }
                        else {
                            if (_Distance < _MinDistance_2) {
                                _NearstPoint = _CurrentNearstPoint;
                                _MinDistance_2 = _Distance;
                            }
                        }
                    }
                    _Line.TextX = _NearstPoint.x;
                    _Line.TextY = _NearstPoint.y;
                    _Line.SetText();
                }
            });
            $(document).one('mouseup' + LineSettings.LineLabelEventNamespace, function (e) {
                $(document).unbind(LineSettings.LineLabelEventNamespace);
                workflow.setMultiActionFlag(WorkflowMultiActionType.None);
                $('.' + LineStyleClassName.LabelMoving).removeClass(LineStyleClassName.LabelMoving);
            });
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        //判断是否选中活动

        var activity;
        if ($(e.target).hasClass(ActivityStyleClassName.Activity)){
            activity = $(e.target).data(ActivitySettings.ActivityDataProperty);
        }
        else{
            activity = $(e.target).parents('.' + ActivityStyleClassName.Activity).data(ActivitySettings.ActivityDataProperty);
        }
        if (activity) {
            GlobalWorkflowProperties.VM.setHightlight(true);
            activity.doDown(e);
            return;
        }

        //所有线条不选中
        $(workflow.lines).each(function () {
            this.Unselect();
        });

        //判断是否选中线条
        var line =workflow.getFocusLine(e);
        if (line) {
            GlobalWorkflowProperties.VM.setHightlight(true);
            line.doDown(e);
            // ShowTab(true);
            return;
        }

        //选中的是流程图本身:流程背景、画布、中心区域等
        if (e.target == workflow.workspace_content[0] ||
            e.target == workflow.workspace[0] ||
            e.target == GlobalWorkflowProperties.SVG[0]) {
            // ShowTab(false);
            if (GlobalWorkflowProperties.WorkflowMode === WorkflowMode.ViewOnly)
                return;

            $(workflow.lines).each(function () {
                if (this.isSelected)
                    this.Unselect();
            });

            if (!e.ctrlKey){
                $(workflow.activities).each(function () {
                    if (this.isSelected)
                        this.Unselect();
                });
            }
                

            //初始化复选行为
            workflow.setMultiActionFlag(WorkflowMultiActionType.DragMultiSelect);
            //清空框中的活动
            WorkflowMultiSelectStack.ActivitiesInRange = [];
            WorkflowMultiSelectStack.StartPoint = {
                x: e.pageX - GlobalWorkflowProperties.SVG.offset().left,
                y: e.pageY - GlobalWorkflowProperties.SVG.offset().top
            }
            // $("<div class='" + WorkflowStyleClassName.MultiSelectBox + "'></div>").hide().appendTo(this.workspace);
            $("<div class='" + WorkflowStyleClassName.MultiSelectBox + "'></div>").hide().appendTo(workflow.workspace);
            //准备拖动选中
            $(document).bind('mousemove' + WorkflowSettings.MultiSelectEventNameSpace, function (e) {
                var currentPoint = {
                    x: e.pageX - GlobalWorkflowProperties.SVG.offset().left,
                    y: e.pageY - GlobalWorkflowProperties.SVG.offset().top
                }

                $('.' + WorkflowStyleClassName.MultiSelectBox)
                    .css('width', Math.abs(currentPoint.x - WorkflowMultiSelectStack.StartPoint.x))
                    .css('height', Math.abs(currentPoint.y - WorkflowMultiSelectStack.StartPoint.y))
                    .css('left', Math.min(WorkflowMultiSelectStack.StartPoint.x, currentPoint.x))
                    .css('top', Math.min(WorkflowMultiSelectStack.StartPoint.y, currentPoint.y))
                    .show();

                $(workflow.activities).each(function () {
                    if (this.left >= Math.min(WorkflowMultiSelectStack.StartPoint.x, currentPoint.x)
                            && this.left + this.width <= Math.max(WorkflowMultiSelectStack.StartPoint.x, currentPoint.x)
                            && this.top >= Math.min(WorkflowMultiSelectStack.StartPoint.y, currentPoint.y)
                            && this.top + this.height <= Math.max(WorkflowMultiSelectStack.StartPoint.y, currentPoint.y)) {
                        if (!this.isSelected) {
                            this.Select();
                            WorkflowMultiSelectStack.ActivitiesInRange.push(this);
                        }
                    }
                    else {
                        for (var index = WorkflowMultiSelectStack.ActivitiesInRange.length - 1; index >= 0; index--) {
                            if (WorkflowMultiSelectStack.ActivitiesInRange[index] == this) {
                                this.Unselect();
                                WorkflowMultiSelectStack.ActivitiesInRange.splice(index, 1);
                                break;
                            }
                        }
                    }
                });
            });
            //结束拖动多选
            $(document).one('mouseup' + WorkflowSettings.MultiSelectEventNameSpace, function (e) {
                //如果选中了活动,显示活动属性
                var workflow=GlobalWorkflowProperties.Workflow;
                if (workflow.selectedActivities && workflow.selectedActivities.length > 0) {
                    GlobalWorkflowProperties.Wp.DisplayProperties(workflow.selectedActivities[0]);
                } else {
                    //否则,显示流程属性
                    GlobalWorkflowProperties.Wp.DisplayProperties(workflow);
                }

                workflow.setMultiActionFlag(WorkflowMultiActionType.None);

                $('.' + WorkflowStyleClassName.MultiSelectBox).remove();
                $(document).unbind(WorkflowSettings.MultiSelectEventNameSpace);
            });
        }
    },

    //鼠标移动事件
    doMouseMove: function (e) {
        var workflow=GlobalWorkflowProperties.Workflow;
        if (ActivityDragStack.IsDragging || ActivityResizeStack.Resizing || WorkflowEventStack.CurrentMultiAction != WorkflowMultiActionType.None){
            return;
        }

        //光标已处理
        var cursorCought = false;

        var _FocusActivity = workflow.getFocusActivity(e);
        if (_FocusActivity)
            cursorCought = true;

        //设计模式
        if (GlobalWorkflowProperties.WorkflowMode === WorkflowMode.Designer) {
            if (_FocusActivity) {
                WorkflowMouseMoveStack.FocusActivity = _FocusActivity;

                //显示箭头
                WorkflowMouseMoveStack.FocusActivity.showArrow();

                //清空计时器
                if (WorkflowMouseMoveStack.TimeOuterHander){
                    try {
                        clearTimeOut(WorkflowMouseMoveStack.TimeOuterHander);
                    } catch (e) {

                    }
                }
                    

                if (WorkflowMouseMoveStack.TimeOuterHander){
                    WorkflowMouseMoveStack.TimeOuterHander = undefined;
                }
                    
            }
            else if (WorkflowMouseMoveStack.FocusActivity) {
                //设置计时器,3秒后隐藏
                WorkflowMouseMoveStack.TimeOuterHander = setTimeout(function () {
                    if (!workflow.getFocusActivity(e)) {
                        WorkflowMouseMoveStack.FocusActivity = undefined;
                        $('.' + WorkflowStyleClassName.WorkflowAotuArrow).hide();
                    }
                }, 3000);
            }
        }
            //查看流程图实例
        else if (GlobalWorkflowProperties.WorkflowMode ===  WorkflowMode.ViewOnly) {
            //如果没有流程实例信息
            if (typeof (GlobalWorkflowProperties.WorkflowInstance) == 'undefined' || !GlobalWorkflowProperties.WorkflowInstance){
                return;
            }

            if (_FocusActivity) {
                if (WorkflowMouseMoveStack.FocusActivity == _FocusActivity)
                    return;
                else if (typeof (workflow.ActivityInstaneDiv) != 'undefined') {
                    workflow.ActivityInstaneDiv.hide();
                }

                WorkflowMouseMoveStack.FocusActivity = _FocusActivity;

                if (($(WorkflowMouseMoveStack.FocusActivity.htmlObject).hasClass('ActivityWorking') || $(WorkflowMouseMoveStack.FocusActivity.htmlObject).hasClass('ActivityFinished'))
                    || (typeof (GlobalWorkflowProperties.WorkflowHandlerUrl) != 'undefined' && $.inArray(WorkflowMouseMoveStack.FocusActivity.ToolTipText, ['FillSheet', 'Approve', 'Circulate', 'SubInstance']) > -1)) {
                    //浮出DIV显示审批信息
                    if (typeof (workflow.ActivityInstaneDiv) == 'undefined') {
                        workflow.ActivityInstaneDiv = $('<div></div>').addClass('ActivitySummary').appendTo(this.workspace);
                        workflow.ActivityInstaneDiv.append($('<span></span>'));
                    }
                    workflow.ActivityInstaneDiv.children().hide();
                    workflow.ActivityInstaneDiv
                            .css('left', _FocusActivity.right + 4)
                            .css('top', _FocusActivity.top)
                            .show();

                    var _thisActivtyCode = _FocusActivity.ActivityCode;
                    //设置离开时间为无限大
                    workflow.ActivityInstaneDiv.data('LeaveTime', Number.POSITIVE_INFINITY);

                    //在this.ActivityInstaneDiv框对象里记录当前活动
                    workflow.ActivityInstaneDiv.data('Activity', _FocusActivity);

                    //进行中或已完成才显示浮出框
                    //ERROR:活动是异常状态时,也可以显示历史信息
                    if ($(WorkflowMouseMoveStack.FocusActivity.htmlObject).hasClass('ActivityWorking') || $(WorkflowMouseMoveStack.FocusActivity.htmlObject).hasClass('ActivityFinished')) {
                        if (typeof (ActivityTokenGrid) == 'undefined') {
                            //ERROR:通过Id查找很牵强
                            ActivityTokenGrid = $('table[id*=TokenGrid]').clone();
                            ActivityTokenGrid.appendTo(this.ActivityInstaneDiv);
                        }

                        if (_FocusActivity.ToolTipText == 'Start') {
                            workflow.ActivityInstaneDiv.hide();
                        }
                        var colCount = 0;
                        ActivityTokenGrid.children('tbody').children('tr').each(function (index) {
                            var tds = $(this).children('td');
                            if (index != 0) {
                                if ($(this).data('activity') == _thisActivtyCode) {
                                    $(this).show();
                                    if (tds.length == colCount) {
                                        tds.eq(0).hide();
                                        tds.eq(1).hide();
                                    }
                                }
                                else {
                                    $(this).hide();
                                }
                            }
                            else {
                                colCount = tds.length;
                                tds.eq(0).hide();
                                tds.eq(1).hide();
                                tds.eq(2).css('width', '100px');
                                tds.eq(3).css('width', '100px');
                                tds.eq(4).css('width', '200px');
                            }
                        });
                        workflow.ActivityInstaneDiv.children('table').show();
                        workflow.ActivityInstaneDiv.children('span').hide();
                    }
                    else if (typeof (GlobalWorkflowProperties.WorkflowHandlerUrl) != 'undefined' && $.inArray(WorkflowMouseMoveStack.FocusActivity.ToolTipText, ['FillSheet', 'Approve', 'Circulate', 'SubInstance']) > -1) {
                        WorkflowMouseMoveStack.ToLoadActivityCode = WorkflowMouseMoveStack.FocusActivity.Ac;
                        //预估处理人缓存
                        if (typeof (ParticipantCache) == 'undefined') {
                            ParticipantCache = {};
                        }

                        var _ShowParticipant = function (_Passed_ActivityCode_1) {
                            if (WorkflowMouseMoveStack.FocusActivity && WorkflowMouseMoveStack.FocusActivity.ActivityCode
                                && _Passed_ActivityCode_1 == WorkflowMouseMoveStack.FocusActivity.ActivityCode) {
                                var _Participants = ParticipantCache[WorkflowMouseMoveStack.FocusActivity.ActivityCode] || [];

                                workflow.ActivityInstaneDiv.children('table').hide();

                                var _Html = '<b>' + _WorkflowDesigner_GlobalString.Workflow_Estimate + ':</b><br>';
                                $(_Participants).each(function () {
                                    _Html += "<a href='" + GlobalWorkflowProperties.UserViewUrl + "' target='_blank' >" + this.Name + '[' + this.Code + ']' + '</a>;';
                                });
                                workflow.ActivityInstaneDiv.children('span').show().html(_Html);
                            }
                        };

                        if (!ParticipantCache[WorkflowMouseMoveStack.FocusActivity.ActivityCode]) {
                            var _ActivityCode_1 = WorkflowMouseMoveStack.FocusActivity.ActivityCode;
                            //200毫秒后从服务器获取预估处理人
                            setTimeout(function (_Passed_ActivityCode_1) {
                                //如果鼠标依然停留在当前活动上,则从服务器获取预估处理人
                                if (WorkflowMouseMoveStack.FocusActivity && WorkflowMouseMoveStack.FocusActivity.ActivityCode && _Passed_ActivityCode_1 == WorkflowMouseMoveStack.FocusActivity.ActivityCode) {

                                    PostAction(ActionCollection.ActonName_GetParticipants, {
                                        ActivityCode: _Passed_ActivityCode_1,
                                        InstanceId: thi.workflowObj.WorkflowInstance.ObjectId
                                    }, function (result) {
                                        //ERROR CHECK
                                        if (result == 'PortalSessionOut') {
                                            WorkflowDocument.ShowLogin();
                                            return;
                                        }

                                        //添加到缓存
                                        ParticipantCache[_Passed_ActivityCode_1] = result;

                                        //显示参与者
                                        _ShowParticipant(_Passed_ActivityCode_1);
                                    });
                                }
                            }, 200, _ActivityCode_1);
                        }
                        else {
                            //显示参与者
                            _ShowParticipant(WorkflowMouseMoveStack.FocusActivity.ActivityCode);
                        }
                    }
                }
            }
                //ERROR:当鼠标在浮出框里时,不隐藏
            else if (typeof (workflow.ActivityInstaneDiv) != 'undefined' &&
            workflow.ActivityInstaneDiv &&
            workflow.ActivityInstaneDiv.is(':visible') &&
            e.pageX > workflow.ActivityInstaneDiv.offset().left &&
            e.pageY > workflow.ActivityInstaneDiv.offset().top &&
            e.pageX < workflow.ActivityInstaneDiv.offset().left + workflow.ActivityInstaneDiv.outerWidth() &&
            e.pageY < workflow.ActivityInstaneDiv.offset().top + workflow.ActivityInstaneDiv.outerHeight()) {
                //光标已处理
                cursorCought = true;

                //设置离开时间为无限大
                workflow.ActivityInstaneDiv.data('LeaveTime', Number.POSITIVE_INFINITY);
                return;
            }
                //一段时间后判断是否隐藏
            else {
                WorkflowMouseMoveStack.FocusActivity = undefined;
                if (typeof (workflow.ActivityInstaneDiv) != 'undefined' &&
                 this.ActivityInstaneDiv.is(':visible')) {
                    //记录离开时间
                    if (!workflow.ActivityInstaneDiv.data('LeaveTime') ||
                        workflow.ActivityInstaneDiv.data('LeaveTime') == Number.POSITIVE_INFINITY) {
                        workflow.ActivityInstaneDiv.data('LeaveTime', (new Date()).getTime());
                    }

                    //1秒
                    setTimeout(function () {
                        if (typeof (this.ActivityInstaneDiv) != 'undefined' &&
                            workflow.ActivityInstaneDiv.is(':visible')) {
                            var LeaveTime = workflow.ActivityInstaneDiv.data('LeaveTime');
                            if (LeaveTime && LeaveTime != Number.POSITIVE_INFINITY && (new Date).getTime() - GlobalWorkflowProperties.Workflow.ActivityInstaneDiv.data('LeaveTime') > 900) {
                                workflow.ActivityInstaneDiv.hide();
                            }
                        }
                    }, 1000);
                }
            }
        }
        //若未标未处理,判断其若在线条上,则高亮显示线条
        if (!cursorCought) {
            //判断是否选中线条
            var line = workflow.getFocusLine(e);
            if (line) {
                //line.SetFocusStyle();
            }
        }
    },

    //鼠标放开事件
    doMouseUp: function (e) {

    },

    //右键
    doContextMenu: function (e) {
        e.preventDefault();
        //e.stopPropagation();
        //ERROR  不需要右键菜单了
        // if (GlobalWorkflowProperties.WorkflowMode != WorkflowMode.Designer)
        //     return;

        // //点击箭头,不处理
        // if ($(e.target).hasClass(WorkflowStyleClassName.WorkflowAotuArrow))
        //     return;

        // //聚焦的活动
        // var activity = this.getFocusActivity(e);
        // if (activity) {
        //     ShowContextMenu(e, activity,this);
        //     return;
        // }

        // //聚焦的线条
        // var line = this.getFocusLine(e);
        // if (line) {
        //     ShowContextMenu(e, line,this);
        //     return;
        // }

        // //流程模板
        // ShowContextMenu(e, this,this);

    },
    saveActivityPositions: function (_Activities, _ActivityMoveOffset) {
        if (_ActivityMoveOffset.x == 0 && _ActivityMoveOffset.y == 0)
            return;
        $(_Activities).each(function () {
            //保存活动的位置信息
            this.savePosition(true);
        });
        $(this.lines).each(function () {
            //起始活动都移动,则平移线条
            if ($.inArray(this.startActivity, _Activities) > -1 && $.inArray(this.endActivity, _Activities) > -1) {
                this.DoMove(_ActivityMoveOffset);
            }
                //移动线条起点
            else if ($.inArray(this.startActivity, _Activities) > -1) {
                this.MoveStartPoint(_ActivityMoveOffset);
            }
                //移动线条终点
            else if ($.inArray(this.endActivity, _Activities) > -1) {
                this.MoveEndPoint(_ActivityMoveOffset);
            }
        });
    },
    //返回当前焦点位置的活动
    getFocusActivity: function (e) {
        if (!e)
            return;
        var activity
        if ($(e.target).hasClass(ActivityStyleClassName.Activity)) {
            activity = $(e.target).data(ActivitySettings.ActivityDataProperty);
        }
        else
            activity = $(e.target).parents('.' + ActivityStyleClassName.Activity + ':first').data(ActivitySettings.ActivityDataProperty);
        return activity;
    },

    doKeyDown: function (e) {
        var workflow=GlobalWorkflowProperties.Workflow;
        //如果文档焦点在某个输入框
        if (e.target.tagName && e.target.tagName.toLowerCase() == 'input')
            return;

        //不处理单独的Ctrl、Alt事件
        if (e.which == 17 || e.which == 18) {
            return;
        }

        //Ctrl+Z
        if (e.ctrlKey && !e.altkey && !e.shiftKey) {
            //Ctrl+Z
            if (e.which == 90) {
                TraceManager.Undo();
                return;
            }
                //Ctrl+Y
            else if (e.which == 89) {
                TraceManager.Redo();
                return;
            }
        }

        //方向键
        if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) {
            e.preventDefault();

            workflow.setMultiActionFlag(WorkflowMultiActionType.ActivityKeyMove);

            if (!WorkflowEventStack.IsKeyDown) {
                WorkflowEventStack.IsKeyDown = true;

                workflow.onActivitiesMovingStart(workflow.selectedActivities);

                //源状态
                var ObjectsAndStates = TraceManager.GetMultiObjAndStates(workflow.selectedActivities);
                WorkflowEventStack.SourceStates = ObjectsAndStates.States;
                WorkflowEventStack.Objects = ObjectsAndStates.Objects;
            }

            //移动的方向：左、上、右、下
            var moveDiretionOffset = { x: 0, y: 0 };
            if (e.which == 37) moveDiretionOffset.x = -1;
            else if (e.which == 38) moveDiretionOffset.y = -1;
            else if (e.which == 39) moveDiretionOffset.x = 1;
            else if (e.which == 40) moveDiretionOffset.y = 1;

            //单次按下方向键时活动的移动距离
            var moveInterval = WorkflowSettings.KeyMoveInterval;
            //Shift减速
            if (e.shiftKey)
                moveInterval *= 0.25;
                //Ctrl加速
            else if (e.ctrlKey)
                moveInterval *= 4;

            //单选
            if (workflow.selectedActivities && workflow.selectedActivities.length == 1) {
                var movingObject = workflow.selectedActivities[0].htmlObject;

                var _ActivityMoveOffset = {
                    x: Math.max(moveDiretionOffset.x * moveInterval, $(workflow.workspace_content).position().left - $(movingObject).position().left),
                    y: Math.max(moveDiretionOffset.y * moveInterval, $(workflow.workspace_content).position().top - $(movingObject).position().top)
                }
                if (_ActivityMoveOffset.x != 0 || _ActivityMoveOffset.y != 0) {
                    $(workflow.selectedActivities[0].htmlObject).move(_ActivityMoveOffset);
                    workflow.selectedActivities[0].savePosition(true);

                    $(workflow.lines).filter(function () {
                        var _StartMoved = $.inArray(this.startActivity, this.selectedActivities) > -1;
                        var _EndMoved = $.inArray(this.endActivity, this.selectedActivities) > -1;
                        //起始活动都移动,则平移线条
                        if (_StartMoved && _EndMoved) {
                            this.DoMove(_ActivityMoveOffset);
                        }
                            //移动线条起点
                        else if (_StartMoved) {
                            this.MoveStartPoint(_ActivityMoveOffset);
                        }
                            //移动线条终点
                        else if (_EndMoved) {
                            this.MoveEndPoint(_ActivityMoveOffset);
                        }
                        if (_StartMoved || _EndMoved) {
                            this.draw();
                        }
                    });
                }
            }
                //多选
            else if (workflow.selectedActivities && workflow.selectedActivities.length > 1) {
                var _ActivitiesMoveOffsets = {};
                $(workflow.selectedActivities).each(function () {
                    var _thisOffset = {
                        x: Math.max(moveDiretionOffset.x * moveInterval, $(this.workspace_content).position().left - $(this.htmlObject).position().left),
                        y: Math.max(moveDiretionOffset.y * moveInterval, $(this.workspace_content).position().top - $(this.htmlObject).position().top)
                    }
                    $(this.htmlObject).move(_thisOffset);
                    _ActivitiesMoveOffsets[this.Id] = _thisOffset;
                    this.savePosition(true);
                });

                $(workflow.lines).filter(function () {
                    var startOffset = _ActivitiesMoveOffsets[this.startActivity.Id];
                    var endOffset = _ActivitiesMoveOffsets[this.endActivity.Id];
                    //起始活动都移动相同位移,则平移线条
                    if (startOffset && endOffset && startOffset.x == endOffset.x && startOffset.y == endOffset.y && Math.abs(startOffset.x) + Math.abs(startOffset.y) > 0) {
                        this.DoMove(startOffset);
                        this.draw();
                    }
                    else {
                        if (startOffset && (startOffset.x != 0 || startOffset.y != 0)) {
                            this.MoveStartPoint(startOffset);
                            this.draw();
                        }
                        if (endOffset && (endOffset.x != 0 || endOffset.y != 0)) {
                            this.MoveEndPoint(endOffset);
                            this.draw();
                        }
                    }
                });
            }

            workflow.onActivitiesMoving(workflow.selectedActivities);
        }
            //全选:Ctrl + A
        else if (e.ctrlKey && e.which == 65) {
            e.preventDefault();

            $(workflow.activities).each(function () {
                this.Select();
            });
        }
            //Del 删除
        else if (e.which == 46) {
            e.preventDefault();

            $(workflow.activities).each(function () {
                if (this.isSelected){
                    workflow.removeActivity(this.Id);
                }
                
            });
            $(workflow.lines).each(function () {
                if (this.isSelected) {
                    TraceManager.AddTrace(TraceManager.TraceType.Line.Remove, this);
                    workflow.removeLine(this.Id);
                }
            });
        }
            //ESC取消所有选择
        else if (e.which == 27) {
            e.preventDefault();
            $(workflow.activities).each(function () {
                if (this.isSelected)
                    this.Unselect();
            });

            $(workflow.lines).each(function () {
                if (this.isSelected)
                    this.Unselect();
            });
        }
    },

    doKeyUp: function (e) {
        var workflow=GlobalWorkflowProperties.Workflow;
        var wp=GlobalWorkflowProperties.Wp;
        if (WorkflowEventStack.IsKeyDown) {
            WorkflowEventStack.IsKeyDown = false;

            //方向键移动结束时
            if (e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40) {
                workflow.setMultiActionFlag(WorkflowMultiActionType.None);
                workflow.onActivitiesMovingEnd(workflow.selectedActivities);

                TraceManager.AddTrace(TraceManager.TraceType.Multi.ActivitiesMove, WorkflowEventStack.Objects, WorkflowEventStack.SourceStates);
            }
        }
        //F4显示属性
        if (e.which == 115) {
            if (workflow.selectedActivities && workflow.selectedActivities.length > 0) {
                wp.DisplayProperties(workflow.selectedActivities[0], true);
            }
            else {
                var _SelectedLine;
                //找到选中的线条
                $(workflow.lines).each(function () {
                    if (this.isSelected) {
                        _SelectedLine = this;
                    }
                });
                if (_SelectedLine)
                    wp.DisplayProperties(_SelectedLine, true);
                else
                    wp.DisplayProperties(this. true);
            }
        }
    },
    //开始移动活动
    onActivitiesMovingStart: function (_activities) {
        //当前右、下边缘
        ActivityMovingStack.CurrentRightRange = $(this.workspace_content).position().left + $(this.workspace_content).outerWidth();
        ActivityMovingStack.CurrentBottomRange = $(this.workspace_content).position().top + $(this.workspace_content).outerHeight();

        $(this.activities).each(function () {
            var thisActivity = this;
            if ($(_activities).filter(function () { return this == thisActivity; }).length == 0) {
                if (ActivityMovingStack.WorkspaceContentMinInnerRight < this.right)
                    ActivityMovingStack.WorkspaceContentMinInnerRight = this.right;
                if (ActivityMovingStack.WorkspaceContentMinInnerBottom < this.bottom)
                    ActivityMovingStack.WorkspaceContentMinInnerBottom = this.bottom;
            }
        });

        $(_activities).each(function () {
            var thisActivity = this;
            //首次摁下方向键时去除与线的交点
            $(this.lines).each(function () {
                if (this.startActivity == thisActivity
                    || this.endActivity == thisActivity) {
                    var thisLineId = this.Id;
                    $(this.lines).each(function () {
                        this.removeCrossPointToLine(thisLineId);
                    });
                }
            });
        });

        $(this.lines).each(function () {
            if (this.needRedraw){
                this.draw();
            }
        });
    },

    //活动移动中，重绘相关线条，但不绘制交点
    onActivitiesMoving: function (_activities, _MovingProxy) {
        //当前右、下边缘
        ActivityMovingStack.CurrentRightRange = $(this.workspace_content).position().left + $(this.workspace_content).outerWidth() //- $(this.workspace_content).css('border-right-width').parsePxToFloat();
        ActivityMovingStack.CurrentBottomRange = $(this.workspace_content).position().top + $(this.workspace_content).outerHeight() //- $(this.workspace_content).css('border-bottom-width').parsePxToFloat();

        var _maxRight = 0;
        var _maxBottom = 0;
        if (_MovingProxy) {
            $(_MovingProxy).each(function () {
                var _position = $(this).position();
                var _width = $(this).outerWidth();
                var _height = $(this).outerHeight();
                _maxRight = Math.max(_maxRight, _position.left + _width);
                _maxBottom = Math.max(_maxBottom, _position.top + _height);
            });
        }
        else {
            $(_activities).each(function () {
                if (_maxRight < this.right)
                    _maxRight = this.right;
                if (_maxBottom < this.bottom)
                    _maxBottom = this.bottom;
            });
        }

        //右自减少
        if (ActivityMovingStack.CurrentRightRange > _maxRight && ActivityMovingStack.CurrentRightRange > ActivityMovingStack.WorkspaceContentMinInnerRight && $(this.workspace).outerWidth() > $(this.outerContainer).width()) {
            var reduction = ActivityMovingStack.CurrentRightRange - Math.max(_maxRight, ActivityMovingStack.WorkspaceContentMinInnerRight);
            $(this.workspace).css('width', $(this.workspace).width() - reduction);
            ActivityMovingStack.CurrentRightRange -= reduction;
        }

        //右自增加
        if (_maxRight > ActivityMovingStack.CurrentRightRange) {
            $(this.workspace).css('width', $(this.workspace).width() + (_maxRight - ActivityMovingStack.CurrentRightRange));
            ActivityMovingStack.CurrentRightRange = _maxRight
        }
        //下自减少
        if (ActivityMovingStack.CurrentBottomRange > _maxBottom && ActivityMovingStack.CurrentBottomRange > ActivityMovingStack.WorkspaceContentMinInnerBottom && $(this.workspace).outerHeight() > $(this.outerContainer).height()) {
            var reduction = ActivityMovingStack.CurrentBottomRange - Math.max(_maxBottom, ActivityMovingStack.WorkspaceContentMinInnerBottom);
            $(this.workspace).css('height', $(this.workspace).height() - reduction);
            ActivityMovingStack.CurrentBottomRange -= reduction;
        }

        //下自增加
        if (_maxBottom > ActivityMovingStack.CurrentBottomRange) {
            $(this.workspace).css('height', $(this.workspace).height() + (_maxBottom - ActivityMovingStack.CurrentBottomRange));
            ActivityMovingStack.CurrentBottomRange = _maxBottom;
        }
    },
    //结束活动移动时，计算线条交点并重绘
    onActivitiesMovingEnd: function (_activities) {
        $(_activities).each(function (index) {
            var thisActivity = this;
            $(this.lines).each(function () {
                if (this.startActivity == thisActivity || this.endActivity == thisActivity) {
                    this.calculateCrossPoints();
                }
            });
        });
        $(this.lines).each(function () {
            if (this.needRedraw)
                this.draw(true);
        });

        this.autoFit();
    },
    //计算停靠的活动、点、方向
    calculateDockActivity: function (e) {
        var dockPosition;
        var Activity;
        var x = e.pageX - GlobalWorkflowProperties.SVG.offset().left;
        var y = e.pageY - GlobalWorkflowProperties.SVG.offset().top;

        $(this.activities).each(function () {
            if (x > this.left
                && x < this.left + this.width
                && y > this.top
                && y < this.top + this.height) {
                dockPosition = {
                    Activity: this
                };
                var xPercentage = (x - this.left) / this.width;
                var yPercentage = (y - this.top) / this.height;

                if (Math.min(xPercentage, 1 - xPercentage) < Math.min(yPercentage, 1 - yPercentage)) {
                    dockPosition.y = y;
                    if (xPercentage < 0.5) {
                        dockPosition.x = this.left;
                        dockPosition.DockDirection = LineArrowDirection.Left;
                    }
                    else {
                        dockPosition.x = this.left + this.width;
                        dockPosition.DockDirection = LineArrowDirection.Right;
                    }
                }
                else {
                    dockPosition.x = x;
                    if (yPercentage < 0.5) {
                        dockPosition.DockDirection = LineArrowDirection.Up;
                        dockPosition.y = this.top;
                    }
                    else {
                        dockPosition.DockDirection = LineArrowDirection.Down;
                        dockPosition.y = this.top + this.height;
                    }
                }
            }
        });
        //边缘停靠
        if (!dockPosition) {
            $(this.activities).each(function () {
                if (x > this.left - LineSettings.DockDistanceToEdge
                    && x < this.left + this.width + LineSettings.DockDistanceToEdge
                    && y > this.top - LineSettings.DockDistanceToEdge
                    && y < this.top + this.height + LineSettings.DockDistanceToEdge) {
                    dockPosition = {
                        Activity: this
                    }
                    if (x < this.left || x > this.left + this.width) {
                        dockPosition.y = Math.max(this.top, Math.min(y, this.top + this.height));
                        if (x < this.left) {
                            dockPosition.x = this.left;
                            dockPosition.DockDirection = LineArrowDirection.Left;
                        }
                        else {
                            dockPosition.x = this.left + this.width;
                            dockPosition.DockDirection = LineArrowDirection.Right;
                        }
                    }
                    else {
                        dockPosition.x = x;
                        if (y < this.top) {
                            dockPosition.y = this.top;
                            dockPosition.DockDirection = LineArrowDirection.Up;
                        }
                        else {
                            dockPosition.y = this.top + this.height;
                            dockPosition.DockDirection = LineArrowDirection.Down;
                        }
                    }
                }
            });
        }
        //向中点停靠
        if (dockPosition && dockPosition.Activity) {
            if (Math.abs(dockPosition.Activity.left + dockPosition.Activity.width / 2 - dockPosition.x) <= LineSettings.DockDisntaceToEdgeCenter) {
                dockPosition.x = dockPosition.Activity.left + dockPosition.Activity.width / 2;
            }
            else if (Math.abs(dockPosition.Activity.top + dockPosition.Activity.height / 2 - dockPosition.y) <= LineSettings.DockDisntaceToEdgeCenter) {
                dockPosition.y = dockPosition.Activity.top + dockPosition.Activity.height / 2;
            }
        }

        return dockPosition;
    },

    setSameStyle: function (sameStyle) {
        var that=this;
        if (this.selectedActivities && this.selectedActivities.length > 1) {
            var ObjectAndStates = TraceManager.GetMultiObjAndStates(this.selectedActivities);
            var SourceStates = ObjectAndStates.States;
            var _TraceType = TraceManager.TraceType.Multi.ActivitiesMove;
            //调整活动格式
            switch (sameStyle) {
                case WorkflowSettings.SameStyle.Left:
                case WorkflowSettings.SameStyle.Top:
                case WorkflowSettings.SameStyle.Width:
                    if (sameStyle == WorkflowSettings.SameStyle.Width) {
                        _TraceType = TraceManager.TraceType.Multi.SameWidth;
                    }
                case WorkflowSettings.SameStyle.Height:
                    if (sameStyle == WorkflowSettings.SameStyle.Height) {
                        _TraceType = TraceManager.TraceType.Multi.SameHeight;
                    }
                    {
                        var _value = $(this.selectedActivities[0].htmlObject).css(sameStyle);
                        $(this.selectedActivities).each(function (index) {
                            if (index != 0) {
                                $(this.htmlObject).css(sameStyle, _value);
                            }
                        });
                    }
                    break;
                case WorkflowSettings.SameStyle.Right:
                    {
                        var _right = this.selectedActivities[0].left + this.selectedActivities[0].width;
                        $(this.selectedActivities).each(function (index) {
                            if (index != 0) {
                                $(this.htmlObject).move({
                                    x: _right - this.left - this.width
                                });
                            }
                        });
                    }
                    break;
                case WorkflowSettings.SameStyle.Bottom:
                    {
                        var _bottom = this.selectedActivities[0].top + this.selectedActivities[0].height;
                        $(this.selectedActivities).each(function (index) {
                            if (index != 0) {
                                $(this.htmlObject).move({
                                    y: _bottom - this.top - this.height
                                });
                            }
                        });
                    }
                    break;
                case WorkflowSettings.SameStyle.Middle:
                    {
                        var _middle = this.selectedActivities[0].top + this.selectedActivities[0].height / 2;
                        $(this.selectedActivities).each(function (index) {
                            if (index != 0) {
                                $(this.htmlObject).move({
                                    y: _middle - this.top - this.height / 2
                                });
                            }
                        });
                    }
                    break;
                case WorkflowSettings.SameStyle.Center:
                    {
                        var _center = this.selectedActivities[0].left + this.selectedActivities[0].width / 2;
                        $(this.selectedActivities).each(function (index) {
                            if (index != 0) {
                                $(this.htmlObject).move({ x: _center - this.left - this.width / 2 });
                            }
                        });
                    }
                    break;
                case WorkflowSettings.SameStyle.Size:
                    {
                        var _height = $(this.selectedActivities[0].htmlObject).css('height');
                        var _width = $(this.selectedActivities[0].htmlObject).css('width');
                        $(this.selectedActivities).each(function (index) {
                            if (index != 0)
                                $(this.htmlObject).css('width', _width).css('height', _height);
                        });

                        // _TraceType = TraceManager.TraceType.Multi.SameSize;
                    }
                    break;
                case WorkflowSettings.SameStyle.VerticalDistance:
                    {
                        var _activities = this.selectedActivities.slice();
                        _activities.sort(function (a, b) { return a.top - b.top; });
                        var distanceSum = _activities[_activities.length - 1].top - _activities[0].bottom;
                        for (var index = 1 ; index < _activities.length - 1; index++) {
                            distanceSum -= _activities[index].height;
                        }
                        var distanceAvg = distanceSum / (_activities.length - 1);
                        $(_activities).each(function (index) {
                            if (index > 0 && index != _activities.length - 1)
                                $(this.htmlObject).css('top', $(_activities[index - 1].htmlObject).css('top').parsePxToFloat() + _activities[index - 1].height + distanceAvg);
                        });

                        // _TraceType = TraceManager.TraceType.Multi.VerticalDistance;
                    }
                    break;
                case WorkflowSettings.SameStyle.HorizontalDistance:
                    {
                        var _activities = this.selectedActivities.slice();
                        _activities.sort(function (a, b) { return a.left - b.left; });
                        var distanceSum = _activities[_activities.length - 1].left - _activities[0].right;
                        for (var index = 1 ; index < _activities.length - 1; index++) {
                            distanceSum -= _activities[index].width;
                        }

                        var distanceAvg = distanceSum / (_activities.length - 1);
                        $(_activities).each(function (index) {
                            if (index > 0 && index != _activities.length - 1)
                                $(this.htmlObject).css('left', $(_activities[index - 1].htmlObject).css('left').parsePxToFloat() + _activities[index - 1].width + distanceAvg);
                        });

                        // _TraceType = TraceManager.TraceType.Multi.HorizontalDistance;
                    }
                    break;
            }
            //保存活动位置
            $(this.selectedActivities).each(function (index) {
                this.savePosition(true);
            });

            var _RelatedLines = $(this.lines).filter(function () {
                return $.inArray(this.startActivity, that.selectedActivities) > -1 || $.inArray(this.endActivity, that.selectedActivities) > -1;
            });
            if (_RelatedLines.length > 0) {
                //重新计算线条点
                $(_RelatedLines).each(function () {
                    this.setPoints(true);
                });
                //重新计算交叉点
                $(_RelatedLines).each(function (index) {
                    this.calculateCrossPoints();
                });
                //重绘所有线条(因为可能存在相交的线条)
                $(this.lines).each(function () {
                    if (this.needRedraw)
                        this.draw(true);
                });
            }

            this.autoFit();

            TraceManager.AddTrace(_TraceType, this.selectedActivities, SourceStates);
        }
    },

    //标识复合操作中
    setMultiActionFlag: function (actionType) {
        WorkflowEventStack.CurrentMultiAction = actionType;
        // if (actionType && actionType != WorkflowMultiActionType.None) {

        // }
        // WorkflowEventStack.CurrentMultiAction = actionType;
    },
    displayAssistLine(){
        this.showAssistLine=!this.showAssistLine;
        if(this.showAssistLine){
            $(this.activities).each(function(){
                if(this.ToolTipText!=='End'){
                    $(this.htmlObject).find("." + ActivityStyleClassName.AssistLine).show();                
                }
            });
        }else{
            $(this.activities).each(function(){
                $(this.htmlObject).find("." + ActivityStyleClassName.AssistLine).hide();
            });
        }
    },
    hideAssistLine(){
        this.showAssistLine=false;
        $(this.activities).each(function(){
            $(this.htmlObject).find("." + ActivityStyleClassName.AssistLine).hide();
        });
    }
}


// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/workflow.js
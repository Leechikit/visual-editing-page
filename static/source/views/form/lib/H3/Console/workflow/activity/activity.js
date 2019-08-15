import {WorkflowElementType, WorkflowMode, WorkflowMultiActionType, WorkflowStyleClassName} from '../setting';
import {LineArrowDirection} from '../line/setting';
import {Line} from '../line/line';
import {LineDrawStack} from '../line/setting';
import {PackageManager} from '../package';
import {ActivityStyleClassName, ActivitySettings, ActivityMovingStack,
    ActivityDockSettings, ActivityDockStack, ActivityModelStyleClassName,
    ActivityModelSettings,ActivityResizeDirection} from './setting';
import {ActivityResizeStack, ActivityDragSettings, ActivityDragStack} from './activityDrag';
import {WorkflowProperties} from '../property';
import {TraceManager} from '../workflowTrace';
import {DockPosition} from '../misc';

//活动节点
export const Activity = function (selector, activityModel, Id) {
    // Id
    this.Id = Id;
    this.WorkflowElementType = WorkflowElementType.Activity;

    // 位置
    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;
    // ActivityCode
    this.ActivityCode= undefined;

    //活动类型
    this.ActivityType = undefined;

    //DOM对象
    this.htmlObject = void 0;

    //是否选中
    this.isSelected = false;

    //是否正在编辑
    this.isEditing = false;
    //大小变化处理器
    this.resizeHandler = void 0;

    //初始化
    this.init(selector, activityModel);

    return this;
};

//活动的方法
Activity.prototype = {
    //保存活动位置信息
    //_SaveOnly:        只保存位置,不修改相关线条
    //_ResizeDirection: 被调整边所在的方向
    savePosition: function (_SaveOnly) {
        var oldPosition = {
            left: this.left,
            top: this.top
        };
        var oldSize = {
            width: this.width,
            height: this.height
        };
        var _position = $(this.htmlObject).position();
        if (_position) {
            //位置是否改变
            var _PositionChanged = (this.left !== _position.left) || (this.top !== _position.top) || (this.width !== $(this.htmlObject).outerWidth()) || (this.height != $(this.htmlObject).outerHeight());

            this.left = _position.left;
            this.top = _position.top;
            this.width = $(this.htmlObject).outerWidth();
            this.height = $(this.htmlObject).outerHeight();

            this.right = this.left + this.width;
            this.bottom = this.top + this.height;

            this.center = this.left + this.width / 2;
            this.middle = this.top + this.height / 2;

            this.X = this.center;
            this.Y = this.middle;

            var thisActivity = this;

            //var _BackDirection = LineArrowDirection.Unspecified;
            if (_PositionChanged && !_SaveOnly) {
                // 判断大小是否变化
                if (this.width === oldSize.width || this.height === oldSize.height) {
                    //调整大小时
                    //背向的线条不调整
                   
                    //正向的线条移动端点
                    var _RightDirection = LineArrowDirection.Unspecified;
                    //侧向的线条重绘
                    var _RelateDirections = LineArrowDirection.Unspecified;

                    //正向位移
                    var _RightOffset = {
                        x: 0,
                        y: 0
                    };

                    //宽度调整
                    if (this.width !== oldSize.width){
                        _RelateDirections = [LineArrowDirection.Up, LineArrowDirection.Down];
                        if (this.left === oldPosition.left){
                            _RightDirection = LineArrowDirection.Right;
                            _RightOffset.x = this.width - oldSize.width;
                        } else {
                            _RightDirection = LineArrowDirection.Left;
                            _RightOffset.x = oldSize.width - this.width;
                        }
                    } else {
                        _RelateDirections = [LineArrowDirection.Left, LineArrowDirection.Right];
                        if (this.top === oldPosition.top) {
                            _RightDirection = LineArrowDirection.Down;
                            _RightOffset.y = this.height - oldSize.height;
                        } else {
                            _RightDirection = LineArrowDirection.Up;
                            _RightOffset.y = oldSize.height - this.height;
                        }
                    }

                    //背向
                   // var _BackDirection = LineArrowDirection.Opposite(_RightDirection);

                    //修改正向线段的端点
                    //重绘侧向线条
                    $(GlobalWorkflowProperties.Workflow.lines).each(function () {
                        //起\止点是否需要重设
                        var _startReset = (this.startActivity === thisActivity && $.inArray(this.startDirection, _RelateDirections) > -1);
                        var _endReset = (this.endActivity === thisActivity && $.inArray(this.endDirection, _RelateDirections) > -1);
                        //起\止点是否需要移动
                        var needMoveStart = (this.startActivity === thisActivity && this.startDirection === _RightDirection)
                        var needMoveEnd = (this.endActivity === thisActivity && this.endDirection === _RightDirection);
                        if (_startReset) {
                            this.startPoint = {
                                x: thisActivity.left + this.offsetToStartActivity.x * thisActivity.width,
                                y: thisActivity.top + this.offsetToStartActivity.y * thisActivity.height
                            };
                        }
                        if (_endReset) {
                            this.endPoint = {
                                x: thisActivity.left + this.offsetToEndActivity.x * thisActivity.width,
                                y: thisActivity.top + this.offsetToEndActivity.y * thisActivity.height
                            };
                        }
                        if (_startReset || _endReset) {
                            this.setPoints();
                        }
                        else if (needMoveStart && needMoveEnd) {
                            this.DoMove(_RightOffset);
                        }
                        else if (needMoveStart) {
                            this.MoveStartPoint(_RightOffset);
                        }
                        else if (needMoveEnd) {
                            this.MoveEndPoint(_RightOffset);
                        }
                    });
                }
                    //如果没有调整大小,判断是否有位置移动
                else if (oldPosition.left !== _position.left || oldPosition.top !== _position.top) {
                    //修改活动的线条的停靠点
                    $(GlobalWorkflowProperties.Workflow.lines).each(function () {
                        if (this.startActivity === thisActivity) {
                            this.startPoint = {
                                x: thisActivity.left + this.offsetToStartActivity.x * thisActivity.width,
                                y: thisActivity.top + this.offsetToStartActivity.y * thisActivity.height
                            };
                        }
                        if (this.endActivity === thisActivity) {
                            this.endPoint = {
                                x: thisActivity.left + this.offsetToEndActivity.x * thisActivity.width,
                                y: thisActivity.top + this.offsetToEndActivity.y * thisActivity.height
                            };
                        }
                        if (this.startActivity === thisActivity || this.endActivity === thisActivity) {
                            this.setPoints();
                        }
                    });
                }
            }
        }
    },

    //显示箭头,
    showArrow: function (){
    },
    //活动初始化
    init: function (selector, activityModel) {
        //活动DOM
        this.htmlObject = $(selector)[0];

        this.FontColor = $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel).css('color');
        this.FontSize = "12px";
        //this.DisplayName = $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel).text();

        var _activityModel = $.extend({}, {}, activityModel);
        delete _activityModel['htmlObject'];

        //根据活动模板初始化活动
        function initActivity(_ActivityModel, _Activity) {
            if (!_ActivityModel || !_Activity){
                return;
            }
                
            switch (_ActivityModel.ToolTipText) {
                case 'Start':
                    break;
                case 'End':
                    break;
            }
        }

        ////初始化模板属性
        //$.extend(this, this, _activityModel);
        this.ActivityType = _activityModel.ActivityType;
        this.ToolTipText = _activityModel.ToolTipText;

        $(this.htmlObject).removeClass(ActivityModelStyleClassName.ActivityModel);

        this.DisplayName = $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel).text();

        //如果不存在控制点则添加
        if ($(this.htmlObject).find('.' + ActivityStyleClassName.Resize).length === 0) {
            var _resize = $("<div class='" + ActivityStyleClassName.Resize + "'></div>")
            var upperLeft = _resize.clone().addClass(ActivityStyleClassName.ResizeTopLeft);
            var upperRight = _resize.clone().addClass(ActivityStyleClassName.ResizeTopRight);
            var downLeft = _resize.clone().addClass(ActivityStyleClassName.ResizeBottomLeft);
            var downRight = _resize.clone().addClass(ActivityStyleClassName.ResizeBottomRight);
            $(this.htmlObject).append(upperLeft).append(upperRight).append(downLeft).append(downRight);
        }

         //辅助线控制点
         if ($(this.htmlObject).find("." + ActivityStyleClassName.AssistLine).length == 0) {
            var _assistline = $("<div class='" + ActivityStyleClassName.AssistLine + "'></div>")
            $(this.htmlObject).append(_assistline.clone().addClass(ActivityStyleClassName.AssistLineLeft));
            $(this.htmlObject).append(_assistline.clone().addClass(ActivityStyleClassName.AssistLineRight));
            $(this.htmlObject).append(_assistline.clone().addClass(ActivityStyleClassName.AssistLineUp));
            $(this.htmlObject).append(_assistline.clone().addClass(ActivityStyleClassName.AssistLineDown));
        }

        //在DOM对象里保存当前活动信息
       // $(this.htmlObject).data(ActivitySettings.ActivityDataProperty, this);

        //Id
        if (!this.Id){
            this.Id = GlobalWorkflowProperties.Workflow.getNewShapeID();
        }

        //ActivityCode
        if (!this.ActivityCode){
            this.ActivityCode = 'Activity' + this.Id;
        }

        if (!$(this.htmlObject).hasClass(ActivityStyleClassName.Activity)){
            $(this.htmlObject).addClass(ActivityStyleClassName.Activity);
        }
        //保存位置信息
        this.savePosition(true);

        $(this.htmlObject).data(ActivitySettings.ActivityDataProperty, this);

        //初始化行为  --隐藏双击编辑文本事件
        if (GlobalWorkflowProperties.WorkflowMode === WorkflowMode.Designer) {
            $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityContent).css('cursor', 'move');
        }
        var that=this;
        $(this.htmlObject).hover(function () {
            if(that.ToolTipText=='End'){
                return;
            }
            $(this).find("." + ActivityStyleClassName.AssistLine).show();
        }, function () {
            //如果非选中状态离开时隐藏
            if (!that.isSelected) {
                if(!GlobalWorkflowProperties.Workflow.showAssistLine){
                    $(this).find("." + ActivityStyleClassName.AssistLine).hide();
                }
            }
        });
        return this;
    },

    //从模板初始化属性
    getPropertyFromModel: function () {
        if (!this.ActivityType || !ActivityModelSettings.ActivityModels) {
            return;
        }
        var _Activity = this;
        var _ToolTipText = this.ToolTipText;
        var _ActivityModel = ActivityModelSettings.GetActivityModelByTypeName(_ToolTipText);
        if (_ActivityModel) {
            //找到模板
            var _ModelProperties = $(ActivitySettings.ModelableProperties).filter(function () {
                return this.ToolTipText === _ToolTipText;
            });

            if (_ModelProperties && _ModelProperties.length > 0) {
                //通用属性
                $(ActivitySettings.CommonProperties).each(function () {
                    if (typeof (_ActivityModel[this]) === 'object') {
                        //对象类型属性需要深度复制
                        //ERROR: ���护时需特别注意,object类型属性更改时,需使用新的object保存
                    }
                    _Activity[this] = _ActivityModel[this];
                });
                //特定属性
                $(_ModelProperties[0].Properties).each(function () {

                    //对象类型属性需要深度复制
                    if (typeof (_ActivityModel[this]) === 'object'&&
                         this.toString() === 'PermittedActions') {
                        _Activity[this] = {};
                        if (typeof (_Activity[this]) !== 'undefined') {
                            for (var p in _ActivityModel[this]) {
                                //
                                if (typeof (_ActivityModel['PermittedActions'][p]) !== 'object') {
                                    _Activity['PermittedActions'][p] = _ActivityModel['PermittedActions'][p];
                                }
                            }
                        }
                    } else {
                        _Activity[this] = _ActivityModel[this];
                    }
                });

                //自定义数据权限
                // var _DataItems = PackageManager.GetDataItems();
                // $(WorkflowProperties[_ToolTipText]).each(function () {
                //     if (this.Group === 'DataItem') {
                //         _Activity['PropertyPermissions'] = [];
                //         $(_DataItems).each(function () {
                //             _Activity['PropertyPermissions'].push({
                //                 ItemName: this.Value,
                //                 Visible: true,
                //                 MobileVisible: true
                //             });
                //         });
                //     }
                // });

                //自定义代码
                this.initCustomCode();
                this.SetFontSize();
                this.SetFontColor();
            }
        }
    },

    initCustomCode: function () {
        var _ActivityModel = ActivityModelSettings.GetActivityModelByType(this.ActivityType);
        //自定义代码
        if (_ActivityModel) {
            if (_ActivityModel.CustomCode){
                this.CustomCode = _ActivityModel.CustomCode.replace(/{ClassName}/g, 'Activity' + this.Id);
            } else {
                this.CustomCode = '';
            }
        }
    },

    //设置为模板
    savePropertyAsModel: function () {
        if (typeof (this.ActivityType) === 'undefined' || !ActivityModelSettings.ActivityModels) {
            return;
        }

        var _Activity = this;
        var _ToolTipText = this.ToolTipText;
        var _ActivityModel = ActivityModelSettings.GetActivityModelByTypeName(_ToolTipText);
        if (_ActivityModel) {
            $(ActivitySettings.ModelableProperties).each(function () {
                if (this.ToolTipText === _ToolTipText) {
                    $(this.Properties).each(function () {
                        _ActivityModel[this] = _Activity[this];
                    });
                }
            });

            $(ActivitySettings.CommonProperties).each(function () {
                _ActivityModel[this] = _Activity[this];
            });

            //复制模板
            var _activityModel = $.extend({}, {}, _ActivityModel);
            delete _activityModel['htmlObject'];

            //允许的操作:驳回到指定活动属性不通用
            if (_activityModel.PermittedActions) {
                _activityModel.PermittedActions['RejectToActivityCodes'] = [];
            }

            //保存到服务器
            // $.ajax({
            //     type: 'post',
            //     url: WorkflowDocumentSettings.WorklfowHandlerAjaxUrl,
            //     cache: false,
            //     async: false,
            //     dataType: 'json',
            //     data: {
            //         Command: 'SaveActivityTemplate',
            //         ActivityType: ContextMenuStack.Target.ActivityType,
            //         Activity: $.fn.htmlEscape(JSON.stringify(_activityModel))
            //     },
            //     success: function (result) {
            //         if (result == 'PortalSessionOut') {
            //             WorkflowDocument.ShowLogin();
            //             return;
            //         }

            //         if (result.Result) {
            //             WorkflowDocument.ShowDealResult(_WorkflowDesigner_GlobalString.Activity_SaveSuccess);
            //         }
            //         else {
            //             var _Content = [{
            //                 status: 'error', text: _WorkflowDesigner_GlobalString.Activity_SaveFailed
            //             }];

            //             if (result.Errors && result.Errors.length > 0) {
            //                 _Content.push({
            //                     status: 'error', text: result.Errors[0]
            //                 });
            //                 WorkflowDocument.ShowDealResult(_Content);
            //             };
            //         }
            //     },
            //     error: function (msg) {
            //         WorkflowDocument.ShowAjaxErrors(msg, _WorkflowDesigner_GlobalString.Activity_SaveFailed);
            //     }
            // });
        }
    },

    SetText: function () {
        $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel).text(this.DisplayName);
    },

    GetFontColor: function () {
        if (!this.FontColor) {
            this.FontColor = ActivitySettings.DefaultFontColor;
        }
        return this.FontColor;
    },

    SetFontColor: function () {
        var _div = $('<div></div>');
        if (!this.FontColor){
            this.FontColor = ActivitySettings.DefaultFontColor;
        }
        _div.css('color', this.FontColor);
        this.FontColor = _div.css('color');

        $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel).css('color', this.FontColor);
    },

    GetFontSize: function () {
        var _FontSize = parseInt($(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel).css('font-size').replace('px', ''));
        if (isNaN(_FontSize)){
            _FontSize = ActivitySettings.DefaultFontSize;
        }
        this.FontSize = _FontSize;
        return _FontSize;
    },

    SetFontSize: function () {
        if (isNaN(this.FontSize) || parseInt(this.FontSize) <= 0) {
            this.FontSize = ActivitySettings.DefaultFontSize;
        }
        $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel).css('font-size', this.FontSize + 'px');

        var _FinialSize = $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel).css('font-size');

        if (_FinialSize){
            this.FontSize = parseInt(_FinialSize.replace(/px/, ''));
        }
    },

    //选中
    //_SetOnlyTarget:设为唯一选中的活动
    Select: function (_SetOnlyTarget) {
        var _thisActivity = this;
        //取消选中其他活动
        if (_SetOnlyTarget) {
            $(GlobalWorkflowProperties.Workflow.selectedActivities).each(function () {
                if (this !== _thisActivity){
                    this.Unselect();
                }
            });
        }
        //选中当前活动
        if (!this.isSelected) {
            GlobalWorkflowProperties.Workflow.selectedActivities.push(this);
            this.isSelected = true;
            $(this.htmlObject).addClass(ActivityStyleClassName.ActivitySelected);
            if(this.ToolTipText!='End'){
                $(this.htmlObject).find("." + ActivityStyleClassName.AssistLine).show();
            }

            //选中的第一个活动显示不同样式
            $('.' + ActivityStyleClassName.ActivitySelectedFirst).removeClass(ActivityStyleClassName.ActivitySelectedFirst);
            if (GlobalWorkflowProperties.Workflow.selectedActivities.length > 0)
                $(GlobalWorkflowProperties.Workflow.selectedActivities[0].htmlObject).addClass(ActivityStyleClassName.ActivitySelectedFirst);
        } else {
            //如果存在编辑框就自动获取焦点
            $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel).children('input').focus();
        }
        
        return this;
    },

    //取消选中
    Unselect: function () {
        if (this.isSelected) {
            this.isSelected = false;
            $(this.htmlObject).removeClass(ActivityStyleClassName.ActivitySelected);

            $(this.htmlObject).find("." + ActivityStyleClassName.AssistLine).hide();

            //编辑值
            var $edit = $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel).children('input');
            if ($edit.length > 0) {
                this.DisplayName = $edit.val();
                $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel).text(this.DisplayName);
            }

            var _index = $.inArray(this, GlobalWorkflowProperties.Workflow.selectedActivities);
            if (_index > -1) {
                GlobalWorkflowProperties.Workflow.selectedActivities.splice(_index, 1);
            }
        }

        //选中的第一个活动显示不同样式
        $('.' + ActivityStyleClassName.ActivitySelectedFirst).removeClass(ActivityStyleClassName.ActivitySelectedFirst);
        if (GlobalWorkflowProperties.Workflow.selectedActivities.length > 0)
            $(GlobalWorkflowProperties.Workflow.selectedActivities[0].htmlObject).addClass(ActivityStyleClassName.ActivitySelectedFirst);

        //如果显示的是当前属性,更新
        if (!$.isEmptyObject(GlobalWorkflowProperties.Wp)) {
            if (GlobalWorkflowProperties.Wp.Multi.isMulti && GlobalWorkflowProperties.Workflow.selectedActivities && GlobalWorkflowProperties.Workflow.selectedActivities.length > 0) {
                GlobalWorkflowProperties.Wp.DisplayProperties(GlobalWorkflowProperties.Workflow.selectedActivities[0]);
            }
            else if (GlobalWorkflowProperties.Wp.CurrentObject == this) {
                GlobalWorkflowProperties.Wp.DisplayProperties(GlobalWorkflowProperties.Workflow);
            }
        }
        return this;
    },

    redrawLines: function () {
        //获取当前操纵的活动对象
        var thisActivity = this;
        if (thisActivity) {
            $(GlobalWorkflowProperties.Workflow.lines).each(function () {
                if (this.startActivity == thisActivity || this.endActivity == thisActivity) {
                    this.calculateCrossPoints();
                }
            });

            $(GlobalWorkflowProperties.Workflow.lines).each(function () {
                if (this.needRedraw)
                    this.draw(true);
            });
        }
    },

    //切换为第一个选中的活动
    SwitchToFirst: function () {
        this.Select();
        if (GlobalWorkflowProperties.Workflow.selectedActivities[0] != this) {
            $('.' + ActivityStyleClassName.ActivitySelectedFirst).removeClass(ActivityStyleClassName.ActivitySelectedFirst);
            $(this.htmlObject).addClass(ActivityStyleClassName.ActivitySelectedFirst);

            //将当前活动移到移一个
            var _index = $.inArray(this, GlobalWorkflowProperties.Workflow.selectedActivities);
            GlobalWorkflowProperties.Workflow.selectedActivities.splice(_index, 1);
            GlobalWorkflowProperties.Workflow.selectedActivities.splice(0, 0, this);
        }
    },

    //活动的鼠标事件
    doDown: function (e) {
        if (GlobalWorkflowProperties.WorkflowMode === WorkflowMode.ViewOnly){
            return;
        }
        if (!e){
            return;
        }
        //多选时,不显示属性
        //如果摁中Ctrl,加选当前活动
        if (!e.ctrlKey) {
            //若当前已选中,切换为主活动,显示属性
            if (this.isSelected) {
                this.SwitchToFirst();
            } else {
                //若未选中,清空所有选中项,选择当前活动
                this.Select(true);
            }
            GlobalWorkflowProperties.Wp.DisplayProperties(GlobalWorkflowProperties.Workflow.selectedActivities[0]);
        }

        e.preventDefault();

        $(GlobalWorkflowProperties.Workflow.lines).each(function () {
            if (this.isSelected){
                this.Unselect();
            }
        });

        //点击内容区域，可拖动
        var activityContent=null;
        if ($(e.target).hasClass(ActivityStyleClassName.ActivityContent)){
            activityContent = $(e.target);
        } else if ($(e.target).parents('.' + ActivityStyleClassName.ActivityContent).length > 0){
            activityContent = $(e.target).parents('.' + ActivityStyleClassName.ActivityContent + ':first');
        }
        var activity;
        if (activityContent && activityContent.length > 0) {
            //初始化拖拽设置
            ActivityDragStack.DraggingActivities = [];
            ActivityDragStack.DraggingProxy = [];

            //���标下的活动
            activity = activityContent.parents('.' + ActivityStyleClassName.Activity + ':first').data(ActivitySettings.ActivityDataProperty);

            //创建拖动代理
            ActivityDragStack.CreateDragProxy(activity);
            //如果当前活动是选中的，或者摁了Ctrl键，那么其他选中的活动可同时移动
            if (activity.isSelected || e.ctrlKey) {
                $(GlobalWorkflowProperties.Workflow.selectedActivities).each(function () {
                    if (this.Id !== activity.Id &&
                        $(this.htmlObject).hasClass(ActivityStyleClassName.ActivitySelected)){
                            ActivityDragStack.CreateDragProxy(this);
                    }
                });
            } else {
                $(GlobalWorkflowProperties.Workflow.selectedActivities).each(function () {
                    if (this.Id !== activity.Id){
                        this.Unselect();
                    }
                });
            }

            ActivityDragStack.DragStartPoint = ActivityDragStack.PreDragPoint = {
                x: e.pageX,
                y: e.pageY
            };

            //触发活动移动前事件
            GlobalWorkflowProperties.Workflow.onActivitiesMovingStart(ActivityDragStack.DraggingActivities);

            //拖动
            $(document).unbind(ActivityDragSettings.EventNameSpace)
                .bind('mousemove' + ActivityDragSettings.EventNameSpace, function (e) {
                    if (!ActivityDragStack.IsDragging) {
                        ActivityDragStack.IsDragging = true;
                        GlobalWorkflowProperties.Workflow.setMultiActionFlag(WorkflowMultiActionType.ActivityDragMove);

                        $(ActivityDragStack.DraggingProxy).each(function () {
                            $(this).show();
                        });
                        $(ActivityDragStack.DraggingActivities).each(function () {
                            if (!this.isSelected) {
                                this.Select();
                                GlobalWorkflowProperties.Wp.DisplayProperties(GlobalWorkflowProperties.Workflow.selectedActivities);
                            }
                        });
                    }

                    var _moveOffsetX = e.pageX - ActivityDragStack.PreDragPoint.x;
                    var _moveOffsetY = e.pageY - ActivityDragStack.PreDragPoint.y;

                    ActivityMovingStack.LeftDocked = false;
                    ActivityMovingStack.TopDocked = false;

                    $(ActivityDragStack.DraggingProxy).each(function () {
                        //var _position = $(this).position();
                        var _position = { left: this.left, top: this.top };
                        //左边缘
                        if (_position.left + _moveOffsetX < ActivityMovingStack.WorkflowContentEdgeLeft) {
                            _moveOffsetX = ActivityMovingStack.WorkflowContentEdgeLeft - _position.left;
                            ActivityMovingStack.LeftDocked = true;
                        }
                        //上边缘
                        if (_position.top + _moveOffsetY < ActivityMovingStack.WorkflowContentEdgeTop) {
                            _moveOffsetY = ActivityMovingStack.WorkflowContentEdgeTop - _position.top;
                            ActivityMovingStack.TopDocked = true;
                        }
                    });

                    $(ActivityDragStack.DraggingProxy).each(function () {
                        this.left += _moveOffsetX;
                        this.top += _moveOffsetY;
                    });

                    ActivityDragStack.PreDragPoint.x += _moveOffsetX;
                    ActivityDragStack.PreDragPoint.y += _moveOffsetY;

                    //如果移动对象是单个，启用对齐计算
                    if (ActivityDragStack.DraggingActivities.length == 1) {
                        //隐藏对齐线
                        $('.' + WorkflowStyleClassName.ActivityDockLine).hide();

                        //对齐计算
                        var CalculateActivityDock = function () {
                            var _position = { left: ActivityDragStack.DraggingProxy[0].left, top: ActivityDragStack.DraggingProxy[0].top };
                            var _width = ActivityDragStack.DraggingActivities[0].width;
                            var _height = ActivityDragStack.DraggingActivities[0].height;
                            //初始化
                            ActivityDockStack.x = Number.POSITIVE_INFINITY;
                            ActivityDockStack.y = Number.POSITIVE_INFINITY;

                            ActivityDockStack.OffsetLeftDockLineStyle = void 0;
                            ActivityDockStack.CenterDockLineStyle = void 0;
                            ActivityDockStack.RightDockLineStyle = void 0;

                            ActivityDockStack.TopDockLineStyle = void 0;
                            ActivityDockStack.MiddleDockLineStyle = void 0;
                            ActivityDockStack.BottomDockLineStyle = void 0;

                            //初始化对齐的对象
                            var _initHorizontalDock = function () {
                                ActivityDockStack.OffsetLeftDockActivities = [];
                                ActivityDockStack.CenterDockActivities = [];
                                ActivityDockStack.RightDockActivities = [];
                            };
                            var _initVerticalDock = function () {
                                ActivityDockStack.TopDockActivities = [];
                                ActivityDockStack.MiddleDockActivities = [];
                                ActivityDockStack.BottomDockActivities = [];
                            };
                            _initHorizontalDock();
                            _initVerticalDock();

                            if (_position && GlobalWorkflowProperties.Workflow.activities && GlobalWorkflowProperties.Workflow.activities.length > 1) {
                                var _center = _position.left + _width / 2;
                                var _middle = _position.top + _height / 2;
                                var _right = _position.left + _width;
                                var _bottom = _position.top + _height;

                                $(GlobalWorkflowProperties.Workflow.activities).each(function () {
                                    var currentActivity = this;
                                    //add by xc 如果为第一次从操作栏拖出，则不与自身进行匹配对其
                                    if ($(currentActivity.htmlObject).hasClass('firstDragOut')){
                                        return true;
                                    }
                                    //end

                                    //允许和未选中的其他活动对齐,或者与自己对齐
                                    //if (currentActivity.Id != ActivityDragStack.DraggingActivities[0].Id && !currentActivity.isSelected)
                                    // {
                                    if (!ActivityMovingStack.LeftDocked) {
                                        //左
                                        if (Math.abs(currentActivity.left - _position.left) <= ActivityDockSettings.MoveDockSize &&
                                         Math.abs(currentActivity.left - _position.left) < Math.abs(ActivityDockStack.x)) {
                                            ActivityDockStack.x = currentActivity.left - _position.left;
                                            _initHorizontalDock();
                                            ActivityDockStack.OffsetLeftDockActivities.push(currentActivity);
                                        } else if (currentActivity.left - _position.left == ActivityDockStack.x) {
                                            ActivityDockStack.OffsetLeftDockActivities.push(currentActivity);
                                        }
                                        //中
                                        if (Math.abs(currentActivity.center + -_center) <= ActivityDockSettings.MoveDockSize &&
                                         Math.abs(currentActivity.center + -_center) < Math.abs(ActivityDockStack.x)) {
                                            ActivityDockStack.x = currentActivity.center - _center;
                                            _initHorizontalDock();
                                            ActivityDockStack.CenterDockActivities.push(currentActivity);
                                        } else if (currentActivity.center - _center === ActivityDockStack.x) {
                                            ActivityDockStack.CenterDockActivities.push(currentActivity);
                                        }
                                        //右
                                        if (Math.abs(currentActivity.right - _right) <= ActivityDockSettings.MoveDockSize &&
                                         Math.abs(currentActivity.right - _right) < Math.abs(ActivityDockStack.x)) {
                                            ActivityDockStack.x = currentActivity.right - _right;
                                            _initHorizontalDock();
                                            ActivityDockStack.RightDockActivities.push(currentActivity);
                                        } else if (currentActivity.right - _right === ActivityDockStack.x) {
                                            ActivityDockStack.RightDockActivities.push(currentActivity);
                                        }
                                    }
                                    if (!ActivityMovingStack.TopDocked) {
                                        //上
                                        if (Math.abs(currentActivity.top - _position.top) <= ActivityDockSettings.MoveDockSize &&
                                         Math.abs(currentActivity.top - _position.top) < Math.abs(ActivityDockStack.y)) {
                                            ActivityDockStack.y = currentActivity.top - _position.top;
                                            _initVerticalDock();
                                            ActivityDockStack.TopDockActivities.push(currentActivity);
                                        } else if (currentActivity.top - _position.top === ActivityDockStack.y) {
                                            ActivityDockStack.TopDockActivities.push(currentActivity);
                                        }
                                        //中
                                        if (Math.abs(currentActivity.middle - _middle) <= ActivityDockSettings.MoveDockSize &&
                                         Math.abs(currentActivity.middle - _middle) < Math.abs(ActivityDockStack.y)) {
                                            ActivityDockStack.y = currentActivity.middle - _middle;
                                            _initVerticalDock();
                                            ActivityDockStack.MiddleDockActivities.push(currentActivity);
                                        } else if (currentActivity.middle - _middle === ActivityDockStack.y) {
                                            ActivityDockStack.MiddleDockActivities.push(currentActivity);
                                        }
                                        //下
                                        if (Math.abs(currentActivity.bottom - _bottom) <= ActivityDockSettings.MoveDockSize &&
                                         Math.abs(currentActivity.bottom - _bottom) < Math.abs(ActivityDockStack.y)) {
                                            ActivityDockStack.y = currentActivity.bottom - _bottom;

                                            _initVerticalDock();
                                            ActivityDockStack.BottomDockActivities.push(currentActivity);
                                        } else if (currentActivity.bottom - _bottom == ActivityDockStack.y) {
                                            ActivityDockStack.BottomDockActivities.push(currentActivity);
                                        }
                                    }
                                // }
                                });
                            }

                            if (ActivityDockStack.x !== Number.POSITIVE_INFINITY || ActivityDockStack.y !== Number.POSITIVE_INFINITY) {
                                return ActivityDockStack;
                            }
                        };
                        var _ActivityDockStack = CalculateActivityDock();

                        if (_ActivityDockStack) {
                            if (Math.abs(_ActivityDockStack.x) < Number.POSITIVE_INFINITY) {
                                ActivityDragStack.DraggingProxy[0].left += _ActivityDockStack.x;
                                ActivityDragStack.PreDragPoint.x += _ActivityDockStack.x;
                            }
                            if (Math.abs(_ActivityDockStack.y) < Number.POSITIVE_INFINITY) {
                                ActivityDragStack.DraggingProxy[0].top += _ActivityDockStack.y;
                                ActivityDragStack.PreDragPoint.y += _ActivityDockStack.y;
                            }

                            var _position = { left: ActivityDragStack.DraggingProxy[0].left, top: ActivityDragStack.DraggingProxy[0].top };
                            var _height = ActivityDragStack.DraggingActivities[0].height;
                            var _width = ActivityDragStack.DraggingActivities[0].width;

                            //显示对齐线
                            if (Math.abs(ActivityDockStack.x) <= ActivityDockSettings.MoveDockSize) {
                                //左对齐
                                if (ActivityDockStack.OffsetLeftDockActivities && ActivityDockStack.OffsetLeftDockActivities.length > 0) {
                                    let _minBottom = _position.top + _height;
                                    let _maxTop = _position.top;
                                    for (var index = 0; index < ActivityDockStack.OffsetLeftDockActivities.length; index++) {
                                        var currentActivity = ActivityDockStack.OffsetLeftDockActivities[index];
                                        if (_minBottom > currentActivity.bottom){
                                            _minBottom = currentActivity.bottom;
                                        }
                                        if (_maxTop < currentActivity.top){
                                            _maxTop = currentActivity.top;
                                        }
                                    };
                                    $('.' + WorkflowStyleClassName.ActivityDockLineOffsetLeft)
                                        .css('left', _position.left)
                                        .css('top', _minBottom)
                                        .css('height', _maxTop - _minBottom)
                                        .show();
                                }
                                //中
                                if (ActivityDockStack.CenterDockActivities && ActivityDockStack.CenterDockActivities.length > 0) {
                                    let _minBottom = _position.top + _height;
                                    let _maxTop = _position.top;
                                    for (let index = 0; index < ActivityDockStack.CenterDockActivities.length; index++) {
                                        let currentActivity = ActivityDockStack.CenterDockActivities[index];
                                        if (_minBottom > currentActivity.bottom){
                                            _minBottom = currentActivity.bottom;
                                        }
                                        if (_maxTop < currentActivity.top){
                                            _maxTop = currentActivity.top;
                                        }
                                    };
                                    $('.' + WorkflowStyleClassName.ActivityDockLineCenter)
                                        .css('left', _position.left + _width / 2)
                                        .css('top', _minBottom)
                                        .css('height', _maxTop - _minBottom)
                                        .show();
                                }
                                //右对齐
                                if (ActivityDockStack.RightDockActivities && ActivityDockStack.RightDockActivities.length > 0) {
                                    let _minBottom = _position.top + _height;
                                    let _maxTop = _position.top;
                                    for (let index = 0; index < ActivityDockStack.RightDockActivities.length; index++) {
                                        let currentActivity = ActivityDockStack.RightDockActivities[index];
                                        if (_minBottom > currentActivity.bottom){
                                            _minBottom = currentActivity.bottom;
                                        }
                                        if (_maxTop < currentActivity.top){
                                            _maxTop = currentActivity.top;
                                        }
                                    };
                                    $('.' + WorkflowStyleClassName.ActivityDockLineRight)
                                        .css('left', _position.left + _width)
                                        .css('top', _minBottom)
                                        .css('height', _maxTop - _minBottom)
                                        .show();
                                }
                            }

                            if (Math.abs(ActivityDockStack.y) <= ActivityDockSettings.MoveDockSize) {
                                //上对齐
                                if (ActivityDockStack.TopDockActivities && ActivityDockStack.TopDockActivities.length > 0) {
                                    let _minRight = _position.left + _width;
                                    let _maxOffsetLeft = _position.left;
                                    for (let index = 0; index < ActivityDockStack.TopDockActivities.length; index++) {
                                        let currentActivity = ActivityDockStack.TopDockActivities[index];
                                        if (_minRight > currentActivity.right){
                                            _minRight = currentActivity.right;
                                        }
                                        if (_maxOffsetLeft < currentActivity.left){
                                            _maxOffsetLeft = currentActivity.left;
                                        }
                                    };
                                    $('.' + WorkflowStyleClassName.ActivityDockLineTop)
                                        .css('left', _minRight)
                                        .css('top', _position.top)
                                        .css('width', _maxOffsetLeft - _minRight)
                                        .show();
                                }
                                //中
                                if (ActivityDockStack.MiddleDockActivities && ActivityDockStack.MiddleDockActivities.length > 0) {
                                    let _minRight = _position.left + _width;
                                    let _maxOffsetLeft = _position.left;
                                    for (let index = 0; index < ActivityDockStack.MiddleDockActivities.length; index++) {
                                        let currentActivity = ActivityDockStack.MiddleDockActivities[index];
                                        if (_minRight > currentActivity.right){
                                            _minRight = currentActivity.right;
                                        }
                                        if (_maxOffsetLeft < currentActivity.left){
                                            _maxOffsetLeft = currentActivity.left;
                                        }
                                    };
                                    ActivityDockStack.MiddleDockLineStyle = {
                                        top: _position.top + _height / 2 + ActivityDockStack.y,
                                        left: _minRight,
                                        width: _maxOffsetLeft - _minRight
                                    };
                                    $('.' + WorkflowStyleClassName.ActivityDockLineMiddle)
                                        .css('left', _minRight)
                                        .css('top', _position.top + _height / 2)
                                        .css('width', _maxOffsetLeft - _minRight)
                                        .show();
                                }
                                //下
                                if (ActivityDockStack.BottomDockActivities && ActivityDockStack.BottomDockActivities.length > 0) {
                                    let _minRight = _position.left + _width;
                                    let _maxOffsetLeft = _position.left;
                                    for (let index = 0; index < ActivityDockStack.BottomDockActivities.length; index++) {
                                        let currentActivity = ActivityDockStack.BottomDockActivities[index];
                                        if (_minRight > currentActivity.right){
                                            _minRight = currentActivity.right;
                                        }
                                        if (_maxOffsetLeft < currentActivity.left){
                                            _maxOffsetLeft = currentActivity.left;
                                        }
                                    };
                                    $('.' + WorkflowStyleClassName.ActivityDockLineBottom)
                                        .css('left', _minRight)
                                        .css('top', _position.top + _height)
                                        .css('width', _maxOffsetLeft - _minRight)
                                        .show();
                                }
                            }
                        }
                    }

                    $(ActivityDragStack.DraggingProxy).each(function () {
                        this.css('left', this.left);
                        this.css('top', this.top);
                    });

                    GlobalWorkflowProperties.Workflow.onActivitiesMoving(ActivityDragStack.DraggingActivities, ActivityDragStack.DraggingProxy);
                });
            //结束拖动
            $(document).one('mouseup' + ActivityDragSettings.EventNameSpace, function (e) {
                GlobalWorkflowProperties.Workflow.setMultiActionFlag(WorkflowMultiActionType.None);

                //源状态
                var _SourceStates = [];
                var _Targets = [];

                //隐藏对齐线
                $('.' + WorkflowStyleClassName.ActivityDockLine).hide();

                if (ActivityDragStack.DraggingProxy &&
                    ActivityDragStack.DraggingActivities &&
                    ActivityDragStack.DraggingProxy.length === ActivityDragStack.DraggingActivities.length) {
                    
                    //记录源状态
                    $(ActivityDragStack.DraggingActivities).each(function () {
                        _SourceStates.push(TraceManager.GetWorkflowElementProperties(this));
                        _Targets.push(this);
                    });
                    $(GlobalWorkflowProperties.Workflow.lines).each(function () {
                        if ($.inArray(this.startActivity, ActivityDragStack.DraggingActivities) > -1 || $.inArray(this.endActivity, ActivityDragStack.DraggingActivities > -1)) {
                            _SourceStates.push(TraceManager.GetWorkflowElementProperties(this));
                            _Targets.push(this);
                        }
                    });

                    //活动移动位移
                    var _ActivityMoveOffset = {
                        x: ActivityDragStack.DraggingProxy[0].left - ActivityDragStack.DraggingActivities[0].left,
                        y: ActivityDragStack.DraggingProxy[0].top - ActivityDragStack.DraggingActivities[0].top
                    };

                    //移动活动
                    $(ActivityDragStack.DraggingActivities).each(function (index) {
                        $(this.htmlObject)
                            .css('left', ActivityDragStack.DraggingProxy[index].left)
                            .css('top', ActivityDragStack.DraggingProxy[index].top);
                        //add by xc 第一次拖出操作栏隐藏主本流程节点，拖拽完成后显示主本节点
                        //if($(this.htmlObject).removeClass('firstDragOut'))
                        //end

                        ActivityDragStack.DraggingProxy[index].remove();
                    });

                    //处理活动移动后事件
                    GlobalWorkflowProperties.Workflow.saveActivityPositions(ActivityDragStack.DraggingActivities, _ActivityMoveOffset);
                }

                if (ActivityDragStack.IsDragging) {
                    GlobalWorkflowProperties.Workflow.onActivitiesMovingEnd(ActivityDragStack.DraggingActivities);
                    //拖动完成,选中活动
                    if (ActivityDragStack.DraggingActivities[0]){
                        ActivityDragStack.DraggingActivities[0].Select();
                    }
                    ActivityDragStack.IsDragging = false;
                    GlobalWorkflowProperties.VM.setUndo();
                    //添加痕迹
                    TraceManager.AddTrace(TraceManager.TraceType.Multi.ActivitiesMove, _Targets, _SourceStates);
                } else {
                    if (ActivityDragStack.DraggingActivities[0]) {
                        if (!e.ctrlKey) {
                            ActivityDragStack.DraggingActivities[0].Select();
                        } else {
                            if (ActivityDragStack.DraggingActivities[0].isSelected) {
                                ActivityDragStack.DraggingActivities[0].Unselect();
                            } else {
                                ActivityDragStack.DraggingActivities[0].Select();
                            }
                        }
                    }

                    ActivityDragStack.IsDragging = false;
                }

                $(document).unbind(ActivityDragSettings.EventNameSpace);

                if (GlobalWorkflowProperties.Workflow.selectedActivities &&
                    GlobalWorkflowProperties.Workflow.selectedActivities.length > 0){
                        GlobalWorkflowProperties.Wp.DisplayProperties(GlobalWorkflowProperties.Workflow.selectedActivities[0]);
                }
            });
        } else {
            if ($(e.target).hasClass(ActivityStyleClassName.Activity)){
                activity = $(e.target).data(ActivitySettings.ActivityDataProperty);
            } else {
                activity = $(e.target).parents('.' + ActivityStyleClassName.Activity + ':first').data(ActivitySettings.ActivityDataProperty);
            }
            if (activity) {
                //触发调整大小事件
                if (!e.ctrlKey && $(e.target).hasClass(ActivityStyleClassName.Resize)) {
                    ActivityResizeStack.Resizing = true;

                    GlobalWorkflowProperties.Workflow.setMultiActionFlag(WorkflowMultiActionType.ActivityResize);

                    ActivityResizeStack.CurrentActivity = activity;
                    //源状态
                    ActivityResizeStack.SourceStates = TraceManager.GetMultiObjAndStates(ActivityResizeStack.CurrentActivity).States;

                    ActivityResizeStack.CurrentResizer = e.target;
                    ActivityResizeStack.PrePoint = ActivityResizeStack.StartPoint = {
                        x: e.pageX - GlobalWorkflowProperties.SVG._offset().left,
                        y: e.pageY - GlobalWorkflowProperties.SVG._offset().top
                    };

                    if ($(ActivityResizeStack.CurrentResizer).hasClass(ActivityStyleClassName.ResizeTopLeft))
                        ActivityResizeStack.Direction = ActivityResizeDirection.UpperLeft;
                    else if ($(ActivityResizeStack.CurrentResizer).hasClass(ActivityStyleClassName.ResizeTopRight))
                        ActivityResizeStack.Direction = ActivityResizeDirection.UpperRight;
                    else if ($(ActivityResizeStack.CurrentResizer).hasClass(ActivityStyleClassName.ResizeBottomLeft))
                        ActivityResizeStack.Direction = ActivityResizeDirection.DownLeft;
                    else if ($(ActivityResizeStack.CurrentResizer).hasClass(ActivityStyleClassName.ResizeBottomRight))
                        ActivityResizeStack.Direction = ActivityResizeDirection.DownRight;

                    GlobalWorkflowProperties.Workflow.onActivitiesMovingStart(ActivityResizeStack.CurrentActivity);

                    $(document).unbind(ActivitySettings.ResizeEventNameSpace)
                        .bind('mousemove' + ActivitySettings.ResizeEventNameSpace, function (e) {
                            //隐藏对齐线
                            $('.' + WorkflowStyleClassName.ActivityDockLine).hide();

                            var currentPoint = {
                                x: e.pageX - GlobalWorkflowProperties.SVG._offset().left,
                                y: e.pageY - GlobalWorkflowProperties.SVG._offset().top
                            };
                            //如果调整中的活动的另一边与某活动对齐，那么在调整接近该活动时，自动对齐
                            //var dockDistance = Number.POSITIVE_INFINITY;

                            //调整大小后，向最接近的活动停靠的距离
                            var nearestAdditionY = Number.POSITIVE_INFINITY; //
                            var nearsetActivityY = void 0;
                            var nearestAdditionX = Number.POSITIVE_INFINITY;
                            var nearsetActivityX = void 0;

                            var width = $(ActivityResizeStack.CurrentActivity.htmlObject).outerWidth();
                            var height = $(ActivityResizeStack.CurrentActivity.htmlObject).outerHeight();
                            var _topDocked = false, _leftDocked = false,_rightDocked= false, _bottomDocked=false;
                            var workflow=GlobalWorkflowProperties.Workflow;
                            switch (ActivityResizeStack.Direction) {
                                case ActivityResizeDirection.UpperLeft:
                                var additionX = ActivityResizeStack.PrePoint.x - currentPoint.x;
                                var additionY = ActivityResizeStack.PrePoint.y - currentPoint.y;
                                if (ActivityResizeStack.CurrentActivity.top - additionY < ActivityMovingStack.WorkflowContentEdgeTop) {
                                    additionY = ActivityResizeStack.CurrentActivity.top - ActivityMovingStack.WorkflowContentEdgeTop;
                                    _topDocked = true;
                                } else if (height + additionY < ActivitySettings.MinOuterHeight){
                                    //不能超过最小高度
                                    additionY = ActivitySettings.MinOuterHeight - height;
                                    _topDocked = true;
                                }
                                if (ActivityResizeStack.CurrentActivity.left - additionX < ActivityMovingStack.WorkflowContentEdgeLeft) {
                                    additionX = ActivityResizeStack.CurrentActivity.left - ActivityMovingStack.WorkflowContentEdgeLeft;
                                    _leftDocked = true;
                                } else if (width + additionX < ActivitySettings.MinOuterWidth) {
                                    additionX = ActivitySettings.MinOuterWidth - width;
                                    _leftDocked = true;
                                }


                                ActivityResizeStack.PrePoint = currentPoint;
                                var newOuterHeight = height + additionY;
                                var newTop = ActivityResizeStack.CurrentActivity.top - additionY;
                                var newOuterWidth = width + additionX;
                                var newOffsetLeft = ActivityResizeStack.CurrentActivity.left - additionX;
                                
                                if (_topDocked) {
                                    ActivityResizeStack.PrePoint.y = ActivityResizeStack.PrePoint.y - additionY;
                                } else {
                                    //ActivityResizeStack.PrePoint.y = currentPoint.y;
                                    $(workflow.activities).each(function () {
                                        if (this != ActivityResizeStack.CurrentActivity
                                            && Math.abs(this.top - newTop) <= ActivitySettings.ResizeDockSize
                                            && Math.abs(this.top - newTop) < Math.abs(nearestAdditionY)
                                            && this.top <= ActivityResizeStack.CurrentActivity.bottom - ActivitySettings.MinOuterHeight) {
                                            nearestAdditionY = newTop - this.top;
                                            nearsetActivityY = this;
                                        }
                                    });
                                    if (Math.abs(nearestAdditionY) <= ActivitySettings.ResizeDockSize) {

                                        var _left = Math.min(nearsetActivityY.left + $(nearsetActivityY.htmlObject).outerWidth(), ActivityResizeStack.CurrentActivity.left + width);
                                        var _dockLineWidth = Math.max(nearsetActivityY.left, ActivityResizeStack.CurrentActivity.left) - _left;
                                        if (_dockLineWidth > 0) {
                                            $("." + WorkflowStyleClassName.ActivityDockLineTop)
                                                .css("top", nearsetActivityY.top)
                                                .css("left", _left)
                                                .css("width", _dockLineWidth)
                                                .show();
                                            if (nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight() == ActivityResizeStack.CurrentActivity.top + height) {
                                                $("." + WorkflowStyleClassName.ActivityDockLineMiddle)
                                                    .css("top", nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight() / 2)
                                                    .css("left", _left)
                                                    .css("width", _dockLineWidth)
                                                    .show();
                                                $("." + WorkflowStyleClassName.ActivityDockLineBottom)
                                                    .css("top", nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight())
                                                    .css("left", _left)
                                                    .css("width", _dockLineWidth)
                                                    .show();
                                            }
                                        }
                                    } 
                                }
                                if (_leftDocked) {
                                    ActivityResizeStack.PrePoint.x = ActivityResizeStack.PrePoint.x - additionX;
                                } else {
                                    $(workflow.activities).each(function () {
                                        if (this != ActivityResizeStack.CurrentActivity
                                            && Math.abs(this.left - newOffsetLeft) <= ActivitySettings.ResizeDockSize
                                            && Math.abs(this.left - newOffsetLeft) < Math.abs(nearestAdditionX)
                                            && this.left <= ActivityResizeStack.CurrentActivity.right - ActivitySettings.MinOuterWidth) {
                                            nearestAdditionX = newOffsetLeft - this.left;
                                            nearsetActivityX = this;
                                        }
                                    });

                                    if (Math.abs(nearestAdditionX) <= ActivitySettings.ResizeDockSize) {

                                        var _top = Math.min(nearsetActivityX.top + $(nearsetActivityX.htmlObject).outerHeight(), ActivityResizeStack.CurrentActivity.top + height);
                                        var _dockLineHeight = Math.max(nearsetActivityX.top, ActivityResizeStack.CurrentActivity.top) - _top;
                                        if (_dockLineHeight > 0) {
                                            $("." + WorkflowStyleClassName.ActivityDockLineOffsetLeft)
                                                .css("left", nearsetActivityX.left)
                                                .css("top", _top)
                                                .css("height", _dockLineHeight)
                                                .show();
                                            if (nearsetActivityX.left + $(nearsetActivityX.htmlObject).outerWidth() == ActivityResizeStack.CurrentActivity.left + width) {
                                                $("." + WorkflowStyleClassName.ActivityDockLineCenter)
                                                    .css("left", nearsetActivityX.left + $(nearsetActivityX.htmlObject).outerWidth() / 2)
                                                    .css("top", _top)
                                                    .css("height", _dockLineHeight)
                                                    .show();
                                                $("." + WorkflowStyleClassName.ActivityDockLineRight)
                                                    .css("left", nearsetActivityX.left + $(nearsetActivityX.htmlObject).outerWidth())
                                                    .css("top", _top)
                                                    .css("height", _dockLineHeight)
                                                    .show();
                                            }
                                        }
                                    }
                                }

                                $(ActivityResizeStack.CurrentActivity.htmlObject)
                                    .css('left', newOffsetLeft)
                                    .css('top', newTop)
                                    .outerWidth(newOuterWidth)
                                    .outerHeight(newOuterHeight);
                                break;
                            case ActivityResizeDirection.UpperRight:
                                var additionX = currentPoint.x - ActivityResizeStack.PrePoint.x;
                                var additionY = ActivityResizeStack.PrePoint.y - currentPoint.y;

                                //top
                                if (ActivityResizeStack.CurrentActivity.top - additionY < ActivityMovingStack.WorkflowContentEdgeTop) {
                                    additionY = ActivityResizeStack.CurrentActivity.top - ActivityMovingStack.WorkflowContentEdgeTop;
                                    _topDocked = true;
                                } else if (height + additionY < ActivitySettings.MinOuterHeight) {
                                    //不能超过最小高度
                                    additionY = ActivitySettings.MinOuterHeight - height;
                                    _topDocked = true;
                                }
                                //right
                                
                                if (additionX + width < ActivitySettings.MinOuterWidth) {
                                    additionX = ActivitySettings.MinOuterWidth - width;
                                    _rightDocked = true;
                                    
                                }
                                ActivityResizeStack.PrePoint = currentPoint;
                                var newOuterHeight = height + additionY;
                                var newTop = ActivityResizeStack.CurrentActivity.top - additionY;
                                var newOuterWidth = width + additionX;
                                var newRight = ActivityResizeStack.CurrentActivity.left + newOuterWidth;

                                if (_topDocked) {
                                    ActivityResizeStack.PrePoint.y = ActivityResizeStack.PrePoint.y - additionY;
                                } else {
                                    $(workflow.activities).each(function () {
                                        if (this != ActivityResizeStack.CurrentActivity
                                            && Math.abs(this.top - newTop) <= ActivitySettings.ResizeDockSize
                                            && Math.abs(this.top - newTop) < Math.abs(nearestAdditionY)
                                            && this.top <= ActivityResizeStack.CurrentActivity.bottom - ActivitySettings.MinOuterHeight) {
                                            nearestAdditionY = newTop - this.top;
                                            nearsetActivityY = this;
                                        }
                                    });
                                    if (Math.abs(nearestAdditionY) <= ActivitySettings.ResizeDockSize) {

                                        var _left = Math.min(nearsetActivityY.left + $(nearsetActivityY.htmlObject).outerWidth(), ActivityResizeStack.CurrentActivity.left + width);
                                        var _dockLineWidth = Math.max(nearsetActivityY.left, ActivityResizeStack.CurrentActivity.left) - _left;
                                        if (_dockLineWidth > 0) {
                                            $("." + WorkflowStyleClassName.ActivityDockLineTop)
                                                .css("top", nearsetActivityY.top)
                                                .css("left", _left)
                                                .css("width", _dockLineWidth)
                                                .show();
                                            if (nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight() == ActivityResizeStack.CurrentActivity.top + height) {
                                                $("." + WorkflowStyleClassName.ActivityDockLineMiddle)
                                                    .css("top", nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight() / 2)
                                                    .css("left", _left)
                                                    .css("width", _dockLineWidth)
                                                    .show();
                                                $("." + WorkflowStyleClassName.ActivityDockLineBottom)
                                                    .css("top", nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight())
                                                    .css("left", _left)
                                                    .css("width", _dockLineWidth)
                                                    .show();
                                            }
                                        }
                                    }
                                }
                                if (_rightDocked) {
                                    ActivityResizeStack.PrePoint.x = ActivityResizeStack.PrePoint.x + additionX;
                                } else {
                                    $(workflow.activities).each(function () {
                                        if (this.Id != ActivityResizeStack.CurrentActivity.Id
                                            && Math.abs(this.right - newRight) <= ActivitySettings.ResizeDockSize
                                            && Math.abs(this.right - newRight) < Math.abs(nearestAdditionX)
                                            && this.right >= ActivityResizeStack.CurrentActivity.left + ActivitySettings.MinOuterWidth) {
                                            nearestAdditionX = this.right - newRight;
                                            nearsetActivityX = this;
                                        }
                                    });

                                    if (Math.abs(nearestAdditionX) <= ActivitySettings.ResizeDockSize) {

                                        var _top = Math.min(nearsetActivityX.top + $(nearsetActivityX.htmlObject).outerHeight(), ActivityResizeStack.CurrentActivity.top + height);
                                        var _dockLineHeight = Math.max(nearsetActivityX.top, ActivityResizeStack.CurrentActivity.top) - _top;
                                        if (_dockLineHeight > 0) {
                                            $("." + WorkflowStyleClassName.ActivityDockLineRight)
                                                .css("left", nearsetActivityX.left + $(nearsetActivityX.htmlObject).outerWidth())
                                                    .css("top", _top)
                                                    .css("height", _dockLineHeight)
                                                    .show();
                                            if (nearsetActivityX.left == ActivityResizeStack.CurrentActivity.left) {
                                                $("." + WorkflowStyleClassName.ActivityDockLineCenter)
                                                    .css("left", nearsetActivityX.left + $(nearsetActivityX.htmlObject).outerWidth()/ 2)
                                                    .css("top", _top)
                                                    .css("height", _dockLineHeight)
                                                    .show();
                                                $("." + WorkflowStyleClassName.ActivityDockLineOffsetLeft)
                                                    .css("left", nearsetActivityX.left)
                                                    .css("top", _top)
                                                    .css("height", _dockLineHeight)
                                                    .show();
                                            }
                                        }
                                    }
                                }

                                
                                $(ActivityResizeStack.CurrentActivity.htmlObject)
                                    .css('top', newTop)
                                    .outerWidth(width + additionX)
                                    .outerHeight(height + additionY);
                                break;
                            case ActivityResizeDirection.DownLeft:
                                var additionX = ActivityResizeStack.PrePoint.x - currentPoint.x;
                                var additionY = currentPoint.y - ActivityResizeStack.PrePoint.y;

                                if (ActivityResizeStack.CurrentActivity.left - additionX < ActivityMovingStack.WorkflowContentEdgeLeft) {
                                    additionX = ActivityResizeStack.CurrentActivity.left - ActivityMovingStack.WorkflowContentEdgeLeft;
                                    _leftDocked = true;
                                } else if (width + additionX < ActivitySettings.MinOuterWidth) {
                                    additionX = ActivitySettings.MinOuterWidth - width;
                                    _leftDocked = true;
                                }

                                if (additionY + height < ActivitySettings.MinOuterHeight) {
                                    additionY = ActivitySettings.MinOuterHeight - height;
                                    _bottomDocked = true;
                                }

                                ActivityResizeStack.PrePoint = currentPoint;
                                var newOuterHeight =height + additionY;
                                var newBottom = ActivityResizeStack.CurrentActivity.top + newOuterHeight;
                                var newOuterWidth = width + additionX;
                                var newOffsetLeft = ActivityResizeStack.CurrentActivity.left - additionX;

                                if (_leftDocked) {
                                    ActivityResizeStack.PrePoint.x = ActivityResizeStack.PrePoint.x - additionX;
                                } else {
                                    $(workflow.activities).each(function () {
                                        if (this != ActivityResizeStack.CurrentActivity
                                            && Math.abs(this.left - newOffsetLeft) <= ActivitySettings.ResizeDockSize
                                            && Math.abs(this.left - newOffsetLeft) < Math.abs(nearestAdditionX)
                                            && this.left <= ActivityResizeStack.CurrentActivity.right - ActivitySettings.MinOuterWidth) {
                                            nearestAdditionX = newOffsetLeft - this.left;
                                            nearsetActivityX = this;
                                        }
                                    });

                                    if (Math.abs(nearestAdditionX) <= ActivitySettings.ResizeDockSize) {

                                        var _top = Math.min(nearsetActivityX.top + $(nearsetActivityX.htmlObject).outerHeight(), ActivityResizeStack.CurrentActivity.top + height);
                                        var _dockLineHeight = Math.max(nearsetActivityX.top, ActivityResizeStack.CurrentActivity.top) - _top;
                                        if (_dockLineHeight > 0) {
                                            $("." + WorkflowStyleClassName.ActivityDockLineOffsetLeft)
                                                .css("left", nearsetActivityX.left)
                                                .css("top", _top)
                                                .css("height", _dockLineHeight)
                                                .show();
                                            if (nearsetActivityX.left + $(nearsetActivityX.htmlObject).outerWidth() == ActivityResizeStack.CurrentActivity.left + width) {
                                                $("." + WorkflowStyleClassName.ActivityDockLineCenter)
                                                    .css("left", nearsetActivityX.left + $(nearsetActivityX.htmlObject).outerWidth() / 2)
                                                    .css("top", _top)
                                                    .css("height", _dockLineHeight)
                                                    .show();
                                                $("." + WorkflowStyleClassName.ActivityDockLineRight)
                                                    .css("left", nearsetActivityX.left + $(nearsetActivityX.htmlObject).outerWidth())
                                                    .css("top", _top)
                                                    .css("height", _dockLineHeight)
                                                    .show();
                                            }
                                        }
                                    }
                                }

                                if (_bottomDocked) {
                                    ActivityResizeStack.PrePoint.y = ActivityResizeStack.PrePoint.y + additionY;
                                } else {
                                    $(workflow.activities).each(function () {
                                        if (this.Id != ActivityResizeStack.CurrentActivity.Id
                                            && Math.abs(this.bottom - newBottom) <= ActivitySettings.ResizeDockSize
                                            && Math.abs(this.bottom - newBottom) < Math.abs(nearestAdditionY)
                                            && this.bottom >= ActivityResizeStack.CurrentActivity.top + ActivitySettings.MinOuterHeight) {
                                            nearestAdditionY = this.bottom - newBottom;
                                            nearsetActivityY = this;
                                        }
                                    });

                                    if (Math.abs(nearestAdditionY) <= ActivitySettings.ResizeDockSize) {
                                        var _left = Math.min(nearsetActivityY.left + $(nearsetActivityY.htmlObject).outerWidth(), ActivityResizeStack.CurrentActivity.left + width);
                                        var _dockLineWidth = Math.max(nearsetActivityY.left, ActivityResizeStack.CurrentActivity.left) - _left;
                                        if (_dockLineWidth > 0) {
                                            $("." + WorkflowStyleClassName.ActivityDockLineBottom)
                                                .css("top", nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight())
                                                .css("left", _left)
                                                .css("width", _dockLineWidth)
                                                .show();
                                            if (nearsetActivityY.top == ActivityResizeStack.CurrentActivity.top) {
                                                $("." + WorkflowStyleClassName.ActivityDockLineMiddle)
                                                    .css("top", nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight() / 2)
                                                    .css("left", _left)
                                                    .css("width", _dockLineWidth)
                                                    .show();
                                                $("." + WorkflowStyleClassName.ActivityDockLineBottom)
                                                    .css("top", nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight())
                                                    .css("left", _left)
                                                    .css("width", _dockLineWidth)
                                                    .show();
                                            }
                                        }
                                    }
                                }

                                $(ActivityResizeStack.CurrentActivity.htmlObject)
                                    .css('left', newOffsetLeft)
                                    .outerWidth(width + additionX)
                                    .outerHeight(height + additionY);
                                break;
                            case ActivityResizeDirection.DownRight:
                                var additionX = currentPoint.x - ActivityResizeStack.PrePoint.x;
                                var additionY = currentPoint.y - ActivityResizeStack.PrePoint.y;

                                if (additionY + height < ActivitySettings.MinOuterHeight) {
                                    additionY = ActivitySettings.MinOuterHeight - height;
                                    _bottomDocked = true;
                                }
                                if (additionX + width < ActivitySettings.MinOuterWidth) {
                                    additionX = ActivitySettings.MinOuterWidth - width;
                                    _rightDocked = true;

                                }
                                ActivityResizeStack.PrePoint = currentPoint;

                                var newOuterHeight = height + additionY;
                                var newBottom = ActivityResizeStack.CurrentActivity.top + newOuterHeight;
                                var newOuterWidth = width + additionX;
                                var newRight = ActivityResizeStack.CurrentActivity.left + newOuterWidth;

                                if (_rightDocked) {
                                    ActivityResizeStack.PrePoint.x = ActivityResizeStack.PrePoint.x + additionX;
                                } else {
                                    $(workflow.activities).each(function () {
                                        if (this.Id != ActivityResizeStack.CurrentActivity.Id
                                            && Math.abs(this.right - newRight) <= ActivitySettings.ResizeDockSize
                                            && Math.abs(this.right - newRight) < Math.abs(nearestAdditionX)
                                            && this.right >= ActivityResizeStack.CurrentActivity.left + ActivitySettings.MinOuterWidth) {
                                            nearestAdditionX = this.right - newRight;
                                            nearsetActivityX = this;
                                        }
                                    });

                                    if (Math.abs(nearestAdditionX) <= ActivitySettings.ResizeDockSize) {

                                        var _top = Math.min(nearsetActivityX.top + $(nearsetActivityX.htmlObject).outerHeight(), ActivityResizeStack.CurrentActivity.top + height);
                                        var _dockLineHeight = Math.max(nearsetActivityX.top, ActivityResizeStack.CurrentActivity.top) - _top;
                                        if (_dockLineHeight > 0) {
                                            $("." + WorkflowStyleClassName.ActivityDockLineRight)
                                                .css("left", nearsetActivityX.left + $(nearsetActivityX.htmlObject).outerWidth())
                                                .css("top", _top)
                                                .css("height", _dockLineHeight)
                                                .show();
                                            if (nearsetActivityX.left == ActivityResizeStack.CurrentActivity.left) {
                                                $("." + WorkflowStyleClassName.ActivityDockLineCenter)
                                                    .css("left", nearsetActivityX.left + $(nearsetActivityX.htmlObject).outerWidth() / 2)
                                                    .css("top", _top)
                                                    .css("height", _dockLineHeight)
                                                    .show();
                                                $("." + WorkflowStyleClassName.ActivityDockLineOffsetLeft)
                                                    .css("left", nearsetActivityX.left)
                                                    .css("top", _top)
                                                    .css("height", _dockLineHeight)
                                                    .show();
                                            }
                                        }
                                    }
                                }
                                if (_bottomDocked) {
                                    ActivityResizeStack.PrePoint.y = ActivityResizeStack.PrePoint.y + additionY;
                                } else {
                                    $(workflow.activities).each(function () {
                                        if (this.Id != ActivityResizeStack.CurrentActivity.Id
                                            && Math.abs(this.bottom - newBottom) <= ActivitySettings.ResizeDockSize
                                            && Math.abs(this.bottom - newBottom) < Math.abs(nearestAdditionY)
                                            && this.bottom >= ActivityResizeStack.CurrentActivity.top + ActivitySettings.MinOuterHeight) {
                                            nearestAdditionY = this.bottom - newBottom;
                                            nearsetActivityY = this;
                                        }
                                    });

                                    if (Math.abs(nearestAdditionY) <= ActivitySettings.ResizeDockSize) {
                                        var _left = Math.min(nearsetActivityY.left + $(nearsetActivityY.htmlObject).outerWidth(), ActivityResizeStack.CurrentActivity.left + width);
                                        var _dockLineWidth = Math.max(nearsetActivityY.left, ActivityResizeStack.CurrentActivity.left) - _left;
                                        if (_dockLineWidth > 0) {
                                            $("." + WorkflowStyleClassName.ActivityDockLineBottom)
                                                .css("top", nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight())
                                                .css("left", _left)
                                                .css("width", _dockLineWidth)
                                                .show();
                                            if (nearsetActivityY.top == ActivityResizeStack.CurrentActivity.top) {
                                                $("." + WorkflowStyleClassName.ActivityDockLineMiddle)
                                                    .css("top", nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight() / 2)
                                                    .css("left", _left)
                                                    .css("width", _dockLineWidth)
                                                    .show();
                                                $("." + WorkflowStyleClassName.ActivityDockLineBottom)
                                                    .css("top", nearsetActivityY.top + $(nearsetActivityY.htmlObject).outerHeight())
                                                    .css("left", _left)
                                                    .css("width", _dockLineWidth)
                                                    .show();
                                            }
                                        }
                                    }
                                }

                                $(ActivityResizeStack.CurrentActivity.htmlObject)
                                    .outerWidth(width + additionX)
                                    .outerHeight(height + additionY);
                                break;
                            }
                            ActivityResizeStack.CurrentActivity.savePosition(false, ActivityResizeStack.Direction);

                            //开始调整大小（第一次mousemove）时去除与线的交点
                            if (!ActivityResizeStack.IsResizing) {
                                ActivityResizeStack.IsResizing = true;

                                GlobalWorkflowProperties.Workflow.onActivitiesMovingStart(ActivityResizeStack.CurrentActivity);
                            }

                            //保存位置和大小
                            ActivityResizeStack.CurrentActivity.savePosition();
                            $(GlobalWorkflowProperties.Workflow.lines).each(function () {
                                if (this.needRedraw){
                                    this.draw();
                                }
                            });

                            GlobalWorkflowProperties.Workflow.onActivitiesMoving(ActivityResizeStack.CurrentActivity);
                        });
                    $(document).one('mouseup' + ActivitySettings.ResizeEventNameSpace, function (e) {
                        GlobalWorkflowProperties.Workflow.setMultiActionFlag(WorkflowMultiActionType.None);

                        //隐藏对齐线
                        $('.' + WorkflowStyleClassName.ActivityDockLine).hide();

                        $(document).unbind(ActivitySettings.ResizeEventNameSpace);
                        //结束调整时，计算和绘制交点
                        if (ActivityResizeStack.IsResizing) {
                            GlobalWorkflowProperties.Workflow.onActivitiesMovingEnd(ActivityResizeStack.CurrentActivity);
                        }

                        ActivityResizeStack.Resizing = false;
                        GlobalWorkflowProperties.VM.setUndo();
                        TraceManager.AddTrace(TraceManager.TraceType.Activity.Resize, ActivityResizeStack.CurrentActivity, ActivityResizeStack.SourceStates);
                    });
                } else if (!e.ctrlKey && $(e.target).hasClass(ActivityStyleClassName.AssistLine)) {
                    if (activity.ToolTipText != "End") {
                        var dockPosition = new DockPosition(e, 4, activity.htmlObject);
                        if (dockPosition.ActivityDockDirection) {
                            LineDrawStack.CurrentLine = new Line({
                                Id: GlobalWorkflowProperties.Workflow.getNewShapeID(),
                                startPoint: {
                                    x: dockPosition.DockPoint.x - GlobalWorkflowProperties.SVG._offset().left,
                                    y: dockPosition.DockPoint.y - GlobalWorkflowProperties.SVG._offset().top
                                },
                                startDirection: dockPosition.ActivityDockDirection,
                                startActivity: activity
                            });
                            GlobalWorkflowProperties.Workflow.lines.push(LineDrawStack.CurrentLine);
                            LineDrawStack.CurrentLine.beginDrawing();
                        }
                        e.preventDefault();
                        return;
                    }
                }
                else if (!e.ctrlKey && $(e.target).hasClass(WorkflowStyleClassName.WorkflowAotuArrow)) {
                   //点击箭头，添加活动，自动连接
                    //ctrl键摁下时不处理
                    //TODO: 设置默认添加的活动
                    var activityHtmlObject = $(activity.htmlObject).clone()
                        .removeClass(ActivityModelStyleClassName.ActivityModel).addClass(ActivityStyleClassName.Activity)
                        .css('left', activity.left)
                        .css('top', activity.top)
                        .width($(activity.htmlObject).width())
                        .height($(activity.htmlObject).height())
                        .appendTo(GlobalWorkflowProperties.Workflow.workspace);

                    var _id = GlobalWorkflowProperties.Workflow.getNewShapeID();
                    var _startPoint = { x: 0, y: 0 };
                    var _startActivity = activity;
                    var _startDirection;
                    var _endDirection;
                    var _endActivity;
                    var _endPoint = { x: 0, y: 0 };

                    //默认距离
                    var interval = ActivitySettings.DefaultActivityDistance;
                    //上
                    if ($(e.target).hasClass(WorkflowStyleClassName.WorkflowAotuArrowUp)) {
                        //activityHtmlObject.css('top', Math.max(activity.top - interval - activity.height, $(workflow.workspace_content).position().top + $(GlobalWorkflowProperties.Workflow.workspace_content).css('border-top-width').parsePxToFloat()));
                        activityHtmlObject.css('top', Math.max(activity.top - interval - activity.height, $(GlobalWorkflowProperties.Workflow.workspace_content).position().top));

                        _startPoint = { x: activity.left + activity.width / 2, y: activity.top };
                        _endPoint = { x: activity.left + activity.width / 2, y: $(activityHtmlObject).position().top + $(activityHtmlObject).outerHeight() };
                        _startDirection = LineArrowDirection.Up;
                        _endDirection = LineArrowDirection.Down;
                    } else if ($(e.target).hasClass(WorkflowStyleClassName.WorkflowAotuArrowDown)) {
                       //下
                        activityHtmlObject.move({ y: interval + activity.height });

                        _startPoint = { x: activity.left + activity.width / 2, y: activity.top + activity.height };
                        _endPoint = { x: activity.left + activity.width / 2, y: activity.top + activity.height + interval };
                        _startDirection = LineArrowDirection.Down;
                        _endDirection = LineArrowDirection.Up;
                    } else if ($(e.target).hasClass(WorkflowStyleClassName.WorkflowAotuArrowLeft)) {
                        //左
                        //activityHtmlObject.css('left', Math.max(activity.left - interval - activity.width, $(GlobalWorkflowProperties.Workflow.workspace_content).position().left) + $(GlobalWorkflowProperties.Workflow.workspace_content).css('border-left-width').parsePxToFloat());
                        activityHtmlObject.css('left', Math.max(activity.left - interval - activity.width, $(GlobalWorkflowProperties.Workflow.workspace_content).position().left));

                        _startPoint = { x: activity.left, y: activity.top + activity.height / 2 };
                        _endPoint = { x: activityHtmlObject.position().left + activityHtmlObject.outerWidth(), y: activity.top + activity.height / 2 };
                        _startDirection = LineArrowDirection.Left;
                        _endDirection = LineArrowDirection.Right;
                    } else if ($(e.target).hasClass(WorkflowStyleClassName.WorkflowAotuArrowRight)) {
                        //右
                        activityHtmlObject.move({ x: interval + activity.width });

                        _startPoint = { x: activity.left + activity.width, y: activity.top + activity.height / 2 };
                        _endPoint = { x: activity.left + activity.width + interval, y: activity.top + activity.height / 2 };
                        _startDirection = LineArrowDirection.Right;
                        _endDirection = LineArrowDirection.Left;
                    }
                    _endActivity = GlobalWorkflowProperties.Workflow.addActivity(activityHtmlObject, ActivityModelSettings.GetActivityModelByType(activity.ActivityType));
                    _endActivity.getPropertyFromModel();

                    var line = new Line({
                        Id: _id,

                        startActivity: _startActivity,
                        startPoint: _startPoint,
                        startDirection: _startDirection,

                        endActivity: _endActivity,
                        endPoint: _endPoint,
                        endDirection: _endDirection
                    });
                    line.setPoints();
                    line.calculateCrossPoints();
                    line.draw(true);
                    GlobalWorkflowProperties.Workflow.lines.push(line);

                    GlobalWorkflowProperties.Workflow.autoFit(_endActivity);
                    // return;
                } 
                // else if (!e.ctrlKey &&
                //     activity.ToolTipText !== 'End' &&
                //     $(e.target).hasClass(ActivityStyleClassName.Activity)) {
                //         //结束活动不允许画线
                //         //触发边缘画线事件
                //     //ctrl键摁下时不处理
                //     let dockPosition = new DockPosition(e, 0, activity.htmlObject);
                //     if (dockPosition.ActivityDockDirection) {
                //         LineDrawStack.CurrentLine = new Line({
                //             Id: GlobalWorkflowProperties.Workflow.getNewShapeID(),
                //             startPoint: {
                //                 x: dockPosition.DockPoint.x - GlobalWorkflowProperties.SVG._offset().left,
                //                 y: dockPosition.DockPoint.y - GlobalWorkflowProperties.SVG._offset().top
                //             },
                //             startDirection: dockPosition.ActivityDockDirection,
                //             startActivity: activity
                //         });
                //         GlobalWorkflowProperties.Workflow.lines.push(LineDrawStack.CurrentLine);
                //         LineDrawStack.CurrentLine.beginDrawing();
                //     }
                //     e.preventDefault();
                //     return;
                // }
            }
        }
    }
}


// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/activity/activity.js
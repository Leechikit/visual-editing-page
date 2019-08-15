import {PostAction} from './common';
import {TraceManager} from './workflowTrace';
import {WorkflowDocumentStack, WorkflowDocumentSettings} from './setting';
import {PackageManager} from './package';
import {ActivityModelSettings,ActivitySettings} from './activity/setting';
import {LineSettings,LineArrowDirection} from './line/setting';
import {Line} from './line/line';
import {WorkflowProperties} from './property';
import {WorkflowPlayStack} from './workflowPlay/index';
import HTTP from "../../../../../../api/form.js"
import {Message} from "iview";

const ActonName_SaveWorkflow = "SaveWorkflow";
const ActonName_UpdateClauseName = "UpdateClauseName";
const ActonName_ValidateWorkflow = "ValidateWorkflow";
const ActonName_PublishWorkflow = "PublishWorkflow";
const ActonName_PublishAll = "PublishAll";
const ActonName_GetWorkflow = "GetWorkflow";


export const WorkflowDocument = {
    //最后保存的痕迹
    LastSavedTrace: undefined,
    //最后保存的痕迹的序号
    LastSavedTraceIndex: -1,
    //是否在保存后变更了
    uuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        });
    },
    ChangedAfterSave: function () {
        if (TraceManager && TraceManager.TraceStack
            && (this.LastSavedTraceIndex != TraceManager.LastTraceIndex
                || this.LastSavedTrace != TraceManager.TraceStack[TraceManager.LastTraceIndex])) {
            return true;
        }
    },
    OnSave: function () {
        this.LastSavedTraceIndex = TraceManager.LastTraceIndex + 0;
        this.LastSavedTrace = TraceManager.TraceStack[this.LastSavedTraceIndex];
    },

    ShowDealResult: function (msg) {
        //ERROR
        if (typeof (msg) === 'string')
            $.H3Dialog.Warn({ content: msg });
        else if (typeof (msg) === 'object' && msg.length > 0) {
            $.H3Dialog.AlertMultiMsg({ content: msg });
        }
    },

    OnBeginAjax: function () {
        if (!WorkflowDocumentStack.LoadingDiv) {
            WorkflowDocumentStack.LoadingDiv = $("<div class='l-tab-loading' style='display:block;'></div>").css('background-color', 'transparent');
            WorkflowDocumentStack.LoadingDiv.appendTo($('body:first'));
        }
        WorkflowDocumentStack.LoadingDiv.show();
    },

    OnEndAjax: function () {
        setTimeout(function () {
            if (WorkflowDocumentStack.LoadingDiv)
                WorkflowDocumentStack.LoadingDiv.hide();
        }, 300);
    },

    ShowAjaxErrors: function (msg, title) {
        if (msg.status == '500') {
            WorkflowDocument.ShowDealResult(title + ':' + _WorkflowDesigner_GlobalString.WorkflowDocument_Internal);
        }
        else {
            WorkflowDocument.ShowDealResult(title + ':' + msg.statusText);
        }
    },

    ShowLogin: function () {
        //跳转到登录  ERROR
        location.href = window.location.protocol + '://' + location.host + ':' + location.port + '/Login/Index';
    },

    ShowErrorList: function (_ErrorList) {
        //ERROR
        if (_ErrorList && _ErrorList.length > 0) {
            var msg = '';
            $(_ErrorList).each(function () {
                msg += this + ';';
            });
            alert(msg);
        }
    },

    SaveWorkflow: function () {
        if (!WorkflowDocument.PartValidateWorkflow())
            return;

        WorkflowDocument.OnBeginAjax();

        this.OnSave();

        PostAction(ActonName_SaveWorkflow, WorkflowDocument.GetWorkflowPostData('SaveWorkflow', true), function (result) {
            if (result.Successful) {
                result = result.ReturnData.Data;
                if (!result.Result) {
                    var _Content = [{
                        status: 'error', text: '保存失敗'
                    }];

                    if (result.Errors && result.Errors.length > 0) {
                        _Content.push({
                            status: 'error', text: result.Errors[0]
                        });
                        WorkflowDocument.ShowDealResult(_Content);
                    };
                }
            }
        }, function (msg) {
            WorkflowDocument.ShowAjaxErrors(msg, '保存失敗');
        },false);

        WorkflowDocument.OnEndAjax();
    },


    GetWorkflowPostData: function (_Command, _ContainsWorkflow, sendMsgConfig ) {
        var _Data = { Command: _Command };
        if (!WorkflowDocumentStack.Workflow) {
            WorkflowDocumentStack.Workflow = {};
            // WorkflowDocumentStack.Workflow.BizObjectSchemaCode = PackageManager.GetBizObjectSchemaCode();
        }

        var _Workflow = WorkflowDocumentStack.Workflow;
        if (_ContainsWorkflow) {
            $(WorkflowProperties['Workflow']).each(function () {
                if (this && this.Properties) {
                    $(this.Properties).each(function () {
                        _Workflow[this] = GlobalWorkflowProperties.Workflow[this];
                    });
                }
            });

            var _StartActivities = [];
            var _EndActivities = [];
            var _FillSheetActivities = [];
            var _ApproveActivities = [];
            var _CirculateActivities = [];
            var _NotifyActivities = [];
            var _WaitActivities = [];
            var _ConnectionActivities = [];
            var _BizActionActivities = [];
            var _SubInstanceActivities = [];
            // let sendMsgConfig = [];
            // console.log(GlobalWorkflowProperties.Workflow.activities)
            $(GlobalWorkflowProperties.Workflow.activities).each(function () {
                var thisActivity = this;
                var _activity = { Id: "a"+WorkflowDocument.uuid() };

                $(WorkflowProperties[thisActivity.ToolTipText]).each(function () {
                    $(this.Properties).each(function () {
                        _activity[this] = thisActivity[this];
                    });
                });

                _activity.ActivityType = this.ToolTipText;
                _activity.Width = parseInt(this.width);
                _activity.Height = parseInt(this.height);
                _activity.X = parseInt(this.width / 2 + this.left);
                _activity.Y = parseInt(this.height / 2 + this.top);
                _activity.FontSize = parseInt(this.FontSize);
                


                //允许的操作里的特殊属性
                if (this.ToolTipText == 'FillSheet' || this.ToolTipText == 'Approve' || this.ToolTipText == 'Circulate') {
                    _activity['BatchProcessing'] = thisActivity['BatchProcessing'];
                    _activity['EmailNotification'] = thisActivity['EmailNotification'];
                    _activity['SMSApprove'] = thisActivity['SMSApprove'];
                    _activity['MobileProcessing'] = thisActivity['MobileProcessing'];
                    _activity['OvertimePolicy'] = '2';
                    if (thisActivity['sendMsgConfig']) {
                        _activity['sendMsgConfig'] = {
                            ...thisActivity['sendMsgConfig'],
                            nodeId: _activity.Id
                        }
                    }
                    // if (thisActivity['sendMsgConfig']) {
                    //     sendMsgConfig.push({
                    //         nodeId: _activity.Id,
                    //         ...thisActivity['sendMsgConfig']
                    //     })
                    // } else if (GlobalWorkflowProperties.sendMsgConfig) {
                    //     console.log('新生成nodeId：'+thisActivity.id)
                    //     console.log('接口返回nodeId：'+GlobalWorkflowProperties.sendMsgConfig[0].nodeId)
                    //     const result = GlobalWorkflowProperties.sendMsgConfig.filter(item => {
                    //         return item.nodeId === thisActivity.id;
                    //     })
                    //     // console.log(result)
                    //     if(result && result.length > 0) {
                    //         sendMsgConfig.push(result[0])
                    //     }
                    // }
                    // console.log(GlobalWorkflowProperties.sendMsgConfig)
                    // console.log(sendMsgConfig)
                }

                if(this.ToolTipText == 'Notify'){
                    _activity['DataMaps'] = thisActivity['DataMaps'];
                    _activity['NotifyType']=thisActivity['NotifyType'];
                    _activity['NotifyWay']=thisActivity['NotifyWay'];
                    _activity['Block']=thisActivity['Block'];
                }
                var PropertyPermissionsList=[];
                if(GlobalWorkflowProperties.DataItems&&GlobalWorkflowProperties.DataItems.length>=0){
                    if(_activity.PropertyPermissions&&_activity.PropertyPermissions.length>=0){
                        for(var index = 0 ;index<_activity.PropertyPermissions.length;index++ ){
                            for(var key=0;key<GlobalWorkflowProperties.DataItems.length;key++){
                                if(GlobalWorkflowProperties.DataItems[key]&&GlobalWorkflowProperties.DataItems[key].Value){
                                    if(GlobalWorkflowProperties.DataItems[key].Value==_activity.PropertyPermissions[index].PropertyName){
                                        PropertyPermissionsList.push(_activity.PropertyPermissions[index]) ;
                                        break;
            
                                    }
                                }    
                            }
                        }
                    }
                  
                }
               

                _activity.PropertyPermissions = PropertyPermissionsList;
                switch (this.ToolTipText) {
                    case 'Start':
                        _StartActivities.push(_activity);
                        break;
                    case 'End':
                        _EndActivities.push(_activity);
                        break;
                    case 'FillSheet':
                        _FillSheetActivities.push(_activity);
                        break;
                    case 'Approve':
                        _ApproveActivities.push(_activity);
                        break;
                    case 'Circulate':
                        _CirculateActivities.push(_activity);
                        break;
                    case 'Notify':
                        _NotifyActivities.push(_activity);
                        break;
                    case 'Wait':
                        _WaitActivities.push(_activity);
                        break;
                    case 'Connection':
                        _ConnectionActivities.push(_activity);
                        break;
                    case 'BizAction':
                        _BizActionActivities.push(_activity);
                        break;
                    case 'SubInstance':
                        _SubInstanceActivities.push(_activity);
                        break;
                }
            });

            //路由
            _Workflow.Rules = [];
            $(GlobalWorkflowProperties.Workflow.lines).each(function () {
                var thisLine = this;
                var _line = { Id: "a"+WorkflowDocument.uuid()};
                if (thisLine.DisplayName && !isNaN(parseInt(thisLine.TextX)) && !isNaN(parseInt(thisLine.TextY))) {
                    _line.TextX = parseInt(thisLine.TextX);
                    _line.TextY = parseInt(thisLine.TextY);
                }
                if (thisLine.FixedPoint){
                    _line.FixedPoint = thisLine.FixedPoint;
                }
                $(WorkflowProperties[thisLine.WorkflowElementType]).each(function () {
                    $(this.Properties).each(function () {
                        _line[this] = thisLine[this];
                    });
                });

                if (this.FontSize)
                    _line.FontSize = parseInt(this.FontSize);

                _line.PreActivityCode = this.startActivity.ActivityCode;
                _line.PostActivityCode = this.endActivity.ActivityCode;

                _line.Points = [];
                $(this.Points).each(function (pointIndex) {
                    _line.Points.push(this.x + ',' + this.y);
                });

                _Workflow.Rules.push(_line);
            });

            //移除头信息
            delete _Workflow['Creator'];
            delete _Workflow['ModifiedBy'];
            delete _Workflow['CreatedTime'];
            delete _Workflow['ModifiedTime'];
            _Workflow["IsNotifyStartUser"]=GlobalWorkflowProperties.IsNotifyStartUser?GlobalWorkflowProperties.IsNotifyStartUser:false
            _Data.WorkflowTemplate = $.fn.htmlEscape(JSON.stringify(_Workflow));
            _Data.StartActivities = $.fn.htmlEscape(JSON.stringify(_StartActivities));
            _Data.EndActivities = $.fn.htmlEscape(JSON.stringify(_EndActivities));
            _Data.FillSheetActivities = $.fn.htmlEscape(JSON.stringify(_FillSheetActivities));
            _Data.ApproveActivities = $.fn.htmlEscape(JSON.stringify(_ApproveActivities));
            _Data.CirculateActivities = $.fn.htmlEscape(JSON.stringify(_CirculateActivities));
            _Data.NotifyActivities = $.fn.htmlEscape(JSON.stringify(_NotifyActivities));
            _Data.WaitActivities = $.fn.htmlEscape(JSON.stringify(_WaitActivities));
            _Data.ConnectionActivities = $.fn.htmlEscape(JSON.stringify(_ConnectionActivities));
            _Data.BizActionActivities = $.fn.htmlEscape(JSON.stringify(_BizActionActivities));
            _Data.SubInstanceActivities = $.fn.htmlEscape(JSON.stringify(_SubInstanceActivities));
            // _Data.sendMsgConfig = JSON.stringify(sendMsgConfig);
            if(sessionStorage.getItem('currentAppType')){_Data.source = sessionStorage.getItem('currentAppType');}
            
        }
        console.log(JSON.parse(_Data.ApproveActivities.replace(/&quot;/g, '"')));
        return _Data;
    },

    //部分检验:仅检验是否可以保存
    PartValidateWorkflow: function () {
        var _IdTable = {};
        var _ActivityCodeTable = {};
        var _ErrorList = [];
        var errorCode = 0;

        $(GlobalWorkflowProperties.Workflow.activities).each(function () {
            if (this.IsApproveActivity) {
                if (this.ApproveExit == '' || this.ApproveExit == null) {
                    $.IShowError('错误', '节点' + this.DisplayName + '的同意出口不能为空');
                    errorCode = -1;
                    return;
                } else if (this.ApproveExit == '0') {
                    $.IShowError('错误', '节点' + this.DisplayName + '的同意出口不能为0');
                    errorCode = -1;
                    return;
                }
            }
            if (this.DisplayName.replace(/^\s+|\s+$/g, '') == '' || this.DisplayName == undefined) {
                $.IShowError('', '节点' + this.ActivityCode + '的显示名称不能为空');
                errorCode = -1;
                return;
            }
            if (this.DisplayName.length > 18) {
                $.IShowError('', '节点' + this.ActivityCode + '的显示名称不能超过18个字符');
                errorCode = -1;
                return;
            }
            //如果Id对应的对象已存在,那么将Id改为新Id
            if (this.ActivityType == 3 || this.ActivityType == 4) { this.ParticipateType = 2; }
            if (_IdTable[this.Id]) {
                this.Id = workflow.getNewShapeID();
            }
            _IdTable[this.Id] = this;

            if (_ActivityCodeTable[this.ActivityCode]) {
                _ErrorList.push( ':' + _ActivityCodeTable[this.ActivityCode].DisplayName + ',' + this.DisplayName);
            }
            else
                _ActivityCodeTable[this.ActivityCode] = this;
        });
        if (errorCode == -1) return false;
        var fillSheetValidate = false;
        $(GlobalWorkflowProperties.Workflow.lines).each(function () {
            //此处判断第一个手工活动节点参与者配置是否是发起人
            // if (!fillSheetValidate) {
            //     var pre = this.PreActivityCode;
            //     var post = this.PostActivityCode;
            //     var preAct = null;
            //     var postAct = null;
            //     for(let activity of GlobalWorkflowProperties.Workflow.activities){
            //         if (pre === activity.ActivityCode) {
            //             preAct = activity;
            //         }
            //         if (post === activity.ActivityCode) {
            //             postAct = activity;
            //         }

            //         if (preAct != null && postAct != null) {
            //             break;
            //         }
            //     }

            //     if (preAct != null && postAct != null && preAct.ToolTipText == 'Start' && postAct.ToolTipText == 'FillSheet') {
            //         if (postAct.Participants != '{Originator}' && postAct.Participants != 'Originator') {
            //             $.IShowError('', '第一个手工节点为发起环节，参与者只能为发起人！');
            //             errorCode = -1;
            //             return false;
            //         } else {
            //             fillSheetValidate = true;
            //         }
            //     }
            // }


            //如果Id对应的对象已存在,那么将Id改为新Id
            if (_IdTable[this.Id]) {
                this.Id = GlobalWorkflowProperties.Workflow.getNewShapeID();
            }

            _IdTable[this.Id] = this;
        });
        if (errorCode == -1) return false;
        if (_ErrorList && _ErrorList.length > 0) {
            WorkflowDocument.ShowErrorList(_ErrorList);
            return false;
        }

        return true;
    },

    //完整检验
    FullValidateWorkflow: function () {
        if (!WorkflowDocument.PartValidateWorkflow())
            return;

        WorkflowDocument.OnBeginAjax();
        PostAction(ActonName_ValidateWorkflow, WorkflowDocument.GetWorkflowPostData('ValidateWorkflow', true), function (result) {
            if (result.Successful) {
                result = result.ReturnData.Data;
                var _Content = [];
                if (result.Result) {
                    _Content.push({ status: 'success', text: '验���成功' });
                }
                else {
                    _Content.push({ status: 'error', text: '验证失败' });
                }
                $(result.Errors).each(function (index) {
                    _Content.push({ status: 'error', text: this });
                });
                $(result.Warnings).each(function (index) {
                    _Content.push({ status: 'warn', text: this });
                });
                $.H3Dialog.AlertMultiMsg({ content: _Content });
            }

        }, function (msg) {
            WorkflowDocument.ShowAjaxErrors(msg, '验证失败');
        });
        WorkflowDocument.OnEndAjax();
    },

    PublishWorkflow: function (sendMsgConfig) {
        if (!WorkflowDocument.PartValidateWorkflow())
            return Promise.reject('校验失败');
        WorkflowDocument.OnBeginAjax();
        WorkflowDocument.OnSave();
        const saveFlow = HTTP.saveFlow(WorkflowDocument.GetWorkflowPostData('PublishWorkflow', true, sendMsgConfig));
        WorkflowDocument.OnEndAjax();
        return saveFlow;

    },

    InitWorkflow: function (_WorkflowCode) {
        if (!_WorkflowCode) {
            return;
        }
        var workflow=GlobalWorkflowProperties.Workflow;
        workflow.BizObjectSchemaCode = _WorkflowCode;
        workflow.WorkflowCode = _WorkflowCode;


        //初始化四个活动节点
        var _Start = ActivityModelSettings.GetActivityModelByTypeName('Start');
        var _FillSheet = ActivityModelSettings.GetActivityModelByTypeName('FillSheet');
        var _Approve = ActivityModelSettings.GetActivityModelByTypeName('Approve');
        var _End = ActivityModelSettings.GetActivityModelByTypeName('End');
        if (_Start && _End && _FillSheet && _Approve) {
            workflow.addActivity($(_Start.htmlObject).clone().appendTo(workflow.workspace).css('left', 200).css('top', 70).show(), _Start).getPropertyFromModel();
            workflow.addActivity($(_FillSheet.htmlObject).clone().appendTo(workflow.workspace).css('left', 200).css('top', 170).show(), _FillSheet).getPropertyFromModel();
            //第一个环节参与者为发起人
            {
                workflow.activities[1].Participants = '{Originator}';
            }
            workflow.addActivity($(_Approve.htmlObject).clone().appendTo(workflow.workspace).css('left', 200).css('top', 270).show(), _Approve).getPropertyFromModel();
            workflow.addActivity($(_End.htmlObject).clone().appendTo(workflow.workspace).css('left', 200).css('top', 370).show(), _End).getPropertyFromModel();

            var _Line1 = new Line({
                Id: workflow.getNewShapeID(),
                //开始活动
                startActivity: workflow.activities[0],
                //起点
                startPoint: { x: workflow.activities[0].center, y: workflow.activities[0].bottom },
                //画线开始时的方向
                startDirection: LineArrowDirection.Down,
                //结束活动
                endActivity: workflow.activities[1],
                //结束方向
                endDirection: LineArrowDirection.Up,
                //结束点
                endPoint: { x: workflow.activities[1].center, y: workflow.activities[1].top }
            });
            _Line1.setPoints();
            _Line1.draw();
            workflow.lines.push(_Line1);

            var _Line2 = new Line({
                Id: workflow.getNewShapeID(),
                //开始活动
                startActivity: workflow.activities[1],
                //起点
                startPoint: { x: workflow.activities[1].center, y: workflow.activities[1].bottom },
                //画线开始时的方向
                startDirection: LineArrowDirection.Down,
                //结束活动
                endActivity: workflow.activities[2],
                //结束方向
                endDirection: LineArrowDirection.Up,
                //结束点
                endPoint: { x: workflow.activities[2].center, y: workflow.activities[2].top }
            });
            _Line2.setPoints();
            _Line2.draw();
            workflow.lines.push(_Line2);

            var _Line3 = new Line({
                Id: workflow.getNewShapeID(),
                //开始活动
                startActivity: workflow.activities[2],
                //起点
                startPoint: { x: workflow.activities[2].center, y: workflow.activities[2].bottom },
                //画线开始时的方向
                startDirection: LineArrowDirection.Down,
                //结束活动
                endActivity: workflow.activities[3],
                //结束方向
                endDirection: LineArrowDirection.Up,
                //结束点
                endPoint: { x: workflow.activities[3].center, y: workflow.activities[3].top }
            });
            _Line3.setPoints();
            _Line3.draw();
            workflow.lines.push(_Line3);

            $(workflow.lines).each(function () {
                this.SetFontColor();
                this.SetFontSize();
                this.SetLineStyle();
            });
        }
        workflow.autoFit();
    },

    //从服务器加载流程模板
    LoadWorkflowFromServer: function (_WorkflowCode) {
        if (!_WorkflowCode) {
            return;
        }

        workflow.WorkflowCode = _WorkflowCode;
        PostAction(ActonName_GetWorkflow, { WorkflowCode: _WorkflowCode }, function (result) {
            //if (result == 'PortalSessionOut') {
            //    WorkflowDocument.ShowLogin();
            //    return;
            //}
            if (!result.Successful) {
                return;
            }

            WorkflowDocumentStack.Workflow = result.ReturnData.Data;
            WorkflowDocument.LoadWorkflow(result.ReturnData.Data);
        });
    },

    //_PlayAble:允许播放
    //_RemoveLeftSpace:移除左上侧空白
    LoadWorkflow: function (_Content, _PlayAble, _RemoveLeftTopSpace) {

        if (!_Content){
            return;
        }
        var workflow=GlobalWorkflowProperties.Workflow;
        // 左侧保留的最小空白宽度
        var _MinLeftSpace = 45;
        //上侧保留的最小空白宽度
        var _MinTopSpace = 45;

        //从后台获取的流程模板对象
        WorkflowDocumentStack.Workflow = {};
        $.extend(WorkflowDocumentStack.Workflow, WorkflowDocumentStack.Workflow, _Content);
        //时间类型不能读取后保存
        delete WorkflowDocumentStack.Workflow['ModifiedTime'];
        delete WorkflowDocumentStack.Workflow['CreatedTime'];
        //去除活动\线条
        delete WorkflowDocumentStack.Workflow['Activities'];
        delete WorkflowDocumentStack.Workflow['Rules'];
        delete WorkflowDocumentStack.Workflow['StartActivity'];

        //用于编辑的前台流程模板对象
        //workflow.WorkflowCode = _Content.SchemaCode;
        //workflow.NewShapeID = _Content.CurrentNewShapeID;

        //获取流程图属性
        for (var _Property in _Content) {
            if (_Property != 'Activities' && _Property != 'Rules')
            workflow[_Property] = _Content[_Property];
        }
        _Content["Activities"].forEach((value)=>{
            var sub =value.ActivityCode;
            var num = parseInt(sub.substr(8,sub.length-7));
            if(num>workflow.NewShapeID){
                workflow.NewShapeID=num;
            }
        })
        // for(var index in _Content["Activities"]){
        //     var sub =_Content["Activities"][index].ActivityCode;
        //     var num = parseInt(sub.substr(8,sub.length-8));
        //     if(num>workflow.NewShapeID){
        //         workflow.NewShapeID=num;
        //     }

        // }


        //移除左上空白
        if (_RemoveLeftTopSpace) {
            var _LeftSpace = Number.POSITIVE_INFINITY;
            var _TopSpace = Number.POSITIVE_INFINITY;
            $(_Content.Activities).each(function () {
                _LeftSpace = Math.min(this.X - this.Width / 2, _LeftSpace);
                _TopSpace = Math.min(this.Y - this.Height / 2, _TopSpace);
            });
            $(_Content.Rules).each(function () {
                $(this.Points).each(function () {
                    var x = parseInt(this.split(',')[0]);
                    var y = parseInt(this.split(',')[1]);
                    _LeftSpace = Math.min(x, _LeftSpace);
                    _TopSpace = Math.min(y, _TopSpace);
                });
            });

            //是否左移
            var moveLeft = _LeftSpace != Number.POSITIVE_INFINITY && _LeftSpace > _MinLeftSpace;
            //是否上移
            var moveTop = _TopSpace != Number.POSITIVE_INFINITY && _TopSpace > _MinTopSpace;
            if (moveLeft || moveTop) {
                if (moveLeft) {
                    _LeftSpace -= _MinLeftSpace;
                }
                if (moveTop) {
                    _TopSpace -= _MinTopSpace;
                }
                $(_Content.Activities).each(function () {
                    if (moveLeft) {
                        this.X -= _LeftSpace;
                    }
                    if (moveTop) {
                        this.Y -= _TopSpace;
                    }
                });
                $(_Content.Rules).each(function () {
                    for (var i = 0; i < this.Points.length; i++) {
                        var x = parseInt(this.Points[i].split(',')[0]);
                        var y = parseInt(this.Points[i].split(',')[1]);
                        if (moveLeft) {
                            x -= _LeftSpace;
                        }
                        if (moveTop) {
                            y -= _TopSpace;
                        }
                        this.Points[i] = x + ',' + y;
                    }
                });
            }
        }

        //绘制活动
        $(_Content.Activities).each(function () {
            //活动模板
            var modelHtml = ActivityModelSettings.GetActivityModelByType(this.ActivityType).htmlObject;
            var _selector=$(modelHtml)
            .clone()
            .appendTo(GlobalWorkflowProperties.Workflow.workspace).show()
            .css('left', this.X - this.Width / 2)
            //.css('left',($(workflow.outerContainer).width()-this.Width)/2)
            //.css('left',this.X+padding)
            .css('top', this.Y - this.Height / 2);
            //绘制图形
            var activity = GlobalWorkflowProperties.Workflow.addActivity(_selector,
                ActivityModelSettings.GetActivityModelByType(this.ActivityType),this.ObjectId);
            //高
            if (this.Height) {
                $(activity.htmlObject).outerHeight(this.Height < ActivitySettings.MinOuterHeight ? this.Height < ActivitySettings.MinOuterHeight : this.Height);
            }
            //宽
            if (this.Width){
                $(activity.htmlObject).outerWidth(this.Width);
            }

            //文字
            activity.DisplayName = this.DisplayName;
            // if (this.DisplayName.length > 5) {
            //     $(activity.htmlObject).addClass('word-much');
            // }

            activity.SetText();
            //颜色
            activity.FontColor = this.FontColor
            activity.SetFontColor();
            //文字大小
            activity.FontSize = this.FontSize;
            activity.SetFontSize();

            //位置
            activity.savePosition();

            //获取属性
            $.extend(activity, activity, this);
        });

        var getDirection = function (_xOffset, _yOffset, _activity) {
            if (Math.abs(_xOffset - 0) <= 2) {
                return LineArrowDirection.Left;
            }
            else if (Math.abs(_yOffset - 0) <= 2)
                return LineArrowDirection.Up;
            else if (Math.abs(_xOffset - _activity.width) <= 2) {
                return LineArrowDirection.Right;
            }
            else
                return LineArrowDirection.Down;
        }
        //绘制线条
        $(_Content.Rules).each(function () {
            // if (this.Id == '80') {
            //     console.log(80);
            // }
            var _StartActivity = GlobalWorkflowProperties.Workflow.getActivityByCode(this.PreActivityCode);
            var _EndActivity = GlobalWorkflowProperties.Workflow.getActivityByCode(this.PostActivityCode);
            if (_StartActivity && _EndActivity) {
                var _StartPoint = {
                    x: parseInt(this.Points[0].split(',')[0]),
                    y: parseInt(this.Points[0].split(',')[1])
                };
                //第二点
                var _SecondPoint = {
                    x: parseInt(this.Points[1].split(',')[0]),
                    y: parseInt(this.Points[1].split(',')[1])
                }
                //倒数第二点
                var _PenultimatePoint = {
                    x: parseInt(this.Points[this.Points.length - 2].split(',')[0]),
                    y: parseInt(this.Points[this.Points.length - 2].split(',')[1])
                }
                var _EndPoint = {
                    x: parseInt(this.Points[this.Points.length - 1].split(',')[0]),
                    y: parseInt(this.Points[this.Points.length - 1].split(',')[1])
                }

                var _StartDirection = LineArrowDirection.Unspecified;
                var _EndDirection = LineArrowDirection.Unspecified;

                //用第二个点判断起始方向
                if (_SecondPoint.x > _StartActivity.left && _SecondPoint.x < _StartActivity.right) {
                    if (_SecondPoint.y < _StartActivity.top) {
                        _StartDirection = LineArrowDirection.Up;
                        _StartPoint.y = _StartActivity.top;
                    }
                    else {
                        _StartDirection = LineArrowDirection.Down;
                        _StartPoint.y = _StartActivity.bottom;
                    }
                }
                else if (_SecondPoint.y > _StartActivity.top && _SecondPoint.y < _StartActivity.bottom) {
                    if (_SecondPoint.x < _StartActivity.left) {
                        _StartDirection = LineArrowDirection.Left;
                        _StartPoint.x = _StartActivity.left;
                    }
                    else {
                        _StartDirection = LineArrowDirection.Right;
                        _StartPoint.x = _StartActivity.right;
                    }
                }
                else {
                    _StartDirection = getDirection(_StartPoint.x - _StartActivity.left, _StartPoint.y - _StartActivity.top, _StartActivity);
                }

                //用倒数第二个点判断结束方向
                if (_PenultimatePoint.x > _EndActivity.left && _PenultimatePoint.x < _EndActivity.right) {
                    if (_PenultimatePoint.y < _EndActivity.top) {
                        _EndDirection = LineArrowDirection.Up;
                        _EndPoint.y = _EndActivity.top;
                    }
                    else {
                        _EndDirection = LineArrowDirection.Down;
                        _EndPoint.y = _EndActivity.bottom;
                    }
                }
                else if (_PenultimatePoint.y > _EndActivity.top && _PenultimatePoint.y < _EndActivity.bottom) {
                    if (_PenultimatePoint.x < _EndActivity.left) {
                        _EndDirection = LineArrowDirection.Left;
                        _EndPoint.x = _EndActivity.left;
                    }
                    else {
                        _EndDirection = LineArrowDirection.Right;
                        _EndPoint.x = _EndActivity.right;
                    }
                }
                else {
                    _EndDirection = getDirection(_EndPoint.x - _EndActivity.left, _EndPoint.y - _EndActivity.top, _EndActivity);
                }

                var line = new Line({
                    Id: this.ObjectId,

                    startActivity: _StartActivity,
                    startPoint: _StartPoint,
                    startDirection: getDirection(_StartPoint.x - _StartActivity.left, _StartPoint.y - _StartActivity.top, _StartActivity),

                    endActivity: _EndActivity,
                    endPoint: _EndPoint,
                    endDirection: getDirection(_EndPoint.x - _EndActivity.left, _EndPoint.y - _EndActivity.top, _EndActivity)
                });

                line.Points = [];
                var _PointCount = this.Points.length;
                $(this.Points).each(function (index) {
                    if (index == 0) {
                        line.Points.push(_StartPoint);
                    }
                    else if (index == _PointCount - 1) {
                        line.Points.push(_EndPoint);
                    }
                    else if (index == 1) {
                        line.Points.push(_SecondPoint);
                    }
                    else if (index == _PointCount - 2) {
                        line.Points.push(_PenultimatePoint);
                    }
                    else {
                        line.Points.push({
                            x: parseInt(this.split(',')[0]),
                            y: parseInt(this.split(',')[1])
                        });
                    }
                });

                if (this.Points.length == 0)
                    this.setPoints();

                GlobalWorkflowProperties.Workflow.lines.push(line);

                //
                delete this['Points'];
                $.extend(line, line, this);
            }
        });

        //如果使用SVG,才计算交叉点
        if (GlobalWorkflowProperties.Workflow.UtilizeSvg) {
            $(GlobalWorkflowProperties.Workflow.lines).each(function () {
                this.calculateCrossPoints();
            });
        }
        $(GlobalWorkflowProperties.Workflow.lines).each(function () {
            this.draw(true);
            this.SetText();
            this.SetFontColor();
            this.SetFontSize();
            this.SetLineStyle();
        });

        GlobalWorkflowProperties.Workflow.autoFit();

        //计算下一个Id
        if (!GlobalWorkflowProperties.Workflow.NewShapeID)
            GlobalWorkflowProperties.Workflow.NewShapeID = 1;
        {
            $(GlobalWorkflowProperties.Workflow.activities).each(function () {
                if (!isNaN(this.Id) && this.Id >= GlobalWorkflowProperties.Workflow.NewShapeID) {
                    GlobalWorkflowProperties.Workflow.NewShapeID = this.Id + 1;
                }
            });

            $(GlobalWorkflowProperties.Workflow.lines).each(function () {
                if (!isNaN(this.Id) && this.Id >= GlobalWorkflowProperties.Workflow.NewShapeID) {
                    GlobalWorkflowProperties.Workflow.NewShapeID = this.Id + 1;
                }
            });
        }

        //显示流程状态
        if (typeof (WorkflowInstance) != 'undefined' && WorkflowInstance) {
            //流程有异常
            var InstanceExceptional = false
            if (typeof (UnfixedExceptionLogs) != 'undefined' && UnfixedExceptionLogs.length > 0) {
                InstanceExceptional = true;
            }
            for (let activity of GlobalWorkflowProperties.Workflow.activities){
                if (activity.ToolTipText == 'Start') {
                    WorkflowPlayStack.StartActivityCode = activity.ActivityCode;
                    break;
                }
            }

            if (WorkflowPlayStack.StartActivityCode) {
                //插入开始Token
                WorkflowInstance.Tokens.splice(0, 0, {
                    Activity: WorkflowPlayStack.StartActivityCode,
                    CreatedTime: WorkflowInstance.CreatedTime,
                    FinishedTime: WorkflowInstance.CreatedTime,
                    State: TokenState.Finished,
                    TokenId: -1
                });
            }

            $(WorkflowInstance.Tokens).each(function () {
                //从WorkItems修正Token的StartTime、FinishTime、CancelTime、State
                if (typeof (WorkItems) != 'undefined') {
                    var _thisToken = this;
                    this.WorkItems = $(WorkItems).filter(function () {
                        return this.TokenId == _thisToken.TokenId;
                    });
                    if (this.WorkItems.length > 0) {
                        //如果当前Token的状态是Running(0),判断是否有未完成的任务,若有,返回;若无,取最后一个FinishTime\CancelTime为Token的FinishTime\CancelTime,并修改State为Finished\Canceled
                        if (this.State == TokenState.Running) {
                            var _ExistUnfinished = false;
                            var _ExistFinished = false;
                            var _LastFinishTime = undefined;
                            var _LastCancelTime = undefined;
                            $(this.WorkItems).each(function () {
                                if (this.State == WorkItemState.Waiting || this.State == WorkItemState.Working) {
                                    _ExistUnfinished = true;
                                }
                                else if (this.State == WorkItemState.Finished) {
                                    _ExistFinished = true;
                                    if (!_LastFinishTime || _LastFinishTime < this.FinishTime)
                                        _LastFinishTime = this.FinishTime;
                                }
                                else if (this.State == WorkItemState.Canceled) {
                                    if (!_LastCancelTime || _LastCancelTime < this.CancelTime)
                                        _LastCancelTime = this.CancelTime;
                                }
                            });
                            //如果不存在未完成的
                            if (!_ExistUnfinished) {
                                //存在已完成的
                                if (_ExistFinished) {
                                    _thisToken.State = TokenState.Finished;
                                    _thisToken.FinishedTime = _LastFinishTime;
                                }
                                //不存在已完成的
                                else {
                                    _thisToken.State = TokenState.Dropped;
                                    _thisToken.CanceledTime = _LastCancelTime;
                                }
                            }
                        }
                        //如果当前Token的状态是Dropped,取最后一个CancelTime为Token的CancelTime
                        else if (this.State == TokenState.Dropped) {
                            this.CanceledTime = undefined;
                            $(this.WorkItems).each(function () {
                                if (this.State == WorkItemState.Canceled && (!_thisToken.CanceledTime || _thisToken.CanceledTime < this.CancelTime)) {
                                    _thisToken.CanceledTime = this.CancelTime;
                                }
                            });
                        }
                    }
                }
            });

            $(GlobalWorkflowProperties.Workflow.activities).each(function () {
                var _thisActivity = this;

                var _ExistUnfinished = false;
                var _ExistFinished = false;
                var _Exceptional = false;

                //出现过异常
                if (typeof (ExceptionActivities) != 'undefined' && $(ExceptionActivities).filter(function () {
                    return this.toString() == _thisActivity.ActivityCode
                }).length > 0) {
                    _Exceptional = true;
                    ExceptionActivityCode = _thisActivity.ActivityCode;
                }
                else {
                    $(WorkflowInstance.Tokens).each(function () {
                        if (this.Activity == _thisActivity.ActivityCode) {
                            //只有流程在进行中才显示进行中的任务
                            if (!InstanceExceptional && WorkflowInstance.State == InstanceState.Running && this.State == TokenState.Running)
                                _ExistUnfinished = true;
                            //已完成
                            else if (this.State == TokenState.Finished)
                                _ExistFinished = true;
                        }
                    });
                }
                //ERROR:异常已修复\未修复未显示
                //TODO: 异常已修复\未修复显示
                if (_Exceptional) {
                    $(this.htmlObject).addClass('ActivityException');
                }
                else if (_ExistUnfinished)
                    $(this.htmlObject).addClass('ActivityWorking').addClass('ActivityBreathe');
                else if (_ExistFinished)
                    $(this.htmlObject).addClass('ActivityFinished');

                if (_PlayAble && $('#btnReplay').length == 0 && $('#lblWorkflowTitle').length == 1) {
                    $('#lblWorkflowTitle').append("<span>[</span><a id='btnReplay' style='cursor: pointer;'>" + _WorkflowDesigner_GlobalString.WorkflowDocument_Playback + '</a><span>]</span>');
                    var StartButton = $('#btnReplay');
                    StartButton.click(WorkflowDocument.Play);
                }
            });
        }
    },

    SaveAsImage: function () {
        var canvas = $('<canvas></canvas>');

        var _height = 0; var _width = 0;
        $(GlobalWorkflowProperties.Workflow.activities).each(function () {
            if (this.right > _width)
                _width = this.right;
            if (this.bottom > _height)
                _height = this.bottom;
        });
        $(GlobalWorkflowProperties.Workflow.lines).each(function () {
            $(this.Points).each(function () {
                if (this.x > _width)
                    _width = this.x;
                if (this.y > _height)
                    _height = this.y;
            });
        });
        _height += 100;
        _width += 100;
        canvas.attr('width', _width).attr('height', _height).css('width', _width + 'px').css('height', _height + 'px');
        var context = canvas[0].getContext('2d');

        var _WorkflowOffset = $(GlobalWorkflowProperties.Workflow.workspace).offset();
        $(GlobalWorkflowProperties.Workflow.lines).each(function (_lineIndex) {
            if (_lineIndex == 3 || _lineIndex == 7 || _lineIndex == 8) {
            }

            var _pointCount = this.Points.length;
            for (var index = 0; index < this.Points.length; index++) {
                if (index == 0) {
                    context.beginPath();
                    context.moveTo(this.Points[index].x, this.Points[index].y);
                }
                else {
                    context.lineTo(this.Points[index].x, this.Points[index].y);
                    if (index >= _pointCount - 1) {
                        context.strokeStyle = LineSettings.LineColor;
                        context.stroke();
                        context.restore();

                        //箭头
                        context.beginPath();
                        context.moveTo(this.Points[index].x, this.Points[index].y);
                        switch (this.endDirection) {
                            case LineArrowDirection.Up:
                                context.lineTo(this.Points[index].x - LineSettings.ArrowWidth, this.Points[index].y - LineSettings.ArrowLength);
                                context.lineTo(this.Points[index].x + LineSettings.ArrowWidth, this.Points[index].y - LineSettings.ArrowLength);
                                break;
                            case LineArrowDirection.Down:
                                context.lineTo(this.Points[index].x - LineSettings.ArrowWidth, this.Points[index].y + LineSettings.ArrowLength);
                                context.lineTo(this.Points[index].x + LineSettings.ArrowWidth, this.Points[index].y + LineSettings.ArrowLength);
                                break;
                            case LineArrowDirection.Left:
                                context.lineTo(this.Points[index].x - LineSettings.ArrowLength, this.Points[index].y - LineSettings.ArrowWidth);
                                context.lineTo(this.Points[index].x - LineSettings.ArrowLength, this.Points[index].y + LineSettings.ArrowWidth);
                                break;
                            case LineArrowDirection.Right:
                                context.lineTo(this.Points[index].x + LineSettings.ArrowLength, this.Points[index].y - LineSettings.ArrowWidth);
                                context.lineTo(this.Points[index].x + LineSettings.ArrowLength, this.Points[index].y + LineSettings.ArrowWidth);
                                break;
                        }
                        context.lineTo(this.Points[index].x, this.Points[index].y);
                        context.closePath();
                        context.strokeStyle = LineSettings.ArrowFillColor;
                        context.stroke();
                        context.fillStyle = LineSettings.ArrowFillColor;
                        context.fill();
                        context.restore();
                    }
                }
            }

            //文字
            if (this.Label && $(this.Label).text()) {
                var _label = $(this.Label);
                context.font = _label.css('font-size') + ' ' + _label.css('font-family');
                context.fillStyle = _label.css('color');
                context.textAlign = 'center';
                context.fillText(_label.text(), _label.offset().left - _WorkflowOffset.left + _label.outerWidth() / 2 + 2, _label.offset().top - _WorkflowOffset.top + _label.outerHeight() / 2 + 2, _label.outerWidth());
                context.restore();
            }
        });

        var _LogoPath = '..\\..\\Content\\designer\\image\\activity_model\\';

        //活动总数
        var _ActivityCount = GlobalWorkflowProperties.Workflow.activities.length;
        //记录已加载的Logo数量
        var _LogoCount = 0
        $(GlobalWorkflowProperties.Workflow.activities).each(function () {
            context.clearRect(this.left + 1, this.top + 1, this.width - 2, this.height - 2);
            context.rect(this.left, this.top, this.width, this.height);
            context.lineWidth = 1;
            context.stroke();
            context.restore();

            //文字
            var _label = $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel);
            context.font = _label.css('font-size') + ' ' + _label.css('font-family');
            context.fillStyle = _label.css('color');
            context.textAlign = 'center';
            context.fillText(_label.text(), _label.offset().left - _WorkflowOffset.left + _label.outerWidth() / 2 + 2, _label.offset().top - _WorkflowOffset.top + _label.outerHeight() / 2 + 2, _label.outerWidth());
            context.restore();

            //图标
            var _logoText = ActivityModelStyleClassName.LogoFontContent[this.ToolTipText];
            if (_logoText) {
                _logoText = String.fromCharCode(parseInt(_logoText, 16));
                var _logoDiv = $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLogo);
                var _logoLeft = _logoDiv.offset().left - _WorkflowOffset.left;
                var _logoTop = _logoDiv.offset().top - _WorkflowOffset.top;
                context.font = _logoDiv.css('font-size') + ' ' + _logoDiv.css('font-family');
                context.fillStyle = _logoDiv.css('color');
                context.textAlign = 'center';
                context.fillText(_logoText, _logoLeft + 2, _logoTop + _logoDiv.outerHeight(), _logoDiv.outerWidth());
                context.restore();
            }

            ////图标
            //var _logo = new Image();
            //_logo.src = _LogoPath + this.ToolTipText + '.png';
            //var _logoDiv = $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLogo);
            //var _logoLeft = _logoDiv.offset().left - _WorkflowOffset.left;
            //var _logoTop = _logoDiv.offset().top - _WorkflowOffset.top;
            //_logo.onload = function () {
            //    _LogoCount++;
            //    context.drawImage(_logo, _logoLeft, _logoTop, _logoDiv.width(), _logoDiv.height());
            //    context.restore();
            //
            //    if (_LogoCount >= _ActivityCount) {
            //        $('#divImage img').attr('src', canvas[0].toDataURL('image/png').toString());
            //        $('#divImage img').parent().css('height', '100%').css('width', '100%').css('overflow', 'auto');
            //
            //        $.ligerDialog.open({
            //            title: '查看图片',
            //            target: $('#divImage'),
            //            height: $('body').height(),
            //            width: $('body').width()
            //        });
            //    }
            //};
        });
        $('#divImage img').attr('src', canvas[0].toDataURL('image/png').toString());
        $('#divImage img').parent().css('height', '100%').css('width', '100%').css('overflow', 'auto');

        $.ligerDialog.open({
            title: _WorkflowDesigner_GlobalString.WorkflowDocument_ViewPicture,
            target: $('#divImage'),
            height: $('body').height(),
            width: $('body').width()
        });
    },

    ViewAsImage: function () {
        var canvas = $('<canvas></canvas>');

        var _height = 0; var _width = 0;

        //左边最小距离
        var _MinLeft = Number.POSITIVE_INFINITY;
        var _MinTop = Number.POSITIVE_INFINITY;
        $(GlobalWorkflowProperties.Workflow.activities).each(function () {
            if (this.right > _width)
                _width = this.right;
            if (this.bottom > _height)
                _height = this.bottom;

            if (this.left < _MinLeft) {
                _MinLeft = this.left;
            }
            if (this.top < _MinTop) {
                _MinTop = this.top;
            }
        });
        $(GlobalWorkflowProperties.Workflow.lines).each(function () {
            $(this.Points).each(function () {
                if (this.x > _width)
                    _width = this.x;
                if (this.y > _height)
                    _height = this.y;

                if (this.x < _MinLeft) {
                    _MinLeft = this.x;
                }
                if (this.y < _MinTop) {
                    _MinTop = this.y;
                }
            });
        });

        _width = _width + 10 - _MinLeft;
        _height = _height + 10 - _MinTop;

        var _L = 5 - _MinLeft;
        var _T = 5 - _MinTop;

        canvas.attr('width', _width).attr('height', _height).css('width', _width + 'px').css('height', _height + 'px');

        var context = canvas[0].getContext('2d');

        var _WorkflowOffset = $(GlobalWorkflowProperties.Workflow.workspace).offset();

        $(GlobalWorkflowProperties.Workflow.lines).each(function () {
            $(this.Points).each(function () {
                this.x = this.x + _L;
                this.y = this.y + _T;
            })
        })
        $(GlobalWorkflowProperties.Workflow.activities).each(function () {
            this.left += _L;
            this.top += _T;
        })

        $(GlobalWorkflowProperties.Workflow.lines).each(function (_lineIndex) {


            var _pointCount = this.Points.length;
            for (var index = 0; index < this.Points.length; index++) {
                if (index == 0) {
                    context.beginPath();
                    context.moveTo(this.Points[index].x, this.Points[index].y);
                }
                else {
                    context.lineTo(this.Points[index].x, this.Points[index].y);
                    if (index >= _pointCount - 1) {
                        context.strokeStyle = LineSettings.LineColor;
                        context.stroke();
                        context.restore();

                        //箭头
                        context.beginPath();
                        context.moveTo(this.Points[index].x, this.Points[index].y);
                        switch (this.endDirection) {
                            case LineArrowDirection.Up:
                                context.lineTo(this.Points[index].x - LineSettings.ArrowWidth, this.Points[index].y - LineSettings.ArrowLength);
                                context.lineTo(this.Points[index].x + LineSettings.ArrowWidth, this.Points[index].y - LineSettings.ArrowLength);
                                break;
                            case LineArrowDirection.Down:
                                context.lineTo(this.Points[index].x - LineSettings.ArrowWidth, this.Points[index].y + LineSettings.ArrowLength);
                                context.lineTo(this.Points[index].x + LineSettings.ArrowWidth, this.Points[index].y + LineSettings.ArrowLength);
                                break;
                            case LineArrowDirection.Left:
                                context.lineTo(this.Points[index].x - LineSettings.ArrowLength, this.Points[index].y - LineSettings.ArrowWidth);
                                context.lineTo(this.Points[index].x - LineSettings.ArrowLength, this.Points[index].y + LineSettings.ArrowWidth);
                                break;
                            case LineArrowDirection.Right:
                                context.lineTo(this.Points[index].x + LineSettings.ArrowLength, this.Points[index].y - LineSettings.ArrowWidth);
                                context.lineTo(this.Points[index].x + LineSettings.ArrowLength, this.Points[index].y + LineSettings.ArrowWidth);
                                break;
                        }
                        context.lineTo(this.Points[index].x, this.Points[index].y);
                        context.closePath();
                        context.strokeStyle = LineSettings.ArrowFillColor;
                        context.stroke();
                        context.fillStyle = LineSettings.ArrowFillColor;
                        context.fill();
                        context.restore();
                    }
                }
            }

            //文字
            if (this.Label && $(this.Label).text()) {
                var _label = $(this.Label);
                context.font = _label.css('font-size') + ' ' + _label.css('font-family');
                context.fillStyle = _label.css('color');
                context.textAlign = 'center';
                context.fillText(_label.text(), _label.offset().left - _WorkflowOffset.left + _label.outerWidth() / 2 + 2, _label.offset().top - _WorkflowOffset.top + _label.outerHeight() / 2 + 2, _label.outerWidth());
                context.restore();
            }
        });

        var _LogoPath = '..\\WFRes\\_Content\\designer\\image\\activity_model\\';

        //活动总数
        var _ActivityCount = GlobalWorkflowProperties.Workflow.activities.length;
        //记录已加载的Logo数量
        var _LogoCount = 0
        $(GlobalWorkflowProperties.Workflow.activities).each(function () {
            context.clearRect(this.left + 1, this.top + 1, this.width - 2, this.height - 2);
            context.rect(this.left, this.top, this.width, this.height);
            context.lineWidth = 1;
            context.stroke();
            context.restore();

            context.fillStyle = $(this.htmlObject).css('background-color');
            context.fillRect(this.left, this.top, this.width, this.height);
            context.restore();

            //文字
            var _label = $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLabel);
            context.font = _label.css('font-size') + ' ' + _label.css('font-family');
            context.fillStyle = _label.css('color');
            context.textAlign = 'center';
            context.fillText(_label.text(), _label.offset().left - _WorkflowOffset.left + _label.outerWidth() / 2 + 2 + _L, _label.offset().top - _WorkflowOffset.top + _label.outerHeight() / 2 + 2 + _T, _label.outerWidth());
            context.restore();

            //图标
            var _logoText = ActivityModelStyleClassName.LogoFontContent[this.ToolTipText];
            if (_logoText) {
                _logoText = String.fromCharCode(parseInt(_logoText, 16));
                var _logoDiv = $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLogo);
                var _logoLeft = _logoDiv.offset().left - _WorkflowOffset.left;
                var _logoTop = _logoDiv.offset().top - _WorkflowOffset.top;
                context.font = _logoDiv.css('font-size') + ' ' + _logoDiv.css('font-family');
                context.fillStyle = _logoDiv.css('color');
                context.textAlign = 'center';
                context.fillText(_logoText, _logoLeft + 2 + _L, _logoTop + _logoDiv.outerHeight() + _T, _logoDiv.outerWidth());
                context.restore();
            }
            ////图标
            //var _logo = new Image();
            //_logo.src = _LogoPath + this.ToolTipText + '.png';
            //var _logoDiv = $(this.htmlObject).find('.' + ActivityStyleClassName.ActivityLogo);
            //var _logoLeft = _logoDiv.offset().left - _WorkflowOffset.left + _L;
            //var _logoTop = _logoDiv.offset().top - _WorkflowOffset.top + _T;
            //_logo.onload = function () {
            //    _LogoCount++;
            //    context.drawImage(_logo, _logoLeft, _logoTop, _logoDiv.width(), _logoDiv.height());
            //    context.restore();

            //    if (_LogoCount >= _ActivityCount) {
            //        var _WorkSpace = $('.workspace').empty();
            //        var _Img = $('<img>').attr('src', canvas[0].toDataURL('image/png').toString());
            //        _Img.appendTo(_WorkSpace);
            //    }
            //};
        });

        var _WorkSpace = $('.workspace').empty();
        var _Img = $('<img>').attr('src', canvas[0].toDataURL('image/png').toString());
        _Img.appendTo(_WorkSpace);
    },

    RefreshWorkflow: function () {
        WorkflowDocument.ClearWorkflowContent();
        WorkflowDocument.LoadWorkflow(GlobalWorkflowProperties.Workflow.WorkflowCode);
        WorkflowDocument.ShowDealResult(_WorkflowDesigner_GlobalString.WorkflowDocument_RefreshedSuccessful);
    },

    ClearWorkflowContent: function () {
        $(GlobalWorkflowProperties.Workflow.activities).each(function () {
            $(this.htmlObject).remove();
        });

        $(GlobalWorkflowProperties.Workflow.lines).each(function () {
            $(this.Path).remove();
            $(this.Arrow).remove();
            this.Unselect();
        });

        $('.' + WorkflowStyleClassName.WorkflowAotuArrow).hide();
        GlobalWorkflowProperties.Workflow.activities = [];
        GlobalWorkflowProperties.Workflow.lines = [];
        GlobalWorkflowProperties.Workflow.selectedActivities = [];

        WorkflowDocument.ShowDealResult(_WorkflowDesigner_GlobalString.WorkflowDocument_Empty);
    },
    //启用行为
    EnableActions: function () {
        WorkflowDocumentStack.IsLocked = false;

        $('#ToolBar').show();
        //活动
        $(GlobalWorkflowProperties.Workflow.activities).each(function () {
            $(this.htmlObject).unbind(WorkflowDocumentSettings.LockEventNamespace);
            this.initActions();
        });

        //流程图
        $(GlobalWorkflowProperties.Workflow.workspace).unbind(WorkflowDocumentSettings.LockEventNamespace);
        GlobalWorkflowProperties.Workflow.initActions();

        //活动模板
        $(ActivityModelSettings.ActivityModels).each(function () {
            $(this.htmlObject).unbind(WorkflowDocumentSettings.LockEventNamespace);
            this.initActions();
        });
    },
    //禁止行为
    DisableActions: function () {
        WorkflowDocumentStack.IsLocked = true;

        var doLock = function (e) {
            e.preventDefault();
        };

        $('#ToolBar').hide();

        $(GlobalWorkflowProperties.Workflow.workspace).find('.' + WorkflowStyleClassName.WorkflowAotuArrow).hide();

        //流程图
        $(GlobalWorkflowProperties.Workflow.workspace).unbind(WorkflowSettings.EventNameSpace)
            .unbind(WorkflowSettings.MultiSelectEventNameSpace)
            .bind('mousedown' + WorkflowDocumentSettings.LockEventNamespace, doLock);

        //活动
        $(GlobalWorkflowProperties.Workflow.activities).each(function () {
            this.Unselect();

            $(this.htmlObject).unbind(ActivitySettings.EventNameSpace)
                .unbind(ActivitySettings.ResizeEventNameSpace)
                .bind('mousedown' + WorkflowDocumentSettings.LockEventNamespace, doLock);;
        });

        $(GlobalWorkflowProperties.Workflow.lines).each(function () {
            this.Unselect();
        });

        //活动模板
        $(ActivityModelSettings.ActivityModels).each(function () {
            $(this.htmlObject).unbind(ActivityModelSettings.EventNameSpace)
                .bind('mousedown' + WorkflowDocumentSettings.LockEventNamespace, doLock);;
        });
    },

    InitStage: function () {
        WorkflowPlayStack.AllActions = [];
        $(WorkflowInstance.Tokens).each(function () {
            //添加激活动作
            if (this.State == TokenState.Running || this.State == TokenState.Finished || (this.State == TokenState.Dropped && this.CanceledTime)) {
                WorkflowPlayStack.AllActions.push(new PlayAction(this.CreatedTime, this.Activity, WorkflowPlaySettings.ActionType.Active, this.TokenId));

                if (this.State == TokenState.Finished)
                    WorkflowPlayStack.AllActions.push(new PlayAction(this.FinishedTime, this.Activity, WorkflowPlaySettings.ActionType.Finish, this.TokenId));
                else if (this.State == TokenState.Dropped)
                    WorkflowPlayStack.AllActions.push(new PlayAction(this.CanceledTime, this.Activity, WorkflowPlaySettings.ActionType.Cancel, this.TokenId));
            }
        });
        //播放动作排序
        WorkflowPlayStack.AllActions.sort(function (a, b) {
            if (a.ActionTime != b.ActionTime) {
                return parseFloat(a.ActionTime.match(/[0-9]+/)) > parseFloat(b.ActionTime.match(/[0-9]+/)) ? 1 : -1;
            }
            else if (a.TokenId != b.TokenId) {
                return a.TokenId > b.TokenId ? 1 : -1;
            }
            else if (a.ActionType != b.ActionType) {
                return b.ActionType == WorkflowPlaySettings.ActionType.Active ? 1 : -1;
            }
        });

        //如果流程异常,添加一帧
        if (ExceptionActivityCode)
            WorkflowPlayStack.AllActions.push(new PlayAction(null, ExceptionActivityCode, WorkflowPlaySettings.ActionType.Exception, null))

        //舞台模板
        $('.Stage,.Dancer').remove();
        var StageModel = $('<div></div>').addClass('Stage');
        var DancerModel = $('<div></div>').addClass('Dancer');
        //为每一个活动添加舞台帧和表演帧
        $(GlobalWorkflowProperties.Workflow.activities).each(function () {
            StageModel.clone().appendTo(this.htmlObject);
            DancerModel.clone().appendTo(this.htmlObject);
        });
        $('.ActivityEnd').addClass('Play');
        //切换到下一帧
        WorkflowPlaySettings.PlayNextFrame = function () {
            //摁下暂停
            if (WorkflowPlayStack.PlayFlag == WorkflowPlaySettings.PlayFlag.Pause) {
                return;
            }
            //继续播放
            else if (WorkflowPlayStack.PlayFlag == WorkflowPlaySettings.PlayFlag.Playing) {
                //如果从0帧开始播放
                if (WorkflowPlayStack.NextFrameIndex == 0) {
                    $('.Stage').removeAttr('style').css('background-color', WorkflowColor.Default);
                    $('.Dancer').removeAttr('style');
                }
                else if (WorkflowPlayStack.NextFrameIndex >= WorkflowPlayStack.AllActions.length) {
                    //结束播放
                    $('.ActivityWorking').addClass('ActivityBreathe');
                    $('.ActivityEnd').removeClass('Play');
                    $('.Stage,.Dancer').removeAttr('style').hide();
                    WorkflowPlayStack.NextFrameIndex = 0;
                    WorkflowPlayStack.PlayFlag = WorkflowPlaySettings.PlayFlag.End;
                    return;
                }
                if (typeof (WorkflowPlayStack.CurrentFrame) == 'undefined' || WorkflowPlayStack.CurrentFrame) {
                    if (WorkflowPlayStack.NextFrameIndex != 0) {
                        $(WorkflowPlayStack.CurrentActions).each(function () {
                            this.SaveStage();
                        });
                    }
                    //当前时刻的动作集合
                    WorkflowPlayStack.CurrentActions = [];

                    //单个动作依次播放
                    WorkflowPlayStack.CurrentActions.push(WorkflowPlayStack.AllActions[WorkflowPlayStack.NextFrameIndex]);
                    WorkflowPlayStack.NextFrameIndex++;

                    $(WorkflowPlayStack.CurrentActions).each(function (index) {
                        if (index == 0)
                            WorkflowPlayStack.Controler = this;
                        this.Play();
                    });
                }
            }
        }

        //开始表演
        WorkflowPlaySettings.StartPlay = function () {
            $('.ActivityWorking').removeClass('ActivityBreathe');
            $('.Stage,.Dancer').show();

            WorkflowPlayStack.PlayFlag = WorkflowPlaySettings.PlayFlag.Playing;
            WorkflowPlaySettings.PlayNextFrame();
        }
        //暂停
        WorkflowPlaySettings.PausePlay = function () {
            WorkflowPlayStack.PlayFlag = WorkflowPlaySettings.PlayFlag.Pause;
        }
        //结束播放
        WorkflowPlaySettings.EndPlay = function () {
            WorkflowPlayStack.PlayFlag = WorkflowPlaySettings.PlayFlag.End;
            WorkflowPlayStack.NextFrameIndex = 0;
            $('.Stage,.Dancer').removeAttr('style').hide();
        }
    },

    Play: function () {
        if (typeof (WorkflowInstance) != 'undefined' && WorkflowInstance) {
            //加载舞台
            if (!WorkflowDocument.StartPlay)
                WorkflowDocument.InitStage();

            WorkflowPlaySettings.StartPlay();
        }
        // event.preventDefault();
        event.stopPropagation();
    }
};



// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/workflowDocument.js

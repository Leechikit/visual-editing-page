export const WorkflowPlaySettings = {
    StartPlay: undefined,
    PausePlay: undefined,
    EndPlay: undefined,
    PlayNextFrame: undefined,
    //播放标识
    PlayFlag: {
        //播放中
        Playing: 1,
        //暂停
        Pause: 2,
        //结束
        End: 3
    },
    //动作类型
    ActionType: {
        //激活
        Active: 1,
        //完成
        Finish: 2,
        //取消
        Cancel: 3,
        //异常
        Exception: 4
    }
}

export const  WorkflowPlayStack = {
    //开始活动编码
    StartActivityCode: undefined,

    //所有动作
    AllActions: [],
    StageModel: undefined,
    DancerModel: undefined,

    //播放标识
    PlayFlag: undefined,
    //当前控制帧
    Controler: undefined,
    //当前表演帧
    CurrentFrame: undefined,
    //下一帧索引
    NextFrameIndex: 0,
    //当前正在播放的多个动作
    CurrentActions: undefined
}

export const PlayAction = function (_ActionTime, _ActivityCode, _ActionType, _TokenId) {
    //表演时间
    this.ActionTime = _ActionTime;
    //活动编码
    this.ActivityCode = _ActivityCode;
    //动作类型
    this.ActionType = _ActionType;
    //TokenId
    this.TokenId = _TokenId;
}
//播放
//_IsControler:判断是否在控制下一帧
PlayAction.prototype.Play = function () {
    var _Activity = workflow.getActivityByCode(this.ActivityCode);
    if (_Activity) {
        var _Dancer = $(_Activity.htmlObject).find(".Dancer");
        var _DancerStyles;
        switch (this.ActionType) {
            case WorkflowPlaySettings.ActionType.Active:
                //播放激活动作
                _Dancer.css("background-color", WorkflowColor.Working);
                _DancerStyles = { height: "100%" };
                break;
            case WorkflowPlaySettings.ActionType.Finish:
                //播放完成动作
                _Dancer.css("background-color", WorkflowColor.Finished);
                _DancerStyles = { height: "100%" };
                break;
            case WorkflowPlaySettings.ActionType.Cancel:
                _Dancer.css("background-color", WorkflowColor.Default);
                _DancerStyles = { height: "100%" };
                break;
            case WorkflowPlaySettings.ActionType.Exception:
                _Dancer.css("background-color", WorkflowColor.Exception);
                _DancerStyles = { height: "100%" };
                break;
        }
        if (_DancerStyles) {
            if (this == WorkflowPlayStack.Controler) {
                _Dancer.animate(_DancerStyles, undefined, undefined, function () {
                    //播放下一帧
                    WorkflowPlaySettings.PlayNextFrame();
                });
            }
            else {
                _Dancer.animate(_DancerStyles);
            }
        }
    }
}
//将舞者动作保存为舞台的状态,并初始化舞者
PlayAction.prototype.SaveStage = function () {
    var _Activity = workflow.getActivityByCode(this.ActivityCode);
    if (_Activity) {
        switch (this.ActionType) {
            case WorkflowPlaySettings.ActionType.Active:
                $(_Activity.htmlObject).find(".Stage").css("background-color", WorkflowColor.Working);
                break;
            case WorkflowPlaySettings.ActionType.Finish:
                $(_Activity.htmlObject).find(".Stage").css("background-color", WorkflowColor.Finished);
                break;
            case WorkflowPlaySettings.ActionType.Cancel:
                $(_Activity.htmlObject).find(".Stage").css("background-color", WorkflowColor.Default);
                break;
            case WorkflowPlaySettings.ActionType.Exception:
                $(_Activity.htmlObject).find(".Stage").css("background-color", WorkflowColor.Exception);
                break;
        }
        $(_Activity.htmlObject).find(".Dancer").removeAttr("style");
    }
}




// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/workflowPlay/index.js
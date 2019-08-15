import {ActivityStyleClassName} from './setting';

//调整大小堆栈
export const ActivityResizeStack = {
    Resizing: false,
    //当前调整的Activity
    CurrentActivity: void 0,
    //当前调整大小的控制点
    CurrentResizer: void 0,
    //调整的方向
    Direction: void 0,
    StartPoint: {
        x: 0,
        y: 0
    },
    PrePoint: {
        x: 0,
        y: 0
    },

    WorkspaceMinRight: 0,
    WorkspaceMinBottom: 0,

    WorkflowCurrentRight: 0,
    WorkflowCurrentBottom: 0,

    //源状态
    SourceStates: undefined
};

//拖拽设置
export const ActivityDragSettings = {
    //.拖动事件的命名空间
    EventNameSpace: '.ActivityDraggable',
    //停靠尺寸
    DockSize: 10
};

//拖拽堆栈
export const ActivityDragStack = {
    //拖动停靠计算线程
    ActivityDockCalculaterWorker: void 0,

    //是否在拖拽状态
    IsDragging: false,
    //拖拽中的活动集合
    DraggingActivities: void 0,
    //活动的拖拽HTML副本集合
    DraggingProxy: void 0,
    //拖拽开始时鼠标的位置（相对于流程图原点）
    DragStartPoint: {
        x: 0, y: 0
    },

    //上次计算时鼠标的位置（相对于流程图原点）
    PreDragPoint: {
        x: 0, y: 0
    },

    CreateDragProxy: function (_activity) {
        ActivityDragStack.DraggingActivities.push(_activity);
        ActivityDragStack.DraggingProxy.push($(_activity.htmlObject).clone()
            .removeClass(ActivityStyleClassName.ActivitySelectedFirst)
            .removeClass(ActivityStyleClassName.ActivitySelected)
            .addClass(ActivityStyleClassName.ActivityDragProxy)
            .hide()
            .appendTo($(_activity.htmlObject).parent()));

        ActivityDragStack.DraggingProxy[ActivityDragStack.DraggingProxy.length - 1].left = _activity.left;
        ActivityDragStack.DraggingProxy[ActivityDragStack.DraggingProxy.length - 1].top = _activity.top;
    }
};



// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/activity/activityDrag.js
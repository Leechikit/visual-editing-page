
export const ActivityStyleClassName = {
    //活动
    Activity: 'activity_instance',
    //活动的中心区域
    ActivityContent: 'activity_content',
    //活动的Logo
    ActivityLogo: 'activity_model_logo',
    //活动的标题
    ActivityLabel: 'activity_model_label',
    //活动选中的样式
    ActivitySelected: 'activity_selected',
    //第一个被选中的活动
    ActivitySelectedFirst: 'activity_selected_first',
    //活动拖拽时的样式
    ActivityDragProxy: 'activity_drag_proxy',
    //活动的调整大小控制点公共样式
    Resize: 'resize',
    //左
    // ResizeLeft: 'resize_left',
    // //右
    // ResizeRight: 'resize_right',
    // //上
    // ResizeUp: 'resize_up',
    // //下
    // ResizeDown: 'resize_down'
    //左上
    ResizeTopLeft: "resize_topleft",
    //右上
    ResizeTopRight: "resize_topright",
    //左下
    ResizeBottomLeft: "resize_bottomleft",
    //右下
    ResizeBottomRight: "resize_bottomright",

    //连接线辅助点
    AssistLine: 'assistline',
    //左
    AssistLineLeft: "assistline_left",
    //右
    AssistLineRight: "assistline_right",
    //上
    AssistLineUp: "assistline_up",
    //下
    AssistLineDown: "assistline_down"
};

//活动设置
export const ActivitySettings = {
    //HTML里保存Activity对象的Data属性
    ActivityDataProperty: 'activity',

    //最小宽
    MinOuterWidth: 122,
    //最小高
    MinOuterHeight: 42,

    //.调整大小的事件命名空间
    ResizeEventNameSpace: '.resizeable',
    //调整的边与目标活动相近时对齐
    ResizeDockSize: 8,

    //活动的事件的命名空间
    EventNameSpace: '.activity',

    //默认文字颜色
    DefaultFontColor: 'black',
    //默认文字大小
    DefaultFontSize: 13,

    //添加添动时，默认的距离
    DefaultActivityDistance: 150,

    //模板化的通用属性名称
    CommonProperties: ['FontSize', 'FontColor', 'Height', 'Width', 'Custom'],

    //模板化的属性名称
    ModelableProperties: [
        { ToolTipText: 'Start', Properties: [] },
        { ToolTipText: 'End', Properties: [] },
        {
            ToolTipText: 'FillSheet',
            Properties: [
                'ParticipateMethod', //多人参与方式:并行/串行
                //'DuplicatedParticipantPolicy',//与上一环节相同
                'NoParPolicy', //无参与者
                'FinishExit', //完成出口
                'ApproveExit', //同意出口 
                //允许的操作                            
                'PermittedActions',
                'BatchProcessing',
                'EmailNotification',
                'SMSApprove',
                'MobileProcessing',
                'SubmittingValidationType', //提交验证
                'LockLevel', //锁策略
                'LockPolicy', //表单锁
                'AllowedTime', //许可时间
                'OvertimePolicy', //超时策略
                'RequireGroup', //选择组
                'RequirePost', //选择岗位
                'WorkItemType', //任务类型
                'PlanUsedTime', //计划时间
                'Recurrence', //重复次数
                'sendMsgConfig' // 提醒通知配置
            ]
        },
        {
            ToolTipText: 'Approve',
            Properties: [
                'ParticipateMethod', //多人参与方式:并行/串行
                'DuplicatedParticipantPolicy', //与上一环节相同   
                'NoParPolicy', //无参与者
                'DisapproveExit', //否决出口
                'ApproveExit', //同意出口                            
                'DisapproveExitType', //否决出口节点类型选择
                'DisapproveExitActivityCode', //否决出口指定节点
                'SMSApprove', //是否允许短信审批

                //允许的操作                            
                'PermittedActions',
                'BatchProcessing',
                'EmailNotification',
                'SMSApprove',
                'MobileProcessing',

                'SubmittingValidationType', //提交验证                            
                'LockLevel',//锁策略                            
                'LockPolicy', //表单锁                            
                'AllowedTime', //许可时间                            
                'OvertimePolicy', //超时策略                            
                'RequireGroup', //选择组
                'RequirePost', //选择岗位
                'WorkItemType', //任务类型
                'PlanUsedTime', //计划时间
                'Recurrence',//重复次数
                'sendMsgConfig' // 提醒通知配置
            ]
        },
        {
            ToolTipText: 'Circulate',
            Properties: [
                'DuplicatedParticipantPolicy', //与上一环节相同
                'NoParPolicy', //无参与者
                //允许的操作                            
                'PermittedActions',
                'BatchProcessing', 'EmailNotification', 'SMSApprove', 'MobileProcessing',

                'AllowedTime', //许可时间
                'OvertimePolicy', //超时策略
                'RequireGroup', //选择组
                'RequirePost', //选择岗位
                'WorkItemType', //任务类型
                'PlanUsedTime', //计划时间
                'Recurrence'//重复次数
            ]
        },
        { ToolTipText: 'Connection', Properties: [] },
        {
            ToolTipText: 'Notify', Properties: [
                'NotifyType',//通知方式
                'NotifyWay',//同步异步
                'Block',//是否阻塞
                'PlanUsedTime',//计划时间
                'Recurrence'//重复次数
            ]
        },
        // {
        //     ToolTipText: 'Wait', Properties: [
        //     'IntervalByMinute',//检查等待条件的时间间隔
        //     'WaitCondition',//检查条件
        //     'PlanUsedTime',//计划时间
        //     'Recurrence'//重复次数
        //     ]
        // },
        // {
        //     ToolTipText: 'BizAction', Properties: [
        //         'IntervalByMinute',//检查等待条件的时间间隔
        //         'PlanUsedTime',//计划时间
        //         'Recurrence'//重复次数
        //     ]
        // },
        {
            ToolTipText: 'SubInstance',
            Properties: [
                'WorkflowVersion',
                'ParticipateType',
                'ParticipateMethod',
                'ApproveExit',
                'DisapproveExit',
                'Sync', //是否同步子流程
                'FinishStartActivity', //是否自动结束第一个活动
                'PlanUsedTime', //计划时间
                'Recurrence'//重复次数
            ]
        }
    ]
};

export const ActivityMovingStack = {
    //移动中的活动
    MovingActivities: [],

    //可拖动区域左边缘
    WorkflowContentEdgeLeft: 0,
    WorkflowContentEdgeTop: 0,

    //可拖动区域内侧最小右边缘
    WorkspaceContentMinInnerRight: 0,
    //可拖动区域内侧最小下边缘
    WorkspaceContentMinInnerBottom: 0,

    //当前边缘值
    CurrentRightRange: 0,
    CurrentBottomRange: 0,

    //左侧已停靠到流程图
    LeftDocked: false,
    //上侧已停靠到流程图
    TopDocked: false
};

//活动停靠
export const ActivityDockSettings = {
    //移动时活动停靠距离
    MoveDockSize: 20,
    //调整大小时边的停靠距离
    ResizeDockSize: 10,
    //开始停靠前的悬停时间
    DockTime: 200
};

//停靠时计算栈
export const ActivityDockStack = {
    //Token: 0,
    //DockTime: undefined,

    //对齐的方向和对齐的目标活动
    x: Number.POSITIVE_INFINITY,
    OffsetLeftDockActivities: [],
    OffsetLeftDockLineStyle: void 0,
    CenterDockActivities: [],
    CenterDockLineStyle: void 0,
    RightDockActivities: [],
    RightDockLineStyle: void 0,

    y: Number.POSITIVE_INFINITY,
    TopDockActivities: [],
    TopDockLineStyle: void 0,
    MiddleDockActivities: [],
    MiddleDockLineStyle: void 0,
    BottomDockActivities: [],
    BottomDockLineStyle: void 0
};

export const ActivityResizeDirection = {
    //未指定
    Unspecified: undefined,
    //左上
    UpperLeft: 0,
    //右上
    UpperRight: 1,
    //左下
    DownLeft: 2,
    //右下
    DownRight: 3,
};

//活动模板
export const ActivityModelSettings = {
    //活动模板定义的Xml
    ActivityModels: [],
    //活动模板DOM保存活动模板JS对象的属性名
    ActivityDataProperty: 'ActivityModel',

    //.���动事件的命名空间
    EventNameSpace: '.ActivityModelDraggable',

    GetActivityModelByType: function (_ActivityType) {
        if (ActivityModelSettings.ActivityModels) {
            return $(ActivityModelSettings.ActivityModels).filter(function () {
                return this.ActivityType === _ActivityType;
            })[0];
        }
    },

    GetActivityModelByTypeName: function (_ToolTipText) {
        if (ActivityModelSettings.ActivityModels) {
            return $(ActivityModelSettings.ActivityModels).filter(function () {
                return this.ToolTipText === _ToolTipText;
            })[0];
        }
    }
};

//活动模板的样式名称
export const ActivityModelStyleClassName = {
    //活动模板放置的容器
    ActivityModelContainer: 'model_container',

    //活动模板
    ActivityModel: 'activity_model',
    //活动模板拖动样式
    ActivityModelDragProxy: 'activity_model_proxy',
    //Logo所在的Div
    ActivityModelLogoDiv: 'activity_model_logo',
    ////Logo图片
    //ActivityModelLogo: 'activity_model_img',
    //Label
    ActivityModelLabel: 'activity_model_label',

    //图标字体内容
    LogoFontContent: {
        'Start': 'D007',
        'End': 'D006',
        'FillSheet': 'D010',
        'Approve': 'D00D',
        'Circulate': 'D000',
        // 'Notify': 'e75c',
        // 'Connection': 'e7cd',
        // 'Wait': 'e68f',
        // 'BizAction': 'e6d7',
        'SubInstance': 'D00A'
    }
};

//活动模板拖拽设置
export const ActivityModelDragSettings = {
    //拖入时是否检测并停靠到活动
    Dockable: false
};

//活动模板拖拽栈
export const ActivityModelDragStack = {
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
};




// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/activity/setting.js
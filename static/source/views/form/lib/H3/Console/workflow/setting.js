/**
 * 流程设计器DOM集合
 */
export const DomCollection={
    Workspace: 'div.workspace',
    PropertyContainer: '#divPropertyContainer',
    ThumbnailContainer: '.div-thumbnail',
    Group_WorkflowBasic: "td[group='WorkflowBasic']",
    ActivityModel: '.activity-template-node[data-type]'
};

/**
 * 流程设计器操作集合
 */
export const ActionCollection={
    ActonName_Init: 'Init',
    ActonName_GetWorkflowClause: 'GetWorkflowClause',
    ActonName_GetLocalString: 'GetLocalString',
    ActonName_SaveWorkflow: 'SaveWorkflow',
    ActonName_UpdateClauseName: 'UpdateClauseName',
    ActonName_ValidateWorkflow: 'ValidateWorkflow',
    ActonName_PublishWorkflow: 'PublishWorkflow',
    ActonName_PublishAll: 'PublishAll',
    ActonName_GetWorkflow: 'GetWorkflow',
    ActonName_ExportWorkflow: 'ExportWorkflow',
    ActonName_GetDataItemsByWorkflowCode: 'GetDataItemsByWorkflowCode',
    ActonName_GetDataItems: 'GetDataItems',
    ActonName_GetParticipants: 'GetParticipants'
};

export const WorkflowSettings = {
    //最小宽度
    MinInnerWidth: 800,
    //最小高度
    MinInnerHeight: 600,
    //方向键单次按下时移动的距离
    KeyMoveInterval: 4,

    //.事件命名空间
    EventNameSpace: '.workflow',
    //.复选事件命名空间
    MultiSelectEventNameSpace: '.multiSelect',

    //设置样式的关键字:注意以下必须是字符串,因为有些要在CSS样式表中直接使用
    SameStyle: {
        Width: 'width',
        Height: 'height',
        Left: 'left',
        Center: 'center',
        Right: 'right',
        Top: 'top',
        Middle: 'middle',
        Bottom: 'bottom',
        Size: 'size',
        //竖排等间距
        VerticalDistance: 'vertical-distance',
        //横排等间距
        HorizontalDistance: 'horizontal-distance'
    }
};

//流程元素类型:注意以下必须是字符串,因为Property.js里使用字符串来读取属性列表
export const WorkflowElementType =
{
    //流程图
    Workflow: 'Workflow',
    //活动
    Activity: 'Activity',
    //线条
    Line: 'Line'
};

//流程图的样式名称
export const WorkflowStyleClassName = {
    //流程图对象，活动、线条都在此区域内
    WorkSpace: 'workspace',
    //活动可移动区域
    WorkSpaceContent: 'workspace_content',

    //活动四周浮出的点击可添加活动的箭头
    WorkflowAotuArrow: 'arrow',
    //左
    WorkflowAotuArrowLeft: 'arrow_left',
    //上
    WorkflowAotuArrowUp: 'arrow_up',
    //右
    WorkflowAotuArrowRight: 'arrow_right',
    //下
    WorkflowAotuArrowDown: 'arrow_down',

    //活动移动时停靠
    ActivityDockLine: 'dock_line',
    //水平线
    ActivityDockLineHorizontal: 'dock_line_horizontal',
    //竖直线
    ActivityDockLineVertical: 'dock_line_vertical',
    //左
    ActivityDockLineOffsetLeft: 'dock_line_left',
    //中
    ActivityDockLineCenter: 'dock_line_center',
    //右
    ActivityDockLineRight: 'dock_line_right',
    //上
    ActivityDockLineTop: 'dock_line_top',
    //中
    ActivityDockLineMiddle: 'dock_line_middle',
    //下
    ActivityDockLineBottom: 'dock_line_bottom',

    //点击空白处拖动选中框
    MultiSelectBox: 'multiSelectBox',

    //格式设置按钮
    SameStyleDiv: 'styleControlDiv'
};

//流程图拖动复选活动栈
export const WorkflowMultiSelectStack = {
    ActivitiesInRange: [],
    StartPoint: {
        x: 0,
        y: 0
    }
};

//流程图鼠标移动堆栈
export const WorkflowMouseMoveStack = {
    //聚焦的活动
    FocusActivity: undefined,
    //计时器
    TimeOuterHander: undefined
};

//流程图组合操作类型
export const WorkflowMultiActionType = {
    None: undefined,
    //活动模板拖拽
    ModelDrag: 1,
    //活动响应方向键移动
    ActivityKeyMove: 2,
    //活动拖动
    ActivityDragMove: 3,
    //活动调整
    ActivityResize: 4,
    //线条绘制
    LineDraw: 5,
    //线条调整
    LineHandle: 6,
    //拖动多选
    DragMultiSelect: 7,
    //线条移动
    LineLabelMoving: 8
};

//流程图事件栈
export const WorkflowEventStack = {
    //键是否按下的状态
    IsKeyDown: false,
    //鼠标是否按下的状态
    CurrentMultiAction: WorkflowMultiActionType.None,
    //事件中的对象
    Objects: [],
    //源状态
    SourceStates: []
};

export const WorkflowDocumentStyleClassName = {
    //处理结果
    DealResult: 'workflow_result',
    //遮罩层
    RevealDiv: 'reveal',
    //导入文件DIV
    ImportDiv: 'import_div',
    //取消按钮
    CancelButton: 'button_cancel'
};

export const WorkflowColor = {
    Default: 'white',
    Finished: ' #E2E7EA',
    Working: '#37ABFD',
    Exception: '#FABB0C'
};

export const WorkflowDocumentSettings = {
    //流程模板AJAX的URL
    WorklfowHandlerAjaxUrl: '/Ajax/WorkflowHandler.ashx',

    //锁定流程图的事件命名空间
    LockEventNamespace: '.lock'
};

/**
 * 流程设计器模式
 */
export const WorkflowMode = {
    Designer: 1,
    ViewWithProperty: 2,
    ViewOnly: 3,
    MobileView: 4
};

/**
 * 流程实例状态
 */
export const InstanceState = {
    Running: 2,
    Finished: 4,
    Canceled: 5
};

//令牌状态
//ERROR:这个应等同于后台TokenState枚举类,可以从后台输出
export const TokenState = {
    //运行中
    Running: 0,
    //完成
    Finished: 1,
    //废弃
    Dropped: 2
};

/**
 * 工作项状态
 */
export const WorkItemState = {
    //等待
    Waiting: 0,
    //进行中
    Working: 1,
    //完成
    Finished: 2,
    //取消
    Canceled: 3
};

/**
 * 流程模板堆栈
 */
export const WorkflowDocumentStack = {
    //对应后台流程模板对象
    Workflow: undefined,
    //结果展示DIV
    ResultDiv: undefined,
    //遮罩层DIV
    RevealDiv: undefined,
    //兼容说明文件是否已加载
    CompatibleTypeLoaded: false,
    //取消导入按钮
    CancelImportButton: undefined,
    //导入文件框
    ImportDiv: undefined,

    //已锁定
    IsLocked: false,

    //显示加载中... 的div
    LoadingDiv: undefined
};



// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/setting.js
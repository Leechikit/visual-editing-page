import fetch from '../config/fetch';
/**
 * 登录
 */
export const login = (mobile, engineCode, clusterTokenId) => {
  let paramData = {
    mobile: mobile,
    engineCode: engineCode,
    clusterTokenId: clusterTokenId
  };
  return fetch('/login/LoginByMobile', paramData);
};

export const loginByDingtalkAccount = (dingtalkAccount, engineCode, clusterTokenId) => {
  let paramData = {
    dingtalkAccount: dingtalkAccount,
    engineCode: engineCode,
    clusterTokenId: clusterTokenId
  };
  return fetch('/login', paramData);
};

/*
****
后台管理首页数据请求开始
****
*/

// 获取用户的信息，包括引擎集合
export const GetUserInfo = (ActionName) => {
  let paramData = {
    ActionName: 'GetUserInfo'
  };
  return fetch('/Console/App/OnAction', {
    PostData: JSON.stringify(paramData)
  });
};

// 请求后台首页app应用数据
export const backIndexAppData = (ActionName) => {
  let paramData = {
    ActionName: ActionName
  };
  return fetch('/Console/App/OnAction', {
    PostData: JSON.stringify(paramData)
  });
};

// 删除app应用数据
export const delAppData = (ActionName, AppCode, CheckName) => {
  let paramData = {
    ActionName: ActionName,
    AppCode: AppCode,
    CheckName: CheckName
  };
  return fetch('/Console/App/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 删除解决方案
export const RemoveSolution = (ActionName, AppCode) => {
  let paramData = {
    ActionName: ActionName,
    AppCode: AppCode
  };
  return fetch('/Console/App/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 新建应用app数据
export const addAppData = (ActionName, DisplayName, Icon, AppCode) => {
  let paramData = {
    ActionName: ActionName,
    DisplayName: DisplayName,
    Icon: Icon,
    AppCode: AppCode
  };
  return fetch('/Console/App/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 编辑应用app数据
export const editAppData = (ActionName, DisplayName, Icon, AppCode) => {
  let paramData = {
    ActionName: ActionName,
    DisplayName: DisplayName,
    Icon: Icon,
    AppCode: AppCode
  };
  return fetch('/Console/App/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 获取配置移动端首页的报表数据
export const configMobileIndexData = (ActionName, ParentCode) => {
  let paramData = {
    ActionName: ActionName,
    ParentCode: ParentCode
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  });
};

// 点击确定之后，配置移动端首页数据
export const postMobileData = (ActionName, NodeId, DefaultFrequentMenus, ReportPageAndReportWidgetIds, MobileSortType) => {
  let paramData = {
    ActionName: ActionName,
    NodeId: NodeId,
    DefaultFrequentMenus: DefaultFrequentMenus,
    ReportPageAndReportWidgetIds: ReportPageAndReportWidgetIds,
    MobileSortType: MobileSortType
  }
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// app应用模块拖拽排序
export const sortAppData = (ActionName, SortNodes) => {
  let paramData = {
    ActionName: ActionName,
    SortNodes: SortNodes
  };
  return fetch('/Console/App/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

//发布应用到钉钉
export const createSmartApp =(ActionName, Image, AppCode, SheetCode, AppRankType) => {
  let paramData={
    ActionName: ActionName,
    Image: Image,
    AppCode: AppCode,
    SheetCode: SheetCode,
    AppRankType: AppRankType
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
}

//定向发布应用
export const pulishAppToEngine = (AppCode, TargetEngineCode, LeavingMessage) => {
  let paramData = {
    ActionName: "PublicAppToEngine",
    AppCode: AppCode,
    TargetEngineCode: TargetEngineCode,
    LeavingMessage: LeavingMessage
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
}

//获取应用信息
export const getPublishedAppInfo = (Code, Type) => {
  let paramData = {
    ActionName: "GetPublishedAppInfo",
    Code: Code,
    Type: Type
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
}

//发布到应用市场   
export const publishAppOrWorkFlowToMarket = (Code, Category, Description, UpgradLog) => {
  let paramData = {
    ActionName: "PublishAppOrWorkFlowToMarketNew",
    Code: Code,
    Category: Category,
    Description: Description,
    UpgradLog: UpgradLog
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
}
/*
****
 后台管理首页数据请求结束
****
*/
/*
****
系统集成接口请求开始
****
*/
// secret信息获取
export const getCompanyDevelopmentInfo = (ActionName) => {
  let paramData = {
    ActionName: 'GetCompanyDevelopmentInfo'
  };
  return fetch('/Console/Systemintergration/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 重置secret信息
export const GenerateDevelopmentSecret = (ActionName) => {
  let paramData = {
    ActionName: 'GenerateDevelopmentSecret'
  };
  return fetch('/Console/Systemintergration/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 初次进入系统集成页面时，判断是否连接成功
export const checkConnect = (ActionName) => {
  let paramData = {
    ActionName: ActionName
  }
  return fetch('/Console/Systemintergration/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 系统集成参数配置
export const configSystemParam = (ActionName, Url, LoginName, PassWord, Domain) => {
  let paramData = {
    ActionName: ActionName,
    Url: Url,
    LoginName: LoginName,
    PassWord: PassWord,
    Domain: Domain
  }
  return fetch('/Console/Systemintergration/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 测试系统集成接口是否正确
export const testInterface = (ActionName) => {
  let paramData = {
    ActionName: ActionName
  }
  return fetch('/Console/Systemintergration/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};
/*
****
系统集成接口请求结束
****
*/

/*
****
组织机构接口请求开始
****
*/
// 获取viewBag里面数据
export const LoadOrgInfo = () => {
  let paramData = {
    ActionName: 'LoadOrgInfo'
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 获取组织机构左侧树状结构数据
export const getChildNodes = (ActionName, UnitId) => {
  let paramData = {
    ActionName: ActionName,
    UnitId: UnitId
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 获取对应组织机构下的人员信息数据
export const AjaxUsers = (ActionName, id, start, length, KeyWord) => {
  let paramData = {
    ActionName: ActionName,
    start: start,
    length: length,
    id: id,
    KeyWord: KeyWord
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
}

// 从钉钉同步组织机构
export const SyncOrg = (ActionName) => {
  let paramData = {
    ActionName: 'SyncOrg'
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 更新钉钉组织机构
export const UpdateDingTalkSetting = (ActionName, cropId, secret) => {
  let paramData = {
    ActionName: ActionName,
    cropId: cropId,
    secret: secret
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 选择任务所有者
export const LoadSchemaCodes = (ActionName, SourceId, TargetId) => {
  let paramData = {
    ActionName: ActionName,
    SourceId: SourceId,
    TargetId: TargetId
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 任务交接
export const ForwardWorkItemsByCode = (ActionName, SourceUserID, TargetUserID, AppCodes, AllWorkitem) => {
  let paramData = {
    ActionName: ActionName,
    SourceUserID: SourceUserID,
    TargetUserID: TargetUserID,
    AppCodes: AppCodes,
    AllWorkitem: AllWorkitem
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 弹出部门经理面板时，渲染之前的部门经理
export const GetManager = (ActionName, UnitId) => {
  let paramData = {
    ActionName: ActionName,
    UnitId: UnitId
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 设置部门经理
export const SetManager = (ActionName, UserId, UnitId) => {
  let paramData = {
    ActionName: ActionName,
    UserId: UserId,
    UnitId: UnitId
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 调整部门
export const UpdateUserUnit = (ActionName, UserId, UnitId) => {
  let paramData = {
    ActionName: ActionName,
    UserId: UserId,
    UnitId: UnitId
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 获取角色
export const GetRoles = (ActionName, UserId) => {
  let paramData = {
    ActionName: ActionName,
    UserId: UserId
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 用户角色授权
export const UpdateUserRoles = (ActionName, UserId, UserRoles) => {
  let paramData = {
    ActionName: ActionName,
    UserId: UserId,
    UserRoles: UserRoles
  };
  return fetch('/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 搜索用户
export const SearchUsers = (start, length, KeyWord) => {
  let paramData = {
    ActionName: 'SearchUsers',
    start: start,
    length: length,
    KeyWord: KeyWord
  };
  return fetch('/Console/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

/**
 * 搜索部门
 * @param {*} keyword 
 */
export const FilterOrgs = (start, length, keyword) => {
  let paramData = {
    ActionName: 'SearchOrgs',
    start: start,
    length: length,
    KeyWord: keyword
  };
  return fetch('/Console/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
}

/*
****
组织机构接口请求结束
****
*/

/**
 ****
 权限管理接口请求开始
 ****
**/
// 权限管理初始化数据接口
export const GetInitData = (ActionName) => {
  let paramData = {
    ActionName: ActionName
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 获取所有角色
export const GetAllRoles = ( KeyWord) => {
  let paramData = {
    ActionName: 'GetAllRoles',
    KeyWord: KeyWord
  };
  return fetch('/Console/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 新建角色
export const CreateRole = (ActionName, RoleName, SortKey) => {
  let paramData = {
    ActionName: ActionName,
    RoleName: RoleName,
    SortKey: SortKey
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 复制角色
export const CopyRole = (ActionName, RoleName, SortKey, RoleId) => {
  let paramData = {
    ActionName: ActionName,
    RoleName: RoleName,
    SortKey: SortKey,
    RoleId: RoleId
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 修改角色名称
export const UpdateRoleName = (ActionName, RoleName, RoleId) => {
  let paramData = {
    ActionName: ActionName,
    RoleName: RoleName,
    RoleId: RoleId
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 删除角色
export const RemoveRole = (ActionName, RoleId) => {
  let paramData = {
    ActionName: ActionName,
    RoleId: RoleId
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 获取角色下app应用树
export const GetAppPagesAndAcl = (ActionName, RoleId) => {
  let paramData = {
    ActionName: ActionName,
    RoleId: RoleId
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 获取应用app下子集权限
export const GetAppPackageChildrenAcl = (ActionName, RoleId, AppCode) => {
  let paramData = {
    ActionName: ActionName,
    RoleId: RoleId,
    AppCode: AppCode
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 获取表单，列表下的权限状态
export const GetNodeSheetAndListViewActions = (ActionName, RoleId, Code) => {
  let paramData = {
    ActionName: ActionName,
    RoleId: RoleId,
    Code: Code
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 获取角色用户接口
export const GetRoleUsers = (ActionName, id, start, length, KeyWord) => {
  let paramData = {
    ActionName: ActionName,
    id: id,
    start: start,
    length: length,
    KeyWord: KeyWord
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 获取服务部门接口
export const GetPostUnits = (ActionName, UserId, RoleId) => {
  let paramData = {
    ActionName: ActionName,
    UserId: UserId,
    RoleId: RoleId
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 设置服务部门接口
export const SetPostUnits = (ActionName, PostID, UnitsId) => {
  let paramData = {
    ActionName: ActionName,
    PostID: PostID,
    UnitsId: UnitsId
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 删除角色用户
export const RemoveRoleUser = (ActionName, RoleId, UserId) => {
  let paramData = {
    ActionName: ActionName,
    RoleId: RoleId,
    UserId: UserId
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 获取角色下的成员
export const GetRoleNameAndUsers = (ActionName, RoleId) => {
  let paramData = {
    ActionName: ActionName,
    RoleId: RoleId
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 添加角色成员之后，更新数据
export const UpdateRoleUsers = (ActionName, UserIds, RoleId) => {
  let paramData = {
    ActionName: ActionName,
    UserIds: UserIds,
    RoleId: RoleId
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 保存角色权限设置
export const SaveAclNode = (ActionName, RoleId, AclNode, Code) => {
  let paramData = {
    ActionName: ActionName,
    RoleId: RoleId,
    AclNode: JSON.stringify(AclNode),
    Code: Code
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 搜索角色用户
export const SearchRoleUsers = (ActionName, id, start, length, KeyWord) => {
  let paramData = {
    ActionName: ActionName,
    start: start,
    length: length,
    id: id,
    KeyWord: KeyWord
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// 角色拖拽排序
export const UpdateSortRoles = (ActionName, SortRoles) => {
  let paramData = {
    ActionName: ActionName,
    SortRoles: JSON.stringify(SortRoles)
  };
  return fetch('/Role/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

/**
 ****
 权限管理接口请求结束
 ****
**/

//搜索组织
export const SearchOrgs = (KeyWord, start, end) => {
  let paramData = {
    ActionName: "SheetUserAction",
    Command: "SearchOrg",
    SearchKey: KeyWord,
    OrgUnitVisible: true,
    UserVisible: false,
    ShowUnActive: "",
    FromNum: start,
    ToNum: end
  };
  return fetch('/Form/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};
/*
****
组织机构接口请求结束
****
*/

//表单列表
export const getSheetLists = (ActionName, AppCode) => {
  let paramData = {
    ActionName: ActionName,
    AppCode: AppCode
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};
//新建分组
// PostData:{'ActionName':'AddGroup','DisplayName':'33','ParentCode':'D00018D123','AppCode':'D00018D123','IsAppSetting':false}
export const AddGroup = (DisplayName, ParentCode, AppCode) => {
  let paramData = {
    ActionName: 'AddGroup',
    DisplayName: DisplayName,
    ParentCode: ParentCode,
    AppCode: AppCode,
    IsAppSetting: false
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};
//新建表单
// PostData:{'ParentCode':'D00018D123','DisplayName':'af2','Icon':'icon-cgfk',
// 'NodeType':200,'IsBindBizService':false,'visible':true,'MobileVisible':true,
// 'AppCode':'D00018D123','IsAppSetting':false,'OpenType':'1','Code':'fadsf112','ActionName':'AddAppMenu'}
export const addSheet = (ParentCode, DisplayName, Icon, AppCode, Code, NodeType) => {
  let paramData = {
    ParentCode: ParentCode,
    DisplayName: DisplayName,
    Icon: Icon,
    IsBindBizService: false,
    visible: true,
    MobileVisible: true,
    AppCode: AppCode,
    IsAppSetting: false,
    OpenType: "1",
    Code: Code,
    ActionName: 'AddAppMenu',
    NodeType:NodeType
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

//删除表
export const deleteSheet = (Code) => {
  let paramData = {
    ActionName: 'RemoveAppMenu',
    Code: Code
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

// export const getEngineCode = (Code) => {
//   let paramData = {
//     ActionName: 'LoadView',
//     id: Code
//   };
//   return fetch('/SheetDesigner/OnAction', {
//     PostData: JSON.stringify(paramData)
//   }, 'POST');
// };

export const loadFieldAcl = (schemaCode) => {
  let params = {
    ActionName: "Load",
    SchemaCode: schemaCode
  };

  return fetch('/ViewDesigner/OnAction', {
    PostData: JSON.stringify(params)
  }, 'POST');
};

export const saveFieldAcl = (schemaCode, draftFields, effectiveFields) => {
  let params = {
    ActionName: "Save",
    SchemaCode: schemaCode,
    DraftFieldStates: JSON.stringify(draftFields),
    EffectiveFieldStates: JSON.stringify(effectiveFields)
  }

  return fetch('/ViewDesigner/OnAction', {
    PostData: JSON.stringify(params)
  }, 'POST');
};

//删除分组
export const removeGroup = (Code) => {
  let paramData = {
    ActionName: 'RemoveGroup',
    Code: Code
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

//修改表单
export const modifySheetOrReport = (MenuCode, ParentCode, DisplayName, Icon, AppCode,NodeType) => {
  let paramData = {
    MenuCode: MenuCode,
    ParentCode: ParentCode,
    DisplayName: DisplayName,
    Icon: Icon,
    NodeType: NodeType,
    IsBindBizService: false,
    visible: true,
    MobileVisible: true,
    AppCode: AppCode,
    IsAppSetting: false,
    OpenType: '1',
    ActionName: 'UpdateAppMenu'
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

//修改分组
export const UpdateGroup = (DisplayName, Code, ParentCode, AppCode) => {
  let paramData = {
    ActionName: 'UpdateGroup',
    DisplayName: DisplayName,
    Code: Code,
    ParentCode: ParentCode,
    AppCode: AppCode,
    IsAppSetting: false
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

/**
 * 列表设计器请求初始化数据
 */
export const LoadListView = (paramData, type) => {
  return fetch('/ListViewDesigner/OnAction', {
    PostData: JSON.stringify(paramData)
  }, type);
};

//列表设计器切换设计器暂存数据
export const Save = (ListViewSetting) => {
  let paramData = {
    ActionName: 'Save',
    ListViewSetting: JSON.stringify(ListViewSetting)
  };
  return fetch('/ListViewDesigner/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

//公式编辑器请求数据
export const getFormulaOnAction = (paramData) => {
  return fetch('/Console/Formula/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

export const getAppTreeOnAction = (paramData) => {
  return fetch('/Console/AppTree/OnAction', paramData, 'POST');
};

export const getAppTreeReportingOnAction = (paramData) => {
  var params = {
    PostData: JSON.stringify(paramData)
  };
  return fetch('/Console/Reporting/OnAction', params, 'POST');
};

/**
 * 获取流程信息
 * @param {*} paramData 
 */
export const getMenuInfo = (workflowCode) => {
  var params = {
    PostData: JSON.stringify({
      ActionName: 'GetMenuInfo',
      WorkflowCode: workflowCode
    })
  };
  return fetch('/Console/WorkflowDesigner/OnAction', params, "POST")
};

/**
 * 获取流程信息
 * @param {*} paramData 
 */
export const startWorkflow = (schemaCode) => {
  var params = {
    PostData: JSON.stringify({
      ActionName: 'StartWorkflow',
      SchemaCode: schemaCode
    })
  };
  return fetch('/Console/WorkflowDesigner/OnAction', params, "POST")
};

/**
 * 获取流程信息
 * @param {*} paramData 
 */
export const closeWorkflow = (schemaCode) => {
  var params = {
    PostData: JSON.stringify({
      ActionName: 'CloseWorkflow',
      SchemaCode: schemaCode
    })
  };
  return fetch('/Console/WorkflowDesigner/OnAction', params, 'POST');
};

//业务规则请求数据
export const getFormulaEventHandlerOnAction = (schemaCode) => {
  var params = {
    PostData: JSON.stringify({
      ActionName: 'LoadFormulaEventHandlers',
      SchemaCode: schemaCode
    })
  };
  return fetch('/Console/FormulaEventHandler/OnAction', params, 'POST');
};

/**
 * 请求表单提交校验规则
 */
export const getLoadSubmitRule = (schemaCode) => {
  var params = {
    PostData: JSON.stringify({
      ActionName: 'LoadSubmitRule',
      SchemaCode: schemaCode
    })
  };
  return fetch('/Console/FormulaEventHandler/OnAction', params, 'POST');
};

/**
 * 新建表单拖拽保存
 */
export const UpdateAppMenuSort = (code, appcode) => {
  let paramData = {
    ActionName: 'UpdateAppMenuSort',
    SortNodes: code,
    AppCode: appcode
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

//开启关闭外链
export const switchExternalForm = (schemaCode, enableExternal) => {
  let paramData = {
    ActionName: 'SwitchExternalForm',
    schemaCode: schemaCode,
    enableExternal: enableExternal
  };
  return fetch('/Console/SheetDesigner/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
}

/**
 * 获取部门下的用户
 * @param {*} departmentId 
 */
export const GetDepartmentUsers = (departmentId,pageSize) => {
  let paramData = {
    ActionName: 'AjaxUsers',
    id: departmentId,
    start: 0,
    length: pageSize
  };
  return fetch('/Console/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};
/**
 * 获取子部门信息
 * @param {*} departmentId 
 */
export const GetChildDepartment = (departmentId) => {
  let paramData = {
    ActionName: 'GetChildNodes',
    UnitId: departmentId
  };
  return fetch('/Console/ConsoleOrganization/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

/**
 * 获取参与者设置所需信息
 */
export const LoadParticipantInfos = (schemaCode) => {
  let paramData = {
    ActionName: 'LoadParticipantInfos',
    SchemaCode: schemaCode
  };
  return fetch('/Console/Formula/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

export const validateFormula = (schemaCode, formula, formulaType, formulaField) => {
  var params = {
    ActionName: "Validate",
    SchemaCode: schemaCode,
    Formula: formula,
    FormulaType: formulaType,
    DataField: formulaField
  };

  return fetch('/Console/Formula/OnAction', {
    PostData: JSON.stringify(params)
  }, 'POST');
};

/**
 * 根据unitid获取显示名称
 * @param {*} schemaCode 
 * @param {*} formula 
 * @param {*} formulaType 
 * @param {*} formulaField 
 */
export const LoadNamesByUnitIds = (unitIds) => {
  var params = {
    ActionName: "LoadNamesByUnitIds",
    UnitIds: unitIds,
  };
  
  return fetch('/Console/Formula/OnAction', {
    PostData: JSON.stringify(params)
  }, 'POST');
};

export const getAppTreeSettings = (schemaCode, formulaType, formulaParam, formulaField) => {
  var params = {
    ActionName: "InitAppTree",
    SchemaCode: schemaCode,
    FormulaType: formulaType,
    FormulaParameter: formulaParam || "",
    FormulaField: formulaField || ""
  };

  return fetch('/Console/Formula/OnAction', {
    PostData: JSON.stringify(params)
  }, 'POST');
};

export const loadAppTreeNodes = (settings) => {
  var params = {
    id: '',
    Code: '',
    NodeType: '',
    Command: 'LoadAppTreeNodes',
    ShowUnitSelectionRange: false,//只加载组织机构，用于选人控件设置选人范围
    ShowSystem: false,  //是否显示系统字段
    ShowSystemEN: false,//是否显示系统字段中英文
    ShowSubSheet: true, //是否显示子表
    ShowAssociation: false, //是否显示关联查询对象
    ShowField: false, //是否显示字段
    ShowOrganization: false, //是否显示组织机构
    ShowPost: false, //是否显示角色
    ShowRules: false,//是否显示规则
    ShowFunction: false, //是否显示函数公式  
    ShowConst: false,  //是否显示常量
    ShowBizProperties: false,//是否显示业务属性字段
    ShowSubSheetField: false,//是否显示子表字段
    ShowAssociationField: false,//是否显示关联对象字段
    ShowOnlyParticipant: false, //是否只显示参与者类型字段
    ShowSheetAssociation: false,//是否显示当前表单的关联对象,
    ShowWorkflow: false, //是否显示流程,
    ShowWorkflowSystemField: false,//是否显示流程系统字段
    CurSheetCode: '',
    ShowCheckBox: false,
    CanCheckTypes: [],
    ExcludeCodes: [],
    ExcludeFields: [],
    FormulaType: ''
  };

  for (var prop in settings) {
    if (params.hasOwnProperty(prop)) {
      params[prop] = settings[prop];
    }
  }

  return fetch('/Console/AppTree/OnAction', params, 'POST');
};

// //获取表单开发者自定义编码
// export const LoadCustomCode = (sheetCode) => {
//   var params = {
//     ActionName: "LoadCustomCode",
//     SchemaCode: sheetCode,
//   };
  
//   return fetch('/Console/SheetDesigner/OnAction', {
//     PostData: JSON.stringify(params)
//   }, 'POST');
// };

/**
 * 获取流程编码对应的数据项
 * @param {*} workflowCode 
 */
export const GetDataItemsByWorkflowCode= (workflowCode)=>{
  var params = {
    ActionName: "GetDataItemsByWorkflowCode",
    WorkflowCode: workflowCode,
  };
  
  return fetch('/Console/WorkflowDesigner/OnAction', {
    PostData: JSON.stringify(params)
  }, 'POST');
}
//新建报表
export const AddAppReport = (ParentCode, DisplayName, Icon, AppCode, Code) => {
  let paramData = {
    ParentCode:ParentCode,
    DisplayName:DisplayName,
    visible:true,
    MobileVisible:true,
    IsAppSetting:false,
    Icon:Icon,
    Code:Code,
    ActionName:"AddAppReport",
    AppCode:AppCode,
    NodeType:220
  };
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};
//新建流程表单
export const AddWorkflowPackage = (ParentCode,DisplayName, Icon, AppCode, Code) => {
  let paramData = {
    ParentCode:ParentCode,
    DisplayName:DisplayName,
    NodeType:200,
    IsBindBizService:false,
    visible:true,
    MobileVisible:true,
    Icon:Icon,
    AppCode:"Sys_Workflow",
    IsAppSetting:false,
    OpenType:"1",
    Code:Code,
    ActionName:"AddWorkflowPackage"
  }
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};
//修改流程表单
export const UpdateWorkflowPackag = (ParentCode,MenuCode,DisplayName, Icon) => {
  let paramData = {
    MenuCode:MenuCode,
    ParentCode:ParentCode,
    DisplayName:DisplayName,
    NodeType:200,
    IsBindBizService:false,
    visible:true,
    Icon:Icon,
    MobileVisible:true,
    AppCode:"Sys_Workflow",
    IsAppSetting:false,
    OpenType:"1",
    ActionName:"UpdateAppMenu"
  }
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};
//删除流程表单
export const RemoveWorkflowPackages = (Code) => {
  let paramData = {
    ActionName:"RemoveWorkflowPackages",
    Code:Code
  }
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

//校验编码是否与子表编码重复
export const CheckCodeDuplicated = (DevCode) => {
  let paramData = { 
    ActionName: 'CheckCodeDuplicated', 
    AppCode: DevCode
  }
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

export const saveCorpSecret=(corpSecret)=>{
  return fetch('/Console/DingTalkSetting/OnAction', {
    Secret: corpSecret
  }, 'POST');
};

//应用显示模式设置
export const setAppMenuVisible = (schemaCode, nodeVisible) => {
  let paramData = { 
    ActionName: 'SetAppMenuVisible', 
    SchemaCode: schemaCode,
    NodeVisible: nodeVisible
  }
  return fetch('/Console/AppManage/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

//获取模板列表
export const getModelLists = (ActionName, SchemaCode) => {
  let paramData = {
    ActionName: ActionName,
    SchemaCode: SchemaCode
  };
  return fetch('/Console/PrintDesigner/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};
//新增模板
export const AddPrintTemplate = (ActionName, SchemaCode,TemplateName) => {
  let paramData = {
    ActionName: ActionName,
    SchemaCode: SchemaCode,
    TemplateName:TemplateName
  };
  return fetch('/Console/PrintDesigner/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};
//修改模板名称
export const UpdateDisplayName = (ActionName, PrintTemplateCode,NewDisplayName) => {
  let paramData = {
    ActionName: ActionName,
    PrintTemplateCode: PrintTemplateCode,
    NewDisplayName:NewDisplayName
  };
  return fetch('/Console/PrintDesigner/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};
//删除模板
export const DoRemove = (ActionName, PrintTemplateCode, SchemaCode) => {
  let paramData = {
    ActionName: ActionName,
    PrintTemplateCode: PrintTemplateCode,
    SchemaCode: SchemaCode
  };
  return fetch('/Console/PrintDesigner/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};


// WEBPACK FOOTER //
// ./src/service/getData.js
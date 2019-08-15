export default {
    User: null,
    CompanyName: null,
    EngineCode: null,
    OptionalEngines: [],
    RootNode:{},
    OrgRoles:[],
    Variables: [],
    SelectedParticipants: [],
    ManagerNode:null, //经理函数
    StepManagerNode:null,//逐层经理函数选中节点
    RoleSearchNode:null, //角色查找函数
    ActiveUnit: null,//用于切换部门
    OrgUsers: {
    },
    FullOrgUsers:{

    },
    StepManagerOrgUsers:{

    },//离开逐步经理函数时清空
    SubInstanceDataItems:{},  //子流程数据项
}


// WEBPACK FOOTER //
// ./src/store/state.js
import { fetch, fetchGet } from './index';

const urlPrefix = '/sys/role';
const urlPrefix2 = '/sys/group/role';

const doRequest = (url, param) => {
  return fetch(urlPrefix + url, param);
};

const doRequest2 = (url, param) => {
  return fetch(urlPrefix2 + url, param);
};

export const getUserRoleAndPermission = () => {
  return doRequest('/userRoleAndPermission');
};

// 权限管理初始化数据接口
export const GetInitData = ActionName => {
  let paramData = {};
  return doRequest('', paramData);
};

// 获取所有角色
export const SearchRolesApi = (roleName, queryNumFlag = false) => {
  let paramData = {
    name: roleName,
    queryNumFlag
  };
  return doRequest('/list', paramData);
};

// 获取所有角色
export const GetAllRoles = () => {
  return fetchGet('/sys/group/role/qryRolesAndGroup');
};

// 新建角色
export const CreateRole = (name, groupName) => {
  let paramData = {
    name,
    groupName
  };
  return doRequest('/save', paramData);
};

// 复制角色
export const CopyRole = (oldRoleId, newRoleName, groupName) => {
  let paramData = {
    oldRoleId,
    newRoleName,
    groupName
  };
  return doRequest2('/copyRoleGroup', paramData);
};

// 修改角色名称
export const UpdateRoleName = (name, id, groupName) => {
  let paramData = {
    name,
    id,
    groupName
  };
  return doRequest('/update', paramData);
};

// 删除角色
export const RemoveRole = (ActionName, RoleId) => {
  let paramData = {
    ids: [RoleId]
  };
  return doRequest('/delete', paramData);
};

// 新建角色组
export const CreateRoleGroup = groupName => {
  const paramData = {
    groupName
  };
  return doRequest2('/saveRoleGroup', paramData);
};

// 修改角色组名称
export const UpdateRoleGroupName = (srcGroupName, dstGroupName) => {
  const paramData = {
    srcGroupName,
    dstGroupName
  };
  return doRequest2('/reNameRoleGroup', paramData);
};

// 删除角色组
export const RemoveRoleGroup = groupName => {
  const paramData = {
    groupName
  };
  return doRequest2('/delRoleGroup', paramData);
};

// 获取角色组的所有角色
export const GetAllRolesOfGroup = groupName => {
  let paramData = {
    groupName
  };
  return doRequest2('/qryRolesByGroupName', paramData);
};

// 获取角色下app应用树
export const GetAppPagesAndAcl = RoleId => {
  // let paramData = {
  //   RoleId: RoleId
  // };
  // return fetch('/Role/OnAction', {
  //   PostData: JSON.stringify(paramData)
  // }, 'POST');
};

// 获取应用app下子集权限
export const GetAppPackageChildrenAcl = (roleId, moduleId) => {
  let paramData = {
    roleId: roleId,
    moduleId: moduleId
  };
  return doRequest('/roleAppList', paramData);
};

// 获取表单，列表下的权限状态
export const GetNodeSheetAndListViewActions = (ActionName, RoleId, Code) => {
  let paramData = {
    ActionName: ActionName,
    RoleId: RoleId,
    Code: Code
  };
  return fetch(
    '/Role/OnAction',
    {
      PostData: JSON.stringify(paramData)
    },
    'POST'
  );
};

// 获取角色用户接口
export const GetRoleUsers = (roleId, pageNum, pageSize, KeyWord) => {
  let paramData = {
    roleId: roleId,
    pageNum: pageNum,
    pageSize: pageSize,
    KeyWord: KeyWord
  };
  return doRequest('/userList', paramData);
};

// 获取服务部门接口
export const GetPostUnits = (ActionName, UserId, RoleId) => {
  let paramData = {
    ActionName: ActionName,
    UserId: UserId,
    RoleId: RoleId
  };
  return fetch(
    '/Role/OnAction',
    {
      PostData: JSON.stringify(paramData)
    },
    'POST'
  );
};

// 设置服务部门接口
export const SetPostUnits = (ActionName, PostID, UnitsId) => {
  let paramData = {
    ActionName: ActionName,
    PostID: PostID,
    UnitsId: UnitsId
  };
  return fetch(
    '/Role/OnAction',
    {
      PostData: JSON.stringify(paramData)
    },
    'POST'
  );
};

// 删除角色用户
export const RemoveRoleUser = (ActionName, RoleId, UserId, organIds) => {
  let paramData = {
    ActionName: ActionName,
    roleId: RoleId,
    userId: UserId,
    organIds: organIds
  };
  return doRequest('/removeRoleUser', paramData);
};

// 获取角色下的成员
export const GetRoleNameAndUsers = (ActionName, RoleId) => {
  let paramData = {
    ActionName: ActionName,
    RoleId: RoleId
  };
  return fetch(
    '/Role/OnAction',
    {
      PostData: JSON.stringify(paramData)
    },
    'POST'
  );
};

// 添加角色成员之后，更新数据
export const UpdateRoleUsers = (UserIds, OrganIdList, RoleId) => {
  let paramData = {
    roleId: RoleId,
    userIdList: UserIds,
    organIdList: OrganIdList
  };
  // return new Promise((resolve, reject) => {
  //   $.ajax({
  //     url: '/ctg-workflow/sys/role/updateRoleUser',
  //     data: paramData,
  //     dataType: "json",
  //     success: function (data) {
  //       resolve(data);
  //     }
  //   });
  // })
  return doRequest('/updateRoleUser', paramData);
};

// 保存角色权限设置
export const SaveAclNode = (RoleId, actionList, scopeType, appId, type) => {
  let paramData = {
    roleId: RoleId,
    actionList,
    scopeType,
    appId,
    type
  };
  return doRequest('/saveActions', paramData);
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
  return fetch(
    '/Role/OnAction',
    {
      PostData: JSON.stringify(paramData)
    },
    'POST'
  );
};

// 角色拖拽排序
export const UpdateSortRoles = (ActionName, SortRoles) => {
  let paramData = {
    ActionName: ActionName,
    SortRoles: JSON.stringify(SortRoles)
  };
  return fetch(
    '/Role/OnAction',
    {
      PostData: JSON.stringify(paramData)
    },
    'POST'
  );
};

// 角色控件全量更新
export const saveRoleControlApi = param => {
  return fetch('/controlRoleController/save', param);
};
// 获取角色控件

export const getByAppIdAndGroupIdApi = param => {
  return fetch('/controlRoleController/getByAppIdAndGroupId', param);
};

/**
* 获取应用分组
*
* @param: {Object} moduleId:APPId, roleId: 角色ID
* @return: {Object}
*/
export const getRoleGroupAppList = (roleId, moduleId) => {
  let paramData = {
    roleId: roleId,
    moduleId: moduleId
  };
  return fetch('/sys/role/roleGroupAppList', paramData);
};

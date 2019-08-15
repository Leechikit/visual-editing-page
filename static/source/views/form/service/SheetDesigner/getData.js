import fetch from '../../config/fetch';

//获取推送提醒信息
export const LoadSchedule = (schemaCode) => {
  let parameterData = {
    ActionName: "LoadSchedule",
    SchemaCode: schemaCode
  };
  return fetch("/Console/Schedule/OnAction", {
    PostData: JSON.stringify(parameterData)
  }, "POST");
};

//添加推送提醒
export const AddSchedule = (rule) => {
  let parameterData = {
    ActionName: "AddSchedule",
    rule: JSON.stringify(rule)
  };
  return fetch("/Console/Schedule/OnAction", {
    PostData: JSON.stringify(parameterData)
  }, "POST");
};

//更新推送提醒
export const UpdateSchedule = (rule) => {
  let parameterData = {
    ActionName: "UpdateSchedule",
    rule: JSON.stringify(rule)
  };
  return fetch("/Console/Schedule/OnAction", {
    PostData: JSON.stringify(parameterData)
  }, "POST");
};

//删除推送提醒
export const RemoveSchedule = (objectId) => {
  let parameterData = {
    ActionName: "RemoveSchedule",
    objectId: objectId
  };
  return fetch("/Console/Schedule/OnAction", {
    PostData: JSON.stringify(parameterData)
  }, "POST");
};

//获取表单开发者自定义编码
export const LoadCustomCode = (schemaCode) => {
  var params = {
    ActionName: "LoadCustomCode",
    SchemaCode: schemaCode,
  };
  
  return fetch('/Console/SheetDesigner/OnAction', {
    PostData: JSON.stringify(params)
  }, 'POST');
};

export const GetEngineCode = (Code) => {
  let paramData = {
    ActionName: 'LoadView',
    id: Code
  };
  return fetch('/Console/SheetDesigner/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};

//判断表单是否是安装的
export const CheckSchemaInstalled = (schemaCode) => {
  let paramData = {
    ActionName: 'CheckSchemaInstalled',
    SchemaCode: schemaCode
  };
  return fetch('/Console/SheetDesigner/OnAction', {
    PostData: JSON.stringify(paramData)
  }, 'POST');
};





// WEBPACK FOOTER //
// ./src/service/SheetDesigner/getData.js
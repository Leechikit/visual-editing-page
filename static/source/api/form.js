import { fetch, BASE_URL } from './index';

export default {
  /**
   * 模型对应的应用列表
   */
  load (param) {
    return fetch('/act/app/load', { ActionName: 'Load', SheetCode: param });
  },
  /**
   * 只提供流程的表单设计页面
   */
  load2 (param) {
    return fetch('/op/act/design/loadFlowAppForm', {
      ActionName: 'Load2',
      SheetCode: param
    });
  },
  /**
   * 保存表单
   */
  release (param) {
    return fetch('/act/app/release', param);
  },
  /**
   * 保存表单
   */
  releaseFlowApp (param) {
    return fetch('/op/act/design/releaseFlowAppForm', param);
  },
  /**
   * 提交\审批页面获取流程
   */
  FormGet (param) {
    return fetch('/act/app/FormGet', param);
  },
  formalaExecAndStartFlow (param) {
    return fetch('/act/deal/formalaExecAndStartFlow', param);
  },
  formalaExecAndStartFlow2 (param) {
    return fetch('/act/deal/formalaValAndStartFlow2', param);
  },
  getFormInfo (params) {
    return fetch('/act/app/getFormInfo', params);
  },
  loadSubmitRule (param) {
    return fetch('/act/app/loadSubmitRule', { appId: param });
  },
  saveFlow (param) {
    return fetch('/act/model/saveFlow', param);
  },
  initFlowDesigner (param) {
    return fetch('/act/model/initFlowDesigner', { appId: param });
  },
  initFlowDesigner2 (param) {
    return fetch('/op/act/design/loadFlowDesigner', { appId: param });
  },
  getMenuInfo (param) {
    return fetch('/act/app/getMenuInfo', param);
  },
  parseFormulaText (param) {
    return fetch('/act/model/parseFormulaText', param);
  },
  FormAttachment (param) {
    return fetch('/Form/updateDesc', param);
  },
  getWorkflowClause (param) {
    return fetch('/act/app/getWorkflowClause', param);
  },
  getDataItemsByWorkflowCode (param, source) {
    return fetch('/act/app/getDataItemsByWorkflowCode', {
      appId: param,
      source: sessionStorage.getItem('currentAppType')
    });
  },
  LoadPublishedSchemas (param) {
    return fetch('/act/app/LoadPublishedSchemas', { appId: param });
  },
  LoadFile (param) {
    return fetch('/fileManage/qryFiles', param);
  },
  appRunPage (param) {
    return fetch('/act/app/appRunPage', param);
  },
  getBizObjectSchemaDisplayName (param) {
    return fetch('/act/app/getBizObjectSchemaDisplayName', { appId: param });
  },
  getAppRunObjectSchemaDisplayName (param) {
    return fetch('/act/app/getAppRunObjectSchemaDisplayName', {
      appRunId: param
    });
  },
  getAssociationFormDetail (param) {
    return fetch('/act/app/getAssociationFormDetail', { appRunId: param });
  },
  LoadAppTreeNodes (param) {
    return fetch('/Console/LoadAppTreeNodes', param);
  },
  InitAppTree (param) {
    return fetch('/Console/InitAppTree', param);
  },
  getFormatBizObject (param) {
    return fetch('/act/app/getFormatBizObject', param);
  },
  editForm (params) {
    return fetch('/act/deal/editForm', params);
  },
  listViewData (params) {
    return fetch('/act/app/listViewData', params);
  },
  getUserProperty (params) {
    return fetch('/getUserProperty', params);
  },
  getOrganProperty (params) {
    return fetch('/getOrganProperty', params);
  },
  getOrganMembers (param) {
    return fetch('/user/getOrganMembers', { id: param });
  },
  getSubSheet (params) {
    return fetch('/act/app/getSubSheet', params);
  },
  getAppFormControl (params) {
    return fetch('/Console/AppTree/OnAction', params);
  },
  getTimeControl (params) {
    return fetch('act/app/getTimeControl', params);
  },
  subFiles (param) {
    return fetch('fileManage/subFiles', { needUser: true, parFileId: param });
  },
  commitDraft (params) {
    return fetch('act/deal/commitDraft', params);
  },
  /**
   * 获取列表字段等设置
   */
  getListSetting (params) {
    return fetch('/listViewSetting/getSettingList', params);
  },
  /**
   *模糊查询文件
   */
  getFuzzyFileTrees (params) {
    return fetch('/fileManage/fileNameFuzzy', params);
  },

  /**
   *查询删除的控件是否被使用
   */
  getDelTips (params) {
    return fetch('/act/app/getDelTips', params);
  },
  /**
   *查询控件类型是人员还是部门
   */
  getControlItemUnitType (params) {
    return fetch('/act/app/getControlItemUnitType', params);
  },
  /* 上传图片
   */
  uploadImage (params) {
    return fetch('/Form/SheetAttachmentAction', params);
  },

  /* 关闭流程
   */
  closeWorkFlow (params) {
    return fetch('/act/model/closeWorkFlow', params);
  },

  /**
   * 获取员工档案展示字段
   */
  queryVisibleCol () {
    return fetch('/staffRecord/queryVisibleCol');
  },

  dateFilter (params) {
    return fetch('/act/app/computerRule/dateFilter', params);
  },
  // 上传 Word 模板
  SheetAttachmentAction (file) {
    const fd = new FormData();
    fd.append('fileToUpload', file);
    return fetch('/Form/SheetAttachmentAction', fd, { FormData: true });
  },
  // 删除 Word 模板
  deleteWord (attachmentId) {
    return fetch('/word/process/deleteWord', { attachmentId });
  },
  // 下载文件
  downloadFile (attachId) {
    window.location.href = `${BASE_URL}/Form/downloadFile/${attachId}`;
  }
};

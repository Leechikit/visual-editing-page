import {
  fetch,
  fetchGet
} from './index';
import axios from 'axios';

import { changeToDingDingUrl } from '@/util/utils.js'
export default {
  /**
   * 获取列表字段等设置
   */
  getListSetting (params) {
    return fetch('/listViewSetting/getSettingList', params);
  },
  loadData(params){
    return fetch('/act/app/loadData',params);
  },
  /**
   * 获取列表数据
   */
  getListData (params) {
    return fetch('/act/app/appRunPage', params);
  },
  /**
   * 保存列表设置
   */
  saveListSetting (params) {
    return fetch('/listViewSetting/save', params);
  },
  /**
   * 批量删除列表数据
   */
  deleteListDataBatch (params) {
    return fetch('act/app/delAppRuns', params);
  },
  /**
   * 导出验证
   */
  downloadValidate ({
    appId,
    nameSchema,
    startTime,
    endTime,
    queryItem,
    Columns,
    title
  }) {
    return fetchGet(`/act/app/exportExcel?appId=${appId}&nameSchema=${nameSchema}&startTime=${startTime}&endTime=${endTime}&queryItem=${encodeURIComponent(queryItem)}&Columns=${Columns}&title=${title}`);
  },
  download ({
    appId,
    nameSchema,
    startTime,
    endTime,
    queryItem,
    Columns,
    title,
    that,
  }) {
    window.location.href = `${axios.defaults.baseURL}/act/app/exportExcel?appId=${appId}&nameSchema=${nameSchema}&startTime=${startTime}&endTime=${endTime}&queryItem=${encodeURIComponent(queryItem)}&Columns=${Columns}&title=${title}`;
    that.downloadResult = true
    that.downloadPercent=100
  },
  downloadValidateUpdate ({
    appId,
    nameSchema,
    startTime,
    endTime,
    queryItem,
    Columns,
    title
  }) {
    return fetchGet(`/formexport/formdatatemplet?appId=${appId}&nameSchema=${nameSchema}&startTime=${startTime}&endTime=${endTime}&queryItem=${encodeURIComponent(queryItem)}&Columns=${Columns}&title=${title}`);
  },
  downloadUpdate ({
    appId,
    nameSchema,
    startTime,
    endTime,
    queryItem,
    Columns,
    title,
    that
  }) {
    window.location.href = `${axios.defaults.baseURL}/formexport/formdatatemplet?appId=${appId}&nameSchema=${nameSchema}&startTime=${startTime}&endTime=${endTime}&queryItem=${encodeURIComponent(queryItem)}&Columns=${Columns}&title=${title}`;
    that.downloadResult = true
    that.downloadPercent=100
  },
  appList (moduleId) {
    return fetch('/act/app/listApp2', { moduleId });
  },
  importExcelTemplate (appId) {
    let isInDingTalk =sessionStorage.getItem('isInDingTalk');
    if(isInDingTalk=="true"){
      console.log(changeToDingDingUrl(`${axios.defaults.baseURL}/formexport/formtemplet?appId=${appId}`));
      window.location.href = changeToDingDingUrl(`${axios.defaults.baseURL}/formexport/formtemplet?appId=${appId}`)
    }
    else{
      window.location.href = `${axios.defaults.baseURL}/formexport/formtemplet?appId=${appId}`;

    }
  },
  uploadImportExcel (appId, file) {
    const fd = new FormData();
    fd.append('appId', appId);
    fd.append('fileToUpload', file);
    return fetch('/formexport/importDatas', fd, { FormData: true });
  },
  // 可分类字段
  getClassifyControl ({appId, controlType}) {
    return fetchGet(`/control/getControlAttributeBos?appId=${appId}&controlType=${controlType}`);
  }
};

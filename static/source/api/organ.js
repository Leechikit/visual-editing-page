import { fetch, fetchGet } from './index';

export default {
  getChildList (params) {
    return fetch('/organ/childList', params);
  },

  delete (id) {
    return fetch('/organ/delete/' + id);
  },

  update (params) {
    return fetch('/organ/update', params);
  },

  addOrgan (params) {
    return fetch('/organ/add', params);
  },

  queryLeaf (params) {
    return fetch('/organ/queryLeaf', params);
  },

  syncOrgan () {
    return fetch('/organ/sync', null, { timeout: 50000 });
  },

  queryAllOrganStaffNum (param) {
    return fetch('/organ/queryStaff', param);
  },

  searchOrganByName (param) {
    return fetch('/organ/queryList', param);
  },

  searchOrganByUserId () {
    return fetch('/organ/getOwnDeps');
  },
  detail (id) {
    let param = {id: id};
    return fetch('/staffRecord/detail', param);
  },
  save (params) {
    return fetch('/staffRecord/saveOrUpdate', params);
  },
  removeFile (id) {
    return fetch('/file/attachment/delete?fileId=' + id);
  },
  getAllColumns () {
    return fetch('/staffRecord/getAllColumns');
  },
  saveColumns (params) {
    return fetch('/staffRecord/saveColumns', params);
  },
  dynamicDetail (id) {
    if (id) {
      return fetchGet('/staffRecord/dynamicDetail?id=' + id);
    } else {
      return fetchGet('/staffRecord/dynamicDetail');
    }
  },
  updateIcon (params) {
    return fetch('/user/updateIcon', params);
  },
  /**
  *  查询分管人员
  *  @param: {String} organId 部门ID
  */
  queryMasters ({organId}) {
    return fetch('/organ/queryMasters', {organId});
  },
  /**
  *  保存分管人员
  *  @param: {String} id 部门ID
  *  @param: {Array} masterIdList 分管人员ID数组
  */
  updateOrganMaster ({id, masterIdList}) {
    return fetch('/organ/updateOrganMaster', {id, masterIdList});
  },
  /**
   * 解锁
   * @param: {String} loginName 登录名
   * @param: {String} companyId 企业ID
   */
  unlockLogin ({loginName, companyId}) {
    return fetch('/unlockLogin', {loginName, companyId});
  }
};

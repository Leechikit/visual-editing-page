import {fetch} from './index';

export default {

  getUserList (params) {
    return fetch('/user/pageList', params);
  },

  delete (params) {
    return fetch('/user/delete', params);
  },

  update (params) {
    return fetch('/user/update', params);
  },

  updateOrganMaster (params) {
    return fetch('/user/updateOrganMaster', params);
  },

  saveUser (params) {
    return fetch('/user/save', params);
  },

  detail (params) {
    return fetch('/user/detail', params);
  },

  parseUsers (params) {
    return fetch('/user/parseUsers', params);
  },

  searchUserByName (params) {
    return fetch('/user/querylist', params);
  },
  modifyUserPassWord (params) {
    return fetch('user/updatePassword', params);
  },
  /**
   * 日志管理
   * @param {Object} param
   * @param {number} [param.pageNum=1]
   * @param {number} [param.pageSize=10]
   * @param {number} [param.startDate] - timestamp
   * @param {number} [param.endDate] - timestamp
   * @param {string} [param.type] - App_Management Interface_Management Organ_Management
   * @param {string} [param.operName]
   * @returns {Promise}
   */
  getLog ({ pageNum = 1, pageSize = 10, startDate, endDate, type, operName }) {
    return fetch(
      '/user/log/queryLogPages',
      { pageNum, pageSize, startDate, endDate, type, operName }
    );
  },
  createCompanyAccount(params){
    return fetch('company/createCompanyAccount',params)
  }
};

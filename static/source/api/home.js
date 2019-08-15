/* eslint-disable no-tabs */
import { fetch } from './index';

export default {
  /**
	* 获取首页设置项
	* companyId: 企业ID
	*/
  getHomeConfiguration (params) {
    return fetch('company/getHomeConfiguration', params);
  },
  /**
	* 保存首页设置项
	* companyId: 企业ID, homeConfiguration: 应用类型（1常用2收藏）
	*/
  saveHomeConfiguration (params) {
    return fetch('company/saveHomeConfiguration', params);
  },
  /**
	* 获取首页图片
	* companyId: 企业ID
	*/
  getHomePicture (params) {
    return fetch('company/getHomePicture', params);
  },
  /**
	* 保存首页图片
	* companyId: 企业ID, iconId: 图片ID
	*/
  updateHomePicture (params) {
    return fetch('company/updateHomePicture', params);
  },
  /**
	* 获取首页快捷入口的模块
  * @param: {String} companyId 企业ID
  * @return: {String} UpcomingConfiguration 1.待办 2.审批  3.抄送 4.其他 5.已发起 6.已办理
	*/
  getUpcomingConfiguration ({companyId}) {
    return fetch('company/getUpcomingConfiguration', {companyId});
  },
  /**
	* 获取首页快捷入口的模块
  * @param: {String} companyId 企业ID
  * @param: {String} upcomingConfiguration 格式 1;2;3
	*/
  updateUpcomingConfiguration ({companyId, upcomingConfiguration}) {
    return fetch('company/updateUpcomingConfiguration', {companyId, upcomingConfiguration});
  }
};

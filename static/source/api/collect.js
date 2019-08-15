/**
* @name: collet
* @description: 应用收藏相关接口
* @author: lizijie
* @update:
*/
import { fetch } from './index';

export default {
  /**
  * 获取收藏应用列表
  *
  * @return: {String} return
  */
  getList (params) {
    return fetch('/collect/getList', params);
  },
  /**
  * 保存收藏应用
  *
  * @param: {String} id 传id为修改，不传为新增
  * @param: {String} appId 应用ID
  * @param: {String} appName 应用名称
  * @param: {String} displayName 应用显示名称
  * @param: {String} appIcon 应用图标
  * @return: {String} return
  */
  save ({ id, appId, appName, displayName, appIcon }) {
    return fetch('/collect/save', { id, appId, appName, displayName, appIcon });
  },
  /**
  * 删除收藏应用
  *
  * @param: {String} userCollectId 收藏ID
  * @return: {String} return
  */
  delete ({ userCollectId }) {
    return fetch('/collect/delete', { userCollectId });
  },
  /**
  * 获取快捷应用和收藏配置
  *
  * @param: {String} companyId 企业Id
  * @return: {String} homeConfiguration 1-快捷应用 2-收藏
  */
  getHomeConfiguration ({ companyId }) {
    return fetch('/company/getHomeConfiguration', { companyId });
  }
};

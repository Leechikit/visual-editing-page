import { fetch } from '@/api/index'

export default {
  /**
   * 获取首页背景图
   * @param: {String} companyId 企业id;
   */
  getHomePicture({ companyId }) {
    return fetch('/company/getHomePicture', { companyId })
  },
  /**
   * 管理员获取首页快捷入口的模块
   * @param: {String} companyId 企业ID
   * @return: {String} UpcomingConfiguration 1.待办 2.审批  3.抄送 4.其他 5.已发起 6.已办理
   */
  getUpcomingConfiguration({ companyId }) {
    return fetch('company/getUpcomingConfiguration', { companyId })
  },
  /**
   * 用户获取首页快捷入口的模块
   * @param: {String} companyId 企业ID
   * @return: {String} UpcomingConfiguration 1.待办 2.审批  3.抄送 4.其他 5.已发起 6.已办理
   */
  getUpcomingConfigurationUser({ companyId }) {
    return fetch('user/getUpcomingConfiguration', { companyId })
  },
  /**
   * 用户修改首页快捷入口的模块
   * @param: {String} upcomingConfiguration 1.待办 2.审批  3.抄送 4.其他 5.已发起 6.已办理
   * @param: {String} companyId 企业ID
   */
  updateUpcomingConfiguration({ upcomingConfiguration, companyId }) {
    return fetch('user/updateUpcomingConfiguration', {
      upcomingConfiguration,
      companyId
    })
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
  save({ id, appId, appName, displayName, appIcon }) {
    return fetch('/collect/save', { id, appId, appName, displayName, appIcon })
  },
  /**
   * 删除收藏应用
   *
   * @param: {String} userCollectId 收藏ID
   * @return: {String} return
   */
  delete({ userCollectId }) {
    return fetch('/collect/delete', { userCollectId })
  },
  /**
   * 获取快捷应用和收藏配置
   *
   * @param: {String} companyId 企业Id
   * @return: {String} homeConfiguration 1-快捷应用 2-收藏
   */
  getHomeConfiguration({ companyId }) {
    return fetch('/company/getHomeConfiguration', { companyId })
  },
  /**
   * 获取首页公告信息
   *
   * @param: {String} companyId 企业Id
   * @param: {String} pageSize 每页数量
   * @param: {String} pageNum 第几页
   */
  getListNotices({ companyId, pageSize, pageNum }) {
    return fetch('/user/getListNotices', { companyId, pageSize, pageNum })
  },
  /**
   * 添加首页公告信息
   *
   * @param: {String} companyId 企业Id
   * @param: {String} title 公告标题
   * @param: {String} content 公告内容
   */
  updateHomepageNotice({ companyId, title, content }) {
    return fetch('/user/updateHomepageNotice', { companyId, title, content })
  },
  /**
   * 删除首页公告信息
   *
   * @param: {String} id 公告id
   */
  deleteNotice({ id }) {
    return fetch('/user/deleteNotice', { id })
  }
}

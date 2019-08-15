/**
 * @name: form
 * @description: 表单数据相关接口
 */
import { fetch, fetchGet } from '@/api/index'

export default {
  /**
   * 获取表单展示数据
   *
   * @param: {String} appRunId 表单id
   * @return: {String} return
   */
  getApplyInfo(params) {
    return fetch('/act/app/applyInfo', params)
  },
  /**
   * 获取表单审批数据
   *
   * @param: {String} appId 应用id
   * @param: {String} busId
   * @param: {String} ruWfTaskId
   * @return: {String} return
   */
  getAppInfoLog(params) {
    return fetch('/act/app/appInfoLog', params)
  },
  /**
   * 获取表单创建数据
   *
   * @param: {String} ActionName = 'Load'（固定）
   * @param: {Boolean} SideModal = true（固定）
   * @param: {String} BizObjectId = ''（固定）
   * @param: {String} SchemaCode 应用id
   * @return: {String} return
   */
  getForm(params) {
    return fetch('/act/app/FormGet', params)
  },
  /**
   * getInterfaceData 获取接口内容
   *
   * @param: {String} appId 应用id
   * @param: {String} controlId 控件key
   * @param: {String} appRunId 表单id
   * @param: {String} query 远程搜索
   * @return: {String} return
   */
  getInterfaceData({ appId, controlId, appRunId = '', query = '' }) {
    return fetchGet('/html/get', { appId, controlId, appRunId, query })
  },
  dateFilter(params) {
    return fetch('/act/app/computerRule/dateFilter', params)
  }
}

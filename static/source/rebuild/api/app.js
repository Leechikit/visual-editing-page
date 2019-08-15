/**
 * @name: app
 * @description: 应用相关接口
 */
import { fetch, fetchGet } from '@/api/index'
import axios from 'axios'
import { changeToDingDingUrl } from '@/util/utils.js'

export default {
  // 获取模块里的应用
  listApp({ moduleId }) {
    return fetch('/act/app/listApp2', { moduleId })
  },
  // 获取应用的表单列表
  appRunPage(param) {
    return fetch('/act/app/appRunPage', param)
  },
  /**
   * 获取应用表单字段
   *
   * @param: {String} appId 应用id
   */
  getSettingList({ appId }) {
    return fetch('/listViewSetting/getSettingList', { appId })
  },
  /**
   * 批量删除应用表单列表数据
   *
   * @param: {Array} formIdList 表单id数组
   */
  deleteFormListBatch({ formIdList }) {
    const ids = formIdList.join(';')
    return fetch('/act/app/delAppRuns', { ids })
  },
  /**
   * 导出用于修改数据
   */
  downloadValidateUpdate({
    appId,
    nameSchema,
    startTime,
    endTime,
    queryItem,
    Columns,
    title
  }) {
    return fetchGet(
      `/formexport/formdatatemplet?appId=${appId}&nameSchema=${nameSchema}&startTime=${startTime}&endTime=${endTime}&queryItem=${encodeURIComponent(
        queryItem
      )}&Columns=${Columns}&title=${title}`
    )
  },
  downloadUpdate({
    appId,
    nameSchema,
    startTime,
    endTime,
    queryItem,
    Columns,
    title,
    that
  }) {
    window.location.href = `${
      axios.defaults.baseURL
    }/formexport/formdatatemplet?appId=${appId}&nameSchema=${nameSchema}&startTime=${startTime}&endTime=${endTime}&queryItem=${encodeURIComponent(
      queryItem
    )}&Columns=${Columns}&title=${title}`
    that.downloadResult = true
    that.downloadPercent = 100
    that.drawCircle(true)
  },
  downloadValidate({
    appId,
    nameSchema,
    startTime,
    endTime,
    queryItem,
    Columns,
    title
  }) {
    return fetchGet(
      `/act/app/exportExcel?appId=${appId}&nameSchema=${nameSchema}&startTime=${startTime}&endTime=${endTime}&queryItem=${encodeURIComponent(
        queryItem
      )}&Columns=${Columns}&title=${title}`
    )
  },
  download({
    appId,
    nameSchema,
    startTime,
    endTime,
    queryItem,
    Columns,
    title,
    that
  }) {
    window.location.href = `${
      axios.defaults.baseURL
    }/act/app/exportExcel?appId=${appId}&nameSchema=${nameSchema}&startTime=${startTime}&endTime=${endTime}&queryItem=${encodeURIComponent(
      queryItem
    )}&Columns=${Columns}&title=${title}`
    that.downloadResult = true
    that.downloadPercent = 100
    that.drawCircle(true)
  },
  importExcelTemplate(appId) {
    let isInDingTalk = sessionStorage.getItem('isInDingTalk')
    if (isInDingTalk === 'true') {
      window.location.href = changeToDingDingUrl(
        `${axios.defaults.baseURL}/formexport/formtemplet?appId=${appId}`
      )
    } else {
      window.location.href = `${axios.defaults.baseURL}/formexport/formtemplet?appId=${appId}`
    }
  },
  uploadImportExcel(appId, file) {
    const fd = new FormData()
    fd.append('appId', appId)
    fd.append('fileToUpload', file)
    return fetch(
      '/formexport/importDatas',
      fd,
      { FormData: true },
      {
        beforeFetch(axios) {
          axios.defaults.timeout = 0
        },
        afterFetch(axios) {
          axios.defaults.timeout = 20000
        }
      }
    )
  }
}

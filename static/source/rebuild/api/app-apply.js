import { fetch } from '@/api/index'
export default {
  /* 获取所有的模块*/
  getAllModule(params) {
    return fetch('/act/module/listModule', params)
  },
  myUpcomingCount() {
    return fetch('/act/deal/myUpcomingCount')
  },
  getDataByIconId() {
    return fetch('act/report/getDataByIconId', { iconId: '1,2,3,4,5' })
  },
  getAllApp() {
    return fetch('/act/app/listFrequentlyUsedApp')
  },
  /**
   * 获取收藏应用列表
   *
   * @return: {String} return
   */
  getList(params) {
    return fetch('/collect/getList', params)
  },
  // 应用和分组
  appList2(moduleId) {
    return fetch('/act/app/listApp2', {
      moduleId
    })
  }
}

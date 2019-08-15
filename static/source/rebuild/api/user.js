import { fetch } from '@/api/index'
export default {
  detail(params) {
    return fetch('/user/detail', params)
  },
  /**
   * 获取应用权限
   *
   * @param: {String} apppId 应用id
   * @return: {Array} return USERSTATS-人员统计,TIMESTATS-时间统计,FETCH-查看,REMOVE-删除,START-新增
   */
  getPermissions({ appId }) {
    return fetch('/sys/role/queryPermissions', { resourceId: appId })
  }
}

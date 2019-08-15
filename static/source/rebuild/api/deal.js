/**
 * @name: deal
 * @description: 表单处理相关接口
 */
import { fetch } from '@/api/index'

export default {
  // 审批/经办同意
  doActTask(params) {
    return fetch('/act/deal/doActTask', params)
  },
  // 抄送
  finishCCTask(params) {
    return fetch('/act/deal/finishCCTask', params)
  },
  // 驳回重新发起
  formalaValAndStartFlow2(params) {
    return fetch('/act/deal/formalaValAndStartFlow2', params)
  },
  // 不同意
  rejectTask(params) {
    return fetch('/act/deal/rejectTask', params)
  },
  // 第一次提交
  formalaExecAndStartFlow(params) {
    return fetch('act/deal/formalaExecAndStartFlow', params)
  },
  // 催办
  urgeTask(param) {
    return fetch('/act/deal/urge', { appRunId: param })
  },
  // 撤回我的提交
  cancelMyJob(param) {
    return fetch('/act/deal/cancelMyJob', { id: param })
  }
}

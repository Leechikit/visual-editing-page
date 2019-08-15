import {fetch} from './index';

export default {
      /**
       * 模型对应的应用列表
       */
      load (param) {
          return fetch('/act/app/load', {ActionName:"Load",SheetCode:param});
      },
      /**
       * 所有应用流程实例列表
       */
      release (param) {
          return fetch('/act/app/release', param);
      },
    /**
     * 提交\审批页面获取流程
     */
    FormGet (param) {
        return fetch('/act/app/FormGet', param);
    },
    formalaExecAndStartFlow(param){
        return fetch('/act/deal/formalaExecAndStartFlow', param);
    },
	   formalaExecAndStartFlow2(param){
        return fetch('/act/deal/formalaValAndStartFlow2', param);
    },
    getFormInfo(param){
        return fetch('/act/app/getFormInfo',param);
    },
    loadSubmitRule(param){
        return fetch('/act/app/loadSubmitRule', {appId:param});
    },
    saveFlow(param){
      return fetch('/act/model/saveFlow', param);
      
    },
    initFlowDesigner (param) {
        return fetch('/act/app/initFlowDesigner', {appId:param});
    },
}

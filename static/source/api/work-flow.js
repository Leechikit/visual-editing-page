import {fetch, BASE_URL} from "./index"
export default {
    /**
     * 用户登录
     */
    Login(params) {
        // return fetch('/act/login/login', params);
        return fetch('/loginShiro',params);
    },
    /**
     * 单点登录设置企业id
     *
     * @param: {String} companyId 企业id
     */
    eadpSetCompany({ companyId }) {
        return fetch(`http://10.142.232.120:9101/cloudportal/iam/users/current/tenants/${companyId}`)
    },
    /**
     * 获取企业列表
     *
     */
    getCompanyList() {
        // return fetch('');
        return Promise.resolve({
            code: 0,
            result: [{name: '企业名', id:'1'},{name: '钉钉', id:'2'}]
        })
    },
        /**
     * 用户登录
     */
    LoginAccount(params) {
        // return fetch('/act/login/login', params);
        return fetch('/login/getCompanys',params);
    },
    companyDetail(params){
        return fetch('/company/detail',params);
    },
    companyUpdate(params){
        return fetch('/company/update',params);
    },
    getAutoSyncOrganStatus() {
        return fetch('/company/getCompanyList');
    },
    isMulti(){
        return fetch('/company/isMulti');
    },
    delFile (params) {
        return fetch('/Form/delFile', params);
    },


    /**
     * 部署
     */
    deploy(param) {
        return fetch('/act/model/deploy', {modelId:param})
    },
    /**
     * 新增流程
     */
    addFlow(params) {
        return fetch('/act/model/save', params)
    },

    /**
     * 获取发起的流程
     */
     startFlowList() {
         return fetch('demo/flowApply/list')
     },

    /**
     * 获取工作流程
     */
    workFlowList(input) {
        return fetch('/act/model/list',{page:input})
    },

    /**
     * 获取已办任务
     */
    finishJobList(param,config) {
        return fetch('/act/deal/myDoneList',param)
    },
    /**
     * 获取我的提交任务
     */
    mySubmitList(param,config) {
        return fetch('/act/deal/mySubmitList',param)
    },

    /**
     * 撤回我的提交
     */
    cancelMyJob(param) {
        return fetch('/act/deal/cancelMyJob',{id:param})
    },

    /**
     * 获取待办任务
     */
    unfinishJobList(param) {
        return fetch('/act/deal/myUpcoming',param)
    },

    /**
     * 删除模型
     */
    delModal(myId) {
        return fetch('/act/model/del', {id: myId})
    },

    /**
     * 部署模型
     */
    deployModal(id) {
        return fetch('/act/model/deploy', {modelId: id})
    },

    /**
     * 获取审批记录
     */
    approvalRecord(id) {
        return fetch('/act/app/flowInfoLog', {appRunId: id})
    },

    /**
     * 发起流程
     */
     startFlow(params) {
         return fetch('demo/flowApply/edit', params)
     },


    getCurrentFlowImg(input){
         return fetch('/act/app/showFlowImg',{processInstanceId:input})
    },

    /**
     * 获取所有部署的流程
     */
     getFlowsByActKey(param) {
         return fetch('/act/deal/queryFlowsByActKey',{actKey:param})
     },

    /**
     * 提交的流程
     */
     uploadFlow(param) {
         return fetch('/act/deal/startFlow',param)
     },
      /**
     * 删除流程
     */
    delCurrentFlow(param) {
         return fetch('/demo/flowApply/delete',{appId:param})
     },
     /**
      /**
     * 审批实例
     */
    approvalLog(param) {
         return fetch('/act/app/flowInfoLog',{appRunId:param})
     },

     /**
      /**
     * 审批实例
     */
    Log(param) {
         return fetch('/act/app/flowInfoLog',{appRunId:param})
     },
     /**
      /**
     * 审批同意
     */
    agree(param) {
         return fetch('/act/deal/doActTask',param)
     },
    /*
    * 功能节点重新发起
    */
    commitFuncNode (param) {
        return fetch('act/deal/commitFuncNode', param);
    },
      /**
      /**
     * 审批驳回
     */
    reject(param) {
         return fetch('/act/deal/rejectTask',param)
     },
     /**
      /**
     * 审批驳回原点
     */
    turndown(param) {
         return fetch('/act/deal/rejectToStartUser',param);
     },
     /**
      /**
     * 审批详情
     */
    approvalDetail(param) {
         return fetch('/act/app/applyInfo',param)
     },
	/**
     * 流程详情
     */
    appInfoLog(param) {
         return fetch('/act/app/appInfoLog',{appRunId:param})
     },
	 /**
     * 流程创建
     */
    createFlow() {
         return fetch('/act/model/save')
     },
     /*
     */
     getUserList(){
        return fetch('/user/list')
     },

    restartFlow(params){
        return fetch('/act/deal/startFlow2',params)
    },

    updateCC(params){
        return fetch('/act/deal/finishCCTask',params);
    },

    queryTurnNode(params){
        return fetch('/act/deal/getJumpNode',params);
    },

    freeJump(params) {
        return fetch('/act/deal/freeJump', params);
    },
    turnToDo(params) {
        return fetch('/act/deal/transferTask', params);
    },
    dispatchTask(params) {
        return fetch('/act/deal/dispatchTask', params);
    },
    parseParticipantName(params) {
        return fetch('/parseParticipantName', params);
    },
     /**
     * 催办
     */
    urge(param) {
         return fetch('/act/deal/urge',{appRunId:param})
    },
  /**
   * 导出 Word 模板
   */
  exportWord ({ appId, appRunId, attachmentId }) {
    window.location.href = `${BASE_URL}/word/process/downloadWord?appId=${appId
    }&appRunId=${appRunId}&attachmentId=${attachmentId}`;
  }
};

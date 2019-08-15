import {fetch} from './index';

export default {

    loginConsole(param){
        return fetch('/loginConsole',param);
    },
    routers(){       
        return fetch('/console/role/routers');
    },
   /**
     * 读取注册中心配置集合.
     * 
     * @param request HTTP请求
     * @return 注册中心配置集合
     */
    getZkList () {
        return fetch('/ebj/registry-center/get');
    },
    addZKList (param){
        return fetch('/ebj/registry-center/post',param);
    }, 
    connectZK (){
        return fetch('/ebj/registry-center/connect');
    }, 
    allJobsBriefInfo(){
        return fetch('/ebj/jobs/allJobsBriefInfo');
    },
    jobsCount(){
        return fetch('/ebj/jobs/count'); 
    },
    triggerJob(params){
        return fetch('/ebj/jobs/triggerJob',params); 
    },
    disableJob(params){
        return fetch('/ebj/jobs/disableJob',params); 
    },
    shutdownJob(params){
        return fetch('/ebj/jobs/shutdownJob',params); 
    },
    enableJob(params){
        return fetch('/ebj/jobs/enableJob',params); 
    },
    getShardingInfo(params){
        return fetch('/ebj/jobs/getShardingInfo',params); 
    },
    disableSharding(params){
        return fetch('/ebj/jobs/disableSharding',params); 
    },
    enableSharding(params){
        return fetch('/ebj/jobs/enableSharding',params); 
    },
    getShardingInfo(params){
        return fetch('/ebj/jobs/getShardingInfo',params); 
    },
    getJobParam(params){
        return fetch('/ebj/litejobs/getJobParam',params); 
    },
    modifyJobParam(params){
        return fetch('/ebj/litejobs/modifyJobParam',params); 
    },
    removeJob(params){
        return fetch('/ebj/litejobs/removeJob',params);
    },
    getServersTotalCount(params){
        return fetch('/ebj/servers/count',params);
    },
    getAllServersBriefInfo(params){
        return fetch('/ebj/servers/getAllServersBriefInfo',params);
    },
    disableServer(params){
        return fetch('/ebj/servers/disableServer',params);
    },
    enableServer(params){
        return fetch('/ebj/servers/enableServer',params);
    },
    shutdownServer(params){
        return fetch('/ebj/servers/shutdownServer',params);
    },
    removeServer(params){
        return fetch('/ebj/servers/removeServer',params);
    },
    getJobs(params){
        return fetch('/ebj/servers/getJobs',params);
    },
    disableServerJob(params){
        return fetch('/ebj/servers/disableServerJob',params);
    },
    shutdownServerJob(params){
        return fetch('/ebj/servers/shutdownServerJob',params);
    },
    removeServerJob(params){
        return fetch('/ebj/servers/removeServerJob',params);
    },
    loadActive(){
        return fetch('/ebj/elasticJob/loadActivated');
    },
    findJobExecutionEvents(param){
        return fetch('/ebj/elasticJob/execution',param);
    },
    findJobStatusTraceEvents(param){
        return fetch('/ebj/elasticJob/status',param);
    }
}
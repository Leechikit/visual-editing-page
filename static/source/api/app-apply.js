import {
    fetch,
    fetchGet
} from './index';
import Cookies from 'js-cookie'
export default {
    /**
     * 模型对应的应用列表
     */
    exportConfigBtn () {
        return fetch('/act/app/exportAllAppDatas');
    },

    appList (param) {
        return fetch('/act/app/listApp', {
            moduleId: param
        });
    },
    // 应用和分组
    appList2 (moduleId) {
        return fetch('/act/app/listApp2', {
            moduleId
        });
    },
    /**
     * 所有应用流程实例列表
     */
    appInstanceList (param) {
        return fetch('/act/app/appInstList', param);
    },
    /**
     * 提交流程
     */
    commitAppInstance (params) {
        return fetch('/act/app/commit', params);
    },

    /**
     * 删除流程实例
     */
    deleteAppInstance (params) {
        return fetch('/act/app/delAppRun', {
            id: params
        });
    },
    /*提交用户数据 */
    commitNewData (params) {
        return fetch('/act/deal/startFlow', params);
    },

    /* 创建模块是插入数据*/
    createModule (params, icon) {
        return fetch('act/module/addModule', {
            moduleName: params,
            icon: icon
        });
    },

    /* 获取自定义表单的数据*/
    getPageSoul (params) {
        return fetch('/act/app/pageSoul', {
            id: params
        });
    },

    /* 获取所有的模块*/
    getAllModule (params) {
        if(window.isExpAccount){
            params = params?params:{}
            params["isExpAccount"]=true
           }
        return fetch('/act/module/listModule',params);
    },
    getAllApp () {
        return fetch('/act/app/listFrequentlyUsedApp');
    },

    modModule (params) {
        return fetch('/act/module/modModule', params);
    },
    delModule (params) {
        return fetch('/act/module/delModule', {
            id: params
        });
    },
    addApp (params) {
        return fetch('/act/app/createApp', params);
    },
    copyApp (params) {
        return fetch('/act/app/copyApp', params);
    },
    modApp (params) {
        return fetch('/act/app/modApp', params);
    },

    deleteApp (params) {
        return fetch('/act/app/deleteApp', {
            appId: params
        });
    },
    deleteModule (params) {
        return fetch('/act/app/deleteModule', {
            moduleId: params
        });
    },
    myUpcomingCount () {
        return fetch('/act/deal/myUpcomingCount');
    },
    getDataByIconId(){
        return fetch('act/report/getDataByIconId',{iconId:'1,2,3,4,5'});
    },
    excelAppUpload (file) {
        const fd = new FormData();
        fd.append('file', file);
        return fetch('/exceldesign/upload', fd, { FormData: true });
    },
    excelAppGetSample (params) {
        return fetchGet('/exceldesign/getSample', { params });
    },
    excelAppMatchHead (params) {
        return fetchGet('/exceldesign/matchHead', { params });
    },
    excelAppCreate (params) {
        return fetch('/exceldesign/createApp', params, { timeout: 30000 });
    },
    createAloneFlow (params) {

        return fetch('/op/act/design/createFlowApp', params);
    },
    delFlowApp(params){
        return fetch('/op/act/design/deleteApp', params);
     },
    }
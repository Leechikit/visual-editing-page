import Cookies from 'js-cookie';

const report = {
    namespaced: true,
    state: {
        localReportData: [],
    },
    getters:{
        localReportData: ({localReportData}) => localReportData,
    },
    mutations: {
    }
};

export default report;

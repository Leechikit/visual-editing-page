import HTTP from '@/api/listview';

const listview = {
  namespaced: true,
  state: {
    listThead: [], // 表格表头字段
    listQuery: [], // 表格查询字段
    listTbody: [], // 表格内容
    listApp: [], // 应用列表
    listConfig: {}, // 表格设置
    title: '', // 页面标题
    listMode:[],
    count: 0, // 表格内容总条数
    currentType: '', // 当前类型 app应用 report报表
    currentAppId: '', // 当前应用id
    currentAppKey: '',
    currentTabIndex:0,
    currentAppName: '', // 当前应用名称
    defaultShowMode:'',
    dateFromTo:[],
    modeView:{},
    tabTypeObj:{},
    currentTabType:'',//是新增还是修改
  },
  getters: {
    getListThead: state => state.listThead,
    getListQuery: state => state.listQuery,
    getListTbody: state => state.listTbody,
    getListApp: state => state.listApp,
    getListConfig: state => state.listConfig,
    getTitle: state => state.title,
    getCount: state => state.count,
    getCurrentType: state => state.currentType,
    getCurrentAppId: state => state.currentAppId,
    getCurrentAppKey: state => state.currentAppKey,
    getCurrentAppName: state => state.currentAppName,
    getListMode:state=>state.listMode,
    getDefaultShowMode:state=>state.defaultShowMode,
    getDateFromTo:state=>state.dateFromTo,
    getModeView:state=>state.modeView,
    getCurrentTabIndex:state=>state.currentTabIndex,
    getTabTypeObj:state=>state.tabTypeObj,
    getCurrentTabType:state=>state.currentTabType,
  },
  mutations: {
    setListThead (state, listThead) {
      state.listThead = listThead || [];
    },
    setListQuery (state, listQuery) {
      state.listQuery = listQuery || [];
    },
    setListTbody (state, listTbody) {
      state.listTbody = listTbody || [];
    },
    setListApp (state, listApp) {
      state.listApp = listApp || [];
    },
    setListConfig (state, listConfig) {
      state.listConfig = listConfig || {};
    },
    setTitle (state, title) {
      state.title = title;
    },
    setCount (state, count) {
      state.count = count;
    },
    setCurrentType (state, currentType) {
      state.currentType = currentType;
    },
    setCurrentAppId (state, currentAppId) {
      state.currentAppId = currentAppId;
    },
    setCurrentAppKey (state, currentAppKey) {
      state.currentAppKey = currentAppKey;
    },
    setCurrentAppName (state, currentAppName) {
      state.currentAppName = currentAppName;
    },
    setListMode(state,listMode){
      state.listMode = listMode;
    },
    setDefaultShowMode(state,defaultShowMode){
      state.defaultShowMode = defaultShowMode;
    },
     setDateFromTo(state,dateFromTo){
      state.dateFromTo = dateFromTo;
    },
    setCurrentTabIndex(state,currentTabIndex){
      state.currentTabIndex = currentTabIndex;
    },
    setTabTypeObj(state,tabTypeObj){
      state.tabTypeObj = tabTypeObj;
    },
    setCurrentTabType(state,currentTabType){
      state.currentTabType = currentTabType;
    }
  },
  actions: {
    setListSetting ({
      commit,
      state
    }, {
      appId
    }) {
      return new Promise((resolve, reject) => {
        HTTP.getListSetting({
          appId
        }).then(res => {
          if (res.Code == 0) {
            commit('setListThead', res.Data.ListViewData);
            commit('setListConfig', {
              SortDirection: res.Data.SortDirection,
              SortBy: res.Data.SortBy,
              Import: res.Data.Import,
              SortNameFeild: res.Data.SortNameFeild,
              StatisConfig: res.Data.StatisConfig
            });
            if(res.Data.ShowMode&&res.Data.ShowMode!=""){
              commit('setListMode', res.Data.ShowMode.split(';'));
            }
            commit('setTitle', res.Data.Title);
            commit('setDefaultShowMode', res.Data.DefaultShowMode);
            // 过滤查询字段
            if (res.Data.ListViewData instanceof Array) {
              const queryItems = res.Data.ListViewData.filter(item => {
                return item.CanBeQueryItem;
              });
              commit('setListQuery', JSON.parse(JSON.stringify(queryItems)));
            }
            if (res.Data.DateFromTo) {
              commit('setDateFromTo', res.Data.DateFromTo.split(';'));
            }
            resolve();
          }
        });
      });
    },
    setListData ({
      commit,
      state
    }, {
      appId,
      pageNum = 1,
      pageSize = 10,
      nameSchema = '',
      startTime = '',
      endTime = '',
      queryItem = {}
    }) {
      return new Promise((resolve, reject) => {
        HTTP.getListData({
          QueryCode: appId,
          pageNum,
          pageSize,
          nameSchema,
          startTime,
          endTime,
          queryItem
        }).then(res => {
          if (res.Code == 0) {
            commit('setListTbody', res.Result.ReturnData);
            commit('setCount', res.Result.Count);
          } else {
            commit('setListTbody', []);
            commit('setCount', 0);
          }
          resolve();
        }).catch(err => {
          commit('setListTbody', []);
          commit('setCount', 0);
        });
      });
    },
    setListApp ({
      commit
    }, {
      moduleId
    }) {
      return new Promise((resolve, reject) => {
        HTTP.appList(moduleId).then(res => {
          if (res.code == 0 && res.page.result && res.page.result.length > 0) {
            let appInstData = res.page.result;
            commit('setListApp', appInstData);
            resolve(appInstData);
          } else {
            reject();
          }
        });
      }).catch(err => {
        commit('setListApp', []);
        commit('setCurrentAppId', '');
        commit('setCurrentAppKey', '');
        commit('setListThead', []);
        commit('setListConfig', {});
        commit('setListTbody', []);
        commit('setCount', 0);
      });
    }
  }
};

export default listview;

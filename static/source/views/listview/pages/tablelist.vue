<template>
<div id="tablelist">
  <div class="g-left">
    <c-tablelist-sidebar :currentId="currentId" @loadList="loadList" @changeTabPaneList="handleTabPaneChange"></c-tablelist-sidebar>
  </div>
  <div class="g-right">
    <div class="custom-tabs">
      <span
        v-for="(item, index) in tabPaneList"
        :key="`${item.appId}-${index}`"
        :class="{
          'custom-tab-pane': true,
          'custom-tab-pane-active': currentId === item.appId && item.mode === curMode
        }"
        @click="handleTabPaneClick(item.type, item.appId, item.appKey, item.appName,
          item.mode, item.rowData,item.curAppRunId,item.index)"
      >
        <Icon
          v-if="tabPaneList.length > 1"
          type="ios-close-empty"
          :size="25"
          class="custom-tab-pane-remove"
          @click.stop="handleTabPaneRemove(item.appId, item.mode)"
        ></Icon>
        <Tooltip :content="item.appName" class="app-tab__tooltip">
          <span
            class="custom-tab-pane-label"
          >{{item.mode === 'add' ? '新增-' : ''}}{{item.appName}}</span>
        </Tooltip>
      </span>
    </div>
    <c-tablelist-table
      v-if="curMode === 'default' && currentType === 'app'"
      ref="tablelist-table"
      :currentId="currentId"
      :isLoading="isLoading"
      @loadList="loadList"
      @openNew="openNew"
      @showInfoLog="openInfoLogTab"
    ></c-tablelist-table>
    <c-tablelist-report
      v-if="curMode === 'default' && currentType === 'report'"
      :reportId="currentId"
      :reportName="currentAppName"
      class="tablelist-report-container"
    ></c-tablelist-report>
    <div
      v-for="addTab in addTabs"
      :key="addTab"
      v-show="curMode === 'add' && currentId === addTab"
      class="open-modal-container open-modal-scroll-container"
    >
      <div class="open-modal-content">
        <openModal :code="addTab" :ref="`new${addTab}`" @close="handleTabPaneRemove(currentId, 'add')"></openModal>
      </div>
    </div>
    <div v-if="curMode.indexOf('info') === 0" class="info-log-container">
      <div class="info-log-content">
        <info-log
          :value="{ row: infoLogData, appId: currentId }"
          @close="handleTabPaneRemove(currentId, curMode)"
        ></info-log>
      </div>
    </div>
     <div v-if="curMode.indexOf('draft') === 0" class="info-log-container">
      <div class="info-log-content draft-modify-modal">
        <modifyModal
          :code="currentId+','+curAppRunId"
          @close="handleTabPaneRemove(currentId, curMode)"
        ></modifyModal>
        <div class="draft-footer">
          <Button type="primary" @click="delegateSubmit">提交</Button>
          <Button type="ghost" @click="delegateSave">暂存</Button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import cTablelistSidebar from "../components/tablelist-sidebar";
import cTablelistTable from "../components/tablelist-table";
import cTablelistReport from "../components/tablelist-report";
import openModal from "@/views/home/openModal.vue";
import infoLog from "@/views/flow-manager/designFlowModal/appInfoLog.vue";
import modifyModal from "@/views/flow-manager/components/modifyModal.vue";
import {
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
import appHTTP from "@/api/app-apply";
import HTTP from "@/api/listview";

export default {
  name: "tablelist",
  components: {
    cTablelistSidebar,
    cTablelistTable,
    cTablelistReport,
    openModal,
    infoLog,
    modifyModal
  },
  data() {
    return {
      currentType: this.$router.currentRoute.params.type,
      currentId: this.$router.currentRoute.params.appId,
      currentAppKey: this.$router.currentRoute.params.appKey,
      currentAppName: this.$router.currentRoute.params.appName,
      currentIndex:0,
      moduleId: this.$router.currentRoute.params.moduleId,
      isLoading: true,
      tabPaneList: [],
      curMode: 'default',
      infoLogData: {},
      curAppRunId:'',
      tablelistHeigh: '100%',
      addTabs: []
    };
  },
  async beforeRouteUpdate(to, from, next) {
    this.moduleId = to.params.moduleId;
    this.currentId = to.params.appId;
    this.currentAppKey = to.params.appKey;
    await this.loadListApp();
    next();
  },
  computed: {
    ...mapGetters("listview", ['getCurrentType', 'getCurrentAppId', 'getCurrentAppKey', 'getCurrentAppName','getCurrentTabIndex'])
  },
  created() {
    console.log(this.$router.currentRoute.params);
    this.setTableListHeigh();
    this.loadListApp();
  },
  methods: {
    ...mapMutations("listview", ['setCurrentType',"setCurrentAppId", 'setCurrentAppKey', 'setCurrentAppName','setCurrentTabIndex','setTabTypeObj','setCurrentTabType']),
    ...mapActions("listview", ["setListSetting", "setListData", "setListApp"]),
    setTableListHeigh() {
      this.tablelistHeigh = `${document.documentElement.offsetHeight - 60}px`;
    },
    loadListApp() {
      this.setListApp({
        moduleId: this.moduleId
      }).then(appInstData => {
        if (appInstData && appInstData.length > 0) {
          if (this.currentId) {
            for (let i = 0, len = appInstData.length; i < len; i += 1) {
              const item = appInstData[i];
              if (item.type === 'group') {
                const group = item.children;
                for (let j = 0; j < group.length; j += 1) {
                  if ((group[j].type === 'app' && group[j].appId === this.currentId) ||
                      (group[j].type === 'report' && group[j].reportId === this.currentId)) {
                    this.setCurrentData(group[j]);
                    break;
                  }
                }
              } else {
                if ((item.type === 'app' && item.appId === this.currentId) ||
                    (item.type === 'report' && item.reportId === this.currentId)) {
                  this.setCurrentData(item);
                  break;
                }
              }
            }
          } else {
            for (let i = 0, len = appInstData.length; i < len; i++) {
              const item = appInstData[i];
              // 分组
              if (item.type === 'group') {
                const group = item.children;
                if (group.length > 0) {
                  this.setCurrentData(group[0]);
                  break;
                }
                // 应用或报表
              } else {
                this.setCurrentData(item);
                break;
              }
            }
          }
        } else {
          this.isLoading = false;
        }
      });
    },
    setCurrentData(item) {
      if (item.type === 'app') {
        this.updateAppMessage({type:item.type, appId:item.appId,appKey: item.appKey,appName: item.appName,currentIndex:item.index});
        this.loadList({
          appId: item.appId,
          refreshHead: true
        });
      } else if (item.type === 'report') {
        this.updateAppMessage({type:item.type,appId: item.reportId,appKey: item.reportId,appName: item.reportName,currentIndex:item.index});
      }
      this.tabPaneList = [{
        type: this.currentType,
        appId: this.currentId,
        appKey: this.currentAppKey,
        appName: this.currentAppName,
        mode: 'default'
      }];
      sessionStorage.setItem("tabAppId",this.currentId);
      this.curMode = 'default';
    },
    loadList({
      appId,
      pageNum = 1,
      pageSize = 10,
      nameSchema,
      startTime,
      endTime,
      queryItem,
      refreshHead = false
    } = {}) {
      this.$refs['tablelist-table'] && this.$refs['tablelist-table'].resetTable();
      this.isLoading = true;
      if (refreshHead) {
        this.setListSetting({
          appId
        });
        this.$refs['tablelist-table'] && this.$refs['tablelist-table'].resetSearchData();
      }
      this.setListData({
        appId,
        pageNum,
        pageSize,
        nameSchema,
        startTime,
        endTime,
        queryItem
      }).then(() => {
        this.isLoading = false;
      })
    },
    handleTabPaneChange(type, appId, appKey, appName) {
      if (appId === this.currentId && this.curMode === 'default') {
        return;
      }
       sessionStorage.setItem("tabAppId",appId);
      if (this.tabPaneList.every((item) => item.appId !== appId || item.mode !== 'default')) {
        var indexNew  = this.generateTabIndex();
        this.tabPaneList.push({ type, appId, appKey, appName, mode: 'default',currentIndex:indexNew});
      }
      if(type === 'app'){
        this.loadList({ appId, refreshHead:true });
      }
      this.updateAppMessage({type, appId, appKey, appName});
      this.curMode = '';
      this.$nextTick(() => {
        this.curMode = 'default';
      });
    },
    handleTabPaneClick(type, appId, appKey, appName, mode, rowData,curAppRunId,index) {
      if (appId === this.currentId && this.curMode === mode) {
        return;
      }
     
      sessionStorage.setItem("tabAppId",appId);
      this.updateAppMessage({type, appId, appKey, appName,curAppRunId,currentIndex:index});
      if (mode === 'default' && type === 'app') this.loadList({ appId, refreshHead:true });
      if (mode.indexOf('info') === 0) this.infoLogData = rowData;
      if (mode.indexOf('draft') === 0) this.infoLogData = rowData;
      
      this.curMode = '';
      this.$nextTick(() => {
        this.curMode = mode;
      });
    },
   
    handleTabPaneRemove(appId, mode) {
      let curIndex;
      this.tabPaneList = this.tabPaneList.filter((item, index) => {
        if (item.appId === appId && item.mode === mode) curIndex = index;
        return item.appId !== appId || item.mode !== mode;
      });
      if (mode === 'add') this.addTabs = this.addTabs.filter(item => item !== appId);
      if (curIndex - 1 >= 0) curIndex = curIndex - 1;
      const curPane = this.tabPaneList[curIndex];
      if (this.currentId === appId && this.curMode === mode && curPane) {
        this.updateAppMessage({type:curPane.type,appId:curPane.appId,appKey: curPane.appKey, appName:curPane.appName,currentIndex:curPane.index});
        if (curPane.mode === 'default' && curPane.type === 'app') {
          this.loadList({ appId: curPane.appId, refreshHead:true });
          sessionStorage.setItem("tabAppId",curPane.appId);
        }
        if (curPane.mode.indexOf('info') === 0) this.infoLogData = curPane.rowData;
        if (curPane.mode.indexOf('draft') === 0) this.curAppRunId = curPane.curAppRunId;
        this.curMode = '';
        this.$nextTick(() => {
          this.curMode = curPane.mode;
        });
      }
    },
    changeTabType(){
      let tabTypeObj =this.$store.state.listview.tabTypeObj
      let index = this.$store.state.listview.currentTabIndex

      if(tabTypeObj[index]&&tabTypeObj[index]=="modify"){
        this.setCurrentTabType('modify')
      }
      else{
        this.setCurrentTabType('new')
      }
    },
    openNew() {
      var that =this
      if (this.tabPaneList.some((item) => {if(item.appId === this.currentId && item.mode === 'add'){
         that.currentIndex = item.index
         return true;
      }})) {
        this.$refs['new'+this.currentId][0].init();
        this.updateAppMessage({type:this.currentType,appId: this.currentId,appKey: this.currentAppKey, appName:this.currentAppName,currentIndex:this.currentIndex});
      } else {
        var indexNew = this.generateTabIndex();
        this.tabPaneList.push({
          type: this.currentType,
          appId: this.currentId,
          appName: this.currentAppName,
          appKey: this.currentAppKey,
          mode: 'add',
          index: indexNew,
        });
        this.currentIndex = indexNew
        this.setCurrentTabIndex(indexNew);
        this.addTabs.push(this.currentId);
        this.changeTabType();
      }
     
      this.curMode = 'add';
    },
    generateTabIndex(){
      if(this.tabPaneList.length>0){
        var max=0;
         for(var i=0;i<this.tabPaneList.length;i++){
            if(this.tabPaneList[i].index>max){
              max=this.tabPaneList[i].index;
            }
         }
         return max+1;
      }
      else{
        return 0;
      }

    },
    updateAppMessage(item) {
      this.currentType = item.type;
      this.currentId = item.appId;
      this.currentAppName = item.appName;
      this.currentAppKey = item.appKey;
      this.curAppRunId =item.curAppRunId;
      this.currentIndex=item.currentIndex;
      this.setCurrentTabIndex(item.currentIndex);
      this.setCurrentType(item.type);
      this.setCurrentAppId(item.appId);
      this.setCurrentAppKey(item.appKey);
      this.setCurrentAppName(item.appName);
      this.changeTabType();
    },
    openInfoLogTab(params) {
      const logModeStr = `info-${params.index}`;
      const draftModeStr = `draft-${params.index}`;

      if (this.tabPaneList.some((item) => {if(item.appId === this.currentId &&
        item.mode === logModeStr){
          this.currentIndex = item.index
          return true;
        }})) {
        this.updateAppMessage({type:this.currentType,appId: this.currentId,appName: this.currentAppName,appKey: this.currentAppKey,currentIndex:this.currentIndex});
        this.infoLogData = params.rowData;
        this.curMode = logModeStr;       
      } else if (this.tabPaneList.some((item) => {if(item.appId === this.currentId &&
        item.mode === draftModeStr){
          this.currentIndex = item.index
          return true;
        }})) {
        this.updateAppMessage({type:this.currentType,appId: this.currentId,appName: this.currentAppName,appKey: this.currentAppKey,currentIndex:this.currentIndex});
        this.curAppRunId = params.rowData.AppRunId;
        this.curMode = draftModeStr;
      } else {
        if (params.rowData.Status === 1) {
          var indexNew = this.generateTabIndex();
          this.tabPaneList.push({
              type: 'draft',
              appId: this.currentId,
              appName: `表单信息(${this.currentAppName})[${params.index + 1}](${params.rowData[params.field]})`,
              appKey: this.currentAppKey,
              mode: draftModeStr,
              rowData: params.rowData,
              curAppRunId:params.rowData.AppRunId,
              index:this.generateTabIndex(),
            });
            this.setCurrentTabIndex(indexNew);
            this.curAppRunId = params.rowData.AppRunId;
            this.curMode = draftModeStr;
        } else {
          var indexNew =this.generateTabIndex()
          this.tabPaneList.push({
            type: 'infoLog',
            appId: this.currentId,
            appName: `表单信息(${this.currentAppName})[${params.index + 1}](${params.rowData[params.field]})`,
            appKey: this.currentAppKey,
            mode: logModeStr,
            rowData: params.rowData,
            index:indexNew,
          });
          this.setCurrentTabIndex(indexNew);
          this.infoLogData = params.rowData;
          this.curMode = logModeStr;
        }
      }
    },
    delegateSubmit() {
      document.querySelector('[data-action=Submit]').click();
    },
    delegateSave() {
      document.querySelector('[data-action=Save]').click();
    }
  }
};
</script>

<style lang="less" scoped>
#tablelist {
  position: absolute;
  top: 0;
  left: 0;
  padding: 70px 10px 0 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .g-left {
    float: left;
    width: 240px;
    height: 100%;
  }
  .g-right {
    height: 100%;
    margin-left: 250px;
    position: relative;
  }
}
.custom-tabs {
  box-sizing: content-box !important;
  min-height: 35px;
  background-color: #f2f2f2;
  padding: 15px 20px 0px;
  margin-bottom: 5px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  .custom-tab-pane {
    display: inline-block;
    padding: 5px 10px 6px;
    cursor: pointer;
    box-sizing: border-box;

    &-active {
      background-color: #fff;
      border-top: 2px solid #1f01ff;
    }

    &-label {
      max-width: 150px;
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &-remove {
      font-weight: bold;
      color: #afafaf;
      transition: all 0.3s;

      &:hover {
        color: #ed3f14;
      }
    }
  }
}

.open-modal-container {
  width: 100%;
  height: 100%;
  position: relative;
   overflow: auto;
  //overflow: hidden;
  z-index:0;
  & .open-modal-content {
    position: absolute;
    width: 100%;
    // margin-bottom: 270px;
    margin-bottom: 330px;
  }
}

.info-log-container {
  width: 100%;
  height: calc(~'100% - 60px');
  position: relative;
  overflow: auto;

  & .info-log-content {
    height: 100%;
  }
}

.draft-footer {
  text-align: center;
  margin-bottom: 200px;
}

.tablelist-report-container {
  height: calc(~'100% - 60px');
  overflow: auto;
  background-color: #eef1f5;
  padding: 1%;
}
</style>

<style>
.draft-modify-modal #navbar {
  display: none;
}

.app-tab__tooltip .ivu-tooltip-inner {
  max-width: none;
}
</style>

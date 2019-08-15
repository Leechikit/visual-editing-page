<template lang="html">
  <div>
    <div class="my-work-sidebar">
      <p
        :class="{'my-work-sidebar-content': !currentType}"
        @click="viewDetail(workType.all.name)"
      >
        <Icon v-if="!currentType" :size="18" type="document-text"></Icon>
        <Icon v-else :size="18" type="document"></Icon>
        <span>{{workType.all.name}}（{{taskCount.totalTaskCount}}）</span>
      </p>
      <p
        :class="{'my-work-sidebar-content': currentType === workType.handle.type}"
        @click="viewDetail(workType.handle.name, workType.handle.type)"
      >
        <Icon v-if="currentType === workType.handle.type" :size="18" type="document-text"></Icon>
        <Icon v-else :size="18" type="document"></Icon>
        <span>{{workType.handle.name}}（{{taskCount.fillTaskCount}}）</span>
      </p>
      <p
        :class="{'my-work-sidebar-content': currentType === workType.approval.type}"
        @click="viewDetail(workType.approval.name, workType.approval.type)"
      >
        <Icon v-if="currentType === workType.approval.type" :size="18" type="document-text"></Icon>
        <Icon v-else :size="18" type="document"></Icon>
        <span>{{workType.approval.name}}（{{taskCount.toVerifyTaskCount}}）</span>
      </p>
      <p
        :class="{'my-work-sidebar-content': currentType === workType.send.type}"
        @click="viewDetail(workType.send.name, workType.send.type)"
      >
        <Icon v-if="currentType === workType.send.type" :size="18" type="document-text"></Icon>
        <Icon v-else :size="18" type="document"></Icon>
        <span>{{workType.send.name}}（{{taskCount.ccTaskCount}}）</span>
      </p>
      <p
        :class="{'my-work-sidebar-content': currentType === workType.other.type}"
        @click="viewDetail(workType.other.name, workType.other.type)"
      >
        <Icon v-if="currentType === workType.other.type" :size="18" type="document-text"></Icon>
        <Icon v-else :size="18" type="document"></Icon>
        <span>{{workType.other.name}}（{{taskCount.otherTaskCount}}）</span>
      </p>
      <p
        :class="{'my-work-sidebar-content': currentType === workType.submit.type}"
        @click="viewDetail(workType.submit.name, workType.submit.type)"
      >
        <Icon v-if="currentType === workType.submit.type" :size="18" type="document-text"></Icon>
        <Icon v-else :size="18" type="document"></Icon>
        <span>{{workType.submit.name}}</span>
      </p>
      <p
        :class="{'my-work-sidebar-content': currentType === workType.done.type}"
        @click="viewDetail(workType.done.name, workType.done.type)"
      >
        <Icon v-if="currentType === workType.done.type" :size="18" type="document-text"></Icon>
        <Icon v-else :size="18" type="document"></Icon>
        <span>{{workType.done.name}}</span>
      </p>
    </div>
    <div class="my-work-container">
      <div class="custom-tabs">
        <span
          v-for="(item, index) in tabPaneList"
          :key="`${item.name}-${index}`"
          class="custom-tab-pane"
          :class="{ 'custom-tab-pane-active': item.type === currentType && item.mode.str === currentMode }"
          @click="handleTabPaneClick(item.type, item.mode)"
        >
          <Icon
            v-if="index > 0"
            type="ios-close-empty"
            :size="22"
            class="custom-tab-pane-remove"
            @click.stop="handleTabPaneRemove(item.type, item.mode.str)"
          ></Icon>
          <span
            :title="item.name"
            class="custom-tab-pane-label"
          >{{item.name}}</span>
        </span>
      </div>
      <div class="my-work-content open-modal-scroll-container">
        <self-submit
          v-if="currentType === workType.submit.type"
          ref="selfSubmit"
          :viewType="viewType"
          @showModal="showWorkModal"
          @close="() => {
            if (currentMode !== 'default') {
              handleTabPaneRemove(currentType, currentMode);
            }
            getTaskCount();
          }"
        ></self-submit>
        <finish-work
          v-else-if="currentType === workType.done.type"
          ref="finishWork"
          :viewType="viewType"
          @showModal="showWorkModal"
          @close="() => {
            if (currentMode !== 'default') {
              handleTabPaneRemove(currentType, currentMode);
            }
            getTaskCount();
          }"
        ></finish-work>
        <unfinish-job
          v-else
          ref="unfinishJob"
          :viewType="viewType"
          @showModal="showWorkModal"
          @close="() => {
            if (currentMode !== 'default') {
              handleTabPaneRemove(currentType, currentMode);
            }
            getTaskCount();
          }"
        ></unfinish-job>
      </div>
    </div>
  </div>
</template>

<script>
import UnfinishJob from './unfinish-job';
import SelfSubmit from './self-submit';
import FinishWork from './finish-work';
import HTTP_APP from '../../api/app-apply.js';
import {
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
export default {
  name: 'MyWork',
  components: {
    UnfinishJob,
    SelfSubmit,
    FinishWork
  },
  data () {
    return {
      currentIndex : '',
      workType: {
        all: {
          type: undefined,
          name: '全部通知'
        },
        todo: {
          type: '1',
          name: '待办事项'
        },
        handle: {
          type: '4',
          name: '经办'
        },
        approval: {
          type: '2',
          name: '审批'
        },
        send: {
          type: '3',
          name: '抄送'
        },
        other: {
          type: '5',
          name: '其他'
        },
        submit: {
          type: '6',
          name: '已发起'
        },
        done: {
          type: '7',
          name: '已办理'
        }
      },
      taskCount: {
        totalTaskCount: '-',
        fillTaskCount: '-',
        toVerifyTaskCount: '-',
        ccTaskCount: '-',
        otherTaskCount: ''
      },
      // TabPanes
      tabPaneList: [],
      // 工作类型：全部通知undefined、待办1、审批2。。。
      currentType: undefined,
      // 显示 unfinish-job.vue 页面不同部分
      viewType: 'listdata',
      // 区分同一工作类型的不同 Tab
      currentMode: 'default'
    };
  },
  mounted () {
    if (!this.getAllWorkTypes().includes(this.$route.query.type)) {
      this.$router.push({
        name: 'my-work',
        query: {}
      });
      return;
    }

    this.tabPaneList = [{
      name: '全部通知',
      type: undefined,
      mode: { str: 'default' }
    }];
    if (this.$route.query.type !== undefined) {
      var indexNew = this.generateTabIndex();
      this.setCurrentTabIndex(indexNew);
      this.currentIndex = indexNew,
      this.tabPaneList.push({
        name: this.findNameByType(this.$route.query.type),
        type: this.$route.query.type,
        mode: { str: 'default' },
        index:indexNew
      });
    }
    this.currentType = this.$route.query.type;

    this.getTaskCount();
  },
  methods: {
     ...mapMutations("listview", ['setCurrentType',"setCurrentAppId", 'setCurrentAppKey', 'setCurrentAppName','setCurrentTabIndex']),
    getAllWorkTypes () {
      const types = [];
      for (let p in this.workType) {
        types.push(this.workType[p].type);
      }
      return types;
    },
    findNameByType (type) {
      for (let p in this.workType) {
        if (this.workType[p].type === type) return this.workType[p].name;
      }
    },
    viewDetail (name, type) {
      if (this.tabPaneList.every(item => item.type !== type || item.mode.str !== 'default')) {
        var indexNew = this.generateTabIndex();
        this.currentIndex=indexNew
        this.tabPaneList.push({
          name,
          type,
          mode: { str: 'default' },
          index:indexNew
        });
        this.setCurrentTabIndex(indexNew);
      }

      this.viewType = 'listdata';
      this.currentMode = 'default';
      if (this.currentType === type) {
        if (type === this.workType.done.type) {
          this.$refs.finishWork.getFinishJobList();
        } else if (type === this.workType.submit.type) {
          this.$refs.selfSubmit.getFinishJobList();
        } else {
          this.$refs.unfinishJob.getUnFinishJobList();
        }
      }

      this.currentType = type;

      this.$router.push({
        name: 'my-work',
        query: { type }
      });
    },
    getTaskCount () {
      HTTP_APP.myUpcomingCount().then((data) => {
        this.taskCount = data;
      });
    },
    handleTabPaneClick (type, mode) {
      
      if (this.currentType === type && this.currentMode === mode.str) return;
      this.currentType = type;
      this.currentMode = mode.str;
      if (mode.str === 'default') {
        this.viewType = 'listdata';
        this.$router.push({
          name: 'my-work',
          query: { type }
        });
      } else {
       
        if (mode.page === 'unfinish-job') {
          this.viewType = '';
          this.$nextTick(() => {
            this.viewType = mode.viewType;
          
            this.$refs.unfinishJob.dealTask(mode.data);
          });
        } else if (mode.page === 'self-submit') {
          this.viewType = '';
          this.$nextTick(() => {
            this.viewType = mode.viewType;
            this.$refs.selfSubmit.openLogModal(mode.data);
          });
        } else if (mode.page === 'finish-work') {
          this.viewType = '';
          this.$nextTick(() => {
            this.viewType = mode.viewType;
            this.$refs.finishWork.openLogModal(mode.data);
          });
        }
      }
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
    handleTabPaneRemove (type, modeStr) {      
      let curIndex = 0;
      this.tabPaneList = this.tabPaneList.filter((item, index) => {
        if (item.type === type && item.mode.str === modeStr) curIndex = index;
        return item.type !== type || item.mode.str !== modeStr;
      });
      if (curIndex - 1 >= 0) curIndex = curIndex - 1;
      if (this.currentType === type && this.currentMode === modeStr) {
        const theMode = this.tabPaneList[curIndex].mode;
        this.currentType = this.tabPaneList[curIndex].type;
        this.currentMode = theMode.str;
        if (theMode.str === 'default') {
          this.viewType = 'listdata';
          this.$router.push({
            name: 'my-work',
            query: { type: this.currentType }
          });
        } else {
          if (theMode.page === 'unfinish-job') {
            this.viewType = '';
            this.$nextTick(() => {
              this.viewType = theMode.viewType;
              this.$refs.unfinishJob.dealTask(theMode.data, theMode.index);
            });
          } else if (theMode.page === 'self-submit') {
            this.viewType = '';
            this.$nextTick(() => {
              this.viewType = theMode.viewType;
              this.$refs.selfSubmit.openLogModal(theMode.data);
            });
          } else if (theMode.page === 'finish-work') {
            this.viewType = '';
            this.$nextTick(() => {
              this.viewType = theMode.viewType;
              this.$refs.finishWork.openLogModal(theMode.data);
            });
          }
        }
      }
    },
    showWorkModal (param) {
      const modeStr = `${this.currentType}-${param.type}-${param.index}`;
      this.currentMode = modeStr;
      if (this.tabPaneList.every(item => item.mode.str !== modeStr)) {
        this.viewType = param.type;
        var indexNew = this.generateTabIndex();
        this.setCurrentTabIndex(indexNew);
        this.currentIndex = indexNew,
        this.tabPaneList.push({
          name: `办理(${this.formateDate(param.index)})`,
          type: this.currentType,
          mode: {
            str: modeStr,
            viewType: param.type,
            index: param.index,
            data: param.data,
            page: param.page,
            index:indexNew
          }
        });
      } else {
        this.viewType = '';
        this.$nextTick(() => {
          this.viewType = param.type;
        });
      }
    },
    formateDate (datetime) {
      const date = new Date(datetime);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}-${date.getHours()}:${date.getMinutes()}`;
    }
  },
  watch: {
    '$route.query.type': function (val) {
      if (!this.getAllWorkTypes().includes(val)) {
        this.$router.push({
          name: 'my-work',
          query: {}
        });
      }

      if (this.tabPaneList.every(item => item.type !== val)) {
        var indexNew = this.generateTabIndex();
        this.setCurrentTabIndex(indexNew);
        this.currentIndex=indexNew
        this.tabPaneList.push({
          name: this.findNameByType(val),
          type: val,
          index:indexNew,
          mode: {
            str: 'default'
          }
        });
      }

      this.viewType = 'listdata';
      this.currentMode = 'default';
      this.currentType = val;
    }
  }
};
</script>

<style scoped>
.my-work-sidebar {
  width: 200px;
  height: calc(100vh - 60px);
  border-right: 1px solid #e4e3e3;
  float: left;
  overflow: auto;
  padding: 20px;
}

.my-work-sidebar > p {
  margin-top: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}

.my-work-sidebar > p:nth-child(2),
.my-work-sidebar > p:nth-child(3),
.my-work-sidebar > p:nth-child(4),
.my-work-sidebar > p:nth-child(5) {
  margin-left: 30px;
}

.my-work-sidebar-content {
  color: #2733ff;
}

.my-work-sidebar > p > span {
  margin-left: 5px;
  position: relative;
  bottom: 2px;
}

.my-work-container {

}

.my-work-content {
  height: calc(100vh - 120px);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 20px 20px 200px 20px;
}
</style>

<style>
.my-work-content .print-btn {
  left: calc(50% + 280px);
  bottom: 10px;
}
</style>

<style lang="less" scoped>
.custom-tabs {
  box-sizing: content-box !important;
  min-height: 35px;
  background-color: #f2f2f2;
  padding: 10px 15px 0px;
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
      margin-left: 2px;
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
</style>

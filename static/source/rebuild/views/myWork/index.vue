<template>
  <div class="demo1">
    <Nav opacity="1"></Nav>
    <div class="g-container">
      <div class="g-aside u-bd-right">
        <div class="g-container-column">
          <div class="g-header u-bd-bottom">
            <PageTitle text="我的工作"></PageTitle>
          </div>
          <div class="g-main u-pd-20-30">
            <Tree
              :data="treeData"
              :defaultExpandAll="true"
              :currentNodeKey="currentType"
              nodeSize="large"
              :nodeClick="viewDetail"
              class="work-tree"
            ></Tree>
          </div>
        </div>
      </div>
      <div class="g-main">
        <div class="g-container-column">
          <div class="g-header">
            <div class="c-tabnav">
              <Tabnav
                ref="tabNav"
                @selectTab="selectTab"
                @deleteTab="deleteTab"
              ></Tabnav>
            </div>
          </div>
          <div class="my-work-content open-modal-scroll-container">
            <self-submit
              v-if="currentType === workType.submit.type"
              ref="selfSubmit"
              :viewType="viewType"
              @showModal="showWorkModal"
              @close="
                () => {
                  if (currentMode !== 'default') {
                    handleTabRemove()
                  }
                  getTaskCount()
                }
              "
            ></self-submit>
            <finish-work
              v-else-if="currentType === workType.done.type"
              ref="finishWork"
              :viewType="viewType"
              @showModal="showWorkModal"
              @close="
                () => {
                  if (currentMode !== 'default') {
                    handleTabRemove()
                  }
                  getTaskCount()
                }
              "
            ></finish-work>
            <unfinish-job
              v-else
              ref="unfinishJob"
              :viewType="viewType"
              @showModal="showWorkModal"
              @close="
                () => {
                  if (currentMode !== 'default') {
                    handleTabRemove()
                  }
                  getTaskCount()
                }
              "
            ></unfinish-job>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import PageTitle from '@/rebuild/components/pageTitle'
import Nav from '@/rebuild/components/nav'
import Tabnav from '@/rebuild/components/tabNav'
import UnfinishJob from './components/unfinish-job'
import SelfSubmit from './components/self-submit'
import FinishWork from './components/finish-work'
import Tree from '@/rebuild/components/tree'
import HTTP_APP from '@/api/app-apply.js'

import '@/views/role/BaseControl.js'
import '@/views/role/ControlManager.js'
import '@/views/role/SmartForm.js'
import '@/views/role/FormControls.js'
import '@/views/role/FormMultiUser.js'

export default {
  name: 'MyWork',
  components: {
    Nav,
    Tabnav,
    PageTitle,
    UnfinishJob,
    SelfSubmit,
    FinishWork,
    Tree
  },
  data() {
    return {
      currentIndex: '',
      workType: {
        all: { type: '0', name: '全部通知' },
        todo: { type: '1', name: '待办事项' },
        approval: { type: '2', name: '审批' },
        send: { type: '3', name: '抄送' },
        handle: { type: '4', name: '经办' },
        other: { type: '5', name: '其他' },
        submit: { type: '6', name: '已发起' },
        done: { type: '7', name: '已办理' }
      },
      taskCount: {
        totalTaskCount: '',
        fillTaskCount: '',
        toVerifyTaskCount: '',
        ccTaskCount: '',
        otherTaskCount: ''
      },
      // TabPanes
      tabPaneList: [],
      // 工作类型：全部通知0、待办1、审批2。。。
      currentType: '',
      // 显示 unfinish-job.vue 页面不同部分
      viewType: 'listdata',
      // 区分同一工作类型的不同 Tab
      currentMode: 'default',
      curTabId: ''
    }
  },
  computed: {
    allWorkTypes() {
      return {
        [this.workType.all.type]: this.workType.all.name,
        [this.workType.todo.type]: this.workType.todo.name,
        [this.workType.approval.type]: this.workType.approval.name,
        [this.workType.send.type]: this.workType.send.name,
        [this.workType.handle.type]: this.workType.handle.name,
        [this.workType.other.type]: this.workType.other.name,
        [this.workType.submit.type]: this.workType.submit.name,
        [this.workType.done.type]: this.workType.done.name
      }
    },
    treeData() {
      return [
        {
          id: this.workType.all.type,
          label: this.workType.all.name,
          value: this.taskCount.totalTaskCount,
          icon: 'iconwendang',
          children: [
            {
              id: this.workType.handle.type,
              label: this.workType.handle.name,
              value: this.taskCount.fillTaskCount,
              icon: 'iconchuangjian'
            },
            {
              id: this.workType.approval.type,
              label: this.workType.approval.name,
              value: this.taskCount.toVerifyTaskCount,
              icon: 'iconyichuli'
            },
            {
              id: this.workType.send.type,
              label: this.workType.send.name,
              value: this.taskCount.ccTaskCount,
              icon: 'icondaochu'
            },
            {
              id: this.workType.other.type,
              label: this.workType.other.name,
              value: this.taskCount.otherTaskCount,
              icon: 'iconrizhi'
            }
          ]
        },
        {
          id: this.workType.submit.type,
          label: this.workType.submit.name,
          icon: 'iconwendang'
        },
        {
          id: this.workType.done.type,
          label: this.workType.done.name,
          icon: 'iconwendang'
        }
      ]
    }
  },
  mounted() {
    let type = this.$route.query.type || this.workType.all.type

    this.tabPaneList = [
      {
        name: this.allWorkTypes[this.workType.all.type],
        type: this.workType.all.type,
        mode: { str: 'default' }
      }
    ]
    if (type !== this.workType.all.type) {
      var indexNew = this.generateTabIndex()
      this.setCurrentTabIndex(indexNew)
      this.currentIndex = indexNew
      this.tabPaneList.push({
        name: this.allWorkTypes[type],
        type,
        mode: { str: 'default' },
        index: indexNew
      })
    }
    this.currentType = type

    this.$refs.tabNav.changeTab({
      tabId: this.allWorkTypes[type],
      tabName: this.allWorkTypes[type],
      params: {
        name: this.allWorkTypes[type],
        type,
        mode: { str: 'default' },
        index: indexNew
      }
    })
    this.curTabId = this.allWorkTypes[type]

    this.getTaskCount()
  },
  methods: {
    ...mapMutations('listview', ['setCurrentTabIndex']),
    viewDetail({ label: name, id: type }) {
      if (
        this.tabPaneList.every(
          item => item.type !== type || item.mode.str !== 'default'
        )
      ) {
        var indexNew = this.generateTabIndex()
        this.currentIndex = indexNew
        this.tabPaneList.push({
          name,
          type,
          mode: { str: 'default' },
          index: indexNew
        })
        this.setCurrentTabIndex(indexNew)
      }

      this.viewType = 'listdata'
      this.currentMode = 'default'
      if (this.currentType === type) {
        if (type === this.workType.done.type) {
          this.$refs.finishWork.resetSearch()
          this.$refs.finishWork.getFinishJobList()
        } else if (type === this.workType.submit.type) {
          this.$refs.selfSubmit.resetSearch()
          this.$refs.selfSubmit.getFinishJobList()
        } else {
          this.$refs.unfinishJob.resetSearch()
          this.$refs.unfinishJob.getUnFinishJobList()
        }
      }

      this.currentType = type

      this.$refs.tabNav.changeTab({
        tabId: name,
        tabName: name,
        params: {
          name,
          type,
          mode: { str: 'default' },
          index: indexNew
        }
      })
      this.curTabId = name

      this.$router.push({
        name: 'my-work',
        query: { type }
      })
    },
    getTaskCount() {
      HTTP_APP.myUpcomingCount().then(data => {
        this.taskCount = data
      })
    },
    handleTabPaneClick(type, mode) {
      if (this.currentType === type && this.currentMode === mode.str) return
      this.currentType = type
      this.currentMode = mode.str
      if (mode.str === 'default') {
        this.viewType = 'listdata'
        this.$router.push({
          name: 'my-work',
          query: { type }
        })
      } else {
        if (mode.page === 'unfinish-job') {
          this.viewType = ''
          this.$nextTick(() => {
            this.viewType = mode.viewType

            this.$refs.unfinishJob.dealTask(mode.data)
          })
        } else if (mode.page === 'self-submit') {
          this.viewType = ''
          this.$nextTick(() => {
            this.viewType = mode.viewType
            this.$refs.selfSubmit.openLogModal(mode.data)
          })
        } else if (mode.page === 'finish-work') {
          this.viewType = ''
          this.$nextTick(() => {
            this.viewType = mode.viewType
            this.$refs.finishWork.openLogModal(mode.data)
          })
        }
      }
    },
    generateTabIndex() {
      if (this.tabPaneList.length > 0) {
        var max = 0
        for (var i = 0; i < this.tabPaneList.length; i++) {
          if (this.tabPaneList[i].index > max) {
            max = this.tabPaneList[i].index
          }
        }
        return max + 1
      } else {
        return 0
      }
    },
    showWorkModal(param) {
      const modeStr = `${this.currentType}-${param.type}-${param.index}`
      this.currentMode = modeStr
      if (this.tabPaneList.every(item => item.mode.str !== modeStr)) {
        this.viewType = param.type
        var indexNew = this.generateTabIndex()
        this.setCurrentTabIndex(indexNew)
        this.currentIndex = indexNew
        this.tabPaneList.push({
          name: `办理(${this.formateDate(param.index)})`,
          type: this.currentType,
          mode: {
            str: modeStr,
            viewType: param.type,
            data: param.data,
            page: param.page,
            index: indexNew
          }
        })
      } else {
        this.viewType = ''
        this.$nextTick(() => {
          this.viewType = param.type
        })
      }
      this.$refs.tabNav.changeTab({
        tabId: modeStr,
        tabName: `办理(${this.formateDate(param.index)})`,
        params: {
          name: `办理(${this.formateDate(param.index)})`,
          type: this.currentType,
          mode: {
            str: modeStr,
            viewType: param.type,
            data: param.data,
            page: param.page,
            index: indexNew
          }
        }
      })
      this.curTabId = modeStr
    },
    formateDate(datetime) {
      const date = new Date(datetime)
      return `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}-${date.getHours()}:${date.getMinutes()}`
    },
    handleTabRemove() {
      this.$refs.tabNav.deleteTab({ delTabId: this.curTabId })
    },
    // 切换导航标签回调
    selectTab({ tabId, params }) {
      this.handleTabPaneClick(params.type, params.mode)
      this.curTabId = tabId
    },
    // 删除导航标签回调
    deleteTab(_, { tabId, params }) {
      this.handleTabPaneClick(params.type, params.mode)
      this.curTabId = tabId
    }
  },
  watch: {
    '$route.query.type': function(val = this.workType.all.type) {
      if (this.tabPaneList.every(item => item.type !== val)) {
        var indexNew = this.generateTabIndex()
        this.setCurrentTabIndex(indexNew)
        this.currentIndex = indexNew
        this.tabPaneList.push({
          name: this.allWorkTypes[val],
          type: val,
          index: indexNew,
          mode: {
            str: 'default'
          }
        })
      }

      this.$refs.tabNav.changeTab({
        tabId: this.allWorkTypes[val],
        tabName: this.allWorkTypes[val],
        params: {
          name: this.allWorkTypes[val],
          type: val,
          index: indexNew,
          mode: {
            str: 'default'
          }
        }
      })
      this.curTabId = this.allWorkTypes[val]

      this.viewType = 'listdata'
      this.currentMode = 'default'
      this.currentType = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/rebuild/assets/style/layout.scss';

.demo1 {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  .u-bd-bottom {
    border-bottom: 1px solid $color-layout-border;
  }
  .u-bd-right {
    border-right: 1px solid $color-layout-border;
  }
  .u-pd-20-20 {
    padding: 20px 20px;
  }
  .u-pd-20-30 {
    padding: 20px 30px;
  }
  .c-tabnav {
    padding: 9px 10px 0;
    border-bottom: 1px solid $color-layout-border;
    background-color: #f5f5f5;
  }
}

.g-container {
  flex: 1;
  overflow: hidden;
}

.my-work-content {
  overflow: hidden;
  flex: 1;
}
</style>

<style lang="scss">
.my-work-content {
  color: $color-normal;
  font-size: $font-size-main;
}
</style>

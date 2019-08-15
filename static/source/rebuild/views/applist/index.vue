<template>
  <div class="appList">
    <Nav opacity="1" display="none"></Nav>
    <div class="g-container" v-loading="loading">
      <div class="g-aside u-bd-right">
        <div class="g-container-column">
          <div class="g-header u-bd-bottom">
            <PageTitle text="应用列表"></PageTitle>
          </div>
          <div class="g-main u-pd-20-30">
            <ApplistSidebar
              ref="applistSidebar"
              :moduleName="moduleName"
              :appList="appList"
              @open="openApp"
            ></ApplistSidebar>
          </div>
        </div>
      </div>
      <div class="g-main">
        <div class="g-container-column">
          <div class="g-header">
            <div class="c-tabnav">
              <Tabnav
                ref="applistNav"
                @selectTab="selectTabHandle"
                @deleteTab="deleteTabHandle"
              ></Tabnav>
            </div>
          </div>
          <div class="g-main u-pd-20-20" id="scrollContent">
            <component
              :is="curFormComponent"
              :type="config.type"
              :appId="config.appId"
              :appName="config.appName"
              :formId="config.formId"
              :value="config.value"
              :code="config.code"
              :reportId="config.reportId"
              :reportName="config.reportName"
              :permissionList="permissionList"
              @openDisplayForm="openDisplayForm"
              @openDraftForm="openDraftForm"
              @createForm="createForm"
              @dealForm="dealForm"
              @changeConfigType="changeConfigType"
            ></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HTTP_APP from '@/rebuild/api/app'
import HTTP_USER from '@/rebuild/api/user'
import PageTitle from '@/rebuild/components/pageTitle'
import ApplistSidebar from './components/applist-sidebar'
import Nav from '@/rebuild/components/nav'
import Tabnav from '@/rebuild/components/tabNav'
import FormList from './components/form-list'
import ReportList from '@/views/listview/components/tablelist-report'
import AppInfoLog from '@/views/flow-manager/designFlowModal/appInfoLog-rebuild'
import OpenModal from '@/views/home/openModal-rebuild'
import ModifyModal from '@/views/flow-manager/components/modifyModal-draft-rebuild'
import { mapState, mapMutations } from 'vuex'
let forms = require.context('../../components/forms', true, /form-.*\.vue$/)
let components = {}
forms.keys().forEach(key => {
  let form = forms(key)
  components[form.default.name] = form.default
})
export default {
  name: 'appList',
  components: {
    Nav,
    Tabnav,
    PageTitle,
    ApplistSidebar,
    FormList,
    ReportList,
    AppInfoLog,
    OpenModal,
    ModifyModal,
    ...components
  },
  data() {
    return {
      loading: false,
      appList: [],
      curFormComponent: null,
      moduleName: '',
      moduleId: this.$route.query.moduleId,
      appId: this.$route.query.appId,
      permissionList: [], // 应用权限
      config: {
        type: '', // 组件里的分类
        appId: '', // 应用id
        appName: '', // 应用名称
        formId: '', // 表单id
        value: '', // appInfoLog旧表单参数
        code: '', // openModal旧表单参数
        reportId: '', // tablelist-report报表旧参数
        reportName: '' // tablelist-report报表旧参数
      }
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // 跳转到不同模块更新应用列表
    if (this.moduleId !== to.query.moduleId) {
      this.resetData()
      this.moduleId = to.query.moduleId
      this.appId = to.query.appId
      // 清空标签
      this.$refs.applistNav.emptyTab()
      // 清空数据
      this.appList = []
      await this.getAppList()
    }

    next()
  },
  computed: {
    ...mapState(['controls'])
  },
  created() {
    this.getAppList()
  },
  methods: {
    // 重置数据
    resetData() {
      this.loading = false
      this.appList = []
      this.curFormComponent = null
      this.moduleName = ''
      this.moduleId = ''
      this.appId = ''
      this.permissionList = []
      this.resetConfig()
    },
    // 重置组件数据
    resetConfig() {
      this.config.type = ''
      this.config.appId = ''
      this.config.appName = ''
      this.config.formId = ''
      this.config.value = ''
      this.config.code = ''
      this.config.reportId = ''
      this.config.reportName = ''
    },
    async getAppList() {
      this.loading = true
      let result = await HTTP_APP.listApp({ moduleId: this.moduleId })
      if (result.code === '0') {
        result.page.result.forEach(app => {
          app.isDisplayChildren = false
        })
        await this.formatList(result.page.result)
        await this.seActiveApp()
      } else {
        this.$message({
          message: result.msg,
          type: 'error'
        })
      }
      this.loading = false
    },
    // 获取权限
    async getPermissions(appId) {
      let result = await HTTP_USER.getPermissions({
        appId
      })
      if (+result.code === 0) {
        this.permissionList = result.actions
      } else {
        this.$message({
          message: result.msg,
          type: 'error'
        })
      }
    },
    // 格式化数据
    formatList(data) {
      if (data && data.length > 0) {
        let result = []
        for (let index = 0, len = data.length; index < len; index++) {
          if (
            data[index].type === 'group' &&
            data[index].moduleName &&
            data[index].children.length > 0
          ) {
            data[index].expand = false
            result.push(data[index])
          } else if (
            data[index].type === 'app' ||
            data[index].type === 'report'
          ) {
            result.push(data[index])
          }
        }
        this.appList = result
      }
    },
    // 设置激活应用
    seActiveApp() {
      for (let index = 0, len = this.appList.length; index < len; index++) {
        const item = this.appList[index]
        // 有指定应用
        if (this.appId !== void 0) {
          // 分组
          if (item.type === 'group') {
            const group = item.children
            for (let j = 0; j < group.length; j++) {
              if (
                (group[j].type === 'app' && group[j].appId === this.appId) ||
                (group[j].type === 'report' && group[j].reportId === this.appId)
              ) {
                const { appType, appId, appName } = {
                  appType: group[j].type,
                  appId: group[j].appId || group[j].reportId,
                  appName: group[j].appName || group[j].reportName
                }
                this.openApp({ appType, appId, appName })
                break
              }
            }
            // 表单或报表
          } else {
            if (
              (item.type === 'app' && item.appId === this.appId) ||
              (item.type === 'report' && item.reportId === this.appId)
            ) {
              const { appType, appId, appName } = {
                appType: item.type,
                appId: item.appId || item.reportId,
                appName: item.appName || item.reportName
              }
              this.openApp({ appType, appId, appName })
              break
            }
          }
        } else {
          // 分组
          if (item.type === 'group') {
            const group = item.children
            if (group.length > 0) {
              const { appType, appId, appName } = {
                appType: group[0].type,
                appId: group[0].appId || group[0].reportId,
                appName: group[0].appName || group[0].reportName
              }
              this.openApp({ appType, appId, appName })
              break
            }
            // 表单或报表
          } else {
            const { appType, appId, appName } = {
              appType: item.type,
              appId: item.appId || item.reportId,
              appName: item.appName || item.reportName
            }
            this.openApp({ appType, appId, appName })
            break
          }
        }
      }
    },
    // 打开应用
    openApp({ appType, appId, appName, renderType }) {
      this.resetConfig()
      // 切换应用列表当前应用
      this.$refs.applistSidebar.changeCurrId(appId)
      // 应用类型为表单
      if (appType === 'app') {
        this.curFormComponent = 'FormList'
        this.config.appId = appId
        this.config.appName = appName
        this.config.type = renderType
        // 切换导航标签
        this.changeTab({
          tabId: `app-${appId}`,
          tabName: appName,
          params: {
            tabType: 'app',
            appType,
            appId,
            appName,
            renderType
          }
        })
        // 应用类型为报表
      } else if (appType === 'report') {
        this.curFormComponent = 'ReportList'
        this.config.reportId = appId
        this.config.reportName = appName
        // 切换导航标签
        this.changeTab({
          tabId: `app-${appId}`,
          tabName: appName,
          params: { tabType: 'app', appType, appId, appName }
        })
      }
      // 获取应用权限
      this.getPermissions(appId)
      this.$router.push({
        name: 'app-list',
        query: {
          moduleId: this.moduleId,
          appId
        }
      })
      this.$nextTick(() => {
        $('#scrollContent').scrollTop(0)
      })
    },
    // 打开展示表单
    openDisplayForm({ value, formId, formName }) {
      this.resetConfig()
      // this.curFormComponent = 'FormDisplay'
      // this.config.formId = formId
      this.curFormComponent = 'AppInfoLog'
      this.config.value = value
      // 切换导航标签
      this.changeTab({
        tabId: `displayForm-${formId}`,
        tabName: formName,
        params: { tabType: 'displayForm', value, formId, formName }
      })
      this.$nextTick(() => {
        $('#scrollContent').scrollTop(0)
      })
    },
    // 打开草稿表单
    openDraftForm({ code, formId, formName }) {
      this.resetConfig()
      this.curFormComponent = 'ModifyModal'
      this.config.code = code
      // 切换导航标签
      this.changeTab({
        tabId: `draftForm-${formId}`,
        tabName: formName,
        params: { tabType: 'draftForm', code, formId, formName }
      })
      this.$nextTick(() => {
        $('#scrollContent').scrollTop(0)
      })
    },
    // 创建表单
    createForm({ appId, appName }) {
      this.resetConfig()
      // this.curFormComponent = 'FormCreate'
      // this.config.appId = appId
      // this.config.type = 'create'
      this.curFormComponent = 'OpenModal'
      this.config.code = appId
      // 切换导航标签
      this.changeTab({
        tabId: `createForm-${appId}`,
        tabName: `新建-${appName}`,
        params: { tabType: 'createForm', appId, appName }
      })
      this.$nextTick(() => {
        $('#scrollContent').scrollTop(0)
      })
    },
    // 切换导航标签回调
    selectTabHandle({ params }) {
      // 离开创建表单时缓存控件值
      if (this.curFormComponent === 'FormCreate') {
        this.setControlsCache({
          appId: this.config.appId,
          controls: this.controls.list
        })
      }
      switch (params.tabType) {
        // 应用
        case 'app': {
          const { appType, appId, appName, renderType } = params
          this.openApp({ appType, appId, appName, renderType })
          break
        }
        // 表单详情
        case 'displayForm': {
          const { value, formId, formName } = params
          this.openDisplayForm({ value, formId, formName })
          break
        }
        // 草稿表单
        case 'draftForm': {
          const { code, formId, formName } = params
          this.openDraftForm({ code, formId, formName })
          break
        }
        // 创建表单
        case 'createForm': {
          const { appId, appName } = params
          this.createForm({ appId, appName })
          break
        }
      }
    },
    // 删除导航标签回调
    deleteTabHandle({ params: delParams }, { params }) {
      this.selectTabHandle({ params })
      // 清除创建表单控件缓存
      if (delParams.TabType === 'createForm' && delParams.appId !== void 0) {
        this.removeControlsCache({ appId: delParams.appId })
      }
    },
    // 处理表单回调
    dealForm({ tabType, appId, formId }) {
      // 创建表单处理回调
      if (tabType === 'createForm' && appId !== void 0) {
        this.deleteTab({
          delTabId: `createForm-${appId}`,
          goTabId: `app-${appId}`
        })
      } else if (tabType === 'displayForm' && formId !== void 0) {
        this.deleteTab({
          delTabId: `displayForm-${formId}`
        })
      } else if (tabType === 'draftForm' && formId !== void 0) {
        this.deleteTab({
          delTabId: `draftForm-${formId}`
        })
      }
    },
    // 改变当前组件中的类型
    changeConfigType({ tabType, type }) {
      // 切换导航标签
      if (tabType === 'app') {
        this.changeTab({
          tabId: `app-${this.config.appId}`,
          params: {
            renderType: type
          }
        })
      }
    },
    // 切换标签
    changeTab({ tabId, tabName, params }) {
      this.$refs.applistNav.changeTab({ tabId, tabName, params })
      this.setCurrentTabIndex(tabId)
    },
    // 删除标签
    deleteTab({ delTabId, goTabId }) {
      this.$refs.applistNav.deleteTab({ delTabId, goTabId })
      this.setCurrentTabIndex(goTabId)
    },
    ...mapMutations('controlsCache', [
      'setControlsCache',
      'removeControlsCache'
    ]),
    ...mapMutations('listview', ['setCurrentTabIndex'])
  }
}
</script>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';
.appList {
  height: 100%;
  padding-top: 50px;
  background-color: #fff;
  .c-tabnav {
    padding: 9px 10px 0;
    border-bottom: 1px solid $color-layout-border;
    background-color: #f5f5f5;
  }
}
</style>

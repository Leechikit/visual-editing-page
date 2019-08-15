<template>
  <div class="formList" v-loading="loading">
    <div class="formList-header">
      <FormListHeader
        :appId="appId"
        :type="renderType"
        :showRenderOptions="showRenderOptions"
        :columns="columns"
        :tableArrs="tableArrs"
        :appName="appName"
        :importBtn="importBtn"
        :permissionList="permissionList"
        @createForm="createForm"
        @deleteForm="deleteForm"
        @changeRenderType="changeRenderType"
        @search="search"
      ></FormListHeader>
    </div>
    <div class="formList-main" v-if="renderType === 'list'">
      <FormListTable
        ref="formListTable"
        :appId="appId"
        :appName="appName"
        :columns="columns"
        :searchParams="searchParams"
        @changeTableArrs="changeTableArrs"
        @openDisplayForm="
          ({ value, formId, formName }) =>
            $emit('openDisplayForm', { value, formId, formName })
        "
        @openDraftForm="
          ({ code, formId, formName }) =>
            $emit('openDraftForm', { code, formId, formName })
        "
      ></FormListTable>
    </div>
    <div class="formList-main" v-if="renderType === 'calendar'">
      <FormListCalendar
        :appId="appId"
        :appName="appName"
        @openDisplayForm="
          ({ value, formId, formName }) =>
            $emit('openDisplayForm', { value, formId, formName })
        "
        @openDraftForm="
          ({ code, formId, formName }) =>
            $emit('openDraftForm', { code, formId, formName })
        "
      ></FormListCalendar>
    </div>
  </div>
</template>
<script>
import HTTP_APP from '@/rebuild/api/app'
import FormListHeader from './form-list-header'
import FormListTable from './form-list-table'
import FormListCalendar from './form-list-calendar'

const EMPTYOBJECT = {}

export default {
  name: 'FormList',
  components: {
    FormListHeader,
    FormListTable,
    FormListCalendar
  },
  props: {
    // 应用id
    appId: {
      type: String
    },
    // 应用名称
    appName: {
      type: String
    },
    // 展示类型 list-表格 calendar-日历
    type: {
      type: String
    },
    // 应用权限
    permissionList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      renderType: this.type, // 应用展示方式
      searchParams: EMPTYOBJECT, // 搜索参数
      showRenderOptions: [], // 展示可切换模式
      columns: [],
      tableArrs: [],
      importBtn: '',
      loading: false
    }
  },
  watch: {
    appId() {
      this.resetData()
      this.getSettingList()
    }
  },
  created() {
    this.resetData()
    this.getSettingList()
  },
  methods: {
    // 重置数据
    resetData() {
      this.renderType = this.type
      this.searchParams = EMPTYOBJECT
      this.columns = []
      this.tableArrs = []
      this.importBtn = ''
    },
    // 获取应用展示字段
    async getSettingList() {
      let params = {
        appId: this.appId
      }
      this.loading = true
      let result = await HTTP_APP.getSettingList(params)
      this.loading = false
      if (+result.Code === 0 && result.Data && result.Data.ListViewData) {
        this.importBtn = result.Data.Import
        if (this.renderType === void 0) {
          this.renderType = result.Data.DefaultShowMode
        }
        this.showRenderOptions = result.Data.ShowMode.split(';')
        this.columns = result.Data.ListViewData
      } else {
        // 增加提示
        this.$message({
          message: result.Msg,
          type: 'error'
        })
      }
    },
    // 创建表单
    createForm() {
      this.$emit('createForm', { appId: this.appId, appName: this.appName })
    },
    // 删除表单
    deleteForm() {
      if (this.$refs.formListTable === void 0) {
        console.log('formListTable组件未找到')
        return
      }
      const multipleSelection = this.$refs.formListTable.multipleSelection
      const resetData = this.$refs.formListTable.resetData
      const getData = this.$refs.formListTable.getData
      if (multipleSelection && multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除选中表单, 是否继续?', '删除表单', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          HTTP_APP.deleteFormListBatch({
            formIdList: multipleSelection.map(item => {
              return item.AppRunId
            })
          }).then(result => {
            if (+result.code === 0) {
              // 不刷新表格字段
              resetData({
                isResetClounms: false
              })
              getData()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: result.msg,
                type: 'error'
              })
            }
          })
        })
      } else {
        this.$message({
          message: '请选择需要删除的表单',
          type: 'warning'
        })
      }
    },
    // 改变展示模式
    changeRenderType(type) {
      this.renderType = type
      this.$emit('changeConfigType', { tabType: 'app', type })
    },
    // 搜索
    search({ nameSchema = '', startTime = '', endTime = '', queryItem = {} }) {
      this.searchParams = {
        nameSchema,
        startTime,
        endTime,
        queryItem
      }
    },
    changeTableArrs(val) {
      this.tableArrs = val
    }
  }
}
</script>
<style lang="scss" scoped>
.formList {
  min-height: 100%;
  &-pagination {
    height: 32px;
  }
}
</style>

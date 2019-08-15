<template>
  <div class="formlListTable">
    <el-table
      v-loading="loading"
      :data="tableDatas"
      style="width: 100%;"
      stripe
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="55" align="center">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        min-width="80"
      ></el-table-column>
      <el-table-column prop="Name" label="数据标题" min-width="150">
        <template slot-scope="scopeName">
          <a
            href="javascript:"
            :title="formatDisplayName(scopeName.row.Name)"
            @click="handleClickForm(scopeName.row)"
            >{{ formatDisplayName(scopeName.row.Name, '--') }}</a
          >
        </template>
      </el-table-column>
      <template v-for="item in formatColunms">
        <!-- 关联表单 或 多选关联表单 -->
        <el-table-column
          v-if="+item.Type === 50 || +item.Type === 51"
          :key="item.Code"
          :prop="item.Code"
          :label="item.DisplayName"
          :sortable="true"
          width="120"
        >
          <template slot-scope="scopeNormal">
            <template v-for="(form, $index) in scopeNormal.row[item.Code]">
              {{ $index > 0 ? ';' : '' }}
              <a
                :key="$index"
                href="javascript:"
                :title="formatDisplayName(form.DisplayName)"
                @click="openAssoForm(form.ObjectId)"
                >{{ formatDisplayName(form.DisplayName, '--') }}</a
              >
            </template>
          </template></el-table-column
        >
        <!-- 其他 -->
        <el-table-column
          v-else
          :key="item.Code"
          :prop="item.Code"
          :label="item.DisplayName"
          :sortable="true"
          min-width="120"
        >
          <template slot-scope="scopeNormal">
            <span
              :title="
                item.formatter(
                  scopeNormal.row,
                  scopeNormal.column,
                  scopeNormal.row[item.Code]
                )
              "
              >{{
                item.formatter(
                  scopeNormal.row,
                  scopeNormal.column,
                  scopeNormal.row[item.Code]
                )
              }}</span
            >
          </template>
        </el-table-column>
      </template>

      <el-table-column
        prop="Assignee"
        label="当前处理人"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="StartUserId"
        label="发起人"
        min-width="150"
      ></el-table-column>
      <el-table-column
        fixed="right"
        prop="Status"
        label="流程状态"
        min-width="120"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.status != 3"
            class="status"
            :class="`s-${formatStatusColor(scope.row.Status)}`"
            >{{
              formatStatusDisplay(scope.row.Status, scope.row.ActResult)
            }}</span
          >
          <span
            v-else
            class="status"
            :class="`s-${formatStatusColor(scope.row.Status)}`"
            >已加派</span
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="formList-pagination">
      <el-pagination
        @size-change="changePageSize"
        @current-change="changePageNum"
        :small="true"
        :current-page="pageNum"
        :background="true"
        :page-sizes="[10, 20]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total"
        :pager-count="5"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import HTTP_APP from '@/rebuild/api/app'
import { Modal } from 'iview'
import assoModal from '@/views/home/assoModal.vue'

export default {
  name: 'FormListTable',
  props: {
    // 应用id
    appId: {
      type: String
    },
    // 应用名称
    appName: {
      type: String
    },
    // 表单字段
    columns: {
      type: Array,
      default: () => []
    },
    // 搜索参数
    searchParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: true,
      list: [], // 表格数据
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页显示个数
      total: 0, // 总个数
      multipleSelection: [] // 多选选中
    }
  },
  computed: {
    // 表格数据
    tableDatas() {
      let tableArrs = []
      try {
        if (this.list && this.list.length > 0) {
          tableArrs = []
          this.list.forEach(item => {
            let obj = {}
            for (let key in item) {
              // 子表
              const arrs = key.split('.')
              if (arrs.length > 1) {
                obj[arrs[1]] = item[key]
              } else {
                obj[arrs[0]] = item[key]
              }
              // 对于F0001字段，若F0001_Name存在时使用该字段的值
              if (item[`${key}_Name`] !== void 0) {
                obj[key] = item[`${key}_Name`]
              }
            }
            tableArrs.push(obj)
          })
        }
      } catch (error) {
        console.log(error)
      }
      this.$emit('changeTableArrs', tableArrs)
      return tableArrs
    },
    // 搜索数据格式化
    formatSearchParams() {
      let formatParams = {}
      if (this.searchParams.queryItem !== void 0) {
        formatParams.queryItem = JSON.stringify(this.searchParams.queryItem)
      }
      return Object.assign({}, { ...this.searchParams }, { ...formatParams })
    },
    // 格式化应用展示字段
    formatColunms() {
      let result = []
      this.columns.forEach(item => {
        if (item.Visible === true) {
          item.formatter = (row, column, cellValue) => {
            let result = cellValue
            // 图片或附件
            if (+item.Type === 23 || +item.Type === 24) {
              try {
                const arrs = JSON.parse(cellValue)
                if (arrs instanceof Array) {
                  result = []
                  arrs.forEach(file => {
                    result.push(file.Name)
                  })
                  result = result.join('；')
                }
              } catch (error) {
                console.log(error)
              }
            }
            return this.formatDisplayName(result)
          }
          result.push(item)
        }
      })
      return result
    }
  },
  watch: {
    appId() {
      this.resetData()
      this.getData()
    },
    searchParams: {
      handler() {
        this.resetData()
        this.getData()
      },
      deep: true
    }
  },
  created() {
    this.resetData()
    this.getData()
  },
  methods: {
    // 重置数据
    resetData() {
      this.loading = true
      this.list = []
      this.pageNum = 1
      this.pageSize = 10
      this.total = 0
      this.multipleSelection = []
    },
    // 获取数据
    async getData() {
      let params = Object.assign(
        {},
        {
          QueryCode: this.appId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        { ...this.formatSearchParams }
      )
      let result = await HTTP_APP.appRunPage(params)
      if (+result.Code === 0) {
        this.list = result.Result.ReturnData
        this.total = result.Result.Count
        this.loading = false
      } else {
        this.$message({
          message: result.Msg,
          type: 'error'
        })
      }
    },
    // 格式化显示名称
    formatDisplayName(displayName, defaultName = '') {
      if (displayName) {
        let nameStr = displayName.toString()
        return nameStr && nameStr.trim() ? nameStr : defaultName
      } else {
        return defaultName
      }
    },
    // 点击数据标题操作
    handleClickForm(row) {
      // 草稿
      if (+row.Status === 1) {
        this.openDraftForm(row)
      } else {
        this.openDisplayForm(row)
      }
    },
    // 打开展示表单
    openDisplayForm(row) {
      this.$emit('openDisplayForm', {
        value: { row, appId: this.appId },
        formId: row.AppRunId,
        formName: `${this.formatDisplayName(row.Name, '--')} — ${this.appName}`
      })
    },
    // 打开草稿
    openDraftForm(row) {
      this.$emit('openDraftForm', {
        code: `${this.appId},${row.AppRunId}`,
        formId: row.AppRunId,
        formName: `${this.formatDisplayName(row.Name, '--')} — ${this.appName}`
      })
    },
    // 打开关联表单
    openAssoForm(formId) {
      Modal.info({
        okText: '关闭',
        //scrollable:true,
        title: formId,
        width: '800px',
        maskClosable: true,
        render: h => {
          return h(assoModal, {
            props: {
              code: formId
            },
            on: {}
          })
        },
        onOk: () => {}
      })
    },
    // 改变当前页数
    changePageNum(num) {
      this.pageNum = num
      this.getData()
    },
    // 改变每页显示个数
    changePageSize(size) {
      this.pageSize = size
      this.getData()
    },
    // 多选框改变时触发
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 格式化流程状态显示
    formatStatusDisplay(status, actResult) {
      const ACT_RESULT = {
        1: '同意',
        2: '不同意',
        3: '进行中',
        4: '撤回'
      }
      let result
      switch (+status) {
        case 0:
          result = '子流程开启待提交'
          break
        case 1:
          result = '草稿'
          break
        case 2:
          result = '进行中'
          break
        case 3:
          result = `结束 (${ACT_RESULT[actResult] || '暂无结果'})`
          break
        case 4:
          result = '驳回到发起人'
          break
        default:
          result = '暂无状态'
          break
      }
      return result
    },
    // 格式化流程状态颜色
    formatStatusColor(status) {
      let result
      switch (+status) {
        case 0:
          result = 'orange'
          break
        case 1:
          result = 'orange'
          break
        case 2:
          result = 'orange'
          break
        case 3:
          result = 'blue'
          break
        case 4:
          result = 'red'
          break
        default:
          result = 'gray'
          break
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';
.formlListTable {
  .status {
    display: inline-block;
    position: relative;
    text-indent: 18px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-radius: 100%;
      overflow: hidden;
    }
    &.s-blue {
      &::before {
        background-color: $color-main;
      }
    }
    &.s-red {
      &::before {
        background-color: $color-error;
      }
    }
    &.s-orange {
      &::before {
        background-color: $color-warn;
      }
    }
    &.s-gray {
      &::before {
        background-color: $color-remind;
      }
    }
  }
}
</style>

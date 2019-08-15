<template>
  <el-dialog
    :visible.sync="isVisible"
    title="审批记录"
    width="80%"
    top="20px"
    :modal-append-to-body="false"
    class="workflow-view"
    @close="cancel"
  >
    <div :id="value.id">
      <el-table
        stripe
        size="mini"
        :data="csvData"
        v-loading="getLoading"
        style="width: 100%; border: 1px solid #ebeef5;"
      >
        <el-table-column
          type="index"
          width="50"
          align="center"
          fixed
        ></el-table-column>
        <el-table-column
          prop="taskName"
          label="环节名称"
          width="100"
          fixed
        ></el-table-column>
        <el-table-column
          v-for="item in normalColumns"
          :key="item.key"
          :prop="item.key"
          :label="item.title"
          :width="item.width"
          :minWidth="item.minWidth"
          :align="item.align"
          :formatter="item.formatter"
        ></el-table-column>
        <el-table-column label="办理结果" width="100" fixed="right">
          <template slot-scope="scope">
            <span
              class="handle-status"
              :class="
                `handle-status__${
                  (taskAction[scope.row.taskAction] || taskAction[0])[1]
                }`
              "
            >
              {{ scope.row.taskType === 4 ? ccTaskAction[scope.row.taskAction][0] : (taskAction[scope.row.taskAction] || taskAction[0])[0] }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <workflow-chart :value="value"></workflow-chart>
    </div>
    <div slot="footer">
      <el-button
        v-if="value.actResult !== 4 && cancelBtn"
        :loading="loading"
        type="primary"
        size="small"
        @click="cancelMyJob"
      >
        撤回
      </el-button>
      <el-button size="small" plain @click="cancel">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import '../libs/css/workflow.less'
import HTTP from '@/api/work-flow.js'
import { dataFormat } from '@/util/assist.js'
import workflowChart from '../components/workflow-chart'

export default {
  components: { workflowChart },
  data() {
    return {
      isVisible: this.visible,
      getLoading: false,
      loading: false,
      normalColumns: [
        {
          title: '办理人',
          key: 'dealName',
          width: 150
        },
        {
          title: '审批意见',
          key: 'taskResult',
          minWidth: 150
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: 170,
          formatter: row => dataFormat(row.createTime)
        },
        {
          title: '办理时间',
          key: 'dealTime',
          width: 170,
          formatter: row => dataFormat(row.dealTime)
        }
      ],
      csvData: [],
      taskAction: {
        0: ['未审批', 'warn'],
        1: ['同意', 'normal'],
        2: ['反对', 'error'],
        3: ['撤回', 'normal'],
        4: ['驳回', 'error'],
        5: ['转办', 'warn'],
        6: ['批阅', 'normal'],
        7: ['跳转', 'warn'],
        8: ['已加派', 'warn']
      },
      // 抄送节点的办理结果
      ccTaskAction:{
        1: ['已阅', 'normal'],
        6: ['未阅', 'normal'],
      }
    }
  },
  props: ['value', 'visible', 'cancelBtn'],
  mounted() {
    this.getApprovelLog(this.value)
  },
  watch: {
    visible: function() {
      this.isVisible = this.visible
    }
  },
  methods: {
    async cancelMyJob() {
      this.loading = true
      try {
        const res = await HTTP.cancelMyJob(this.value.id)
        if (res.code === '0') {
          this.isVisible = false
          this.dealResponse(res.code)
          this.$emit('on-ok')
        } else {
          this.$message.error('撤销失败')
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    dealResponse(result) {
      let statusMap = {
        '0': {
          type: 'success',
          msg: '操作成功'
        },
        '1': {
          type: 'warning',
          msg: '流程已完成'
        },
        '2': {
          type: 'error',
          msg: '无权限操作'
        }
      }
      let status = statusMap[result + '']
      this.$message[status.type](status.msg)
    },
    cancel() {
      this.isVisible = false
      this.$emit('on-cancel')
    },
    getApprovelLog(value) {
      this.getLoading = true
      HTTP.approvalRecord(value.id)
        .then(res => {
          this.csvData = res.page.result
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.getLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.handle-status {
  position: relative;
  margin-left: 16px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -15px;
    width: 8px;
    height: 8px;
    margin-top: -4px;
    border-radius: 50%;
  }

  &__normal::before {
    background-color: $color-main;
  }

  &__warn::before {
    background-color: $color-warn;
  }

  &__error::before {
    background-color: $color-error;
  }
}
</style>

<style lang="less">
.workflow-view .el-table td .cell {
  white-space: normal;
  text-overflow: initial;
}
</style>

<template>
  <div class="workflow-view">
    <div class="workflow-view-content">
      <div class="finish-work-info-log">
        <div class="approval-detail__title">
          <span class="approval-detail__title--text">{{ value.appRunName }} ({{ value.nameSchema }})</span>
          <span class="approval-detail__title--time">
            {{ currentApproval.data.createTime | formateTime }}
          </span>
        </div>
        <openModal
          v-if="showOpenModal"
          :result="currentApproval.data"
          :code="currentCode"
        ></openModal>
      </div>
      <div :id="value.id">
        <p id="print-approval-record-title" class="approval-record__title">
          审批记录
        </p>
        <el-table
          id="print-approval-record-table" 
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
    </div>
    <div class="workflow-view-footer">
      <!-- actResult === 3表示流程在进行中 -->
      <el-button
        v-if="value.actResult === 3"
        type="primary"
        size="small"
        :loading="loading"
        @click="urg"
      >
        催办
      </el-button>
      <el-button plain size="small" @click="cancel">关闭</el-button>
      <el-button
        v-if="value.actResult === 3 && cancelBtn"
        :loading="loading2"
        plain
        size="small"
        @click="cancelMyJob"
      >
        撤回
      </el-button>
      <el-button v-if="attachId" plain size="small" @click="exportWordTemplate">
        导出
      </el-button>
      <el-button v-if="!cancelBtn" plain size="small" @click="delegatePrint">
        打印
      </el-button>
    </div>
  </div>
</template>
<script>
import '../libs/css/workflow.less'
import HTTP from '../../../api/work-flow.js'
import { dataFormat } from '../../../util/assist.js'
import workflowChart from '../components/workflow-chart'
import openModal from '../components/approvalDetail'

export default {
  components: { workflowChart, openModal },
  data() {
    return {
      isVisible: this.visible,
      getLoading: false,
      loading: false,
      loading2: false,
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
      currentApproval: { data: [] },
      currentCode: '',
      showOpenModal: false,
      attachId: null,
      taskAction: {
        0: ['未审批', 'warn'],
        1: ['同意', 'normal'],
        2: ['反对', 'error'],
        3: ['撤回', 'normal'],
        4: ['驳回', 'error'],
        5: ['转办', 'warn'],
        6: ['批阅', 'normal'],
        7: ['跳转', 'warn']
      },
      // 抄送节点的办理结果
      ccTaskAction:{
        1: ['已阅', 'normal'],
        6: ['未阅', 'normal'],
      },
      approvalName: ''
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
  filters: {
    formateTime(timestamp) {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = `0${date.getMonth() + 1}`.slice(-2)
      const day = `0${date.getDate()}`.slice(-2)
      const hour = `0${date.getHours()}`.slice(-2)
      const min = `0${date.getMinutes()}`.slice(-2)
      return `${year}-${month}-${day} ${hour}:${min}`
    }
  },
  methods: {
    urg() {
      this.loading = true
      HTTP.urge(this.value.id)
        .then(data => {
          if (data.code === '0') {
            this.$message.success(data.msg)
          } else {
            this.$message.error(data.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async cancelMyJob() {
      this.loading2 = true
      try {
        const res = await HTTP.cancelMyJob(this.value.id)
        if (+res.code === 0) {
          this.isVisible = false
          this.dealResponse(res.code)
          this.$emit('close')
        } else {
          this.$message.error(res.msg)
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.loading2 = false
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
      this.$emit('close')
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
      HTTP.appInfoLog(value.id)
        .then(res => {
          this.currentApproval.data = res.propertyJson
          this.currentCode = value.id
          this.showOpenModal = true
          this.attachId = res.propertyJson.attachId
        })
        .catch(err => {
          console.log(err)
        })
    },
    delegatePrint() {
      document.querySelector('[data-action=Print]').AppRunId = this.value.id
      document.querySelector('[data-action=Print]').click()
    },
    exportWordTemplate() {
      HTTP.exportWord({
        appId: this.value.appId,
        appRunId: this.value.id,
        attachmentId: this.attachId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.approval-detail__title {
  background-color: #fafafa;
  padding: 10px 10px 10px 22px;

  &--text {
    position: relative;
    font-size: $font-size-main;

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      background-color: $color-main;
      position: absolute;
      left: -14px;
      top: 50%;
      margin-top: -4px;
    }
  }

  &--time {
    float: right;
    font-size: $font-size-main;
  }
}
.workflow-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  &-content {
    flex: 1;
    overflow: auto;
    padding: 20px;
  }

  &-footer {
    padding: 10px;
    border-top: 1px solid #e4e3e3;
  }

  .approval-record__title {
    background-color: #fafafa;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 14px;
  }
}

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

<style lang="scss">
.finish-work-info-log .col-sm-10.col-xs-10 {
  padding-top: 6px;
}

.finish-work-info-log .col-sm-2.col-xs-2.ControlTitle {
  width: 16.66666667% !important;
}

.finish-work-info-log .sheet_container {
  padding: 0;
  margin: 0;
}

.workflow-view .el-table td .cell {
  white-space: normal;
  text-overflow: initial;
}

.workflow-view #navbar {
  display: none;
}
</style>

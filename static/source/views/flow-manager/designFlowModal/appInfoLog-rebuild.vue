<template>
  <div class="form-rebuild-appInfoLog">
    <div class="info-modal">
      <!-- <p slot="header" style="text-align:center;margin-bottom:20px" class="info-modal-header">
            <span style='font-family: arial, "Microsoft Yahei", 微软雅黑;'>表单信息</span>
      </p> -->
      <div
        :class="[
          'open-modal-scroll-container',
          'info-modal-body',
          {
            'info-modal-body-modify': modModal,
            'noedit-body': !(!modModal && !(csvData && csvData.length > 0))
          }
        ]"
      >
        <Form :label-width="80">
          <div>
            <openModal
              v-if="showModal"
              :result="currentApproval.data"
              :code="currentCode"
            ></openModal>
            <modifyModal
              v-if="modModal && !(csvData && csvData.length > 0)"
              :code="modCode"
            ></modifyModal>
          </div>
        </Form>
        <div
          id="print-approval-record-title"
          class="info-title"
          v-if="csvData && csvData.length > 0"
        >
          审批记录
        </div>
        <i-table
          id="print-approval-record-table"
          v-show="csvData && csvData.length > 0"
          :content="self"
          :loading="getLoading"
          :columns="columns"
          :data="csvData"
          size="small"
          ref="tableCsv"
          class="i-table"
        ></i-table>
        <workflow-chart :value="workflowParams"></workflow-chart>
      </div>
      <div class="info-modal-footer">
        <Button
          type="ghost"
          v-if="
            !modModal &&
              !(csvData && csvData.length > 0) &&
              permissionList.includes('START')
          "
          @click="modShow()"
          >编辑</Button
        >
        <Button
          v-if="value.row.Status == 2"
          type="primary"
          :loading="urgLoading"
          @click="urg"
          :class="{ 'mod-close-btn': modModal }"
          >催办</Button
        >
        <Button
          v-if="modModal"
          type="primary"
          @click="delegateModify"
          :class="{ 'mod-close-btn': modModal }"
          >保存</Button
        >
        <Button
          type="primary"
          @click="closeModal"
          :class="{ 'mod-close-btn': modModal }"
          >关闭</Button
        >
        <Button v-if="attachId" type="ghost" @click="exportWordTemplate"
          >导出</Button
        >
        <Button v-if="!modModal" type="ghost" @click="delegatePrint"
          >打印</Button
        >
      </div>
      <Spin fix size="large" v-show="loading" class="info-loading-spin"></Spin>
      <!-- 浏览锚点 -->
      <AnchorPoint
        v-if="anchorVisible"
        :anchorList="anchorList"
        conSelector=".info-modal"
        :scrollElement="scrollElement"
      ></AnchorPoint>
    </div>
  </div>
</template>
<script>
import { filter } from '../data/filter.js'
import HTTP from '../../../api/work-flow.js'
import { dataFormat } from '../../../util/assist.js'
import openModal from '../components/approvalDetail-rebuild.vue'
import modifyModal from '../components/modifyModal-rebuild.vue'
import workflowChart from '../components/workflow-chart'
import AnchorPoint from '@/component/anchor-point'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    openModal,
    modifyModal,
    workflowChart,
    AnchorPoint
  },
  computed: {
    ...mapGetters('listview', [
      'getListThead',
      'getListQuery',
      'getListTbody',
      'getListConfig',
      'getCount',
      'getCurrentAppKey',
      'getCurrentAppName',
      'getListMode',
      'getDefaultShowMode'
    ]),
    workflowParams() {
      return {
        id: this.value.row.AppRunId
      }
    },
    formId() {
      return this.value.row.AppRunId
    }
  },
  watch: {
    workflowParams() {
      this.resetData()
      this.getApprovelLog(this.value)
      this.$nextTick(() => {
        $('.info-modal')
          .parents('.v-transfer-dom')
          .addClass('show-info-modal')
        this.scrollElement = $('.form-rebuild').parent()
      })
    }
  },
  data() {
    return {
      loading: true,
      modelhiden: false,
      self: this,
      getLoading: false,
      showModal: false,
      showCropedImage: false,
      currentCode: '',
      modCode: '',
      modModal: false,
      urgLoading: false,
      modflag: false,
      anchorVisible: true,
      anchorList: [],
      columns: [
        {
          type: 'index',
          width: 60,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '环节名称',
          key: 'taskName',
          fixed: 'left',
          width: 100
        },
        {
          title: '办理人',
          key: 'dealName',
          width: 157,
          sortable: true,
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.show > 4000
            } else if (value === 2) {
              return row.show < 4000
            }
          }
        },
        {
          title: '办理结果',
          key: 'taskAction',
          width: 150,
          render: (h, params) => {
            const row = params.row
            const color =
              row.taskAction == 1
                ? 'blue'
                : row.taskAction == 2
                ? 'red'
                : row.taskAction == 3
                ? 'gray'
                : row.taskAction == 4
                ? 'black'
                : row.taskAction == 5
                ? 'yellow'
                : row.taskAction == 6
                ? 'yellow'
                : row.taskAction == 7
                ? 'green'
                : 'orange'
            const text =
              row.taskAction == 1
                ? '同意'
                : row.taskAction == 2
                ? '反对'
                : row.taskAction == 3
                ? '撤回'
                : row.taskAction == 4
                ? '驳回'
                : row.taskAction == 5
                ? '转办'
                : row.taskAction == 6
                ? '批阅'
                : row.taskAction == 7
                ? '跳转'
                : '未审批'
            return h(
              'Tag',
              {
                props: {
                  type: 'dot',
                  color: color
                }
              },
              text
            )
          }
        },
        {
          title: '审批意见',
          key: 'taskResult',
          // width: 150,
          minWidth: 150,
          sortable: true
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: 170,
          sortable: true,
          render: (h, params) => {
            let text = dataFormat(params.row.createTime)
            return h('div', {}, text)
          }
        },
        {
          title: '办理时间',
          key: 'dealTime',
          width: 170,
          sortable: true,
          render: (h, params) => {
            let text = dataFormat(params.row.dealTime)
            return h('div', {}, text)
          }
        }
      ],
      csvData: [],
      currentApproval: { data: [] },
      attachId: null, // Word 模板导出
      scrollElement: null // 滚动容器
    }
  },
  props: {
    value: {
      type: Object
    },
    // 应用权限
    permissionList: {
      type: Array,
      defalt() {
        return []
      }
    }
  },
  mounted() {
    this.getApprovelLog(this.value)
    this.$nextTick(() => {
      $('.info-modal')
        .parents('.v-transfer-dom')
        .addClass('show-info-modal')
      this.scrollElement = $('.form-rebuild').parent()
    })
  },
  methods: {
    resetData() {
      this.loading = true
      this.modelhiden = false
      this.getLoading = false
      this.showModal = false
      this.showCropedImage = false
      this.currentCode = ''
      this.modCode = ''
      this.modModal = false
      this.urgLoading = false
      this.modflag = false
      this.anchorVisible = true
      this.anchorList = []
      this.csvData = []
      this.currentApproval = { data: [] }
      this.attachId = null // Word 模板导出
      this.scrollElement = null // 滚动容器
    },
    checkPerm(permList) {
      return this.$_has('permissions', permList)
    },
    valueChange() {
      var obj = this
      this.$emit('value', obj.formValidate)
    },
    modShow() {
      this.showModal = false
      this.modCode = this.value.appId + ',' + this.value.row.AppRunId
      this.modModal = true
    },
    closeModal() {
      // try {
      //   this.$parent.visible = false
      //   this.$parent.$parent.$options.methods.ok.call(this.$parent.$parent)
      // } catch(err) {
      //   console.log(err)
      // }
      this.$emit('dealForm', {
        tabType: 'displayForm',
        formId: this.formId
      })
      this.$emit('close')
    },
    delegatePrint() {
      document.querySelector(
        '[data-action=Print]'
      ).AppRunId = this.value.row.AppRunId
      document.querySelector('[data-action=Print]').click()
    },
    delegateModify() {
      document.querySelector('[data-action=Modify]').click()
      this.$emit('close')
    },
    urg() {
      this.urgLoading = true
      HTTP.urge(this.value.row.AppRunId)
        .then(data => {
          if (data.code == 0) {
            this.$Message.success(data.msg)
          } else {
            this.$Message.err(data.msg)
          }
        })
        .catch(e => {
          this.$Message.err('This is an error')
        })
        .finally(() => {
          this.urgLoading = false
        })
    },
    exportWordTemplate() {
      HTTP.exportWord({
        appId: this.value.appId,
        appRunId: this.value.row.AppRunId,
        attachmentId: this.attachId
      })
    },
    getApprovelLog(value) {
      this.showCropedImage = false
      if (value.row.InstanceId) {
        this.currentImg =
          '/ctg-workflow/act/app/showFlowImg?processInstanceId=' +
          value.row.InstanceId +
          '&time=' +
          new Date()
        this.showCropedImage = true
      }

      HTTP.appInfoLog(value.row.AppRunId)
        .then(res => {
          this.currentCode = value.row.AppRunId
          this.currentApproval.data = res.propertyJson
          this.modflag = res.propertyJson.closeFlowStatus == 1 ? false : true
          this.csvData = res.page.result
          this.attachId = res.propertyJson.attachId
          this.showModal = true
          this.$nextTick(() => {
            this.checkAnchorVisible()
          })
        })
        .catch(err => {
          console.log(err)
          this.$Message.error('This is an error')
        })
        .finally(() => {
          this.getLoading = false
          this.loading = false
        })
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    checkAnchorVisible() {
      if ($('#SheetContent')) {
        this.anchorVisible = true
        this.anchorList = Array.prototype.slice.call(
          $('#SheetContent .page-header')
        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
.i-table {
  margin: 20px 0 20px 14px;
}
.table {
  display: table;
  max-width: 100%;
  background-color: transparent;
  border-spacing: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  border-collapse: collapse;
  color: #666;
  border: 1px solid #cecece;
  font-size: 12px;
}

.table thead th,
.table thead td {
  background: #ececec;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
  color: #666;
  padding: 5px 9px;
}

.table thead td {
  height: 40px;
  font-weight: bold;
}

.table tbody tr td,
.table tbody tr th {
  border-bottom: solid 1px #e5e5e5;
  vertical-align: middle;
  height: 40px;
}

.table tbody tr th {
  text-align: right;
  padding-right: 10px;
  background: #f8f8f8;
  border-right: 1px solid #e5e5e5;
  color: #666;
  font-weight: 400;
  width: 200px;
}

.table tbody tr td {
  padding-left: 10px;
}
</style>

  <style lang="less">
.show-info-modal {
  .ivu-modal-confirm-footer {
    display: none;
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }

  .ivu-modal {
    top: 20px;
  }
}

.info-modal {
  .info-loading-spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.info-modal {
  padding-bottom: 40px;
  position: relative;
  overflow: hidden;
  height: 100%;

  .info-modal-footer {
    border-top: 1px solid #eee;
    padding-top: 10px;
    //position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    display: flex;
    justify-content: center;
    z-index: 1234;

    .ivu-btn {
      margin: 0 5px;
    }

    .mod-close-btn {
      margin-left: 48px;
    }
  }
  .ivu-modal-confirm-footer {
    display: none;
  }
  .info-modal-header {
    font-size: 20px;
    margin-bottom: 0 !important;
    line-height: 30px;
    border-top: 1px solid #eee;
  }
  .info-modal-body {
    min-height: 350px;
    // max-height: 450px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .info-modal-body-modify {
    padding-bottom: 320px;
  }

  .info-title {
    background-color: rgb(241, 250, 255);
    display: block;
    font-weight: bold;
    padding: 10px;
    margin-left: 14px;
  }

  .container-fluid {
    margin-top: 10px;
    padding-bottom: 0;
    margin-bottom: 10px;
  }

  .form-group {
    display: flex;
    align-items: center;

    pre {
      font-family: 'Microsoft YaHei' !important;
      color: #333;
      font-size: 14px;
      line-height: 30px;
      padding: 0 !important;
    }

    span.icon-arrow-down-full {
      line-height: 24px;
    }
  }

  img {
    margin-left: 14px !important;
    margin-top: 20px !important;
    padding: 0;
  }

  .SheetGridView {
    padding: 0;
  }

  .SheetGridView_td,
  .table > tbody > tr > td {
    min-width: 40px;
  }

  #SheetContent .page-header {
    padding-left: 0;
    margin-left: 0;
  }

  .table-content.fixed-table-content {
    .row-num {
      margin-top: 14px;
    }
  }
}
</style>
<style lang="scss" scope>
.form-rebuild-appInfoLog {
  padding-bottom: 330px;
  .info-modal {
    height: auto;
  }
  .print-btn,
  .submit-btn {
    display: none !important;
  }
}
</style>

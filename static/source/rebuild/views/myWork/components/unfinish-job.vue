<template>
  <div class="unfinish-job">
    <ControlBar
      ref="controlBar"
      v-show="viewType === 'listdata'"
      v-model="renderType"
      @search="handleSearch"
    ></ControlBar>
    <div
      v-if="viewType === 'listdata'"
      style="padding: 20px; min-height: 200px;"
      v-loading="loadingData"
    >
      <div v-if="downList.length === 0 && !loadingData" class="nodata">
        暂无数据
      </div>
      <work-list
        v-if="downList.length !== 0 && renderType === 'list'"
        v-model="downTblList"
        :total="listTotal"
        :current="listPage"
        @page-change="listPageChange"
        @row-select="dealTask"
        @handle-submit="handleListSubmit"
        @handle-reset="handleReset"
      ></work-list>
      <WorkTimeline
        v-if="downList.length && renderType === 'block'"
        type="unfinish"
        :data="downList"
        :noMore="noMore"
        @view="dealTask"
        @agree="handleSubmit($event, 1)"
        @disagree="handleReset"
        @load="getUnFinishJobList(1)"
      ></WorkTimeline>
    </div>
    <div
      v-if="viewType === 'approval'"
      class="ivu-modal-body approval-page"
      v-loading="loading"
    >
      <div class="approval-detail">
        <div class="approval-detail__title">
          <span class="approval-detail__title--text"
            >{{ approvalTitle.appRunName }} ({{
              approvalTitle.nameSchema
            }})</span
          >
          <span class="approval-detail__title--time">
            {{ currentApproval.props.createTime | formateTime }}
          </span>
        </div>
        <approvalDetail
          :result="currentApproval.data"
          :code="currentCode"
        ></approvalDetail>
        <div style="margin-bottom: 200px;">
          <div v-if="['5', '7'].indexOf(currentApproval.props.taskType) === -1">
            <div class="approval-detail__opinion">审批意见</div>
            <el-input
              v-model="currentApproval.props.taskResult"
              type="textarea"
              :rows="4"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="approval-footer">
        <el-button
          v-if="['4', '5', '7'].indexOf(currentApproval.props.taskType) === -1"
          type="primary"
          size="small"
          @click="handleSubmit(currentApproval.props, 2)"
        >
          同意
        </el-button>
        <el-button
          v-if="['4', '5', '7'].indexOf(currentApproval.props.taskType) === -1"
          plain
          size="small"
          @click="handleReset(currentApproval.props)"
        >
          反对
        </el-button>
        <el-button
          plain
          size="small"
          style="float: right;"
          @click="openLogModal(currentApproval.props)"
        >
          <i class="iconfont iconliebiao el-icon--left"></i>
          流程状态
        </el-button>
        <el-button
          v-if="
            ['4', '5', '7', '8'].indexOf(currentApproval.props.taskType) === -1
          "
          plain
          size="small"
          @click="handleResetTS(currentApproval.props)"
        >
          驳回原点
        </el-button>
        <el-button
          v-if="
            ['4', '5', '7', '8'].indexOf(currentApproval.props.taskType) === -1
          "
          plain
          size="small"
          @click="handleDispatch()"
        >
          加派
        </el-button>
        <el-button
          v-if="
            ['4', '5', '7', '8'].indexOf(currentApproval.props.taskType) === -1
          "
          plain
          size="small"
          @click="handleTO()"
        >
          转办
        </el-button>
        <el-button
          v-if="
            ['4', '5', '7', '8'].indexOf(currentApproval.props.taskType) === -1
          "
          plain
          size="small"
          @click="getJumpNode(currentApproval.props)"
        >
          跳转至
        </el-button>
        <el-button
          v-if="currentApproval.props.taskType === '4'"
          type="primary"
          size="small"
          @click="updateCC(currentApproval.props)"
        >
          确定
        </el-button>
        <el-button
          v-if="currentApproval.props.taskType === '5'"
          type="primary"
          size="small"
          @click="handleSubmit(currentApproval.props)"
        >
          确定
        </el-button>
        <el-button
          v-if="currentApproval.props.taskType === '7'"
          type="primary"
          size="small"
          @click="commitFunctionNode(currentApproval.props)"
        >
          确定
        </el-button>
        <el-button
          v-if="attachId"
          plain
          size="small"
          @click="exportWordTemplate(currentApproval.props)"
        >
          导出
        </el-button>
        <el-button plain size="small" @click="delegatePrint">
          打印
        </el-button>
      </div>
    </div>

    <el-dialog
      :visible.sync="turnModal"
      title="请选择审批人"
      width="500px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <el-form label-width="80px">
        <div>
          <el-form-item label="转办给">
            <div
              class="addroleusers-userselect"
              id="transApprovalId"
              data-ismultiple="false"
              data-uservisible="true"
              data-orgunitvisible="false"
              data-width="100%"
            ></div>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="审批意见">
            <el-input
              v-model="currentApproval.props.taskResult"
              style="margin-right:50px"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="turnModal = false">取消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="commitLoading"
          @click="commitTurnTask(currentApproval.props)"
        >
          确定
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="dispatchModal"
      title="请选择加派人"
      width="500px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <el-form label-width="80px">
        <div>
          <el-form-item label="加派给">
            <div
              class="addroleusers-userselect"
              id="dispatchId"
              data-ismultiple="true"
              data-uservisible="true"
              data-orgunitvisible="false"
              data-width="100%"
            ></div>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="审批意见">
            <el-input
              v-model="currentApproval.props.suggest"
              style="margin-right:50px"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="closeDispatch()">取消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="commitLoading"
          @click="dispatchTask(currentApproval.props)"
        >
          确定
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="jumpModal"
      title="请选择跳转节点"
      width="500px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <el-form label-width="150px">
        <el-form-item label="选择跳转审批节点: ">
          <div>
            <el-select v-model="selected" style="margin-right:150px">
              <el-option
                v-for="item in jumpParams.inParam"
                :key="item.nodeId"
                :value="item.nodeId"
                :label="item.nodeName"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="审批意见: ">
          <el-input
            v-model="currentApproval.props.taskResult"
            style="margin-right:50px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="jumpModal = false">取消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="commitLoading"
          @click="commitJumpTask(currentApproval.props)"
        >
          确定
        </el-button>
      </span>
    </el-dialog>

    <div v-if="viewType === 'render'" id="createNewApp" class="approval-page">
      <div class="approval-detail my-work-other">
        <openModal
          @close="
            () => {
              $emit('close')
              getUnFinishJobList()
            }
          "
          :code="showModalAppId"
          :approvalTitle="approvalTitle"
          style="margin-bottom: 200px;"
        ></openModal>
      </div>
      <div class="approval-footer">
        <el-button size="small" type="primary" @click="delegateSubmit">
          提交
        </el-button>
        <el-button plain size="small" @click="delegateSave">暂存</el-button>
        <el-button plain size="small" :loading="loading2" @click="cancelMyJob">
          撤回
        </el-button>
      </div>
    </div>
    <div v-if="isLogModal">
      <log-modal
        :visible="isLogModal"
        :value="logModalValue"
        @on-cancel="onLogModalClose"
      ></log-modal>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import HTTP from '@/api/work-flow.js'
import utils from '@/util/utils.js'
import approvalDetail from '@/views/flow-manager/components/approvalDetail-rebuild.vue'
import openModal from '@/views/flow-manager/openModal.vue'
import logModal from '@/views/flow-manager/designFlowModal/approvalLog-rebuild.vue'
import WorkList from './work-list'
import WorkTimeline from './work-timeline'
import ControlBar from './control-bar'

export default {
  name: 'unfinish-job',
  components: {
    approvalDetail,
    openModal,
    logModal,
    WorkList,
    WorkTimeline,
    ControlBar
  },
  props: {
    viewType: {
      type: String
    }
  },
  data() {
    return {
      loadingData: false,
      loading: false,
      transApproval: '',
      loading2: false,
      utils: new utils(),
      commitLoading: false,
      dispatchModal: false,
      downList: [],
      downTblList: [],
      noMore: false,
      currentCode: '',
      showModalAppId: '',
      dispatchNewTask: '',
      pageData: {
        1: 2,
        2: 2,
        3: 2,
        4: 2,
        5: 2,
        totle: 2
      },
      currentApproval: {
        data: [],
        props: {
          appRunId: '',
          taskId: '',
          suggest: '',
          ruWfTaskId: '',
          taskResult: '',
          taskType: '',
          instanceId: '',
          modelId: '',
          createTime: ''
        }
      },
      returnSuccess: {},
      returnFail: {},
      currentAppId: '',
      turnModal: false,
      jumpModal: false,
      selected: [],
      jumpParams: {
        data: [],
        outParam: {
          appRunId: '',
          taskId: '',
          ruWfTaskId: '',
          taskResult: '',
          targetNodeId: ''
        },
        inParam: {
          nodeId: '',
          nodeName: ''
        }
      },
      turnParams: {
        appRunId: '',
        taskId: '',
        ruWfTaskId: '',
        taskResult: '',
        toUserId: ''
      },
      isLogModal: false,
      logModalValue: {},
      renderType: 'block',
      listTotal: 0,
      listPage: 0,
      attachId: null,
      search: {},
      approvalName: '',
      approvalTitle: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initFormUser()
    })
    this.getUnFinishJobList()
    this.listPage = 0
  },
  methods: {
    // 初始化FormUser控件
    _initFormUser() {
      if (!this.transApproval) {
        this.transApproval = $('#transApprovalId').RoleFormMultiUser()
      }
      if (!this.dispatchNewTask) {
        this.dispatchNewTask = $('#dispatchId').RoleFormMultiUser()
      }
    },
    async cancelMyJob() {
      this.loading2 = true
      try {
        let appRunId = ''
        if (this.showModalAppId.indexOf(',') >= 0) {
          appRunId = this.showModalAppId.split(',')[1]
        }
        const res = await HTTP.cancelMyJob(appRunId)
        if (+res.code === 0) {
          this.dealResponse(res.code)
          this.getUnFinishJobList()
          this.$emit('close')
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
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
    dealTask(params) {
      this.approvalTitle = {
        appRunName: params.appRunName,
        nameSchema: params.nameSchema
      }
      if (['3', '6'].indexOf(params.taskType) !== -1) {
        this.showRender1(params)
        return
      }
      this.openApprvalModal(params)
    },

    getJumpNode(params) {
      HTTP.queryTurnNode(params)
        .then(res => {
          this.jumpParams.inParam = res.preNodeName
        })
        .catch(err => {
          console.log(err)
        })
      this.jumpModal = true
    },
    commitJumpTask(params) {
      this.jumpParams.outParam.appRunId = params.appRunId
      this.jumpParams.outParam.taskId = params.taskId
      this.jumpParams.outParam.ruWfTaskId = params.ruWfTaskId
      this.jumpParams.outParam.taskResult = params.taskResult
      this.jumpParams.outParam.targetNodeId = this.selected
      this.commitLoading = true
      HTTP.freeJump(this.jumpParams.outParam)
        .then(() => {
          this.$message.success('跳转成功')
          this.jumpModal = false
          //刷新列表
          this.getUnFinishJobList()
          this.$emit('close')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.commitLoading = false
        })
    },
    commitTurnTask(params) {
      this.turnParams.appRunId = params.appRunId
      this.turnParams.taskId = params.taskId
      this.turnParams.ruWfTaskId = params.ruWfTaskId
      this.turnParams.taskResult = params.taskResult
      // console.log(this.transApproval)
      //console.log(JSON.stringify(this.transApproval.GetUnitIDs()))
      this.turnParams.toUserId = this.transApproval.GetTransUnitIDs()
      // this.transApproval.
      var ValObjs = this.transApproval.GetValue()
      var toLoginName
      for (var key in ValObjs) {
        toLoginName = ValObjs[key].loginName
        // UintIDs.push(key)
      }
      if (Cookies.get('user') === toLoginName) {
        //不能选自已
        this.$message.error('转办失败，已是工作项的参与者')
        return 0
      }

      this.commitLoading = true

      HTTP.turnToDo(this.turnParams)
        .then(() => {
          this.$message.success('转办成功')
          //刷新待办列表
          this.getUnFinishJobList()
          this.turnModal = false
          this.$emit('close')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.commitLoading = false
        })
    },
    dispatchTask(data) {
      let param = {}
      param.appRunId = data.appRunId
      param.taskId = data.taskId
      param.ruWfTaskId = data.ruWfTaskId
      param.taskResult = data.suggest
      param.comment = data.suggest
      if (!this.dispatchNewTask.checkSelectUser()) {
        return
      }
      // param.toUserId =  this.dispatchNewTask.GetTransUnitIDs()
      var ValObjs = this.dispatchNewTask.GetValue()
      var NameList = []
      for (var key in ValObjs) {
        NameList.push(ValObjs[key].id)
        if (Cookies.get('user') === ValObjs[key].loginName) {
          //不能选自已
          this.$Message.error('加办失败,不能选择当前用户')
          return 0
        }
      }
      param.toUserId = NameList.join(',')

      this.disLoading = true
      HTTP.dispatchTask(param)
        .then(res => {
          if (res.code === '0') {
            console.log('加派成功')
            this.$Message.success('加派成功')
            this.dispatchNewTask.ClearChoices()
            this.currentApproval.props = {
              appRunId: '',
              taskId: '',
              suggest: '',
              ruWfTaskId: '',
              taskResult: '',
              taskType: '',
              instanceId: '',
              modelId: ''
            }
          } else {
            this.$Message.error(res.msg)
          }

          //刷新待办列表
          this.getUnFinishJobList()
          this.$emit('close')
        })
        .catch(err => {
          console.log(err)
          this.$Message.error(err)
        })
        .finally(() => {
          this.disLoading = false
        })
      this.dispatchModal = false
      this.modal2 = false
    },
    openApprvalModal(params) {
      this.currentAppId = params.appId
      this.currentApproval.props.appRunId = params.id
      this.currentApproval.props.taskId = params.taskId
      this.currentApproval.props.ruWfTaskId = params.ruWfTaskId
      this.currentApproval.props.taskResult = params.taskResult
      this.currentApproval.props.taskType = params.taskType
      this.currentApproval.props.instanceId = params.instanceId
      this.currentApproval.props.modelId = params.modelId
      this.currentApproval.props.createTime = params.createTime
      sessionStorage.setItem('tabAppId', this.currentAppId)
      this.$emit('showModal', {
        type: 'approval',
        index: params.createTime,
        data: params,
        page: 'unfinish-job'
      })
      this.loading = true
      HTTP.approvalDetail({
        busId: params.id,
        appId: params.appId,
        ruWfTaskId: params.ruWfTaskId
      })
        .then(res => {
          this.attachId = res.attachId // Word 模板导出
          this.currentApproval.data = res
          this.currentCode = params.id
          this.approvalName = res.ReturnData.Name
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSubmit(name, key) {
      if (this.loading) return
      this.returnSuccess = {}
      // 表单验证(zhulinghao)
      if (
        $.ControlManager.Validate({
          Action: 'Submit',
          doingWork: true
        }) !== 1
      ) {
        return false
      }
      this.loading = true
      this.returnSuccess.appRunId =
        name.appRunId === undefined ? name.id : name.appRunId
      this.returnSuccess.taskId = name.taskId
      this.returnSuccess.ruWfTaskId = name.ruWfTaskId
      this.returnSuccess.taskResult = name.taskResult
      this.returnSuccess.operation = key
      if (key !== 1) {
        this.returnSuccess.formData = JSON.stringify(
          $.ControlManager.GetSheetData(this.currentAppId)
        )
      }
      HTTP.agree(this.returnSuccess)
        .then(res => {
          if (+res.code === 0) {
            this.$message.success('办理成功!')
            //刷新列表
            this.getUnFinishJobList()
            this.$emit('close')
          } else this.$message.error(res.msg)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    commitFunctionNode(name) {
      if (this.loading) return
      // 表单验证(zhulinghao)
      if (
        !$.ControlManager.Validate({
          Action: 'Submit',
          doingWork: true
        }) !== 1
      ) {
        return false
      }
      this.loading = true
      const param = {}
      param.appRunId = name.appRunId || name.id
      name.appRunId === undefined ? name.id : name.appRunId
      param.ruWfTaskId = name.ruWfTaskId
      param.modelId = name.modelId
      param.formData = JSON.stringify(
        $.ControlManager.GetSheetData(this.currentAppId)
      )
      HTTP.commitFuncNode(param)
        .then(res => {
          if (+res.code === 0) {
            this.$message.success('提交成功!')
            //刷新列表
            this.getUnFinishJobList()
            this.$emit('close')
          } else this.$message.error(res.msg)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleTO() {
      this.turnModal = true
      this.$nextTick(() => {
        this.transApproval = $('#transApprovalId').RoleFormMultiUser()
      })
    },
    handleReset(name) {
      if (this.loading) return
      this.loading = true
      this.returnFail.appRunId =
        name.appRunId === undefined ? name.id : name.appRunId
      this.returnFail.taskId = name.taskId
      this.returnFail.ruWfTaskId = name.ruWfTaskId
      this.returnFail.taskResult = name.taskResult

      HTTP.reject(this.returnFail)
        .then(res => {
          if (+res.code === 0) {
            this.$message.success('办理成功!')
            this.getUnFinishJobList()
            this.$emit('close')
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleResetTS(name) {
      if (this.loading) return
      this.loading = true
      this.returnFail.appRunId = name.appRunId
      this.returnFail.taskId = name.taskId
      this.returnFail.ruWfTaskId = name.ruWfTaskId
      this.returnFail.taskResult = name.taskResult
      HTTP.turndown(this.returnFail)
        .then(res => {
          if (+res.code === 0) {
            this.$message.success('驳回成功!')
            //刷新列表
            this.getUnFinishJobList()
            this.$emit('close')
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    updateCC(name) {
      var param = {}
      param.appRunId = name.appRunId
      param.taskId = name.taskId
      param.ruWfTaskId = name.ruWfTaskId
      param.taskResult = name.taskResult
      this.loading = true
      HTTP.updateCC(param)
        .then(res => {
          if (+res.code === 0) {
            this.getUnFinishJobList()
            this.$emit('close')
            this.$message.success('办理成功!')
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSearch(val) {
      this.search = val
      this.getUnFinishJobList()
    },
    resetSearch() {
      this.search = {}
      this.$refs.controlBar.resetAll()
    },
    getUnFinishJobList(value = 0, pageNumber = false) {
      this.loadingData = true
      let param = {}

      // 搜索
      const {
        appRunName,
        nameSchema,
        dateRange,
        selectedApp,
        approvalIds
      } = this.search
      if (appRunName) param.appRunName = appRunName
      if (nameSchema) param.dataItem = nameSchema + ''
      if (dateRange) {
        param.queryStartTime = dateRange[0].getTime()
        param.endTime = dateRange[1].getTime()
      }
      if (selectedApp && selectedApp.length) {
        const temp = []
        selectedApp.forEach(app => {
          temp.push(app.id)
        })
        param.appIdList = JSON.stringify(temp)
      }
      if (approvalIds && approvalIds.length) {
        const ret = []
        for (let param of approvalIds) {
          ret.push(param.id)
        }
        param.startUserId = JSON.stringify(ret)
      }

      if (+this.$route.query.type) param.type = this.$route.query.type
      if (value === 0) {
        param.pageNum = 1
        this.downList = []
        this.pageData = {
          1: 2,
          2: 2,
          3: 2,
          4: 2,
          5: 2,
          totle: 2
        }
      } else if (value !== 0 && pageNumber) {
        param.pageNum = pageNumber
      } else {
        if (param.type) {
          param.pageNum = this.pageData[param.type]
        } else {
          param.pageNum = this.pageData.totle
        }
      }
      let that = this
      HTTP.unfinishJobList(param)
        .then(res => {
          if (value === 0) {
            this.downList = []
          } else if (value !== 0 && pageNumber) {
            //
          } else {
            if (param.type) {
              this.pageData[param.type]++
            } else {
              this.pageData.totle++
            }
          }
          let tmp = res.result
          this.$store.commit('setMessageCount', res.total)
          if (tmp && tmp.length > 0) {
            that.downTblList = []
            this.noMore = false
            for (let index = 0; index < tmp.length; index++) {
              for (var num in tmp[index].list) {
                if (tmp[index].list[num].propertyJson)
                  var propertyJsonStr = tmp[index].list[
                    num
                  ].propertyJson.replace(/\\\\"/g, '\\"')
                try {
                  tmp[index].list[num].json = JSON.parse(propertyJsonStr)
                } catch (error) {
                  console.log(`error in ${tmp[index].list[num].id}`)
                }
              }
              if (!pageNumber) {
                // 列表翻页请求数据 块状列表不刷新
                that.downList.push(tmp[index])
              }
              that.downTblList.push(tmp[index])
              that.listPage = pageNumber || this.pageData.totle - 1
              that.listTotal = res.total
            }
          } else {
            this.noMore = true
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loadingData = false
        })
    },
    closeDispatch() {
      this.currentApproval.props = {
        appRunId: '',
        taskId: '',
        suggest: '',
        ruWfTaskId: '',
        taskResult: '',
        taskType: '',
        instanceId: '',
        modelId: ''
      }
      this.dispatchNewTask.ClearChoices()
      this.dispatchModal = false

      //console.log(this.dispatchNewTask)
    },
    handleDispatch() {
      this.dispatchModal = true
      this.$nextTick(() => {
        this.dispatchNewTask = $('#dispatchId').RoleFormMultiUser()
      })
    },
    showRender1(params) {
      this.showModalAppId = params.appId + ',' + params.id
      this.$emit('showModal', {
        type: 'render',
        index: params.createTime,
        data: params,
        page: 'unfinish-job'
      })
      this.currentAppId = params.appId
    },
    openLogModal(param) {
      console.log(param)
      this.isLogModal = true
      this.logModalValue = {
        id: param.appRunId,
        ...param
      }
    },
    onLogModalClose() {
      setTimeout(() => {
        this.isLogModal = false
      }, 500)
    },
    delegatePrint() {
      document.querySelector(
        '[data-action=Print]'
      ).AppRunId = this.currentApproval.props.appRunId
      document.querySelector('[data-action=Print]').click()
    },
    delegateSubmit() {
      document.querySelector('[data-action=Submit]').click()
    },
    delegateSave() {
      document.querySelector('[data-action=Save]').click()
    },
    listPageChange(pageNumber) {
      this.getUnFinishJobList(1, pageNumber)
    },
    handleListSubmit(row) {
      this.handleSubmit(row, 1)
    },
    exportWordTemplate(param) {
      HTTP.exportWord({
        appId: this.currentAppId,
        appRunId: param.appRunId,
        attachmentId: this.attachId
      })
    }
  },
  watch: {
    '$route.query.type': function() {
      this.resetSearch()
      this.getUnFinishJobList()
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
  }
}
</script>

<style lang="scss" scoped>
.unfinish-job {
  height: 100%;
  overflow: auto;
}

.nodata {
  text-align: center;
}

.approval-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  overflow: hidden;
}

.approval-detail {
  flex: 1;
  overflow: auto;
  padding: 20px;

  &__title {
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

  &__opinion {
    background-color: #fafafa;
    padding: 10px;
    margin-bottom: 10px;
    font-size: $font-size-main;
  }
}

.approval-footer {
  padding: 10px;
  border-top: 1px solid #e4e3e3;
}
</style>

<style lang="scss">
.ivu-modal-body .form-group span {
  line-height: 20px;
}

#transApprovalId {
  width: 300px;

  & .icon-arrow-down-full {
    border-style: dashed !important;
    border-color: #ccc;
    line-height: 24px;
    display: block;
  }
}

#dispatchId {
  width: 300px;

  & .icon-arrow-down-full {
    border-style: dashed !important;
    border-color: #ccc;
    line-height: 24px;
    display: block;
  }
}

.unfinish-job #navbar {
  display: none;
}

.my-work-other {
  & .col-sm-10.col-xs-10 {
    padding-top: 6px;
  }

  & .col-sm-2.col-xs-2.ControlTitle {
    width: 16.66666667% !important;
  }

  & .col-md-6.col-sm-6.col-xs-6:first-of-type .col-sm-2.col-xs-2.ControlTitle {
    width: 34% !important;
  }

  & .col-md-6.col-sm-6.col-xs-6:first-of-type .col-sm-10.col-xs-10 {
    width: 66% !important;
  }
}
</style>

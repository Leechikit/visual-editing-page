<template>
  <div class="finish-work">
    <ControlBar
      ref="controlBar"
      v-show="viewType === 'listdata'"
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
      <WorkTimeline
        v-if="downList.length"
        type="finish"
        :data="downList"
        :noMore="noMore"
        @view="openLogModal"
        @load="getFinishJobList(1)"
      ></WorkTimeline>
    </div>
    <no-modal-approval-log
      v-if="viewType === 'log'"
      :value="logModalValue"
      :cancel-btn="false"
      @close="$emit('close')"
    ></no-modal-approval-log>
  </div>
</template>

<script>
import HTTP from '@/api/work-flow.js'
import NoModalApprovalLog from '@/views/flow-manager/designFlowModal/no-modal-approval-log-rebuild.vue'
import WorkTimeline from './work-timeline'
import ControlBar from './control-bar'

export default {
  name: 'finish-work',
  components: {
    NoModalApprovalLog,
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
      loadingData: true,
      downList: [],
      currentIndex: 1,
      noMore: false,
      logModalValue: {},
      search: {}
    }
  },
  mounted() {
    this.getFinishJobList()
  },
  methods: {
    handleSearch(val) {
      this.search = val
      this.getFinishJobList()
    },
    resetSearch() {
      this.search = {}
      this.$refs.controlBar.resetAll()
    },
    getFinishJobList(value = 0) {
      this.loadingData = true
      let param = {}
      if (value === 0) {
        param.pageNum = 1
        this.downList = []
        this.currentIndex = 1
      } else {
        param.pageNum = this.currentIndex
      }

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

      HTTP.finishJobList(param)
        .then(res => {
          let tmp = res.result

          if (tmp.length > 0) {
            this.noMore = false
            this.currentIndex++
            for (var index = 0; index < tmp.length; index++) {
              for (var num in tmp[index].list) {
                try {
                  if (tmp[index].list[num].propertyJson)
                    tmp[index].list[num].json = JSON.parse(
                      tmp[index].list[num].propertyJson
                    )
                } catch (error) {
                  console.log(`error in ${tmp[index].list[num].id}`)
                }
              }
              this.downList.push(tmp[index])
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
    openLogModal(param) {
      this.logModalValue = param
      this.$emit('showModal', {
        type: 'log',
        index: param.createTime,
        data: param,
        page: 'finish-work'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.finish-work {
  height: 100%;
  overflow: auto;
}

.nodata {
  text-align: center;
}
</style>

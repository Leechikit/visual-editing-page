<template>
  <div>
    <div>
      <el-table
        v-loading="loading"
        stripe
        size="mini"
        :data="listData"
        style="width: 100%; border: 1px solid #ebeef5;"
      >
        <el-table-column prop="jobName" label="作业名称"></el-table-column>
        <el-table-column
          prop="shardingTotalCount"
          label="作业分片"
        ></el-table-column>
        <el-table-column prop="cron" label="cron表达式"></el-table-column>
        <el-table-column
          prop="description"
          label="作业描述信息"
        ></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag
              size="mini"
              :type="getJobStatus(scope.row.status, 'type')"
              >{{ getJobStatus(scope.row.status, 'name') }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import HTTP from '@/api/console'
export default {
  data() {
    return {
      loading: false,
      listData: [],
      jobStatusMap: {
        OK: { name: '运行中', type: 'success' },
        CRASHED: { name: '已下线', type: 'info' },
        DISABLED: { name: '已失效', type: 'danger' },
        SHARDING_FLAG: { name: '分片待调整', type: 'warning' }
      }
    }
  },
  mounted() {
    this.loadJobs()
  },
  methods: {
    loadJobs() {
      this.loading = true
      HTTP.allJobsBriefInfo()
        .then(res => {
          if (res.code === '0') {
            this.listData = res.datas
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    getJobStatus(status, key) {
      if (status) {
        return this.jobStatusMap[status][key]
      }
    }
  }
}
</script>

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
        <el-table-column prop="serverIp" label="服务器IP"></el-table-column>
        <el-table-column
          prop="instancesNum"
          label="运行实例数"
        ></el-table-column>
        <el-table-column prop="jobsNum" label="作业总数"></el-table-column>
        <el-table-column
          prop="disabledJobsNum"
          label="禁止作业数"
        ></el-table-column>
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
      listData: []
    }
  },
  mounted() {
    this.loadServerJobs()
  },
  methods: {
    loadServerJobs() {
      this.loading = true
      HTTP.getAllServersBriefInfo()
        .then(res => {
          if (res) {
            this.listData = res
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

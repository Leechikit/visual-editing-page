<template>
  <div class="data-source-list">
    <div>
      <el-table
        v-loading="loading"
        stripe
        size="mini"
        :data="listData"
        style="width: 100%; border: 1px solid #ebeef5;"
      >
        <el-table-column
          prop="name"
          label="事件追踪数据源名称"
        ></el-table-column>
        <el-table-column
          prop="driver"
          label="事件追踪数据源驱动"
        ></el-table-column>
        <el-table-column
          prop="url"
          label="事件追踪数据源连接地址"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="事件追踪数据源用户名"
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
    this.loadDataSource()
  },
  methods: {
    loadDataSource() {
      this.loading = true
      HTTP.loadActive()
        .then(res => {
          if (res.code === '0') {
            this.listData.push(res.datas)
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.data-source-list {
  /deep/ .el-table td .cell {
    white-space: normal;
  }
}
</style>

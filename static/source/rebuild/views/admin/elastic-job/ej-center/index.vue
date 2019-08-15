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
        <el-table-column prop="name" label="注册中心名称"></el-table-column>
        <el-table-column
          prop="zkAddressList"
          label="注册中心地址"
        ></el-table-column>
        <el-table-column prop="namespace" label="命名空间"></el-table-column>
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
    this.loadZkList()
  },
  methods: {
    loadZkList() {
      this.loading = true
      HTTP.getZkList()
        .then(res => {
          if (res.code === '0') {
            if (res.datas) {
              this.listData.push(res.datas)
            } else {
              HTTP.addZKList().then(res => {
                if (res.code === '0') {
                  this.listData.push(res.datas)
                }
              })
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

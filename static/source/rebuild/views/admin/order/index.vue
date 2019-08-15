<template>
  <div class="orderList">
    <div class="g-container-column">
      <div class="g-header u-bd-bottom">
        <PageTitle text="订单管理"></PageTitle>
      </div>
      <div class="g-main u-pd-15-20">
        <ControlBar ref="controlBar" @search="handleSearch"></ControlBar>
        <el-table
          v-loading="loading"
          stripe
          border
          size="mini"
          :data="listData"
          style="width: 100%; border: 1px solid #ebeef5;margin-top:24px;"
          empty-text="尚未创建订单"
        >
          <el-table-column
            prop="id"
            label="订单编号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="eadpOrderId"
            label="eadp订单编号"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="creatorName"
            label="购买用户"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="购买时间"
            show-overflow-tooltip
            :formatter="formatDateTime"
          ></el-table-column>
          <el-table-column
            prop="templateIds"
            label="包含模板"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column prop="expireTime" label="到期时间"></el-table-column> -->
          <el-table-column label="状态" width="80">
            <template slot-scope="scope">
              <el-tag size="mini" type="success">{{
                getStatusText(scope.row)
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                class="oper-agree"
                @click.stop="viewDetl(scope.row)"
              >
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagenation">
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
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageTitle from '@/rebuild/components/pageTitle'
import ControlBar from './components/control-bar'
import HTTP_ADMIN from '@/rebuild/api/admin'

export default {
  name: 'templateList',
  components: {
    PageTitle,
    ControlBar
  },
  data() {
    return {
      listData: [],
      total: 0,
      pageNum: 0,
      pageSize: 10,
      loading: false,
      search: {},
      status: {
        '0': '已启用',
        '1': '停用'
      }
    }
  },
  created() {
    this.resetData()
    this.loading = false
    this.getData()
  },
  methods: {
    // 重置数据
    resetData() {
      this.loading = true
      this.listData = []
      this.pageNum = 1
      this.pageSize = 10
      this.total = 0
    },
    // 获取数据
    async getData() {
      this.loading = true
      var params = {
        ...this.search,
        status: 0,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      var listRes = await HTTP_ADMIN.getOrderList(params)
      if (listRes.code === '0') {
        this.listData = listRes.page.result
        this.total = listRes.page.total
      } else {
        this.$message.error(listRes.msg)
      }
      this.loading = false
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
    handleSearch(val) {
      this.search = val
      this.getData()
    },
    viewDetl(row) {
      this.$router.push({ name: 'orderdetl', params: { id: row.eadpOrderId } })
    },
    getStatusText(row) {
      return this.status[row.status]
    },
    formatDateTime(row) {
      return new Date(row.createTime).Format('yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';
@import '~@/rebuild/assets/style/layout.scss';
.orderList {
  height: 100%;
  .g-main {
    overflow: scroll;
  }
  .u-bd-bottom {
    border-bottom: 1px solid $color-layout-border;
  }
  .u-pd-15-20 {
    padding: 15px 20px;
  }
  /deep/ {
    .el-pagination {
      margin-top: 20px;
    }
  }
}
</style>

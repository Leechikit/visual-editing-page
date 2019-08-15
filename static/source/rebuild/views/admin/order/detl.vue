<template>
  <div class="orderList">
    <div class="g-container-column">
      <div class="g-header u-bd-bottom">
        <PageTitle text="订单详情"></PageTitle>
      </div>
      <div class="g-main u-pd-30-40" v-loading="loading">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="el-list__key-val">
              <div class="el-list__key">订单编号</div>
              <div class="el-list__val">{{ detl.id }}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="el-list__key-val">
              <div class="el-list__key">购买用户</div>
              <div class="el-list__val">{{ detl.creatorName }}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="el-list__key-val">
              <div class="el-list__key">用户ID</div>
              <div class="el-list__val">{{ detl.createUserId }}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="el-list__key-val">
              <div class="el-list__key">购买时间</div>
              <div class="el-list__val">
                {{ detl.createTime | formatDateTime }}
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="24">
            <div class="el-list__key-val">
              <div class="el-list__key">到期时间</div>
              <div class="el-list__val">2019-02-02 18:00:00</div>
            </div>
          </el-col> -->
          <el-col :span="24">
            <div class="el-list__key-val">
              <div class="el-list__key">状态</div>
              <div class="el-list__val">{{ getStatusText(detl.status) }}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="el-list__key-val">
              <div class="el-list__key">备注</div>
              <div class="el-list__val">{{ detl.remark }}</div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="el-list__key-val">
              <div class="el-list__key">包含模板</div>
              <div class="el-list__val">
                共包含{{ detl.templateLength }}个模板
              </div>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="el-list__key-val">
              <div class="el-list__key"></div>
              <div class="el-list__val">
                <el-table
                  stripe
                  size="mini"
                  :data="listData"
                  style="width: 100%; border: 1px solid #ebeef5;width:800px;"
                >
                  <el-table-column prop="id" label="模板编号"></el-table-column>
                  <el-table-column
                    prop="user"
                    label="模板名称"
                  ></el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="表单数"
                  ></el-table-column>
                  <el-table-column
                    prop="expireTime"
                    label="报表数"
                  ></el-table-column>
                  <el-table-column prop="state" label="状态"></el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="g-footer u-bd-top">
        <div class="footer-btns">
          <el-button type="default" size="small" @click="goBack"
            >返回</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageTitle from '@/rebuild/components/pageTitle'
import HTTP_ADMIN from '@/rebuild/api/admin'

export default {
  name: 'templateList',
  components: {
    PageTitle
  },
  data() {
    return {
      listData: [],
      detl: {},
      id: this.$route.params.id,
      loading: false,
      status: {
        '0': '已启用',
        '1': '停用'
      }
    }
  },
  created() {
    this.loading = false
    this.getData()
  },
  mouted() {
    if (!this.id) {
      this.$message.error('非法访问')
      history.go(-1)
    }
  },
  methods: {
    // 获取数据
    async getData() {
      this.loading = true
      var params = {
        eadpOrderId: this.id
      }
      var listRes = await HTTP_ADMIN.getOrderDetl(params)
      if (listRes.code === '0') {
        this.detl = listRes.eadpOrder
        this.detl.templateLength = this.detl.templateIds.split(';').length || 0
      } else {
        this.$message.error(listRes.msg)
      }
      this.loading = false
    },
    getStatusText(val) {
      let text = this.status[val]
      return text
    },
    goBack() {
      history.go(-1)
    }
  },
  filters: {
    formatDateTime(val) {
      if (val) {
        return new Date(val).Format('yyyy-MM-dd hh:mm:ss')
      } else {
        return null
      }
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
  .u-pd-30-40 {
    padding: 30px 40px;
  }
  .u-bd-top {
    border-top: 1px solid $color-layout-border;
  }
  .g-footer {
    height: 50px;
    padding: 0 20px;
    .footer-btns {
      height: 100%;
      display: flex;
      align-items: center;
      .el-button {
        width: 80px;
      }
    }
  }
  .el-list__key-val {
    display: flex;
    align-items: center;
    > div {
      font-size: 14px;
      padding-bottom: 30px;
    }
    .el-list__key {
      margin-right: 8px;
      color: color-remind;
      white-space: nowrap;
      width: 80px;
    }
    .el-list__val {
      color: #3c3c3c;
      width: 100%;
    }
  }
}
</style>

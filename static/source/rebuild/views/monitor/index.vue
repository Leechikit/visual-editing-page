<template>
  <div class="demo2">
    <Nav opacity="1" display="none"></Nav>
    <div class="g-container-column">
      <div class="g-header u-bd-bottom">
        <PageTitle text="监控中心"></PageTitle>
      </div>
      <div class="g-main">
        <div class="g-container">
          <div v-loading="loading" class="g-main u-pd-20-20 monitor-container">
            <div class="monitor-page">
              <el-row :gutter="16">
                <el-col :span="12" class="monitor-block">
                  <InfoCard
                    title="今日常用表单"
                    type="bar"
                    :data="charts.forms[todayCond]"
                  >
                    <div slot="right" class="card-right">
                      <span
                        class="card-cond"
                        :class="{ 'card-cond-active': todayCond === 'users' }"
                        @click="todayCond = 'users'"
                      >
                        按人数
                      </span>
                      <span
                        class="card-cond"
                        :class="{
                          'card-cond-active': todayCond === 'frequence'
                        }"
                        @click="todayCond = 'frequence'"
                      >
                        按频次
                      </span>
                    </div>
                  </InfoCard>
                </el-col>
                <el-col :span="12" class="monitor-block">
                  <InfoCard
                    title="工作事项"
                    type="list"
                    :data="charts.tasks"
                  ></InfoCard>
                  <div style="min-height: 16px;"></div>
                  <InfoCard
                    title="订单数"
                    type="list"
                    :data="charts.orders"
                  ></InfoCard>
                </el-col>
              </el-row>
              <el-row class="monitor-block">
                <InfoCard title="本月登录" type="bar" :data="charts.logins">
                </InfoCard>
              </el-row>
              <el-row :gutter="16">
                <el-col :span="12" class="monitor-block">
                  <InfoCard
                    title="数据统计"
                    type="list"
                    :data="charts.statis"
                  ></InfoCard>
                  <div style="min-height: 16px;"></div>
                  <InfoCard
                    title="其他"
                    type="list"
                    :data="charts.others"
                  ></InfoCard>
                </el-col>
                <el-col :span="12" class="monitor-block">
                  <InfoCard
                    title="用户数"
                    type="pie"
                    :data="charts.users"
                  ></InfoCard>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/rebuild/api/monitor'
import PageTitle from '@/rebuild/components/pageTitle'
import Nav from '@/rebuild/components/nav'
import InfoCard from './components/info-card'

export default {
  name: 'Monitor',
  components: {
    PageTitle,
    Nav,
    InfoCard
  },
  mounted() {
    this.getCharts()
  },
  data() {
    return {
      loading: false,
      todayCond: 'users', // users-按人数 frequence-按频次
      charts: {
        // 今日常用表单
        forms: {
          users: [], // 按人数
          frequence: [] // 按频次
        },
        tasks: [], // 工作事项
        orders: [], // 订单数
        logins: [], // 本月登录
        statis: [], // 数据统计
        others: [], // 其他
        users: [] // 用户数
      }
    }
  },
  methods: {
    async getCharts() {
      try {
        this.loading = true
        const res = await API.getMonitorApp()
        if (res.code === '0') {
          const data = JSON.parse(res.data)
          data.orderFailNums.warn = true
          this.charts.forms.users = data.form.formUsers
          this.charts.forms.frequence = data.form.formFreq
          this.charts.tasks = [
            data.approveTask,
            data.fillTaskCount,
            data.ccTaskCount
          ]
          this.charts.orders = [
            data.orderNums,
            data.orderSuccNums,
            data.orderFailNums
          ]
          this.charts.logins = data.logerUsers
          this.charts.statis = [data.formNums, data.fileNums]
          this.charts.others = [data.moduleNums, data.reportNums]
          this.charts.users = [
            data.totalUserNums,
            data.userRunningNums,
            data.userDisabledNums
          ]
        } else {
          this.$message.error(res.msg)
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/rebuild/assets/style/layout.scss';

.demo2 {
  height: 100%;
  padding-top: 50px;
  background-color: #fff;
  .u-bd-bottom {
    border-bottom: 1px solid $color-layout-border;
  }
  .u-bd-right {
    border-right: 1px solid $color-layout-border;
  }
  .u-pd-20-20 {
    padding: 20px 20px;
  }
  .u-pd-20-30 {
    padding: 20px 30px;
  }
}
</style>

<style lang="scss" scoped>
.monitor-container {
  background-color: #ecf0f5;

  .monitor-page {
    max-width: 1200px;
    margin: 0 auto;

    .monitor-block {
      height: 368px;
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;

      .card-right {
        float: right;
        height: 100%;
        display: flex;
        align-items: center;

        .card-cond {
          color: $color-remind;
          font-size: $font-size-main;
          margin-left: 20px;
          cursor: pointer;

          &-active {
            color: $color-main;
          }
        }
      }
    }
  }
}
</style>

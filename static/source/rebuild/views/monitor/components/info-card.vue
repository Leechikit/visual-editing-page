<template>
  <div class="info-card">
    <div class="card-header">
      <slot>
        <i class="iconfont iconLbiaojixiangqing"></i>
        <span class="card-title">{{ title }}</span>
        <slot name="right"></slot>
      </slot>
    </div>
    <div class="card-body">
      <component :is="compType" :data="compData"></component>
    </div>
  </div>
</template>

<script>
import HoriList from './hori-list'
import ChartBar from './chart-bar'
import ChartPie from './chart-pie'

export default {
  name: 'InfoCard',
  components: {
    HoriList,
    ChartBar,
    ChartPie
  },
  props: {
    type: String,
    title: String,
    data: Array
  },
  computed: {
    compData() {
      const categories = this.data.map(item => item.name)
      const series = this.data.map(item => item.value)
      switch (this.type) {
        case 'list':
          return this.data
        case 'bar':
          return {
            categories,
            series
          }
        case 'pie':
          // 饼图第一项数据【总数】在图上不显示但 legend 要显示，所以将 value 置为 0
          return {
            categories,
            series: this.data.map((item, index) => ({
              name: item.name,
              value: index && item.value,
              realVal: item.value
            }))
          }
        default:
          return ''
      }
    },
    compType() {
      switch (this.type) {
        case 'list': // 明细表
          return 'HoriList'
        case 'bar': // 柱状图
          return 'ChartBar'
        case 'pie': // 饼图
          return 'ChartPie'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 12px;

  .card-header {
    margin-bottom: 10px;

    .card-title {
      color: $color-normal;
      font-size: 16px;
      vertical-align: text-bottom;
    }

    .iconfont {
      font-size: 24px;
      color: $color-main;
    }
  }

  .card-body {
    flex: 1;
  }
}
</style>

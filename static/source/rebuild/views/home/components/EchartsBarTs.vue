<template>
  <div ref="bar" class="echart-bar"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    data: Object
  },
  data() {
    return {}
  },
  computed: {
    setOption() {
      return {
        color: ['#327DFF', '#F7B500', '#DE6573'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '20px',
          right: '50px',
          bottom: '50px',
          top: '0',
          containLabel: true
        },
        legend: {
          icon: 'square',
          bottom: '10px',
          left: '20px',
          itemHeight: 8,
          itemWidth: 14,
          itemGap: 40,
          data: this.data.legend
        },
        yAxis: [
          {
            type: 'category',
            data: this.data.categories
              .map(item => item.substr(3))
              .filter(item => item !== ' ' && item),
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#787878'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f0f0f0'
              }
            }
          }
        ],
        xAxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#787878'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f0f0f0'
              }
            }
          }
        ],
        series: this.data.series.map(item => {
          return {
            name: item.name,
            type: 'bar',
            barWidth: '10px',
            data: item.data
          }
        })
      }
    }
  },
  mounted() {
    var that = this
    this.chart = echarts.init(this.$refs.bar)
    this.chart.setOption(this.setOption)
    window.addEventListener('resize', function() {
      that.chart.resize()
    })
  }
}
</script>
<style lang="scss" scoped>
.echart-bar {
  width: 100%;
  height: 100%;
}
</style>

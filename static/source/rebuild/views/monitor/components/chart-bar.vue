<template>
  <div ref="myChart" class="my-chart"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

export default {
  name: 'ChartBar',
  props: {
    data: Object
  },
  mounted() {
    this.renderChart()
  },
  watch: {
    data() {
      this.renderChart()
    }
  },
  methods: {
    renderChart() {
      const myChart = echarts.init(this.$refs.myChart)

      myChart.setOption(
        {
          color: ['#327DFF', '#F7B500'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: 20,
            right: 20,
            bottom: 20,
            top: 20,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.data.categories,
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                show: false
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
          series: [
            {
              type: 'bar',
              barWidth: 20,
              data: this.data.series
            }
          ]
        },
        true
      )

      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style scoped>
.my-chart {
  width: 100%;
  height: 100%;
}
</style>

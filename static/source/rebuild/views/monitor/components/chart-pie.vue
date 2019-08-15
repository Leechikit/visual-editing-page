<template>
  <div ref="myChart" class="my-chart"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  name: 'ChartPie',
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
      const color = ['#464646', '#327DFF', '#F7B500', '#DE6573']
      const myChart = echarts.init(this.$refs.myChart)

      myChart.setOption(
        {
          color,
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            icon: 'square',
            orient: 'vertical',
            align: 'left',
            top: '30%',
            left: '55%',
            itemGap: 30,
            itemWidth: 8,
            itemHeight: 10,
            formatter: name => {
              const cur = this.data.series.find(item => item.name === name)
              return `{name|${name}} {value|${cur.realVal}}`
            },
            data: this.data.categories.map((item, index) => ({
              name: item,
              textStyle: {
                padding: [0, 0, 0, 5],
                rich: {
                  name: {
                    color: '#464646',
                    fontSize: 12,
                    width: 120
                  },
                  value: {
                    color: color[index],
                    fontSize: 16
                  }
                }
              }
            }))
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '55%'],
              center: ['30%', '50%'],
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
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

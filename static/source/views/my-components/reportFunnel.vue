<template>
  <div style="width:100%;height:300px;" :id="currentId"></div>
</template>

<script>
import echarts from 'echarts';
import { theme1 } from '@/styles/echarts.js';

echarts.registerTheme('walden', theme1);

export default {
  name: 'reportFunnel',
  data () {
    return {
      currentId: 'data_source_con' + this.ident
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    ident: {
      type: String
    }
  },
  watch: {
    data () {
      this.renderChart();
    }
  },
  mounted () {
    this.renderChart();
  },
  methods: {
    renderChart () {
      this.$nextTick(() => {
        const option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          legend: {
            data: this.data.categories
          },
          series: [
            {
              name: this.data.series[0].name,
              type: 'funnel',
              left: '10%',
              top: 60,
              bottom: 60,
              width: '60%',
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  formatter: '{b}({c})'
                },
                emphasis: {
                  textStyle: {
                    fontSize: 20
                  }
                }
              },
              labelLine: {
                normal: {
                  length: 20,
                  lineStyle: {
                    width: 1,
                    type: 'solid'
                  }
                }
              },
              itemStyle: {
                normal: {
                  borderColor: '#fff',
                  borderWidth: 0
                }
              },
              data: this.data.series[0].data
            }
          ]
        };
        const dataSourceFunnel = echarts.init(document.getElementById(this.currentId), 'walden');
        dataSourceFunnel.setOption(option, true);
        window.addEventListener('resize', () => {
          dataSourceFunnel.resize();
        });
      });
    }
  }
};
</script>

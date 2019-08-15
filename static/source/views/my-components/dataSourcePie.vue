<template>
  <div style="width:100%;height:300px;" :id="currentId"></div>
</template>

<script>
import echarts from 'echarts';
import { theme1 } from '@/styles/echarts.js';

echarts.registerTheme('walden', theme1);

export default {
  name: 'dataSourcePie',
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
      var vm = this;
      this.$nextTick(() => {
        const option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: vm.data.categories
          },
          series: [
            {
              name: vm.data.series[0].name,
              type: 'pie',
              radius: '66%',
              center: ['50%', '60%'],
              data: vm.data.series[0].data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        const dataSourcePie = echarts.init(
          document.getElementById(this.currentId),
          'walden'
        );
        dataSourcePie.setOption(option, true);
        window.addEventListener('resize', () => {
          dataSourcePie.resize();
        });
      });
    }
  }
};
</script>

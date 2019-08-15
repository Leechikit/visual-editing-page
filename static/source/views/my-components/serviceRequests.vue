<template>
  <div style="width:100%;height:300px;" :id="currentId"></div>
</template>

<script>
import echarts from 'echarts';
import { theme1 } from '@/styles/echarts.js';

echarts.registerTheme('walden', theme1);

export default {
  name: 'serviceRequests',
  props: {
    data: {
      type: Object,
      default: {}
    },
    ident: {
      type: String
    }
  },
  data () {
    return {
      currentId: 'service_request_con' + this.ident
    };
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
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: this.data.legend
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          top: '15%',
          left: '1.2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.data.categories
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.data.series
      };
      const serviceRequestCharts = echarts.init(
        document.getElementById(this.currentId),
        'walden'
      );
      serviceRequestCharts.setOption(option, true);
      window.addEventListener('resize', () => {
        serviceRequestCharts.resize();
      });
    }
  }
};
</script>
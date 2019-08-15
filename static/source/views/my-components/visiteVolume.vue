<template>
  <div style="width:100%;height:300px;" :id="currentId"></div>
</template>

<script>
import echarts from 'echarts';
import { theme1 } from '@/styles/echarts.js';

echarts.registerTheme('walden', theme1);

export default {
  name: 'visiteVolume',
  data () {
    return {
      currentId: 'visite_volume_con' + this.ident
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
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top: '10%',
            left: '2%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: this.data.categories,
            nameTextStyle: {
              color: '#c3c3c3'
            }
          },
          series: this.data.series
        };
        const visiteVolume = echarts.init(
          document.getElementById(this.currentId),
          'walden'
        );
        visiteVolume.setOption(option, true);
        window.addEventListener('resize', () => {
          visiteVolume.resize();
        });
      });
    }
  }
};
</script>

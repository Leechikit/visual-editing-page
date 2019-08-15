<template>
    <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
import './color1/walden.js'
import echarts from 'echarts';
import {theme1} from '@/styles/echarts.js'
echarts.registerTheme('walden',theme1 );
export default {
    name: 'visiteVolume',
    data () {
        return {
            //
        };
    },
     props: {
        data: {
            type: Object,
            default: {}
        },
    },
    mounted () {
        this.$nextTick(() => {
            let visiteVolume = echarts.init(document.getElementById('visite_volume_con'),'walden');
            let xAxisData = [];
            let data1 = [];
            let data2 = [];
            for (let i = 0; i < 20; i++) {
                xAxisData.push('类目' + i);
                data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
            }

             const option = {

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
                    data:this.data.categories,
                    nameTextStyle: {
                        color: '#c3c3c3'
                    }
                },
                series: this.data.series,
            };

            visiteVolume.setOption(option);

            window.addEventListener('resize', function () {
                visiteVolume.resize();
            });
        });
    }
};
</script>

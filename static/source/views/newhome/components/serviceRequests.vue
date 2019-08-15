<template>
    <div style="width:100%;height:100%;" id="service_request_con"></div>
</template>

<script>
import './color1/walden.js'
import echarts from 'echarts';
import {theme1} from '@/styles/echarts.js'


echarts.registerTheme('walden',theme1 );


export default {
    name: 'serviceRequests',
    props: {
        data:Object
    },
    mounted () {
        console.log(this.data)
       const option = {
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
                    data:this.data.legend
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
                    data: this.data.categories,
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: this.data.series,
        };
        const serviceRequestCharts = echarts.init(document.getElementById('service_request_con'),'walden');
        serviceRequestCharts.setOption(option);

        window.addEventListener('resize', function () {
            serviceRequestCharts.resize();
        });
    }
};
</script>
<template>
<Card v-if="copyReports.length" shadow class="report-card">
  <Tabs :value="`tab-${copyReports[0].index}`">
    <TabPane
      v-for="report in copyReports"
      :key="report.index"
      :label="report.text"
      :name="`tab-${report.index}`"
    >
      <query-condition
        :qryStr="report.sqlQry"
        :qryIndex="report.index"
        @query-condition="getReportBySqlqry($event, report)"
      ></query-condition>
      <component
        :is="getChartComp(report.type)"
        :data="report"
        :ident="`${pos}-${report.index}`"
      ></component>
    </TabPane>
  </Tabs>
</Card>
</template>

<script>
import HTTP from '@/api/report.js';
import dataSourcePie from './dataSourcePie.vue';
import visiteVolume from './visiteVolume.vue';
import serviceRequests from './serviceRequests.vue';
import reportTable from './reportTable.vue';
import reportFunnel from './reportFunnel.vue';
import queryCondition from './queryCondition.vue';

export default {
  name: 'ReportCard',
  components: {
    dataSourcePie,
    visiteVolume,
    serviceRequests,
    reportTable,
    reportFunnel,
    queryCondition
  },
  props: {
    reportId: String,
    reports: {
      type: Array,
      default: []
    },
    pos: String
  },
  data () {
    return {
      copyReports: JSON.parse(JSON.stringify(this.reports))
    };
  },
  watch: {
    reports () {
      this.copyReports = JSON.parse(JSON.stringify(this.reports));
    }
  },
  methods: {
    async getReportBySqlqry (obj, report) {
      // obj.index 放置了图表的index
      try {
        const param = {
          id: this.reportId,
          sqlValueMap: obj.sqlValueMap
        };
        const res = await HTTP.getDataSqlQry(param);
        if (res.code === '0') {
          // 先在返回数据找到对应index的辣条数据
          const _data = res.data.find(item => item.index === obj.index);
          // 保持 report 引用不变，更改相应属性值
          Object.assign(report, _data);
        } else {
          throw new Error(res.msg);
        }
      } catch (error) {
        this.$Message.error(error.message || '查询出错');
      }
    },
    getChartComp (type) {
      switch (type.toString()) {
        case '1':
          return 'serviceRequests';
        case '2':
          return 'visiteVolume';
        case '3':
          return 'dataSourcePie';
        case '4':
          return 'reportTable';
        case '5':
          return 'reportFunnel';
        default:
          return '';
      }
    }
  }
};
</script>

<style lang="less">
.report-card {
  overflow: hidden;

  .ivu-card-body {
    padding: 0;
  }

  .ivu-tabs-bar {
    background-color: #eaeaea;
    margin-bottom: 5px;
  }

  .ivu-tabs-tab {
    font-weight: bold;
    margin: 0;
  }

  .ivu-tabs-nav {
    text-align: left!important;
    overflow: auto;
  }
}
</style>

<template>
  <div class="reportStyle">
    <div v-for="(layout, index) in layouts" :key="index" class="layout-row">
      <Row v-if="layout.type === 1" class="layout-card">
        <Card shadow class="my-card">
          <Tabs :value="`tab-${layout.reports[0].index}`">
            <TabPane
              v-for="report in layout.reports"
              :key="report.index"
              :label="report.text"
              :name="`tab-${report.index}`"
            >
              <div class="my-card-bar">
                <div class="my-card-bar__query">
                  <query-condition
                    :qryStr="report.sqlQry"
                    :qryIndex="report.index"
                    @query-condition="getReportBySqlqry"
                  ></query-condition>
                </div>
                <div class="my-card-bar__export">
                  <Button
                    type="ghost"
                    size="small"
                    icon="android-download"
                    @click="$refs.exportModal.show(reportId, report.index)"
                  >导出</Button>
                </div>
              </div>
              <component
                :is="getChartComp(report.type)"
                :data="report"
                :ident="`${index}-${report.index}-row`"
              ></component>
            </TabPane>
          </Tabs>
        </Card>
      </Row>
      <Row v-if="layout.type === 2">
        <Col span="12" class="layout-card">
          <Card v-if="layout.leftReports.length" shadow class="my-card">
            <Tabs :value="`tab-${layout.leftReports[0].index}`">
              <TabPane
                v-for="report in layout.leftReports"
                :key="report.index"
                :label="report.text"
                :name="`tab-${report.index}`"
              > 
                <div class="my-card-bar">
                  <div class="my-card-bar__query">
                    <query-condition
                      :qryStr="report.sqlQry"
                      :qryIndex="report.index"
                      @query-condition="getReportBySqlqry"
                    ></query-condition>
                  </div>
                  <div class="my-card-bar__export">
                    <Button
                      type="ghost"
                      size="small"
                      icon="android-download"
                      @click="$refs.exportModal.show(reportId, report.index)"
                    >导出</Button>
                  </div>
                </div>
                <component
                  :is="getChartComp(report.type)"
                  :data="report"
                  :ident="`${index}-${report.index}-left`"
                ></component>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span="12" class="layout-card">
          <Card v-if="layout.rightReports.length" shadow class="my-card">
            <Tabs :value="`tab-${layout.rightReports[0].index}`">
              <TabPane
                v-for="report in layout.rightReports"
                :key="report.index"
                :label="report.text"
                :name="`tab-${report.index}`"
              >
                <div class="my-card-bar">
                  <div class="my-card-bar__query">
                    <query-condition
                      :qryStr="report.sqlQry"
                      :qryIndex="report.index"
                      @query-condition="getReportBySqlqry"
                    ></query-condition>
                  </div>
                  <div class="my-card-bar__export">
                    <Button
                      type="ghost"
                      size="small"
                      icon="android-download"
                      @click="$refs.exportModal.show(reportId, report.index)"
                    >导出</Button>
                  </div>
                </div>            
                <component
                  :is="getChartComp(report.type)"
                  :data="report"
                  :ident="`${index}-${report.index}-right`"
                ></component>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
    <exportModal ref="exportModal" />
  </div>
</template>

<script>
// 关于type:
// 1：折线图；
// 2：柱状图；
// 3：饼图
// 4: 明细表 TODO
// 5: 漏斗
import HTTP from '@/api/report.js';
import dataSourcePie from '../../my-components/dataSourcePie.vue';
import visiteVolume from '../../my-components/visiteVolume.vue';
import serviceRequests from '../../my-components/serviceRequests.vue';
import reportTable from '../../my-components/reportTable.vue';
import reportFunnel from '../../my-components/reportFunnel.vue';
import queryCondition from '../../my-components/queryCondition.vue';
import exportModal from './report-export-modal.vue';

export default {
  components: {
    dataSourcePie,
    visiteVolume,
    serviceRequests,
    reportTable,
    reportFunnel,
    queryCondition,
    exportModal
  },
  props: {
    reportId: {
      type: String
    },
    reportName: {
      type: String
    }
  },
  data () {
    return {
      layouts: []
    };
  },
  mounted () {
    this.getListReport();
  },
  watch: {
    reportId () {
      this.getListReport();
    }
  },
  methods: {
    getListReport () {
      if (!this.reportId) return;
      this.layouts = [];
      HTTP.getData({ id: this.reportId })
        .then(data => {
          if (data.code === '0') {
            if (data.data.length === 0) {
              this.$Message.warning('无数据,请前往配置页');
            } else {
              const cyberList = data.data;
              const originLayouts = JSON.parse(data.layout || '[]');
              let useIndexs = [];
              originLayouts.forEach(item => {
                if (item.type === 1) {
                  const newReports = [];
                  useIndexs = useIndexs.concat(item.reports);
                  item.reports.forEach(re => {
                    const rep = cyberList.find(el => el.index === re);
                    if (rep) newReports.push(rep);
                  });
                  if (newReports.length) {
                    this.layouts.push({
                      type: 1,
                      reports: newReports
                    });
                  }
                } else if (item.type === 2) {
                  const newLeftReports = [];
                  const newRightReports = [];
                  useIndexs = useIndexs.concat(item.leftReports, item.rightReports);
                  item.leftReports.forEach(re => {
                    const rep = cyberList.find(el => el.index === re);
                    if (rep) newLeftReports.push(rep);
                  });
                  item.rightReports.forEach(re => {
                    const rep = cyberList.find(el => el.index === re);
                    if (rep) newRightReports.push(rep);
                  });
                  if (newLeftReports.length || newRightReports.length) {
                    this.layouts.push({
                      type: 2,
                      leftReports: newLeftReports,
                      rightReports: newRightReports
                    });
                  }
                }
              });
              cyberList.forEach(item => {
                if (!useIndexs.includes(item.index)) {
                  this.layouts.push({
                    type: 1,
                    reports: [item]
                  });
                }
              });
            }
          } else {
            this.$Message.error(data.msg);
          }
        })
        .catch(err => {
          this.$Message.error(err.message);
        });
    },
    getReportBySqlqry (obj) {
      // obj.index 放置了图表的index
      let param = {
        id: this.reportId,
        sqlValueMap: obj.sqlValueMap
      };
      HTTP.getDataSqlQry(param).then((r) => {
        if (r.code === '0') {
          // 先在返回数据找到对应index的辣条数据
          const _list = r.data;
          const _data = _list.find(l => l.index === obj.index);
          // 再找layouts里面的对应的indxe图表数据:layouts->reports->data
          this.layouts.forEach(item => {
            if (item.type === 1) {
              item.reports.forEach((re, idx, arr) => {
                if (re.index === obj.index) {
                  arr[idx] = _data;
                }
              });
            } else if (item.type === 2) {
              item.leftReports.forEach((re, idx, arr) => {
                if (re.index === obj.index) {
                  arr[idx] = _data;
                }
              });
              item.rightReports.forEach((re, idx, arr) => {
                if (re.index === obj.index) {
                  arr[idx] = _data;
                }
              });
            }
          });
          this.$forceUpdate();
        } else {
          this.$Message.error(r.msg);
        }
      });
    },
    getChartComp (type) {
      switch (type.toString()) {
        case '1':
          return 'serviceRequests';
        case '2':
          return 'visite-volume';
        case '3':
          return 'data-source-pie';
        case '4':
          return 'report-table';
        case '5':
          return 'report-funnel';
        default:
          return '';
      }
    }
  }
};
</script>

<style lang="less" scoped>
.layout-row {
  max-width: 1600px;
  margin: 0 auto;
}

.layout-card {
  padding: 10px;
}

.my-card-bar {
  display: flex;

  &__query {
    flex: 1;
  }

  &__export {
    margin-right: 5px;
  }
}
</style>

<style lang="less">
.reportStyle {
  .ivu-card-body {
    padding: 0;
  }

  .ivu-tabs {
    overflow: initial;
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

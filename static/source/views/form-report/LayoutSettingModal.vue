<template>
  <Modal
    v-model="visible"
    width="80%"
    :class="[
      'report-layout',
      { 'report-layout__setting-mode': layoutTab === 'setting' },
      { 'report-layout__preview-mode': layoutTab === 'preview' }
    ]"
    :styles="{top: '20px'}"
    :mask-closable="false"
    @on-ok="handleOk"
  >
    <div slot="header">
      <Tabs v-model="layoutTab" class="report-layout__header-tabs">
        <TabPane label="配置" name="setting"></TabPane>
        <TabPane label="预览" name="preview"></TabPane>
      </Tabs>
    </div>
    <Tabs :value="layoutTab" class="report-layout__content-tabs">
      <TabPane label="配置" name="setting">
        <div class="report-layout-setting">
          <div v-for="(layout, index) in layouts" :key="index">
            <Row class="layout-card" v-if="layout.type === 1">
              <Card shadow class="my-card">
                <Select v-model="layout.reports" multiple placeholder="请选择图表">
                  <Option
                    v-for="item in reports"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
                <div class="card-delete" title="删除此行" @click="deleteLayout(index)">
                  <Icon type="ios-trash" color="#f16543" size="25"></Icon>
                </div>
              </Card>
            </Row>
            <Row v-if="layout.type === 2">
              <Col span="12" class="layout-card">
                <Card shadow class="my-card">
                  <Select v-model="layout.leftReports" multiple placeholder="请选择图表">
                    <Option
                      v-for="item in reports"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </Card>
              </Col>
              <Col span="12" class="layout-card">
                <Card shadow class="my-card">
                  <Select v-model="layout.rightReports" multiple placeholder="请选择图表">
                    <Option
                      v-for="item in reports"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                  <div class="card-delete" title="删除此行" @click="deleteLayout(index)">
                    <Icon type="ios-trash" color="#f16543" size="25"></Icon>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
          <div class="control-bar">
            <Button
              type="success"
              icon="android-add"
              size="small"
              @click="addRow"
              style="margin-right: 10px"
            >添加一行</Button>
            <Button
              type="success"
              icon="android-add"
              size="small"
              @click="addTwoCol"
            >添加一行两列</Button>
          </div>
          <p class="layout-tip">未选择的图表自动以一行显示</p>
        </div>
      </TabPane>
      <TabPane label="预览" name="preview">
        <div class="report-layout-preview">
          <div v-for="(layout, index) in previewData" :key="index" class="layout-row">
            <Row v-if="layout.type === 1" class="preview-card">
              <Card shadow>
                <Tabs :value="`tab-${layout.reports[0].index}`">
                  <TabPane
                    v-for="report in layout.reports"
                    :key="report.index"
                    :label="report.text"
                    :name="`tab-${report.index}`"
                  >
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
              <Col span="12" class="preview-card">
                <Card v-if="layout.leftReports.length" shadow>
                  <Tabs :value="`tab-${layout.leftReports[0].index}`">
                    <TabPane
                      v-for="report in layout.leftReports"
                      :key="report.index"
                      :label="report.text"
                      :name="`tab-${report.index}`"
                    >
                      <component
                        :is="getChartComp(report.type)"
                        :data="report"
                        :ident="`${index}-${report.index}-left`"
                      ></component>
                    </TabPane>
                  </Tabs>
                </Card>
              </Col>
              <Col span="12" class="preview-card">
                <Card v-if="layout.rightReports.length" shadow>
                  <Tabs :value="`tab-${layout.rightReports[0].index}`">
                    <TabPane
                      v-for="report in layout.rightReports"
                      :key="report.index"
                      :label="report.text"
                      :name="`tab-${report.index}`"
                    >
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
        </div>
      </TabPane>
    </Tabs>
  </Modal>
</template>

<script>
import dataSourcePie from '@/views/my-components/dataSourcePie.vue';
import visiteVolume from '@/views/my-components/visiteVolume.vue';
import serviceRequests from '@/views/my-components/serviceRequests.vue';
import reportTable from '@/views/my-components/reportTable.vue';
import reportFunnel from '@/views/my-components/reportFunnel.vue';

export default {
  name: 'LayoutSettingModal',
  components: {
    dataSourcePie,
    visiteVolume,
    serviceRequests,
    reportTable,
    reportFunnel
  },
  data () {
    return {
      visible: false,
      reports: [],
      layouts: [],
      cyberList: [],
      layoutTab: 'setting'
    };
  },
  methods: {
    show () {
      this.reports = this.$store.state.app.localReportData
        .filter(item => item.value)
        .map(item => {
          return {
            value: item.index,
            label: item.value.name
          };
        });
      this.layouts = JSON.parse(this.$store.state.app.localReportLayout);
      this.layoutTab = 'setting';
      this.visible = true;

      const mockData = {
        1: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          legend: ['进行中', '已结束'],
          series: [
            { data: [this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber()], type: 'line', name: '进行中' },
            { data: [this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber()], type: 'line', name: '已结束' }
          ],
          type: '1'
        },
        2: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          legend: [],
          series: [{ data: [this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber()], type: 'bar' }],
          type: '2'
        },
        3: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          legend: [],
          series: [{ data: [{ name: 'Mon', value: this.randomNumber() }, { name: 'Tue', value: this.randomNumber() }, { name: 'Wed', value: this.randomNumber() }, { name: 'Thu', value: this.randomNumber() }, { name: 'Fri', value: this.randomNumber() }, { name: 'Sat', value: this.randomNumber() }, { name: 'Sun', value: this.randomNumber() }], type: 'pie', name: '数量' }],
          type: '3'
        },
        4: {
          tbody: [
            {
              tr: [
                { colspan: 1, rowspan: 1, text: this.randomNumber(), title: '' },
                { colspan: 1, rowspan: 1, text: this.randomNumber(), title: '' },
                { colspan: 1, rowspan: 1, text: this.randomNumber(), title: '' },
                { colspan: 1, rowspan: 1, text: this.randomNumber(), title: '' },
                { colspan: 1, rowspan: 1, text: this.randomNumber(), title: '' },
                { colspan: 1, rowspan: 1, text: this.randomNumber(), title: '' },
                { colspan: 1, rowspan: 1, text: this.randomNumber(), title: '' }
              ]
            }
          ],
          thead: [
            {
              tr: [
                { colspan: 1, rowspan: 1, text: '审核任务', title: '' },
                { colspan: 1, rowspan: 1, text: '会签任务', title: '' },
                { colspan: 1, rowspan: 1, text: '提交任务', title: '' },
                { colspan: 1, rowspan: 1, text: '抄送任务', title: '' },
                { colspan: 1, rowspan: 1, text: '经办任务', title: '' },
                { colspan: 1, rowspan: 1, text: '子流程提交任务', title: '' },
                { colspan: 1, rowspan: 1, text: '功能节点', title: '' }
              ]
            }
          ],
          type: '4'
        },
        5: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          legend: [],
          series: [{ data: [{ name: 'Mon', value: this.randomNumber() }, { name: 'Tue', value: this.randomNumber() }, { name: 'Wed', value: this.randomNumber() }, { name: 'Thu', value: this.randomNumber() }, { name: 'Fri', value: this.randomNumber() }, { name: 'Sat', value: this.randomNumber() }, { name: 'Sun', value: this.randomNumber() }], type: 'pie', name: '数量' }],
          type: '5'
        }
      };

      this.cyberList = this.$store.state.app.localReportData
        .filter(item => item.value)
        .map(item => Object.assign(
          {},
          mockData[item.value.reportType],
          { index: item.index, text: item.value.name }
        ));
    },
    addRow () {
      this.layouts.push({ type: 1, reports: [] });
    },
    addTwoCol () {
      this.layouts.push({
        type: 2,
        leftReports: [],
        rightReports: []
      });
    },
    deleteLayout (index) {
      this.layouts.splice(index, 1);
    },
    handleOk () {
      this.$store.commit('setReportLayout', JSON.stringify(this.layouts));
    },
    getChartComp (type) {
      switch (type.toString()) {
        case '1':
          return 'service-requests';
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
    },
    randomNumber () {
      return Math.floor(Math.random() * 80) + 20;
    }
  },
  computed: {
    previewData () {
      const data = [];
      let useIndexs = [];
      this.layouts.forEach(item => {
        if (item.type === 1) {
          const newReports = [];
          useIndexs = useIndexs.concat(item.reports);
          item.reports.forEach(re => {
            const rep = this.cyberList.find(el => el.index === re);
            if (rep) newReports.push(rep);
          });
          if (newReports.length) {
            data.push({
              type: 1,
              reports: newReports
            });
          }
        } else if (item.type === 2) {
          const newLeftReports = [];
          const newRightReports = [];
          useIndexs = useIndexs.concat(item.leftReports, item.rightReports);
          item.leftReports.forEach(re => {
            const rep = this.cyberList.find(el => el.index === re);
            if (rep) newLeftReports.push(rep);
          });
          item.rightReports.forEach(re => {
            const rep = this.cyberList.find(el => el.index === re);
            if (rep) newRightReports.push(rep);
          });
          if (newLeftReports.length || newRightReports.length) {
            data.push({
              type: 2,
              leftReports: newLeftReports,
              rightReports: newRightReports
            });
          }
        }
      });
      this.cyberList.forEach(item => {
        if (!useIndexs.includes(item.index)) {
          data.push({
            type: 1,
            reports: [item]
          });
        }
      });
      return data;
    }
  }
};
</script>

<style lang="less" scoped>
.layout-card {
  padding: 10px;
}

.my-card {
  min-height: 100px;

  & .card-delete {
    display: none;
    position: absolute;
    bottom: 3px;
    right: 3px;
    width: 20px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
  }

  &:hover {
    & .card-delete {
      display: block;
    }
  }
}

.control-bar {
  text-align: center;
  margin: 10px;
}

.layout-tip {
  text-align: center;
  color: #aaa;
}

.preview-card {
  padding: 10px;
}

.report-layout-setting {
  height: 100%;
  overflow: auto;
  padding: 10px;
}
</style>

<style>
.report-layout .ivu-modal {
  max-width: 1600px;
}

.report-layout .ivu-modal-header {
  padding: 5px 16px;
}

.report-layout .ivu-modal-body {
  height: calc(100vh - 150px);
  overflow: hidden;
  padding: 0;
}

.report-layout__setting-mode .ivu-modal-body {
  background-color: #eee;
}

.report-layout__preview-mode .ivu-modal-body {
  background-color: #eef1f5;
}

.report-layout__content-tabs {
  height: 100%;
}

.report-layout__content-tabs > .ivu-tabs-bar {
  display: none;
}

.report-layout__content-tabs > .ivu-tabs-content {
  height: 100%;
}

.report-layout__content-tabs > .ivu-tabs-content > .ivu-tabs-tabpane {
  background-color: transparent;
}

.report-layout__header-tabs .ivu-tabs-bar {
  margin-bottom: 2px;
}
</style>

<style lang="less">
.report-layout-preview {
  height: 100%;
  overflow: auto;
  padding: 10px;

  .ivu-card {
    overflow: hidden;
  }

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
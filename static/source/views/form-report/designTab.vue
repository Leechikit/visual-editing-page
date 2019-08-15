<template>
  <div class="main-tab">
    <div style="margin:0 auto;width:100%;overflow: hidden;">
      <div>
        <ButtonGroup style="float:right;margin-right:20px">
          <Button icon="ios-arrow-back" @click="goBack" type="success">返回</Button>
          <Button
            icon="ios-plus-empty"
            type="success"
            @click="addTab()"
          >添加</Button>
          <Button icon="ios-crop" @click="settingLayout" type="success">布局</Button>
          <Button
            icon="ios-download-outline"
            type="success"
            @click="saveValue()"
            :loading="saveloading"
          >保存</Button>
        </ButtonGroup>
        <span style="width:150px;font-size:20px!important;margin:0 auto;display:block">{{name}}</span>
      </div>
    </div>
    <div>
      <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane
          v-for="item in editableTabs"
          :name="item.index + ''"
          :key="item.index + ''"
          :label="'图表'+item.index"
        >
          <designReport
            :currentNum="item.index"
            :itemData="item.value"
            :metaColumns="item.metaColumns"
          ></designReport>
        </TabPane>
      </Tabs>
    </div>
    <LayoutSettingModal ref="layoutSettingModal"></LayoutSettingModal>
  </div>
</template>
<script>
import HTTP from '../../api/report.js';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import utils from '@/util/utils.js';
import designReport from './designReport.vue';
import LayoutSettingModal from './LayoutSettingModal.vue';

export default {
  data() {
    return {
      editableTabs: [],
      tabIndex: 0,
      id: this.$router.currentRoute.query.id,
      name: this.$router.currentRoute.query.name,
      saveloading: false,
      newFlag: false,
      utils: new utils()
    };
  },
  components: {
    designReport,
    LayoutSettingModal
  },
  mounted() {
    this.$store.state.app.localReportData = [];
    this.getReportList();
  },
  computed: {
    backRouteModuleId: function() {
      return this.$store.state.app.currentApp.moduleId;
    },
    backRouteModuleName: function() {
      return this.$store.state.app.currentApp.moduleName;
    }
  },
  methods: {
    ...mapMutations('dragModule', []),
    handleTabRemove(name) {
      this['tab' + name] = false;
      this.$store.commit('removeReportData', name);
    },
    addTab() {
      let newTabName = '图表' + ++this.tabIndex;
      if (this.newFlag) {
        this.editableTabs.push({
          title: newTabName,
          index: this.tabIndex,
          value: {}
        });
      }
      this.$store.commit('createReportData', this.tabIndex);
      // this.editableTabsValue2 = newTabName;
    },
    getReportList() {
      var vm = this;
      HTTP.queryReport(this.id).then(data => {
        if (data.data && data.data.designJson) {
          vm.newFlag = false;
          vm.editableTabs = JSON.parse(data.data.designJson);
          vm.tabIndex = vm.editableTabs[vm.editableTabs.length - 1].index;
          vm.editableTabs.forEach(item => {
            if (item.value.baseSqlConfig) {
              item.value.baseSqlConfig = JSON.parse(item.value.baseSqlConfig);
            } else {
              delete item.value.baseSqlConfig;
            }
            if (item.metaColumns instanceof Array) {
              item.metaColumns = vm.changeValue(item.metaColumns);
            }
          });
          vm.$store.state.app.localReportData = vm.editableTabs;
          vm.$store.state.app.localReportLayout = data.data.layoutJson || '[]';
        } else {
          vm.newFlag = true;
          vm.addTab();
          this.$store.commit('setReportLayout', '[]');
        }
      });
    },
    revertValue(item) {
      var ret = [];
      if (item && item.length > 0)
        item.forEach(value => {
          if (value.type == '布局列') {
            value.type = 1;
          } else if (value.type == '维度列') {
            value.type = 2;
          } else if (value.type == '统计列') {
            value.type = 3;
          } else if (value.type == '计算列') {
            value.type = 4;
          }
          if (value.sortType == '默认') {
            value.sortType = 0;
          } else if (value.sortType == '数字优先升序') {
            value.sortType = 1;
          } else if (value.sortType == '数字优先降序') {
            value.sortType = 2;
          } else if (value.sortType == '字符优先升序') {
            value.sortType = 3;
          } else if (value.sortType == '字符优先降序') {
            value.sortType = 4;
          }
          ret.push(value);
        });
      return ret;
    },
    changeValue(value) {
      var item = value;
      var temp = [];
      for (var i = 0; i < item.length; i++) {
        if (item[i].type == 1) {
          item[i].type = '布局列';
        } else if (item[i].type == 2) {
          item[i].type = '维度列';
        } else if (item[i].type == 3) {
          item[i].type = '统计列';
        } else if (item[i].type == 4) {
          item[i].type = '计算列';
        }

        if (item[i].sortType == 0) {
          item[i].sortType = '默认';
        } else if (item[i].sortType == 1) {
          item[i].sortType = '数字优先升序';
        } else if (item[i].sortType == 2) {
          item[i].sortType = '数字优先降序';
        } else if (item[i].sortType == 3) {
          item[i].sortType = '字符优先升序';
        } else if (item[i].sortType == 4) {
          item[i].sortType = '字符优先降序';
        }
        temp.push(item[i]);
      }
      return temp;
    },
    checkResult(item) {
      if (!item || !item.value || !item.value.name || item.value.name == '') {
        this.$Message.error({
          content: '图表' + item.index + '的名称为空,请重新填写',
          duration: 3
        });
        return false;
      }
      if (!item.value.reportType || item.value.reportType == '') {
        this.$Message.error({
          content: '图表' + item.index + '的显示类型为空,请重新填写',
          duration: 3
        });
        return false;
      }
      return true;
    },
    saveValue() {
      var that = this;
      var retData = this.$store.state.app.localReportData;
      retData = JSON.parse(JSON.stringify(retData));
      this.saveloading = true;
      retData.forEach(item => {
        if (!this.checkResult(item)) {
          this.saveloading = false;
          return false;
        }
        item.value.baseSqlConfig = JSON.stringify(item.value.baseSqlConfig);
        item.metaColumns = this.revertValue(item.metaColumns);
      });
      HTTP.saveReportDesign({
        id: this.id,
        design_json: JSON.stringify(retData),
        layout_json: this.$store.state.app.localReportLayout
      }).then(data => {
        if (data.code == 0) {
          that.$Message.success('保存成功');
        } else {
          that.$Message.error('保存失败');
        }
      }).catch(err => {
        that.$Message.error(err.error);
      }).finally(() => {
        this.saveloading = false;
      });
    },
    goBack () {
      this.$router.back();
      // if (
      //   !this.utils.judgeNull(this.backRouteModuleId) &&
      //   !this.utils.judgeNull(this.backRouteModuleName)
      // ) {
      //   this.$router.push({
      //     name: 'appManager_index',
      //     params: {
      //       moduleId: this.backRouteModuleId,
      //       moduleName: this.backRouteModuleName
      //     }
      //   });
      // } else {
      //   this.$Message.error(
      //     'error：app.moduleId：' +
      //       this.backRouteModuleName +
      //       ';app.moduleName:' +
      //       this.backRouteModuleName
      //   );
      // }
    },
    settingLayout () {
      this.$refs.layoutSettingModal.show();
    }
  }
};
</script>

<style  lang="less">
.main-tab {
  .ivu-tabs-nav {
    text-align: left !important;
  }

  .ivu-tabs-bar {
    border-bottom: 1px solid #dddee1;
  }
}
</style>

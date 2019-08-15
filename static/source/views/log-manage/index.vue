<template>
  <div class="log-container">
    <div class="control-bar">
      <div class="control-bar__query">
        <Select v-model="type" placeholder="选择日志类型" style="width:100px">
          <Option
            v-for="item in typeList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
        <DatePicker
          type="daterange"
          placeholder="选择日期"
          style="width: 200px"
          @on-change="handleDateChange"
        ></DatePicker>
        <Button type="primary" @click="queryLogData">查询</Button>
      </div>
      <div class="control-bar__search">
        <i-input v-model="searchVal" placeholder="搜索操作方法" style="width:300px;float:right;">
          <Button slot="append" icon="ios-search" @click="searchLogData"></Button>
        </i-input>
      </div>
    </div>
    <div class="log-table">
      <Table :columns="logClumns" :data="logData" :loading="loading" size="small"></Table>
    </div>
    <div class="log-page">
      <Page
        :total="total"
        :current="pageNum"
        show-elevator
        show-sizer
        show-total
        class="log-page-bar"
        @on-change="handlePageNumChange"
        @on-page-size-change="handlePageSizeChange"
      ></Page>
    </div>
  </div>
</template>

<script>
import HTTP from '@/api/user';

const LOG_TYPE = {
  App_Management: '应用管理',
  Interface_Management: '接口管理',
  Organ_Management: '组织管理',
  Report_Management: '报表管理',
  Company_Management: '企业管理'
};

export default {
  name: 'logManage',
  mounted () {
    this.getLogData();
  },
  data () {
    const vm = this;
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      startDate: undefined,
      endDate: undefined,
      type: 0,
      searchVal: '',
      typeList: [
        { value: 0, label: '所有' },
        { value: 'App_Management', label: '应用管理' },
        { value: 'Interface_Management', label: '接口管理' },
        { value: 'Organ_Management', label: '组织管理' },
        { value: 'Report_Management', label: '报表管理' },
        { value: 'Company_Management', label: '企业管理' }
      ],
      logClumns: [
        {
          title: '序号',
          key: 'index',
          width: 80,
          render (h, { row, column, index }) {
            return h('span', (vm.pageNum - 1) * vm.pageSize + index + 1);
          }
        },
        {
          title: '日志类型',
          key: 'logType',
          minWidth: 120,
          maxWidth: 300,
          render (h, { row, column, index }) {
            return h('span', LOG_TYPE[row.logType] || '');
          }
        },
        {
          title: '操作用户',
          key: 'userName',
          minWidth: 120
        },
        {
          title: '操作方法',
          key: 'operName',
          minWidth: 200
        },
        {
          title: '操作时间',
          key: 'crtTime',
          minWidth: 180,
          maxWidth: 300,
          render (h, { row, column, index }) {
            return h('span', vm.formatDate(row.crtTime));
          }
        }
      ],
      logData: [],
      loading: false
    };
  },
  methods: {
    async getLogData () {
      try {
        this.loading = true;
        const res = await HTTP.getLog({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          startDate: this.startDate,
          endDate: this.endDate,
          type: this.type || undefined,
          operName: this.searchVal || undefined
        });
        if (res.code === '0') {
          this.logData = res.page.result;
          this.total = res.page.total;
        } else {
          throw new Error(res.msg);
        }
      } catch (error) {
        this.$Message.error(error.message || '数据获取失败');
      } finally {
        this.loading = false;
      }
    },
    handleDateChange (val) {
      if (!val[0]) {
        this.startDate = undefined;
        this.endDate = undefined;
      } else {
        this.startDate = new Date(`${val[0]} 00:00:00`).getTime();
        this.endDate = new Date(`${val[1]} 23:59:59`).getTime();
      }
    },
    handlePageNumChange (val) {
      this.pageNum = val;
      this.getLogData();
    },
    handlePageSizeChange (val) {
      this.pageSize = val;
      this.getLogData();
    },
    queryLogData () {
      this.pageNum = 1;
      this.searchVal = '';
      this.getLogData();
    },
    searchLogData () {
      this.pageNum = 1;
      this.getLogData();
    },
    formatDate (timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      if (Number.isNaN(year)) return '--';
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);
      const hour = `0${date.getHours()}`.slice(-2);
      const minute = `0${date.getMinutes()}`.slice(-2);
      const second = `0${date.getSeconds()}`.slice(-2);
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  }
};
</script>

<style lang="less" scoped>
.log-container {
  padding: 10px 20px 20px;
}

.control-bar {
  display: flex;

  @media screen and (max-width: 720px) {
    flex-direction: column;
  }

  &__search {
    flex: 1;
  }
}

.log-table {
  margin: 10px 0;
}

.log-page {
  overflow: hidden;
}

.log-page-bar {
  float: right;
}
</style>

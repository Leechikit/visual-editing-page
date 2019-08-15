<template>
  <Table :columns="columns" :data="status" :loading="loading"></Table>
</template>

<script>
export default {
  name: 'AutoSyncOrganStatus',
  props: {
    status: Array,
    loading: Boolean
  },
  data () {
    return {
      columns: [
        {
          title: '企业名称',
          key: 'companyName',
          minWidth: 100,
          maxWidth: 200
        },
        {
          title: '同步结果',
          key: 'syncStatus',
          width: 150,
          render: (h, params) => {
            const STATUS = {
              true: ['#19be6b', '成功'],
              false: ['#ed3f14', '失败'],
              null: ['#f90', '未开启']
            };
            return h('Tag', {
              props: {
                type: 'dot',
                color: STATUS[params.row.syncStatus][0]
              }
            }, STATUS[params.row.syncStatus][1]);
          }
        },
        {
          title: '尝试次数',
          key: 'syncErrorTimes',
          width: 100
        },
        {
          title: '详情',
          key: 'syncError',
          minWidth: 200
        },
        {
          title: '最新同步时间',
          key: 'updateTime',
          width: 200,
          render: (h, params) => {
            return h('span', this.formatDate(params.row.updateTime));
          }
        }
      ]
    };
  },
  methods: {
    formatDate (timestamp) {
      if (!timestamp) return '';
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

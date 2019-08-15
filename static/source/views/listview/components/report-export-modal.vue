<template>
  <Modal v-model="visible" :mask-closable="false" title="导出报表">
    <Spin fix v-if="loading"></Spin>
    <download-modal
      v-show="!loading"
      ref="downloadModal"
      :columns="columns"
      type="report"
    ></download-modal>
    <div slot="footer">
      <div>
        <p class="tips">提示：系统将导出筛选后的数据</p>
        <div class="export-btn">
          <Button
            type="primary"
            :loading="exportLoading"
            @click="exportExcel"
          >导出</Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import HTTP from '@/api/report';
import downloadModal from './tablelist-download.vue';

export default {
  name: 'exportModal',
  components: {
    downloadModal
  },
  data () {
    return {
      visible: false,
      loading: false,
      exportLoading: false,
      columns: [],
      id: '',
      index: ''
    };
  },
  methods: {
    async show (id, index) {
      this.visible = true;
      this.loading = true;
      this.columns = [];
      this.id = id;
      this.index = index;
      try {
        const res = await HTTP.getColumns({ id, index });
        if (res.code === '0') {
          this.columns = res.data.map(
            item => ({ Code: item, DisplayName: item, Visible: true })
          );
        } else {
          throw new Error(res.msg);
        }
      } catch (error) {
        this.$Message.error(error.message || '数据获取出错');
      } finally {
        this.loading = false;
      }
    },
    async exportExcel () {
      this.exportLoading = true;
      HTTP.exportExcelForReport({
        id: this.id,
        index: this.index,
        column: JSON.stringify(this.$refs.downloadModal.checkAllGroup)
      });
      setTimeout(() => {
        this.exportLoading = false;
      }, 2000);
    }
  }
};
</script>

<style lang="less" scoped>
.tips {
  float: left;
  font-size: 12px;
  line-height: 35px;
  color: #999;
}

.export-btn {
  text-align: right;
}
</style>

<template>
  <div class="formApprovalRecord">
    <i-table
      id="print-approval-record-table"
      v-show="csvData && csvData.length > 0"
      :content="self"
      :loading="getLoading"
      :columns="columns"
      :data="csvData"
      size="small"
      ref="tableCsv"
      class="i-table"
    ></i-table>
  </div>
</template>
<script>
import HTTP from "@/api/work-flow.js";
import { dataFormat } from "@/util/assist.js";

export default {
  name: 'formApprovalRecord',
  props: {
    appRunId: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      self: this,
      getLoading: false,
      columns: [
        {
          type: "index",
          width: 60,
          fixed: "left",
          align: "center"
        },
        {
          title: "环节名称",
          key: "taskName",
          fixed: "left",
          width: 100
        },
        {
          title: "办理人",
          key: "dealName",
          width: 157,
          sortable: true,
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.show > 4000;
            } else if (value === 2) {
              return row.show < 4000;
            }
          }
        },
        {
          title: "办理结果",
          key: "taskAction",
          width: 150,
          render: (h, params) => {
            const row = params.row;
            const color =
            row.status==3?"green":
              row.taskAction == 1
                ? "blue"
                : row.taskAction == 2
                  ? "red"
                  : row.taskAction == 3
                    ? "gray"
                    : row.taskAction == 4
                      ? "black"
                      : row.taskAction == 5
                        ? "yellow"
                        : row.taskAction == 6
                          ? "yellow"
                          : row.taskAction == 7 ? "green" : "orange";
            const text =
            row.status==3?"已加办":
              row.taskAction == 1
                ? "同意"
                : row.taskAction == 2
                  ? "反对"
                  : row.taskAction == 3
                    ? "撤回"
                    : row.taskAction == 4
                      ? "驳回"
                      : row.taskAction == 5
                        ? "转办"
                        : row.taskAction == 6
                          ? "批阅"
                          : row.taskAction == 7 ? "跳转" : "未审批";
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "审批意见",
          key: "taskResult",
          // width: 150,
          minWidth: 150,
          sortable: true
        },
        {
          title: "创建时间",
          key: "createTime",
          width: 170,
          sortable: true,
          render: (h, params) => {
            let text = dataFormat(params.row.createTime);
            return h("div", {}, text);
          }
        },
        {
          title: "办理时间",
          key: "dealTime",
          width: 170,
          sortable: true,
          render: (h, params) => {
            let text = dataFormat(params.row.dealTime);
            return h("div", {}, text);
          }
        }
      ],
      csvData: []
    }
  },
  created () {
    this.getApprovelLog();
  },
  methods: {
    getApprovelLog () {
      HTTP.appInfoLog(this.appRunId)
        .then(res => {
          this.csvData = res.page.result;
        })
        .catch(err => {
          console.log(err);
          // this.$Message.error("审批记录加载失败");
        })
        .finally(() => {
          this.getLoading = false;
        });
    }
  }
}
</script>
<style lang="less" scoped>
.i-table {
  margin: 20px 0 20px 14px;
}
</style>

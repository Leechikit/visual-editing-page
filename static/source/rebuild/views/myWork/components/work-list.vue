<template>
  <div class="mywork-list">
    <el-table
      stripe
      border
      size="mini"
      :data="listData"
      @row-click="dealTask"
      style="width: 100%; border: 1px solid #ebeef5;"
    >
      <el-table-column
        prop="appRunName"
        label="工作名称"
        width="180"
        fixed
      ></el-table-column>
      <el-table-column
        v-for="item in normalColumns"
        :key="item.key"
        :prop="item.key"
        :label="item.title"
        :width="item.width"
        :minWidth="item.minWidth"
        :align="item.align"
      ></el-table-column>
      <el-table-column label="操作" width="100" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="isTodo(scope.row.taskType)"
            type="text"
            size="mini"
            class="oper-agree"
            @click.stop="handleSubmit(scope.row)"
          >
            同意
          </el-button>
          <el-button
            v-if="isTodo(scope.row.taskType)"
            type="text"
            size="mini"
            class="oper-reject"
            @click.stop="handleReset(scope.row)"
          >
            拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagenation">
      <el-pagination
        small
        background
        :current-page.sync="current"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkList',
  model: {
    prop: 'data'
  },
  props: {
    data: {
      type: Array
    },
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      listData: [],
      taskTypeMap: {
        1: '待审批',
        2: '待会签',
        3: '被驳回待提交',
        4: '待批阅',
        5: '待经办'
      },
      normalColumns: [
        {
          title: '数据标题',
          key: 'nameSchema',
          align: 'center',
          minWidth: 180
        },
        {
          title: '流水号',
          key: 'seqNo',
          align: 'center',
          width: 180
        },
        {
          title: '发起人',
          key: 'startUserName',
          align: 'center',
          width: 80
        },
        {
          title: '当前处理人',
          key: 'dealName',
          align: 'center',
          width: 80
        },
        {
          title: '状态',
          key: 'statusStr',
          align: 'center',
          width: 80
        },
        {
          title: '到达时间',
          key: 'createTimeStr',
          align: 'center',
          width: 150
        },
        {
          title: '已停留',
          key: 'stayTime',
          align: 'center',
          minWidth: 110
        }
      ]
    }
  },
  mounted() {
    this.handleData()
  },
  methods: {
    handleData() {
      this.listData = []
      this.data.forEach(d => {
        if (typeof d.list === 'object') {
          d.list.forEach(l => {
            l.cellClassName = {}
            // 处理流水号
            if (!l.seqNo) {
              l.seqNo = '-'
            }
            // 处理状态
            l.statusStr = this.taskTypeMap[l.taskType]
            if (l.taskType === '4') {
              l.cellClassName.statusStr = 'green'
            } else {
              l.cellClassName.statusStr = 'red'
            }
            // 处理停留时间
            let _date = new Date().getTime() - l.createTime
            let _day = Math.floor(_date / (1000 * 60 * 60 * 24))
            l.stayTime =
              _day +
              '天' +
              Math.floor((_date % (24 * 3600 * 1000)) / (3600 * 1000)) +
              '小时'
            if (_day > 4) {
              l.cellClassName.stayTime = 'red'
            } else {
              l.cellClassName.stayTime = 'yellow'
            }
            // 处理创建时间
            l.createTimeStr = new Date(l.createTime).Format('yyyy-MM-dd hh:mm')
            this.listData.push(l)
          })
        }
      })
    },
    pageChange(val) {
      this.$emit('page-change', val)
    },
    dealTask(row) {
      this.$emit('row-select', row)
    },
    handleSubmit(row) {
      this.$emit('handle-submit', row)
    },
    handleReset(row) {
      this.$emit('handle-reset', row)
    },
    isTodo(type) {
      return ['1', '2', '8'].includes(type)
    }
  },
  watch: {
    data: {
      handler() {
        this.handleData()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.mywork-list {
  overflow: hidden;

  .oper-agree {
    color: $color-main;
    transition: 0.1s;

    &:hover {
      color: rgba($color-main, 0.8);
    }
  }

  .oper-reject {
    color: $color-error;
    transition: 0.1s;

    &:hover {
      color: rgba($color-error, 0.8);
    }
  }

  .pagenation {
    float: right;
    margin-top: 10px;
  }
}
</style>

<style>
.mywork-list .el-table__row {
  cursor: pointer;
}

.mywork-list .el-table td .cell {
  white-space: normal;
}
</style>

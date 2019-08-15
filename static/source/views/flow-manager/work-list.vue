<template>
  <div class="mywork-list">
    <!-- <Row>
      <Col span="20" v-if="fuck==false">
        <Input placeholder="请输入应用名称搜搜..." style="width: 200px" />
        <span style="margin: 0 10px;"><Button id="searchBtn" type="primary" icon="search" @click="">搜索</Button></span>
        <Button type="warning" icon="loop" @click="fuck=true">切换高级搜索</Button>
      </Col>
      <Col span="20" v-if="fuck==true">
        起始日期<DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" style="width: 150px;margin-right:10px;"></DatePicker>
        发起人<Input readonly placeholder="请选择" style="width: 150px;margin-right:10px;"></Input>
        所属应用<Input readonly placeholder="请选择" style="width: 150px;margin-right:10px;"></Input>
        <span style="margin: 0 10px;"><Button id="searchBtn" type="primary" icon="search" @click="">搜索</Button></span>
        <Button type="warning" icon="loop"  @click="fuck=false">切换普通搜索</Button>
      </Col>
      <Col span="4" style="text-align:right;">
        <ButtonGroup>
          <Button type="ghost">
              <Icon type="grid"></Icon>
              块状
          </Button>
          <Button type="ghost" disabled>
              列表
              <Icon type="ios-list-outline"></Icon>
          </Button>
        </ButtonGroup>
      </Col>
    </Row> -->
    <Row style="margin-top: 20px" >
      <Table border stripe 
        :columns="columns" 
        :data="listData" 
        size="small"
        @on-row-click="dealTask"></Table>
    </Row>
    <div style="float: right; margin-top:10px;">
      <Page :total="total" :current="current" @on-change="pageChange" size="small" show-total></Page>
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
      type: Array,
      default: []
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
  data () {
    return {
      listData: [],
      taskTypeMap: {
        1: '待审批',
        2: '待会签',
        3: '被驳回待提交',
        4: '待批阅',
        5: '待经办'
      },
      columns: [
        {
          title: '流水号',
          key: 'seqNo',
          width: 200
        },
        {
          title: '工作名称',
          key: 'appRunName',
          fixed: 'left'
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
          // render: (h, params) => {
          //   return h('Tag', params.row.statusStr);
          // }
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
          width: 110
        },
        {
          title: '操作',
          key: 'address',
          width: 160,
          render: (h, params) => {
            // FIXME 抄送
            if (params.row.taskType === '1' || params.row.taskType === '2') {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: (e) => {
                      e.stopPropagation();
                      this.handleSubmit(params.row);
                    }
                  }
                }, '同意'),
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  on: {
                    click: (e) => {
                      e.stopPropagation();
                      this.handleReset(params.row);
                    }
                  }
                }, '不同意')
              ]);
            }
          }
        }
      ]
    };
  },
  mounted () {
    this.handleData();
  },
  methods: {
    handleData () {
      this.listData = [];
      this.data.forEach(d => {
        if (typeof (d.list) === 'object') {
          d.list.forEach(l => {
            l.cellClassName = {};
            // 处理流水号
            if (!l.seqNo) {
              l.seqNo = '-';
            }
            // 处理状态
            l.statusStr = this.taskTypeMap[l.taskType];
            if (l.taskType === '4') {
              l.cellClassName.statusStr = 'green';
            } else {
              l.cellClassName.statusStr = 'red';
            }
            // 处理停留时间
            let _date = new Date().getTime() - l.createTime;
            let _day = Math.floor(_date / (1000 * 60 * 60 * 24));
            l.stayTime = _day + '天' + Math.floor(_date % (24 * 3600 * 1000) / (3600 * 1000)) + '小时';
            if (_day > 4) {
              l.cellClassName.stayTime = 'red';
            } else {
              l.cellClassName.stayTime = 'yellow';
            }
            // 处理创建时间
            l.createTimeStr = new Date(l.createTime).Format('yyyy-MM-dd hh:mm');
            this.listData.push(l);
          });
        }
      });
    },
    pageChange (val) {
      this.$emit('page-change', val);
    },
    dealTask (row) {
      this.$emit('row-select', row);
    },
    handleSubmit (row) {
      this.$emit('handle-submit', row);
    },
    handleReset (row) {
      this.$emit('handle-reset', row);
    }
  },
  watch: {
    data: {
      handler (newValue, oldValue) {
        this.handleData();
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="less">
</style>
<style>
.mywork-list tr{
  cursor: pointer;
}
.mywork-list td.red{
  color: red;
}
.mywork-list td.yellow{
  color: #dfdf00;
}
.mywork-list td.green{
  color: #00c400;
}
.mywork-list thead th{
  text-align: center;
  height: 44px;
}
.mywork-list thead th .ivu-table-cell span{
  font-weight: 700;
  color: #1178bf;
}
</style>

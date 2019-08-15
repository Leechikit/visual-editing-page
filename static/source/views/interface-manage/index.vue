/**
* @name:  interface-manage
* @description:  接口管理
* @author: lizijie
* @update:
*/
<template>
  <div class="interface-manage">
    <div class="interface-header">
      <div class="btn-list">
        <Button
          type="primary"
          icon="plus"
          @click="showPopup()"
        >新增</Button>
      </div>
      <Input
        v-model="searchVal.name"
        class="searchInput"
        placeholder="请输入接口名称进行查询"
      >
      <Select
        slot="prepend"
        v-model="searchVal.affect"
        placeholder="作用范围"
        clearable
        style="width: 110px"
      >
        <Option
          v-for="item in affectList"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}</Option>
      </Select>
      <Button
        slot="append"
        icon="ios-search"
        @click="search"
      ></Button>
      </Input>
    </div>
    <div class="interface-table">
      <v-table
        ref="table"
        :is-loading="isLoading"
        is-horizontal-resize
        column-width-drag
        style="width:100%"
        :columns="tableColumns"
        :table-data="tableDatas"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :multiple-sort="false"
        :sort-always="true"
        @sort-change="sortChange"
        @on-custom-comp="operation"
      ></v-table>
    </div>
    <div class="table-page">
      <Page
        class-name="list-page"
        :current="pageNum"
        :total="totalCount"
        :show-elevator="true"
        placement="top"
        show-sizer
        show-total
        :page-size-opts="[10,20]"
        @on-change="changePageNum"
        @on-page-size-change="changePageSize"
      ></Page>
    </div>
    <Modal
      v-model="popupVisible"
      title="新增接口"
      class-name="vertical-center-modal"
      @on-cancel="hidePopup"
    >
      <Form
        ref="formValidate"
        :model="currModal"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem
          label="接口名称"
          prop="name"
        >
          <Input
            v-model="currModal.name"
            placeholder=""
          ></Input>
        </FormItem>
        <FormItem
          label="接口URL"
          prop="url"
        >
          <Input
            v-model="currModal.url"
            placeholder=""
          ></Input>
        </FormItem>
        <FormItem
          label="接口处理类"
          prop="beanName"
        >
          <Input
            v-model="currModal.beanName"
            placeholder=""
          ></Input>
        </FormItem>
        <FormItem
          label="接口调用凭证"
          prop="token"
        >
          <Input
            v-model="currModal.token"
            placeholder=""
            type="textarea"
            :rows="3"
          ></Input>
        </FormItem>
        <FormItem
          label="接口作用范围"
          prop="affect"
        >
          <Select
            v-model="currModal.affect"
            style="width:200px"
          >
            <Option
              v-for="item in affectList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem
          label="接口描述信息"
          prop="describes"
        >
          <Input
            v-model="currModal.describes"
            placeholder=""
            type="textarea"
            :rows="3"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="ghost"
          @click="hidePopup"
        >取消</Button>
        <Button
          type="primary"
          @click="interfaceHandle"
        >确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import Vue from 'vue'
import HTTP_INTERFACE from '@/api/interface.js'
import interfaceOperation from './components/operation.vue'
Vue.component('interfaceOperation', interfaceOperation);

export default {
  name: 'interfaceMange',
  data () {
    const validateUrl = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('接口URL不能为空'));
      } else {
        var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确格式的URL'));
        } else {
          callback();
        }
      }
    };
    return {
      pageNum: 1,
      pageSize: 10,
      totalCount: 0, // 总条数
      isLoading: true, // 加载loading
      popupVisible: false, // 弹窗
      currModal: { // 当前数据
        id: '',
        name: '', // 接口名称
        url: '', // 接口URL
        beanName: '', // 接口处理类
        token: '', // 接口调用凭证
        affect: '', // 接口作用范围
        describes: '' // 接口描述信息
      },
      // 校验
      ruleValidate: {
        name: [
          { required: true, message: '接口名称不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, validator: validateUrl, trigger: 'blur' }
        ],
        beanName: [
          { required: true, message: '接口处理类不能为空', trigger: 'blur' }
        ],
        affect: [
          { required: true, message: '接口作用范围不能为空', trigger: 'blur' }
        ]
      },
      searchVal: {  // 查询值
        name: '',
        affect: ''
      },
      interfaceList: [], // 列表数据
      affectList: [{ // 接口作用范围
        value: '1',
        label: '代码内嵌控件'
      }, {
        value: '2',
        label: '下拉框控件'
      }]
    }
  },
  computed: {
    // 表格表头
    tableColumns () {
      let tableArrs = [{
        field: 'index',
        title: '序号',
        width: 60,
        titleAlign: 'center',
        columnAlign: 'center',
        formatter: function (rowData, rowIndex) {
          return rowIndex + 1;
        },
        isFrozen: false
      }, {
        field: 'name',
        title: '接口名称',
        width: 200,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true,
        overflowTitle: true,
        orderBy: "asc"
      }, {
        field: 'createTime',
        title: '创建日期',
        width: 200,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true,
        overflowTitle: true,
        orderBy: "asc"
      }, {
        field: 'url',
        title: '接口URL',
        width: 200,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true,
        overflowTitle: true,
        orderBy: "asc"
      }, {
        field: 'beanName',
        title: '接口处理类',
        width: 200,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true,
        overflowTitle: true,
        orderBy: "asc"
      }, {
        field: 'token',
        title: '接口调用凭证',
        width: 200,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true,
        overflowTitle: true,
        orderBy: "asc"
      }, {
        field: 'affect',
        title: '接口作用范围',
        width: 200,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true,
        overflowTitle: true,
        orderBy: "asc",
        formatter: function (rowData, rowIndex, pagingIndex, field) {
          let value = rowData[field];
          if (value !== undefined && value !== null && value !== '') {
            let result = this.affectList.filter(item => +item.value === +value);
            return result && result[0] && result[0].label ? result[0].label : "--";
          } else  {
            return "--";
          }
        }.bind(this)
      },
      {
        field: 'describes',
        title: '接口描述信息',
        width: 200,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true,
        overflowTitle: true,
        orderBy: "asc",
        formatter: function (rowData, rowIndex, pagingIndex, field) {
          let value = rowData[field];
          return (value !== undefined && value !== null && value !== '') ? value : "--";
        }
      }, {
        field: 'operation',
        title: '操作',
        width: 200,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true,
        componentName: 'interfaceOperation'
      }];
      return tableArrs;
    },
    // 表格数据
    tableDatas () {
      let tableArrs = this.interfaceList;
      return tableArrs;
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData () {
      const result = await HTTP_INTERFACE.get({
        page: this.pageNum,
        count: this.pageSize,
        name: this.searchVal.name,
        affect: this.searchVal.affect
      })
      if (+result.code === 0) {
        this.interfaceList = this.formatList(result.datas.records)
        this.totalCount = result.datas.total
        this.isLoading = false
      }
    },
    // 格式化数据
    formatList (list) {
      // 个位数补零
      function fixDigit (num) {
        let result = num + ''
        if (+num < 10) {
          result = '0' + num
        }
        return result
      }
      return list.map(item => {
        let result = item
        let date = result.createTime
        result.createTime = `${date.year}-${fixDigit(date.monthValue)}-${fixDigit(date.dayOfMonth)} ${fixDigit(date.hour)}:${fixDigit(date.minute)}:${fixDigit(date.second)}`
        result.affect = typeof result.affect === 'number' ? result.affect + '' : result.affect
        return result
      })
    },
    // 弹出弹窗
    showPopup () {
      this.popupVisible = true
    },
    // 隐藏弹窗
    hidePopup () {
      this.popupVisible = false
      this.resetModal()
    },
    // 重置数据
    resetModal () {
      this.currModal = {
        id: '',
        name: '',
        url: '',
        beanName: '',
        token: '',
        affect: '',
        describes: ''
      }
    },
    // 新增或修改接口
    interfaceHandle () {
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          const { id, name, url, beanName, token, affect, describes } = this.currModal
          const isNew = id === '' ? true : false
          const params = isNew ? { name, url, beanName, token, affect, describes } : { id, name, url, beanName, token, affect, describes }
          const result = await HTTP_INTERFACE.save(params)
          if (+result.code === 0) {
            this.$Message.success('提交成功');
            this.hidePopup()
            this.getData()
          } else {
            this.$Message.success('提交失败');
          }
        }
      })
    },
    // 删除接口
    deleteInterface () {
      this.$Modal.confirm({
        title: '删除接口',
        content: `<p>确定要删除此接口？</p><p>接口名称：${this.currModal.name}</p>`,
        onOk: async () => {
          const result = await HTTP_INTERFACE.delete(this.currModal.id)
          if (+result.code === 0) {
            this.$Message.success('删除成功');
            this.hidePopup()
            this.getData()
          } else {
            this.$Message.success('删除失败');
          }
        },
        onCancel: () => {
          this.resetModal()
        }
      });
    },
    // 操作
    async operation (params) {
      this.currModal.id = params.rowData.id
      this.currModal.name = params.rowData.name
      this.currModal.url = params.rowData.url
      this.currModal.beanName = params.rowData.beanName
      this.currModal.token = params.rowData.token
      this.currModal.affect = params.rowData.affect
      this.currModal.describes = params.rowData.describes
      if (params.type === 'modify') {
        this.popupVisible = true
      } else if (params.type === 'delete') {
        this.deleteInterface()
      }
    },
    // 排序
    sortChange (params) {
      let sortBy = "";
      let sortType = "";
      let tableArrs = this.interfaceList
      for (let key in params) {
        if (params[key]) {
          sortBy = key;
          sortType = params[key];
        }
      }
      tableArrs.sort((a, b) => {
        let result = 0;
        if (sortType == "asc") {
          if ((a[sortBy] || "") > (b[sortBy] || "")) {
            result = 1
          } else if ((a[sortBy] || "") < (b[sortBy] || "")) {
            result = -1
          }
        } else if (sortType == "desc") {
          if ((a[sortBy] || "") > (b[sortBy] || "")) {
            result = -1
          } else if ((a[sortBy] || "") < (b[sortBy] || "")) {
            result = 1
          }
        }
        return result;
      });
      this.tableData = tableArrs
    },
    // 改变页码
    changePageNum (num) {
      this.pageNum = num;
      this.getData();
    },
    // 改变每页显示条数
    changePageSize (size) {
      this.pageSize = size;
      this.getData();
    },
    // 查询
    search () {
      this.getData()
    }
  }
}
</script>
<style lang='less'>
.interface-manage {
  margin: 20px 50px 0;
  .interface-header {
    display: flex;
    justify-content: space-between;
    .btn-list {
      margin-bottom: 20px;
    }
    .searchInput {
      width: 350px;
    }
  }
  .interface-table {
    flex-grow: 1;
    .ivu-table-wrapper {
      border: none;
    }
    .ivu-table:after {
      display: none;
    }
    .ivu-table-body {
      .ivu-table-colum {
        border: none;
      }
    }
    .ivu-table-border td,
    .ivu-table-border th {
      &:last-child {
        border-right: none;
      }
    }
  }
  .table-page {
    height: 45px;
    margin-bottom: 10px;
    margin-top: -1px;
    padding: 5px;
    background-color: #fff;
    position: relative;
    border: 0;
    border-top: 1px solid #e2e6e8;

    .page-index {
      position: absolute;
      right: 303px;
      width: 100px;
      padding-left: 45px;
      line-height: 28px;

      input {
        text-align: center;
        width: 40px;
        height: 31px;
        border-radius: 3px;
        background-color: #f1f3f5;
        border: solid 1px #f1f3f5;
        position: absolute;
        left: 0;
        color: #666666;
      }

      label {
        line-height: 31px;
        padding: 0;
        font-weight: normal;
        margin-left: 3px;
        color: #666666;
      }
    }

    .table-page_ButtonGroup {
      position: absolute;
      margin: 0 15px;
      width: 160px;
      right: 139px;

      .btn {
        height: 31px;
        margin-right: 10px;
      }

      button {
        opacity: 1;
        background-color: #f1f3f5;
      }

      button.disable {
        background-color: #f1f3f5;
      }
    }

    .page-size {
      margin-right: 15px;
      position: absolute;
      width: 60px;
      right: 70px;

      button {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 70px;
        height: 31px;
        background: #f1f3f5;
        border-radius: 3px;
      }
    }
    .page-total {
      position: absolute;
      width: auto;
      right: 20px;
      height: 28px;
      padding-top: 8px;
      text-align: center;
      white-space: nowrap;
      color: #333333;
    }
  }
  .list-page {
    text-align: right;
    .ivu-page-item {
      display: none;
    }
    .ivu-page-item-jump-next {
      display: none;
    }
    .ivu-page-item-jump-prev {
      display: none;
    }
  }
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
</style>

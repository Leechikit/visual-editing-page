<template>
  <Modal
    v-model="visible"
    :mask-closable="false"
    :width="800"
    class="app-excel-modal"
    @on-cancel="closeModal"
  >
    <p slot="header">新建表单<span style="color:#5bbe6c;margin-left:10px">{{appName}}</span></p>
    <div style="margin-bottom:10px">
      <Steps :current="step" size="small">
        <Step title="选择Excel表"></Step>
        <Step title="数据预览"></Step>
        <Step title="表单设置"></Step>
        <Step title="导入数据"></Step>
      </Steps>
    </div>
    <div class="app-excel-main">
      <div v-if="step === 0" class="helper-note">
        <ul>
          <li>不能存在合并的单元格</li>
          <li>支持 2MB 以内的xls、xlsx格式文件</li>
          <li>文件中数据不能超过50000行、200列（如需导入为部门成员字段，则不能超过10000行、200列）</li>
        </ul>
      </div>
      <div v-if="step === 0">
        <Upload
          ref="uploadImport"
          action="\\"
          :with-credentials="true"
          type="drag"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :before-upload="handleBeforeUpload"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>选择Excel文件</p>
          </div>
        </Upload>
      </div>
      <div v-if="step === 1" style="margin-bottom:10px">
        <span>工作表 </span>
        <Select v-model="sheet" size="small" style="width:150px">
          <Option v-for="item in sheetList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </div>
      <div v-if="step === 1">
        <Table border :columns="sheetColumns" :data="sheetData" :loading="tableLoading"></Table>
      </div>
      <div v-if="step === 2" class="step2-table-container">
        <table cellspacing="0" cellpadding="0" border="0" class="edit-table">
          <thead>
            <tr>
              <td><div class="edit-table-cell">字段名称</div></td>
              <td v-for="column in matchColumns" :key="column.col">
                <div class="edit-table-cell">
                  <Input v-model="column.text"></Input>
                </div>
              </td>
            </tr>
            <tr>
              <td><div class="edit-table-cell">字段类型</div></td>
              <td v-for="column in matchColumns" :key="column.col">
                <div class="edit-table-cell">
                  <Select v-model="column.type">
                    <Option
                      v-for="item in controlTypes"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in matchSample" :key="row.col">
              <td>
                <div class="edit-table-cell">{{index + 1}}</div>
              </td>
              <td v-for="order in matchColumns" :key="order.col">
                <div class="edit-table-cell">{{row[order.col]}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="step === 3">
        <div style="text-align:center;margin:20px;">
          <i-circle :percent="100" stroke-color="#5cb85c">
            <Icon type="ios-checkmark-empty" size="140" style="color:#5cb85c"></Icon>
          </i-circle>
        </div>
        <p style="text-align:center">
          您成功导入了<span>{{successCount}}</span>条数据到表单<span style="color:#5bbe6c">{{appName}}</span>中
        </p>
      </div>
    </div>
    <Spin size="large" fix v-if="loading"></Spin>
    <div slot="footer">
      <Button v-if="step === 1 || step === 2" type="ghost" @click="lastStep">上一步</Button>
      <Button v-if="step === 1" type="primary" @click="getMatchData">下一步</Button>
      <Button v-if="step === 2" type="primary" @click="addNewApp">下一步</Button>
      <Button v-if="step === 3" type="primary" @click="finishExcelApp">完成</Button>
    </div>
    <div slot="close">
      <span v-if="step !== 3" style="color:#e63e2c">放弃新建</span>
    </div>
  </Modal>
</template>

<script>
import HTTP from '@/api/app-apply.js';

export default {
  name: '',
  props: {
    appName: {
      type: String,
      require: true
    },
    moduleId: {
      type: String,
      require: true
    },
    groupId: String
  },
  data () {
    return {
      visible: false,
      step: 0,
      loading: false,
      tableLoading: false,
      cacheKey: '',
      sheetList: [],
      sheet: '',
      sheetSample: [[], []],
      matchSample: [],
      matchColumns: [],
      controlTypes: [
        { value: 0, label: '不导入' },
        { value: 1, label: '单行文本' },
        { value: 2, label: '多行文本' },
        { value: 11, label: '数字' },
        { value: 10, label: '日期' },
        { value: 3, label: '下拉框' },
        { value: 4, label: '单选框' },
        { value: 5, label: '复选框' },
        { value: 6, label: '人员单选' },
        { value: 7, label: '部门单选' },
        { value: 8, label: '人员多选' },
        { value: 9, label: '部门单选' },
        { value: 12, label: '是否' },
        { value: 13, label: '创建时间' },
        { value: 14, label: '修改时间' },
        { value: 15, label: '创建人' },
        { value: 16, label: '所属部门' }
      ],
      successCount: 0
    };
  },
  computed: {
    sheetColumns () {
      return this.sheetSample[0].map((item, index) => {
        return {
          title: item.value,
          key: index,
          minWidth: 100
        };
      });
    },
    sheetData () {
      const properties = this.sheetSample[0];
      return this.sheetSample.slice(1).map(item => {
        const temp = {};
        properties.forEach((proper, index) => {
          temp[index] = item[index].value;
        });
        return temp;
      });
    }
  },
  methods: {
    show () {
      this.visible = true;
    },
    lastStep () {
      this.step -= 1;
    },
    handleBeforeUpload (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.$Message.error('文件不能大于2MB');
        return false;
      }
      this.loading = true;
      this.sheet = '';
      this.$refs.uploadImport.fileList = [];
      HTTP.excelAppUpload(file).then(data => {
        if (data.code === '0') {
          this.sheetList = data.sheetList;
          this.sheet = this.sheetList[0];
          this.cacheKey = data.cacheKey;
          this.step += 1;
        }
      }).catch(() => {
        this.$Message.error('上传失败');
      }).finally(() => {
        this.loading = false;
      });
      return false;
    },
    getMatchData () {
      this.loading = true;
      HTTP.excelAppMatchHead({
        cacheKey: this.cacheKey,
        sheetName: this.sheet,
        baseRow: 0
      }).then(data => {
        if (data.code === '0') {
          this.matchSample = data.sample;
          this.matchColumns = data.columns;
          this.step += 1;
        } else {
          this.$Message.error(data.msg || '操作失败');
        }
      }).catch(() => {
        this.$Message.error('操作失败');
      }).finally(() => {
        this.loading = false;
      });
    },
    addNewApp () {
      this.loading = true;
      HTTP.excelAppCreate({
        cacheKey: this.cacheKey,
        sheetName: this.sheet,
        appName: this.appName,
        parentModule: this.groupId,
        columnMatch: JSON.stringify(this.matchColumns)
      }).then(data => {
        if (data.code === '0') {
          this.step += 1;
          this.successCount = data.count;
        } else {
          this.$Message.error(data.msg || '操作失败');
        }
      }).catch(() => {
        this.$Message.error('操作失败');
      }).finally(() => {
        this.loading = false;
      });
    },
    finishExcelApp () {
      this.closeModal();
      this.$emit('refresh');
    },
    closeModal () {
      this.visible = false;
      this.step = 0;
      this.cacheKey = '';
      this.sheetList = [];
      this.sheet = '';
      this.sheetSample = [[], []];
      this.matchSample = [];
      this.matchColumns = [];
      this.successCount = 0;
    }
  },
  watch: {
    sheet (value) {
      if (!value) return;
      this.tableLoading = true;
      HTTP.excelAppGetSample({
        cacheKey: this.cacheKey,
        sheetName: value
      }).then(data => {
        if (data.code === '0') {
          this.sheetSample = data.sample;
        } else {
          this.$Message.error(data.msg || '预览数据获取失败');
        }
      }).catch(() => {
        this.$Message.error('预览数据获取失败');
      }).finally(() => {
        this.tableLoading = false;
      });
    }
  }
};
</script>

<style scoped>
.app-excel-main {
  max-height: calc(100vh - 250px);
  overflow: auto;
}
</style>

<style lang="less" scoped>
.helper-note {
  padding: 15px;

  & li {
    position: relative;

    &::before {
      content: " ";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #485c83;
      position: absolute;
      top: 50%;
      margin-top: -2.5px;
      left: -10px;
    }
  }
}

.edit-table {
  border-top: 1px solid #e9eaec;
  border-left: 1px solid #e9eaec;

  & tr {
    border-bottom: 1px solid #e9eaec;

    & td {
      width: 150px;
      min-width: 150px;
      border-right: 1px solid #e9eaec;
      background-color: #fff;
      transition: background-color .2s ease-in-out;
      height: 48px;
      box-sizing: border-box;
      text-align: left;
      text-overflow: ellipsis;
      vertical-align: middle;

      & .edit-table-cell {
        padding-left: 18px;
        padding-right: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
      }

      &:first-of-type {
        width: 100px;
        min-width: 100px;
      }
    }
  }
}
</style>

<style lang="less">
.app-excel-modal {

  & .ivu-modal-footer {
    text-align: right;
  }

  & .ivu-modal {
    top: 70px;
  }

  & .ivu-modal-close {
    top: 15px;
  }
}
</style>

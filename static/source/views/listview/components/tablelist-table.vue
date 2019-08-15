<template>
<div id="listview">
    <div class="btn-list">
      <Button v-if="checkPerm(['act:deal:start:'+getCurrentAppKey])" type="primary" icon="plus" @click="openNew">新增</Button>
      <Button v-if="checkPerm(['act:deal:remove:'+getCurrentAppKey])" type="error" icon="android-delete" @click="deleteBatch">删除</Button>
      <Button type="warning" icon="android-download" @click="showDownLoad">导出</Button>
      <Button type="info" icon="android-download" @click="pdfDownLoad()">pdf导出</Button>
      <Button v-if="getListConfig.Import === 'true' && checkPerm(['act:deal:start:'+getCurrentAppKey])" type="success" icon="android-upload" @click="showImportModal">导入</Button>
      <Select v-model="showMode" style="width:80px;float:right;margin-right:10px" @on-change="changeMode">
        <Option value="list" v-if="chooseList">列表</Option>
        <Option value="calendar" v-if="chooseCalendar">日历</Option>
      </Select>
      <div class="download-select"></div>
    </div>
    <div v-if="modalvisio==0" class="queryBox">
      <div class="queryBtn">
        <Button type="primary" id="searchBtn" shape="circle" icon="ios-search" :loading="isLoading" @click="clickSearchBtn(true)">查询</Button>
      </div>
      <div class="queryList">
        <div class="queryItem">
          <label class="col-left" for="">数据标题：</label>
          <span class="col-right"><Input v-model="nameSchema" style="100%"></Input></span>
        </div>
        <div class="queryItem">
          <label class="col-left" for="">开始日期：</label>
          <span class="col-right"><DatePicker v-model="startDate" type="date" style="width: 100%"></DatePicker></span>
        </div>
        <div class="queryItem">
          <label class="col-left" for="">结束日期：</label>
          <span class="col-right"><DatePicker v-model="endDate" type="date" style="width: 100%"></DatePicker></span>
        </div>
        <div class="queryGroup"  v-for="(queryColumns, $index) in queryGroup" :key="$index" v-show="queryListExpand">
          <div class="queryItem" v-for="item in queryColumns" :key="item.Code">
            <query-item :type="item.Type" :displayName="item.DisplayName" :optionValue="item.OptionValue" :unitType="item.UnitType" v-model="item.Value"></query-item>
          </div>
        </div>
      </div>
      <div class="queryMoreBtn" v-show="queryGroup.length > 0">
        <span class="queryMoreBtn-arrow" :class="{'arrowUp':queryListExpand}" @click="expandQueryList" v-text="queryListExpand ? '收起高级搜索' : '展开高级搜索'"></span>
      </div>
    </div>
    <div class="tablelist-main" v-show="modalvisio==0">
      <div class="listview-table">
        <v-table
          ref="table"
          :isLoading="isLoading"
          is-horizontal-resize
          column-width-drag
          style="width:100%"
          :columns="tableColumns"
          :table-data="tableDatas"
          row-hover-color="#eee"
          :row-click="rowClick"
          :multiple-sort="false"
          :sort-always="true"
          @sort-change="sortChange"
          @on-custom-comp="showInfoLog"
          :select-all="selectALL"
          :select-group-change="selectGroupChange"
        ></v-table>
      </div>
      <div id="TablePageIndex" class="table-page" v-show="modalvisio==0">
        <Page class-name="list-page" :current="pageNum" :total="getCount" :show-elevator="true" placement="top" show-sizer show-total :page-size-opts="[10,20]" @on-change="changePageNum" @on-page-size-change="changePageSize"></Page>
      </div>
    </div>
    <!-- <div id="TablePageIndex" class="table-page" v-show="modalvisio==0">
      <Page class-name="list-page" :current="pageNum" :total="getCount" :show-elevator="true" placement="top" show-sizer show-total :page-size-opts="[10,20]" @on-change="changePageNum" @on-page-size-change="changePageSize"></Page>
    </div> -->
    <div class="tablelist-main" v-if="modalvisio==1">
        <calendar :appId="currentId"  @on-custom-comp="showInfoLog"></calendar>
    </div>
    <Modal id="createNewApp" v-model="showModal" class="add-data-modal" :mask-closable="false">
      <openModal v-if="showModal" :code="currentId"></openModal>
      <div slot="footer"></div>
    </Modal>
    <Modal v-model="isShowDownLoad" class="download-modal" :mask-closable="false" @on-cancel="closeDownload">
      <div slot="header">
        <div class="titile">导出数据</div>
        <div class="subtitle"></div>
      </div>
      <download-modal v-show="!isDownLoading" ref="downloadModal" :columns="getListThead"></download-modal>
      <i-circle v-show="isDownLoading" :percent="downloadPercent" :stroke-color="downloadColor">
        <Icon v-if="downloadResult && downloadPercent == 100" type="ios-checkmark-empty" size="60" :style="{color:downloadColor}"></Icon>
        <Icon v-else-if="!downloadResult && downloadPercent == 100" type="ios-close-empty" size="50" :style="{color:downloadColor}"></Icon>
        <span v-else style="font-size:24px">{{ downloadPercent }}%</span>
      </i-circle>
      <div slot="footer">
        <div class="download-before" v-show="!isDownLoading">
          <p class="tips">提示：系统将导出筛选后的数据</p>
          <div class="download-btn">
            <Button type="primary" :disabled="isDownLoading" @click="downloadUpdate">导出用于修改数据</Button>
            <Button type="primary" :disabled="isDownLoading" @click="download">导出</Button>
          </div>
        </div>
        <div class="download-after" v-show="isDownLoading">
          <div class="download-btn">
            <Button type="primary" @click="closeDownload">确定</Button>
          </div>
        </div>
      </div>
    </Modal>
    <Modal v-model="importModalVisible" :mask-closable="false" @on-cancel="closeImportModal">
      <div slot="header">
        <div class="titile">导入数据</div>
      </div>
      <div>
        <Upload
          ref="uploadImport"
          action="\\"
          type="drag"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :before-upload="handleImportBeforeUpload"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>上传Excel文件<span style="color: #e53e2c">(需要使用下载的模板文件)</span></p>
          </div>
        </Upload>
        <p class="import-upload-desc">提示：支持导入数据的控件除图片，附件，地址，文档库和子表以外的控件导入，系统控件数据自动生成，多选控件使用;(英文状态下)分开，关联表单使用数据标题识别，数据标题中存在的空格使用&替代，其中开启流程的表单添加的数据状态为草稿状态。注意事项：导入功能不会触发计算公式和关联表单填充等页面触发的功能</p>
        <p><span class="custom-text-btn" @click="importExcelTemplate">下载Excel导入例子模板</span></p>
      </div>
      <div slot="footer">
        <div>
          <div>
            <Button :loading="importLoading" type="primary" @click="importExcel">
              <span>{{importLoading ? '正在导入数据' : '导入'}}</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
    <openModal 
        v-if="isShowPdfDownLoad"
        class="pdf-download-hidden"
        :code="currentId">
    </openModal>
</div>
</template>
<script>
import { Modal } from "iview";
import { mapGetters, mapMutations } from "vuex";
import openModal from "@/views/home/openModal.vue";
import downloadModal from "./tablelist-download.vue";
import queryItem from './queryItem.vue';
import HTTP from "@/api/listview";
import axios from "axios";
import formApi from '@/api/form.js';
import html2pdf from 'html2pdf.js';
import trigger from '@/util/trigger.js';
import  '@/store/index.js';

import calendar from "@/views/calendar-mode/index.vue"

import $ from 'jquery';
export default {
  components: {
    calendar,
    openModal,
    downloadModal,
    queryItem
  },
  props: ["currentId", "isLoading"],
  data() {
    return {
      moduleId: this.$router.currentRoute.params.moduleId,
      currentRow: "",
      self: this,
      pageNum: 1,
      pageSize: 10,
      showModal: false,
      showMode:"list",
      isEmpty: !this.getListTbody || this.getListTbody.length <= 0,
      nameSchema: "", // 查询数据标题
      startDate: "", // 查询起始时间
      endDate: "", // 查询结束时间
      searchTimer: null,
      isShowDownLoad: false,
      importModalVisible: false,
      importLoading: false,
      confirmNameSchema: "", // 点查询后的数据标题
      confirmStartTime: "", // 点查询后的起始时间
      confirmEndTime: "", // 点查询后的结束时间
      confirmQueryItem: {}, // 点击查询后的查询字段
      isDownLoading: false,
      downloadPercent: 0,
      downloadTimer: null, // 导出倒计时
      downloadDuration: 200, // 导出倒计时间隔
      downloadResult: false, // 导出结果
      isShowPdfDownLoad: false,
      pdfDownLoadLock: false,
      queryListExpand: false, // 查询列表是否展开
      chooseList:false,
      chooseCalendar:false,
      modalvisio:0,
      selectRowList: [] // 多选列表
    };
  },
  computed: {
    ...mapGetters("listview", [
      "getListThead",
      "getListQuery",
      "getListTbody",
      "getListConfig",
      "getCount",
      "getCurrentAppKey",
      "getCurrentAppName",
      "getListMode",
      "getDefaultShowMode"
    ]),
    // 查询列表
    queryColumns() {
      let queryArrs = [];
      this.getListQuery.forEach(item => {
        if (item.IsChild && this.IsChild) {
          item.ChildColumns.forEach(child => {
            if (child.IsQueryItem) {
              this.setDefaultValue(child);
              queryArrs.push(child);
            }
          });
        } else if (item.IsQueryItem) {
          this.setDefaultValue(item);
          queryArrs.push(item);
        }
      });
      return queryArrs;
    },
    // 分组查询列表
    queryGroup() {
      let result = [];
      for(let i = 0, len = this.queryColumns.length; i < len; i = i + 3) {
        result.push(this.queryColumns.slice(i, i+3));
      }
      return result;
    },
    // 表格表头
    tableColumns() {
      const that = this;
      let tableArrs = [];
      if (!this.isEmpty) {
        
        tableArrs = [
          {
            width: 60,
            titleAlign: 'center',
            columnAlign:'center',
            type: 'selection'
          },
          {
            field: "index",
            title: "序号",
            width: 60,
            titleAlign: "center",
            columnAlign: "center",
            formatter: function(rowData, rowIndex) {
              return rowIndex + 1;
            },
            isFrozen: false
          },
          {
            field: "Name",
            title: "数据标题",
            width: 200,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true,
            componentName: "tablelistDatatitle"
          }
        ];
      } else {
        tableArrs = [
          {
            field: "Name",
            title: "数据标题",
            width: 200,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) {
              return "暂无数据";
            }
          }
        ];
      }
      this.getListThead &&
        this.getListThead.forEach(item => {
          let obj = [];
          if (item.Visible) {
            tableArrs.push(this.setColumnsConfig(item));
          }
        });
      if (!this.isEmpty) {
        tableArrs.push({
            field: "Assignee",
            title: "当前处理人",
            width: 200,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) {
              return rowData[field] || '--';
            }
          },{
            field: "StartUserId",
            title: "发起人",
            width: 200,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            formatter(rowData, rowIndex, pagingIndex, field) {
              return rowData[field] || '--';
            }
          },{
          field: "Status",
          title: "流程状态",
          width: 130,
          titleAlign: "center",
          columnAlign: "center",
          orderBy: "asc",
          componentName: "tablelistStatus"
        });
      }
      return tableArrs;
    },
    // 表格数据
    tableDatas() {
      let tableArrs = [];
      let emptyObj = {};
      this.getListThead &&
        this.getListThead.forEach(item => {
          if (item.Visible) {
            emptyObj[item.Code] = "暂无数据";
            emptyObj["isEmpty"] = true;
          }
        });
      tableArrs.push(emptyObj);
      try {
        if (this.getListTbody && this.getListTbody.length > 0) {
          tableArrs = [];
          this.getListTbody.forEach(item => {
            let obj = {};
            for (let key in item) {
              // 子表
              const arrs = key.split(".");
              if (arrs.length > 1) {
                obj[arrs[1]] = item[key];
              } else {
                obj[arrs[0]] = item[key];
              }
              // 对于F0001字段，若F0001_Name存在时使用该字段的值
              if (item[`${key}_Name`] !== void 0) {
                obj[key] = item[`${key}_Name`];
              }
            }
            tableArrs.push(obj);
          });
        }
      } catch (warning) {}
      return tableArrs;
    },
    // 有子表的情况
    titleRows() {
      let firstArrs = [];
      let secondArrs = [];
      this.getListThead &&
        this.getListThead.forEach(item => {
          let obj = {};
          if (item.IsChild) {
          }
        });
    },
    // 查询开始时间
    startTime() {
      return this.formatDate(this.startDate);
    },
    // 查询结束时间
    endTime() {
      if(!this.endDate) return "";
      const endTime = this.formatDate(this.endDate);
      let result = new Date()
      result.setTime(endTime + 24*60*60*1000);
      return result.getTime();
    },
    // 导出进度环颜色
    downloadColor() {
      let color = "#2db7f5";
      if (this.downloadResult && this.downloadPercent == 100) {
        color = "#5cb85c";
      }else if(!this.downloadResult && this.downloadPercent == 100){
        color = "#ff5500";
      }
      return color;
    }
  },
  watch: {
    showModal(val) {
      if (val == true) {
        this.$emit("loadList", {
          appId: this.currentId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        });
      }
    },
    getListTbody (val) {
      this.isEmpty = !val || val.length <= 0;
    },
    getDefaultShowMode(){
      if(this.$store.state.listview.modeView[this.currentId]==0){
         this.showMode = "list"
      }
      else if(this.$store.state.listview.modeView[this.currentId]==1){
        this.showMode ="calendar"
      }
      else{
        this.showMode = this.getDefaultShowMode;
      }
      this.changeMode()
      
    },

    getListMode(){
      if(this.getListMode.indexOf("list") >=0){
          this.chooseList =true;
      }
      if(this.getListMode.indexOf("calendar") >=0){
          this.chooseCalendar =true;
      }
     if(this.$store.state.listview.modeView[this.currentId]==0){
         this.showMode = "list"
      }
      else if(this.$store.state.listview.modeView[this.currentId]==1){
        this.showMode ="calendar"
      }
      else{
        this.showMode = this.getDefaultShowMode;
      }
      this.changeMode()
    },
  },
  methods: {
    ...mapMutations("listview", ["setListThead", "setListTbody"]),
    // 设置初始值
    setDefaultValue(obj) {
      obj.Value = '';
      return obj;
    },
    // 格式化日期
    formatDate (date) {
      return date ? new Date(date).getTime() : '';
    },
    pdfDownLoad () {
      this.pdfDownLoadLock = true;
      this.isShowPdfDownLoad = true;
      let opt = {
        margin: 2,
        filename: this.currentId + '.pdf',
        image: {
          type: 'jpeg',
          quality: 1
        }
      };
      trigger.off('open-modal-load').on('open-modal-load', () => {
        // 用于避免非下载按钮点击，触发的事件
        if (!this.pdfDownLoadLock) {
          return;
        }
        let element = document.getElementById(this.currentId);
        // 子表导出pdf格式时问题
        let table = $(element).find('.table.table-bordered.table-condensed');
        table.find('thead').remove();
        table.parent().css('margin-top', '20px');
        html2pdf().from(element).set(opt).save().then(() => {
          this.isShowPdfDownLoad = false;
          this.pdfDownLoadLock = false;
        });
      });
    },
    // 权限
    checkPerm(permList) {
      return this.$_has("permissions", permList);
    },
    resetTable() {
      this.currentRow = "";
      this.$refs["table"].resize();
      this.$refs["table"].clearCurrentRow();
      this.$refs["table"].resetOrder();
      this.$refs["table"].scrollToTop();
    },
    // 设置表头配置
    setColumnsConfig(data) {
      let obj = {
        field: data.Code,
        title: data.DisplayName,
        width: 200,
        titleAlign: "center",
        columnAlign: "center",
        isResize: true,
        orderBy: "asc",
        overflowTitle: true,
        formatter(rowData, rowIndex, pagingIndex, field) {
          let value = rowData[field];
          // 图片或附件
          if (data.Type == 23 || data.Type == 24) {
            try {
              const arrs = JSON.parse(value + "");
              let result = [];
              if (arrs instanceof Array) {
                arrs.forEach(item => {
                  result.push(item.Name);
                });
              } else {
                result.push(arrs.Name);
              }
              value = result.join("；");
            } catch (error) {}
            // 关联表单
          } else if (data.Type == 50 || data.Type == 51) {
            if(value instanceof Array) {
              let result = [];
              value.forEach(item => {
                result.push(item.DisplayName);
              });
              value = result.join("；");
            }
          }
          return (value !== undefined && value !== null && value !== '') ? value : "--";
        }
      };
      // 关联表单
      if ((data.Type == 50 || data.Type == 51) && !this.isEmpty) {
        obj.componentName = "tablelistAssotable";
        obj.overflowTitle = true;
      }
      return obj;
    },
    // 排序
    sortChange(params) {
      let sortBy = "";
      let sortType = "";
      let tableArrs = this.getListTbody;
      for (let key in params) {
        if (params[key]) {
          sortBy = key;
          sortType = params[key];
        }
      }
      tableArrs.sort((a, b) => {
        let result = 0;
        if (sortType == "asc") {
          if((a[sortBy] || "") > (b[sortBy] || "")) {
            result = 1
          } else if((a[sortBy] || "") < (b[sortBy] || "")){
            result = -1
          }
        } else if (sortType == "desc") {
          if((a[sortBy] || "") > (b[sortBy] || "")) {
            result = -1
          } else if((a[sortBy] || "") < (b[sortBy] || "")){
            result = 1
          }
        }
        return result;
      });
      this.setListTbody(tableArrs);
    },
    // 多选项，全选触发
    selectALL(selection) {
      this.selectRowList = selection;
    },
    // 多选项，任意选中项发生变化时就会触发
    selectGroupChange(selection) {
      this.selectRowList = selection;
    },
    // 新增数据
    openNew() {
      // this.showModal = true;
      this.$emit('openNew');
    },
    // 批量删除数据
    deleteBatch() {
      if (this.selectRowList.length > 0) {
        const that = this;
        let idArrs = [];
        idArrs = this.selectRowList.map(item => {
          return item.AppRunId;
        });
        this.$Modal.confirm({
          title: "批量删除列表数据",
          content: `<p>确定要删除批量数据？</p>`,
          onOk() {
            HTTP.deleteListDataBatch({
              ids: idArrs.join(';')
            })
              .then(res => {
                if (+res.code == 0) {
                  that.pageNum = 1;
                  that.$emit("loadList", {
                    appId: that.currentId,
                    pageNum: that.pageNum,
                    pageSize: that.pageSize
                  });
                  that.$Message.success({
                    content: "删除成功"
                  });
                } else {
                  that.$Message.error({
                    content: "删除失败"
                  });
                }
              })
              .catch(() => {
                that.$Message.error({
                  content: "删除失败"
                });
              });
          }
        });
      } else {
        this.$Modal.warning({
          title: "批量删除列表数据",
          content: "请点击多选框选择要批量删除的数据"
        });
      }
    },
    rowClick(rowIndex, rowData, column) {
      this.currentRow = rowData;
    },
    changePageNum(num) {
      this.pageNum = num;
      this.clickSearchBtn();
    },
    changePageSize(size) {
      this.pageSize = size;
      this.refreshData();
    },
    // 获取数据
    refreshData(flag) {
      let queryObj = {};
      this.queryColumns.forEach(item => {
        queryObj[item.Code] = item.Type === 5 ? this.formatDate(item.Value) : item.Value;
      });
      if(flag){
         this.pageNum =1;
      }
      this.$emit("loadList", {
        appId: this.currentId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        nameSchema: this.nameSchema,
        startTime: this.startTime,
        endTime: this.endTime,
        queryItem: JSON.stringify(queryObj)
      });
    },
    // 点击查询按钮
    clickSearchBtn(search=false) {
      this.refreshData(search);
      this.confirmNameSchema = this.nameSchema;
      this.confirmStartTime = this.startTime;
      this.confirmEndTime = this.endTime;
      this.queryColumns.forEach(item => {
        this.confirmQueryItem[item.Code] = item.Type === 5 ? this.formatDate(item.Value) : item.Value;
      });
    },
    // 重置查询内容
    resetSearchData() {
      this.nameSchema = "";
      this.startDate = "";
      this.endDate = "";
      this.confirmNameSchema = "";
      this.confirmStartTime = "";
      this.confirmEndTime = "";
      this.confirmQueryItem = {};
    },
    // 显示导出弹窗
    showDownLoad() {
      if (this.getListTbody && this.getListTbody.length > 0) {
        this.isShowDownLoad = true;
      } else {
        this.$Message.warning('暂无数据可导出');
      }
    },
    // 关闭导出弹窗
    closeDownload () {
      this.isShowDownLoad = false;
      this.isDownLoading = false;
      this.downloadTimer = null;
      this.downloadPercent = 0;
      this.downloadDuration = 200;
      this.downloadResult = false;
    },
    showImportModal() {
      this.importModalVisible = true;
      this.$refs.uploadImport.fileList = [];
    },
    closeImportModal() {
      this.importModalVisible = false;
    },
    handleImportBeforeUpload(file) {
      this.$refs.uploadImport.fileList.splice(0, 1, file);
      return false;
    },
    importExcelTemplate() {
      HTTP.importExcelTemplate(this.currentId);
    },
    importExcel() {
      this.importLoading = true;
      HTTP.uploadImportExcel(this.currentId, this.$refs.uploadImport.fileList[0])
        .then((res) => {
          if (res.code === '0') {
            this.importModalVisible = false;
            let errors = Object.keys(res.errors);
            let errMsg = res.msg;
            if (errors.length > 0) {
              errors = errors.map(item => +item + 1);
              errMsg += `, 第 ${errors.join(',')} 行导入失败`;
            }
            this.$Notice.open({
              title: '导入结果',
              desc: errMsg,
              duration: 0
            });
            this.refreshData();
          } else {
            this.$Message.error(res.msg);
          }
        }).catch(() => {
          this.$Message.error('导入出错');
        }).finally(() => {
          this.importLoading = false;
        });
    },
    // 导出
    download () {
      this.downloadCountdown();
      const params = {
        appId: this.currentId,
        nameSchema: this.nameSchema,
        startTime: this.confirmStartTime,
        endTime: this.confirmEndTime,
        queryItem: JSON.stringify(this.confirmQueryItem),
        Columns: this.$refs.downloadModal.checkAllGroup,
        title: this.getCurrentAppName,
        that:this
      };

      HTTP.downloadValidate(params).then(() => {
        HTTP.download(params)
        this.downloadDuration = 50;
        
      }).catch(err => {
        this.downloadDuration = 50;
        this.downloadResult = false;
        this.downloadPercent=100
      });
       this.isDownLoading = true;
    },
    // 导出用于修改数据
    downloadUpdate () {
      this.downloadCountdown();
      const params = {
        appId: this.currentId,
        nameSchema: this.nameSchema,
        startTime: this.confirmStartTime,
        endTime: this.confirmEndTime,
        queryItem: JSON.stringify(this.confirmQueryItem),
        Columns: this.$refs.downloadModal.checkAllGroup,
        title: this.getCurrentAppName,
        that:this
      };

      HTTP.downloadValidateUpdate(params).then(() => {
        HTTP.downloadUpdate(params)
        this.downloadDuration = 50;
       
      }).catch(err => {
        this.downloadDuration = 50;
        this.downloadResult = false;
        this.downloadPercent=100;
      });

      this.isDownLoading = true;
    },
    // 导出进度倒计时
    downloadCountdown () {
      clearTimeout(this.downloadTimer);
      this.downloadTimer = setTimeout(() => {
        if (this.downloadPercent >= 99) {
          clearTimeout(this.downloadTimer);
        } else {
          if(this.downloadPercent<90){
             this.downloadPercent += 10;
          }
          else{
            this.downloadPercent += 9;
          }
         
          this.downloadCountdown();
        }
      }, this.downloadDuration);
    },
    showInfoLog (params) {
      this.$emit('showInfoLog', params);
    },
    // 展开查询列表
    expandQueryList() {
      this.queryListExpand = !this.queryListExpand;
    },
    changeMode(){
      if(this.showMode =='list'){
        this.modalvisio=0
      }
      else if(this.showMode =='calendar'){
        this.modalvisio=1
      }
      this.$store.state.listview.modeView[this.currentId]=  this.modalvisio
    }
  }
};
</script>

<style lang="less" scoped>
.custom-text-btn {
  color: #1890ff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #40a9ff;
  }
}

.import-upload-desc {
  margin: 15px 0;
}
</style>


<style lang="less">
.pdf-download-hidden {
  position: fixed;
  z-index: -1;
  opacity: 0;  
  left: -2000px; 
  top: -2000px;
}
/* 弹窗 */
.add-data-modal {
  .navbar {
    background-color: transparent;
  }
  .ivu-modal-mask {
    background-color: rgba(55, 55, 55, 0.4);
  }

  .ivu-modal {
    width: 800px !important;
    top: 20px;
  }

  .ivu-modal-body {
    min-height: 300px;
    max-height: 550px;
    overflow-y: auto;
  }

  .ivu-modal-close {
    position: absolute;
    z-index: 3000;
    &:hover {
      cursor: pointer;
    }
  }

  .navbar-fixed-top,
  .navbar-fixed-bottom {
    position: absolute;
    border-bottom: none;
    box-shadow: none;
  }

  .navbar-fixed-top {
    top: 30px;
  }

  .sheet-navbar .container-fluid #navbar ul.navbar-nav li {
    border-left: none;
  }

  // .ivu-modal-footer {
  //     display: none;
  // }

  .navbar-title {
    background-color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    top: -35px;
    position: absolute;
    left: 0;
    right: 0;
    border-bottom: 1px solid #eee;
    padding-left: 20px;

    .navbar-title-con {
      font-size: 18px;
    }
  }

  .submit-btn {
    margin: 0;
    background-color: #fff;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    box-sizing: border-box;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .submit-btn-con {
      display: inline-block;
      float: none;

      li {
        float: left;
    
        a {
          display: inline-block;
          width: 100px;
          padding: 0;
          margin: 10px;
        }
        &.active {
          a:hover,
          a:focus,
          a:active {
            background-color: transparent;
            background: transparent;
          }
        }
      }
    }

    .icon-submit {
      display: block;
      width: 100%;
      margin: 0 auto;
      padding: 10px;
      border-radius: 5px;
      color: #fff;
      background-color: #2d8cf0;
    }
  }
}

// 表单

.add-data-modal {
  .ivu-modal-body {
    .SheetQuery .form-query-add:empty:not(:focus):before {
      top: 0;
    }

    #SheetContent .SheetMultiQuery .form-query-add a.label-info > i,
    #SheetContent .SheetQuery .form-query-add a.label-info > i {
      top: 6px;
    }

    .SheetQuery .form-query-add .label.label-info {
      margin-top: 4px;
      color: #38adff !important;
    }

    .col-md-6.col-sm-6.col-xs-6 {
      padding-left: 0 !important;
    }

    .form-group {
      display: flex;
      align-items: center;
      padding: 10px 0;
      justify-content: flex-start;

      .ControlTitle {
        padding: 0;
      }

      textarea {
        height: auto !important;
      }
    }

    .SheetUser .label-info {
      font-size: 14px !important;
    }

    .nav-tabs.user-tabs > li.active > a,
    .nav-tabs.user-tabs > li.active > a:focus,
    .nav-tabs.user-tabs > li.active > a:hover,
    .SheetUser .label-info {
      color: #38adff !important;
    }

    .SheetAttachment .btn-outline {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .add-pic {
      margin: 0 auto;
    }

    .AreaSelectWrap {
      .area-item {
        margin-bottom: 10px;
      }

      .icon-arrow-down-full {
        line-height: 18px;
      }

      .detail {
        padding: 10px;
      }
    }
  }

  // 子表
  .GridViewWrap {
    .SheetDropDownList .icon-arrow-down-full {
      width: 120px;
      margin: 0 auto;
    }

    .sheet-control .form-query-add {
      width: 240px;
    }

    .table-content.fixed-table-content {
      .row-num {
        margin-top: 14px;
      }
    }

    .table .sheet-control[data-controlkey="FormRadioButtonList"],
    table .sheet-control[data-controlkey="FormCheckboxList"] {
      min-width: 160px;
    }
  }
  .SheetGridView input.form-control,
  .SheetGridView textarea.form-control {
    border-color: #eee;
    width: 80%;
    margin: 10px auto;
  }

  .SheetAttachment > div {
    width: 80%;
    margin: 0 auto;
  }

  .SheetAttachment .btn-lg {
    width: 80%;
    margin: 10px auto;
  }

  .SheetGridView {
    padding: 0;
  }
}

#listview {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 59px;
  bottom: 0;
  height: auto;
  .btn-list {
    margin-bottom: 20px;
    .ivu-btn {
      margin-right: 15px;
    }
  }
  .ivu-btn {
    span {
      font-size: 14px;
    }
  }
  .tablelist-main {
    flex-grow: 1;
    overflow-y: auto;
  }
  .queryBox{
    margin-bottom: 20px;
  }
  .queryList {
    margin-right: 100px;
    .queryGroup{
      clear: left;
    }
    .queryItem{
      float: left;
      width: 33.33%;
      margin-bottom:5px;
      .col-left {
        width: 80px;
        float: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .col-right {
        display: block;
        margin-left: 80px;
        margin-right: 40px;
      }
    }
  }
  .queryBtn {
    float:right;
  }
  .queryMoreBtn{
    height: 20px;
    margin-top: 5px;
    text-align: center;
    clear: left;
    &-arrow{
      cursor: pointer;
      position: relative;
      &::after{
        content: "︾";
        position: absolute;
        left: 0;
        top: 15px;
        width: 100%;
        height: 20px;
        line-height: 25px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #a1a1a1;
      }
      &.arrowUp {
        &::after{
          content: "︽";
          line-height: 15px;
        }
      }
    }
  }
  .listview-table {
    min-height: 325px;
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
    padding: 5px;
    background-color: #fff;
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
// 导出弹出
.download-modal {
  .ivu-modal {
    width: 800px !important;
    top: 20px;
  }
  .ivu-modal-body {
    min-height: 300px;
    max-height: 550px;
    overflow-y: auto;
  }
  .ivu-modal-footer {
    &>div{
      overflow: hidden;
    }
    .tips {
      float: left;
      font-size: 12px;
      line-height: 35px;
      color: #999;
    }
    .download-btn {
      float: right;
    }
  }
  .ivu-chart-circle{
    margin-top: 74px;
    margin-left: 324px;
  }
}
</style>

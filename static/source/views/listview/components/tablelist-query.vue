<template>
<div id="listview1">
    <div class="listview-table">
      <v-table
        ref="table"
        :isLoading="isLoading"
        is-horizontal-resize
        column-width-drag
        style="width:100%"
        :columns="cloneList"
        :table-data="dataList"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :row-click="rowClick"
        :multiple-sort="false"
        :sort-always="true"
        @sort-change="sortChange"
      ></v-table>
    </div>
    <div id="TablePageIndex" class="table-page">
      <Page class-name="list-page" :current="pageNum" :total="count" :show-elevator="true" placement="top" show-sizer show-total :page-size-opts="[10,20]" @on-change="changePageNum" @on-page-size-change="changePageSize"></Page>
    </div>
</div>
</template>
<script>
import { Modal } from "iview";
import { mapGetters, mapMutations } from "vuex";
import queryItem from './queryItem.vue';
import HTTP from "@/api/listview";
import axios from "axios";
import formApi from '@/api/form.js';
import trigger from '@/util/trigger.js';
import  '@/store/index.js';

import $ from 'jquery';
export default {
  components: {
    queryItem
  },
  props: ["currentId", "SheetData","sheetCode","DataField"],
  data() {
    return {
      currentRow: "",
      self: this,
      pageNum: 1,
      pageSize: 10,
      showModal: false,
      listThead: [], // 表格表头字段
      listQuery: [], // 表格查询字段
      listTbody: [], // 表格内容
      cloneList:[],
      dataList:[],
      listConfig: {}, // 表格设置
      Title:'',
      count: 0, // 表格内容总条数
      isEmpty: !this.listTbody || this.listTbody.length <= 0,
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
      isLoading:false,
      queryListExpand: false // 查询列表是否展开
    };
  },
   computed: {
        // 表格数据
    
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
    }
  },
  mounted(){
      this.getCurrentList();
    
  },
  methods: {
    getCurrentList(){
          HTTP.getListSetting({
            appId:this.currentId
            }).then(res => {
            if (res.Code == 0) {
                this.listThead =res.Data.ListViewData;
                this.cloneList =this.tableColumns();
                console.log(this.cloneList);
                this.listConfig = {
                SortDirection: res.Data.SortDirection,
                SortBy: res.Data.SortBy,
                Import: res.Data.Import
                }
                this.Title = res.Data.Title
                // 过滤查询字段
                const queryItems = res.Data.ListViewData.filter(item => {
                return item.CanBeQueryItem;
                });
                this.listQuery = queryItems;
                this.queryColumns();
                //this.queryGroup();
                var param ={
                    appId:this.currentId,
                    pageNum : 1,
                    pageSize : 10,
                    nameSchema : '',
                    startTime : '',
                    endTime : '',
                    queryItem : {}
                    }

                this.getTableData(param);
            
            }
            });
        },

     // 有子表的情况
    titleRows() {
      let firstArrs = [];
      let secondArrs = [];
      this.listThead &&
        this.listThead.forEach(item => {
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

    getTableData(param){
        var that = this
        this.isLoading=true;
         HTTP.getListData({
          QueryCode: param.appId,
          pageNum:param.pageNum,
          pageSize : param.pageSize,
          nameSchema:param.nameSchema,
          startTime:param.startTime,
          endTime:param.endTime,
          queryItem:param.queryItem,
          SheetData:this.SheetData,
          DataField:this.DataField,
          SheetCode:this.sheetCode

        }).then(res => {
           this.isLoading=false;
          that.listTbody=[]
          if (res.Code == 0&&res.Result.ReturnData.length>0) {
           that.listTbody=res.Result.ReturnData;
           that.count= res.Result.Count

           that.dataList= this.tableDatas();
           console.log(that.dataList)
          } else {
            that.listTbody=[];
           that.count= 0;
          }
        }).catch(err => {
          this.isLoading=false;
            console.log(err)
            that.dataList=[]
           that.count= 0;
        });
    },

    queryColumns() {
      let queryArrs = [];
      this.listQuery.forEach(item => {
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
      if (true) {
        tableArrs = [
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
            overflowTitle: true
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
      this.listThead &&
        this.listThead.forEach(item => {
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
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          orderBy: "asc",
          componentName: "tablelistStatus"
        });
      }
      return tableArrs;
    },
    tableDatas() {
      let tableArrs = [];
      let emptyObj = {};
      this.listThead &&
        this.listThead.forEach(item => {
          if (item.Visible) {
            emptyObj[item.Code] = "暂无数据";
            emptyObj["isEmpty"] = true;
          }
        });
      tableArrs.push(emptyObj);
      try {
        if (this.listTbody && this.listTbody.length > 0) {
          tableArrs = [];
          this.listTbody.forEach(item => {
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

   
    // 设置初始值
    setDefaultValue(obj) {
      obj.Value = '';
      return obj;
    },
    // 格式化日期
    formatDate (date) {
      return date ? new Date(date).getTime() : '';
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
      tableArrs.forEach(item => {
        console.log(item[sortBy])
      })
      this.setListTbody(tableArrs);
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
    refreshData() {
      let queryObj = {};
      this.queryColumns.forEach(item => {
        queryObj[item.Code] = item.Type === 5 ? this.formatDate(item.Value) : item.Value;
      });
      this.getTableData( {
        appId: this.currentId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        nameSchema: this.nameSchema,
        startTime: this.startTime,
        endTime: this.endTime,
        queryItem: JSON.stringify(queryObj)
      })
    },
    // 点击查询按钮
    clickSearchBtn() {
      this.refreshData();
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
   
   
    // 展开查询列表
    expandQueryList() {
      this.queryListExpand = !this.queryListExpand;
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


<style lang="less" scoped>
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

#listview1 {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
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

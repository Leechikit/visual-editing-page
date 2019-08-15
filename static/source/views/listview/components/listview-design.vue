<template>
  <div id="DesignerZone" class="designer-zone-container">
    <Row class="flex">
      <i-col span="5"  class="flex-right">
        <div  class="col-right Propertys">
          <Tabs mode="horizontal" active-name="1">
            <TabPane label="字段设置" name="name1">
              <div id="FieldSet" class="pro-item">
                <!-- @*查询条件*@ -->
                <div id="QueryItemPanle" class="proItemPanle queryItemPanle">
                  <div class="propertyTitle" @click="showQueryContentEvent()">
                    <div class="titletxt">查询条件</div>
                    <div class="titleControl">
                      <input type="checkbox" id="ListShowAll" :checked="allQuerySelected">
                      <label for="ListShowAll" @click.stop.prevent="selectAllQueryClick(allQuerySelected)">全选</label>
                    </div>
                  </div>
                  <div class="propertyContent" v-show="showQueryContent">
                    <ul id="QueryItemsList" class="ColumnList ui-sortable">
                      <!-- <draggable v-model="queryDragData"> -->
                        <div v-for="item in queryDragData">
                            <li class="ColumnItem" v-if="!item.IsChild" :data-id="`query-${item.Code}`" style="">
                                <div class="ColumnName" v-text="item.DisplayName"></div>
                                <div class="ColumnGroup">
                                    <div class="ckbox ckbox-default">
                                        <input type="checkbox" :id="`query-${item.Code}`" v-model="item.IsQueryItem">
                                        <label :for="`query-${item.Code}`"></label>
                                    </div>
                                </div>
                            </li>
                            <div class="ColumnItem myheight IsChild ui-sortable" v-if="item.IsChild" :data-id="`query-${item.Code}`"
                                data-total="Object.keys(item.ChildColumns).length" data-selected="4">
                                <li class="myColumnItemChildName myshow" :data-id="`query-${item.Code}`">
                                    <div class="ColumnName">子表
                                        <div class="pull-right">
                                            <input type="checkbox" :id="`query-${item.Code}`" class="allcb" v-model="item.IsQueryItem">
                                            <label :for="`query-${item.Code}`" style="width:100px;" @click="selectChildrenAllQueryClick(item.Code, item.IsQueryItem)">全选</label>
                                            <i class="fa  fa-angle-down pugll-right" style="cursor:pointer;"></i>
                                        </div>
                                    </div>
                                </li>
                                <draggable v-model="item.ChildColumns">
                                  <li class="myColumnItem F0000016 ChildColumnItem" v-for="child in item.ChildColumns" :data-id="`query-${child.Code}`" :data-ParentId="item.ParentId">
                                      <div class="ColumnName" v-text="child.DisplayName"></div>
                                      <div class="ColumnGroup">
                                          <div class="ckbox ckbox-default">
                                              <input type="checkbox" :id="`query-${child.Code}`" v-model="child.Visible">
                                              <label :for="`query-${child.Code}`" @click="childQueryClick(child.ParentId)"></label>
                                          </div>
                                      </div>
                                  </li>
                                </draggable>
                            </div>
                        </div>
                      <!-- </draggable> -->
                    </ul>
                  </div>
                </div>
                <!-- @*列表字段*@ -->
                <div id="ColumnPanle" class="proItemPanle columnPanle">
                      <div class="propertyTitle" @click="showColumnContentEvent()">
                          <div class="titletxt">列表字段</div>
                          <div class="titleControl">
                              <input type="checkbox" id="ListShowAll" :checked="allColumnSelected">
                              <label for="ListShowAll" @click.stop.prevent="selectAllColumnClick(allColumnSelected)">全选</label>
                          </div>
                      </div>
                      <div class="propertyContent" v-show="showColumnContent">
                          <ul id="ColumnList" class="ColumnList ui-sortable">
                            <draggable v-model="columnDragData">
                              <div v-for="item in columnDragData">
                                  <li class="ColumnItem" v-if="!item.IsChild" :data-id="item.Code" style="">
                                      <div class="ColumnName" v-text="item.DisplayName"></div>
                                      <div class="ColumnGroup">
                                          <div class="ckbox ckbox-default">
                                              <input type="checkbox" :id="item.Code" v-model="item.Visible">
                                              <label :for="item.Code"></label>
                                          </div>
                                      </div>
                                  </li>
                                  <div class="ColumnItem myheight IsChild ui-sortable" v-if="item.IsChild" :data-id="item.Code"
                                      data-total="Object.keys(item.ChildColumns).length" data-selected="4">
                                      <li class="myColumnItemChildName myshow" :data-id="item.Code">
                                          <div class="ColumnName" style="cursor: move;">子表
                                              <div class="pull-right">
                                                  <input type="checkbox" :id="item.Code" class="allcb" v-model="item.Visible">
                                                  <label :for="item.Code" style="width:100px;" @click="selectChildrenAllClick(item.Code, item.Visible)">全选</label>
                                                  <i class="fa  fa-angle-down pugll-right" style="cursor:pointer;"></i>
                                              </div>
                                          </div>
                                      </li>
                                      <draggable v-model="item.ChildColumns">
                                        <li class="myColumnItem F0000016 ChildColumnItem" v-for="child in item.ChildColumns" :data-id="child.Code" :data-ParentId="item.ParentId">
                                            <div class="ColumnName" v-text="child.DisplayName"></div>
                                            <div class="ColumnGroup">
                                                <div class="ckbox ckbox-default">
                                                    <input type="checkbox" :id="child.Code" v-model="child.Visible">
                                                    <label :for="child.Code" @click="childSchemaClick(child.ParentId)"></label>
                                                </div>
                                            </div>
                                        </li>
                                      </draggable>
                                  </div>
                              </div>
                            </draggable>
                          </ul>
                      </div>
                  </div>
              </div>
            </TabPane>
            <TabPane label="列表设置" name="name2">
              <div id="ListSet" class="pro-item">
                <!-- @*列表显示*@ -->
                <div id="DisplayModePanle">
                  <div class="propertyTitle" style="display:none;">
                    <div class="titletxt">列表显示</div>
                    <div class="titleControl">
                      <i class="fa fa-angle-down"></i>
                    </div>
                  </div>

                  <div class="propertyContent" style="overflow:inherit;">
                    <ul class="ColumnList">
                      <li style="display:none;">
                        <div class="input-group">
                          <span class="input-group-addon">默认维度</span>
                          <select id="selDefaultDisplayDimension" class="form-control"></select>
                        </div>
                      </li>
                      <li style="padding-bottom: 16px;">
                        <div class="input-group" style="width:100%">
                          <span class="input-group-addon titletxt listOptionalDisplayMode">Web端显示模式</span>
                          <div class="form-control" style="border:0;height:30px;padding-top:0;">
                            <CheckboxGroup v-model="showMode">
                                <Checkbox label="list">
                                   <span>列表</span>
                                </Checkbox>
                                <Checkbox label="calendar">
                                   <span>日历</span>
                                </Checkbox>
                            </CheckboxGroup>


                            <!-- <div style="width:33%;float:left;">
                              <input type="checkbox" name="optionalDisplayMode" checked value="0" id="optionalDisplayMode_list" onclick="return false">
                              <label for="optionalDisplayMode_list" style="padding:0px;width:70px;">列表</label>
                            </div>
                            <div style="width: 33%; float: left;">
                              <input type="checkbox" name="optionalDisplayMode" value="1" id="optionalDisplayMode_calendar">
                              <label for="optionalDisplayMode_calendar" style="padding:0px;width:70px;">日历</label>
                            </div> -->
                            <!-- <div style="width: 33%; float: left;">
                              <input type="checkbox" name="optionalDisplayMode" value="2" id="optionalDisplayMode_timeline">
                              <label for="optionalDisplayMode_timeline" style="padding:0px;width:70px;">时间轴</label>
                            </div> -->
                          </div>
                        </div>
                      </li>

                      <li style="border-top: 1px solid #E1E1E1; padding-top: 16px;">
                        <span class="input-group-addon titletxt listDisplayModeSelector">默认显示模式</span>
                        <div class="input-group" style="width: 100%;">
                          <!-- <div class="modeTab toggleMode-W-M">
                            <span class="active">Web端</span>
                            <span>移动端</span>
                          </div> -->
                           <RadioGroup v-model="defaultShowList">
                               
                                <Radio v-if="showMode.indexOf('list')>=0" label="list">列表</Radio>
                                <Radio v-if="showMode.indexOf('calendar')>=0" label="calendar">日历</Radio>
                            </RadioGroup>
                          <!-- <div style="height:60px;padding-top: 16px;padding-bottom: 16px;">
                            <div class="rdio rdio-primary" style="width:33%;float:left;">
                              <input type="radio" name="displayMode" id="displayMode_list" value="0" checked="checked">
                              <label for="displayMode_list" style="padding:0px;">列表</label>
                            </div>
                            <div class="rdio rdio-primary" style="width: 33%; float: left;">
                              <input type="radio" name="displayMode" id="displayMode_calendar" value="1">
                              <label for="displayMode_calendar" style="padding:0px;">日历</label>
                            </div>
                          </div> -->
                        </div>
                      </li>

                      <li style="border-top: 1px solid #E1E1E1; padding-top: 16px;">
                        <span class="input-group  input-group-addon listDisplayModeTab">
                          <div class="modeTab">
                            <span v-if="showMode.indexOf('list')>=0"  :class="{active:showModePropertyIndex==0}" @click="showModePropertyIndex=0">列表</span>
                            <span v-if="showMode.indexOf('calendar')>=0"  :class="{active:showModePropertyIndex==1}" @click="showModePropertyIndex=1">日历</span>
                          </div>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="input-group" style="width: 100%;">
                  <!--批量操作-->
                  <!-- <div id="SelectableContainer" v-show="showModePropertyIndex==0||showModePropertyIndex==1" style="padding-bottom: 16px;">
                    <span class="input-group-addon titletxt" style="border:0; background-color:#fff;width:100px;text-align:left; position:relative;display:block;">批量操作
                      <i data-tip="设置员工是否允许批量操作或处理权限范围内的数据" class="icon-tooltip icon-tips"></i>
                    </span>
                    <div style="border:0;height:30px;">
                      <div class="rdio rdio-primary" style="width:50%;float:left;">
                        <input type="radio" name="SelectionMode" id="SelectionVisible" value="0" checked="checked">
                        <label for="SelectionVisible" style="padding:0px;">允许</label>
                      </div>
                      <div class="rdio rdio-primary" style="width: 50%; float: left;">
                        <input type="radio" name="SelectionMode" id="SelectionVisibleNo" value="1">
                        <label for="SelectionVisibleNo" style="padding:0px;">不允许</label>
                      </div>
                    </div>
                  </div> -->
                  <div id="listSetting" v-show="showModePropertyIndex==0">
                    <!--子表展示-->
                    <!-- <div id="DefaultDisplayChildCode" class="input-group mb15" style="width: 100%;">
                      <span class="input-group-addon titletxt" style="border:0; background-color:#fff;width:100px;text-align:left;display:block;position:relative;">默认显示子表
                        <i data-tip="选择的子表可在打开列表时直接进行展示" class="icon-tooltip icon-tips"></i>
                      </span>
                      <RadioGroup v-model="childModel" size="large">
                          <Radio label="显示"></Radio>
                          <Radio label="隐藏"></Radio>
                      </RadioGroup>
                    </div> -->
                    <div>
                      <!--排序字段-->
                      <!-- <div id="SelectionSortBy" class="input-group mb15" style="width: 100%;">
                        <span class="input-group-addon titletxt" style="border:0; background-color:#fff;width:100px;text-align:left; display:block;">排序字段</span>
                        <Select v-model="sortByModel" style="width:200px">
                            <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </div> -->
                    </div>
                    <div>
                      <!--排序方式-->
                      <div class="input-group" style="width: 100%;padding-top: 16px;padding-bottom: 16px;border-top: 1px solid #E1E1E1;">
                        <span class="input-group-addon titletxt" style="border:0; background-color:#fff;width:100px;text-align:left;display:block;">排序方式</span>
                        <RadioGroup v-model="sortDirectionModel" size="large">
                            <Radio label="降序"></Radio>
                            <Radio label="升序"></Radio>
                        </RadioGroup>
                      </div>
                    </div>
                    <div>
                      <!--列表图片-->
                      <!-- <div id="SelectionIcon" class="input-group mb15" style="width: 100%;padding-bottom: 16px;">
                        <span class="input-group-addon" style="border:0; background-color:#fff;width:100px;text-align:left;position:relative; display:block;margin-bottom: 8px;">列表图片
                          <i data-tip="选择后，在移动端列表可以显示图片控件中的图片，多张的情况下只显示第一张" class="icon-tooltip icon-tips"></i>
                        </span>
                      </div> -->
                    </div>
                  </div>
                  <div id="calendarSetting" v-show="showModePropertyIndex==1">
                    <div style="padding-top: 16px;border-top: 1px solid #E1E1E1;">
                      <label class="column-title" style="position:relative;width:34%;">时间跨度从
                        <i data-tip="例如您预定了今天和明天的会议室，日历列表中可跨日期区间展示这一条数据" class="icon-tooltip icon-tips"></i>
                      </label>
                      <Select style="width:120px" v-model="startTime" >
                        <Option v-for="item in dateTimeList" :value="item.controlId">{{item.displayName}}</Option>
                      </Select>
                    </div>
                    <div>
                      <label class="column-title" style="width:34%;">至</label>
                       <Select style="width:120px" v-model="endTime" >
                        <Option v-for="item in dateTimeList" :value="item.controlId">{{item.displayName}}</Option>
                      </Select>
                    </div>

                  </div>
                 
                </div>
                <div id="DisplayModePanle">
                  <div class="propertyContent" style="overflow:inherit;">
                    <ul class="ColumnList">
                      <li style="padding-bottom: 16px;">
                        <div class="input-group" style="width:100%">
                          <span class="input-group-addon titletxt listOptionalDisplayMode">移动端显示模式</span>
                          <div class="form-control" style="border:0;height:30px;padding-top:0;">
                            <span class="input-group-addon titletxt" style="border:0; background-color:#fff;width:100px;text-align:left;display:block;">分类字段</span>
                            <Select v-model="classifyModel" clearable>
                              <Option v-for="item in classifyList" :value="item.controlId" :key="item.controlId">{{ item.displayName }}</Option>
                            </Select>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- <div id="ActionBtn" class="action-v">
                  <div style="padding-top: 16px;border-top: 1px solid #E1E1E1;">
                    <span class="input-group-addon titletxt" style="margin-bottom:8px;">功能按钮</span>
                    <div class="form-control" style="width:98%;">
                      <a>设置功能按钮</a>
                    </div>
                  </div>
                </div> -->
                <!-- @*列表操作*@ -->
                <div id="ActionPanle" style="display:none;height:100%">
                  <div class="propertyContent">
                    <ul id="ActionList" class="ColumnList ui-sortable ActionList" style="min-height:310px;max-height:310px;overflow:auto;"></ul>
                  </div>
                </div>
                <div id="DisplayModePanle" style="border-top: 1px solid #E1E1E1; margin-top: 20px; padding-top: 5px;">
                  <div class="propertyContent" style="overflow:inherit;">
                    <ul class="ColumnList">
                      <li>
                        <div class="input-group" style="width:100%">
                          <span style="display: block; padding-top: 8px; margin-bottom: 10px" class="input-group-addon titletxt listOptionalDisplayMode">人员统计配置</span>
                          <Select v-model="userStatisControl" placeholder="请选择人员控件，默认使用发起人" clearable>
                            <Option
                              v-for="item in getListThead.filter(val => val.ControlKey === 26 && val.UnitType === 4)"
                              :value="item.Code"
                              :key="item.Code"
                            >{{ item.DisplayName }}</Option>
                          </Select>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div id="DisplayModePanle">
                  <div class="propertyContent" style="overflow:inherit;">
                    <ul class="ColumnList">
                      <li style="padding-bottom: 16px;">
                        <div class="input-group" style="width:100%">
                          <span style="display: block; padding-top: 8px; margin-bottom: 10px" class="input-group-addon titletxt listOptionalDisplayMode">时间统计配置</span>
                          <Select v-model="dateStatisControl" placeholder="请选择日期控件，默认使用表单创建时间" clearable>
                            <Option
                              v-for="item in getListThead.filter(val => val.ControlKey === 5)"
                              :value="item.Code"
                              :key="item.Code"
                            >{{ item.DisplayName }}</Option>
                          </Select>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
          <div id="PropertysPopover" v-show="showQueryPopup" class="popover filterContent up-popover" style="overflow-y: auto; display: block; top: 75px;">
            <div class="popover-content propertyContent">
                <div>
                    <ul class="nav nav-pills nav-stacked input-right">
                        <li id="select-all" data-role="columnSelector" data-propertyname="select-all" class="clearfix">
                            <div class="filter">
                                <input type="checkbox" id="347f0931-c29f-4c7b-9365-2eda87beedce" null="">
                                <label for="347f0931-c29f-4c7b-9365-2eda87beedce">全选</label>
                            </div>
                        </li>
                        <li v-for="item in getListThead" data-role="columnSelector" data-propertyname="item.id" class="clearfix">
                            <div class="filter">
                                <input type="checkbox" id="10d17841-33bd-4945-b792-64022e3f3610" v-model="item.isQuery">
                                <label for="10d17841-33bd-4945-b792-64022e3f3610" v-text="item.DisplayName"></label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </i-col>
      <i-col class="flex-left">
        <div id="left-box"  class="col-left">
          <div class="tab-content">
            <div class="section">
              <div class="btn-save"><Button type="primary" :disabled="disabled" size="small" @click="saveList">保存</Button></div>
            </div>
            <div class="section" v-show="queryColumns.length > 0">
              <div class="item-title">查询条件</div>
              <div id="DesignerQueryItems" class="DesignerView">
                <div class="queryItem" v-for="item in queryColumns">
                  <query-item :type="item.Type" :displayName="item.DisplayName" :readonly="true" :key="item.Code"></query-item>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="item-title item-title-list">列表字段</div>
              <div id="DesignerView" class="DesignerView">
                    <div class="listview-table">
                      <Table border :columns="tableColumns" :data="tableDatas"></Table>
                    </div>
                    <div id="TablePageIndex" class="table-page">
                      <Page class-name="list-page" :current="1" :total="50" :show-elevator="true" show-sizer show-total></Page>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import queryItem from './queryItem.vue';
import { mapGetters, mapMutations } from "vuex";
import HTTP from "@/api/listview";

export default {
  components: {
    draggable,
    queryItem
  },
  props: ["tableData"],
  data() {
    return {
      appId: this.$router.currentRoute.query.appId,
      childModel: "显示",
      sortDirectionModel: "降序",
      showMode:['list'],
      sortByModel: "",
      classifyList: [],
      dateTimeList:[],
      startTime:"CreatedTime",
      endTime:"CreatedTime",
      classifyModel: "",
      showQueryPopup: false,
      showQueryContent: false,
      showColumnContent: true,
      disabled: false,
      defaultShowList:'list',
      showModePropertyIndex: 0, //0 列表  1 日历  2 时间轴
      userStatisControl: '',
      dateStatisControl: ''
    };
  },
  computed: {
    ...mapGetters("listview", ["getListThead", "getListQuery", "getListConfig","getListMode","getDateFromTo","getDefaultShowMode"]),
    // 子表是否显示
    IsChild() {
      return this.chileModel == "显示" ? true : false;
    },
    // 排序类型 0-升序 1-降序
    sortDirection() {
      return this.sortDirectionModel == "升序" ? 0 : 1;
    },
    // 排序字段
    sortBy() {
      const filterArrs = this.getListThead.filter(
        item => item.DisplayName == this.sortByModel
      );
      return filterArrs.length > 0 ? filterArrs[0].Code : "";
    },
    // 字段拖拽
    columnDragData: {
      get() {
        return this.getListThead;
      },
      set(val) {
        this.setListThead(val);
      }
    },
    // 查询拖拽
    queryDragData: {
      get() {
        return this.getListQuery;
      },
      set(val) {
        this.setListQuery(val);
      }
    },
    // 字段全选
    allColumnSelected() {
      let result = true;
      for (let i = 0, len = this.getListThead.length; i < len; i++) {
        if (!this.getListThead[i].Visible) {
          result = false;
          break;
        }
      }
      return result;
    },
    // 查询全选
    allQuerySelected() {
      let result = true;
      for (let i = 0, len = this.getListQuery.length; i < len; i++) {
        if (!this.getListQuery[i].IsQueryItem) {
          result = false;
          break;
        }
      }
      return result;
    },
    // 排序列表
    // sortList() {
    //   let arrs = [];
    //   this.getListThead.forEach(item => {
    //     if (item.sortable) {
    //       arrs.push({
    //         value: item.Code,
    //         label: item.DisplayName
    //       });
    //     }
    //   });
    //   return arrs;
    // },
    // 查询列表
    queryColumns() {
      let queryArrs = [];
      this.getListQuery.forEach(item => {
        if (item.IsChild && this.IsChild) {
          item.ChildColumns.forEach(child => {
            if (child.IsQueryItem) {
              chiild.Value = child.Type === 7 ? 0 : '';
              queryArrs.push(child);
            }
          });
        } else if (item.IsQueryItem) {
          item.Value = item.Type === 7 ? 0 : '';
          queryArrs.push(item);
        }
      });
      return queryArrs;
    },
    // 表格表头
    tableColumns() {
      let tableArrs = [
        {
          title: "数据标题",
          key: "Name",
          align: "center",
          minWidth: 100
        }
      ];
      this.getListThead.forEach(item => {
        let obj = [];
        if (item.IsChild && this.IsChild) {
          let isEmpty = true;
          for (let i = 0, len = item.ChildColumns.length; i < len; i++) {
            if (item.ChildColumns[i].Visible) {
              isEmpty = false;
              break;
            }
          }
          if (!isEmpty) {
            obj = {
              title: item.DisplayName,
              key: item.Code,
              align: "center",
              children: []
            };
            item.ChildColumns.forEach(child => {
              if (child.Visible) {
                obj.children.push({
                  title: child.DisplayName,
                  key: child.Code,
                  align: "center",
                  minWidth: 100
                });
              }
            });
            tableArrs.push(obj);
          }
        } else if (item.Visible) {
          obj = {
            title: item.DisplayName,
            key: item.Code,
            align: "center",
            minWidth: 100
          };
          tableArrs.push(obj);
        }
      });
      return tableArrs;
    },
    // 表格数据
    tableDatas() {
      let tableArrs = [];
      this.tableData.forEach(item => {
        let obj = {};
        for (let key in item) {
          const arrs = key.split(".");
          if (arrs.length > 1) {
            obj[arrs[1]] = item[key];
          } else {
            obj[arrs[0]] = item[key];
          }
        }
        tableArrs.push(obj);
      });
      return tableArrs;
    }
  },
  watch: {
    getListConfig(newListConfig) {
      this.sortDirectionModel =
        newListConfig.SortDirection == 1 ? "降序" : "升序";
      const filterArrs = this.getListThead.filter(
        item => item.Code == newListConfig.SortBy
      );
      this.sortByModel = filterArrs.length > 0 ? filterArrs[0].DisplayName : "";
      this.classifyModel = newListConfig.SortNameFeild;
      if (newListConfig.StatisConfig) {
        try {
          const config = JSON.parse(newListConfig.StatisConfig);
          this.userStatisControl = config.userControl;
          this.dateStatisControl = config.dateControl;
        } catch (error) {
          console.error(error); // eslint-disable-line
        }
      }
      this.showMode = this.getListMode;
      this.startTime = this.getDateFromTo[0];
      this.endTime = this.getDateFromTo[1];
      this.defaultShowList = this.getDefaultShowMode;
      
    }
  },
  created() {},
  mounted() {
    var s = document.body.clientHeight - 95;
    $("#DesignerZone").css({ height: s + "px" });
    $(window).resize(function() {
      s = document.body.clientHeight - 95; //当浏览器大小变化时
      $("#DesignerZone").css({ height: s + "px" });
    });
    this.setClassifyControl()
    this.getDateTimeControl()
  },
  methods: {
    ...mapMutations("listview", ["setListThead", "setListQuery", "setListConfig"]),
    // 显示查询列表
    // showQueryPopupEvent() {
    //   this.showQueryPopup = true;
    //   $(document).click(event => {
    //     if (event.target.id != "btnAddQuery") {
    //       this.showQueryPopup = false;
    //       $(document).off("click");
    //     }
    //   });
    // },
    // 获取可分类字段
    setClassifyControl() {
      HTTP.getClassifyControl({
        appId: this.appId,
        controlType: '3;4;5'
      }).then(res => {
        if(+res.code === 0) {
          this.classifyList = res.datas;
        }
      })
    },
        // 获取可分类字段
    getDateTimeControl() {
      HTTP.getClassifyControl({
        appId: this.appId,
        controlType: '10;13;14'
      }).then(res => {
        if(+res.code === 0) {
          this.dateTimeList = res.datas;
        }
      })
    },
    // 显示查询字段
    showQueryContentEvent() {
      this.showQueryContent = !this.showQueryContent;
    },
    // 显示列表字段
    showColumnContentEvent() {
      this.showColumnContent = !this.showColumnContent;
    },
    // 保存列表
    saveList() {
      const list = this.getListThead.map(item => {
        for(let i = 0,len = this.getListQuery.length; i < len; i++){
          if(item.Code === this.getListQuery[i].Code) {
            item.IsQueryItem = this.getListQuery[i].IsQueryItem;
            break;
          }
        }
        return item;
      });
      const statisConfig = {
        userControl: this.userStatisControl || '',
        dateControl: this.dateStatisControl || ''
      };
      //禁用按钮
       this.disabled=true;
      HTTP.saveListSetting({
        appId: this.appId + "",
        sortDirection: +this.sortDirection,
        sortBy: this.sortBy + "",
        showMode: this.showMode.join(";"),
        defaultShowMode:this.defaultShowList,
        sortNameFeild: this.classifyModel || '',
        dateFromTo:this.startTime+';'+this.endTime,
        columns: JSON.stringify(list),
        statisConfig: JSON.stringify(statisConfig)
      })
        .then(res => {
          if (+res.code == 0) {
            this.$Message.success({
              content: "保存成功"

            });
          } else {
            this.$Message.error({
              content: "保存失败"
            });
          }
          this.disabled=false;
        })
        .catch(() => {
          this.$Message.error({
            content: "保存失败"
          });
          this.disabled=false;
        });
    },
    // 字段全选
    selectAllColumnClick(isAllVisible) {
      this.getListThead.forEach((item, index) => {
        item.Visible = !isAllVisible;
        this.$set(this.getListThead, index, item);
        if (item.IsChild) {
          this.selectChildrenAllClick(item.Code, isAllVisible);
        }
      });
    },
    // 子表字段全选
    selectChildrenAllClick(id, isAllVisible) {
      let result = this.getListThead.map((item, index) => {
        if (item.IsChild && item.Code == id) {
          item.ChildColumns.forEach((child, childIndex) => {
            item.ChildColumns[childIndex].Visible = !isAllVisible;
          });
        }
      });
      this.setListThead(result);
    },
    // 子表字段选项点击
    childSchemaClick(ParentId) {
      setTimeout(() => {
        let result = this.getListThead.map((item, index) => {
          if (item.IsChild && item.Code == ParentId) {
            let result = true;
            for (let i = 0, len = item.ChildColumns.length; i < len; i++) {
              if (!item.ChildColumns[i].Visible) {
                result = false;
                break;
              }
            }
            item.Visible = result;
          }
        });
        this.setListThead(result);
      }, 0);
    },
    // 查询全选
    selectAllQueryClick(isAllVisible) {
      this.getListQuery.forEach((item, index) => {
        item.IsQueryItem = !isAllVisible;
        this.$set(this.getListQuery, index, item);
        if (item.IsChild) {
          this.selectChildrenAllQueryClick(item.Code, isAllVisible);
        }
      });
    },
    // 子表查询全选
    selectChildrenAllQueryClick(id, isAllVisible) {
      let result = this.getListQuery.map((item, index) => {
        if (item.IsChild && item.Code == id) {
          item.ChildColumns.forEach((child, childIndex) => {
            item.ChildColumns[childIndex].IsQueryItem = !isAllVisible;
          });
        }
      });
      this.setListQuery(result);
    },
    // 子表查询选项点击
    childQueryClick(ParentId) {
      setTimeout(() => {
        let result = this.getListQuery.map((item, index) => {
          if (item.IsChild && item.Code == ParentId) {
            let result = true;
            for (let i = 0, len = item.ChildColumns.length; i < len; i++) {
              if (!item.ChildColumns[i].IsQueryItem) {
                result = false;
                break;
              }
            }
            item.IsQueryItem = result;
          }
        });
        this.setListThead(result);
      }, 0);
    }
  }
};
</script>

<style lang="less">
hr {
  margin: 0;
}

.pull-right {
  float: right;
}

.clearfix {
  clear: both;
}

li.select-all-child {
  .filter {
    label {
      width: 100%;
    }
  }
}

.icon-tooltip {
  color: #2d7fff;
}

.sp_placeholder {
  line-height: 30px;
}

.designer-zone-container {
  height: 100%;

  .flex {
    background: #f2f2f6;

    .flex-left {
      background: #fff;
      margin-right: 302px;
      display: block;
      float: none;
      width: auto !important;
    }

    .flex-right {
      width: 300px;
      background: #fff;
      border-radius: 2px;
      float: right;
    }
  }

  .ivu-row,
  .ivu-col {
    height: 100%;
  }

  .col-left {
    // height: 100%;
    // box-shadow: 0 2px 4px 0 #e5edfc;
    // border-radius: 2px;
    // overflow-y: auto;

    .tab-content {
      padding: 16px 16px 32px 16px;
      overflow: hidden;
      overflow-y: auto;
    }

    .empty-query-group {
    }
    .section{
      overflow: hidden;
      .btn-save {
        float: right;
      }
    }
    .item-title {
      position: relative;
      height: 30px;
      line-height: 30px;
      padding-left: 15px;
      font-size: 14px;
      font-weight: 600;
      color: #000000;
    }
    .formlistTimeline {
      overflow: hidden;
    }

    .bootstrap-table {
      padding: 0 15px 0 0;
    }
  }

  .col-right {
    position: relative;
    height: 100%;
    padding-left: 0;
    font-size: 14px;
    overflow: hidden;

    .ivu-tabs {
      height: 100%;
    }

    .ivu-tabs-bar {
      margin-bottom: 0;

      .ivu-tabs-nav-container {
        width: 260px;
        margin: 0 auto;

        .ivu-tabs-nav-scrollable {
          padding: 0;
        }

        .ivu-tabs-nav-prev,
        .ivu-tabs-nav-next {
          display: none;
        }

        .ivu-tabs-ink-bar {
          background-color: #2d7fff;
          height: 3px;
        }

        .ivu-tabs-tab {
          width: 120px;
          text-align: center;
        }

        .ivu-tabs-tab-active {
          color: #2d7fff;
        }
      }
    }

    .ivu-tabs-content {
      height: 100%;

      .ivu-tabs-tabpane {
        .pro-item {
          width: 97%;
          margin: 0 auto;

          .proItemPanle {
            .propertyTitle {
              cursor: pointer;
              overflow: hidden;
              height: 30px;
              line-height: 30px;
              color: #757575;

              .titletxt {
                float: left;
                margin-left: 5px;
                font-size: 14px;
                line-height: 30px;
                color: #383838;
              }

              .titleControl {
                float: right;

                i {
                  position: relative;
                  display: inline-block;
                  width: 14px;
                  height: 14px;
                  font-size: 14px;
                  color: #2d7fff;
                }
              }
            }

            .propertyContent {
              clear: both;
              padding: 0;
              margin-bottom: 5px;

              .ColumnList {
                margin: 0px;
                padding: 0px;

                .ColumnItem {
                  padding-left: 10px;
                  padding-right: 0;
                  margin: 0 !important;
                  list-style: none;
                  min-height: 30px;
                  line-height: 30px;
                  border: brown;
                  background-color: #fff;
                  clear: both;

                  .ColumnName {
                    float: left;
                    cursor: pointer;
                    padding-left: 2px;
                    line-height: 30px;
                  }

                  .ColumnGroup {
                    float: right;
                  }
                }

                .ColumnItem.IsChild {
                  li {
                    padding-left: 10px;
                    list-style: none;
                    height: 30px;
                    line-height: 30px;
                    background-color: #fff;
                  }

                  .myColumnItemChildName {
                    padding-left: 0;

                    .ColumnName {
                      width: 100%;
                    }
                  }

                  .ChildColumnItem {
                    margin-left: 10px;
                  }
                }
              }
            }
          }

          .columnPanle,.queryItemPanle {
            .propertyTitle {
              li {
                height: 30px;
                line-height: 30px;
              }

              .titleControl {
                label {
                  width: 100px;
                }

                label:before {
                  right: 0;
                  left: auto;
                  line-height: 30px;
                }
              }
            }
          }
        }
      }
    }
  }

  #DesignerView {
    .listview-table {
      flex-grow: 1;
      // .ivu-table-wrapper {
      //   border: none;
      // }
      // .ivu-table:after {
      //   display: none;
      // }
      // .ivu-table-body {
      //   .ivu-table-column-center {
      //     border: none;
      //   }
      // }
      // .ivu-table-border td,
      // .ivu-table-border th {
      //   &:last-child {
      //     border-right: none;
      //   }
      // }
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

  #DesignerQueryItems {
    background-color: #fff;
    overflow: hidden;
    padding-left: 15px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e1e1e1;
    // border-radius: 2px;
    .queryItem{
      float: left;
      width: 33.33%;
      margin-bottom:5px;
    }
    // .form-group {
    //   float: left;
    //   width: 100%;
    //   height: 34px;
    //   line-height: 34px;
    //   margin: 4px 0;

    //   .form-control {
    //     position: relative;
    //     float: left;
    //     width: 100%;
    //     height: 32px;
    //     margin-bottom: 0;
    //     padding: 4px 18px;
    //     line-height: 1.42857143;
    //     font-size: 14px;
    //     color: #555;
    //     background-color: #fff;
    //     background-image: none;
    //     border: 1px solid #e1e1e1;
    //     box-shadow: none;
    //   }

    //   .form-control:focus {
    //     box-shadow: none !important;
    //     border-color: #2d7fff !important;
    //   }

    //   .col-md-1.control-label {
    //     padding-right: 0;
    //     line-height: 30px;
    //     margin-bottom: 0;
    //     color: #757575;
    //     font-weight: normal;
    //     overflow: hidden;
    //     white-space: nowrap;
    //     text-overflow: ellipsis;
    //   }
    // }

    // .input-group {
    //   position: relative;
    //   display: table;
    //   border-collapse: separate;

    //   .input-group-addon {
    //     border: 1px solid #e1e1e1;
    //     border-right: 0;
    //     background-color: #f9fafb;
    //   }

    //   .form-control + .input-group-addon {
    //     border-left: 0;
    //   }

    //   .form-control {
    //     position: relative;
    //     z-index: 2;
    //     float: left;
    //     width: 100%;
    //     margin-bottom: 0;
    //   }
    // }

    // .form-query-addModel {
    //   padding-right: 8px;
    // }
  }

  #QueryItemPanle {
    position: relative;
    margin-bottom: 10px;

    .ColumnGroup {
      // display: none;

      i {
        cursor: pointer;
        margin-right: 8px;
        font-size: 15px;
        position: relative;
        top: 3px;
      }

      .icon-shezhi:before {
        color: #2d7fff;
      }

      .icon-shezhi:hover:before {
        color: #095bdc;
      }

      .icon-delete:before {
        color: #ff5e5e;
      }

      .icon-delete:hover:before {
        color: #dd1111;
      }
    }

    .ColumnItem.active .ColumnGroup,
    .ColumnItem:hover .ColumnGroup {
      display: block;
    }
  }

  #ColumnPanle,#QueryItemPanle {
    padding-top: 16px;
    border-top: 1px solid #e1e1e1;

    li label:before {
      left: auto;
      right: 0;
    }
  }
  #QueryItemPanle {
    .ColumnItem {
      cursor: pointer;
    }
  }
  #ColumnPanle {
    .ColumnItem {
      cursor: move;
      &.IsChild {
        li {
          cursor: move;
        }
      }
    }
  }

  #PropertysPopover {
    position: absolute;
    width: 256px;
    left: 20px;
    max-height: 250px;
    padding: 0;
    border: 0;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.175);
    border-radius: 3px;

    &:before {
      content: "";
      position: absolute;
      display: inline-block;
      top: -13px;
      right: 24px;
      width: 0;
      height: 0;
      border: 7px solid #561616;
      border-color: transparent transparent #fff;
    }

    &.down-popover:before {
      display: inline-block;
    }

    &.up-popover:before {
      display: none;
    }

    .propertyContent {
      clear: both;
      padding: 0;
    }

    li {
      margin: 0;

      .filter {
        height: 30px;
        line-height: 30px;
      }

      .dropdownlist-item a {
        padding: 0 16px;
      }

      label {
        width: 100%;
      }

      .input-right {
        input[type="checkbox"] + label {
          padding: 0 3px !important;
        }
      }
    }

    li[data-type="fillTop"] ~ li {
      padding: 0 16px;
    }

    li[data-role="columnSelector"] {
      padding: 0;
    }

    li[data-childCode] {
      height: auto;
      padding: 0;

      .filter-children {
        li {
          padding-left: 20px;
        }
      }
    }

    .SheetAreaSelect {
      padding: 16px;
      padding-top: 0;
      margin: 0;

      .area-item {
        cursor: pointer;
      }

      li {
        padding: 0;
      }
    }

    .dropdown-footer {
      padding: 0 12px;
    }
  }

  #FieldSet {
    position: absolute;
    top: 0;
    left: 3%;
    bottom: 60px;
    padding-right: 10px;
    overflow-y: auto;
  }

  #ListSet {
    height: 100%;
    margin-left: 3%;
    padding-bottom: 100px;
    overflow-y: auto;

    #DisplayModePanle {
      padding-bottom: 6px;

      .listOptionalDisplayMode,
      .listDisplayModeSelector,
      .listDisplayModeTab {
        border: 0;
        background-color: #fff;
        text-align: left;
        display: inline-block;
        width: 100%;
        border-radius: 0;
        height: 30px;
        line-height: 30px;
        padding: 0 0 8px 0;
        color: #333;
        font-size: 14px;
      }

      .modeTab {
        height: 30px;
        text-align: center;

        span {
          display: block;
          float: left;
          height: 30px;
          font-size: 12px;
          line-height: 30px;
          width: 49%;
          color: #2d7fff;
          border: 1px solid #2d7fff;
          text-align: center;
          cursor: pointer;
        }

        span:first-child {
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        span:last-child {
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
        }

        span.active {
          color: #fff;
          background-color: #2d7fff;
        }

        .modeTab + div {
          margin-top: 16px;
          margin-bottom: 14px;
          padding: 0;
          border: none;
        }
      }

      .listDisplayModeTab {
        .modeTab {
          width: 100%;

          span {
            width: 30%;
            border: 0;
            color: #1a2c5b;
            background: #f0f0f0;
            border-radius: 3px;
          }

          span.active {
            color: #fff;
            background-color: #2d7fff;
            text-decoration: none;
          }

          span + span {
            margin-left: 4%;
          }
        }
      }

      input[type="checkbox"] + label:before {
        left: 0;
      }
    }

    .action-v {
      text-align: center;
      line-height: 30px;
      width: 100%;
      margin: 0 auto;

      .input-group-addon {
        border: 0px;
        background-color: rgb(255, 255, 255);
        width: 100px;
        text-align: left;
        display: block;
      }

      .form-control {
        box-shadow: none;
      }

      a {
        color: #424242;
      }
    }

    .input-group-addon {
      padding-left: 0;
    }

    #SelectableContainer {
      padding-bottom: 16px;
    }

    #DefaultDisplayChildCode,
    #SelectionSortBy {
      padding-top: 16px;
      padding-bottom: 16px;
      border-top: 1px solid #e1e1e1;

      .input-group-addon {
        margin-bottom: 8px;
      }
    }
  }

  #timelineSetting {
    margin-bottom: 10px;

    #timelineAxis,
    #timelineSortType {
      margin-bottom: 8px;
      width: 100%;

      span {
        border: 0;
        background-color: #fff;
        width: 100px;
        text-align: left;
        display: block;
      }
    }
  }

  #calendarSetting {
    margin-bottom: 10px;
  }

  #FieldSet,
  #ListSet {
    .titletxt {
      font-weight: 600;
    }
  }

  #ColumnPanle,
  #QueryItemPanle {
    .propertyContent .ColumnItem.active,
    .propertyContent li.ColumnItem:hover,
    .propertyContent li.ChildColumnItem:hover {
      border-left: 4px solid rgba(30, 101, 255, 0.7);
      background-color: rgba(30, 101, 255, 0.05);

      .ColumnName {
        margin-left: -4px;
      }
    }
    .propertyContent li.myColumnItemChildName:hover {
      margin-left: -4px;
      border-left: 4px solid rgba(30, 101, 255, 0.7);
      background-color: rgba(30, 101, 255, 0.05);
    }
  }

  .column-title {
    position: relative;
    display: inline-block;
    top: -10px;
    width: 30%;
    margin-bottom: 0;
    font-weight: normal;
  }

  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
    white-space: nowrap;
    vertical-align: middle;

    .form-control {
      padding: 0;
      box-shadow: none;
    }
  }

  .dropdown-footer {
    height: 55px;

    .link {
      display: inline-block;
      float: left;
      width: 100px;
      height: 36px;
      line-height: 36px;
      margin: 4px;
      border: 1px solid #d6d4d4;
      border-radius: 3px;
      text-align: center;
    }

    .link + .link {
      float: right;
    }
  }

  .btn-ok,
  .btn-ok:hover {
    color: #fff;
    background-color: #2d7fff;
  }

  .btn-cancel,
  .btn-cancel:hover {
    color: #666;
    background-color: #fff;
  }

  a,
  a.active {
    transition: none;
    background-color: transparent;
  }
}

.lihide {
  display: none;
}

a,
a:link,
a:hover {
  text-decoration: none;
}

.fixed-table-body {
  overflow: hidden;
  overflow-x: auto;
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
input[type="checkbox"]:checked + label:before {
  content: "" !important;
  border: 0;
  color: #fff !important;
  background-size: 16px 16px;
}
input[type="checkbox"]:checked + label:before {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTA4NDEyMjU2NjQwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3MjAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTAgMTAxLjg4OEMwIDQ1LjY3MDQgNDUuOTc3NiAwIDEwMS44ODggMGg4MjAuMjI0Qzk3OC4zMjk2IDAgMTAyNCA0NS45Nzc2IDEwMjQgMTAxLjg4OHY4MjAuMjI0YzAgNTYuMjY4OC00NS45Nzc2IDEwMS44ODgtMTAxLjg4OCAxMDEuODg4SDEwMS44ODhDNDUuNjcwNCAxMDI0IDAgOTc4LjAyMjQgMCA5MjIuMTEyVjEwMS44ODh6IG00MzguNzg0IDUwOS40NEwyOTIuMTk4NCA0NjQuNjRhNTEuMiA1MS4yIDAgMSAwLTcyLjM5NjggNzIuMzk2OGwyMTguOTgyNCAyMTkuMDMzNiAzNjEuNDcyLTM2MS40NzJhNTEuMiA1MS4yIDAgMSAwLTcyLjM0NTYtNzIuNDQ4TDQzOC43ODQgNjExLjI3Njh6IiBmaWxsPSIjMkQ3RkZGIiBwLWlkPSIxNzIxIj48L3BhdGg+PC9zdmc+);
}
input[type="checkbox"],
input[type="radio"] {
  display: none;
}
input[type="checkbox"] + label,
input[type="radio"] + label {
  width: 100px;
  position: relative;
  display: inline-block;
  float: left;
  width: auto;
  min-height: 30px;
  line-height: 30px;
  margin-right: 0;
  margin-bottom: 0;
  padding: 0 0 0 1.5em !important;
  text-align: left;
  font-weight: 400;
  cursor: pointer;
}
input[type="checkbox"] + label:before {
  content: "";
  position: absolute;
  float: left;
  top: 50%;
  left: 0;
  width: 16px;
  height: 16px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  margin-right: 0;
  margin-top: 0;
  background-color: #fafafa;
  border: 1px solid #e1e1e1;
  cursor: pointer;
}
.form-query-dropdown input[type="checkbox"] + label:before,
.input-right input[type="checkbox"] + label:before,
.multiselect-container input[type="checkbox"] + label:before {
  right: 4px;
  left: auto;
  margin-top: 0;
}
.form-query-dropdown input[type="checkbox"] + label,
.input-right input[type="checkbox"] + label,
.multiselect-container input[type="checkbox"] + label {
  width: 100%;
  padding: 0 10px !important;
}
.popover-content .dropdown-menu li:hover input[type="checkbox"] + label:before,
.popover-content .dropdownlist li:hover input[type="checkbox"] + label:before,
.popover-content
  li[data-childCode]
  > div:hover
  input[type="checkbox"]
  + label:before,
.popover-content
  li[data-role="columnSelector"]:hover
  input[type="checkbox"]
  + label:before {
  border: 1px solid #fff;
  background-color: rgba(30, 101, 255, 0);
}
.popover-content .dropdownlist li:hover,
.popover-content li[data-childCode] > div:hover,
.popover-content li[data-role="columnSelector"]:hover {
  background-color: rgba(30, 101, 255, 0.6);
  color: #fff;
}
.popover-content li[data-role="columnSelector"]:hover label {
  color: #fff;
}
.popover-content
  .dropdown-menu
  li:hover
  input[type="checkbox"]:checked
  + label:before,
.popover-content
  .dropdownlist
  li:hover
  input[type="checkbox"]:checked
  + label:before,
.popover-content
  li[data-childCode]
  > div:hover
  input[type="checkbox"]:checked
  + label:before,
.popover-content
  li[data-role="columnSelector"]:hover
  input[type="checkbox"]:checked
  + label:before {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ2LjIgKDQ0NDk2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cCAzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IuWIl+ihqCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuWIl+ihqOiuvuiuoV8zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTMzNC4wMDAwMDAsIC0yNDMuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzM0LjAwMDAwMCwgMjQzLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0xMi1Db3B5LTQiIGZpbGw9IiNGRkZGRkYiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjEiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02Ljg0NjI5Nzg1LDExLjk1MTg4NDYgQzYuNjQ5MTM2MSwxMS45NTE4ODQ2IDYuNDUyNzY1OCwxMS44NzYyODYxIDYuMzAyMzYwMzQsMTEuNzI1ODgwNiBMMy4yMjUwMTQ2MSw4LjYzNjA4NDgzIEMyLjkyNDk5NTEzLDguMzM0NTEyODkgMi45MjQ5OTUxMyw3Ljg0NTEyNDM4IDMuMjI1MDE0NjEsNy41NDM1NTI0NCBDMy41MjU4MTAzMiw3LjI0MTk1MDA3IDQuMDEyODU0OTMsNy4yNDE5NTAwNyA0LjMxMjg3NDQyLDcuNTQzNTUyNDQgTDYuODQ2Mjk3ODUsMTAuMDg3MDgyMSBMMTEuNjg3MTI1Niw1LjIyNjc3MjU0IEMxMS45ODcxNDUxLDQuOTI0NDA5MTUgMTIuNDc0MTg5Nyw0LjkyNDQwOTE1IDEyLjc3NDk4NTQsNS4yMjY3NzI1NCBDMTMuMDc1MDA0OSw1LjUyODM0NDQ3IDEzLjA3NTAwNDksNi4wMTY5NTY3NiAxMi43NzQ5ODU0LDYuMzE4NTI4NyBMNy4zOTAyMjAxNCwxMS43MjU4ODA2IEM3LjIzOTgyOTksMTEuODc2Mjg2MSA3LjA0MjY2ODE1LDExLjk1MTg4NDYgNi44NDYyOTc4NSwxMS45NTE4ODQ2IiBpZD0iRmlsbC0xLUNvcHktNCIgZmlsbD0iIzg2QUNGRiI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=) !important;
  color: #fff !important;
  background-size: 16px 16px;
}
.popover-content .dropdown-menu li:hover input[type="checkbox"] + label:before,
.popover-content .dropdownlist li:hover input[type="checkbox"] + label:before,
.popover-content
  li[data-childCode]
  > div:hover
  input[type="checkbox"]
  + label:before,
.popover-content
  li[data-role="columnSelector"]:hover
  input[type="checkbox"]
  + label:before {
  border: 1px solid #fff;
  background-color: rgba(30, 101, 255, 0);
}
.list-page {
  text-align: right;
  pointer-events: none;
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
.ivu-radio-group {
  width: 100%;
  display: flex !important;
  .ivu-radio-group-item {
    flex: 1;
  }
  .ivu-radio {
    margin-right: 4px !important;
  }
}

.statis-checkbox {
  .ivu-checkbox-wrapper {
    margin-bottom: 0;
  }
}
</style>

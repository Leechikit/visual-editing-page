<style scoped>
.formula-modal {
    float: left;
    padding: 8px
}

.formula-modal li{
    display: block
}

.formula-modal .editor-container {
    height: 400px
}

.formula-modal .editor-container .apptree{
    position: relative;
    width: 200px;
    height: 400px;
    margin-right: 9px;
    background: #fff;
    border: 1px solid #e1e1e1;
    border-radius: 2px;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

.formula-modal .editor-container .apptree .root-title{
    height: 30px;
    line-height: 30px;
    padding: 0 8px;
    border-bottom: 1px solid #e1e1e1;
    cursor: pointer
}

.formula-modal .editor-container .apptree .root-title .add-btn-sheet{
    color: #2d7fff;
    float: right;
    font-size: 12px
}

.formula-modal .editor-container .apptree .root-title .add-btn-sheet.disabled{
    color: #c7c7c7
}

.formula-modal .editor-container .formula-wrap{
    width: 70%;
    height: 400px;
    border: 1px solid #e1e1e1;
    border-radius: 2px
}

.formula-modal .editor-container .formula-wrap .editor-description{
    height: 30px;
    line-height: 30px;
    padding-left: 5px;
    background: #e8f4fe
}

.formula-modal .editor-container .formula-wrap .formula-editor{
    height: 80%;
    width: 100%;
    padding: 5px;
    overflow: auto;
    border: none;
    outline: none
}

.formula-modal .editor-container .formula-wrap .formula-editor:empty:before {
    content: attr(placeholder);
    color: #999
}

.formula-modal .editor-container .formula-wrap .div-intelligent-containe{
    position: absolute;
    width: 200px;
    display: none;
    height: auto;
    background-color: #f6f6f6;
    cursor: pointer;
    max-height: 400px;
    overflow: auto;
    z-index: 1
}

.formula-modal .editor-container .formula-wrap .btn-function {
    position: absolute;
    bottom: 8px;
    right: 8px;
    width: 75px;
    height: 23px;
    line-height: 21px;
    padding-left: 0;
    border: 1px solid #2d7fff;
    border-radius: 3px;
    font-size: 10px;
    cursor: pointer
}

.formula-modal .editor-container .formula-wrap .btn-function .icon-fx {
    display: inline-block;
    width: 100%;
    font-size: 12px;
    line-height: 20px;
    padding-left: 4px
}

.formula-modal .editor-container .formula-wrap .btn-function .icon-fx:before {
    font-size: 10px;
    color: #2d7fff;
    margin-right: 4px
}

.formula-modal .editor-container .formula-wrap .formula-description {
    width: 470px;
    font-size: 12px;
    color: #797979
}

.formula-modal .editor-container .formula-wrap .formula-description>div {
    margin: 3px
}

.formula-modal .editor-container .formula-wrap .formula-description .description,.formula-modal .editor-container .formula-wrap .formula-description .example,.formula-modal .editor-container .formula-wrap .formula-description .validate {
    font-size: 12px
}

.formula-modal .editor-container .formula-wrap .formula-description .validate {
    color: #e97763
}

.formula-modal .editor-container .formula-wrap .formula-description li {
    position: relative;
    height: 20px;
    line-height: 20px;
    margin: 0 0 0 20px
}

.formula-modal .editor-container .formula-wrap .formula-description li span.circle {
    font-size: 12px;
    color: #797979
}

.formula-modal .editor-container .formula-wrap .formula-description li span.circle:before {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    top: 8px;
    left: -12px;
    background: #989898;
    border-radius: 100%
}

.formula-modal .editor-container .submit-err-msg {
    position: relative;
    height: 60px;
    line-height: 60px;
    text-align: center
}

.formula-modal .editor-container .submit-err-msg .input-wrap input {
    height: 32px;
    width: 100%;
    padding: 5px
}

.formula-modal .editor-container .submit-err-msg .input-wrap span {
    position: absolute;
    top: 45px;
    left: 0;
    height: 20px;
    line-height: 20px
}

.formula-modal .editor-container #txt_title {
    display: none;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 5px;
    border: none;
    outline: none;
    border-bottom: 1px solid #f1f1f1;
    border-radius: 0
}

.formula-modal .function-container {
    position: absolute;
    top: 0;
    height: 400px;
    width: 200px;
    background: #fff;
    border-radius: 2px
}

.formula-modal .function-container:before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    top: 0;
    left: -14px;
    border: 7px solid #561616;
    border-color: transparent #fff transparent transparent
}

.formula-modal .function-container .header {
    height: 46px;
    line-height: 25px;
    padding: 10px 5px;
    border-bottom: 1px solid #ededed;
    font-size: 16px;
    color: #080808
}

.formula-modal .function-container .header .close {
    float: right;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .2
}

.formula-modal .function-container .header i {
    width: 17px;
    height: 17px;
    font-size: 16px;
    margin-right: 5px
}

.formula-modal .function-container .header i:before {
    color: #656565
}

.formula-modal .function-container .search {
    padding: 5px
}

.formula-modal .function-container .search i {
    line-height: 22px
}

.formula-modal .function-container .search i:before {
    color: #cdcccc
}

.formula-modal .function-container .search .ivu-input {
    width: 100%;
    height: 22px;
    margin: 0
}

.formula-modal .function-container .search .ivu-input:focus {
    box-shadow: none;
    border: 1px solid #2d7fff
}

.formula-modal .function-container .body {
    position: relative;
    top: 0;
    background-color: #fff;
    height: 425px;
    margin: 0 5px;
    border: 1px solid #e1e1e1;
    border-radius: 2px
}

.formula-modal .function-container .body .function-header {
    width: 100%;
    text-align: left
}

.formula-modal .function-container .body li.leaf,.formula-modal .function-container .body span {
    height: 30px;
    line-height: 30px;
    padding-left: 10px
}

.formula-modal .function-container .body span .function-title {
    margin-left: 3px
}

.formula-modal .function-container .body li.leaf {
    cursor: pointer;
    padding-left: 35px
}

.formula-modal .function-container .body li.leaf:hover {
    background-color: #e8f4fe
}

.formula-modal .function-container .body .search-result {
    display: block!important
}

.formula-modal .function-container .body .search-result li {
    padding-left: 20px
}

.formula-modal .function-container .body a.function-name,.formula-modal .function-container .body span .function-title {
    font-size: 14px;
    color: #080808;
    letter-spacing: 0
}

.formula-modal .function-container .body a:focus,.formula-modal .function-container .body a:hover {
    text-decoration: none!important
}

.formula-modal .sheet-container {
    position: absolute;
    top: 29px;
    width: 100%;
    height: 379px;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #ccc
}

.formula-modal .sheet-container:before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    top: -11px;
    right: 13px;
    border: 5px solid #561616;
    border-color: transparent transparent #a2a2a2
}

.formula-modal .sheet-container:after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    top: -10px;
    right: 13px;
    border: 5px solid #561616;
    border-color: transparent transparent #fff
}

.formula-modal .sheet-container .ivu-input-wrapper {
    padding: 5px
}

.formula-modal .sheet-container .ivu-input-wrapper input {
    height: 22px
}

.formula-modal .sheet-container .root-tree {
    height: 370px;
    border-bottom: 0;
    overflow: auto
}

.formula-modal .sheet-search i,.formula-modal .unit-search i {
    line-height: 28px
}

.formula-modal .sheet-search i:before,.formula-modal .unit-search i:before {
    color: #cdcccc
}

.formula-modal .sheet-search .ivu-input-wrapper input,.formula-modal .unit-search .ivu-input-wrapper input {
    width: 96%;
    height: 22px;
    border: 1px solid #d7dade;
    border-radius: 1px;
    margin: 4px
}

.formula-modal .sheet-search .ivu-input-wrapper input:focus,.formula-modal .unit-search .ivu-input-wrapper input:focus {
    box-shadow: none;
    border: 1px solid #2d7fff
}

.formula-modal .sheet-search .search-result,.formula-modal .unit-search .search-result {
    border-bottom: 1px solid #e1e1e1
}

.formula-modal .sheet-search .search-result ul,.formula-modal .unit-search .search-result ul {
    margin: 0
}

.formula-modal .sheet-search .search-result li,.formula-modal .unit-search .search-result li {
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    cursor: pointer
}

.formula-modal .sheet-search .search-result li:hover,.formula-modal .unit-search .search-result li:hover {
    background-color: #e8f4fe
}

.formula-modal .sheet-search .search-result li i:before,.formula-modal .unit-search .search-result li i:before {
    font-size: 16px;
    color: #2d7fff
}

.formula-modal .sheet-search .search-result li .search-item,.formula-modal .unit-search .search-result li .search-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
    display: block
}

.formula-modal .sheet-search .search-result li .search-item .icon.unit i:before,.formula-modal .unit-search .search-result li .search-item .icon.unit i:before {
    font-size: 12px
}

.formula-modal .sheet-search .search-result li .search-item .departmentname,.formula-modal .unit-search .search-result li .search-item .departmentname {
    margin-left: 4px;
    font-size: 12px;
    color: #3f3f3f;
    letter-spacing: 0;
    line-height: 19px
}

.formula-modal .nodata {
    margin-top: 50%;
    font-size: 12px;
    color: #848484;
    text-align: center
}

.formula-modal .ivu-icon-arrow-right-b {
    color: #797979
}

.formula-modal .ivu-tree-arrow-open .ivu-icon-arrow-right-b {
    color: #2d7fff
}

.formula-modal .ivu-input-wrapper i {
    line-height: 28px
}

.formula-modal .ivu-input-wrapper i:before {
    color: #cdcccc
}

.formula-modal .ivu-input-wrapper input {
    width: 98%;
    height: 22px;
    margin-top: 0;
    border: 1px solid #d7dade;
    border-radius: 1px;
    margin: 2px
}
</style>


<template>
  <div class="formula-modal" v-if="showModal">
      <Row class="editor-container" :style="editorConHeight">
        <div class="apptree ivu-col ivu-col-span-7" :style="editorConHeight1">
          <!--左侧数据模型-->
          <div  v-for="treeData in appTreeData" :key="treeData.id" class="root">
            <!-- 头部标题 -->
            <!-- 选择目标对象 -->
            <div v-if="showTargetSheet&&treeData.id=='root'" class="root-title" ref="targetSheet" @click="toggleChildren(treeData)">
              <span class="ivu-tree-arrow" :class="{'ivu-tree-arrow-open':treeData.expand}">
                <i class="ivu-icon ivu-icon-arrow-right-b"></i>
              </span>
              {{treeData.name}}
              <span class="add-btn-sheet" :class="{'disabled':!treeData.expand}" @click.stop="addTargetSheet(treeData.expand)">
                {{targetSheetTreeData.length==0?'添加':'修改'}}</span>
            </div>
            <!-- 组织 -->
            <div v-else-if="treeData.id==orgRoot" class="root-title" @click="toggleChildren(treeData)">
              <span class="ivu-tree-arrow" :class="{'ivu-tree-arrow-open':treeData.expand}">
                <i class="ivu-icon ivu-icon-arrow-right-b"></i>
              </span>
              组织机构
            </div>
            <!-- 当前表单、角色 -->
            <div v-else class="root-title" @click="toggleChildren(treeData)">
              <span class="ivu-tree-arrow" :class="{'ivu-tree-arrow-open':treeData.expand}">
                <i class="ivu-icon ivu-icon-arrow-right-b"></i>
              </span>
              {{treeData.name}}
            </div>
            <!-- 对应子节点 -->
            <div v-if="showTargetSheet&&treeData.id=='root'">
              <appTree v-show="treeData.expand" v-if="targetSheetTreeData.length>0" :data="targetSheetTreeData" :parentData="treeData"
                :config="urlParamsConfig" @onclick="chooseLeftTree" class="root-tree" :style="mainStyles">
              </appTree>
              <div v-else v-show="treeData.expand" :style="mainStyles">
                <div class="nodata">
                  点击添加按钮选择表单
                </div>
              </div>
              <!-- 选择应用表单 -->
              <div class="sheet-container" v-show="showSearchSheet" :style="searchSheetStyles">
                <!-- 表单搜索后期做 -->
                <div class="ivu-input-wrapper ivu-input-type sheet-search" style="display:none;">
                  <i class="ivu-icon ivu-icon-ios-search ivu-input-icon"></i>
                  <input class="ivu-input" type="text" v-model="sheetSearchKey" placeholder="搜索">
                </div>
                <app-tree v-show="unitSearchKey==''" :IsTargetTree="showTargetSheet" v-if="allTargetSheetTreeData && allTargetSheetTreeData.length>0"
                  :data="allTargetSheetTreeData" :parentData="treeData" :config="urlParamsConfig" @chooseSheet="chooseSheet"
                  class="root-tree"> 
                  <!--  :style="unitStyles" -->
                </app-tree>
              </div>
            </div>
            <div v-else-if="treeData.id==orgRoot" v-show="treeData.expand" class="unit-search">
              <div class="ivu-input-wrapper ivu-input-type">
                <i class="ivu-icon ivu-icon-ios-search ivu-input-icon"></i>
                <input class="ivu-input" type="text" v-model="unitSearchKey" @keyup="searchUnits" placeholder="搜索部门、人员">
              </div>
              <app-tree v-show="treeData.expand&&unitSearchKey==''" v-if="treeData.children && treeData.children.length>0" :data="treeData.children"
                :parentData="treeData" :config="urlParamsConfig" @onclick="chooseLeftTree" class="root-tree" :style="unitStyles">
              </app-tree>
              <div v-show="unitSearchKey!=''" class="search-result" :style="unitStyles">
                <ul v-show="unitSearchData.length>0">
                  <li v-for="d in unitSearchData" :key="d.UnitID" @click="clickSearchUnit(d,'unit')">
                    <div class="search-item">
                      <span class="icon unit">
                        <i class="ivu-icon icon-zhuzi"></i>
                      </span>
                      <key-high-light class="displayname" :words="d.DisplayName" :keyword="unitSearchKey"></key-high-light>
                    </div>
                  </li>
                </ul>
                <ul v-show="userSearchData.length>0">
                  <li v-for="d in userSearchData" :key="d.ObjectId" @click="clickSearchUnit(d,'user')">
                    <div class="search-item">
                      <span class="icon user">
                        <i class="ivu-icon icon-ewnwu"></i>
                      </span>
                      <key-high-light class="displayname" :words="d.Name" :keyword="unitSearchKey"></key-high-light>
                      -
                      <span class='departmentname' v-text="d.DepartmentName"></span>
                    </div>
                  </li>
                </ul>
                <div v-show="unitSearchData.length==0&&userSearchData.length==0" class="nodata">
                  没有搜索到相关数据
                </div>
              </div>
            </div>
            <div v-else>
              <appTree v-show="treeData.expand" v-if="treeData.children && treeData.children.length>0" :data="treeData.children" :parentData="treeData"
                :config="urlParamsConfig" @onclick="chooseLeftTree" class="root-tree" :style="mainStyles">
              </appTree>
            </div>
          </div>

        </div>
        <div class="formula-wrap ivu-col ivu-col-span-17" :style="[editorConHeight1,editorConWidth]">
          <Row style="height: 300px; border-bottom: 1px solid #e1e1e1;" :style="editorHeight">
            <!-- 报表数据源提示 -->
            <div v-show="FormulaType == 'DATASOURCE'">
              <input id="txt_title" v-model="formulaResult" ref="formulaResult" 
              class="form-control" placeholder="请输入计算字段的名称"/>
            </div>
            <!-- else 提示 -->
            <div class="editor-description" v-text="editorTitle" v-show="FormulaType != 'DATASOURCE'"></div>
            <!--编辑区域 -->
            <div class="formula-editor" spellcheck="false" contenteditable="true" tabindex="0" :placeholder="placeholder" >
            </div>
            <div class="div-intelligent-container" v-if="allowFunInput">
              <table>
                <tr>
                  <td>
                    <ul>
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
            <!-- 函数按钮 -->
            <div v-if="allowFunInput" class="btn-function" @click="showFunctionsFun" ref="showFunConBtn">
              <span class="icon icon-fx">插入函数</span> 
            </div>
          </Row>
          <Row class="formula-description">
            <!--说明及校验区域-->
            <div ref="example" class="example" v-show="functionHelper.Example!=''">
              函数示例:
              <span id="formula_example" class="example" v-text="functionHelper.Example"></span>
            </div>
            <div ref="description" class="description" v-show="functionHelper.Description!=''">
              函数说明:
              <span id="formula_description" class="description" v-text="functionHelper.Description"></span>
            </div>
            <div ref="validate" class="validate" style="display:none;">
              校验信息:
              <span id="formula_validate" class="validate" v-text="functionHelper.Validate"></span>
            </div>
            <div ref="formuladescriptions"  v-if="showFormulaDescription" id="FormulaDescriptions">
              <ul>
                <li v-for="(des,key) in formulaDescription" :key="key">
                  <span v-html="des" class="circle"></span>
                </li>
              </ul>
            </div>
          </Row>
        </div>
        <div v-if="showSubmitErrDes" class="submit-err-msg ivu-col ivu-col-span-24">
          <div class="ivu-col ivu-col-span-4">
            <span>校验错误提示</span>
            <span style="color:#ed6c5b;">*</span>
          </div>
          <div class="input-wrap ivu-col ivu-col-span-20">
            <input :style="errMssgInput" v-model="submibtErrMsg" placeholder="当表单不能提交时弹出的提示信息内容"> 
            <span :style="errMssgSpan">此项为必填项</span>
          </div>
        </div>
      </Row>
      <div class="function-container" v-show="showFunctions" :style="functionStyles" before-top="100px">
        <div class="header">
          <div class="close" @click="showFunctions=!showFunctions">
            <i class="icon-close_2"></i>
          </div>
          函数列表
        </div>
        <div class="search">
          <div class="ivu-input-wrapper ivu-input-type">
            <i class="ivu-icon ivu-icon-ios-search ivu-input-icon"></i>
            <input class="ivu-input" type="text" v-model="functionSearchKey" placeholder="搜索">
          </div>
        </div>
        <div class="body" :style="{ height: contentHeight + 30 +'px' }">
          <ul  :style="functionUl">
            <li v-for="(fun,index) in functions" :key="fun.Name" class="function-root">
              <span class="function-header ivu-tree-arrow" :class="{'ivu-tree-arrow-open':fun.Expend}" v-show="functionSearchKey==''" @click="toggleShow(fun)">
                <i class="ivu-icon ivu-icon-arrow-right-b"></i>
                <a href="javascript:void(0)" v-text="fun.Name" class="function-title"></a>
              </span>
              <ul v-show="fun.Expend" :class="{'show search-result':functionSearchKey!=''}">
                <li v-for="f in fun.children" :key="f.Name" class="leaf" v-show="functionSearchKey==''||f.Name.toLowerCase().indexOf(functionSearchKey.toLowerCase())>-1"
                  @click="chooseFunction(f)" @mouseover="showFunctionHelper(f)">
                  <a v-text="f.Name" class="function-name"></a>
                </li>
              </ul>
            </li>
            <div class="nodata" v-show="noSearchFun">
              没有搜索到相关函数
            </div>
          </ul>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import "assets/css/H3/Designer/formula.css";
import { baseUrl } from "../../../config/env";
import Bus from "../../../lib/H3/H3Plugins/bus.js";
import { Icon, Modal, Row, Tree } from "iview";
import appTree from "../app-tree/app-tree.vue";
import keyHighLight from "../key-high-light/key-high-light";
import HTTP from "../../../../../api/form.js"
import {
  getFormulaEventHandlerOnAction,
  getFormulaOnAction,
  getAppTreeOnAction,
  getAppTreeReportingOnAction,
  SearchUsers,
  SearchOrgs,
  FilterOrgs
} from "../../../service/getData";
import {
  FormulaTypeList,
  FormulaTypeTitle,
  FormulaEditorLoaded,
  FormulaSettings,
  chooseLeftTreeNode
} from "../../../lib/H3/Console/Formula/Formula";
let errMsgHeight = 60;
export default {
  components: {
    Modal,
    Row,
    Icon,
    appTree,
    Tree,
    keyHighLight
  },
  props: {
    Title: {
      type: String,
      default: ""
    },
    TitleText: {
      type: String,
      default: ""
    },
    Controlkey: {
      type: String,
      default: ""
    },
    Formula: {
      //公式code
      type: String,
      default: ""
    },
    FormulaText: {
      //公式text
      type: String,
      default: ""
    },
    FormulaType: {
      type: String,
      default: ""
    },
    SubmitErrDes: {
      //表单校验错误提示
      type: String,
      default: ""
    },
    BusinessType: {
      //业务规则 区分生效作废
      type: [String, Number],
      default: ""
    },
    FormulaField: {
      type: String,
      default: ""
    },
    FormulaParameter: {
      type: String,
      default: ""
    },
    SchemaCode: {
      type: String,
      default: ""
    },
    WorkflowCode: {
      type: String,
      default: ""
    },
    Width: {
      type: String,
      default: "700px"
    },
    Height: {
      type: String,
      default: "540px"
    }
  },
  data() {
    return {
      showModal: true,
      contentHeight: 0,
      curSheetFileds: [], //当前表单字段
      orgRoot: "18f923a7-5a5e-426d-94ae-a55ad1a4b240",
      title: "",
      editorTitle: "",
      appTreeData: [], //左侧数
      flowTreeData:[],
      functions: [], //右侧方法
      unitSearchData: [], //组织搜索结果
      userSearchData: [], //人员搜索结果
      showFunctions: false,
      noSearchFun: false, //函数搜索结果
      appTreeDefaultConfig: {
        treeId: undefined,
        url: baseUrl + "/Console/AppTree/OnAction",
        command: "LoadAppTreeNodes",
        showUnitSelectionRange: false,
        showSystem: false,
        showSystemEN: false,
        showSubSheet: true,
        showAssociation: false,
        showField: false,
        showOrganization: false,
        showPost: false,
        showRules: false,
        showFunction: false,
        showConst: false,
        showSubSheetField: false,
        showBizProperties: false,
        showAssociationField: false,
        showOnlyParticipant: false,
        showCheckbox: false,
        showSheetAssociation: false,
        showWorkflow: false,
        showWorkflowSystemField: false,
        curSheetCode: "",
        customCodes: [],
        chkStyle: "checkbox",
        chkDisableInherit: true,
        canCheckTypes: [],
        root: {
          appCode: null,
          display: null,
          icon: null,
          expand: true,
          nodeType: "AppPackage"
        },
        excludeCodes: [],
        excludeFields: [],
        canSelectType: []
      },

      showTargetSheet: false, //是否显示目标表单或者关联表单
      showSearchSheet: false, //显示选择目标表单界面
      searchSheetStyles: {},
      allTargetSheetTreeData: [], //所有的表单数据
      targetSheetTreeData: [], //选择表单的表单字段
      targetSheetName: "", //选择表单的名称
      sheetSearchKey: "", //搜索表单关键词
      targetSheetSearchData: [], //搜索表单结果

      urlParamsConfig: {},
      allowFunInput: true, //是否允许输入函数
      functionStyles: {},
      functionHelper: { Description: "", Example: "", Validate: "" }, //函数帮助说明
      functionContainerBeforeTop: null, //函数容器三角符号的位置-css top值

      IntelligentFunctions: [], //方法
      BizDataTypes: [],

      placeholder: "",
      formulaDescription: [],
      showFormulaDescription: true,
      formulaResult: "",
      functionSearchKey: "", //函数搜索
      unitSearchKey: "", //组织搜索
      controlName: "", //目标控件

      submibtErrMsg: "", //提交校验失败提示
      errMsgRequire: false //必填
    };
  },
  computed: {
    mainWidth() {
      return this.Width.replace("px", "");
    },
    editorConHeight() {
      //编辑器主题高度，即ivu-modal-body 的高度
      let styles = {
        height: this.contentHeight + "px"
      };
      return styles;
    },
    editorConHeight1() {
      //排除表单校验时提示输入框高度
      let h = this.showSubmitErrDes ? errMsgHeight : 0;
      let styles = {
        height: this.contentHeight - h + "px"
      };
      return styles;
    },
    editorConWidth() {
      let w = this.mainWidth - 200 - 8 * 2 - 9;
      let styles = {
        width: w + "px"
      };
      return styles;
    },
    editorHeight() {
      //編輯器高度
      let h = this.showSubmitErrDes ? errMsgHeight : 0;
      let styles = {
        height: this.contentHeight - 110 - h + "px"
      };
      return styles;
    },
    mainStyles() {
      let h = this.showSubmitErrDes ? errMsgHeight : 0;
      let maxH = this.contentHeight - h - this.appTreeData.length * 30;
      const styleWidth = {
        maxHeight: maxH + "px",
        minHeight: maxH + "px",
        borderBottom: "1px solid #e1e1e1",
        overflow: "auto"
      };
      return styleWidth;
    },
    unitStyles() {
      let h = this.showSubmitErrDes ? errMsgHeight : 0;
      let maxH = this.contentHeight - h - this.appTreeData.length * 30 - 30;
      const styleWidth = {
        maxHeight: maxH + "px",
        minHeight: maxH + "px",
        borderBottom: "1px solid #e1e1e1",
        overflow: "hidden",
        overflowY: "auto"
      };
      return styleWidth;
    },
    functionUl() {
      const styleWidth = {
        maxHeight: this.contentHeight + 30 + "px",
        overflow: "hidden",
        overflowY: "auto"
      };
      return styleWidth;
    },
    showSubmitErrDes() {
      return this.FormulaType == FormulaTypeList.SCHEMASUBMIT ? true : false; //表单提交校验時
    },
    errMssgInput() {
      let style = {
        border: "1px solid #ddd",
        borderRadius: "2px"
      };
      if (this.errMsgRequire) {
        style.border = "1px solid #ff6161";
      }
      return style;
    },
    errMssgSpan() {
      let style = { fontSize: "12px", color: "#ed6c5b" };
      if (this.errMsgRequire) {
        style.display = "block";
      } else {
        style.display = "none";
      }
      return style;
    }
  },
  created() {
     
    this.submibtErrMsg = this.SubmitErrDes;
    this.contentHeight = Number(this.Height.replace("px", "")) - 120;
    let formulaType = this.FormulaType;
    let formulaSetting;
    if (formulaType === FormulaTypeList.BUSINESS) {
      formulaSetting =
        FormulaTypeTitle[this.FormulaType + this.BusinessType + ""];
      this.handleTargetSheet(); //业务规则时，处理表达式中的目标表单
    } else {
      formulaSetting = FormulaTypeTitle[this.FormulaType];
    }

    this.title = formulaSetting.title;
    this.editorTitle = formulaSetting.formulaTitle;
    switch (this.FormulaType) {
      case FormulaTypeList.SCHEMACOMPUTATION: //计算规则
        let rp = '';
        try {
          rp = document.getElementById(this.FormulaField).getAttribute('data-displayname');
        } catch (e) {
          rp = FormControls[this.Controlkey].Text;
        }
        this.editorTitle = this.editorTitle.replace("{}", rp);
        break;
    }

    this.placeholder = formulaSetting.placeholder;
    //IE11和FireFox不要显示placeholder，会引起兼容性问题
    if (window.navigator.userAgent.indexOf("Firefox") > -1 || window.navigator.userAgent.indexOf("rv:11") > -1) {
      this.placeholder = "";
    }

    this.formulaDescription = formulaSetting.formulaDescription;
    this.SchemaCode = this.SchemaCode || this.WorkflowCode;
    if(this.FormulaType=='Flow'){
      this.initFlowTree()
    }
    else{
      this.initAppTreeSetting();
    }
    
    this.initEditor();
    if (formulaType === FormulaTypeList.BUSINESS) {
      this.showFunctionsFun();
    }
  },
  methods: {
    show() {
      this.showModal = true;
    },
    save() {
      let formula = FormulaSettings.ReadExpression();
      let formulaText = FormulaSettings.ReadText();
      let saveSuccessful = true;

      if (this.FormulaType.toUpperCase() == FormulaTypeList.DATASOURCE) {
        if (this.formulaResult.trim().length == 0) {
          $.IShowError("", "请输入计算字段的名称");
          return;
        }
        var titleCode = $("#txt_title").attr("title-code");
        var titleText = $("#txt_title").val();

        let ret = FormulaSettings.Validate(formula);
        if (!ret.Successful) {
          //表达式校验失败
          saveSuccessful = false;
          this.$refs.example.setAttribute("style", "display:none");
          this.$refs.description.setAttribute("style", "display:none");
          this.$refs.validate.setAttribute("style", "");
          this.functionHelper.Description = "";
          this.functionHelper.Example = "";
          this.functionHelper.Validate = ret.msg;
        } else {
          Bus.$emit(this.FormulaType, {
            saveSuccessful: true,
            formula: formula,
            formulaText: formulaText,
            titleCode: titleCode,
            titleText: titleText
          });
        }
        return false;
      } else if (
        this.FormulaType.toUpperCase() == FormulaTypeList.SCHEMASUBMIT &&
        this.submibtErrMsg == "" &&
        formula != ""
      ) {
        //提交校验必填
        this.errMsgRequire = true;
        return false;
      }

      let description = "";
      let ret = FormulaSettings.Validate(formula);
      if (!ret.Successful) {
        saveSuccessful = false;
        this.$refs.example.setAttribute("style", "display:none");
        this.$refs.description.setAttribute("style", "display:none");
        this.$refs.validate.setAttribute("style", "");
        this.functionHelper.Description = "";
        this.functionHelper.Example = "";
        this.functionHelper.Validate = ret.msg;
      } else {
        Bus.$emit(this.FormulaType, {
          saveSuccessful: saveSuccessful,
          formula: formula,
          formulaText: formulaText,
          titleCode: "",
          titleText: "",
          description: this.submibtErrMsg
        });
        this.showModal = false;
        this.destroy();
      }
    },
    cancel() {
      this.showModal = false;
      this.destroy();
    },
    destroy() {
      this.$destroy();
      setTimeout(() => {
        this.showModal = false;
      }, 500);
    },
    DeleteKeyUp(e) {
      if (e.keyCode === 46) {
        e.stopPropagation();
      }
    },
    handleTargetSheet() {
      //两种情况，主表、子表
      let code = this.Formula.split("{");
      if (code.length < 2) {
        return;
      }

      let name = this.FormulaText.split("{")[1].split("}")[0];
      let targrtSheet = code[1].split("}")[0];
      let IsSubSheet = false, //是否是子表
        codes = targrtSheet.split("."),
        names = name.split("."),
        sheetCode = codes[0], //主表code
        sheetName = names[0],
        subSheetCode = "",
        subSheetName = ""; //子表code

      if (codes.length == 3) {
        IsSubSheet = true;
        subSheetCode = codes[1];
        subSheetName = names[1];
      }

      if (codes.length == 2) {
        // 判断 函数类型，ADDFILE,REMOVEFILE与其他区分
        let functionName = this.Formula.split("(")[0];
        if (functionName != "ADDFILE" && functionName != "REMOVEFILE") {
          IsSubSheet = true;
          subSheetCode = codes[1];
          subSheetName = names[1];
        }
      }

      let p = {
        IsSubSheet: IsSubSheet,
        sheetCode: sheetCode,
        sheetName: sheetName,
        subSheetCode: subSheetCode,
        subSheetName: subSheetName
      };

      let sheetNode = {
        Code: sheetCode,
        id: sheetCode,
        NodeType: "AppMenu",
        children: [],
        expand: false,
        isParent: true,
        level: "1",
        parentData: null,
        title: sheetName,
        name: sheetName
      },
        subSheetNode = {
          Code: subSheetCode,
          id: subSheetCode,
          NodeType: "SubSheet",
          children: [],
          expand: false,
          isParent: true,
          level: "1",
          parentData: sheetNode,
          title: subSheetName,
          name: subSheetName
        };

      let node = [];
      if (IsSubSheet) {
        node.push(subSheetNode);
      } else {
        node.push(sheetNode);
      }
      this.targetSheetTreeData = node;
    },
    async initAppTreeSetting() {
      let params = {
        ActionName: "InitAppTree",
        FormulaType: this.FormulaType,
        FormulaParameter: this.FormulaParameter,
        SchemaCode: this.SchemaCode,
        FormulaField: this.FormulaField
      };
      
      //let res = await getFormulaOnAction(params);
      var currentId = null;
      try {
        currentId = JSON.parse(sessionStorage.getItem("currentApp")).appId;
      } catch (err) {
        currentId = this.getQueryString('appId')
      }
      if(sessionStorage.getItem("currentAppType")=='op'){
          params.source='op'
      }
      HTTP.InitAppTree({SchemaCode:currentId,FormulaField:this.FormulaField}).then((res)=>{
        //let  res = {"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"AppTree":{"ShowSystem":true,"ShowSystemEN":false,"ShowSubSheet":true,"ShowAssociation":true,"ShowField":true,"ShowOrganization":true,"ShowPost":true,"ShowRules":false,"ShowFunction":false,"ShowConst":false,"ShowSubSheetField":true,"ShowBizProperties":false,"ShowAssociationField":false,"ShowOnlyParticipant":false,"ShowSheetAssociation":false,"CurSheetCode":this.SchemaCode,"FormulaType":"SCHEMADISPLAY","AppCode":this.SchemaCode,"Display":"当前表单","Icon":"","Expand":true,"ExcludeFields":["F0000007"],"CustomCodes":[]}}};
        let tree = res.datas;
        let setting = {
          showSystem: tree.ShowSystem, //是否显示系统字段
          showSystemEN: tree.ShowSystemEN,
          showSubSheet: tree.ShowSubSheet, //是否显示子表
          showAssociation: tree.ShowAssociation, //是否显示关联查询对象
          showAssociationField: tree.ShowAssociationField,
          showField: tree.ShowField, //是否显示字段
          showOrganization: tree.ShowOrganization, //是否显示组织机构
          showPost: tree.ShowPost, //是否显示角色
          showRules: tree.ShowRules, //是否显示规则
          showFunction: tree.ShowFunction, //是否显示函数公式
          showConst: tree.ShowConst, //是否显示常量
          showSubSheetField: tree.ShowSubSheetField,
          showBizProperties: tree.ShowBizProperties,
          showSheetAssociation: tree.ShowSheetAssociation,
          showOnlyParticipant: tree.ShowOnlyParticipant,
          excludeFields: [],
          curSheetCode: tree.CurSheetCode,
          customCodes: [],
          formulaType: tree.FormulaType,
          root: {
            appCode: tree.AppCode,
            display: tree.Display,
            icon: tree.Icon,
            expand: tree.Expand,
            nodeType: "AppMenu"
          }
        };
        this.initAppTree(setting); 
      })
      
    },

    async initFlowTree(){
        //添加第一个根节点
        let treeNode = {
          id: this.$route.query.appId,
          pId: "Root",
          name: "当前表单",
          Code: this.$route.query.appId,
          expand: true,
          NodeType:  "AppMenu",
          iconSkin: "",
          isParent: true,
          children: [],
          nocheck: true
        };
      

        var dataList =GlobalWorkflowProperties.DataItems;

        for(var data of dataList){
            var tmp={
              Code: data.Value,
              DataType: "",
              NodeType: "Field",
              ParentCode: null,
              children: null,
              iconSkin: "fa-file",
              id: data.Value,
              isParent: false,
              name: data.Text,
              nocheck: false,
              pId: "",
              title: data.Text
            }
            treeNode.children.push(tmp);
        }
        this.appTreeData.push(treeNode);
        this.flowTreeData.push(treeNode);

        var appId = JSON.parse(sessionStorage.getItem("currentApp")).appId;
        var param={}
        param.appId = appId;
        param.type='SCHEMADISPLAY'

        param.source='op'

        HTTP.getFormInfo(param)
                    .then(res => {
                        let treeData = res.ReturnData;  
                        let otherTreeData = treeData.OtherChildNodes;
                          for (let i = 0; i < otherTreeData.length; i++) {
                            let data = otherTreeData[i];
                            if (data.name == '组织机构') {
                              //组织机构时
                              data.expand = false;
                              this.appTreeData.push(data);
                              this.flowTreeData.push(data);
                            }
                            
                          }


                    })
                    .catch(err => {
                        this.$Message.error('This is an error'+err);
                        console.log(err);
                    }).finally(()=>{
                })
    },



    async initAppTree(setting) {
      let config = Object.assign({}, this.appTreeDefaultConfig, setting);
      if (this.FormulaType === "ActivityName") {
        this.allowFunInput = false;
        config.showWorkflowSystemField = true;
      }
      //config.root.appCode =JSON.parse(sessionStorage.getItem("currentApp")).appId;
      this.getUrlParamsConfig(config);
      if (config.root.appCode != null && config.root.appCode != "") {
        let params = {
          id: config.root.appCode,
          NodeType: config.root.nodeType,
          Command: config.command,
          ShowUnitSelectionRange: config.showUnitSelectionRange,
          ShowSystem: config.showSystem,
          ShowSystemEN: config.showSystemEN,
          ShowSubSheet: config.showSubSheet,
          ShowAssociation: config.showAssociation,
          ShowField: config.showField,
          ShowOrganization: config.showOrganization,
          ShowPost: config.showPost,
          ShowRules: config.showRules,
          ShowFunctions: config.showFunction,
          ShowConst: config.showConst,
          ShowBizProperties: config.showBizProperties, //暂定需要根据根节点设置来判断是否显示
          ShowSubSheetField: config.showSubSheetField,
          ShowAssociationField: config.showAssociationField,
          ShowOnlyParticipant: config.showOnlyParticipant,
          ShowSheetAssociation: config.showSheetAssociation,
          ShowWorkflow: config.showWorkflow,
          ShowWorkflowSystemField: config.showWorkflowSystemField,
          CurSheetCode: config.curSheetCode,
          ShowCheckBox: config.showCheckbox,
          CanCheckTypes: config.canCheckTypes.join(","),
          FirstLoad: true,
          ExcludeCodes: config.excludeCodes.join(","),
          ExcludeFields: config.excludeFields.join(","),
          FormulaType: config.formulaType,
          NewConsole: true
        };
        // let res = await getAppTreeOnAction(params);
        if(config.root.appCode!=config.curSheetCode){
            HTTP.LoadAppTreeNodes({id:params.id,CurSheetCode:params.CurSheetCode,type:this.FormulaType,needChildren:false}).then((res)=>{
                let treeData ={};
                treeData.ChildNodes = res.data.reWfTreeNodes;
                if ((config.curSheetCode != null && config.curSheetCode != "" && config.curSheetCode != config.root.appCode) || this.FormulaType == FormulaTypeList.ASSOCIATIONFILTER) {
                        this.showTargetSheet = true;
                        this.allTargetSheetTreeData = treeData.reWfTreeNodes;
                  }         

         //添加第一个根节点
            let treeNode = {
              id: config.root.appCode,
              pId: "Root",
              name: "",
              Code: config.root.appCode,
              expand: true,
              NodeType: config.root.nodeType,
              iconSkin: config.root.icon,
              isParent: true,
              children: [],
              nocheck: true
            };
        //1、有关联表单或者目标表单
              if (this.FormulaType == FormulaTypeList.ASSOCIATIONFILTER) {
                //过滤条件
                var nodes = treeData.ChildNodes;
                if (config.curSheetCode == config.root.appCode) {
                  //关联的是当前表单,要在每个节点编码前面加上表单code
                  for (var i = 0; i < nodes.length; i++) {
                    nodes[i].id = config.curSheetCode + "." + nodes[i].id;
                  }
                }
                treeNode.name = "关联表单-" + config.root.display;
                let children = [
                  {
                    id: config.root.appCode,
                    pId: config.root.nodeType,
                    name: config.root.display,
                    title: config.root.display,
                    display: false, //自己是否显示，当前的node，即li，不影响子节点的显示
                    Code: config.root.appCode,
                    expand: true, //显示子节点
                    NodeType: config.root.nodeType,
                    iconSkin: config.root.icon,
                    isParent: true,
                    children: nodes,
                    nocheck: true,
                    level: 1
                  }
                ];
                treeNode.children = children;
              } else if (this.FormulaType == FormulaTypeList.ActivityName) {
                treeNode.name = '表单字段';
                treeNode.children = treeData.ChildNodes;
              } else if (this.showTargetSheet) {
                //业务规则-目标表单
                treeNode.name = "目标表单";
                treeNode.children = treeData.ChildNodes;
              } else {
                //2、无关联表单或者目标表单--隐藏规则、计算规则
                treeNode.name = config.root.display;
                treeNode.children = treeData.ChildNodes;
              }
              this.appTreeData.push(treeNode);
              if (this.showTargetSheet) {
                //获取当前表单的所有数据项
                var cf = {
                  id: config.curSheetCode,
                  NodeType: "AppMenu",
                  Code: config.curSheetCode,
                  NewConsole: true
                };
                let params = Object.assign({}, cf, this.urlParamsConfig);
                //let res = await getAppTreeOnAction(params);
                this.curSheetFileds = res.data.curReWfTreeNodes;
                //添加并行根节点;
                this.appTreeData.push({
                  id: config.curSheetCode,
                  pId: "Root",
                  name: "当前表单",
                  Code: config.curSheetCode,
                  expand: false,
                  NodeType: "AppMenu",
                  iconSkin: config.root.icon,
                  isParent: true,
                  children: this.curSheetFileds,
                  nocheck: true,
                  IsCurScehma: true
                });
              }


               let otherTreeData = []
              for (let i = 0; i < otherTreeData.length; i++) {
                  let data = otherTreeData[i];
                  if (data.id == this.orgRoot) {
                    //组织机构时
                    data.children = [
                      {
                        id: data.id,
                        pId: "Root",
                        name: data.name,
                        title: data.title,
                        Code: data.Code,
                        expand: false,
                        NodeType: data.NodeType,
                        iconSkin: data.iconSkin,
                        isParent: true,
                        children: [],
                        nocheck: true
                      }
                    ];
                  }
                  data.expand = false;
                  this.appTreeData.push(data);
                }



            })
        }
        else{
            var appId = JSON.parse(sessionStorage.getItem("currentApp")).appId;
            var param={}
            param.appId = appId;
            // if(this.FormulaType==FormulaTypeList.SCHEMACOMPUTATION){
            //   param.type=FormulaTypeList.SCHEMACOMPUTATION
            // }
            param.type=this.FormulaType
            if(this.FormulaType=="SCHEMASUBMIT"||this.FormulaType=="ASSOCIATIONFILTER"||this.FormulaType=="SCHEMACOMPUTATION"){
                 param.needChildren =true  
            }
            if(this.FormulaType=="Flow"){
              param.source="op"
            }
            HTTP.getFormInfo(param)
                    .then(res => {
                         let treeData = res.ReturnData;
                         if ((config.curSheetCode != null && config.curSheetCode != "" && config.curSheetCode != config.root.appCode) || this.FormulaType == FormulaTypeList.ASSOCIATIONFILTER) {
                            this.showTargetSheet = true;
                            this.allTargetSheetTreeData = treeData.ChildNodes;
                          }
                          //添加第一个根节点
                        let treeNode = {
                          id: config.root.appCode,
                          pId: "Root",
                          name: "",
                          Code: config.root.appCode,
                          expand: true,
                          NodeType: config.root.nodeType,
                          iconSkin: config.root.icon,
                          isParent: true,
                          children: [],
                          nocheck: true
                        };

                        if (this.showTargetSheet) {
                            //获取当前表单的所有数据项
                            var cf = {
                              id: config.curSheetCode,
                              NodeType: "AppMenu",
                              Code: config.curSheetCode
                            };
                            let params = Object.assign({}, cf, this.urlParamsConfig);
                          //  let res = await getAppTreeOnAction(params);
                            this.curSheetFileds = res.ReturnData.ChildNodes;
                            //添加并行根节点;
                            this.appTreeData.push({
                              id: config.curSheetCode,
                              pId: "Root",
                              name: "当前表单",
                              Code: config.curSheetCode,
                              expand: false,
                              NodeType: "AppMenu",
                              iconSkin: config.root.icon,
                              isParent: true,
                              children: this.curSheetFileds,
                              nocheck: true,
                              IsCurScehma: true
                            });
                          }
                        let otherTreeData = treeData.OtherChildNodes;
                          for (let i = 0; i < otherTreeData.length; i++) {
                            let data = otherTreeData[i];
                            if (data.id == this.orgRoot) {
                              //组织机构时
                              data.children = [
                                {
                                  id: data.id,
                                  pId: "Root",
                                  name: data.name,
                                  title: data.title,
                                  Code: data.Code,
                                  expand: false,
                                  NodeType: data.NodeType,
                                  iconSkin: data.iconSkin,
                                  isParent: true,
                                  children: [],
                                  nocheck: true
                                }
                              ];
                            }
                            data.expand = false;
                            this.appTreeData.push(data);
                          }


                    })
                    .catch(err => {
                        this.$Message.error('This is an error'+err);
                        console.log(err);
                    }).finally(()=>{
                })

        }
       



       
        // if (
        //   config.curSheetCode != null &&
        //   config.curSheetCode != "" &&
        //   config.curSheetCode != config.root.appCode
        // ) {
        //   this.showTargetSheet = true;
        //   this.allTargetSheetTreeData = treeData.ChildNodes;
        // }

        
        

        
        
      } else if (config.customCodes.length > 0) {
        //处理报表选中后的展示，并行展示
        //获取显示名称和编码
        var params = {
          Codes: config.customCodes.join(";").trim(";"),
          ActionName: "GetSheetDisplayNames"
        };
        let res = await getAppTreeReportingOnAction(params);
        let results = res.ReturnData["Results"];
        if (results) {
          for (var i = 0, len = results.length; i < len; i++) {
            var node = results[i];
            let treeNode = {
              id: node.SchemaCode,
              pId: "AppMenu",
              name: node.DisplayName,
              Code: node.SchemaCode,
              expand: false,
              NodeType: "AppMenu",
              iconSkin: "",
              isParent: true,
              children: [],
              nocheck: true
            };
            this.appTreeData.push(treeNode);
          }
        }
      }
    },
    async toggleChildren(treeNode) {
      var oldState = treeNode.expand;
      this.showSearchSheet = false;
      this.unitSearchKey = "";
      this.appTreeData.forEach(function(tree) {
        //if (tree.id != treeNode.id) {
        tree.expand = false;
        //}
      }, this);
      treeNode.expand = !oldState;
      if (treeNode.children && treeNode.children.length == 0) {
        var cf = {
          id: treeNode.id,
          NodeType: treeNode.NodeType,
          Code: treeNode.Code
        };
        let params = Object.assign({}, cf, this.urlParamsConfig);
        // let res = await getAppTreeOnAction(params);
        // treeNode.children = res.ReturnData.ChildNodes;
      }
    },
    async showFunctionsFun() {
      if (this.functions.length == 0) {
        var params = {
          ActionName: "InitFunctionList",
          FormulaType: this.FormulaType
        };
        let res="";
        //let res = await getFormulaOnAction(params);
        if(this.FormulaType=="SCHEMACOMPUTATION"){
            res ={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"Functions":{"数学函数":[{"DisplayName":null,"Name":"ABS","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"ABS(number)","Description":"返回数字number的绝对值"},{"DisplayName":null,"Name":"COS","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"COS(A)","Description":"返回-1到1之间的余弦值，参数A为角度"},{"DisplayName":null,"Name":"INT","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"INT(number)","Description":"将数字number向下取整为最接近的整数"},{"DisplayName":null,"Name":"MAX","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MAX(v)","Description":"返回参数列表中的最大值，参数v是子表的某一个数字控件"},{"DisplayName":null,"Name":"MIN","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MIN(v)","Description":"返回参数列表中的最小值，参数v是子表的某一个数字控件"},{"DisplayName":null,"Name":"MOD","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MOD(number,divisor)","Description":"返回两数相除的余数，参数number是被除数，divisor是除数"},{"DisplayName":null,"Name":"PI","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"PI()","Description":"圆周率3.1415..."},{"DisplayName":null,"Name":"ROUND","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"ROUND(number,num_digits)","Description":"将数字四舍五入到指定的位数，number为要处理的数字，num_digits为指定小数位数"},{"DisplayName":null,"Name":"SIN","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"SIN(A)","Description":"返回-1到1之间的正弦值，参数A为角度"},{"DisplayName":null,"Name":"SQRT","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"SQRT(number)","Description":"开平方，参数number为非负数"},{"DisplayName":null,"Name":"AVG","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"AVG(v)","Description":"返回所有参数的平均值，参数v是子表的某一个数字控件"},{"DisplayName":null,"Name":"COUNT","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"COUNT(v)","Description":"统计参数列表中选项值的个数，参数v是子表的某一个控件"},{"DisplayName":null,"Name":"SUM","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"SUM(v)","Description":"统计输入参数的数值之和，参数v是子表的某一个数字控件"},{
                    "DisplayName":null,
                    "Name":"UPPERMONEY",
                    "FunctionScenarioTypes":[
                        1
                    ],
                    "FunctionCategories":[
                        0
                    ],
                    "Example":"UPPERMONEY(数字)",
                    "Description":"将数值转为中文大写金额"
                }],"文本函数":[{"DisplayName":null,"Name":"STARTSWITH","FunctionScenarioTypes":[1,2,3,5,0],"FunctionCategories":[1],"Example":"STARTSWITH(text,start_string)","Description":"判断文本字符串text是否以特定字符串start_string开始，是则返回true，否则返回false"},{"DisplayName":"CONTAINS","Name":"CONTAINS","FunctionScenarioTypes":[2,1,3,0,5],"FunctionCategories":[1,4],"Example":"CONTAINS(参数1,参数2)","Description":"判断参数1是否包含参数2的值，包含则返回true，不包含则返回false"},{"DisplayName":null,"Name":"LEFT","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"LEFT(text,[num_chars])","Description":"从文本字符串的第一个字符开始返回指定个数的字符，text为字符串，num_chars为指定个数，若不填则取默认值1"},{"DisplayName":null,"Name":"LEN","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"LEN(text)","Description":"返回文本字符串text中的字符个数"},{"DisplayName":null,"Name":"REPLACE","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"REPLACE(old_text,start_num,num_chars,new_text)","Description":"使用其他文本字符串并根据所指定的字符数替换某文本字符串中的部分文本，old_text为某文本字符串，start_num为要替换的起始位置编号，num_chars为要替换的字符个数，new_text为替换后的字符串"},{"DisplayName":null,"Name":"RIGHT","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"RIGHT(text,[num_chars])","Description":"从文本字符串的最后一个字符开始返回指定个数的字符，text为文本字符串，num_chars为指定个数，若不填则取默认值1"},{"DisplayName":null,"Name":"MID","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"MID(text,start_num,num_chars)","Description":"返回文本字符串中从指定位置开始的特定数目的字符，text为文本字符串，start_num为指定开始位置，num_chars为特定数目"},{"DisplayName":null,"Name":"LOWER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"LOWER(text)","Description":"将文本字符串text中所有大写字母转换为小写"},{"DisplayName":null,"Name":"UPPER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"UPPER(text)","Description":"将文本字符串text中所有小写字母转换为大写"},{"DisplayName":null,"Name":"TRIM","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"TRIM(text)","Description":"去掉文本字符串text中的首尾空格"}],"时间函数":[{
                    "DisplayName":null,
                    "Name":"DAY8S",
                    "FunctionScenarioTypes":[
                        1,
                        2,
                        3
                    ],
                    "FunctionCategories":[
                        2
                    ],
                    "Example":"DAYS(end_date,start_date)",
                    "Description":"返回两个日期之间的工时差值，精确到两位小数。end_date为结束日期，start_date为开始日期"
                },{
                  "DisplayName":null,
                  "Name":"INTIMESTAMP",
                  "FunctionScenarioTypes":[
                      1,
                      2,
                      3
                  ],
                  "FunctionCategories":[
                      2
                  ],
                  "Example":'INTIMESTAMP(end_date,start_date,"hh:mm-hh:mm","hh:mm-hh:mm",...)',
                  "Description":"动态配置的请假函数，精确到0.5小时。end_date为结束日期，start_date为开始日期,后面的参数为动态配置的上班时间  例如9:00-12:00,14:00-17:00,参数不限制个数，请假只会计算上班内的时间"
              },
              {
                  "DisplayName":null,
                  "Name":"FILTERWEEK",
                  "FunctionScenarioTypes":[
                      1,
                      2,
                      3
                  ],
                  "FunctionCategories":[
                      2
                  ],
                  "Example":'FILTERWEEK(end_date,start_date,mode,"hh:mm-hh:mm","hh:mm-hh:mm",...)',
                  "Description":"动态配置的请假函数,过滤周末和假期，精确到0.5小时。end_date为结束日期，start_date为开始日期,mode为返回类型:dd标识天数,hh标识小时,后面的参数为动态配置的上班时间  例如9:00-12:00,14:00-17:00,参数不限制个数，请假只会计算上班内的时间"
              }, 
                {
                    "DisplayName":null,
                    "Name":"HALF",
                    "FunctionScenarioTypes":[
                        1,
                        2,
                        3
                    ],
                    "FunctionCategories":[
                        2
                    ],
                    "Example":"HALF(end_date,start_date)",
                    "Description":"返回两个日期之间的小时差值，精确到0.5小时。end_date为结束日期，start_date为开始日期"
                },{"DisplayName":null,"Name":"NOW","FunctionScenarioTypes":[1,2,3,4,5,0,6],"FunctionCategories":[2],"Example":"NOW()","Description":"返回当前时间，精确到时分秒，格式为yyyy-MM-dd hh:mm:ss"},{"DisplayName":null,"Name":"YEAR","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"YEAR(date)","Description":"返回日期date的年份"},{"DisplayName":null,"Name":"MONTH","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"MONTH(date)","Description":"返回日期date月份，值为介于1到12之间的整数"},{"DisplayName":null,"Name":"DAY","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"DAY(date)","Description":"返回日期date的天数，值为介于1到31之间的整数"},{"DisplayName":null,"Name":"HOUR","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"HOUR(time)","Description":"返回日期time的小时部分"},{"DisplayName":null,"Name":"MINUTE","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"MINUTE(time)","Description":"返回日期time的分钟部分"},{"DisplayName":null,"Name":"QUARTER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"QUARTER(date)","Description":"返回日期date的所属季度，值为介于1到4的整数"},{"DisplayName":null,"Name":"TODAY","FunctionScenarioTypes":[1,2,3,4,5,0,6],"FunctionCategories":[2],"Example":"TODAY()","Description":"返回今天的日期，格式为:yyyy-MM-dd"},{"DisplayName":null,"Name":"WEEKDAY","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"WEEKDAY(date)","Description":"返回指定日期date为星期几"},{"DisplayName":null,"Name":"WEEKNUM","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"WEEKNUM(date)","Description":"返回一个数字，该数字代表指定日期date是一年中的第几周"}],"逻辑函数":[{"DisplayName":null,"Name":"IF","FunctionScenarioTypes":[1,2,3,4,5,0,6],"FunctionCategories":[3],"Example":"IF(A,B,C)","Description":"如果满足条件A，则返回B，否则返回C，支持多层嵌套IF函数"}],"其他函数":[{"DisplayName":null,"Name":"ISEMPTY","FunctionScenarioTypes":[1,2,3,5,0,4],"FunctionCategories":[7],"Example":"ISEMPTY(文本)","Description":"判断是否为空，为空则返回true，不为空则返回false，可用于判断具体值"}]}}}

        }
        else if(this.FormulaType=="BOOL"){
            res ={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"Functions":{"数学函数":[{"DisplayName":null,"Name":"ABS","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"ABS(number)","Description":"返回数字number的绝对值"},{"DisplayName":null,"Name":"COS","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"COS(A)","Description":"返回-1到1之间的余弦值，参数A为角度"},{"DisplayName":null,"Name":"INT","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"INT(number)","Description":"将数字number向下取整为最接近的整数"},{"DisplayName":null,"Name":"MAX","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MAX(v)","Description":"返回参数列表中的最大值，参数v是子表的某一个数字控件"},{"DisplayName":null,"Name":"MIN","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MIN(v)","Description":"返回参数列表中的最小值，参数v是子表的某一个数字控件"},{"DisplayName":null,"Name":"MOD","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MOD(number,divisor)","Description":"返回两数相除的余数，参数number是被除数，divisor是除数"},{"DisplayName":null,"Name":"PI","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"PI()","Description":"圆周率3.1415..."},{"DisplayName":null,"Name":"ROUND","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"ROUND(number,num_digits)","Description":"将数字四舍五入到指定的位数，number为要处理的数字，num_digits为指定小数位数"},{"DisplayName":null,"Name":"SIN","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"SIN(A)","Description":"返回-1到1之间的正弦值，参数A为角度"},{"DisplayName":null,"Name":"SQRT","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"SQRT(number)","Description":"开平方，参数number为非负数"},{"DisplayName":null,"Name":"AVG","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"AVG(v)","Description":"返回所有参数的平均值，参数v是子表的某一个数字控件"},{"DisplayName":null,"Name":"COUNT","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"COUNT(v)","Description":"统计参数列表中选项值的个数，参数v是子表的某一个控件"},{"DisplayName":null,"Name":"SUM","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"SUM(v)","Description":"统计输入参数的数值之和，参数v是子表的某一个数字控件"}],"文本函数":[{"DisplayName":null,"Name":"STARTSWITH","FunctionScenarioTypes":[1,2,3,5,0],"FunctionCategories":[1],"Example":"STARTSWITH(text,start_string)","Description":"判断文本字符串text是否以特定字符串start_string开始，是则返回true，否则返回false"},{"DisplayName":"CONTAINS","Name":"CONTAINS","FunctionScenarioTypes":[2,1,3,0,5],"FunctionCategories":[1,4],"Example":"CONTAINS(参数1,参数2)","Description":"判断参数1是否包含参数2的值，包含则返回true，不包含则返回false"},{"DisplayName":null,"Name":"LEFT","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"LEFT(text,[num_chars])","Description":"从文本字符串的第一个字符开始返回指定个数的字符，text为字符串，num_chars为指定个数，若不填则取默认值1"},{"DisplayName":null,"Name":"LEN","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"LEN(text)","Description":"返回文本字符串text中的字符个数"},{"DisplayName":null,"Name":"REPLACE","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"REPLACE(old_text,start_num,num_chars,new_text)","Description":"使用其他文本字符串并根据所指定的字符数替换某文本字符串中的部分文本，old_text为某文本字符串，start_num为要替换的起始位置编号，num_chars为要替换的字符个数，new_text为替换后的字符串"},{"DisplayName":null,"Name":"RIGHT","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"RIGHT(text,[num_chars])","Description":"从文本字符串的最后一个字符开始返回指定个数的字符，text为文本字符串，num_chars为指定个数，若不填则取默认值1"},{"DisplayName":null,"Name":"MID","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"MID(text,start_num,num_chars)","Description":"返回文本字符串中从指定位置开始的特定数目的字符，text为文本字符串，start_num为指定开始位置，num_chars为特定数目"},{"DisplayName":null,"Name":"LOWER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"LOWER(text)","Description":"将文本字符串text中所有大写字母转换为小写"},{"DisplayName":null,"Name":"UPPER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"UPPER(text)","Description":"将文本字符串text中所有小写字母转换为大写"},{"DisplayName":null,"Name":"TRIM","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"TRIM(text)","Description":"去掉文本字符串text中的首尾空格"}],"时间函数":[{"DisplayName":null,"Name":"NOW","FunctionScenarioTypes":[1,2,3,4,5,0,6],"FunctionCategories":[2],"Example":"NOW()","Description":"返回当前时间，精确到时分秒，格式为yyyy-MM-dd hh:mm:ss"},{"DisplayName":null,"Name":"YEAR","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"YEAR(date)","Description":"返回日期date的年份"},{"DisplayName":null,"Name":"MONTH","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"MONTH(date)","Description":"返回日期date月份，值为介于1到12之间的整数"},{"DisplayName":null,"Name":"DAY","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"DAY(date)","Description":"返回日期date的天数，值为介于1到31之间的整数"},{"DisplayName":null,"Name":"HOUR","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"HOUR(time)","Description":"返回日期time的小时部分"},{"DisplayName":null,"Name":"MINUTE","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"MINUTE(time)","Description":"返回日期time的分钟部分"},{"DisplayName":null,"Name":"QUARTER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"QUARTER(date)","Description":"返回日期date的所属季度，值为介于1到4的整数"},{"DisplayName":null,"Name":"TODAY","FunctionScenarioTypes":[1,2,3,4,5,0,6],"FunctionCategories":[2],"Example":"TODAY()","Description":"返回今天的日期，格式为:yyyy-MM-dd"},{"DisplayName":null,"Name":"WEEKDAY","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"WEEKDAY(date)","Description":"返回指定日期date为星期几"},{"DisplayName":null,"Name":"WEEKNUM","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"WEEKNUM(date)","Description":"返回一个数字，该数字代表指定日期date是一年中的第几周"}],"逻辑函数":[{"DisplayName":null,"Name":"IF","FunctionScenarioTypes":[1,2,3,4,5,0,6],"FunctionCategories":[3],"Example":"IF(A,B,C)","Description":"如果满足条件A，则返回B，否则返回C，支持多层嵌套IF函数"}],"组织机构函数":[
                {
                    "DisplayName":"ISCHILD",
                    "Name":"ISCHILD",
                    "FunctionScenarioTypes":[
                        2,
                        1,
                        3,
                        0,
                        5
                    ],
                    "FunctionCategories":[
                        1,
                        4
                    ],
                    "Example":"ISCHILD(参数1,参数2)",
                    "Description":"判断参数1是否是参数2的子部门，包含则返回true，不包含则返回false"
                }],"其他函数":[{"DisplayName":null,"Name":"ISEMPTY","FunctionScenarioTypes":[1,2,3,5,0,4],"FunctionCategories":[7],"Example":"ISEMPTY(文本)","Description":"判断是否为空，为空则返回true，不为空则返回false，可用于判断具体值"}]}}}

        } else if (this.FormulaType === 'AssociationFilter') {
          res = {"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"Functions":{"数学函数":[{"DisplayName":null,"Name":"ABS","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"ABS(number)","Description":"返回数字number的绝对值"},{"DisplayName":null,"Name":"COS","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"COS(A)","Description":"返回-1到1之间的余弦值，参数A为角度"},{"DisplayName":null,"Name":"MAX","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MAX(v)","Description":"返回参数列表中的最大值"},{"DisplayName":null,"Name":"MIN","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MIN(v)","Description":"返回参数列表中的最小值"},{"DisplayName":null,"Name":"MOD","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MOD(number,divisor)","Description":"返回两数相除的余数，参数number是被除数，divisor是除数"},{"DisplayName":null,"Name":"PI","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"PI()","Description":"圆周率3.1415..."},{"DisplayName":null,"Name":"ROUND","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"ROUND(number,num_digits)","Description":"将数字四舍五入到指定的位数，number为要处理的数字，num_digits为指定小数位数"},{"DisplayName":null,"Name":"SIN","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"SIN(A)","Description":"返回-1到1之间的正弦值，参数A为角度"},{"DisplayName":null,"Name":"SQRT","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"SQRT(number)","Description":"开平方，参数number为非负数"},{"DisplayName":null,"Name":"AVG","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"AVG(v)","Description":"返回所有参数的平均值"},{"DisplayName":null,"Name":"COUNT","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"COUNT(v)","Description":"统计参数列表中选项值的个数"},{"DisplayName":null,"Name":"SUM","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"SUM(v)","Description":"统计输入参数的数值之和"}],"文本函数":[{"DisplayName":"ISLIKE","Name":"ISLIKE","FunctionScenarioTypes":[2,1,3,0,5],"FunctionCategories":[1,4],"Example":"ISLIKE(参数1,参数2)","Description":"判断多选是否包含单选的值，参数1是多选控件，参数2是单选控件"},{"DisplayName":null,"Name":"LEFT","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"LEFT(text,[num_chars])","Description":"从文本字符串的第一个字符开始返回指定个数的字符，text为字符串，num_chars为指定个数，若不填则取默认值1"},{"DisplayName":null,"Name":"RIGHT","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"RIGHT(text,[num_chars])","Description":"从文本字符串的最后一个字符开始返回指定个数的字符，text为文本字符串，num_chars为指定个数，若不填则取默认值1"},{"DisplayName":null,"Name":"LOWER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"LOWER(text)","Description":"将文本字符串text中所有大写字母转换为小写"},{"DisplayName":null,"Name":"UPPER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"UPPER(text)","Description":"将文本字符串text中所有小写字母转换为大写"},{"DisplayName":null,"Name":"TRIM","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"TRIM(text)","Description":"去掉文本字符串text中的首尾空格"}],"时间函数":[{"DisplayName":null,"Name":"NOW","FunctionScenarioTypes":[1,2,3,4,5,0,6],"FunctionCategories":[2],"Example":"NOW()","Description":"返回当前时间，精确到时分秒，格式为yyyy-MM-dd hh:mm:ss"},{"DisplayName":null,"Name":"YEAR","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"YEAR(date)","Description":"返回日期date的年份"},{"DisplayName":null,"Name":"MONTH","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"MONTH(date)","Description":"返回日期date月份，值为介于1到12之间的整数"},{"DisplayName":null,"Name":"DAY","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"DAY(date)","Description":"返回日期date的天数，值为介于1到31之间的整数"},{"DisplayName":null,"Name":"HOUR","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"HOUR(time)","Description":"返回日期time的小时部分"},{"DisplayName":null,"Name":"MINUTE","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"MINUTE(time)","Description":"返回日期time的分钟部分"},{"DisplayName":null,"Name":"QUARTER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"QUARTER(date)","Description":"返回日期date的所属季度，值为介于1到4的整数"},{"DisplayName":null,"Name":"WEEKDAY","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"WEEKDAY(date)","Description":"返回指定日期date为星期几"}],"其他函数":[]}}};
        } else {
          res = {"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"Functions":{"数学函数":[{"DisplayName":null,"Name":"ABS","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"ABS(number)","Description":"返回数字number的绝对值"},{"DisplayName":null,"Name":"COS","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"COS(A)","Description":"返回-1到1之间的余弦值，参数A为角度"},{"DisplayName":null,"Name":"INT","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"INT(number)","Description":"将数字number向下取整为最接近的整数"},{"DisplayName":null,"Name":"MAX","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MAX(v)","Description":"返回参数列表中的最大值，参数v是子表的某一个数字控件"},{"DisplayName":null,"Name":"MIN","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MIN(v)","Description":"返回参数列表中的最小值，参数v是子表的某一个数字控件"},{"DisplayName":null,"Name":"MOD","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"MOD(number,divisor)","Description":"返回两数相除的余数，参数number是被除数，divisor是除数"},{"DisplayName":null,"Name":"PI","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"PI()","Description":"圆周率3.1415..."},{"DisplayName":null,"Name":"ROUND","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"ROUND(number,num_digits)","Description":"将数字四舍五入到指定的位数，number为要处理的数字，num_digits为指定小数位数"},{"DisplayName":null,"Name":"SIN","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"SIN(A)","Description":"返回-1到1之间的正弦值，参数A为角度"},{"DisplayName":null,"Name":"SQRT","FunctionScenarioTypes":[1,2,3,4,0,5],"FunctionCategories":[0],"Example":"SQRT(number)","Description":"开平方，参数number为非负数"},{"DisplayName":null,"Name":"AVG","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"AVG(v)","Description":"返回所有参数的平均值，参数v是子表的某一个数字控件"},{"DisplayName":null,"Name":"COUNT","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"COUNT(v)","Description":"统计参数列表中选项值的个数，参数v是子表的某一个控件"},{"DisplayName":null,"Name":"SUM","FunctionScenarioTypes":[1,2,3,4,0],"FunctionCategories":[0],"Example":"SUM(v)","Description":"统计输入参数的数值之和，参数v是子表的某一个数字控件"}],"文本函数":[{"DisplayName":null,"Name":"STARTSWITH","FunctionScenarioTypes":[1,2,3,5,0],"FunctionCategories":[1],"Example":"STARTSWITH(text,start_string)","Description":"判断文本字符串text是否以特定字符串start_string开始，是则返回true，否则返回false"},{"DisplayName":"CONTAINS","Name":"CONTAINS","FunctionScenarioTypes":[2,1,3,0,5],"FunctionCategories":[1,4],"Example":"CONTAINS(参数1,参数2)","Description":"判断参数1是否包含参数2的值，包含则返回true，不包含则返回false"},{"DisplayName":null,"Name":"LEFT","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"LEFT(text,[num_chars])","Description":"从文本字符串的第一个字符开始返回指定个数的字符，text为字符串，num_chars为指定个数，若不填则取默认值1"},{"DisplayName":null,"Name":"LEN","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"LEN(text)","Description":"返回文本字符串text中的字符个数"},{"DisplayName":null,"Name":"REPLACE","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"REPLACE(old_text,start_num,num_chars,new_text)","Description":"使用其他文本字符串并根据所指定的字符数替换某文本字符串中的部分文本，old_text为某文本字符串，start_num为要替换的起始位置编号，num_chars为要替换的字符个数，new_text为替换后的字符串"},{"DisplayName":null,"Name":"RIGHT","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"RIGHT(text,[num_chars])","Description":"从文本字符串的最后一个字符开始返回指定个数的字符，text为文本字符串，num_chars为指定个数，若不填则取默认值1"},{"DisplayName":null,"Name":"MID","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"MID(text,start_num,num_chars)","Description":"返回文本字符串中从指定位置开始的特定数目的字符，text为文本字符串，start_num为指定开始位置，num_chars为特定数目"},{"DisplayName":null,"Name":"LOWER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"LOWER(text)","Description":"将文本字符串text中所有大写字母转换为小写"},{"DisplayName":null,"Name":"UPPER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"UPPER(text)","Description":"将文本字符串text中所有小写字母转换为大写"},{"DisplayName":null,"Name":"TRIM","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[1],"Example":"TRIM(text)","Description":"去掉文本字符串text中的首尾空格"}],"时间函数":[{"DisplayName":null,"Name":"NOW","FunctionScenarioTypes":[1,2,3,4,5,0,6],"FunctionCategories":[2],"Example":"NOW()","Description":"返回当前时间，精确到时分秒，格式为yyyy-MM-dd hh:mm:ss"},{"DisplayName":null,"Name":"YEAR","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"YEAR(date)","Description":"返回日期date的年份"},{"DisplayName":null,"Name":"MONTH","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"MONTH(date)","Description":"返回日期date月份，值为介于1到12之间的整数"},{"DisplayName":null,"Name":"DAY","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"DAY(date)","Description":"返回日期date的天数，值为介于1到31之间的整数"},{"DisplayName":null,"Name":"HOUR","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"HOUR(time)","Description":"返回日期time的小时部分"},{"DisplayName":null,"Name":"MINUTE","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"MINUTE(time)","Description":"返回日期time的分钟部分"},{"DisplayName":null,"Name":"QUARTER","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"QUARTER(date)","Description":"返回日期date的所属季度，值为介于1到4的整数"},{"DisplayName":null,"Name":"TODAY","FunctionScenarioTypes":[1,2,3,4,5,0,6],"FunctionCategories":[2],"Example":"TODAY()","Description":"返回今天的日期，格式为:yyyy-MM-dd"},{"DisplayName":null,"Name":"WEEKDAY","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"WEEKDAY(date)","Description":"返回指定日期date为星期几"},{"DisplayName":null,"Name":"WEEKNUM","FunctionScenarioTypes":[1,2,3],"FunctionCategories":[2],"Example":"WEEKNUM(date)","Description":"返回一个数字，该数字代表指定日期date是一年中的第几周"}],"逻辑函数":[{"DisplayName":null,"Name":"IF","FunctionScenarioTypes":[1,2,3,4,5,0,6],"FunctionCategories":[3],"Example":"IF(A,B,C)","Description":"如果满足条件A，则返回B，否则返回C，支持多层嵌套IF函数"}],"其他函数":[{"DisplayName":null,"Name":"ISEMPTY","FunctionScenarioTypes":[1,2,3,5,0,4],"FunctionCategories":[7],"Example":"ISEMPTY(文本)","Description":"判断是否为空，为空则返回true，不为空则返回false，可用于判断具体值"}]}}};
        }
        setTimeout(()=>{
          let functions = res.ReturnData.Functions;
        for (let fun in functions) {
          let child = functions[fun],
            expend = false;

          if (fun == "逻辑函数") {
            let add1 = {
              Description: "多个用AND连接的表达式,当所有表达式均为true时，表达式返回true，否则返回False",
              DisplayName: null,
              Example: "表达式1 AND 表达式2",
              FunctionCategories: [],
              FunctionScenarioTypes: [],
              Name: "AND"
            },
              add2 = {
                Description: "多个用OR连接的表达式，只要有一个表达式为true，表达式返回true",
                DisplayName: null,
                Example: "表达式1 OR 表达式2",
                FunctionCategories: [],
                FunctionScenarioTypes: [],
                Name: "OR"
              };
            // child.push(add1);
            // child.push(add2);
          } else if (fun == "高级函数") {
            expend = true;
          }
          let f = {
            Name: fun,
            Expend: expend,
            children: child
          };
          this.functions.push(f);
        }
        },1000)



      }

      if (this.showFunctions) {
        this.showFunctions = !this.showFunctions;
        return false;
      }

      let left = this.Width.replace("px", "") - 1 + 11,
        height = 0;
      try {
        let parentEle = this.$parent.$el;
        height = parentEle.getElementsByClassName("ivu-modal-content")[0]
          .offsetHeight;
      } catch (e) {
        height = this.Height.replace("px", "");
      }
      this.functionStyles = {
        left: left + "px",
        height: height + "px"
      };

      let style = $("style.formula-fun-container-style"),
        h = this.FormulaType.toUpperCase() == FormulaTypeList.DATASOURCE ? 30 : 0,
        styleTop = this.$refs.showFunConBtn.offsetParent.offsetHeight + h + 30;
      if (style.length == 0) {
        let styleStr =
          "<style type='text/css' class='formula-fun-container-style'> .formula-modal .function-container:before{top:" +
          styleTop +
          "px !important} </style>";
        $("head").append(styleStr);
      } else {
        style[0].innerHTML =
          ".formula-modal .function-container:before{top:" +
          styleTop +
          "px !important}";
      }

      this.showFunctions = !this.showFunctions;
    },
    async initEditor() {
      //debugger
      let params = {
        ActionName: "LoadParameter",
        SchemaCode: this.SchemaCode,
        FormulaType: this.FormulaType,
        SchemaCodes: this.SchemaCodes,
        Formula: this.Formula
      };
      //let res = await getFormulaOnAction(params);
      
      setTimeout(()=>{
        let res = {"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"Parameter":{"WorkflowCode":null,"SchemaCode":null,"RuleCode":null,"FormulaGlobalString":null,"IntelligentFunctions":[{"FunctionName":"ABS","Description":"返回数字number的绝对值","Example":"ABS(number)"},{"FunctionName":"COS","Description":"返回-1到1之间的余弦值，参数A为角度","Example":"COS(A)"},{"FunctionName":"INT","Description":"将数字number向下取整为最接近的整数","Example":"INT(number)"},{"FunctionName":"MAX","Description":"返回参数列表中的最大值，参数v是子表的某一个数字控件","Example":"MAX(v)"},{"FunctionName":"MIN","Description":"返回参数列表中的最小值，参数v是子表的某一个数字控件","Example":"MIN(v)"},{"FunctionName":"MOD","Description":"返回两数相除的余数，参数number是被除数，divisor是除数","Example":"MOD(number,divisor)"},{"FunctionName":"PI","Description":"圆周率3.1415...","Example":"PI()"},{"FunctionName":"ROUND","Description":"将数字四舍五入到指定的位数，number为要处理的数字，num_digits为指定小数位数","Example":"ROUND(number,num_digits)"},{"FunctionName":"SIN","Description":"返回-1到1之间的正弦值，参数A为角度","Example":"SIN(A)"},{"FunctionName":"SQRT","Description":"开平方，参数number为非负数","Example":"SQRT(number)"},{"FunctionName":"AVG","Description":"返回所有参数的平均值，参数v是子表的某一个数字控件","Example":"AVG(v)"},{"FunctionName":"COUNT","Description":"统计参数列表中选项值的个数，参数v是子表的某一个控件","Example":"COUNT(v)"},{"FunctionName":"SUM","Description":"统计输入参数的数值之和，参数v是子表的某一个数字控件","Example":"SUM(v)"},{"FunctionName":"STARTSWITH","Description":"判断文本字符串text是否以特定字符串start_string开始，是则返回true，否则返回false","Example":"STARTSWITH(text,start_string)"},{"FunctionName":"CONTAINS","Description":"判断参数1是否包含参数2的值，包含则返回true，不包含则返回false","Example":"CONTAINS(参数1,参数2)"},{"FunctionName":"LEFT","Description":"从文本字符串的第一个字符开始返回指定个数的字符，text为字符串，num_chars为指定个数，若不填则取默认值1","Example":"LEFT(text,[num_chars])"},{"FunctionName":"LEN","Description":"返回文本字符串text中的字符个数","Example":"LEN(text)"},{"FunctionName":"REPLACE","Description":"使用其他文本字符串并根据所指定的字符数替换某文本字符串中的部分文本，old_text为某文本字符串，start_num为要替换的起始位置编号，num_chars为要替换的字符个数，new_text为替换后的字符串","Example":"REPLACE(old_text,start_num,num_chars,new_text)"},{"FunctionName":"RIGHT","Description":"从文本字符串的最后一个字符开始返回指定个数的字符，text为文本字符串，num_chars为指定个数，若不填则取默认值1","Example":"RIGHT(text,[num_chars])"},{"FunctionName":"SEARCH","Description":"返回文本字符串find_text在指定字符串within_text中出现的起始位置编号，未找到则返回0（忽略大小写），其中start_num为在within_text中第几个位置开始查找","Example":"SEARCH(find_text,within_text,start_num)"},{"FunctionName":"SUBSTITUTE","Description":"将文本字符串中的部分字符替换成新字符串，text为原文本，old_text为要替换的文本，new_text为新的文本，instance_num为替换次数","Example":"SUBSTITUTE(text,old_text,new_text,instance_num)"},{"FunctionName":"MID","Description":"返回文本字符串中从指定位置开始的特定数目的字符，text为文本字符串，start_num为指定开始位置，num_chars为特定数目","Example":"MID(text,start_num,num_chars)"},{"FunctionName":"LOWER","Description":"将文本字符串text中所有大写字母转换为小写","Example":"LOWER(text)"},{"FunctionName":"UPPER","Description":"将文本字符串text中所有小写字母转换为大写","Example":"UPPER(text)"},{"FunctionName":"TRIM","Description":"去掉文本字符串text中的首尾空格","Example":"TRIM(text)"},{"FunctionName":"YEARS","Description":"返回两个日期之间的年数差值，精确到两位小数。end_date为结束日期，start_date为开始日期","Example":"YEARS(end_date,start_date)"},{"FunctionName":"DAYS","Description":"返回两个日期之间的天数差值，精确到两位小数。end_date为结束日期，start_date为开始日期","Example":"DAYS(end_date,start_date)"},{"FunctionName":"HOURS","Description":"返回两个时间之间的小时数，精确到两位小数。end_time为结束时间，start_time为开始时间","Example":"HOURS(end_time,start_time)"},{"FunctionName":"MINUTES","Description":"返回两个时间之间的分钟数，精确到两位小数。end_time为结束时间，start_time为开始时间","Example":"MINUTES(end_time,start_time)"},{"FunctionName":"NOW","Description":"返回当前时间，精确到时分秒，格式为yyyy-MM-dd hh:mm:ss","Example":"NOW()"},{"FunctionName":"ADDDAY","Description":"将指定日期加/减指定天数，date为指定日期，days为指定天数，当为负数时在date上减去此天数","Example":"ADDDAY(date,days)"},{"FunctionName":"ADDMONTH","Description":"将指定日期加/减指定月数，date为指定日期，months为指定月数，当为负数时在此date上减去此月数","Example":"ADDMONTH(date,months)"},{"FunctionName":"ADDYEAR","Description":"将指定日期加/减指定年数，date为指定日期，years为指定年数，当为负数时在此date上减去此年数","Example":"ADDYEAR(date,years)"},{"FunctionName":"DATE","Description":"将年月日时分秒转换为日期","Example":"DATE(year,month,day,[hour,minute,second])"},{"FunctionName":"YEAR","Description":"返回日期date的年份","Example":"YEAR(date)"},{"FunctionName":"MONTH","Description":"返回日期date月份，值为介于1到12之间的整数","Example":"MONTH(date)"},{"FunctionName":"DAY","Description":"返回日期date的天数，值为介于1到31之间的整数","Example":"DAY(date)"},{"FunctionName":"HOUR","Description":"返回日期time的小时部分","Example":"HOUR(time)"},{"FunctionName":"MINUTE","Description":"返回日期time的分钟部分","Example":"MINUTE(time)"},{"FunctionName":"QUARTER","Description":"返回日期date的所属季度，值为介于1到4的整数","Example":"QUARTER(date)"},{"FunctionName":"TODAY","Description":"返回今天的日期，格式为:yyyy-MM-dd","Example":"TODAY()"},{"FunctionName":"WEEKDAY","Description":"返回指定日期date为星期几","Example":"WEEKDAY(date)"},{"FunctionName":"WEEKNUM","Description":"返回一个数字，该数字代表指定日期date是一年中的第几周","Example":"WEEKNUM(date)"},{"FunctionName":"IF","Description":"如果满足条件A，则返回B，否则返回C，支持多层嵌套IF函数","Example":"IF(A,B,C)"},{"FunctionName":"ISEMPTY","Description":"判断是否为空，为空则返回true，不为空则返回false，可用于判断具体值","Example":"ISEMPTY(文本)"},{"FunctionName":"GETADDRESS","Description":"将地址控件的值转换为文本字符串","Example":"GETADDRESS(地址控件)"}],"BizDataTypes":{"1":{"Name":"Bool","DisplayName":"逻辑型"},"5":{"Name":"DateTime","DisplayName":"日期"},"7":{"Name":"Double","DisplayName":"数值"},"9":{"Name":"Int","DisplayName":"整数"},"11":{"Name":"Long","DisplayName":"长整数"},"13":{"Name":"String","DisplayName":"长文本"},"14":{"Name":"ShortString","DisplayName":"短文本"},"20":{"Name":"ByteArray","DisplayName":"二进制流"},"23":{"Name":"Image","DisplayName":"Image"},"24":{"Name":"File","DisplayName":"File"},"25":{"Name":"TimeSpan","DisplayName":"时间段"},"26":{"Name":"Unit","DisplayName":"Unit"},"27":{"Name":"UnitArray","DisplayName":"UnitArray"},"30":{"Name":"Html","DisplayName":"HTML"},"32":{"Name":"Xml","DisplayName":"Xml"},"40":{"Name":"BizObject","DisplayName":"业务对象"},"41":{"Name":"BizObjectArray","DisplayName":"业务对象数组"},"42":{"Name":"BizStructure","DisplayName":"复合对象"},"43":{"Name":"BizStructureArray","DisplayName":"复合对象数组"},"50":{"Name":"Association","DisplayName":"Association"},"51":{"Name":"AssociationArray","DisplayName":"AssociationArray"},"55":{"Name":"Map","DisplayName":"Map"},"56":{"Name":"Address","DisplayName":"Address"},"57":{"Name":"Formula","DisplayName":"Formula"},"-1":{"Name":"Unspecified","DisplayName":"Unspecified"}},"Tree":{"ShowSystem":false,"ShowSystemEN":false,"ShowSubSheet":false,"ShowAssociation":false,"ShowField":false,"ShowOrganization":false,"ShowPost":false,"ShowRules":false,"ShowFunction":false,"ShowConst":false,"ShowSubSheetField":false,"ShowBizProperties":false,"ShowAssociationField":false,"ShowOnlyParticipant":false,"ShowSheetAssociation":false,"CurSheetCode":"","FormulaType":null,"AppCode":"","Display":"","Icon":"","Expand":true,"ExcludeFields":[],"CustomCodes":[]}}}};
          this.IntelligentFunctions = res.ReturnData.Parameter.IntelligentFunctions;
          this.BizDataTypes = res.ReturnData.Parameter.BizDataTypes;
          FormulaEditorLoaded(this.IntelligentFunctions);

		  var param ={};
          if(this.SchemaCode.indexOf("&")<0){
            param.appId=this.SchemaCode;
          }
          else{
            param.appId =this.SchemaCode.split("&")[0]
          }
          param.formula= params.Formula?params.Formula:this.FormulaText;
          if(this.FormulaType!='BUSINESS'){
             param.formula =  param.formula.trim().replace(/\s/g,"");
          }
          if(this.FormulaType=="Flow"){
            param.source="op"
          }
          HTTP.parseFormulaText(param)
                .then(data => {
                      if (data && data.code == 0) {
                        let formulaText = data.ReturnData.FormulaText;
                            FormulaSettings.ResetConfig({
                            Controlkey: this.Controlkey,
                            Formula: this.Formula,
                            FormulaType: this.FormulaType,
                            FormulaField: this.FormulaField,
                            FormulaParameter: this.FormulaParameter,
                            SchemaCode: this.SchemaCode
                        });
                        if (this.Formula) {
                          setTimeout(() => {
                            FormulaSettings.ResetAll(
                              false,
                              formulaText,
                              "",
                              true,
                              true,
                              this.Formula,
                              this.FormulaType
                            );
                          }, 500);
                        } else {
                        }

                      if (this.FormulaType.toUpperCase() == "DATASOURCE") {
                        this.formulaResult = this.TitleText;
                        $("#txt_title").show();
                      }

                    }
                    else{
                        this.$Message.error("异常"+data.msg);
                    }
            })
            .catch(err => {
                this.$Message.error(err);
                
            }).finally(()=>{

            })       
          },800)
     
    },
    searchUnits() {
      if (this.unitSearchKey) {
        this._searchUnits();
      } else {
        this.userSearchData = [];
      }
    },
    async _searchUnits() {
      let userRes = await SearchUsers(0, 8, this.unitSearchKey);
      let unitRes = await SearchOrgs(this.unitSearchKey, 0, 8);
      if (userRes.Successful) {
        this.userSearchData = userRes.ReturnData.aaData;
      }
      if (unitRes.Successful) {
        this.unitSearchData = unitRes.ReturnData.UnitItems;
      }
    },
    toggleShow(fun) {
      fun.Expend = !fun.Expend;
    },
    showFunctionHelper(fun) {
      this.showFormulaDescription = false;
      this.functionHelper.Description = fun.Description;
      this.functionHelper.Example = fun.Example;
    },
    getUrlParamsConfig(config) {
      let cf = {
        TreeId: config.treeId,
        Command: config.command,
        ShowUnitSelectionRange: config.showUnitSelectionRange,
        ShowSystem: config.showSystem,
        ShowSystemEN: config.showSystemEN,
        ShowSubSheet: config.showSubSheet,
        ShowAssociation: config.showAssociation,
        ShowField: config.showField,
        ShowOrganization: config.showOrganization,
        ShowPost: config.showPost,
        ShowRules: config.showRules,
        ShowFunctions: config.showFunction,
        ShowConst: config.showConst,
        ShowBizProperties: config.showBizProperties, //暂定需要根据根节点设置来判断是否显示
        ShowSubSheetField: config.showSubSheetField,
        ShowAssociationField: config.showAssociationField,
        ShowOnlyParticipant: config.showOnlyParticipant,
        ShowSheetAssociation: config.showSheetAssociation,
        ShowWorkflow: config.showWorkflow,
        ShowWorkflowSystemField: config.showWorkflowSystemField,
        ExcludeCodes: config.excludeCodes.join(","),
        ExcludeFields: config.excludeFields.join(","),
        CurSheetCode: config.curSheetCode,
        CustomeCodes: config.customCodes,
        ShowCheckBox: config.showCheckbox,
        CanCheckTypes: config.canCheckTypes.join(","),
        SelectTypes: config.canSelectType, // 0 流程包（应用） 1 应用菜单 2 子表 3 字段 4 关联对象 5 公司 6 部门 7 用户
        FormulaType: config.formulaType
      };
      this.urlParamsConfig = cf;
    },
    clickSearchUnit(node, type) {
      let id = "",
        name = "",
        NodeType = "";
      if (type == "unit") {
        name = node.DisplayName;
        id = node.UnitID;
        NodeType = "OrganizationUnit";
      } else {
        name = node.Name;
        id = node.ObjectId;
        NodeType = "User";
      }
      let treeNode = {
        id: id,
        name: name,
        NodeType: NodeType
      };
      this.chooseLeftTree(treeNode);
    },
    chooseFunction(fun) {
      if (fun.Name == "AND" || fun.Name == "OR") {
        FormulaSettings.InsertConstVariables(fun.Name, false);
      } else {
        FormulaSettings.InsertFunction(fun.Name);
      }
    },
    chooseSheet(data) {
      //选择目标表单
      this.targetSheetName = data.name;
      this.showSearchSheet = false;
      let node = [
        {
          Code: data.Code,
          NodeType: data.NodeType,
          ParentCode: data.ParentCode,
          checked: data.checked,
          children: data.children,
          expand: true,
          iconSkin: data.iconSkin,
          id: data.id,
          isParent: data.isParent,
          level: data.level,
          name: data.name,
          nocheck: data.nocheck,
          pId: data.pId,
          selected: data.selected,
          parentData: data.parentData,
          title: data.title
        }
      ];
      this.targetSheetTreeData = node || [];
    },
    chooseLeftTree(data) {
      chooseLeftTreeNode(data, this.SchemaCode);
    },
    addTargetSheet(expand) {
      if (!expand) return false;
      this.showSearchSheet = !this.showSearchSheet;
      let modalContent = this.$parent.$refs.modalContent;
      if (modalContent != undefined) {
        let left = modalContent.offsetLeft + 7,
          top = modalContent.offsetTop + 95;
        this.searchSheetStyles = {
          left: left + "px",
          top: top + "px",
          height: "300px"
        };
      }
    },
  },
  mounted() {
    // delete key 
    document.addEventListener('keydown', this.DeleteKeyUp);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.DeleteKeyUp);
  },
  watch: {
    curSheetFileds(curVal, oldVal) {
      FormulaSettings.ResetConfig({
        Controlkey: this.Controlkey,
        Formula: this.Formula,
        FormulaType: this.FormulaType,
        FormulaField: this.FormulaField,
        FormulaParameter: this.FormulaParameter,
        SchemaCode: this.SchemaCode,
        CurSheetFileds: curVal
      });
      //this.initEditor();
    },
    functionSearchKey(curVal, oldVal) {
      let key = curVal.toLowerCase(),
        hasResult = false;
      this.noSearchFun = false;
      if (curVal) {
        for (let k in this.functions) {
          if (this.noSearchFun) {
            return false;
          }
          let funs = this.functions[k].children;
          if (funs) {
            for (let i = 0, len = funs.length; i < len; i++) {
              let fun = funs[i];
              if (fun.Name.toLowerCase().indexOf(key) > -1) {
                hasResult = true;
                return false;
              }
            }
          }
        }
        this.noSearchFun = !hasResult;
      }
    }
  }
};
</script>

<style>
.formula-modal {
  float: left;
  padding: 8px;

  li {
    display: block;
  }

  // 编辑器
  .editor-container {
    height: 400px;

    .apptree {
      position: relative;
      width: 200px;
      height: 400px;
      margin-right: 9px;
      background: #FFFFFF;
      border: 1px solid #E1E1E1;
      border-radius: 2px;
      overflow: hidden;
      user-select: none;

      .root-title {
        height: 30px;
        line-height: 30px;
        padding: 0 8px;
        border-bottom: 1px solid #E1E1E1;
        cursor: pointer;

        .add-btn-sheet {
          color: #2d7fff;
          float: right;
          font-size: 12px;

          &.disabled {
            color: #c7c7c7;
          }
        }
      }
    }

    .formula-wrap {
      width: 70%;
      height: 400px;
      border: 1px solid #e1e1e1;
      border-radius: 2px;

      .editor-description {
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        background: #e8f4fe;
      }

      .formula-editor {
        height: 80%;
        width: 100%;
        padding: 5px;
        overflow: auto;
        border: none;
        outline: none;

        &:empty::before {
          content: attr(placeholder);
          color: #999999;
        }
      }

      .div-intelligent-containe {
        position: absolute;
        width: 200px;
        display: none;
        height: auto;
        background-color: #f6f6f6;
        cursor: pointer;
        max-height: 400px;
        overflow: auto;
        z-index: 1;
      }

      .btn-function {
        position: absolute;
        bottom: 8px;
        right: 8px;
        width: 75px;
        height: 23px;
        line-height: 21px;
        padding-left: 0;
        border: 1px solid #2d7fff;
        border-radius: 3px;
        font-size: 10px;
        cursor: pointer;

        .icon-fx {
          display: inline-block;
          width: 100%;
          font-size: 12px;
          line-height: 20px;
          padding-left: 4px;
        }

        .icon-fx:before {
          font-size: 10px;
          color: #2d7fff;
          margin-right: 4px;
        }
      }

      .formula-description {
        width: 470px;
        font-size: 12px;
        color: #797979;

        &>div {
          margin: 3px;
        }

        .example, .description, .validate {
          font-size: 12px;
        }

        .validate {
          color: #e97763;
        }

        li {
          position: relative;
          height: 20px;
          line-height: 20px;
          margin: 0 0 0 20px;

          span.circle {
            font-size: 12px;
            color: #797979;

            &:before {
              content: '';
              position: absolute;
              width: 4px;
              height: 4px;
              top: 8px;
              left: -12px;
              background: #989898;
              border-radius: 100%;
            }
          }
        }
      }
    }

    .submit-err-msg {
      position: relative;
      height: 60px;
      line-height: 60px;
      text-align: center;

      .input-wrap input {
        height: 32px;
        width: 100%;
        padding: 5px;
      }

      .input-wrap span {
        position: absolute;
        top: 45px;
        left: 0;
        height: 20px;
        line-height: 20px;
      }
    }

    #txt_title {
      display: none;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 5px;
      border: none;
      outline: none;
      border-bottom: 1px solid #f1f1f1;
      border-radius: 0;
    }
  }

  .function-container {
    position: absolute;
    top: 0;
    height: 400px;
    width: 200px;
    background: #FFFFFF;
    border-radius: 2px;

    &:before {
      content: '';
      position: absolute;
      display: inline-block;
      width: 0;
      height: 0;
      // bottom: 188px;
      top: 0;
      left: -14px;
      border: 7px solid #561616;
      border-color: transparent #fff transparent transparent;
    }

    .header {
      height: 46px;
      line-height: 25px;
      padding: 10px 5px;
      border-bottom: 1px solid #EDEDED;
      font-size: 16px;
      color: #080808;

      .close {
        float: right;
        font-size: 21px;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        opacity: 0.2;
      }

      i {
        width: 17px;
        height: 17px;
        font-size: 16px;
        margin-right: 5px;

        &:before {
          color: #656565;
        }
      }
    }

    .search {
      padding: 5px;

      i {
        line-height: 22px;

        &:before {
          color: #CDCCCC;
        }
      }

    }

    .body {
      position: relative;
      top: 0;
      background-color: #fff;
      height: 425px;
      margin: 0 5px;
      border: 1px solid #E1E1E1;
      border-radius: 2px;

      .function-header {
        width: 100%;
        text-align: left;
      }

      span, li.leaf {
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
      }

      span .function-title {
        margin-left: 3px;
      }

      li.leaf {
        cursor: pointer;
        padding-left: 35px;

        &:hover {
          background-color: #e8f4fe;
        }
      }

      .search-result {
        display: block !important;

        li {
          padding-left: 20px;
        }
      }

      span .function-title, a.function-name {
        font-size: 14px;
        color: #080808;
        letter-spacing: 0;
      }

      a:focus, a:hover {
        text-decoration: none !important;
      }
    }
  }

  .sheet-container {
    position: absolute;
    top: 29px;
    width: 100%;
    height: 379px;
    background: #FFFFFF;
    border-radius: 2px;
    border: 1px solid #ccc;

    &:before {
      content: '';
      position: absolute;
      display: inline-block;
      width: 0;
      height: 0;
      top: -11px;
      right: 13px;
      border: 5px solid #561616;
      border-color: transparent transparent #a2a2a2;
    }

    &:after {
      content: '';
      position: absolute;
      display: inline-block;
      width: 0;
      height: 0;
      top: -10px;
      right: 13px;
      border: 5px solid #561616;
      border-color: transparent transparent #fff;
    }

    .ivu-input-wrapper {
      padding: 5px;

      input {
        height: 22px;
      }
    }

    .root-tree {
      height: 370px;
      border-bottom: 0;
      overflow: auto;
    }
  }

  .sheet-search, .unit-search {
    i {
      line-height: 28px;

      &:before {
        color: #cdcccc;
      }
    }

    .ivu-input-wrapper input {
      width: 96%;
      height: 22px;
      margin-top: 0;
      border: 1px solid #D7DADE;
      border-radius: 1px;
      margin: 4px;

      &:focus {
        box-shadow: none;
        border: 1px solid #2d7fff;
      }
    }

    .search-result {
      border-bottom: 1px solid #e1e1e1;

      ul {
        margin: 0;
      }

      li {
        height: 30px;
        line-height: 30px;
        padding-left: 15px;
        cursor: pointer;

        &:hover {
          background-color: #e8f4fe;
        }

        i:before {
          font-size: 16px;
          color: #2d7fff;
        }

        .search-item {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 200px;
          display: block;

          .icon.unit i:before {
            font-size: 12px;
          }

          .departmentname {
            margin-left: 4px;
            font-size: 12px;
            color: #3F3F3F;
            letter-spacing: 0;
            line-height: 19px;
          }
        }
      }
    }
  }

  .nodata {
    margin-top: 50%;
    font-size: 12px;
    color: #848484;
    text-align: center;
  }

  .ivu-icon-arrow-right-b {
    color: #797979;
  }

  .ivu-tree-arrow-open .ivu-icon-arrow-right-b {
    color: #2d7fff;
  }

  .ivu-input-wrapper {
    i {
      line-height: 28px;

      &:before {
        color: #cdcccc;
      }
    }

    input {
      width: 98%;
      height: 22px;
      margin-top: 0;
      border: 1px solid #d7dade;
      border-radius: 1px;
      margin: 2px;
    }
  }
}
</style>



// WEBPACK FOOTER //
// src/components/console/formula/formula.vue
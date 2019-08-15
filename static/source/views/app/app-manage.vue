<!--模板部分-->
<template>
<div class="app-manage">
  <div class="app-manage-card">
    <!--标题  -->
    <p class="app-manage-title">
      <Icon type="pinpoint"></Icon>
      {{$router.currentRoute.params.moduleName}}
    </p>
    <Row class="app-manage-container">
      <!--菜单部分  -->
      <Col span="6">
      <div>
        <div class="app-manage-control" v-show="!dragable">
          <div class="control-item" @click="addGroup()">
            <Icon type="android-add" color="#2d7fff"></Icon>
            新建分组
          </div>
          <div class="control-item" @click="sortAppAndGroup()">
            <Icon type="arrow-move" color="#2d7fff"></Icon>
            调整顺序
          </div>
        </div>
        <div class="app-manage-control" v-show="dragable">
          <div class="control-item" @click="sortConfirm()">
            完成
          </div>
          <div class="control-item" @click="sortCancel()">
            取消
          </div>
        </div>
        <div class="app-manage-menu" :class="{'dragable': dragable}">
          <!-- <Menu active-name="1" >
              <draggable>
                  <MenuItem v-for="app in appInstData" name="1" @click.native="appManage(app)">
                      <Icon type="document-text"></Icon>
                      {{app.appName}}
                      <Icon style="float:right;font-size:20px!important" color="red" type="trash-a" @click.native.stop.prevent="delApp(app.id)"></Icon>
                      <Icon style="float:right;font-size:20px!important" type="clipboard"  @click.native.stop.prevent="modModule(app.id,app.appName)"></Icon>
                  </MenuItem>
              </draggable>
          </Menu> -->
          <Menu active-name="1" width="280px">
            <draggable v-model="dragData" :options="dragOptions">
              <div v-for="(item, $index) in formatListApp" :key="$index">
                <Submenu v-if="item.type === 'group'" :name="$index">
                  <template slot="title">
                    <Icon class="button-del" color="red" type="trash-a" @click.native.stop.prevent="delGroup(item.moduleId)"></Icon>
                    <Icon class="button-modify" type="clipboard"  @click.native.stop.prevent="modifyGroup(item.moduleId,item.moduleName)"></Icon>
                    <Icon class="button-move" type="arrow-move"></Icon>
                    <span class="app-name-block">
                      <Icon type="folder"></Icon>
                      <span :title="item.moduleName" class="app-name-text">{{item.moduleName}}</span>
                    </span>
                  </template>
                  <draggable v-model="item.children" :options="dragOptions">
                    <div v-for="(app, $aIndex) in item.children" :key="app.appId">
                      <MenuItem v-if="app.type === 'app'" :name="$index-$aIndex" @click.native="appManage(app)">
                        <Icon class="button-del" color="red" type="trash-a" @click.native.stop.prevent="delApp(app.appId)"></Icon>
                        <Icon class="button-modify" type="clipboard" @click.native.stop.prevent="modModule(app.appId,app.appName,item.moduleId)"></Icon>
                        <Icon class="button-move" type="arrow-move"></Icon>
                        <span class="app-name-block">
                          <Icon type="document-text"></Icon>
                          <span :title="app.appName" class="app-name-text-of-groug">{{app.appName}}</span>
                        </span>
                      </MenuItem>
                      <MenuItem v-if="app.type === 'report'" :name="$index-$aIndex" @click.native="reportManage(app)">
                        <Icon class="button-del" color="red" type="trash-a" @click.native.stop.prevent="delReport(app.reportId)"></Icon>
                        <Icon class="button-modify" type="clipboard" @click.native.stop.prevent="modifyReport(app.reportId,app.reportName,app.moduleId)"></Icon>
                        <Icon class="button-move" type="arrow-move"></Icon>
                        <span class="app-name-block">
                          <Icon type="pie-graph"></Icon>
                          <span :title="app.reportName" class="app-name-text-of-groug">{{app.reportName}}</span>
                        </span>
                      </MenuItem>
                      <MenuItem v-if="app.type === 'flow'" :name="$index-$aIndex" @click.native="flowManage(app)">
                        <Icon class="button-del" color="red" type="trash-a" @click.native.stop.prevent="delFlow(app.reportId)"></Icon>
                        <Icon class="button-modify" type="clipboard" @click.native.stop.prevent="modifyFlow(app.reportId,app.reportName,app.moduleId)"></Icon>
                        <Icon class="button-move" type="arrow-move"></Icon>
                        <span class="app-name-block">
                          <Icon type="arrow-graph-up-right"></Icon>
                          <span :title="app.appName" class="app-name-text-of-groug">{{app.appName}}</span>
                        </span>
                      </MenuItem>
                    </div>
                  </draggable>
                </Submenu>
                <MenuItem v-if="item.type === 'app'" :name="$index" @click.native="appManage(item)">
                  <Icon class="button-del" color="red" type="trash-a" @click.native.stop.prevent="delApp(item.appId)"></Icon>
                  <Icon class="button-modify" type="clipboard" @click.native.stop.prevent="modModule(item.appId,item.appName,item.groupId)"></Icon>
                  <Icon class="button-move" type="arrow-move"></Icon>
                  <span class="app-name-block">
                    <Icon type="document-text"></Icon>
                    <span :title="item.appName" class="app-name-text">{{item.appName}}</span>
                  </span>
                </MenuItem>
                <MenuItem v-if="item.type === 'report'" :name="$index" @click.native="reportManage(item)">
                  <Icon class="button-del" color="red" type="trash-a" @click.native.stop.prevent="delReport(item.reportId)"></Icon>
                  <Icon class="button-modify" type="clipboard" @click.native.stop.prevent="modifyReport(item.reportId,item.reportName,item.moduelId)"></Icon>
                  <Icon class="button-move" type="arrow-move"></Icon>
                  <span class="app-name-block">
                    <Icon type="pie-graph"></Icon>
                    <span :title="item.reportName" class="app-name-text">{{item.reportName}}</span>
                  </span>
                </MenuItem>
                <MenuItem v-if="item.type === 'flow'" :name="$index" @click.native="flowManage(item)">
                  <Icon class="button-del" color="red" type="trash-a" @click.native.stop.prevent="delFlow(item.appId)"></Icon>
                  <Icon class="button-modify" type="clipboard" @click.native.stop.prevent="modifyFlow(item.appId,item.appName,item.moduelId)"></Icon>
                  <Icon class="button-move" type="arrow-move"></Icon>
                  <span class="app-name-block">
                   <Icon type="arrow-graph-up-right"></Icon>
                    <span :title="item.appName" class="app-name-text">{{item.appName}}</span>
                  </span>
                </MenuItem>
              </div>
            </draggable>
          </Menu>
        </div>
      </div>
      </Col>
      <Col span="18">
      <div>
        <Row>
          <Col span="7">
          <Row class="our-team">
            <div class="pic">
              <img src="../home/images/8.jpg">
            </div>
            <div class="team-content">
              <h3 class="title"><Button type='text' @click="newModule()"><span style="font: bold 20px/30px arial">新建表单</span></Button></h3>
              <Span class="post">表单用来搜集数据,<br/>并将数据应用于流程</Span>
            </div>
          </Row>
          </Col>
          <Col span="7">
          <Row class="our-team">
            <div class="pic">
              <img src="../home/images/6.jpg">
            </div>
            <div class="team-content">
              <h3 class="title"><Button type='text' @click="copyModule()"><span style="font: bold 20px/30px arial">复制表单</span></Button></h3>
              <Span class="post">复制已有的表单,简化设计过程</Span>
            </div>
          </Row>
          </Col>
          <Col span="7">
          <Row class="our-team">
            <div class="pic">
              <img src="../home/images/7.jpg">
            </div>
            <div class="team-content">
              <h3 class="title"><Button type='text' @click="newReport()"><span style="font: bold 20px/30px arial">新建报表</span></Button></h3>
              <Span class="post">报表可用于数据汇总,展示等</Span>
            </div>
          </Row>
          </Col>
        </Row>
        <div style="margin-top:20px" v-show="false">
        <Row>
          <Col span="7">
          <Row class="our-team">
            <div class="pic">
              <img src="../home/images/8.jpg">
            </div>
            <div class="team-content">
              <h3 class="title"><Button type='text' @click="newFlow()"><span style="font: bold 20px/30px arial">新建流程</span></Button></h3>
              <Span class="post">使用用户自己的表单数据,<br/>并将数据应用于流程</Span>
            </div>
          </Row>
          </Col>
        </Row>
         </div>
      </div>
      </Col>
    </Row>
   
  </div>
  <Modal v-model="addAppModal">
    <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
      <span>新建表单</span>
    </p>
    <Form ref="formValidate" :model="app" :label-width="80">
      <FormItem label="名称">
        <Input v-model="app.appName"></Input>
      </FormItem>
      <FormItem label="所属分组">
        <Select v-model="app.groupId">
          <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button :loading="newLoading" type="primary" @click="addSubmit">确定</Button>
      <!-- <Button type="primary" @click="addSubmit">创建空白表单</Button> -->
      <!-- <Button type="primary" @click="createAppFromExcel">从Excel创建表单</Button> -->
    </div>
  </Modal>

  <NewAppExcelModal
    ref="newAppExcelModal"
    :appName="app.appName"
    :groupId="app.groupId"
    :moduleId="app.moduleId"
  ></NewAppExcelModal>

  <Modal v-model="modAppFlag">
    <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
      <span>修改表单</span>
    </p>
    <Form ref="formValidate" :model="app" :label-width="80">
      <FormItem label="名称">
        <Input v-model="app.appName"></Input>
      </FormItem>
      <FormItem>
        <RadioGroup v-model="modifyType">
          <Radio label="0"><span class="modify-group-radio-label">修改分组</span></Radio>
          <Radio label="1"><span class="modify-app-radio-label">修改应用</span></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem v-if="modifyType === '0'" label="所属分组">
        <Select v-model="app.groupId">
          <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem v-if="modifyType === '1'" label="应用目录">
        <Select v-model="modifyModule">
          <Option
            v-for="item in allModules"
            :value="item.id"
            :key="item.id"
          >{{ item.moduleName }}</Option>
        </Select>
      </FormItem>
      <FormItem label="导入按钮">
        <RadioGroup v-model="needsImport">
          <Radio label="0"><span class="modify-group-radio-label">需要</span></Radio>
          <Radio label="1"><span class="modify-app-radio-label">不需要</span></Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button :loading="newLoading" type="primary" @click="handleSubmit()">确定</Button>
      <!-- <Button type="ghost"  @click="closeAddApp()" style="margin-left: 8px">取消</Button> -->
    </div>
  </Modal>
  <Modal v-model="showDelModal" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>删除</span>
    </p>
    <div style="text-align:center">
      <p>删除会清除所有的表单，流程，用户数据。</p>
      <p>确定删除?</p>
    </div>
    <div slot="footer">
      <Button type="error" :loading="modal_loading" @click="del">删除</Button>
      <Button type="text" @click="cancel">取消</Button>
    </div>
  </Modal>
  <Modal v-model="copyModal">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
      <span>复制表单</span>
    </p>
    <Form ref="formValidate" :model="app" :label-width="80">
      <FormItem label="名称">
        <Input v-model="app.appName"></Input>
      </FormItem>
      <FormItem label="所属分组">
        <Select v-model="app.groupId">
          <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="复制表单">
        <Poptip v-model="copyModalVisible" placement="bottom-start" width="400" trigger="click">
          <span v-show="appData.length==0" style="cursor:pointer">请选择</span>
          <Tag v-for="item in appData" :key="item.title" closable @on-close="handleClose2">{{ item.title }}</Tag>
          <div class="copy-app-content" slot="content">
            <app-tree v-model="selectedApp" v-on:input="changeApp"></app-tree>
          </div>
        </Poptip>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="copySubmit()">确定</Button>
      <!-- <Button type="ghost"  @click="closeAddApp()" style="margin-left: 8px">取消</Button> -->
    </div>
  </Modal>
  <Modal v-model="addGroupModal">
    <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
      <span>新建分组</span>
    </p>
    <Form ref="formValidate" :model="group" :label-width="80">
      <FormItem label="名称">
        <Input v-model="group.groupName"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="confirmAddGroup()">确定</Button>
      <!-- <Button type="ghost"  @click="closeAddApp()" style="margin-left: 8px">取消</Button> -->
    </div>
  </Modal>
  <Modal v-model="modifyGroupModal">
    <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
      <span>修改分组</span>
    </p>
    <Form ref="formValidate" :model="group" :label-width="80">
      <FormItem label="名称">
        <Input v-model="group.groupName"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="confirmModifyGroup()">确定</Button>
    </div>
  </Modal>
  <Modal v-model="delGroupModal" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>删除分组</span>
    </p>
    <div style="text-align:center">
      <p>分组下的所有表单、报表将同时被删除。</p>
      <p>确定删除?</p>
    </div>
    <div slot="footer">
      <Button type="error" :loading="modal_loading" @click="confirmDelGroup()">删除</Button>
      <Button type="text" @click="cancelDelGroup()">取消</Button>
    </div>
  </Modal>
  <Modal v-model="addFlowModal">
    <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
      <span>新建流程</span>
    </p>
    <Form ref="formValidate" :model="report" :label-width="80">
      <FormItem label="名称">
        <Input v-model="flow.flowName"></Input>
      </FormItem>
      <FormItem label="所属分组">
        <Select v-model="flow.groupId">
          <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button :loading="newLoading" type="primary" @click="addFlow()">确定</Button>
      <!-- <Button type="ghost"  @click="closeAddApp()" style="margin-left: 8px">取消</Button> -->
    </div>
  </Modal>
    <Modal v-model="addReportModal">
    <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
      <span>新建报表</span>
    </p>
    <Form ref="formValidate" :model="report" :label-width="80">
      <FormItem label="名称">
        <Input v-model="report.reportName"></Input>
      </FormItem>
      <FormItem label="所属分组">
        <Select v-model="report.moduleId">
          <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button :loading="newLoading" type="primary" @click="addReport()">确定</Button>
      <!-- <Button type="ghost"  @click="closeAddApp()" style="margin-left: 8px">取消</Button> -->
    </div>
  </Modal>
  
  <Modal v-model="modifyReportModal">
    <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
      <span>修改报表</span>
    </p>
    <Form ref="formValidate" :model="report" :label-width="80">
      <FormItem label="名称">
        <Input v-model="report.reportName"></Input>
      </FormItem>
      <FormItem>
        <RadioGroup v-model="modifyType">
          <Radio label="0"><span class="modify-group-radio-label">修改分组</span></Radio>
          <Radio label="1"><span class="modify-app-radio-label">修改应用</span></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem v-if="modifyType === '0'" label="所属分组">
        <Select v-model="report.moduleId">
          <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem v-if="modifyType === '1'" label="应用目录">
        <Select v-model="modifyModule">
          <Option
            v-for="item in allModules"
            :value="item.id"
            :key="item.id"
          >{{ item.moduleName }}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button :loading="newLoading" type="primary" @click="confirmModifyReport()">确定</Button>
    </div>
  </Modal>

  <Modal v-model="modifyFlowModal">
    <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
      <span>修改流程</span>
    </p>
    <Form ref="formValidate" :model="flow" :label-width="80">
      <FormItem label="名称">
        <Input v-model="flow.flowName"></Input>
      </FormItem>
      <FormItem>
        <RadioGroup v-model="modifyType">
          <Radio label="0"><span class="modify-group-radio-label">修改分组</span></Radio>
          <Radio label="1"><span class="modify-app-radio-label">修改应用</span></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem v-if="modifyType === '0'" label="所属分组">
        <Select v-model="flow.moduleId">
          <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem v-if="modifyType === '1'" label="应用目录">
        <Select v-model="modifyModule">
          <Option
            v-for="item in allModules"
            :value="item.id"
            :key="item.id"
          >{{ item.moduleName }}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button :loading="newLoading" type="primary" @click="confirmModifyReport()">确定</Button>
    </div>
  </Modal>
  <Modal v-model="delReportModal" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>删除</span>
    </p>
    <div style="text-align:center">
      <p>删除会清除报表的所有数据。</p>
      <p>确定删除?</p>
    </div>
    <div slot="footer">
      <Button type="error" :loading="modal_loading" @click="confirmDelReport()">删除</Button>
      <Button type="text" @click="cancelDelReport()">取消</Button>
    </div>
  </Modal>
   <Modal v-model="delFlowModal" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>删除</span>
    </p>
    <div style="text-align:center">
      <p>删除会清除流程。</p>
      <p>确定删除?</p>
    </div>
    <div slot="footer">
      <Button type="error" :loading="modal_loading" @click="confirmDelFlow()">删除</Button>
      <Button type="text" @click="cancelDelFlow()">取消</Button>
    </div>
  </Modal>
</div>
</template>

<!--js部分-->
<script>
import draggable from "vuedraggable";
import HTTP from '../../api/app-apply.js';
import HTTP_LIST from '@/api/listview';
import API from '../../api/report.js'
import groupHttp from '@/api/group.js';
import { filter } from './data/filter.js';
import { appRunData, appRunColumns } from './data/appRunDao.js';
import { appInstanceData, appInstanceColumns } from './data/appInstDao.js';
import addApp from './designFlowModal/addNewAppInstance.vue';
import router from '../../router/router.js';
import ICol from 'iview/src/components/grid/col';
import log from '../flow-manager/designFlowModal/appInfoLog.vue';
import { dataFormat } from '../../util/assist.js';
import { getUserRoleAndPermission } from '../../api/role.js';
import appTree from '../flow-manager/components/apptree';
import NewAppExcelModal from './components/NewAppExcelModal.vue';

export default {
  components: {
    ICol,
    appTree,
    draggable,
    NewAppExcelModal
  },
  name: 'reportManage',
  data() {
    return {
      copyModalVisible: false,
      modifyType: '0',
      needsImport: '1',
      allModules: [],
      modifyModule: '',
      self: this,
      theme1: {
        type: String,
        default: 'light',
        color: 'gray'
      },
      manager: false,
      modAppFlag: false,
      showDelModal: false,
      currentParam: {},
      list: [],
      spinShow: false,
      selectedApp: [],
      app: {
        appId: null,
        appName: null,
        groupId: this.$router.currentRoute.params.moduleId,
        moduleId: this.$router.currentRoute.params.moduleId
      },
      csvData: appRunData,
      appInstData: appInstanceData,
      selectMinRow: 1,
      selectMinCol: 1,
      minRow: 1,
      appData: [],
      minCol: 1,
      fontSize: 16,
      getLoading: false,
      newLoading: false,
      modifyFlowModal:false,
      delId: null,
      modal_loading: false,
      addAppModal: false,
      addReportModal: false,
      addFlowModal:false,
      copyModal: false,
      formatListApp: [],
      dragable: false,
      addGroupModal: false,
      modifyGroupModal: false,
      delGroupModal: false,
      delFlowModal:false,
      listAppCache: [],
      group: {
        groupId: null,
        groupName: null
      }, // 分组
      modifyReportModal: false,
      delReportModal: false,
      report: {
        reportId: null,
        reportName: null,
        moduleId: this.$router.currentRoute.params.moduleId
      }, // 报表
       flow: {
        flowId: null,
        flowName: null,
        groupId:null,
        moduleId: this.$router.currentRoute.params.moduleId
      } // 报表
    };
  },
  mounted() {
    // this.getAppList(this.$router.currentRoute.params.moduleId);
    this.getAppList2(this.$router.currentRoute.params.moduleId);
    // this.getAppInstanceList();
    this.getAllModules();
  },
  computed: {
    // 计算属性的 getter
    colNum: function() {
      // `this` 指向 vm 实例
      return this.columnsCsv.length;
    },
    rowNum: function() {
      // `this` 指向 vm 实例
      return this.csvData.length;
    },
    selectMaxCol: function() {
      return this.columnsCsv.length;
    },
    selectMaxRow: function() {
      // `this` 指向 vm 实例
      return this.csvData.length;
    },
    maxCol: function() {
      return this.columnsCsv.length;
    },
    maxRow: function() {
      // `this` 指向 vm 实例
      return this.csvData.length;
    },
    selectedAppName: function() {
      let appName = []
      this.selectedApp.forEach(app => {
        appName.push(app.title)
      })
      return appName.join(', ')
    },
    // 拖拽
    dragData: {
      get() {
        return this.formatListApp;
      },
      set(val) {
        this.formatListApp = val;
      }
    },
    dragOptions() {
      return {
        animation: 0,
        module: "description",
        disabled: !this.dragable,
        ghostClass: "ghost"
      };
    },
    groupList() {
      let result = [{
        value: this.$router.currentRoute.params.moduleId,
        label: '无分组'
      }];
      this.formatListApp.forEach(item => {
        if (item.type === 'group') {
          result.push({
            value: item.moduleId,
            label: item.moduleName
          })
        }
      });
      return result;
    }
  },
  methods: {
    getStrLength(str) {
      var byteLen = 0
      if(str){
        for(var i=0; i<str.length; i++){
          if(str.charCodeAt(i)>255){
            byteLen += 2;
          } else {
            byteLen++;
          }
        }
      }
      return byteLen;
    },
    cancel() {
      this.showDelModal = false;
    },
    // getAppList(moduleId) {
    //     this.getLoading=true;
    //     HTTP.appList(moduleId)
    //         .then(res => {
    //             this.appInstData=res.page.result;

    //             //this.getAppInstanceList(this.appInstData[0].id);
    //         })
    //         .catch(err => {
    //             this.$Message.error('This is an error')
    //         }).finally(()=>{
    //         this.getLoading=false;
    //     })
    // },
    getAppList2(moduleId) {
      this.getLoading = true;
      HTTP.appList2(moduleId)
        .then(res => {
          if (res.code == 0) {
            this.formatListApp = res.page.result
          }
        })
        .catch(err => {
          this.$Message.error({
            content: "失败,请联系管理员",
            duration: 5
          })
        }).finally(() => {
          this.getLoading = false;
        })
    },
    getAllModules() {
      HTTP.getAllModule()
        .then(res => {
          this.allModules = res.page.result;
        });
    },
    handleClose2(event, name) {
      this.appData = [];
    },
    
    // 校验表单
    validateApp() {
      return new Promise((resolve, reject) => {
        if (this.app.appName && this.app.appName.trim() !== '') {
          return resolve();
        } else {
          return reject('名称不能为空');
        }
      });
    },
    // 校验分组
    validateGroup() {
      return new Promise((resolve, reject) => {
        if (this.group.groupName && this.group.groupName.trim() !== '') {
          return resolve();
        } else {
          return reject('名称不能为空');
        }
      });
    },
    // 校验表单
    validateReport() {
      return new Promise((resolve, reject) => {
        if (this.report.reportName && this.report.reportName.trim() !== '') {
          return resolve();
        } else {
          return reject('名称不能为空');
        }
      });
    },
    //检验流程
    validateFlow() {
      return new Promise((resolve, reject) => {
        if (this.flow.flowName && this.flow.flowName.trim() !== '') {
          return resolve();
        } else {
          return reject('名称不能为空');
        }
      });
    },
    changeApp(apps) {
      this.appData = apps;
      if (apps.length !== 0) this.copyModalVisible = false;
    },
    async copySubmit() {
      //   this.app.moduleId=this.$router.currentRoute.params.moduleId;

      if (!this.app.appName) {
        this.$Message.error("请填写名称");
        return;
      }
      if (this.getStrLength(this.app.appName) > 50) {
        this.$Message.error("名称长度不能超过50个字节");
        return;
      }
      if (this.appData.length == 0) {
        this.$Message.error("请选择复制表单");
        return;
      }
      this.app.copyAppId = this.appData[0].id
      this.$Message.success("正在保存,时间慢请稍等");
      this.spinShow = true;
      this.validateApp()
        .then(() => {
          return HTTP.copyApp(this.app)
        })
        .then(async res => {
          if (res.code == 0) {
            // this.app = {
            //   moduldId: null,
            //   appName: null
            // };
            // this.getAppList(this.$router.currentRoute.params.moduleId);
            this.getAppList2(this.$router.currentRoute.params.moduleId);
            let permissionsRes = await getUserRoleAndPermission();
            this.$store.dispatch('user/setPermissionsObj', permissionsRes.permissions);

          } else {
            this.$Message.error({
              content: res.msg,
              duration: 5
            })
          }

          //this.getAppInstanceList(this.appInstData[0].id);
        })
        .catch(err => {
          this.$Message.error({
            content: err,
            duration: 5
          })
        }).finally(() => {
          this.spinShow = false;
          this.copyModal = false;
        })
    },
    async addSubmit() {
      if (this.getStrLength(this.app.appName) > 50) {
        this.$Message.error("名称长度不能超过50个字节");
        return;
      }
      this.app.moduleId = this.$router.currentRoute.params.moduleId;
      this.newLoading = true;
      this.validateApp()
        .then(() => {
          return HTTP.addApp({
            appName: this.app.appName,
            groupId: this.app.groupId,
            moduleId: this.app.moduleId
          })
        })
        .then(async res => {
          if (res.code == 0) {
            this.$Message.success("添加成功");

            // this.getAppList(this.$router.currentRoute.params.moduleId);
            this.getAppList2(this.$router.currentRoute.params.moduleId);
            let permissionsRes = await getUserRoleAndPermission();
            this.$store.dispatch('user/setPermissionsObj', permissionsRes.permissions);
          } else {
            this.$Message.error({
              content: "失败,请联系管理员",
              duration: 5
            })
          }

          //this.getAppInstanceList(this.appInstData[0].id);
        })
        .catch(err => {
          this.$Message.error({
            content: err,
            duration: 5
          })
        }).finally(() => {
          this.addAppModal = false;
          // this.app = {
          //   moduldId: null,
          //   appName: null
          // };
          this.getLoading = false;
          this.newLoading = false;
        })
    },
    async addFlow() {
      if (this.getStrLength(this.report.reportName) > 50) {
        this.$Message.error("名称长度不能超过50个字节");
        return;
      }
      this.app.moduleId = this.$router.currentRoute.params.moduleId;
      this.newLoading = true;
      this.validateFlow()
        .then(() => {
          return HTTP.createAloneFlow({
            name: this.flow.flowName,
            moduleId: this.flow.moduleId,
            groupId:this.flow.groupId
          })
        })
        .then(async res => {
          if (res.code == 0) {
            this.$Message.success("添加成功");

            // this.getAppList(this.$router.currentRoute.params.moduleId);
            this.getAppList2(this.$router.currentRoute.params.moduleId);
            let permissionsRes = await getUserRoleAndPermission();
            this.$store.dispatch('user/setPermissionsObj', permissionsRes.permissions);
          } else {
            this.$Message.error({
              content: "失败,请联系管理员",
              duration: 5
            })
          }

          //this.getAppInstanceList(this.appInstData[0].id);
        })
        .catch(err => {
          this.$Message.error({
            content: err,
            duration: 5
          })
        }).finally(() => {
          this.addFlowModal = false;
          this.flow.flowId = null;
          this.flow.flowName = null;
          this.getLoading = false;
          this.newLoading = false;
        })
    },
    async addReport() {
      if (this.getStrLength(this.flow.flowName) > 50) {
        this.$Message.error("名称长度不能超过50个字节");
        return;
      }
      this.app.moduleId = this.$router.currentRoute.params.moduleId;
      this.newLoading = true;
      this.validateReport()
        .then(() => {
          return API.createReport({
            name: this.report.reportName,
            moduleId: this.report.moduleId
          })
        })
        .then(async res => {
          if (res.code == 0) {
            this.$Message.success("添加成功");

            // this.getAppList(this.$router.currentRoute.params.moduleId);
            this.getAppList2(this.$router.currentRoute.params.moduleId);
            let permissionsRes = await getUserRoleAndPermission();
            this.$store.dispatch('user/setPermissionsObj', permissionsRes.permissions);
          } else {
            this.$Message.error({
              content: "失败,请联系管理员",
              duration: 5
            })
          }

          //this.getAppInstanceList(this.appInstData[0].id);
        })
        .catch(err => {
          this.$Message.error({
            content: err,
            duration: 5
          })
        }).finally(() => {
          this.addReportModal = false;
          this.report.reportId = null;
          this.report.reportName = null;
          this.getLoading = false;
          this.newLoading = false;
        })
    },
    async handleSubmit() {
      if (this.getStrLength(this.app.appName) > 50) {
        this.$Message.error("名称长度不能超过50个字节");
        return;
      }
      let moduleIdParam = this.app.groupId;
      if (this.modifyType === '1') {
        if (!this.modifyModule) {
          this.$Message.error("请选择应用");
          return;
        }
        // this.app.moduleId = this.modifyModule;
        moduleIdParam = this.modifyModule;
      }
      let params = {
        appId: this.app.appId,
        appName: this.app.appName,
        moduleId: moduleIdParam,
        importData: this.needsImport === '0' ? true : false
      }
      this.newLoading = true;
      this.validateApp()
        .then(async () => {
          let result = await HTTP.modApp(params);
          if (result.code == 0) {
            this.$Message.success("修改成功");
            this.getAppList2(this.$router.currentRoute.params.moduleId);
            this.modAppFlag = false;
            this.app.appName = null;
            this.app.id = null
          } else {
            this.$Message.error("修改失败");
          }
        })
        .catch(err => {
          this.$Message.error({
            content: err,
            duration: 2
          })
        })
        .finally(() => {
          this.newLoading = false;
          console.log(this.app);
        });
    },
    newModule(id, a) {
      this.addAppModal = true;
      this.app.appName = '';
      // this.app.moduleName=a;
      // this.app.id=id;
      // this.hidePoptips();

    },
    newFlow(id,a){
      
      this.addFlowModal = true;
      this.app.appName = '';
      // this.$router.push({
      //   name: 'design-page',
      // });

    },
    copyModule(id, a) {
      this.appData = []
      this.copyModal = true;
      this.app.appName = '';

      // this.app.moduleName=a;
      // this.app.id=id;
      // this.hidePoptips();

    },

    modModule(appId, appName, groupId) {
      HTTP_LIST.getListSetting({ appId }).then(res => {
        if (res.Code === '0') {
          this.needsImport = res.Data.Import === 'true' ? '0' : '1';
        }
      });
      this.modifyModule = '';
      this.modifyType = '0';
      this.needsImport = '1';
      this.modAppFlag = true;
      this.app.appName = appName;
      this.app.appId = appId;
      if (groupId) {
        this.app.groupId = groupId;
      }
      // this.hidePoptips();
      console.log(groupId);

    },
    closeAddApp() {
      this.modAppFlag = false;
    },
    delApp(id) {
      this.showDelModal = true;
      this.delId = id;
    },
    del() {
      this.modal_loading = true;
      HTTP.deleteApp(this.delId).then(res => {
        if (res.code == 0) {
          this.$Message.success('删除成功');
          this.showDelModal = false;
          this.getAppList2(this.$router.currentRoute.params.moduleId);
        } else {
          this.$Message.error('删除失败');
        }
      }).catch(err => {
        this.$Message.error({
          content: "失败,请联系管理员",
          duration: 5
        })
      }).finally(() => {
        this.modal_loading = false;
        this.showDelModal = false;
      })
    },
    appManage({
      appId,
      moduleId,
      modelId,
      appName
    }) {
      if (this.dragable) return;
      let app = {
        appId,
        moduleId:this.$router.currentRoute.params.moduleId,
        modelId,
        moduleName: this.$router.currentRoute.params.moduleName,
        appName
      };
      this.$store.commit('updateCurrentApp', app);
       sessionStorage.setItem("currentAppType", "");
      sessionStorage.setItem("currentApp", JSON.stringify(app));
      this.$router.push({
        name: 'design-sheet',
        query: app
      });

    },
    // 调整表单和分组顺序
    sortAppAndGroup() {
      this.dragable = !this.dragable;
      this.listAppCache = JSON.parse(JSON.stringify(this.formatListApp));
    },
    // 新建分组
    addGroup() {
      this.addGroupModal = true;
    },
    // 修改分组
    modifyGroup(groupId, groupName) {
      this.modifyGroupModal = true;
      this.group = {
        groupId,
        groupName
      }
    },
    // 删除分组
    delGroup(groupId) {
      this.delGroupModal = true;
      this.group.groupId = groupId;
    },
    // 确认调整顺序
    sortConfirm() {
      groupHttp.changeSort({
        groupAppList: JSON.stringify(this.formatListApp)
      }).then(res => {
        if (res.code == 0) {
          this.$Message.success('调整分组成功');
          this.getAppList2(this.$router.currentRoute.params.moduleId);
        } else {
          this.$Message.error('调整分组失败');
        }
      }).catch(err => {
        this.$Message.error({
          content: err,
          duration: 5
        })
      }).finally(() => {
        this.dragable = !this.dragable;
      })
      console.log(this.formatListApp)
    },
    // 取消调整顺序
    sortCancel() {
      this.dragable = !this.dragable;
      this.formatListApp = this.listAppCache;
    },
    // 确认新增分组
    confirmAddGroup() {
      this.validateGroup().then(() => {
        return groupHttp.addGroup({
          groupName: this.group.groupName,
          moduleId: this.$router.currentRoute.params.moduleId
        })
      }).then(res => {
        if (res.code == 0) {
          this.$Message.success('新增分组成功');
          this.getAppList2(this.$router.currentRoute.params.moduleId);
        } else {
          this.$Message.error('新增分组失败');
        }
      }).catch(err => {
        this.$Message.error({
          content: err,
          duration: 5
        })
      }).finally(() => {
        this.addGroupModal = false;
        this.group.groupName = null;
        this.group.groupId = null;
      })
    },
    // 确认修改分组
    confirmModifyGroup() {
      this.validateGroup().then(() => {
        return groupHttp.modifyGroup({
          groupId: this.group.groupId,
          groupName: this.group.groupName
        })
      }).then(res => {
        if (res.code == 0) {
          this.$Message.success("修改成功");
          this.getAppList2(this.$router.currentRoute.params.moduleId);
        } else {
          this.$Message.error("修改失败");
        }
      }).catch(err => {
        this.$Message.error({
          content: err,
          duration: 5
        })
      }).finally(() => {
        this.modifyGroupModal = false;
        this.group.groupName = null;
        this.group.groupId = null;
      })
    },
    // 确认删除分组
    confirmDelGroup() {
      groupHttp.delGroup({
        groupId: this.group.groupId
      }).then(res => {
        if (res.code == 0) {
          this.$Message.success('删除成功');
          this.getAppList2(this.$router.currentRoute.params.moduleId);
        } else {
          this.$Message.error('删除失败');
        }
      }).catch(err => {
        this.$Message.error({
          content: "失败,请联系管理员",
          duration: 5
        })
      }).finally(() => {
        this.delGroupModal = false;
        this.group.groupId = null;
      })
    },
    // 取消删除分组
    cancelDelGroup() {
      this.delGroupModal = false;
    },
    // 新建报表
    newReport() {
      this.addReportModal = true;
      this.report.reportName = '';
    },
    // 修改报表
    modifyReport(reportId, reportName, moduleId) {
      this.modifyModule = '';
      this.modifyType = '0';
      this.modifyReportModal = true;
      this.report.reportId = reportId;
      this.report.reportName = reportName;
      if (moduleId) {
        this.report.moduleId = moduleId;
      }
    },
    modifyFlow(flowId, flowName, moduleId) {
      this.modifyModule = '';
      this.modifyType = '0';
      this.modifyReportModal = true;
      this.flow.flowId = flowId;
      this.flow.flowName = flowName;
      if (moduleId) {
        this.flow.moduleId = moduleId;
      }
    },
    // 删除报表
    delReport(reportId) {
      this.delReportModal = true;
      this.report.reportId = reportId;
    },
    // 删除流程
    delFlow(flowId) {
      this.delFlowModal = true;
      this.flow.flowId = flowId;
    },
    
    // 确认修改报表
    confirmModifyReport() {
      if (this.getStrLength(this.report.reportName) > 50) {
        this.$Message.error("名称长度不能超过50个字节");
        return;
      }
      if (this.modifyType === '1') {
        if (!this.modifyModule) {
          this.$Message.error("请选择应用");
          return;
        }
        this.report.moduleId = this.modifyModule;
      }
      this.newLoading = true;
      this.validateReport().then(() => {
        return API.updateReport({
          id: this.report.reportId,
          name: this.report.reportName,
          moduleId: this.report.moduleId
        })
      }).then(res => {
        if (res.code == 0) {
          this.$Message.success("修改成功");
          this.getAppList2(this.$router.currentRoute.params.moduleId);
          this.modifyReportModal = false;
          this.report.reportName = null;
          this.report.reportId = null;
        } else {
          this.$Message.error("修改失败");
        }
      }).catch(err => {
        this.$Message.error({
          content: err,
          duration: 2
        })
      }).finally(() => {
        this.newLoading = false;
      });
    },
    // 确认删除报表
    confirmDelReport() {
      this.modal_loading = true;
      API.delReport(this.report.reportId).then(res => {
        if (res.code == 0) {
          this.$Message.success('删除成功');
          this.getAppList2(this.$router.currentRoute.params.moduleId);
        } else {
          this.$Message.error('删除失败');
        }
      }).catch(err => {
        this.$Message.error({
          content: "失败,请联系管理员",
          duration: 5
        })
      }).finally(() => {
        this.modal_loading = false;
        this.delReportModal = false;
        this.report.reportId = null;
      })
    },
    // 删除流程
    cancelDelFlow() {
      this.delFlowModal = false;
      this.flow.flowId = null;
    },
        // 确认删除流程
    confirmDelFlow() {
      this.modal_loading = true;
      HTTP.delFlowApp({appId:this.flow.flowId}).then(res => {
        if (res.code == 0) {
          this.$Message.success('删除成功');
          this.getAppList2(this.$router.currentRoute.params.moduleId);
        } else {
          this.$Message.error('删除失败');
        }
      }).catch(err => {
        this.$Message.error({
          content: "失败,请联系管理员",
          duration: 5
        })
      }).finally(() => {
        this.modal_loading = false;
        this.delFlowModal = false;
        this.flow.flowId = null;
      })
    },
    // 取消删除报表
    cancelDelReport() {
      this.delReportModal = false;
      this.report.reportId = null;
    },
    // 跳转报表管理页面,同时更新currentApp
    reportManage({
      moduleId,
      modelId,
      appName,
      reportId,
      reportName
    }) {
 
      let app = {
        appId:reportId,
        moduleId:this.$router.currentRoute.params.moduleId,
        modelId,
        moduleName: this.$router.currentRoute.params.moduleName,
        appName:reportName
        // backRoutemoduleId:this.$router.currentRoute.params.moduleId,
        // backRouteModelName:this.$router.currentRoute.params.moduleName
      };
    
      this.$store.commit('updateCurrentApp', app);
      sessionStorage.setItem("currentApp", JSON.stringify(app));
      sessionStorage.setItem("currentAppType", "");
      this.$router.push({
        name: 'report',
        query: {
          id: reportId,
          name: reportName
        }
      });
    },
        // 跳转管理页面,同时更新currentApp
    flowManage({
      moduleId,
      modelId,
      appName,
      appId,
      type
    }) {
 
      let app = {
        appId:appId,
        moduleId:this.$router.currentRoute.params.moduleId,
        modelId,
        moduleName: this.$router.currentRoute.params.moduleName,
        appName:appName,
        type:type
      };
    
      this.$store.commit('updateCurrentApp', app);
      sessionStorage.setItem("currentApp", JSON.stringify(app));
      sessionStorage.setItem("currentAppType", 'op');
      this.$router.push({
        name: 'design-sheet',
        query: app
      });
    },
    createAppFromExcel() {
      this.app.moduleId = this.$router.currentRoute.params.moduleId;
      this.validateApp()
        .then(() => {
          this.addAppModal = false;
          this.$refs.newAppExcelModal.show();
        })
        .catch(err => {
          this.$Message.error({
            content: err,
            duration: 5
          });
        });
    }
  }
};

</script>

<!--样式部分-->
<style lang="less" scoped>
@import "components/common.less";
@import "components/table.less";
</style>
<style lang="less">
.app-manage {
  /* position: absolute; */
  overflow: auto;
  left: 0;
  right: 0;
  top: 60;
  bottom: 0;
}

.app-manage-card {
  height: 100%;

  .app-manage-container {
    padding: 16px;
  }

  .app-manage-title {
    border-bottom: 1px solid #e9eaec;
    padding: 14px 16px;
    font-weight: 700;
  }
}

.app-manage-control {
  display: flex;
  width: 280px;
  background-color: #f8f8f8; //   border-right: 1px solid #dddee1;
  .control-item {
    flex-grow: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    cursor: pointer;
    &:first-child {
      border-right: 1px solid #dddee1;
    }
    &:hover {
      color: #2d7fff;
    }
  }
}

.app-manage-menu {
  &.dragable {
    .ivu-menu-item,
    .ivu-menu-submenu-title {
      cursor: move;
      &:hover {
        .button-del,
        .button-modify {
          display: none;
        }
      }
      .button-move {
        display: block;
      }
    }
  }
  .ivu-icon-ios-arrow-down {
    display: none;
  }
  [class|="button"] {
    display: none;
    float: right;
    font-size: 20px;
  }
  .ivu-menu-item,
  .ivu-menu-submenu-title {
    padding-right: 14px;
    &:hover {
      .button-del,
      .button-modify {
        display: block;
      }
    }
    &.ivu-menu-item-active:not(.ivu-menu-submenu) {
      color: #495060 !important;
      border-right-color: transparent;
    }
    i {
      margin-right: 6px;
    }
  }
  .ivu-menu-light:after {
    display: none;
    z-index: 1000;
  }
}
</style>

<style lang="less" scoped>
.demo {
  padding: 2em 0;
}

.our-team {
  padding: 30px 0 40px;
  background: #fbfcff;
  text-align: center;
  overflow: hidden;
  position: relative;
  left: 26%;
  width: 180px;
  height: 250px;
}

.our-team .pic {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-bottom: 40px;
  z-index: 1;
  position: center;
}

.our-team .pic:before {
  content: "";
  width: 100%;
  height: 0;
  border-radius: 50%;
  background: #ee4266;
  position: center;
  bottom: 135%;
  right: 0;
  left: 0;
  opacity: 0.2;
  transform: scale(3);
  transition: all 0.3s linear 0s;
}

.our-team:hover .pic:before {
  height: 100%;
}

.our-team .pic:after {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #ee4266;
  position: center;
  top: 0;
  left: 0;
  z-index: -1;
}

.our-team .pic img {
  width: 100%;
  height: auto;
  border-radius: 50%;
  transform: scale(1);
  transition: all 0.9s ease 0s;
}

.our-team:hover .pic img {
  box-shadow: 0 0 0 14px #f7f5ec;
  transform: scale(0.7);
}

.our-team .team-content {
  margin-bottom: 30px;
}

.our-team .title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin-bottom: 5px;
}

.our-team .post {
  display: block;
  text-transform: capitalize;
}

.our-team .social {
  width: 50%;
  padding: 0;
  margin: 0;
  height: 30px;
  background: #eb1768;
  position: absolute;
  bottom: -100px;
  left: 0;
  transition: all 0.5s ease 0s;
}

.our-team:hover .social {
  bottom: 0;
}

.our-team .social li {
  display: inline-block;
}

.our-team .social li a {
  display: block;
  padding: 10px;
  font-size: 17px;
  color: #fff;
  transition: all 0.3s ease 0s;
}

.our-team .social li a:hover {
  color: #eb1768;
  background: #f7f5ec;
}

@media only screen and (max-width: 100px) {
  .our-team {
    margin-bottom: 30px;
  }
}

.copy-app-content {
  height: 90vh;
}

.app-name-block {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
}

.modify-group-radio-label {
  margin-left: 5px;
  margin-right: 20px;
}

.modify-app-radio-label {
  margin-left: 5px;
}
</style>

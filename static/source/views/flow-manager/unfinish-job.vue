<style lang="less" scoped>
@import "../../styles/common.less";
@import "components/table.less";
// @import "../role/role.css";
</style>

<style scoped>
.VerticalTimeLine {
  background-color: #fff;
  position: relative;
  font-family: "Microsoft YaHei";
}

.VerticalTimeLine.noline:before {
  display: none;
}

.VerticalTimeLine .nodata {
}

.nodata {
  position: relative;
  /* top: -65px; */
  text-align: center;
}

.nodata-title {
  display: block;
  margin-top: 25px;
  /* margin-left: 25px; */
  padding-right: 20px;
}

.VerticalTimeLine .nodata .nodata-title {
  display: block;
  margin-top: 25px;
  margin-left: 25px;
}

.VerticalTimeLine .success {
  color: rgba(41, 188, 114, 0.9);
}

.VerticalTimeLine .warn {
  color: rgba(251, 163, 35, 0.9);
}

.VerticalTimeLine .failed {
  color: rgba(244, 99, 80, 0.9);
}

.VerticalTimeLine .my {
  background: #38adff;
}

.VerticalTimeLine .wait {
  background: #f88376;
}

.VerticalTimeLine .finished {
  background: #00ce98;
}

.VerticalTimeLine:before {
  content: "";
  position: absolute;
  top: 10px;
  bottom: 0;
  width: 1px;
  background: #ebeaea;
  border-radius: 1px;
  left: 150px;
}

.point {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 6px solid #fff;
  border-radius: 13px;
  background: #38adff;
  left: 150px;
  margin-left: -9px;
}

.bigPoint {
  position: absolute;
  height: 16px;
  width: 16px;
  border: 3px solid #37abfd;
  border-radius: 50%;
  background: #fff;
  left: 150px;
  margin-left: -7px;
  outline: 5px solid #fff;
}

.VerticalTimeLine .itemContainer {
  padding: 0;
}

.VerticalTimeLine .item {
  list-style-type: none;
  padding-left: 6px;
  clear: both;
}

.VerticalTimeLine .item.date {
  height: 50px;
}

.VerticalTimeLine .item.date .left {
  text-align: left;
  top: 0;
  margin-left: 20px;
  margin-top: -10px;
}

.VerticalTimeLine .item.date .right {
  border: none;
  box-shadow: none;
  padding: 0;
}

.VerticalTimeLine .item .left,
.VerticalTimeLine .item .middle,
.VerticalTimeLine .item .right {
  float: left;
}

.VerticalTimeLine .item .left {
  width: 120px;
  text-align: right;
  padding-top: 0;
  margin-top: 0;
}

.VerticalTimeLine .item .right {
  margin-left: 170px;
  padding: 16.5px 0 18px 60px;
  border: 1px solid #fff;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(146, 156, 164, 0.34);
  border-radius: 4px;
  width: 698px;
  top: -24px;
}

.VerticalTimeLine .item .right:hover {
  cursor: pointer;
  border: 1px solid #dfdfdf;
  box-shadow: 0 1px 2px 0 rgba(146, 156, 164, 0.34);
}

.VerticalTimeLine .item .right .title {
  height: 20px;
  font-size: 14px;
  color: #333;
  margin-bottom: 8.5px;
  overflow: hidden;
  word-wrap: break-word;
}

.VerticalTimeLine .item .right .content {
  font-size: 14px;
  color: #666;
  letter-spacing: 0;
  line-height: 22px;
  overflow: hidden;
  word-wrap: break-word;
}

.VerticalTimeLine .item .right .arrow:before {
  content: "";
  position: absolute;
  left: -18px;
  top: 6px;
  box-shadow: 0 1px 3px 0 rgba(146, 156, 164, 0.34);
  transform: scaleY(0.8) rotate(45deg);
  height: 12px;
  width: 12px;
  left: -6px;
  background-color: #fff;
}

.VerticalTimeLine .item .right .arrow:after {
  content: "";
  position: absolute;
  height: 14px;
  width: 14px;
  top: 6px;
  left: 0;
  background-color: #fff;
}

.VerticalTimeLine .item .middle {
  margin-top: 0;
}

.VerticalTimeLine .item .left .day {
  float: left;
  width: 40px;
  height: 45px;
  font-size: 34px;
  color: #333;
  letter-spacing: 0;
  margin-left: 6px;
}

.VerticalTimeLine .item .left .time {
  font-size: 12px;
  color: #666;
  letter-spacing: 0;
}

.VerticalTimeLine .item .left .weekMonth {
  float: left;
  margin: 8px;
}

.VerticalTimeLine .item .left .weekMonth .weekday {
  text-align: left;
  font-size: 12px;
  color: #333;
  letter-spacing: 0;
}

.VerticalTimeLine .item .left .weekMonth .month {
  font-size: 10px;
  color: #333;
  letter-spacing: 0;
}

.VerticalTimeLine .item .right .avatar {
  height: 32px;
  width: 32px;
  line-height: 32px;
  text-align: center;
  overflow: hidden;
  border-radius: 16px;
  color: #fff;
  background: #17c295;
  font-size: 11px;
  position: absolute;
  left: 20px;
  top: 16px;
}

.VerticalTimeLine .item .right .avatar>img {
  width: 32px;
}

.VerticalTimeLine .item .right .action {
  font-size: 14px;
  position: relative;
}

.VerticalTimeLine .item .right .action .action-btn-group {
  /* position: absolute; */
  float: right !important;
  /* right: 10px !important;
  top: 0; */
  font-size: 14px;
  margin-right: 10px;
}

.VerticalTimeLine .item .right .action .action-btn-group>button {
  border-radius: 3px;
  width: 66px;
  height: 26px;
  background: #37abfd;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 10px;
}

.VerticalTimeLine .item .right .action .action-btn-group>.agree:hover {
  background: #1889b8;
}

.VerticalTimeLine .item .right .action .action-btn-group>.disagree {
  background: #fff;
  color: #333;
  border: 1px solid #d7d5d5;
}

.VerticalTimeLine .item .right .action .action-btn-group>.disagree:hover {
  color: #37abfd;
  border: 1px solid #37abfd;
}

.VerticalTimeLine .item .right .action button.disabled {
  background-color: #d7d5d5;
}

.VerticalTimeLine .item .right .action .execute {
  position: absolute;
  right: 10px;
  background: #37abfd;
  border-radius: 3px;
  width: 66px;
  height: 26px;
  border: none;
  font-size: 14px;
  color: #fff;
  letter-spacing: 0;
  outline: none;
  cursor: pointer;
}

.VerticalTimeLine .item .right .corner {
  position: absolute;
  top: -5px;
  right: -2px;
  width: 40px;
  height: 50px;
}

.VerticalTimeLine .item .right .corner.my {
  background: url(/Content/images/wode.svg) no-repeat;
}

.VerticalTimeLine .item .right .corner.finished {
  background: url(./yiban.svg) no-repeat;
}

.VerticalTimeLine .item .right .corner.wait {
  background: url(./daiban.svg) no-repeat;
}

.VerticalTimeLine .item .middle .point:before {
  content: "";
  position: absolute;
  top: -25px;
  bottom: 0;
  height: 20px;
  width: 1px;
  background: #ebeaea;
  border-radius: 1px;
  left: 3px;
}

.VerticalTimeLine .item .middle .point.longline:before {
  top: -35px;
  height: 30px;
}

.VerticalTimeLine .item .left .day {
  float: left;
  width: 40px;
  height: 45px;
  font-size: 34px;
  color: #333;
  letter-spacing: 0;
  margin-left: 6px;
}

.VerticalTimeLine .item.date .left {
  text-align: left;
  top: 0;
  margin-left: 20px;
  margin-top: -10px;
}

.VerticalTimeLine .item .left {
  width: 120px;
  text-align: right;
  padding-top: 0;
  margin-top: 0;
}

* {
  line-height: 1.5;
}

.VerticalTimeLine .item {
  list-style-type: none;
  padding-left: 6px;
  clear: both;
}

#task-container {
  /* position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll; */
  padding-left: 87px;
  padding-right: 67px;
}

.app-select-poptip-content {
  max-height: calc(100vh - 200px);
}

.tab-content-footer {
  text-align: center;
  width: calc(100vw - 200px);
  position: fixed;
  bottom: 0px;
  left: 200px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid #e4e3e3;
  background: #fff;
  /* z-index: 8888; */
}

.render-footer {
  text-align: center;
  width: calc(100vw - 200px);
  position: fixed;
  bottom: 0px;
  left: 200px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid #e4e3e3;
  background: #fff;
  z-index: 8888;
}
</style>

<template>
<div>
  <Row v-if="viewType === 'listdata'">
    <Col span="20">
      <Input v-model="appRunName" clearable @on-change="valueChange" placeholder="请输入应用名称搜搜..." style="width: 200px" />
      <span style="margin: 0 10px;"><Button id="searchBtn" type="primary" :loading="getLoading" icon="search" @click="getUnFinishJobList()">搜索</Button></span>
      <Poptip title="高级选项" placement="bottom" v-model="showFilter" @on-popper-hide="closeFilter()">
        <Button type="warning" icon="loop">高级搜索</Button>
        <div class="api" slot="content">
          <table>
            <tbody>
              <tr style="height:50px">
                <td style="width:100px">起止时间</td>
                <td>
                  <DatePicker v-model="hyper.Datefilter" type="datetimerange" format="yyyy-MM-dd HH:mm" style="width: 300px"></DatePicker>
                </td>
              </tr>
              <tr style="height:50px">
                <td style="width:100px">应用名称</td>
                <td>
                  <Poptip width="400" ref="AppName">
                    <Input v-model="selectedAppName" readonly placeholder="请选择" style="width: 300px"></Input>
                    <div slot="content" class="app-select-poptip-content">
                      <app-tree v-model="selectedApp"></app-tree>
                    </div>
                  </Poptip>
                </td>
              </tr>
              <tr style="height:50px">
                <td style="width:100px">发起人</td>
                <td>
                  <div class='addroleusers-userselect' id='startApprovalId' data-ismultiple='true' data-uservisible='true' data-orgunitvisible='false' data-width='100%'></div>
                </td>
              </tr>
              <tr style="height:50px">
                <td style="width:100px">数据标题</td>
                <td>
                  <Input v-model="nameSchema"  placeholder="支持模糊" style="width: 300px"></Input>
                </td>
              </tr>
            </tbody>
            <Button type="success" @click="getUnFinishJobList()">确定</Button>
            <Button type="text" @click="closeFilter(false)">重置</Button>
          </table>
        </div>
      </Poptip>
    </Col>
    <Col span="4" style="text-align:right;">
      <ButtonGroup>
        <Button type="ghost" :disabled="viewBlock" @click="viewList=false;viewBlock=true">
            <Icon type="grid"></Icon>
            块状
        </Button>
        <Button type="ghost" :disabled="viewList" @click="viewList=true;viewBlock=false">
            列表
            <Icon type="ios-list-outline"></Icon>
        </Button>
      </ButtonGroup>
    </Col>    
  </Row>
  <div v-if="viewType === 'listdata'" id="task-container" style="margin-top:30px" :style="{'padding': viewBlock ? '0 67px 0 87px': '0 0 0 70px'}">
    <div class="form-inline" style="margin-left:-45px;margin-top:50px">
      <div id="timeline" style="margin-left: -23px; height: auto; width: 100%; float: left; padding-bottom: 35px;">
        <div v-if="this.downList.length==0 && !this.loadingData" class="nodata">
          <img src="./meiyoushuju.png">
          <span class="nodata-title">还没有任何数据</span>
        </div>
        <Spin fix size="large" class="data-loading" v-show="loadingData"></Spin>
        <work-list 
          v-if="this.downList.length!=0 && viewList"
          v-model="this.downTblList"
          :total="this.listTotal"
          :current="this.listPage"
          @page-change="listPageChange"
          @row-select="dealTask"
          @handle-submit="handleListSubmit"
          @handle-reset="handleReset">
        </work-list>
        <div class="VerticalTimeLine" v-if="this.downList.length!=0 && viewBlock" style="width:85%;">
          <ul class="itemContainer" v-for="index in this.downList">
            <li class="item date">
              <div class="left">
                <div class="day" style="font-size:34px!important;-webkit-text-size-adjust:none;">
                  {{index.date}}
                </div>
                <div class="weekMonth">
                  <div class="weekday">
                    <span v-if="index.dayOfWeek==1">星期日</span>
                    <span v-if="index.dayOfWeek==2">星期一</span>
                    <span v-if="index.dayOfWeek==3">星期二</span>
                    <span v-if="index.dayOfWeek==4">星期三</span>
                    <span v-if="index.dayOfWeek==5">星期四</span>
                    <span v-if="index.dayOfWeek==6">星期五</span>
                    <span v-if="index.dayOfWeek==7">星期六</span>
                  </div>
                  <div class="month">
                    {{index.month}}/{{index.year}}
                  </div>
                </div>
              </div>
              <div class="middle">
                <div class="bigPoint">
                </div>
              </div>
              <div class="right" style="width: 100%;">
              </div>
            </li>
            <li class="item" v-for="(num, index) in index.list" :key="index" @click="dealTask(num)">
              <div class="left">
                <span class="time">
                  {{num.currentTime}}
                </span>
              </div>
              <div class="middle">
                <div class="point" style="background-color:#17C295">
                </div>
              </div>
              <div class="right" style="width: 100%;">
                <div class="arrow">
                </div>
                <div class="title">
                  {{num.appRunName}} <span v-if="num.taskType==3" class="warn">(被驳回需重新提交)</span>
                </div>
                <div class="content" v-for="pro in num.json ">
                  {{pro.name}}:&nbsp;&nbsp;{{pro.valueStr}}
                  <br>
                </div>
                <div class="avatar" style="background-color:#17C295">
                  {{num.startUserName}}
                </div>
                <div class="action warn">
                  <span>{{num.dealName}}&nbsp;</span>
                  <span>
                    {{num.taskName}}
                  </span>
                  <span v-if="num.taskAction==0" class="warn">待处理</span>
                  <span v-if="num.taskAction==1" class="success">同意</span>
                  <span v-if="num.taskAction==2" class="failed">不同意</span>
                  <span v-if="num.taskAction==3" class="failed">撤回</span>
                  <span v-if="num.taskAction==4" class="failed">驳回</span>
                  <span v-if="num.taskAction==5" class="warn">转办</span>
                  <span v-if="num.taskAction==6" class="warn">批阅</span>
                  <span v-if="num.taskAction==7" class="warn">跳转</span>
                  </span>
                  <div class="action-btn-group" v-if="num.taskType==1||num.taskType==2||num.taskType==8">
                    <button class="agree" @click.stop.prevent="handleSubmit(num,1)">
                      同&nbsp;意
                    </button>
                    <button class="disagree" @click.stop.prevent="handleReset(num)">
                      不同意
                    </button>
                  </div>
                </div>
                <div v-if="num.status==1" class="corner wait">
                </div>
                <div v-if="num.status!=1" class="corner finished">
                </div>
              </div>
            </li>
          </ul>
          <Button type="text" :loading="moreData" v-if="downList.length!=0&&!noMore" style="margin-left:160px" @click="getUnFinishJobList(1)"><Icon type="arrow-down-a"></Icon>加载更多</Button>
          <Button type="text" v-if="noMore" style="margin-left:160px">暂无更多数据......</Button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="viewType === 'approval'" class="ivu-modal-body">
    <Spin fix size="large" class="info-loading-spin" v-show="infoLoading"></Spin>
    <Spin fix size="large" class="agree-loading-spin" v-show="agreeLoading"></Spin>
    <Spin fix size="large" class="disagree-loading-spin" v-show="disagreeLoading"></Spin>
    <div slot="header" style="text-align:center">
      <span style='font-family: arial, "Microsoft Yahei", 微软雅黑;'>办理</span>
    </div>
    <Form :label-width="80">
      <openModal :result="currentApproval.data" :code="currentCode"></openModal>
      <!-- <Row>
          <Col span="24">
              <FormItem label="" > </FormItem>
          </Col>
      </Row> -->
      <Row v-if="['5', '7'].indexOf(currentApproval.props.taskType) === -1">
        <div class="title">审批意见</div>
        <Col span="24">
        <!-- <FormItem v-if = "currentApproval.props.taskType != '5'" label="审批意见" > -->
        <Input v-model="currentApproval.props.taskResult" style="margin-right:50px" @on-change="valueChange" class="aproval-input" type="textarea" :rows="4"></Input>
        <!-- </FormItem> -->
        </Col>
      </Row>
    </Form>
    <div class="tab-content-footer">
      <Button v-if="['4', '5', '7'].indexOf(currentApproval.props.taskType) === -1" type="primary" @click="handleSubmit(currentApproval.props,2)">同意</Button>
      <Button v-if="['4', '5', '7'].indexOf(currentApproval.props.taskType) === -1" type="ghost" @click="handleReset(currentApproval.props)">反对</Button>
      <Button type="ghost" @click="openLogModal(currentApproval.props)">流程状态</Button>
      <Button v-if="['4', '5', '7','8'].indexOf(currentApproval.props.taskType) === -1" type="ghost" @click="handleResetTS(currentApproval.props)">驳回原点</Button>
      <Button v-if="['4', '5', '7','8'].indexOf(currentApproval.props.taskType) === -1" type="ghost" @click="handleDispatch(currentApproval.props)">加派</Button>
      <Button v-if="['4', '5', '7','8'].indexOf(currentApproval.props.taskType) === -1" type="ghost" @click="handleTO()">转办</Button>
      <Button v-if="['4', '5', '7','8'].indexOf(currentApproval.props.taskType) === -1" type="ghost" @click="getJumpNode(currentApproval.props)">跳转至</Button>
      <Button v-if="currentApproval.props.taskType === '4'" type="ghost" @click="updateCC(currentApproval.props)">确定</Button>
      <Button v-if="currentApproval.props.taskType === '5'" type="ghost" @click="handleSubmit(currentApproval.props)">确定</Button>
      <Button v-if="currentApproval.props.taskType === '7'" type="ghost" @click="commitFunctionNode(currentApproval.props)">确定</Button>
      <!-- <Button type="ghost" @click="close()" style="margin-left: 8px">取消</Button> -->
      <Button
        v-if="attachId"
        type="ghost"
        @click="exportWordTemplate(currentApproval.props)"
      >导出</Button>
      <Button type="ghost" @click="delegatePrint">打印</Button>
    </div>
  </div>

  <Modal v-model="turnModal" @on-cancel="closeTurn" :mask-closable="false">
    <div slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>请选择审批人</span>
    </div>
    <Form :label-width="80">
      <Row>
        <Col span="24">
        <FormItem label="转办给">
          <div class='addroleusers-userselect' id='transApprovalId' data-ismultiple='false' data-uservisible='true' data-orgunitvisible='false' data-width='100%'></div>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="审批意见">
          <Input v-model="currentApproval.props.taskResult" style="margin-right:50px" @on-change="valueChange"></Input>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" :loading="commitLoading" @click="commitTurnTask(currentApproval.props)">确认</Button>
      <Button type="ghost" style="margin-left: 8px" @click="closeTurn">取消</Button>
    </div>
  </Modal>

  <Modal v-model="dispatchModal" @on-cancel="closeDispatch" :mask-closable="false">
    <div slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>请选择加派人</span>
    </div>
    <Form :label-width="100">
      <Row>
        <Col span="24">
        <FormItem label="加派给">
          <div class='addroleusers-userselect' id='dispatchId' data-ismultiple='true' data-uservisible='true' data-orgunitvisible='false' data-width='100%'></div>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="加派建议">
          <Input v-model="currentApproval.props.suggest" style="margin-right:50px"></Input>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" :loading="disLoading" @click="dispatchTask(currentApproval.props)">确认</Button>
      <Button type="ghost" style="margin-left: 8px" @click="closeDispatch">取消</Button>
    </div>
  </Modal>

  <Modal v-model="jumpModal" @on-cancel="closeJump" :mask-closable="false">
    <div slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>请选择跳转节点</span>
    </div>
    <Form :label-width="150">
      <Row>
        <Col span="50">
        <FormItem label="选择跳转审批节点: ">
          <div>
            <select v-model="selected" style="margin-right:150px">
              <option v-for="item in jumpParams.inParam" v-bind:value="item">{{item.nodeName}}</option>
            </select>
          </div>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
        <FormItem label="审批意见: ">
          <Input v-model="currentApproval.props.taskResult" style="margin-right:50px" @on-change="valueChange"></Input>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" :loading="commitLoading" @click="commitJumpTask(currentApproval.props)">确认</Button>
      <Button type="ghost" style="margin-left: 8px" @click="closeJump">取消</Button>
    </div>
  </Modal>

  <!--
              <Modal v-model="showModal" :mask-closable="false" width="50">
                    <div  class="render-container">
                      <h3 slot="title">{{pageName}}</h3>
                      <RenderDev style="margin-top: 50px;" :soul="soul"  ref="myRender"></RenderDev>
                    </div>
                    <div slot="footer">
                          <Button type="primary" :loading="commitLoading" @click="restartFlow(soul.children)">提交</Button>
                          <Button type="ghost" @click="closeModal()" style="margin-left: 8px">取消</Button>
                    </div>
              </Modal>
-->

  <div id="createNewApp" v-if="viewType === 'render'">
    <div class="render-container my-work-other">
      <openModal_ @close="() => {
          $emit('close');
          getUnFinishJobList();
        }" :code="showModalAppId"></openModal_>
      <div class="render-footer">
        <Button type="primary" @click="delegateSubmit">提交</Button>
        <Button type="ghost" @click="delegateSave">暂存</Button>
        <Button type="ghost" :loading='loading2'  @click="cancelMyJob">撤回</Button>
      </div>
    </div>
  </div>
  <div v-if="isLogModal">
    <log-modal :visible="isLogModal" :value="logModalValue" @on-cancel="onLogModalClose"></log-modal>
  </div>
</div>
</template>

<script>
import Cookies from "js-cookie";
import HTTP from "../../api/work-flow.js";
import appReq from "../../api/app-apply.js";
import {
  dataFormat,
  parse
} from "../../util/assist.js";
import approval from "./components/approval.vue";
import {
  unfinishData,
  unfinishColumns
} from "./data/unfinishJob.js";
import {
  table2excelData,
  excelColumns
} from "./data/table2excel.js";
import {
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
import WorkList from './work-list';
import utils from "../../util/utils.js";
import openModal from "./components/approvalDetail.vue";
import openModal_ from "./openModal.vue";
import logModal from "./designFlowModal/approvalLog.vue";
import appTree from './components/apptree'

import "../role/BaseControl.js";
import "../role/ControlManager.js";
import "../role/SmartForm.js";
import "../role/FormControls.js";
import "../role/FormMultiUser.js";
export default {
  name: "flow-manager",
  components: {
    approval,
    openModal,
    openModal_,
    logModal,
    appTree,
    WorkList
  },
  props: {
    viewType: {
      type: String
    }
  },
  data() {
    return {
      loadingData: false,
      nameSchema:"",
      infoLoading: true,
      agreeLoading: false,
      disagreeLoading: false,
      self: this,
      transApproval: "",
      dispatchNewTask:"",
      loading2:false,
      disLoading:false,
      dispatchModal:false,
      startApproval: "",
      total: 0,
      showFilter: false,
      modal2: false,
      showModal: false,
      utils: new utils(),
      commitLoading: false,
      appRunName: null,
      pageName: "",
      downList: [],
      downTblList: [],
      moreData: false,
      noMore: false,
      currentCode: "",
      currentIndex: 1,
      showModalAppId: "",
      pageData:{
        1:2,
        2:2,
        3:2,
        4:2,
        totle:2
      },
      hyper: {
        Datefilter: null,
        Appfliter: null,
        Userfliter: null
      },
      currentApproval: {
        data: [],
        suggest:'',
        props: {
          appRunId: "",
          taskId: "",
          ruWfTaskId: "",
          taskResult: "",
          taskType: "",
          instanceId: "",
          modelId: ''
        }
      },
      returnSuccess: {},
      returnFail: {},
      csvData: [],
      total: 40,
      selectMinRow: 1,
      selectMinCol: 1,
      minRow: 1,
      minCol: 1,
      csvFileName: "",
      excelFileName: "",
      fontSize: 16,
      getLoading: false,
      restartParam: {},
      currentAppId: "",
      turnModal: false,
      jumpModal: false,
      selected: [],
      jumpParams: {
        data: [],
        outParam: {
          appRunId: "",
          taskId: "",
          ruWfTaskId: "",
          taskResult: "",
          targetNodeId: ""
        },
        inParam: {
          nodeId: "",
          nodeName: ""
        }
      },
      toUserId: "",
      turnParams: {
        appRunId: "",
        taskId: "",
        ruWfTaskId: "",
        taskResult: "",
        toUserId: ""
      },
      restartParam: {},
      isLogModal: false,
      logModalValue: {},
      selectedApp: [],
      // 初始化选择块状还是列表展示
      viewList: false,
      viewBlock: true,
      listTotal: 0,
      listPage: 0,
      attachId: null
    };
  },
  mounted() {
    let _self = this;
    this.$nextTick(() => {
      _self._initFormUser();
    });
    this.startApproval = $('#startApprovalId').RoleFormMultiUser({
      appendBody: false
    });
    this.getUnFinishJobList();
    this.listPage = 0;
  },
  // 暂时为了解决发起人选择框，选择问题
  updated() {
    let content = $('#startApprovalId').find('.form-control.form-user-add.icon-arrow-down-full');
    if (!content.length) {
      this.startApproval = $('#startApprovalId').RoleFormMultiUser({
        appendBody: false
      });
    }
  },
  methods: {
    ...mapMutations("dragModule", ["setSoul"]),
    exportData(type) {
      if (type === 1) {
        this.$refs.tableCsv.exportCsv({
          filename: "原始数据"
        });
      } else if (type === 2) {
        this.$refs.tableCsv.exportCsv({
          filename: "排序和过滤后的数据",
          original: false
        });
      } else if (type === 3) {
        this.$refs.tableCsv.exportCsv({
          filename: this.csvFileName,
          columns: this.columnsCsv.filter(
            (col, index) =>
            index >= this.selectMinCol - 1 && index <= this.selectMaxCol - 1
          ),
          data: this.csvData.filter(
            (data, index) =>
            index >= this.selectMinRow - 1 && index <= this.selectMaxRow - 1
          )
        });
      }
    },
    // 初始化FormUser控件
    _initFormUser() {
      if (!this.transApproval) {
        this.transApproval = $("#transApprovalId").RoleFormMultiUser();
      }
      if(!this.dispatchNewTask) {
        this.dispatchNewTask = $("#dispatchId").RoleFormMultiUser();
      }
    },
    closeFilter(value = true) {
      if (value) {
        this.showFilter = false;
      } else {
        this.hyper = {
          Datefilter: null,
          Appfliter: null,
          Userfliter: null
        };
        this.selectedApp = [];
        this.nameSchema="";
        this.startApproval.ClearChoices();
      }
    },
     cancelMyJob() {
        this.loading2 = true;
        try {
           var appRunId = ''
          if(this.showModalAppId.indexOf(',')>=0){
              appRunId = this.showModalAppId.split(',')[1]
          }
            HTTP.cancelMyJob(appRunId).then((res)=>{
                if(res.code == 0){
                    this.isVisible = false;
                    this.dealResponse(res.code);
                    this.getUnFinishJobList();
                    this.$emit('close');
                } else {
                    this.$Message.error(res.msg);
                }
            });
        } catch(e) {
            console.log(e)
            this.$Message.error('撤销发生错误');
            this.loading2 = false;                    
            return
        } finally {
              this.loading2 = false;   
                }
    },
     dealResponse(result) {
                let statusMap = {
                    '0' : {
                        type: 'success',
                        msg: '操作成功'
                    },
                    '1' : {
                        type: 'warning',
                        msg: '流程已完成'
                    },
                    '2' : {
                        type: 'error',
                        msg: '无权限操作'
                    }
                }
                let status = statusMap[result + ''];
                this.$Message[status.type](status.msg);
            },
    dealTask(params) {
      if (['3', '6'].indexOf(params.taskType) !== -1) {
        //this.showRender(params);
        this.showRender1(params);
        return;
      }
      this.openApprvalModal(params);
    },

    getJumpNode(params) {
      HTTP.queryTurnNode(params)
        .then(res => {
          this.jumpParams.inParam = res.preNodeName;
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("This is an error");
        })
        .finally(() => {
          this.loading = false;
        });
      this.jumpModal = true;
    },
    commitJumpTask(params) {
      this.jumpParams.outParam.appRunId = params.appRunId;
      this.jumpParams.outParam.taskId = params.taskId;
      this.jumpParams.outParam.ruWfTaskId = params.ruWfTaskId;
      this.jumpParams.outParam.taskResult = params.taskResult;
      this.jumpParams.outParam.targetNodeId = this.selected.nodeId;
      HTTP.freeJump(this.jumpParams.outParam)
        .then(res => {
          console.log("跳转成功");
          //刷新列表
          this.getUnFinishJobList();
          this.$emit('close');
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("This is an error");
        })
        .finally(() => {
          this.loading = false;
        });
      this.jumpModal = false;
      this.modal2 = false;
    },

    dispatchTask(data){
        let param ={}
        param.appRunId = data.appRunId;
        param.taskId = data.taskId;
        param.ruWfTaskId = data.ruWfTaskId;
        param.taskResult = data.suggest;
        param.comment =  data.suggest;
        if(!this.dispatchNewTask.checkSelectUser()){
          return ;
        }
        // param.toUserId =  this.dispatchNewTask.GetTransUnitIDs()
        var ValObjs = this.dispatchNewTask.GetValue();
        var NameList=[];
        for (var key in ValObjs) {
            NameList.push(ValObjs[key].id) 
            if (Cookies.get("user") == ValObjs[key].loginName) {
            //不能选自已
            this.$Message.error("加办失败,不能选择当前用户");
            return 0;
          }
        }
        param.toUserId = NameList.join(',');
        
        this.disLoading=true;
        HTTP.dispatchTask(param)
        .then(res => {
          this.currentApproval.props={
          appRunId: "",
          taskId: "",
          suggest:"",
          ruWfTaskId: "",
          taskResult: "",
          taskType: "",
          instanceId: "",
          modelId: ''
        }
      
          console.log("加办成功");
          //刷新待办列表
          this.getUnFinishJobList();
          this.$emit('close');
        })
        .catch(err => {
          console.log(err);
          this.$Message.error(err);
        })
        .finally(() => {
          this.disLoading = false;
        });
        this.dispatchModal = false;
        this.modal2 = false;
       
    },


    commitTurnTask(params) {
      this.turnParams.appRunId = params.appRunId;
      this.turnParams.taskId = params.taskId;
      this.turnParams.ruWfTaskId = params.ruWfTaskId;
      this.turnParams.taskResult = params.taskResult;
      // console.log(this.transApproval);
      //console.log(JSON.stringify(this.transApproval.GetUnitIDs()));
      this.turnParams.toUserId = this.transApproval.GetTransUnitIDs()
      // this.transApproval.
      var ValObjs = this.transApproval.GetValue();
      var toLoginName;
      for (var key in ValObjs) {
        toLoginName = ValObjs[key].loginName;
        // UintIDs.push(key);
      }
      if (Cookies.get("user") == toLoginName) {
        //不能选自已
        this.$Message.error("转办失败，已是工作项的参与者");
        return 0;
      }
      // this.$Message.error("");

      HTTP.turnToDo(this.turnParams)
        .then(res => {
          console.log("转办成功");
          //刷新待办列表
          this.getUnFinishJobList();
          this.$emit('close');
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("This is an error");
        })
        .finally(() => {
          this.loading = false;
        });
      this.turnModal = false;
      this.modal2 = false;
    },
    closeJump() {
      this.jumpModal = false;
    },
    closeTurn() {
      this.turnModal = false;
    },
     closeDispatch() {
      this.dispatchModal = false;
      this.currentApproval.props={
          appRunId: "",
          taskId: "",
          suggest:"",
          ruWfTaskId: "",
          taskResult: "",
          taskType: "",
          instanceId: "",
          modelId: ''
        }
    },

    openApprvalModal(params) {
      this.currentAppId = params.appId
      this.currentApproval.props.appRunId = params.id;
      this.currentApproval.props.taskId = params.taskId;
      this.currentApproval.props.ruWfTaskId = params.ruWfTaskId;
      this.currentApproval.props.taskResult = params.taskResult;
      this.currentApproval.props.taskType = params.taskType;
      this.currentApproval.props.instanceId = params.instanceId;
      this.currentApproval.props.modelId = params.modelId;
      sessionStorage.setItem("tabAppId",this.currentAppId);
      HTTP.approvalDetail({
          busId: params.id,
          appId: params.appId,
          ruWfTaskId: params.ruWfTaskId,
        }).then(res => {
          //console.log(res);
          //res = JSON.parse(JSON.stringify(res));

          // 功能节点重新发起-可编辑
          // if (params.taskType === '7') {
          //   try {
          //     const taskType7ReturnData = res.ReturnData.ResponseContext.ReturnData;
          //     for (let p in taskType7ReturnData) {
          //       taskType7ReturnData[p].Editable = true;
          //     }
          //   } catch (e) {}
          // }

          this.attachId = res.attachId; // Word 模板导出

          this.currentApproval.data = res;
          this.currentCode = params.id;
          // this.modal2 = true;
          this.$emit('showModal', {
            type: 'approval',
            index: params.createTime,
            data: params,
            page: 'unfinish-job'
          });
          //this.currentApproval.data=res;
        })
        .catch(err => {
          console.log(err);
          this.$Message.error(err);
        })
        .finally(() => {
          this.loading = false;
          this.infoLoading = false;
        });
    },
    valueChange() {
      var obj = this;
      console.log(this);
      this.$emit("value", obj.formValidate);
    },
    valueReset() {
      this.appRunName = "";
      this.getUnFinishJobList();
    },
    removeFromList(runId) {
      for (var index in this.downList) {
        for (var num in this.downList[index].list) {
          if (this.downList[index].list[num].ruWfTaskId == runId) {
            this.downList[index].list.splice(num, 1);
            HTTP.unfinishJobList(param).then(res => {
              this.$store.commit("setMessageCount", res.total);
            });
          }
        }
      }
    },
    getSheetValue(List, ret) {
      List.forEach((value) => {
        if (value.dataset != null && value.dataset != undefined && value.dataset != {}) {
          if (value.dataset.datafield !== null && value.dataset.datafield !== undefined) {
            if (value.childNodes[1].childNodes[0] && value.childNodes[1].childNodes[0].value) {
              ret[value.dataset.datafield] = value.childNodes[1].childNodes[0].value;
            } else {
              ret[value.dataset.datafield] = value.childNodes[1].innerText;
            }
          } else {
            this.getSheetValue(value.childNodes, ret);
          }
        }

      })
      return ret;

    },
    handleSubmit(name, key) {
      if (this.agreeLoading) return;
      this.returnSuccess ={};
      // 表单验证(zhulinghao)
      if (!$.ControlManager.Validate({
          Action: 'Submit',
          doingWork: true
        })) {
        return false
      }
      this.agreeLoading = true
      this.returnSuccess.appRunId =
        name.appRunId === undefined ? name.id : name.appRunId;
      this.returnSuccess.taskId = name.taskId;
      this.returnSuccess.ruWfTaskId = name.ruWfTaskId;
      this.returnSuccess.taskResult = name.taskResult;
      this.returnSuccess.operation = key;
      // this.returnSuccess.formData = JSON.stringify($.ControlManager.SaveSheetData());
      var sheetData = {}
      // if(($("#SheetContent")[0]!==null&&($("#SheetContent")[0]!==undefined)))
      // this.returnSuccess.formData=JSON.stringify(this.getSheetValue($("#SheetContent")[0].childNodes,sheetData));
      if(key!=1){
            this.returnSuccess.formData = JSON.stringify($.ControlManager.GetSheetData(this.currentAppId));
      }
      HTTP.agree(this.returnSuccess)
        .then(res => {
          if (res.code == 0) {
            this.$Message.success("办理成功!");
            // this.removeFromList(this.returnSuccess.ruWfTaskId);
            //刷新列表
            this.getUnFinishJobList();
            this.$emit('close');
          } else this.$Message.error(res.msg);
        })
        .catch(err => {
          this.$Message.error(err);
        })
        .finally(() => {
          this.modal2 = false;
          this.agreeLoading = false
        });
    },
    commitFunctionNode(name, key) {
      if (this.agreeLoading) return;
      // 表单验证(zhulinghao)
      if (!$.ControlManager.Validate({
          Action: 'Submit',
          doingWork: true
        })) {
        return false
      }
      this.agreeLoading = true;
      const param = {};
      param.appRunId = name.appRunId || name.id;
      name.appRunId === undefined ? name.id : name.appRunId;
      param.ruWfTaskId = name.ruWfTaskId;
      param.modelId = name.modelId;
      param.formData = JSON.stringify($.ControlManager.GetSheetData(this.currentAppId));
      HTTP.commitFuncNode(param)
        .then(res => {
          if (res.code == 0) {
            this.$Message.success("提交成功!");
            //刷新列表
            this.getUnFinishJobList();
            this.$emit('close');
          } else this.$Message.error(res.msg);
        })
        .catch(err => {
          this.$Message.error(err);
        })
        .finally(() => {
          this.modal2 = false;
          this.agreeLoading = false;
        });
    },
    handleTO(){
      this.turnModal = true
       $("#transApprovalId").RoleFormMultiUser();
    },

    handleDispatch(){
      this.dispatchModal = true
       $("#dispatchId").RoleFormMultiUser();
    },
    handleReset(name) {
      if (this.disagreeLoading) return;
      this.disagreeLoading = true;
      this.returnFail.appRunId =
        name.appRunId === undefined ? name.id : name.appRunId;
      this.returnFail.taskId = name.taskId;
      this.returnFail.ruWfTaskId = name.ruWfTaskId;
      this.returnFail.taskResult = name.taskResult;

      HTTP.reject(this.returnFail)
        .then(res => {
          if (+res.code === 0) {
            this.$Message.success('办理成功!');
            // this.removeFromList(this.returnFail.ruWfTaskId);
            this.getUnFinishJobList();
            this.$emit('close');
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch(err => {
          this.$Message.error(err);
        })
        .finally(() => {
          this.modal2 = false;
          this.disagreeLoading = false
        });
    },
    handleResetTS(name) {
      console.log(this.disagreeLoading)
      if (this.disagreeLoading) return
      this.disagreeLoading = true
      this.returnFail.appRunId = name.appRunId;
      this.returnFail.taskId = name.taskId;
      this.returnFail.ruWfTaskId = name.ruWfTaskId;
      this.returnFail.taskResult = name.taskResult;
      HTTP.turndown(this.returnFail)
        .then(res => {
          if (res.code == 0) {
            this.$Message.success("Success!");
            //刷新列表
            this.getUnFinishJobList();
            this.$emit('close');
          } else {
            this.$Message.error("failed");
          }
        })
        .catch(err => {
          this.$Message.error("This is an error");
        })
        .finally(() => {
          this.modal2 = false;
          this.disagreeLoading = false
        });
    },
    updateCC(name) {
      var param = {};
      param.appRunId = name.appRunId;
      param.taskId = name.taskId;
      param.ruWfTaskId = name.ruWfTaskId;
      param.taskResult = name.taskResult;
      HTTP.updateCC(param)
        .then(res => {
          if (res.code == 0) {
            this.getUnFinishJobList();
            this.$emit('close');
            //this.removeFromList(name.ruWfTaskId);
            this.$Message.success("Success!");
          } else {
            this.$Message.error("failed");
          }
        })
        .catch(err => {
          this.$Message.error(err);
        })
        .finally(() => {
          this.modal2 = false;
        });
    },

    getUnFinishJobList(value = 0, pageNumber = false) {
      this.loadingData = true
      let param = {};

      if (this.appRunName !== undefined && this.appRunName !== null)
        param.appRunName = this.appRunName;
      if (
        this.hyper.Datefilter !== undefined &&
        this.hyper.Datefilter !== null &&
        this.hyper.Datefilter[0] !== ""
      ) {
        param.queryStartTime = new Date(this.hyper.Datefilter[0]).getTime();
        param.endTime = new Date(this.hyper.Datefilter[1]).getTime();
      }
      if (
        this.startApproval &&
        this.startApproval.GetUnitIDs()[0] !== undefined &&
        this.startApproval.GetUnitIDs()[0] !== null
      ) {
        if(this.startApproval.GetUnitIDs()&&this.startApproval.GetUnitIDs().length>0){
          var ret =[]
          for(let param of this.startApproval.GetUnitIDs()){
            ret.push(param.id)
          }
          param.startUserId = JSON.stringify(ret);
        }
      
      }
      if(this.nameSchema){
        param.dataItem = this.nameSchema+""
      }
      if (this.selectedApp && this.selectedApp.length) {
        let selectedApp = []
        this.selectedApp.forEach(app => {
          selectedApp.push(app.id)
        })
        param.appIdList = JSON.stringify(selectedApp)
      }
      param.type = this.$route.query.type;
      if (value == 0) {
        param.pageNum = 1;
        this.downList = [];
        this.pageData={
        1:2,
        2:2,
        3:2,
        4:2,
        totle:2
      };
      } else if (value != 0 && pageNumber){
        param.pageNum = pageNumber;
      } else {
        if(param.type){
          param.pageNum = this.pageData[param.type];
        }
        else{
          param.pageNum =this.pageData.totle;
        }
      }
      this.getLoading = true;
      let that = this
      HTTP.unfinishJobList(param)
        .then(res => {
           if (value == 0) {
                this.downList = [];
            } else if (value != 0 && pageNumber){
            } else {
              if(this.$route.query.type){
                this.pageData[this.$route.query.type]++;
              }
              else{
                this.pageData.totle++;
              }
            }
          let tmp = res.result;
          this.$store.commit('setMessageCount', res.total);
          if (tmp && tmp.length > 0) {
            that.downTblList = [];
            this.noMore = false;
            for (var index in tmp) {
              for (var num in tmp[index].list) {
                tmp[index].list[num].currentTime = this.getNowFormatDate(
                  tmp[index].list[num].createTime
                );
                if (tmp[index].list[num].propertyJson)
                  var propertyJsonStr = tmp[index].list[num].propertyJson.replace(/\\\\"/g, '\\"');
                try {
                  tmp[index].list[num].json = JSON.parse(
                    propertyJsonStr
                  );
                } catch (error) {
                  console.log(`error in ${tmp[index].list[num].id}`)
                }
              }
              if (!pageNumber) {
                // 列表翻页请求数据 块状列表不刷新
                that.downList.push(tmp[index]);
              }
              that.downTblList.push(tmp[index]);
              that.listPage = pageNumber || (this.pageData.totle - 1);
              that.listTotal = res.total;
            }
          } else {
            this.noMore = true;
          }
        })
        .catch(err => {
          this.$Message.error(err);
        })
        .finally(() => {
          this.getLoading = false;
          this.loadingData = false
        });
    },
    getNowFormatDate(time) {
      var date = new Date(time);
      var hour = date.getHours();
      var minus = date.getMinutes();
      var currentdate='';
      if(minus<10){
        currentdate = hour + ":" +'0'+ minus;
      }
      else{
        currentdate = hour + ":" + minus;
      }

      return currentdate;
    },
    close() {
      this.modal2 = false;
    },
    closeModal() {
      this.showModal = false;
    },
    restartFlow(param) {
      try {
        this.checkValidation(this.$refs["myRender"].$children);
        this.restartParam.propertyJson = JSON.stringify(this.anaData(param));
        this.commitLoading = true;
        console.log(this.restartParam);
        HTTP.restartFlow(this.restartParam)
          .then(res => {
            if (res.code == 0) {
              this.$Message.success("提交成功");
            } else {
              this.$Message.error("提交失败");
            }
          })
          .catch(err => {
            this.$Message.error("This is an error");
          })
          .finally(() => {
            this.commitLoading = false;
            this.showModal = false;
          });
      } catch (err) {
        this.$Message.error(err);
        console.log(err);
      }
    },
    getDataParam(param) {
      for (var item in param) {
        if (
          param[item].type == "Div" ||
          param[item].type == "Row" ||
          param[item].type == "Col"
        ) {
          this.getDataParam(param[item].children);
        } else {
          return param;
        }
      }
    },
    check(param) {
      let validResult = true;
      console.log(this.$refs["myRender"].$children);
      if (this.utils.judgeNull(this.$refs["myRender"].$children)) {} else {
        validResult = this.checkValidation(this.$refs["myRender"].$children);
      }

      // if(validResult){

      // }
      // else{
      //    this.$Message.error('校验失败');
      // }
    },
    checkValidation(param) {
      this.result = true;
      if (this.utils.judgeNull(param)) return;
      for (var i = 0; i < param.length; i++) {
        if (!param[i].soul.isFormItem) {
          if (this.utils.judgeNull(param[i].$refs))
            this.checkValidation(param[i].$refs);
          else {}
        } else {
          if (!param[i].$refs["formItem"] ||
            !param[i].$refs["formItem"].validate
          ) {} else {
            if (param[i].soul.desc == "FormCheckbox") {
              if (param[i].$refs["formItem"].$children.length < 2) {
                console.log(param[i].$refs["formItem"].$children);
              } else {
                param[i].$refs["formItem"].$children[1].validate(valid => {
                  this.result = valid;
                });
                if (!this.result) throw "校验失败";
              }
            } else {
              param[i].$refs["formItem"].validate(valid => {
                this.result = valid;
              });
              if (!this.result) throw "校验失败";
            }
          }
        }
      }
      console.log(this.result);
      if (!this.result) throw "校验失败";
      return this.result;
    },
    anaData(param) {
      let returnVal = [];
      for (var index in param) {
        if (
          param[index].type == "Div" ||
          param[index].type == "Row" ||
          param[index].type == "Col"
        ) {
          this.anaData(param[index].children);
          return;
        }
        // else{
        //     this.anaData(param[index]);
        // }
        let item = param[index];
        var tmp = {};
        tmp.value = [];
        tmp.id = item.uid;
        if (item.type == "FormCheckbox") {
          let currentChoose = item.model.value.value;
          let retChoose = [];
          for (var i in item.model.items.value) {
            if (currentChoose.indexOf(item.model.items.value[i].value) !== -1) {
              retChoose.push(item.model.items.value[i].label);
            }
          }
          tmp.name = item.model.label.value;
          tmp.value = retChoose;
          returnVal.push(tmp);
        } else {
          tmp.name = item.model.label.value;
          tmp.value.push(item.model.value.value);
          returnVal.push(tmp);
        }
      }
      return returnVal;
    },

    showRender1(params) {
      this.showModalAppId = params.appId + "," + params.id;
      // this.showModal = true;
      this.$emit('showModal', {
        type: 'render',
        index: params.createTime,
        data: params,
        page: 'unfinish-job'
      });
      this.currentAppId = params.appId;
      //this.pageName = params.appName;
      //this.restartParam.appRunId = params.id;
    },

    showRender(params) {
      this.showModal = true;
      this.pageName = params.appName;
      this.restartParam.appRunId = params.id;
      appReq.getPageSoul
        .call(this, params.appId)
        .then(res => {
          //this.restartParam.appId=res.id;
          this.restartParam.modelId = res.modelId;
          let ancestorSoul = parse(res.pagesoul);
          console.log(ancestorSoul);
          this.setSoul(ancestorSoul);
        })
        .catch(err => {
          this.$Message.error("This is an error" + err);
          console.log(err);
        })
        .finally(() => {
          this.getLoading = false;
        });
    },
    openLogModal(param) {
      console.log(param)
      this.isLogModal = true
      this.logModalValue = {
        id: param.appRunId,
        ...param
      }
    },
    onLogModalClose() {
      setTimeout(() => {
        this.isLogModal = false
      }, 500)
    },
    delegatePrint() {
      document.querySelector('[data-action=Print]').AppRunId = this.currentApproval.props.appRunId;
      document.querySelector('[data-action=Print]').click();
    },
    delegateSubmit() {
      document.querySelector('[data-action=Submit]').click();
    },
    delegateSave() {
      document.querySelector('[data-action=Save]').click();
    },
    listPageChange (pageNumber) {
      this.getUnFinishJobList(1, pageNumber);
    },
    handleListSubmit (row) {
      this.handleSubmit(row, 1);
    },
    exportWordTemplate (param) {
      HTTP.exportWord({
        appId: this.currentAppId,
        appRunId: param.appRunId,
        attachmentId: this.attachId
      });
    }
  },
  computed: {
    ...mapGetters("dragModule", ["soul"]),
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
       if(this.$refs.AppName)
      this.$refs.AppName.handleClose();
      let appName = []
      this.selectedApp.forEach(app => {
        appName.push(app.title)
      })
      return appName.join(', ')
    }
  },
  watch: {
    '$route.query.type': function () {
      this.getUnFinishJobList();
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  display: table;
  max-width: 100%;
  background-color: transparent;
  border-spacing: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 100%;
  border-collapse: collapse;
  color: #666;
  border: 1px solid #cecece;
  font-size: 12px;
}

.table thead td,
.table thead th {
  background: #ececec;
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
  color: #666;
  padding: 5px 9px;
}

.table thead td {
  height: 40px;
  font-weight: bold;
}

.table tbody tr td,
.table tbody tr th {
  border-bottom: solid 1px #e5e5e5;
  vertical-align: middle;
  height: 40px;
}

.table tbody tr th {
  text-align: right;
  padding-right: 10px;
  background: #f8f8f8;
  border-right: 1px solid #e5e5e5;
  color: #666;
  font-weight: 400;
  width: 200px;
}

.table tbody tr td {
  padding-left: 10px;
}

// 驳回重新提交按钮
</style>

<style lang="less">
/* 弹窗 */

.resubmit-modal {
  .navbar {
    background-color: transparent;
  }
  .ivu-modal-mask {
    background-color: rgba(55, 55, 55, .4);
  }

  .ivu-modal {
    width: 800px !important;
    top: 20px;
  }

  .ivu-modal-body {
    min-height: 400px;
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

  .navbar-fixed-bottom,
  .navbar-fixed-top {
    position: absolute;
    border-bottom: none;
    box-shadow: none;
  }

  .navbar-fixed-top {
    top: 30px;
  }

  .sheet-navbar .container-fluid #navbar ul.navbar-nav li {
    border-left: none;
  } // .ivu-modal-footer {
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
      width: 100%;
      float: none;

      li {
        float: none;
        width: 100%;
        a {
          display: inline-block;
          width: 100px;
          padding: 0;
          margin: 10px;
        }
        &.active {
          a:active,
          a:focus,
          a:hover {
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

/* 表单 */

.resubmit-modal {
  input[type=radio]:checked+label:after {
    margin-top: -3px;
  }
  .navbar-default {
    background-color: #fff !important;
    box-shadow: none !important;
  }
  .ivu-modal-body {
    .SheetQuery .form-query-add:empty:not(:focus):before {
      top: 0;
    }

    #SheetContent .SheetMultiQuery .form-query-add a.label-info>i,
    #SheetContent .SheetQuery .form-query-add a.label-info>i {
      top: 6px;
    }

    .SheetQuery .form-query-add .label.label-info {
      margin-top: 4px;
      color: #38adff !important;
    }

    .form-group {
      display: flex;
      align-items: center;
      padding: 10px 0;

      .ControlTitle {
        padding: 0;
      }

      .SheetUser-Item {
        line-height: 20px;
      }

      s.sp_placeholder {
        line-height: 30px;
      }

      .icon-arrow-down-full {
        line-height: 24px;
      }

      .SheetUser-Item {
        span {
          font-size: 14px;
          line-height: 20px;
        }
      }

      .form-control.icon-arrow-down-full {
        line-height: 18px;
      }

      .icon-arrow-down-full {
        line-height: 22px;
        span {
          line-height: 18px;
        }

      }
    }

    .SheetUser .label-info {
      font-size: 14px !important;
    }

    .SheetUser .label-info,
    .nav-tabs.user-tabs>li.active>a,
    .nav-tabs.user-tabs>li.active>a:focus,
    .nav-tabs.user-tabs>li.active>a:hover {
      color: #38adff !important;
    }

    .SheetAttachment .btn-outline {
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }
}

.approval-modal {
  max-height: 460px;
  .ivu-modal-body {
    min-height: 300px;
    max-height: 460px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .print-btn {
    display: none !important;
  }
  .title {
    background-color: rgb(241, 250, 255);
    display: block;
    font-weight: bold;
    padding: 10px;
    margin: 20px 14px;
    color: #4d5f6c;
  }
  .info-modal-header {
    border-top: 1px solid #eee;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 0 !important;
    line-height: 30px;
  }

  .container-fluid {
    margin-top: 10px;
    padding-bottom: 0;
    margin-bottom: 10px;
  }

  .form-group {
    display: flex;
    align-items: center;
  }

  .modal-footer {}

  .sheet-control>.col-sm-2,
  .sheet-control>.col-sm-4,
  .sheet-control label.notdrag {
    padding: 5px 0;
  }

  img {
    margin-top: 0 !important;
  }

  .aproval-input {
    width: 96%;
    margin: 0 14px;
    box-sizing: border-box;
  }
}

.middle () {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

// 各种loading
#task-container {
  .data-loading {
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.approval-modal {
  .agree-loading-spin,
  .disagree-loading-spin,
  .info-loading-spin {
    .middle
  }
}

.ivu-modal-body .form-group span {
  line-height: 20px;
}
</style>
<style lang="less">
#startApprovalId {
  .icon-arrow-down-full {
    border-style: dashed !important;
    border-color: #ccc;
    line-height: 24px;
    display: block;
  }
}

.render-container #navbar {
  display: none;
}

.my-work-other {
  margin-bottom: 200px;

  & .col-sm-10.col-xs-10 {
    padding-top: 6px;
  }

  & .col-sm-2.col-xs-2.ControlTitle {
    width: 16.66666667% !important;
  }

  & .col-md-6.col-sm-6.col-xs-6:first-of-type .col-sm-2.col-xs-2.ControlTitle {
    width: 34% !important;
  }

  & .col-md-6.col-sm-6.col-xs-6:first-of-type .col-sm-10.col-xs-10 {
    width: 66% !important;
  }
}
</style>

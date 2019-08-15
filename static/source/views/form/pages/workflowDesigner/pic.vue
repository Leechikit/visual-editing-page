<style>
</style>

<template>
    <div id="app">
        <header>
            <designer-top-nav :title="title" :schema-code="schemaCode" :app-code="appCode" :type="type"></designer-top-nav>
        </header>
        <div class="myContainer">
            <div v-if="isNeedStartWF">
                <div class="wrapper-start">
                    <div class="btn-start" @click="startWF()">
                        开启表单流程
                    </div>
                    <div class="wf-description">
                        开启表单流程，设置流转条件搭建工作流表单
                    </div>
                    <!-- <div class="wf-help">
            如有问题，请参考<a href="https://home.h3yun.com/help/word.php?CateId=58" target="_blank" >帮助文档</a>
          </div> -->

                </div>
            </div>
            <div class="wrapper-content" v-if="!isNeedStartWF">
                <div class="toolbar">
                    <ul>
                        <li id='btnUndo' :class="[canUndo?'normal':'forbidden']" @click='undo()' title="撤销(Ctrl+Z)">
                            <Icon type="ios-undo" style="font-size:22px!important;margin-top:12px!important"></Icon>
                        </li>
                        <li id='btnRedo' :class="[canRedo?'normal':'forbidden']" @click='redo()' title="恢复(Ctrl+Y)">
                            <Icon type="ios-redo" style="font-size:22px!important;margin-top:12px!important"></Icon>
                        </li>
                        <li class="vertical-divider"></li>
                        <li id='btnSize' @click='setSameSize()' title="等大小">
                            <span class="icon-dengdaxiao"></span>
                            等大小
                        </li>
                        <li class="vertical-divider"></li>
                        <li id='btnWidth' @click='setMiddle()' title="水平对齐">
                            <span class="icon-hengpaiduiqi"></span>
                            水平对齐
                        </li>
                        <li class="vertical-divider"></li>
                        <li id='btnHeight' @click='setCenter()' title="垂直对齐">
                            <span class="icon-shupaiduiqi"></span>
                            垂直对齐
                        </li>
                        <li class="vertical-divider"></li>
                        <li id='btnHorizontal' @click='setSameHorizontalDistance()' title="水平等距">
                            <span class="icon-hengpaidengju"></span>
                            水平等距
                        </li>
                        <li class="vertical-divider"></li>
                        <li id='btnVertical' @click='setSameVerticalDistance()' title="垂直等距">
                            <span class="icon-shupaidengju"></span>
                            垂直等距
                        </li>
                        <li class="vertical-divider"></li>
                        <li @click='remove()' title="删除(节点,连接线)">
                            <Icon type="trash-a" style="color:red;font-size:22px!important"></Icon>
                        </li>
                    </ul>
                    <div class='pic--btn-save' @click="save()">
                        <Button :loading="isSaving" :disabled="isSaving" type="primary" size="small" class="sheet-design--submit-btn">
                            <span v-if="!isSaving">保存</span>
                            <span v-else>保存...</span>
                        </Button>
                    </div>
                    <!--  <div class='btnSave' @click="save()">
               保存
           </div> -->
                </div>
                <div class="content">
                    <div class="content-left">
                        <div class="activity-template-container model_container">
                            <div class="activity-template-title">节点</div>
                            <div class="node_container">
                            </div>
                            <div class="activity-template-title">子流程</div>
                            <div class="subinstance_contanier"></div>
                            <div class="activity-template-title">连接线</div>
                            <div class="activity-template-node" :class="[lineSelected?'active':'']" @click="showAssistLine">
                                <Icon type="arrow-graph-up-right" style="color: #46b2fe;font-size:20px!important"></Icon>
                            </div>
                        </div>
                    </div>
                    <div class="content-main" id="divDesigner" :style="{right: shrink?'0px':'350px'}">
                        <div class="workspace_container" style="width:100%;height:100%;">
                            <div class="workspace">
                            </div>
                        </div>
                    </div>
                    <div transfer class="content-right" :style="{transform: shrink?'translateX(350px)':'translateX(0px)', overflow: shrink ? 'visible' : 'auto'}">
                        <div @click="shrinkMenu()" style="position: fixed;z-index: 10000;transition: right 1s;transition: transform 0.5s;" :style="{right: shrink?'360px':'320px',transform: 'rotateZ(' + (this.shrink ? '-180' : '0') + 'deg)'}">
                            <Icon type="arrow-right-c" size='40'></Icon>
                        </div>
                        <div id="divPropertyContainer" style="overflow:auto;display:none;height:100%;" position="right">
                            <div class="property-tabs clearfix">
                                <div class="h3-lnk-bar"></div>
                                <a href="javascript:void(0);" id="btn_ActivitySet" data-target="#ActivitySet">节点属性</a>
                                <a href="javascript:void(0);" id="btn_WorkFlowSet" class="active" data-target="#WorkFlowSet">流程属性</a>
                            </div>
                            <div id="WorkFlowSet" class="pro-item">
                                <div class="PropertyTable">
                                    <div group='WorkflowBasic' property='SchemaCode'>
                                        <div class='property-title'>流程编码</div>
                                        <div class='property-value readonly'>
                                            <input type="text" readonly="true" style="border:none;" />
                                        </div>

                                    </div>
                                    <div group='WorkflowBasic' property='WorkflowFullName'>
                                        <div class='property-title'>流程名称</div>
                                        <div class='property-value WorkflowFullName'>
                                            <input type="text" style="border:none;" />
                                        </div>
                                    </div>
                                    <div group='WorkflowBasic'>
                                        <Checkbox v-model="IsNotifyStartUser" @on-change="NotifyStartUser">流程结束后通知发起人</Checkbox>
                                    </div>
                                    <div group='WorkflowBasic'>
                                        <div class="workflow-close" @click="closeWorkflow()">关闭流程</div>
                                    </div>
                                </div>
                            </div>
                            <div id="ActivitySet" class="pro-item">
                                <div class="PropertyTable" target="LineBasic">
                                    <div group="LineBasic" property="DisplayName">
                                        <div class='property-title'>连接线名称</div>
                                        <div class='property-value property-value-input'>
                                            <input type="text" maxlength="32" />
                                        </div>
                                    </div>
                                    <div group="LineBasic" property="LineCode">
                                        <div class='property-title' v-show="showMode=='flow'">连接线编码</div>
                                        <div class='property-value property-value-input' v-show="showMode=='flow'">
                                            <input type="text" maxlength="32" />
                                        </div>
                                    </div>
                                    <div group="LineBasic" property="Formula" style="border-bottom:0;">
                                        <div class='property-title'>节点流转条件</div>
                                        <div class='property-value line'>
                                            <div>
                                                <select ref="selectVal" class="form-control">
                                                    <option value="1">自定义条件</option>
                                                    <!-- <option value="0">使用else条件</option> -->
                                                    <option value="0" v-if="showMode=='flow'">使用接口方式</option>

                                                </select>
                                            </div>
                                            <div class="default">
                                                <div class="description">
                                                    当不满足同级的所有条件时，进入这条连接线下的节点。
                                                </div>
                                                <div class="property-set" @click="setLine('Line')">
                                                    <div class="trigger">设置条件</div>
                                                    <!-- <span class="icon icon-on"></span> -->
                                                </div>
                                            </div>
                                            <div class="custom" v-show="selectFor=='1'">
                                                <div class="description">
                                                    当满足设置条件时，进入这条连接线下的节点；不设 置条件时，默认都会进入这条连接线下的节点。
                                                </div>
                                                <div class="property-set" @click="setLine('Line')">
                                                    <div class="trigger">设置条件</div>
                                                    <!-- <span class="icon icon-on"></span> -->
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="PropertyTable" target="ActivityBasic">
                                    <div group="ActivityBasic" property="ActivityCode">
                                        <div class='property-title'>节点编码</div>
                                        <div class='property-value property-value-input'>
                                            <input type="text" v-if="!isDeveloper" maxlength="32" disabled="disabled" />
                                            <input type="text" v-else maxlength="32" class="needCheckCharacter" />
                                        </div>
                                    </div>
                                    <div group="ActivityBasic" property="DisplayName">
                                        <div class='property-title'>节点名称</div>
                                        <div class='property-value property-value-input'>
                                            <input type="text" maxlength="18" class="displayname needCheckCharacter" />
                                        </div>
                                        <div class="activity-description">
                                            需要多个节点均处理完后才进入下一节点的场景，可用汇合点来实现，先进入汇合点，再统一进入下一节点。
                                        </div>
                                    </div>
                                    <div class="setting-toggle" style="display:none;">
                                        <div class="basic-setting">基础设置</div>
                                        <div class="priority-setting">高级设置</div>
                                    </div>
                                    <!--子流程节点 -->
                                    <div group="SubInstanceTemplate" target="basic-setting" property="SchemaCode">
                                        <div class='property-title'>
                                            选择已有流程
                                            <i data-tip="流转到此节点时，将自动创建子流程，子流程根据自身设置的规则流转" class='icon-tooltip icon-tips'></i>
                                        </div>
                                        <div class='property-value priority'>
                                            <select class="form-control ws">
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div group="Participant" target="basic-setting" property="Participants">
                                        <div class='property-title'>
                                            <span class="content-replace"></span>
                                            <i data-tip="有多个发起人时，会给每个发起人创建一条流程" class='icon-tooltip icon-tips'></i>
                                        </div>
                                        <div class='property-value ' @click="setParticipant()">
                                            <div class="trigger">
                                                <span class="default ">点击设置
                                                    <span class="content-replace"></span>
                                                </span>
                                                <span class="custom" style="display:none;"></span>
                                            </div>
                                            <!-- <span class="icon icon-on"></span> -->
                                        </div>
                                    </div>
                                    <div group="SubInstanceDataMaps" target="basic-setting" property="DataMaps">
                                        <div class='property-title'>
                                            数据流转规则
                                            <i data-tip="父流程与子流程间的数据相互填充" class='icon-tooltip icon-tips'></i>
                                        </div>
                                        <div class='property-value '>
                                            <div class="trigger" @click="setSubinstanceDataMap()">
                                                <span class="default ">设置规则</span>
                                            </div>
                                            <!-- <span class="icon icon-on"></span> -->
                                        </div>
                                    </div>

                                    <div group="EndNotify" target="basic-setting" property="NotifyUrl">
                                        <div class='property-title' v-show="showMode=='flow'">
                                            通知地址
                                            <i data-tip="流程结束通知地址" class='icon-tooltip icon-tips'></i>
                                        </div>
                                        <div class='property-value ' v-show="showMode=='flow'">
                                            <div class="trigger" @click="setLineUrl('End')">
                                                <span class="default ">设置地址</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div group="DataItem" target="basic-setting" property="PropertyPermissions">
                                        <div class='property-title' v-show="showMode!='flow'">节点消息 操作权限
                                            <i data-tip='所有字段均未设置可写时，之前节点已参与过经办的人员在此节点会自动跳过，不再参与' class='icon-tooltip icon-tips'></i>
                                        </div>
                                        <div class='property-value table-wrapper' v-show="showMode!='flow'">
                                            <table style="border-width: 0px; width: 100%">
                                                <tr style="line-height: 12px; border-bottom:1px solid #ddd;">
                                                    <td></td>
                                                    <td style="text-align: left">
                                                        <input type="checkbox" id="AllEnabelShow" />
                                                        <label for="AllEnabelShow">可见</label>
                                                    </td>
                                                    <td style="text-align: left">
                                                        <input type="checkbox" id="AllEnabelEdit" />
                                                        <label for="AllEnabelEdit">可写</label>
                                                    </td>
                                                    <td style="text-align: left">
                                                        <input type="checkbox" id="AllNeeded" />
                                                        <label for="AllNeeded">必填</label>
                                                    </td>
                                                    <td style="text-align: left">
                                                        <input type="checkbox" id="AllEnabelPrint" />
                                                        <label for="AllEnabelPrint">打印</label>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>

                                    <div group="SubInstanceRule" target="priority-setting" property="FinishStartActivity">
                                        <div class='property-title'>
                                            子流程发起后自动提交
                                            <i data-tip="选择“否”，系统仅创建子流程表单;<br/>
                                    选择“是”，系统创建子流程表单并自动提交，进入子流程下一节点。" class='icon-tooltip icon-tips'></i>
                                        </div>
                                        <div class='property-value priority priority-radio'>
                                            <div class="radio-container">
                                                <input type="radio" name='FinishStartActivity' id="fsay" checked />
                                                <label for="fsay">是</label>
                                            </div>
                                            <div class="radio-container">
                                                <input type="radio" name='FinishStartActivity' checked id="fsan" />
                                                <label for="fsan">否</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div group="SubInstanceRule" target="priority-setting" property="Sync">
                                        <div class='property-title'>
                                            父流程在当前子流程结束后才结束
                                        </div>
                                        <div class='property-value priority priority-radio'>
                                            <div class="radio-container">
                                                <input type="radio" id="syncy" name='Sync' value="true" />
                                                <label for="syncy">是</label>
                                            </div>
                                            <div class="radio-container">
                                                <input type="radio" name='Sync' id="syncn" checked value="false" />
                                                <label for="syncn">否</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div group="ActivityRule" target="priority-setting" property="ParticipateMethod">
                                        <div class='property-title' v-if="curActivity && curActivity.ToolTipText==='FillSheet'">节点经办人为多人时，业务处理顺序</div>
                                        <div v-else class='property-title'>
                                            <span>节点审批人为多人时，业务处理顺序</span>
                                            <Tooltip placement="top">
                                                <p slot="content" style="white-space: normal;">当审批人配置里设置有函数时，则此设置无效，强制以顺序依次审批执行</p>
                                                <Icon type="ios-help-outline" color="#437ffe"></Icon>
                                            </Tooltip>
                                        </div>
                                        <div class='property-value priority'>
                                            <select class="form-control" onchange="">
                                                <option value="0">所有经办人同时处理</option>
                                                <option value="1">按经办人设置顺序依次处理</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div group="ActivityRule" target="priority-setting" property="ApproveExit">
                                        <div class='property-title'>节点流转规则</div>
                                        <div class='property-value priority'>
                                            <div class="description" v-show="curActivity">
                                                <span v-if="curActivity && curActivity.ToolTipText==='FillSheet'">{{approveExit=='100%'?'所有':'有'+approveExit}}人提交时进入下一节点</span>
                                                <span v-if="curActivity && curActivity.ToolTipText==='Approve'">{{approveExit=='100%'?'所有':'有'+approveExit}}人同意时进入下一节点，有{{disapproveExit}}人不同意时{{disapproveExitActivityName}}</span>
                                            </div>
                                            <a href="javascript:;" class="trigger" @click="setActivityRule()">修改规则</a>
                                        </div>
                                    </div>

                                    <div group="Notification" target="priority-setting" property="WorkItemDisplayName">
                                        <div class='property-title'>
                                            是否阻塞
                                        </div>
                                        <div class='property-value priority'>
                                            <RadioGroup v-model="Block" size="large" style="width:100%" @on-change="changeBlock">
                                                <Row>
                                                    <Col span='12'>
                                                    <Radio label="true">是</Radio>
                                                    </Col>
                                                    <Col span='12'>
                                                    <Tooltip content="非阻塞和异步通知不能同时进行" theme="light" placement="top">
                                                        <Radio label="false" :disabled="isASync">否</Radio>
                                                    </Tooltip>
                                                    </Col>
                                                </Row>
                                            </RadioGroup>
                                        </div>
                                        <div class='property-title'>
                                            节点消息通知
                                            <i data-tip='可定义流程流转到节点时，<span></span>接收到的消息内容' class='icon-tooltip icon-tips content-replace'></i>
                                        </div>
                                        <div class='property-value priority'>
                                            <Select v-model="notifyCode" @on-change="changeNotifyType">
                                                <Option v-for="item in options" :value="item.value">{{item.Text}}</Option>
                                            </Select>
                                        </div>
                                        <div class='property-title'>
                                            上传参数设置
                                            <i data-tip='可定义流程流转到节点时，<span></span>接收到的消息内容' class='icon-tooltip icon-tips content-replace'></i>
                                        </div>
                                        <div class='property-value '>
                                            <div class="trigger" @click="setNotifyMap()">
                                                <span class="default ">设置参数</span>
                                            </div>
                                            <!-- <span class="icon icon-on"></span> -->
                                        </div>
                                        <div class='property-title'>
                                            通信方式
                                        </div>
                                        <div class='property-value priority'>
                                            <Select v-model="notifyWay" @on-change="changeNotifyWay">
                                                <Option value="sync">同步</Option>
                                                <Option :disabled="isBlock" value="async">异步</Option>
                                            </Select>
                                        </div>
                                    </div>
                                    <!-- <div group="ActivityRule" target="priority-setting" property="AllowedTime">
                            <div class='property-title'>
                                <span v-if="curActivity && curActivity.ToolTipText==='FillSheet'">经办限时</span>
                                <span v-else>审批限时</span>
                                 <i  data-tip='节点不存在必填项时,若设定时间内<span></span>未处理,则系统将<span></span>(设置后半小时内容生效)' class='icon-tooltip icon-tips content-replace'></i>
                            </div>
                            <div class='property-value priority'>
                                <select class="form-control">
                                    <option value="0">不限时</option>
                                    <option
                                      v-for="item in timeControlList"
                                      :value="item.value"
                                    >{{item.label}}</option>
                                </select>
                            </div>
                        </div> -->
                                    <div group="ActivityRule" target="priority-setting">
                                        <div class='property-title'>
                                            <span v-if="curActivity && curActivity.ToolTipText==='Approve'">审批提醒通知发送到发起人</span>
                                            <span v-if="curActivity && curActivity.ToolTipText==='FillSheet'">经办提醒通知发送到发起人</span>
                                        </div>
                                        <div class='property-value priority'>
                                            <div class="form-item">
                                                <div class="item-label">是否开启</div>
                                                <div class="item-content">
                                                    <i-switch v-model="remindToCreater.isopen" size="large" @on-change="changeSendMsgConfig">
                                                        <span slot="open">开启</span>
                                                        <span slot="close">关闭</span>
                                                    </i-switch>
                                                </div>
                                            </div>
                                            <div class="form-item">
                                                <div class="item-label">是否重复</div>
                                                <div class="item-content">
                                                    <i-switch v-model="remindToCreater.repeat" size="large" @on-change="changeSendMsgConfig">
                                                        <span slot="open">重复</span>
                                                        <span slot="close">关闭</span>
                                                    </i-switch>
                                                    <span class="tips" v-show="remindToCreater.repeat === true">最多重复5次</span>
                                                </div>
                                            </div>
                                            <div class="form-item">
                                                <div class="item-label">提醒时间</div>
                                                <div class="item-content">
                                                    <InputNumber v-model="remindToCreater.time" :min="60" @on-change="changeSendMsgConfig"></InputNumber>&nbsp;&nbsp;分钟后
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div group="ActivityRule" target="priority-setting">
                                        <div class='property-title'>
                                            <span v-if="curActivity && curActivity.ToolTipText==='Approve'">审批提醒通知发送到审批人</span>
                                            <span v-if="curActivity && curActivity.ToolTipText==='FillSheet'">经办提醒通知发送到经办人</span>
                                        </div>
                                        <div class='property-value priority'>
                                            <div class="form-item">
                                                <div class="item-label">是否开启</div>
                                                <div class="item-content">
                                                    <i-switch v-model="remindToHanlder.isopen" size="large" @on-change="changeSendMsgConfig">
                                                        <span slot="open">开启</span>
                                                        <span slot="close">关闭</span>
                                                    </i-switch>
                                                </div>
                                            </div>
                                            <div class="form-item">
                                                <div class="item-label">是否重复</div>
                                                <div class="item-content">
                                                    <i-switch v-model="remindToHanlder.repeat" size="large" @on-change="changeSendMsgConfig">
                                                        <span slot="open">重复</span>
                                                        <span slot="close">关闭</span>
                                                    </i-switch>
                                                    <span class="tips" v-show="remindToHanlder.repeat === true">最多重复5次</span>
                                                </div>
                                            </div>
                                            <div class="form-item">
                                                <div class="item-label">提醒时间</div>
                                                <div class="item-content">
                                                    <InputNumber v-model="remindToHanlder.time" :min="60" @on-change="changeSendMsgConfig"></InputNumber>&nbsp;&nbsp;分钟后
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="normal-message">
                                    请先选择节点或连接线
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <participant :schema-code="schemaCode" :title="participantText" :clickType="clickType" :showFlag="participantShow" :showDepartment="currentChoose" :showRole="roleChoose" :formula="participants" :checkFlag="checkMode" :nodeTypeTip="curActivity && curActivity.ToolTipText" @cancel="calcelParticipantSetting" @ok="okParticipantSetting">
        </participant>
        <subinstance :schema-code="subinstanceSchemaCode" :title="subinstanceDataMapText" :showFlag="subinstanceDataMapShow" :rules="subinstanceDataMapRules" :data-items="subDataMapItems" @cancel="cancelSubInstanceDataMap" @ok="okSubInstanceDataMap">
        </subinstance>
        <notifyrule :schema-code="schemaCode" :title="notifyDataMapText" :notifyCode="notifyCode" :showFlag="notifyRuleShow" :dataItems="notifyDataMapItems" @cancel="cancelNotifyDataMap" @ok="okNotifyDataMap">
        </notifyrule>

        <activityrule :title="activityRuleText" :showFlag="activityRuleShow" :activity="curActivity" :activitys="allActivitys" @cancel="cancelActivityRule" @ok="okActivityRule">

        </activityrule>
        <urlRule :showModal='showUrlModal' :notifyType='nodeType' :formula-type="formulaType" :formula-text="formulaText" @cancel="cancelExpressionSetting" @ok="okExpressionSetting" @end="endExpressionSetting" @notify="okEndSetting">
        </urlRule>
        <expression :title="formulaTitle" :showFlag="formulaShow" :formula-type="formulaType" :schema-code="schemaCode" :formula="formula" :formula-text="formulaText" @cancel="cancelExpressionSetting" @ok="okExpressionSetting">
        </expression>
    </div>
</template>

<script>
import DesignerTopNav from "../../components/console/designer-top-nav";
import participant from "../../components/workflowdesigner/participant";
import subinstance from "../../components/workflowdesigner/subinstancedatamap";
import notifyrule from "../../components/workflowdesigner/notifymap";
import activityrule from "../../components/workflowdesigner/activityrule";
import expression from "../../components/workflowdesigner/expression";
import {
    getMenuInfo,
    startWorkflow,
    closeWorkflow,
    GetDataItemsByWorkflowCode
} from "../../service/getData";
import {
    WorkflowMode,
    WorkflowSettings
} from "../../lib/H3/Console/workflow/setting";
import "../../lib/H3/H3Plugins/H3.plugins.system";
import "../../lib/H3/Console/workflow/tinytip";
import "../../lib/H3/Console/workflow/global";
import { init } from "../../lib/H3/Console/workflow/loader";
import "../../lib/plugins/chosen/chosen.jquery.min";
//import '../../lib/H3/Console/workflow/misc';
import "../../lib/H3/tooltip";
import "../../lib/H3/H3Plugins/modal.js";
import HTTP from "../../../../api/form.js";
import urlRule from "../../components/workflowdesigner/urlrule";
//import '../../lib/plugins/chosen/chosen.min.css';
import "../../lib/plugins/DropDownList/DropDownList.js";
//import "../../lib/plugins/DropDownList/DropDownList.css";
// import "src/assets/css/H3/tipbox.css"
// import 'src/assets/css/tools/style.css';
// import 'src/assets/css/workflow/designer.css';
// import 'src/assets/css/workflow/modal.css';
// import '../../lib/plugins/craftpip-jquery-confirm/jquery-confirm.min.css';
import { Message } from "iview";
export default {
    name: "workflow",
    data() {
        return {
            type: "workflow",
            schemaCode: "",
            displayName: "",
            title: "",
            appCode: "",
            shrink: false,
            IsNotifyStartUser: false,
            isNeedStartWF: false,
            nodeType: null,
            icon: null,
            isBoSheet: false,
            isSaasApp: false,
            isSpecialApp: false,
            isDeveloper: false,
            nodeType: "",
            participantText: "参与者设置",
            clickType: "",
            participantShow: false,
            showUrlModal: false,
            currentChoose: true,
            roleChoose: true,
            checkMode: 0,
            participants: null, //每个节点的参与者设置
            workflowMode: WorkflowMode.Designer,
            subinstanceDataMapText: "数据流转规则",
            notifyDataMapText: "数据提交规则",
            subinstanceDataMapShow: false,
            notifyRuleShow: false,
            subinstanceDataMapRules: null,
            subinstanceSchemaCode: null,
            showMode: "",
            selectFor: 1,
            options: [
                // {Text:"不通知",value:"0"},
                // {Text:"通知钉钉",value:"1"},
                // {Text:"通知阿里",value:"2"},
                { Text: "通知外系统", value: "3" },
                { Text: "更新员工档案", value: "4" }
            ],
            subDataMapItems: [
                {
                    itemType: "",
                    Text: "当前表单",
                    Value: "{currentAppRunId}"
                }
            ],
            notifyDataMapItems: [],
            activityRuleText: "节点流转规则",
            activityRuleShow: false,
            curActivity: null,
            allActivitys: [],
            formulaShow: false,
            formulaType: null,
            formulaText: null,
            formula: null,
            formulaTitle: "节点实例名称设置",
            lineSelected: false,
            isSaving: false, // 表单保存状态
            deleteModal: null,
            canUndo: false, //是否可以撤销
            canRedo: false, //是否可以恢复
            highlightRemove: false, //高亮显示删除
            notifyCode: 1,
            Block: "true",
            notifyWay: "sync",
            isASync: false,
            isBlock: false,
            timeControlList: [],
            remindToCreater: {
                // 开启审批提醒通知发送到发起人
                isopen: false,
                repeat: false,
                time: 60
            },
            remindToHanlder: {
                // 开启审批提醒通知发送到审批人
                isopen: false,
                repeat: false,
                time: 60
            },
            remindToCreaterDefault: {
                // 开启审批提醒通知发送到发起人
                isopen: false,
                repeat: false,
                time: 60
            },
            remindToHanlderDefault: {
                // 开启审批提醒通知发送到审批人
                isopen: false,
                repeat: false,
                time: 60
            }
        };
    },
    components: {
        DesignerTopNav,
        participant,
        subinstance,
        activityrule,
        expression,
        notifyrule,
        urlRule
    },
    created() {
        GlobalWorkflowProperties.VueInstance = this;
        //this.schemaCode = window.location.search.split('?')[1].split('=')[1];
        this.schemaCode = this.$route.query.appId;
        this.$store.commit("updateCurrentApp", this.$route.query);
        this.getWorkflowInfo(this.schemaCode);
        // this.startWF();
        this.getTimeControlList(this.$route.query.appId);
        this.showMode = this.$route.query.type;
    },
    methods: {
        async getWorkflowInfo(schemaCode) {
            //let res = await getMenuInfo(schemaCode);
            let param = {};
            param.appId = schemaCode;
            if (sessionStorage.getItem('currentAppType') == "op") {
                param.source = "op";
            }
            HTTP.getMenuInfo(param)
                .then(res => {
                    if (res.ReturnData) {
                        let data = res.ReturnData;
                        this.displayName = data.DisplayName;
                        this.title = this.displayName;
                        //document.title='氚云-流程设计-'+this.displayName;
                        this.appCode = this.$route.query.appId;
                        if (this.$store.state.app.currentApp.type == "flow") {
                            this.isNeedStartWF = false;
                        } else {
                            this.isNeedStartWF = data.IsNeedStartWF;
                        }

                        this.nodeType = data.NodeType;
                        this.icon = data.Icon;
                        this.isDeveloper = data.IsDeveloper;
                        this.isBoSheet = data.IsBoSheet;
                        this.isSaasApp = data.IsSaasApp;
                        this.isDetachApp = data.IsDetachApp;
                        GlobalWorkflowProperties.IsDeveloper = this.isDeveloper;
                        GlobalWorkflowProperties.IsSaasApp = this.isSaasApp;
                        GlobalWorkflowProperties.IsDetachApp = this.isDetachApp;

                        if (!this.isNeedStartWF) {
                            init(this.schemaCode, this.workflowMode, this);
                        }
                    } else {
                        //  错误 弹框提示
                    }
                })
                .catch(err => {})
                .finally(() => {});

            // let res={"Successful":true,"ErrorMessage":null,"Logined":true,"ReturnData":{"AppCode":"Acddd8f7643d946a3a22beb54648b157f","DisplayName":"AAA","IsDeveloper":false,"IsNeedStartWF":false,"NodeType":210,"Icon":"icon-cgfk","IsBoSheet":true,"IsSaasApp":false,"IsDetachApp":false}}
            //  setTimeout(() => {

            //     }, 2000);
        },
        shrinkMenu() {
            this.shrink = !this.shrink;
        },
        startWF() {
            this.start(this.schemaCode);
        },
        async start(schemaCode) {
            let res = { Successful: true };
            if (res.Successful) {
                //window.location.reload();
                this.isNeedStartWF = false;
                init(schemaCode, this.workflowMode, this);
            }
        },
        async close(schemaCode) {
            let res = await HTTP.closeWorkFlow({ appId: schemaCode });
            if (res.code == 0) {
                window.location.reload();
            } else {
                Message.error(res.msg);
            }
        },
        save() {
            this.isSaving = true;
            GlobalWorkflowProperties.WorkflowDocument.PublishWorkflow({
                appId: this.$route.query.appId,
                toStarter: this.remindToCreater,
                toHander: this.remindToHanlder
            })
                .then(result => {
                    if (result.code == 0) {
                        var successMsg = "";
                        var errorMsg = "";
                        var warnMsg = "";
                        if (result.code == 0) {
                            successMsg = result.msg;
                        } else {
                            errorMsg = "发布失败;";
                        }
                        if (successMsg != "") {
                            //$.IShowSuccess('', successMsg);
                            Message.success(successMsg);
                        }
                        if (errorMsg != "") {
                            //$.IShowError('错误', errorMsg);
                            Message.error(errorMsg);
                        }
                        if (warnMsg != "") {
                            $.IShowWarn("警告", warnMsg);
                            //Message.warning(warnMsg);
                        }
                    } else {
                        Message.error(result.msg);
                        //$.IShowError('错误', result.msg);
                    }
                })
                .catch(err => {
                    Message.error(err);
                })
                .finally(() => {
                    this.isSaving = false;
                });
        },
        closeWorkflow() {
            if (this.appCode === "Sys_Workflow") {
                $.IShowWarn("流程中心内流程不允许删除");
                return;
            }
            var that = this;
            var Actions = [
                {
                    Key: "btn_OK",
                    Text: "继续关闭",
                    Theme: "btn_delete",
                    CallBack: function() {
                        that.close(that.schemaCode);
                    }
                },
                {
                    Text: "取消",
                    Theme: "btn_cancel",
                    CallBack: function() {
                        that.deleteModal.hide();
                    }
                }
            ];
            var $contentDelete = $(
                '<div style="text-align:center;"><p><i class="icon-exclamation-circle" style="font-size:52px;color:#f0ad4e;margin-top:9px;"></i></p><p style="font-size:20px;color:#333;margin:5px 0;">关闭流程</p><p style="font-size:14px;color:#666">流转中的数据将停止流转，流转完成的数据其流程信息将丢失</p></div'
            );
            that.deleteModal = new $.IModal({
                Title: "关闭流程",
                Width: 420,
                Height: 233,
                ShowBack: true,
                HasIframe: false,
                Content: $contentDelete,
                ToolButtons: Actions,
                ContentUrl: ""
            });
        },
        undo() {
            if (!this.canUndo) {
                return;
            }
            this.canRedo = true;
            GlobalWorkflowProperties.TraceManager.Undo();
        },
        redo() {
            if (!this.canRedo) {
                return;
            }
            GlobalWorkflowProperties.TraceManager.Redo();
        },
        setSameSize() {
            this.canUndo = true;
            GlobalWorkflowProperties.Workflow.setSameStyle(
                WorkflowSettings.SameStyle.Size
            );
        },
        setMiddle() {
            this.canUndo = true;
            GlobalWorkflowProperties.Workflow.setSameStyle(
                WorkflowSettings.SameStyle.Middle
            );
        },
        setCenter() {
            this.canUndo = true;
            GlobalWorkflowProperties.Workflow.setSameStyle(
                WorkflowSettings.SameStyle.Center
            );
        },
        setSameHorizontalDistance() {
            this.canUndo = true;
            GlobalWorkflowProperties.Workflow.setSameStyle(
                WorkflowSettings.SameStyle.HorizontalDistance
            );
        },
        setSameVerticalDistance() {
            this.canUndo = true;
            GlobalWorkflowProperties.Workflow.setSameStyle(
                WorkflowSettings.SameStyle.VerticalDistance
            );
        },
        setUndo() {
            this.canUndo = true;
        },
        setHightlight(flag) {
            this.highlightRemove = flag;
        },
        showAssistLine() {
            this.lineSelected = !this.lineSelected;
            GlobalWorkflowProperties.Workflow.displayAssistLine();
        },
        removeLineSelected() {
            this.lineSelected = false;
        },
        remove() {
            if (
                GlobalWorkflowProperties.Workflow.selectedActivities.length > 0
            ) {
                for (
                    let i =
                        GlobalWorkflowProperties.Workflow.selectedActivities
                            .length - 1;
                    i >= 0;
                    i--
                ) {
                    var activity =
                        GlobalWorkflowProperties.Workflow.selectedActivities[i];
                    GlobalWorkflowProperties.Workflow.removeActivity(
                        activity.Id
                    );
                }
            }
            for (let line of GlobalWorkflowProperties.Workflow.lines) {
                if (line.isSelected) {
                    GlobalWorkflowProperties.Workflow.removeLine(line.Id);
                }
            }
        },
        NotifyStartUser(val) {
            GlobalWorkflowProperties.IsNotifyStartUser = val;
        },
        changeNotifyType(value) {
            if (
                value != GlobalWorkflowProperties.Wp.CurrentObject["NotifyType"]
            ) {
                this.curActivity.NotifyType = value;
                GlobalWorkflowProperties.Wp.CurrentObject["NotifyType"] = value;
                GlobalWorkflowProperties.Wp.CurrentObject["DataMaps"] = [];
                this.notifyDataMapItems = [];
            }
        },
        changeBlock(value) {
            if (value != GlobalWorkflowProperties.Wp.CurrentObject["Block"]) {
                this.isBlock = value == "false";
                this.curActivity.Block = value;
                GlobalWorkflowProperties.Wp.CurrentObject["Block"] = value;
            }
        },
        changeNotifyWay(value) {
            if (
                value != GlobalWorkflowProperties.Wp.CurrentObject["NotifyWay"]
            ) {
                this.curActivity.NotifyWay = value;
                this.isASync = value == "async";
                GlobalWorkflowProperties.Wp.CurrentObject["NotifyWay"] = value;
            }
        },
        setParticipant() {
            let activity = GlobalWorkflowProperties.Wp.CurrentObject;
            this.clickType = activity.ToolTipText;
            if (activity.ToolTipText === "FillSheet") {
                this.participantText = "经办人";
                this.checkMode = 1;
                this.currentChoose = false;
                this.roleChoose = false;
            } else if (activity.ToolTipText === "Approve") {
                this.participantText = "审批人";
                this.currentChoose = true;
                this.checkMode = 0;
                this.roleChoose = true;
            } else if (activity.ToolTipText === "Circulate") {
                this.participantText = "抄送人";
                this.currentChoose = true;
                this.checkMode = 0;
                this.roleChoose = true;
            } else if (activity.ToolTipText === "SubInstance") {
                this.currentChoose = true;
                this.checkMode = 0;
                this.roleChoose = true;
            }
            this.$store.state.SelectedParticipants = [];

            this.participants =
                GlobalWorkflowProperties.Wp.CurrentObject["Participants"];
            this.participantShow = true;
        },
        calcelParticipantSetting() {
            this.participantShow = false;
        },
        okParticipantSetting(res, displayName) {
            this.participantShow = false;
            GlobalWorkflowProperties.Wp.CurrentObject["Participants"] = res;
            //设置div显示名称
            if (res) {
                var trigger = $("div[property='Participants']").find(
                    "div.trigger"
                );
                $(trigger)
                    .children(".default")
                    .hide();
                $(trigger)
                    .children(".custom")
                    .html(displayName)
                    .show();
            }
        },
        async getDataItemsByWorkflowCode(workflowCode) {
            if (this.$store.state.SubInstanceDataItems[workflowCode]) {
                return;
            }
            let res = await GetDataItemsByWorkflowCode(workflowCode);
            if (res.Successful) {
                let result = res.ReturnData.Data;
                if (result) {
                    this.$store.state.SubInstanceDataItems[workflowCode] =
                        result.DataItems;
                }
            }
        },

        setSubinstanceDataMap() {
            this.subinstanceSchemaCode =
                GlobalWorkflowProperties.Wp.CurrentObject["SchemaCode"];
            if (!this.subinstanceSchemaCode) {
                $.IShowWarn("请先选择已有流程...");
                return;
            }
            this.subinstanceDataMapShow = true;
            this.subinstanceDataMapRules =
                GlobalWorkflowProperties.Wp.CurrentObject["DataMaps"];
        },

        setNotifyMap() {
            this.notifyDataMapItems =
                GlobalWorkflowProperties.Wp.CurrentObject["DataMaps"];
            this.notifyRuleShow = true;
        },

        cancelSubInstanceDataMap() {
            this.subinstanceDataMapShow = false;
        },
        okSubInstanceDataMap(dataMaps) {
            //给子流程数据映射赋值
            this.subinstanceDataMapShow = false;
            GlobalWorkflowProperties.Wp.CurrentObject["DataMaps"] = dataMaps;
        },
        cancelNotifyDataMap() {
            this.notifyRuleShow = false;
            this.notifyDataMapItems = [];
        },
        okNotifyDataMap(dataMaps) {
            //给子流程数据映射赋值
            this.notifyRuleShow = false;
            this.notifyDataMapItems = [];
            GlobalWorkflowProperties.Wp.CurrentObject["DataMaps"] = dataMaps;
            GlobalWorkflowProperties.Wp.CurrentObject[
                "NotifyType"
            ] = this.notifyCode;
            GlobalWorkflowProperties.Wp.CurrentObject["Block"] = this.Block;
        },
        setActivityRule() {
            //涉及到如下几个属性的配置 同意出口、否决出口、 驳回设置、驳回到哪一个节点
            this.curActivity = GlobalWorkflowProperties.Wp.CurrentObject;
            this.allActivitys = GlobalWorkflowProperties.Workflow.activities;
            this.activityRuleShow = true;
        },
        cancelActivityRule() {
            this.activityRuleShow = false;
        },
        okActivityRule(rule) {
            if (this.curActivity.ToolTipText === "FillSheet") {
                //手工环节
                this.curActivity.ApproveExit = rule.ApproveExit;
                this.curActivity.DisapproveExit = 1;
                this.curActivity.DisapproveExitType = 1;
                this.curActivity.DisapproveExitActivityCode = null;
            } else if (this.curActivity.ToolTipText === "Approve") {
                this.curActivity.ApproveExit = rule.ApproveExit;
                this.curActivity.DisapproveExit = rule.DisapproveExit;
                this.curActivity.DisapproveExitType = rule.DisapproveExitType;
                this.curActivity.DisapproveExitActivityCode =
                    rule.DisapproveExitActivityCode;
            }
            this.activityRuleShow = false;
        },
        setNotifyMessage() {
            this.formula =
                GlobalWorkflowProperties.Wp.CurrentObject[
                    "WorkItemDisplayName"
                ];
            this.formulaType = "ActivityName";
            this.formulaTitle = "消息内容";
            this.formulaShow = true;
        },
        cancelExpressionSetting: function() {
            this.showUrlModal = false;
            this.formulaShow = false;
        },
        okEndSetting: function(res) {
            GlobalWorkflowProperties.Wp.CurrentObject["NotifyUrl"] =
                res.formula;
            this.showUrlModal = false;
            this.formulaShow = false;
        },
        endExpressionSetting: function(formulaType, res) {
            GlobalWorkflowProperties.Wp.CurrentObject["Formula"] = res.formula;
            this.showUrlModal = false;
        },
        okExpressionSetting: function(formulaType, res) {
            if (formulaType === "ActivityName") {
                GlobalWorkflowProperties.Wp.CurrentObject[
                    "WorkItemDisplayName"
                ] =
                    res.formula;
                let trigger = $("div[property='WorkItemDisplayName']").find(
                    "div.trigger"
                );
                $(trigger).html(res.formulaText);
            } else {
                GlobalWorkflowProperties.Wp.CurrentObject["Formula"] =
                    res.formula;
                GlobalWorkflowProperties.Wp.CurrentObject["Exclusive"] =
                    res.Exclusive;
                GlobalWorkflowProperties.Wp.CurrentObject["LineNotifyType"] =
                    res.lineNotifyType;
                if (GlobalWorkflowProperties.Wp.CurrentObject.SetLineStyle) {
                    GlobalWorkflowProperties.Wp.CurrentObject.SetLineStyle();
                }
            }
            this.showUrlModal = false;
            this.formulaShow = false;
        },
        setLine(type) {
            //var selectVal = this.$refs.

            if (this.$refs.selectVal.value == 1) {
                this.setLineFormula();
            } else {
                this.setLineUrl(type);
            }
        },
        setLineUrl(type) {
            if (type == "Line") {
                this.formulaText =
                    GlobalWorkflowProperties.Wp.CurrentObject["Formula"];
            } else {
                this.formulaText =
                    GlobalWorkflowProperties.Wp.CurrentObject["NotifyUrl"];
            }
            this.nodeType = type;
            this.showUrlModal = true;
        },
        setLineFormula() {
            this.formula = GlobalWorkflowProperties.Wp.CurrentObject["Formula"];
            this.formulaText = this.formula;
            var params = {
                formula: this.formula,
                appId: this.schemaCode,
                SchemaCodes: null
            };
            if (sessionStorage.getItem('currentAppType') == "op") {
                params.source = "op";
            }
            HTTP.parseFormulaText(params)
                .then(data => {
                    if (data && data.code == 0) {
                        let formulaText = data.ReturnData.FormulaText;
                        this.formulaText = formulaText;
                        if (sessionStorage.getItem('currentAppType') == "op") {
                            this.formulaType = "Flow";
                        } else {
                            this.formulaType = "BOOL";
                        }

                        this.formulaTitle = "节点流转条件";
                        this.formulaShow = true;
                    } else {
                        this.$Message.error("异常" + data.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error(err);
                })
                .finally(() => {});
        },
        async getTimeControlList(appId) {
            var params = { appId: appId };
            if (sessionStorage.getItem('currentAppType') == "op") {
                params.source = "op";
            }
            HTTP.getTimeControl(params).then(res => {
                if (res.ReturnData) {
                    this.timeControlList = res.ReturnData.map(item => ({
                        value: item.controlId,
                        label: item.displayName
                    }));
                }
            });
        },
        // 提醒通知数据改变
        changeSendMsgConfig() {
            GlobalWorkflowProperties.Wp.CurrentObject["sendMsgConfig"] = {
                appId: this.$route.query.appId,
                toStarter: this.remindToCreater,
                toHander: this.remindToHanlder
            };
        }
    },
    computed: {
        approveExit: function() {
            if (this.curActivity) {
                if (this.curActivity.ApproveExit) {
                    return this.curActivity.ApproveExit;
                }
            }
            return 1;
        },
        disapproveExit: function() {
            if (this.curActivity && this.curActivity.DisapproveExit) {
                return this.curActivity.DisapproveExit;
            }
            return 0;
        },
        disapproveExitActivityName: function() {
            if (this.curActivity) {
                if (this.curActivity.DisapproveExitType === 0) {
                    return "驳回到第一个经办节点";
                } else if (this.curActivity.DisapproveExitType === 1) {
                    return "驳回到前一个经办节点";
                } else if (this.curActivity.DisapproveExitType === 3) {
                    return "直接否决流程且不再流转";
                } else {
                    if (this.curActivity.DisapproveExitActivityCode) {
                        for (let activity of GlobalWorkflowProperties.Workflow
                            .activities) {
                            if (
                                activity.ActivityCode ===
                                this.curActivity.DisapproveExitActivityCode
                            ) {
                                if (activity.ToolTipText === "End") {
                                    return "直接结束流程";
                                } else {
                                    return (
                                        "驳回到指定节点:" + activity.DisplayName
                                    );
                                }
                            }
                        }
                    }
                }
            }
            return "回退到前一个经办节点";
        },
        notifyMessageType: function() {
            if (this.curActivity) {
                if (this.curActivity.WorkItemDisplayName) {
                    return 1;
                }
            }
            return 0;
        },
        Block: function() {
            if (this.curActivity) {
                if (this.curActivity.Block) {
                    return this.curActivity.Block;
                }
            }
            return "true";
        },
        notifyType: function() {
            if (this.curActivity) {
                if (this.curActivity.NotifyType) {
                    return this.curActivity.NotifyType;
                }
            }
            return 0;
        }
    },
    watch: {
        curActivity(val) {
            if (val) {
                this.notifyCode = val.NotifyType;
                this.notifyWay = val.NotifyWay;
                this.isASync = this.notifyWay == "async";
                if (val.Block) {
                    this.Block = val.Block
                    this.isBlock = this.Block=="false"
                } else {
                    this.Block = "true";
                }
                if (this.curActivity.ToolTipText === "Notify") {
                    this.changeBlock(this.Block);
                }
                if (
                    this.curActivity.ToolTipText === "Approve" ||
                    this.curActivity.ToolTipText === "FillSheet"
                ) {
                    // 设置初始值
                    if (val.sendMsgConfig) {
                        this.remindToCreater = JSON.parse(
                            JSON.stringify(val.sendMsgConfig.toStarter)
                        );
                        this.remindToHanlder = JSON.parse(
                            JSON.stringify(val.sendMsgConfig.toHander)
                        );
                    } else {
                        this.remindToCreater = JSON.parse(
                            JSON.stringify(this.remindToCreaterDefault)
                        );
                        this.remindToHanlder = JSON.parse(
                            JSON.stringify(this.remindToHanlderDefault)
                        );
                        // 设置sendMsgConfig数据
                        GlobalWorkflowProperties.Wp.CurrentObject[
                            "sendMsgConfig"
                        ] = {
                            appId: this.$route.query.appId,
                            toStarter: JSON.parse(
                                JSON.stringify(this.remindToCreater)
                            ),
                            toHander: JSON.parse(
                                JSON.stringify(this.remindToHanlder)
                            )
                        };
                    }
                }
            } else {
                this.notifyCode = 0;
                this.Block = "true";
                this.notifyWay = "";
            }
        }
    }
};
</script>

<style  lang="less" >
.myContainer {
    position: absolute;
    width: 100% !important;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
}
.wrapper-content {
    width: 100% !important;
    height: 100%;
    background: #fff;
    position: relative;
    div.toolbar {
        width: 100%;
        height: 44px;
        line-height: 44px;
        background: #f2f2f6;
        div.btnSave {
            float: right;
            margin-right: 48px;
            width: 56px;
            margin-top: 9px;
            height: 26px;
            line-height: 26px;
            color: #fff;
            background: #2d7fff;
            border-radius: 2px;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
        }
        ul {
            list-style: none; /* 去掉ul前面的符号 */
            margin: 0px; /* 与外界元素的距离为0 */
            padding: 0px; /* 与内部元素的距离为0 */
            width: auto; /* 宽度根据元素内容调整 */
            li {
                margin-left: 6px;
                height: 44px;
                line-height: 44px;
                color: #5a5a5a;
                float: left;
                font-size: 12px;
                cursor: pointer;
                span {
                    color: #7195b3;
                    margin-right: 4px;
                }
            }
            li:first-child {
                margin-left: 36px;
            }
            li:last-child {
                color: #557691;
                padding-top: 2px;
                span {
                    font-size: 16px;
                }
            }
            li.normal {
                cursor: pointer;
                color: #7195b3;
            }
            li.forbidden {
                cursor: not-allowed;
                span {
                    color: #98a4ae;
                }
            }
            li.vertical-divider {
                margin: 12px 6px 12px 12px;
                height: 20px;
                line-height: 20px;
                border-left: 1px solid #979797;
                font-size: 0;
            }
        }
    }
    .content {
        width: 100% !important;
        // height: 100%;
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 0;
        .content-left {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 130px;

            div.activity-template-container {
                padding: 0 11px;
                // div{
                //   height: 30px;
                //   line-height: 30px;
                //   margin: 5px 0;
                // }
                div.subinstance_contanier div.activity_model,
                div.node_container div.activity_model {
                    height: 30px;
                    line-height: 30px;
                    width: 100%;
                    padding: 0;
                    margin-bottom: 10px;
                    border: none;
                    background: #f0f4ff;
                    span {
                        font-size: 12px;
                        &.activity_model_logo::before {
                            top: 0;
                        }
                    }
                    &:hover {
                        color: #1c1c1c;
                        border: 1px dashed #37adff;
                    }
                }
                div.activity-template-title {
                    color: #1c1c1c;
                    font-size: 14px;
                    margin: 12px 0;
                }
                div.activity-template-node {
                    text-align: center;
                    background: #f0f4ff;
                    height: 30px;
                    line-height: 30px;
                    span {
                        color: #2c2c2c;
                        font-size: 12px;
                    }
                    span.icon {
                        color: #46b2fe;
                        margin-right: 2px;
                    }
                }
            }
        }
        .content-main {
            position: absolute;
            top: 0;
            left: 130px;
            right: 350px;
            bottom: 0;
            margin-left: 2px;
            margin-right: 2px;
            box-shadow: 0 2px 4px 0 #e5edfc;
            border-radius: 2px;
            transition: right 1s;
        }
        .content-right {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            transition: transform 1s;
            width: 350px;
        }
    }
    .form-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .item-label {
            width: 60px;
        }
        .item-content {
            display: flex;
            align-items: center;
        }
        .ivu-input-number {
            height: 28px;
        }
        .tips {
            margin-left: 6px;
        }
    }
}
.wrapper-start {
    position: absolute;
    left: 50%;
    top: 100px;
    width: 300px;
    height: 100px;
    margin-left: -150px;
    text-align: center;
    .btn-start {
        margin: 0 auto;
        width: 118px;
        height: 36px;
        line-height: 36px;
        border-radius: 3px;
        background-color: #2d7fff;
        color: #fff;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
    }
    .wf-description {
        color: #8d8d8d;
        font-size: 13px;
        line-height: 17px;
        margin-top: 11px;
    }
    .wf-help {
        color: #a1a1a1;
        font-size: 11px;
        line-height: 15px;
        margin-top: 11px;
        a {
            color: #2d7fff;
            text-decoration: none;
        }
    }
}
.workflow-close {
    margin-top: 100px;
    width: 100%;
    height: 28px;
    line-height: 28px;
    text-align: center;
    color: #fff;
    background: #f46950;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
}
.normal-message {
    display: none;
    position: absolute;
    top: 50%;
    margin-top: 50%;
    width: 100%;
    text-align: center;
    color: #666;
    font-size: 20px;
}
.h3-lnk-bar {
    height: 3px;
    width: 120px;
    box-sizing: border-box;
    background-color: #2d7fff;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 500;
    transition: transform 0.3s ease-in-out;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
}
.pic--btn-save {
    float: right;
    margin-right: 48px;
    margin-top: 9px;
    font-size: 14px;
}
</style>




// WEBPACK FOOTER //
// src/pages/workflowDesigner/App.vue

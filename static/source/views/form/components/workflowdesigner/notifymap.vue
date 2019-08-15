<template>
<div>
  <Modal v-model="show" @on-cancel="cancel" :title="title" :mask-closable="false" width="700px">
    <div style="margin-left: 26px;margin-right: 26px;">
      <div class="subinstance-wrapper">
        <div v-if="notifyCode != 4" class="title">
          通过规则的设定，可实现与不同的外系统通信。
        </div>
        <div v-if="notifyCode == 3">
          <Input v-model="currentUrl" placeholder="请输入接口类型"></Input>
        </div>
        <div v-else-if="notifyCode == 4">
          <div style="margin-bottom:8px">
            <table>
              <tr>
                  <td style="padding-right:8px">更新员工</td>
                  <td>
                    <div class="notify-update-staff">
                      <div
                        v-if="!$store.state.participant.StaffMsgNode"
                        class="notify-update-staff__item notify-update-staff__placeholder"
                      >请从下方选择人员</div>
                      <div
                        v-if="$store.state.participant.StaffMsgNode"
                        class="notify-update-staff__item"
                      >{{$store.state.participant.StaffMsgNode.DisplayName}}</div>
                    </div>
                  </td>
              </tr>
            </table>
          </div>
          <div style="border:1px solid #eee">
            <Tabs value="user">
                <TabPane label="人员" name="user">
                  <user :check-mode="checkMode" :name-space="userNameSpace" :root="userSource"></user>
                </TabPane>
                <TabPane label="人员控件" name="usercontrols">
                  <participantcontrol :check-mode="checkMode" :source="variableSource" :name-space="controlNameSpace"></participantcontrol>
                </TabPane>
            </Tabs>
          </div>
        </div>
        <div v-else>
          <Select v-model="notifyUrl" @on-change="toggle(notifyUrl)">
            <Option v-for="(value,key) in paramData" :value="key">{{value.name}}</Option>
          </Select>
        </div>
      </div>
      <div v-if="notifyCode == 3 || notifyCode == 4" class="rule-container">
        <div class="parent-child" v-if="isParentToChild" :class="[isParentToChild?'active':'']">
          <div class="title">
          </div>
          <div class="wrapper">
            <table>
              <tr v-for="(rule, index) in paramSelect" :key="rule.ObjectId">
                <td>将表单</td>
                <td>
                  <dropdownlist
                    :width="dataItemWidth"
                    :height="dataItemHeight"
                    :place-holder="parentPlaceHolder"
                    :source="jindieOrUpdateDataItems"
                    :value="rule.ParentDataName"
                    @update="val=>rule.ParentDataName=val"
                  ></dropdownlist>
                </td>
                <td>的值填充给参数</td>
                <td v-if="notifyCode == 3">
                  <Input v-model="rule.ChildDataName" style="width: 100px"></Input>
                </td>
                <td v-if="notifyCode == 4">
                  <Select v-model="rule.ChildDataName" style="width:200px">
                    <Option v-for="item in staffMsgList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </td>
                <td>
                  <span class="remove-param-trash">
                    <Icon type="trash-a" color="red" @click="removeParam(index)"></Icon>
                  </span>
                </td>
              </tr>
            </table>
            <div class="add-new-line-param">
              <Button type="primary" icon="plus-round" size="small" @click="addParam">添加一行</Button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="rule-container">
        <div class="parent-child" v-if="isParentToChild" :class="[isParentToChild?'active':'']">
          <div class="title">
          </div>
          <div class="wrapper">
            <table v-if="showDropDown">
              <tr v-for="rule in paramSelect" :key="rule.ObjectId">
                <td>将表单</td>
                <td>
                  <dropdownlist
                    :width="dataItemWidth"
                    :height="dataItemHeight"
                    :place-holder="parentPlaceHolder"
                    :source="childDataItems"
                    :value="rule.ParentDataName"
                    @update="val=>rule.ParentDataName=val"
                  ></dropdownlist>
                </td>
                <td>的值填充给参数</td>
                <td>
                  <span>{{rule.ChildDataName}}</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="description">
        <span v-if="isChildToParent">注：填充与追加的区别，填充为直接覆盖数据，追加为在原有数据的基础上再补充数据。</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
    <div slot="footer" class="bottom_btns">
      <a class="confirm" @click="ok()">确定</a>
      <a class="cancel" @click="cancel()">取消</a>
    </div>
  </Modal>
</div>
</template>
<script>
import { dingding, alibaba, jindie } from "./constParam.js"
import {NodeType,CheckMode} from '../../config/const';
import { Modal } from "iview";
import dropdownlist from './dropdownlist';
import user from './user';
import participantcontrol from './participantcontrol';
import { GetDataItemsByWorkflowCode, LoadParticipantInfos, LoadNamesByUnitIds } from '../../service/getData';
import HTTP from "../../../../api/form.js"
export default {
  name: 'subinstancedatamap',
  data() {
    return {
      show: false,
      isParentToChild: true,
      isChildToParent: false,
      isParell: false,
      showDropDown: true,
      dataMaps: [],
      paramSelect: [],
      childDataItems: [],
      paramData: [],
      notifyUrl: "",
      currentUrl: "",
      checkMode: CheckMode.Radio,
      userNameSpace: 'STAFFMSG-User',
      controlNameSpace:'STAFFMSG-Control',
      userSource: null,
      variableSource: null,
      parentPlaceHolder: '选择表单字段',
      childPlaceHolder: '选择子流程字段',
      transforPlaceHolder: '传递方式',
      dataItemWidth: 158,
      dataItemHeight: 30,
      transferWidth: 88,
      transferHeight: 30,
      transferSource: [{
        Text: '填充',
        Value: 1
      }, {
        Text: '追加',
        Value: 3
      }],
      staffMsgList: [],
      staffMsgListDefault: [
        { value: 'userName', label: '员工姓名' },
        { value: 'jobNumber', label: '员工工号' },
        { value: 'organId', label: '所属部门id' },
        { value: 'organName', label: '所属部门名称' },
        { value: 'ajustTime', label: '调整日期' },
        { value: 'monthSalary', label: '当前月薪' },
        { value: 'status', label: '在职状态' },
        { value: 'idCardNumber', label: '身份证' },
        { value: 'gender', label: '性别' },
        { value: 'nativePlace', label: '籍贯' },
        { value: 'nation', label: '民族' },
        { value: 'marriageStatus', label: '婚姻状况' },
        { value: 'birthTime', label: '出生日期' },
        { value: 'idCardAddress', label: '身份证地址' },
        { value: 'currentAddress', label: '现住址' },
        { value: 'academy', label: '毕业院校' },
        { value: 'education', label: '学历' },
        { value: 'major', label: '专业' },
        { value: 'educationSource', label: '学历来源' },
        { value: 'emergencyContact', label: '紧急联系人' },
        { value: 'emergencyContactRelation', label: '紧急联系人关系' },
        { value: 'contractType', label: '合同类型' },
        { value: 'contractTime', label: '合同签订日期' },
        { value: 'probationPeriod', label: '试用期' },
        { value: 'contractCurrentTime', label: '合同最新续签日期' },
        { value: 'probationSalary', label: '试用月薪' },
        { value: 'regularSalary', label: '转正月薪' },
        { value: 'bonusScheme', label: '奖金方案' },
        { value: 'entryTime', label: '入职时间' },
        { value: 'turnTime', label: '转正时间' },
        { value: 'leaveTime', label: '离职时间' },
        { value: 'leaveReason', label: '离职原因' },
        { value: 'resumeFile', label: '详细简历附件' },
        { value: 'additionalInformation', label: '附加说明' },
        { value: 'contractFile', label: '合同附件' },
        { value: 'job', label: '岗位' }
      ]
      ///ChildDataName,ParentDataName,Type
    }
  },
  components: {
    Modal,
    dropdownlist,
    user,
    participantcontrol
  },
  props: [
    'title',
    'showFlag',
    'schemaCode',
    'dataItems',
    'rules',
    'notifyCode'
  ],
  mounted() {
    this.initDataMaps();
    this.getVisibleCol();
  },
  methods: {
    initDataMaps() {
      if (this.notifyCode == 1) {
        this.paramData = dingding
      } else if (this.notifyCode == 2) {
        this.paramData = alibaba
      } else if (this.notifyCode == 3 || this.notifyCode == 4) {
        this.paramData = jindie
      }
    },
    changeValue(data, type) {
      let tmp = JSON.parse(JSON.stringify(this.paramData[type]))
      for (var index in data) {
        for (var key in tmp.DataMaps) {
          if (tmp.DataMaps[key].ChildDataName == data[index].ChildDataName) {
            tmp.DataMaps[key].ParentDataName = data[index].ParentDataName
          }
        }
      }
      return tmp.DataMaps
    },
    ok() {
      for (let i = this.paramSelect.length - 1; i >= 0; i--) {
        let rule = this.paramSelect[i];
        this.paramSelect[i].Type = this.currentUrl;
        if (!rule.ParentDataName || !rule.ChildDataName) {
          this.paramSelect.splice(i, 1);
        }
      }
      this.$emit('ok',this.paramSelect);
    },
    cancel() {
      this.$emit('cancel');
    },
    toggle(type) {
      this.paramSelect = this.paramData[type].DataMaps
      this.currentUrl = type
      this.showDropDown = true;
    },
    addParam() {
      this.paramSelect.push({
        ChildDataName: '',
        ParentDataName: ''
      });
    },
    removeParam(index) {
      this.paramSelect.splice(index, 1);
    },
    async getDataItemsByWorkflowCode(workflowCode) {
      HTTP.getDataItemsByWorkflowCode(workflowCode).then((res) => {
        if (res.code == 0) {
          let result = res.data.dataItems;
          if (result) {
            var ret = [];
            for (var i in result) {
              var tmp = {};
              tmp.Text = result[i].displayName;
              tmp.Value = result[i].controlId;
              tmp.Key = result[i].controlKey;
              ret.push(tmp);
            }
            this.childDataItems = ret;
            //this.$store.state.participant.SubInstanceDataItems[workflowCode]=result.DataItems;
          }
        }
      })

    },
    async getRootNodes() {
      try {
        var pram = {appId:this.schemaCode}
        if(sessionStorage.getItem("currentAppType")=="op"){
          pram.source='op'
        }
        const res = await LoadParticipantInfos(pram);
        if (res.code == 0) {
          this.$store.state.participant.RootNode = res.rootNode;
          this.$store.state.participant.Variables = res.Variables;
          this.userSource = $.extend(true, {}, res.rootNode);
          this.variableSource = $.extend(true, [], res.Variables)
            .filter(item => item.controlKey === 26 && item.unitType === 4
            || item.controlId === "CreatedBy");
        } else {
          throw new Error(res.msg)
        }
      } catch (error) {
        this.$message.error(error.message || '数据获取出错');
      }
    },
    async getVisibleCol () {
      try {
        const res = await HTTP.queryVisibleCol();
        if (+res.code === 0 && res.columns && res.columns.length) {
          this.staffMsgList = res.columns.map(item => ({
            value: item.columnName.replace(/_([a-z])/g, (a, b) => {
              return b.toUpperCase();
            }).replace(/_/g, ''),
            label: item.displayName
          }));
        } else {
          throw new Error(res.msg);
        }
      } catch (error) {
        this.staffMsgList = this.staffMsgListDefault;
      }
    }
  },
  computed: {
    excluedDataItems: function() {
      let res = [];
      for (let item of this.dataItems) {
        if (item.Value !== "OwnerId") {
          res.push(item);
        }
      }
      return res;
    },
    jindieOrUpdateDataItems () {
      return this.notifyCode == 3 ? this.childDataItems :
        this.childDataItems.filter(item => [5, 7, 13, 14, 58].includes(item.Key));
    }
  },
  watch: {
    showFlag () {
      this.show = this.showFlag;
      if (this.show) {
        // this.dataMaps = [];
        // if (this.rules && this.rules.length > 0) {
        //   for (let rule of this.rules) {
        //     this.dataMaps.push(rule);
        //   }
        // }
        this.initDataMaps();
        this.getDataItemsByWorkflowCode(this.schemaCode);
        if (this.notifyCode == 4 && !this.userSource) this.getRootNodes();
        if (this.notifyCode == 4) {
          this.$store.state.participant.StaffMsgNode = null;
          this.$store.state.participant.SelectedParticipants = [];
        }
      }
    },
    dataItems (val) {
      this.initDataMaps()
      if (this.dataItems.length > 0) {
        if (this.notifyCode == 3) {
          this.currentUrl = this.dataItems[0].Type;
          this.paramSelect = this.dataItems;
        } else if (this.notifyCode == 4) {
          const id = this.dataItems[0].Type;
          if (id === 'CreatedBy') {
            this.$store.state.participant.StaffMsgNode = {
              NodeType: 0,
              controlId: id,
              DisplayName: '创建人',
              userName: '创建人',
              UnitType: 4
            };
            this.$store.state.participant.SelectedParticipants = [{
              NodeType: 0,
              controlId: id,
              userName: '创建人',
              UnitType: 4
            }];
          } else if (id.indexOf('F') === 0) {
            var pram = {appId:this.schemaCode}
            if(sessionStorage.getItem("currentAppType")=="op"){
              pram.source='op'
            }
            LoadParticipantInfos(pram).then(data => {
              if (data.code == 0) {
                const name = data.Variables.find(item => item.controlId === id).displayName;
                this.$store.state.participant.StaffMsgNode = {
                  NodeType: 1,
                  controlId: id,
                  DisplayName: name,
                  displayName: name,
                  UnitType: 4
                };
                this.$store.state.participant.SelectedParticipants = [{
                  NodeType: 1,
                  controlId: id,
                  displayName: name,
                  UnitType: 4
                }];
              }
            }).catch(err => {
              this.$message.error(err.message || '数据获取出错');
            });
          } else {
            var source=null
              if(sessionStorage.getItem("currentAppType")=="op"){
                source='op'
            }
            LoadNamesByUnitIds({formula:`u(${id})`,appId: this.schemaCode,source:source}).then(data => {
              if (data.code == 0) {
                const name = data.units[`u(${id})`];
                this.$store.state.participant.StaffMsgNode = {
                  NodeType: 0,
                  id,
                  DisplayName: name,
                  userName: name,
                  UnitType: 4
                };
                this.$store.state.participant.SelectedParticipants = [{
                  NodeType: 0,
                  id,
                  userName: name,
                  UnitType: 4
                }];
              } else {
                throw new Error(data.msg);
              }
            }).catch(err => {
              this.$message.error(err.message || '数据获取出错');
            });
          }
          this.currentUrl = id;
          this.paramSelect = this.dataItems;
        } else {
          this.notifyUrl = this.dataItems[0].Type;
          this.paramSelect = this.changeValue(this.dataItems, this.notifyUrl);
        }
      } else {
        this.currentUrl = '';
        this.notifyUrl = null;
        this.paramSelect = [];
      }
    },
    '$store.state.participant.StaffMsgNode' (val) {
      this.currentUrl = val ? val.controlId || val.id : '';
    }
  }
}
</script>

<style lang="less">
div.subinstance-wrapper {
  div.title {
    font-size: 14px;
    color: #666;
  }
  div.div-tab {
    margin-left: 30px;
    margin-top: 24px;
    margin-bottom: 18px;
    overflow: hidden;
    div {
      float: left;
      width: 138px;
      height: 30px;
      line-height: 30px;
      border: 1px dashed #c9c9c9;
      text-align: center;
      cursor: pointer;
      &:first-child {
        border-right: 0;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
      }
      &:last-child {
        border-left: 0;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
      }
      &.active {
        background: #2d7fff;
        color: #fff;
      }
    }
  }

}

div.add-rule {
  color: #2d7fff;
  letter-space: 0.86px;
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 8px;
}

div.description {
  font-size: 12px;
  color: #999;
  margin: 5px 0;
}

div.rule-container {
  display: block;
  height: 228px;
  margin-top: 10px;
  overflow: auto;
  border-radius: 2px;
  box-shadow: 0 0 1px 0 rgba(66, 66, 66, 0.50);
  background: #fff;
  div.footer,
  div.title {
    font-size: 14px;
    color: #333;
    margin: 10px 0 10px 14px;
  }

  table {
    margin-left: 10px;
    td {
      font-size: 14px;
      color: #424242;
      padding: 0 4px;

      &:last-child {
        padding-left: 8px;
        span {
          color: #e97763;
        }
      }

    }
  }
}
</style>

<style lang="less" scoped>
.remove-param-trash {
  cursor: pointer;
}

.add-new-line-param {
  margin-left: 15px;
}

.notify-update-staff {
  width:264px ;
  height: 30px;
  padding-left: 3px;
  line-height: 30px;
  border: 1px dashed #d6d4d4;
  border-radius: 2px;
  padding-top: 3px;

  &__item {
    background-color: #e8f4f8;
    color: #2d7fff;
    width: max-content;
    padding: 0 10px;
    height: 22px;
    line-height: 22px;
  }

  &__placeholder {
    background-color: transparent;
    padding: 0;
    color: #999;
  }
}
</style>

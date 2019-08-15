<template>
 <div class="wrap"> 
    <Modal
      :value="tShow"
      width="1000"
      :mask-closable="false"
      :styles="{top: '20px'}"
      :closable="false">
      <div slot="header">
        <span style="font-size:16px;">个人档案</span>
        <span class="right">
          <span> 档案设置 </span>
          <Icon type="ios-close-empty" @click="cancel" size="30" style="cursor:pointer"/>
        </span>
      </div>
      <div class="box">
        <div class="model">
          <div class="title">
            基本信息
          </div>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>员工姓名</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right dotted-line">
                {{ params.userName }}
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>工号</span>
              </div>
              <div class="right">
                <Input v-model="params.jobNumber" placeholder="" style="width: 300px" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>所属部门</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right dotted-line">
                {{ params.organName }}
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>岗位</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.job" placeholder="" style="width: 300px" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>调整日期</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <DatePicker type="date" :editable="false" v-model="params.ajustTime" placeholder="年-月-日" style="width: 300px"></DatePicker>
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>当前月薪</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.monthSalary" placeholder="" style="width: 300px" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>在职状态</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Select v-model="params.status" style="width:300px" placeholder="--请选择--">
                  <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </Col>
          </Row>
        </div>
        <div class="model">
          <div class="title">
            身份信息
          </div>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>身份证号</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.idCardNumber" placeholder="" style="width: 300px" @on-change="checkId"/>
                <div v-if="!isId" style="color: red">身份证号码不对，请重新输入</div>
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>性别</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Select v-model="params.gender" style="width:300px" placeholder="--请选择--">
                  <Option v-for="item in gender" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>籍贯</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.nativePlace" placeholder="" style="width: 300px" />
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>民族</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.nation" placeholder="" style="width: 300px" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>婚姻</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Select v-model="params.marriageStatus" style="width:300px" placeholder="--请选择--">
                  <Option v-for="item in marriageStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>出生日期</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <DatePicker type="date" :editable="false" v-model="params.birthTime" placeholder="年-月-日" style="width: 300px"></DatePicker>
              </div>
            </Col>
          </Row>
          <Row>
            <div class="left count">
              <span>身份证地址</span>
            </div>
            <div class="right">
              <Input v-model="params.idCardAddress" placeholder="" style="width: 744px" />
            </div>
          </Row>
          <Row>
            <div class="left count">
              <span>现住址</span>
            </div>
            <div class="right">
              <Input v-model="params.currentAddress" placeholder="" style="width: 744px" />
            </div>
          </Row>
        </div>
        <div class="model">
          <div class="title">
            教育信息
          </div>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>毕业院校</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.academy" placeholder="" style="width: 300px" />
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>学历</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Select v-model="params.education" style="width:300px" placeholder="--请选择--">
                  <Option v-for="item in educations" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>专业</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.major" placeholder="" style="width: 300px" />
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>学历来源</span>
              </div>
              <div class="right">
                <Select v-model="params.educationSource" style="width:300px" placeholder="--请选择--">
                  <Option v-for="item in educationSource" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </Col>
          </Row>
        </div>
        <div class="model">
          <div class="title">
            联系信息
          </div>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>紧急联系人</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.emergencyContact" placeholder="" style="width: 300px" />
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>紧急联系人关系</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.emergencyContactRelation" placeholder="" style="width: 300px" />
              </div>
            </Col>
          </Row>
        </div>
        <div class="model">
          <div class="title">
            家庭成员
          </div>
          <Row>
            <Col style="border-bottom:1px solid #eee;height: 36px" span="23">
              <div class="left count">
                <span>家庭成员信息</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Icon type="plus-round" style="font-size:20px;margin:0 20px; line-height:32px" color="#6fd5f7" @click="addfamilyMember"></Icon>
                <Icon type="ios-trash-outline" size="20" color="#6fd5f7" style="line-height:32px" @click="removefamilyMember"/>
              </div>
            </Col>
          </Row>
          <Row>
            <Table border :columns="familyMember" :data="params.familyData"></Table>
          </Row>
        </div>
        <div class="model">
          <div class="title">
            合同信息
          </div>
          <Row>
            <Col span="12">
              <div class="left count">
                <span>合同类型</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="left" style="margin-left:67px">
                <RadioGroup v-model="params.contractType" size="small">
                  <Radio label="固定期限">
                    <span> 固定期限 </span>
                  </Radio>
                  <Radio label="无固定期限">
                    <span> 无固定期限 </span>
                  </Radio>
                </RadioGroup>
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>签订日期</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <DatePicker type="date" :editable="false" v-model="params.contractTime" placeholder="年-月-日" style="width: 300px"></DatePicker>
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>试用期（月）</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.probationPeriod" placeholder="" style="width: 300px" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>最新续签日期</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <DatePicker type="date" :editable="false" v-model="params.contractCurrentTime" placeholder="年-月-日" style="width: 300px"></DatePicker>
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>试用月薪</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.probationSalary" placeholder="" style="width: 300px" />
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>转正月薪</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <Input v-model="params.regularSalary" placeholder="" style="width: 300px" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col>
              <div class="left count">
                <span>当前奖金方案</span>
              </div>
              <div class="right">
                <Input v-model="params.bonusScheme" placeholder="" type="textarea" autosize style="width: 744px" />
              </div>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col>
              <div class="left count">
                <span>合同信息</span>
              </div>
              <div class="right">
                <div class="upload-file" @click="openFiles('contractFile')">
                  <Icon type="plus-round" color="#6fd5f7"></Icon>
                  <span>点击上传文件</span>
                </div>
                <div class="file-show" v-if="params.contractFile.length">
                  <div v-for="(item, index) in params.contractFile" :key="index">
                    <span style="padding-left: 20px"> {{ item.fileName }} </span>
                    <div class="right">
                      <span style="cursor: pointer" @click="downFile(item.fileName, item.fileId)">下载</span>
                      <span style="margin:0 20px;cursor: pointer" @click="removeFileId('contractFile', index)">删除</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div class="model">
          <div class="title">
            入职转正
          </div>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>入职日期</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <DatePicker type="date" :editable="false" v-model="params.entryTime" placeholder="年-月-日" style="width: 300px"></DatePicker>
              </div>
            </Col>
            <Col span="12">
              <div class="left count">
                <span>转正日期</span>
                <Icon type="ios-medical" size="12px" color="red"/>
              </div>
              <div class="right">
                <DatePicker type="date" :editable="false" v-model="params.turnTime" placeholder="年-月-日" style="width: 300px"></DatePicker>
              </div>
            </Col>
          </Row>
        </div>
        <div class="model">
          <div class="title">
            离职信息
          </div>
          <Row :gutter="16">
            <Col span="12">
              <div class="left count">
                <span>离职日期</span>
              </div>
              <div class="right">
                <DatePicker type="date" :editable="false" v-model="params.leaveTime" placeholder="年-月-日" style="width: 300px"></DatePicker>
              </div>
            </Col>
            <Col span="24">
              <div class="left count">
                <span>离职原因</span>
              </div>
              <div class="right">
                <Input v-model="params.leaveReason" type="textarea" placeholder="" style="width: 744px" autosize/>
              </div>
            </Col>
          </Row>
        </div>
        <div class="model">
          <div class="title">
            附加信息
          </div>
          <Row :gutter="16" style="margin-bottom:5px;">
            <Col>
              <div class="left count">
                <span>详细简历附件</span>
              </div>
              <div class="right">
                <div class="upload-file" @click="openFiles('resumeFile')">
                  <Icon type="plus-round" color="#6fd5f7"></Icon>
                  <span>点击上传文件</span>
                </div>
                <div class="file-show" v-if="params.resumeFile.length">
                  <div v-for="(item, index) in params.resumeFile" :key="index">
                    <span style="padding-left: 20px"> {{ item.fileName }} </span>
                    <div class="right">
                      <span style="cursor: pointer" @click="downFile(item.fileName, item.fileId)">下载</span>
                      <span style="margin:0 20px;cursor: pointer" @click="removeFileId('resumeFile', index)">删除</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div class="left count">
                <span>附加说明</span>
              </div>
              <div class="right">
                <Input v-model="params.additionalInformation" placeholder="" type="textarea" autosize style="width: 744px" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div slot="footer">
        <Button
          type="primary" 
          @click="ok">
          保存
        </Button>
        <Button @click="cancel">
          取消
        </Button>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Modal>
    <!-- 选择文件弹窗 -->
    <Modal
      :value="allFilesShow"
      width="1000"
      :mask-closable="false"
      :styles="{top: '20px'}"
      :closable="false">
      <div slot="header">
        <span style="font-size:16px;">个人档案</span>
        <span class="right">
          <Icon type="ios-close-empty" size="26" @click="closeFilesShow" style="cursor:pointer"/>
        </span>
      </div>
      <SelectFiles :allFiles="allFiles" ref="selectFiles" :selectedFiles="selectedFiles" :show="allFilesLoding"/>
      <div slot="footer">
        <Button type="primary" @click="getSelectFiles">
          确定
        </Button>
        <Button @click="closeFilesShow">
          取消
        </Button>
      </div>
    </Modal>
 </div>
</template>

<script>
import {idNumberCheck} from './identityNumbercheck.js'
import organ from '@/api/organ.js'
import SelectFiles from './selectFiles'
import axios from 'axios'
import document from '@/api/document.js'
export default {
  props: ['show', 'information', 'spinShow'],
  data () {
    return {
      params: {
        userId: '',
        userName: '',
        organName: '',
        ajustTime: '', // 调整日期
        jobNumber: '', // 工号
        job: '', // 岗位
        monthSalary: '', // 月薪
        status: '', // 在职状态
        idCardNumber: '', // 身份证号
        gender: '', // 性别
        nativePlace: '', // 籍贯
        nation: '', // 民族
        marriageStatus: '', // 婚姻
        birthTime: '', // 出身日期
        idCardAddress: '', // 身份证地址
        currentAddress: '', // 现地址
        academy: '', // 毕业学校
        education: '', // 学历
        major: '', // 专业
        educationSource: '', // 学历来源
        emergencyContact: '', // 紧急联系人
        emergencyContactRelation: '', // 紧急联系人关系
        contractType: '', // 合同类型
        contractTime: '', // 签订日期
        probationPeriod: '', // 试用期
        contractCurrentTime: '', // 续签
        probationSalary: '', // 试用月薪
        regularSalary: '', // 转正月薪
        bonusScheme: '', // 奖金方案
        entryTime: '', // 入职日期
        turnTime: '', // 转正日期
        leaveTime: '', // 离职日期
        leaveReason:'', // 离职原因
        resumeFile: [], // 简历地址
        additionalInformation: '', // 附件说明
        contractFile: [], // 合同附件
        familyData: [
        ], //家庭成员数据
      },
      tShow: false,
      status: [
        { value: '在职', label: '在职' },
        { value: '离职', label: '离职' },
      ],
      gender: [
        { value: '男', label: '男' },
        { value: '女', label: '女' },
      ],
      marriageStatus: [
        { value: '未婚', label: '未婚' },
        { value: '已婚', label: '已婚' }
      ],
      isId: true,
      educations: [
        { value: '高中', label: '高中' },
        { value: '大专', label: '大专' },
        { value: '本科', label: '本科' },
        { value: '硕士', label: '硕士' },
        { value: '博士', label: '博士' },
      ],
      educationSource: [
        { value: '学信网', label: '学信网' },
      ],
      familyMember: [
        {
          key: 'number',
          width: 70,
          renderHeader: (h, params) => {
            return h('div'), [
              h('span', '序列')
            ]
          },
          render: (h, params) => {
            return h('div', [
              h('Checkbox', {
                props: {
                  value: params.row.checkbox
                },
                on: {
                  'on-change':(e)=> {
                    this.params.familyData[params.row.number - 1].checkbox = e
                  }
                }
              }),
              h('span', {
                props: {
                  value: params.row.number
                },
                style: {
                  margin: '0 0 0 5px'
                },
              }, params.row.number),
            ]);
          }
        },
        {
          key: 'relationship',
          renderHeader: (h, params) => {
            return h('div'), [
              h('span', '关系'),
              h('Icon', {
                props: {
                  type: 'ios-medical'
                },
                style: {
                  color: 'red'
                }
              }),
            ]
          },
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.relationship
                },
                on: {
                  'on-blur':(e)=> {
                    this.params.familyData[params.row.number - 1].relationship = e.target.value
                  }
                }
              })
            ]);
          }
        },
        {
          key: 'name',
          renderHeader: (h, params) => {
            return h('div'), [
              h('span', '姓名'),
              h('Icon', {
                props: {
                  type: 'ios-medical'
                },
                style: {
                  color: 'red'
                },
              }),
            ]
          },
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.name
                },
                on: {
                  'on-blur':(e)=> {
                    this.params.familyData[params.row.number - 1].name = e.target.value
                  }
                }
              })
            ]);
          }
        },
        {
          key: 'job',
          renderHeader: (h, params) => {
            return h('div'), [
              h('span', '职务'),
              h('Icon', {
                props: {
                  type: 'ios-medical'
                },
                style: {
                  color: 'red'
                }
              }),
            ]
          },
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.job
                },
                on: {
                  'on-blur':(e)=> {
                    this.params.familyData[params.row.number - 1].job = e.target.value
                  }
                }
              })
            ]);
          }
        }
      ],
      allFilesShow: false,
      allFilesLoding: true,
      parFileId: -1,
      userId: true,
      allFiles: [],
      selectedFiles: {},
      activeFiles: ''
    }
  },
  components: {
    SelectFiles
  },
  watch: {
    show() {
      this.tShow = this.show
    },
    information() {
      this.params = this.information
    }
  },
  computed:{
    required() {
      if (this.params.userName && this.params.organName && this.params.job && this.params.monthSalary && this.params.ajustTime && this.params.status && this.params.idCardNumber && this.params.gender && this.params.nativePlace && this.params.nation && this.params.marriageStatus && this.params.birthTime && this.params.academy && this.params.education && this.params.major && this.params.emergencyContact && this.params.emergencyContactRelation && this.params.contractType && this.params.contractTime && this.params.probationPeriod && this.params.contractCurrentTime && this.params.probationSalary && this.params.regularSalary && this.params.entryTime && this.params.turnTime && this.params.familyData && this.params.familyData[0] && this.params.familyData[0].relationship && this.params.familyData[0].name && this.params.familyData[0].job) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ok () {
      if (this.isId) {
        this.setPersonalFiles()
      } else {
        this.$Message.error('身份证信息错误');
      }
    },
    cancel () {
      this.$emit('personalFilesShow', false)
      this.isId = true
    },
    // 修改个人档案
    setPersonalFiles() {
      if (!this.required) {
        this.$Message.error('带*的必填');
        return
      }
      let params = Object.assign({}, this.params)
      params.familyData = JSON.stringify(params.familyData)
      params.resumeFile = params.resumeFile.map(item => item.fileId).join(';')
      params.contractFile = params.contractFile.map(item => item.fileId).join(';')
      Object.keys(params).forEach(key => {
        if (params[key] instanceof Date) {
          params[key] = new Date(params[key]).Format('yyyy-MM-dd')
        }
      })
      organ.save(params).then(res => {
        if (res.code == 0) {
          this.$emit('personalFilesShow', false)
          this.tShow = false
          this.$Message.success('保存成功');
        } else {
          this.$Message.error(res.msg);
        }
      }).catch((e) => {
        this.$Message.error('This is err');
      }).finally(() => {
      });
    },
    // 增加家庭成员
    addfamilyMember () {
      if (!this.params.familyData) {
        this.params.familyData = []
      }
      this.params.familyData.push({
          number: this.params.familyData.length + 1,
          relationship: '',
          name: '',
          job: ''
      })
    },
    // 移除家庭成员
    removefamilyMember () {
      this.params.familyData = this.params.familyData.filter(item => !item.checkbox)
    },
    // 判断身份证格式是否正确
    checkId () {
      this.isId = idNumberCheck(this.params.idCardNumber)
    },
    removeFileId(name, index) {
      this.params[name].splice(index, 1)
    },
    downFile(name, id){
      let params = {
        fileId: id,
        fileName: name,
        path: '/ctg-workflow/'
      }
      document.download(params)
    },
    // 获取一级文件名
    openFiles(name) {
      this.allFiles = []
      this.allFilesShow = true
      this.selectedFiles = this.params[name]
      this.activeFiles = name
      this.allFilesLoding = true
      var params = {
        needUser: this.userId,
        parFileId: this.parFileId
      }
      document.getSubFiles(params).then(res => {
        if (res.code == 0) {
          res.info.forEach(item => {
            var data = {
              fileId: item.fileId,
              fileName: item.fileName,
              type: item.type ,
            }
            if (item.type === '1') {
              data.loading = false,
              data.children = []
            }
            this.allFiles.unshift(data)
          })
        } else {
          this.$Message.error('获取文件列表失败');
        }
      }).catch(() => {
        this.$Message.error('获取文件列表失败');
      }).finally(() => {
        this.allFilesLoding = false
      })
    },
    // 关闭选择文件框
    closeFilesShow() {
      this.$refs.selectFiles.selected = this.params[this.activeFiles]
      this.allFilesShow = false
    },
    getSelectFiles() {
      this.params[this.activeFiles] = this.$refs.selectFiles.selected
      this.allFilesShow = false
    }
  }
}
</script>
<style lang='less' scoped>
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .dotted-line{
    width: 300px;
    border: 1px solid #eee;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #333;
    border-radius: 5px;
  }
  .file-show {
    width: 744px;
    border:2px solid #e5e5e5;
    border-radius: 5px;
    >div{
      border-bottom:1px solid #e5e5e5;
      height:30px;
      line-height: 30px;
      .right{
        height:30px;
        line-height: 30px;
      }
    }
    &:nth-last-child(1){
      border-bottom:0
    }
  }
  .box{
    width: 90%;
    margin: 0 auto;
    line-height: 40px;
    position: relative;
    .model{
      margin-bottom: 30px;
      .title{
        border-bottom:1px solid #eee;
        height: 26px;
        font-weight: 900;
        margin-bottom: 30px
      }
      .count{
        line-height: 36px;
      }
      .upload-file{
        cursor: pointer;
        padding:10px 0;
        width:744px;
        background:#F9FAFB;
        text-align:center;
        border-radius:5px;
        border:1px dashed #eee;
      }
    }
    .spin{
      position: absolute;
      width: 100%;
      height: 100px;
    }
  }
</style>
<style lang='less'>
  .ivu-modal-body{
    .box{
      .model{
        .ivu-row{
          .ivu-input-wrapper{
            .ivu-input{
              padding-left: 10px !important
            }
          }
        }
      }
    }
  }
</style>


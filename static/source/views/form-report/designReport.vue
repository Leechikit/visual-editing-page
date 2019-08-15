<template>
  <div style="min-height: 450px">
    <div class="design-report-control__container">
      <div class="design-report-control__pane">
        <Form :model="formItem" :label-width="100" ref="formValidate">
          <Row>
            <Col span="8">
              <FormItem label="图表名称" prop="name">
                <Input
                  style="width: 200px"
                  v-model="formItem.name"
                  placeholder="请输入名称"
                />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="图表类型" prop="reportType">
                <Select v-model="formItem.reportType" style="width:200px">
                  <Option value="1">折线图</Option>
                  <Option value="2">柱状图</Option>
                  <Option value="3">饼图</Option>
                  <Option value="4">明细表</Option>
                  <Option value="5">漏斗</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem label="描述" prop="desc">
                <Input
                  v-model="formItem.remark"
                  :rows="4"
                  placeholder="请输入描述"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="选择数据源" prop="source">
                <Button
                  v-if="!formItem.baseSqlConfig.source"
                  icon="ios-plus-empty"
                  type="dashed"
                  size="small"
                  @click="sourceModalVisible = true"
                >请选择</Button>
                <Tag
                  v-else
                  closable
                  color="green"
                  type="border"
                  :fade="false"
                  @on-close="handleCloseSource"
                >{{ formItem.baseSqlConfig.source.title }}</Tag>
              </FormItem>
            </Col>
            <Col span="16">
              <FormItem label="添加关联表单" prop="sourceAssos">
                <Tag
                  v-for="item in formItem.baseSqlConfig.sourceAssos"
                  :key="item.id"
                  :fade="false"
                  :name="item.id"
                  color="green"
                  type="border"
                  closable
                  @on-close="handleCloseSourceAsso(item.id)"
                >
                  <span @click="handleEditAssoApp(item)">{{ item.title }}</span>
                </Tag>
                <Button
                  icon="ios-plus-empty"
                  type="dashed"
                  size="small"
                  @click="addAssoApp"
                >请添加</Button>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col v-if="['1', '2', '3', '5'].includes(formItem.reportType)" span="8">
              <FormItem label="布局列" prop="distributes">
                <form-item-content
                  v-model="formItem.baseSqlConfig.distributes"
                  :apps="(formItem.baseSqlConfig.source ?
                    [formItem.baseSqlConfig.source] : [])
                    .concat(formItem.baseSqlConfig.sourceAssos)"
                  @closeTag="handleCloseDistributeTab($event)"
                ></form-item-content>
              </FormItem>
            </Col>
            <Col v-if="['1', '2', '3', '5'].includes(formItem.reportType)" span="8">
              <FormItem label="维度列" prop="dimensions">
                <form-item-content
                  v-model="formItem.baseSqlConfig.dimensions"
                  :apps="selectApps"
                  @closeTag="handleCloseDimensionTab($event)"
                ></form-item-content>
              </FormItem>
            </Col>
            <Col v-if="['1', '2', '3', '5'].includes(formItem.reportType)" span="8">
              <FormItem label="统计列" prop="statistics">
                <form-item-content
                  v-model="formItem.baseSqlConfig.statistics"
                  :apps="selectApps"
                  @closeTag="handleCloseStatisticTab($event)"
                ></form-item-content>
              </FormItem>
            </Col>
            <Col v-if="['4'].includes(formItem.reportType)" span="24">
              <FormItem label="统计列" prop="statistics">
                <form-item-content
                  v-model="formItem.baseSqlConfig.statistics"
                  :apps="selectApps"
                  :multiple="true"
                  @closeTag="handleCloseStatisticTab($event)"
                ></form-item-content>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="配置查询条件" prop="source">
                <Tag
                  v-for="(item, index) in displayCondition"
                  :key="index"
                  class="cont-tag"
                  color="green"
                  type="border"
                  :fade="false"
                >{{ item.fieldAlias }}</Tag>
                <Button
                  icon="ios-plus-empty"
                  type="dashed"
                  size="small"
                  @click="openCondModal"
                >点击配置</Button>
              </FormItem>
            </Col>
          </Row>          
        </Form>
      </div>
    </div>
    <div class="design-report-handle">
      <Row  style="padding-top: 10px;">
        <Col span="10">
          <RadioGroup v-model="chartMode" type="button" size="small">
            <Radio label="simple">简单模式</Radio>
            <Radio label="advance">高级模式</Radio>
          </RadioGroup>
          <p
            v-if="chartMode === 'simple'"
            class="mode-tip"
          >简单模式下在表单信息变更后必须点击按钮生成图表模型数据</p>
          <p
            v-if="chartMode === 'advance'"
            class="mode-tip"
          >高级模式下可根据表单信息获取基础SQL并在编辑后执行SQL</p>
        </Col>
        <Col span="14">
          <Button
            v-if="chartMode === 'simple'"
            type="primary"
            :loading="loading"
            @click="getSqlAndExec"
          >生成图表模型数据</Button>
        </Col>
      </Row>
      <div v-if="chartMode === 'advance'">
        <Row class="action-btn-group">
          <ButtonGroup shape="circle">
            <Button @click="getBasicSQL">获取基础SQL</Button>
          </ButtonGroup>
        </Row>
        <Row>
          <Col class="sql-editor">
            <editor
              v-model="formItem.sqlText"
              :options="editorOption"
              theme="xcode"
              lang="sql"
              height="280px"
              width="100%"
            ></editor>
          </Col>
        </Row>
        <Row class="action-btn-group">
          <ButtonGroup shape="circle">
            <Button @click="execSql">执行SQL</Button>
          </ButtonGroup>
        </Row>
        <can-edit-table
          :currentNum='currentNum'
          refs="table3"
          v-model="editIncellData"
          :hover-show="true"
          :edit-incell="true"
          :columns-list="editIncellColumns"
        ></can-edit-table>
      </div>
    </div>
    <Modal
      :value="sourceModalVisible"
      :mask-closable="false"
      :footer-hide="true"
      class="design-report-modal"
      @on-cancel="sourceModalVisible = false"
    >
      <div class="copy-app-content">
        <app-tree @input="selectDataSource"></app-tree>
      </div>
    </Modal>
    <Modal
      :value="assoModalVisible"
      :mask-closable="false"
      :footer-hide="true"
      class="design-report-modal"
      @on-cancel="assoModalVisible = false"
    >
      <div class="copy-app-content">
        <app-tree @input="addSourceAsso"></app-tree>
      </div>
    </Modal>
    <Modal
      :value="condModalVisible"
      :mask-closable="false"
      :width="800"
      @on-cancel="condModalVisible = false"
      title="设置自定义查询条件"
    >
      <div class="cond-cont">       
        <Card v-for="(item, index) in conditions" dis-hover>
          <p slot="title">自定义查询条件 {{index+1}}</p>
          <a href="#" slot="extra" @click="deleteCondition(index)" class="cond-del-btn">
            <Icon type="ios-trash-outline" color="#e53e2c" size="18" />
            <span>移除此查询</span>
          </a>
          <Form :model="item" :label-width="100" ref="formValidate">
          <Row>
            <Col span="12">
              <FormItem label="查询条件名称" prop="fieldAlias">
                <Tooltip content="显示在图表上的自定义查询条件名称" placement="right">
                  <Icon color="#999" size="13" type="help-circled"></Icon>
                </Tooltip>
                <Input
                  style="width: 200px"
                  v-model="item.fieldAlias"
                  placeholder="请输入查询条件名称"
                />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="查询条件字段" prop="fieldAttr">
                <Tooltip content="自定义查询条件对应的数据源字段" placement="right">
                  <Icon  color="#999" size="13" type="help-circled"></Icon>
                </Tooltip>
                <form-item-content
                  :style="'width: 150px'"
                  v-model="item.fieldAttr"
                  :apps="selectApps"
                  @closeTag="handleCloseCondTab($event, index)"
                ></form-item-content>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12" offset="12">
              <FormItem label="手输查询条件" prop="fieldAttr">
                <Tooltip content="" placement="right">
                  <Icon  color="red" size="13" type="alert-circled"></Icon>
                  <Button 
                    type="text" 
                    v-if="!item.fieldAttrExtraOn"
                    @click="item.fieldAttrExtraOn = true">开启手输模式</Button>
                  <div slot="content">
                    <p>请注意！输入内容会优先覆盖查询条件字段</p>
                    <p>非技术人员无需使用</p>
                  </div>
                </Tooltip>
                <Input
                  v-if="item.fieldAttrExtraOn"
                  style="width: 200px"
                  v-model="item.fieldAttrExtra"
                  placeholder="非技术人员无需使用"
                />
              </FormItem>              
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="查询条件类型" prop="fieldType">
                <Tooltip content="显示在图表上的控件类型" placement="right">
                  <Icon  color="#999" size="13" type="help-circled"></Icon>
                </Tooltip>
                <Select v-model="item.fieldType" style="width:200px">
                  <Option value="1">数值类型</Option>
                  <Option value="2">字符类型</Option>
                  <Option value="3">时间类型</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="查询类型" prop="fieldQryType">
                <Select v-model="item.fieldQryType" style="width:200px">
                  <Option value="1">等于</Option>
                  <Option value="2">不等于</Option>
                  <Option value="3">大于等于</Option>
                  <Option value="4">小于等于</Option>
                  <Option value="5">模糊查询</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
        </Card>
        <div>
          <a href="javascript:;" @click="addNewCondition" class="cond-new-btn">+新增查询条件</a>
        </div>
      </div>
      <div slot="footer">
        <Button type="text" @click="condModalVisible = false">取消</Button>
        <Button type="primary" @click="handleConditions">确认</Button>
      </div>
    </Modal> 
    <Modal
      :value="assoRelationVisible"
      :mask-closable="false"
      :width="800"
      title="设置关联关系"
      @on-cancel="assoRelationVisible = false"
    >
      <div v-for="(relation, index) in relations" :key="index" class="relatipon-item">
        <span>{{associationApp.title}}</span>
        <Select v-model="relation.control" style="width:200px">
          <Option
            v-for="item in associationAppControls"
            :value="item.id"
            :key="item.id"
          >{{ item.title }}</Option>
        </Select>
        <span>值等于</span>
        <Select
          v-model="relation.equalAppId"
          @on-change="relation.equalControl = ''"
          style="width:200px"
        >
          <Option
            v-for="item in selectAssoApps"
            :value="item.id"
            :key="item.id"
          >{{ item.title }}</Option>
        </Select>
        <Select v-model="relation.equalControl" style="width:200px">
          <Option
            v-for="item in relationSelectOptions(relation.equalAppId)"
            :value="item.id"
            :key="item.id"
          >{{ item.title }}</Option>
        </Select>
        <span
          class="delete-relation"
          @click="deleteRelation(index)"
        >
          <Icon type="ios-trash-outline" color="#e53e2c" size="24" />
        </span>
      </div>
      <div>
        <span @click="addNewRelation" class="new-relation-btn">+新增关联关系</span>
      </div>
      <div slot="footer">
        <Button type="text" @click="assoRelationVisible = false">取消</Button>
        <Button type="primary" @click="handleAssoRelation">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import canEditTable from './canEditTable.vue';
import editor from 'vue2-ace-editor';
import 'brace/mode/sql';
import 'brace/theme/xcode';
import HTTP from '@/api/report.js';
import HTTP_FORM from '@/api/form.js';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import appTree from '@/views/flow-manager/components/apptree.vue';
import FormItemContent from './FormItemContent.vue';

export default {
  name: 'designReport',
  data () {
    return {
      content: '',
      editorOption: {
        showPrintMargin: false
      },
      formItem: {
        name: '',
        reportType: '',
        remark: '',
        sqlText: '',
        baseSqlConfig: {
          source: null,
          sourceAssos: [],
          distributes: [],
          statistics: [],
          dimensions: []
        },
        sqlCondition: '[]'
      },
      loading: false,
      chartMode: 'simple',
      sourceModalVisible: false,
      assoModalVisible: false,
      assoRelationVisible: false,
      associationApp: {},
      associationAppControls: [],
      relations: [],
      conditions: [{
        fieldAlias: '',
        fieldAttr: [],
        fieldType: '',
        fieldQryType: ''
      }],
      condModalVisible: false,
      chartData: null,
      editIncellData: [],
      editIncellColumns: [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        }, {
          title: '应用名',
          align: 'center',
          key: 'name',
          width: 120
        }, {
          title: '标题',
          align: 'center',
          width: 160,
          key: 'text',
          editable: true
        }, {
          title: '类型',
          align: 'center',
          width: 160,
          key: 'type',
          editable: true
        }, {
          title: '数据类型',
          align: 'center',
          key: 'dataType',
          editable: true
        }, {
          title: '精度',
          align: 'center',
          key: 'decimals',
          editable: true
        }, {
          title: '排序类型',
          align: 'center',
          key: 'sortType',
          editable: true
        }, {
          title: '操作',
          align: 'center',
          width: 120,
          key: 'handle',
          handle: ['delete']
        }
      ],
      ruleValidate: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],

        reportType: [
          { required: true, message: '请选择报表类型', trigger: 'change' }
        ]
      }
    };
  },
  components: {
    editor,
    canEditTable,
    appTree,
    FormItemContent
  },
  props: ['currentNum', 'itemData', 'metaColumns'],
  mounted () {
    if (this.itemData && this.itemData.name) {
      this.formItem = Object.assign({}, this.formItem, this.itemData);
      this.$store.commit('updateReportValue', {
        index: this.currentNum,
        value: this.formItem // 引用同一个对象，数据的改动自动反映到 store
      });
      if (this.metaColumns && this.metaColumns.length > 0) {
        this.editIncellData = this.changeValue(this.metaColumns);
      }
    }
  },
  methods: {
    ...mapMutations('dragModule', []),
    execSql () {
      var vm = this;
      HTTP.execSqlText(vm.formItem.sqlText, JSON.stringify(this.getBasicFormItem()))
        .then(data => {
          if (data.code === '0') {
            vm.$Message.success('查询成功');
            vm.editIncellData = this.changeValue(data.result);
            vm.$store.commit('setReportData', {
              index: this.currentNum,
              data: this.editIncellData,
              value: this.formItem
            });
          } else {
            vm.$Message.error({ content: data.msg, duration: 3 });
          }
        })
        .catch(err => {
          vm.$Message.error({ content: err.msg, duration: 3 });
        });
    },
    changeValue (value) {
      const item = JSON.parse(JSON.stringify(value));
      for (var i = 0; i < item.length; i++) {
        if (item[i].type === 1) {
          item[i].type = '布局列';
        } else if (item[i].type === 2) {
          item[i].type = '维度列';
        } else if (item[i].type === 3) {
          item[i].type = '统计列';
        } else if (item[i].type === 4) {
          item[i].type = '计算列';
        }
        if (item[i].sortType === 0) {
          item[i].sortType = '默认';
        } else if (item[i].sortType === 1) {
          item[i].sortType = '数字优先升序';
        } else if (item[i].sortType === 2) {
          item[i].sortType = '数字优先降序';
        } else if (item[i].sortType === 3) {
          item[i].sortType = '字符优先升序';
        } else if (item[i].sortType === 4) {
          item[i].sortType = '字符优先降序';
        }
      }
      return item;
    },
    revertValue (item) {
      item.forEach((value) => {
        if (value.type === '布局列') {
          value.type = 1;
        } else if (value.type === '维度列') {
          value.type = 2;
        } else if (value.type === '统计列') {
          value.type = 3;
        } else if (value.type === '计算列') {
          value.type = 4;
        }
        if (value.sortType === '默认') {
          value.sortType = 0;
        } else if (value.sortType === '数字优先升序') {
          value.sortType = 1;
        } else if (value.sortType === '数字优先降序') {
          value.sortType = 2;
        } else if (value.sortType === '字符优先升序') {
          value.sortType = 3;
        } else if (value.sortType === '字符优先降序') {
          value.sortType = 4;
        }
      });
      return item;
    },
    relationSelectOptions (equalAppId) {
      const app = this.formItem.baseSqlConfig.sourceAssos
        .concat(this.formItem.baseSqlConfig.source || [])
        .find(item => item.id === equalAppId);
      return app ? app.children : [];
    },
    async selectDataSource (apps) {
      if (apps.length === 1) {
        try {
          const res = await HTTP_FORM.getFormInfo({ appId: apps[0].id });
          if (res.code === '0') {
            this.formItem.baseSqlConfig.source = {
              children: res.ReturnData.OtherChildNodes[0].children,
              ...apps[0]
            };
            this.sourceModalVisible = false;
          } else {
            throw new Error(res.msg);
          }
        } catch (err) {
          this.$Message.error(err.message || '获取表单内容失败');
        }
      }
    },
    addAssoApp () {
      if (this.formItem.baseSqlConfig.source) this.assoModalVisible = true;
      else this.$Message.info('请先选择数据源');
    },
    addSourceAsso (apps) {
      if (
        apps.length === 1 &&
        this.formItem.baseSqlConfig.sourceAssos.every(item => item.id !== apps[0].id) &&
        this.formItem.baseSqlConfig.source.id !== apps[0].id
      ) {
        this.$Spin.show();
        HTTP_FORM.getFormInfo({ appId: apps[0].id }).then(res => {
          if (res.code === '0') {
            this.associationApp = apps[0];
            this.associationAppControls =
              res.ReturnData.OtherChildNodes[0].children;
            this.assoRelationVisible = true;
            this.relations = [{
              rootAppId: apps[0].id,
              control: '',
              equalAppId: '',
              equalControl: ''
            }];
          } else {
            this.$Message.error('设置关联表单出错');
          }
          this.$Spin.hide();
        }).catch(err => {
          this.$Message.error(err.msg || '获取表单内容失败');
        });
      } else if (apps.length === 1) {
        this.$Message.info('当前表单已被使用');
      }
    },
    handleCloseSource () {
      this.formItem.baseSqlConfig.source = null;
      this.formItem.baseSqlConfig.sourceAssos = [];
      this.formItem.baseSqlConfig.distributes = [];
      this.formItem.baseSqlConfig.dimensions = [];
      this.formItem.baseSqlConfig.statistics = [];
    },
    handleCloseSourceAsso (id) {
      this.formItem.baseSqlConfig.statistics = this.formItem.baseSqlConfig.statistics.filter(
        item => item.indexOf(id) === -1
      );
      this.formItem.baseSqlConfig.distributes = this.formItem.baseSqlConfig.distributes.filter(
        item => item.indexOf(id) === -1
      );
      this.formItem.baseSqlConfig.dimensions = this.formItem.baseSqlConfig.dimensions.filter(
        item => item.indexOf(id) === -1
      );
      this.formItem.baseSqlConfig.sourceAssos = this.formItem.baseSqlConfig.sourceAssos.filter(
        item => item.id !== id
      );
    },
    handleAssoRelation () {
      if (this.relations.every(
        item => item.control && item.equalAppId && item.equalControl
      )) {
        if (this.assoModalVisible) {
          this.formItem.baseSqlConfig.sourceAssos.push({
            children: this.associationAppControls,
            relations: this.relations,
            ...this.associationApp
          });
        } else {
          this.formItem.baseSqlConfig.sourceAssos = this.formItem.baseSqlConfig.sourceAssos.map(
            item => {
              if (item.id !== this.associationApp.id) return item;
              else {
                item.relations = this.relations;
                return item;
              }
            }
          );
        }
        this.assoRelationVisible = false;
        this.assoModalVisible = false;
        return true;
      } else {
        this.$Message.error('关联关系设置有误');
        return false;
      }
    },
    openCondModal () {
      this.conditions = []
      let _this = this
      if (this.formItem.sqlCondition) {
        let _conditions = JSON.parse(this.formItem.sqlCondition)
        // 优先兼容规则 - FXXXXXXX - X为7位数字
        // 擦还要兼容业务表里的特殊字段
        let reg = /^F[0-9]{7}$|^CreatedBy$|^OwnerDeptId$|^CreatedTime$|^ModifiedTime$|^SeqNo$/
        _conditions.forEach(item => {
          this.conditions.push({
            fieldAlias: item.fieldAlias,
            // 因为只提交当前表单的某个字段编号,所以回显时需要进行拼接
            // 此处判断是否业务表字段名,不是则显示输入框
            fieldAttr: reg.test(item.fieldAttr) ? [`${_this.formItem.baseSqlConfig.source.id}#${item.fieldAttr}`] : [],
            fieldAttrExtra: reg.test(item.fieldAttr) ? '' : item.fieldAttr,
            fieldAttrExtraOn: reg.test(item.fieldAttr) ? false: true,
            fieldType: item.fieldType,
            fieldQryType: item.fieldQryType          
          })
        })
      }
      this.condModalVisible = true
    },
    addNewCondition () {
      this.conditions.push({
        fieldAlias: '',
        fieldAttr: [],
        fieldAttrExtra: '',
        fieldAttrExtraOn: false,
        fieldType: '',
        fieldQryType: ''
      })
      this.$forceUpdate()
    },
    deleteCondition (index) {
      this.conditions.splice(index, 1)
      this.$forceUpdate()
    },
    handleCloseCondTab (id, index) {
      this.conditions[index].fieldAttr = []
    },
    handleConditions() {
      // 把数据放置进formItem里面即可
      if (this.conditions.every(
        item => item.fieldAlias && (item.fieldAttr[0]||item.fieldAttrExtra) && item.fieldType && item.fieldQryType
      )) {
        let _condition = []
        this.conditions.forEach(item => {
          _condition.push({
            fieldAlias: item.fieldAlias,
            // fieldAttrExtra存在值,则取fieldAttrExtra的值
            fieldAttr: item.fieldAttrExtra ? item.fieldAttrExtra: item.fieldAttr[0].split('#')[1],
            fieldType: item.fieldType,
            fieldQryType: item.fieldQryType
          }) 
        })
        this.formItem.sqlCondition = JSON.stringify(_condition)
        this.condModalVisible = false
        return true
      } else {
        this.$Message.error('请填写所有字段')
        return false
      }
    },
    addNewRelation () {
      this.relations.push({
        rootAppId: this.associationApp.id,
        control: '',
        equalAppId: '',
        equalControl: ''
      });
    },
    deleteRelation (index) {
      this.relations.splice(index, 1);
    },
    handleEditAssoApp (assoApp) {
      this.associationApp = assoApp;
      this.associationAppControls = assoApp.children;
      this.assoRelationVisible = true;
      this.relations = assoApp.relations;
    },
    handleCloseDistributeTab (id) {
      this.formItem.baseSqlConfig.distributes = this.formItem.baseSqlConfig.distributes.filter(
        item => item !== id
      );
    },
    handleCloseDimensionTab (id) {
      this.formItem.baseSqlConfig.dimensions = this.formItem.baseSqlConfig.dimensions.filter(
        item => item !== id
      );
    },
    handleCloseStatisticTab (id) {
      this.formItem.baseSqlConfig.statistics = this.formItem.baseSqlConfig.statistics.filter(
        item => item !== id
      );
    },
    getBasicSQL () {
      if (!this.validateBasicForm()) return;
      HTTP.getPreSql(JSON.stringify(this.getBasicFormItem())).then(data => {
        this.formItem.sqlText = data.msg;
      }).catch(() => {
        this.$Message.error('获取基础SQL出错');
      });
    },
    getBasicFormItem () {
      return {
        name: this.formItem.name,
        type: this.formItem.reportType,
        dataSource: this.formItem.baseSqlConfig.source && this.formItem.baseSqlConfig.source.id,
        sourceAssos: this.formItem.baseSqlConfig.sourceAssos.map(item => {
          return { id: item.id, relations: item.relations };
        }),
        distribute: this.formItem.baseSqlConfig.distributes.map(distribute => {
          return {
            title: this.getAppControlTitle(distribute),
            appId: distribute.split('#')[0],
            controlId: distribute.split('#')[1]
          };
        }),
        dimension: this.formItem.baseSqlConfig.dimensions.map(dimension => {
          return {
            title: this.getAppControlTitle(dimension),
            appId: dimension.split('#')[0],
            controlId: dimension.split('#')[1]
          };
        }),
        statistic: this.formItem.baseSqlConfig.statistics.map(statistic => {
          return {
            title: this.getAppControlTitle(statistic),
            appId: statistic.split('#')[0],
            controlId: statistic.split('#')[1]
          };
        })
      };
    },
    getAppControlTitle (value) {
      const apps = this.formItem.baseSqlConfig.sourceAssos.concat(this.formItem.baseSqlConfig.source || []);
      const [appId, controlId] = value.split('#');
      const app = apps.find(item => item.id === appId);
      const control = app.children.find(item => item.id === controlId);
      return control.title;
    },
    async getSqlAndExec () {
      if (!this.validateBasicForm()) return;
      this.loading = true;
      try {
        const sqlData = await HTTP.getPreSql(JSON.stringify(this.getBasicFormItem()));
        if (sqlData.code !== '0') throw new Error(sqlData.msg);
        this.formItem.sqlText = sqlData.msg;
        const chartData = await HTTP.execSqlText(this.formItem.sqlText,
          JSON.stringify(this.getBasicFormItem()));
        if (chartData.code !== '0') throw new Error(chartData.msg);
        this.editIncellData = this.changeValue(chartData.result);
        this.$store.commit('setReportData', {
          index: this.currentNum,
          data: this.editIncellData,
          value: this.formItem
        });
        this.$Message.success('数据已生成');
      } catch (error) {
        this.$Message.error(error.message || '数据出错');
      } finally {
        this.loading = false;
      }
    },
    validateBasicForm () {
      if (!this.formItem.reportType
      || !this.formItem.baseSqlConfig.source
      || this.formItem.baseSqlConfig.statistics.length === 0
      || (['1', '2'].includes(this.formItem.reportType)
      && this.formItem.baseSqlConfig.distributes.length === 0)
      || (['3', '5'].includes(this.formItem.reportType)
      && this.formItem.baseSqlConfig.dimensions.length === 0)) {
        this.$Message.error('表单信息填写不完整');
        return false;
      }
      return true;
    }
  },
  computed: {
    selectApps () {
      return (this.formItem.baseSqlConfig.source ? [this.formItem.baseSqlConfig.source] : [])
        .concat(this.formItem.baseSqlConfig.sourceAssos);
    },
    selectAssoApps () {
      return (this.formItem.baseSqlConfig.source
        ? [this.formItem.baseSqlConfig.source] : [])
        .concat(this.formItem.baseSqlConfig.sourceAssos.filter(
          item => item.id !== this.associationApp.id
        ));
    },
    displayCondition () {
      return JSON.parse(this.formItem.sqlCondition)
    }
  }
};
</script>

<style scoped lang="less">
#editor {
  position: relative;
  width: 100%;
  height: 100%;
}

.design-report-control__container {
  border-bottom: 1px solid #e9eaec;
}

.design-report-control__pane {
  max-width: 1200px;
  margin: 0 auto;
}

.design-report-handle {
  max-width: 1200px;
  margin: 0 auto 10px;
}

.sql-editor {
  border: 1px solid #e7e7e7;
}

.ivu-form-item {
  margin-bottom: 5px;
}

.ivu-btn-dashed {
  color: #57a3f3;
  background-color: transparent;
  border-color: #57a3f3;
}

.copy-app-content {
  height: 90vh;
  overflow: auto;
}

.new-relation-btn {
  cursor: pointer;
  color: #57a3f3;
}

.relatipon-item {
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: auto;
}

.delete-relation {
  margin-left: 5px;
  cursor: pointer;
  position: relative;
  top: 5px;
}

.action-btn-group {
  width: 100%;
  margin: 10px;
  text-align: center;
}

.preview-null-tip {
  font-size: 16px;
  font-weight: bold;
  color: #ccc;
  text-align: center;
  line-height: 280px;
  border: 1px dotted #ccc;
  margin: 0 10px;
}

.mode-tip {
  color: #aaa;
}
.cond-cont{
  .ivu-icon{
    margin-left: -5px;
    margin-right: 10px;
  }
  .ivu-card:not(:first-child) {
    margin-top: 10px;
  }
  .ivu-card-head{
    background: #f3f3f3;
    padding: 10px 16px;
  }
  .ivu-card-extra{
    top: 10px;
  }
  .cond-new-btn {
    margin: 5px 0;
    color: #57a3f3;
    display: block;
  }
  .cond-del-btn{
    // margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #e53e2c;
    i{
      margin: 0;
      margin-right: 5px;
    }
  }
}
</style>

<style>
.design-report-modal .ivu-modal {
  top: 20px;
}

.design-report-control__pane .ivu-select-multiple > div.ivu-select-selection > div > div.ivu-tag {
  display: none;
}

.design-report-control__pane .ivu-select-dropdown {
  max-height: 300px;
}

.design-report-control__pane .ivu-tag-border {
  max-width: 100%;
  white-space: nowrap;
}

.design-report-control__pane .ivu-tag-text {
  max-width: calc(100% - 26px);
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: text-bottom;
  white-space: nowrap;
}

.cond-cont .ivu-card-head{
  background: #f3f3f3;
  padding: 10px 16px;
}
.cond-cont .ivu-card-extra{
  top: 10px;
}
.cont-tag .ivu-tag-text{
  max-width: calc(100%)!important;
}
</style>

<style lang="less" scoped>
    @import '../../styles/common.less';
    @import 'components/table.less';
</style>

<template>
    <div>
        <Row>
            <Card>
                <h4 slot="title">
                    <Icon type="pinpoint"></Icon>
                    发起流程
                </h4>
                <Row>
                    <Input  placeholder="请输入名称搜搜..." style="width: 200px" />
                    <span  style="margin: 0 10px;"><Button type="primary" :loading="getLoading" icon="search" @click="getStartFlowList()">搜索</Button></span>
                    <span  style="margin-right:10px;"><Button  type="warning" icon="loop">重置</Button></span>
                    <Button  type="success" icon="plus" @click="openModal()">新增</Button>
                    <Modal v-model="modalUpload" >
                         <div slot="header" style="color:#f60;text-align:center">
                                <Icon type="information-circled"></Icon>
                                <span>办理</span>
                        </div>
                         <Form :label-width="100">
                            <FormItem label="类型">
                                <Select v-model="retType.defId">
                                    <Option v-for="item in list" :value="item.defId" :key="item.defId">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </Form>
                        <div slot="footer">
                                <Button type="primary" @click="handleSubmit(item)">确定</Button>
                                <Button type="ghost" @click="handleReset()" style="margin-left: 8px">取消</Button>
                        </div>
                    </Modal>
                </Row>
                <Row class="margin-top-10 ">
                    <Col span="24">
                        <i-table  :content="self" :columns="columnsCsv" :loading="getLoading" :data="csvData" size="small" ref="tableCsv"></i-table>
                    </Col>
                    <!-- <Col span='6' class="padding-left-10">
                        <div class="exportable-table-download-con1">
                            <span style="margin-right: 16px;"><Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出原始数据</Button></span>
                            <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出排序和过滤后的数据</Button>
                        </div>
                        <div class="exportable-table-download-con2">
                            <div>
                                <span>选取行范围：&nbsp;</span><InputNumber :min="1" :max="selectMaxRow" v-model="selectMinRow"></InputNumber>
                                <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                <InputNumber :min="selectMinRow" :max="rowNum" v-model="selectMaxRow"></InputNumber>
                            </div>
                            <div class="margin-top-10">
                                <span>选取列范围：&nbsp;</span><InputNumber :min="1" :max="selectMaxCol" v-model="selectMinCol"></InputNumber>
                                <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                <InputNumber :min="selectMinCol" :max="colNum" v-model="selectMaxCol"></InputNumber>
                            </div>
                            <div class="margin-top-10">
                                <span>输入文件名：</span>
                                <Input v-model="csvFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />
                            </div>
                            <div class="margin-top-20">
                                <Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> 导出自定义数据</Button>
                            </div>
                        </div>
                    </Col> -->
                </Row>
                <Row class="margin-top-20">
                    <Page class ="pull-left" :total="40" size="small" show-elevator show-sizer></Page>
                </Row>
            </Card>
        </Row>
    </div>

</template>

<script>
import HTTP from '../../api/work-flow.js';
import {filter} from './data/filter.js'
import {startFlowData, startFlowColumns} from './data/startflow.js';
import addflow from './designFlowModal/addStartFlow.vue'
import upload from './designFlowModal/upload.vue'
import log from './designFlowModal/approvalLog.vue'
export default {
    name: 'flow-manager',
    data () {
        return {
            self:this,
            modalUpload:false,
            currentParam:{},
            list:[],
            columnsCsv: [
                        {
                            type: 'index',
                            width: 60,
                            'fixed': 'left',
                            align: 'center'
                        },
                         {
                            'title': '申请标题',
                            'key': 'title',
                            'fixed': 'left',
                             width: 250
                        },
                        {
                            'title': '申请人',
                            'width': 160,
                            'key': 'leaveUser'
                        },
                        {
                            'title': '申请类型',
                            'width': 160,
                            'key': 'actKey',
                            render: (h, params)=> {
                             return h('div',{},filter.approvalReason[params.row.actKey]);
                               /*这里的this.row能够获取当前行的数据*/
                          }
                        },
                        {
                            'title': '申请原因',
                            'key': 'reason',
                             width: 230
                        },{
                            'title': '申请数目',
                            'key': 'number',
                            width: 120,
                            filters: [
                                {
                                    label: '大于4000',
                                    value: 1
                                },
                                {
                                    label: '小于4000',
                                    value: 2
                                }
                            ],
                            filterMultiple: false,
                            filterMethod (value, row) {
                                if (value === 1) {
                                    return row.show > 4000;
                                } else if (value === 2) {
                                    return row.show < 4000;
                                }
                            }
                        },
                        {
                            'title': '流程发起人',
                            'key': 'startUserId',
                             width: 150
                        },
                         {
                        title: '业务状态',
                        key: 'status',
                        width:150,
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.status ==1 ? 'blue' : row.status == 2 ? 'yellow' : 'green';
                            const text = row.status == 1 ? '草稿' : row.status == 2 ? '审批中' : '结束';
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                        },
                        {
                            'title': '创建时间',
                            'key': 'createTime',
                            width: 150
                        },
                        {
                            'title': '办理时间',
                            'key': 'startTime',
                            width: 150
                        },
                        {
                            'title': '审批结果',
                            'key': 'actResult',
                            width: 150,
                             render: (h, params)=> {
                             return h('div',{},filter.approvalResult[params.row.actResult]);
                               /*这里的this.row能够获取当前行的数据*/
                          }
                        },
                            {
                        'title': '操作',
                        'key': 'action',
                        'width': 590,
                        'align': 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled:params.row.status!=1
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.openUploadModal(params.row)
                                        }
                                    }
                                }, '提交'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                     style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.openLogModal(params)
                                        }
                                    }
                                }, '审查记录'),
                                 h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delModal(params.row.busId)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                    ],
            csvData: startFlowData,
            selectMinRow: 1,
            selectMinCol: 1,
            minRow: 1,
            minCol: 1,
            csvFileName: '',
            excelFileName: '',
            fontSize: 16,
            getLoading: false,
            retType:{
                    actKey:'',
                    busId:'',
                    defId:'',
                    nodeType:''
                },

        };
    },
    mounted(){
        this.getStartFlowList();
    },
    computed: {
    // 计算属性的 getter
            colNum: function () {
              // `this` 指向 vm 实例
              return this.columnsCsv.length;
            },
             rowNum: function () {
              // `this` 指向 vm 实例
              return this.csvData.length;
            },
            selectMaxCol:function(){
              return this.columnsCsv.length;
            },
             selectMaxRow: function () {
              // `this` 指向 vm 实例
              return this.csvData.length;
            },
             maxCol:function(){
              return this.columnsCsv.length;
            },
             maxRow: function () {
              // `this` 指向 vm 实例
              return this.csvData.length;
            }
    },
    methods: {
        exportData (type) {
            if (type === 1) {
                this.$refs.tableCsv.exportCsv({
                    filename: '原始数据'
                });
            } else if (type === 2) {
                this.$refs.tableCsv.exportCsv({
                    filename: '排序和过滤后的数据',
                    original: false
                });
            } else if (type === 3) {
                this.$refs.tableCsv.exportCsv({
                    filename: this.csvFileName,
                    columns: this.columnsCsv.filter((col, index) => index >= this.selectMinCol - 1 && index <= this.selectMaxCol - 1),
                    data: this.csvData.filter((data, index) => index >= this.selectMinRow - 1 && index <= this.selectMaxRow - 1)
                });
            }
        },
        getStartFlowList(){
            this.getLoading=true;
            HTTP.startFlowList()
                .then(res => {
                    this.csvData=res.page.result;
                })
                .catch(err => {
                   this.$Message.error('This is an error')
                }).finally(()=>{
                    this.getLoading=false;
                })
        },
       openModal: function() {
            this.$Modal.confirm({
                render: (h) => {
                        return h(addflow, {
                            props: {

                            },
                            on: {
                                value: (value1) => {
                                    this.addParam = value1
                                }
                            }
                        })
                    },
                onOk: () => {
                    const msg = this.$Message.loading({
                        content: '正在保存..',
                        duration: 0
                    })
                    HTTP.startFlow(this.addParam)
                    .then(res => {
                        this.$Message.destroy(msg);
                        if(res.code==0){
                           this.$Message.success("保存成功") ;
                           this.getStartFlowList();
                        }
                        else
                        this.$Message.error(err)
                    })
                    .catch(err => {
                        this.$Message.destroy(msg);
                        console.log(err);
                        this.$Message.error(err)
                    })
                    }
            })
        },
        openUploadModal(param){
            this.list=[];
            this.modalUpload=true;
            this.currentParam=param;
            HTTP.getFlowsByActKey(param.actKey)
                    .then(res => {
                        this.list=res;

                    })



        },
        handleSubmit (name) {
           this.retType.actKey=this.currentParam.actKey;
           this.retType.busId= this.currentParam.busId;
           this.retType.nodeType=2;
           HTTP.uploadFlow(this.retType)
                    .then(res => {
                        if(res.code==0){
                            this.$Message.success("提交成功")
                            this.modalUpload=false;
                        }
                        else
                        this.$Message.error(res.msg)
               })

        },
        handleReset(){
            this.modalUpload=false;
        },
        delModal(id){
             HTTP.delCurrentFlow(id)
                .then(res => {
                    if(res.code==0){
                        this.$Message.success('删除成功')
                        this.getStartFlowList()
                    }
                    else
                    this.$Message.error('This is an error')
                })
                .catch(err => {
                    console.log(err);
                   this.$Message.error('This is an error')
                })
        },
        openLogModal(param) {
            this.$Modal.info({
                render: (h) => {
                        return h(log, {
                            props: {
                               value:param
                            },
                            on: {
                                value: (value1) => {
                                    this.addParam = value1
                                }
                            }
                        })
                    } ,
                width:970,
            })
        }
    }
};
</script>

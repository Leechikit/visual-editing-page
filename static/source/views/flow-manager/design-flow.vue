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
                    流程管理
                </h4>
                <Row>
                    <Input  placeholder="请输入名称搜搜..." style="width: 200px" />
                    <span  style="margin: 0 10px;"><Button :loading="getLoading"  type="primary" icon="search" @click="getWorkFlowList()">搜索</Button></span>
                    <!-- <span  style="margin-right:10px;"><Button  type="warning" @click="openDesign()" icon="loop">重置</Button></span> -->
                    <Button  @click="openModal"  type="success" icon="plus">新增</Button>
                    <Modal v-model="showCropedImage" width="1000">
                        <p slot="header">当前流程图</p>
                        <img :src="currentImg" alt="" v-if="showCropedImage" style="width: 100%;">
                    </Modal>
                     <Modal v-model="designModal" width="1300">
                         <iframe ref="designItem" src="http://localhost:8091/activiti/model/create?name=test&key=test&description=testModel" 
                           marginheight="0" marginwidth="0" frameborder="0" scrolling="no"
                           width='100%' height="550"  id="iframepage"></iframe>
                           <div slot="footer">      
                                
                        </div>
                    </Modal>
                </Row>
                <Row class="margin-top-10 ">
                    <Col span="24">
                        <i-table  :loading="getLoading"   :content="self" :columns="columnsCsv" :data="csvData" size="small" ref="tableCsv"></i-table>
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
                    <Page class ="pull-left" :current="currentPage" :total="total" size="small" show-elevator @on-change="getWorkFlowList"> </Page>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import HTTP from '../../api/work-flow.js';
import {filter} from './data/filter.js';
import addModal from './designFlowModal/addNewFlow.vue'
var table2csvData = [];

export default {
    name: 'flow-manager',
    data () {
        return {
            self:this,
            total:0,
            currentPage:1,
            getLoading:false,
            designModal:false,
            delLoading:false,
            deployLoading:false,
            showCropedImage:false,
            currentImg:false,
            currentModal:false,
            columnsCsv: [
                        {
                            'title': '名称',
                            'key': 'name',
                            'fixed': 'left',
                            'width': 120
                        },
                        {
                            'title': '业务',
                            'key': 'businessName',
                            'sortable': true,
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
                            'title': '创建时间',
                            'key': 'createTime',
                            
                        },
                        {
                            'title': '是否部署',
                            'key': 'status',
                            render: (h, params)=> {  
                             return h('div',{},filter.deploy[params.row.status]);
                               /*这里的this.row能够获取当前行的数据*/  
                          } 
                        },
                        {
                        'title': '操作',
                        'key': 'action',
                        'align': 'center',
                         'width' : 400,
                        render: (h, params) => {
                                                    return h('div', [
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
                                                                    this.openDesign(params.row.modelId)
                                                                }
                                                            }
                                                        }, '设计流程图'),
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
                                                                    this.openIMG(params.row.modelId)
                                                                }
                                                            }
                                                        }, '查看流程图'),
                                                         h('Button', {
                                                            props: {
                                                                type: 'primary',
                                                                size: 'small',
                                                               
                                                            },
                                                             style: {
                                                                marginRight: '5px'
                                                            },
                                                            on: {
                                                                click: () => {
                                                                    this.deploy(params.row.modelId)
                                                                }
                                                            }
                                                        }, '部署'),
                                                         h('Button', {
                                                            props: {
                                                                type: 'error',
                                                                size: 'small',
                                                                loading:this.delLoading
                                                            },
                                                            on: {
                                                                click: () => {
                                                                    this.delModal(params.row.id)
                                                                }
                                                            }
                                                        }, '删除')
                                                    ]);
                                                }
                                                }       
                                                 ],
            csvData: [],
            dist:null,
            selectMinRow: 1,
            selectMinCol: 1,
            minRow: 1,
            minCol: 1,
            addParam:null,
            csvFileName: '',
            excelFileName: '',
            tableExcel: {},
            fontSize: 16
        };
    },
    mounted(){
        this.getWorkFlowList()
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
        openIMG(input){
            this.showCropedImage=false;
            this.currentImg = "/ctg-workflow/act/model/showFlowImg?modelId="+input;
            this.showCropedImage=true;
        },
        getWorkFlowList(){
            this.getLoading=true;
            HTTP.workFlowList(this.currentPage)
                .then(res => {
                    this.csvData=res.page.result;
                    this.total= res.page.total;
                })
                .catch(err => {
                    console.log(err);
                   this.$Message.error('This is an error')
                }).finally(()=>{
                    this.getLoading=false;
                })
        },
        delModal(id){
            this.$Modal.confirm({
                content:"是否删除",
                 onOk: () => {
                    const msg = this.$Message.loading({
                        content: '正在删除..',
                        duration: 0
                    })
                    this.delLoading=true;
                    HTTP.delModal(id)
                    .then(res => {
                        if(res.code==0){
                            this.$Message.success('删除成功')
                            this.getWorkFlowList();
                        }
                        else
                            this.$Message.error({content:'This is an error', duration: 10})
                        }).catch(err => {
                            this.$Message.error({content:'This is an error', duration: 10})
                         })
                        .finally(()=>{
                            this.$Message.destroy(msg);
                            this.delLoading=false;
                        })
                    }
            })
        },
        deploy(param){
             const msg = this.$Message.loading({
                        content: '正在部署..',
                        duration: 0
                    })
            HTTP.deploy(param)
                .then(res => {
                    if(res.code==0){
                        this.$Message.success('部署成功')
                    }
                    else{
                        this.$Message.error(res.msg);
                    }
                    
                })
                .catch(err => {
                    console.log(err);
                   this.$Message.error('This is an error')
                }).finally(()=>{
                    this.$Message.destroy(msg);
                })
        },
        openDesign(input){
            this.designModal=true;
            var node= document.getElementById("iframepage")
            node.setAttribute("src", '/ctg-workflow/modeler.html?modelId='+input);  
        },
        openModal: function() {
            this.$Modal.confirm({
                render: (h) => {
                        return h(addModal, {
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
                    HTTP.addFlow(this.addParam)
                    .then(res => {
                        this.$Message.destroy(msg);
                        if(res.code==0){
                            this.$Message.success("保存成功")
                            this.getWorkFlowList()
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
        }

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
            },
            imgDist:function(){
                return this.dist;
            }
        }

};
</script>

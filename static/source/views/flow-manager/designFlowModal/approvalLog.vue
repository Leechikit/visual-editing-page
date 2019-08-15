<template>
    <modal
        :mask-closable="false"
        v-model="isVisible"
        width="1000"
        class-name="workflow-view-modal"
        @on-cancel="cancel"
    >
        <div :id="value.id">
          <p slot="header" style="text-align:center;margin-bottom:20px">
                  <span style='font-family: arial, "Microsoft Yahei", 微软雅黑;'>审批记录</span>
          </p>
        <i-table  :content="self" :loading="getLoading" :columns="columns" :data="csvData" size="small" ref="tableCsv" ></i-table>

        <workflow-chart :value="value"></workflow-chart>
       </div>
       <div slot="footer">
            <Button
                type="ghost"
                @click="cancel"
            >关闭</Button>
            <Button
                v-if="value.actResult !==4 && cancelBtn"
                :loading="loading2"
                type="primary"
                @click="cancelMyJob"
            >撤回</Button>
        </div>
    </modal>
</template>
<script>
import {filter} from '../data/filter.js'
import '../libs/css/workflow.less'
import HTTP from '../../../api/work-flow.js';
import  {dataFormat} from '../../../util/assist.js';
import workflowChart from '../components/workflow-chart'

    export default {
        components: { workflowChart },
        data () {
            return {
                isVisible: this.visible,
                self:this,
                getLoading:false,
                loading: false,
                loading2:false,
                showCropedImage:false,
                columns:[
                        {
                            type: 'index',
                            width: 60,
                            'fixed': 'left',
                            align: 'center'
                        },
                        {
                            'title': '环节名称',
                            'key': 'taskName',
                            'fixed': 'left',
                            'width': 100
                        },
                        {
                            'title': '办理人',
                            'key': 'dealName',
                            'width': 157,
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
                        title: '办理结果',
                        key: 'taskAction',
                        width:150,
                        render: (h, params) => {
                            const row = params.row;
                            const color =row.status==3?'green': row.taskAction == 1 ? 'blue' : row.taskAction == 2 ? 'red': row.taskAction == 3 ? 'gray': row.taskAction == 4 ?'black': row.taskAction == 5 ? 'yellow': row.taskAction == 6 ? 'yellow': row.taskAction == 7 ?'green':'orange';
                            const text =row.status==3?"已加办": row.taskAction == 1 ? '同意' : row.taskAction == 2 ? '反对': row.taskAction == 3 ?'撤回':row.taskAction == 4 ?'驳回': row.taskAction == 5 ?'转办': row.taskAction == 6 ?'批阅': row.taskAction == 7 ?'跳转':'未审批';
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                        },
                        {
                            'title': '审批意见',
                            'key': 'taskResult',
                            // 'width': 150,
                            'minWidth': 150,
                            'sortable': true
                        },  {
                            'title': '创建时间',
                            'key': 'createTime',
                            'width': 170,
                            'sortable': true,
			    render: (h, params)=> {
				let text = dataFormat(params.row.createTime);
			    return h('div',{},text);}
                        },{
                            'title': '办理时间',
                            'key': 'dealTime',
                            'width': 170,
                            'sortable': true,
			    render: (h, params)=> { let text = dataFormat(params.row.dealTime);
				return h('div',{},text);
			    }
                        }
                     ],
                      csvData:[]
            }

        },
        props:[
            'value',
            'visible',
            'cancelBtn'
        ],
        mounted(){
            this.getApprovelLog(this.value)
        },
        watch: {
            visible: function() {
              this.isVisible = this.visible;
            }
        },
        methods: {
            async cancelMyJob() {
                this.loading2 = true;
                let res
                try {
                   res = await HTTP.cancelMyJob(this.value.id);
                } catch(e) {
                    this.$Message.error('撤销发生错误');
                    this.loading2 = false;
                    return
                }
                this.loading2 = false;
                if (res.code === '0') {
                    this.isVisible = false;
                    this.dealResponse(res.code);
                    this.$emit('on-ok');
                } else {
                    this.$Message.error('撤销失败');
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
            cancel() {
                this.isVisible = false;
                this.$emit('on-cancel')
            },
            valueChange() {
                var obj = this
                this.$emit('value', obj.formValidate)
            },
            getApprovelLog(value){

                this.showCropedImage=false;
                this.currentImg = "/ctg-workflow/act/app/showFlowImg?processInstanceId="+value.instanceId+"&time="+(new Date());
                this.showCropedImage=true;
                this.getLoading=true;
                HTTP.approvalRecord(value.id)
                .then(res => {
                    this.csvData=res.page.result;
                })
                .catch(err => {
                    console.log(err);
                   this.$Message.error('This is an error')
                }).finally(()=>{
                 this.getLoading=false;
                })
            },
	    timestampToTime(timestamp) {
		var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return Y+M+D+h+m+s;
	    }
        }

    }
</script>

<style lang="less" scoped>
    .ulColor {
        padding: 0px;
        list-style-type: none;
        float: right;
        margin-left: 25px;
    }

    .ulColor li {
        float: left;
        margin-right: 10px;
        width: 120px;
        height: 22px;
        line-height: 22px;
        text-align: center;
    }
</style>
<style lang="less" >
    .workflow-view-modal .ivu-modal-confirm-footer {
        display: none;
    }

    .workflow-view-modal .ivu-modal-body {
        max-height: 520px;
        min-height: 400px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .workflow-view-modal .ivu-modal {
        top: 20px;
    }
</style>

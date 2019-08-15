<template>
 <Modal v-model="show" @on-cancel="cancel" :title="title" :mask-closable="false"
        width="420px">
    <div class="activityrule-container">
        <div class="">
            <table>
                <tr>
                    <td >
                        <dropdownlist 
                        :width="ruleWidth"
                        :height="ruleHeight"
                        :place-holder="rulePlaceHolder"
                        :source="ruleSource"
                        :value="approveRule"
                        :font-size="fontSize"
                        :color="color"
                        @change="approveExitTypeChange"
                        @update="val=>approveRule=val">
                        </dropdownlist>
                    </td>
                    <td >
                        <input type="text"  @keyup="approveRuleValidate($event)" :placeholder="inputPlaceHolder" v-model="approveNumber"/>
                    </td>
                    <td>
                        <span v-if="activity && activity.ToolTipText==='FillSheet'">提交时进入下一节点</span>
                        <span v-else>同意时进入下一节点</span>
                    </td>
                </tr>
                <tr v-if="activity && activity.ToolTipText==='Approve'">
                    <td>
                        <dropdownlist 
                        :width="ruleWidth"
                        :height="ruleHeight"
                        :place-holder="rulePlaceHolder"
                        :source="ruleSource"
                        :value="disapproveRule"
                        :font-size="fontSize"
                        :color="color"
                        @change="disApproveExitTypeChange"
                        @update="val=>disapproveRule=val">
                        </dropdownlist>
                    </td>
                    <td>
                        <input type="text" disabled="true" @keyup="disApproveRuleValidate($event)" :placeholder="disApproveInputPlaceHolder" v-model="disapproveNumber"/>
                    </td>
                    <td>
                        <span>不同意时</span>
                    </td>
                </tr>
                <tr  v-if="activity && activity.ToolTipText==='Approve'">
                    <td colspan="3">
                        <dropdownlist 
                        :width="nodeSelectWidth"
                        :height="nodeSelectHeight"
                        :place-holder="rulePlaceHolder"
                        :source="nodeSelectSource"
                        :value="nodeSelectType"
                        @change="nodeSelectTypeChange"
                        @update="val=>nodeSelectType=val">
                        </dropdownlist>
                    </td>
                </tr>
                <tr  v-if="activity && activity.ToolTipText==='Approve' && nodeSelectType==2">
                     <td colspan="3">
                        <dropdownlist 
                        :width="nodeSelectWidth"
                        :height="nodeSelectHeight"
                        :place-holder="nodeSelectContentPlaceHolder"
                        :source="nodeSelectActivityCodes"
                        :value="nodeSelectActivityCode"
                        @update="val=>nodeSelectActivityCode=val">
                        </dropdownlist>
                    </td>
                </tr>
            </table>
        </div>
    </div>
     <div slot="footer" style="text-align:center;">
        <div slot="footer" class="bottom_btns">
            <a class="confirm" @click="ok()">确定</a>
            <a class="cancel" @click="cancel()">取消</a>
        </div>
      </div>
</Modal>
    
</template>
<script>
    import { Modal} from "iview";
    import dropdownlist from './dropdownlist';
    export default {
        data(){
            return {
                show: false,
                ruleWidth: 120,
                ruleHeight: 30,
                nodeSelectHeight: 30,
                nodeSelectWidth: 318,
                nodeSelectType: 1,
                nodeSelectContentPlaceHolder:'选择指定节点', 
                nodeSelectActivityCode:null,
                // nodeSelectActivityCodes:[],
                rulePlaceHolder: '',
                approveRule: 0,
                approveNumber: 0,
                disapproveRule: 0,
                disapproveNumber:0,
                fontSize: 12,
                color: '#383838',
                inputPlaceHolder:'100%',
                disApproveInputPlaceHolder: '100%',
                ruleSource: [{
                    Value: 0,
                    Text: '按百分比'
                },{
                    Value: 1,
                    Text: '按人数'
                }],
                nodeSelectSource: [{
                        Value:1,
                        Text: '驳回到发起人'
                    },{
                        Value:2,
                        Text: '驳回到指定节点'
                    },
                    {//新增
                        Value:3,
                        Text: '直接否决流程且不再流转'
                    }
                ]
            }
        },
        props:[
            'title',
            'showFlag',
            'activity', //当前节点
            'activitys', //所有节点
        ],
        
        components:{
            Modal,
            dropdownlist
        },
        methods:{
            ok(){
                let res={};
                //同意出口
                if(this.approveRule===0){
                    //按百分比
                    res.ApproveExit=this.approveNumber+'%';
                }else{
                    res.ApproveExit=this.approveNumber;
                }
                //否决出口
                if(this.disapproveRule===0){
                     res.DisapproveExit=this.disapproveNumber+'%';
                }else{
                    res.DisapproveExit=this.disapproveNumber;
                }
                res.DisapproveExitType=this.nodeSelectType;
                res.DisapproveExitActivityCode=this.nodeSelectActivityCode;
                this.$emit("ok",res);
            },
            cancel(){
                this.$emit("cancel");
            },
            approveExitTypeChange(val){
                if(val===0){
                    this.inputPlaceHolder='100%';
                    this.approveNumber=100;
                    
                }else{
                     this.inputPlaceHolder='1';
                     this.approveNumber=1;
                }
            },
            disApproveExitTypeChange(val){
                if(val===0){
                    this.disApproveInputPlaceHolder='100%';
                    this.disapproveNumber=100;
                }else{
                     this.disApproveInputPlaceHolder='1';
                     this.disapproveNumber=1;
                }
            },
            nodeSelectTypeChange(){
            },
            approveRuleValidate(e){
                if (e.keyCode >= 37 && e.keyCode <= 40){
                    return;
                } 
                if (this.approveRule=== 0) {//百分比时只能输入小数点后两位
                    let value = this.approveNumber.replace(/[^\d.]/g, "");
                    value = value.replace(/^\./g, "");
                    value = value.replace(/\.{2,}/g, ".");
                    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
                    this.approveNumber = value;
                } else {//人数时只能输入整数
                   this.approveNumber=this.approveNumber.replace(/[^\d]/g, '');
                }
            },
            disApproveRuleValidate(e){
                if (e.keyCode >= 37 && e.keyCode <= 40){
                    return;
                } 
                if (this.disapproveRule=== 0) {//百分比时只能输入小数点后两位
                    let value = this.disapproveNumber.replace(/[^\d.]/g, "");
                    value = value.replace(/^\./g, "");
                    value = value.replace(/\.{2,}/g, ".");
                    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
                    this.disapproveNumber = value;
                } else {//人数时只能输入整数
                   this.disapproveNumber=this.disapproveNumber.replace(/[^\d]/g, '');
                }
            }
        },
        computed:{
            nodeSelectActivityCodes:function(){
                let res=[];
                if(this.activity && this.activitys && this.activitys.length>0){
                    for(let ac of this.activitys){
                        if(ac.ActivityCode!==this.activity.ActivityCode && 
                            ac.DisplayName !=='开始'){
                            res.push({
                                Value: ac.ActivityCode,
                                Text: ac.DisplayName
                            });
                        }
                    }
                }
                return res;
            }
        },
        watch:{
            showFlag:function(){
                
                this.show = this.showFlag;
            },
            activity:function(val){
                if(val){
                   let approveExit= val.ApproveExit;
                   if(!approveExit){
                       if(val.ToolTipText==="Approve"){
                            this.approveRule=0;
                            this.approveNumber=100;
                            this.inputPlaceHolder='100%';
                       }else{
                            this.approveRule=1;
                            this.approveNumber=1;
                            this.inputPlaceHolder='1';
                       }
                       
                   }else{
                        if(approveExit.indexOf('%')>-1){
                            this.approveRule=0;
                            this.approveNumber=approveExit.substring(0,approveExit.length-1);
                            this.inputPlaceHolder='100%';
                        }else{
                            this.approveRule=1;
                            this.approveNumber=approveExit;
                            this.inputPlaceHolder='1';
                        }
                   }
                    if(val.ToolTipText==="Approve"){
                        // let res=[];
                        // if(this.activity && this.activitys && this.activitys.length>0){
                        //     for(let ac of this.activitys){
                        //         if(ac.ActivityCode!==this.activity.ActivityCode &&
                        //             ac.DisplayName !=='开始'){
                        //             res.push({
                        //                 Value: ac.ActivityCode,
                        //                 Text: ac.DisplayName
                        //             });
                        //         }
                        //     }
                        // }
                        let disapproveExit=val.DisapproveExit;
                        if(!disapproveExit){
                            this.disapproveRule=1;
                            this.disapproveNumber=1;
                            this.disApproveInputPlaceHolder='1';
                        }else{
                            if(disapproveExit.indexOf('%')>-1){
                                this.disapproveRule=0;
                                this.disapproveNumber=disapproveExit.substring(0,disapproveExit.length-1);
                                this.disApproveInputPlaceHolder='100%';
                            }else{
                                this.disapproveRule=1;
                                this.disapproveNumber=disapproveExit;
                                this.disApproveInputPlaceHolder='1';
                            }
                        }
                        this.nodeSelectType=val.DisapproveExitType;
                        this.nodeSelectActivityCode=val.DisapproveExitActivityCode;
                    }
                    
                }
            }
        }
    }
</script>

<style lang="less" >
    div.activityrule-container{
        width:100%;
        height: 218px;
        display: block;
        margin-top: 14px;
        margin-left: 26px;
        td {
            text-align: left;
            padding: 0 4px;
            // vertical-align: middle;
            input {
                width: 48px;
                height: 30px;
                border: 1px solid #d5d6d5;
                border-radius: 2px;
                font-size: 12px;
                color: #383838;
                padding-left: 5px;
                &::-webkit-input-placeholder{
                    color: #999;
                };
                &:-moz-placeholder{
                    color: #999;
                };
                &:-ms-input-placeholder{
                    color: #999;
                }
            }
        }
    }
    
</style>


// WEBPACK FOOTER //
// src/components/workflowdesigner/activityrule.vue
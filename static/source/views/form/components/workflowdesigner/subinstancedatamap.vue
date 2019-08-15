<template>
  <div>
      <Modal v-model="show"  @on-cancel="cancel" :title="title" :mask-closable="false"
        width="700px" >
        <div style="margin-top: 14px;margin-left: 26px;margin-right: 26px;">
<div class="subinstance-wrapper">
            <div class="title">
                通过规则的设定，可实现父流程和子流程的数据互通。
            </div>
            <div class="div-tab">
                <div :class="[isParentToChild?'active':'']" @click="toggle('parent')">父流程-->子流程</div>
                <div :class="[isChildToParent?'active':'']" @click="toggle('child')">子流程-->父流程</div>
                <div :class="[isParell?'active':'']" @click="toggle('parell')">父流程<-->子流程</div>
            </div>
        </div>
        <div class="add-rule" @click="addRule()">
            <span class="icon-on"></span>
            <span>添加规则</span>
        </div>
        <div class="rule-container">
            <div class="parent-child" v-if="isParentToChild" :class="[isParentToChild?'active':'']">
                <div class="title">
                    当父流程转至子流程时，
                </div>
                <div class="wrapper">
                    <table >
                        <tr v-for="rule in dataMaps" v-if="rule.Type==0"  :key="rule.ObjectId">
                            <td>将父流程</td>
                            <td>
                                <dropdownlist 
                                :width="dataItemWidth"
                                :height="dataItemHeight"
                                :place-holder="parentPlaceHolder"
                                :source="currentDataItem"
                                :value="rule.ParentDataName"
                                
                                @update="val=>rule.ParentDataName=val">
                                </dropdownlist>
                            </td>
                            <td>的值填充给子流程</td>
                            <td>
                                <dropdownlist 
                                :width="dataItemWidth"
                                :height="dataItemHeight"
                                :place-holder="childPlaceHolder"
                                :source="childDataItems"
                                :value="rule.ChildDataName"
                                @update="val=>rule.ChildDataName=val">
                                </dropdownlist>
                            </td>
                            <td>
                                <span><Icon type="trash-a" :color="red"  @click="remove(rule)"></Icon></span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="child-parent" v-if="isChildToParent" :class="[isChildToParent?'active':'']">
                <div class="title">
                    当子流程审批完成时，
                </div>
                <div class="wrapper">
                    <table >
                        <tr v-for="rule in dataMaps" v-if="rule.Type==1 || rule.Type==3" :key="rule.ObjectId">
                            <td>将子流程</td>
                            <td>
                                <dropdownlist 
                                :width="dataItemWidth"
                                :height="dataItemHeight"
                                :place-holder="childPlaceHolder"
                                :source="childDataItems"
                                :value="rule.ChildDataName"
                                @update="val=>rule.ChildDataName=val">
                                </dropdownlist>
                            </td>
                            <td>的值</td>
                            <td>
                                <dropdownlist 
                                :width="transferWidth"
                                :height="transferHeight"
                                :place-holder="transforPlaceHolder"
                                :source="transferSource"
                                :value="rule.Type"
                                @update="val=>rule.Type=val">
                                </dropdownlist>
                            </td>
                            <td>
                                给父流程
                            </td>
                            <td>
                                <dropdownlist 
                                :width="dataItemWidth"
                                :height="dataItemHeight"
                                :place-holder="parentPlaceHolder"
                                :source="excluedDataItems"
                                :value="rule.ParentDataName"
                                @update="val=>rule.ParentDataName=val">
                                </dropdownlist>
                            </td>
                            <td>
                                <span><Icon type="trash-a" :color="red"  @click="remove(rule)"></Icon></span>
                            </td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <div class="parell" v-if="isParell" :class="[isParell?'active':'']">
                <div class="title">
                    当父流程转至子流程时，
                </div>
                <div class="wrapper">
                   <table >
                        <tr v-for="rule in dataMaps" v-if="rule.Type==2" :key="rule.ObjectId">
                            <td>将父流程</td>
                            <td>
                                <dropdownlist 
                                :width="dataItemWidth"
                                :height="dataItemHeight"
                                :place-holder="parentPlaceHolder"
                                :source="excluedDataItems"
                                :value="rule.ParentDataName"
                                @update="val=>rule.ParentDataName=val">
                                </dropdownlist>
                            </td>
                            <td>的值填充给子流程</td>
                            <td>
                                 <dropdownlist 
                                :width="dataItemWidth"
                                :height="dataItemHeight"
                                :place-holder="childPlaceHolder"
                                :source="childDataItems"
                                :value="rule.ChildDataName"
                                @update="val=>rule.ChildDataName=val">
                                </dropdownlist>
                            </td>
                            <td>
                                <span><Icon type="trash-a" :color="red"  @click="remove(rule)"></Icon></span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="footer">
                    当子流程审批完成时，根据以上配置规则，将子流程字段的值反写给父流程对应的字段。
                </div>
            </div>
        </div>
        <div class="description" >
            <span v-if="isChildToParent">注：填充与追加的区别，填充为直接覆盖数据，追加为在原有数据的基础上再补充数据。</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
        </div>
        </div>
        
        <div slot="footer" class="bottom_btns">
            <a class="confirm" @click="ok()">确定</a>
            <a class="cancel" @click="cancel()">取消</a>
        </div>
        <!-- <div slot="footer" style="text-align:center;">
            <button type="button" class="btn-ok ivu-btn ivu-btn-primary"  @click="ok()">
            <span>确定</span>
            </button>
            <button type="button" class="btn-cancel ivu-btn ivu-btn-ghost" @click="cancel()">
            <span>取消</span>
            </button>
        </div> -->
      </Modal>
  </div>
</template>
<script>
    import { Modal} from "iview";
    import dropdownlist from './dropdownlist';
    import {GetDataItemsByWorkflowCode} from '../../service/getData';
    import HTTP from "../../../../api/form.js"
    export default {
        name:'subinstancedatamap',
        data(){
            return {
                show: false,
                isParentToChild: true,
                isChildToParent: false,
                isParell: false,
                dataMaps:[],
                childDataItems:[],
                parentPlaceHolder: '选择父流程字段',
                childPlaceHolder:'选择子流程字段',
                transforPlaceHolder: '传递方式',
                dataItemWidth: 158,
                dataItemHeight: 30,
                transferWidth: 88,
                transferHeight: 30,
                transferSource: [{
                    Text:'填充',
                    Value: 1
                },{
                    Text:'追加',
                    Value: 3
                }]
                ///ChildDataName,ParentDataName,Type
            }
        },
        components:{
            Modal,
            dropdownlist
        },
        created(){
            
            
        },
        props:[
            'title',
            'showFlag',
            'schemaCode',
            'dataItems',
            'rules'
        ],
        mounted(){
            
        },
        methods:{
            initDataMaps(){
                if(!this.rules || this.rules.length==0){
                    for(let i=0;i<3;i++){
                        this.dataMaps.push({
                            ChildDataName:'',
                            ParentDataName:'',
                            Type: i
                        });
                    }
                }else{
                    //判断是否每种类型都存在，如果不存在则添加
                    let pToc=false,cTop=false,parell=false;
                    for(let rule of this.rules){
                        if(pToc && cTop && parell ){
                            break;
                        }
                        if(rule.Type==0){
                            pToc=true;
                        }else if(rule.Type==1 || rule==3){
                            cTop=true;
                        }else if(rule.Type==2){
                            parell=true;
                        }
                    }
                    if(!pToc){
                        this.dataMaps.push({
                            ChildDataName:'',
                            ParentDataName:'',
                            Type: 0
                        });
                    }
                    if(!cTop){
                        this.dataMaps.push({
                            ChildDataName:'',
                            ParentDataName:'',
                            Type: 1
                        });
                    }
                    if(!parell){
                        this.dataMaps.push({
                            ChildDataName:'',
                            ParentDataName:'',
                            Type: 2
                        });
                    }
                }
            },
            ok(){
                for(let i=this.dataMaps.length-1;i>=0;i--){
                    let rule=this.dataMaps[i];
                    if(!rule.ParentDataName || !rule.ChildDataName){
                        this.dataMaps.splice(i,1);
                    }
                }
                this.$emit('ok',this.dataMaps);
            },
            cancel(){
                this.$emit('cancel');
            },
            toggle(type){
                if(type==='parent'){
                    this.isParentToChild=true;
                    this.isChildToParent=false;
                    this.isParell=false;
                }else if(type==='child'){
                    this.isParentToChild=false;
                    this.isChildToParent=true;
                    this.isParell=false;
                }else{
                    this.isParentToChild=false;
                    this.isChildToParent=false;
                    this.isParell=true;
                }
            },
            addRule(){
                if(!this.dataMaps){
                    this.dataMaps=[];
                }
                if(this.isParentToChild){
                    this.dataMaps.push({
                        ChildDataName:'',
                        ParentDataName:'',
                        Type: 0
                    });
                }else if(this.isChildToParent){
                    this.dataMaps.push({
                        ChildDataName:'',
                        ParentDataName:'',
                        Type: 1
                    });
                }else{
                    this.dataMaps.push({
                        ChildDataName:'',
                        ParentDataName:'',
                        Type: 2
                    });
                }
            },
            remove(rule){
                for(let i=0,len=this.dataMaps.length;i<len;i++){
                    if(rule==this.dataMaps[i]){
                        this.dataMaps.splice(i,1);
                        return;
                    }
                }
            },
            async getDataItemsByWorkflowCode(workflowCode){
                /* if(this.$store.state.participant.SubInstanceDataItems[workflowCode]){
                    return ;
                } */
                //let res=await GetDataItemsByWorkflowCode(workflowCode);
                HTTP.getDataItemsByWorkflowCode(workflowCode).then((res)=>{
                    if(res.code==0){
                        let result=res.data.dataItems;
                        if(result){ 
                            var ret=[];
                            for(var i in result){
                                var tmp={};
                                tmp.Text=result[i].displayName;
                                tmp.Value= result[i].controlId;
                                ret.push(tmp);
                            }
                            this.childDataItems=ret;
                            this.$store.commit('participant/addSubInstanceDataItems',{key:workflowCode,value:ret});
                            //this.$store.state.participant.SubInstanceDataItems[workflowCode]=result.DataItems;
                        }
                    }
                })
                
            }
        },
        computed:{
            currentDataItem: function(){
                let res=[];
                for(let item of this.dataItems){
                    if($.inArray(item.Value, GlobalWorkflowProperties.MappingProperties) <0){
                        if(item.ParentId){
                           item.Value= item.ParentId+'.'+item.Value
                        }
                        res.push(item);
                    }
                }
                return res;

            }, 
            excluedDataItems: function(){
                let res=[];
                for(let item of this.dataItems){
                    if(item.Value!=="OwnerId"&&$.inArray(item.Value, GlobalWorkflowProperties.MappingProperties) <0){
                        res.push(item);
                    }
                }
                return res;
            }
        },
        watch:{
            showFlag:function(){
                this.show = this.showFlag;
                if(this.show){
                    this.dataMaps=[];
                    if(this.rules && this.rules.length>0){
                        for(let rule of this.rules){
                            this.dataMaps.push(rule);
                        }
                    }
                    this.initDataMaps();
                   // if(this.$store.state.participant.SubInstanceDataItems[this.schemaCode]){
                   //     this.childDataItems=this.$store.state.participant.SubInstanceDataItems[this.schemaCode];
                   // }else{
                    this.getDataItemsByWorkflowCode(this.schemaCode);
                   // }
                                       
                }
            },
            
        }
    }
</script>
<style lang="less" >
    div.subinstance-wrapper{
        div.title {
            font-size: 14px;
            color: #666;
        }
        div.div-tab{
            margin-left: 30px;
            margin-top: 24px;
            margin-bottom: 18px;
            overflow: hidden;
            div{
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
                    border-left:0;
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
        color:#999;
        margin: 5px 0 ;
    }
    div.rule-container{
        display: block;
        height:228px;
        overflow: auto;
        border-radius: 2px;
        box-shadow: 0 0 1px 0 rgba(66,66,66,0.50);
        background: #fff;
        div.title,div.footer {
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
                
                &:last-child{
                    padding-left: 8px;
                    span{
                        color: #e97763;
                    }
                }
                
            }
        }
        
    }
</style>



// WEBPACK FOOTER //
// src/components/workflowdesigner/subinstancedatamap.vue
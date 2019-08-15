<template>
    
    <Modal v-model="showExternal" title="富文本编辑" width="700px" class="external-modal">
        <div id="divExternalForm" style="height:406px;">
            <div class="ExternalForm_content row">
                <div >
                    <span style="font-size:14px;color:#333333;">将富文本的内容转换成公众号的类型</span >&nbsp;&nbsp;
                    <i-switch v-model="openExternalForm">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
               
                <div class="rule-container">
                    <div class="parent-child active">
                        <div class="wrapper">
                            <table >
                                <tr>
                                    <td>文章标题</td>
                                    <td>
                                        <dropdownlist 
                                        :width="dataItemWidth"
                                        :height="dataItemHeight"
                                        :place-holder="titlePlaceHolder"
                                        :source="childDataItems"
                                        :value="selectTitleVal"
                                        @update="val=>selectTitleVal=val">
                                        >
                                        </dropdownlist>
                                    </td>
                                    <td>文章作者</td>
                                    <td>
                                        <dropdownlist 
                                        :width="dataItemWidth"
                                        :height="dataItemHeight"
                                        :place-holder="authorPlaceHolder"
                                        :source="childDataItems"
                                        :value="selectAuthorVal"
                                        @update="val=>selectAuthorVal=val"
                                       >
                                        </dropdownlist>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div slot="footer">
            <Button type="info" size="large"   @click="ok">确定</Button>
        </div>
    </Modal>
</template>

<script>
// import { iButton } from "iview";

import { switchExternalForm } from '../../../service/getData';  //引入开启关闭表单外链接口
import "../../../lib/plugins/qrCode/jquery.qrcode.min.js";
import dropdownlist from '../../workflowdesigner/dropdownlist';
import HTTP from "@/api/form.js"
export default {
    props:[
        "schemaCode",
        "rule",
        "sheetDesigner",
    ],
    data(){
        return {
            dataMaps:[],
            childDataItems:[],
            showExternal:false,
            externalFormUrl:"",
            selectTitleVal:'',
            selectAuthorVal:'',
            titlePlaceHolder: '选择标题',
            authorPlaceHolder:'选择作者',
            openExternalForm:false,
            dataItemWidth: 158,
            dataItemHeight: 30,
            transferWidth: 88,
            transferHeight: 30,
            retVal:{
                isArticleMode:false,
                articleTitle:"",
                articleAuthor:""
            }
        }
    },

    mounted:function(){
        this.dataMaps=[];
        this.getDataItemsByWorkflowCode(this.schemaCode);
                
    },
    created: function() {
        var _self = this;
        this.openExternalForm = this.EnableExternalForm;
    },
    methods:{
        ok(){
            this.retVal.isArticleMode=this.openExternalForm;
            this.retVal.articleTitle=this.selectTitleVal;
            this.retVal.articleAuthor=this.selectAuthorVal;
             $.Schema.RTFData = this.retVal; 
              this.showExternal=false;
        },
        show() {
            
            this.showExternal=true;
            if(this.rule){
                this.openExternalForm=this.rule.isArticleMode;
                this.selectTitleVal=this.rule.articleTitle;
                this.selectAuthorVal=this.rule.articleAuthor;
            }
            
           
            
        },
         getDataItemsByWorkflowCode(workflowCode){
                HTTP.getDataItemsByWorkflowCode(workflowCode).then((res)=>{
                    if(res.code==0){
                        let result=res.data.dataItems;
                        if(result){ 
                            var ret=[];
                            for(var i in result){
                                var tmp={};
                                if(result[i].controlKey==14&&result[i].controlId.indexOf('F')==0){
                                    tmp.Text=result[i].displayName;
                                    tmp.Value= result[i].controlId;
                                    ret.push(tmp);
                                }
                                
                            }
                            this.childDataItems=ret;
                        }
                    }
                })
                
        },
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
        components:{
            dropdownlist
        },
        watch:{
            rule(val){
               this.openExternalForm =val.isArticleMode
               this.selectTitleVal=val.articleTitle;
               this.selectAuthorVal=val.articleAuthor;
            }
        }
}
</script>

<style lang="less">
.external-modal{

    .chk_switch {
        display:none;
    }

    #divExternalForm .chk_switch + label {
        background-color: #fafbfa;
        padding: 6px !important;
        border-radius: 30px;
        display: inline-block !important;
        position: relative;
        margin-right: 30px !important;
        -webkit-transition: all 0.1s ease-in;
        transition: all 0.1s ease-in;
        width: 48px !important;
        height: 26px !important;
    }

    #divExternalForm .chk_switch + label:after {
        content: '关';
        position: absolute;
        top: 0;
        -webkit-transition: box-shadow 0.1s ease-in;
        transition: box-shadow 0.1s ease-in;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 100px;
        box-shadow: inset 0 0 0 0 #eee,0 0 1px rgba(0,0,0,0.4);
        text-align: right;
        padding-right: 8px;
        line-height: 26px;
        color: #ffffff;
        background-color:#999999;
    }
    #divExternalForm .chk_switch + label:before {
        content: ' ';
        position: absolute;
        background: white;
        top: 1px !important;
        left: 1px !important;
        z-index: 999999;
        width: 25px !important;
        -webkit-transition: all 0.1s ease-in;
        transition: all 0.1s ease-in;
        height: 25px !important;
        border-radius: 100px;
        margin-top:0 !important;
        box-shadow: 0 3px 1px rgba(0,0,0,0.05),0 0px 1px rgba(0,0,0,0.3);
    }

    #divExternalForm .chk_switch:active + label:after {
        box-shadow: inset 0 0 0 0 #eee,0 0 1px #eee;
    }

    #divExternalForm .chk_switch:active + label:before {
        width: 37px;
    }
    #divExternalForm .chk_switch:checked:active + label:before {
        width: 37px;
        left: 20px;
        background-color: #ffffff !important;
    }
    #divExternalForm .chk_switch + label:active {
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(0,0,0,0.1);
    }

    #divExternalForm .chk_switch:checked + label:before {
        background-color: #ffffff !important;
        content: ' ';
        position: absolute;
        left: 26px !important;
        border-radius: 100px;
    }

    #divExternalForm .chk_switch:checked + label:after {
        content: '开';
        position: absolute;
        background: #37ABFD;
        box-shadow: 0 0 1px #37ABFD;
        text-align: left;
        line-height: 26px;
        padding-left: 8px;
        color:#ffffff;
    }

    .ExternalForm_content > div {
        padding:5px 6px;
    }

    .externallink > div {
    padding-top:5px;
    padding-bottom:6px;
    }

    .externalqrcode > div {
        padding-top:8px;
    }

    .ivu-modal-footer{
        border-top-width:0 !important;
    }
    }



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
        height:306px;
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
// src/components/sheetdesigner/externalForm/external-form.vue
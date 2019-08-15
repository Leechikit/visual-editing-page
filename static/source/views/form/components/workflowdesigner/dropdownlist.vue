<template>
    <div class="dropdown" v-clickoutside="{handler:handleClose}" :style="{width:width+'px',height:height+'px'}">
        <div class="content" @click="show()" :style="{'font-size':fontSize?fontSize+'px':'14px'}">
            <span v-if="!selectedValue&&!selectedItem" :style="{color:color?color:'#999'}">{{placeHolder}}</span>
            <span v-if="selectedItem" style="color:#333">{{selectedItem.Text}}</span>
        </div>
        <span class="icon icon-arrow-down2" @click="show()"></span>
        <ul v-show="expanded" :style="{top:height+'px',left:0}">
            <li v-for="item in source" :key="item.Value" :class="[item.Value==selectedValue?'active':'']" @click="chooseItem(item)">{{item.Text}}</li>
        </ul>
    </div>
</template>
    
<script>
    import clickoutside from './clickoutside.js';
    export default{
        name:'dropdownlist',
        data(){
            return {
                selectedItem:null,
                expanded: false
            }
        },
        directives:{
            clickoutside
        },
        props:[
            'width',
            'height',
            'fontSize',
            'color',
            'placeHolder',
            'source',
            'value'
        ],
        created(){
        },
        mounted(){
        },
        methods:{
            handleClose(){
                this.expanded=false;
            },
            chooseItem(item){
                this.expanded=false;
                this.selectedItem=item;
                if(item.Value!=this.value){
                    //触发变更事件
                    this.$emit('change',item.Value);
                }
               // this.value=item.Value;
                this.$emit('update',item.Value);
            },
            show(){
                this.expanded=!this.expanded;
            }
        },
        computed:{
            selectedValue: function(){
                if(this.value || this.value===0){
                    let exists=false;
                    if(this.source && this.source.length>0){
                        for (let item of this.source){
                            if(item.Value==this.value){
                                exists=true;
                                this.selectedItem=item;
                                break;
                            }
                        }
                        if(!exists){
                            this.selectedItem={
                                Text:this.value,
                                Value:this.value
                            };   
                        }
                    }
                } else {
                    this.selectedItem = null;
                }
                return this.value;
            }
        },
        watch:{
            source: function(){
                
            }
        }
    }
    
</script>
<style lang="less">
    div.dropdown{
        position: relative;
        padding-right: 35px;
        border-radius: 3px;
        border: 1px solid #d6d4d4;
        margin-bottom: 8px;
        cursor: pointer;
        .content{
            display:block;
            height: 30px;
            line-height: 30px;
            text-align: left;
            padding-left: 3px;
            overflow: hidden;
            white-space: nowrap;
            word-break: normal;
            text-overflow: ellipsis;
            // font-size: 14px;
            // color: #999;
        }
        .icon {
            float: right;
            font-size: 20px;
            padding: 4px 7px;
            margin-right: -35px;
            margin-top: -30px;
            border-left:1px solid #dddedd;
            color: #2d7fff;
        }
        ul {
            position: absolute;
            width: 100%;
            max-height: 280px;
            overflow: auto;
            overflow-x: hidden;
            border-radius: 0 0 3px 3px;
            border: 1px solid #ddd;
            border-top: 0;
            background: #fff;
            z-index: 9999;
            li{
                display:block;
                text-align: left;
                height: 30px;
                line-height: 30px;
                padding-left: 3px;
                cursor: default;
                color: #666;
                &:hover{
                    background-color: #e8f4fe;
                }
                &.active {
                    color: #fff;
                    background: #4b9bed !important;
                    border-bottom: 0;
                }
                
            }
        } 
    }

    .activityrule-container input:focus{
        border: 1px solid #2d7fff;
        outline: none;
    }
    
</style>


// WEBPACK FOOTER //
// src/components/workflowdesigner/dropdownlist.vue
<template>
    <li v-if="node"  @click.stop.prevent="click(node)" :style="{'padding-left':(hideRootNode && level <= 1 ? 10 : node.HasChild ? 15 : 30)+'px'}">
        <div v-if="!hideRootNode || level != 0" class="tree-node" >
            <template v-if="node.HasChild">
                <span @click.stop.prevent="expand(node)" v-if="node.IsExpanded"><Icon type="arrow-down-b"></Icon></span>
                <span @click.stop.prevent="expand(node)" v-else><Icon type="arrow-right-b"></Icon></span>
            </template>
            <div class="node" :title="node.Name">
                <template v-if="node.UnitType">
                    <span class="node-flag" :class="[ showIcon && node.IconClass ? node.IconClass : '' ]"></span>
                </template>
                <div class="node-name" :class="[node.Active?'active':'']">{{node.Name}}</div>
            </div>
            <div class="chk-contanier" v-if="canSelect">
                <Checkbox v-model="node.Active" v-if="checkMode!=1" @on-change="check(node)"></Checkbox>
                <Radio v-model="node.Active" v-if="checkMode==1" @on-change="check(node)"></Radio>
            </div>
        </div>
        <ul v-show="node.IsExpanded">
            <treeview v-for="child in node.Childrens" 
                :hide-root-node="hideRootNode"
                :parent="node" 
                :node="child"
                :root="root"
                :can-select="canSelect" 
                :level="level+1" 
                :check-mode="checkMode" 
                :name-space="nameSpace"  
                :key="child.ObjectId"
                :show-icon="showIcon"></treeview>
        </ul>
    </li>
</template>

<script>
    import Vue from 'vue';
    import {Checkbox,Radio} from 'iview';
    
    export default {
        name:'treeview',
        data(){
            return {
                paramObj:{result:false},
                icons:[]
            }
        },
        created(){
        },
        mounted(){
        },
        components: {
            Checkbox,
            Radio
        },
        props:[
            'node',
            'root',
            'hideRootNode',
            'canSelect',
            'level',
            'parent',
            'checkMode',
            'nameSpace',
            'showIcon'
        ],
        methods:{
            expand(node){
                this.$root.eventHub.$emit('expand.'+this.nameSpace,node,this);
            },
            check(node){
                this.$root.eventHub.$emit('check.'+this.nameSpace,node,this);
            },
            click(node){
                if(this.canSelect){
                    if(this.checkMode==1 && !node.Active){
                        //单选,去除其它选中
                        this.paramObj.result=false;
                        this.setChildrenInActive(this.root,this.paramObj);
                    }
                   Vue.set(node,'Active',!node.Active);
                    this.check(node);
                }else{
                    this.$root.eventHub.$emit('click.'+this.nameSpace,node,this);
                }
            },
            //引用传参
            setChildrenInActive(parent,obj){
                if(parent.Active){
                    obj.result=true;
                    Vue.set(parent,'Active',false);
                }else{
                    if(parent.Childrens && parent.Childrens.length>0){
                        for(var i=0,len=parent.Childrens.length;i<len && !obj.result;i++){
                            this.setChildrenInActive(parent.Childrens[i],obj);
                        }
                    }
                }
            }            
        }
        
    }
</script>

<style lang="less" scoped>
    li{
        position: relative;
        width: 100%;
        font-family: 'Microsoft YaHei';
        margin: 2px 0px;
        font-size: 14px;
        
        cursor: default;
        .node-name {
            display: inline-block;
            color: #333;
            
        }
        span.node-flag {
            color: #2d7fff;
            font-size: 12px;
        }
        div.chk-contanier {
            position: absolute;
            right: 10px;
            top: 0;
        }

        div.tree-node{
            padding: 4px 0 5px 0;
            box-sizing: border-box;
            &:hover{
                &:after{
                    content: '';
                    width: 900px;
                    margin-left: -100px;
                    height: 30px;
                    position: absolute;
                    top: 0;
                    left: -100px;
                    bottom: 0;
                    right: 0;
                    z-index: -1;
                    background-color: #e8f4fe;
                } 
            }   
        }

        div.node {
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 90%;
        }

        .ivu-icon-arrow-down-b:before{
            color: #2d7fff !important;
        }
    }
    
</style>


// WEBPACK FOOTER //
// src/lib/treeview.vue
<template>
    <li v-if="node"  @click.stop.prevent="click(node)" :style="{'padding-left':(hideRootNode && level <= 1 ? 10 : node.hasChild || node.HasChild ? 15 : 30)+'px'}">
        <div v-if="!hideRootNode || level != 0" class="tree-node-bg">
            <template v-if="node.hasChild || node.HasChild">
                <span @click.stop.prevent="expand(node)" :class="['icon-font-awesome',node.IsExpanded? 'icon-arrow-down':'icon-arrow-right']"></span>
            </template>
            <div class="node">
                <template v-if="node.UnitType">
                    <span class="node-flag" :class="[node.UnitType===1? 'icon-gongshi':'icon-zhuzi']"></span>
                </template>
                <div class="node-name" :class="[node.Active?'active':'']" :title="node.name"
                 :style="{'width':(140-level*20)+'px'}">
                    {{node.name}}
                </div>
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
                :key="child.id"
                :load-data="loadData"></treeview>
        </ul>
    </li>
</template>

<script>
    import Vue from 'vue';
    import {Checkbox,Radio} from 'iview';
    import {GetChildDepartment} from '../../service/getData';

    export default {
        name:'treeview',
        data(){
            return {
                paramObj:{result:false}
            }
        },
        created(){
            // this.$root.eventHub.on('loadData' + this.nameSpace,(data) => {
            //     this.$set(this.node,)
            // })
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
            'loadData',
        ],
        methods:{
            async expand(node){
                // this.$root.eventHub.$emit('expand.'+this.nameSpace,this.node,this);
                if(node.IsExpanded){
                    node.IsExpanded=false;
                }else{
                    if(!node.Childrens || node.Childrens.length===0){
                       let data = await this.loadData(node);
                       this.$set(this.node,'Childrens',data);
                    }
                    this.$set(this.node,'IsExpanded',true);
                }
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
        cursor: pointer;
        &:before{
            content: '';
            width: 100%;
            height: 22px;
            position: absolute;
            left: 0;
            top: 0;
            z-index: -10;
            margin-left: -30px;
        }
        .node-name {
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: bottom;
        }

        span.node-flag {
            color: #2d7fff;
            font-size: 12px;
        }
        div.chk-contanier {
            position: absolute;
            right: 10px;
            top: -6px;
        }
        div.node {
            display: inline-block;
            &.active {
                color: #2d7fff;
            }
        }
    }

    .tree-node-bg {
        padding: 2px;

        &:hover {
            background-color: #e8f4fe;
        }

        .icon-arrow-down,
        .icon-arrow-right {
            margin-right: 5px;
            font-size: 16px !important;
        }
    }
</style>


// WEBPACK FOOTER //
// src/components/workflowdesigner/treeview.vue

<template>
    <div style="padding-left: 12px;padding-top: 6px;">
        <!-- <div class="group">
            <div class="title">
                fx经理函数
                <i data-tip="对指定人员对应部门（指定部门或指定角色包含人员所属部门）的所有经理。" class='icon-tooltip icon-tips' ></i>
            </div>
            <div class="operation">
                <span class="icon-on"></span>
                <a href="javascript:;" @click="addManagerFn()">添加经理函数</a>
            </div>
        </div> -->
        <div class="group">
            <!-- <div class="title">
                fx逐层经理函数
                <i data-tip="对指定人员的所属部门（指定部门或指定角色包含人员所属部门）向上一级部门查找，逐层累加获取指定层级部门的所有经理。" class='icon-tooltip icon-tips' ></i>
            </div> -->
            <div class="operation">
                <span class="icon-on"></span>
                <a href="javascript:;" @click="addLevelManagerFn()">添加新的逐层经理函数</a>
            </div>
        </div>
        <div class="group">
            <!-- <div class="title">
                fx逐层经理函数
                <i data-tip="对指定人员的所属部门（指定部门或指定角色包含人员所属部门）向上一级部门查找，逐层累加获取指定层级部门的所有经理。" class='icon-tooltip icon-tips' ></i>
            </div> -->
            <div class="operation">
                <span class="icon-on"></span>
                <a href="javascript:;" @click="addStepMasterFn()">添加新的主管函数</a>
            </div>
        </div>
        <!-- <div class="group">
            <div class="title">
                fx角色查找函数
                <i data-tip="获取“角色”中对指定“人员”的同一部门层级相隔最近的所有成员；获取“角色”中属于指定“部门”或指定“部门”层级相隔最近的所有成员。
" class='icon-tooltip icon-tips' ></i>
            </div>
            <div class="operation">
                <span class="icon-on"></span>
                <a href="javascript:;" @click="addRoleSearchFn()">添加角色查找函数</a>
            </div>
        </div> -->
        <managerpanel  @ok="ok" @cancel="cancel" :show-flag="showManagerPanel" :title="managerTitle"></managerpanel>
        <stepmanagerpanel  @ok="ok" @cancel="cancel" :show-flag="showStepManagerPanel" :title="stepManagerTitle"></stepmanagerpanel>
        <rolesearchpanel @ok="ok" @cancel="cancel" :show-flag="showRoleSearchPanel" :title="roleSearchTitle"></rolesearchpanel>
        <stepmasterpanel  @ok="ok" @cancel="cancel" :show-flag="showStepMasterPanel" :title="stepMasterTitle"></stepmasterpanel>
    </div>
</template>
<script>
    import {NodeType,CheckMode} from '../../config/const';
    import managerpanel from './managerpanel'; 
    import stepmanagerpanel from './stepmanagerpanel'; 
    import rolesearchpanel from './rolesearchpanel';
    import stepmasterpanel from './stepmasterpanel';
    export default {
        name:'functionpane',
        data(){
            return {
                showManagerPanel:false,
                showStepManagerPanel:false,
                showRoleSearchPanel:false,
                showStepMasterPanel: false,
                managerTitle: '添加经理函数',
                stepManagerTitle: '添加逐层经理函数',
                stepMasterTitle: '添加主管函数',
                roleSearchTitle:'添加角色查找函数'
            }
        },
        components: {
            managerpanel,
            stepmanagerpanel,
            rolesearchpanel,
            stepmasterpanel
        },   
        methods:{
            addManagerFn(){
                this.showManagerPanel=true;
                // this.$emit('hide');
            },
            addLevelManagerFn(){
                this.showStepManagerPanel=true;
                // this.$emit('hide');
            },
            addStepMasterFn(){
                this.showStepMasterPanel=true;
                // this.$emit('hide');
            },
            addRoleSearchFn(){
                this.showRoleSearchPanel=true;
                // this.$emit('hide');
            },
            ok(node){
                if(node){
                    this.$store.commit('participant/addSelect',node);
                }
                this.showManagerPanel=false;
                this.showStepManagerPanel=false;
                this.showRoleSearchPanel=false;
                this.showStepMasterPanel = false;
                // this.$emit('show');
            },
            cancel(){
                this.showManagerPanel=false;
                this.showStepManagerPanel=false;
                this.showRoleSearchPanel=false;
                this.showStepMasterPanel = false;
                // this.$emit('show');
            }
        }
    }
</script>
<style lang="less" scoped>
    div.group {
        margin-bottom: 26px;
        div.operation{
            color: #2d7fff;
            font-size: 14px;
            a {
                color: #2d7fff;
            }
        }
    }
</style>


// WEBPACK FOOTER //
// src/components/workflowdesigner/functionpane.vue
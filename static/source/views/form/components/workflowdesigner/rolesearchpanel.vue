<template>
    <Modal v-model="show" @on-ok="ok" @on-cancel="cancel" :loading="loading" :title="title" :mask-closable="false"
        width="530px">
          <div style="margin-top: 14px;margin-left: 16px;">
            <div class="select-set">
                <table>
                    <tr>
                        <td>添加部门或人员</td>
                        <td>
                            <div class="value">
                                <div v-if="!$store.state.participant.RoleSearchNode" style="background-color: transparent;padding: 0;color: #999;">请从下方选择部门或人员</div>
                                <div v-if="$store.state.participant.RoleSearchNode">
                                    <template v-if="$store.state.participant.RoleSearchNode.NodeType==0">
                                        <span class="icon-gongshi" v-if="$store.state.participant.RoleSearchNode.UnitType===1"></span>
                                        <span class="icon-zhuzi" v-if="$store.state.participant.RoleSearchNode.UnitType===2"></span>
                                        <span class="icon-renwu" v-if="$store.state.participant.RoleSearchNode.UnitType===4"></span>
                                        <span>{{$store.state.participant.RoleSearchNode.Name}}</span>
                                        <span class="icon icon-close2" @click="removeCheck()"></span>
                                    </template>
                                    <template v-if="$store.state.participant.RoleSearchNode.NodeType==1">
                                        <span>{{$store.state.participant.RoleSearchNode.DisplayName}}</span>
                                        <span class="icon  icon-close2" @click="removeCheck()"></span>
                                    </template>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            设定角色
                        </td>
                        <td>
                            <dropdownlist 
                                :width="roleWidth"
                                :height="roleHeight"
                                :place-holder="rolePlaceHolder"
                                :source="roleSource"
                                :value="selectRole"
                                @update="val=>selectRole=val">
                                </dropdownlist>
                        </td>
                    </tr>
                </table>
            </div>
            <Tabs value="department">
                <TabPane label="部门" name="department">
                    <department :check-mode="checkMode" :name-space="departmentNameSpace" :root="departmentSource"></department>
                </TabPane>
                <TabPane label="人员" name="user">
                    <user :check-mode="checkMode" :name-space="userNameSpace" :root="userSource"></user>
                </TabPane>
                <TabPane label="人员部门控件" name="usercontrols">
                    <participantcontrol :check-mode="checkMode" :source="variableSource" :name-space="controlNameSpace"></participantcontrol>
                </TabPane>
                
            </Tabs>
          </div>
        
        <div slot="footer" class="bottom_btns">
            <a class="confirm" @click="ok()">确定</a>
            <a class="cancel" @click="cancel()">取消</a>
        </div>
  </Modal>
</template>
<script>
    import {NodeType,CheckMode} from '../../config/const';
    import dropdownlist from './dropdownlist';
    import department from './department';
    import user from './user';
    import participantcontrol from './participantcontrol';
    export default {
        name:'rolesearchpanel',
        data(){
            return {
                show: false,
                departmentNameSpace:'SEARCHROLE-Department',
                userNameSpace:'SEARCHROLE-User',
                controlNameSpace:'SEARCHROLE-Control',
                checkMode: CheckMode.Radio,
                departmentSource: null,
                userSource:null,
                variableSource:null,
                selectRole:null,
                loading: true,
                roleWidth: 264,
                roleHeight: 30,
                rolePlaceHolder: '选择角色',
                // roleSource:[]
            }
            
        },
        created(){
            
        },
        props:[
            'showFlag',
            'title'
        ],
        components:{
            department,
            user,
            participantcontrol,
            dropdownlist
        },
        mounted(){
            
        },
        methods:{
            removeCheck(){
                this.$store.state.participant.RoleSearchNode=null;
            },
            changeLoading(){
                this.$nextTick(()=>{
                    this.loading=true;
                });
                this.loading=false;
            },
            ok(){
                //弹窗提示
                if(!this.selectRole){
                    $.IShowWarn('请先选择一个角色');
                    this.changeLoading();
                    return;
                }
                if(!this.$store.state.participant.RoleSearchNode){
                    $.IShowWarn('请先选择一个部门、人员或参与者变量');
                    this.changeLoading();
                    return;
                }
                let node=this.$store.state.participant.RoleSearchNode;
                let tmp=null; 
                let displayName='';
                for(let role of this.$store.state.participant.OrgRoles){
                    if(role.ObjectId===this.selectRole){
                        displayName=role.Name;
                        break;
                    }
                }
                if(node.ObjectId){
                    tmp={
                        NodeType: NodeType.Function,
                        Formula: 'SEARCHROLE(u('+node.ObjectId+'),u('+this.selectRole+'))',
                        DisplayName: 'SEARCHROLE('+node.Name+','+displayName+')'
                    }
                }else{
                    tmp={
                        NodeType: NodeType.Function,
                        Formula: 'SEARCHROLE('+node.Name+',u('+this.selectRole+'))',
                        DisplayName: 'SEARCHROLE('+node.DisplayName+','+displayName+')'
                    }
                }
                this.$emit("ok",tmp);
                this.departmentSource=null;
                this.userSource=null;
                this.variableSource=null;
                this.$store.state.participant.RoleSearchNode=null;
            },
            cancel(){
                this.departmentSource=null;
                this.userSource=null;
                this.variableSource=null;
                this.$store.state.participant.RoleSearchNode=null;
                this.$emit("cancel");
            }
        },
        computed:{
            roleSource: function(){
                let res=[];
                
                return res;
            }
        },
        watch:{
            showFlag:function(){
                this.show = this.showFlag;
                this.$store.state.participant.RoleSearchNode=null;
                if(this.showFlag){
                    if(!this.departmentSource){
                        this.departmentSource=$.extend(true,{},this.$store.state.participant.RootNode);
                    }
                    if(!this.userSource){
                        this.userSource=$.extend(true,{},this.$store.state.participant.RootNode);
                    }
                    if(!this.variableSource){
                        this.variableSource=$.extend(true,[],this.$store.state.participant.Variables);
                    }
                }
            },
            roleSource(val){

            }
        }
    }
</script>
<style lang="less" scoped>
    .ivu-modal-content{
        height: 500px;
    }
    div.select-set {
        // margin-bottom: 12px;
        table tr{
            display: block;
            margin-bottom: 8px;
            td:first-child {
                width: 100px;
                color: #333;
                text-align: left;
            }
            td:last-child {
                padding-left: 10px;
                min-width: 264px;
                color: #999;
                text-align: left;
            }
            td {
                div.value {
                    width:264px ;
                    height: 30px;
                    padding-left: 3px;
                    line-height: 30px;
                    border: 1px dashed #d6d4d4;
                    border-radius: 2px;
                    padding-top: 3px;
                    div{
                        background-color: #e8f4f8;
                        color: #2d7fff;
                        width: max-content;
                        padding: 0 10px;
                        height: 22px;
                        line-height: 22px;
                    }
                }
            }
        }
        
    }
</style>



// WEBPACK FOOTER //
// src/components/workflowdesigner/rolesearchpanel.vue
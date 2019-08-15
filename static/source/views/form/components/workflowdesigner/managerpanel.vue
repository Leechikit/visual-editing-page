<template>
    <Modal v-model="show" @on-ok="ok" @on-cancel="cancel" :title="title" :mask-closable="false"
        width="530px">
       <div style="margin-top: 15px;margin-left: 26px;margin-right: 26px;">
            <div class="result-set">
            <span v-if="!$store.state.participant.ManagerNode" style="color:#999;">请从下方选择内容</span>    
            <div v-if="$store.state.participant.ManagerNode">
                <span class="icon-fx" ></span>
                <span>{{$store.state.participant.ManagerNode.DisplayName}}</span>
                <span class="icon-close2" @click="removeCheck()"></span>
            </div>
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
    import department from './department';
    import user from './user';
    import participantcontrol from './participantcontrol';
    export default {
        name:'managerpanel',
        data(){
            return {
                show: false,
                departmentNameSpace:'MANAGER-Department',
                userNameSpace:'MANAGER-User',
                controlNameSpace:'MANAGER-Control',
                checkMode: CheckMode.Radio,
                departmentSource: null,
                userSource:null,
                variableSource:null
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
            participantcontrol
        },
        methods:{
            removeCheck(){
                this.$store.state.participant.ManagerNode=null;
                this.$root.eventHub.$emit('Manager-RemoveFromSet');
            },
            ok(){
                let res=null;
                if(this.$store.state.participant.ManagerNode){
                    res=this.$store.state.participant.ManagerNode;
                }
                this.$emit("ok",res);
                this.departmentSource=null;
                this.userSource=null;
                this.variableSource=null;
                this.$store.state.participant.ManagerNode=null;
            },
            cancel(){
                this.departmentSource=null;
                this.userSource=null;
                this.variableSource=null;
                this.$store.state.participant.ManagerNode=null;
                this.$emit("cancel");
            }
        },
        watch:{
            showFlag:function(){
                this.show = this.showFlag;
                this.$store.state.participant.ManagerNode=null;
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
        }
    }
</script>
<style lang="less" scoped>
    
    div .result-set{
        margin-left: 0;
        margin-right: 0;
    }
    .ivu-btn{
        width:100px;
    }
</style>



// WEBPACK FOOTER //
// src/components/workflowdesigner/managerpanel.vue
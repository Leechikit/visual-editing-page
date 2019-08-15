<template>
    <Modal v-model="show"  @on-cancel="cancel" :title="title" :loading="loading" :mask-closable="false"
        width="530px">
        <div style="margin-top: 15px;margin-left: 16px;">
            <div class="select-set">
                <table>
                    <tr>
                        <td>添加部门或人员</td>
                        <td>
                            <div class="value">
                                <div v-if="!$store.state.participant.StepMasterNode" style="background-color: transparent;padding: 0;color: #999;">请从下方选择部门或人员</div>
                                <div v-if="$store.state.participant.StepMasterNode">
                                    <template v-if="$store.state.participant.StepMasterNode.NodeType==0">
                                        <span class="icon-gongshi" v-if="$store.state.participant.StepMasterNode.UnitType===1"></span>
                                        <span class="icon-zhuzi" v-if="$store.state.participant.StepMasterNode.UnitType===2"></span>
                                        <span class="icon-renwu" v-if="$store.state.participant.StepMasterNode.UnitType===4"></span>
                                        <span>{{$store.state.participant.StepMasterNode.DisplayName ||
                                            $store.state.participant.StepMasterNode.displayName ||
                                            $store.state.participant.StepMasterNode.name}}</span>
                                        <span class="icon icon-close2" @click="removeCheck()"></span>
                                    </template>
                                    <template v-if="$store.state.participant.StepMasterNode.NodeType==1">
                                        <span>{{$store.state.participant.StepMasterNode.DisplayName ||
                                            $store.state.participant.StepMasterNode.displayName ||
                                            $store.state.participant.StepMasterNode.name}}</span>
                                        <span class="icon  icon-close2" @click="removeCheck()"></span>
                                    </template>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            设定部门层级
                        </td>
                        <td>
                            <dropdownlist 
                                :width="levelWidth"
                                :height="levelHeight"
                                :place-holder="levelPlaceHolder"
                                :source="levelSource"
                                :value="level"
                                @update="val=>level=val">
                            </dropdownlist>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            每层指定主管人数
                        </td>
                        <td>
                            <dropdownlist
                                :width="levelWidth"
                                :height="levelHeight"
                                :place-holder="levelPlaceHolder2"
                                :source="levelSource"
                                :value="levelPeople"
                                @update="val=>levelPeople=val">
                            </dropdownlist>
                        </td>
                    </tr>
                    <tr>
                        <td>是否逐层查找</td>
                        <td>
                            <RadioGroup v-model="levelSearch">
                                <Radio label="true"> 是</Radio>
                                <Radio label="false"> 否</Radio>
                            </RadioGroup>
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
        name:'stepmasterpanel',
        data(){
            return {
                show: false,
                departmentNameSpace:'STEPMASTER-Department',
                userNameSpace:'STEPMASTER-User',
                controlNameSpace:'STEPMASTER-Control',
                checkMode: CheckMode.Radio,
                departmentSource: null,
                loading: false,
                userSource:null,
                variableSource:null,
                level:null,
                levelPeople: null,
                levelWidth: 264,
                levelHeight: 30,
                levelPlaceHolder: '设定部门层级',
                levelPlaceHolder2: '指定每层主管人数',
                levelSource:[],
                levelSearch: 'true'
            }
            
        },
        created(){
            for(let i=1;i<10;i++){
                this.levelSource.push({
                    Value: i,
                    Text: i
                });
            }
        },
        props:[
            'showFlag',
            'title',
        ],
        components:{
            department,
            user,
            participantcontrol,
            dropdownlist
        },
        methods:{
            removeCheck(){
                this.$store.state.participant.StepMasterNode=null;
            },
            ok(){
                //弹窗提示
                // if(this.level===null){
                //     $.IShowWarn('请先输入部门层级');
                //     this.loading=false;
                //     return;
                // }
                // if(!this.$store.state.participant.StepMasterNode){
                //     $.IShowWarn('请先选择一个部门、人员或参与者变量');
                //     this.loading=false;
                //     return;
                // }
               
                let tmp=null;
                let node=this.$store.state.participant.StepMasterNode;
                // if (node && node.ObjectId) {
                //     tmp={
                //         NodeType: NodeType.Function,
                //         Formula: `RECURSIVEMANAGERSOF(${node.Type === 0 ? 'o(' :
                //             'u('}${node.ObjectId}),${this.level||''},${this.levelSearch})`,
                //         DisplayName: `RECURSIVEMANAGERSOF(${node.Name||node.name},${
                //             this.level||''},${this.levelSearch})`
                //     }
                // }else{
                    let firstParam = '';
                    if (node && (node.Type !== undefined || node.type !== undefined)) {
                        firstParam = (node.Type === 0 ? 'o(' : 'u(') + node.id + ')';
                    }
                    else if (node && node.NodeType === 1 && node.controlKey === 26) {
                        if (node.unitType === 2) {
                            firstParam = `so{${node.controlId}}`;
                        } else if (node.unitType === 4) {
                            firstParam = `su{${node.controlId}}`;
                        }
                    }
                    tmp={
                        NodeType: NodeType.Function,
                        Formula: `RECURSIVEMASTERSOF(${firstParam},${this.level||''},${
                            this.levelSearch},${this.levelPeople||''})`,
                        DisplayName: `RECURSIVEMASTERSOF(${node ? (node.DisplayName ||
                          node.displayName || node.name) : ''},${this.level||''},${this.levelSearch},${this.levelPeople||''})`
                    }
                // }
                this.$emit("ok",tmp);
                this.departmentSource=null;
                this.userSource=null;
                this.variableSource=null;
            },
            cancel(){
                // this.node=null;
                this.$store.state.participant.StepMasterNode=null;
                this.departmentSource=null;
                this.userSource=null;
                this.variableSource=null;
                this.$store.state.participant.StepMasterNode=null;
                this.$emit("cancel");
            }
        },
        computed:{
            
        },
        watch:{
            showFlag:function(){
                this.show = this.showFlag;
                this.level = '';
                this.levelPeople = '';
                this.$store.state.participant.StepMasterNode=null;
                if(this.showFlag){
                    if(!this.departmentSource){
                        this.departmentSource=$.extend(true,{},this.$store.state.participant.RootNode);
                    }
                    if(!this.userSource){
                        this.userSource=$.extend(true,{},this.$store.state.participant.RootNode);
                    }
                    if(!this.variableSource){
                        this.variableSource=$.extend(true,[],this.$store.state.participant.Variables)
                            .filter(item => item.controlKey === 26);
                    }
                }
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
                width: 120px;
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

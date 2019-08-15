<template>
    <div>
        <div class="search">
            <input type="text" style="width: 100%;padding-left: 18px;height: 34px;border: none;" v-model="keyword" @input="searchUser()" placeholder='搜索人员'  />
            <span style="position: absolute;right: 18px;top: 10px;" v-show="!keyword"><Icon type="ios-search-strong"></Icon></span>
            <span style="position: absolute;right: 18px;top: 10px;"  v-show="keyword" @click="resetUserSearch()"><Icon type="ios-search-strong"></Icon></span>
        </div>
        <div class="user-layout"  v-show="!keyword">
            <div class="left">
                <ul>
                    <treeview :node="root" :root="root" :can-select="canSelect" :level="level" :name-space="nameSpace" :load-data="getChildDepartments"  ></treeview>
                </ul>
            </div>
            <div class="right"  v-show="!keyword">
                <div v-if="$store.state.participant.ActiveUnit">
                    <ul>
                        <li v-for="(user,index) in childUsers" v-if="user.id"  @click="toggleUser(user,index)"   :key="user.id">
                            <span class="icon-renwu" style="color:#2d7fff;"></span>
                            <span class="node-name" @click="toggleCheck(user,4)">{{user.userName}}</span>
                            <div class="chk-contanier" >
                                <Checkbox v-model="user.Active" v-if="checkMode!=1"  @on-change="toggleCheck(user,4)" @click.native.prevent></Checkbox>
                                <Radio v-model="user.Active" v-if="checkMode==1"  @on-change="toggleCheck(user,4)" @click.native.prevent></Radio>                                
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="search-container" v-show="keyword">
            <ul>
                <li v-for="(user,index) in searchedResults" @click="toggleUser(user,index)" :key="index + user.id">
                    <span class="icon-renwu"  style="color:#2d7fff;"></span>
                    <span class="node-name">{{user.userName + '-' + user.DepartmentName}}</span>
                    <div class="chk-contanier" >
                        <Checkbox v-model="user.Active" v-if="checkMode!=1"  @on-change="toggleCheck(user,4)" @click.native.prevent></Checkbox>
                        <Radio v-model="user.Active" v-if="checkMode==1"  @on-change="toggleCheck(user,4)" @click.native.prevent></Radio>
                    </div>
                </li>
            </ul>
            
        </div>
    </div>
</template>
<script>
    import {Checkbox,Radio} from 'iview';
    import treeview from './treeview';
    import {SearchUsers,GetChildDepartment} from '../../service/getData';
    import {NodeType,CheckMode} from '../../config/const';
    import userApi from '@/api/user.js';
    import { debounce } from '@/util/utils.js';
    export default {
        name:'user',
        data(){
            return {
                keyword: null,
                searchedResults:[],
                canSelect:false,
                childUsers:[],
                level: 0
            }
        },
        components:{
            treeview,
            Checkbox,
            Radio
        },
        props:[
            'checkMode',
            'nameSpace',
            'root'
        ],
        created(){
            var that=this;
            this.$root.eventHub.$on('expand.'+this.nameSpace,function(node,vm){
                // node.IsExpanded=!node.IsExpanded;
                // if(node.IsExpanded && (!node.Childrens || node.Childrens.length===0)){
                //     that.getChildDepartments(node);
                // }
                if(node.IsExpanded){
                    node.IsExpanded=false;
                }else{
                    if(!node.Childrens || node.Childrens.length===0){
                        that.getChildDepartments(node);
                    }else{
                        node.IsExpanded=true;
                    }
                }
            });
            this.$root.eventHub.$on('click.'+this.nameSpace,function(node,vm){
                 that.$store.dispatch('participant/getDepartmentUsers',node);
            });
            this.$root.eventHub.$on('removeUserFromResultSet',function(node){
                that.removeSelected(node);
                that.removeSearchSelected(node);
            });
            this.$root.eventHub.$on('hide.user',function(){
                that.keyword='';
            })
            // 防抖函数
            this.searchUser = debounce(this.searchUser, 500, this);
        },
        methods:{
            async filterUsers(start, length, keyword){
                let data = await userApi.searchUserByName({userName: keyword});
                var arrayUnit = [];
                 data.userList.forEach(user => {
                    this.hasSelect(user);
                    arrayUnit.push({ 
                        "id": user.id, 
                        "Code": null, 
                        "userName": user.userName,
                        "DisplayName": user.userName,
                        "Type": 4, // 屏蔽
                        "Icon": null,
                        "Active": user.Active,
                        "DepartmentName": user.organName, 
                    });
                 })
                //let res=await SearchUsers(start,length,keyword);
                this.searchedResults=arrayUnit; 
            },
            async getChildDepartments(node){
                let res=await GetChildDepartment(node.id);
                if(res.code == 0){
                    // node.IsExpanded=true;
                    // node.Childrens=res.page.result;
                    return res.page.result;
                }
            },
            
            resetUserSearch() {
                this.keyword=null;
            },
            resetRoleSearch() {
                this.keyword=null;
            },
            searchUser() {
                if(!this.keyword){
                    return;
                }
                this.filterUsers(0, 500, this.keyword);
            },
            toggleUser(user,index){
                //单选模式
                if(this.checkMode===1 && !user.Active){
                    if(this.keyword){
                        for(let node of this.searchedResults){
                            if(node.Active){
                                this.$set(node,'Active',false);
                                break;
                            }
                        }
                    }else{
                        for(let node of this.childUsers){
                            if(node.Active){
                                this.$set(node,'Active',false);
                                break;
                            }
                        }
                    }
                    
                }
                let tmp=$.extend(true,{},user);
                tmp.Active=!user.Active;;
                if(this.keyword){
                    this.searchedResults.splice(index,1,tmp);
                }else{
                    this.childUsers.splice(index,1,tmp);
                }
                this.toggleCheck(tmp,4);
            },
            toggleCheck(node,unitType){

                if(node.Active){
                    //node.Active=true;
                    if(this.nameSpace==="MANAGER-User"){
                        this.$store.state.participant.ManagerNode=null;
                        let tmp=null;
                        if(node.id){
                            tmp={
                                Formula:'MANAGEROF(u('+node.id+'))',
                                DisplayName:'MANAGEROF('+node.Name+')',
                                NodeType: NodeType.Function
                            }
                        }
                        this.$store.state.participant.ManagerNode=tmp;
                    }else if(this.nameSpace==='STEPMANAGER-User'){
                        node.NodeType=NodeType.Unit;
                        this.$store.state.participant.StepManagerNode=node;
                    }else if(this.nameSpace==='STEPMASTER-User'){
                        node.NodeType=NodeType.Unit;
                        this.$store.state.participant.StepMasterNode=node;
                    }else if(this.nameSpace==='STAFFMSG-User'){
                        node.NodeType=NodeType.Unit;
                        this.$store.state.participant.StaffMsgNode=node;
                        this.$store.state.participant.SelectedParticipants = [node];
                    }else if(this.nameSpace === "SEARCHROLE-User"){
                        node.NodeType=NodeType.Unit;
                        this.$store.state.participant.RoleSearchNode=node;
                    }else{
                        node.NodeType=NodeType.Unit;
                        node.UnitType=unitType;
                        if(this.checkMode==1){
                            this.$store.state.participant.SelectedParticipants=[];
                        }
                        this.$store.commit('participant/addSelect',node);
                    }
                    return;
                   
                }else{
                    if(this.nameSpace ==='MANAGER-User'){
                        this.$store.state.participant.ManagerNode=null;
                    }else if(this.nameSpace==='STEPMANAGER-User'){
                        this.$store.state.participant.StepManagerNode=null;
                    }else if(this.nameSpace==='STEPMASTER-User'){
                        this.$store.state.participant.StepMasterNode=null;
                    }else if(this.nameSpace==='STAFFMSG-User'){
                        this.$store.state.participant.StaffMsgNode=null;
                        this.$store.state.participant.SelectedParticipants = [];
                    }else if(this.nameSpace==='SEARCHROLE-User'){
                        this.$store.state.participant.RoleSearchNode=null;
                    }else{
                        node.NodeType=NodeType.Unit;
                        node.UnitType=unitType;
                        this.$store.commit('participant/removeSelect',node);
                    } 
                }
            },
            removeSelected(user){
                for(let node of this.childUsers){
                    if(user.id===node.id){
                        node.Active=false;
                        return;
                    }
                }
            },
            removeSearchSelected(user){
                for(let node of this.searchedResults){
                    if(user.id===node.id){
                        node.Active=false;
                        return;
                    }
                }
            },
            hasSelect(user) {
                let participant = this.$store.state.participant;
                if (participant.SelectedParticipants.length > 0) {
                    participant.SelectedParticipants.some(node => {
                    if (node.id === user.id) {
                         user.Active=true;
                         return true;
                    }
                    return false;
                 })
               } 
            }

        },
        computed:{
            activeUnit: function(){
                return this.$store.state.participant.ActiveUnit;
            }
        },
        watch:{
            activeUnit(newVal,oldVal){
                if(newVal && newVal!=oldVal){
                     let participant = this.$store.state.participant;
                    let newUsers=$.extend(true,[],participant.OrgUsers[newVal.id]);
                    if(newUsers){
                        for(let user of newUsers){
                            user.Active=false;
                            //此处还要判断选中处理
                            this.hasSelect(user);
                        }
                    }
                    this.childUsers=newUsers;
                }
            },
            '$store.state.participant.SelectedParticipants'() {
                if (this.activeUnit) {
                    const newUsers = $.extend(true, [],
                      this.$store.state.participant.OrgUsers[this.activeUnit.id]);
                    if (newUsers) {
                        for (let user of newUsers) {
                            user.Active = false;
                            // 此处还要判断选中处理
                            this.hasSelect(user);
                        }
                    }
                    this.childUsers = newUsers;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    div.user-layout, 
    div.search-container {
        width:100%;
        height:218px;
        // overflow: auto;
        ul li{
            display: block;
            position: relative;
            padding-left: 10px;
            padding-top: 2px;
            padding-bottom: 2px;
            cursor: pointer;
            div.chk-contanier{
                position: absolute;
                right: 9px;
                top: -6px;
            }
        }
    }
    div.right,
    div.search-container {
        ul li {
            &:hover{
                background-color: #e8f4fe;    
            }
        }
    }
    div.user-layout div.left,div.user-layout div.right {
      display:inline-block;
      width:49.5%;
      height:100%;
      overflow:auto
    }
    div.search-container{
        overflow: auto;
    }
    nopadding{
        padding: 0;
    }
    
</style>


// WEBPACK FOOTER //
// src/components/workflowdesigner/user.vue
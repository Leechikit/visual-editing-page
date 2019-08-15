<template>
    <div>
        <div class="role-layout" v-show="!keyword">
            <div>
                <ul>
                    <li class="item" v-for="(role,index) in roles" @click="toggleRole(role,index)" :key="role.id">
                        <span class="icon-role" style="color: #2d7fff;"></span>
                        <span class="node-name" @click="toggleCheck(role,10)">{{role.name}}</span>
                        <div class="chk-contanier">
                            <Checkbox v-model="role.Active" @on-change="toggleCheck(role,10)"></Checkbox>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { Checkbox } from 'iview';
    import { GetAllRoles } from '../../service/getData';
    import { NodeType, CheckMode } from '../../config/const';
    import { mapGetters, mapMutations } from "vuex";
    export default {
        name: 'department',
        data() {
            return {
                keyword: null,
                roles: [],
                searchedResults: [],
              
            }
        },
        components: {
            Checkbox
        },
        created() {
            var that = this;
            var data = GlobalWorkflowProperties.DataItems
            for(var index of data){
                var temp={}
                temp.name = index.Text
                temp.id = index.Value
                temp.Active=false
                this.roles.push(temp)
            }
           
            this.$root.eventHub.$on('removeRoleFromResultSet', function (node) {
                that.removeSelected(node);
                that.removeSearchSelected(node);
            });
            this.$root.eventHub.$on('hide.role', function () {
                that.keyword = "";
            })
        },
        methods: {
          
            check(){
                let participant = this.$store.state.participant;
                if (this.roles && this.roles.length > 0) {
                    for (let role of this.roles) {
                            role.Active = false;
                         //此处还要判断选中处理
                           if (participant.SelectedParticipants.length > 0) {
                             participant.SelectedParticipants.some(node => {
                                if (node.id === role.id) {
                                     role.Active = true;
                                     return true;
                                }
                                return false;
                             })
                           } 
                    }
                }
                console.log(this.roles)
            },
           
            resetRoleSearch() {
                this.keyword = null;
            },
            toggleRole(role, index) {
                let tmp = $.extend(true, {}, role);
                tmp.Active = !role.Active;
                if (this.keyword) {
                    this.searchedResults.splice(index, 1, tmp);
                } else {
                    this.roles.splice(index, 1, tmp);
                }

                this.toggleCheck(tmp, 10);
            },
            toggleCheck(node, unitType) {
                if (node.Active) {
                    node.NodeType = NodeType.Feild;
                    node.UnitType = unitType;
                    this.$store.commit('participant/addSelect', node);
                } else {
                    node.NodeType = NodeType.Feild;
                    node.UnitType = unitType;
                    this.$store.commit('participant/removeSelect', node);
                }
            },
            removeSelected(node) {
                for (let role of this.roles) {
                    if (role.id === node.id) {
                        role.Active = false;
                        return;
                    }
                }
            },
            removeSearchSelected(node) {
                for (let role of this.searchedResults) {
                    if (role.id === node.id) {
                        role.Active = false;
                        return;
                    }
                }
            }
        },
        
    }
</script>
<style lang="less" scoped>
    div.role-layout,
    div.search-container {
        width: 100%;
        height: 218px;
        overflow: auto;
        ul li {
            display: block;
            position: relative;
            padding-left: 10px;
            padding-top: 2px;
            padding-bottom: 2px;
            cursor: pointer;
            div.chk-contanier {
                position: absolute;
                right: 10px;
                top: 0;
            }
            &:hover{
                background-color: #e8f4fe;    
            }
        }
    } // div.search-container{
    //     overflow: auto;
    // }

    
</style>


// WEBPACK FOOTER //
// src/components/workflowdesigner/role.vue
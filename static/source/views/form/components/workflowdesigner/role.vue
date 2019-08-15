<template>
    <div>
        <div class="search">
            <input type="text" v-model="keyword" style="width: 100%;padding-left: 18px;height: 34px;border: none;" placeholder='搜索角色' @input="searchRole()" />
            <span  style="position: absolute;right: 18px;top: 10px;" v-show="!keyword"><Icon type="ios-search-strong"></Icon></span>
            <span  style="position: absolute;right: 18px;top: 10px;" v-show="keyword" @click="resetRoleSearch()"><Icon type="ios-search-strong"></Icon></span>
        </div>
        <div class="role-layout" v-show="!keyword">
            <div>
                <ul>
                    <li class="item" v-for="(role,index) in roles" @click="toggleRole(role,index)" :key="role.id">
                        <span class="icon-role" style="color: #2d7fff;"></span>
                        <span class="node-name" @click="toggleCheck(role,8)">{{role.name}}</span>
                        <div class="chk-contanier">
                            <Checkbox v-model="role.Active" @on-change="toggleCheck(role,8)" @click.native.prevent></Checkbox>
                        </div>
                    </li>
                </ul>

            </div>

        </div>
        <div class="search-container" v-show="keyword">
            <div>
                <ul>
                    <li class="item" v-for="(role,index) in searchedResults" @click="toggleRole(role,index)" :key="role.id">
                        <span class="icon-role" style="color: #2d7fff;"></span>
                        <span class="node-name" @click="toggleCheck(role,8)">{{role.name}}</span>
                        <div class="chk-contanier">
                            <Checkbox v-model="role.Active" @on-change="toggleCheck(role,8)" @click.native.prevent></Checkbox>
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
    export default {
        name: 'department',
        data() {
            return {
                keyword: null,
                roles: [],
                searchedResults: []
            }
        },
        components: {
            Checkbox
        },
        created() {
            var that = this;
            this.$root.eventHub.$on('removeRoleFromResultSet', function (node) {
                that.removeSelected(node);
                that.removeSearchSelected(node);
            });
            this.$root.eventHub.$on('hide.role', function () {
                that.keyword = "";
            })
        },
        methods: {
            filterRoles(keyword) {
                this.searchedResults = this.roles.filter(item => item.name.includes(keyword))
            },
            searchRole() {
                if (!this.keyword) {
                    return;
                }
                this.filterRoles(this.keyword);
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

                this.toggleCheck(tmp, 8);
            },
            toggleCheck(node, unitType) {
                if (node.Active) {
                    node.NodeType = NodeType.Unit;
                    node.UnitType = unitType;
                    this.$store.commit('participant/addSelect', node);
                } else {
                    node.NodeType = NodeType.Unit;
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
        computed: {
            orgRoles: function () {
                let participant = this.$store.state.participant;
                let roles = participant.OrgRoles;
                if (roles && roles.length > 0) {
                    for (let role of roles) {
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
                    // this.roles = $.extend(true, [], roles);
                }
                return $.extend(true, [], roles);
            }
        },
        watch: {
            orgRoles(val) {
                if (val && val.length > 0) {
                  
                     this.roles = val;
                }
            }
        }

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
                top: -6px;
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
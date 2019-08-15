<template>
    <div>
        <div class="participant-control-layout">
            <div>
                <ul>
                    <li class="item" v-for="(variable,index) in controls" v-if="variable.controlId" @click="toggleVariable(variable,index)" :key="variable.controlId">
                        <span class="icon-control" style="color: #2d7fff;"></span>
                        <span class="node-name">{{variable.displayName}}</span>
                        <div class="chk-contanier">
                            <Checkbox v-model="variable.Active" v-if="checkMode!=1" @on-change="toggleCheck(variable)" @click.native.prevent></Checkbox>
                            <Radio v-model="variable.Active" v-if="checkMode==1" @on-change="toggleCheck(variable)" @click.native.prevent></Radio>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>
<script>
import { Checkbox, Radio } from "iview";
import { NodeType, CheckMode } from "../../config/const";
export default {
    name: "participantcntrol",
    data() {
        return {
            controls: []
        };
    },
    components: {
        Checkbox,
        Radio
    },
    created() {
        var that = this;
        this.$root.eventHub.$on("removeControlFromResultSet", function(node) {
            that.removeSelected(node);
        });
    },
    props: ["checkMode", "source", "nameSpace"],
    mounted() {
        if (this.aa && this.aa.length > 0) {
            const controls = [];
            for (let control of this.aa) {
                if (
                    control.subFullName &&
                    control.subFullName.indexOf(".") > 0
                ) {
                    //
                } else {
                    controls.push(control);
                }
            }
            this.controls = $.extend(true, [], controls);
        }
    },
    methods: {
        toggleVariable(variable, index) {
            if (this.checkMode === 1 && !variable.Active) {
                for (let control of this.controls) {
                    if (control.Active) {
                        this.$set(control, "Active", false);
                        break;
                    }
                }
            }
            // variable.Active=!variable.Active;
            let tmp = $.extend(true, {}, variable);
            tmp.Active = !variable.Active;
            this.controls.splice(index, 1, tmp);
            this.toggleCheck(tmp);
        },
        toggleCheck(node) {
            // if(node.Active){
            //     node.NodeType=NodeType.Variables;
            //     this.$store.commit('participant/addSelect',node);
            // }else{
            //     node.NodeType=NodeType.Variables;
            //     this.$store.commit('participant/removeSelect',node);
            // }
            if (node.Active) {
                if (this.nameSpace === "MANAGER-Control") {
                    this.$store.state.participant.ManagerNode = null;
                    let tmp = {
                        Formula: "MANAGEROF(" + node.controlId + ")",
                        displayName: "MANAGEROF(" + node.displayName + ")",
                        NodeType: NodeType.Function
                    };
                    this.$store.state.participant.ManagerNode = tmp;
                } else if (this.nameSpace === "STEPMANAGER-Control") {
                    node.NodeType = NodeType.Variables;
                    this.$store.state.participant.StepManagerNode = node;
                } else if (this.nameSpace === "STEPMASTER-Control") {
                    node.NodeType = NodeType.Variables;
                    this.$store.state.participant.StepMasterNode = node;
                } else if (this.nameSpace === "STAFFMSG-Control") {
                    node.NodeType = NodeType.Variables;
                    node.DisplayName = node.displayName;
                    this.$store.state.participant.StaffMsgNode = node;
                    this.$store.state.participant.SelectedParticipants = [node];
                } else if (this.nameSpace === "SEARCHROLE-Control") {
                    node.NodeType = NodeType.Variables;
                    this.$store.state.participant.RoleSearchNode = node;
                } else {
                    node.NodeType = NodeType.Variables;
                    this.$store.commit("participant/addSelect", node);
                }
            } else {
                if (this.nameSpace === "MANAGER-Control") {
                    this.$store.state.participant.ManagerNode = null;
                } else if (this.nameSpace === "STEPMANAGER-Control") {
                    this.$store.state.participant.StepManagerNode = null;
                } else if (this.nameSpace === "STEPMASTER-Control") {
                    this.$store.state.participant.StepMasterNode = null;
                } else if (this.nameSpace === "STAFFMSG-Control") {
                    this.$store.state.participant.StaffMsgNode = null;
                    this.$store.state.participant.SelectedParticipants = [];
                } else if (this.nameSpace === "SEARCHROLE-Control") {
                    this.$store.state.participant.RoleSearchNode = null;
                } else {
                    node.NodeType = NodeType.Variables;
                    this.$store.commit("participant/removeSelect", node);
                }
            }
        },
        removeSelected(node) {
            for (let control of this.controls) {
                if (control.controlId === node.controlId) {
                    control.Active = false;
                    return;
                }
            }
        }
    },
    watch: {
        aa(val) {
            if (val && val.length > 0) {
                let controls = [];
                for (let control of val) {
                    if (
                        control.subFullName &&
                        control.subFullName.indexOf(".") > 0
                    ) {
                    } else {
                        controls.push(control);
                    }
                }
                this.controls = $.extend(true, [], controls);
            }
        }
    },
    computed: {
        aa: function() {
            if (this.checkMode !== 1) {
                this.source &&
                    this.source.forEach(control => {
                        control.Active=false
                        this.$store.state.participant.SelectedParticipants.some(
                            node => {
                                node.controlId = node.controlId || node.id;
                                if (node.controlId === control.controlId) {
                                    control.Active = true;
                                    return true;
                                }
                                return false;
                            }
                        );
                    });
            } else {
                const selectOne = this.$store.state.participant
                    .SelectedParticipants[0];
                this.source &&
                    this.source.forEach(control => {
                        if (
                            selectOne &&
                            selectOne.controlId === control.controlId
                        ) {
                            control.Active = true;
                        } else {
                            control.Active = false;
                        }
                    });
            }
            return this.source;
        }
    }
};
</script>
<style lang="less" scoped>
.participant-control-layout {
    width: 100%;
    height: 218px;
    overflow-y: scroll;
    ul li {
        display: block;
        position: relative;
        padding-left: 10px;
        padding-top: 2px;
        padding-bottom: 2px;
        div.chk-contanier {
            position: absolute;
            right: 20px;
            top: -6px;
        }
        cursor: pointer;
        &:hover {
            background-color: #e8f4fe;
        }
    }
}
</style>


// WEBPACK FOOTER //
// src/components/workflowdesigner/participantcontrol.vue

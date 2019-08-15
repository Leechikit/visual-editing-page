<template>
    <div>
        <div class="layout">
            <div>
                <ul>
                    <li class="item">
                        <span class="icon-zhuzi" style="color: #2d7fff;"></span>
                        <span class="node-name" @click="toggleCheck()">当前用户所在部门</span>
                        <div class="chk-contanier">
                            <Checkbox v-model="currentDepartment"></Checkbox>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { Checkbox } from 'iview';
    import { NodeType, CheckMode } from '../../config/const';
    export default {
        name: 'others',
        data() {
            return {
                //keyword: null,
                //unitIds: [],
                currentDepartment: false
                //searchedResults:[]
            }
        },
        components: {
            Checkbox
        },
        created() {
        },
        methods: {
            toggleCheck() {
                this.currentDepartment = !this.currentDepartment;
            }
        },
        computed: {
        },
        watch: {
            currentDepartment(val) {
                let node = {
                    NodeType: NodeType.Unit,
                    ObjectId: -1,
                    Name: "当前用户所在部门",
                    UnitType: 2
                };
                if (val) {
                    this.$store.commit("addSelect", node);
                } else {
                    this.$store.commit("removeSelect", node);
                }
            }
        }

    }
</script>
<style lang="less" scoped>
    div.layout {
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
                right: 20px;
                top: 0;
            }
            &:hover{
                background-color: #e8f4fe;    
            }
        }
    }
</style>


// WEBPACK FOOTER //
// src/components/workflowdesigner/others.vue
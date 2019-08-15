<template>
    <div>
        <Row id="filterItemWrapper" v-show="operationOption && operationOption.showOperationRange">
            <div  class="title">
                操作范围<sub>可对目标表单中哪些数据进行操作</sub>
                <p><sub>注：只对符合以下条件的数据进行操作，不设置条件则不操作</sub></p>
            </div>
            <div>
                <span @click="addOperationRangeCondition" class="addbtn">
                    <Icon type="plus-round" color="#2d7FFF" size=15 />
                    <span>添加过滤条件</span>
                </span>
            </div>
            <div class="filter-item" v-for="(filter, fIndex) in filters" :key="filter.value">
                <filter-item :filter="filter" 
                    :filter-index="fIndex"
                    :supported-compare-types="compareTypes"
                    :supported-logic-operators="logicOperators"
                    :target-sheet-fields-root-node="targetSheetFieldsRootNode"
                    :current-sheet-fields-root-node="currentSheetFieldsRootNode"
                    :filter-type="filterType"
                    @remove="removeOperationRangeCondition"></filter-item>
            </div>
        </Row>

        <Row id="operationItemWrapper" v-show="operationOption && operationOption.showConcretOperation">
            <div class="title">具体操作<sub>对数据的具体操作-{{ operationOption.text }}</sub></div>
            <div v-show="!operationOption.operateFileAttachment">
                <span @click="addOperation" class="addbtn">
                    <Icon type="plus-round" color="#2d7FFF" size=15 />
                    <span>添加操作</span>
                </span>
            </div>
            <div v-show="operationOption.operateFileAttachment">
                <attachment-operation-item :operations="operations"
                    :operation-option="operationOption"
                    :target-sheet-fields-root-node="targetSheetFieldsRootNode"
                    :current-sheet-fields-root-node="currentSheetFieldsRootNode"></attachment-operation-item>
            </div>
            <div v-show="!operationOption.operateFileAttachment" class="operation-item" 
                v-for="(operation, oIndex) in operations" 
                :key="oIndex">
                <operation-item :operation-option="operationOption"
                    :operation="operation"
                    :operation-index="oIndex"
                    :operations="operations"
                    :target-sheet-fields-root-node="targetSheetFieldsRootNode"
                    :current-sheet-fields-root-node="currentSheetFieldsRootNode"
                    :operation-type="operationType"
                    @remove="removeOperation"></operation-item>
            </div>
            
        </Row>
    </div>
</template>

<script>
    import FilterItem from "./filter-item";
    import OperationItem from "./operation-item";
    import AttachmentOperationItem from "./attachment-operation-item";

    const COMPARE_OPERATORS = {
        equal: "==",
        notEqual: "!=",
        gt: ">",
        lt: "<",
        ge: ">=",
        le: "<="
    };

    const LOGIC_OPERATORS = {
        and: "AND",
        or: "OR"
    };

    function getDefaultFilter(){
        return { 
            logicOperator: "", 
            targetField: "", 
            targetFieldText: "",
            targetFieldIsNumber: false,
            compareType: COMPARE_OPERATORS.equal, 
            compareValueType: "dynamic", 
            compareValue: "",
            compareValueText: "" 
        };
    }

    function getDefaultOperation(){
        return {
            targetField: "",
            targetFieldText: "",
            targetFieldIsNumber: false,
            operationType: "equal",
            compareValueType: "dynamic",
            assignValue: "",
            assignValueText: ""
        };
    }

    export default {
        components: { FilterItem, OperationItem, AttachmentOperationItem },
        props: [ 
            'currentSheetFieldsRootNode', 
            'targetSheetFieldsRootNode', 
            'operationOption', 
            'filters', 
            'operations' 
        ],
        data(){
            return {
                compareTypes: [
                    { text: "等于", value: COMPARE_OPERATORS.equal },
                    { text: "不等于", value: COMPARE_OPERATORS.notEqual },
                    { text: "大于", value: COMPARE_OPERATORS.gt },
                    { text: "小于", value: COMPARE_OPERATORS.lt },
                    { text: "大于等于", value: COMPARE_OPERATORS.ge },
                    { text: "小于等于", value: COMPARE_OPERATORS.le }
                ],
                logicOperators: [
                    { text: "并且", value: LOGIC_OPERATORS.and },
                    { text: "或者", value: LOGIC_OPERATORS.or }
                ],
                filterType: [], // 过滤类型：main只显示主表字段，child只显示子表字段
                operationType: [] // 操作类型：main只显示主表字段，child只显示子表字段
            };
        },
        watch: {
            operationOption: function(val, oldVal){
                var that = this;
                this.filters.splice(0,this.filters.length);
                this.operations.splice(0,this.operations.length);
                this.filterType = [];
                this.operationType = [];
                this.$nextTick(()=>{
                    switch(val.value){
                        case "update":
                        case "upsert":
                            that.filters.push(getDefaultFilter());
                            that.operations.push(getDefaultOperation());
                        break;
                        case "insert":
                            that.operations.push(getDefaultOperation());
                        break;
                        case "insertChild":
                            that.filters.push(getDefaultFilter());
                            that.operations.push(getDefaultOperation());
                            that.filterType = ['main', 'main'];
                            that.operationType = ['child', 'both'];
                        break;
                        case "delete":
                            that.filters.push(getDefaultFilter());
                        break;
                        case "appendfile":
                        case "overridefile":
                        case "remove":
                        case "removeall":
                            that.operations.push(getDefaultOperation());
                        break;
                    }
                });
            }
        },
        methods: {
            addOperationRangeCondition: function(){
                if(this.filters.length){
                    this.filters.push({ 
                        logicOperator: LOGIC_OPERATORS.and, 
                        targetField: "", 
                        targetFieldText: "",
                        compareType: COMPARE_OPERATORS.equal, 
                        compareValueType: "dynamic", 
                        compareValue: "",
                        compareValueText: ""});
                } else {
                    this.filters.push(getDefaultFilter());
                }
            },
            removeOperationRangeCondition: function(filterIndex){
                this.filters.splice(filterIndex, 1);
                if(filterIndex === 0 && this.filters.length){
                    this.filters[0].logicOperator = "";
                }
            },
            addOperation: function(){
                this.operations.push(getDefaultOperation());
            },
            removeOperation: function(operationIndex){
                this.operations.splice(operationIndex, 1);
            }
        }
    };
</script>
<style>
.operation-item
    margin: 3px 0;
    position:relative;
.filter-item
    margin: 3px 0;
    height:34px;
.addbtn
    cursor:pointer

</style>


// WEBPACK FOOTER //
// src/components/console/business-rule/formular-simple-editor/formular-operation-detail.vue
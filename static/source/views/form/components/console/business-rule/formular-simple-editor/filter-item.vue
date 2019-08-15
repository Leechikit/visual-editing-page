<template>
    <div>
        <!-- 第一行不显示逻辑表达式下拉框 -->
        <select :id="'logicOperator' + filterIndex" class="simple-editor-dropdown" 
            style="width: 74px;"
            data-value-type="logicOperator"
            v-if="filterIndex > 0">
            <option v-for="(logicOperator, index) in logicOperators" 
                :key="index" 
                :value="logicOperator.value">
                {{logicOperator.text}}
            </option>
        </select>

        <div class="tree-dropdown" 
            style="position: relative; display: inline-block;width: 247px;" 
            :class="{width130:filterIndex > 0}">
            <div class="dropdownlist" :class="{width130:filterIndex > 0}"
                style="display: inline-block; width: 247px; height: 32px;">
                <div class="drop-handle" style="height: 32px; line-height: 24px;">

                    <div class="drop-text" :style="filter.targetFieldText ? 'color: #333' : 'color: #999;'">{{filter.targetFieldText && ("目标表单." + filter.targetFieldText) || "目标表单字段"}}</div>
                    <span class="drop-btn"></span>
                </div>
            </div>
            <ul class="tree-dropdown-content">
                <treeview :node="filteredTargetSheetFieldsRootNode" 
                    :hide-root-node="true"
                    :can-select="false" 
                    :level="targetFieldDropdownLevel"
                    :name-space="'treeview'"></treeview>                    
            </ul>
        </div>

        <span class="word">值</span>

        <!-- 比较类型 -->
        <select :id="'compareType' + filterIndex" class="simple-editor-dropdown"
            style="width:85px !important;"
            data-value-type="compareType">
            <option v-for="(compareType, index) in compareTypes" 
                :key="index"
                :value="compareType.value">
                {{ compareType.text }}    
            </option>
        </select>

        <!-- 固定值/动态值 -->
        <select :id="'compareValueType' + filterIndex" class="simple-editor-dropdown" 
            style="width: 105px !important;"
            data-value-type="compareValueType">
            <option v-for="(compareValueType, index) in compareValueTypes" 
                :key="index"
                :value="compareValueType.value">
                {{ compareValueType.text }}    
            </option>
        </select>

        <!-- 当前表单的字段或输入的值 -->
        <input class='inputSheet' type="text" 
            :id="'compareValue' + filterIndex"
            maxlength="200"
            v-on:keypress="compareValueKeypressHandler"
            v-on:input="compareValueInputHandler"
            v-if="filter.compareValueType=='static'" />
        <div v-else-if="filter.compareValueType=='dynamic'" 
            class="tree-dropdown"
            style="position: relative; display: inline-block;">
            <div class="dropdownlist" 
                style="display: inline-block; width: 170px; height: 32px;">
                <div class="drop-handle" style="height: 32px; line-height: 24px;">
                    <div class="drop-text" :style="filter.compareValueText ? 'color:#333' : 'color:#999'">{{filter.compareValueText && ("当前表单." + filter.compareValueText) || "当前表单字段"}}</div>
                    <span class="drop-btn"></span>
                </div>
            </div>
            <ul class="tree-dropdown-content">
                <treeview :node="filteredCurrentSheetFieldsRootNode" 
                    :hide-root-node="true"
                    :can-select="false" 
                    :level="currentFieldDropdownLevel"
                    :name-space="'treeview'"></treeview>                    
            </ul>
        </div>
        <Icon type="trash-a" size="20" color="#e97763" :class="'action'" v-if="filterIndex > 0" @click="itemRemoveHandler(filterIndex)"></Icon>
    </div>
</template>

<script>
    import treeview from "../../../../lib/treeview";

    export default {
        components: { treeview },
        props: [ 
            'filter',
            'filterIndex',
            'supportedCompareTypes',
            'supportedLogicOperators',
            'targetSheetFieldsRootNode', 
            'currentSheetFieldsRootNode',
            'filterType' // ['main','child']过滤类型：main只显示主表字段，child只显示子表字段
        ],
        data(){
            return {
                targetFieldDropdownLevel: 0,
                //targetFieldName: "--请选择--",
                //targetFieldIsNumber: false,
                currentFieldDropdownLevel: 0,
                //currentFieldName: "--请选择--",
                compareTypes: Object.assign({}, this.supportedCompareTypes),
                compareValueTypes: [
                    { text: "动态值", value: "dynamic" },
                    { text: "固定值", value: "static" }
                ],
                logicOperators: Object.assign({}, this.supportedLogicOperators),
                filteredCurrentSheetFieldsRootNode: Object.assign({}, this.currentSheetFieldsRootNode),
                filteredTargetSheetFieldsRootNode: Object.assign({}, this.targetSheetFieldsRootNode)
            };
        },
        mounted: function(){
            var that = this;

            $(".filter-item .simple-editor-dropdown").each(function(){
                var $elem = $(this);
                if($elem.data("DropDownList")) return;

                var width = $elem.width();
                $elem.DropDownList({ Width: width });
                $elem.change(function(event){
                    var type = $(this).data("valueType");
                    that.filter[type] = event.target.value;
                });
            });

            this.filterNodeHandle(this.filteredTargetSheetFieldsRootNode, 0);
            this.filterNodeHandle(this.filteredCurrentSheetFieldsRootNode, 1);
        },
        watch: {
            filter: function(val, oldVal){
                var that = this;

                this.$nextTick(function(){
                    if(val.compareValueType == "static"){
                        let newCompareVal = val.compareValue;
                        if(val.targetFieldIsNumber){
                            $("#compareValue" + that.filterIndex).val(newCompareVal);
                        } else {
                            newCompareVal = newCompareVal == "" ? "" : newCompareVal.substr(1, newCompareVal.length - 2)
                            $("#compareValue" + that.filterIndex).val(newCompareVal);
                        }
                    }

                    $("#logicOperator" + that.filterIndex).val(val.logicOperator);
                    $("#compareType" + that.filterIndex).val(val.compareType);
                    $("#compareValueType" + that.filterIndex).val(val.compareValueType);
                    $("#filterItemWrapper .simple-editor-dropdown").DropDownList("Refresh");
                });
            }
        },
        methods: {
            filterNodeHandle(node, selectIndex){
                if(this.filterType[selectIndex] === 'main'){
                    node.Childrens = node.Childrens.filter(item => {
                        return item.Code.indexOf('.') < 0;
                    });
                }else if(this.filterType[selectIndex] === 'child'){
                    node.Childrens = node.Childrens.filter(item => {
                        return item.Code.indexOf('.') > -1;
                    });
                }
                return node;
            },
            hideAllTreeViewDropdown: function(){
                $(".dropdownlist").siblings("ul").hide();
            },
            itemRemoveHandler: function(fIndex){
                this.$emit("remove", fIndex);
            },
            filterOutCurrentSheetFieldsRootNode: function(selectedDataType, selectedNodeType, selectedNodeName, selectIndex){
                var currentSheetFields = this.currentSheetFieldsRootNode.Childrens;
                var fieldLength = currentSheetFields.length;
                this.filteredCurrentSheetFieldsRootNode.Childrens = [];

                for(var i = 0; i < fieldLength; i++){
                    if(currentSheetFields[i].DataType == selectedDataType ||
                       (selectedNodeType == "Association" && currentSheetFields[i].Name == "ObjectId") ||
                       selectedNodeName == "ObjectId" && currentSheetFields[i].UnitType == "Association" ||
                       selectedNodeName == "ParentObjectId" && currentSheetFields[i].UnitType == "Association"){
                        this.filteredCurrentSheetFieldsRootNode.Childrens.push(currentSheetFields[i]);
                    }
                }
                this.filterNodeHandle(this.filteredCurrentSheetFieldsRootNode, selectIndex);
            },
            compareValueKeypressHandler: function(event){
                let keyCode = event.which || event.keyCode;
                let keyChar = String.fromCharCode(keyCode);

                if(this.filter.targetFieldIsNumber){
                    let keyCode = event.which || event.keyCode;
                    let keyChar = String.fromCharCode(keyCode);
                    let regExp = /[0-9]|\./g;

                    if(!regExp.test(keyChar)){
                        event.preventDefault();
                        return false;
                    }
                }
            },
            compareValueInputHandler: function(event){
                if(this.filter.targetFieldIsNumber){
                    this.filter.compareValue = event.target.value;
                }else{
                    this.filter.compareValue = '"' + event.target.value + '"';
                }
            },
            treeViewNodeClickHandler: function(checkedNode, treeViewInstance){
                if(checkedNode.UnitType != "Field" && checkedNode.UnitType != "Association"){
                    return {
                        goAhead: true
                    };
                }

                var treeRoot = treeViewInstance;
                var names = [];
                var values = [];
                while(treeRoot.level && treeRoot.level !== 0){
                    names.unshift(treeRoot.node.Name);
                    values.unshift(treeRoot.node.ObjectId);
                    treeRoot = treeRoot.$parent;
                }
                var rootNode = treeRoot.node;

                if(rootNode == this.filteredTargetSheetFieldsRootNode){
                    let dataType = checkedNode.DataType;
                    let nodeType = checkedNode.UnitType;
                    if(dataType && (dataType == $.BizDataType.Double || dataType == $.BizDataType.Int || dataType == $.BizDataType.Long)){
                        this.filter.targetFieldIsNumber = true;
                    } else {
                        this.filter.targetFieldIsNumber = false;
                    }

                    this.filter.compareValueText = "";
                    this.filter.compareValueTypes = "";
                    this.filterOutCurrentSheetFieldsRootNode(dataType, nodeType, checkedNode.Name, 1);
                    values.unshift(rootNode.ObjectId);
                    this.filter.targetField = values.join(".");
                    this.filter.targetFieldText = names.join(".");
                } else if (rootNode == this.filteredCurrentSheetFieldsRootNode){
                    this.filter.compareValueText = names.join(".");
                    this.filter.compareValue = values.join(".");
                }
                this.hideAllTreeViewDropdown();

                return {
                    goAhead: false
                };
            }
        }
    };
</script>
<style>
.filter-item
    &>div
       position:relative;
       padding-right:20px;
    .word
        position:relative;
        display:inline-block;
        margin:0 1px;
        top:-9px;
   /* ul
        &>li
            padding-left:6px !important
            li
                padding-left:6px !important*/
    input.inputSheet
        border: 1px solid #e1e1e1;
        height: 30px;
        position: relative;
        top: -10px;
        border-radius: 2px;
        padding-left: 4px;
        width:170px;
    .action 
        position:absolute;
        top:50%;
        right:0px;
        margin-top:-10px;
        cursor:pointer;
        font-size:16px;
.width130
    width:171px !important;

.tree-dropdown-content{
    display: block;
    width: 100%;
    border: 1px solid #e1e1e1;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 200px;
}

input[type=text]:focus{
    border: 1px solid #2d7fff !important;
    box-shadow: none !important;
    outline: none !important;
}
</style>


// WEBPACK FOOTER //
// src/components/console/business-rule/formular-simple-editor/filter-item.vue
<template style="position: relative;">
    <div class="formular-editor formular-simple-editor" style="width: 100%; height: 460px;">
        <Row>
            <div class='title'>目标表单<sub>设置需要操作的表单</sub></div>
            <div class="drop tree-dropdown">
                <div class="dropdownlist">
                    <div class="drop-handle">
                        <div v-if="simpleViewModel.targetSheetName" class="drop-text">{{simpleViewModel.targetSheetName}}</div>
                        <div v-else class="drop-text" style="color: #999;">选择表单</div>
                        <span class="drop-btn"></span>
                    </div>
                </div>
                <ul class="ultarget tree-dropdown-content" style="width: 240px; overflow-x: hidden;">
                    <treeview :node="targetSheetRootNode" 
                        :hide-root-node="true"
                        :can-select="false" 
                        :level="level" 
                        :name-space="'treeview'"
                        :show-icon="true"></treeview>                    
                </ul>
            </div>
        </Row>

        <Row>
            <div class="title">操作方式<sub>可对目标表单进行操作</sub></div>
            <div>
                <select id="ddlOperationTypes"
                    class="simple-editor-dropdown" 
                    v-model="selectedOperationOptionVal">
                    <option v-for="(option, index) in operationOptions" 
                        :key="index" 
                        :value="option.value">{{option.text}}</option>
                </select>
            </div>
            <div v-show="false" style="color: red;">
                <small>目前仅支持对关联表单进行附件操作，而所选的目标表单并非当前表单的关联表单，附件操作将不会生效。</small>
            </div>
        </Row>
        
        <formular-operation-detail 
            :target-sheet-name="simpleViewModel.targetSheetName"
            :current-sheet-fields-root-node="currentSheetFieldsRootNode"
            :target-sheet-fields-root-node="targetSheetFieldsRootNode"
            :operation-option="simpleViewModel.selectedOperationOption"
            :filters="simpleViewModel.filters"
            :operations="simpleViewModel.operations"></formular-operation-detail>

        <Alert v-show="errorMsg != ''" show-icon
            type="error"
            style="position: absolute; left: 35px; right: 35px; bottom: 45px;">
            {{errorMsg}}
            <a class="ivu-alert-close" @click="errorMsg = ''">
                <i class="ivu-icon ivu-icon-ios-close-empty"></i>
            </a>
        </Alert>
    </div>
</template>

<script>
    import FormularOperationDetail from "./formular-operation-detail";
    import treeview from "../../../../lib/treeview";
    // import { Alert } from "iview";
    import { getAppTreeSettings, loadAppTreeNodes, validateFormula } from "../../../../service/getData";

    var operationOptionList = [
        { text: "仅更新数据", value: "update", operation: "UPDATE", showOperationRange: true, showConcretOperation: true },
        { text: "仅插入数据", value: "insert", operation: "INSERT", showOperationRange: false, showConcretOperation: true },
        { text: "仅插入子表数据", value: "insertChild", operation: "INSERT", showOperationRange: true, showConcretOperation: true },
        { text: "更新和插入数据", value: "upsert", operation: "UPSERT", showOperationRange: true, showConcretOperation: true },
        { text: "仅删除数据", value: "delete", operation: "DELETE", showOperationRange: true, showConcretOperation: false }
        // { 
        //     text: "仅在附件控件中追加文件", 
        //     value: "appendfile", 
        //     operation: "ADDFILE",
        //     showOperationRange: false, 
        //     showConcretOperation: true, 
        //     operateFileAttachment: true,
        //     headText: "", 
        //     middleText: "基础上追加写入", 
        //     tailText: "中的文件", 
        //     currSheetFileAttachmentSelectEnabled: true 
        // },
        // { 
        //     text: "仅在附件控件中覆盖文件", 
        //     value: "overridefile", 
        //     operation: "ADDFILE",
        //     showOperationRange: false, 
        //     showConcretOperation: true, 
        //     operateFileAttachment: true,
        //     headText: "", 
        //     middleText: "基础上覆盖写入", 
        //     tailText: "中的文件", 
        //     currSheetFileAttachmentSelectEnabled: true 
        // },
        // { 
        //     text: "仅在附件控件中移除指定文件", 
        //     value: "remove", 
        //      operation: "REMOVEFILE",
        //     showOperationRange: false, 
        //     showConcretOperation: true, 
        //     operateFileAttachment: true,
        //     headText: "", 
        //     middleText: "中移除", 
        //     tailText: "", 
        //     currSheetFileAttachmentSelectEnabled: true 
        // },
        // { 
        //     text: "仅在附件控件中清空文件", 
        //     value: "removeall", 
        //     operation: "REMOVEFILE",
        //     showOperationRange: false, 
        //     showConcretOperation: true, 
        //     operateFileAttachment: true,
        //     headText: "清空", 
        //     middleText: "中所有文件", 
        //     tailText: "", 
        //     currSheetFileAttachmentSelectEnabled: false 
        // }
    ];

    export default {
        props: [ 'currentSheetCode' ], 
        components: {
            FormularOperationDetail,
            // Alert,
            treeview
        },
        data(){
            return {
                sheetCode: "",
                operationOptions: operationOptionList,
                selectedOperationOptionVal: "",
                appTreeSettings: null,
                errorMsg: "",
                level: 0,
                targetSheetRootNode: { 
                    Name: '应用对象', 
                    Childrens: [],
                    IsExpanded: true
                },
                targetSheetFieldsRootNode: {
                    Name: "目标表单",
                    ObjectId: "",
                    Childrens: [],
                    IsExpanded: true
                },
                currentSheetFieldsRootNode: {
                    Name: "当前表单",
                    Childrens: [],
                    IsExpanded: true
                },
                simpleViewModel: {
                    targetSheetCode: "",
                    targetSheetName: "",
                    selectedOperationOption: {},
                    filters: [],
                    operations: []
                }
            };
        },
        created: function(){
            var that = this;
            // this.getAppTreeSettings()
            //     .then(function(){
            //         that.initTargetSheetRootNode();
            //         that.initCurrentSheetFieldsRootNode();      
            //     });
            this.initTargetSheetRootNode();
            this.initCurrentSheetFieldsRootNode();
            this.$root.eventHub.$on('expand.treeview', this.globalTreeViewNodeExpandHandler);
            this.$root.eventHub.$on('click.treeview', this.globalTreeViewNodeClickHandler);
        },
        mounted: function(){
            var that = this;

            $(".formular-editor").on("click", function(e){
                that.hideAllTreeViewDropdown();
            });
            $(".formular-editor").on("click", ".tree-dropdown", function(e){
                e.stopPropagation();
            });
            $(".formular-editor").on("click", ".tree-dropdown .dropdownlist", function(e){  
                 $("ul.drop-list").hide();
                var $dropdownButton = $(this).closest(".dropdownlist"),
                    $dropdownBody = $dropdownButton.siblings("ul"),
                    dropdownButtonHeight = $dropdownButton.height(),
                    dropdownBodyHeight = $dropdownBody.height(),
                    dropdownButtonOffset = $dropdownButton.offset().top;

                var $modal = $dropdownBody.closest(".ivu-modal"),
                    modalBodyOffset = $modal.find(".ivu-modal-body").offset().top,
                    modalFooterOffset = $modal.find(".ivu-modal-footer").offset().top;

                if(dropdownButtonOffset + (dropdownBodyHeight / 2) + dropdownButtonHeight > modalFooterOffset &&
                   dropdownButtonOffset - dropdownBodyHeight > modalBodyOffset){
                    $dropdownBody.addClass("upside");
                } else {
                    $dropdownBody.removeClass("upside");
                }

                if($dropdownBody.is(":visible")){
                    $dropdownBody.hide();
                } else {
                    that.hideAllTreeViewDropdown();
                    $dropdownBody.show();
                }
            });

            this.initOperationTypesDropdown();
        },
        destroyed: function(){
            this.$root.eventHub.$off('click.treeview', this.globalTreeViewNodeClickHandler);
            this.$root.eventHub.$off('expand.treeview', this.globalTreeViewNodeExpandHandler);
            this.clearSimpleViewModel();
        },
        watch: {
            sheetCode: function(val, oldVal){
                $("#ddlOperationTypes").DropDownList("Disabled", val == "");
            }
        },
        methods: {
            hideAllTreeViewDropdown: function(){
                $(".formular-editor .dropdownlist").siblings("ul").hide();
            },
            treeViewDropdownClickHandler: function(event){
                var $elem = $(event.target);
                var $dropdownBody = $elem.closest(".dropdownlist").siblings("ul");

                if($dropdownBody.is(":visible")){
                    $dropdownBody.hide();
                } else {
                    this.hideAllTreeViewDropdown();
                    $dropdownBody.show();
                }
                return false;
            },
            initOperationTypesDropdown: function(){
                var that = this;
                var $ddlOperationTypes = $("#ddlOperationTypes").DropDownList({ 
                    Width: 240,
                    placeholder: "选择操作方式" 
                });
                $ddlOperationTypes.DropDownList("Disabled", this.sheetCode == "");
                $ddlOperationTypes.change(function(event){
                    var selectedVal = event.target.value;
                    if(selectedVal == ""){
                        that.simpleViewModel.selectedOperationOption = {};
                    }

                    for(var i = 0; i < that.operationOptions.length; i++){
                        let operationOpt = that.operationOptions[i];
                        if(operationOpt.value === selectedVal){
                            that.simpleViewModel.selectedOperationOption = Object.assign({}, that.operationOptions[i]);
                            break;
                        }
                    }
                });
            },
            initTargetSheetRootNode: function(){
                var that = this;
                
                this.loadAppTreeNodes("root", "", "AppMenu")
                    .then(function(nodes){
                        that.treeViewNodesLoaded(that.targetSheetRootNode, nodes);
                    });
            },
            initCurrentSheetFieldsRootNode: function(){
                var that = this;

                this.loadAppTreeNodes(that.currentSheetCode, that.currentSheetCode, "AppMenu")
                    .then(children => {
                        var convertedNodes = that.convertToTreeViewNodes(that.fliterSheetRootNode(children), that.currentSheetFieldsRootNode);
                        that.currentSheetFieldsRootNode.Childrens.push(...convertedNodes);
                    });
            },
            // 过滤附件24和图片23类型
            fliterSheetRootNode (children) {
                return children.filter(item => {
                    // return item.controlType != 23 && item.controlType != 24;
                    return true;
                });
            },
            convertToTreeViewNodes: function(nodes, parentNode){
                let results = [];

                for(let i = 0; i < nodes.length; i++){
                    let node = nodes[i];
                    let hasChild = node.children != null;
                    let nodeIconClass = '';

                    if(node.NodeType == "Company" || node.NodeType == "Post") continue;

                    if(node.NodeType == "AppMenu"){
                        nodeIconClass = "icon-mainsheet";
                    } else if (node.NodeType === "SubSheet"){
                        nodeIconClass = "icon-subsheet";
                    }

                    results.push({
                        HasChild: hasChild,
                        IsExpanded: false,
                        UnitType: node.NodeType,
                        DataType: node.DataType,
                        Active: false,
                        Name: node.name,
                        ObjectId: node.id,
                        Code: node.Code,
                        ParentNode: parentNode,
                        Childrens: node.children,
                        IconClass: nodeIconClass
                    });
                }

                return results;
            },
            treeViewNodesLoaded(checkedNode, children, includedNodeTypes, includedDataTypes){
                if(!children || !children.length) return;
                includedNodeTypes = includedNodeTypes || [];
                includedDataTypes = includedDataTypes || [];

                var filteredChildren = [];
                for(let i = 0; i < children.length; i++){
                    let child = children[i];
                    let include = true;

                    if(includedNodeTypes.length){
                        include = includedNodeTypes.indexOf(child.NodeType) > -1;
                    }

                    if(!include) continue;

                    if(includedDataTypes.length){
                        include = includedDataTypes.indexOf(child.DataType) > -1;
                    }
                   
                    if(include){
                        filteredChildren.push(child);
                    }
                }

                let convertedNodes = this.convertToTreeViewNodes(filteredChildren, checkedNode);
                checkedNode.Childrens.push(...convertedNodes);
            },
            globalTreeViewNodeExpandHandler(checkedNode, treeViewInstance){
                if(checkedNode.IsExpanded){
                    checkedNode.IsExpanded = false;
                    return;
                }

                if(checkedNode.Childrens && checkedNode.Childrens.length){
                    checkedNode.IsExpanded = !checkedNode.IsExpanded;
                    return;
                }

                var that = this;
                var parentInstance = treeViewInstance.$parent;
                while(parentInstance && parentInstance != treeViewInstance.$root){
                    if(parentInstance.treeViewNodeClickHandler){
                        break;
                    }

                    parentInstance = parentInstance.$parent;
                }

                var handleResult = {};
                if(parentInstance && parentInstance.treeViewNodeExpandHandler){
                    handleResult = parentInstance.treeViewNodeExpandHandler(checkedNode, treeViewInstance);
                    if(!handleResult.goAhead) return;
                }

                this.loadAppTreeNodes(checkedNode.ObjectId, checkedNode.Code, checkedNode.UnitType)
                    .then(function(children){
                        that.treeViewNodesLoaded(checkedNode, children, handleResult.includedNodeTypes);
                        checkedNode.IsExpanded = !checkedNode.IsExpanded;
                    });
            },
            treeViewNodeExpandHandler(checkedNode){
                var that = this;

                if(checkedNode.UnitType == "AppMenu"){
                    return {
                        goAhead: true,
                        includedNodeTypes: ['SubSheet']
                    };
                } else if (checkedNode.UnitType == "SubSheet"){
                    return {
                        goAhead: false
                    };
                }
                
                return {
                    goAhead: true,
                    includedNodeTypes: []
                };
            },
            globalTreeViewNodeClickHandler(checkedNode, treeViewInstance){
                // 如果隐藏了根节点，那么不触发根节点上的事件
                if(treeViewInstance.hideRootNode && treeViewInstance.level == 0) return;

                var that = this;
                var parentInstance = treeViewInstance.$parent;
                while(parentInstance && parentInstance != treeViewInstance.$root){
                    if(parentInstance.treeViewNodeClickHandler){
                        break;
                    }

                    parentInstance = parentInstance.$parent;
                }

                var handleResult = {};
                if(parentInstance && parentInstance.treeViewNodeClickHandler){
                    handleResult = parentInstance.treeViewNodeClickHandler(checkedNode, treeViewInstance);
                    if(!handleResult.goAhead) return;
                }

                if(checkedNode.IsExpanded || checkedNode.Childrens && checkedNode.Childrens.length){
                    checkedNode.IsExpanded = !checkedNode.IsExpanded;
                    return;
                }

                this.loadAppTreeNodes(checkedNode.ObjectId, checkedNode.Code, checkedNode.UnitType)
                    .then(function(children){
                        that.treeViewNodesLoaded(
                            checkedNode, 
                            children, 
                            handleResult.includedNodeTypes, 
                            handleResult.includedDataTypes);
                        checkedNode.IsExpanded = !checkedNode.IsExpanded;
                    });
            },
            treeViewNodeClickHandler(checkedNode){
                var that = this;
                var nodeType = checkedNode.UnitType;

                if(nodeType != "AppMenu" && nodeType != "SubSheet"){
                    return {
                        goAhead: true
                    };
                }

                this.hideAllTreeViewDropdown();

                let isAppMenu = nodeType == "AppMenu";
                var sheetCode = isAppMenu ? checkedNode.Code : checkedNode.ParentNode.Code + "." + checkedNode.Code;
                var sheetName = isAppMenu ? checkedNode.Name : checkedNode.ParentNode.Name + "." + checkedNode.Name;
                var objectId = isAppMenu ? checkedNode.ObjectId : checkedNode.ParentNode.ObjectId + "." + checkedNode.ObjectId;
                this.loadAppTreeNodes(checkedNode.ObjectId, checkedNode.Code, nodeType)
                    .then(function(children){
                        // 清除当前表单字段
                        if (children[0].id === '{currentAppRunId}') {
                            children.shift();
                        }
                        // 改变目标表单时，清空之前的所有设置
                        that.clearSimpleViewModel();
                        that.sheetCode = sheetCode;
                        that.simpleViewModel.targetSheetCode = sheetCode;
                        that.simpleViewModel.targetSheetName = sheetName;
                        that.targetSheetFieldsRootNode.ObjectId = objectId;
                        that.targetSheetFieldsRootNode.Childrens.length = 0;
                        $("#ddlOperationTypes").DropDownList("Destroy");
                        that.initOperationTypesDropdown();

                        var convertedNodes = that.convertToTreeViewNodes(that.fliterSheetRootNode(children), that.targetSheetFieldsRootNode);
                        that.targetSheetFieldsRootNode.Childrens.push(...convertedNodes);
                    });

                return {
                    goAhead: false
                };
            },
            generateFormula() {
                var formula = "";
                var formulaText = "";
                var sheetCode = "{" + this.simpleViewModel.targetSheetCode + "}";
                var sheetName = "{" + this.simpleViewModel.targetSheetName + "}";
                var operationOption = this.simpleViewModel.selectedOperationOption;

                var filterInfo = this.buildFilterInfo(this.simpleViewModel.filters);
                var operationInfo = this.buildOperationInfo(this.simpleViewModel.operations);

                var firstOperation = this.simpleViewModel.operations[0];
                var firstTargetField = "",
                    firstTargetFieldText = "",
                    firstAssignValue = "",
                    firstAssignValueText = "";
                if(firstOperation){
                    firstTargetField =  "{" + firstOperation.targetField + "}";
                    firstTargetFieldText = "{" + this.simpleViewModel.targetSheetName + "." + firstOperation.targetFieldText + "}";
                    firstAssignValue = "{" + firstOperation.assignValue + "}";
                    firstAssignValueText = "{" + firstOperation.assignValueText + "}";
                }
                
                switch (operationOption.operation) {
                    case "UPDATE":
                    case "INSERT":
                    case "UPSERT":
                    case "DELETE":
                        formula = `${operationOption.operation}(${sheetCode}${filterInfo.filter}${operationInfo.operation})`;
                        formulaText = `${operationOption.operation}(${sheetName}${filterInfo.filterText}${operationInfo.operationText})`;
                        break;
                    case "ADDFILE":
                        let overrideExistFile =
                            operationOption.value == "overridefile" ? "true" : "false";

                        formula = `ADDFILE(${firstTargetField}, ${overrideExistFile}, ${firstAssignValue})`;
                        formulaText = `ADDFILE(${firstTargetFieldText}, ${overrideExistFile}, ${firstAssignValueText})`;
                        break;
                    case "REMOVEFILE":
                        if (operationOption.value == "removeall") {
                            formula = `REMOVEFILE(${firstTargetField})`;
                            formulaText = `REMOVEFILE(${firstTargetFieldText})`;
                        } else {
                            formula = `REMOVEFILE(${firstTargetField}, ${firstAssignValue})`;
                            formulaText = `REMOVEFILE(${firstTargetFieldText}, ${firstAssignValueText})`;
                        }
                        break;
                }

                return { 
                    formula: formula,
                    formulaText: formulaText
                };
            },
            buildFilterInfo(filters) {
                if (!filters || !filters.length){
                    return {
                        filter: "",
                        filterText: ""
                    };
                } 

                var filterResult = [];
                var filterTextResult = [];
                var targetSheetName = this.simpleViewModel.targetSheetName;
                for (var i = 0; i < filters.length; i++) {
                    if (i != 0) {
                        filterResult.push(" ", filters[i].logicOperator, " ");
                        filterTextResult.push(" ", filters[i].logicOperator, " ");
                    }
                    
                    if(filters[i].compareValue == ""){
                        filters[i].compareValue = '""';
                    }
                    let finalCompareValue = filters[i].compareValue;
                    let finalCompareValueText = filters[i].compareValue;
                    if(filters[i].compareValueType == "static"){
                        filters[i].compareValueText = filters[i].compareValue;
                    } else {
                        finalCompareValue = "{" + filters[i].compareValue + "}";
                        finalCompareValueText = "{" + filters[i].compareValueText + "}";
                    }

                    filterResult.push(
                        "{" + filters[i].targetField + "}",
                        filters[i].compareType,
                        finalCompareValue);

                    filterTextResult.push(
                        "{" + targetSheetName + "." + filters[i].targetFieldText + "}",
                        filters[i].compareType,
                        finalCompareValueText);
                }

                return {
                    filter: ", " + filterResult.join(""),
                    filterText: ", " + filterTextResult.join("")
                };
            },
            buildOperationInfo(operations) {
                if (!operations || !operations.length) {
                    return {
                        operation: "",
                        operationText: ""
                    };
                }

                var operationResult = [],
                    operationTextResult = [],
                    targetSheetName = this.simpleViewModel.targetSheetName,
                    operation;

                for (var i = 0; i < operations.length; i++) {
                    operation = operations[i];

                    let targetField = "{" + operation.targetField + "}";
                    let targetFieldText = "{" + targetSheetName + "." + operation.targetFieldText + "}";

                    if(operation.assignValue == ""){
                        operation.assignValue = '""';
                    }
                    let assignValue = operation.assignValue;
                    let assignValueText = operation.assignValue;

                    if(operation.compareValueType == "static"){
                        operation.assignValueText = operation.assignValue;
                    } else {
                        assignValue = "{" + operation.assignValue + "}";
                        assignValueText = "{" + operation.assignValueText + "}";
                    }

                    switch (operation.operationType) {
                    case "equal":
                        operationResult.push(targetField + ", =, " + assignValue);
                        operationTextResult.push(targetFieldText + ", =, " + assignValueText);
                        break;
                    case "addUp":
                        operationResult.push(targetField +", ==, " + assignValue);
                        operationTextResult.push(targetFieldText + ", ==, " + assignValueText);
                        // operationResult.push(targetField +", +, " + (targetField + "+" + assignValue));
                        // operationTextResult.push(targetFieldText + ", " + (targetFieldText + "+" + assignValueText));
                        break;
                    case "minusDown":
                        operationResult.push(targetField + ", " + (targetField + "-" + assignValue));
                        operationTextResult.push(targetFieldText + ", " + (targetFieldText + "-" + assignValueText));
                        break;
                    }
                }

                return {
                    operation: ", " + operationResult.join(", "),
                    operationText: ", " + operationTextResult.join(", ")
                };
            },
            clearSimpleViewModel(){
                this.simpleViewModel.targetSheetCode = "";
                this.simpleViewModel.selectedOperationOption = {};
                this.simpleViewModel.filters = [];
                this.simpleViewModel.operations = [];
            },
            async getValidateMessage(sheetCode, expression, formulaType, formulaField){
                var errorMsg = "";
                if (!expression || expression.length == 0) {
                    return errorMsg;
                }

                //验证 ""
                if (expression.match(/"/g) && expression.match(/"/g).length % 2 == 1) {
                    var exp = expression;
                    exp = exp.replace(/"[^"]+"/g, "\"\"");
                    if (exp.match(/"/g) && exp.match(/"/g).length % 2 == 1) {
                        errorMsg = '存在未关闭的"';
                    }
                }

                //验证()
                if (expression.match(/\(/g) || expression.match(/\)/g)) {
                    var leftCount = 0;
                    if (expression.match(/\(/)) {
                        leftCount = expression.match(/\(/g).length;
                    }
                    var rightCount = 0;
                    if (expression.match(/\)/)) {
                        rightCount = expression.match(/\)/g).length;
                    }
                    if (leftCount > rightCount) {
                        errorMsg = '存在未关闭的(';
                    }
                    else if (leftCount < rightCount) {
                        errorMsg = '存在多余的)';
                    }
                }

                //验证{}
                if (expression.match(/\{/g) || expression.match(/\}/g)) {
                    var leftCount = 0;
                    if (expression.match(/\{/)) {
                        leftCount = expression.match(/\{/g).length;
                    }
                    var rightCount = 0;
                    if (expression.match(/\}/)) {
                        rightCount = expression.match(/\}/g).length;
                    }
                    if (leftCount > rightCount) {
                        errorMsg = '存在未关闭的{';
                    }
                    else if (leftCount < rightCount) {
                        errorMsg = '存在多余的}';
                    }
                }
                ////验证是否存在空{}
                if (expression.match(/{}/g)) {
                    errorMsg = '存在空变量表达式{}';
                }

                if(errorMsg){
                    this.errorMsg = errorMsg;
                    return errorMsg;
                }

                formulaField = formulaField || "";
                let validateInfo = await this.validateFomula(sheetCode, expression);
                if(!validateInfo){
                    errorMsg = "验证请求失败，请稍后再试。";
                } else if(validateInfo.Validate) {
                    errorMsg = "";
                } else {
                    errorMsg = validateInfo.Msg;
                }
                
                this.errorMsg = errorMsg;
                return errorMsg;
            },
            async validateFomula(sheetCode, formula){
                let res = await validateFormula(
                    sheetCode,
                    formula);

                    return res;
            },
            async getAppTreeSettings() {
                if(this.appTreeSettings) return;

                var ret = await getAppTreeSettings(this.currentSheetCode, "BUSINESS");
                if(ret && ret.Successful){
                    this.appTreeSettings = Object.assign({}, ret.ReturnData.AppTree);
                }
            },
            async loadAppTreeNodes(id, code, nodeType){
                var params = {};
                if(id != 'root'){
                    params = {
                        id: id,
                        Code: code,
                        NodeType: nodeType,
                        ShowField: true
                    }
                }
                var settings = Object.assign({}, this.appTreeSettings, params)
                var ret = await loadAppTreeNodes(settings);

                if(ret && ret.Successful){
                    return ret.ReturnData.ChildNodes;
                }

                return [];
            }
        }
    };
</script>
<style>
.formular-editor 
    .drop
        width:240px;
        .ultarget
            border:1px solid #e1e1e1;
            max-height: 300px;
    .dropdownlist .drop-handle
        overflow:hidden;

.formular-simple-editor .dropdownlist .drop-btn{
    top: 0;
    border-top: none;
    border-bottom: none;
}
</style>


// WEBPACK FOOTER //
// src/components/console/business-rule/formular-simple-editor/formular-simple-editor.vue
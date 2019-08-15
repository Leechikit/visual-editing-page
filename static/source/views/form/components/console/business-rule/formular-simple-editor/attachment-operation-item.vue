<template>
    <div class="drop-sele">
        <span class="middleword">{{operationOption.headText}}</span>
        
        <div class="tree-dropdown" style="position: relative; display: inline-block; width:208px;">
            <div class="dropdownlist">
                <div class="drop-handle">
                    <div class="drop-text" :style="targetFieldName!='目标表单字段' ? 'color: #333' : 'color: #999;'">{{targetFieldName}}</div>
                    <span class="drop-btn"></span>
                </div>
            </div>
            <ul class="tree-dropdown-content">
                <treeview :node="filteredTargetFieldsRootNode" 
                    :hide-root-node="true"
                    :can-select="false" 
                    :level="targetFieldDropdownLevel"
                    :name-space="'treeview'"></treeview>                    
            </ul>
        </div>

        <span class="middleword">{{operationOption.middleText}}</span>

        <div v-if="operationOption.currSheetFileAttachmentSelectEnabled"
            class="tree-dropdown"
            style="position: relative; display: inline-block; width:208px;">
            <div class="dropdownlist">
                <div class="drop-handle">
                    <div class="drop-text" :style="currentFieldName!='当前表单字段' ? 'color: #333' : 'color: #999;'">{{currentFieldName}}</div>
                    <span class="drop-btn"></span>
                </div>
            </div>
            <ul class="tree-dropdown-content">
                <treeview :node="filteredCurrentFieldsRootNode" 
                    :hide-root-node="true"
                    :can-select="false" 
                    :level="currentFieldDropdownLevel"
                    :name-space="'treeview'"></treeview>                    
            </ul>
        </div>

        <span class="middleword">{{operationOption.tailText}}</span>
    </div>
</template>

<script>
    import treeview from "../../../../lib/treeview";

    export default {
        components: { treeview },
        props: [ 
            'operations',
            'operationOption', 
            'targetSheetFieldsRootNode', 
            'currentSheetFieldsRootNode' 
        ],
        data(){
            return {
                targetFieldDropdownLevel: 0,
                targetFieldName: "目标表单字段",
                currentFieldDropdownLevel: 0,
                currentFieldName: "当前表单字段",
                filteredTargetFieldsRootNode: this.filterOutAttachmentNodes(this.targetSheetFieldsRootNode),
                filteredCurrentFieldsRootNode: this.filterOutAttachmentNodes(this.currentSheetFieldsRootNode)
            };
        },
        mounted: function(){
            this.operations[0] = {
                targetField: "",
                targetFieldText: "",
                operationType: "equal",
                compareValueType: "static",
                assignValue: "",
                assignValueText: ""
            };
        },
        methods: {
            filterOutAttachmentNodes: function(node){
                if(node.Childrens == null || node.Childrens.length == 0) return node;

                var filteredNode = Object.assign({}, node);

                filteredNode.Childrens = [];
                for(var i = 0; i < node.Childrens.length; i++){
                    let child = node.Childrens[i];
                    if(child.DataType == $.BizDataType.Attachment){
                        filteredNode.Childrens.push(child);
                    }
                }

                return filteredNode;
            },
            hideAllTreeViewDropdown: function(){
                $(".formular-editor .dropdownlist").siblings("ul").hide();
            },
            treeViewNodeClickHandler: function(checkedNode, treeViewInstance){
                if(checkedNode.DataType != $.BizDataType.Attachment){
                    return {
                        goAhead: true,
                        includedDataTypes: [ $.BizDataType.Attachment + "" ]
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

                if(rootNode == this.filteredTargetFieldsRootNode){
                    this.targetFieldName = names.join(".");
                    names.unshift("目标表单");
                    this.targetFieldName = names.join(".");
                    values.unshift(rootNode.ObjectId);
                    this.operations[0].targetField = values.join(".");
                    this.operations[0].targetFieldText = names.join(".");
                } else if (rootNode == this.filteredCurrentFieldsRootNode){
                    this.operations[0].assignValueText = names.join(".");
                    names.unshift("当前表单");
                    this.currentFieldName = names.join(".");
                    this.operations[0].assignValue = values.join(".");
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
.drop-sele
    .middleword
        position: relative;
        top: -10px;
    ul
        width: 100%;
        overflow: scroll;
        height: 200px;
        border: 1px solid #e1e1e1;
        z-index: 99;
        background: #fff;
        &>li
            padding-left:6px !important;
            li
                padding-left:6px !important;
.dropdownlist
    width:208px !important;

.formular-simple-editor .tree-dropdown .tree-dropdown-content{
    overflow: hidden;
}
</style>


// WEBPACK FOOTER //
// src/components/console/business-rule/formular-simple-editor/attachment-operation-item.vue
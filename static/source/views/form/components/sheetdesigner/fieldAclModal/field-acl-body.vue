<template>
    <div class="col-left" style="height:380px">
        <table>
            <thead>
                <tr style="border-bottom: 1px solid #e2e6e8;">
                    <th style="width:178px;border:none;padding:12px;">字段</th>
                    <th v-for="(column, index) in columns" :key="index" style="width:140px;padding:8px;border:none">
                        <div class="ckbox ckbox-default">
                            <input type="checkbox"
                                v-model="columnAllCheckStates[column.columnName]"
                                :id="prefix + column.columnName">
                            <label
                                :for="prefix + column.columnName"
                                @click.prevent="checkAllHandler(column.columnName)">{{column.text}}</label>
                        </div>
                    </th>
                </tr>
            </thead>
        </table>
        <div style="max-height:350px; overflow:scroll;">
            <table style="width: auto;" class="table table-hover table-body" :class="'table-' + prefix ">
                <tbody>
                    <tr v-for="(value, fieldKey) in properties"
                        v-if="defaultRowNames.indexOf(fieldKey) < 0 && fieldKey != 'PrintComment'"
                        :key="fieldKey"
                        style="border-bottom: 1px solid #e2e6e8;"
                    >
                        <td style="width:178px;padding:12px;">{{ value }}</td>
                        <field-acl-column v-for="(column, index) in columns"
                            :column="column"
                            :key="fieldKey + index"
                            :index="index"
                            :prefix="prefix"
                            :is-disabled="ifColumnDisabled(fieldKey, column)"
                            :field-states="fieldStates"
                            :asso-state="assoStates[fieldKey]"
                            :field-key="fieldKey"
                            @fieldAclChange="fieldAclChangeHandler"></field-acl-column>
                    </tr>
                    <tr v-for="(fieldKey, index) in defaultRowNames"
                        v-if="properties[fieldKey] != undefined"
                        :key="index">
                        <td style="width:178px;">{{ properties[fieldKey] }}</td>
                        <td style='width:140px'></td>
                        <td style='width:140px'></td>
                        <td style='width:140px'></td>
                        <field-acl-column
                            :column="columns[3]"
                            :key="fieldKey + index"
                            :index="3"
                            :prefix="prefix"
                            :field-states="fieldStates"
                            :field-key="fieldKey"
                            @fieldAclChange="fieldAclChangeHandler"></field-acl-column>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import FieldAclColumn from "./field-acl-column";

    export default {
        props: [
            'prefix',
            'properties',
            'fieldStates',
            'assoStates',
            'formulaFields',
            'mappingProperties',
            'preInstalledFields'
        ],
        data() {
            return {
                columns: [
                    { text: "可见", columnName: "Visible" },
                    { text: "可写", columnName: "Editable" },
                    { text: "必填", columnName: "Required" },
                    { text: "打印", columnName: "Printable" }
                ],
                columnAllCheckStates: {
                    "Visible": false,
                    "Editable": false,
                    "Required": false,
                    "Printable": false
                },
                // defaultRowNames: [
                //     'PrintCompanyName',
                //     'Printer',
                //     'PrintTime',
                //     'PrintQrCode'
                // ]
                defaultRowNames: []
            };
        },
        watch: {
            properties(){
                let allVisible = true,
                    allEditable = true,
                    allRequired = true,
                    allPrintable = true;

                for(let fieldKey in this.properties){
                    if(this.defaultRowNames.indexOf(fieldKey) > -1 || fieldKey == 'PrintComment') continue;

                    let fieldState = this.fieldStates[fieldKey];
                    if(fieldState.Visible === false) allVisible = false;
                    if(fieldState.Editable === false) allEditable = false;
                    if(fieldState.Required === false) allRequired = false;
                    if(fieldState.Printable === false) allPrintable = false;
                }

                if(!allPrintable){
                    for(let rowName of this.defaultRowNames){
                        let fieldState = this.fieldStates[rowName];
                        if(fieldState.Printable === false) allPrintable = false;
                    }
                }

                this.columnAllCheckStates.Visible = allVisible;
                this.columnAllCheckStates.Editable = allEditable;
                this.columnAllCheckStates.Required = allRequired;
                this.columnAllCheckStates.Printable = allPrintable;
            }
        },
        methods: {
            getFieldState(fieldKey){
                let fieldState = this.fieldStates[fieldKey];
                return fieldState ? fieldState : {
                    visible: true,
                    editable: this.prefix == 'draft',
                    required: false,
                    printable: true
                };
            },
            ifColumnDisabled(fieldKey, column){
                if((this.formulaFields.indexOf(fieldKey) >= 0 ||
                    this.mappingProperties.indexOf(fieldKey) >= 0) &&
                    (column.columnName == "Editable" || column.columnName == "Required")){
                    return true;
                }
                // if ((fieldKey.toLowerCase() == 'ownerid' || fieldKey.toLowerCase() == 'ownerdeptid') &&
                //     column.columnName == "Required"){
                //     return true;
                // }
                var fieldKeyLowCase = fieldKey.toLowerCase();
                if(column.columnName == "Required"){
                    if(fieldKeyLowCase == "ownerid" ||
                    fieldKeyLowCase == "ownerdeptid" ||
                    fieldKeyLowCase == "createdby" ||
                    fieldKeyLowCase == "createdtime" ||
                    fieldKeyLowCase == "modifiedtime" ||
                    fieldKeyLowCase == "seqno"){
                        return true;
                    }
                }else if(column.columnName == "Editable"){
                    if(fieldKeyLowCase == "createdby" ||
                    fieldKeyLowCase == "createdtime" ||
                    fieldKeyLowCase == "modifiedtime" ||
                    fieldKeyLowCase == "seqno"){
                        return true;
                    }
                }
                if(this.preInstalledFields.indexOf(fieldKey) >= 0){
                    return true;
                }

                return false;
            },
            checkAllHandler(columnName){
                var newAllCheckedState = !this.columnAllCheckStates[columnName];
                this.columnAllCheckStates[columnName] = newAllCheckedState;

                if(columnName === "Visible" && newAllCheckedState === false){
                    this.columnAllCheckStates.Editable = false;
                    this.columnAllCheckStates.Required = false;
                    this.columnAllCheckStates.Printable = false;
                } else {
                    this.columnAllCheckStates.Visible = true;
                    if(columnName === "Required" && newAllCheckedState){
                        this.columnAllCheckStates.Editable = true;
                    } else if (columnName === "Editable" && newAllCheckedState === false){
                        this.columnAllCheckStates.Required = false;
                    }
                }

                for(let fieldKey in this.fieldStates){
                    this.fieldAclChangeHandler(fieldKey, columnName, newAllCheckedState, true);
                }
            },
            fieldAclChangeHandler(fieldKey, columnName, newValue, isCheckAll){
                let currentFieldState = this.fieldStates[fieldKey];
                let prevCheckState = currentFieldState[columnName];
                newValue = newValue === undefined ? !prevCheckState : newValue;
                let lowerFieldKey = fieldKey.toLowerCase();

                if(columnName == "Required" && lowerFieldKey == "ownerid" ||
                    columnName == "Required" && lowerFieldKey == "ownerdeptid"){
                    if(newValue){
                        currentFieldState[columnName] = newValue;
                    }
                } else {
                    currentFieldState[columnName] = newValue;
                }

                if(columnName == "Visible" && newValue == false){    //不可见必不可写非必填
                    currentFieldState["Editable"] = false;
                    currentFieldState["Required"] = false;
                    currentFieldState["Printable"] = false;
                } else if (columnName == "Editable"){    //可写必可见
                    if(newValue){
                        currentFieldState["Visible"] = true;
                        if(fieldKey.toLowerCase() == "ownerid" || fieldKey.toLowerCase() == "ownerdeptid"){
                            currentFieldState["Required"] = true;
                        }
                    } else {
                        currentFieldState["Required"] = false;
                    }
                } else if (columnName == "Required" && newValue){    //必填必可写
                    currentFieldState["Visible"] = true;
                    currentFieldState["Editable"] = true;
                } else if (columnName == "Printable" && newValue){    //打印必可见
                    currentFieldState["Visible"] = true;
                }

                if(!isCheckAll){
                    this.syncCheckAllState(columnName, newValue);
                }
            },
            syncCheckAllState(){
                this.$nextTick(() => {
                    for(let column of this.columns){
                        let allCheckState = false;
                        let columnName = column.columnName;
                        let allRows = $(".table-" + this.prefix).find("input[id$='" + columnName + "']"),
                            checkedRows = $(".table-" + this.prefix).find("input[id$='" + columnName + "'].checked");

                        if(allRows.length == checkedRows.length){
                            allCheckState = true;
                        }

                        this.columnAllCheckStates[columnName] = allCheckState;
                    }
                });
            }
        },
        components: {
            FieldAclColumn
        }
    };
</script>

<style>
</style>



// WEBPACK FOOTER //
// src/components/sheetdesigner/fieldAclModal/field-acl-body.vue

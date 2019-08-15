<template>
    <td style="width:140px;padding:8px;">
        <div
            v-if="!(assoState && (column.columnName === 'Required' ||
                column.columnName === 'Editable'))"
            class='ckbox ckbox-default'
        >
            <input v-if="isDisabled"
                type="checkbox"
                disabled="disabled"
                :id="prefix + fieldKey + column.columnName"
                v-model="fieldState[column.columnName]"
                :class="{ 'checked': fieldState[column.columnName] }" />
            <input v-else
                type="checkbox"
                :id="prefix + fieldKey + column.columnName"
                v-model="fieldState[column.columnName]"
                :class="{ 'checked': fieldState[column.columnName] }" />
            <label
                @click.prevent="inputClickedHandler(fieldKey, column.columnName)"
                :for="prefix + fieldKey + column.columnName"></label>
        </div>
    </td>
</template>

<script>
    export default {
        props: ['prefix', 'column', 'assoState', 'fieldKey', 'index', 'isDisabled', 'fieldStates'],
        data(){
            let fieldState = this.fieldStates[this.fieldKey];
            fieldState = fieldState || {
                visible: true,
                editable: this.prefix == 'draft',
                required: false,
                printable: true
            };
            return {
                fieldState: fieldState
            }
        },
        methods: {
            inputClickedHandler(fieldKey, columnName){
                if(this.isDisabled) return;

                this.$emit("fieldAclChange", fieldKey, columnName);
            }
        }
    };
</script>

<style scoped>
    input[type="checkbox"]:disabled + label:before {
        background-color: #f2f2f6;
        cursor: not-allowed;
        border:0px;
    }
</style>


// WEBPACK FOOTER //
// src/components/sheetdesigner/fieldAclModal/field-acl-column.vue

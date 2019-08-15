<template>
    <Modal v-model="showFieldAclModalFlag" title="操作权限" :mask-closable="false"
        @on-ok="ok" @on-cancel="cancel" class="field-acl-modal" width="800px">
        <!-- <Tabs value="draft">
            <TabPane label="新增数据时" name="draft">
              <field-acl-body
                  prefix="draft"
                  :properties="properties"
                  :field-states="draftFieldStates"
                  :formula-fields="formulaFields"
                  :mapping-properties="mappingProperties"
                  :pre-installed-fields="preInstalledFields">
              </field-acl-body>
            </TabPane>
            <TabPane label="修改数据时" name="effective">
              <field-acl-body
                  prefix="effective"
                  :properties="properties"
                  :field-states="effectiveFieldStates"
                  :formula-fields="formulaFields"
                  :mapping-properties="mappingProperties"
                  :pre-installed-fields="preInstalledFields">
              </field-acl-body>
            </TabPane>
        </Tabs> -->
        <field-acl-body
            prefix="draft"
            :properties="properties"
            :field-states="draftFieldStates"
            :asso-states="assoFieldStates"
            :formula-fields="formulaFields"
            :mapping-properties="mappingProperties"
            :pre-installed-fields="preInstalledFields">
        </field-acl-body>
    </Modal>
</template>

<script>
import FieldAclBody from './field-acl-body'
import { loadFieldAcl, saveFieldAcl } from '../../../service/getData'

export default {
  props: ['fieldAclModel', 'schemaCode'],
  data() {
    return {
      showFieldAclModalFlag: false,
      aclSettings: {},
      draftFieldStates: {},
      effectiveFieldStates: {},
      properties: {},
      formulaFields: [],
      mappingProperties: [],
      preInstalledFields: [],
      assoFieldStates: {}
    }
  },
  watch: {
  },
  created() {
    this.loadFieldAcl()
  },
  methods: {
    show() {
      this.showFieldAclModalFlag = true
    },
    ok() {
      let res = this.saveFieldAcl()
      this.destroy()
    },
    cancel() {
      var that = this
      this.$emit('cancel')
      this.destroy()
    },
    destroy() {
      this.$destroy()
      document.body.removeChild(this.$el)
    },
    buildFieldStates(fieldStates) {
      let resultFieldStates = {}
      for (var fieldKey in fieldStates) {
        let fieldState = fieldStates[fieldKey]
        resultFieldStates[fieldKey] = {
          Visible: fieldState['Visible'],
          Editable: fieldState['Editable'],
          Required: fieldState['Required'],
          Printable: fieldState['Printable']
        }
      }
      return resultFieldStates
    },
    async loadFieldAcl() {
      let res = await loadFieldAcl(this.schemaCode)
      if (res.code === '0') {
        this.assoFieldStates = res.assoProperty || {};
        if (!res.DraftFieldStates) {
          this.draftFieldStates = {};
          const proKeys = Object.keys(res.Propertys);
          proKeys.forEach(item => {
            this.draftFieldStates[item] = {
              Visible: true,
              Editable: true,
              Required: false,
              Printable: false
            };
          });
        } else {
          // 数据兼容处理
          const myDraftData = JSON.parse(res.DraftFieldStates);
          const someDraftData = {};
          myDraftData.forEach(item => {
            someDraftData[item.PropertyName] = {
              Visible: item.Visible,
              Editable: this.assoFieldStates[item.PropertyName] ? true : item.Editable,
              Required: item.Required,
              Printable: item.Printable
            };
          });
          const proKeys = Object.keys(res.Propertys);
          proKeys.forEach(item => {
            if (!someDraftData[item]) {
              someDraftData[item] = {
                Visible: true,
                Editable: true,
                Required: false,
                Printable: false
              };
            }
          });
          this.draftFieldStates = someDraftData;
        }
        this.properties = res.Propertys || {};
        // this.aclSettings = res.ReturnData
        // this.draftFieldStates = JSON.parse(this.aclSettings.DraftFieldStates)
        // this.effectiveFieldStates = JSON.parse(
        //   this.aclSettings.EffectiveFieldStates
        // )
        // this.properties = JSON.parse(this.aclSettings.Propertys)
        // this.formulaFields = res.ReturnData.FormulaFields
        // this.mappingProperties = this.aclSettings.MappingProperties
        // this.preInstalledFields = this.aclSettings.PreInstalledFields
      } else {
        this.$Message.error(res.ErrorMessage)
      }
    },
    async saveFieldAcl() {
      Object.keys(this.assoFieldStates).forEach(item => {
        this.draftFieldStates[item].Editable = false;
        this.draftFieldStates[item].Required = false;
      });
      let res = await saveFieldAcl(
        this.schemaCode,
        this.buildFieldStates(this.draftFieldStates),
        this.buildFieldStates(this.effectiveFieldStates)
      );

      if (res.code === '0') {
        this.$emit('ok');
        this.$Message.success('保存成功');
      } else {
        this.$Message.error('保存失败');
      }
    }
  },
  components: {
    FieldAclBody
  }
}
</script>
<style>
</style>


// WEBPACK FOOTER //
// src/components/sheetdesigner/fieldAclModal/field-acl-modal.vue

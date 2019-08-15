<template>
  <div class="formDisplay from">
    <div v-for="(subList, ind) in list" :key="ind">
      <form-control
        v-for="control in subList"
        v-show="control.Visible && control.isDisplay"
        :key="control.datafield"
        :field="control.datafield"
        :type="control.controlkey"
        :config="control"
        :value="control.Value"
        mode="display"
        @getValue="bindGetValueFn(control.controlListIndex, $event)"
        @setValue="bindSetValueFn(control.controlListIndex, $event)"
        @input="handleInput(control.controlListIndex, $event, control)"
      ></form-control>
    </div>
  </div>
</template>
<script>
import base from './mixins/base'
import HTTP_FORM from '@/rebuild/api/form'
import FormControl from '@/rebuild/components/controls'

export default {
  name: 'FormDisplay',
  mixins: [base],
  components: { FormControl },
  props: {
    // 该表单id
    formId: {
      type: String
    }
  },
  data() {
    return {}
  },
  watch: {
    formId() {
      this.init()
    }
  },
  async created() {
    await this.init()
  },
  methods: {
    async getData() {
      let applyInfo
      let params = {
        appRunId: this.formId
      }
      let result = await HTTP_FORM.getAppInfoLog(params)
      if (+result.code === 0) {
        applyInfo = {
          ...result.propertyJson,
          Successful: true
        }
      } else {
        applyInfo = {
          Successful: false
        }
      }
      return applyInfo
    }
  }
}
</script>
<style lang="scss" scoped></style>

<template>
  <div class="formCreate from">
    <div v-for="(subList, ind) in list" :key="ind">
      <form-control
        v-for="control in subList"
        v-show="control.Visible && control.isDisplay"
        :key="control.datafield"
        :field="control.datafield"
        :type="control.controlkey"
        :config="control"
        :value="control.Value"
        mode="edit"
        @getValue="bindGetValueFn(control.controlListIndex, $event)"
        @setValue="bindSetValueFn(control.controlListIndex, $event)"
        @input="handleInput(control.controlListIndex, $event, control)"
      ></form-control>
    </div>
    <div class="page-footer">
      <div class="buttons">
        <a @click="submit()">提交</a>
      </div>
    </div>
  </div>
</template>
<script>
import base from './mixins/base'
import HTTP_FORM from '@/rebuild/api/form'
import HTTP_DEAL from '@/rebuild/api/deal'
import FormControl from '@/rebuild/components/controls'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'FormCreate',
  mixins: [base],
  components: { FormControl },
  props: {
    // 表单类型 create-创建 draft-草稿 resubmit-驳回重新提交
    type: {
      type: String,
      default() {
        return 'create'
      }
    },
    // 应用id
    appId: {
      type: String
    },
    // 该表单id
    formId: {
      type: String
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['controlsCache'])
  },
  async created() {
    await this.init()
    if (this.controlsCache.map[this.appId] !== void 0) {
      await this.setControlsValue(this.controlsCache.map[this.appId])
    }
  },
  watch: {
    async type() {
      await this.init()
      this.setControlsValue(this.controlsCache.map[this.appId])
    },
    async appId() {
      await this.init()
      this.setControlsValue(this.controlsCache.map[this.appId])
    },
    async formId() {
      await this.init()
      this.setControlsValue(this.controlsCache.map[this.appId])
    }
  },
  methods: {
    async getData() {
      let applyInfo
      let params = {
        BizObjectId: '',
        SchemaCode: this.appId,
        ActionName: 'Load',
        SideModal: 'true'
      }
      if (this.type === 'draft' || this.type === 'resubmit') {
        params.appRunId = this.formId
      }
      try {
        applyInfo = await HTTP_FORM.getForm(params)
        if (!applyInfo.Successful) {
          // 增加提示
          return Promise.reject(Error('数据获取失败'))
        }
        return applyInfo
      } catch (error) {
        // 增加提示
        return Promise.reject(Error('数据获取失败'))
      }
    },
    // 发起表单
    async submit() {
      if (this.validateForm() === false) {
        return false
      }
      let params
      let methodName
      if (this.type === 'create') {
        params = {
          appId: this.appId
        }
        methodName = 'formalaExecAndStartFlow'
      } else if (this.type === 'draft' || this.type === 'resubmit') {
        params = {
          appRunId: this.formId
        }
        methodName = 'formalaValAndStartFlow2'
      }
      let formData = this.getFormData()
      params = Object.assign({}, params, {
        postValue: JSON.stringify(formData)
      })
      try {
        let res = await HTTP_DEAL[methodName](params)
        if (res.code === '0') {
          // 增加提示
          console.log(res.msg)
          this.$emit('dealForm', {
            tabType: 'createForm',
            appId: this.appId
          })
        } else {
          // 增加提示
          console.log(res.msg)
        }
      } catch (e) {
        // 增加提示
        console.log('保存失败')
      }
    },
    ...mapMutations('controls', ['setControlsValue'])
  }
}
</script>
<style lang="scss" scoped></style>

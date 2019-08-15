<template>
  <div>
    <div v-if="type === 'FormEmbedCode'" v-html="html"></div>
    <component
      v-else-if="controlsLoadable()"
      :is="type"
      v-model="currentValue"
      :type="type"
      :field="field"
      :config="config"
      @getValue="getValue"
      @setValue="setValue"
      @input="handleInput"
    ></component>
  </div>
</template>

<script>
import HTTP_FORM from '@/rebuild/api/form'
import { mapState } from 'vuex'
import {
  triggerComputationRule,
  setDefaultValue,
  triggerDisplayRule,
  setDefaultDisplay
} from '@/rebuild/helper/control-helper'
let controls = require.context('./', true, /form-.*\.vue$/)
let components = {}
controls.keys().forEach(key => {
  let control = controls(key)
  components[control.default.name] = control.default
})

export default {
  props: {
    // 控件名controlkey FormTextBox
    type: {
      type: String
    },
    // 默认值
    value: {
      type: [String, Number, Array, Date, Object]
    },
    // 控件配置参数
    config: {
      type: Object
    },
    // 控件id datafield F0000001
    field: {
      type: String
    },
    // 控件展示模式 edit-可编辑 display-展示
    mode: {
      type: String,
      default() {
        return 'edit'
      }
    }
  },
  components: {
    ...components
  },
  data() {
    return {
      currentValue: this.value,
      html: '',
      excludeControls: ['FormApprovalRecord']
    }
  },
  computed: {
    ...mapState(['controls'])
    // isDisplayMode() {
    //   return this.controls.params.isDisplayMode
    // }
  },
  watch: {
    value: function() {
      this.currentValue = this.value
      // 避免重复触发计算公式
      // this.$emit('input', this.value)
    }
  },
  created() {
    // 判断控件是否加载
    if (!this.controlsLoadable()) {
      return
    }
    // 代码内嵌控件
    if (
      this.type === 'FormEmbedCode' &&
      this.config.interfaceoptions.length > 0
    ) {
      this.loadFormEmbedCode()
    }
    // 展示模式不触发计算公式
    if (this.mode !== 'display') {
      // 设置默认值
      setDefaultValue(this.config)
      // 触发计算公式
      triggerComputationRule(this.config)
    }
    // 设置默认显示状态
    setDefaultDisplay(this.config)
    // 触发隐藏条件
    triggerDisplayRule(this.config)
  },
  methods: {
    getValue(event) {
      this.$emit('getValue', event)
    },
    setValue(event) {
      this.$emit('setValue', event)
    },
    handleInput(event) {
      this.$emit('input', event)
      // 触发计算公式
      triggerComputationRule(this.config)
      // 触发隐藏条件
      triggerDisplayRule(this.config)
    },
    // 判断控件是否加载
    controlsLoadable() {
      return !this.excludeControls.includes(this.type)
    },
    // 加载FormEmbedCode控件
    async loadFormEmbedCode() {
      let interfaceObj = {}
      interfaceObj = JSON.parse(this.config.interfaceoptions)
      if (interfaceObj.id) {
        try {
          const result = await HTTP_FORM.getInterfaceData({
            appId: this.controls.params.appId,
            controlId: this.field,
            appRunId: this.controls.params.appRunId
          })
          if (+result.code === 0 && result.datas) {
            this.html = (result.datas + '').replace(/\\n/g, '\n')
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

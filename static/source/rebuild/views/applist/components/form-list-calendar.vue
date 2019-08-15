<template>
  <div class="formListCalendar">
    <FormCalendar
      :appId="appId"
      @on-custom-comp="handleClickForm"
    ></FormCalendar>
  </div>
</template>
<script>
import FormCalendar from '@/views/calendar-mode/index-rebuild.vue'

export default {
  name: 'FormListCalendar',
  components: { FormCalendar },
  props: {
    // 应用id
    appId: {
      type: String
    },
    // 应用名称
    appName: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    // 格式化显示名称
    formatDisplayName(displayName, defaultName = '') {
      if (displayName) {
        let nameStr = displayName.toString()
        return nameStr && nameStr.trim() ? nameStr : defaultName
      } else {
        return defaultName
      }
    },
    // 点击表单操作
    handleClickForm(row) {
      // 草稿
      if (+row.Status === 1) {
        this.openDraftForm(row)
      } else {
        this.openDisplayForm(row)
      }
    },
    // 打开展示表单
    openDisplayForm(row) {
      this.$emit('openDisplayForm', {
        value: { row },
        formId: row.AppRunId,
        formName: `${this.formatDisplayName(row.Name, '--')} — ${this.appName}`
      })
    },
    // 打开草稿
    openDraftForm(row) {
      this.$emit('openDraftForm', {
        code: `${this.appId},${row.AppRunId}`,
        formId: row.AppRunId,
        formName: `${this.formatDisplayName(row.Name, '--')} — ${this.appName}`
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>

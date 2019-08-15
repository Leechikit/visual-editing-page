<template>
  <div class="form-header"></div>
</template>

<script>
/**
* @name: form-header
* @description: 分组标题控件
*/
import base from './mixins/base'

export default {
  name: 'FormHeader',
  mixins: [base],
  props: {
    config: {
      type: Object
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

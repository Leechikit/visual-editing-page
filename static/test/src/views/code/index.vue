<template>
  <div class="code">
    <el-button size="small" @click="$router.back()">BACK</el-button>
    <section><pre>{{ template }}</pre></section>
  </div>
</template>
<script>
import { getViewsFile, getViewsCode } from '@/api/file'

export default {
  name: 'codeView',
  data() {
    return {
      id: this.$route.params.id,
      template: '',
      script: '',
      style: []
    }
  },
  async created() {
    let fileList = getViewsFile()
    let file = fileList.find(item => item.id === this.id)
    if (file) {
      let code = await getViewsCode(file.path)
      this.template = code.template
      this.script = code.script
      this.style = code.style
    }
  },
  methods: {
    async loadFile(path) {
      let result = await getViewsCode(path)
    }
  }
}
</script>
<style lang="scss">
</style>
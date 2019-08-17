<template>
  <div class="home">
    <ul>
      <li v-for="(item, $index) in fileList" :key="$index" @click="changeCodeView(item.id)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import { getViewsFile } from '@/api/file'

export default {
  name: 'home',
  data() {
    return {
      fileList: []
    }
  },
  created() {
    this.fileList = getViewsFile()
  },
  methods: {
    changeCodeView(id) {
      this.$router.push({
        name: 'code',
        params: {
          id
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>
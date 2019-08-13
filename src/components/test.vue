<template>
  <div class="test">
    {{ name }}
  </div>
</template>
<script>
export default {
  name: 'Test',
  data() {
    return {
      name: 'my test component'
    }
  },
  created() {
    console.log(this.name)
  },
  methods: {
    clickHandle() {
      this.name = 'change my test name'
    }
  }
}
</script>
<style lang="scss">
.test {
  color: red;
}
</style>
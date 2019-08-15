<template>
  <DropDown v-model="renderType" :options="renderOptions"></DropDown>
</template>

<script>
export default {
  data() {
    return {
      renderOptions: [
        { id: 'block', label: '块状', icon: 'el-icon-menu' },
        { id: 'list', label: '列表', icon: 'el-icon-notebook-2' }
      ],
      renderType: 'block'
    }
  }
}
</script>

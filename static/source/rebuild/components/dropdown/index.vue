<template>
  <el-dropdown placement="bottom" @command="$emit('change', $event)">
    <span class="dropdown-link">
      <i class="iconfont" :class="title.icon"></i>
      <span>{{ title.label }}</span>
      <i class="iconfont iconxia"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in options"
        :key="item.id"
        :command="item.id"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
/**
 * @author baoanjie
 * @name 公共组件-Dropdown
 * @example example.vue
 */
export default {
  name: 'Dropdown',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String, Number],
    options: Array
  },
  computed: {
    title() {
      return this.options.find(item => item.id === this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-link {
  color: $color-main;

  & span {
    font-size: $font-size-main;
    user-select: none;
  }
}
</style>

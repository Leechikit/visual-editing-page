<template>
  <div class="hori-list">
    <div v-for="item in data" :key="item.name" class="list-item">
      <div class="item-value" :class="{ 'item-value-warn': item.warn }">
        {{ item.value }}
      </div>
      <div class="item-label">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HoriList',
  props: {
    data: Array
  }
}
</script>

<style lang="scss" scoped>
.hori-list {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .list-item {
    text-align: center;

    .item-value {
      color: $color-main;
      font-size: 24px;

      &-warn {
        color: $color-warn;
      }
    }

    .item-label {
      color: $color-remind;
      font-size: $font-size-main;
    }
  }
}
</style>

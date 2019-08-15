<template>
  <div class="pageTitle">
    <span class="text">{{ text }}</span>
    <div class="else">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pageTitle',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';

.pageTitle {
  display: flex;
  align-items: center;
  padding-left: 30px;
  height: 50px;
  .text {
    display: block;
    flex-shrink: 0;
    position: relative;
    font-size: $font-size-main;
    line-height: 20px;
    color: #3c3c3c;
    &::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 2px;
      width: 2px;
      height: 16px;
      background-color: $color-main;
    }
  }
  .else {
    flex: 1;
  }
}
</style>

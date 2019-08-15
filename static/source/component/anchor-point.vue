<template>
  <div
    class="anchor"
    @mouseenter="showAnchor"
    @mouseleave="hideAnchor"
  >
    <div class="anchor-emit" :class="{ 'anchor-emit-toggle': visible }">
      <span class="anchor-emit__label anchor-emit-toggle__label">表单导航</span>
    </div>
    <div
      class="anchor-iconbox"
      :class="{ 'anchor-iconbox-toggle': visible }"
      @click="toggleAnchor"
    >
      <div class="anchor-iconbox__wrap anchor-iconbox-toggle__wrap">
        <div class="anchor-iconbox__icon anchor-iconbox-toggle__icon"></div>
      </div>
    </div>
    <div
      v-if="anchors"
      class="anchor-box"
      :class="{ 'anchor-box-toggle': visible }"
    >
      <div
        v-for="(item, index) in anchors"
        :key="index"
        class="anchor-box__item"
        :class="{ 's-active': index === currentActiveIndex }"
        @click="scrollToHere(item, index)"
      >
        {{ item.innerText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    anchorList: {
      type: Array,
      default() {
        return []
      }
    },
    conSelector: { // 内容容器
      type: String
    },
    scrollElement: { // 滚动容器
      type: Object
    }
  },
  data() {
    return {
      visible: false,
      isScrollEnd: true,
      currentScrollTop: null,
      currentActiveIndex: null,
      isLockAnimation: false
    }
  },
  computed: {
    anchors() {
      let result = this.anchorList || []
      result.unshift({
        innerText: '表单顶部',
        offsetTop: 0
      })
      result.push({
        innerText: '表单底部',
        offsetTop: $(this.conSelector).height() + 132
      })
      return result
    },
    anchorTopList() {
      let result = this.anchors.map(anchor => anchor.offsetTop) || []
      return result
    }
  },
  watch: {
    currentScrollTop(newVal) {
      for (let i = 0, len = this.anchors.length; i < len; i++) {
        this.currentActiveIndex = i
        if (newVal - 50 <= this.anchors[i].offsetTop) {
          break
        }
      }
    }
  },
  mounted() {
    console.log(this.conSelector)
    console.log($(this.conSelector))
  },
  methods: {
    scrollToHere(item, index) {
      // eslint-disable-next-line no-undef
      let $element = $('#scrollContent')
      if($(this.scrollElement).length > 0) {
        $element = $(this.scrollElement)
      }
      $($element).stop().animate({ scrollTop: item.offsetTop })
      this.currentActiveIndex = index
      // this.hideAnchor()
    },
    showAnchor() {
      if (this.isLockAnimation) return
      let $element = $('#scrollContent')
      if ($(this.scrollElement).length > 0) {
        $element = $(this.scrollElement)
      }
      this.isLockAnimation = true
      setTimeout(() => {
        this.isLockAnimation = false
      }, 200)
      this.visible = true
      this.currentScrollTop = $element[0].scrollTop
    },
    hideAnchor(event) {
      if (event.relatedTarget === null) return
      if (this.isLockAnimation) return
      this.isLockAnimation = true
      setTimeout(() => {
        this.isLockAnimation = false
      }, 200)
      this.visible = false
    },
    toggleAnchor() {
      if (this.visible === true) {
        this.hideAnchor({relatedTarget: 'hide'})
      } else {
        this.showAnchor()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@anchor-box-width: 120px;
@anchor-emit-width: 120px;
@anchor-emit-height: 40px;
@anchor-iconbox-width: 40px;
@anchor-iconbox-height: 40px;
@anchor-iconbox-icon-width: @anchor-iconbox-width * 0.4;
@anchor-iconbox-icon-height: 2px;
@anchor-iconbox-icon-space: 6px;

.anchor {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 998;
  cursor: pointer;
  &-emit {
    position: absolute;
    bottom: 0;
    right: 0;
    width: @anchor-emit-width;
    height: @anchor-emit-height;
    transform-origin: right center;
    transform: scaleX(40 / 120);
    transition: transform 0.2s;
    color: #fff;
    white-space: nowrap;
    background-color: #2c8cf0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;

    &__label {
      margin-left: 10px;
      transform: translateX(-@anchor-emit-width);
    }
    &-toggle {
      transform: scaleX(1);
      & &__label {
        transform: translate(0);
      }
    }
  }

  &-iconbox {
    position: absolute;
    bottom: 0;
    right: 0;
    width: @anchor-iconbox-width;
    height: @anchor-iconbox-height;
    color: #fff;
    background-color: #2c8cf0;
    &__wrap {
      position: absolute;
      right: 0;
      top: 0;
      width: @anchor-iconbox-width;
      height: @anchor-iconbox-height;
      background-color: #2c8cf0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__icon {
      width: @anchor-iconbox-icon-width;
      height: @anchor-iconbox-icon-height;
      background-color: currentColor;
      transform-origin: right center;
      transition: transform 0.2s;
      position: relative;

      &::before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        transform: translateY(-@anchor-iconbox-icon-space);
        transition: transform 0.2s;
        background-color: currentColor;
      }

      &::after {
        content: '';
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        transform: translateY(@anchor-iconbox-icon-space);
        transition: transform 0.2s;
        background-color: currentColor;
      }
    }

    &-toggle {
      // & &__icon {
      //   transform: scaleX(0.125);
      // }
      & &__icon {
        background-color: transparent;

        &::before {
          transform: rotate(45deg);
        }

        &::after {
          transform: rotate(-45deg);
        }
      }
    }
  }

  &-box {
    position: absolute;
    bottom: @anchor-emit-height;
    right: 0;
    width: @anchor-box-width;
    transform: scaleY(0);
    transform-origin: bottom;
    background-color: #fff;
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);
    max-height: 60vh;
    overflow: auto;

    &__item {
      padding: 10px;
      border-bottom: 1px solid #eee;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        background-color: #e4f1ff;
      }

      &:last-of-type {
        border-bottom: none;
      }
      &.s-active {
        color: #2c8cf0;
        background-color: #e4f1ff;
      }
    }

    &-toggle {
      transition: transform 0.2s linear 0.2s;
      transform: scaleY(1);
    }
  }
}
</style>

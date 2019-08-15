<template>
  <div class="appIcon">
    <Poptip
      placement="right"
      width="285"
      trigger="hover"
      @on-popper-show="showPopup"
    >
      <svg
        class="icon"
        aria-hidden="true"
      >
        <use :xlink:href="modelValue"></use>
      </svg>
      <ul
        class="iconList"
        slot="content"
      >
        <li
          class="iconItem"
          v-for="(icon, $index) in iconList"
          :class="{'s-selected': icon.value === selectedValue}"
          :key="$index"
          @click="selecIcon(icon.value)"
        >
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use :xlink:href="icon.value"></use>
          </svg>
        </li>
      </ul>
    </Poptip>
  </div>
</template>
<script>
import iconList from '@/api/static/iconList.js'

export default {
  name: 'appIcon',
  props: {
    appIcon: {
      type: String
    }
  },
  data () {
    return {
      iconList: iconList,
      modelValue: '',
      selectedValue: ''
    }
  },
  watch: {
    appIcon () {
      if (this.appIcon !== '#icon-add') {
        this.modelValue = this.appIcon
      } else {
        this.modelValue = iconList[0].value
        this.$emit('select', {
          appIcon: this.modelValue
        })
      }
    }
  },
  methods: {
    showPopup () {
      this.selectedValue = this.modelValue
    },
    selecIcon (value) {
      this.modelValue = value
      this.selectedValue = this.modelValue
      this.$emit('select', {
        appIcon: this.modelValue
      })
    }
  },
}
</script>
<style lang="less" scoped>
.appIcon {
  .iconList {
    overflow: hidden;
    .iconItem {
      position: relative;
      float: left;
      margin: 5px;
      &.s-selected {
        border-radius: 100%;
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2b95e7;
        overflow: hidden;
      }
    }
  }
  .icon {
    width: 30px;
    height: 30px;
    vertical-align: top;
    overflow: hidden;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="appIcon">
    <el-popover placement="right" width="285" trigger="click" @show="showPopup">
      <ul class="iconList">
        <li
          class="iconItem"
          v-for="(icon, $index) in iconList"
          :class="{ 's-selected': icon.value === selectedValue }"
          :key="$index"
          style="float:left;margin:5px"
          @click="selecIcon(icon.value)"
        >
          <svg
            class="icon"
            aria-hidden="true"
            style="width:40px;height:40px;cursor:pointer;vertical-align: top;"
          >
            <use :xlink:href="icon.value"></use>
          </svg>
        </li>
      </ul>
      <div slot="reference">
        <svg class="icon" aria-hidden="true" style="margin-top:5px">
          <use :xlink:href="modelValue"></use>
        </svg>
        <span class="select"> 请选择 </span>
      </div>
    </el-popover>
  </div>
</template>
<script>
import iconList from '@/rebuild/api/static/appIconList.js'

export default {
  name: 'appIcon',
  props: {
    appIcon: {
      type: String
    }
  },
  data() {
    return {
      iconList: iconList,
      modelValue: iconList[0].value,
      selectedValue: ''
    }
  },
  watch: {
    appIcon() {
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
  created() {
    if (this.appIcon !== '#icon-add') {
      this.modelValue = this.appIcon
    } else {
      this.modelValue = iconList[0].value
      this.$emit('select', {
        appIcon: this.modelValue
      })
    }
  },
  methods: {
    showPopup() {
      this.selectedValue = this.modelValue
    },
    selecIcon(value) {
      this.modelValue = value
      this.selectedValue = this.modelValue
      this.$emit('select', {
        appIcon: this.modelValue
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.appIcon {
  cursor: pointer;
  width: 100px;
  .icon {
    width: 40px;
    height: 40px;
    overflow: hidden;
  }
  .select {
    color: #327dff;
  }
}
</style>
<style lang="scss">
.iconList {
  .iconItem {
    &.s-selected {
      border-radius: 100%;
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2b95e7;
      overflow: hidden;
    }
  }
}
</style>

<template>
  <div class="form-number" @mouseover="onMouseover" @mouseout="onMouseout">
    <input
      ref="control"
      class="mint-field-core"
      type="text"
      :placeholder="placeHolder"
      @focus="onFocus()"
      @blur="onBlur()"
      :readonly="!config.Editable"
    />
    <div :class="{ 'custom-number-pm': customNumberArrow && config.Editable }">
      <div class="plus" @click="handleNumberUp"></div>
      <div class="minus" @click="handleNumberDown"></div>
    </div>
  </div>
</template>
<script>
/**
* @name: form-number
* @description: 数字控件
*/
import base from './mixins/base'
import { numberToFixed, numberToKbit } from '@/rebuild/helper/number-helper'

export default {
  name: 'FormNumber',
  mixins: [base],
  props: {
    config: {
      type: Object
    }
  },
  data() {
    return {
      placeHolder: '0',
      customNumberArrow: false,
      currentValue: 0
    }
  },
  mounted() {
    let _placeHolder = 0
    _placeHolder = _placeHolder.toFixed(this.config.decimalplaces) + ''
    this.placeHolder = _placeHolder.toString()
    this.$emit('getValue', this.getValue)
    this.$emit('setValue', this.setValue)
  },
  watch: {
    currentValue(val) {
      if (val !== null && val !== void 0 && val !== '') {
        this.setValue(val)
      }
    }
  },
  methods: {
    onFocus() {
      let $input = this.$refs.control
      if (
        $input &&
        this.currentValue !== null &&
        this.currentValue !== void 0
      ) {
        $input.value = this.currentValue
      }
    },
    onBlur() {
      let $input = this.$refs.control
      this.setValue($input.value)
    },
    onMouseover() {
      this.customNumberArrow = true
    },
    onMouseout() {
      this.customNumberArrow = false
    },
    setValue(value) {
      if (value === '') {
        return
      }
      value = (value + '').replace(/[^0-9.]+/g, '')
      let formatedNumber
      if (this.config.decimalplaces) {
        formatedNumber = numberToFixed(value, this.config.decimalplaces)
      } else {
        formatedNumber = value
      }

      this.currentValue = formatedNumber || null
      if (formatedNumber && Number(this.config.showmode)) {
        formatedNumber = numberToKbit(formatedNumber)
      }
      let $input = this.$refs.control
      if ($input) {
        $input.value = formatedNumber || ''
        this.$emit('input', this.currentValue)
      }
    },
    // 上下箭头加减
    handleNumberUp() {
      this.currentValue = +this.currentValue + 1
      if (Number.isNaN(this.currentValue)) {
        this.currentValue = 1
      }
      if (this.config.decimalplaces) {
        this.currentValue = numberToFixed(
          this.currentValue,
          this.config.decimalplaces
        )
      }
      this.setValue(this.currentValue)
    },
    handleNumberDown() {
      this.currentValue = this.currentValue - 1
      if (Number.isNaN(this.currentValue)) {
        this.currentValue = -1
      }
      if (this.config.decimalplaces) {
        this.currentValue = numberToFixed(
          this.currentValue,
          this.config.decimalplaces
        )
      }
      this.setValue(this.currentValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-number {
  position: relative;
  input {
    width: 100%;
  }
}
.custom-number-arrow {
  position: absolute;
  top: 0;
  right: 0;

  & .up-arrow {
    border: 10px solid transparent;
    border-bottom-color: #2b95e7;
    margin-bottom: 8px;
  }

  & .down-arrow {
    border: 10px solid transparent;
    border-top-color: #2b95e7;
    margin-top: 8px;
  }
}

$cell-height: 48px; // 数字控件高度
$pm-size: 22px; // 加减圆圈宽高
$icon-thick: 2px; // 加减条形状厚度
$icon-length: 12px; // 加减条形状长度
$minus-pad: 8px; // 减右侧间距
$pm-gap: 2px; // 加减之间额外间距
$border-size: 2px; // 加减圆圈边框尺寸
$pm-color: #2b95e7;

.custom-number-pm {
  position: absolute;
  top: 0;
  right: 0;

  & .plus {
    position: absolute;
    top: ($cell-height - $pm-size) / 2;
    left: -(2 * ($pm-size + $minus-pad) + $pm-gap);
    width: $pm-size;
    height: $pm-size;
    border: $border-size solid $pm-color;
    border-radius: 50%;
  }

  & .minus {
    position: absolute;
    top: ($cell-height - $pm-size) / 2;
    left: -($pm-size + $minus-pad);
    width: $pm-size;
    height: $pm-size;
    border: $border-size solid $pm-color;
    border-radius: 50%;
  }

  & .plus::before {
    content: '';
    position: absolute;
    top: ($pm-size - $icon-length) / 2 - $border-size;
    left: ($icon-length - $icon-thick) / 2 + ($pm-size - $icon-length) / 2 -
      $border-size;
    width: $icon-thick;
    height: $icon-length;
    background-color: $pm-color;
  }

  & .plus::after,
  & .minus::before {
    content: '';
    position: absolute;
    top: ($pm-size - $icon-thick) / 2 - $border-size;
    left: ($pm-size - $icon-length) / 2 - $border-size;
    width: $icon-length;
    height: $icon-thick;
    background-color: $pm-color;
  }
}
</style>


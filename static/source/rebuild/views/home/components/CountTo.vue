<template>
  <p :style="mainStyle" :class="mainClass">
    <span :style="countStyle" :class="countClass"
      ><span class="countClass" :id="countId">{{ initCount }}</span
      ><span>{{ unitText }}</span></span
    >
  </p>
</template>

<script>
import CountUp from 'countup'
export default {
  name: 'CountTo',
  data() {
    return {
      counter: {},
      unitText: '',
      countId: 'count' + parseInt(Math.random() * 1000000)
    }
  },
  props: {
    mainClass: String,
    countClass: String,
    mainStyle: {
      type: Object,
      default: () => {
        return {
          fontSize: '16px',
          fontWeight: 500,
          color: 'gray'
        }
      }
    },
    countStyle: Object,
    initCount: {
      type: Number,
      default: 0
    },
    param: {
      type: Number,
      default: 0
    },
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
    },
    simplify: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2
    },
    delay: {
      type: Number,
      default: 200
    },
    uneasing: {
      type: Boolean,
      default: false
    },
    ungroup: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: ','
    },
    decimals: {
      type: Number,
      default: 0
    },
    decimal: {
      type: String,
      default: '.'
    },
    unit: {
      type: Array,
      default: () => {
        return [[3, 'K+'], [6, 'M+'], [9, 'B+']]
      }
    }
  },
  methods: {
    transformValue(val) {
      return {
        val: val,
        unit: ''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        let endVal = 0
        let res = {}
        if (this.simplify) {
          res = this.transformValue(this.endVal)
          endVal = res.val
          this.unitText = res.unit
        } else {
          endVal = this.endVal
        }
        let counter = {}
        this.counter = counter = new CountUp(
          this.countId,
          this.startVal,
          endVal,
          this.decimals,
          this.duration,
          {
            useEasing: !this.uneasing,
            useGrouping: !this.ungroup,
            separator: this.separator,
            decimal: this.decimal
          }
        )
        if (!counter.error) {
          counter.start()
        }
      }, this.delay)
    })
  },
  watch: {
    endVal() {
      let endVal = 0
      if (this.simplify) {
        let res = this.transformValue(this.endVal)
        endVal = res.val
        this.unitText = res.unit
      } else {
        endVal = this.endVal
      }
      this.counter.update(endVal)
    }
  }
}
</script>
<style>
.countClass {
  font-family: Roboto-Black;
  color: #fff;
  font-size: 30px;
  line-height: 60px;
  letter-spacing: 0;
  cursor: pointer;
}
.textZero {
  color: rgb(181, 39, 45);
}
.textNum {
  color: rgb(255, 255, 255);
}
</style>

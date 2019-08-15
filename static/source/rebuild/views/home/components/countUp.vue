<template>
  <div>
    <slot name="intro"></slot>
    <p
      :class="className"
      :style="{
        textAlign: 'center',
        color: color,
        fontSize: countSize,
        fontWeight: countWeight
      }"
      style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
    >
      <span v-cloak :id="idName" :title="endVal" style="font-size:inherit;">{{
        startVal
      }}</span
      ><span>{{ unit }}</span>
    </p>
  </div>
</template>

<script>
import CountUp from 'countup'
export default {
  data() {
    return {
      unit: '',
      demo: {}
    }
  },
  name: 'countUp',
  props: {
    idName: String,
    className: String,
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
    },
    decimals: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 2
    },
    delay: {
      type: Number,
      default: 500
    },
    options: {
      type: Object,
      default: () => {
        return {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.'
        }
      }
    },
    color: String,
    countSize: {
      type: String,
      default: '40px'
    },
    countWeight: {
      type: Number,
      default: 1000
    },
    introText: [String, Number]
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        let endVal = this.endVal
        this.unit = ''
        let demo = {}
        this.demo = demo = new CountUp(
          this.idName,
          this.startVal,
          endVal,
          this.decimals,
          this.duration,
          this.options
        )
        if (!demo.error) {
          demo.start()
        }
      }, this.delay)
    })
  }
}
</script>

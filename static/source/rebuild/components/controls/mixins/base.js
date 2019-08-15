export default {
  props: {
    placeholder: String,
    value: [String, Number, Array, Date, Object]
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  mounted() {
    this.currentValue = this.value
  },
  watch: {
    value: function() {
      this.currentValue = this.value
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event)
    },
    getValue() {
      if (this.currentValue === void 0) {
        this.currentValue = null
      }
      return this.currentValue
    }
  }
}

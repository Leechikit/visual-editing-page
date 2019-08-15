<template>
<div class="tablelist-tooltip" @click="clickMethod">
  {{content}}
</div>
</template>
<script>
export default {
  name: 'tablelistDatatitle',
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  computed: {
    content() {
      return typeof this.rowData[this.field] == 'string' && this.rowData[this.field].trim() ? this.rowData[this.field] : "--";
    }
  },
  methods: {
    clickMethod() {
      this.$emit('on-custom-comp', {
        rowData: this.rowData,
        field: this.field,
        index: this.index
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tablelist-tooltip {
  display: inline-block;
  color: #37abfd;
  cursor: pointer;
}
</style>

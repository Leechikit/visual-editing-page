<template>
  <span class="interface-operation">
    <a
      href=""
      @click.stop.prevent="modify(rowData,index)"
    >编辑</a>&nbsp;&nbsp;
    <a
      href=""
      @click.stop.prevent="deleteRow(rowData,index)"
    >删除</a>
  </span>
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
  methods: {
    modify (rowData, index) {
      let params = { type: 'modify', index: this.index, rowData: this.rowData };
      this.$emit('on-custom-comp', params);
    },
    deleteRow (rowData, index) {
      let params = { type: 'delete', index: this.index, rowData: this.rowData };
      this.$emit('on-custom-comp', params);
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

<template>
    <div class="status">
      <Tag type="dot" :color="color" v-show="!isNone">{{content}}</Tag>
      <span v-show="isNone">--</span>
    </div>
</template>
<script>
export default {
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
  data() {
    return {
    };
  },
  computed: {
    isNone(){
      return this.rowData[this.field] ? false : true;
    },
    content() {
      const ACT_RESULT = {
        1: '同意',
        2: '不同意',
        3: '进行中',
        4: '撤回'
      }
      let actResult = +this.rowData['ActResult']
      let result
      switch(+this.rowData[this.field]){
        case 0:
          result = "子流程开启待提交";
          break;
        case 1:
          result = "草稿";
          break;
        case 2:
          result = "进行中";
          break;
        case 3:
          result = `结束 (${ACT_RESULT[actResult] || '暂无结果'})`;
          break;
        case 4:
          result = "驳回到发起人";
          break;
        default:
          result = "暂无状态";
          break;
      }
      return result;
    },
    color(){
      let result
      switch(+this.rowData[this.field]){
        case 0:
          result = "orange";
          break;
        case 1:
          result = "blue";
          break;
        case 2:
          result = "yellow";
          break;
        case 3:
          result = "green";
          break;
        case 4:
          result = "red";
          break;
        default:
          result = "gray";
          break;
      }
      return result;
    }
  },
  created() {
  },
  methods: {
  }
};
</script>
<style lang="less" scoped>
.status {
  display: inline-block;
}
</style>


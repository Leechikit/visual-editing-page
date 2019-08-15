<template>
  <div class="download">
    <p>请选择导出字段</p>
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
      <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">
        <span>全选</span>
      </Checkbox>
    </div>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
      <Checkbox
        v-for="item in checkboxList"
        :key="item.Code"
        :label="item.Code"
        :disabled="item.Code=='Name'"
      >
        <span>{{item.DisplayName}}</span>
      </Checkbox>
    </CheckboxGroup>
  </div>
</template>
<script>
export default {
  props: {
    columns: undefined, 
    type: {
      type: String,
      default: 'table'
    }
  },
  data () {
    return {
      checkAll: false,
      checkAllGroup: [],
      checkboxList: []
    };
  },
  methods: {
    handleCheckAll () {
      if (this.checkAll === true) {
        if (this.type === 'report') this.checkAllGroup = [];
        else this.checkAllGroup = ['Name'];
      } else {
        this.checkAllGroup = this.checkboxList.map(item => {
          return item.Code;
        });
      }
      this.checkAll = !this.checkAll;
    },
    checkAllGroupChange () {
      if (this.checkAllGroup.length === this.checkboxList.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    }
  },
  watch: {
    columns (val) {
      console.log(this.columns)
      this.checkboxList = val.slice();
      this.checkboxList = this.checkboxList.filter(item => {
        return item.Visible;
      });
      if (this.type !== 'report') {
        this.checkboxList.unshift({
          Code: 'Name',
          DisplayName: '数据标题'
        });
      }
      this.checkAllGroup = this.checkboxList.map(item => {
        return item.Code;
      });
      this.checkAll = true;
    }
  }
};
</script>
<style lang="less">
.download {
  padding: 0 30px;
  .ivu-checkbox-group {
    overflow: hidden;
  }
  .ivu-checkbox-group-item {
    width: 25.33%;
    margin-right: 8% !important;
    float: left;
  }
  .ivu-checkbox {
    margin-right: 6px;
  }
}
</style>

